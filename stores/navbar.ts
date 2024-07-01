import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNavbarStore = defineStore('navbar', () => {
  const sideBarOpen = ref(true);

  const openNav = () => {
    sideBarOpen.value = !sideBarOpen.value;
  };

  return { openNav, sideBarOpen };
});
