<script lang="ts" setup>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { useWindowSize } from "@vueuse/core";
// import { useModalStore } from "@/stores/modal";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
import { onBeforeRouteLeave } from "vue-router";

import { useNavbarStore } from "@/stores/navbar";
import { useAddonStore } from "@/stores/addons.js";
import {} from "@/stores/customize.js";
import { useSettingsStore } from "@/stores/settings.js";
import { useStatsStore } from "@/stores/stats.js";
import { useMarketStore } from "@/stores/market.js";
import { usePlayerStore } from "@/stores/player.js";
import { useModalManager } from "@/composables/useModalManager";
import { useUserStore } from "@/stores/auth"; // Import the Pinia store
import { useTranslateStore } from "~/stores/translate";
import { useGetAccessaility } from "@/composables/useAccessibility";

import { useProfileStore } from "~/stores/profile";
const { getAccessability } = useGetAccessaility();
const translateStore = useTranslateStore();
import { useGetCurrentTeam, useGetInvestor } from "@/composables/useProfile";
import { useApi } from "@/composables/useApi";

const { useApiInstance } = useApi();
const { api, loading } = useApiInstance();

const { getInvestor, loading: lod } = useGetInvestor();
const { getCurrentTeam, currTeam } = useGetCurrentTeam();
const profileStore = useProfileStore();

const { getAvatarLetters } = useGetAvatarLetters();
// const { data: member, pending, error:of } = await useAsyncData('member_t', async () => {

// // console.log(res,'here res')

//   return true
// });
onBeforeMount(async () => {
  // await profileStore.getCurrentTeam();
});
onMounted(async () => {
  if (localStorage.getItem("user")) {
    const userStore = useUserStore();
    const user = JSON.parse(localStorage.getItem("user"));
    userStore.setUser(user);
  }

  // profileStore.fetchMember();
  // profileStore.setCompany();
});

const statsStore = useStatsStore();
const marketStore = useMarketStore();
const playerStore = usePlayerStore();
const checkboxStore = useAddonStore();
const custmizeStore = useCustomizeStore();
const settingsStore = useSettingsStore();
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
const navStore = useNavbarStore();
const navStoreRef = storeToRefs(navStore);
const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);
  const pattern = localePath(path);

  // If the pattern does not contain a wildcard, do an exact match
  if (!pattern.includes("*")) {
    return currentPath === pattern;
  }

  // Convert wildcard pattern to regex
  const regex = new RegExp("^" + pattern.replace(/\/\*/g, ".*") + "$");

  return regex.test(currentPath);
};

const { resetModal } = storeToRefs(marketStore);
const { $toast } = useNuxtApp();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  emitEvent,
} = useModalManager();
const {
  initialPositionDesktop,
  initialPositionMobile,
  buttonPositionDesktop,
  buttonPositionMobile,
  force_change_profileCards,
  force_change_MainMenuCard,
  currentColor,
  initcurrentColor,
  gradient2,
  initgradient2,

  gradient1,
  initgradient1,
} = storeToRefs(custmizeStore);

const { width, height } = useWindowSize();
const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
});
const htmlAttrs = computed(() => head.value.htmlAttrs!);
const router = useRouter();
const isSearchfilled = ref(false);
const search = ref("");
const sideBarOpen = navStoreRef.sideBarOpen;
const sideBarOpenMobile = ref(false);
const showNotifiations = ref(false);

const toggleSidebar = () => {
  navStore.openNav();
};

function toggleSidebarMobile() {
  sideBarOpenMobile.value = !sideBarOpenMobile.value;
}

watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});

watch(
  () => route.path,
  (newPath, oldPath) => {
    sideBarOpenMobile.value = false;
  },
  { immediate: true }
);
watchEffect(() => {
  if (width.value < 1000) {
    sideBarOpen.value = true;
  }
});

const clearInput = () => {
  search.value = "";
};
// const closeResetAllModal = ()=>{

// }
// const isCustomizeLinkActive = isLinkActive('/customize') && custmizeStore.force_change;
const anyChangesInStylesTranslate = computed(() => {
  return JSON.stringify(translateStore.styles);
});
const anyChangesInPlayerTranslate = computed(() => {
  return JSON.stringify(translateStore.styles);
});
const showFooterSaveStyles = ref(false);
const showFooterSavePlayer = ref(false);

watch(anyChangesInStylesTranslate, (newValue, oldValue) => {}, { deep: true });

watch(anyChangesInPlayerTranslate, (newValue, oldValue) => {
  showFooterSavePlayer.value = true;
});
const error = useError();

