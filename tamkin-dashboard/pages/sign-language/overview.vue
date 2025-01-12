<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";

import { useCollapseStore } from "@/stores/collapse.js";
import { useOverviewStore } from "@/stores/overview";
const {locale } = useI18n();
const navStore = useNavbarStore();



const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  emitEvent,
} = useModalManager();
const collapseStore = useCollapseStore();
const modalStore = useModalStore();
const overviewStore = useOverviewStore();

// import "chartjs-adapter-date-fns"; // Import the date adapter
const showExpired = ref(false);
const plan = ref("free");
const upgradepackageimages = ref(false);
const packagesStore = usePackgesStore()

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
  requiredPermission: "sign-language-overview",
});
const currentPlanchange = (p: any) => {
  plan.value = p;
};
const selectTab = ref("webplugins");

const getSelectedTab = (tab: any) => {
  selectTab.value = tab;
};

const upgradePackage = ref(false);
const upgradePackagedocs = ref(false);

watch(plan, (ov, nv) => {
  if (plan.value === "pro") {
    upgradePackage.value = true;
    upgradepackageimages.value = true;
    upgradePackagedocs.value = true;
  } else {
    upgradePackage.value = !upgradePackage.value;
    upgradepackageimages.value = !upgradepackageimages.value;
    upgradePackagedocs.value = !upgradePackagedocs.value;
  }
});

const settingsStore = useSettingsStore();
const runtimec = useRuntimeConfig()

</script>

