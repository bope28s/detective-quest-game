const CACHE_NAME = "detective-quest-game-v16";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./assets/quest-map.jpg",
  "./assets/baker.jpg",
  "./assets/librarian.jpg",
  "./assets/gardener.jpg",
  "./assets/toy-maker.jpg",
  "./assets/clock-keeper.jpg",
  "./assets/star-badge.jpg",
  "./assets/case1-intro.jpg",
  "./assets/case1-success.jpg",
  "./assets/case1-fail.jpg",
  "./assets/case2-intro.jpg",
  "./assets/case2-success.jpg",
  "./assets/case2-fail.jpg",
  "./assets/case2-security.jpg",
  "./assets/case2-curator.jpg",
  "./assets/case2-cafe-owner.jpg",
  "./assets/case2-violinist.jpg",
  "./assets/case2-janitor.jpg",
  "./assets/case3-intro.jpg",
  "./assets/case3-success.jpg",
  "./assets/case3-fail.jpg",
  "./assets/case3-biologist.jpg",
  "./assets/case3-kayak-coach.jpg",
  "./assets/case3-weather-watcher.jpg",
  "./assets/case3-photographer.jpg",
  "./assets/case3-cook.jpg",
  "./assets/case4-intro.jpg",
  "./assets/case4-success.jpg",
  "./assets/case4-fail.jpg",
  "./assets/case4-trainer.jpg",
  "./assets/case4-vet.jpg",
  "./assets/case4-photographer.jpg",
  "./assets/case4-zookeeper.jpg",
  "./assets/case4-snackkeeper.jpg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_ASSETS);
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
    }),
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type === "opaque") {
            return response;
          }

          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
          return undefined;
        });
    }),
  );
});