const shouldShowFooter = computed(() => {
  const isAddonsLinkActive =
    (isLinkActive("/addons") && checkboxStore.hasChanges()) ||
    (isLinkActive("/addons") && checkboxStore.force_change_menuCards) ||
    (isLinkActive("/addons") && checkboxStore.force_change_profileCards);
  const isCustomizeLinkActive =
    (isLinkActive("/customize") &&
      currentColor.value !== initcurrentColor.value) ||
    (isLinkActive("/customize") && gradient1.value !== initgradient1.value) ||
    (isLinkActive("/customize") && gradient2.value !== initgradient2.value) ||
    (isLinkActive("/customize") && custmizeStore.hasChanges());
  const isMarketChanges = isLinkActive("/market") && marketStore.showSaveFooter;

  const isSettingsLinkActive =
    isLinkActive("/settings") && settingsStore.hasChanges();
  const isStatsActive =
    isLinkActive("/statistics") && statsStore.google_enabled;

  const translateStyle =
    isLinkActive("/translate/video") &&
    translateStore.hasChanges &&
    translateStore.subMode === "style" &&
    translateStore.currentMode === "subtitles";
  const translatePlayer =
    isLinkActive("/translate/video") &&
    translateStore.hasChangesPlayer &&
    translateStore.currentMode === "player";
  return (
    isAddonsLinkActive ||
    isCustomizeLinkActive ||
    isSettingsLinkActive ||
    isStatsActive ||
    isMarketChanges ||
    translateStyle ||
    translatePlayer ||
    (translateStore.changesOnSubTitles && isLinkActive("/translate/video"))
  );
});

const cancelAc = () => {
  const isCustomizeLinkActive = isLinkActive("/customize");
  const isAddonsLinkActive = isLinkActive("/addons");
  const isSettingsLinkActive = isLinkActive("/settings");
  const isStatsActive =
    isLinkActive("/statistics") && statsStore.google_enabled;
  const isMarketChanges = isLinkActive("/market") && marketStore.showSaveFooter;
  // const translatePlayer =
  //   isLinkActive("/translate/video") && translateStore.hasChangesPlayer;
  const translateStyle =
    isLinkActive("/translate/video") &&
    translateStore.hasChanges &&
    translateStore.subMode === "style" &&
    translateStore.currentMode === "subtitles";
  const translatePlayer =
    isLinkActive("/translate/video") && translateStore.hasChangesPlayer;
  if (isCustomizeLinkActive) {
    custmizeStore.checkboxes = JSON.parse(
      JSON.stringify(custmizeStore.initialCheckboxes)
    );

    custmizeStore.currentColor = custmizeStore.initcurrentColor;
    custmizeStore.gradient1 = custmizeStore.initgradient1;
    custmizeStore.gradient2 = custmizeStore.initgradient2;
    custmizeStore.colorMode = custmizeStore.initcolorMode;
    custmizeStore.buttonPositionDesktop = custmizeStore.initialPositionDesktop;
    custmizeStore.buttonPositionMobile = custmizeStore.initialPositionMobile;

    custmizeStore.buttonSizeSlider = custmizeStore.initbuttonSizeSlider;
    custmizeStore.buttonShapeSelector = custmizeStore.initbuttonShapeSelector;
    custmizeStore.selectedIcon = custmizeStore.initselectedIcon;
    custmizeStore.widgetType = custmizeStore.initwidgetType;
    custmizeStore.selectedLang = custmizeStore.initselectedLang;
    custmizeStore.currentShapeLiveTranslation =
      custmizeStore.initcurrentShapeLiveTranslation;
    custmizeStore.currentAboveShapeLiveTranslation =
      custmizeStore.initcurrentAboveShapeLiveTranslation;
    custmizeStore.accessibilityMode = custmizeStore.initaccessibilityMode;
    custmizeStore.liveTranlsationButtonLocation =
      custmizeStore.initliveTranlsationButtonLocation;
    custmizeStore.force_change_MainMenuCard = false;
    custmizeStore.force_change_profileCards = false;
  }
  if (isMarketChanges) {
    marketStore.resetAll();
    playerStore.wearSavedClothes();
  }
  if (isAddonsLinkActive) {
    checkboxStore.checkboxes = JSON.parse(
      JSON.stringify(checkboxStore.initialCheckboxes)
    );
  }
  if (isSettingsLinkActive) {
    settingsStore.checkboxes = JSON.parse(
      JSON.stringify(settingsStore.initialCheckboxes)
    );
  }
  if (translateStyle) {
    translateStore.resetStyles();
  }
  if (translatePlayer) {
    translateStore.resetPlayer();
  }
  if (isStatsActive) {
    statsStore.google_enabled = false;
  }
};