<template>
  <div class="relative h-full w-full">
    <!-- <LanguageServicesStatsNavbar :selected-tab="selectTab" @select-tabs="getSelectedTab" /> -->
    <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <MySiteNopackagebuy
      :class="isOpen('shareModal') ? 'z-[99]' : 'z-[9999]'"
      v-if="isOpen('upgrade_no_package')"
    />
  </transition>
  <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <MySiteUpgrade
      :class="isOpen('shareModal') ? 'z-[99]' : 'z-[9999]'"
      v-if="isOpen('upgrade_mysite_package')"
    />
  </transition>
  <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <!-- Modal for adding a package -->
    <MySitePaymentPackage v-if="isOpen('add_package_modal_mysite')" />
  </transition>
  <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <MySitePaymentPaymentmethods />
  </transition>
  <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <MySitePaymentCard v-if="isOpen('cardModal_mysite')" />
  </transition>
  <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <MySitePaymentSuccess
      v-if="isOpen('success_pay_mysite')"
    />
  </transition>
  <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <ProfileBillingModalsAddnewCard
      v-if="isOpen('add_new_card_billing')"
    />
  </transition>

  <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <MySitePaymentCryptoStep1 v-if="isOpen('crypto_mysite_step1')" />
  </transition>
 <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <MySitePaymentCryptoStep2 v-if="isOpen('crypto_mysite_step2')" />
  </transition>
  <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <MySitePaymentCryptoSuccess />
  </transition> 
   <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <MySitePaymentPaypal />
  </transition> 
    <HeaderAccess
      :section-title="$t('Overview')"
      :section-sub-title="
        $t(
          'Overview provides system summary with key data and analytics for decision-making'
        )
      "
    />
    <LanguageServicesNavbar />
    <!-- <LanguageServicesOverviewNavbar
      :selected-tab="selectTab"
      @select-tabs="getSelectedTab"
    /> -->
    <LanguageServicesNodata v-if="!settingsStore.defaultappobj" />
    <div v-else-if="settingsStore.loadingdefaultappobj">
      <div
          class="h-[200px] w-full mt-[44px] rounded-md bg-gray-200"
          ></div> 
      <div
          class="h-[200px] w-full mt-[20px] rounded-md bg-gray-200"
            v-for="s in 3"
            :key="s"
          ></div> 
    </div>
    <div v-else>
      <div v-if="selectTab === 'webplugins'">
        <OverviewWidgetEmbdedCode v-if="!overviewStore.showUpgradeState" />
        <OverviewConnectWithUs v-if="!overviewStore.showUpgradeState" />
        <LanguageServicesOverviewCurrentPlan
          :plan-type="'free'"
          :is-installed="false"
          v-if="!overviewStore.showUpgradeState"
          class="!mt-[30px]"
        />

    <KeepAlive>
      <LanguageServicesOverviewWebplugins
      v-if="navStore.defaultappobj?.package?.find(p => p.type === 'Sign language').status === 'Active'"

    />
    </KeepAlive>

        <LanguageServicesOverviewTranslationaccuracy
        v-if="navStore.defaultappobj?.package?.find(p => p.type === 'Sign language').status === 'Act2ive'"

        />


        <OverviewExclusiveInvestorPackage
        
        />
        <OverviewTamkinTokenBanner
        class="!mt-[30px]"
        v-if="!packagesStore.investorUser"
      />
        <LanguageServicesOverviewWebplugins
          v-if="overviewStore.showUpgradeState"
        />
        <LanguageServicesOverviewTranslationaccuracy
          v-if="overviewStore.showUpgradeState"
        />

        <div
        v-if="navStore.defaultappobj?.package?.filter(p => p.type === 'Sign language').length"
        class="bg-white dark:bg-tamkinDarkPrimary custom-border-tamkin padding-override-1 w-full rtl:space-x-reverse lg:space-x-[16px] rounded-[10px] h-auto lg:h-[119px] mt-[32px] px-[15px] flex items-center justify-center lg:justify-start lg:space-y-0 lg:py-0 py-[14px] space-y-[24px] lg:mx-0 mb-[32px] lg:flex-nowrap flex-wrap"
      >
        <div class="w-[50px]">
          <img class="w-[40px] h-[40px] object-cover" :src="runtimec.public.baseImagerUrl+navStore.defaultappobj?.package?.find(p => p.type === 'Sign language').icon" />
        </div>
        <div
          class="flex flex-col items-center lg:items-start justify-center w-full"
        >
          <div
            class="font-[500] text-[18px] leading-[27px] text-darkGrey dark:text-whiteTamkin"
          >
            <h1>{{navStore.defaultappobj?.package?.find(p => p.type === 'Sign language').title}}</h1>
          </div>
          <div
            class="flex items-center justify-center lg:justify-start w-full rtl:space-x-reverse space-x-[6px] cursor-pointer h-[30px]"
          >
          <div
          v-if="
            new Date() >
              new Date(navStore.defaultappobj?.package?.find(p => p.type === 'Sign language').to_date)
            
          "
          class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
        >
          {{ $t(`Expired`) }}
        </div>
              <template v-else>
                <div class="flex items-center" key="not-expired">
                  <div
                    class="text-[13px] leading-[24px] font-[400] w-[200px] dark:text-whiteTamkin"
                  >
                    {{ $t("Package Expires in") }}
                  </div>
                  <div
                    class="flex items-center justify-center custom-border-tamkin padding-override-1 h-[23px]
                     p-[12px] text-[13px] leading-[24px] font-[500] w-[auto] dark:text-whiteTamkin"
                  >
                    {{new Date(navStore.defaultappobj?.package?.find(p => p.type === 'Sign language').to_date).toDateString()}}
                  </div>
                </div>
              </template>
            
            
          </div>
        </div>

            
        <div class="relative" v-if="Number(navStore.defaultappobj?.package?.find(p => p.type === 'Sign language').difference) < 12" >
          <div
            v-if="!(new Date() >
              new Date(navStore.defaultappobj?.package?.find(p => p.type === 'Sign language').to_date))"
            class="flex items-center justify-center absolute top-[-8px] lg:top-[-10px] transform rtl:right-[50%] ltr:left-[50%] h-[14px] lg:h-[19px] bg-[#B36B8A] text-white w-[69px] text-[10px] lg:text-[12px] leading-[18px] font-[500] rounded-[10px]"
          >
            {{ $t("SAVE") }} 12%
          </div>
          <button
            class="rounded-full w-[178px]"
            :class="[
              showExpired
                ? 'btn-dashboard hover_tamkin'
                : 'btn_bordered_dashboard',
            ]"
            @click="modalStore.controlShowUpgradeModal"
          >

          
            {{ (new Date() >
              new Date(navStore.defaultappobj?.package?.find(p => p.type === 'Sign Language').to_date)) ? $t("Renew") : Number(navStore.defaultappobj?.package?.find(p => p.type === 'Sign language').difference) < 12 ? $t("Switch To Annual") :''  }}
          </button>
        </div>
      </div>

        <OverviewTamkinTokenBanner v-if="overviewStore.showUpgradeState" />
        <OverviewExclusiveInvestorPackage v-if="overviewStore.showUpgradeState" />
      </div>





    </div>
  </div>
</template>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(60px);
}
.div-slider {
}
.slide-fade-leave-active {
  display: none;
}
.crossed-out {
  position: relative;
  display: inline-block;
}
.crossed-out::before {
  content: "";
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  border-top: 2px solid red;
  transform: rotate(-12deg);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
