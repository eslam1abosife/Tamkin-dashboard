<script lang="ts" setup>
              import { VTamkinPlayer } from 'tamkin-video-player';
              //      import { VTamkinPlayer } from '../../../tamkin-player/tamkin-video-player.mjs';
              // import '../../../tamkin-player/style.css'
              const videoUrl = ref('/video.mp4'); 
import { useModalManager } from '@/composables/useModalManager';
const {locale} = useI18n()
const translateStore = useTranslateStore()
const {
    isOpen,
    currentView,
    openModal,
    closeModal,
    goBack,
    navigateTo,
} = useModalManager();
const {currentMode} = storeToRefs(translateStore)
const bigpicMode = ref(false)
const playerPosition = ref('inVideo')
const changeMode = (mode: any) => {
    translateStore.currentMode = mode
}
const getPlayerPosition = (p: any) => {
  translateStore.player.playerPosition = p
}


// provide('currentMode', currentMode)
</script>

<template>

  <div   class="bg-white dark:bg-tamkinDarkPrimary flex-col items-start rounded-[13px] h-auto flex p-[15px] justify-start w-full mt-[24px]">
    <div class="flex items-center justify-between w-full">
      <div class="text-darkGrey text-[18px] leading-[27px] font-[500] text-left">
        {{$t('Project Settings')}}
      </div>
      <div class="flex items-center rtl:space-x-reverse space-x-[16px]">
        <button class="btn-translate 5px] group !w-[38px] !h-[30px] !p-2" @click="openModal('moreinfo_translate', 'projectsettings')">
          <svg width="25" height="26" viewBox="0 0 25 26" class="" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_6980_87364)">
              <path d="M13.3182 22C18.7406 22 23.1364 17.7467 23.1364 12.5C23.1364 7.25329 18.7406 3 13.3182 3C7.89575 3 3.5 7.25329 3.5 12.5C3.5 17.7467 7.89575 22 13.3182 22Z" class="stroke-[#878787] group-hover:stroke-[url(#paint0_linear_6980_87364)]" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.5 12H13.25V17.6875H14" class="stroke-[#878787] group-hover:stroke-[url(#paint1_linear_6980_87364)]" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13.625 10.4375C14.2463 10.4375 14.75 9.89185 14.75 9.21875C14.75 8.54565 14.2463 8 13.625 8C13.0037 8 12.5 8.54565 12.5 9.21875C12.5 9.89185 13.0037 10.4375 13.625 10.4375Z" class="fill-current group-hover:fill-[url(#paint2_linear_6980_87364)]" />
            </g>
            <defs>
              <linearGradient id="paint0_linear_6980_87364" x1="13.3182" y1="3" x2="13.3182" y2="22" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
              <linearGradient id="paint1_linear_6980_87364" x1="13.25" y1="12" x2="13.25" y2="17.6875" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
              <linearGradient id="paint2_linear_6980_87364" x1="13.625" y1="8" x2="13.625" y2="10.4375" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
              <clipPath id="clip0_6980_87364">
                <rect width="24" height="26" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <button class="btn-translate 5px] group !w-[38px] !h-[30px] !p-2" @click="openModal('sharetranslate', 'projectsettings')">
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4616 2.85714C12.4616 2.19303 12.6858 1.54964 13.0957 1.0376C13.5056 0.525554 14.0757 0.176843 14.7078 0.0514182C15.3399 -0.0740069 15.9947 0.0316899 16.5595 0.350337C17.1243 0.668984 17.5638 1.18067 17.8025 1.79743C18.0413 2.41419 18.0643 3.09748 17.8676 3.72983C17.6709 4.36219 17.2668 4.90409 16.7248 5.26238C16.1828 5.62067 15.5367 5.77295 14.8977 5.69306C14.2586 5.61316 13.6665 5.30608 13.2231 4.82459L5.45 9.28041C5.56884 9.75189 5.56884 10.2469 5.45 10.7184L13.2231 15.1742C13.6877 14.6703 14.3144 14.3585 14.9858 14.2973C15.6572 14.2361 16.3272 14.4296 16.8703 14.8415C17.4133 15.2535 17.792 15.8557 17.9354 16.5351C18.0789 17.2146 17.9772 17.9247 17.6494 18.5323C17.3217 19.1399 16.7903 19.6034 16.1551 19.8358C15.5198 20.0681 14.8241 20.0535 14.1986 19.7946C13.573 19.5356 13.0604 19.0502 12.757 18.4293C12.4535 17.8084 12.38 17.0946 12.5502 16.4217L4.77708 11.9668C4.39572 12.3811 3.90273 12.6679 3.36179 12.7901C2.82085 12.9124 2.2568 12.8645 1.7425 12.6527C1.22819 12.4409 0.787261 12.0748 0.476645 11.6019C0.16603 11.1289 0 10.5707 0 9.99939C0 9.42809 0.16603 8.8699 0.476645 8.39693C0.787261 7.92395 1.22819 7.55792 1.7425 7.3461C2.2568 7.13429 2.82085 7.08642 3.36179 7.20867C3.90273 7.33093 4.39572 7.6177 4.77708 8.03194L12.5502 3.57613C12.4912 3.34132 12.4614 3.09971 12.4616 2.85714Z" class="fill-current group-hover:fill-[url(#paint0_linear_6806_85150)]"/>
            <defs>
              <linearGradient id="paint0_linear_6806_85150" x1="9" y1="0" x2="9" y2="20" gradientUnits="userSpaceOnUse">
                <stop stop-color="#2DADA3" />
                <stop offset="1" stop-color="#71DAD2" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
    </div>
    <TranslateModalsShare />
    <TranslateModalsMoreinfo />

    <div class="flex flex-row items-start justify-between gap-4 w-full mt-[42px]">
        <LazyTranslateProjectModesTranslation
        
        
        v-show="translateStore.currentMode === 'translation' && !bigpicMode" class="transition-all ease-in-out" key="32322"/>
  

      <LazyTranslateProjectModesSubtitles v-if="translateStore.currentMode === 'subtitles' && !bigpicMode" key="23242"/>

      
      
      <LazyTranslateProjectModesPlayer  key="2113" v-if="!translateStore.loadingProject && translateStore.currentMode === 'player' && !bigpicMode"
       @player-position="getPlayerPosition" />



     
      <div class="h-[315px]" :class="[bigpicMode ? 'w-full' : 'w-2/4']">
        <div class="flex items-start  justify-between">
          <div class="text-[#3D3D3D] text-[15px] font-[500]">
            {{$t('Sign language')}}
          </div>
          <div class="flex items-start justify-evenly rtl:space-x-reverse space-x-[15px]">
            <button class="btn-translate tamkin hover_tamkin  group" 
            @click="changeMode('translation')" :class="[translateStore.currentMode === 'translation' ? 'active_tamkin' : '']">
              <div>
                <svg width="15" class="w-[13px] h-[13px]" height="16" viewBox="0 0 15 16" fill="none" 
                xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 14.5V9.7291C1 7.83114 1 6.88288 1.29171 6.05306C1.70613 4.87225 3.17283 3.61056 4.30962
                   2.87535C5.03688 2.40519 5.7235 2.21814 7.39172 1.71043C7.65744 1.62954 7.78989 1.5891 8.03122
                    1.54938C8.27174 1.50966 8.33025 1.50749 8.44645 1.50316C8.79978 1.49002 9.15353 1.51794 9.49873 
                    1.58621C9.77745 1.64326 10.0545 1.73643 10.6079 1.92204L12.1599 2.48969C12.4569 2.59498 12.695
                     2.80041 12.8222 3.06114C12.9493 3.32187 12.9553 3.61672 12.8388 3.88136C12.7223 4.14599 12.4927
                     4.35892 12.2002 4.47366C11.9077 4.58841 11.576 4.59565 11.2775 4.49382M11.2775 4.49382L10.5372
                      4.29015C9.96759 4.13488 9.41098 4.03377 8.93968 4.08577C8.08973 4.17749 5.96403 5.1113 5.96403
                      5.1113M11.2775 4.49382L13.2179 5.13514C13.496 5.22472 13.7264 5.4034 13.8639 5.63613C14.0015 
                      5.86887 14.0362 6.13888 13.9614 6.39322C13.7883 6.97315 13.0984 7.31187 12.4403 7.13998L10.6575
                       6.6756C9.21108 6.16356 6.37763 6.90888 6.37763 8.52301C6.37763 9.70599 7.94996 10.4759 9.14689
                        9.94648C10.5226 9.33838 11.9527 8.57212 13.443 9.45105C13.9045 9.7226 14.1556 10.2671 13.6445
                         10.6362L11.3417 11.9723C10.9272 12.272 9.98872 12.6735 9.32403 12.8916L9.25577 12.9148L9.22165 
                         12.927C8.96 13.0281 7.76388 13.5366 7.50061 14.5"
                          class="group-hover:stroke-white" stroke-width="1.4" stroke-linecap="round" 
                          :class="[translateStore.currentMode === 'translation' ? 'stroke-white' : 'stroke-current']" stroke-linejoin="round" />
                  <defs>
                    <linearGradient id="paint0_linear_7210_77014" x1="7.5" y1="1.5" x2="7.5" y2="14.5" 
                    gradientUnits="userSpaceOnUse">
                      <stop stop-color="#2DADA3" />
                      <stop offset="1" stop-color="#71DAD2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="text_normal_hover"> {{$t('Sign language')}} </div>
            </button>
            <button class="btn-translate tamkin hover_tamkin  group" @click="changeMode('player')" :class="[translateStore.currentMode === 'player' ? 'active_tamkin' : '']">
              <div>
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="group-hover:fill-white"
                   d="M5.6531 8.36047V9.56977C4.52863 9.56977 3.45021 9.95199 2.65509 10.6324C1.85997 11.3127
                    1.41327 12.2355 1.41327 13.1977H0C0 11.9148 0.595592 10.6844 1.65575 
                    9.77725C2.71591 8.8701 4.1538 8.36047 5.6531 8.36047ZM5.6531 7.75581C3.31059 7.75581 
                    1.41327 6.13233 1.41327 4.12791C1.41327 2.12349 3.31059 0.5 5.6531 0.5C7.9956 0.5 9.89292
                     2.12349 9.89292 4.12791C9.89292 6.13233 7.9956 7.75581 5.6531 7.75581ZM5.6531 6.54651C7.21476
                      6.54651 8.47964 5.46419 8.47964 4.12791C8.47964 2.79163 7.21476 1.7093 5.6531 1.7093C4.09143
                       1.7093 2.82655 2.79163 2.82655 4.12791C2.82655 5.46419 4.09143 6.54651 5.6531 6.54651ZM7.48682
                        11.2694C7.39707 10.947 7.39707 10.6111 7.48682 10.2887L6.78583 9.94223L7.49247 8.89498L8.19346 
                        9.24144C8.47488 9.01349 8.81496 8.84531 9.18628 8.75047V8.05814H10.5996V8.75047C10.9755 8.846 
                        11.3147 9.01651 11.5924 9.24144L12.2934 8.89498L13 9.94223L12.2997 10.2887C12.3895 10.6111 
                        12.3895 10.947 12.2997 11.2694L13 11.6159L12.2934 12.6632L11.5924 12.3167C11.311 12.5447 
                        10.9709 12.7128 10.5996 12.8077V13.5H9.18628V12.8077C8.81496 12.7128 8.47488 12.5447 8.19346
                         12.3167L7.49247 12.6632L6.78583 11.6159L7.48682 11.2694ZM9.89292 11.686C10.174 11.686 10.4436 
                         11.5905 10.6424 11.4204C10.8412 11.2503 10.9529 11.0196 10.9529 10.7791C10.9529 10.5385 10.8412 
                         10.3078 10.6424 10.1377C10.4436 9.96765 10.174 9.87209 9.89292 9.87209C9.6118 9.87209 9.3422 
                         9.96765 9.14342 10.1377C8.94464 10.3078 8.83296 10.5385 8.83296 10.7791C8.83296 11.0196 8.94464
                          11.2503 9.14342 11.4204C9.3422 11.5905 9.6118 11.686 9.89292 11.686Z" 
                          :class="[translateStore.currentMode === 'player' ? 'fill-white' : 'fill-current']" />
                  <defs>
                    <linearGradient id="paint0_linear_6877_84222" 
                    x1="6.5" y1="0.5" x2="6.5" y2="13.5" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#2DADA3" />
                      <stop offset="1" stop-color="#71DAD2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div class="text_normal_hover"> {{ $t('Player') }} </div>
            </button>
          </div>
        </div>
            <!-- :subtitleTextTransform="translateStore.styles." -->
        <div v-if="!translateStore.loadingProject">
          <VTamkinPlayer 
          :is-player-visible=" !translateStore.loadingProject "
          @TamkinFullScreen="bigpicMode = !bigpicMode"
          :mediaUrl="translateStore.videoProject.file_link"
          :isVideo="true"
          :captionOptions="[
            { src: `${translateStore.videoProject.subtitles_link}`, default: true },
          ]"
          :subtitle-under-line="translateStore.styles.underline"
          :subtitleTextTransform="translateStore.styles.fontCap"
          :subtitleColor="translateStore.colorStyle"
          :line-count="translateStore.styles.lines"
          :subtitleFontSize="translateStore.styles.size"
          :subtitleFontWeight="translateStore.styles.fontWeight"
          :subtitleFontStyle="translateStore.styles.fontStyle"
          :subtitleLineHeight="`${translateStore.styles.lineHeight}px`"
          :subtitleLetterSpacing="`${translateStore.styles.letterSpacing}px`"
          :subtitleAlignment="translateStore.styles.textAlign"
          :subtitle-font-family="translateStore.styles.fontName"
          :subtitleBackground="translateStore.styles.bg"
      :player-position="translateStore.player.playerPosition"
      @close-player="translateStore.player.playerPosition = 'inVideo'"
    :backgroundPlayerContrastOpacity="translateStore.player.background"
    :backgroundPlayerContrast="translateStore.player.contrast "
    :isPlayerVisible="translateStore.player.visibility"
    :player-positioning="translateStore.player.position"
    :current-locale="locale"
        />
        </div>
          
        <div class="w-full h-[275px] mt-[10px] bg-gray-300 animate-pulse rounded-[10px]" v-else></div>


     
      </div>
    </div>
  </div>

 
    
  </template>
  


  <style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
.video-js{
}
  </style>
  