const updateNewValues = () => {
  const isCustomizeLinkActive = isLinkActive("/customize");
  const isAddonsLinkActive = isLinkActive("/addons");
  const isSettingsLinkActive = isLinkActive("/settings");
  if (isCustomizeLinkActive) {
    custmizeStore.initialCheckboxes = JSON.parse(
      JSON.stringify(custmizeStore.checkboxes)
    );
    custmizeStore.initcurrentColor = custmizeStore.currentColor;
    custmizeStore.initgradient1 = custmizeStore.gradient1;
    custmizeStore.initgradient2 = custmizeStore.gradient2;
    custmizeStore.initcolorMode = custmizeStore.colorMode;
    custmizeStore.initialPositionDesktop = custmizeStore.buttonPositionDesktop;
    custmizeStore.initialPositionMobile = custmizeStore.buttonPositionMobile;

    custmizeStore.initbuttonSizeSlider = custmizeStore.buttonSizeSlider;
    custmizeStore.initbuttonShapeSelector = custmizeStore.buttonShapeSelector;
    custmizeStore.initselectedIcon = custmizeStore.selectedIcon;
    custmizeStore.initwidgetType = custmizeStore.widgetType;
    custmizeStore.initselectedLang = custmizeStore.selectedLang;
    custmizeStore.initcurrentShapeLiveTranslation =
      custmizeStore.currentShapeLiveTranslation;
    custmizeStore.initcurrentAboveShapeLiveTranslation =
      custmizeStore.currentAboveShapeLiveTranslation;
    custmizeStore.initaccessibilityMode = custmizeStore.accessibilityMode;
    custmizeStore.initliveTranlsationButtonLocation =
      custmizeStore.liveTranlsationButtonLocation;
    custmizeStore.force_change_MainMenuCard = false;
    custmizeStore.force_change_profileCards = false;
  }

  if (isAddonsLinkActive) {
    checkboxStore.initialCheckboxes = JSON.parse(
      JSON.stringify(checkboxStore.checkboxes)
    );
  }
  if (isSettingsLinkActive) {
    settingsStore.initialCheckboxes = JSON.parse(
      JSON.stringify(settingsStore.checkboxes)
    );
  }
};

