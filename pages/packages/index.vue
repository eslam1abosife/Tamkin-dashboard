<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});
const pricingType = ref("monthly");
const packagesStore = usePackgesStore();
const switchBetweenMonthlyAndAnnual = (v: any) => {
  pricingType.value = v;
};

const rect = computed(() => {
  return packagesStore.currentTabTitle === "Plugins";
});
onMounted(async ()=>{
 packagesStore.getPacks()

})
// provide("pricingType", pricingType);
</script>

<template>
  <div class="w-full relative px-[40px]">
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <!-- <PackagesPaymentModalsPackage/> -->
      <!-- <PackagesPaymentModalsAddons/> -->
      <!-- <PackagesPaymentModalsJoinInvestorStep1/> -->
      <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap"
        v-if="packagesStore.currentTabTitle === 'Plugins'"
      >
        <div
          v-html="
            packagesStore.getTabDetails('Sign language', 'Web Plugins Package', 'bundle')
              .color_title
          "
        ></div>
      </div>

      <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap"
        v-if="packagesStore.currentTabTitle === 'Media'"
      >
        <span
          class="bg-gradient-to-br from-[#31A69F] via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text"
          >{{ packagesStore.getTabDetails("Media", null, "media").color_title }}</span
        >
      </div>

      <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap"
        v-if="packagesStore.currentTabTitle === 'Documents'"
      >
        <span
          class="bg-gradient-to-br from-[#31A69F] via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text"
        >
          {{ packagesStore.getTabDetails("Media", null, "media").color_title }}
        </span>
      </div>

      <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap"
        v-if="packagesStore.currentTabTitle === 'Images'"
      >
        <span
          class="bg-gradient-to-br from-[#31A69F] via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text"
        >
          {{ packagesStore.getTabDetails("Media", null, "media").color_title }}
        </span>
      </div>

      <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap"
        v-if="packagesStore.currentTabTitle === 'Bundle'"
      >
        <span
          class="bg-gradient-to-br from-[#31A69F] via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text"
        >
          {{ packagesStore.getTabDetails("Media", null, "media").color_title }}
        </span>
      </div>

      <div
        v-if="packagesStore.currentTabTitle === 'Plugins'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
          packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
            .description
        }}
      </div>

      <div
        v-if="packagesStore.currentTabTitle === 'Media'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
          packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
            .description
        }}
      </div>
      <div
        v-if="packagesStore.currentTabTitle === 'Documents'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
          packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
            .description
        }}
      </div>
      <div
        v-if="packagesStore.currentTabTitle === 'Images'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
          packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
            .description
        }}
      </div>
      <div
        v-if="packagesStore.currentTabTitle === 'Bundle'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
          packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
            .description
        }}
      </div>
    </div>
    <!-- SECONDARY NAV-->

    <div
      class="flex items-center justify-center mt-[60px] rtl:space-x-reverse space-x-[40px]"
    >
      <div
        v-for="cat in packagesStore.categories"
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
            packagesStore.currentTab.name === cat.name ? 'text-white ' : 'text-[#878787]',
          ]"
        >
          {{ cat.title }}
        </div>
      </div>
    </div>
    <!-- SECONDARY NAV-->

    <!-- PACKAGES-->
    <div
      class="flex items-center justify-between rounded-full bg-tamkinLight h-[32px] dark:bg-transparent dark:border-darkGrey absolute right-[3.3%] top-[90px] p-[4px] border border-gray-300"
    >
      <button
        @click="switchBetweenMonthlyAndAnnual('monthly')"
        :class="[pricingType === 'monthly' ? 'bg-white dark:bg-light rounded-full' : '']"
        class="w-[68px] transition-all h-[22px] flex items-center justify-center ease-in-out text-darkGrey dark:text-whiteTamkin font-[500] text-[10px] leading-[22.5px]"
      >
        Monthly
      </button>
      <button
        :class="[pricingType === 'annual' ? 'bg-white dark:bg-light rounded-full' : '']"
        @click="switchBetweenMonthlyAndAnnual('annual')"
        class="h-[22px] p-1 transition-all ease-in-out flex items-center justify-center"
      >
        <div class="text-darkGrey dark:text-whiteTamkin font-[500] text-[10px]">
          Annual
        </div>
        <div class="ml-1 !text-black dark:!text-whiteTamkin/80 !text-[10px] !font-[600]">
          SAVE 12%
        </div>
      </button>
    </div>
    <div class="grid grid-cols-1 w-full">
      <PackagesWebpluginsPricing
        v-if="packagesStore.currentTabTitle === 'Plugins' ||packagesStore.currentTabTitle === 'Bundle'"
    
      />
      <PackagesMediaPricing v-else-if="packagesStore.currentTabTitle === 'Media' || packagesStore.currentTabTitle === 'Documents'
      || packagesStore.currentTabTitle === 'Images'" />

      <PackagesViewFeatures  />
    </div>

  

    <div></div>
    <!-- PACKAGES-->

    <!-- SHOW MORE DETAILS-->

    <!-- END SHOW MORE DETAILS-->

    <!--BUY MORE START  words-->


    <div
 
      class="mt-[32px] w-full p-[40px] grid gap-[30px] grid-cols-2 mx-auto h-auto bg-gradient-to-l from-[#EEE4FF] via-[#BCD7FF] to-[#F5FFFE] rounded-[10px]"
    >
      <div v-for="addon in packagesStore.getAddonsOrExtras('Extra').filter(g=>g.custom_extra_type === 'words')" :key="addon.name"
        class="relative flex p-[40px] flex-col items-center justify-start space-y-[10px] bg-white/[48%] rounded-[10px] h-[303px]"
      >
        <div class="absolute top-[-24.5px]">
          <img :src="`http://tamkin.app/${addon.icon}`" class="w-[49px] h-[70px]" alt="" />
        </div>
        <div class="text-[16px] font-[600] leading-[32px] text-[#021328]">{{addon.title}}</div>
        <div class="text-[13px] leading-[19px] font-[500] text-black text-center">
       {{ addon.description }}
        </div>

        <div class="my-[14px] text-[16px] font-[700] leading-[32px] text-black">
          {{addon.title}}
        </div>
        <div class="text-[12px] font-[600] leading-[29px] text-darkGrey">$ {{addon.package_price_role[0].cost_month}}</div>
        <button class="btn_bordered_dashboard absolute bottom-[24px]">
          Purchase Now
        </button>
      </div>
    </div>

    <!-- BUY MORE END-->

    <!-- BUY MORE MINUTES START-->
    <div
 
      class="w-full p-[40px] grid gap-[30px] grid-cols-2 mx-auto h-[315px] mt-[32px] bg-gradient-to-l from-[#D1F7F4] to-[#FFFFFF] rounded-[10px]"
    >
      <div
        v-for="ex in packagesStore.getAddonsOrExtras('Extra').filter(g=>g.custom_extra_type === 'minutes')" :key="ex.name"
        class="relative flex p-[40px] flex-col items-center justify-start space-y-[10px] bg-white/[48%] rounded-[10px] h-[245px]"
      >
      <div class="absolute top-[-24.5px]">
        <img :src="`http://tamkin.app/${ex.icon}`" class="w-[79px] h-[75px]" alt="" />
      </div>
      <div class="text-[16px] font-[600] leading-[32px] text-[#021328]">{{ex.title}}</div>
      <div class="text-[13px] leading-[19px] font-[500] text-black text-center">
     {{ ex.description }}
      </div>

      <div class="my-[14px] text-[16px] font-[700] leading-[32px] text-black">
        {{ex.title}}
      </div>
      <div class="text-[12px] font-[600] leading-[29px] text-darkGrey">$ {{ex.package_price_role[0].cost_month}}</div>
      <button class="btn_bordered_dashboard absolute bottom-[24px]">
        Purchase Now
      </button>
      </div>
   
    </div>
    <!-- BUY MORE MINUTES END-->

    <!-- Additional addons start-->

    <PackagesWebpluginsAdditional v-if="packagesStore.currentTabTitle === 'Plugins'" />

    <!-- ADDTIONAL ADDONS END-->

    <!-- FAQ START-->

    <PackagesFaq />

    <!-- FAQ END-->

    <div class="w-full h-[334px] bg-white rounded-[10px] relative mt-[32px] mx-auto">
      <div
        class="absolute z-20 w-[95%] h-[170px] top-[90px] bg-gradient-to-l from-[#D5F6F4] via-[#D5F6F4]/[30%] to-white"
      ></div>

      <div class="absolute right-[70px] top-[25px] z-50">
        <img src="/imgs/av.png" alt="" />
      </div>
      <div
        class="absolute h-[246px] z-50 w-[379px] left-0 bg-gradient-to-t from-[#F7C1D3]/[52%] to-[#A9CAF2]/[52%] top-[45px] rounded-r-[55px] flex items-start justify-center flex-col p-[32px]"
      >
        <div class="text-[20px] font-[600] leading-[24px] text-black text-left">
          Have more questions?
        </div>
        <div class="text-[14px] font-[500] leading-[25px] text-black mt-[10px] text-left">
          We're here to help reach out anytime for the answers and support you need!
        </div>

        <button class="btn-dashboard hover_tamkin max-w-[136px] mt-[32px]">
          Contact us
        </button>
      </div>
    </div>
  </div>
</template>

<style></style>
