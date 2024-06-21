

import { defineStore, acceptHMRUpdate } from 'pinia'


export const useModalStore = defineStore('modal', {
  state: () => ({
    showShareModal:false
  }),
  actions: {
    openShareModal(){
        this.showShareModal = !this.showShareModal
    }

  },
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}