const openModals = computed(() => {
  return (
    isOpen("shareModal") ||
    isOpen("invitemember") ||
    isOpen("invitememberupdate") ||
    isOpen("editteampic") ||
    isOpen("editMemberPic") ||
    isOpen("editusermodal") ||
    isOpen("userpermissions") ||
    isOpen("selectSite") ||
    isOpen("upgrade") ||
    isOpen("translate_video") ||
    isOpen("translate_audio") ||
    isOpen("renamemodal") ||
    isOpen("upgradeTranslatePackage") ||
    isOpen("sharetranslate") ||
    isOpen("moreinfo_translate") ||
    isOpen("translate_live_video") ||
    isOpen("translate_pdf_documents") ||
    isOpen("translate_word_documents") ||
    isOpen("transferstep1") ||
    isOpen("transferstep2") ||
    isOpen("deleteTeamMember") ||
    isOpen("deleteApp") ||
    isOpen("restoreApp") ||
    isOpen("deleteModal") ||
    isOpen("resetModal") ||
    isOpen("mycart") ||
    isOpen("requestmodal") ||
    isOpen("cardModal") ||
    isOpen("translate_images") ||
    isOpen("editname") ||
    sideBarOpenMobile.value ||
    isOpen("edit_card_billing_profile") ||
    isOpen("withdraw_paymentmethods") ||
    isOpen("bank_account_withdraw") ||
    isOpen("details_bank_withdraw") ||
    isOpen("success_bank_withdraw") ||
    isOpen("crypto_step1") ||
    isOpen("crypto_step_2_e") ||
    isOpen("crypto_success_referral") ||
    isOpen("paypal_withdraw_step1") ||
    isOpen("paypal_withdraw_step2") ||
    isOpen("success_paypal_withdraw") ||
    isOpen("add_new_card_billing") ||
    isOpen("tracking_custom_order") ||
    isOpen("requestmodal_update") ||
    isOpen("requestmodal_details") ||
    isOpen("deleteModal_card") ||
    isOpen("successContact") ||
    isOpen("edit_company_picture") ||
    isOpen("notificationsModal") ||
    isOpen("join_to_investor") ||
    isOpen("cardModal_market") ||
    isOpen("paymentMethods_market") ||
    isOpen("crypto_market_step1") ||
    isOpen("paypal_market") ||
    isOpen("crypto_market_success") ||
    isOpen("crypto_market_step2") ||
    isOpen("successPayment_market") ||
    isOpen("custom_package") ||
    isOpen("add_package_modal_packages") ||
    isOpen("payment_methods_packages") ||
    isOpen("cardModal_packages") ||
    isOpen("success_pay_package") ||
    isOpen("crypto_packages_step1") ||
    isOpen("crypto_packages_step2") ||
    isOpen("crypto_packages_success") ||
    isOpen("paypal_packages") ||
    isOpen("add_package_modal_addsite") ||
    isOpen("cardModal_addsite") ||
    isOpen("payment_methods_addsite") ||
    isOpen("crypto_addsite_step1") ||
    isOpen("crypto_addsite_step2") ||
    isOpen("crypto_addsite_success") ||
    isOpen("paypal_addsite") ||
    isOpen("add_package_modal_mysite") ||
    isOpen("cardModal_mysite") ||
    isOpen("payment_methods_mysite") ||
    isOpen("crypto_mysite_step2") ||
    isOpen("crypto_mysite_step1") ||
    isOpen("crypto_mysite_success") ||
    isOpen("success_pay_addsite") ||
    isOpen("success_pay_mysite") ||
    isOpen("upgrade_mysite_package") ||
    isOpen("paypal_mysite") ||
    isOpen("upgrade_no_package") ||
    isOpen("cancel_subscription_internal") ||
    isOpen("cancel_subscription_subs") ||
    isOpen("payment_methods_subs") ||
    isOpen("cardModal_subs") ||
    isOpen("paypal_subs") ||
    isOpen("crypto_subs_step1") ||
    isOpen("crypto_subs_step2") ||
    // marketStore.firstItemNotificationShown ||
    // marketStore.resetModal ||
    // marketStore.requestModal ||
    // showShareModal.value ||
    // editPictureTeamModal.value ||
    // editPermissionsModal.value ||
    // inviteMemberModal.value ||
    // selectSiteModal.value ||
    // editUserModal.value ||
    // InviteMemberUpdateModal.value ||
    // showUpgradeModal.value ||
    resetModal.value ||
    checkboxStore.routeLeaveModal ||
    custmizeStore.routeLeaveModal ||
    settingsStore.routeLeaveModal
    // deleteModal.value ||
    // transferModalStep1.value ||
    // transferStep2.value ||
    // checkboxStore.routeLeaveModal ||
    // custmizeStore.routeLeaveModal ||
    // settingsStore.routeLeaveModal ||
    // statsStore.routeLeaveModal ||
    // modalStore.showSuccessModalContact ||
    // marketStore.showCart
  );
});

const closeSideBarOnMobileOverlay = () => {
  if (sideBarOpenMobile.value) {
    sideBarOpenMobile.value = false;
  }
};
const logout = () => {
  const userStore = useUserStore();
  userStore.logout();
  localStorage.removeItem("user");
  localStorage.removeItem("registerd_email");
  localStorage.removeItem("registerd_user");

  router.push("/auth/login");
};

const userName = () => {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.full_name || user.display_name : "";
  }
  return "";
};

const userImg = computed(() => {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.user_image) {
      return `https://tamkin.app/${user.user_image}`;
    } else if (user && user.photoURL) {
      return user.photoURL;
    }
    return null;
  }
  return null;
});

const toastMsg = ref(null);
const toastAppear = ref(false);

const openToast = (msg) => {
  console.log("msg", msg);
  toastMsg.value = msg;
  toastAppear.value = true;
  setTimeout(() => {
    toastAppear.value = false;
  }, 2000);
};

watch(
  () => route.path,
  (newPath) => {
    if (process.client) {
      const checkChatwootAvailability = () => {
        if (window.$chatwoot) {
          // Ensure the specific Chatwoot element exists before proceeding
          const chatwootBubble = document.querySelector(".woot-widget-bubble"); // Replace with the actual class/selector

          if (chatwootBubble) {
            if (!isLinkActive("/embed-code")) {
              window.$chatwoot.toggleBubbleVisibility("hide");
              window.$chatwoot.toggle("close");
            }
          } else {
            // Optional: log an error or retry after a short delay
            // console.error("Chatwoot bubble not found yet.");
            setTimeout(checkChatwootAvailability, 100); // Retry after 100ms
          }
        } else {
          // Optional: Retry if $chatwoot isn't available yet
          setTimeout(checkChatwootAvailability, 100); // Check again in 100ms
        }
      };

      checkChatwootAvailability();
    }
  },
  { immediate: true }
);

onMounted(async () => {
  const userStore = useUserStore();
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    userStore.user = user;
  }
});
const langloader = ref(true);

