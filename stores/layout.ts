import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    currentLayout: ''
  }),
  actions: {
    setLayout(name: string) {
      this.currentLayout = name
    }
  }
})
