/* Retired service worker: the app moved to https://harindujayakody.com/free-tools/2fa-online/.
   Browsers that installed the old offline version pick this up, clear the old cache, unregister,
   and reload open tabs so they reach the redirect page. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
  })());
});
