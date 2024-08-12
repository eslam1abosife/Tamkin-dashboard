<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

import { useCollapseStore } from "@/stores/collapse.js";
import { useCustomizeStore } from "@/stores/customize.js";
const customizeStore = useCustomizeStore();
const collapseStore = useCollapseStore();
const {
  colorMode,
  gradient1,
  gradient2,
  currentColor,
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
});
const localePath = useLocalePath();

// const buttonShapeSelector = ref("type1");

const route = useRoute();

const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
let pendingNavigation = null;

const detectUnsavedChanges = () => {
  return (
    forceChange_buttonShape.value ||
    force_change_profileCards.value ||
    force_change_MainMenuCard.value ||
    currentColor.value !== "#2dada3" ||
    gradient1.value !== "#2dada3" ||
    gradient2.value !== "#2dada3" ||
    customizeStore.hasChanges()
  );
};

const handleSaveAndMove = () => {
  customizeStore.saveAndMove();
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const handleCancelLeave = () => {
  customizeStore.routeLeaveModal = false; // Close the modal
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
      customizeStore.currentColor !== "#2dada3") ||
    (isLinkActive("/sign-language/customize") &&
      customizeStore.gradient1 !== "#2dada3") ||
    (isLinkActive("/sign-language/customize") &&
      customizeStore.gradient2 !== "#2dada3") ||
    (isLinkActive("/sign-language/customize") && customizeStore.hasChanges());

  return isActive;
});
const cancelAll = () => {
  customizeStore.initializeCheckboxes([
    "Contrast_id",
    "Background_id",
    "Position_id",
    "Keyboard_id",
    "custom_trigger_id",
    "move_access",
    "keyboard_checkbox",
    "constrast_checkbox",
    "background_checkbox",
    "language",
  ]);

  currentColor.value = "";
  gradient1.value = "";
  gradient2.value = "";
  colorMode.value = "solid";
  buttonPositionDesktop.value = customizeStore.initialPositionDesktop;

  buttonPositionMobile.value = "top_left_mobile";
  buttonSizeSlider.value = "2";
  buttonShapeSelector.value = "type1";
  widgetType.value = "full_widget";
  currentColor.value = "#2dada3";
  gradient1.value = "#2dada3";
  gradient2.value = "#2dada3";
  forceChange_buttonShape.value = false;
  force_change_profileCards.value = false;
  force_change_MainMenuCard.value = false;
};

const cancelAc = () => {
  const isAddonsLinkActive =
    (isLinkActive("/sign-language/customize") &&
      customizeStore.currentColor !== "#2dada3") ||
    (isLinkActive("/sign-language/customize") &&
      customizeStore.gradient1 !== "#2dada3") ||
    (isLinkActive("/sign-language/customize") &&
      customizeStore.gradient2 !== "#2dada3") ||
    (isLinkActive("/sign-language/customize") && customizeStore.hasChanges());

  if (isAddonsLinkActive) {
    cancelAll();
  }
};

onMounted(() => {
  customizeStore.initializeCheckboxes([
    "Contrast_id",
    "Background_id",
    "Position_id",
    "Keyboard_id",
    "custom_trigger_id",
    "move_access",
    "keyboard_checkbox",
    "constrast_checkbox",
    "background_checkbox",
    "language",
  ]);
  customizeStore.initializeCardsMenu(
    [
      {
        icon: "contrast.png",
        name: "Contrast",
        description:
          "Manage your sign language tools and personalize them to enhance your communication experience.",
        checkboxId: "Contrast_id",
      },
      {
        icon: "background.png",
        name: "Background",
        description:
          "Manage your sign language tools and personalize them to enhance your communication experience.",
        checkboxId: "Background_id",
      },
      {
        icon: "position.png",
        name: "Position",
        description:
          "Manage your sign language tools and personalize them to enhance your communication experience.",
        checkboxId: "Position_id",
      },
      {
        icon: "keyboard.png",
        name: "Keyboard",
        description:
          "Manage your sign language tools and personalize them to enhance your communication experience.",
        checkboxId: "Keyboard_id",
      },
    ],

    "AdjustMainMenuCardsCustomize",
    "initialCardsOrderCustomize"
  );
});
</script>

<template>
  <div class="relative h-full w-full">
    <LanguageServicesNavbar />
    <transition name="slide-up">
      <DashboardAddonsSavefooter
        :show-footer="shouldShowFooter"
        @cancel_action="cancelAc"
      />
    </transition>
    <LazyModalsConfirm
      :showModal="customizeStore.routeLeaveModal"
      title="Save  your changes"
      sub-title="Do you want to save the changes before moving on?"
      confirm-btn-type="other"
      @control-other="handleSaveAndMove"
      cancelButtonName="Discard"
      :savetoAllSitesBtn="true"
      @control-cancel="handleSaveAndMove"
    />
    <div class="w-full h-full relative">
      <!--       
        <transition name="slide-up">
          <DashboardAddonsSavefooter
            :show-footer="shouldShowFooter"
            @cancel_action="cancelAc"
          />
        </transition> -->

      <HeaderAccess
        websiteImgName="tamkin_hand.svg"
        website-title="Tamkin.App"
        website-link="google.com"
        section-title="Addons"
        section-sub-title="Enable the Accessibility Services Addons to improve usability and enhance your
              experience."
      />

      <LanguageServicesCustomizeButtoncolor />

      <LanguageServicesCustomizeButtontype />
      <LanguageServicesCustomizeSignlangmode />
      <LanguageServicesCustomizeSignlanguagebackground />
      <LanguageServicesCustomizeSignlanguagecontrast />

      <LanguageServicesCustomizeSignlanguagekeyboard />
      <!-- <CustomizeLiveButtonTranslation/> -->

      <!-- <CustomizeAdjustMainMenu /> -->
      <!-- <CustomizeAccessibilityProfiles /> -->
      <!-- <CustomizeWidgetType /> -->
      <LanguageServicesCustomizeLanguage class="!mt-[30px]" />

      <LazyLanguageServicesCustomizeAdjustMain />
      <LanguageServicesCustomizeCustomtrigger />
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
