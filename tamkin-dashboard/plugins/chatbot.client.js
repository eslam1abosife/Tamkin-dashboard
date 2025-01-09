export default defineNuxtPlugin((nuxtApp) => {
    // if (process.client) {
    //   const BASE_URL = 'https://chat.tamkin.app';
  
    //   const initializeChatwoot = () => {
    //     const userLanguage = nuxtApp.$i18n.locale.value;
  
    //     // Clear existing Chatwoot instances
    //     const existingScript = document.querySelector('script[src*="/packs/js/sdk.js"]');
    //     if (existingScript) {
    //       existingScript.parentNode.removeChild(existingScript);
    //     }
  
    
  
    //     // Update Chatwoot settings
    //     window.chatwootSettings = {
    //       hideMessageBubble: true,
    //       showUnreadMessagesDialog: false,
    //       position: userLanguage === 'ar' ? 'left' : 'right',
    //       locale: userLanguage,
    //       useBrowserLanguage: false,
    //       type: 'standard',
    //       showPopoutButton: true,
    //     };
  
    //     // Load the Chatwoot SDK script
    //     (function(d, t) {
    //       const g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    //       g.src = BASE_URL + '/packs/js/sdk.js';
    //       g.defer = true;
    //       g.async = true;
    //       s.parentNode.insertBefore(g, s);
    //       g.onload = function() {
    //         if (window.chatwootSDK) {
    //           window.chatwootSDK.run({
    //             websiteToken: 'qM3zrPHquyCKhrRs5Nj6XYVR',
    //             baseUrl: BASE_URL
    //           });
  
    //           // Listen for chatwoot:ready event
        
    //             if (window.$chatwoot) {
    //               window.$chatwoot.toggleBubbleVisibility('hide');
    //             }
         
    //         }
    //       };
    //     })(document, 'script');
    //   };
  
    //   // Initialize Chatwoot on plugin load
    //   initializeChatwoot();
  
    //   // Provide the reinitialize function to the app
    //   nuxtApp.provide('reinitializeChatwoot', initializeChatwoot);
  

    // }
  });
  