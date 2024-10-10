<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const { locale } = useI18n();
const packagesStore = usePackgesStore();
const localePath = useLocalePath();
const route = useRoute();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  setData,
} = useModalManager();

const isLinkActive = (path) => {
  if (process.client) {
    const localizedPath = localePath(path); // Assuming you use i18n
    return route.path === localizedPath;
  }
  return false;
};
definePageMeta({
  layout: "dashboard",
});
const typeMap = {
  bundle: "Bundle",
  accessibility: "Accessibility",
  investors: "Investors",
  "live-translation": "Live Translation",
  default: "Sign language",
};
const loadingData = ref(false)

const updateCurrentType = () => {
  const path = route.path;
  let currentTitle = typeMap.default; // Fallback to default

  Object.keys(typeMap).forEach((key) => {
    if (path.includes(key)) {
      currentTitle = typeMap[key];
    }
  });

  const currentType = packagesStore.types.find((t) => t.title === currentTitle);
  packagesStore.currentType = currentType;
};
watch(
  () => route.path,
  async () => {
    if (route.path.includes("accessibility")) {
      const trafficLevels = packagesStore.getTraffiPrices("Package");

      packagesStore.setTrafficLevel(trafficLevels[0].name);
    }

  // 
if(!packagesStore.loadingData){
  updateCurrentType();
}

  },
  { immediate: true }
)

onBeforeMount(async () => {

  packagesStore.loadingData = true
setTimeout(()=>{
  checkPaymentStatus();
},1000)

 await packagesStore.getDataPackage();
packagesStore.urls = []

  
  updateCurrentType();
  loadingData.value = true

packagesStore.loadingData = false

  // 
  // Update the current type based on the route
});

const router = useRouter();
const checkPaymentStatus = async () => {
  if (route.query && route.query.paid && route.query.locale) {
    if (route.query.locale === "ar") {
      openModal("success_pay_package");

      await router.push({
        name: route.name,
        query: { paid: route.query.paid, locale: "ar" },
      });

      // await nextTick();
    } else {
      openModal("success_pay_package");
    }
  }
};
onUpdated(async ()=>{

  

  // packagesStore.loadingData = false

})
</script>

<template>
  <div class="!px-0 w-full relative">
    <!-- <PackagesPaymentModalsPackage/> -->
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <!-- Modal for adding a package -->
      <PackagesPaymentModalsPackage v-if="isOpen('add_package_modal_packages')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <PackagesPaymentModalsPaymentMethods />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <PackagesPaymentModalsCard v-if="isOpen('cardModal_packages')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <PackagesPaymentModalsSuccess v-if="isOpen('success_pay_package')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <ProfileBillingModalsAddnewCard v-if="isOpen('add_new_card_billing')" />
    </transition>
    <PackagesNavbar v-if="!packagesStore.loadingData" />
    <div class="w-full h-[200px] bg-gray-300 animate-pulse" v-else>

    </div>

    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <PackagesPaymentModalsCryptoStep1 v-if="isOpen('crypto_packages_step1')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <PackagesPaymentModalsCryptoStep2 v-if="isOpen('crypto_packages_step2')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <PackagesPaymentModalsCryptoSuccess />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <PackagesPaymentModalsPaypal />
    </transition>
    <!-- <PackagesNavbartab v-else-if="!packagesStore.showNavbar && packagesStore.currentTabTitle !== 'Plugins'"/> -->
    <div class="w-full relative px-[40px]" v-if="packagesStore.loadingData">
      <div class="flex flex-col items-center justify-center w-full mt-[26px]">
        <!-- Title Skeleton -->
        <div class="h-[30px] w-2/4 bg-gray-300 rounded-lg animate-pulse mb-2"></div>
        
        <!-- Description Skeleton -->
        <div class="h-[20px] w-3/4 bg-gray-300 rounded-lg animate-pulse mb-4"></div>
      </div>
    
      <!-- Tabs Skeleton -->
      <div class="flex items-center justify-center mt-[60px] rtl:space-x-reverse space-x-[40px]">
        <div class="h-[24px] w-[100px] bg-gray-300 rounded-[4px] animate-pulse"></div>
        <div class="h-[24px] w-[100px] bg-gray-300 rounded-[4px] animate-pulse"></div>
        <div class="h-[24px] w-[100px] bg-gray-300 rounded-[4px] animate-pulse"></div>
      </div>
    
   
    
      <!-- Grid of Skeleton Cards -->
      <div class="grid grid-cols-3 gap-4 mx-auto mt-[32px] w-full">
        <div class="flex flex-col items-center justify-start p-6 bg-white rounded-lg animate-pulse">
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
        <div class="flex flex-col items-center justify-start p-6 bg-white rounded-lg animate-pulse">
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
        <div class="flex flex-col items-center justify-start p-6 bg-white rounded-lg animate-pulse">
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
    <NuxtPage v-else/>
  </div>
</template>

<style>

</style>
