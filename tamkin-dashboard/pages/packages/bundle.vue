<script lang="ts" setup>
const { locale,t } = useI18n();

useHead({
  title: t("Bundle - Tamkin Dashboard"),
})
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData,
} = useModalManager();
definePageMeta({
  layout: "dashboard",
});
const moreDetails = ref(false);
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

onMounted(async () => {
  packagesStore.setFaq();

  // packagesStore.currentTab = "";
  // packagesStore.currentTabTitle = "Plugins";
});
onUpdated(() => {});
</script>

<template>
  <div class="w-full relative px-[40px]" v-if="packagesStore.loadingData">
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <!-- Title Skeleton -->
      <div
        class="h-[30px] w-2/4 bg-gray-300 rounded-lg animate-pulse mb-2"
      ></div>

      <!-- Description Skeleton -->
      <div
        class="h-[20px] w-3/4 bg-gray-300 rounded-lg animate-pulse mb-4"
      ></div>
    </div>

    <!-- Tabs Skeleton -->
    <div
      class="flex items-center justify-center mt-[60px] rtl:space-x-reverse space-x-[40px]"
    >
      <div
        class="h-[24px] w-[100px] bg-gray-300 rounded-[4px] animate-pulse"
      ></div>
      <div
        class="h-[24px] w-[100px] bg-gray-300 rounded-[4px] animate-pulse"
      ></div>
      <div
        class="h-[24px] w-[100px] bg-gray-300 rounded-[4px] animate-pulse"
      ></div>
    </div>

    <!-- Grid of Skeleton Cards -->
    <div class="grid grid-cols-3 gap-4 mx-auto mt-[32px] w-full">
      <div
        class="flex flex-col items-center justify-start p-6 bg-white rounded-lg animate-pulse"
      >
        <!-- Icon Skeleton -->
        <div class="w-[50px] h-[50px] bg-gray-300 rounded-full mb-4"></div>
        <!-- Title Skeleton -->
        <div class="h-[30px] w-[150px] bg-gray-300 rounded-lg mb-2"></div>
        <!-- Subtitle Skeleton -->
        <div class="h-[15px] w-[100px] bg-gray-300 rounded-lg mb-4"></div>
        <!-- Price Skeleton -->
        <div class="h-[29px] w-[120px] bg-gray-300 rounded-lg mb-2"></div>
        <!-- Description Skeleton -->
        <div class="h-[32px] w-[200px] bg-gray-200 rounded-lg mb-4"></div>
        <!-- Features Skeleton -->
        <div class="flex flex-col space-y-2">
          <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
          <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
          <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
        </div>
        <!-- Button Skeleton -->
        <div class="w-[205px] h-[48px] bg-gray-300 rounded-[19px] mt-4"></div>
      </div>

      <!-- Repeat Skeleton Card -->
      <div
        class="flex flex-col items-center justify-start p-6 bg-white rounded-lg animate-pulse"
      >
        <div class="w-[50px] h-[50px] bg-gray-300 rounded-full mb-4"></div>
        <div class="h-[30px] w-[150px] bg-gray-300 rounded-lg mb-2"></div>
        <div class="h-[15px] w-[100px] bg-gray-300 rounded-lg mb-4"></div>
        <div class="h-[29px] w-[120px] bg-gray-300 rounded-lg mb-2"></div>
        <div class="h-[32px] w-[200px] bg-gray-200 rounded-lg mb-4"></div>
        <div class="flex flex-col space-y-2">
          <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
          <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
          <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
        </div>
        <div class="w-[205px] h-[48px] bg-gray-300 rounded-[19px] mt-4"></div>
      </div>

      <!-- Repeat Skeleton Card -->
      <div
        class="flex flex-col items-center justify-start p-6 bg-white rounded-lg animate-pulse"
      >
        <div class="w-[50px] h-[50px] bg-gray-300 rounded-full mb-4"></div>
        <div class="h-[30px] w-[150px] bg-gray-300 rounded-lg mb-2"></div>
        <div class="h-[15px] w-[100px] bg-gray-300 rounded-lg mb-4"></div>
        <div class="h-[29px] w-[120px] bg-gray-300 rounded-lg mb-2"></div>
        <div class="h-[32px] w-[200px] bg-gray-200 rounded-lg mb-4"></div>
        <div class="flex flex-col space-y-2">
          <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
          <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
          <div class="h-[20px] w-[150px] bg-gray-200 rounded-lg"></div>
        </div>
        <div class="w-[205px] h-[48px] bg-gray-300 rounded-[19px] mt-4"></div>
      </div>
    </div>
  </div>
  <div
    class="w-full relative px-[40px] flex items-center justify-center flex-col"
    v-if="
      packagesStore.currentType.title === 'Bundle' && !packagesStore.loadingData
    "
  >
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <div
        class="text-[18px] font-[700] leading-[35px] dark:text-whiteTamkin  text-black w-full flex items-center justify-center"
      >
        <div
          v-html="`${$t(packagesStore.getPackageDetails().color_title)}`"
        ></div>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center bg-white rounded-[10px] mt-[26px] dark:bg-tamkinDarkPrimary"
    >
      <PackagesModalsCustomPackage />

      <PackagesBundlePackages />

      <!-- FAQ START-->

      <PackagesFaq />

      <!-- FAQ END-->

      <PackagesContact />
    </div>
    <!-- END SHOW MORE DETAILS-->
  </div>
</template>

<style></style>
