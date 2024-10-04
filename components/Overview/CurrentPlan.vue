<script lang="ts" setup>
import { useOverviewStore } from "@/stores/overview";
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
const {locale} = useI18n()
const overviewStore = useOverviewStore()

const props = defineProps({
    planType:{
        type:String,
        required:true
    },
    isInstalled:{
        type:Boolean,
        required:true
    },
 
})
const pricingType = ref("monthly");
const switchBetweenMonthlyAndAnnual = (v: any) => {
  pricingType.value = v;
};

const currentIndex = ref(0);

const back = ref(false);

const next = () => {
  back.value = false;
  currentIndex.value++;
};
const prev = () => {
  back.value = true;
  if (currentIndex.value == 1) {
    currentIndex.value--;
  }
};

</script>


<template>


    <div
    class="mt-[64px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full shadow-md -shadow-y-[1px]"
    
  >
    <div
      class="flex items-center justify-start rounded-[10px] h-[212px] w-full
       rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#35b4a9] to-tamkinEnd lg:to-[#c8fdf9]"
    >
      <div class="flex flex-col items-start justify-center w-full px-[15px]">
        <div>
          <h1 class="text-white font-[500] text-[18px] leading-[30px]">
            {{ $t('Your Current Plan') }}
          </h1>
          <h3 class="text-white font-[500] text-[13px] leading-[21px]">
            {{$t('Your current plan provides comprehensive features tailored to meet your needs.')}}
          </h3>
        </div>

        <div
          class="h-[55px]   bg-white dark:bg-tamkinDarkPrimary bg-opacity-75 rounded-[41px] space-x-[10px]
          flex items-center justify-between  w-full  p-2 mt-[24px]  "
        >
          <div class=" flex items-center justify-start rtl:space-x-reverse space-x-[4px] ">
            <div>
              <img  src="/assets/imgs/freeplan.svg" class="lg:w-[22px] lg:h-[22px] w-[10px] h-[10px] "  v-if="planType === 'free'"/>
              <img  src="/assets/imgs/proplan.svg" class="lg:w-[22px] lg:h-[22px] w-[10px] h-[10px] "  v-if="planType === 'pro'"/>
              <img  src="/assets/imgs/overview/advanced_plan.svg" class="lg:w-[22px] lg:h-[22px] w-[10px] h-[10px] "  v-if="planType === 'advanced'"/>
              <img  src="/assets/imgs/plat_plan.svg" class="lg:w-[22px] lg:h-[22px] w-[10px] h-[10px] "  v-if="planType === 'platinum'"/>
              <img  src="/assets/imgs/overview/enterprise_plan.svg" class="lg:w-[22px] lg:h-[22px] w-[10px] h-[10px] "  v-if="planType === 'enterprise'"/>
              <!-- <img  src="/assets/imgs/proplan.svg" class="lg:w-[22px] lg:h-[22px] w-[10px] h-[10px] mr-[13px]"  v-else/> -->
            </div>
            <div class="text-[10px]   lg:text-[14px] font-[500]
            ipad-max:text-[12px]
ipad-max:leading-[10px] whitespace-nowrap
            lg:leading-[22.5px] text-darkGrey dark:text-whiteTamkin">
              {{ planType === 'free' ? 'Free Widget' : planType === 'pro' ? 'Pro- Widget':planType === 'platinum' ?'Platinum Widget':planType ==='advanced' ?'Advanced Widget':planType === 'enterprise'?'EnterPrise Widget' :''}}
            </div>
            <!-- <div class=" text-[15px] font-[500] leading-[22.5px] text-darkGrey" >
              Pro- Widget
            </div> -->
          </div>

          <div
            class="text-[10px] ipad-max:text-[12px] lg:text-[14px]
             font-[500] ipad-max:leading-[10px] whitespace-nowrap 
             lg:leading-[22.5px] text-darkGrey  dark:text-whiteTamkin flex items-center 
            justify-evenly rtl:space-x-reverse space-x-[4px] "
            v-if="!isInstalled"
         
          >
            <div > 
              <img 
                src="/assets/imgs/payment_methods/declined.svg"
                class="lg:w-[22px]  lg:h-[22px] w-[10px] h-[10px]"
                
              />
            </div>
            <div>{{$t('Not installed')}}</div>
          </div>

          <div class="">
            <button 
            @click="overviewStore.switchState"
            class="btn_bordered_dashboard bg-white rounded-[19px] rtl:mr-auto ltr:ml-auto mx-[15px]  !p-[6px] w-full">
              {{ $t('Upgrade Plans') }}
            </button>
          </div>
        </div>
      </div>

      <div class="rtl:!mr-auto ltr:ml-auto h-full w-full lg:block hidden">
        <img 
          src="/assets/imgs/overview/current_plan_upgrade.svg"
          class="w-full h-full"
          
        />
      </div>
    </div>

    <div
      class="flex items-center flex-col justify-center px-[15px]"
       v-if="!overviewStore.showUpgradeState"
    >
      <div
        class="flex items-center lg:flex-row flex-col justify-center lg:justify-between lg:space-y-0 space-y-3 w-full mt-[32px]"
      >
        <div class="text-[15px] leading-[22.5px] font-[500] dark:text-whiteTamkin">
          {{$t('Accessibility Widget Pricing')}}
        </div>

        <div
          class="inline-flex items-center rounded-full bg-tamkinLight  dark:bg-transparent dark:border-darkGrey p-1 border border-gray-300"
        >
          <button
            @click="switchBetweenMonthlyAndAnnual('monthly')"
            :class="[pricingType === 'monthly' ? 'bg-white dark:bg-light rounded-full' : '']"
            class="py-2 px-4 transition-all ease-in-out text-darkGrey dark:text-whiteTamkin font-[500] text-[14px] leading-[22.5px]"
          >
            {{ $t('Monthly') }}
          </button>
          <button
            :class="[pricingType === 'annual' ? 'bg-white dark:bg-light rounded-full' : '']"
            @click="switchBetweenMonthlyAndAnnual('annual')"
            class="py-2 px-2 transition-all ease-in-out text-darkGrey  dark:text-whiteTamkin 
            font-[500] text-[14px] leading-[22.5px] mr-[4px]"
          >
            {{ $t('Annual') }}
            <span class="!text-black dark:!text-whiteTamkin/80 text-[11px] leading-[18px] font-[600]"
              >{{ $t('SAVE') }} 12%</span
            >
          </button>
        </div>
      </div>
  

