self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("ee-cache").then(cache => {
      return cache.addAll([
        "/",
        "/admin.html",
        "/style.css"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
