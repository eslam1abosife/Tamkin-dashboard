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
    packagesStore.setTrafficLevel(trafficLevels[0].name);
  


  
packagesStore.setFaq()
    

  

 

  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});


onMounted(()=>{
  packagesStore.loadingAccessibility = true
  packagesStore.currentTab = "";
  packagesStore.currentTabTitle = "Plugins";
  packagesStore.loadingAccessibility = false

    // alert(packagesStore.traffic_level)

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
  <div class="w-full relative px-[40px]" v-if="packagesStore.currentType.title === 'Accessibility'">  
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <div
        class="text-[18px] font-[700] leading-[35px]  whitespace-nowrap"
      >
        <div
          v-html="$t(`${packagesStore.getPackageDetails().color_title}`)"
        ></div>
      </div>
      <div
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
      class="flex items-center justify-start w-full absolute rtl:right-[3.3%] left-[3.3%] top-[90px] p-[4px] rtl:space-x-reverse space-x-[14px]"
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
        class="!w-1/4"
        :currentListValue="packagesStore.traffic_level"
      />
    </div>

    <div class="flex flex-col items-center justify-center w-full bg-white mt-[85px]">
      <div class="w-full flex flex-col items-center justify-center px-[18px]">
        <div v-if="packagesStore.loadingAccessibility" class="grid grid-cols-3 lg:gap-4 2xl:gap-4 3xl:gap-0 mx-auto mt-[32px] w-full ipad-max:grid-cols-2">
          <!-- Skeleton Loader -->
          <div v-for="i in 3" :key="i" class="flex border items-center flex-col mx-auto justify-start rounded-t-[10px] relative max-w-[400px] rounded-b-none mt-[35px] bg-white w-full p-6 animate-pulse">
            
            <!-- Icon Skeleton -->
            <div class="absolute top-[-30px] left-[15px]">
              <div class="w-[50px] h-[50px] bg-gray-300 rounded-full"></div>
            </div>
        
            <div class="flex items-center justify-center w-full px-[15px] mt-[48px]">
              <div class="order-2 w-full">
                <!-- Title Skeleton -->
                <div class="h-[30px] w-[150px] bg-gray-300 rounded-lg mb-2"></div>
                <!-- Subtitle Skeleton -->
                <div class="h-[15px] w-[100px] bg-gray-300 rounded-lg mb-4"></div>
        
                <!-- Price Skeleton -->
                <div class="h-[29px] w-[120px] bg-gray-300 rounded-lg mb-2"></div>
                <!-- Old Price Skeleton -->
                <div class="h-[20px] w-[100px] bg-gray-200 rounded-lg mb-2"></div>
                <!-- Description Skeleton -->
                <div class="h-[32px] w-[200px] bg-gray-200 rounded-lg"></div>
              </div>
            </div>
        
            <div class="flex flex-col items-start justify-center w-full space-y-[10px] h-[260px] rounded-t-none rounded-[10px] p-4">
              <!-- Feature List Skeleton -->
              <div v-for="i in 3" :key="i" class="flex items-center justify-start space-x-[24px]">
                <div class="w-[20px] h-[20px] bg-gray-300 rounded-full"></div>
                <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
              </div>
            </div>
        
            <!-- Button Skeleton -->
            <div class="flex items-center justify-center mx-auto w-full">
              <div class="w-[205px] h-[48px] bg-gray-300 rounded-[19px]"></div>
            </div>
          </div>
        </div>
        <PackagesAccessibilityPricing v-else/>
      </div>

      <PackagesAccessibilityWidgetcard class="my-[32px]" v-if="!packagesStore.loadingAccessibility"/>

      <!-- FAQ START-->
      <PackagesFaq />

      <!-- FAQ END-->

      <PackagesContact/>
    </div>
  </div>
</template>

<style></style>
