<script lang="ts" setup>
import VCodeBlock from "@wdns/vue-code-block";
import { useCollapseStore } from "@/stores/collapse.js";
import { vOnClickOutside } from "@vueuse/components";
import { useSettingsStore } from "@/stores/settings";
import { useModalManager } from "@/composables/useModalManager";
import { useGetPlayerData } from "@/composables/useAccessibility";
import { useApi } from "@/composables/useApi";
const { locale } = useI18n();

const { useApiInstance } = useApi();
const { api, loading } = useApiInstance();
const { getPlayerData } = useGetPlayerData();
const { $toast } = useNuxtApp();

const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const settingsStore = useSettingsStore();
const { isChecked, toggleCheckbox } = settingsStore;
const collapseStore = useCollapseStore();
const customizeStore = useCustomizeStore();
const navStore = useNavbarStore();
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
  requiredPermission: "sign-language-settings",
});
const code = ref(true);
const advancedCode = ref(false);
const currentCode = ref(``);
const copyDone = ref(false);
const showAdancedCode = () => {
  if (!advancedCode.value) {
    code.value = false;
    advancedCode.value = true;

    currentCode.value = `const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      const foo = 'bar';
      `;
  } else {
    code.value = true;
    advancedCode.value = false;

    currentCode.value = `const foo = 'bar';`;
  }
};

onBeforeMount(() => {
  currentCode.value = `const foo = 'bar';`;
  code.value = true;
});
const copyCode = () => {
  copyDone.value = true;
};

watch(copyDone, (newValue) => {
  if (newValue) {
    // Reset copyDone after the hideIn duration
    setTimeout(() => {
      copyDone.value = false;
    }, 2000);
  }
});
const loadingplayerdata = ref(true);
onBeforeMount(() => {
  [
    "deaf-setting-general-settings-player-enabled-on-this-site",
    "deaf-setting-general-settings-player-enabled-on-this-mobile",
    "deaf-setting-general-settings-player-sound-effects",
  ].forEach((name) => {
    settingsStore.addCheckbox(name);
  });
  settingsStore.initializeCheckboxes([
    "deaf-setting-general-settings-player-enabled-on-this-site",
    "deaf-setting-general-settings-player-enabled-on-this-mobile",
    "deaf-setting-general-settings-player-sound-effects",
  ]);

  // if (customizeStore.managePlayerPackages.length <= 0) {
  getPlayerData();
  // }
  loadingplayerdata.value = false;
});
const deleteSite = async () => {
  try {
    const res = await api.post("/mySite/set/AppStatusCancel", {
      name: settingsStore.defaultapp.name,
    });
    $toast(t("Deleted Successfully"), {
      hideIn: 3000,
      type: "success",
    });
    closeModal("deleteModal");
    const router = useRouter(); // Import the router instance
    router.push({
      path: `/${locale.value}/my-site`,
    });
  } catch (error) {
    console.error(error); // Better error handling
    throw typeof error === "string" ? error : "There is something wrong";
  }
};

const { t } = useI18n();

const resetAccessiility = async () => {
  try {
    await api.post("/Apps/ResetSettingDefaultApp", {
      type: "Sign language", //Accessibility|Sign language
    });
    await getPlayerData();
    localStorage.removeItem("playerColorPanal");
    closeModal("resetModal");
    $toast(t("All Player settings have been reset"), {
      hideIn: 3000,
      type: "success",
    });
  } catch (error) {
    console.error(error); // Better error handling
    throw typeof error === "string" ? error : "There is something wrong";
  }
};

let pendingNavigation = null;
const detectUnsavedChanges = () => {
  return shouldShowFooter.value;
};

