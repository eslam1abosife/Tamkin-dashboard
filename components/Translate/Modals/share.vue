<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useModalManager } from '@/composables/useModalManager';
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
const {locale} = useI18n()
const {
    isOpen,
    currentView,
    openModal,
    closeModal,
    goBack,
    navigateTo,
} = useModalManager();
const state = reactive({
    name: "",
});
const rules = {
    name: { required },
};

const v$ = useVuelidate(rules, state);

const props = defineProps({
    showModal: Boolean,
});


</script>

<template>
    <div v-if="isOpen('sharetranslate')" class="fixed z-[9999] top-1/4 bg-selected dark:bg-p rounded-[10px] p-[30px] lg:w-[640px]  w-10/12"
        style="left: 50%; transform: translate(-50%, 0)">
        <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('sharetranslate')">
            <svg class="w-[12px] h-[12px]" width="14" height="13" viewBox="0 0 14 13" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
                    fill="currentColor" />
            </svg>
        </div>
        <h1 class="rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]">
            {{$t('Share Your Project')}}
        </h1>


        <div class="bg-white h-[110px]  rounded-[10px] flex items-center justify-around  w-full mt-[18px] ">
  

        <ClientOnly>
            <Splide class="mx-auto"  :options="{ rewind: false,perPage: 5,  gap: 10,arrows:false ,direction:`${locale === 'ar' ? 'rtl' : 'ltr'}`      }">
      
              <SplideSlide  >
                <div class=" w-[50px] h-[50px] bg-[#F6F6F6] rounded-[7px] flex items-center justify-center cursor-pointer">
                    <img src="/imgs/fb_share.png" class="w-[40px] h-[40px]" alt="">
                </div>
            </SplideSlide>
            <SplideSlide  >
                <div class=" w-[50px] h-[50px] bg-[#F6F6F6] rounded-[7px] flex items-center justify-center cursor-pointer">
                    <img src="/imgs/insta_share.png" class="w-[40px] h-[40px]" alt="">
                </div>
            </SplideSlide>
            <SplideSlide  >
                <div class=" w-[50px] h-[50px] bg-[#F6F6F6] rounded-[7px] flex items-center justify-center cursor-pointer">
                    <img src="/imgs/x_share.png" class="w-[40px] h-[40px]" alt="">
                </div>
            </SplideSlide>
            <SplideSlide  >
                <div class=" w-[50px] h-[50px] bg-[#F6F6F6] rounded-[7px] flex items-center justify-center cursor-pointer">
                    <img src="/imgs/youtube_share.png" class="w-[40px] h-[40px]" alt="">
                </div>
            </SplideSlide>
      
            </Splide>
      
            <div id="custom-pagination" class="custom-pagination"></div>
 
          </ClientOnly>
       
      
        </div>

        <div class="flex flex-col items-start justify-center mt-[12px]">
            <div class="text-[16px] leading-[24px] font-[600] text-darkGrey">
                {{ $t('Or Copy Link') }}
            </div>

            <div class="border-[1px] border-lightGrey rounded-[10px]  bg-white flex items-center justify-between
w-[100%] h-[40px] px-4 mt-[16px]">


<div class="text-[#A7A7A7] text-[18px] font-[400] leading-[18px] select-none cursor-not-allowed">
    Ai/reit/f6fa07ea-04e8-46ba-bdc5-d6a593ed024b
</div>
                <div>
                    <svg width="20" height="20" class="group cursor-pointer" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.829 10.861C19 10.448 19 9.923 19 8.875C19 7.827 19 7.302 18.829 6.889C18.7159 6.61593 18.5502 6.36782 18.3412 6.15883C18.1322 5.94984 17.8841 5.78407 17.611 5.671C17.198 5.5 16.673 5.5 15.625 5.5H9.1C7.84 5.5 7.21 5.5 6.729 5.745C6.30526 5.96078 5.96078 6.30526 5.745 6.729C5.5 7.209 5.5 7.839 5.5 9.1V15.625C5.5 16.673 5.5 17.198 5.671 17.611C5.9 18.162 6.338 18.601 6.889 18.829C7.302 19 7.827 19 8.875 19C9.923 19 10.448 19 10.861 18.829M18.829 10.861C18.7159 11.1341 18.5502 11.3822 18.3412 11.5912C18.1322 11.8002 17.8841 11.9659 17.611 12.079C17.198 12.25 16.673 12.25 15.625 12.25C14.577 12.25 14.052 12.25 13.639 12.421C13.3659 12.5341 13.1178 12.6998 12.9088 12.9088C12.6998 13.1178 12.5341 13.3659 12.421 13.639C12.25 14.052 12.25 14.577 12.25 15.625C12.25 16.673 12.25 17.198 12.079 17.611C11.9659 17.8841 11.8002 18.1322 11.5912 18.3412C11.3822 18.5502 11.1341 18.7159 10.861 18.829M18.829 10.861C18.2912 12.716 17.3017 14.4086 15.9492 15.7873C14.5967 17.166 12.9233 18.1878 11.079 18.761L10.861 18.829M14.5 5.5V4.6C14.5 3.34 14.5 2.71 14.255 2.229C14.0395 1.80541 13.6954 1.46095 13.272 1.245C12.79 1 12.16 1 10.9 1H4.6C3.34 1 2.71 1 2.229 1.245C1.80526 1.46078 1.46078 1.80526 1.245 2.229C1 2.709 1 3.339 1 4.6V10.9C1 12.16 1 12.79 1.245 13.271C1.461 13.695 1.805 14.039 2.229 14.255C2.709 14.5 3.34 14.5 4.601 14.5H5.5"
                           class="group-hover:stroke-[url(#paint0_linear_6806_85229)] stroke-[#7E7E7E]" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_6806_85229" x1="10" y1="1" x2="10" y2="19"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2DADA3" />
                                <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                        </defs>
                    </svg>

                </div>

            </div>
        </div>
    </div>
</template>

<style >

.carousel__pagination-button::after{
    @apply w-[10px] h-[10px] rounded-full cursor-pointer bg-[#D9D9D9]; 
  
  }
  
  .carousel__pagination-button--active::after{
   @apply  bg-tamkin; 
  }
  
  .carousel__pagination-button--active::after::hover{
    @apply  !bg-tamkin; 
   }
   .carousel__pagination-button::after:hover{
    @apply  !bg-tamkin;
   }
  .carousel__pagination-button:hover::after{
    @apply bg-current;
  }

  .carousel__track{
    @apply space-x-[0px];
  }.splide__pagination{
    @apply !bottom-[-20px];
  }
  .splide__pagination__page.is-active{
  @apply !bg-tamkin;
  }
  
  .splide__list{
    @apply justify-center gap-4 mx-auto text-center items-center;
  }
  </style>
