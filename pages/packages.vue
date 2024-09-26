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
  },
  { immediate: true }
);
onBeforeMount(async () => {
  // Fetch the packages and ensure the data is available
  await packagesStore.getDataPackage();

  updateCurrentType();

  checkPaymentStatus();

  // Update the current type based on the route
});
const router = useRouter();
const checkPaymentStatus = async () => {
  if (route.query && route.query.paid && route.query.locale) {
    if (route.query.locale === "ar") {
      await router.push({
        name: route.name,
        query: { paid: route.query.paid, locale: "ar" },
      });

      await nextTick();
      openModal("success_pay_package");
    } else {
      openModal("success_pay_package");
    }
  }
};
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
    <PackagesNavbar />

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

    <NuxtPage />
  </div>
</template>

<style>

</style>
