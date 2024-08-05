<script lang="ts" setup>
const prpops = defineProps({
    plan:String
})
import { useModalManager } from '@/composables/useModalManager';

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
</script>

<template>

        <div class=" rounded-[13px] h-auto flex  justify-start space-x-[26px] w-full
         mt-[24px] ">


         <div class="bg-white  rounded-[10px] flex   items-center justify-start  h-[200px]  w-full p-[20px]">
<div class="flex flex-col items-start justify-start space-y-[6px]">
    <div class="flex items-center justify-center h-[60px] w-[60px] dark:bg-tamkinDarkPrimary bg-white rounded-full custom-border rounded-full-border">
        <img src="/assets/imgs/translatephotos/img.png" class="w-[30px] h-[30px]" alt="">
    </div>


<div class="flex flex-col items-start justify-center">
    <div class="text-[15px] font-[600] text-[#3D3D3D] leading-[22px] mb-[8px]">
        Translate  Images
    </div>
    <div class="text-[14px] font-[500] text-[#6D6D6D] leading-[21px] ">
        Easily Translate  Images  for Enhanced Accessibility and Communication
    </div>
    <button class="btn-action-translate mt-[12px]" @click="()=>{plan === 'freetrial_Ex' || 
        plan === 'pro_used' ? openModal('upgradeTranslatePackage', 'photos') : openModal('translate_images', 'photos')}">Translate Now</button>


        </div>
</div>

<div class="ml-auto">
    <img src="/assets/imgs/translatephotos/translate_banner.png"  class="w-[190px] h-[190px]" alt="">
</div>
         </div>

        </div>
  </template>
  