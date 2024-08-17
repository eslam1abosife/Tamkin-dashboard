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
    space-y-[15px] w-[329px] h-[140px] lg:mt-[-60px]"
  >
    <div class="flex items-start justify-between w-full">
      <div>
        <div class="relative">
          <img v-if="profileStore.member.user_image" :src="`https://tamkin.app/${profileStore.member.user_image}`" class="h-[80px] w-[80px] rounded-full" alt="">
          <img v-else src="/assets/imgs/avatar.png" class="h-[80px] w-[80px]" alt="" />
          <div @click="openModal('editMemberPic','profile')"
            class="absolute top-[52px] right-0 drop-shadow-md cursor-pointer bg-white w-[24px] h-[24px] rounded-full flex items-center justify-center"
          >
            <img src="/imgs/pencil.svg" alt="" />
          </div>
        </div>

      </div>
      <div class="flex flex-col items-start justify-center space-y-[8px]">
        <div
        class="text-[16px] leading-[22px] text-[#3D3D3D] font-[600] mt-[16px]"
      >
        {{ memberFullName }}
      </div>
      <div class="text-[13px] font-[500] leading-[20px] text-[#878787]">{{ profileStore.getRole }}</div>

        <div class="text-[#616161] text-[13px] font-[500] leading-[18px] ">{{ profileStore.member.country ? profileStore.member.country : 'N/A' }}</div>
      </div>
      <div
        class="w-[59px] h-[27px] shadow-inner rounded-[23px] text-white bg-tamkin flex items-center justify-center text-[14px] font-[500] leading-[27px]"
      >
        <div v-if="profileStore.member.is_active">Active</div>
        <div v-else>Inactive</div>
      </div>


    </div>
  </div>

</template>