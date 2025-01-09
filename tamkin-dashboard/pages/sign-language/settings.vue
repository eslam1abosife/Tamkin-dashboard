<script lang="ts" setup>
import VCodeBlock from "@wdns/vue-code-block";
import { useCollapseStore } from "@/stores/collapse.js";
import { vOnClickOutside } from "@vueuse/components";
import { useSettingsStore } from "@/stores/settings";
import { useModalManager } from "@/composables/useModalManager";
import { useGetPlayerData } from "@/composables/useAccessibility";
import { useApi } from "@/composables/useApi";
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

  getPlayerData();
});
const { locale } = useI18n();
const deleteSite = async () => {
  try {
    const res = await api.post("/mySite/set/AppStatusCancel", {
      name: settingsStore.defaultapp,
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
    const res = await api.post("/Apps/ResetSettingDefaultApp", {
      type: "Sign language", //Accessibility|Sign language
    });
    closeModal("resetModal");
    getPlayerData();
    $toast(t("All Player settings have been reset"), {
      hideIn: 3000,
      type: "success",
    });
    localStorage.removeItem("playerColorPanal");
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
    <ModalsConfirm
      :showModal="isOpen('resetModal')"
      :title="$t('Reset All Sign Language Settings')"
      :sub-title="
        $t(
          'Are you sure you want to reset all sign language settings to their default values? This action cannot be undone and will overwrite any customized settings'
        )
      "
      confirm-btn-type="confirm"
      @control-confirm="resetAccessiility"
      @control-cancel="closeModal('resetModal')"
    />
    <ModalsConfirm
      :show-modal="isOpen('deleteModal')"
      :title="$t('Delete your site')"
      :sub-title="
        $t(
          'Are you sure you want to delete your site? This action is irreversible and will permanently remove all your data and settings. You will also lose access to many features'
        )
      "
      confirm-btn-type="delete"
      @control-delete="deleteSite"
      @control-cancel="closeModal('deleteModal')"
    />
    <SettingsTransferModalStep1 :show-modal="isOpen('transferstep1')" />
    <SettingsTransferModalStep2 :show-modal="isOpen('transferstep2')" />

    <LanguageServicesNavbar />
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
        :section-title="$t('Settings')"
        :section-sub-title="
          $t('Settings let you customize your preferences and configurations')
        "
      />

      <div v-if="customizeStore.loadingData || settingsStore.loadingdefaultappobj">
        <div
          class="animate-pulse space-y-4 card bg-white rounded-[10px] p-4"
          :class="!settingsStore.defaultappobj ? 'mt-[42px]' : 'mt-[42px]'"
        >
          <div
            class="h-[55px] w-full rounded-md bg-gray-200"
            v-for="s in 6"
            :key="s"
          ></div>
        </div>
      </div>

      <div v-else>
        <LanguageServicesNodata
               v-if="!settingsStore.defaultappobj"
        />
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
            <div class="flex items-center justify-start">
              <div class="pt-[24px]">
                <h1
                  class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
                >
                  {{
                    $t(
                      settingsStore.settingsItems.title
                        ? settingsStore.settingsItems.title
                        : ""
                    )
                  }}
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
                        settingsStore.settingsItems.description_on_show
                          ? settingsStore.settingsItems.description_on_show
                          : ""
                      )
                    }}
                  </span>
                  <span v-else>
                    {{
                      $t(
                        settingsStore.settingsItems.description_on_hide
                          ? settingsStore.settingsItems.description_on_hide
                          : ""
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
                  class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-start w-full mt-[4px] px-[15px]"
                >
                  <div
                    class="flex items-center justify-start space-x-[13px] w-full"
                  >
                    <div
                      class="flex flex-col items-start justify-center w-full"
                      :class="[!isChecked(item.name) ? 'opacity-60' : '']"
                    >
                      <div
                        class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[12px] lg:text-[14px] leading-[8px] lg:leading-[16.39px]"
                      >
                        <span>{{ item.label }}</span>
                      </div>
                    </div>
                    <div class="ml-auto">
                      <label :for="item.name" class="toggle_wrap">
                        <input
                          type="checkbox"
                          :id="item.name"
                          class="sr-only"
                          :checked="isChecked(item.name)"
                          @change="toggleCheckbox(item.name)"
                        />
                        <div
                          class="toggle_parent"
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
                              class="w-[28px] h-[28px]"
                            />
                            <img
                              v-else
                              src="/assets/imgs/translatevideo/sign_inactive.svg"
                              class="w-[28px] h-[28px]"
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

          <OverviewWidgetembdedcode />

          <div
            v-if="settingsStore.isDeafResetActive.active == 1"
            class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] shadow-md -shadow-y-[1px] relative"
            :class="[
              collapseStore.collapses.includes('reset_all_settings_card')
                ? 'pb-[24px]'
                : 'pb-[20px]',
            ]"
          >
            <div class="flex items-start justify-start">
              <div class="">
                <h1
                  class="text-[14px] lg:text-[18px] font-[500] leading-[30px] pt-[24px] dark:text-whiteTamkin"
                >
                  {{
                    $t(
                      settingsStore.isDeafResetActive.title
                        ? settingsStore.isDeafResetActive.title
                        : ""
                    )
                  }}
                </h1>

                <p
                  class="text-[12px] lg:text-[13px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin mt-[10px] w-3/4"
                >
                  <span
                    v-if="
                      !collapseStore.collapses.includes(
                        'reset_all_settings_card'
                      )
                    "
                  >
                    {{
                      $t(
                        settingsStore.isDeafResetActive.description_on_show
                          ? settingsStore.isDeafResetActive.description_on_show
                          : ""
                      )
                    }}
                  </span>
                  <span v-else>
                    {{
                      $t(
                        settingsStore.isDeafResetActive.description_on_hide
                          ? settingsStore.isDeafResetActive.description_on_hide
                          : ""
                      )
                    }}
                  </span>
                </p>
              </div>

              <div
                @click.stop="collapseStore.collapseMenu('reset_all_settings')"
                v-on-click-outside="
                  () => collapseStore.removeMenu('reset_all_settings')
                "
                :class="[
                  collapseStore.menus.includes('reset_all_settings')
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
                    collapseStore.menus.includes('reset_all_settings')
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
                  v-if="collapseStore.menus.includes('reset_all_settings')"
                  style="box-shadow: 0px 2px 6px 0px #00000040"
                  class="mini_SizeMenu"
                >
                  <div
                    class="mini_wrap"
                    @click="
                      collapseStore.collapseCard('reset_all_settings_card')
                    "
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
                          "reset_all_settings_card"
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
              class="relative flex items-center lg:flex-row flex-col justify-center lg:justify-start mt-[16px] divide-y dark:divide-light space-y-[42px] lg:space-y-0 lg:space-x-[100px]"
              v-if="
                !collapseStore.collapses.includes('reset_all_settings_card')
              "
              :class="
                navStore.defaultappobj?.package?.filter(
                  (p) => p.type === 'Sign language'
                ).length == 0
                  ? 'pb-[180px]'
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
              <button
                class="w-full btn_bordered_dashboard hover_tamkin flex items-center justify-center group"
                @click="openModal('resetModal', 'settings')"
              >
                <div>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="lg:w-full lg:h-full w-[16px] h-[16px]"
                  >
                    <path
                      d="M14.5 16H19.5V21M10.5 8H5.5V3M19.9176 9.0034C19.3569 7.61566 18.4181 6.41304 17.208 5.53223C15.9979 4.65141 14.5652 4.12752 13.0723 4.02051C11.5794 3.9135 10.0861 4.2274 8.7627 4.92661C7.43933 5.62582 6.33882 6.68254 5.58594 7.97612M5.08203 14.9971C5.64272 16.3848 6.58146 17.5874 7.79157 18.4682C9.00169 19.3491 10.4359 19.8723 11.9288 19.9793C13.4217 20.0863 14.9138 19.7725 16.2371 19.0732C17.5605 18.374 18.6603 17.3175 19.4131 16.0239"
                      class="group-hover:stroke-white stroke-[url(#paint0_linear_3592_46947)]"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_3592_46947"
                        x1="12.4998"
                        y1="3"
                        x2="12.4998"
                        y2="21"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#2DADA3" />
                        <stop offset="1" stop-color="#71DAD2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div
                  class="bg-gradient-to-b from-[#2DADA3] to-[#71DAD2] bg-clip-text"
                >
                  {{ `${$t("Reset All Sign Language Settings")}` }}
                </div>
              </button>
            </div>
          </div>

          <div
            v-if="settingsStore.transferLicenceItems.active == 1"
            class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] mb-[80px] shadow-md -shadow-y-[1px] px-[15px] relative"
            :class="[
              collapseStore.collapses.includes('license_settings_card')
                ? 'pb-[24px]'
                : 'pb-[20px]',
            ]"
          >
            <div class="flex items-start justify-start pt-[24px]">
              <div class="">
                <h1
                  class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
                >
                  {{
                    $t(
                      settingsStore.transferLicenceItems.title
                        ? settingsStore.transferLicenceItems.title
                        : ""
                    )
                  }}
                </h1>

                <p
                  class="text-[12px] lg:text-[13px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin mt-[10px] w-3/4"
                >
                  <span
                    v-if="
                      !collapseStore.collapses.includes('license_settings_card')
                    "
                  >
                    {{
                      $t(
                        settingsStore.transferLicenceItems.description_on_show
                          ? settingsStore.transferLicenceItems
                              .description_on_show
                          : ""
                      )
                    }}
                  </span>
                  <span v-else>
                    {{
                      $t(
                        settingsStore.transferLicenceItems.description_on_hide
                          ? settingsStore.transferLicenceItems
                              .description_on_hide
                          : ""
                      )
                    }}
                  </span>
                </p>
              </div>

              <div
                @click.stop="collapseStore.collapseMenu('license_settings')"
                v-on-click-outside="
                  () => collapseStore.removeMenu('license_settings')
                "
                :class="[
                  collapseStore.menus.includes('license_settings')
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
                    collapseStore.menus.includes('license_settings')
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
                  v-if="collapseStore.menus.includes('license_settings')"
                  style="box-shadow: 0px 2px 6px 0px #00000040"
                  class="mini_SizeMenu"
                >
                  <div
                    class="mini_wrap"
                    @click="collapseStore.collapseCard('license_settings_card')"
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
                          "license_settings_card"
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
                        class="fill-white dark:!fill-darkTamkin"
                        filter="url(#shadow-sm)"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="relative flex items-center flex-col justify-center divide-y dark:divide-light lg:space-y-0"
              v-if="!collapseStore.collapses.includes('license_settings_card')"
              :class="
                navStore.defaultappobj?.package?.filter(
                  (p) => p.type === 'Sign language'
                ).length == 0
                  ? 'pb-[180px]'
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
              <div
                v-if="settingsStore.transferLicenceItems.features.find((el:any)=> el.name === 'deaf-setting-license-settings-sign-language-transfer-license-to-another-website-transfer-license-sign-language' ).active == 1"
                class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-start w-full mt-[22px] px-[15px]"
              >
                <div
                  class="flex items-center justify-start space-x-[13px] w-full"
                >
                  <div class="flex flex-col items-start justify-center w-full">
                    <div
                      class="!text-[#585B5B] dark:!text-whiteTamkin font-[500] text-[13px] lg:leading-[24px] w-full"
                    >
                      <span>
                        {{
                          $t(
                            settingsStore.transferLicenceItems.features.find(
                              (el: any) =>
                                el.name ===
                                "deaf-setting-license-settings-sign-language-transfer-license-to-another-website-transfer-license-sign-language"
                            ).label
                              ? settingsStore.transferLicenceItems.features.find(
                                  (el: any) =>
                                    el.name ===
                                    "deaf-setting-license-settings-sign-language-transfer-license-to-another-website-transfer-license-sign-language"
                                ).label
                              : ""
                          )
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-auto w-full">
                    <button
                      class="btn_bordered_dashboard ml-auto ipad-max:w-auto !p-[5px] lg:w-1/4 text-[13px] !h-[40px] font-[500] leading-[22.5px]"
                      @click="openModal('transferstep1', 'settings')"
                    >
                      {{ $t("Transfer License") }}
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-if="settingsStore.transferLicenceItems.features.find((el:any)=> el.name === 'deaf-setting-license-settings-sign-language-delete-site-permanently-removes-your-profile-and-data-from-the-system-sign-language' ).active == 1"
                class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-start w-full mt-[4px] px-[15px]"
              >
                <div class="flex items-center justify-start w-full">
                  <div class="flex flex-col items-start justify-center w-full">
                    <div
                      class="!text-[#585B5B] dark:!text-whiteTamkin font-[500] text-[13px] lg:leading-[24px] lg:w-full w-40 truncate"
                    >
                      <span>
                        {{
                          $t(
                            settingsStore.transferLicenceItems.features.find(
                              (el: any) =>
                                el.name ===
                                "deaf-setting-license-settings-sign-language-delete-site-permanently-removes-your-profile-and-data-from-the-system-sign-language"
                            ).label
                              ? settingsStore.transferLicenceItems.features.find(
                                  (el: any) =>
                                    el.name ===
                                    "deaf-setting-license-settings-sign-language-delete-site-permanently-removes-your-profile-and-data-from-the-system-sign-language"
                                ).label
                              : ""
                          )
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-auto w-full">
                    <button
                      class="btn_bordered_dashboard error ml-auto ipad-max:w-auto lg:w-1/4 !h-[40px] text-[13px] font-[500] leading-[22.5px]"
                      @click="openModal('deleteModal', 'settings')"
                    >
                      {{ $t("Delete Site") }}
                    </button>
                  </div>
                </div>
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
