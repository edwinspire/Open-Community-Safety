!function(s){var e={};function n(o){if(e[o])return e[o].exports;var t=e[o]={i:o,l:!1,exports:{}};return s[o].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=s,n.c=e,n.d=function(s,e,o){n.o(s,e)||Object.defineProperty(s,e,{enumerable:!0,get:o})},n.r=function(s){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},n.t=function(s,e){if(1&e&&(s=n(s)),8&e)return s;if(4&e&&"object"==typeof s&&s&&s.__esModule)return s;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:s}),2&e&&"string"!=typeof s)for(var t in s)n.d(o,t,function(e){return s[e]}.bind(null,t));return o},n.n=function(s){var e=s&&s.__esModule?function(){return s.default}:function(){return s};return n.d(e,"a",e),e},n.o=function(s,e){return Object.prototype.hasOwnProperty.call(s,e)},n.p="",n(n.s=0)}([function(s,e,n){"use strict";n.r(e);const o=["client/16cf82f24dc0356ed5aa/about.2.js","client/16cf82f24dc0356ed5aa/home.3.js","client/16cf82f24dc0356ed5aa/home~pgAPI~scheduled_tasks_main.0.js","client/16cf82f24dc0356ed5aa/index.4.js","client/16cf82f24dc0356ed5aa/main.js","client/16cf82f24dc0356ed5aa/pgAPI.6.js","client/16cf82f24dc0356ed5aa/scheduled_tasks_main.7.js","client/16cf82f24dc0356ed5aa/vendors~home~pgAPI~scheduled_tasks_main.1.js"].concat(["service-worker-index.html","_manifest.json","css/bulma/bulma.min.css","css/fontawesome/css/all.css","css/fontawesome/css/all.min.css","css/fontawesome/css/brands.css","css/fontawesome/css/brands.min.css","css/fontawesome/css/fontawesome.css","css/fontawesome/css/fontawesome.min.css","css/fontawesome/css/regular.css","css/fontawesome/css/regular.min.css","css/fontawesome/css/solid.css","css/fontawesome/css/solid.min.css","css/fontawesome/css/svg-with-js.css","css/fontawesome/css/svg-with-js.min.css","css/fontawesome/css/v4-shims.css","css/fontawesome/css/v4-shims.min.css","css/fontawesome/webfonts/fa-brands-400.eot","css/fontawesome/webfonts/fa-brands-400.svg","css/fontawesome/webfonts/fa-brands-400.ttf","css/fontawesome/webfonts/fa-brands-400.woff","css/fontawesome/webfonts/fa-brands-400.woff2","css/fontawesome/webfonts/fa-regular-400.eot","css/fontawesome/webfonts/fa-regular-400.svg","css/fontawesome/webfonts/fa-regular-400.ttf","css/fontawesome/webfonts/fa-regular-400.woff","css/fontawesome/webfonts/fa-regular-400.woff2","css/fontawesome/webfonts/fa-solid-900.eot","css/fontawesome/webfonts/fa-solid-900.svg","css/fontawesome/webfonts/fa-solid-900.ttf","css/fontawesome/webfonts/fa-solid-900.woff","css/fontawesome/webfonts/fa-solid-900.woff2","favicon (1).png","favicon.png","global.css","icons/icon-128x128.png","icons/icon-144x144.png","icons/icon-152x152.png","icons/icon-192x192.png","icons/icon-384x384.png","icons/icon-512x512.png","icons/icon-72x72.png","icons/icon-96x96.png","img/icon.png","logo.ico","logo.png","logo.svg","manifest.json","test.html"]),t=new Set(o);self.addEventListener("push",s=>{const e=s.data.json();console.log(e,self),self.registration.showNotification(e.title,{body:e.message})}),self.addEventListener("install",s=>{s.waitUntil(caches.open("cache1624427583588").then(s=>s.addAll(o)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",s=>{s.waitUntil(caches.keys().then(async s=>{for(const e of s)"cache1624427583588"!==e&&await caches.delete(e);self.clients.claim()}))}),self.addEventListener("fetch",s=>{if("GET"!==s.request.method||s.request.headers.has("range"))return;const e=new URL(s.request.url);e.protocol.startsWith("http")&&(e.hostname===self.location.hostname&&e.port!==self.location.port||(e.host===self.location.host&&t.has(e.pathname)?s.respondWith(caches.match(s.request)):"only-if-cached"!==s.request.cache&&s.respondWith(caches.open("offline1624427583588").then(async e=>{try{const n=await fetch(s.request);return e.put(s.request,n.clone()),n}catch(n){const o=await e.match(s.request);if(o)return o;throw n}}))))})}]);