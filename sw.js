const CACHE_NAME = 'yellowpaws-cache-v3';
const urlsToCache = [
  './',
  'index.html',
  'profile.html',
  'learninghub.html',
  'alphabet.html',
  'numbers.html',
  'colors.html',
  'shapes.html',
  'animals.html',
  'quiz.html',
  'aitutor.html',
  'badges.html',
  'story.html',
  'shop.html',
  'certificate.html',
  'memory.html',
  'drawing.html',
  'dailychallenge.html',
  'parent.html',
  'settings.html',
  'theme.html',
  'css/style.css',
  'js/app.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.allSettled(urlsToCache.map(url => cache.add(url)));
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network First strategy: Try fetching from network; if offline/fails, use cache
self.addEventListener('fetch', event => {
  // Only handle GET requests and http/https schemes
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html') || caches.match('index.html');
          }
        });
      })
  );
});
