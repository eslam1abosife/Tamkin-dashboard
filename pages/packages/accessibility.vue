<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
definePageMeta({
  layout: "dashboard",
});
const pricingType = ref("monthly");
const packagesStore = usePackgesStore()
const levelTraffic = ref('')
const switchBetweenMonthlyAndAnnual = (v: any) => {
  pricingType.value = v;
};


const geteFilterInfo = (level:any)=>{
  levelTraffic.value = level
}
const levelsTraffic = ref([
  {
    id:1,
    name:'Up to 100 K  page views/ MO'
  },
  {
    id:2,
    name:'Up to 200 K  page views/ MO'
  },
  {
    id:3,
    name:'Up to 300 K  page views/ MO'
  },
])
provide("pricingType", pricingType);
</script>

<template>
  <div class="w-full relative px-[40px]">
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <div class="text-[18px] font-[700] leading-[35px] bg-gradient-to-r  from-[#2DADA3]  to-[#3450E5] text-transparent bg-clip-text  whitespace-nowrap" v-if="packagesStore.currentTab === 'webplugins'">
      {{packagesStore.getPackageDetails('Accessibility','Web Plugins Package').color_title}}  
     
        
      </div>

      <div class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap bg-gradient-to-l from-[#C520AB] 
      via-[#1E4FB0] to-[#31A69F] text-transparent bg-clip-text" v-if="packagesStore.currentTab !== 'webplugins'">
        Inclusive Media Services for All Users
      </div>
      <div
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
      {{packagesStore.getPackageDetails('Accessibility',null).description}}
      </div>
    </div>
   

    <!-- PACKAGES-->
    <div
      class="flex items-center justify-between rounded-full bg-tamkinLight h-[32px] dark:bg-transparent dark:border-darkGrey absolute right-[3.3%] top-[100px] p-[4px] border border-gray-300"
    >
      <button
        @click="switchBetweenMonthlyAndAnnual('monthly')"
        :class="[pricingType === 'monthly' ? 'bg-white dark:bg-light rounded-full' : '']"
        class="w-[68px] transition-all h-[22px] flex items-center justify-center ease-in-out text-darkGrey dark:text-whiteTamkin font-[500] text-[10px] leading-[22.5px]"
      >
        Monthly
      </button>
      <button
        :class="[pricingType === 'annual' ? 'bg-white dark:bg-light rounded-full' : '']"
        @click="switchBetweenMonthlyAndAnnual('annual')"
        class="h-[22px] p-1 transition-all ease-in-out flex items-center justify-center"
      >
        <div class="text-darkGrey dark:text-whiteTamkin font-[500] text-[10px]">
          Annual
        </div>
        <div class="ml-1 !text-black dark:!text-whiteTamkin/80 !text-[10px] !font-[600]">
          SAVE 12%
        </div>
      </button>
    </div>
    <div
    class="flex items-center justify-start  w-full
    absolute left-[3.3%] top-[90px] p-[4px] rtl:space-x-reverse space-x-[14px] "
  >
  <div class="text-black dark:text-whiteTamkin font-[600] text-[14px]">
Choose Traffic level : 
  </div>

  <TranslateSelectInput
  @getCurrentSelectedItem="geteFilterInfo"
  :enableSearch="false"
  placeholderinput="Traffic level"
  :list="levelsTraffic"
  nameKey="name"
  idField="name"
  class="!w-1/4"
/>
  </div>

  <div class="flex flex-col items-center justify-center w-full bg-white mt-[69px]">
  <div class="w-full flex flex-col items-center justify-center  px-[18px]">
    <!-- <PackagesWebpluginsPricing class="!w-full "  />

   
  
  <PackagesViewFeatures/> -->
  </div>



    <!-- <PackagesAccessibilityWidgetcard/> -->


    <!-- FAQ START-->
    <PackagesFaq/>


    <!-- FAQ END-->

    <div class="w-full h-[334px] bg-white rounded-[10px] relative mt-[32px] mx-auto">
      <div
        class="absolute z-20 w-[95%] h-[170px] top-[90px] bg-gradient-to-l from-[#D5F6F4] via-[#D5F6F4]/[30%] to-white"
      ></div>

      <div class="absolute right-[70px] top-[25px] z-50">
        <img src="/imgs/av.png" alt="" />
      </div>
      <div
        class="absolute h-[246px] z-50 w-[379px] left-0 bg-gradient-to-t from-[#F7C1D3]/[52%] to-[#A9CAF2]/[52%] top-[45px] rounded-r-[55px] flex items-start justify-center flex-col p-[32px]"
      >
        <div class="text-[20px] font-[600] leading-[24px] text-black text-left">
          Have more questions?
        </div>
        <div class="text-[14px] font-[500] leading-[25px] text-black mt-[10px] text-left">
          We're here to help reach out anytime for the answers and support you need!
        </div>

        <button class="btn-dashboard hover_tamkin max-w-[136px] mt-[32px]">
          Contact us
        </button>
      </div>
    </div>
  </div>
  </div>
</template>

<style></style>