const loadingSave = ref(false);
const loadingSavetoAll = ref(false);
const handleSave = async (type: any) => {
  if (type === "default") {
    loadingSave.value = true;
  } else {
    loadingSavetoAll.value = true;
  }

  const menu = custmizeStore.AdjustMainMenuCardsCustomize.map((item1: any) => {
    item1.name = item1.checkboxId;
    const matchingItem = custmizeStore.checkboxes.find(
      (item2: any) => item2.name === item1.checkboxId
    );
    let newItem = {};
    if (matchingItem) {
      newItem = { ...item1, value: matchingItem.value ? "1" : "0" };
    }

    return newItem;
  });

  const profiles = custmizeStore.manageProfileCardsCustomize.map(
    (item1: any) => {
      const matchingItem = custmizeStore.checkboxes.find(
        (item2: any) => item2.name === item1.checkboxId
      );

      item1.name = item1.checkboxId;

      let newItem = {};
      if (matchingItem) {
        newItem = { ...item1, value: matchingItem.value ? "1" : "0" };
      }
      return newItem;
    }
  );

  interface Payload {
    AppName: string;
    Options: any[];
  }

  let payload: Payload = {
    AppName: type,
    Options: [],
  };

  if (isLinkActive("/customize")) {
    const customizeOptions = [
      ...menu,
      ...profiles,
      {
        name: "acc-customize-accessibility-mode-move-/-hide-accessibility",
        value: custmizeStore.accessibilityMode,
        active: getValue(
          "acc-customize-accessibility-mode-move-/-hide-accessibility"
        ),
      },
      {
        name: "acc-customize-button-color-button-color",
        value:
          custmizeStore.colorMode === "solid"
            ? custmizeStore.currentColor
            : `${custmizeStore.gradient1},${custmizeStore.gradient2}`,
      },
      {
        name: "acc-customize-button-location-button-location-mobile",
        value: custmizeStore.buttonPositionMobile,
      },
      {
        name: "acc-customize-button-location-button-location-desktop",
        value: custmizeStore.buttonPositionDesktop,
      },
      {
        name: "acc-customize-button-type-button-size",
        value: custmizeStore.buttonSizeSlider,
      },
      {
        name: "acc-customize-button-type-button-shape",
        value: custmizeStore.buttonShapeSelector,
      },
      {
        name: "acc-customize-language-list-of-languages",
        value: custmizeStore.selectedLang.language_code,
      },
      {
        name: "acc-customize-language-show-language-selector-on-the-widget",
        value: getValue(
          "acc-customize-language-show-language-selector-on-the-widget"
        ),
      },
      {
        name: "acc-customize-translations-button-enable-live-site-translations-button",
        value: getValue(
          "acc-customize-translations-button-enable-live-site-translations-button"
        ),
      },
      {
        name: "acc-customize-translations-button-position-translation-button-above",
        value: custmizeStore.currentAboveShapeLiveTranslation,
        is_selected:
          custmizeStore.liveTranlsationButtonLocation == "above" ? "1" : "0",
      },
      {
        name: "acc-customize-translations-button-translation-button-as-default-button",
        value: custmizeStore.currentShapeLiveTranslation,
        is_selected:
          custmizeStore.liveTranlsationButtonLocation == "default" ? "1" : "0",
      },
      {
        name: "acc-customize-widget-customization--oversized-widget",
        value: getValue("acc-customize-widget-customization--oversized-widget"),
      },
      {
        name: "acc-customize-widget-customization--3-column-layout-widget",
        value: getValue(
          "acc-customize-widget-customization--3-column-layout-widget"
        ),
      },
      {
        name: "acc-customize-widget-customization--accessibility-profiles",
        value: getValue(
          "acc-customize-widget-customization--accessibility-profiles"
        ),
      },
      {
        name: "acc-customize-widget-type-widget-style",
        value: custmizeStore.widgetType,
      },
    ];

    payload.Options = customizeOptions;
  } else if (isLinkActive("/settings")) {
    const settigsOptions = [
      {
        name: "acc-setting-general-settings-sound-effects",
        value: getSettingsValue("acc-setting-general-settings-sound-effects"),
      },
      {
        name: "acc-setting-general-settings-widget-enabled-on-mobile",
        value: getSettingsValue(
          "acc-setting-general-settings-widget-enabled-on-mobile"
        ),
      },
      {
        name: "acc-setting-general-settings-widget-enabled-on-this-site",
        value: getSettingsValue(
          "acc-setting-general-settings-widget-enabled-on-this-site"
        ),
      },
    ];
    payload.Options = settigsOptions;
  } else if (isLinkActive("/addons")) {
    const addonsmenu = checkboxStore.AdjustMainMenuCards.map((item1: any) => {
      const matchingItem = checkboxStore.checkboxes.find(
        (item2: any) => item2.name === item1.checkboxId
      );
      item1.name = item1.checkboxId;
      let newItem = {};
      if (matchingItem) {
        newItem = { ...item1, value: matchingItem.value ? "1" : "0" };
      }

      return newItem;
    });

    const addonsprofiles = checkboxStore.manageProfileCards.map(
      (item1: any) => {
        const matchingItem = checkboxStore.checkboxes.find(
          (item2: any) => item2.name === item1.checkboxId
        );
        item1.name = item1.checkboxId;

        let newItem = {};
        if (matchingItem) {
          newItem = { ...item1, value: matchingItem.value ? "1" : "0" };
        }
        return newItem;
      }
    );

    const addonsOptions = [...addonsmenu, ...addonsprofiles];
    payload.Options = addonsOptions;
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
    console.error(error); // Better error handling
    throw typeof error === "string" ? error : "There is something wrong";
  }
};

