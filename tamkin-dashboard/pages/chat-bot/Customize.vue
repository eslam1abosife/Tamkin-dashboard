<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

import { useCollapseStore } from "@/stores/collapse.js";
import { useCustomizeStore } from "@/stores/customize.js";
import { useGetPlayerData } from "@/composables/useAccessibility";
import { useApi } from "@/composables/useApi";
const { locale } = useI18n();
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const { $toast } = useNuxtApp();

const { useApiInstance } = useApi();
const { api, loading } = useApiInstance();

const customizeStore = useCustomizeStore();
const settingsStore = useSettingsStore();
const collapseStore = useCollapseStore();
const { getPlayerData } = useGetPlayerData();

const {
  colorMode,
  gradient1,
  initgradient1,
  gradient2,
  initgradient2,
  currentColor,
  initcurrentColor,
  buttonSizeSlider,
  buttonShapeSelector,
  force_change_MainMenuCard,
  force_change_profileCards,
  forceChange_buttonShape,
  buttonPositionDesktop,
  buttonPositionMobile,
  widgetType,
} = storeToRefs(customizeStore);

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
  requiredPermission: "sign-language-customize",
});
const localePath = useLocalePath();

// const buttonShapeSelector = ref("type1");

const route = useRoute();

const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
let pendingNavigation = null;

