<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
const isMenuOpen = ref(false)
const clickedOutside = ref(false)

const openLangSwitchMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;

};

const closeoutside = () => {
  isMenuOpen.value = false

}
</script>

<template>
  <div
    class="bg-white h-[34px] w-[110px] rounded-[10px] shadow-md -shadow-y-[1px] flex items-center justify-center relative cursor-pointer" 
    :class="[isMenuOpen ? 'border-[1px] border-tamkin':'']"  @click.prevent="openLangSwitchMenu()"

    v-on-click-outside="()=>{

      closeoutside()
  
  }" 
  >


<div class="flex items-center justify-between rtl:space-x-reverse space-x-[32px]">
    <div v-if="locale ==='en'" class="text-[13px] font-[500] leading-[19px] text-[#585B5B]">
      English
    </div>
   <div v-if="locale ==='ar'" class="text-[13px] font-[500] leading-[19px] text-[#585B5B]">
      Arabic
    </div>

    <svg :class="[isMenuOpen ? 'rotate-180':'']" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.00021 0.500214C0.802463 0.500256 0.609164 0.558928 0.444755 0.668812C0.280345 0.778696 0.152205 0.93486 0.0765352 1.11756C0.000864983 1.30026 -0.0189381 1.50129 0.0196295 1.69524C0.058197 1.8892 0.153402 2.06736 0.293212 2.20721L5.29321 7.20721C5.48074 7.39468 5.73505 7.5 6.00021 7.5C6.26538 7.5 6.51969 7.39468 6.70721 7.20721L11.7072 2.20721C11.847 2.06736 11.9422 1.8892 11.9808 1.69524C12.0194 1.50129 11.9996 1.30026 11.9239 1.11756C11.8482 0.93486 11.7201 0.778696 11.5557 0.668812C11.3913 0.558928 11.198 0.500256 11.0002 0.500214L1.00021 0.500214Z" fill="#A7A7A7"/>
      </svg>
      
</div>


<div v-if="isMenuOpen" class=" absolute bottom-[40px] inset-x-auto drop-shadow-md bg-white rounded-[10px] h-auto w-full flex flex-col items-start justify-start p-[8px]">
  <NuxtLink class="flex items-center justify-center gap-2" v-for="locale in availableLocales" :key="locale.code" 
  :to="switchLocalePath(locale.code)">
 
    <div class=" font-[500] text-[10px] leading-[24px]">
  {{ locale.name }}
</div>


  </NuxtLink>
</div>

</div>
</template>
