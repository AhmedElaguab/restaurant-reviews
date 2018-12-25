const cacheName = 'v1';

// Install ServiceWorker
self.addEventListener('install', (e) => {

    e.waitUntil(
        // Open a cache instance
        caches
        .open(cacheName)
        .then(cache => {
            // Add all assets to the cache instance
            cache.addAll([
                'index.html',
                'restaurant.html',
                'sw.js',
                'README.md',
                'CODEOWNERS',
                'data/restaurants.json',
                'js/dbhelper.js',
                'js/main.js',
                'js/restaurant_info.js',
                'css/styles.css',
                'img/1.jpg',
                'img/2.jpg',
                'img/3.jpg',
                'img/4.jpg',
                'img/5.jpg',
                'img/6.jpg',
                'img/7.jpg',
                'img/8.jpg',
                'img/9.jpg',
                'img/10.jpg'
            ]);

            console.log('[ServiceWorker] Caching files Done!!');
        })
        .catch(err => {
            console.log('[ServiceWorker] Caching files Failed!!', err);
        })
    )

    console.log('[ServiceWorker] Install Done!!');
});


// Activate ServiceWorker
self.addEventListener('activate', (e) => {

    console.log('[ServiceWorker] Activate Done!!');
    // Clean old caches
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(mapCacheName => {
                    if(mapCacheName !== cacheName) {
                        return caches.delete(mapCacheName);
                    }
                })
            );
        })
    )

});

// Fetch requests
self.addEventListener('fetch', (e) => {


    e.respondWith(

        // Search Caches API for matching request
        caches
        .match(e.request)
        .then(resp => {
            // If request matched
            if (resp) return resp;

            // Otherwise, Fetch request from network
            return fetch(e.request)
        })
    )

    console.log('[ServiceWorker] Fetch Done!!');

});