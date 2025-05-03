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
        :section-title="$t('Articles')"
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
            class="mt-[44px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] shadow-md -shadow-y-[1px] relative"
            :class="[
              collapseStore.collapses.includes('general_settings_card')
                ? 'pb-[24px]'
                : 'pb-[20px]',
            ]"
          >
            <div
              class="relative flex flex-col items-start justify-center mt-[18px]"
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
              <h1 class="text-xl font-bold mt-4 mb-4">
                Tamkin Article Management
              </h1>
              <div class="flex justify-between w-full items-center mb-4">
                <div class="flex items-center w-1/2">
                  <input
                    type="text"
                    :value="$t('Search ...')"
                    class="w-full h-[40px] bg-[#FAFCFE] outline-none dark:bg-tamkinDarkPrimary rounded-[8px] px-[10px] text-[14px] text-[#23262F] dark:text-whiteTamkin focus:outline-none border focus:outline-none focus:ring-0 focus:shadow-none focus:border-[#71DAD2] transition-colors duration-200"
                    placeholder="Enter welcome message"
                  />
                </div>
                <button
                  class="bg-white border text-teal-500 px-4 py-2 rounded-md flex items-center"
                >
                  <span class="mr-2"
                    ><svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3.6875"
                        y="3.67676"
                        width="16.6463"
                        height="16.6463"
                        rx="8.32317"
                        fill="url(#paint0_linear_14376_128438)"
                      />
                      <path
                        d="M6.85938 12.0001C6.85938 11.7948 6.94092 11.598 7.08606 11.4528C7.2312 11.3077 7.42806 11.2261 7.63332 11.2261H11.2379V7.62161C11.2379 7.41634 11.3194 7.21948 11.4645 7.07434C11.6097 6.9292 11.8065 6.84766 12.0118 6.84766C12.2171 6.84766 12.4139 6.9292 12.5591 7.07434C12.7042 7.21948 12.7858 7.41634 12.7858 7.62161V11.2261H16.3903C16.5956 11.2261 16.7924 11.3077 16.9376 11.4528C17.0827 11.598 17.1643 11.7948 17.1643 12.0001C17.1643 12.2054 17.0827 12.4022 16.9376 12.5474C16.7924 12.6925 16.5956 12.774 16.3903 12.774H12.7858V16.3786C12.7858 16.5838 12.7042 16.7807 12.5591 16.9259C12.4139 17.071 12.2171 17.1525 12.0118 17.1525C11.8065 17.1525 11.6097 17.071 11.4645 16.9259C11.3194 16.7807 11.2379 16.5838 11.2379 16.3786V12.774H7.63332C7.42806 12.774 7.2312 12.6925 7.08606 12.5474C6.94092 12.4022 6.85938 12.2054 6.85938 12.0001Z"
                        fill="#FFFEFE"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_14376_128438"
                          x1="12.0107"
                          y1="3.67676"
                          x2="12.0107"
                          y2="20.3231"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#2DADA3" />
                          <stop offset="1" stop-color="#71DAD2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  Add Article
                </button>
              </div>
              <p class="mb-4">Total Articles: 3</p>
              <div
                class="mt-[20px] w-full bg-white rounded-[10px] px-[15px] border relative pb-[20px]"
              >
                <div class="flex items-center justify-between">
                  <div class="pt-[24px]">
                    <h1 class="text-[18px] font-[500] leading-[30px]">
                      Enhancing Accessibility with Tamkin...
                    </h1>
                    <h2
                      class="font-[400] text-[12px] leading-[24px] text-darkGrey dark:text-whiteTamkin/90"
                    >
                      Inclusive Technology
                    </h2>
                    <h2
                      class="text-[14px] font-[400] leading-[28.5px] text-darkGrey"
                    >
                      Learn about the Tamkin platform and its accessibility
                      features.
                    </h2>
                  </div>
                  <div
                    style="flex-direction: column"
                    class="text-right flex text-[12px] mt-[5px]"
                  >
                    <span> Date: 2025-02-17</span>
                    <span>Page: Home</span>
                  </div>
                </div>
                <div class="flex justify-start flex-1 w-[50%] mt-[10px]">
                  <button
                    class="px-[12px] py-[6px] bg-white border border-gray-300 rounded-md mr-[10px] text-gray-700 text-sm font-medium hover:shadow-sm transition-shadow"
                  >
                    Edit
                  </button>
                  <button
                    class="px-[12px] py-[6px] bg-white border border-gray-300 rounded-md mr-[10px] text-gray-700 text-sm font-medium hover:shadow-sm transition-shadow"
                  >
                    Rename
                  </button>
                  <button
                    class="px-[12px] py-[6px] bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:shadow-sm transition-shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div
                class="mt-[20px] w-full bg-white rounded-[10px] px-[15px] border relative pb-[20px]"
              >
                <div class="flex items-center justify-between">
                  <div class="pt-[24px]">
                    <h1 class="text-[18px] font-[500] leading-[30px]">
                      How Tamkin Supports Education
                    </h1>
                    <h2
                      class="font-[400] text-[12px] leading-[24px] text-darkGrey dark:text-whiteTamkin/90"
                    >
                      Inclusive Technology
                    </h2>
                    <h2
                      class="text-[14px] font-[400] leading-[28.5px] text-darkGrey"
                    >
                      Explore the role of Tamkin in inclusive learning.
                    </h2>
                  </div>
                  <div
                    style="flex-direction: column"
                    class="text-right flex text-[12px] mt-[5px]"
                  >
                    <span> Date: 2025-02-17</span>
                    <span>Page: Home</span>
                  </div>
                </div>
                <div class="flex justify-start flex-1 w-[50%] mt-[10px]">
                  <button
                    class="px-[12px] py-[6px] bg-white border border-gray-300 rounded-md mr-[10px] text-gray-700 text-sm font-medium hover:shadow-sm transition-shadow"
                  >
                    Edit
                  </button>
                  <button
                    class="px-[12px] py-[6px] bg-white border border-gray-300 rounded-md mr-[10px] text-gray-700 text-sm font-medium hover:shadow-sm transition-shadow"
                  >
                    Rename
                  </button>
                  <button
                    class="px-[12px] py-[6px] bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:shadow-sm transition-shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div
                class="mt-[20px] w-full bg-white rounded-[10px] px-[15px] border relative pb-[20px]"
              >
                <div class="flex items-center justify-between">
                  <div class="pt-[24px]">
                    <h1 class="text-[18px] font-[500] leading-[30px]">
                      How Tamkin Supports Education
                    </h1>
                    <h2
                      class="font-[400] text-[12px] leading-[24px] text-darkGrey dark:text-whiteTamkin/90"
                    >
                      Inclusive Technology
                    </h2>
                    <h2
                      class="text-[14px] font-[400] leading-[28.5px] text-darkGrey"
                    >
                      Explore the role of Tamkin in inclusive learning.
                    </h2>
                  </div>
                  <div
                    style="flex-direction: column"
                    class="text-right flex text-[12px] mt-[5px]"
                  >
                    <span> Date: 2025-02-17</span>
                    <span>Page: Home</span>
                  </div>
                </div>
                <div class="flex justify-start flex-1 w-[50%] mt-[10px]">
                  <button
                    class="px-[12px] py-[6px] bg-white border border-gray-300 rounded-md mr-[10px] text-gray-700 text-sm font-medium hover:shadow-sm transition-shadow"
                  >
                    Edit
                  </button>
                  <button
                    class="px-[12px] py-[6px] bg-white border border-gray-300 rounded-md mr-[10px] text-gray-700 text-sm font-medium hover:shadow-sm transition-shadow"
                  >
                    Rename
                  </button>
                  <button
                    class="px-[12px] py-[6px] bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:shadow-sm transition-shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
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
