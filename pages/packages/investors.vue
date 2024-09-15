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
onMounted(async ()=>{
  await packagesStore.getPacks()

  await  packagesStore.getPackagesTypes('Investors')
await packagesStore.getInvestorUser()

})
provide("pricingType", pricingType);
</script>

<template>
  <div class="w-full relative px-[40px]" v-if="packagesStore.currentType.title === 'Investors'">
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
   
    <div
      class="flex items-center justify-between rounded-full bg-tamkinLight h-[32px] dark:bg-transparent dark:border-darkGrey absolute right-[3.3%] top-[90px] p-[4px] border border-gray-300"
    >
      <button
        @click="switchBetweenMonthlyAndAnnual('month')"
        :class="[
          packagesStore.discountType === 'month'
            ? 'bg-white dark:bg-light rounded-full'
            : '',
        ]"
        class="w-[68px] transition-all h-[22px] flex items-center justify-center ease-in-out text-darkGrey dark:text-whiteTamkin font-[500] text-[10px] leading-[22.5px]"
      >
        Monthly
      </button>
      <button
        @click="switchBetweenMonthlyAndAnnual('year')"
        :class="[
          packagesStore.discountType === 'year'
            ? 'bg-white dark:bg-light rounded-full'
            : '',
        ]"
        class="w-[68px] transition-all h-[22px] flex items-center justify-center ease-in-out text-darkGrey dark:text-whiteTamkin font-[500] text-[10px] leading-[22.5px]"
      >
        Annual
        <span class="text-black font-[800] pl-1">
          {{
            packagesStore.types.length ?  packagesStore.types.find(type => type.title === 'Sign language').discount_yearly :''
          }}%</span
        >
      </button>
    </div>
    <div class="flex flex-col items-center justify-center bg-white rounded-[10px] mt-[68px] ">
       <div class="flex items-center justify-center flex-col w-full px-[18px]">
        <!-- <PackagesInveestorsPackages/> -->
        <!-- PACKAGES-->
        <!-- SHOW MORE DETAILS-->
    <PackagesInveestorsPackages />
    
        <!-- END SHOW MORE DETAILS-->
       </div>
       <PackagesInveestorsPackagePaid class="mt-[20px]"/>
<PackagesInveestorsInvestorpackage v-if="!packagesStore.investorUser"/>
       <PackagesInveestorsInvestorprogram/>

    
    
        <!-- FAQ START-->
    
        <PackagesFaq/>

    
        <!-- FAQ END-->
    
   
  </div>
</div>
</template>

<style></style>
