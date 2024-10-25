<script lang="ts" setup>
import { ref } from 'vue';
import { useTranslateStore } from "~/stores/translate";
import USa from '/public/assets/imgs/translatevideo/USA.svg'
const props = defineProps({
    mode:String,
    
})
const localePath = useLocalePath()
const route = useRoute()
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);
  const pattern = localePath(path);

  // If the pattern does not contain a wildcard, do an exact match
  if (!pattern.includes("*")) {
    return currentPath === pattern;
  }

  // Convert wildcard pattern to regex
  const regex = new RegExp("^" + pattern.replace(/\/\*/g, ".*") + "$");

  return regex.test(currentPath);
};
const translateStore = useTranslateStore()
const emit = defineEmits(['playerPosition'])
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

const changePosition = (pos: any) => {
    translateStore.player.position = pos;
}
const changePlayer = (p:any)=>{
    translateStore.player.playerPosition  = p
    emit('playerPosition',p)
}
const changeMode = () => {
 translateStore.currentMode = 'subtitles'
 translateStore.subMode = ''
}
const changeplayerback = ()=>{
    if(!translateStore.player.contrast){
        window.changeBackgroundColor('rgba(255, 255, 255, 0.5)')

    } else if(translateStore.player.contrast){
        window.changeBackgroundColor('')
    }
}
</script>

