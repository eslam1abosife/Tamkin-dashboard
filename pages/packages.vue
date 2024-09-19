<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const  packagesStore = usePackgesStore()
const localePath = useLocalePath()
const route = useRoute()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  setData
} = useModalManager();

const isLinkActive = (path) => {
  if (process.client) {
    const localizedPath = localePath(path); // Assuming you use i18n
    return route.path === localizedPath;
  }
  return false;
};
definePageMeta({
    layout:'dashboard',
})
const typeMap = {
  'bundle': 'Bundle',
  'accessibility': 'Accessibility',
  'investors': 'Investors',
  'live-translation': 'Live Translation',
  'default': 'Sign language'
};

const updateCurrentType = () => {
  const path = route.path;
  let currentTitle = typeMap.default; // Fallback to default

  Object.keys(typeMap).forEach(key => {
    if (path.includes(key)) {
      currentTitle = typeMap[key];
    }
  });

  const currentType = packagesStore.types.find((t) => t.title === currentTitle);
  packagesStore.currentType = currentType;
};
watch(() => route.path, async () => {
  if(route.path.includes('accessibility')){
    const trafficLevels = packagesStore.getTraffiPrices('Package');
      
      packagesStore.setTrafficLevel(trafficLevels[0].name);
   }
},{immediate:true});
onBeforeMount(async () => {
  // Fetch the packages and ensure the data is available
  await packagesStore.getPacks()

    await packagesStore.getPackagesTypes();
    updateCurrentType();
    
 

  // Update the current type based on the route
});


</script>

<template>
<div class="!px-0 w-full relative">
<!-- <PackagesPaymentModalsPackage/> -->

<PackagesPaymentModalsPackage v-if="isOpen('add_package_modal_packages')"/>
<PackagesPaymentModalsPaymentMethods/>
<PackagesPaymentModalsCard v-if="isOpen('cardModal_packages')"/>
<PackagesPaymentModalsSuccess/>
<ProfileBillingModalsAddnewCard v-if="isOpen('add_new_card_billing')"/>
<PackagesNavbar  />
<PackagesPaymentModalsCryptoStep1     v-if="isOpen('crypto_packages_step1')"/>
<PackagesPaymentModalsCryptoStep2    v-if="isOpen('crypto_packages_step2')"/>
<PackagesPaymentModalsCryptoSuccess/>
<PackagesPaymentModalsPaypal/>
<!-- <PackagesNavbartab v-else-if="!packagesStore.showNavbar && packagesStore.currentTabTitle !== 'Plugins'"/> -->

  <NuxtPage/>
  
</div>
</template>

<style>

</style>
