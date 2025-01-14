// export default defineNuxtPlugin(() => {
//   if (typeof window !== "undefined") {
//     console.log("Chatwoot script loading...");

//     (function (d, t) {
//       var BASE_URL = "https://chat.tamkin.app";
//       var g = d.createElement(t),
//         s = d.getElementsByTagName(t)[0];
//       g.src = BASE_URL + "/packs/js/sdk.js";
//       g.defer = true;
//       g.async = true;
//       s.parentNode.insertBefore(g, s);
      
//       g.onload = function () {
//         console.log("Chatwoot script loaded");

//         window.chatwootSDK.run({
//           websiteToken: "qM3zrPHquyCKhrRs5Nj6XYVR",
//           baseUrl: BASE_URL,
//         });

//         // Log before adding the event listener
//         // console.log("Registering chatwoot:ready event listener");

//         window.addEventListener("chatwoot:ready", function () {
//         //   console.log("Chatwoot is ready!");
//         //   alert("Chatwoot is ready!");

//           // Further customizations
//           window.$chatwoot.setLocale("en");
//           window.$chatwoot.toggleBubbleVisibility("show");
//           window.$chatwoot.toggle("open");
//         });
//       };
//     })(document, "script");
//   }
// });
