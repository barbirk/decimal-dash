/**
 * Decimal Dash - Service Worker
 * Enables offline functionality and fast loading
 */

const CACHE_NAME = 'decimal-dash-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './lang.js',
  './app.js',
  './games/game1.js',
  './games/game2.js',
  './games/game3.js',
  './games/game4.js',
  './games/game5.js',
  './games/game6.js',
  './games/game7.js',
  './games/game8.js',
  './games/game9.js',
  './games/game10.js',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap'
];

// Install event - cache all assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Decimal Dash: Caching app assets');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.log('Decimal Dash: Cache failed', error);
      })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Decimal Dash: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(function(response) {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            // Clone and cache the response
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            return response;
          });
      })
      .catch(function() {
        // Fallback for HTML pages when offline
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});
