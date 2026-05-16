// Service Worker for Ernest Embassy PWA
const CACHE_NAME = 'ernest-embassy-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/visa.html',
  '/movie.html',
  '/tutoring.html',
  '/education.html',
  '/booking.html',
  '/contact.html',
  '/admin.html',
  '/style.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
