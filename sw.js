const CACHE_NAME = 'smartfit-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './logo.svg'
];

// Instala el caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Intercepta las peticiones de red y sirve desde el caché si no hay internet
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Si está en el caché, lo devuelve. Si no, va a buscarlo a internet.
            return response || fetch(event.request);
        })
    );
});
