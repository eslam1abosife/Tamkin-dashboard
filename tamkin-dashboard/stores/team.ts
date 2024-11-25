import { defineStore, acceptHMRUpdate } from 'pinia';




export const useTeamStore = defineStore('team', {
    state: () => ({
        maxlimit:0,
       
    }),


      actions: {

      }


});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTeamStore, import.meta.hot));
}
