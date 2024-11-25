<script lang="ts" setup>

import { useModalManager } from '@/composables/useModalManager';
const props = defineProps({
  plan:String
})
const translateStore = useTranslateStore()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();

const userconsume = computed(() => {
  const { media } = translateStore.usedCredit;
  const { package: pkg, extre } = translateStore.statsPackage.total.media;

  if (media) {
    return (
      translateStore.usedCredit.media.video_words + extre.media_words === pkg.video_words && 
      translateStore.usedCredit.media.audio_words+ extre.media_words === pkg.aduio_words  &&
      translateStore.usedCredit.media.audio_minutes + extre.media_minutes === pkg.aduio_minutes && 
      translateStore.usedCredit.media.live_transaction_media + extre.media_minutes  === pkg.live_transaction_media && 
      translateStore.usedCredit.media.video_minutes+ extre.media_minutes  === pkg.video_minutes 
    );
  } else {
    return false;
  }
});
</script>

<template>

        <div v-if="!translateStore.loadingPackage" class="bg-white dark:bg-tamkinDarkPrimary rounded-[13px] h-auto flex p-[16px] justify-evenly w-full
         mt-[16px] flex-wrap">
          <div class="flex items-center justify-center lg:justify-evenly w-full lg:flex-nowrap
           ipad-max:flex-wrap  flex-wrap ipad-max:rtl:space-x-reverse lg:rtl:space-x-reverse space-x-[16px] 
          space-y-[14px] lg:space-y-0">
            <!-- Translate Live Video -->
            <div class="rounded-[10px] border-[1px] bg-[#F6F8FD] dark:bg-[#303E56] h-auto dark:border-[#3333]
             border-[#E6E8EC] flex-grow px-4 py-2 flex items-center">
              <div class="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                <div class="flex flex-col items-start justify-center">
                  <div class="flex items-center justify-center bg-white dark:bg-darkSecondary rounded-[10px] w-[40px] h-[40px]">
                    <img src="/assets/imgs/translatevideo/play.svg" class="w-[30px] h-[30px]" alt="">
                  </div>
                  
                  <h2 class="text-[14px] font-[600] leading-[21px] text-[#3D3D3D] dark:text-whiteTamkin mt-2">{{$t('Translate video')}}</h2>
                  <p class="text-[12px] font-[500] text-[#6D6D6D] dark:text-whiteTamkin leading-[16px] mt-1">{{$t(`Upload your video or share the link, and we'll translate it`)}}</p>
                  <button class="btn-action-translate mt-4" @click="()=>{userconsume? openModal('upgradeTranslatePackage', 'translate') :openModal('translate_video', 'translate')}">{{$t('Translate Now')}}</button>
                </div>
                <img src="/assets/imgs/translatevideo/girl_desk.png" class="w-[100px] h-[100px] lg:ml-[35px] mt-4 lg:mt-0" alt="">
              </div>
            </div>
      
            <!-- Translate Audio -->
            <div class=" rounded-[10px] border-[1px] bg-[#F6F8FD] dark:bg-darkSecondary h-auto 
            dark:border-[#3333] border-[#E6E8EC] flex-grow px-4 py-2 flex items-center ipad-max:!mt-[14px]">
              <div class="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                <div class="flex flex-col items-start justify-center">
                    <div class="flex items-center justify-center bg-white dark:bg-darkSecondary rounded-[10px] w-[40px] h-[40px]">
                        <img src="/assets/imgs/translatevideo/audio.svg" class="w-[30px] h-[30px]" alt="">
                      </div>
                  <h2 class="text-[14px] font-[600] leading-[21px] text-[#3D3D3D] dark:text-whiteTamkin mt-2">{{$t('Translate Audio')}}</h2>
                  <p class="text-[12px] font-[500] text-[#6D6D6D] dark:text-whiteTamkin leading-[16px] mt-1">{{$t(`Upload your audio or share the link, and we'll translate it`)}}</p>
                  <button class="btn-action-translate mt-4" @click="()=>{userconsume? openModal('upgradeTranslatePackage', 'translate') :openModal('translate_audio', 'translate')}">{{$t('Translate Now')}}</button>
                </div>
                <img src="/assets/imgs/translatevideo/guy_laptop.png" class="w-[100px] h-[100px] lg:ml-[35px] mt-4 lg:mt-0" alt="">
              </div>
            </div>
          </div>
      
          <!-- Translate Live Video with Banner -->
          <div class="rounded-[10px] border-[1px] bg-[#F6F8FD] dark:bg-darkSecondary h-auto dark:border-[#3333]
           border-[#E6E8EC] flex-grow mt-[14px] px-4 py-2 flex items-center">
            <div class="flex flex-col lg:flex-row items-center lg:justify-between w-full">
              <div class="flex flex-col items-start justify-start">
                <div class="flex items-center justify-center bg-white dark:bg-darkSecondary rounded-[10px] w-[40px] h-[40px]">
                    <img src="/assets/imgs/translatevideo/live.svg" class="w-[30px] h-[30px]" alt="">
                  </div>
                <h2 class="text-[14px] font-[600] leading-[21px] text-[#3D3D3D] dark:text-whiteTamkin mt-2">{{$t('Translate live video')}}</h2>
                <p class="text-[12px] font-[500] text-[#6D6D6D] dark:text-whiteTamkin leading-[16px] mt-1">{{$t(`Put your live video link, and we'll translate it for you`)}}</p>
                <button class="btn-action-translate mt-4" @click="()=>{userconsume? openModal('upgradeTranslatePackage', 'translate') : openModal('translate_live_video', 'translate')}">{{$t('Translate Now')}}</button>
                <!-- upgradeTranslatePackage -->
              </div>
              <div class="flex items-center ipad-max:rtl:space-x-reverse space-x-[0] lg:rtl:space-x-reverse space-x-[35px] mt-4 lg:mt-0">
                <img src="/assets/imgs/translatevideo/live_video_banner.png" class="w-full  h-[50px] ipad-max:w-11/12 
                lg:w-full lg:h-[100px]" alt="">
                <img src="/assets/imgs/translatevideo/social_icons.png" class="w-[36px] h-[120px] " alt="">
              </div>
            </div>
          </div>
        </div>
        <div v-else class="bg-white dark:bg-tamkinDarkPrimary rounded-[13px] h-auto flex p-[16px] justify-evenly w-full mt-[16px] flex-wrap">
          <div class="flex items-center justify-center lg:justify-evenly w-full lg:flex-nowrap ipad-max:flex-wrap flex-wrap ipad-max:rtl:space-x-reverse lg:rtl:space-x-reverse space-x-[16px] space-y-[14px] lg:space-y-0">
            
            <!-- Translate Live Video Skeleton -->
            <div class="rounded-[10px] border-[1px] bg-[#F6F8FD] dark:bg-[#303E56] h-auto dark:border-[#3333] border-[#E6E8EC] flex-grow px-4 py-2 flex items-center animate-pulse">
              <div class="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                <div class="flex flex-col items-start justify-center">
                  <div class="flex items-center justify-center bg-white dark:bg-darkSecondary rounded-[10px] w-[40px] h-[40px]"></div>
                  <h2 class="w-[80px] h-[16px] bg-gray-300 dark:bg-gray-600 rounded mt-2"></h2>
                  <p class="w-[150px] h-[12px] bg-gray-300 dark:bg-gray-600 rounded mt-1"></p>
                  <div class="w-[80px] h-[30px] bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
                </div>
                <div class="w-[100px] h-[100px] bg-gray-300 dark:bg-gray-600 rounded-lg mt-4 lg:mt-0"></div>
              </div>
            </div>
        
            <!-- Translate Audio Skeleton -->
            <div class="rounded-[10px] border-[1px] bg-[#F6F8FD] dark:bg-darkSecondary h-auto dark:border-[#3333] border-[#E6E8EC] flex-grow px-4 py-2 flex items-center animate-pulse ipad-max:!mt-[14px]">
              <div class="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                <div class="flex flex-col items-start justify-center">
                  <div class="flex items-center justify-center bg-white dark:bg-darkSecondary rounded-[10px] w-[40px] h-[40px]"></div>
                  <h2 class="w-[80px] h-[16px] bg-gray-300 dark:bg-gray-600 rounded mt-2"></h2>
                  <p class="w-[150px] h-[12px] bg-gray-300 dark:bg-gray-600 rounded mt-1"></p>
                  <div class="w-[80px] h-[30px] bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
                </div>
                <div class="w-[100px] h-[100px] bg-gray-300 dark:bg-gray-600 rounded-lg mt-4 lg:mt-0"></div>
              </div>
            </div>
          </div>
        
          <!-- Translate Live Video with Banner Skeleton -->
          <div class="rounded-[10px] border-[1px] bg-[#F6F8FD] dark:bg-darkSecondary h-auto dark:border-[#3333] border-[#E6E8EC] flex-grow mt-[14px] px-4 py-2 flex items-center animate-pulse">
            <div class="flex flex-col lg:flex-row items-center lg:justify-between w-full">
              <div class="flex flex-col items-start justify-start">
                <div class="flex items-center justify-center bg-white dark:bg-darkSecondary rounded-[10px] w-[40px] h-[40px]"></div>
                <h2 class="w-[80px] h-[16px] bg-gray-300 dark:bg-gray-600 rounded mt-2"></h2>
                <p class="w-[150px] h-[12px] bg-gray-300 dark:bg-gray-600 rounded mt-1"></p>
                <div class="w-[80px] h-[30px] bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
              </div>
              <div class="flex items-center ipad-max:rtl:space-x-reverse space-x-[0] lg:rtl:space-x-reverse space-x-[35px] mt-4 lg:mt-0">
                <div class="w-full h-[50px] ipad-max:w-11/12 lg:w-full lg:h-[100px] bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
                <div class="w-[36px] h-[120px] bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        
  </template>
  