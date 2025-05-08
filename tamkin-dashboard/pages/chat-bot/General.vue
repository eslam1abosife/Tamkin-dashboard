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
        :section-title="$t('General')"
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
            <!-- Bot Name Section -->
            <div class="flex items-center justify-start">
              <div class="pt-[24px] w-full">
                <h1
                  class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
                >
                  {{ $t("Bot name") }}
                </h1>
                <div class="mt-[18px] w-full">
                  <input
                    type="text"
                    :value="$t('Bot name')"
                    class="w-full h-[40px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary rounded-[8px] px-[10px] text-[14px] text-[#23262F] dark:text-whiteTamkin border border-gray-300 focus:outline-none focus:ring-0 focus:shadow-none focus:border-[#71DAD2] transition-colors duration-200"
                    placeholder="Enter bot name"
                  />
                </div>
              </div>

              <!-- Menu Button (unchanged) -->
              <div
                @click.stop="collapseStore.collapseMenu('general_settings')"
                v-on-click-outside="
                  () => collapseStore.removeMenu('general_settings')
                "
                :class="[
                  collapseStore.menus.includes('general_settings')
                    ? 'active_notification !text-darkGrey'
                    : '',
                ]"
                class="menu_button_control"
              >
                <svg
                  width="18"
                  height="5"
                  viewBox="0 0 18 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    collapseStore.menus.includes('general_settings')
                      ? 'stroke-current !text-white !fill-white'
                      : 'dark:text-white',
                  ]"
                >
                  <path
                    d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                    fill="currentColor"
                  />
                </svg>

                <div
                  v-if="collapseStore.menus.includes('general_settings')"
                  class="mini_SizeMenu"
                >
                  <div
                    class="mini_wrap"
                    @click="collapseStore.collapseCard('general_settings_card')"
                  >
                    <div>
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7754 10.937L18.4995 7"
                          class="dark:!stroke-white stroke-darkGrey"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.7207 7H18.5V10.1496"
                          class="dark:!stroke-white stroke-darkGrey"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.2241 13.063L6.5 17"
                          class="dark:!stroke-white stroke-darkGrey"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.2793 17.0002H6.5V13.8506"
                          class="dark:!stroke-white stroke-darkGrey"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div class="text_mini">
                      {{
                        !collapseStore.collapses.includes(
                          "general_settings_card"
                        )
                          ? $t("Minisize")
                          : $t("Maxsize")
                      }}
                    </div>
                  </div>

                  <div class="arrow">
                    <svg
                      width="16"
                      class=""
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <filter
                          id="shadow-sm"
                          x="0"
                          y="-20%"
                          width="140%"
                          height="140%"
                        >
                          <feDropShadow
                            dx="1"
                            dy="1"
                            stdDeviation="1"
                            flood-color="rgba(0, 0, 0, 0.3)"
                          />
                        </filter>
                      </defs>
                      <path
                        d="M15.2266 7.80851C15.2266 10.0216 0.841317 15.4755 0.841317 15.4755V0.142578C0.841317 0.142578 15.2266 5.5954 15.2266 7.80851Z"
                        class="fill-white dark:!fill-tamkinDarkPrimary"
                        filter="url(#shadow-sm)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Welcome Screen Section -->
            <div
              v-if="!collapseStore.collapses.includes('general_settings_card')"
              class="mt-[18px]"
            >
              <h3
                class="text-[14px] font-[500] leading-[30px] dark:text-whiteTamkin"
              >
                {{ $t("Welcome screen") }}
              </h3>
              <div class="mt-[8px] w-full">
                <input
                  type="text"
                  :value="$t('How can we help you today? 😊')"
                  class="w-full h-[40px] bg-[#FAFCFE] outline-none dark:bg-tamkinDarkPrimary rounded-[8px] px-[10px] text-[14px] text-[#23262F] dark:text-whiteTamkin focus:outline-none border border-[#00C4B4] focus:outline-none focus:ring-0 focus:shadow-none focus:border-[#71DAD2] transition-colors duration-200"
                  placeholder="Enter welcome message"
                />
              </div>
            </div>

            <!-- Logo Section -->
            <div
              v-if="!collapseStore.collapses.includes('general_settings_card')"
              class="mt-[18px]"
            >
              <h3
                class="text-[14px] font-[500] leading-[30px] dark:text-whiteTamkin"
              >
                {{ $t("Logo") }}
              </h3>
              <div
                class="mt-[8px] w-full h-[150px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary rounded-[8px] border border-dashed flex items-center justify-center flex-col"
              >
                <button
                  class="flex items-center justify-center w-[100px] h-[40px] bg-gray-100 rounded-[8px] text-[14px] text-gray-600"
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-[5px]"
                  >
                    <rect width="26" height="26" rx="13" fill="#838383" />
                    <path
                      d="M12.2105 16.1513V9.73011L10.162 11.7786L9.05895 10.6362L12.9983 6.69678L16.9377 10.6362L15.8347 11.7786L13.7862 9.73011V16.1513H12.2105ZM8.27107 19.3028C7.83774 19.3028 7.46691 19.1487 7.15859 18.8404C6.85026 18.532 6.69584 18.1609 6.69531 17.7271V15.3634H8.27107V17.7271H17.7256V15.3634H19.3014V17.7271C19.3014 18.1604 19.1472 18.5315 18.8389 18.8404C18.5306 19.1492 18.1595 19.3034 17.7256 19.3028H8.27107Z"
                      fill="white"
                    />
                  </svg>
                  Upload
                </button>
                <p class="mt-[8px] text-[12px] text-gray-500">
                  Max: 1500x1500 px, jpg, png, gif
                </p>
              </div>
            </div>

            <!-- Existing Settings Section (unchanged) -->
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
          <div
            v-if="settingsStore.settingsItems.active == 1"
            class="mt-[44px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] shadow-md -shadow-y-[1px] relative"
            :class="[
              collapseStore.collapses.includes('general_settings_card')
                ? 'pb-[24px]'
                : 'pb-[20px]',
            ]"
          >
            <div class="flex items-center justify-start">
              <div class="pt-[24px]">
                <h1
                  class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
                >
                  {{ $t("Additional options") }}
                </h1>
                <h2
                  class="text-[12px] lg:text-[14px] font-[400] leading-[28.5px] text-darkGrey dark:text-whiteTamkin"
                >
                  <span
                    v-if="
                      !collapseStore.collapses.includes('general_settings_card')
                    "
                  >
                    {{
                      $t(
                        "Manage Your Sign Language Settings for a Customized and Accessible Communication Experience"
                      )
                    }}
                  </span>
                </h2>
              </div>

              <div
                @click.stop="collapseStore.collapseMenu('general_settings')"
                v-on-click-outside="
                  () => collapseStore.removeMenu('general_settings')
                "
                :class="[
                  collapseStore.menus.includes('general_settings')
                    ? 'active_notification !text-darkGrey'
                    : '',
                ]"
                class="menu_button_control"
              >
                <svg
                  width="18"
                  height="5"
                  viewBox="0 0 18 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="[
                    collapseStore.menus.includes('general_settings')
                      ? 'stroke-current !text-white !fill-white'
                      : 'dark:text-white',
                  ]"
                >
                  <path
                    d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                    fill="currentColor"
                  />
                </svg>

                <div
                  v-if="collapseStore.menus.includes('general_settings')"
                  class="mini_SizeMenu"
                >
                  <div
                    class="mini_wrap"
                    @click="collapseStore.collapseCard('general_settings_card')"
                  >
                    <div>
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7754 10.937L18.4995 7"
                          class="dark:!stroke-white stroke-darkGrey"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.7207 7H18.5V10.1496"
                          class="dark:!stroke-white stroke-darkGrey"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.2241 13.063L6.5 17"
                          class="dark:!stroke-white stroke-darkGrey"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M10.2793 17.0002H6.5V13.8506"
                          class="dark:!stroke-white stroke-darkGrey"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div class="text_mini">
                      {{
                        !collapseStore.collapses.includes(
                          "general_settings_card"
                        )
                          ? $t("Minisize")
                          : $t("Maxsize")
                      }}
                    </div>
                  </div>

                  <div class="arrow">
                    <svg
                      width="16"
                      class=""
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <filter
                          id="shadow-sm"
                          x="0"
                          y="-20%"
                          width="140%"
                          height="140%"
                        >
                          <feDropShadow
                            dx="1"
                            dy="1"
                            stdDeviation="1"
                            flood-color="rgba(0, 0, 0, 0.3)"
                          />
                        </filter>
                      </defs>
                      <path
                        d="M15.2266 7.80851C15.2266 10.0216 0.841317 15.4755 0.841317 15.4755V0.142578C0.841317 0.142578 15.2266 5.5954 15.2266 7.80851Z"
                        class="fill-white dark:!fill-tamkinDarkPrimary"
                        filter="url(#shadow-sm)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

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
              <template
                v-for="item in settingsStore.settingsItems.features"
                :key="item.name"
              >
                <div
                  v-if="item.active == 1"
                  class="h-[70px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-start w-full mt-[4px] px-[0px]"
                >
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
                  >
                    <div
                      class="flex flex-col items-start justify-center w-full"
                      :class="[!isChecked(item.name) ? 'opacity-60' : '']"
                    >
                      <div
                        style="align-items: center"
                        class="text-[#23262F] flex justify-center align-items-center dark:text-whiteTamkin font-[500] text-[12px] lg:text-[14px] leading-[8px] lg:leading-[16.39px]"
                      >
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="24" cy="24" r="24" fill="#FEFEFE" />
                          <path
                            d="M35.0769 11H13.9231C13.4132 11.0007 12.9244 11.2404 12.5639 11.6664C12.2034 12.0925 12.0006 12.6702 12 13.2727V33.7273C12.0006 34.3298 12.2034 34.9075 12.5639 35.3336C12.9244 35.7596 13.4132 35.9993 13.9231 36H35.0769C35.5868 35.9993 36.0756 35.7596 36.4361 35.3336C36.7966 34.9075 36.9994 34.3298 37 33.7273V13.2727C36.9994 12.6702 36.7966 12.0925 36.4361 11.6664C36.0756 11.2404 35.5868 11.0007 35.0769 11ZM30.75 29.1818H18.25C17.995 29.1818 17.7504 29.0621 17.5701 28.849C17.3898 28.6359 17.2885 28.3468 17.2885 28.0455C17.2885 27.7441 17.3898 27.455 17.5701 27.2419C17.7504 27.0288 17.995 26.9091 18.25 26.9091H30.75C31.005 26.9091 31.2496 27.0288 31.4299 27.2419C31.6102 27.455 31.7115 27.7441 31.7115 28.0455C31.7115 28.3468 31.6102 28.6359 31.4299 28.849C31.2496 29.0621 31.005 29.1818 30.75 29.1818ZM30.75 24.6364H18.25C17.995 24.6364 17.7504 24.5166 17.5701 24.3035C17.3898 24.0904 17.2885 23.8014 17.2885 23.5C17.2885 23.1986 17.3898 22.9096 17.5701 22.6965C17.7504 22.4834 17.995 22.3636 18.25 22.3636H30.75C31.005 22.3636 31.2496 22.4834 31.4299 22.6965C31.6102 22.9096 31.7115 23.1986 31.7115 23.5C31.7115 23.8014 31.6102 24.0904 31.4299 24.3035C31.2496 24.5166 31.005 24.6364 30.75 24.6364ZM30.75 20.0909H18.25C17.995 20.0909 17.7504 19.9712 17.5701 19.7581C17.3898 19.545 17.2885 19.2559 17.2885 18.9545C17.2885 18.6532 17.3898 18.3641 17.5701 18.151C17.7504 17.9379 17.995 17.8182 18.25 17.8182H30.75C31.005 17.8182 31.2496 17.9379 31.4299 18.151C31.6102 18.3641 31.7115 18.6532 31.7115 18.9545C31.7115 19.2559 31.6102 19.545 31.4299 19.7581C31.2496 19.9712 31.005 20.0909 30.75 20.0909Z"
                            fill="url(#paint0_linear_14041_158574)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_14041_158574"
                              x1="24.5"
                              y1="11"
                              x2="24.5"
                              y2="36"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#2DADA3" />
                              <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                          </defs>
                        </svg>

                        <div class="d-flex flex-column">
                          <h1 class="rtl:mr-[10px] ltr:ml-[10px]">
                            {{ $t(item.label) }}
                          </h1>
                          <h2
                            class="text-[12px] rtl:mr-[10px] ltr:ml-[10px] mb-2 lg:text-[14px] font-[400] leading-[28.5px] text-darkGrey dark:text-whiteTamkin"
                          >
                            <span>
                              {{
                                $t(
                                  "Manage Your Sign Language Settings for a Customized and Accessible Communication Experience"
                                )
                              }}
                            </span>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div class="rtl:mr-auto ltr:ml-auto">
                      <label :for="item.name" class="toggle_wrap">
                        <input
                          type="checkbox"
                          :id="item.name"
                          class="sr-only"
                          :checked="isChecked(item.name)"
                          @change="toggleCheckbox(item.name)"
                        />
                        <div
                          class="toggle_parent !w-[58px]"
                          :class="[
                            isChecked(item.name) ? 'active' : 'in_active',
                          ]"
                        >
                          <div
                            class="toggle_inner"
                            :class="{
                              active: isChecked(item.name),
                            }"
                          >
                            <img
                              v-if="isChecked(item.name)"
                              src="/assets/imgs/translatevideo/sign_active.svg"
                              class="w-[28px] absolute left-[0px] h-[28px]"
                            />
                            <img
                              v-else
                              src="/assets/imgs/translatevideo/sign_inactive.svg"
                              class="w-[28px] absolute left-[0px] h-[28px]"
                            />
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
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
