<script lang="ts" setup>
const prpops = defineProps({
    plan:String
})
import { useModalManager } from '@/composables/useModalManager';
const translateStore = useTranslateStore()
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

        <div v-if="!translateStore.loadingPackage" class=" rounded-[13px] h-auto flex  justify-start space-x-[26px] w-full
         mt-[24px] ">


         <div class="bg-white  rounded-[10px] flex   items-center justify-start  h-[200px]  w-full p-[15px]">
<div class="flex flex-col items-start justify-start space-y-[6px]">
    <div class="flex items-center justify-center h-[60px] w-[60px] dark:bg-tamkinDarkPrimary bg-white rounded-full custom-border rounded-full-border">
        <img src="/assets/imgs/translatephotos/img.png" class="w-[30px] h-[30px]" alt="">
    </div>


<div class="flex flex-col items-start justify-center">
    <div class="text-[15px] font-[600] text-[#3D3D3D] leading-[22px] mb-[8px]">
        {{ $t('Translate Images') }}
    </div>
    <div class="text-[14px] font-[500] text-[#6D6D6D] leading-[21px] ">
        {{ $t('Easily Translate Images for Enhanced Accessibility and Communication') }}
    </div>
    <button class="btn-action-translate mt-[12px] w-2/4" @click="()=>{plan === 'freetrial_Ex' || 
        plan === 'pro_used' ? openModal('upgradeTranslatePackage', 'photos') : openModal('translate_images', 'photos')}">{{$t('Translate Now')}}</button>


        </div>
</div>

<div class="rtl:mr-auto ltr:ml-auto">
    <img src="/assets/imgs/translatephotos/translate_banner.png"  class="w-[190px] h-[190px]" alt="">
</div>
         </div>

        </div>
        <div v-else class="rounded-[13px] h-auto flex justify-start space-x-[26px] w-full mt-[24px]">
            <div class="bg-white rounded-[10px] flex items-center justify-start h-[200px] w-full p-[15px] ">
              
              <div class="flex flex-col items-start justify-start space-y-[6px] animate-pulse">
                <!-- Circular Skeleton for Icon -->
                <div class="flex items-center justify-center h-[60px] w-[60px] bg-gray-300 dark:bg-gray-700 rounded-full ">
                  <!-- Placeholder for Icon Image -->
                </div>
                
                <div class="flex flex-col items-start justify-center mt-[8px] space-y-[6px]">
                  <!-- Skeleton for Title Text -->
                  <div class="h-[22px] w-[150px] bg-gray-300 dark:bg-gray-700 rounded"></div>
                  
                  <!-- Skeleton for Subtitle Text -->
                  <div class="h-[21px] w-[250px] bg-gray-300 dark:bg-gray-700 rounded"></div>
                  
                  <!-- Skeleton for Button -->
                  <div class="h-[40px] w-2/4 bg-gray-300 dark:bg-gray-700 rounded mt-[12px]"></div>
                </div>
              </div>
              
              <!-- Skeleton for Right-Side Banner Image -->
              <div class="rtl:mr-auto ltr:ml-auto">
                <div class="w-[190px] h-[190px] animate-pulse bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
          
          
  </template>
  