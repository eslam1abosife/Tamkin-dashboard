import { defineStore, acceptHMRUpdate } from 'pinia';

export const useMarketStore = defineStore('market', {
  state: () => ({

  }),
  actions: {
 
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMarketStore, import.meta.hot));
}
