import { defineStore, acceptHMRUpdate } from 'pinia';

interface Checkbox {
    name: string;
    value: boolean;
  }



export const useBillingStore = defineStore('billing', {
    state: () => ({
        card:{},
        cards:[]
      }),


      actions: {

      }


});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBillingStore, import.meta.hot));
}
