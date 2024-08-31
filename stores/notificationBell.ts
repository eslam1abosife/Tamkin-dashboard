import { defineStore, acceptHMRUpdate } from 'pinia';

interface Checkbox {
    name: string;
    value: boolean;
  }



export const useNotificationBellStore = defineStore('billing', {
    state: () => ({
        notification:{},
        notifications:[],
        loadNotifications:false,
    }),


      actions: {

      }


});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNotificationBellStore, import.meta.hot));
}
