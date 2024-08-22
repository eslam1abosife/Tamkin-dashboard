<script lang="ts" setup>
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const currentMode = inject('currentMode')
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
const { getAvatarLetters } = useGetAvatarLetters();

const profileStore = useProfileStore();

const memberFullName = computed(() => {
  if (!profileStore.member?.first_name && !profileStore.member?.last_name) {
    return '';
  }
  return `${profileStore.member?.first_name} ${profileStore.member?.last_name}`;
});

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
      <img v-if="profileStore.member.user_image" :src="`https://tamkin.app/${profileStore.member.user_image}`" 
      class="2xl:h-[80px] 2xl:w-[80px] lg:w-[60px] lg:h-[60px] ipad-max:w-[60px] ipad-max:h-[60px] rounded-full" alt="">
      <!-- User Img Skeleton Loader -->
      <div v-else-if="!profileStore.member.user_image && !profileStore.member.first_name && !profileStore.member.last_name" class="user-img__skeleton animate-pulse flex space-x-4">
        <div class="rounded-full bg-gray-400 2xl:h-[80px] 2xl:w-[80px] lg:w-[60px] lg:h-[60px] ipad-max:w-[60px] ipad-max:h-[60px]"></div>
      </div>
      <div v-else class="avatar_img 2xl:h-[80px] 2xl:w-[80px] lg:w-[60px] lg:h-[60px] ipad-max:w-[60px] ipad-max:h-[60px] rounded-full bg-[#2dada3] text-[#fff] grid place-content-center select-none">
        <span>
          {{
            getAvatarLetters(profileStore.member.first_name + " " + profileStore.member.last_name)
          }}
        </span>
      </div>
      <!-- <img v-else src="/assets/imgs/avatar.png"   class="2xl:h-[80px] 2xl:w-[80px] lg:w-[60px] lg:h-[60px] ipad-max:w-[40px] ipad-max:h-[40px] rounded-full"  alt="" /> -->
      <div @click="openModal('editMemberPic','profile')"
        class="absolute lg:top-[36px] 2xl:top-[52px] right-0 drop-shadow-md cursor-pointer bg-white ipad-max:top-[40px] ipad-max:w-[16px] ipad-max:h-[16px] w-[24px] h-[24px] rounded-full flex items-center justify-center"
      >
        <img src="/imgs/pencil.svg" alt="" class="ipad-max:w-[10px] ipad-max:h-[10px]" />
      </div>
    </div>

  </div>
  <div class="flex flex-col items-start justify-start ipad-max:space-y-1 space-y-[8px] w-2/4">
    <div class="text-[14px] 2xl:text-[16px] ipad-max:text-[13px] ipad-max:whitespace-nowrap leading-[22px] text-[#3D3D3D] font-[600] ">
      {{ memberFullName }}
    </div>
  <div class="lg:text-[11px] 2xl:text-[13px]  ipad-max:text-[11px] font-[500] leading-[20px] text-[#878787]">{{ profileStore.getRole }}</div>

    <div class="text-[#616161] lg:text-[11px] 2xl:text-[13px] whitespace-nowrap ipad-max:text-[11px] font-[500] leading-[18px] ">{{ profileStore.member.country ? profileStore.member.country : 'N/A' }}</div>
  </div>
</div>
      <div
        class="w-[59px] h-[27px] ipad-max:w-[46px] ipad-max:h-[20px] shadow-inner  rounded-[23px]
         text-white bg-tamkin flex items-center justify-center  "
      >
        <div class="ipad-max:text-[11px] text-[12px] 2xl:text-[14px]  font-[500]" v-if="profileStore.member.is_active">Active</div>
        <div class="ipad-max:text-[11px] text-[12px] 2xl:text-[14px]  font-[500]" v-else>InActive</div>
      </div>


    </div>
  </div>

</template>