<script lang="ts" setup>
import { useGetPlayerData } from "@/composables/useAccessibility";
import { useApi } from "@/composables/useApi";
const { locale } = useI18n();
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const { $toast } = useNuxtApp();

const { useApiInstance } = useApi();
const { api, loading } = useApiInstance();
const { getPlayerData } = useGetPlayerData();

const signLangStore = useSignLangStore();
const settingsStore = useSettingsStore();
const customizeStore = useCustomizeStore();

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
  requiredPermission: "sign-language-addons",
});
const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};

let pendingNavigation = null;

const detectUnsavedChanges = () => {
  return shouldShowFooter.value;
};

const handleSaveAndMove = () => {
  signLangStore.saveAndMove();
  handleSave("default");
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};
const handleSaveToAllAndMove = () => {
  signLangStore.saveAndMove();
  handleSave("all");
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const DiscardAndMove = () => {
  cancelAc();
  signLangStore.routeLeaveModal = false;
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

onBeforeRouteLeave((to, from, next) => {
  if (detectUnsavedChanges()) {
    signLangStore.showSaveBeforeLeaveModal();
    pendingNavigation = { next, to };
  } else {
    next(); // No unsaved changes, proceed normally
  }
});

const shouldShowFooter = computed(() => {
  const isAddonsLinkActive =
    isLinkActive("/sign-language/addons") && signLangStore.hasChanges();

  return isAddonsLinkActive;
});

const cancelAc = () => {
  const isAddonsLinkActive =
    isLinkActive("/sign-language/addons") && signLangStore.hasChanges();

  if (isAddonsLinkActive) {
    signLangStore.checkboxes = JSON.parse(
      JSON.stringify(signLangStore.initialCheckboxes)
    );
  }
};
const loadingplayerdata = ref(true)


onBeforeMount(async () => {
   getPlayerData();

  [
    "deaf-customize-sign-language-background-sign-language-background",
    "deaf-customize-sign-language-player-contrast-sign-language-contrast",
    "deaf-customize-sign-language-player-keyboard-sign-language-keyboard",
    "deaf-customize-sign-language-mode-move-/-hide-sign-language-player",
  ].forEach((name) => {
    signLangStore.addCheckbox(name);
  });
  signLangStore.initializeCheckboxes([
    "deaf-customize-sign-language-background-sign-language-background",
    "deaf-customize-sign-language-player-contrast-sign-language-contrast",
    "deaf-customize-sign-language-player-keyboard-sign-language-keyboard",
    "deaf-customize-sign-language-mode-move-/-hide-sign-language-player",
  ]);

  loadingplayerdata.value = false
});

const loadingSave = ref(false);
const loadingSavetoAll = ref(false);
const handleSave = async (type: any) => {
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

  if (isLinkActive("/sign-language/addons")) {
    const addonsOptions = [
      {
        name: "deaf-customize-sign-language-background-sign-language-background",
        value: getSettingsValue(
          "deaf-customize-sign-language-background-sign-language-background"
        ),
      },
      {
        name: "deaf-customize-sign-language-player-contrast-sign-language-contrast",
        value: getSettingsValue(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        ),
      },
      {
        name: "deaf-customize-sign-language-player-keyboard-sign-language-keyboard",
        value: getSettingsValue(
          "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
        ),
      },
      {
        name: "deaf-customize-sign-language-mode-move-/-hide-sign-language-player",
        value: getSettingsValue(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        ),
      },
    ];

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

const updateNewValues = () => {
  const isSettingsLinkActive = isLinkActive("/sign-language/addons");

  if (isSettingsLinkActive) {
    signLangStore.initialCheckboxes = JSON.parse(
      JSON.stringify(signLangStore.checkboxes)
    );
  }
};

const getSettingsValue = (name: any) => {
  const val = signLangStore.checkboxes.find((el: any) => {
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
    <LanguageServicesNavbar />
    <transition name="slide-up">
      <DashboardAddonsSaveFooter
      v-if="!customizeStore.loadingData"
        :show-footer="shouldShowFooter"
        :loadingSave="loadingSave"
        :loadingSavetoAll="loadingSavetoAll"
        @Save="handleSave('default')"
        @saveToAllSites="handleSave('all')"
        @cancel_action="cancelAc"
      />
    </transition>

    <ModalsConfirm
      :showModal="signLangStore.routeLeaveModal"
      title="Save  your changes"
      sub-title="Do you want to save the changes before moving on?"
      confirm-btn-type="other"
      @control-other="handleSaveAndMove"
      @controlsaveAllSites="handleSaveToAllAndMove"
      cancelButtonName="Discard"
      :savetoAllSitesBtn="true"
      @control-cancel="DiscardAndMove"
    />
    <div class="w-full h-full relative">
      <HeaderAccess
        :section-title="$t('Addons')"
        :section-sub-title="
          $t(
            'Enable the Accessibility Services Addons to improve usability and enhance your experience.'
          )
        "
      />

      <div
        v-if="customizeStore.loadingData"
      >
        <div
          class="animate-pulse space-y-4 mt-[40px] card bg-white rounded-[10px] p-4 dark:bg-tamkinDarkPrimary"
        >
          <div
            class="h-[55px] w-full rounded-md bg-gray-200 dark:bg-p"
            v-for="s in 6"
            :key="s"
          ></div>
        </div>
      </div>

      <div v-else-if="!loadingplayerdata">
        <LanguageServicesNodata v-if="!settingsStore.defaultappobj" />
        <div v-else-if="!customizeStore.loadingData">
          <LanguageServicesAddons v-if="signLangStore.addonsPlugin" />
        </div>
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
