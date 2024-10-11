<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useModalManager } from '@/composables/useModalManager';
import { Vue3Lottie } from 'vue3-lottie'


import upgradeAnimation from '/assets/animation/upgrade.json'
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const state = reactive({
  email: "",
  password: "",
});
const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, state);

const props = defineProps({
  showModal: Boolean,
});


</script>

<template>
  <div 
  v-if="isOpen('moreinfo_translate')"
    class="fixed z-[9999] top-1/4 bg-selected dark:bg-p rounded-[10px] p-[30px] lg:w-[640px] w-10/12"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('moreinfo_translate')">
      <svg
        class="w-[12px] h-[12px]"
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <h1 class="rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]">
        {{ $t('More Info') }}
    </h1>


    

    <div class="text-[16px] font-[500]  text-darkGrey leading-[30px] mt-[18px]">
        {{$t('You have used the subtitle service with sign language interpretation for an inclusive video experience')}}
        </div>

     <div class="flex flex-col items-start justify-center">
        <div class="grid grid-cols-12 mt-[18px] w-full">

            <div class="flex items-start justify-center flex-col  space-y-[8px] col-span-6">
                <div class="text-[16px] font-[600] leading-[24px] text-darkGrey">
                    Sign language
                </div>

                <div class="flex items-center justify-center rtl:space-x-reverse space-x-[8px]">
                    <div>
                        <img src="/assets/imgs/translatevideo/USA.svg" alt="">
                    </div>
<div class="text-[13px] font-[500] leading-[32px] text-darkGrey">
    {{ $t('American Sign Language') }}
</div>
                </div>
            </div>
            <div class="flex items-start justify-center flex-col  space-y-[8px] col-span-6">
                <div class="text-[16px] font-[600] leading-[24px] text-darkGrey">
                    {{$t('Subtitle')}} 
                </div>

                <div class="flex items-center justify-center rtl:space-x-reverse space-x-[8px]">
                    <div>
                        <img src="/assets/imgs/translatevideo/USA.svg" alt="">
                    </div>
<div class="text-[13px] font-[500] leading-[32px] text-darkGrey">
    {{$t('English (USA)')}}
</div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-12 mt-[18px] w-full">

            <div class="flex items-start justify-center flex-col  space-y-[8px] col-span-6">
                <div class="text-[16px] font-[600] leading-[24px] text-darkGrey">
                    {{ $t('Words') }}
                </div>

                <div class="flex items-center justify-center rtl:space-x-reverse space-x-[8px]">
                    <div>
                        <img src="/assets/imgs/translatevideo/words_icon.png" class="w-[25px] h-[25px]" alt="">
                    </div>
<div class="text-[13px] font-[500] leading-[32px] text-darkGrey">
    50
</div>
                </div>
            </div>
            <div class="flex items-start justify-center flex-col  space-y-[8px] col-span-6">
                <div class="text-[16px] font-[600] leading-[24px] text-darkGrey">
                    
                </div>

                <div class="flex items-center justify-center rtl:space-x-reverse space-x-[8px]">
                    <div>
                        <img src="/assets/imgs/translatevideo/min_icon.png" class="w-[25px] h-[25px]" alt="">
                    </div>
<div class="text-[13px] font-[500] leading-[32px] text-darkGrey">
    4 :45
</div>
                </div>
            </div>
        </div>
     </div>

</div>
</template>

<style lang="scss">

</style>
