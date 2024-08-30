<script lang="ts" setup>
import { useNavbarStore } from "@/stores/navbar";
import { storeToRefs } from "pinia";
import { vOnClickOutside } from "@vueuse/components";
import { useCollapseStore } from "@/stores/collapse.js";
import { useStatsStore } from "@/stores/stats.js";
const langStore = useLangSwitch();
const collapseStore = useCollapseStore();
const statsStore = useStatsStore();
const navStore = useNavbarStore();
const { sideBarOpen } = storeToRefs(navStore);

const colorMode = useColorMode();

definePageMeta({
  layout: "dashboard",
middleware:['auth','permissions'],

});

const isADHDChecked = ref(false);

const localePath = useLocalePath();

const search = ref("");
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};

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

onBeforeRouteLeave((to, from, next) => {
  if (detectUnsavedChanges()) {
    statsStore.showSaveBeforeLeaveModal();
    pendingNavigation = { next, to };
  } else {
    next(); // No unsaved changes, proceed normally
  }
});

const selectTab = ref("webplugins");
const getSelectedTab = (tab: any) => {
  selectTab.value = tab;
};
</script>

<template>
  <div class="relative h-full w-full">
    <LanguageServicesNavbar />
    <LazyLanguageServicesStatsNavbar
      :selected-tab="selectTab"
      @select-tabs="getSelectedTab"
    />
    <!-- <transition name="slide-up">
      <DashboardAddonsSavefooter
        :show-footer="shouldShowFooter"
        @cancel_action="cancelAc"
      />
    </transition> -->
    <LazyModalsConfirm
      :showModal="statsStore.routeLeaveModal"
      title="Save  your changes"
      sub-title="Do you want to save the changes before moving on?"
      confirm-btn-type="other"
      @control-other="handleSaveAndMove"
      cancelButtonName="Discard"
      :savetoAllSitesBtn="true"
      @control-cancel="handleSaveAndMove"
    />
    <div class="w-full h-full relative">
      <HeaderAccess
        websiteImgName="tamkin_hand.svg"
        website-title="Tamkin.App"
        website-link="google.com"
        section-title="Statistics"
        section-sub-title="Statistics involves collecting, analyzing, and interpreting data to provide
          useful insights."
      />

      <div v-if="selectTab === 'webplugins'">
        <LanguageServicesStatsDaterange class="!mt-[120px]" />
        <LanguageServicesStatsTranslationq />

        <LanguageServicesStatsUsage />
        <div
          class="shadow-md mt-[30px] -shadow-y-[1px] flex items-center justify-center rtl:space-x-reverse space-x-[13px] dark:bg-tamkinDarkPrimary bg-white w-full h-[114px] px-[18px] border-[1px] border-lightGrey dark:border-darkborder rounded-[10px]"
        >
          <div class="flex items-center justify-start flex-1">
            <div>
              <img src="/assets/imgs/google_analytics.svg" class="w-[71px] h-[63px]" />
            </div>
            <div class="ml-[13px]">
              <h1
                class="text-[12px] lg:text-[16px] leading-[22px] font-[500] text-[#23262F] dark:text-whiteTamkin"
              >
                Google Analytics
              </h1>
              <p
                class="text-[10px] lg:text-[14px] truncate w-32 lg:leading-[19px] text-[#585B5B] dark:text-whiteTamkin font-[400] mt-[8px]"
              >
                Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit
                nesciunt esse sint aperiam aliquid
              </p>
            </div>
          </div>
          <div class="ml-auto flex items-center">
            <label for="toggle_google_a" class="toggle_wrap">
              <input
                type="checkbox"
                id="toggle_google_a"
                class="sr-only"
                v-model="statsStore.google_enabled"
              />
              <div
                class="toggle_parent"
                :class="[statsStore.google_enabled ? 'active' : 'in_active']"
              >
                <div class="toggle_inner" :class="{ active: statsStore.google_enabled }">
                  <img
                    v-if="statsStore.google_enabled"
                    src="/assets/imgs/addons/active_toggle.svg"
                    class="w-[28px] h-[28px]"
                  />
                  <img
                    v-else
                    src="/assets/imgs/addons/toggle.svg"
                    class="w-[28px] h-[28px]"
                  />
                </div>
              </div>
            </label>
          </div>
        </div>

        <LanguageServicesStatsUsagereport />

        <LanguageServicesStatsSignlanguageUsage />
      </div>

      <div v-if="selectTab === 'Media'">
        <LanguageServicesStatsVideochart class="!mt-[120px]" />
        <LanguageServicesStatsTranslationaccuracy />
        <LanguageServicesStatsUploadedfiles />
        <LanguageServicesOverviewUsagereports />
        <LanguageServicesStatsSignlanguageUsage />
      </div>

      <div v-if="selectTab === 'Documents'">
        <LanguageServicesStatsWordchart class="!mt-[120px]" />
        <LanguageServicesStatsPdfchart />
        <LanguageServicesStatsTranslationaccuracy />
        <LanguageServicesStatsUploadedfiles />
        <LanguageServicesOverviewUsagereports />
        <LanguageServicesStatsSignlanguageUsage />
      </div>

      <div v-if="selectTab === 'Images'">
        <LanguageServicesStatsImageschart class="!mt-[120px]" />
        <LanguageServicesStatsTranslationaccuracy />
        <LanguageServicesStatsUploadedfiles />
        <LanguageServicesOverviewUsagereports />
        <LanguageServicesStatsSignlanguageUsage />
      </div>
    </div>
  </div>
</template>

<style>
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
</style>
