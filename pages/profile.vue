<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";

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
const { currentTab } = storeToRefs(profileStore);
import {
  useChangeCompanyInfo,
  useChangeProfileAbout,
  useChangeMemberImage,
  useRemoveMemberImage,
} from "@/composables/useProfile";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useGetProfileCompleteScore } from "@/composables/useProfile";
const { changeCompanyInfo, loading: companyInfoLoading } = useChangeCompanyInfo();
import { useGetAllCountries, useChangeMemberInfo } from "@/composables/useProfile";

const { changeMemberInfo, loading: memberInfoLoading } = useChangeMemberInfo();

const { getProfileCompleteScore, score } = useGetProfileCompleteScore();
import { useGetInvestor } from "@/composables/useProfile";

const { getInvestor, loading: lod } = useGetInvestor();

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
const currentMode = ref("normal");

const changeTab = (tab: any) => {
  profileStore.currentTab = tab;
};

const changeMode = (mode: any) => {
  currentMode.value = mode;
};

// watch(copied, (newValue) => {
//   if (newValue) {
//     // Reset copyDone after the hideIn duration
//     setTimeout(() => {
//       copyDone.value = false;
//     }, 2000);
//   }
// });

// watch(profileStore.currentTab, (newValue) => {
//   getProfileCompleteScore(newValue);
// });

// provide("currentMode", currentMode);


const { data, pending, error } = await useAsyncData('profile_', async () => {
  await Promise.all([
    getProfileCompleteScore(profileStore.currentTab)

  ]);

  return true 
});
const { $toast } = useNuxtApp();

const source = profileStore.investor ? profileStore.investor.wallet_address : "none";
const { text, copy, copied, isSupported } = useClipboard({ source });
const imagetoUpload = ref();
const isRemoving = ref(false);
const userInfo = ref();
const aboutCompany = ref();
const updateProfileImage = async (imgfile) => {
  imagetoUpload.value = imgfile;
};

const getAbout = async (about) => {
  aboutCompany.value = about;
};
const profileLoader = ref(false);

const updatep = async (companyData) => {
  profileLoader.value = true;

  await changeCompanyInfo({ ...profileStore.updatedCompanyPayload, about: aboutCompany.value });

  await changeMemberInfo(profileStore.updateProfilePayload);

  await profileStore.updateSocialPlatforms(), (currentMode.value = "normal");
  profileStore.currentTab = "personal";

  profileLoader.value = false;
  $toast("Profile updated Successfully", { hideIn: 3000 });
  refreshNuxtData("member");
};

provide("currentMode", currentMode);
</script>

