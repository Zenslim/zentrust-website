// ZenTrust Service Worker
const CACHE_NAME = 'zentrust-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon.svg',
  '/images/hero/sustainable-farm.jpg',
  '/images/programs/education-program.jpg'
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch — FIXED VERSION
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // ❗ CRITICAL:
  // NEVER intercept or cache Next.js build files
  if (url.pathname.startsWith('/_next/')) {
    return; // allow network to deliver correct CSS/JS/fonts
  }

  // SAFE caching for your own public assets
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
