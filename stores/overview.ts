import { defineStore, acceptHMRUpdate } from 'pinia';

export const useOverviewStore = defineStore('overview', {
  state: () => ({
    showUpgradeState:false

  }),
  actions: {
    switchState(){
        this.showUpgradeState = !this.showUpgradeState
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAddonStore, import.meta.hot));
}
