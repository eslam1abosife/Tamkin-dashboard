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
    class="bg-[#EFF1F6] h-[40px] w-[40px] rounded-full flex items-center justify-center relative cursor-pointer" 
    :class="[isMenuOpen ? 'border-[1px] border-tamkin':'']"  @click.prevent="openLangSwitchMenu()"

    v-on-click-outside="()=>{

      closeoutside()
  
  }" 
  >


<div class="">
    <img src="/imgs/usaflag.png" class="w-[20px] h-[16px]" v-if="locale ==='en'" alt="">
    <img src="/imgs/sa.svg" class="w-[20px] h-[16px]" v-if="locale ==='ar'" alt="">
</div>


<div v-if="isMenuOpen" class=" absolute top-[50px] right-0 drop-shadow-sm bg-white rounded-[10px] h-auto w-[128px] flex flex-col items-start justify-start p-[8px]">
  <NuxtLink class="flex items-center justify-center gap-2" v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
    <div class="rounded-full">
      <img src="/imgs/usaflag.png" class="w-[20px] h-[16px]" v-if="locale.code ==='en'" alt="">
    <img src="/imgs/sa.svg" class="w-[20px] h-[16px]" v-if="locale.code ==='ar'" alt="">
    </div>
    <div class=" font-[500] text-[10px] leading-[24px]">
  {{ locale.name }}
</div>


  </NuxtLink>
</div>

</div>
</template>
