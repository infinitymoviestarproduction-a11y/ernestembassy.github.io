/* ============================================
   SERVICE WORKER FOR ERNEST EMBASSY PWA
   Version: 1.0
   Author: Damian Anielozie Okafor
   ============================================ */

// Cache name - update version to force new cache
const CACHE_NAME = 'ernest-embassy-v1.0';

// Files to cache for offline access
const urlsToCache = [
    // Main Pages
    '/',
    '/index.html',
    '/about.html',
    '/services.html',
    '/visa.html',
    '/movie.html',
    '/teaching.html',
    '/tutoring.html',
    '/education.html',
    '/booking.html',
    '/contact.html',
    '/portfolio.html',
    '/admin.html',
    
    // Styles & Scripts
    '/style.css',
    '/script.js',
    
    // Forms (thank you pages)
    '/thank-you.html',
    '/thank-you-visa.html',
    '/thank-you-film.html',
    '/thank-you-tutoring.html',
    '/thank-you-education.html',
    '/thank-you-contact.html'
];

// ============================================
// INSTALL EVENT - Cache files
// ============================================
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching files...');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('[Service Worker] All files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[Service Worker] Cache failed:', error);
            })
    );
});

// ============================================
// FETCH EVENT - Serve from cache or network
// ============================================
self.addEventListener('fetch', event => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }
    
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // Return cached response if found
                if (cachedResponse) {
                    console.log('[Service Worker] Serving from cache:', event.request.url);
                    return cachedResponse;
                }
                
                // Otherwise fetch from network
                console.log('[Service Worker] Fetching from network:', event.request.url);
                return fetch(event.request)
                    .then(networkResponse => {
                        // Don't cache if response is not ok
                        if (!networkResponse || networkResponse.status !== 200) {
                            return networkResponse;
                        }
                        
                        // Clone response before caching
                        const responseToCache = networkResponse.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return networkResponse;
                    })
                    .catch(error => {
                        console.error('[Service Worker] Fetch failed:', error);
                        
                        // Return offline page for HTML requests
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/offline.html');
                        }
                        
                        return new Response('Network error occurred', {
                            status: 408,
                            statusText: 'Network Error',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// ============================================
// ACTIVATE EVENT - Clean up old caches
// ============================================
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
    
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Now ready to handle fetches');
            return self.clients.claim();
        })
    );
});

// ============================================
// MESSAGE EVENT - Handle messages from client
// ============================================
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// ============================================
// PUSH EVENT - For future push notifications
// ============================================
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    
    const options = {
        body: data.body || 'New update from Ernest Embassy',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-72.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        }
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'Ernest Embassy', options)
    );
});

// ============================================
// NOTIFICATION CLICK EVENT
// ============================================
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    const urlToOpen = event.notification.data.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then(windowClients => {
                // Check if there is already a window/tab open
                for (let client of windowClients) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // If not, open a new window/tab
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});
