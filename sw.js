// KEYCLA — service worker
// Makes the app installable and lets it open offline.
// Bump CACHE_VERSION whenever you publish a new version of the site.

const CACHE_VERSION = "keycla-v1";

const APP_SHELL = [
  "./",
  "index.html",
  "style.css",
  "script.js",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const allowedExternal =
    url.hostname === "cdn.jsdelivr.net" ||        // Supabase library
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com";

  // Supabase / Google API calls always go straight to the network.
  if (!sameOrigin && !allowedExternal) return;

  // Pages: network first, cached app as the offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match("index.html").then((cached) => cached || caches.match("./"))
      )
    );
    return;
  }

  // Files: serve from cache instantly, refresh in the background.
  event.respondWith(
    caches.open(CACHE_VERSION).then(async (cache) => {
      const cached = await cache.match(request);

      const network = fetch(request)
        .then((response) => {
          if (response && (response.ok || response.type === "opaque")) {
            cache.put(request, response.clone());
          }
          return response;
        })
        .catch(() => cached);

      return cached || network;
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      if (clients.length) return clients[0].focus();
      return self.clients.openWindow("./");
    })
  );
});
