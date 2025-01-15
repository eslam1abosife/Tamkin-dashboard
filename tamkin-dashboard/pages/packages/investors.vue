<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import {
  useGetInstallationGuide,
  useGetMembers,
  useSummaryDetailedCode,
} from "@/composables/useEmbedCode";
const { locale,t } = useI18n();

const { getMembers, members, loading: getMembersLoading } = useGetMembers();


useHead({
  title: t("Investors Packages - Tamkin Dashboard"),
})
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

onMounted(async () => {
  try {
    await packagesStore.getInvestorUser();

    packagesStore.setFaq();
    // packagesStore.currentTab = "";
    // packagesStore.currentTabTitle = "Plugins";
    if (!packagesStore.views_level) {
      const trafficLevels = packagesStore.getTraffiPrices("Package");
      // alert(trafficLevels)
      packagesStore.setViewsLevel(trafficLevels[0].name);
    }
  } catch (error) {
    console.error("Error during onMounted:", error);
  }
});
// onUpdated(()=>{

// })
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
        <div class="w-[50px] h-[50px] bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
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
        <div class="w-[50px] h-[50px] bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
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
        <div class="w-[50px] h-[50px] bg-gray-300 dark:bg-gray-600 rounded-full mb-4"></div>
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
    class="w-full relative px-[40px]"
    v-if="
      packagesStore.currentType.title === 'Investors' &&
      !packagesStore.loadingData
    "
  >
    <NuxtLoadingIndicator
      :key="Math.random()"
      style="background: linear-gradient(to right, #2dada3, #71dad2)"
      :height="6"
    />
    <PackagesPaymentModalsJoinInvestorStep1 />

    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <div
        class="text-[18px] font-[700] leading-[35px] whitespace-nowrap bg-gradient-to-r from-[#31A69F] via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text"
      >
        <div
          v-html="
            `${$t(
              packagesStore.getPackageDetails('Investors', null).color_title
            )}`
          "
        ></div>
      </div>

      <div
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12 dark:text-whiteTamkin"
      >
        {{ $t(packagesStore.getPackageDetails("Investors", null).description) }}
      </div>
    </div>

    <div class="flex items-center justify-between w-full mt-[26px]">
      <!-- Traffic level selection section (first) -->
      <div class="flex items-center justify-start w-2/4 p-[4px] order-1">
        <div
          class="text-black dark:text-whiteTamkin font-[600] text-[14px] w-3/6"
        >
          {{ $t("Choose Traffic level") }} :
        </div>
        <TranslateSelectInput
          @getCurrentSelectedItem="geteFilterInfo"
          :enableSearch="false"
          placeholderinput="Traffic level"
          :list="uniqueValues(packagesStore.getTraffiPrices('Package'))"
          nameKey="name"
          idField="id"
          class="w-full bg-white dark:bg-p rounded-[10px]"
          :currentListValue="packagesStore.views_level"
        />
      </div>

      <!-- What’s included section (second) -->
      <div
        class="flex items-center justify-end rtl:space-x-reverse space-x-[10px] w-2/4 order-2 cursor-pointer"
        @click="
          packagesStore.showMoreINInvestors = !packagesStore.showMoreINInvestors
        "
      >
        <div>
          <h2
            class="underline text-[14px] font-[400] leading-[24px] text-[#151515] dark:text-whiteTamkin"
          >
            {{ $t("What’s included?") }}
          </h2>
        </div>
        <div class="cursor-pointer">
          <img
            src="/assets/imgs/arrow-right.svg"
            class="w-[12px] h-[10px] rtl:rotate-180 cursor-pointer"
            :class="[
              packagesStore.showMoreINInvestors ? '!rotate-90 ' : 'rotate-0',
            ]"
          />
        </div>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center dark:bg-p_secondary bg-white rounded-[10px] mt-[26px]"
    >
      <div class="flex items-center justify-center flex-col w-full px-[18px]">
        <!-- <PackagesInveestorsPackages/> -->
        <!-- PACKAGES-->
        <!-- SHOW MORE DETAILS-->
        <PackagesInveestorsPackages />

        <!-- END SHOW MORE DETAILS-->
      </div>
      <PackagesInveestorsPackagePaid class="mt-[20px]" />
      <PackagesInveestorsInvestorPackage v-if="!packagesStore.investorUser" />
      <PackagesInveestorsInvestorprogram />

      <!-- FAQ START-->

      <PackagesFaq />

      <!-- FAQ END-->
      <PackagesContact />
    </div>
  </div>
</template>

<style></style>
