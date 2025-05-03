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
const perPageOptions = ref([5, 10, 20]);
const perPage = ref(perPageOptions.value[0]);
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(5 / perPage.value));

const changePerPage = (option: number) => {
  perPage.value = option;
  currentPage.value = 1;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};
const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxVisiblePages / 2)
  );
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

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
        :section-title="$t('Chatbot Conversations')"
        :section-sub-title="
          $t(
            'View all questions submitted to the chatbot along with text responses'
          )
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
            <!-- Header Section -->
            <div class="flex items-center justify-between pt-[24px]">
              <div class="w-full flex justify-between items-center">
                <h1
                  class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
                >
                  {{ $t("Request #001") }}
                </h1>
                <p class="text-[12px] text-gray-500 dark:text-gray-400">
                  2025-02-25
                </p>
              </div>

              <!-- Menu Button -->
            </div>

            <!-- Content Section -->
            <div class="mt-[20px] text-[14px]">
              <div
                class="border-b border-gray-200 dark:border-gray-700 py-[10px]"
              >
                <p class="text-gray-500 dark:text-gray-400 font-[500]">
                  {{ $t("Name") }}
                </p>
                <p class="text-black dark:text-whiteTamkin mt-[5px]">
                  Mohammed Ahmed
                </p>
              </div>

              <div
                class="border-b border-gray-200 dark:border-gray-700 py-[10px]"
              >
                <p class="text-gray-500 dark:text-gray-400 font-[500]">
                  {{ $t("Email") }}
                </p>
                <p class="text-black dark:text-whiteTamkin mt-[5px]">
                  MohammedAhmed@gmail.com
                </p>
              </div>

              <div
                class="border-b border-gray-200 dark:border-gray-700 py-[10px]"
              >
                <p class="text-gray-500 dark:text-gray-400 font-[500]">
                  {{ $t("Question") }}
                </p>
                <p class="text-black dark:text-whiteTamkin mt-[5px]">
                  How can I register?
                </p>
              </div>

              <div class="py-[10px] border-b">
                <p class="text-gray-500 dark:text-gray-400 font-[500]">
                  {{ $t("Response") }}
                </p>
                <p class="text-black dark:text-whiteTamkin mt-[5px]">
                  You can register through the website
                </p>
              </div>
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
