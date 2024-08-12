<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

import { useCollapseStore } from "@/stores/collapse.js";
import { useSignLangStore } from "@/stores/signlang";
const signLangStore = useSignLangStore();
import draggable from "vuedraggable";

const collapseStore = useCollapseStore();
const { collapseMenu, collapseCard } = collapseStore;
const { menus } = storeToRefs(collapseStore);
const isChecked = (name: string) => {
  const checkbox = signLangStore.checkboxes.find((checkbox) => checkbox.name === name);
  return checkbox ? checkbox.value : false;
};

const toggleCheckbox = (name: string) => {
  signLangStore.toggleCheckbox(name);
};

onBeforeMount(() => {
  ["Contrast", "Background", "Position", "Keyboard"].forEach((name) => {
    signLangStore.addCheckbox(name);
  });
  signLangStore.initializeCheckboxes(["Contrast", "Background", "Position", "Keyboard"]);

  signLangStore.initializeCardsMenu(
    [
      {
        icon: "contrast.png",
        name: "Contrast",
        description:
          "Manage your sign language tools and personalize them to enhance your communication experience.",
        checkboxId: "Contrast",
      },
      {
        icon: "background.png",
        name: "Background",
        description:
          "Manage your sign language tools and personalize them to enhance your communication experience.",
        checkboxId: "Background",
      },
      {
        icon: "position.png",
        name: "Position",
        description:
          "Manage your sign language tools and personalize them to enhance your communication experience.",
        checkboxId: "Position",
      },
      {
        icon: "keyboard.png",
        name: "Keyboard",
        description:
          "Manage your sign language tools and personalize them to enhance your communication experience.",
        checkboxId: "Keyboard",
      },
    ],
    "WebpluginsCards",
    "initialCardsOrder"
  );
});

const getImagePath = (icon) => {
  return new URL(`/public/assets/imgs/signlanguageservices/${icon}`, import.meta.url)
    .href;
};
</script>

<template>
  <div
    class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] xs:px-0 px-[15px] 
    flex items-center justify-center pb-[24px] shadow-md -shadow-y-[1px] relative"
  >

<div class="flex flex-col items-center justify-center p-[100px] space-y-[16px]">
<div>
    <img src="/assets/imgs/signlanguageservices/no_addons.png" class="w-[118px] h-[107px]" alt="">
</div>
<div class="text-[16px] leading-[24px] text-darkGrey font-[400]">
    No data available for this section
</div>
</div>
</div>
</template>
