const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

const assets = [
    '/',
    '/favicon.ico',
    '/index.html',
    '/css/app.css',
    '/js/app.js',
    '/pages/fallback.html'
];
// limit cache size
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    })
};
// service worker events
// install event
self.addEventListener("install", evt => {
    // waitUntil method is used to tell the browser not to terminate the service worker
    // until the promise passed to waitUntil is either resolved or rejected.
    evt.waitUntil(
        // The caches.open call returns a Promise and the cache object that was either created or existed before the open call.
        caches.open(staticCacheName).then(cache => {
            // addAll method takes an array of URLs, retrieves them, and adds the resulting response objects to the given cache.
            cache.addAll(assets);
        })
    );
    // console.log("Service worker has been installed!");
});

// activate event
self.addEventListener("activate", evt => {
    // Delete old caches
    evt.waitUntil(
        caches.keys().then(cacheKeys => {
            // The Promise.all() method returns a single Promise that fulfills
            // when all of the promises passed as an iterable have been fulfilled or when the iterable contains no promises.
            // It rejects with the reason of the first promise that rejects.
            return Promise.all(cacheKeys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    );
    // console.log("Service worker has been activated");
});

// fetch event
self.addEventListener("fetch", evt => {
    // The respondWith() method of FetchEvent prevents the browser's default fetch handling,
    // and allows you to provide a promise for a Response yourself.
    evt.respondWith(
        // The match() method of the Cache interface returns a Promise that resolves to the Response
        // associated with the first matching request in the Cache object. If no match is found, the Promise resolves to undefined.
        caches.match(evt.request).then(cacheResponse => {
            // Returns cacheResponse; else, fetch resources of the request.
            return cacheResponse || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 3);
                    return fetchRes;
                })
            });
        }).catch(() => {
            // console.log(evt.request.url);
            return caches.match('/pages/fallback.html')
        })
    );

});