<script lang="ts" setup>
const packagesStore  = usePackgesStore()
const mySiteStore = useMySiteStore()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const openBuyModal = (pck)=>{
  packagesStore.currentPackage = pck
  navigateTo('buy_extra__service', "translate",'add_package_modal_packages')
}

onBeforeMount(()=>{
    packagesStore.currentTab = packagesStore.categories.find(t=>t.title === mySiteStore.currentWebsite.package[0].category)
    packagesStore.currentType = packagesStore.types.find(t=>t.title === 'Sign language')
    packagesStore.currentTabTitle = mySiteStore.currentWebsite.package[0].category
})
</script>


<template>

    <div
    v-if="
      packagesStore
        .getAddonsOrExtras('Extra')
        .filter((g) => g.custom_extra_type === 'words').length 
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
        .filter((g) => g.custom_extra_type === 'minutes').length 
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
</template>