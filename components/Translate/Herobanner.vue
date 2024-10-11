<template>
  <div
    class="rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#B9EFEB] to-[#FAFEFE] dark:to-darkTamkin h-[240px] w-full rounded-[22px] px-[15px] 
    relative flex items-center justify-between mt-[16px]"
  >
    <div class="absolute rtl:left-0 ltr:right-0 top-[10px] rtl:ml-[10px] ltr:mr-[10px] h-[180px]">
      <img src="/assets/imgs/translatevideo/flags.png" class="h-[180px]" alt="" />
    </div>
    <div class="flex flex-col items-start justify-center max-w-[450px] w-full">
      <div v-html="$t('We provide seamless and efficient')"></div>
      <!-- <div class="text-[16px] lg:text-[20px] font-[600] leading-[34px] text-darkGrey dark:text-whiteTamkin">
        We provide seamless and efficient <br />
        <span
          class="bg-gradient-to-r from-[#2DB9B0] via-[#6C3FFA] to-[#F542F8] bg-clip-text text-transparent"
          >sign language translations</span
        >
        for <br />
        a smooth experience
      </div> -->
      <div class="flex items-center justify-evenly mt-[32px] rtl:space-x-reverse space-x-[20px]">
        <div>
          <img
            src="/assets/imgs/translatevideo/video_btn.svg"
            class="w-[50px] h-[50px]"
            alt=""
          />
        </div>
        <div>
          <img
            src="/assets/imgs/translatevideo/audio_btn.svg"
            class="w-[50px] h-[50px]"
            alt=""
          />
        </div>
        <div>
          <img
            src="/assets/imgs/translatevideo/live_btn.svg"
            class="w-[50px] h-[50px]"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center absolute rtl:left-[60px] ltr:right-[260px] ipad-max:right-[260px] ipad-max:top-[30px] lg:right-[360px] top-[30px] lg:top-[10px] mr-[10px] h-[180px] space-y-[5px]">
      <img src="/assets/imgs/translatevideo/asl.png" class="w-[36px] h-[25px] opacity-25" alt="">
      <img src="/assets/imgs/translatevideo/lsf.png" class="w-[36px] h-[25px] opacity-25" alt="">
      <img src="/assets/imgs/translatevideo/lsl.png" class="w-[36px] h-[25px] opacity-25" alt="">
      <img src="/assets/imgs/translatevideo/bsl.png" class="w-[36px] h-[25px] opacity-25" alt="">
    </div>
    <div class="rtl:ml-[50px] ltr:mr-[50px]">
      <img src="/assets/imgs/translatevideo/card1.svg" alt="">
    </div>
  </div>
</template>
