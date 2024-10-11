<script lang="ts" setup>
import { useGetPlayerData } from "@/composables/useAccessibility";
import { useApi } from "@/composables/useApi";
const { useApiInstance } = useApi();
const { api, loading } = useApiInstance();
const { getPlayerData } = useGetPlayerData();

const signLangStore = useSignLangStore();

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
});
const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};

let pendingNavigation = null;

const detectUnsavedChanges = () => {
  return (
    (isLinkActive("/sign-language/addons") && signLangStore.hasChanges()) ||
    (isLinkActive("/sign-language/addons") &&
      signLangStore.force_change_menuCards) ||
    (isLinkActive("/sign-language/addons") &&
      signLangStore.force_change_profileCards)
  );
};

const handleSaveAndMove = () => {
  signLangStore.saveAndMove();
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const handleCancelLeave = () => {
  signLangStore.routeLeaveModal = false; // Close the modal
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
});

const loadingSave = ref(false);
const handleSave = async (type: any) => {
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
    updateNewValues();
  } catch (error) {
    loadingSave.value = false;
    console.error(error); // Better error handling
    throw typeof error === "string" ? error : "There is something wrong";
  }
};

const updateNewValues = () => {
  const isSettingsLinkActive = isLinkActive("/sign-language/settings");

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
    <LanguageServicesNavbar />
    <transition name="slide-up">
      <DashboardAddonsSaveFooter
        :show-footer="shouldShowFooter"
        @cancel_action="cancelAc"
        :loadingSave="loadingSave"
        @Save="handleSave('default')"
        @saveToAllSites="handleSave('all')"
      />
    </transition>
    <ModalsConfirm
      :showModal="signLangStore.routeLeaveModal"
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
        section-title="Customize"
        section-sub-title="Customization empowers users to shape their digital environment"
      />

      <LanguageServicesAddons />
      <LanguageServicesNodata />
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
