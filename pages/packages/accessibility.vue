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

onMounted(async () => {
  
  try {

    await packagesStore.getPacks()
    await packagesStore.getPackagesTypes("Accessibility");
    const currentType = packagesStore.types.find((t) => t.title === 'Accessibility')
  packagesStore.currentType = currentType
    if (packagesStore.packages.length > 0) {
      const trafficLevels = packagesStore.getTraffiPrices('Package');
      
      if (trafficLevels.length > 0) {
        packagesStore.setTrafficLevel(trafficLevels[0].name);
      }
      packagesStore.loadingAccessibility = false
    } else {
      console.error("No packages found in store");
    }

    packagesStore.currentTab = "";
    packagesStore.currentTabTitle = "Plugins";
  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});





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
        class="text-[18px] font-[700] leading-[35px] bg-gradient-to-r from-[#2DADA3] to-[#3450E5] text-transparent bg-clip-text whitespace-nowrap"
      >
        <div
          v-html="
            packagesStore.getPackageDetails(
              'Accessibility',
              'Web Plugins Package',
              'access'
            ).color_title
          "
        ></div>
      </div>
      <div
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{ packagesStore.getPackageDetails("Accessibility", null, null).description }}
      </div>
    </div>

    <!-- PACKAGES-->
    <div
      class="flex items-center justify-between rounded-full bg-tamkinLight h-[32px] dark:bg-transparent dark:border-darkGrey absolute z-[50] right-[3.3%] top-[90px] p-[4px] border border-gray-300"
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
            packagesStore.types.length
              ? packagesStore.types.find((type) => type.title === "Accessibility")
                  .discount_yearly
              : ""
          }}%</span
        >
      </button>
    </div>
    <div
      class="flex items-center justify-start w-full absolute left-[3.3%] top-[90px] p-[4px] rtl:space-x-reverse space-x-[14px]"
    >
      <div class="text-black dark:text-whiteTamkin font-[600] text-[14px]">
        Choose Traffic level :
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

    <div class="flex flex-col items-center justify-center w-full bg-white mt-[69px]">
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
    </div>
  </div>
</template>

<style></style>