<div class="w-full pb-[48px]">
  <Splide ref="splide"  
  :options="{rewind: false,perPage: 3,  gap: 10,arrows:false ,direction:`${locale === 'ar' ? 'rtl' : 'ltr'}`      }">
      <SplideSlide   v-for="(pak, i) in 6 " >
        <div
        class="flex items-center flex-col custom-border-tamkin 
         group hover:bg-selected dark:hover:bg-p
        padding-override-1 justify-start !rounded-t-[10px] mt-[35px] w-full"
        style="padding: 16px, 10px, 16px, 10px"
      >
        <div class="absolute top-[-30px] left-[15px]">
          <img 
            src="/assets/imgs/overview/advanced_plan.svg"
            class="w-[50px] h-[50px]"
            
          />
        </div>

        <div
          class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
        >
          <div class="order-2 relative w-full">
            <h1 class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin">Advanced</h1>
            <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin">
              For Individuals and Small Teams
            </h2>

            <h3
              class="mt-[10px] text-black font-[600] text-[24px] leading-[29px]  dark:text-whiteTamkin"
            >
              $ {{ pricingType === "annual" ? "4000" : "400" }}
              <span class="!font-[500] !text-darkGrey !text-[18px] dark:!text-whiteTamkin"
                >/{{ pricingType === "annual" ? "year" : "month" }}</span
              >
            </h3>

            <p class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin">
              <span class="!font-[700]">UP to 3M </span>Page views/mo
            </p>
          </div>
        </div>

        <div
          class="flex flex-col items-start justify-center
           group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin
          w-full space-y-[10px] h-[305px] custom-border-collapse-tamkin rounded-t-none rounded-[10px] p-4"
        >
          <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
            <div>
              <img  src="/assets/imgs/checked_list_active.svg"  />
            </div>
            <div>
              <h3 class="text-[14px] font-[400] leading-[20px]">
                All analytics features
              </h3>
            </div>
          </div>
          <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
            <div>
              <img  src="/assets/imgs/checked_list_active.svg"  />
            </div>
            <div>
              <h3 class="text-[14px] font-[400] leading-[20px]">
                All analytics features
              </h3>
            </div>
          </div>
          <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
            <div>
              <img  src="/assets/imgs/checked_list_active.svg"  />
            </div>
            <div>
              <h3 class="text-[14px] font-[400] leading-[20px]">
                All analytics features
              </h3>
            </div>
          </div>
          <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
            <div>
              <img  src="/assets/imgs/checked_list_inactive.svg"  />
            </div>
            <div>
              <h3 class="text-[14px] font-[400] leading-[20px]">
                All analytics features
              </h3>
            </div>
          </div>
          <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
            <div>
              <img  src="/assets/imgs/checked_list_active.svg"  />
            </div>
            <div>
              <h3 class="text-[14px] font-[400] leading-[20px]">
                All analytics features
              </h3>
            </div>
          </div>
          <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
            <div>
              <img  src="/assets/imgs/checked_list_active.svg"  />
            </div>
            <div>
              <h3 class="text-[14px] font-[400] leading-[20px]">
                All analytics features
              </h3>
            </div>
          </div>
          <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
            <div>
              <img  src="/assets/imgs/checked_list_active.svg"  />
            </div>
            <div>
              <h3 class="text-[14px] font-[400] leading-[20px]">
                All analytics features
              </h3>
            </div>
          </div>
          <div class="flex items-center justify-center mx-auto w-full">
            <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
        </SplideSlide>
        </Splide>
        <div id="custom-pagination" class="custom-pagination"></div>

</div>

    </div>
   
  </div>
</template>

<style>

.splide__pagination{
  @apply !bottom-[-20px];
}
.splide__pagination__page.is-active{
@apply !bg-tamkin;
}
</style>