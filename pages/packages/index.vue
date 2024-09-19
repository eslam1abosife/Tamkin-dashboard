<script lang="ts" setup>
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
  setData
} = useModalManager();
const openBuyModal = (pck)=>{
  packagesStore.currentPackage = pck
  openModal('add_package_modal_packages')
}
const pricingType = ref("monthly");
const packagesStore = usePackgesStore();
const switchBetweenMonthlyAndAnnual = (v: any) => {
  packagesStore.discountType = v;
};


onMounted(async () => {

  packagesStore.loadingData = true

// await  packagesStore.getPackagesTypes('Sign language')

  await packagesStore.getPacks()
await packagesStore.getCategories()


packagesStore.currentTab = packagesStore.categories[0]
packagesStore.intialTab = packagesStore.categories[0]
        packagesStore.currentTabTitle = packagesStore.categories[0].title

packagesStore.loadingData = false

});

onUpdated(()=>{
packagesStore.setFaq()
    
})


// provide("pricingType", pricingType);
</script>

<template>
  <div class="w-full relative px-[40px]" v-if="packagesStore.currentType.title === 'Sign language' ">
    <!-- <DashboardToastSuccess message="test" :hide-in="50000"/> -->
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <!-- <PackagesPaymentModalsAddons/> -->
      <!-- <PackagesPaymentModalsJoinInvestorStep1/> -->
      <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap"
  
      >
      <div v-html="$t(`${packagesStore.getTabDetails().color_title}`)"></div>
      <!-- <div class="flex items-center justify-center space-x-1 ">
        <div class="rtl:order-2"> للغة الإشارة </div>
        <div class="rtl:order-1 " style="background: linear-gradient(to bottom right, #46A095, #46A095, #17159D); -webkit-background-clip: text; background-clip: text; color: transparent;">باقة خدمات الويب</div>
      </div> -->
 
      </div>
  
      
      <div
      class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
    >
      {{
        $t(packagesStore.getTabDetails()
        .description)
      }}
    </div>
      <!-- <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap"
        v-if="packagesStore.currentTabTitle === 'Media'"
      >
        <span
          class="bg-gradient-to-br from-[#31A69F] via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text"
          >{{ $t(packagesStore.getTabDetails("Media", null, "media").color_title) }}</span
        >
      </div>


      <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap"
        v-if="packagesStore.currentTabTitle === 'Images'"
      >
        <span
          class="bg-gradient-to-br from-[#31A69F] via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text"
        >
          {{ $t(packagesStore.getTabDetails("Media", null, "media").color_title) }}
        </span>
      </div>

      <div
        class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap"
        v-if="packagesStore.currentTabTitle === 'Bundle'"
      >
        <span
          class="bg-gradient-to-br from-[#31A69F] via-[#1E4FB0] to-[#C520AB] text-transparent bg-clip-text"
        >
          {{ $t(packagesStore.getTabDetails("Media", null, "media").color_title )}}
        </span>
      </div> -->
   
      <!-- <div
        v-if="packagesStore.currentTabTitle === 'Plugins'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
      $t(    packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
      .description)
        }}
      </div>

      <div
        v-if="packagesStore.currentTabTitle === 'Media'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
          $t(packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
          .description)
        }}
      </div>
      <div
        v-if="packagesStore.currentTabTitle === 'Documents'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
          $t(packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
          .description)
        }}
      </div>
      <div
        v-if="packagesStore.currentTabTitle === 'Images'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
          $t(packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
          .description)
        }}
      </div>
      <div
        v-if="packagesStore.currentTabTitle === 'Bundle'"
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        {{
          $t(packagesStore.getTabDetails("Sign language", "Web Plugins Package", null)
          .description)
        }}
      </div> -->
    </div>

    <div v-if="!packagesStore.loadingData"
      class="flex items-center justify-center mt-[60px] rtl:space-x-reverse space-x-[40px]"
    >
      <div
        v-for="cat in packagesStore.categories.filter(c=>c.title !== 'Bundle')"
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
          {{ $t(cat.title )}}
        </div>
      </div>
    </div>
    <div v-if="packagesStore.loadingData" class="flex items-center justify-center mt-[60px] rtl:space-x-reverse space-x-[40px]">
      <!-- Placeholder Loader -->
      <div v-for="i in 3" :key="i" class="h-[24px] flex items-center justify-center rounded-[4px] p-[10px] cursor-pointer animate-pulse">
        <div class="w-[100px] h-[18px] bg-gray-300 rounded"></div>
      </div>
    </div>
    
    <!-- SECONDARY NAV-->

    <!-- PACKAGES-->
    <div
      class="flex items-center justify-between rounded-full bg-tamkinLight h-[42px]  w-auto
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
            packagesStore.types.length ?  packagesStore.types.find(type => type.title === 'Sign language').discount_yearly :''
          }}%</div
        >
        </div>
      </button>
    </div>
    <div class="grid grid-cols-1 w-full relative">
      <div v-if="packagesStore.loadingData" class="grid grid-cols-3 lg:gap-4 2xl:gap-4 3xl:gap-0 mx-auto mt-[32px] w-full ipad-max:grid-cols-2">
        <!-- Skeleton Loader -->
        <div v-for="i in 3" :key="i" class="flex items-center flex-col mx-auto justify-start rounded-t-[10px] relative max-w-[400px] rounded-b-none mt-[35px] bg-white w-full p-6 animate-pulse">
          
          <!-- Icon Skeleton -->
          <div class="absolute top-[-30px] rtl:right-[15px] ltr:left-[15px]">
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
      <PackagesWebpluginsPricing
        v-if="
          (packagesStore.currentTabTitle === 'Plugins' && !packagesStore.loadingData)||
          (packagesStore.currentTabTitle === 'Bundle'&& !packagesStore.loadingData ) 
        "
      />


      
      <PackagesMediaPricing
        v-if="
         ( packagesStore.currentTabTitle === 'Media' || packagesStore.currentTabTitle === 'Documents' ||packagesStore.currentTabTitle === 'Images') && !packagesStore.loadingData
   
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
          .filter((g) => g.custom_extra_type === 'words').length && !packagesStore.loadingData
      "
      class="mt-[32px] w-full p-[40px] grid gap-[30px] grid-cols-2 mx-auto h-auto bg-gradient-to-l from-[#EEE4FF] via-[#BCD7FF] to-[#F5FFFE] rounded-[10px]"
    >
      <div
        v-for="addon in packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'words').sort((a, b) => a.sort - b.sort)"
        :key="addon.name"
        class="relative flex p-[40px] flex-col items-center justify-start space-y-[10px] bg-white/[48%] rounded-[10px] h-[303px]"
      >
        <div class="absolute top-[-24.5px]">
          <img
            :src="`http://tamkin.app/${addon.icon}`"
            class="w-auto h-auto"
            alt=""
          />
        </div>
        <div class="text-[16px] font-[600] leading-[32px] text-[#021328]">
          {{ $t(addon.title) }}
        </div>
        <div class="text-[13px] leading-[19px] font-[500] text-black text-center">
          {{ $t(addon.description) }}
        </div>

        <div class="my-[14px] text-[16px] font-[700] leading-[32px] text-[#021328]">
          {{ $t(addon.sub_title) }}
        </div>
       
        <div class="text-[15px] font-[600] leading-[29px] text-darkGrey">
          $

          {{
       
           addon.package_price_role[0].cost_month.toFixed(0)
            
          }}
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
      
        <button @click="openBuyModal(addon)" class="btn_bordered_dashboard absolute bottom-[24px] ipad-max:bottom-[12px]">
          {{ $t('Purchase Now') }}
        </button>
      </div>
    </div>

    <!-- BUY MORE END-->

    <!-- BUY MORE MINUTES START-->
    <div
      v-if="
        packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'minutes').length && !packagesStore.loadingData
      "
      class="w-full p-[40px] grid gap-[30px] grid-cols-2 mx-auto h-auto mt-[32px] bg-gradient-to-l from-[#D1F7F4] to-[#FFFFFF] rounded-[10px]"
    >
    <div
    v-for="addon in packagesStore
      .getAddonsOrExtras('Extra')
      .filter((g) => g.custom_extra_type === 'minutes').sort((a, b) => a.sort - b.sort)"
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
      {{ $t(addon.title )}}
    </div>
    <div class="text-[13px] leading-[19px] font-[500] text-black text-center">
      {{ $t(addon.description) }}
    </div>

    <div class="my-[14px] text-[16px] font-[700] leading-[32px] text-[#021328]">
      {{ $t(addon.sub_title) }}
    </div>

  
    <div class="text-[15px] font-[600] leading-[29px] text-darkGrey">
      $

 
     
           {{addon.package_price_role[0].cost_month}}
         
    </div>

    <button @click="openBuyModal(addon)" class="btn_bordered_dashboard absolute bottom-[24px]">
      {{ $t('Purchase Now') }}
    </button>
  </div>
    </div>

    <div
      v-if="
        packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'Characters').length &&
        packagesStore.currentTabTitle === 'Documents' && !packagesStore.loadingData
      "
      class="w-full p-[40px] grid gap-[30px] grid-cols-2 mx-auto h-[315px] mt-[32px] bg-gradient-to-l from-[#D1F7F4] to-[#FFFFFF] rounded-[10px]"
    >
      <div
        v-for="ex in packagesStore
          .getAddonsOrExtras('Extra')
          .filter((g) => g.custom_extra_type === 'Characters').sort((a, b) => a.sort - b.sort)"
        :key="ex.name"
        class="relative flex p-[40px] flex-col items-center justify-start space-y-[10px] bg-white/[48%] rounded-[10px] h-[245px]"
      >
        <div class="absolute top-[-24.5px]">
          <img :src="`http://tamkin.app/${ex.icon}`" class="w-[79px] h-[75px]" alt="" />
        </div>
        <div class="text-[16px] font-[600] leading-[32px] text-[#021328]">
          {{ $t(ex.title) }}
        </div>
        <div class="text-[13px] leading-[19px] font-[500] text-black text-center">
          {{ $t(ex.description) }}
        </div>

        <div class="my-[14px] text-[16px] font-[700] leading-[32px] text-black">
          {{ $t(ex.title) }}
        </div>
        <div class="text-[12px] font-[600] leading-[29px] text-darkGrey">
          $ {{ ex.package_price_role[0].cost_month }}
        </div>
        <button class="btn_bordered_dashboard absolute bottom-[24px]">
          {{ $t('Purchase Now') }}
        </button>
      </div>
    </div>
    <!-- BUY MORE MINUTES END-->
    <PackagesMediaServices v-if="packagesStore.currentTabTitle === 'Media' && !packagesStore.loadingData" />

    <!-- Additional addons start-->
    <PackagesWebpluginsAdditional
      v-else-if="packagesStore.currentTabTitle === 'Plugins' && !packagesStore.loadingData"
    />
    <PackagesDocumentsServices v-if="packagesStore.currentTabTitle === 'Documents' && !packagesStore.loadingData" />

    <PackagesImagesServices v-if="packagesStore.currentTabTitle === 'Images' && !packagesStore.loadingData" />
    <!-- ADDTIONAL ADDONS END-->

    <!-- FAQ START-->

    <PackagesFaq v-if="!packagesStore.loadingData"/>

    <!-- FAQ END-->

  <PackagesContact/>
    
  </div>
</template>

<style></style>
