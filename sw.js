// sw.js - Service Worker
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = ["https://cse110lab6.herokuapp.com/entries"];

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests
self.addEventListener("install", event => {
    event.waitUntil(caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then( response => {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  });