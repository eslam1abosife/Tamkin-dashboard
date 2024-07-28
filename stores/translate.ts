import { defineStore } from 'pinia';


export const useTranslateStore = defineStore('translate', () => {

 const signLanguageChecked = ref(false)

  return {  signLanguageChecked};
});


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCustomizeStore, import.meta.hot));
  }