const handleSaveAndMove = () => {
  customizeStore.saveAndMove();
  handleSave("default");
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};
const handleSaveToAllAndMove = () => {
  customizeStore.saveAndMove();
  handleSave("all");
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const DiscardAndMove = () => {
  cancelAc();
  customizeStore.routeLeaveModal = false;
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

onBeforeRouteLeave((to, from, next) => {
  if (detectUnsavedChanges()) {
    customizeStore.showSaveBeforeLeaveModal();
    pendingNavigation = { next, to };
  } else {
    next(); // No unsaved changes, proceed normally
  }
});

const shouldShowFooter = computed(() => {
  const isActive =
    (isLinkActive("/sign-language/customize") &&
      currentColor.value !== initcurrentColor.value) ||
    (isLinkActive("/sign-language/customize") &&
      gradient1.value !== initgradient1.value) ||
    (isLinkActive("/sign-language/customize") &&
      gradient2.value !== initgradient2.value) ||
    (isLinkActive("/sign-language/customize") &&
      customizeStore.hasSignLangChanges());

  return isActive;
});

const detectUnsavedChanges = () => {
  return shouldShowFooter.value;
};

onBeforeMount(() => {
  // if(customizeStore.managePlayerPackages.length <= 0) {
  getPlayerData();
  //  }
});

onMounted(() => {
  [
    "deaf-customize-sign-language-mode-move-/-hide-sign-language-player",
    "deaf-customize-sign-language-background-sign-language-background",
    "deaf-customize-sign-language-player-contrast-sign-language-contrast",
    "deaf-customize-sign-language-player-keyboard-sign-language-keyboard",
    "deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget",
  ].forEach((name) => {
    customizeStore.addCheckbox(name);
  });
  customizeStore.initializeCheckboxes([
    "deaf-customize-sign-language-mode-move-/-hide-sign-language-player",
    "deaf-customize-sign-language-background-sign-language-background",
    "deaf-customize-sign-language-player-contrast-sign-language-contrast",
    "deaf-customize-sign-language-player-keyboard-sign-language-keyboard",
    "deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget",
  ]);
});

const cancelAc = () => {
  const isCustomizeLinkActive = isLinkActive("/sign-language/customize");
  if (isCustomizeLinkActive) {
    customizeStore.checkboxes = JSON.parse(
      JSON.stringify(customizeStore.initialCheckboxes)
    );

    customizeStore.currentColor = customizeStore.initcurrentColor;
    customizeStore.gradient1 = customizeStore.initgradient1;
    customizeStore.gradient2 = customizeStore.initgradient2;
    customizeStore.colorMode = customizeStore.initcolorMode;
    customizeStore.buttonPositionDesktop =
      customizeStore.initialPositionDesktop;
    customizeStore.buttonPositionMobile = customizeStore.initialPositionMobile;

    customizeStore.buttonSizeSlider = customizeStore.initbuttonSizeSlider;
    customizeStore.buttonShapeSelector = customizeStore.initbuttonShapeSelector;
    customizeStore.selectedIcon = customizeStore.initselectedIcon;
    customizeStore.selectedLang = customizeStore.initselectedLang;
    customizeStore.background = customizeStore.initbackground;
    customizeStore.contrast = customizeStore.initcontrast;

    customizeStore.accessibilityMode = customizeStore.initaccessibilityMode;
    customizeStore.liveTranlsationButtonLocation =
      customizeStore.initliveTranlsationButtonLocation;

    customizeStore.force_change_MainMenuCard = false;
    customizeStore.force_change_profileCards = false;
  }
};

const updateNewValues = () => {
  const isCustomizeLinkActive = isLinkActive("/sign-language/customize");

  if (isCustomizeLinkActive) {
    customizeStore.initbackground = customizeStore.background;
    customizeStore.initcontrast = customizeStore.contrast;
    customizeStore.initialCheckboxes = JSON.parse(
      JSON.stringify(customizeStore.checkboxes)
    );
    customizeStore.initcurrentColor = customizeStore.currentColor;
    customizeStore.initgradient1 = customizeStore.gradient1;
    customizeStore.initgradient2 = customizeStore.gradient2;
    customizeStore.initcolorMode = customizeStore.colorMode;
    customizeStore.initialPositionDesktop =
      customizeStore.buttonPositionDesktop;
    customizeStore.initialPositionMobile = customizeStore.buttonPositionMobile;

    customizeStore.initbuttonSizeSlider = customizeStore.buttonSizeSlider;
    customizeStore.initbuttonShapeSelector = customizeStore.buttonShapeSelector;
    customizeStore.initselectedIcon = customizeStore.selectedIcon;
    customizeStore.initselectedLang = customizeStore.selectedLang;

    customizeStore.initaccessibilityMode = customizeStore.accessibilityMode;
    customizeStore.initliveTranlsationButtonLocation =
      customizeStore.liveTranlsationButtonLocation;
    customizeStore.force_change_MainMenuCard = false;
    customizeStore.force_change_profileCards = false;
  }
};

const loadingSave = ref(false);
const loadingSavetoAll = ref(false);
const handleSave = async (type: any) => {
  if (customizeStore.colorMode === "solid") {
    localStorage.setItem(
      "playerColorPanal",
      `${customizeStore.gradient1},${customizeStore.gradient2}`
    );
  } else {
    localStorage.setItem("playerColorPanal", customizeStore.currentColor);
  }

  if (type === "default") {
    loadingSave.value = true;
  } else {
    loadingSavetoAll.value = true;
  }

  interface Payload {
    AppName: string;
    Options: any[];
  }

  let payload: Payload = {
    AppName: type,
    Options: [],
  };

  if (isLinkActive("/sign-language/customize")) {
    const customizeOptions = [
      {
        name: "deaf-customize-button-color-sign-language-button-color",
        value:
          customizeStore.colorMode === "solid"
            ? customizeStore.currentColor
            : `${customizeStore.gradient1},${customizeStore.gradient2}`,
      },
      {
        name: "deaf-customize-button-type-sign-language-player-button-size",
        value: customizeStore.buttonSizeSlider,
      },
      {
        name: "deaf-customize-button-type-sign-language-button-shape",
        value: customizeStore.buttonShapeSelector,
      },
      {
        name: "deaf-customize-sign-language-mode-move-/-hide-sign-language-player-button",
        value: getValue(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        ),
      },
      {
        name: "deaf-customize-sign-language-mode-move-/-hide-sign-language-player",
        value: customizeStore.accessibilityMode,
      },
      {
        name: "deaf-customize-button-location-sign-language-button-location-mobile",
        value: customizeStore.buttonPositionMobile,
      },
      {
        name: "deaf-customize-button-location-sign-language-button-location-desktop",
        value: customizeStore.buttonPositionDesktop,
      },
      {
        name: "deaf-customize-sign-language-background-sign-language-background",
        value: getValue(
          "deaf-customize-sign-language-background-sign-language-background"
        ),
      },
      {
        name: "deaf-customize-sign-language-player-background-sign-language-background-options",
        value: customizeStore.background,
      },
      {
        name: "deaf-customize-sign-language-player-contrast-sign-language-contrast",
        value: getValue(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        ),
      },
      {
        name: "deaf-customize-sign-language-player-contrast-sign-language-contrast-option",
        value: customizeStore.contrast,
      },
      {
        name: "deaf-customize-sign-language-player-keyboard-sign-language-keyboard",
        value: getValue(
          "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
        ),
      },
      {
        name: "deaf-customize-sign-language-list-list-sign-language",
        value: customizeStore.selectedLang.code,
      },
      {
        name: "deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget",
        value: getValue(
          "deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget"
        ),
      },
    ];

    payload.Options = customizeOptions;
  }

  try {
    const res = await api.post("/Custom/SetOptions", payload);
    loadingSave.value = false;
    loadingSavetoAll.value = false;
    updateNewValues();
    $toast("Successfully Updated !", { hideIn: 3000, type: "success" });
  } catch (error) {
    loadingSave.value = false;
    loadingSavetoAll.value = false;
    console.error(error);
    throw typeof error === "string" ? error : "There is something wrong";
  }
};

const getValue = (name: any) => {
  const val = customizeStore.checkboxes.find((el: any) => {
    return el.name === name;
  });

  if (val.value) {
    return "1";
  } else {
    return "0";
  }
};
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
    <Chat-botNavbar />
    <transition name="slide-up">
      <DashboardAddonsSaveFooter
        :show-footer="shouldShowFooter"
        :loadingSave="loadingSave"
        :loadingSavetoAll="loadingSavetoAll"
        @Save="handleSave('default')"
        @saveToAllSites="handleSave('all')"
        @cancel_action="cancelAc"
      />
    </transition>
    <LazyModalsConfirm
      :showModal="customizeStore.routeLeaveModal"
      :title="$t('Save your changes')"
      :sub-title="$t('Do you want to save the changes before moving on?')"
      confirm-btn-type="other"
      @control-other="handleSaveAndMove"
      @controlsaveAllSites="handleSaveToAllAndMove"
      cancelButtonName="Discard"
      :savetoAllSitesBtn="true"
      @control-cancel="DiscardAndMove"
    />
    <div class="w-full h-full relative">
      <HeaderAccess
        :section-title="$t('Customize')"
        :section-sub-title="
          $t(
            'Comprehensive Insights into User Interactions and Performance Metrics for Your Chatbot'
          )
        "
      />
      <div
        v-if="customizeStore.loadingData || settingsStore.loadingdefaultappobj"
      >
        <div
          class="animate-pulse space-y-4 card bg-white rounded-[10px] mt-[40px] p-4 dark:bg-tamkinDarkPrimary"
        >
          <div
            class="h-[55px] w-full rounded-md bg-gray-200 dark:bg-p"
            v-for="s in 6"
            :key="s"
          ></div>
        </div>
        <div
          class="animate-pulse space-y-4 mt-2 card bg-white rounded-[10px] mt-[30px] p-4 dark:bg-tamkinDarkPrimary"
        >
          <div
            class="h-[55px] w-full rounded-md bg-gray-200 dark:bg-p"
            v-for="s in 6"
            :key="s"
          ></div>
        </div>
      </div>

      <div v-else>
        <Chat-botNodata v-if="!settingsStore.defaultappobj" />

        <div v-else>
          <Chat-botCustomizeButtoncolor
            v-if="customizeStore.isBtnColorActive"
          />

          <Chat-botCustomizeButtontype v-if="customizeStore.isbtntype_active" />

          <Chat-botCustomizeSignlangmode
            v-if="customizeStore.isDeafModeCardActive"
          />

          <Chat-botCustomizeButtonLocation
            v-if="customizeStore.isBtnLocationActive"
          />

          <Chat-botCustomizeLanguage />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
html[dir="rtl"] .picker-hue-range-slider {
  background: linear-gradient(
    to left,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  ) !important;
}

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
.bg_interval_open {
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  @apply !text-white;

  &.tamkin {
    @apply rounded-[10px] h-[32px];
  }
}

/* Add custom styles here if needed */
.range_tamkin_customize::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 40px;
  height: 40px;
  background: transparent; /* Hide the default thumb */
  cursor: pointer;
}

.range_tamkin_customize::-moz-range-thumb {
  width: 40px;
  height: 40px;
  background: transparent; /* Hide the default thumb */
  cursor: pointer;
}
.svg_container_access_3 {
  @apply w-[40px] h-[40px];

  svg {
    @apply w-[40px] h-[30px];
  }
}
</style>
