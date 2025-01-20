<script lang="ts" setup>
const { locale, t } = useI18n();

useHead({
  title: t("Sign langauge Packages - Tamkin Dashboard"),
});
definePageMeta({
  layout: "dashboard",
});
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  setData,
} = useModalManager();
const openBuyModal = (pck) => {
  packagesStore.currentPackage = pck;
  openModal("add_package_modal_packages");
};
const pricingType = ref("monthly");
const packagesStore = usePackgesStore();
const switchBetweenMonthlyAndAnnual = (v: any) => {
  packagesStore.discountType = v;
};
onBeforeMount(async () => {});
const isDataReady = () => {
  return (
    packagesStore.types.length > 0 &&
    packagesStore.packages.length > 0 &&
    packagesStore.categories.length > 0
  );
};
onBeforeMount(async () => {
  // await  packagesStore.getPackagesTypes('Sign language')
  packagesStore.setFaq();

  packagesStore.currentTab = packagesStore.categories[0];

  packagesStore.intialTab = packagesStore.categories[0];

  packagesStore.currentTabTitle = packagesStore.categories[0].title;

  // packagesStore.loadingData = false
});

onUpdated(() => {
  // alert(packagesStore.)
});

// provide("pricingType", pricingType);
</script>

<template>
  <div
    class="w-full relative px-4 md:px-[40px]"
    v-if="
      !packagesStore.loadingData &&
      packagesStore.currentType.title === 'Sign language'
    "
  >
    <!-- <DashboardToastSuccess message="test" :hide-in="50000"/> -->
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <!-- <PackagesPaymentModalsAddons/> -->
      <!-- <PackagesPaymentModalsJoinInvestorStep1/> -->
      <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap dark:text-whiteTamkin"
      >
        <div v-html="$t(`${packagesStore.getTabDetails().color_title}`)"></div>
        <!-- <div class="flex items-center justify-center space-x-1 ">
        <div class="rtl:order-2"> للغة الإشارة </div>
        <div class="rtl:order-1 " style="background: linear-gradient(to bottom right, #46A095, #46A095, #17159D); -webkit-background-clip: text; background-clip: text; color: transparent;">باقة خدمات الويب</div>
      </div> -->
      </div>

      <div
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-9/12 md:w-7/12 dark:text-whiteTamkin"
      >
        {{ $t(packagesStore.getTabDetails().description) }}
      </div>
    </div>

    <!-- <div
      class="flex items-center justify-center mt-[60px] rtl:space-x-reverse space-x-[40px]"
    >
      <div
        v-for="cat in packagesStore.categories.filter(
          (c) => c.title !== 'Bundle'
        )"
        :key="cat.name"
        @click="packagesStore.changeTab(cat)"
        :class="[
          packagesStore.currentTab.name === cat.name
            ? 'bg-gradient-to-r from-[#2DADA3] to-[#3A4D8F] '
            : '',
        ]"
        class="h-[24px] flex items-center justift-center rounded-[4px] p-[10px] cursor-pointer"
      >
        <div
          class="text-[12px] font-[500] leading-[18px] text-center"
          :class="[
            packagesStore.currentTab.name === cat.name
              ? 'text-white '
              : 'text-[#878787]',
          ]"
        >
          {{ $t(cat.title) }}
        </div>
      </div>
    </div> -->

    <!-- SECONDARY NAV-->

    <!-- PACKAGES-->
    <div
      class="flex items-center justify-between rounded-full bg-tamkinLight h-[42px] w-auto dark:bg-tamkinDarkPrimary dark:border-darkborder absolute rtl:left-[3.3%] ltr:right-[3.3%] lg:top-[90px] top-[170px] sm:top-[150px] p-[4px] border border-gray-300"
    >
      <button
        @click="switchBetweenMonthlyAndAnnual('month')"
        :class="[
          packagesStore.discountType === 'month'
            ? 'bg-white dark:bg-darkTamkin rounded-full'
            : '',
        ]"
        class="w-auto px-3 transition-all h-[32px] flex items-center justify-center ease-in-out text-darkGrey dark:text-whiteTamkin/80 font-[500] text-[12px] leading-[22.5px]"
      >
        {{ $t("Monthly") }}
      </button>
      <button
        @click="switchBetweenMonthlyAndAnnual('year')"
        :class="[
          packagesStore.discountType === 'year'
            ? 'bg-white dark:bg-darkTamkin rounded-full'
            : '',
        ]"
        class="w-auto px-3 transition-all h-[32px] flex items-center justify-center ease-in-out text-darkGrey rtl:space-x-reverse space-x-1 dark:text-whiteTamkin/80 font-[500] text-[12px] leading-[22.5px]"
      >
        <div>{{ $t("Annual") }}</div>
        <div
          class="flex items-center justify-center rtl:space-x-reverse space-x-[4px]"
        >
          <div class="text-black dark:text-white font-[800] !text-[10px]">
            {{ $t("SAVE") }}
          </div>
          <div class="text-black dark:text-white font-[800] !text-[10px]">
            {{
              packagesStore.types.length
                ? packagesStore.types.find(
                    (type) => type.title === "Sign language"
                  ).discount_yearly
                : ""
            }}%
          </div>
        </div>
      </button>
    </div>

    <div class="grid grid-cols-1 w-full relative mt-[60px]">
      <PackagesWebpluginsPricing
        v-if="
          packagesStore.currentTabTitle === 'Plugins' ||
          packagesStore.currentTabTitle === 'Bundle'
        "
      />

      <PackagesMediaPricing
        v-if="
          packagesStore.currentTabTitle === 'Media' ||
          packagesStore.currentTabTitle === 'Documents' ||
          packagesStore.currentTabTitle === 'Images'
        "
      />
      <!-- <PackagesViewFeatures /> -->
    </div>

    <div></div>
    <!-- PACKAGES-->

    <!-- SHOW MORE DETAILS-->

    <!-- END SHOW MORE DETAILS-->

    <!--BUY MORE START  words-->

    <div
      v-if="
        packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'words').length
      "
      class="mt-[32px] w-full p-[40px] px-0 grid dark:bg-p gap-[30px] grid-cols-1 md:grid-cols-2 mx-auto h-auto bg-gradient-to-l from-[#EEE4FF] via-[#BCD7FF] to-[#F5FFFE] rounded-[10px]"
    >
      <div
        v-for="addon in packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'words')
          .sort((a, b) => a.sort - b.sort)"
        :key="addon.name"
        class="relative flex p-[40px] flex-col items-center justify-start space-y-[10px] bg-white/[48%] rounded-[10px] h-[303px] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
      >
        <div class="absolute top-[-24.5px]">
          <img
            :src="`http://tamkin.app/${addon.icon}`"
            class="w-auto h-auto"
            alt=""
          />
        </div>
        <div
          class="text-[16px] font-[600] dark:text-whiteTamkin leading-[32px] text-[#021328]"
        >
          {{ $t(addon.title) }}
        </div>
        <div
          class="text-[13px] leading-[19px] dark:text-whiteTamkin font-[500] text-black text-center"
        >
          {{ $t(addon.description) }}
        </div>

        <div
          class="my-[14px] text-[16px] font-[700] dark:text-whiteTamkin leading-[32px] text-[#021328]"
        >
          {{ $t(addon.sub_title) }}
        </div>

        <div
          class="text-[15px] font-[600] leading-[29px] dark:text-whiteTamkin text-darkGrey"
        >
          $

          {{ addon.package_price_role[0].cost_month.toFixed(0) }}
        </div>

        <!-- <div  
        v-if="addon.package_price_role[0].discount_month || addon.package_price_role[0].discount_yearly"
        class="absolute bottom-[65px] lg:bottom-[75px] ipad-max:bottom-[80px] text-[#EA4335] text-[12px] leading-[18.17px] 
        font-[400] line-through flex w-full"
      >
        <div v-if="packagesStore.discountType === 'month' && addon.package_price_role[0].discount_month" class="flex items-center justify-center w-full">
          <div>{{ `$` + addon.package_price_role[0].cost_before_month }}</div>
        </div>
      
        <div v-if="packagesStore.discountType === 'year' && addon.package_price_role[0].discount_yearly" class="flex items-center justify-center w-full">
          <div>{{ `$` + addon.package_price_role[0].cost_before_yearly }}</div>
        </div>
      </div> -->

        <button
          @click="openBuyModal(addon)"
          class="btn_bordered_dashboard absolute bottom-[24px] ipad-max:bottom-[12px]"
        >
          {{ $t("Purchase Now") }}
        </button>
      </div>
    </div>

    <!-- BUY MORE END-->

    <!-- BUY MORE MINUTES START-->
    <div
      v-if="
        packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'minutes').length
      "
      class="w-full p-[40px] grid gap-[30px] grid-cols-2 mx-auto h-auto mt-[32px] bg-gradient-to-l from-[#D1F7F4] to-[#FFFFFF] rounded-[10px]"
    >
      <div
        v-for="addon in packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'minutes')
          .sort((a, b) => a.sort - b.sort)"
        :key="addon.name"
        class="relative flex p-[40px] flex-col items-center justify-start space-y-[10px] bg-white/[48%] rounded-[10px] h-[303px]"
      >
        <div class="absolute top-[-24.5px]">
          <img
            :src="`http://tamkin.app/${addon.icon}`"
            class="w-[79px] h-[75px]"
            alt=""
          />
        </div>

        <div class="text-[16px] font-[600] leading-[32px] text-[#021328]">
          {{ $t(addon.title) }}
        </div>
        <div
          class="text-[13px] leading-[19px] font-[500] text-black text-center"
        >
          {{ $t(addon.description) }}
        </div>

        <div
          class="my-[14px] text-[16px] font-[700] leading-[32px] text-[#021328]"
        >
          {{ $t(addon.sub_title) }}
        </div>

        <div class="text-[15px] font-[600] leading-[29px] text-darkGrey">
          $

          {{ addon.package_price_role[0].cost_month }}
        </div>

        <button
          @click="openBuyModal(addon)"
          class="btn_bordered_dashboard absolute bottom-[24px]"
        >
          {{ $t("Purchase Now") }}
        </button>
      </div>
    </div>

    <div
      v-if="
        packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'Characters').length &&
        packagesStore.currentTabTitle === 'Documents'
      "
      class="w-full p-[40px] grid gap-[30px] grid-cols-2 mx-auto h-[315px] mt-[32px] bg-gradient-to-l from-[#D1F7F4] to-[#FFFFFF] rounded-[10px]"
    >
      <div
        v-for="ex in packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'Characters')
          .sort((a, b) => a.sort - b.sort)"
        :key="ex.name"
        class="relative flex p-[40px] flex-col items-center justify-start space-y-[10px] bg-white/[48%] rounded-[10px] h-[245px]"
      >
        <div class="absolute top-[-24.5px]">
          <img
            :src="`http://tamkin.app/${ex.icon}`"
            class="w-[79px] h-[75px]"
            alt=""
          />
        </div>
        <div class="text-[16px] font-[600] leading-[32px] text-[#021328]">
          {{ $t(ex.title) }}
        </div>
        <div
          class="text-[13px] leading-[19px] font-[500] text-black text-center"
        >
          {{ $t(ex.description) }}
        </div>

        <div class="my-[14px] text-[16px] font-[700] leading-[32px] text-black">
          {{ $t(ex.title) }}
        </div>
        <div class="text-[12px] font-[600] leading-[29px] text-darkGrey">
          $ {{ ex.package_price_role[0].cost_month }}
        </div>
        <button class="btn_bordered_dashboard absolute bottom-[24px]">
          {{ $t("Purchase Now") }}
        </button>
      </div>
    </div>
    <!-- BUY MORE MINUTES END-->
    <PackagesMediaServices
      v-if="
        packagesStore.currentTabTitle === 'Media' && !packagesStore.loadingData
      "
    />

    <!-- Additional addons start-->
    <PackagesWebpluginsAdditional />
    <PackagesDocumentsServices
      v-if="
        packagesStore.currentTabTitle === 'Documents' &&
        !packagesStore.loadingData
      "
    />

    <PackagesImagesServices
      v-if="
        packagesStore.currentTabTitle === 'Images' && !packagesStore.loadingData
      "
    />
    <!-- ADDTIONAL ADDONS END-->

    <!-- FAQ START-->

    <PackagesFaq
      v-if="
        !packagesStore.loadingData &&
        packagesStore.currentType.title === 'Sign language'
      "
    />

    <!-- FAQ END-->

    <PackagesContact
      v-if="
        !packagesStore.loadingData &&
        packagesStore.currentType.title === 'Sign language'
      "
    />
  </div>
</template>

<style></style>