const handleSaveAndMove = () => {
  settingsStore.saveAndMove();
  handleSave("default");
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};
const handleSaveToAllAndMove = () => {
  settingsStore.saveAndMove();
  handleSave("all");
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const DiscardAndMove = () => {
  cancelAc();
  settingsStore.routeLeaveModal = false;
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

onBeforeRouteLeave((to, from, next) => {
  if (detectUnsavedChanges()) {
    settingsStore.showSaveBeforeLeaveModal();
    pendingNavigation = { next, to };
  } else {
    next(); // No unsaved changes, proceed normally
  }
});
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

const shouldShowFooter = computed(() => {
  const isSettingsLinkActive =
    isLinkActive("/sign-language/settings") && settingsStore.hasChanges();

  return isSettingsLinkActive;
});

const cancelAc = () => {
  const isSettingsLinkActive =
    isLinkActive("/sign-language/settings") && settingsStore.hasChanges();

  if (isSettingsLinkActive) {
    settingsStore.checkboxes = JSON.parse(
      JSON.stringify(settingsStore.initialCheckboxes)
    );
  }
};

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

  if (isLinkActive("/sign-language/settings")) {
    const settigsOptions = [
      {
        name: "deaf-setting-general-settings-player-sound-effects",
        value: getSettingsValue(
          "deaf-setting-general-settings-player-sound-effects"
        ),
      },
      {
        name: "deaf-setting-general-settings-player-enabled-on-this-mobile",
        value: getSettingsValue(
          "deaf-setting-general-settings-player-enabled-on-this-mobile"
        ),
      },
      {
        name: "deaf-setting-general-settings-player-enabled-on-this-site",
        value: getSettingsValue(
          "deaf-setting-general-settings-player-enabled-on-this-site"
        ),
      },
    ];

    payload.Options = settigsOptions;
  }

  try {
    const res = await api.post("/Custom/SetOptions", payload);
    loadingSave.value = false;
    loadingSavetoAll.value = false;
    $toast("Successfully Updated !", { hideIn: 3000, type: "success" });
    updateNewValues();
  } catch (error) {
    loadingSave.value = false;
    loadingSavetoAll.value = false;
    console.error(error); // Better error handling
    throw typeof error === "string" ? error : "There is something wrong";
  }
};

const updateNewValues = () => {
  const isSettingsLinkActive = isLinkActive("/sign-language/settings");

  if (isSettingsLinkActive) {
    settingsStore.initialCheckboxes = JSON.parse(
      JSON.stringify(settingsStore.checkboxes)
    );
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
    <ModalsConfirm
      :showModal="isOpen('resetModal')"
      :title="'Reset All Sign language Settings'"
      :sub-title="'Are you sure you want to reset all accessibility settings to their default values? This action cannot be undone and will overwrite any customized settings'"
      confirm-btn-type="confirm"
      @control-confirm="resetAccessiility"
      @control-cancel="closeModal('resetModal')"
    />
    <ModalsConfirm
      :show-modal="isOpen('deleteModal')"
      :title="'Delete your site'"
      :sub-title="'Are you sure you want to delete your site? This action is irreversible and will permanently remove all your data and settings. You will also lose access to many features'"
      confirm-btn-type="delete"
      @control-delete="deleteSite"
      @control-cancel="closeModal('deleteModal')"
    />
    <SettingsTransferModalStep1 :show-modal="isOpen('transferstep1')" />
    <SettingsTransferModalStep2
      :type="'Sign language'"
      :show-modal="isOpen('transferstep2')"
    />

    <Chat-botNavbar />
    <transition name="slide-up">
      <DashboardAddonsSaveFooter
        :show-footer="shouldShowFooter"
        @cancel_action="cancelAc"
        :loadingSave="loadingSave"
        :loadingSavetoAll="loadingSavetoAll"
        @Save="handleSave('default')"
        @saveToAllSites="handleSave('all')"
      />
    </transition>
    <ModalsConfirm
      :showModal="settingsStore.routeLeaveModal"
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
        :section-title="$t('Chatbot')"
        :section-sub-title="
          $t('Customization empowers users to shape their digital environment')
        "
      />

      <div
        v-if="customizeStore.loadingData || settingsStore.loadingdefaultappobj"
      >
        <div
          class="animate-pulse space-y-4 card bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-4"
          :class="!settingsStore.defaultappobj ? 'mt-[42px]' : 'mt-[42px]'"
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
          <div
            v-if="settingsStore.settingsItems.active == 1"
            class="mt-[44px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] shadow-md -shadow-y-[1px] relative pb-[20px]"
          >
            <!-- Header with Title and Add Child Button -->
            <div class="flex items-center justify-between pt-[24px]">
              <div class="flex items-center">
                <!-- Folder Icon -->
                <svg
                  width="17"
                  height="14"
                  viewBox="0 0 17 14"
                  fill="none"
                  class="mr-[8px]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 4.58154V2.01011C2 1.63123 2.14267 1.26787 2.39663 0.999962C2.65058 0.732053 2.99502 0.581543 3.35417 0.581543H5.92336C6.19074 0.58155 6.45213 0.665059 6.67458 0.821543L7.61708 1.4844C7.83954 1.64088 8.10093 1.72439 8.36831 1.7244H13.6458C14.005 1.7244 14.3494 1.87491 14.6034 2.14282C14.8573 2.41073 15 2.77409 15 3.15297V4.58154"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.9966 5.73321L15.4535 11.2482C15.4535 11.6014 15.3127 11.9402 15.0621 12.1902C14.8114 12.4402 14.4714 12.5809 14.1166 12.5815H2.88341C2.52862 12.5809 2.18858 12.4402 1.93792 12.1902C1.68726 11.9402 1.54648 11.6014 1.54648 11.2482L1.00341 5.73321C0.991621 5.58643 1.01049 5.43882 1.05882 5.29966C1.10715 5.16049 1.18389 5.0328 1.28422 4.92462C1.38456 4.81643 1.5063 4.7301 1.64179 4.67106C1.77728 4.61201 1.92358 4.58153 2.07148 4.58154H14.9319C15.0795 4.58199 15.2254 4.61281 15.3605 4.67206C15.4956 4.7313 15.6169 4.8177 15.7169 4.92584C15.8169 5.03397 15.8933 5.16151 15.9415 5.30044C15.9896 5.43938 16.0084 5.58671 15.9966 5.73321Z"
                    stroke="black"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <h1
                  class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
                >
                  {{ $t("Tamkin Question Bot") }}
                </h1>
                <button
                  class="bg-white border border-gray-300 ml-[35px] dark:bg-gray-700 text-[12px] px-[10px] py-[6px] rounded-[10px] text-darkGrey dark:text-whiteTamkin shadow-sm"
                >
                  Add Child
                </button>
              </div>
            </div>

            <!-- Nested Project Items -->
            <div
              class="relative flex flex-col items-start justify-center mt-[18px] divide-y"
              v-if="!collapseStore.collapses.includes('general_settings_card')"
            >
              <!-- Project Item 1 (Selected) -->
              <div
                class="flex items-center justify-between w-full py-[10px] px-[10px] rounded-[5px] group hover:bg-[#F6F6F6]"
              >
                <div class="flex items-center">
                  <!-- Folder Icon -->
                  <svg
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    class="mr-[8px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4.58154V2.01011C2 1.63123 2.14267 1.26787 2.39663 0.999962C2.65058 0.732053 2.99502 0.581543 3.35417 0.581543H5.92336C6.19074 0.58155 6.45213 0.665059 6.67458 0.821543L7.61708 1.4844C7.83954 1.64088 8.10093 1.72439 8.36831 1.7244H13.6458C14.005 1.7244 14.3494 1.87491 14.6034 2.14282C14.8573 2.41073 15 2.77409 15 3.15297V4.58154"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.9966 5.73321L15.4535 11.2482C15.4535 11.6014 15.3127 11.9402 15.0621 12.1902C14.8114 12.4402 14.4714 12.5809 14.1166 12.5815H2.88341C2.52862 12.5809 2.18858 12.4402 1.93792 12.1902C1.68726 11.9402 1.54648 11.6014 1.54648 11.2482L1.00341 5.73321C0.991621 5.58643 1.01049 5.43882 1.05882 5.29966C1.10715 5.16049 1.18389 5.0328 1.28422 4.92462C1.38456 4.81643 1.5063 4.7301 1.64179 4.67106C1.77728 4.61201 1.92358 4.58153 2.07148 4.58154H14.9319C15.0795 4.58199 15.2254 4.61281 15.3605 4.67206C15.4956 4.7313 15.6169 4.8177 15.7169 4.92584C15.8169 5.03397 15.8933 5.16151 15.9415 5.30044C15.9896 5.43938 16.0084 5.58671 15.9966 5.73321Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span class="text-[14px] text-darkGrey dark:text-whiteTamkin">
                    Project (21)
                  </span>
                </div>
                <div
                  class="buttons-group flex space-x-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    class="bg-white dark:bg-gray-700 text-[12px] px-[8px] py-[4px] rounded-[5px] text-darkGrey dark:text-whiteTamkin"
                  >
                    Add Child
                  </button>
                  <button
                    class="bg-white dark:bg-gray-700 text-[12px] px-[8px] py-[4px] rounded-[5px] text-darkGrey dark:text-whiteTamkin"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-white dark:bg-gray-700 text-[12px] px-[8px] py-[4px] rounded-[5px] text-darkGrey dark:text-whiteTamkin"
                  >
                    Rename
                  </button>
                  <button
                    class="bg-white dark:bg-gray-700 text-[12px] px-[8px] py-[4px] rounded-[5px] text-darkGrey dark:text-whiteTamkin"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <!-- Project Item 2 -->
              <div
                class="flex items-center justify-between w-full py-[10px] px-[10px] group hover:bg-[#F6F6F6] rounded-[5px]"
              >
                <div class="flex items-center">
                  <svg
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    class="mr-[8px]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 4.58154V2.01011C2 1.63123 2.14267 1.26787 2.39663 0.999962C2.65058 0.732053 2.99502 0.581543 3.35417 0.581543H5.92336C6.19074 0.58155 6.45213 0.665059 6.67458 0.821543L7.61708 1.4844C7.83954 1.64088 8.10093 1.72439 8.36831 1.7244H13.6458C14.005 1.7244 14.3494 1.87491 14.6034 2.14282C14.8573 2.41073 15 2.77409 15 3.15297V4.58154"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.9966 5.73321L15.4535 11.2482C15.4535 11.6014 15.3127 11.9402 15.0621 12.1902C14.8114 12.4402 14.4714 12.5809 14.1166 12.5815H2.88341C2.52862 12.5809 2.18858 12.4402 1.93792 12.1902C1.68726 11.9402 1.54648 11.6014 1.54648 11.2482L1.00341 5.73321C0.991621 5.58643 1.01049 5.43882 1.05882 5.29966C1.10715 5.16049 1.18389 5.0328 1.28422 4.92462C1.38456 4.81643 1.5063 4.7301 1.64179 4.67106C1.77728 4.61201 1.92358 4.58153 2.07148 4.58154H14.9319C15.0795 4.58199 15.2254 4.61281 15.3605 4.67206C15.4956 4.7313 15.6169 4.8177 15.7169 4.92584C15.8169 5.03397 15.8933 5.16151 15.9415 5.30044C15.9896 5.43938 16.0084 5.58671 15.9966 5.73321Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span class="text-[14px] text-darkGrey dark:text-whiteTamkin">
                    Project (21)
                  </span>
                </div>
                <div
                  class="buttons-group flex space-x-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    class="bg-white dark:bg-gray-700 text-[12px] px-[8px] py-[4px] rounded-[5px] text-darkGrey dark:text-whiteTamkin"
                  >
                    Add Child
                  </button>
                  <button
                    class="bg-white dark:bg-gray-700 text-[12px] px-[8px] py-[4px] rounded-[5px] text-darkGrey dark:text-whiteTamkin"
                  >
                    Edit
                  </button>
                  <button
                    class="bg-white dark:bg-gray-700 text-[12px] px-[8px] py-[4px] rounded-[5px] text-darkGrey dark:text-whiteTamkin"
                  >
                    Rename
                  </button>
                  <button
                    class="bg-white dark:bg-gray-700 text-[12px] px-[8px] py-[4px] rounded-[5px] text-darkGrey dark:text-whiteTamkin"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <!-- Locked Feature Section (if applicable) -->
            <div
              class="relative flex flex-col items-start justify-center mt-[18px] divide-y"
              v-if="!collapseStore.collapses.includes('general_settings_card')"
              :class="
                navStore.defaultappobj?.package?.filter(
                  (p) => p.type === 'Sign language'
                ).length == 0
                  ? 'pb-[160px]'
                  : ''
              "
            >
              <MessagesLockedFeature
                v-if="
                  navStore.defaultappobj?.package?.filter(
                    (p) => p.type === 'Sign language'
                  ).length == 0
                "
              />
            </div>
          </div>

          <OverviewWidgetembdedcode />
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
