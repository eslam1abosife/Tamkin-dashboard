import { defineNuxtPlugin } from "#app";
import { ref } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
//   // Create a reactive reference
//   const scriptsLoaded = ref(false);

//   // Function to load a script and return a promise
//   const loadScript = (src) => {
//     return new Promise((resolve, reject) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.async = true;

//       script.onload = () => resolve(script);
//       script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

//       document.body.appendChild(script);
//     });
//   };

//   // Remove existing scripts if necessary
//   const runtimeScript = document.querySelector('script[src^="https://cdn.tamkin.app/runtime.js"]');
//   const appScript = document.querySelector('script[src^="https://cdn.tamkin.app/app.js"]');
//   if (runtimeScript) runtimeScript.remove();
//   if (appScript) appScript.remove();

//   // Load scripts and set the flag when done
//   Promise.all([
//     loadScript("https://cdn.tamkin.app/runtime.js"),
//     loadScript("https://cdn.tamkin.app/app.js"),
//   ])
//     .then(() => {
//       console.log("Scripts loaded.");
//       scriptsLoaded.value = true; // Set the flag to true after loading
//     })
//     .catch((error) => {
//       console.error("Error loading scripts:", error);
//     });

//   // Provide the flag globally
//   nuxtApp.provide('scriptsLoaded', scriptsLoaded);
});
