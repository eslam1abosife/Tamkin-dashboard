<script lang="ts" setup>

import { useModalManager } from '@/composables/useModalManager';

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const currentMenuDrop = ref()

const changeDropMenu = (menu:any)=>{
    if(currentMenuDrop.value && currentMenuDrop.value === menu){
        currentMenuDrop.value = ''

    }else {
        currentMenuDrop.value = menu

    }
}

</script>
<template>
   <div>

    <div class="flex flex-col items-center space-y-[10px] justify-center mt-[10px] w-full">
    
        <div>
            <img src="/assets/imgs/translatedocs/no_result.png" class="w-[114px] h-[68px]" alt="">
        </div>
        <div class="text-[13px] md:text-[15px] font-[500] text-darkGrey dark:text-white/70 leading-[16px]">
            {{ $t('No results found') }}
        </div>
        <div class="font-[400] text-[10px] leading-[16px] dark:text-white">
            {{ $t(`It seems we can’t find any results based on your search.`) }}
        </div>
                                  
            </div>
     
   </div>
      </template>
      