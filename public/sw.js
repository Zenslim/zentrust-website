self.addEventListener("install", (event) => {
  // Bump version to invalidate any previously cached assets or chunks.
  const SW_VERSION = "v2";

  // Ensure any stale caches are cleared during installation.
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
  );

  self.skipWaiting();
});
self.addEventListener("activate", () => self.clients.claim());
