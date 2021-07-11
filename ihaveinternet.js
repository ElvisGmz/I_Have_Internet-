var cacheName = ["ihaveinternet_1.0.2"];
var filesToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/index.js",
  "/assets/dude.jpg",
  "/assets/icon.svg",
];

// On version update, remove old cached files
self.addEventListener('activate', (e) => {
  e.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(thisCacheName => {
                  if (!cacheName.includes(thisCacheName)) {
                      return caches.delete(thisCacheName);
                  }
              })
          );
      })
  );
});

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
