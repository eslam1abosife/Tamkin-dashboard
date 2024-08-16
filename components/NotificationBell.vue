<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";


const isMenuOpen = ref(false)
const clickedOutside = ref(false)

const openLangSwitchMenu = () => {
    if(isMenuOpen.value){
        isMenuOpen.value =false
    }else {
        isMenuOpen.value =true
    }

};

const closeMenu = () => {
  if (isMenuOpen.value) {
    isMenuOpen.value = false;
  }
};
</script>

<template>
    <div class=" h-[40px] w-[40px] rounded-full flex items-center justify-center relative cursor-pointer "
        :class="[isMenuOpen ? 'active_notification' : 'bg-[#EFF1F6]']" @click.prevent="openLangSwitchMenu" 
        v-on-click-outside="closeMenu">


        <div class="cursor-pointer relative">
<div class="h-[13px] w-[13px] !text-whiteTamkin bg-[#FB726D] rounded-full flex items-center justify-center text-[10px] font-[500] 
absolute right-[-2px] top-[-5px]">
5
</div>
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.1585 6.44016C14.1585 5.04422 13.604 3.70545 12.6169 2.71837C11.6298 1.73129 10.291 1.17676 8.8951 1.17676C7.49916 1.17676 6.1604 1.73129 5.17332 2.71837C4.18624 3.70545 3.6317 5.04422 3.6317 6.44016C3.6317 12.5808 1 14.3353 1 14.3353H16.7902C16.7902 14.3353 14.1585 12.5808 14.1585 6.44016Z"
                :class="[isMenuOpen ? 'stroke-white':'stroke-darkGrey']" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M10.4141 17.8438C10.2599 18.1096 10.0385 18.3303 9.7722 18.4837C9.50586 18.6371 9.20388 18.7179 8.89652 18.7179C8.58916 18.7179 8.28719 18.6371 8.02084 18.4837C7.7545 18.3303 7.53313 18.1096 7.37891 17.8438"
                    :class="[isMenuOpen ? 'stroke-white':'stroke-darkGrey']"  stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        </div>


        <div v-if="isMenuOpen"
            class=" absolute top-[50px] right-0 drop-shadow-xl bg-white rounded-[10px] h-auto w-[351px] rounded-b-[10px]
             flex flex-col items-start justify-start ">
       <div class="h-[69px] bg-[#35C0B4] p-[20px] flex items-center justify-start rounded-t-[10px] w-full">
        Notifications (4)
       </div>

       <div class="flex items-start space-x-4 p-4   cursor-pointer hover:bg-tamkinLight">
        <!-- Indicator -->
        <div class="w-3 h-3 rounded-full bg-[#35C0B4] mt-1"></div>
        
        <!-- Content -->
        <div class="flex-1 w-full">
            <p class="text-darkGrey font-[500] text-[13px] leading-[20px]">
                Dolorem laborum atque quasi voluptas. Vel sit deserunt qui autem quis.
            </p>
            <div class="flex items-center text-[10px] justify-start gap-1 w-full text-[#878787]  leading-[15px] mt-2">
               <img src="/imgs/clock.png" class="w-[15px] h-[15px]" alt="">
                Just 20 SEC AGO
            </div>
        </div>
    </div>
    
    <div class="flex items-start space-x-4 p-4  cursor-pointer hover:bg-tamkinLight">
        <!-- Indicator -->
        <div class="w-3 h-3 rounded-full bg-[#A7A7A7] mt-1"></div>
        
        <!-- Content -->
        <div class="flex-1 w-full">
            <p class="text-[#A7A7A7] font-[500] text-[13px] leading-[20px]">
                Dolorem laborum atque quasi voluptas. Vel sit deserunt qui autem quis.
            </p>
            <div class="flex items-center text-[10px] justify-start gap-1 w-full text-[#878787]  leading-[15px] mt-2">
               <img src="/imgs/clock.png" class="w-[15px] h-[15px] opacity-20" alt="">
                Just 20 SEC AGO
            </div>
        </div>
    </div>
    
            </div>

    </div>
</template>
