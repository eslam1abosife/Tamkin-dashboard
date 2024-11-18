<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});
const pricingType = ref("monthly");
const packagesStore = usePackgesStore();
const levelTraffic = ref("");
const switchBetweenMonthlyAndAnnual = (v: any) => {
  packagesStore.discountType = v;
};

const geteFilterInfo = (level: any) => {
  packagesStore.traffic_level = level.name;
};

onUpdated(async () => {
  
  try {

    

    const trafficLevels = packagesStore.getTraffiPrices('Package');
    // alert(trafficLevels[0].name)
if(!packagesStore.traffic_level){
  packagesStore.setTrafficLevel(trafficLevels[0].name);
}
  


  
packagesStore.setFaq()
    

packagesStore.loadingData = false


 

  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});


onBeforeMount(async ()=>{


  packagesStore.currentTab = "";
  packagesStore.currentTabTitle = "Plugins";
    // alert(packagesStore.traffic_level)

})
onMounted(()=>{
  // packagesStore.loadingData = false

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
  <div class="w-full relative px-[40px]" v-if="!packagesStore.loadingData && packagesStore.currentType.title === 'Accessibility'">  
    <div class="flex flex-col items-center justify-center w-full mt-[26px]"        
   >
      <div 
        class="text-[18px] font-[700] leading-[35px]  whitespace-nowrap"
      >
        <div  
          v-html="$t(`${packagesStore.getPackageDetails().color_title}`)"
        ></div>
      </div>
      <div  v-if=" packagesStore.getPackageDetails()"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{  $t(packagesStore.getPackageDetails("Accessibility", null, null).description) }}
      </div>
     
    </div>

  
    <PackagesModalsCustomPackage/>

    <!-- PACKAGES-->
    <div        
    class="flex items-center justify-between rounded-full bg-tamkinLight h-[42px]  w-auto z-[40]
    dark:bg-transparent dark:border-darkGrey absolute rtl:left-[3.3%] ltr:right-[3.3%] top-[90px] p-[4px] border border-gray-300"
  >
    <button
      @click="switchBetweenMonthlyAndAnnual('month')"
      :class="[
        packagesStore.discountType === 'month'
          ? 'bg-white dark:bg-light rounded-full'
          : '',
      ]"
      class="w-auto px-3 transition-all h-[32px] 
      flex items-center justify-center ease-in-out text-darkGrey dark:text-whiteTamkin font-[500] text-[12px] leading-[22.5px]"
    >
      {{ $t('Monthly') }}
    </button>
    <button
      @click="switchBetweenMonthlyAndAnnual('year')"
      :class="[
        packagesStore.discountType === 'year'
          ? 'bg-white dark:bg-light rounded-full'
          : '',
      ]"
      class="w-auto px-3 transition-all h-[32px] flex items-center justify-center ease-in-out
       text-darkGrey rtl:space-x-reverse space-x-1 dark:text-whiteTamkin font-[500] text-[12px] leading-[22.5px] "
    >
      <div>{{$t('Annual')}}</div>
      <div class="flex items-center justify-center rtl:space-x-reverse space-x-[4px]" >
        <div  class="text-black font-[800] !text-[10px]">{{ $t('SAVE')}}</div>
      <div class="text-black font-[800] !text-[10px]">
        {{
          packagesStore.types.length ?  packagesStore.types.find(type => type.title === 'Accessibility').discount_yearly :''
        }}%</div
      >
      </div>
    </button>
  </div>



       <div  
      class="flex items-center justify-start w-full absolute z-[140]  rtl:right-[3.3%] left-[3.3%] top-[90px] p-[4px] rtl:space-x-reverse space-x-[14px]"
    >
      <div class="text-black dark:text-whiteTamkin font-[600] text-[14px]">
        {{ $t('Choose Traffic level') }} :
      </div>
      <TranslateSelectInput
        @getCurrentSelectedItem="geteFilterInfo"
        :enableSearch="false"
        placeholderinput="Traffic level"
        :list="uniqueValues(packagesStore.getTraffiPrices('Package'))"
        nameKey="name"
        idField="id"
        class="!w-1/4 !bg-white "
        :currentListValue="packagesStore.traffic_level"
      />
    </div>


    <div class="flex flex-col items-center justify-center w-full bg-white mt-[85px]" >
      <div class="w-full flex flex-col items-center justify-center px-[18px] ">
       
        <PackagesAccessibilityPricing />
      </div>

      <PackagesAccessibilityWidgetcard class="my-[32px]" v-if=" packagesStore.currentType.title === 'Accessibility'"/>

      <!-- FAQ START-->
      <PackagesFaq v-if=" packagesStore.currentType.title === 'Accessibility'"/>

      <!-- FAQ END-->

      <PackagesContact v-if="packagesStore.currentType.title === 'Accessibility'"/>
    </div>
  </div>
</template>

<style></style>
