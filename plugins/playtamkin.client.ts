import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {

   const runtimeScript = document.querySelector('script[src^="https://cdn.tamkin.app/runtime.js"]');
    const appScript = document.querySelector('script[src^="https://cdn.tamkin.app/app.js"]');

    if (runtimeScript) runtimeScript.remove();
    if (appScript) appScript.remove();

    const newRuntimeScript = document.createElement("script");
    newRuntimeScript.src = "https://cdn.tamkin.app/runtime.js";
    newRuntimeScript.async = true;
    document.body.appendChild(newRuntimeScript);

    const newAppScript = document.createElement("script");
    newAppScript.src = "https://cdn.tamkin.app/app.js";
    newAppScript.async = true;
    document.body.appendChild(newAppScript);

});
