<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
definePageMeta({
  layout: "dashboard",
});
const moreDetails = ref(false);
const pricingType = ref("monthly");
const packagesStore = usePackgesStore();
const switchBetweenMonthlyAndAnnual = (v: any) => {
  pricingType.value = v;
};

const openMoreDetails = () => {
  moreDetails.value = !moreDetails.value;
};

const boxShadowStyle = computed(() => {
  return moreDetails.value ? { boxShadow: "0px 0px 5.6px 0px #C8FEF9" } : {};
});

provide("pricingType", pricingType);
</script>

<template>
  <div class="w-full relative px-[40px]">
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <div
        class="text-[18px] font-[700] leading-[35px] bg-gradient-to-r from-[#0A1AAC] via-[#0C9489]
         to-[#C31C9E] text-transparent bg-clip-text whitespace-nowrap"
      >
      {{packagesStore.getPackageDetails('Investors',null).color_title}}       </div>

    
      <div
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
      {{packagesStore.getPackageDetails('Investors',null).description}}   
      </div>
    </div>
   
    <div class="flex flex-col items-center justify-center bg-white rounded-[10px] mt-[68px] ">
       <div class="flex items-center justify-center flex-col w-full px-[18px]">
        <!-- <PackagesInveestorsPackages/> -->
        <!-- PACKAGES-->
    
        <!-- SHOW MORE DETAILS-->
    
    
        <!-- END SHOW MORE DETAILS-->
       </div>
    
<PackagesInveestorsInvestorpackage/>
       <PackagesInveestorsInvestorprogram/>
       <PackagesInveestorsPackagePaid/>
    
    
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
