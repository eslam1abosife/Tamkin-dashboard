<script lang="ts" setup>
import { useClipboard } from "@vueuse/core";
const { locale, t } = useI18n();

useHead({
  title: t("Profile - Tamkin Dashboard"),
});
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
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
const { changeCompanyInfo, loading: companyInfoLoading } =
  useChangeCompanyInfo();
import {
  useGetAllCountries,
  useChangeMemberInfo,
} from "@/composables/useProfile";

const { changeMemberInfo, loading: memberInfoLoading } = useChangeMemberInfo();
const { getCountries, countries } = useGetAllCountries();

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
const maxLength = 10;

// Truncate the string from the middle
const truncatedString = (text) => {
  if (text.length > maxLength) {
    const start = text.slice(0, 10); // Adjust the slice values as needed
    const end = text.slice(-10); // Adjust the slice values as needed
    return `${start}...${end}`;
  }
  return text;
};
const { $toast } = useNuxtApp();
const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};
const source = profileStore.investor
  ? profileStore.investor.wallet_address
  : "none";
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
const packagesStore = usePackgesStore();
const profileLoader = ref(false);

const updatep = async (typeUpdate) => {
  profileLoader.value = true;
  // console.log(profileStore.updatedCompanyPayload)
  if (typeUpdate === "personal") {
    await changeMemberInfo(profileStore.updateProfilePayload);
  } else {
    await changeCompanyInfo({
      ...profileStore.updatedCompanyPayload,
      about: aboutCompany.value,
    });
  }

  await profileStore.updateSocialPlatforms(), (currentMode.value = "normal");
  profileStore.currentTab = "personal";

  profileLoader.value = false;
  $toast("Profile updated Successfully", { hideIn: 3000 });
  await profileStore.fetchMember();
  await profileStore.getCurrentTeam();
  await getProfileCompleteScore(profileStore.currentTab);
};
const loadingInvestor = ref(false);
provide("currentMode", currentMode);
onBeforeMount(async () => {
  try {
    profileStore.loadingProfile = true;
    loadingInvestor.value = true;

    await Promise.all([
      profileStore.fetchMember(),
      getCountries().then(() => {
        profileStore.countries = countries.value;
      }),
    ]);

    await Promise.all([
      profileStore.getCurrentTeam(),
      getProfileCompleteScore(profileStore.currentTab),
    ]);

    await packagesStore.getInvestorUser();
  } catch (error) {
    console.error("Error loading profile data:", error);
  } finally {
    loadingInvestor.value = false;
    profileStore.loadingProfile = false;
  }
});

const ifuserhaspermissiontoEdit = computed(() => {
  return profileStore.member.permission.some(
    (permission) => permission.tamkin_roles === "company-info"
  );
});

const runtimeconfig = useRuntimeConfig();
</script>

