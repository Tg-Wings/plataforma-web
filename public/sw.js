// Service Worker para Joy Working PWA
const CACHE_NAME = "joyworking-v1.0.0"
const urlsToCache = [
  "/",
  "/login",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/favicon-32x32.png",
  "/apple-touch-icon.png",
]

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Cache abierto")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Eliminando cache antiguo:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Interceptar requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - devolver respuesta
      if (response) {
        return response
      }
      return fetch(event.request)
    }),
  )
})

// Push notifications
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nueva oportunidad laboral disponible",
    icon: "/icon-192x192.png",
    badge: "/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "1",
    },
    actions: [
      {
        action: "explore",
        title: "Ver Oportunidad",
        icon: "/shortcut-search.png",
      },
      {
        action: "close",
        title: "Cerrar",
        icon: "/close-icon.png",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("Joy Working", options))
})

// Click en notificación
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "explore") {
    event.waitUntil(clients.openWindow("/candidato/dashboard"))
  }
})
