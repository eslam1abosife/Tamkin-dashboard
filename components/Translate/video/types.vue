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
</script>

<template>

        <div class="bg-white dark:bg-tamkinDarkPrimary rounded-[13px] h-auto flex p-[16px] justify-evenly w-full
         mt-[24px] flex-wrap">
          <div class="flex items-center justify-center lg:justify-evenly w-full lg:flex-nowrap ipad-max:flex-wrap flex-wrap ipad-max:space-x-[0] lg:space-x-[16px] 
          space-y-[14px] lg:space-y-0">
            <!-- Translate Live Video -->
            <div class="rounded-[10px] border-[1px] bg-[#F6F8FD] dark:bg-[#303E56] h-auto dark:border-[#3333]
             border-[#E6E8EC] flex-grow p-4 flex items-center">
              <div class="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                <div class="flex flex-col items-start justify-center">
                  <div class="flex items-center justify-center bg-white dark:bg-darkSecondary rounded-[10px] w-[40px] h-[40px]">
                    <img src="/assets/imgs/translatevideo/play.svg" class="w-[30px] h-[30px]" alt="">
                  </div>
                  <h2 class="text-[14px] font-[600] leading-[21px] text-[#3D3D3D] dark:text-whiteTamkin mt-2">Translate live video</h2>
                  <p class="text-[12px] font-[500] text-[#6D6D6D] dark:text-whiteTamkin leading-[16px] mt-1">Put your live video link, and we'll translate it for you</p>
                  <button class="btn-action-translate mt-4" @click="openModal('translate_video', 'translate')">Translate Now</button>
                </div>
                <img src="/assets/imgs/translatevideo/girl_desk.png" class="w-[100px] h-[100px] lg:ml-[35px] mt-4 lg:mt-0" alt="">
              </div>
            </div>
      
            <!-- Translate Audio -->
            <div class=" rounded-[10px] border-[1px] bg-[#F6F8FD] dark:bg-darkSecondary h-auto 
            dark:border-[#3333] border-[#E6E8EC] flex-grow p-4 flex items-center ipad-max:!mt-[14px]">
              <div class="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                <div class="flex flex-col items-start justify-center">
                    <div class="flex items-center justify-center bg-white dark:bg-darkSecondary rounded-[10px] w-[40px] h-[40px]">
                        <img src="/assets/imgs/translatevideo/audio.svg" class="w-[30px] h-[30px]" alt="">
                      </div>
                  <h2 class="text-[14px] font-[600] leading-[21px] text-[#3D3D3D] dark:text-whiteTamkin mt-2">Translate Audio</h2>
                  <p class="text-[12px] font-[500] text-[#6D6D6D] dark:text-whiteTamkin leading-[16px] mt-1">Upload Audio or post Audio link, and we’ll translate it</p>
                  <button class="btn-action-translate mt-4" @click="openModal('translate_audio', 'translate')">Translate Now</button>
                </div>
                <img src="/assets/imgs/translatevideo/guy_laptop.png" class="w-[100px] h-[100px] lg:ml-[35px] mt-4 lg:mt-0" alt="">
              </div>
            </div>
          </div>
      
          <!-- Translate Live Video with Banner -->
          <div class="rounded-[10px] border-[1px] bg-[#F6F8FD] dark:bg-darkSecondary h-auto dark:border-[#3333]
           border-[#E6E8EC] flex-grow mt-[14px] p-4 flex items-center">
            <div class="flex flex-col lg:flex-row items-center lg:justify-between w-full">
              <div class="flex flex-col items-start justify-start">
                <div class="flex items-center justify-center bg-white dark:bg-darkSecondary rounded-[10px] w-[40px] h-[40px]">
                    <img src="/assets/imgs/translatevideo/live.svg" class="w-[30px] h-[30px]" alt="">
                  </div>
                <h2 class="text-[14px] font-[600] leading-[21px] text-[#3D3D3D] dark:text-whiteTamkin mt-2">Translate live video</h2>
                <p class="text-[12px] font-[500] text-[#6D6D6D] dark:text-whiteTamkin leading-[16px] mt-1">Put your live video link, and we'll translate it for you</p>
                <button class="btn-action-translate mt-4" @click="openModal('upgradeTranslatePackage', 'translate')">Translate Now</button>
              </div>
              <div class="flex items-start ipad-max:space-x-[0] lg:space-x-[35px] mt-4 lg:mt-0">
                <img src="/assets/imgs/translatevideo/live_video_banner.png" class="w-full  h-[100px] ipad-max:w-11/12 
                lg:w-full lg:h-full" alt="">
                <img src="/assets/imgs/translatevideo/social_icons.png" class="w-[36px] h-full ipad-max:h-full lg:h-full" alt="">
              </div>
            </div>
          </div>
        </div>
  </template>
  