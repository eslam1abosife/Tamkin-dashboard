import { defineStore, acceptHMRUpdate } from 'pinia';
import { useI18n } from 'vue-i18n';
import { ref, computed, watchEffect } from 'vue';

export const useLangSwitch = defineStore('langSwitch', () => {
  // State
  const { locale, locales } = useI18n()  



  // Get the current text direction based on the locale
  const direction = computed(() => {
    return locale.value === 'ar' ? 'rtl' : 'ltr';
  });

  return {
    direction,

  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLangSwitch, import.meta.hot));
}
