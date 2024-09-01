import { defineStore, acceptHMRUpdate } from 'pinia';




export const usePackgesStore = defineStore('packages', {
    state: () => ({
    currentTab:'webplugins'
    }),


      actions: {
        changeTab(tab){
            this.currentTab = tab
        }
      }


});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBillingStore, import.meta.hot));
}
