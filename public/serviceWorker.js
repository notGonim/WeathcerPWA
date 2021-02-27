const CACHE_NAME = "v-1"
const urlsToCache = ['index.html', 'offline.html']

const self = this


//install sw
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                cache.addAll(urlsToCache)
            })
    )
})

//listen for req

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
            .then(() => {
                return fetch(e.request)
                    .catch(() => catches.match('offline.html'))
            })
    )
})

//activate the service worker
self.addEventListener('activate', (e) => {
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)
    e.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if (!cacheWhiteList.includes(cacheName)) {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})
