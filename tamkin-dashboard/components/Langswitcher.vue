<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
const isMenuOpen = ref(false);
const clickedOutside = ref(false);

const openLangSwitchMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeoutside = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <div
    class="bg-[#EFF1F6] h-[30px] w-[30px] sm:h-[30px] sm:w-[30px] md:h-[35px] md:w-[35px] lg:h-[40px] lg:w-[40px] xl:h-[40px] xl:w-[40px] rounded-full dark:bg-tamkinDarkPrimary border-[1px] dark:border-darkborder dark:text-whiteTamkin flex items-center justify-center relative cursor-pointer"
    :class="[isMenuOpen ? 'border-[1px] border-tamkin' : '']"
    @click.prevent="openLangSwitchMenu()"
    v-on-click-outside="
      () => {
        closeoutside();
      }
    "
  >
    <div
      class="capitalize font-[600] text-darkGrey flex items-center justify-center dark:text-whiteTamkin"
    >
      {{ locale }}
    </div>

    <div
      v-if="isMenuOpen"
      class="absolute dark:bg-tamkinDarkPrimary dark:text-whiteTamkin top-[50px] ltr:left-0 rtl:right-0 drop-shadow-md bg-white rounded-[10px] h-auto w-[128px] flex flex-col items-start justify-start p-[8px]"
    >
      <NuxtLink
        class="flex items-center justify-center gap-2 w-full"
        v-for="locale in availableLocales"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
      >
        <div class="font-[500] text-[12px] leading-[24px]">
          {{ locale.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
