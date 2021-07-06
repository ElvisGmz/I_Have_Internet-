var cacheName = 'ihaveinternet';
var filesToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/assets/undraw_broadcast.svg',
  '/assets/undraw_signal_searching.svg',
  '/assets/undraw_Loading.svg',
  '/assets/dude.jpg',
  '/assets/icon.svg'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});