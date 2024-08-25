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
  <div class="bg-white/60 rounded-[10px] backdrop-blur-md shadow-sm flex flex-col items-start justify-center p-[15px] space-y-[15px] w-full h-[140px] lg:mt-[-60px]">
    <div class="flex items-start justify-start w-full">
      <div class="flex items-center justify-start gap-4 w-full">
        <div class="relative">
          <!-- Placeholder Loader -->
          <div v-if="profileStore.loadingProfile"  class="h-[60px] w-[60px] 
          lg:h-[80px] lg:w-[80px] ipad-max:w-[50px] ipad-max:h-[50px] rounded-full bg-gray-300 animate-pulse"></div>
          
          <img
            v-if="!profileStore.loadingProfile && profileStore.member.user_image"
            :src="`https://tamkin.app/${profileStore.member.user_image}`"
            class="h-[60px] w-[60px] lg:h-[80px] lg:w-[80px] ipad-max:w-[50px] ipad-max:h-[50px] rounded-full"
           
          />
  
          <!-- Avatar Letters as Fallback -->
          <div
            v-if="!profileStore.member.user_image && (profileStore.member.first_name || profileStore.member.last_name) && !profileStore.loadingProfile"
            class="avatar_img h-[60px] ipad-max:text-[24px] lg:text-[32px] w-[60px] lg:h-[80px]
             lg:w-[80px] ipad-max:w-[50px] ipad-max:h-[50px] rounded-full bg-[#2dada3] text-white grid place-content-center select-none"
          >
            <span>
              {{
                getAvatarLetters(
                  profileStore.member.first_name + " " + profileStore.member.last_name
                )
              }}
            </span>
          </div>
  
          <!-- Edit Button -->
          <div v-if="!profileStore.loadingProfile"
            @click="openModal('editMemberPic', 'profile')"
            class="absolute top-[50px] right-0 ipad-max:top-[30px] drop-shadow-md cursor-pointer bg-white w-[24px] h-[24px] lg:w-[24px] ipad-max:w-[16px] ipad-max:h-[16px] lg:h-[24px] rounded-full flex items-center justify-center"
          >
            <img src="/imgs/pencil.svg" alt="" class="w-[10px] h-[10px]" />
          </div>
        </div>
  
        <!-- Member Details -->
        <div class="flex flex-col items-start justify-start space-y-1 w-2/4 truncate">
          <div
            v-if="!profileStore.loadingProfile"
            class="text-[14px] lg:text-[14px] 2xl:text-[16px] ipad-max:text-[12px] truncate ipad-max:w-14 w-32 2xl:w-44 whitespace-nowrap leading-[22px] text-[#3D3D3D] font-[600]"
          >
            {{ memberFullName }}
          </div>
          <div v-else class="bg-gray-300 animate-pulse h-[20px] w-[80px] rounded"></div>
          
          <div   v-if="!profileStore.loadingProfile" class="text-[11px] lg:text-[13px] font-[500] ipad-max:text-[10px] leading-[20px] text-[#878787]">
            {{ profileStore.isOwner ? 'Owner' : 'Member' }}
          </div>
          <div  v-else class="bg-gray-300 animate-pulse h-[20px] w-[80px] rounded"></div>

          <div class="text-[#616161] text-[11px] lg:text-[13px] ipad-max:text-[10px] font-[500] leading-[18px]" 
          v-if="!profileStore.loadingProfile">
            {{ profileStore.member.country ? profileStore.member.country : 'N/A' }}
          </div>
          <div v-else class="bg-gray-300 animate-pulse h-[20px] w-full  rounded"></div>

        </div>
      </div>
  
      <!-- Active Badge -->
      <div class="absolute right-[15px]">
        <div
          class="w-[46px] h-[20px] lg:w-[59px] lg:h-[27px] ipad-max:w-[46px] ipad-max:h-[20px] shadow-inner rounded-[23px] text-white bg-tamkin flex items-center justify-center"
        v-if="!profileStore.loadingProfile"
          >
          <div
            class="text-[11px] lg:text-[12px] font-[500] ipad-max:text-[10px]"
            
          >
            Active
          </div>
        
        </div>

        <div
        class="w-[46px] h-[20px] lg:w-[59px] lg:h-[27px] 
        ipad-max:w-[46px] ipad-max:h-[20px]  rounded-[23px] text-white bg-gray-300 flex items-center justify-center"
      v-else
        >
     
      
      </div>
      </div>
    </div>
  </div>
  
</template>
