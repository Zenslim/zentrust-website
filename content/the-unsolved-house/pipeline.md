# THE UNSOLVED HOUSE — Automated Pipeline

## Pipeline Outline
1. **Script ingest** → lock `shot_list.json` as canonical schedule (durations, shot types, silence blocks).
2. **Style lock** → generate 3 test shots (one IMAGEN still, one VEO real-time, one flashback VEO). Human checkpoint #1 for approval.
3. **Prompt finalization** → freeze `imagen_prompts.json` and `veo_prompts.json` with approved look.
4. **Batch generation** → run Vertex AI Imagen 4 Fast for stills and Veo 3.1 Fast for motion/flashbacks. Human checkpoint #2 before moving to finishing.
5. **Asset normalization** → transcode everything to 1920x1080, 24fps, linear color, ProRes 422 HQ mezzanine; create black/silence renders for padding.
6. **FFmpeg assembly** → build movement on Imagen stills, trim Veo clips to exact durations, drop flashbacks at 0.4–0.5s windows, concatenate in shot order, apply scripted zooms/pans only.
7. **Sound stems** → author drone bed, plink metronome, mechanical foley layer, and explicit silence blocks; mix stems deterministically.
8. **Mastering** → mux picture + mix to 10:00 runtime with final black; export upload-ready file. Human checkpoint #3 is final watch-through only.

## Asset Contracts
- **Source tables**: `content/the-unsolved-house/shot_list.json`, `imagen_prompts.json`, `veo_prompts.json`.
- **Output folders** (create in working directory):
  - `assets/imagen_raw/{shot_id}.png` (Imagen 4 Fast)
  - `assets/veo_raw/{shot_id}.mp4` (Veo 3.1 Fast)
  - `assets/video_normalized/{shot_id}.mov` (ProRes mezzanine)
  - `assets/audio_stems/{stem}.wav` (drone, plink, foley, silence)
  - `assets/final/the-unsolved-house-master.mov`
- **Naming**: use `shot_id` values directly; flashbacks share the same convention (`B6.mp4`, `C5.mp4`, etc.).

## Vertex AI Batch Generation
- **Imagen 4 Fast (stills)**: feed `imagen_prompts.json` to a batch script similar to:
```bash
python - <<'PY'
import json, subprocess, pathlib
prompts = json.load(open('content/the-unsolved-house/imagen_prompts.json'))
for item in prompts:
    out = pathlib.Path('assets/imagen_raw')/f"{item['shot_id']}.png"
    cmd = [
        'gcloud','beta','ai','generative','images','create',
        f"--model=imagen-4.0-fast-generate-1", 
        f"--prompt={item['prompt']}",
        f"--negative-prompt={item['negative_prompt']}",
        f"--aspect-ratio=16:9",
        f"--output-file={out}"
    ]
    subprocess.run(cmd, check=True)
PY
```
- **Veo 3.1 Fast (video + flashbacks)**: drive with `veo_prompts.json` and duration targets:
```bash
python - <<'PY'
import json, subprocess, pathlib
prompts = json.load(open('content/the-unsolved-house/veo_prompts.json'))
for item in prompts:
    out = pathlib.Path('assets/veo_raw')/f"{item['shot_id']}.mp4"
    cmd = [
        'gcloud','beta','ai','generative','video','create',
        f"--model=veo-3.1-fast-generate-1",
        f"--prompt={item['prompt']}",
        f"--negative-prompt={item['negative_prompt']}",
        f"--duration={item['duration']}",
        f"--fps=24",
        f"--output-file={out}"
    ]
    subprocess.run(cmd, check=True)
PY
```
- Store API responses for provenance; no manual edits between batch runs.

## FFmpeg Automation

### 1) Normalize sources
```bash
mkdir -p assets/video_normalized
for src in assets/veo_raw/*.mp4; do
  base=$(basename "$src" .mp4)
  ffmpeg -y -i "$src" -vf "scale=1920:1080,fps=24,setpts=PTS-STARTPTS" \
    -c:v prores_ks -profile:v 3 -an "assets/video_normalized/${base}.mov"
done
```

### 2) Build Imagen motion plates (Ken Burns)
Use `duration` from `imagen_prompts.json`:
```bash
mkdir -p assets/video_normalized
python - <<'PY'
import json, subprocess, pathlib
imagen = json.load(open('content/the-unsolved-house/imagen_prompts.json'))
for item in imagen:
    still = pathlib.Path('assets/imagen_raw')/f"{item['shot_id']}.png"
    out = pathlib.Path('assets/video_normalized')/f"{item['shot_id']}.mov"
    dur = float(item['duration'])
    zoom = item.get('camera_motion','1.0')
    ff = [
        'ffmpeg','-y','-loop','1','-i',str(still),
        '-filter_complex', f"[0:v]scale=1920:1080,zoompan=z='zoom+0.0005':d={int(dur*24)}:s=1920x1080:fps=24,trim=duration={dur},setpts=PTS-STARTPTS",
        '-c:v','prores_ks','-profile:v','3','-an', str(out)
    ]
    subprocess.run(ff, check=True)
PY
```

