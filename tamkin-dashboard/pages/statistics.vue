<script lang="ts" setup>
import { useGetStats } from "@/composables/useAccessibility";
const { getStatsAccessibility } = useGetStats();
const statsStore = useStatsStore();
const settingsStore = useSettingsStore();
const { locale,t } = useI18n();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  lastEventCall,
  eventCounter,
  setData,
} = useModalManager();
useHead({
  title: t("Accessibility - Statistics - Tamkin Dashboard"),
})
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
  requiredPermission: "accessibility-statistics",
});

const localePath = useLocalePath();

const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
let pendingNavigation = null;

const detectUnsavedChanges = () => {
  return isLinkActive("/statistics") && statsStore.google_enabled;
};

const handleSaveAndMove = () => {
  statsStore.saveAndMove();
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const handleCancelLeave = () => {
  statsStore.routeLeaveModal = false; // Close the modal
};

onBeforeMount(async () => {
  statsStore.loadingStats = true;
  await getStatsAccessibility();
  statsStore.loadingStats = false;
});
const navStore = useNavbarStore();

// onBeforeRouteLeave((to, from, next) => {
//   if (detectUnsavedChanges()) {
//     statsStore.showSaveBeforeLeaveModal();
//     pendingNavigation = { next, to };
//   } else {
//     next(); // No unsaved changes, proceed normally
//   }
// });
</script>

<template>
  <div class="relative h-full w-full">
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
    <MySitePaymentSuccess v-if="isOpen('success_pay_mysite')" />
  </transition>
  <transition
    :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
    mode="out-in"
  >
    <ProfileBillingModalsAddnewCard v-if="isOpen('add_new_card_billing')" />
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
    <LazyModalsConfirm
      :showModal="statsStore.routeLeaveModal"
      :title="$t('Save your changes')"
      :sub-title="$t('Do you want to save the changes before moving on?')"
      confirm-btn-type="other"
      @control-other="handleSaveAndMove"
      cancelButtonName="Discard"
      :savetoAllSitesBtn="true"
      @control-cancel="handleSaveAndMove"
    />
    <div class="w-full h-full relative">
      <HeaderAccess
        :section-title="$t('Statistics')"
        :section-sub-title="
          $t(
            'Statistics involves collecting, analyzing, and interpreting data to provide useful insights.'
          )
        "
      />

      <LanguageServicesNodata
           v-if="!navStore.defaultappobj"
      />
      <div v-else>
        <div class="flex flex-col items-center justify-center mt-[44px] space-y-[30px] " v-if="statsStore.loadingStats && !statsStore.chartsData">

          <div class="bg-gray-300 w-full h-[462px] animate-pulse rounded-[10px]" v-for="i in 4">
  
          </div>
         </div>
        <div v-else>
          <StatisticsChart />

        <StatisticsUsagebyfunction />
        <StatisticsUsagebyprofile />
        <!-- <StatisticsEnablegoogleanalytics /> -->

        <StatisticsLivetranslation />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.toggle {
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #eef5ff 47.07%,
    #f6f3fc 72.04%,
    #fef5f6 100%
  );
  box-shadow: 0px 4px 24px 8px rgba(81, 69, 159, 0.1);
}

.custom-legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.legend-text h3 {
  margin: 0;
  font-size: 1.2em;
}

.legend-text p {
  margin: 0;
  font-size: 0.9em;
  color: #666;
}

.legend-percentage {
  font-size: 1.2em;
  font-weight: bold;

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }
}

.dp__arrow_top {
  @apply rtl:top-[-6px] rtl:!rotate-45 rtl:translate-x-[50%];
}

.dp__overlay_cell_active {
  @apply bg-tamkin;
}

.dp__overlay_cell_pad:hover {
  @apply bg-tamkinLight text-darkGrey;
}
</style>