<template>
  <div class="relative w-full h-full mb-[16px] !p-0">
    <LazyDashboardToastSuccess
      v-if="copied"
      :hideIn="2000"
      :message="$t('Copied to clipboard')"
    />
    <ProfileEditpicturemodal
      @update-profile-image="updateProfileImage"
      :showModal="isOpen('editMemberPic')"
    />
    <ProfileEditcompanypicture />
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
      <div class="absolute bottom-[22px] rtl:left-[40px] ltr:right-[40px]">
        <button
          @click="changeMode('editing')"
          class="btn-default border-[1px] dark:border-darkborder dark:text-whiteTamkin dark:bg-tamkinDarkPrimary border-[#C5C5C5] bg-white group hover:border-tamkin"
        >
          <div
            class="group-hover:bg-gradient-to-b group-hover:from-tamkinStart group-hover:to-tamkinEnd group-hover:bg-clip-text group-hover:text-transparent"
          >
            {{ $t("Edit Profile") }}
          </div>
        </button>
      </div>
    </div>

    <div class="px-[20px] ipad-max:px-[20px] lg:px-[40px] pt-[20px] md:pt-0">
      <div class="grid grid-cols-12 md:gap-[40px]">
        <div
          class="flex flex-col items-start justify-start space-y-[10px] col-span-12 md:col-span-4"
        >
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
          <!-- Display investor details -->
          <div
            v-if="
              (profileStore.currentTab === 'personal' ||
                profileStore.currentTab === 'security') &&
              packagesStore.investorUser &&
              !profileStore.loadingProfile &&
              !loadingInvestor
            "
            class="bg-white/60 rounded-[10px] dark:bg-tamkinDarkPrimary/60 backdrop-blur-md shadow-sm h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full relative"
          >
            <div
              class="absolute bg-gradient-to-br from-[#FBC558] to-[#F7AAFD] w-full h-[160px] rounded-full right-0 left-1/4 opacity-30 blur-xl z-[-1]"
            ></div>

            <div
              class="flex items-center justify-start w-full rtl:space-x-reverse space-x-[16px]"
            >
              <div>
                <img
                  :src="
                    runtimeconfig.public.baseImagerUrl +
                    packagesStore.investorUser.icon
                  "
                  class="w-[38px] h-[38px]"
                  alt=""
                />
              </div>
              <div
                class="text-[16px] ipad-max:text-[13px] font-[600] leading-[22px] text-[#3D3D3D]"
              >
                {{ $t("Investor member") }}
              </div>
            </div>

            <div
              class="mt-[12px] border-[1px] border-[#A7A7A7] w-full h-[40px] rounded-[10px] flex items-center justify-between px-[10px]"
            >
              <div
                class="flex items-center rtl:rtl:space-x-reverse space-x-reverse rtl:space-x-reverse space-x-[8px]"
              >
                <div
                  class="text-[#878787] w-44 ipad-max:w-36 2xl:w-52 dark:text-whiteTamkin/70 text-[12px] leading-[24px]"
                >
                  {{
                    truncatedString(packagesStore.investorUser.wallet_address)
                  }}
                </div>
              </div>
              <img
                v-if="isSupported"
                class="rtl:mr-auto ltr:ml-auto cursor-pointer w-[18px] h-[18px]"
                @click="copy(packagesStore.investorUser.wallet_address)"
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
                  {{ $t("Token Balance") }}
                </div>

                <div
                  class="text-[12px] ipad-max:text-[10px] font-[600] text-[#1E1E1E]"
                >
                  {{ packagesStore.investorUser.tslt_amount }} TSLT
                </div>
              </div>
            </div>
          </div>

          <!-- Display loading placeholder -->
          <div
            v-if="profileStore.loadingProfile || loadingInvestor"
            class="bg-white/60 rounded-[10px] dark:bg-tamkinDarkPrimary/60 backdrop-blur-md shadow-sm h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full relative"
          >
            <div
              class="w-full flex items-center justify-between rtl:space-x-reverse space-x-[16px]"
            >
              <div
                class="animate-pulse dark:bg-p bg-gray-300 rounded h-6 w-32"
              ></div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
              >
                <div
                  class="animate-pulse dark:bg-p bg-gray-300 rounded-full h-[24px] w-[24px]"
                ></div>
                <div
                  class="animate-pulse dark:bg-p bg-gray-300 rounded-full h-[24px] w-[24px]"
                ></div>
                <div
                  class="animate-pulse dark:bg-p bg-gray-300 rounded-full h-[24px] w-[24px]"
                ></div>
              </div>
            </div>

            <div>
              <div
                class="animate-pulse dark:bg-p bg-gray-300 rounded h-4 w-48 my-2"
              ></div>
              <div
                class="animate-pulse dark:bg-p bg-gray-300 rounded h-5 w-64 my-2"
              ></div>
              <div
                class="animate-pulse dark:bg-p bg-gray-300 rounded h-8 w-[160px] my-2"
              ></div>
            </div>
          </div>

          <!-- Display message when there is no investor and profile is not loading -->
          <div
            v-if="
              (profileStore.currentTab === 'personal' ||
                profileStore.currentTab === 'security') &&
              !packagesStore.investorUser &&
              !profileStore.loadingProfile &&
              !loadingInvestor
            "
            class="bg-white/60 dark:bg-tamkinDarkPrimary/60 rounded-[10px] backdrop-blur-md shadow-sm h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full relative overflow-hidden md:overflow-visible"
          >
            <div
              class="absolute bg-gradient-to-br from-[#FBC558] to-[#F7AAFD] w-full h-[160px] rounded-full right-0 left-1/4 opacity-30 blur-xl z-[-1]"
            ></div>

            <div
              class="flex items-center justify-between w-full rtl:space-x-reverse space-x-[16px]"
            >
              <div
                class="text-[16px] dark:text-whiteTamkin ipad-max:text-[13px] font-[600] leading-[22px] text-[#3D3D3D]"
              >
                {{ $t("Investor Program") }}
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
              >
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

            <div>
              <div
                class="my-[8px] dark:text-whiteTamkin text-[12px] font-[400] leading-[16px] text-darkGrey"
              >
                {{ $t("You are not an investor member") }}
              </div>
              <div
                class="my-[8px] dark:text-whiteTamkin text-[13px] font-[500] leading-[21px] text-black"
              >
                {{
                  $t("Buy Tamkin Token - TSLT and join our Investor Program")
                }}
              </div>
              <a
                href="https://investor.tamkin.app/login"
                target="_blank"
                class="btn-dashboard w-[160px] !rounded-[10px] !text-[13px] !font-[600] !leading-[19px] hover_tamkin"
              >
                {{ $t("Investor Program") }}
              </a>
            </div>
          </div>

          <div
            class="bg-white/60 dark:bg-tamkinDarkPrimary/60 rounded-[10px] backdrop-blur-md shadow-sm h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full"
          >
            <div>
              <h1
                v-if="!profileStore.loadingProfile"
                class="text-[12px] dark:text-whiteTamkin leading-[19px] font-[500]"
              >
                {{ $t("Complete Your Profile") }}
              </h1>
              <div
                v-else
                class="animate-pulse dark:bg-p h-[19px] bg-gray-300 rounded-full w-32 mb-[7px]"
              ></div>
            </div>

            <div class="flex items-center w-full mt-[7px]">
              <div
                class="relative w-full overflow-visible h-[8px] bg-[#E7ECEB] dark:bg-p rounded-[9px]"
              >
                <div
                  v-if="!profileStore.loadingProfile"
                  class="h-full bg-[#71DAD2] rounded-[9px] shadow-custom-light dark:shadow-tamkinDarkPrimary"
                  :style="`width: ${score}%;`"
                ></div>
                <div
                  v-else
                  class="h-[8px] dark:bg-p bg-gray-300 rounded-[9px] animate-pulse"
                ></div>
              </div>
              <span
                v-if="!profileStore.loadingProfile"
                class="rtl:mr-2 ltr:ml-2 dark:text-whiteTamkin text-black font-[500] text-[12px] leading-[21px]"
                >{{ score }}%</span
              >
              <div
                v-else
                class="animate-pulse dark:bg-p rtl:mr-2 ltr:ml-2 h-[8px] bg-gray-300 rounded-full w-10"
              ></div>
            </div>
          </div>

          <div
            v-if="profileStore.loadingProfile"
            class="bg-white/60 dark:bg-tamkinDarkPrimary shadow-sm rounded-[10px] backdrop-blur-md h-auto flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-full"
          >
            <div class="w-full">
              <div class="animate-pulse flex flex-col space-y-[10px]">
                <!-- Placeholder for Header and Icons -->
                <div class="flex items-center justify-between">
                  <div
                    class="bg-gray-300 dark:bg-p h-[24px] w-[80px] rounded"
                  ></div>
                  <div class="flex rtl:space-x-reverse space-x-[16px]">
                    <div
                      class="bg-gray-300 dark:bg-p h-[33px] w-[33px] rounded-[4px]"
                    ></div>
                    <div
                      class="bg-gray-300 dark:bg-p h-[33px] w-[33px] rounded-[4px]"
                    ></div>
                    <div
                      class="bg-gray-300 dark:bg-p h-[33px] w-[33px] rounded-[4px]"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProfilePortfolio
            v-if="
              !profileStore.loadingProfile &&
              (profileStore.currentTab === 'personal' ||
                profileStore.currentTab === 'company')
            "
          />

          <!-- <ProfilePortfoliocompany v-if="profileStore.currentTab === 'company'" /> -->
        </div>

        <div
          class="w-full bg-white/60 dark:bg-tamkinDarkPrimary/60 shadow-sm rounded-[10px] md:col-span-8 col-span-12 px-[30px] pt-[16px] backdrop-blur-md flex flex-col items-start justify-start space-y-[10px] dark:bg-tamkinDarkPrimary"
        >
          <div class="flex items-start justify-between w-full">
            <!-- Personal Info Tab -->
            <div
              v-if="!profileStore.loadingProfile"
              :class="[
                profileStore.currentTab === 'personal'
                  ? 'border-b-tamkin text-black dark:text-black'
                  : 'text-[#878787]',

                currentMode === 'editing' ? 'pointer-events-none' : '',
              ]"
              class="text-[14px] font-[500] leading-[24px] dark:text-whiteTamkin border-b-[3px] border-transparent pb-[6px] cursor-pointer"
              @click="changeTab('personal')"
            >
              {{ $t("Personal Info") }}
            </div>
            <!-- Placeholder for Personal Info Tab -->
            <div
              v-else
              class="animate-pulse dark:bg-p bg-gray-300 rounded h-[24px] w-[80px]"
            ></div>

            <!-- Company Info Tab -->
            <div
              v-if="!profileStore.loadingProfile"
              :class="[
                profileStore.currentTab === 'company'
                  ? 'border-b-tamkin text-black dark:text-black'
                  : 'text-[#878787]',

                currentMode === 'editing' ? 'pointer-events-none' : '',
              ]"
              class="text-[14px] font-[500] leading-[24px] dark:text-whiteTamkin border-b-[3px] border-transparent pb-[6px] cursor-pointer"
              @click="changeTab('company')"
            >
              {{ $t("Company Info") }}
            </div>
            <!-- Placeholder for Company Info Tab -->
            <div
              v-else
              class="animate-pulse dark:bg-p bg-gray-300 rounded h-[24px] w-[80px]"
            ></div>

            <!-- Password and Security Tab -->
            <div
              v-if="!profileStore.loadingProfile"
              :class="[
                profileStore.currentTab === 'security'
                  ? 'border-b-tamkin text-black dark:text-black'
                  : 'text-[#878787]',

                currentMode === 'editing' ? 'pointer-events-none' : '',
              ]"
              class="text-[14px] font-[500] leading-[24px] border-b-[3px] dark:text-whiteTamkin border-transparent pb-[6px] cursor-pointer"
              @click="changeTab('security')"
            >
              {{ $t("Password and security") }}
            </div>
            <!-- Placeholder for Password and Security Tab -->
            <div
              v-else
              class="animate-pulse dark:bg-p bg-gray-300 rounded h-[24px] w-[150px]"
            ></div>
          </div>

          <keep-alive>
            <ProfileEditpersonal
              :loading-personal="profileLoader"
              @update-personal-info="updatep('personal')"
              @cancelupdate="changeMode('normal')"
              v-if="
                currentMode === 'editing' &&
                profileStore.currentTab === 'personal'
              "
            />
          </keep-alive>
          <ProfilePersonalinfo
            v-if="
              currentMode === 'normal' && profileStore.currentTab === 'personal'
            "
          />
          <keep-alive>
            <ProfileEditcompany
              :loadingUpdate="profileLoader"
              @update-profile="updatep('company')"
              @cancelupdate="changeMode('normal')"
              v-if="
                currentMode === 'editing' &&
                profileStore.currentTab === 'company' &&
                ifuserhaspermissiontoEdit
              "
            />
          </keep-alive>
          <ProfileCompanyinfo
            v-if="
              (currentMode === 'normal' &&
                profileStore.currentTab === 'company') ||
              (currentMode === 'editing' &&
                profileStore.currentTab === 'company' &&
                !ifuserhaspermissiontoEdit)
            "
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

<style>
.middleEllipsis {
  margin: 10px;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.start {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex-shrink: 1;
}
.end {
  white-space: nowrap;
  flex-basis: content;
  flex-grow: 0;
  flex-shrink: 0;
}
</style>
