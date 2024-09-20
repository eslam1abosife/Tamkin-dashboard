<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const { locale } = useI18n()

definePageMeta({
  layout: "dashboard",
});
const moreDetails = ref(false);
const pricingType = ref("monthly");
const packagesStore = usePackgesStore();
  const switchBetweenMonthlyAndAnnual = (v: any) => {
  packagesStore.discountType = v;
};





const openMoreDetails = () => {
  moreDetails.value = !moreDetails.value;
};

const boxShadowStyle = computed(() => {
  return moreDetails.value ? { boxShadow: "0px 0px 5.6px 0px #C8FEF9" } : {};
});
const geteFilterInfo = (level: any) => {
  packagesStore.views_level = level.name;
};

onMounted(async ()=>{
  try {



    await packagesStore.getInvestorUser()



  packagesStore.currentTab = "";
  packagesStore.currentTabTitle = "Plugins";
} catch (error) {
  console.error("Error during onMounted:", error);
}
})
onUpdated(()=>{
packagesStore.setFaq()
packagesStore.currentTab = "";
packagesStore.currentTabTitle = "Plugins";
if(!packagesStore.views_level){
    

    const trafficLevels = packagesStore.getTraffiPrices('Package');
    // alert(trafficLevels)
    packagesStore.setViewsLevel(trafficLevels[0].name);
   }
})
const uniqueValues = (items) => {
  const seen = new Set();

  const uniqueItems = items.filter((item) => {
    if (seen.has(item.name)) {
      return false;
    }
    seen.add(item.name);
    return true;
  });

  return uniqueItems;
};
</script>

<template>
  <div class="w-full relative px-[40px]" v-if="packagesStore.currentType.title === 'Investors'">
    <NuxtLoadingIndicator :key="Math.random()" style="  background: linear-gradient(to right, #2DADA3, #71DAD2);" :height="6"/>
    <PackagesPaymentModalsJoinInvestorStep1/>

    <div class="flex flex-col items-center justify-center w-full mt-[26px] ">
      <div
        class="text-[18px] font-[700] leading-[35px]  whitespace-nowrap"
      >
      <div
       v-html="`${$t(packagesStore.getPackageDetails('Investors',null).color_title)}`"
      >
      </div>     </div>

    
      <div
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
      {{$t(packagesStore.getPackageDetails('Investors',null).description)}}   
      </div>
    </div>
   
    <div class="flex items-center justify-between w-full mt-[26px]">
      <!-- Traffic level selection section (first) -->
      <div class="flex items-center justify-start w-2/4 p-[4px] order-1">
        <div class="text-black dark:text-whiteTamkin font-[600] text-[14px] w-3/6">
          {{ $t('Choose Traffic level') }} :
        </div>
        <TranslateSelectInput
          @getCurrentSelectedItem="geteFilterInfo"
          :enableSearch="false"
          placeholderinput="Traffic level"
          :list="uniqueValues(packagesStore.getTraffiPrices('Package'))"
          nameKey="name"
          idField="id"
          class="w-full"
          :currentListValue="packagesStore.views_level"
        />
      </div>
    
      <!-- What’s included section (second) -->
      <div class="flex items-center justify-end rtl:space-x-reverse space-x-[10px] w-2/4 order-2 cursor-pointer" @click="packagesStore.showMoreINInvestors = !packagesStore.showMoreINInvestors">
        <div>
          <h2 class="underline text-[14px] font-[400] leading-[24px] text-[#151515] dark:text-whiteTamkin">
            {{$t('What’s included?')}}
          </h2>
        </div>
        <div class="cursor-pointer" >
          <img
            src="/assets/imgs/arrow-right.svg"
            class="w-[12px] h-[10px] rtl:rotate-180 cursor-pointer"
            :class="[packagesStore.showMoreINInvestors ? '!rotate-90 ' : 'rotate-0']"
          />
        </div>
      </div>
    </div>
    
    <div class="flex flex-col items-center justify-center bg-white rounded-[10px] mt-[26px] ">
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
    <PackagesContact/>
   
  </div>
</div>
</template>

<style></style>
