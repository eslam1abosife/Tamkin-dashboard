<script lang="ts" setup>
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();

const profileStore = useProfileStore();
</script>

<template>

    <div
    class="bg-white/60 rounded-[10px] backdrop-blur-md shadow-sm  flex flex-col items-start justify-center p-[15px] 
    space-y-[15px] ipad-max:w-full w-full h-[140px] lg:mt-[-60px]"
  >
  <div class="flex items-start justify-between  w-full">
    <div class="flex items-center justify-start 2xl:gap-4 lg:gap-4  ipad-max:space-x-[0]  w-full">
      <div>
        <div class="relative">
          <img v-if="profileStore.company.team_image" :src="`https://tamkin.app/${profileStore.company.team_image}`"
          class="2xl:h-[80px] 2xl:w-[80px] lg:w-[60px] lg:h-[60px] ipad-max:w-[60px] ipad-max:h-[60px] rounded-full" >
          <img v-else src="/imgs/company_img.png" class="2xl:h-[80px] 2xl:w-[80px] lg:w-[60px] lg:h-[60px] ipad-max:w-[40px] ipad-max:h-[40px] rounded-full" alt="" />
          <div @click="openModal('editteampic','profile')"
          class="absolute lg:top-[36px] 2xl:top-[52px] right-0 drop-shadow-md cursor-pointer bg-white ipad-max:top-[30px] ipad-max:w-[16px] ipad-max:h-[16px] w-[24px] h-[24px] rounded-full flex items-center justify-center"
          >
            <img src="/imgs/pencil.svg" alt="" class="ipad-max:w-[10px] ipad-max:h-[10px]"/>
          </div>
        </div>

      </div>
      <div class="flex flex-col items-start justify-center ipad-max:space-y-1 space-y-[8px] w-2/4">
        <div
        class="text-[14px] 2xl:text-[16px] ipad-max:text-[13px] ipad-max:whitespace-nowrap leading-[22px] text-[#3D3D3D] font-[600] "
        >
        <!-- {{ profileStore.company.agency_name ? profileStore.company.agency_name : 'N/A' }} -->
        {{ profileStore.company.team_name ? profileStore.company.team_name : 'N/A' }}
      </div>
      <div class="lg:text-[11px] 2xl:text-[13px]  ipad-max:text-[11px] font-[500] leading-[20px] text-[#878787]">{{ profileStore.company.company_specialization ? profileStore.company.company_specialization : 'N/A' }}</div>

        <div class="text-[#616161] lg:text-[11px] 2xl:text-[13px] whitespace-nowrap ipad-max:text-[11px] font-[500] leading-[18px] ">{{ profileStore.company.country ? profileStore.company.country : 'N/A' }}</div>
      </div>
     </div>
      <div
        class="w-[59px] h-[27px] ipad-max:w-[46px] ipad-max:h-[20px] shadow-inner rounded-[23px]
         text-white bg-tamkin flex items-center justify-center  "
      >
        <div class="ipad-max:text-[11px] text-[14px]  font-[500]">Active</div>
      </div>


    </div>
  </div>

</template>