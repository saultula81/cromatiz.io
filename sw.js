const CACHE_NAME = 'compositor-cache-v1';
const urlsToCache = [
  './', // Cachea el archivo HTML principal
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
  './styles.css', // Agrega aquí tu archivo CSS si lo separaste
  './script.js'   // Agrega aquí tu archivo JS si lo separaste
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos cacheados con éxito');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activado');
});

// Intercepción de solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna la respuesta desde el caché si existe, o realiza la solicitud a la red
        return response || fetch(event.request);
      })
  );
});
