const CACHE_NAME = "detective-quest-game-v14";
const APP_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./assets/quest-map.png",
  "./assets/baker.png",
  "./assets/librarian.png",
  "./assets/gardener.png",
  "./assets/toy-maker.png",
  "./assets/clock-keeper.png",
  "./assets/star-badge.png",
  "./assets/case1-intro.png",
  "./assets/case1-success.png",
  "./assets/case1-fail.png",
  "./assets/case2-intro.png",
  "./assets/case2-success.png",
  "./assets/case2-fail.png",
  "./assets/case2-security.png",
  "./assets/case2-curator.png",
  "./assets/case2-cafe-owner.png",
  "./assets/case2-violinist.png",
  "./assets/case2-janitor.png",
  "./assets/case3-intro.png",
  "./assets/case3-success.png",
  "./assets/case3-fail.png",
  "./assets/case3-biologist.png",
  "./assets/case3-kayak-coach.png",
  "./assets/case3-weather-watcher.png",
  "./assets/case3-photographer.png",
  "./assets/case3-cook.png",
  "./assets/case4-intro.png",
  "./assets/case4-success.png",
  "./assets/case4-fail.png",
  "./assets/case4-trainer.svg",
  "./assets/case4-vet.svg",
  "./assets/case4-photographer.svg",
  "./assets/case4-zookeeper.svg",
  "./assets/case4-snackkeeper.svg",
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
