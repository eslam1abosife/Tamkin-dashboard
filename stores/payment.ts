import { defineStore, acceptHMRUpdate } from 'pinia';

export const usePaymentStore = defineStore('payment', {
  /**
   * The state of the store is an object with a single property,
   * `showUpgradeState`, which is a boolean indicating whether the
   * upgrade state is shown or not.
   */

  state: () => ({
    stateOfPayment:''

  }),
  actions: {
  
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaymentStore, import.meta.hot));
}