<template>
  <div class="relative w-full h-full mb-[16px] !p-0">
    <LazyDashboardToastSuccess
      v-if="copied"
      :hideIn="2000"
      :message="'Copied to clipboard'"
    />
    <ProfileEditpicturemodal
      @update-profile-image="updateProfileImage"
      :showModal="isOpen('editMemberPic')"
    />
    <ProfileEditcompanypicture />
    <!-- {{ profileStore?.member }} -->
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
          @click="changeMode('editing')"
          class="btn-default border-[1px] border-[#C5C5C5] !bg-white group hover:border-tamkin"
        >
          <div
            class="group-hover:bg-gradient-to-b group-hover:from-tamkinStart group-hover:to-tamkinEnd group-hover:bg-clip-text group-hover:text-transparent"
          >
            Edit Profile
          </div>
        </button>
      </div>
    </div>

    <div class="px-[20px] ipad-max:px-[20px] lg:px-[40px]">
      <div class="grid grid-cols-12 gap-[40px] ipad-max:gap-4">
        <div class="flex flex-col items-start justify-start space-y-[10px] col-span-4">
          <ProfileOwner
            v-if="
              profileStore.currentTab === 'personal' ||
              profileStore.currentTab === 'security'
            "
          />

          <ProfileCompanycard v-if="profileStore.currentTab === 'company'" />
          <ProfileAboutcompany
            @update-about="getAbout"
            v-if="profileStore.currentTab === 'company'"
          />
          <div
            v-if="
              (profileStore.currentTab === 'personal' ||
                profileStore.currentTab === 'security') &&
              profileStore.investor &&
              Object.keys(profileStore.investor).length !== 0
            "
            class="bg-white/60 rounded-[10px] backdrop-blur-md shadow-sm h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full relative"
          >
            <div
              class="absolute bg-gradient-to-br from-[#FBC558] to-[#F7AAFD] w-full h-[160px] rounded-full right-0 left-1/4 opacity-30 blur-xl z-[-1]"
            ></div>

            <div class="flex items-center justify-start w-full space-x-[16px]">
              <div>
                <img
                src="/imgs/investor/AA.svg"
                  class="w-[38px] h-[38px]"
                  alt=""
                />
              </div>
              <div
                class="text-[16px] ipad-max:text-[13px] font-[600] leading-[22px] text-[#3D3D3D]"
              >
                Investor member
              </div>
            </div>

            <div
              class="mt-[12px] border-[1px] border-[#A7A7A7] w-full h-[40px] rounded-[10px] flex items-center justify-between px-[10px]"
            >
              <div class="flex items-center rtl:space-x-reverse space-x-[8px]">
                <div
                  class="text-[#878787] truncate ipad-max:w-36 w-44 2xl:w-52 dark:text-whiteTamkin/70 text-[12px] leading-[24px]"
                >
                  {{ profileStore.investor.wallet_address }}
                </div>
              </div>
              <img
                v-if="isSupported"
                class="ml-auto cursor-pointer w-[18px] h-[18px]"
                @click="copy(profileStore.investor.wallet_address)"
                src="/imgs/copy.png"
              />
            </div>

            <div
              class="mt-[12px] border-[1px] border-[#A7A7A7] w-full h-[40px] rounded-[10px] flex items-center justify-between px-[10px]"
            >
              <div class="flex items-center justify-between w-full">
                <div
                  class="text-[14px] ipad-max:text-[11px] font-[600] leading-[21px] text-[#1E1E1E]"
                >
                  Token Balance
                </div>

                <div class="text-[12px] ipad-max:text-[10px] font-[600] text-[#1E1E1E]">
                  {{ profileStore.investor.tslt_amount }} TSLT
                </div>
              </div>
            </div>
          </div>
          <div
            v-else-if="
              (profileStore.currentTab === 'personal' ||
                profileStore.currentTab === 'security') &&
              !profileStore.investor
            "
            class="bg-white/60 rounded-[10px] backdrop-blur-md shadow-sm h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full relative"
          >
            <div
              class="absolute bg-gradient-to-br from-[#FBC558] to-[#F7AAFD] w-full h-[160px] rounded-full right-0 left-1/4 opacity-30 blur-xl z-[-1]"
            ></div>

            <div class="flex items-center justify-between w-full space-x-[16px]">
              <div
                class="text-[16px] ipad-max:text-[13px] font-[600] leading-[22px] text-[#3D3D3D]"
              >
                Investor Program
              </div>
              <div class="flex items-center justify-start space-x-[8px]" >
                <img
                  src="/imgs/investor/A1.svg"
                  class="w-[24px] h-[24px]"
                  alt=""
                />
                <img
                src="/imgs/investor/AA.svg"
                class="w-[24px] h-[24px]"
                  alt=""
                />
                <img
                src="/imgs/investor/C.svg"
                class="w-[24px] h-[24px]"
                  alt=""
                />
              </div>
            </div>

            <div class="my-[8px] text-[12px] font-[400] leading-[16px] text-darkGrey">
              You are not investor member
            </div>

            <div class="my-[8px] text-[13px] font-[500] leading-[21px] text-black">
              Buy Tamkin Token - TSLT and Join in our Investor Program
            </div>

            <a href="https://investor.tamkin.app/login" target="_blank"
              class="btn-dashboard w-[160px] !rounded-[10px] !text-[13px] !font-[600] !leading-[19px] hover_tamkin"
            >
              Investor Program
          </a>
          </div>
          <div
            class="bg-white/60 rounded-[10px] backdrop-blur-md shadow-sm h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full"
          >
            <div>
              <h1 class="text-[12px] leading-[19px] font-[500]">Complete Your Profile</h1>
            </div>
            <div class="flex items-center w-full mt-[7px]">
              <div
                class="relative w-full overflow-visible h-[8px] bg-[#E7ECEB] rounded-[9px]"
              >
                <div
                  class="h-full bg-[#71DAD2] rounded-[9px] shadow-custom-light"
                  :style="`width: ${score}%;`"
                ></div>
              </div>
              <span class="ml-2 text-black font-[500] text-[12px] leading-[21px]"
                >{{ score }}%</span
              >
            </div>
          </div>

          <ProfilePortfolio v-if="profileStore.currentTab === 'personal'" />

          <ProfilePortfoliocompany v-if="profileStore.currentTab === 'company'" />
        </div>

        <div
          class="w-full bg-white/60 shadow-sm rounded-[10px] col-span-8 px-[30px] pt-[16px] backdrop-blur-md flex flex-col items-start justify-start space-y-[10px]"
        >
          <div class="flex items-start justify-between w-full">
            <div
              :class="[
                profileStore.currentTab === 'personal'
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
                profileStore.currentTab === 'company'
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
                profileStore.currentTab === 'security'
                  ? 'border-b-tamkin text-black'
                  : 'text-[#878787]',
              ]"
              class="text-[14px] font-[500] leading-[24px] border-b-[3px] border-transparent pb-[6px] cursor-pointer"
              @click="changeTab('security')"
            >
              Password and security
            </div>
          </div>
          <keep-alive>
            <ProfileEditpersonal
              :loading-personal="profileLoader"
              @update-personal-info="updatep"
              @cancelupdate="changeMode('normal')"
              v-if="currentMode === 'editing' && profileStore.currentTab === 'personal'"
            />
          </keep-alive>
          <ProfilePersonalinfo
            v-if="currentMode === 'normal' && profileStore.currentTab === 'personal'"
          />
          <keep-alive>
            <ProfileEditcompany
              :loadingUpdate="profileLoader"
              @update-profile="updatep"
              @cancelupdate="changeMode('normal')"
              v-if="currentMode === 'editing' && profileStore.currentTab === 'company'"
            />
          </keep-alive>
          <ProfileCompanyinfo
            v-if="currentMode === 'normal' && profileStore.currentTab === 'company'"
          />
          <ProfilePassword
            @close-editing-mode="profileStore.currentTab = 'personal'"
            v-if="profileStore.currentTab === 'security'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
