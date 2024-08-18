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

const memberFullName = computed(() => {
  return `${profileStore.member.first_name} ${profileStore.member.last_name}`;
});

</script>

<template>

    <div
    class="bg-white/60 rounded-[10px] backdrop-blur-md shadow-sm  flex flex-col items-start justify-center p-[15px] 
    space-y-[15px] ipad-max:w-full w-full h-[140px] lg:mt-[-60px]"
  >
    <div class="flex items-start 2xl:space-x-[50px] lg:space-x-[16px] w-full ipad-max:space-x-[16px]">
      <div>
        <div class="relative">
          <img v-if="profileStore.member.user_image" :src="`https://tamkin.app/${profileStore.member.user_image}`" 
          class="h-[80px] w-[80px] ipad-max:w-[40px] ipad-max:h-[40px] rounded-full" alt="">
          <img v-else src="/assets/imgs/avatar.png" class="h-[80px] w-[80px]" alt="" />
          <div @click="openModal('editMemberPic','profile')"
            class="absolute top-[52px] right-0 drop-shadow-md cursor-pointer bg-white ipad-max:top-[25px] ipad-max:w-[16px] ipad-max:h-[16px] w-[24px] h-[24px] rounded-full flex items-center justify-center"
          >
            <img src="/imgs/pencil.svg" alt="" class="ipad-max:w-[10px] ipad-max:h-[10px]" />
          </div>
        </div>

      </div>
      <div class="flex flex-col items-start justify-center ipad-max:space-y-1 space-y-[8px]">
        <div
        class="text-[16px] ipad-max:text-[13px] ipad-max:whitespace-nowrap leading-[22px] text-[#3D3D3D] font-[600] mt-[16px]"
      >
        {{ memberFullName }}
      </div>
      <div class="text-[13px] ipad-max:text-[11px] font-[500] leading-[20px] text-[#878787]">{{ profileStore.getRole }}</div>

        <div class="text-[#616161] text-[13px] ipad-max:text-[11px] font-[500] leading-[18px] ">{{ profileStore.member.country ? profileStore.member.country : 'N/A' }}</div>
      </div>
      <div
        class="w-[59px] h-[27px] ipad-max:w-[46px] ipad-max:h-[20px] shadow-inner rounded-[23px]
         text-white bg-tamkin flex items-center justify-center  "
      >
        <div class="ipad-max:text-[11px] text-[14px]  font-[500]" v-if="profileStore.member.is_active">Active</div>
        <div class="ipad-max:text-[11px] text-[14px]  font-[500]" v-else>InActive</div>
      </div>


    </div>
  </div>

</template>