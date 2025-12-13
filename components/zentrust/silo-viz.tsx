// components/zentrust/silo-viz.tsx

function Card({
  title,
  tag,
  children,
  caption,
}: {
  title: string;
  tag: string;
  children: React.ReactNode;
  caption: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/40">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{tag}</div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200/70 bg-white dark:border-zinc-800/70 dark:bg-zinc-900/20">
        {children}
      </div>

      <p className="mt-3 text-sm leading-7 text-zinc-600 dark:text-zinc-300">
        {caption}
      </p>
    </div>
  );
}

/**
 * Calm, doctrine-safe visualization:
 * Fragmentation (silos) vs Integration (feedback loops).
 * No alarm colors. No “command arrows”. Just structure.
 */
export function SiloViz() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Card
        title="Fragmented design"
        tag="Silos"
        caption="When systems are designed separately, each compensates for what the others lack."
      >
        <svg viewBox="0 0 560 280" className="h-auto w-full">
          <rect x="0" y="0" width="560" height="280" fill="transparent" />

          {[
            { x: 40, label: "Land" },
            { x: 210, label: "Health" },
            { x: 380, label: "Community" },
          ].map((c, i) => (
            <g key={i}>
              <rect
                x={c.x}
                y="40"
                width="140"
                height="200"
                rx="18"
                fill="rgba(24,24,27,0.02)"
                stroke="rgba(24,24,27,0.16)"
              />
              <text
                x={c.x + 70}
                y="68"
                textAnchor="middle"
                fontSize="14"
                fill="rgba(24,24,27,0.78)"
                fontFamily="ui-sans-serif, system-ui"
                fontWeight="600"
              >
                {c.label}
              </text>

              {/* inward loop */}
              <path
                d={`M ${c.x + 45} 135 C ${c.x + 40} 110, ${c.x + 100} 110, ${
                  c.x + 95
                } 135
                   C ${c.x + 90} 160, ${c.x + 50} 160, ${c.x + 45} 135`}
                fill="none"
                stroke="rgba(24,24,27,0.22)"
                strokeWidth="2"
              />
              <circle
                cx={c.x + 95}
                cy="135"
                r="3"
                fill="rgba(24,24,27,0.35)"
              />

              <text
                x={c.x + 70}
                y="190"
                textAnchor="middle"
                fontSize="12"
                fill="rgba(24,24,27,0.55)"
                fontFamily="ui-sans-serif, system-ui"
              >
                inputs ↑ · pressure ↑
              </text>
              <text
                x={c.x + 70}
                y="212"
                textAnchor="middle"
                fontSize="12"
                fill="rgba(24,24,27,0.55)"
                fontFamily="ui-sans-serif, system-ui"
              >
                outcomes ↓
              </text>
            </g>
          ))}

          <line
            x1="190"
            y1="40"
            x2="190"
            y2="240"
            stroke="rgba(24,24,27,0.08)"
            strokeWidth="6"
            strokeDasharray="8 10"
          />
          <line
            x1="360"
            y1="40"
            x2="360"
            y2="240"
            stroke="rgba(24,24,27,0.08)"
            strokeWidth="6"
            strokeDasharray="8 10"
          />
        </svg>
      </Card>

      <Card
        title="Integrated design"
        tag="Living system"
        caption="When land, health, and community are designed as one system, restoration compounds."
      >
        <svg viewBox="0 0 560 280" className="h-auto w-full">
          <rect x="0" y="0" width="560" height="280" fill="transparent" />

          {[
            { cx: 140, cy: 140, label: "Land" },
            { cx: 280, cy: 80, label: "Health" },
            { cx: 420, cy: 140, label: "Community" },
          ].map((n, i) => (
            <g key={i}>
              <circle
                cx={n.cx}
                cy={n.cy}
                r="54"
                fill="rgba(24,24,27,0.02)"
                stroke="rgba(24,24,27,0.18)"
                strokeWidth="2"
              />
              <text
                x={n.cx}
                y={n.cy + 5}
                textAnchor="middle"
                fontSize="14"
                fill="rgba(24,24,27,0.78)"
                fontFamily="ui-sans-serif, system-ui"
                fontWeight="600"
              >
                {n.label}
              </text>
            </g>
          ))}

          <path
            d="M 194 140 C 230 120, 250 105, 270 95"
            fill="none"
            stroke="rgba(24,24,27,0.22)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 334 95 C 355 105, 380 120, 406 140"
            fill="none"
            stroke="rgba(24,24,27,0.22)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 406 140 C 360 200, 240 200, 194 140"
            fill="none"
            stroke="rgba(24,24,27,0.18)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          <circle cx="270" cy="95" r="3" fill="rgba(24,24,27,0.35)" />
          <circle cx="406" cy="140" r="3" fill="rgba(24,24,27,0.35)" />
          <circle cx="194" cy="140" r="3" fill="rgba(24,24,27,0.35)" />

          <text
            x="280"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill="rgba(24,24,27,0.55)"
            fontFamily="ui-sans-serif, system-ui"
          >
            feedback loops · shared foundations · distributed pressure
          </text>
        </svg>
      </Card>
    </section>
  );
}
