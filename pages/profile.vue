<script lang="ts" setup>
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
definePageMeta({
  layout: "dashboard",
});

import { useProfileStore } from "~/stores/profile";
const profileStore = useProfileStore();

import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useGetProfileCompleteScore } from "@/composables/useProfile";

const { getProfileCompleteScore, score } = useGetProfileCompleteScore();

const state = reactive({
  email: "",
  Name: "",
  Company: "",
  Subject: "",
  Inquiry: "",
});
const rules = {
  email: { required, email },
  Name: { required },
  Company: {},
  Subject: { required },
  Inquiry: { required },
};

const v$ = useVuelidate(rules, state);
const currentMode = ref('normal')
const currentTab = ref("personal");

const changeTab = (tab: any) => {
  currentTab.value = tab;
};

const changeMode = (mode : any)=>{
    currentMode.value = mode
}
const copyDone = ref(false);
const copyCode = () => {
  copyDone.value = true;
};

watch(copyDone, (newValue) => {
  if (newValue) {
    // Reset copyDone after the hideIn duration
    setTimeout(() => {
      copyDone.value = false;
    }, 2000);
  }
});

watch(currentTab, (newValue) => {
  getProfileCompleteScore(newValue);
})

provide('currentMode',currentMode)

onMounted(() => {
  // profileStore.setCompany();
  getProfileCompleteScore(currentTab.value);
})
</script>