<template>
    <div  class="w-2/4 flex flex-col items-start justify-start scrollable-div rtl:pl-[20px] ltr:pr-[20px] h-[310px] 
    transition-all ease-in-out relative">
        <div class="text-[12px] font-[600] text-darkGrey flex items-center rtl:space-x-reverse space-x-[10px] mt-[6px]" >
            <svg @click="changeMode" class="cursor-pointer rtl:rotate-180" width="5" height="7" viewBox="0 0 5 7" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1.81795 3.5L5 6.22234L4.09103 7L0 3.5L4.09103 1.19209e-07L5 0.777655L1.81795 3.5Z"
                    fill="#585B5B" />
            </svg>
            <div>
     {{ $t('Player') }}
            </div>
        </div>
        <div
        class="border-[1px] border-lightGrey rounded-[10px] flex items-center justify-between w-[100%] h-[40px] p-4 mt-[16px]">
        <div class="text-[13px] font-[500] text-darkGrey leading-[32px]">
            {{ $t('Contrast') }}
        </div>
        <div class="flex items-center justify-evenly rtl:space-x-reverse space-x-[16px]">
            <div class="ml-auto flex items-center ">
                <label for="toggle_google_a" class="toggle_wrap">
                    <input type="checkbox" id="toggle_google_a" class="sr-only" @click="changeplayerback"
                        v-model="translateStore.player.contrast" />
                    <div class="toggle_parent translate" :class="[translateStore.player.contrast ? 'active' : 'in_active']">
                        <div class="toggle_inner" :class="{ active: translateStore.player.contrast}">
                            <img v-if="translateStore.player.contrast" src="/assets/imgs/translatevideo/toggle_contrast.svg"
                                class="w-[28px] h-[28px]" />
                            <img v-else src="/assets/imgs/translatevideo/contrast_toggle.svg" class="w-[28px] h-[28px]" />
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>
        <div
        class="border-[1px] border-lightGrey rounded-[10px] flex items-center justify-between w-[100%] h-[40px] p-4 mt-[16px]">
        <div class="text-[13px] font-[500] text-darkGrey leading-[32px]">
            {{ $t('Background') }}
        </div>
        <div class="flex items-center justify-evenly rtl:space-x-reverse space-x-[16px]">
            <button class="btn-default !p-1 w-[44px] !h-[30px]" :class="[translateStore.player.background === 0 ? '!bg-tamkinLight' : '']"
                @click="translateStore.player.background = 0">
                0%
            </button>

            <button class="btn-default !p-1 w-[44px] !h-[30px]" :class="[translateStore.player.background === 50 ? '!bg-tamkinLight' : '']"
                @click="translateStore.player.background = 50">
                50%
            </button>
            <button class="btn-default !p-1 w-[44px] !h-[30px]"
                :class="[translateStore.player.background === 100 ? '!bg-tamkinLight' : '']" @click="translateStore.player.background =  100">
                100%
            </button>
        </div>
    </div>
        <div
            class="border-[1px] border-lightGrey rounded-[10px] flex items-center justify-between w-[100%] h-[40px] p-4 mt-[16px]">
            <div class="text-[13px] font-[500] text-darkGrey leading-[32px]">
                {{ $t('Position') }}
            </div>
            <div class="flex items-center justify-evenly rtl:space-x-reverse space-x-[16px]">
                <button class="btn-default !p-1  w-[44px] !h-[30px]"
                    :class="[translateStore.player.position === 'left' ? '!bg-tamkinLight' : '']" @click="changePosition('left')">
                    <div>
                        <img src="/assets/imgs/translatevideo/right-post.svg" alt="" v-if="translateStore.player.position !== 'left'">
                        <img src="/assets/imgs/translatevideo/right-post-active.svg" alt=""
                            v-if="translateStore.player.position === 'left'">
                    </div>
                </button>

                <button class="btn-default !p-1   w-[44px] !h-[30px]"
                    :class="[translateStore.player.position === 'right' ? '!bg-tamkinLight' : '']" @click="changePosition('right')">
                    <div v-if="translateStore.player.position !== 'right'">
                        <img src="/assets/imgs/translatevideo/left-post.svg" alt="">
                    </div>
                    <div v-if="translateStore.player.position === 'right'">
                        <img src="/assets/imgs/translatevideo/left-post-active.svg" alt="">

                    </div>
                </button>
            </div>
        </div>
     
        <div
            class="border-[1px] border-lightGrey rounded-[10px] flex items-center justify-between w-[100%] h-[40px] p-4 mt-[16px]">
            <div class="text-[13px] font-[500] text-darkGrey leading-[32px]">
                {{ $t('Visibility') }}
            </div>
            <div class="flex items-center justify-evenly rtl:space-x-reverse space-x-[16px]">


                <button class="btn-default !p-1 w-[44px] !h-[30px]"
                    :class="[translateStore.player.visibility === false ? '!bg-tamkinLight' : '']" @click="translateStore.player.visibility = false">
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_7235_48424)">
                            <path d="M13.6094 8.45703L15.0465 10.9462"
                                :class="[translateStore.player.visibility === false ? 'stroke-[url(#paint0_linear_7235_48424)] ' : 'stroke-current']"
                                stroke-width="1.4911" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M10.6504 9.83594L11.0986 12.3778"
                                :class="[translateStore.player.visibility === false ? 'stroke-[url(#paint0_linear_7235_48424)] ' : 'stroke-current']"
                                stroke-width="1.4911" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.34476 9.83594L6.89648 12.3781"
                                :class="[translateStore.player.visibility === false ? 'stroke-[url(#paint0_linear_7235_48424)] ' : 'stroke-current']"
                                stroke-width="1.4911" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M4.38936 8.45312L2.94531 10.9543"
                                :class="[translateStore.player.visibility === false ? 'stroke-[url(#paint0_linear_7235_48424)] ' : 'stroke-current']"
                                stroke-width="1.4911" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M2.95117 7.04297C4.01043 8.35411 5.95231 10.012 8.9996 10.012C12.0469 10.012 13.9887 8.35412 15.048 7.04298"
                                :class="[translateStore.player.visibility === false ? 'stroke-[url(#paint0_linear_7235_48424)] ' : 'stroke-current']"  stroke-width="1.4911" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </g>
                        <defs>
                            <linearGradient id="paint0_linear_7235_48424" x1="14.3279" y1="8.45703" x2="14.3279"
                                y2="10.9462" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2DADA3" />
                                <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_7235_48424" x1="10.8745" y1="9.83594" x2="10.8745"
                                y2="12.3778" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2DADA3" />
                                <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                            <linearGradient id="paint2_linear_7235_48424" x1="7.12062" y1="9.83594" x2="7.12062"
                                y2="12.3781" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2DADA3" />
                                <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                            <linearGradient id="paint3_linear_7235_48424" x1="3.66734" y1="8.45312" x2="3.66734"
                                y2="10.9543" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2DADA3" />
                                <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                            <linearGradient id="paint4_linear_7235_48424" x1="8.99959" y1="7.04297" x2="8.99959"
                                y2="10.012" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2DADA3" />
                                <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                            <clipPath id="clip0_7235_48424">
                                <rect width="16.129" height="16.129" fill="white"
                                    transform="translate(0.935547 0.433594)" />
                            </clipPath>
                        </defs>
                    </svg>



                </button>
                <button class="btn-default !p-1 w-[44px] !h-[30px]" :class="[translateStore.player.visibility ? '!bg-tamkinLight' : '']"
                    @click="translateStore.player.visibility = true">
                    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.711 8.12157C15.1244 5.37449 12.1698 3.66797 8.99994 3.66797C5.83005 3.66797 2.87551 5.37449 1.28884 8.12157C1.15372 8.35537 1.15372 8.64381 1.28884 8.87762C2.87551 11.6247 5.83005 13.3312 8.99994 13.3312C12.1698 13.3312 15.1244 11.6247 16.711 8.87762C16.8462 8.64381 16.8462 8.35537 16.711 8.12157ZM8.99994 11.8191C6.51719 11.8191 4.19318 10.5578 2.83219 8.49959C4.19318 6.44138 6.51719 5.18007 8.99994 5.18007C11.4827 5.18007 13.8067 6.44138 15.1677 8.49959C13.8067 10.5578 11.4827 11.8191 8.99994 11.8191Z"
                            :class="[translateStore.player.visibility ? 'fill-[url(#paint0_linear_7235_84420)] ' : 'fill-current']" />
                        <path
                            d="M9.00042 5.69922C7.45682 5.69922 6.20117 6.95487 6.20117 8.49847C6.20117 10.0421 7.45682 11.2977 9.00042 11.2977C10.544 11.2977 11.7997 10.0421 11.7997 8.49847C11.7997 6.95487 10.544 5.69922 9.00042 5.69922ZM9.00042 9.78562C8.29064 9.78562 7.71327 9.20825 7.71327 8.49847C7.71327 7.78869 8.29064 7.21132 9.00042 7.21132C9.7102 7.21132 10.2876 7.78869 10.2876 8.49847C10.2876 9.20825 9.7102 9.78562 9.00042 9.78562Z"
                            :class="[translateStore.player.visibility ? 'fill-[url(#paint0_linear_7235_84420)] ' : 'fill-current']" />
                        <defs>
                            <linearGradient id="paint0_linear_7235_84420" x1="8.99994" y1="3.66797" x2="8.99994"
                                y2="13.3312" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2DADA3" />
                                <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                            <linearGradient id="paint1_linear_7235_84420" x1="9.00042" y1="5.69922" x2="9.00042"
                                y2="11.2977" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2DADA3" />
                                <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                        </defs>
                    </svg>


                </button>
            </div>
        </div>
      <div class="flex flex-col items-start justify-center mt-[16px] w-full">
        <div class="text-[13px] font-[500] text-darkGrey leading-[32px] mb-[4px]">
            {{$t('Where do you like the player to appear?')}}
        </div>
        <div
        class="border-[1px] border-lightGrey rounded-[10px] flex items-center justify-between w-[100%] h-[40px] p-4 ">
      
        <div class="flex items-center justify-end rtl:space-x-reverse space-x-[16px] w-full">


            <button class="btn-default   !h-[30px]"
                :class="[translateStore.player.playerPosition === 'inVideo' ? '!bg-tamkinLight' : '']" @click="changePlayer('inVideo')">
              
                <span :class="[translateStore.player.playerPosition  === 'inVideo' ? 'bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] text-transparent bg-clip-text' :'']">{{$t('On Frame') }}</span>


            </button>
            <button class="btn-default  !h-[30px]" :class="[translateStore.player.playerPosition  === 'OutVideo' ? '!bg-tamkinLight  ' : '']" 
            @click="changePlayer('OutVideo')">
           
            <span :class="[translateStore.player.playerPosition  === 'OutVideo' ? 'bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] text-transparent bg-clip-text' :'']">{{  $t('Out Frame')}}</span>

            </button>
        </div>
    </div>
      </div>
   
    </div>
</template>
