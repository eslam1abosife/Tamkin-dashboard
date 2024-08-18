import { createApp, h } from 'vue';
import Toast from '@/components/Dashboard/Toast/Success.vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('toast', (message, options = {}) => {
    const toastApp = createApp({
      render() {
        return h(Toast, {
          message,
          hideIn: options.hideIn || 3000, 
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
