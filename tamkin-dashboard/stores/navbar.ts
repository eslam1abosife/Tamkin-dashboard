import { defineStore } from "pinia";
import { ref } from "vue";

export const useNavbarStore = defineStore("navbar", () => {
  const sideBarOpen = ref(true);
  const defaultappobj = ref({});
  const loadingdefaultappobj = ref(false);
  const loadingPacks = ref(true);
  const isDark = ref(useColorMode().preference === 'dark' ? true : false);

  const openNav = () => {
    sideBarOpen.value = !sideBarOpen.value;
  };

  return { openNav, sideBarOpen, defaultappobj,loadingPacks, isDark };
});
