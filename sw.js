self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('brainforge-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/login.html',
        '/index.html',
        '/style.css',
        '/js/script.js',
        '/logobackg.png'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});