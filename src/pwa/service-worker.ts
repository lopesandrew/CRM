/* eslint-disable no-restricted-globals */
// Um service worker simples para fornecer capacidade de PWA offline. Este
// service worker faz o cache da navegação básica e responde com a versão
// armazenada quando offline. Para uma solução mais robusta, considere
// usar Workbox e configurar estratégias de cache específicas.

const CACHE_NAME = 'crm-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // Se a requisição falhar (ex.: offline) e não estiver no cache,
          // retornamos a página inicial como fallback.
          return caches.match('/');
        })
      );
    })
  );
});