<template>
  <div class="relative w-full h-full mb-[16px] !p-0">
    <DashboardToastSuccess
    v-if="copyDone"
    :hideIn="2000"
    :message="'Copied to clipboard'"
    class="left-[50%] !top-[70px]"
  />
    <div
      class="h-[190px] bg-gradient-to-r from-[#2FAFA4] to-[#8FF2E9] w-full !mx-0 relative"
    >
      <div class="absolute inset-y-auto rtl:left-0 ltr:right-0 top-[29px]">
        <img src="/imgs/profile_hero.png" class="h-[144px]" alt="" />
      </div>
      <div class="absolute inset-y-auto left-[140px] top-[-20px]">
        <img src="/imgs/profile_vector.png" class="w-[294px] h-auto" alt="" />
      </div>
      <div class="absolute inset-y-auto left-[-40px] top-[-20px]">
        <img src="/imgs/profile_vector2.png" class="w-[294px] h-auto" alt="" />
      </div>
      <div class="absolute inset-y-auto left-[260px] top-[-40px]">
        <img src="/imgs/profile_vector3.png" class="w-[294px] h-auto" alt="" />
      </div>
      <div class="absolute bottom-[22px] ltr:right-[40px] rtl:left-[5px]">
        <button
          class="btn-default border-[1px] border-[#C5C5C5] !bg-white group hover:border-tamkin"
        >
          <div
          @click="changeMode('editing')"
            class="group-hover:bg-gradient-to-b group-hover:from-tamkinStart group-hover:to-tamkinEnd group-hover:bg-clip-text group-hover:text-transparent"
          >
            Edit Profile
          </div>
        </button>
      </div>
    </div>

    <div class="px-[20px] ipad-max:px-[20px] lg:px-[40px]">
      <div class="grid grid-cols-12 ">
        <div class="flex flex-col items-start justify-start space-y-[10px] col-span-4">
        <ProfileOwner v-if="currentTab === 'personal' || currentTab === 'security'"/>

        <ProfileCompanycard v-if="currentTab === 'company'"/>
          <ProfileAboutcompany v-if="currentTab === 'company'"/>
          <div v-if="currentTab === 'personal' || currentTab === 'security'"
            class="bg-white/60 rounded-[10px] backdrop-blur-md shadow-sm  h-[183px] flex flex-col items-start justify-start p-[15px] w-[329px] relative"
          >

          <div class="absolute bg-gradient-to-br from-[#FBC558] to-[#F7AAFD] w-[160px] h-[160px] rounded-full right-0 left-1/4 opacity-30 blur-xl z-[-1]">

          </div>
            <div class="flex items-center justify-start w-full space-x-[16px]">
              <div>
                <img
                  src="/assets/imgs/overview/silver.svg"
                  class="w-[38px] h-[38px]"
                  alt=""
                />
              </div>
              <div class="text-[16px] font-[600] leading-[22px] text-[#3D3D3D]">
                Investor member
              </div>
            </div>
  

            <div
              class="mt-[12px] border-[1px] border-[#A7A7A7] w-full h-[40px] rounded-[10px] flex items-center justify-between px-[10px]"
            >
              <div class="flex items-center rtl:space-x-reverse space-x-[8px]">
                <div
                  class="text-[#878787] dark:text-whiteTamkin/70 text-[12px] leading-[24px]"
                >
                  0x2d5jdska9erptjfew7364432
                </div>
              </div>
              <img
                class="ml-auto cursor-pointer w-[18px] h-[18px]"
                @click="copyCode"
                src="/imgs/copy.png"
              />
            </div>


            <div
            class="mt-[12px] border-[1px] border-[#A7A7A7] w-full h-[40px] 
            rounded-[10px] flex items-center justify-between px-[10px]"
          >
          <div class="flex items-center justify-between w-full ">
            <div class="text-[14px] font-[600] leading-[21px] text-[#1E1E1E]">
              Token Balance
            </div>

            <div class="text-[12px] font-[600] text-[#1E1E1E]">TSLT 5.000.00</div>
          </div>
          </div>
          
          </div>

          <div
            class="bg-white/60 rounded-[10px] backdrop-blur-md  shadow-sm  h-auto flex flex-col items-start justify-start p-[15px] w-[329px]"
          >
            <div><h1  class="text-[12px] leading-[19px] font-[500]">
              Complete Your Profile
            </h1></div>
            <div class="flex items-center w-full mt-[7px] ">
              <div

                class="relative w-full overflow-visible h-[8px]  bg-[#E7ECEB] rounded-[9px] "
              >
                <div class="h-full bg-[#71DAD2] rounded-[9px] shadow-custom-light" :style="`width: ${ score }%;`" ></div>
              </div>
              <span class="ml-2 text-black font-[500] text-[12px] leading-[21px]"
                >{{ score }}%</span
              >
            </div>
          </div>

      
     <ProfilePortfolio :currentTab="currentTab" />
        
        </div>

        <div
          class="w-full  bg-white/60 shadow-sm  rounded-[10px] col-span-8 px-[30px] pt-[16px] backdrop-blur-md 
         flex flex-col items-start justify-start space-y-[10px]"
        >
          <div class="flex items-start justify-between w-full">
            <div
              :class="[
                currentTab === 'personal'
                  ? 'border-b-tamkin text-black'
                  : 'text-[#878787]',
              ]"
              class="text-[14px] font-[500] leading-[24px] border-b-[3px] border-transparent pb-[6px] cursor-pointer"
              @click="changeTab('personal')"
            >
              Personal Info
            </div>
            <div
              :class="[
                currentTab === 'company'
                  ? 'border-b-tamkin text-black'
                  : 'text-[#878787]',
              ]"
              class="text-[14px] font-[500] leading-[24px] border-b-[3px] border-transparent pb-[6px] cursor-pointer"
              @click="changeTab('company')"
            >
              Company Info
            </div>
            <div
              :class="[
                currentTab === 'security'
                  ? 'border-b-tamkin text-black'
                  : 'text-[#878787]',
              ]"
              class="text-[14px] font-[500] leading-[24px] border-b-[3px] border-transparent pb-[6px] cursor-pointer"
              @click="changeTab('security')"
            >
              Password and security
            </div>
          </div>
          <ProfileEditpersonal @cancelupdate="changeMode('normal')" v-if="currentMode === 'editing' && currentTab === 'personal'"/>
          <ProfilePersonalinfo v-if="currentMode === 'normal' && currentTab === 'personal'" />
          <ProfileEditcompany  @cancelupdate="changeMode('normal')" v-if="currentMode === 'editing' && currentTab === 'company'"/>

          <ProfileCompanyinfo  v-if="currentMode === 'normal' && currentTab === 'company'" />
          <ProfilePassword   v-if="currentTab === 'security'" /> 
        </div>
      </div>
    </div>
  </div>
</template>
