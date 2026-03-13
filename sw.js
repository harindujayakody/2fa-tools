/* 2FA.tools Service Worker v1.0 */
const CACHE = '2fa-tools-v1';
const ASSETS = [
  '/2fa-tools/',
  '/2fa-tools/index.html',
  '/2fa-tools/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap'
];

/* Install — cache core assets */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      return Promise.allSettled(ASSETS.map(url => cache.add(url).catch(() => {})));
    }).then(() => self.skipWaiting())
  );
});

/* Activate — clean old caches */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Fetch — cache-first for assets, network-first for navigation */
self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;

  /* Navigation: network-first, fallback to cache */
  if (request.mode === 'navigate') {
    e.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('/2fa-tools/')))
    );
    return;
  }

  /* Statics: cache-first */
  e.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(res => {
        if (!res || res.status !== 200 || res.type === 'opaque') return res;
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(request, clone));
        return res;
      });
    })
  );
});