### 3) Generate black segments
```bash
# Opening 5s black and closing 40s pad
ffmpeg -y -f lavfi -i color=black:s=1920x1080:r=24 -t 5 -c:v prores_ks -profile:v 3 assets/video_normalized/BLACK_OPEN.mov
ffmpeg -y -f lavfi -i color=black:s=1920x1080:r=24 -t 40 -c:v prores_ks -profile:v 3 assets/video_normalized/BLACK_END.mov
```

### 4) Trim VEO clips to exact script durations
```bash
python - <<'PY'
import json, subprocess, pathlib
shots = {item['shot_id']: item for item in json.load(open('content/the-unsolved-house/shot_list.json'))}
for vid in pathlib.Path('assets/video_normalized').glob('*.mov'):
    sid = vid.stem
    if sid.startswith('BLACK') or sid in ['A6','B11','D1','D12','D13','E4','E6','E7','F2','F3']:
        continue
    dur = shots[sid]['duration']
    trimmed = vid.with_name(f"{sid}_trim.mov")
    subprocess.run([
        'ffmpeg','-y','-i',str(vid),'-vf',f"scale=1920:1080,fps=24",'-an','-c:v','prores_ks','-profile:v','3','-t',str(dur),str(trimmed)
    ], check=True)
    trimmed.replace(vid)
PY
```

### 5) Concat order (exact timeline)
Create `content/the-unsolved-house/concat_list.txt` dynamically:
```bash
python - <<'PY'
import json
shots = json.load(open('content/the-unsolved-house/shot_list.json'))
with open('content/the-unsolved-house/concat_list.txt','w') as f:
    for item in shots:
        sid = item['shot_id']
        if sid == 'A1':
            f.write("file '../assets/video_normalized/BLACK_OPEN.mov'\n")
            f.write("duration 5\n")
            continue
        if sid == 'F4':
            f.write("file '../assets/video_normalized/BLACK_END.mov'\n")
            f.write("duration 40\n")
            continue
        f.write(f"file '../assets/video_normalized/{sid}.mov'\n")
        f.write(f"duration {item['duration']}\n")
    f.seek(f.tell()-1)
PY
```
Then assemble:
```bash
ffmpeg -y -f concat -safe 0 -i content/the-unsolved-house/concat_list.txt -c:v prores_ks -profile:v 3 -an assets/final/picture.mov
```

### 6) Audio stems (authored, not generated)
- **Drone bed**: `ffmpeg -y -f lavfi -i "anoisesrc=color=pink:amplitude=0.1" -af "lowpass=f=80, volume=-12dB, atrim=duration=600" assets/audio_stems/drone.wav`
- **Plink drip**: script gradual tempo increase (e.g., 12 bpm at start to stream at 6:10) using timed click samples; example generator:
```bash
python - <<'PY'
import numpy as np, wave
sr=48000
points=[(0,12),(70,60),(330,120),(370,240)]
# Linear ramp between anchors, returning beats-per-second
def bps_at(t):
    for i in range(len(points)-1):
        t0,bpm0=points[i]; t1,bpm1=points[i+1]
        if t0 <= t <= t1:
            bpm = bpm0 + (bpm1-bpm0)*(t-t0)/(t1-t0)
            return bpm/60.0
    return points[-1][1]/60.0
click=np.sin(2*np.pi*1000*np.arange(int(0.01*sr))/sr)*0.5
length=int(600*sr)
buf=np.zeros(length)
next_t=0.0
while next_t < 600:
    idx=int(next_t*sr)
    buf[idx:idx+len(click)] += click
    next_t += 1.0/bps_at(next_t)
w=wave.open('assets/audio_stems/plink.wav','w')
w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr)
w.writeframes((buf*32767).astype('int16').tobytes()); w.close()
PY
```
- **Mechanical foley**: record/collect individual hits (glass clink, mop scrape, latch click, hairdryer start) and place via `adelay` into a timeline WAV; keep a CSV of cue times to automate insertion.
- **Silence blocks**: generate mute stems for windows requiring absence (e.g., 6:48 coffee beat, 9:20–10:00) with `ffmpeg -f lavfi -i anullsrc=r=48000:cl=stereo -t DURATION`.

### 7) Mixdown
```bash
ffmpeg -y \
  -i assets/final/picture.mov \
  -i assets/audio_stems/drone.wav \
  -i assets/audio_stems/plink.wav \
  -i assets/audio_stems/foley.wav \
  -filter_complex "[1]adelay=0|0[drone];[2]adelay=0|0[plink];[3]adelay=0|0[foley];[drone][plink][foley]amix=inputs=3:normalize=1,alimiter=limit=-1dB[out]" \
  -map 0:v -map "[out]" -c:v copy -c:a pcm_s24le -t 600 assets/final/the-unsolved-house-master.mov
```

## Timing Notes
- Flashbacks (`B6`, `B9`, `C5`, `C9`, `D9`) are locked to 0.4s; trim VEO outputs accordingly and verify with `ffprobe` before concat.
- Transition `D14` is 0.5s whoosh into Act V; render as part of VEO and let concat carry it.
- Final pad is delivered by `F4` black; total runtime enforced at exactly 600 seconds.

## Human Checkpoints (only)
1. **Style lock** after three test shots: one from `A3` (VEO), `A6` (Imagen), and `B6` (flashback VEO).
2. **Batch approval** after all Imagen/Veo renders normalized to mezzanine.
3. **Final watch-through** of `assets/final/the-unsolved-house-master.mov`; no manual trims allowed, only re-renders if issues found.
