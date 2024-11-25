import { defineStore, acceptHMRUpdate } from 'pinia';

interface Checkbox {
    name: string;
    value: boolean;
  }



export const useInvoicesStore = defineStore('invoices', {
    state: () => ({
        invoice:{},
        invoices:[],
        pdfLink :null,
        loadCards:false
      }),


      actions: {

      }


});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInvoicesStore, import.meta.hot));
}