const getValue = (name: any) => {
  const val = custmizeStore.checkboxes.find((el: any) => {
    return el.name === name;
  });

  if (val.value) {
    return "1";
  } else {
    return "0";
  }
};

const getSettingsValue = (name: any) => {
  const val = settingsStore.checkboxes.find((el: any) => {
    return el.name === name;
  });

  if (val.value) {
    return "1";
  } else {
    return "0";
  }
};

let pendingNavigation = null;

const handleSaveAndMove = () => {
  if (isLinkActive("/settings")) {
    settingsStore.saveAndMove();
  } else if (isLinkActive("/customize")) {
    custmizeStore.saveAndMove();
  } else if (isLinkActive("/addons")) {
    checkboxStore.saveAndMove();
  }

  handleSave("default");
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};
const handleSaveToAllAndMove = () => {
  if (isLinkActive("/settings")) {
    settingsStore.saveAndMove();
  } else if (isLinkActive("/customize")) {
    custmizeStore.saveAndMove();
  } else if (isLinkActive("/addons")) {
    checkboxStore.saveAndMove();
  }
  handleSave("all");
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const DiscardAndMove = () => {
  cancelAc();
  if (isLinkActive("/settings")) {
    settingsStore.routeLeaveModal = false;
    if (settingsStore.pendingNavigation) {
      const { next, to } = settingsStore.pendingNavigation;
      next(); // Proceed with the stored navigation
      settingsStore.pendingNavigation = {}; // Clear pending navigation after proceeding
    }
  } else if (isLinkActive("/customize")) {
    custmizeStore.routeLeaveModal = false;
    if (custmizeStore.pendingNavigation) {
      const { next, to } = custmizeStore.pendingNavigation;
      next(); // Proceed with the stored navigation
      custmizeStore.pendingNavigation = {}; // Clear pending navigation after proceeding
    }
  } else if (isLinkActive("/addons")) {
    checkboxStore.routeLeaveModal = false;
    if (checkboxStore.pendingNavigation) {
      const { next, to } = checkboxStore.pendingNavigation;
      next(); // Proceed with the stored navigation
      checkboxStore.pendingNavigation = {}; // Clear pending navigation after proceeding
    }
  } else {
    return false;
  }
};

const detectUnsavedChanges = () => {
  return shouldShowFooter.value;
};

const loadf = ref(true);
</script>

<template>
  <DashboardToastSuccess
    v-if="toastAppear"
    :hideIn="2000"
    :message="toastMsg"
  />

  <Html
    class="dark:bg-p bg_dashboard"
    :lang="htmlAttrs.lang"
    :dir="htmlAttrs.dir"
    :class="[
      openModals ? '!overflow-hidden' : 'overflow-auto overflow-x-hidden',
    ]"
  >
    <div
      class="relative min-h-screen dark:!bg-p"
      :class="[!navStoreRef.sideBarOpen ? 'flex' : 'flex']"
    >
      <div class="vl-parent">
        <Loading
          v-model:active="$langloader"
          :can-cancel="false"
          :is-full-page="true"
          opacity="0.95"
        >
          <template v-slot:default>
            <div class="flex items-center justify-center flex-col space-y-2">
              <!-- Your custom loader icon or content -->
              <img
                src="/assets/imgs/logo.png"
                alt="Loading..."
                class="w-full h-24"
              />

              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-tamkin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </template>
        </Loading>
      </div>
      <div
        v-if="openModals"
        @click="closeSideBarOnMobileOverlay"
        class="absolute z-[9999] bg-black bg-opacity-70 h-full w-full overflow-hidden"
      ></div>
      <div
        v-if="marketStore.firstItemNotificationShown"
        class="absolute z-[9999] bg-black bg-opacity-30 h-full w-full overflow-hidden"
      ></div>

      <DashboardTeamEditUserModal
        @onSuccess="(e) => openToast(e)"
        :showModal="true"
        v-if="isOpen('editusermodal')"
      />
      <DashboardEmbedShareModal
        @onSuccess="(e) => openToast(e)"
        :showModal="true"
        v-if="isOpen('shareModal')"
      />
      <DashboardTeamInviteMember
        @onSuccess="(e) => openToast(e)"
        :showModal="true"
        v-if="isOpen('invitemember')"
      />
      <DashboardTeamEditname :showModal="true" v-if="isOpen('editname')" />

      <Notificationmodal />

      <ModalsConfirm
        :show-modal="true"
        v-if="isOpen('deleteApp')"
        title="Delete That App"
        sub-title="Are you sure you want to delete that app ?"
        confirm-btn-type="delete"
        @control-delete="emitEvent('deleteApp')"
        @control-cancel="closeModal('deleteApp')"
      />

      <ModalsConfirm
        :show-modal="true"
        v-if="isOpen('restoreApp')"
        title="Restore That App"
        :for-delete="false"
        sub-title="Are you sure you want to restore that app ?"
        confirm-btn-type="other"
        @control-other="emitEvent('restoreApp')"
        @control-cancel="closeModal('restoreApp')"
      />

      <DashboardTeamInviteMemberUpdate
        :showModal="true"
        v-if="isOpen('invitememberupdate')"
      />
      <DashboardTeamEditTeamPictureModal :showModal="isOpen('editteampic')" />
      <DashboardTeamEditUserPermissionsModal
        :showModal="true"
        v-if="isOpen('userpermissions')"
      />
      <DashboardMySiteSelectSiteModal v-if="isOpen('selectSite')" />
      <DashboardMySiteUpgradeModal v-if="isOpen('upgrade')" />
      <!--

    <DashboardMySiteSelectsitemodal :showModal="selectSiteModal" />
    <DashboardTeamEdituserpermissionsmodal :showModal="editPermissionsModal" /> -->

      <!-- <DashboardMySiteUpgradeModal :showModal="showUpgradeModal" />
        -->
      <ModalsConfirm
        :showModal="isOpen('resetModal')"
        title="Rest All Accessibility Settings"
        sub-title="Are you sure you want to reset all accessibility settings to their default values? This action cannot be undone and will overwrite any customized settings"
        confirm-btn-type="confirm"
        @control-confirm="closeModal('resetModal')"
        @control-cancel="closeModal('resetModal')"
      />

      <div
        class="lg:relative flex items-center justify-start flex-col bg-[#FFFEFE] dark:bg-tamkinDarkPrimary z-[100] border-l-0 border-t-0 border-b-0 rtl:border-l ltr:border-r border-[1px] border-lightGrey dark:border-darkborder w-full"
        :class="[
          sideBarOpenMobile
            ? 'fixed inset-0 z-[9999] w-full h-screen '
            : 'ipad-max:hidden  lg:flex',
          sideBarOpen ? 'max-w-[280px] ' : 'max-w-[75px]',
        ]"
      >
        <div
          class="h-full w-full relative"
          :class="[sideBarOpen ? 'mt-[8px]' : 'mt-[0]']"
        >
          <div
            @click="toggleSidebar"
            :class="[
              !sideBarOpen
                ? '  ltr:rotate-180  lg:!top-[133px] rtl:lg:right-[62px] ltr:lg:left-[62px]'
                : 'top-[154px] rtl:rotate-180 ltr:lg:left-[268px] rtl:lg:right-[268px]',
            ]"
            class="!overflow-visible cursor-pointer close_sidebar_btn fixed items-center justify-center bg-white dark:bg-tamkinDarkPrimary border-[1px] dark:shadow-sm dark:shadow-blur-2 dark:-shadow-y-[0.2px] dark:shadow-whiteTamkin border-linecolor dark:border-[#C5C5C5] rounded-full w-[24px] h-[24px] group z-[150] lg:flex hidden"
          >
            <svg
              width="9"
              height="15"
              viewBox="0 0 9 15"
              fill="none"
              class="fill-tamkin group-hover:stroke-white group-hover:fill-white w-[8px] h-[10px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"
              />
            </svg>
          </div>

          <DashboardNavbar
            :side-bar-open="sideBarOpen"
            :mobileSidebar="sideBarOpenMobile"
            @toggleSidebarMobile="toggleSidebarMobile"
            @toggleSidebar="toggleSidebar"
          />
        </div>
      </div>

      <div
        class="flex items-start lg:flex-row flex-col md:justify-between rtl:flex-row-reverse lg:justify-between relative w-full"
      >
        <!-- upper nav and content -->
        <div class="relative top-0 w-full">
          <nav
            style="box-shadow: 0px 4px 24px 8px #51459f14"
            class="sticky top-0 flex z-[60] items-center justify-between w-full bg-[#FFFEFE] dark:bg-tamkinDarkPrimary rtl:space-x-reverse rtl:flex-row-reverse h-[70px]"
          >
            <div
              class="flex items-center lg:space-x-0 space-x-[10px] rtl:space-x-reverse w-full"
            >
              <div
                class="flex items-center justify-between lg:hidden"
                @click="toggleSidebarMobile"
                style="transform: translateZ(0)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                  />
                </svg>
              </div>

              <div
                class="py-[17px] search_input w-full rtl:!mr-[40px] ltr:!ml-[40px]"
              >
                <input
                  type="text"
                  class="input_dashboard_search w-full"
                  v-model="search"
                  :placeholder="`${$t('Search')} ...`"
                />
                <div
                  class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
                >
                  <img src="/assets/imgs/icons/search.svg" />
                </div>
                <div
                  v-if="isSearchfilled"
                  @click="clearInput"
                  class="absolute top-[40%] rtl:left-0 cursor-pointer ltr:right-0 lg:top-[16px] lg:p-[16px]"
                >
                  <img src="/assets/imgs/icons/clear_search.svg" />
                </div>
              </div>

              <div
                class="flex items-center justify-end rtl:space-x-reverse lg:space-x-[20px] w-full"
              >
                <div
                  class="flex items-center justify-start rtl:space-x-reverse space-x-[20px]"
                >
                  <Langswitcher />

                  <Darkmode />
                  <NotificationBell />
                </div>
                <!-- {{ userName }} -->
                <Userprofilemenu />
              </div>
            </div>
          </nav>

          <div
            class="relative"
            :class="
              isLinkActive('/profile') ||
              isLinkActive('/packages/*') ||
              isLinkActive('/ar/packages/*') ||
              isLinkActive('/how-to-join')
                ? ''
                : 'pt-[20px] px-[20px] ipad-max:px-[20px] lg:px-[40px]'
            "
          >
            <div
              class="absolute left-0 right-0 w-full h-[200px] z-[-1] top-0"
              style="
                box-shadow: 0px 4px 24px 8px #51459f1a;
                background: linear-gradient(
                  180deg,
                  #fefefe 0%,
                  #eef5ff 47.07%,
                  #f6f3fc 72.04%,
                  #fef5f6 100%
                );
              "
              v-if="
                (isLinkActive('/addons') ||
                  isLinkActive('/statistics') ||
                  isLinkActive('/overview') ||
                  isLinkActive('/customize') ||
                  isLinkActive('/settings') ||
                  isLinkActive('/sign-language/*')) &&
                !error
              "
            ></div>

            <div class="relative px-[15px]">
              <NavbarOverview
                v-if="
                  (isLinkActive('/overview') ||
                    isLinkActive('/settings') ||
                    isLinkActive('/addons') ||
                    isLinkActive('/customize') ||
                    isLinkActive('/statistics')) &&
                  !error
                "
              />
            </div>

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
            <ModalsConfirm
              :showModal="
                custmizeStore.routeLeaveModal ||
                checkboxStore.routeLeaveModal ||
                settingsStore.routeLeaveModal
              "
              title="Save  your changes"
              sub-title="Do you want to save the changes before moving on?"
              confirm-btn-type="other"
              @control-other="handleSaveAndMove"
              @controlsaveAllSites="handleSaveToAllAndMove"
              cancelButtonName="Discard"
              :savetoAllSitesBtn="true"
              @control-cancel="DiscardAndMove"
            />
            <!-- <NuxtPage class="" /> -->

            <slot />
          </div>
        </div>
      </div>
      <!-- end of upper nav and content -->
    </div>
  </Html>
</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

.slide-up-enter-to,
.slide-up-leave-from {
  max-height: 100px;
  /* Adjust based on your content */
  opacity: 1;
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease-in-out;
}

.sidebar-enter,
.sidebar-leave-to

  /* .sidebar-leave-active in <2.1.8 */ {
  transform: translateX(-75px);
}

.sidebar {
  transform: translateX(100%);
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
