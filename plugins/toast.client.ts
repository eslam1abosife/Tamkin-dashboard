import { createApp, h } from 'vue';
import Toast from '@/components/Dashboard/Toast/Success.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('toast', (message, options = {}) => {
    const { t } = nuxtApp.$i18n; // Get the translation function

    const translatedMessage = t(message); // Translate the message

    const toastApp = createApp({
      render() {
        return h(Toast, {
          message: translatedMessage, // Pass the translated message
          hideIn: options.hideIn || 3000, 
          type:options.type || 'success',
        });
      }
    });

    const mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
    toastApp.mount(mountPoint);

    setTimeout(() => {
      toastApp.unmount();
      document.body.removeChild(mountPoint);
    }, options.hideIn || 3000 + 500); 
  });
});
