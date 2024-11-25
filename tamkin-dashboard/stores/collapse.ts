import { defineStore, acceptHMRUpdate } from 'pinia';

export const useCollapseStore = defineStore('collapse', {
  state: () => ({
    collapses: [] as string[], // Specify type for better TypeScript support
    menus: [] as string[], // Specify type for better TypeScript support
  }),
  actions: {
    collapseMenu(menuName: string) {
      if (this.menus.includes(menuName)) {
        this.menus = this.menus.filter(menu => menu !== menuName);
      } else {
        this.menus.push(menuName);
      }
    },
    collapseCard(cardName: string) {
      if (this.collapses.includes(cardName)) {
        this.collapses = this.collapses.filter(card => card !== cardName);
      } else {
        this.collapses.push(cardName);
      }
    },
    removeCard(cardName: string) {
      this.collapses = this.collapses.filter(card => card !== cardName);
    },
    removeMenu(menuName: string) {
      this.menus = this.menus.filter(menu => menu !== menuName);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCollapseStore, import.meta.hot));
}
