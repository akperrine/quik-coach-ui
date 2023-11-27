// const staticCacheName = "site-static-v1";
// const dynamicCache = "site-dynamic-v1";
// const assets = [
//   "/",
//   "index.html",
//   "/pages/fallback.html",
//   "/js/app.js",
//   "/js/materialize.min.js",
//   "/css/styles.css",
//   "/css/materialize.min.css",
//   "https://fonts.googleapis.com/icon?family=Material+Icons",
// ];

// // cache size limit function
// const limitCacheSize = (cacheName, size) => {
//   caches.open(cacheName).then((cache) => {
//     cache.keys().then((keys) => {
//       console.log(keys.length);
//       if (keys.length > size) {
//         console.log("hi ", keys.length, keys[0]);
//         cache.delete(keys[0]).then(limitCacheSize(cacheName, size));
//       }
//     });
//   });
// };

// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches
//       .open(staticCacheName)
//       .then((cache) => {
//         return cache.addAll(assets);
//       })
//       .catch((err) => console.log(err))
//   );
// });

// // activate service worker
// self.addEventListener("activate", (e) => {
//   e.waitUntil(
//     caches.keys().then((keys) => {
//       console.log(keys); //
//       return Promise.all(
//         keys
//           .filter((key) => key !== staticCacheName && key !== dynamicCache)
//           .map((key) => caches.delete(key))
//       );
//     })
//   );
// });

// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches
//       .match(e.request)
//       .then((cacheRes) => {
//         return (
//           cacheRes ||
//           fetch(e.request).then((fetchRes) => {
//             return caches.open(dynamicCache).then((cache) => {
//               cache.put(e.request.url, fetchRes.clone());
//               limitCacheSize(dynamicCache, 10);
//               return fetchRes;
//             });
//           })
//         );
//       })
//       .catch(() => {
//         if (e.request.url.indexOf(".html") > -1) {
//           return caches.match("/pages/fallback.html");
//         }
//       })
//   );
// });
