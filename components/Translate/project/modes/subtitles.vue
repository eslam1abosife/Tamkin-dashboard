<script lang="ts" setup>

import { useTranslateStore } from "~/stores/translate";
import USa from '/public/assets/imgs/translatevideo/USA.svg'
const translateStore = useTranslateStore()

const languagesArr = [
  {
    id: 1,
    name: 'English (USA)',
    icon: USa
  },
  {
    id: 2,
    name: 'English (USA)',
    icon: USa

  },
  {
    id: 3,
    name: 'English (USA)',
    icon: USa

  },

]
const handleSelectedItemProjectName = (item: any) => {
  console.log(item)
}
const processVideo = ref(false)
const doneVideo = ref(false)
const subMode = ref('main')

const text = ref('It is a long established fact that a reader will be');
const isEditing = ref(false);

const startEditing = () => {
  isEditing.value = true;
};

const stopEditing = () => {
  isEditing.value = false;
};
const changeMode = (mode: any) => {
  translateStore.subMode  = mode
}

</script>

<template>

  <div class="w-2/4 flex flex-col items-start justify-start h-[315px]">
    <div class=" flex items-start w-full justify-between pr-[20px]" v-if="translateStore.currentMode === 'subtitles' && !translateStore.subMode ">
      <div class="text-[#3D3D3D] text-[15px] font-[500]">
        Subtitles
      </div>
      <div class="flex items-start justify-evenly space-x-[15px] ">
        <button class="btn-translate group" @click="changeMode('TranslationStyle')"
          :class="[translateStore.subMode  === 'TranslationStyle' ? 'active' : '']">
          <div>
            <svg width="21" height="19" class="w-[18px] h-[18px]" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
              class="group-hover:stroke-[url(#paint0_linear_6767_85371)]"
                d="M1 2.5H8M8 2.5H12.5M8 2.5V0.5M15 2.5H12.5M12.5 2.5C11.68 5.235 9.961 7.82 8 10.093M8 10.093C6.376 11.974 4.585 13.641 3 15M8 10.093C7 9 5.4 6.8 5 6M8 10.093L11 13M12.5 18.5L13.643 15.5M13.643 15.5L16.5 8L19.357 15.5M13.643 15.5H19.357M20.5 18.5L19.357 15.5"
                :class="[translateStore.subMode  === 'TranslationStyle' ? 'stroke-[url(#paint0_linear_6767_85371)]' : 'stroke-current']"
                stroke-linecap="round" stroke-linejoin="round" />
              <defs>
                <linearGradient id="paint0_linear_6767_85371" x1="10.75" y1="0.5" x2="10.75" y2="18.5"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2DADA3" />
                  <stop offset="1" stop-color="#71DAD2" />
                </linearGradient>
              </defs>
            </svg>



          </div>
          <div class="text"> Translation </div>
        </button>
        <button class="btn-translate group " @click="changeMode('style')"
          :class="[translateStore.currentMode  === 'style' ? 'active' : '']">
          <div>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="group-hover:stroke-[url(#paint1_linear_6797_85282)]"
                d="M1.26579 13.2128L5.79073 8.69597M11.4889 6.68741L10.1344 10.7436C10.1127 10.8086 10.0757 10.8674 10.0265 10.9151C9.97721 10.9628 9.91714 10.998 9.85138 11.0175L1.54807 13.481C1.47326 13.5032 1.3938 13.5045 1.31832 13.4847C1.24284 13.4649 1.17424 13.4249 1.11998 13.3689C1.06573 13.3129 1.0279 13.2431 1.0106 13.1672C0.993314 13.0912 0.997225 13.012 1.02191 12.9381L3.71811 4.86551C3.73743 4.80754 3.76902 4.75441 3.81073 4.70971C3.85244 4.66501 3.9033 4.6298 3.95985 4.60645L7.79013 3.03225C7.868 3.00014 7.95364 2.99178 8.03627 3.0082C8.1189 3.02462 8.19481 3.06509 8.25442 3.12451L11.3858 6.25163C11.4418 6.30754 11.4811 6.37793 11.4993 6.4549C11.5175 6.53187 11.5139 6.61238 11.4889 6.68741Z"
                :class="[translateStore.currentMode  === 'style' ? 'stroke-[url(#paint1_linear_6797_85282)]' : 'stroke-current']"
                stroke-linecap="round" stroke-linejoin="round" />
              <path class="group-hover:stroke-[url(#paint1_linear_6797_85282)]"
                d="M11.5731 6.43703L13.5839 4.42917C13.8505 4.16298 14.0002 3.802 14.0002 3.4256C14.0002 3.0492 13.8505 2.68822 13.5839 2.42203L12.0765 0.915959C11.9445 0.784088 11.7877 0.679478 11.6151 0.608107C11.4425 0.536735 11.2576 0.5 11.0708 0.5C10.884 0.5 10.699 0.536735 10.5265 0.608107C10.3539 0.679478 10.1971 0.784088 10.065 0.915959L8.05428 2.92381M7.29918 7.18935C7.20011 7.09051 7.0825 7.01211 6.95308 6.95863C6.82366 6.90516 6.68496 6.87765 6.54489 6.87769C6.40482 6.87772 6.26612 6.90529 6.13673 6.95883C6.00733 7.01236 5.88977 7.09082 5.79074 7.18971C5.69172 7.2886 5.61318 7.40599 5.55961 7.53517C5.50604 7.66436 5.47848 7.80282 5.47852 7.94264C5.47855 8.08246 5.50617 8.2209 5.5598 8.35006C5.61344 8.47922 5.69203 8.59658 5.7911 8.69542C5.99118 8.89504 6.2625 9.00715 6.54539 9.00709C6.82827 9.00702 7.09955 8.89478 7.29953 8.69506C7.49951 8.49535 7.61183 8.22451 7.61176 7.94213C7.61169 7.65976 7.49925 7.38897 7.29918 7.18935Z"
                :class="[translateStore.currentMode  === 'style' ? 'stroke-[url(#paint1_linear_6797_85282)]' : 'stroke-current']"
                stroke-linecap="round" stroke-linejoin="round" />
              <defs>
                <linearGradient id="paint0_linear_6797_85282" x1="6.25537" y1="3" x2="6.25537" y2="13.4987"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2DADA3" />
                  <stop offset="1" stop-color="#71DAD2" />
                </linearGradient>
                <linearGradient id="paint1_linear_6797_85282" x1="9.73938" y1="0.5" x2="9.73938" y2="9.00709"
                  gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2DADA3" />
                  <stop offset="1" stop-color="#71DAD2" />
                </linearGradient>
              </defs>
            </svg>



          </div>
          <div class="text"> Style </div>
        </button>
      </div>
    </div>
    <div class="w-full scrollable-div " v-if="translateStore.currentMode === 'subtitles' && !translateStore.subMode">
      <div class="mt-[16px] w-full">
        <div class="space-y-2 flex flex-col items-start justify-center">
          <div class="flex items-center justify-between border-b py-2 w-full  pr-[8px]">
            <div class="w-2/4">
              <div v-if="!isEditing" @click="startEditing">
                <p class="text-darkGrey font-[500] text-[12px] leading-[32px]">
                  {{ text }}
                </p>
              </div>
              <div v-else>
                <textarea v-model="text" @blur="stopEditing"
                  class="text-darkGrey  font-[500] text-[12px] leading-[32px] w-full focus:ring-0 focus:outline-none border-0"></textarea>
              </div>
            </div>
            <div class="flex items-center justify-evenly space-x-[20px] ipad-max:w-[45%] w-[40%] 3xl:w-[30%] ">
              <div class="flex flex-col">
                <div class="flex items-center space-x-4">
                  <img src="/assets/imgs/translatevideo/in_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">In</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
                <div class="flex items-center space-x-4">
                  <img src="/assets/imgs/translatevideo/out_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">Out</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
              </div>
              <button
                class="text-red-500 hover:bg-[#FFF3F2] hover:border-[#FACECB] w-[32px] h-[32px] border rounded-lg flex items-center justify-center">
                <img src="/assets/imgs/icons/bin.svg" alt="">
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between border-b py-2 w-full pr-[8px]">
            <div class="w-2/4">
              <p class="text-darkGrey font-[500] text-[12px] leading-[32px]">
                It is a long established fact that a reader will be
              </p>
            </div>
            <div class="flex items-center justify-evenly space-x-[20px] ipad-max:w-[45%] w-[40%] 3xl:w-[30%]  ">
              <div class="flex flex-col ">
                <div class="flex items-center space-x-4">
                  <img src="/assets/imgs/translatevideo/in_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">Out</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
                <div class="flex items-center space-x-4 ">
                  <img src="/assets/imgs/translatevideo/out_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">Out</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
              </div>
              <button
                class="text-red-500 hover:bg-[#FFF3F2] hover:border-[#FACECB]  w-[32px] h-[32px] border rounded-lg flex items-center justify-center">
                <img src="/assets/imgs/icons/bin.svg" alt="">
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between border-b py-2 w-full pr-[8px]">
            <div class="w-2/4">
              <p class="text-darkGrey font-[500] text-[12px] leading-[32px]">
                It is a long established fact that a reader will be
              </p>
            </div>
            <div class="flex items-center justify-evenly space-x-[20px] ipad-max:w-[45%] w-[40%] 3xl:w-[30%]  ">
              <div class="flex flex-col ">
                <div class="flex items-center space-x-4">
                  <img src="/assets/imgs/translatevideo/in_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">Out</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
                <div class="flex items-center space-x-4 ">
                  <img src="/assets/imgs/translatevideo/out_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">Out</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
              </div>
              <button
                class="text-red-500 hover:bg-[#FFF3F2] hover:border-[#FACECB]  w-[32px] h-[32px] border rounded-lg flex items-center justify-center">
                <img src="/assets/imgs/icons/bin.svg" alt="">
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between border-b py-2 w-full pr-[8px]">
            <div class="w-2/4">
              <p class="text-darkGrey font-[500] text-[12px] leading-[32px]">
                It is a long established fact that a reader will be
              </p>
            </div>
            <div class="flex items-center justify-evenly space-x-[20px] ipad-max:w-[45%] w-[40%] 3xl:w-[30%]  ">
              <div class="flex flex-col ">
                <div class="flex items-center space-x-4">
                  <img src="/assets/imgs/translatevideo/in_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">Out</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
                <div class="flex items-center space-x-4 ">
                  <img src="/assets/imgs/translatevideo/out_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">Out</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
              </div>
              <button
                class="text-red-500 hover:bg-[#FFF3F2] hover:border-[#FACECB]  w-[32px] h-[32px] border rounded-lg flex items-center justify-center">
                <img src="/assets/imgs/icons/bin.svg" alt="">
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between border-b py-2 w-full pr-[8px] ">
            <div class="w-2/4">
              <p class="text-darkGrey font-[500] text-[12px] leading-[32px]">
                It is a long established fact that a reader will be
              </p>
            </div>
            <div class="flex items-center justify-evenly space-x-[20px] ipad-max:w-[45%] w-[40%] 3xl:w-[30%]  ">
              <div class="flex flex-col ">
                <div class="flex items-center space-x-4">
                  <img src="/assets/imgs/translatevideo/in_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">Out</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
                <div class="flex items-center space-x-4 ">
                  <img src="/assets/imgs/translatevideo/out_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">Out</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">00:00</span>
                  </div>
                </div>
              </div>
              <button
                class="text-red-500 hover:bg-[#FFF3F2] hover:border-[#FACECB]  w-[32px] h-[32px] border rounded-lg flex items-center justify-center">
                <img src="/assets/imgs/icons/bin.svg" alt="">
              </button>
            </div>
          </div>
          <!-- Repeat the above div for additional rows -->
        </div>
      </div>

    </div>
    <TranslateProjectModesSubtitlesTranslation class="w-full" />
    <TranslateProjectModesSubtitlesStyle class="w-full" />


  </div>

</template>

<style></style>