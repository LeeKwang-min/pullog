if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/TAnxjfrbgz1xzoAzmOIqT/_buildManifest.js",revision:"a0ae24e7f29dd3809ab75b5dd91a79dc"},{url:"/_next/static/TAnxjfrbgz1xzoAzmOIqT/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/190-be5eb3601f577489.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/193-6f8e6cc0792bbd43.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/228-10fbb1f86e631778.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/35.03ae917f238a8966.js",revision:"03ae917f238a8966"},{url:"/_next/static/chunks/467-ca446ed625985a1f.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/479-df7be8ce3709a760.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/776-129f0224f6ebf093.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/ad2866b8-abe348347acfde4a.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/(dashboard)/layout-0773cee73faefcfe.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/(dashboard)/loading-963664e72235e546.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/(dashboard)/page-54b4c68db31c6691.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/_not-found/page-c08d4c89d3327fe9.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/calendar/layout-5aa045575db4f6b8.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/calendar/page-b23b420408c37c5d.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/layout-3bf80fa709cca78c.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/log/layout-f55d3e2034c3313f.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/log/page-4edacd9dbb439c00.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/login/layout-179bb412f0fd3d99.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/app/login/page-e03f39f3629b3174.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/fd9d1056-0da1f3543ee65a34.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/main-app-401a331392e5c7e0.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/main-ce6e0b3b766cce3d.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/pages/_app-037b5d058bd9a820.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/pages/_error-6ae619510b1539d6.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-b31b6b01d8504699.js",revision:"TAnxjfrbgz1xzoAzmOIqT"},{url:"/_next/static/css/bc8ab40b36ed7b80.css",revision:"bc8ab40b36ed7b80"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/pullog_logo.4d549cc5.jpeg",revision:"0326c5e338f333ec058cd88389a9cc2b"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
