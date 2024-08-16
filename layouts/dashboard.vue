<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
// import { useModalStore } from "@/stores/modal";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";

import { useNavbarStore } from "@/stores/navbar";
import { useAddonStore } from "@/stores/addons.js";
import { useCustomizeStore } from "@/stores/customize.js";
import { useSettingsStore } from "@/stores/settings.js";
import { useStatsStore } from "@/stores/stats.js";
import { useMarketStore } from "@/stores/market.js";
import { useModalManager } from "@/composables/useModalManager";
import { useUserStore } from "@/stores/auth"; // Import the Pinia store
import { useTranslateStore } from "~/stores/translate";
const translateStore = useTranslateStore();

const { getAvatarLetters } = useGetAvatarLetters();
onMounted(() => {
  if (localStorage.getItem("user")) {
    const userStore = useUserStore();
    const user = JSON.parse(localStorage.getItem("user"));
    userStore.setUser(user.value);
  }
});

const statsStore = useStatsStore();
const marketStore = useMarketStore();
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
  gradient2,

  gradient1,
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

watch(anyChangesInStylesTranslate, (newValue, oldValue) => { }, { deep: true });

watch(anyChangesInPlayerTranslate, (newValue, oldValue) => {
  showFooterSavePlayer.value = true;
});
const shouldShowFooter = computed(() => {
  const isAddonsLinkActive =
    (isLinkActive("/addons") && checkboxStore.hasChanges()) ||
    (isLinkActive("/addons") && checkboxStore.force_change_menuCards) ||
    (isLinkActive("/addons") && checkboxStore.force_change_profileCards);
  const isCustomizeLinkActive =
    (isLinkActive("/customize") && currentColor.value !== "#2dada3") ||
    (isLinkActive("/customize") && gradient1.value !== "#2dada3") ||
    (isLinkActive("/customize") && gradient2.value !== "#2dada3") ||
    (isLinkActive("/customize") && custmizeStore.hasChanges());
  const isMarketChanges = isLinkActive("/market") && marketStore.showSaveFooter;

  const isSettingsLinkActive = isLinkActive("/settings") && settingsStore.hasChanges();
  const isStatsActive = isLinkActive("/statistics") && statsStore.google_enabled;

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
    translateStyle ||
    translatePlayer ||
    (translateStore.changesOnSubTitles && isLinkActive("/translate/video"))
  );
});

const cancelAc = () => {
  const isCustomizeLinkActive =
    isLinkActive("/customize") &&
    (custmizeStore.forceChange_buttonShape ||
      force_change_profileCards.value ||
      force_change_MainMenuCard.value ||
      currentColor.value !== "#2dada3" ||
      gradient1.value !== "#2dada3" ||
      gradient2.value !== "#2dada3" ||
      custmizeStore.hasChanges());
  const isAddonsLinkActive =
    (isLinkActive("/addons") && checkboxStore.hasChanges()) ||
    (isLinkActive("/addons") && checkboxStore.force_change_menuCards) ||
    (isLinkActive("/addons") && checkboxStore.force_change_profileCards);
  const isSettingsLinkActive = isLinkActive("/settings") && settingsStore.hasChanges();
  const isStatsActive = isLinkActive("/statistics") && statsStore.google_enabled;
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
    custmizeStore.cancelAll();
  }
  if (isMarketChanges) {
    marketStore.resetAll();
  }
  if (isAddonsLinkActive) {
    checkboxStore.cancelAll();
  }

  if (isSettingsLinkActive) {
    settingsStore.cancelAll();
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
const showConfirmModal = ref(false);
const confirmWithSaveFn = () => {
  if (isLinkActive(localePath("/addons"))) {
    // checkboxStore.showSaveBeforeLeaveModal()
  }
};

const openModals = computed(() => {
  return (
    isOpen("shareModal") ||
    isOpen("invitemember") ||
    isOpen("invitememberupdate") ||
    isOpen("editteampic") ||
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
    isOpen('edit_card_billing_profile') ||
    isOpen('withdraw_paymentmethods') ||
    isOpen('bank_account_withdraw') ||
    isOpen('details_bank_withdraw') ||
    isOpen('success_bank_withdraw') ||
    isOpen('crypto_step1') ||
    isOpen('crypto_step_2_e') ||
    isOpen('crypto_success_referral') ||
    isOpen('paypal_withdraw_step1') ||
    isOpen('paypal_withdraw_step2') ||
    isOpen('success_paypal_withdraw') ||
    isOpen('add_new_card_billing') ||
    isOpen('tracking_custom_order') ||
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
    resetModal.value
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
  localStorage.removeItem('user');
  localStorage.removeItem('registerd_email');
  localStorage.removeItem('registerd_user');

  router.push('/auth/login');
}

const userName = () => {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? (user.full_name || user.display_name) : '';
  }
  return '';
}

const userImg = computed(() => {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.user_image) {
      return `https://tamkin.app/${user.user_image}`;
    }
    else if (user && user.photoURL) {
      return user.photoURL;
    }
    return null;
  }
  return null;
});

const toastMsg = ref(null);
const toastAppear = ref(false);

const openToast = (msg) => {
  console.log('msg', msg);
  toastMsg.value = msg;
  toastAppear.value = true;
  setTimeout(() => {
    toastAppear.value = false;
  }, 2000)
}


onMounted(() => {
  const userStore = useUserStore();
  const user = JSON.parse(localStorage.getItem('user'));
  if(user) {
    userStore.user = user;
  }
})
</script>

<template>
  <DashboardToastSuccess v-if="toastAppear" :hideIn="2000" :message="toastMsg" class="!top-[70px]" />

  <Html class="dark:bg-p bg_dashboard" :lang="htmlAttrs.lang" :dir="htmlAttrs.dir"
    :class="[openModals ? '!overflow-hidden' : 'overflow-auto overflow-x-hidden']">
  <div class="relative min-h-screen   dark:!bg-p  " :class="[!navStoreRef.sideBarOpen ? 'flex' : 'flex']">
    <div v-if="openModals
    " @click="closeSideBarOnMobileOverlay"
      class="absolute z-[9999] bg-black  bg-opacity-70 h-full w-full overflow-hidden"></div>
    <div v-if="marketStore.firstItemNotificationShown"
      class="absolute z-[9999] bg-black bg-opacity-30 h-full w-full overflow-hidden"></div>

      <ModalsSuccessmodal
        :show-modal="isOpen('successContact')"
        title="Thanks for contact us"
        sub-title="We will contact you as soon as possible "
        icon="contact_success.svg"
      />

    <DashboardTeamEditUserModal :showModal="true" v-if="isOpen('editusermodal')" />
    <DashboardEmbedShareModal @onSuccess="e => openToast(e)" :showModal="true" v-if="isOpen('shareModal')" />
    <DashboardTeamInviteMember @onSuccess="e => openToast(e)" :showModal="true" v-if="isOpen('invitemember')" />
    <DashboardTeamEditname :showModal="true" v-if="isOpen('editname')" />

    <ModalsConfirm :show-modal="true" v-if="isOpen('deleteTeamMember')" title="Delete That Member"
      sub-title="Are you sure you want to delete that team member ?" confirm-btn-type="delete"
      @control-delete="emitEvent('deleteTeamMember')" @control-cancel="closeModal('deleteTeamMember')" />

    <ModalsConfirm :show-modal="true" v-if="isOpen('deleteApp')" title="Delete That App"
      sub-title="Are you sure you want to delete that app ?" confirm-btn-type="delete"
      @control-delete="emitEvent('deleteApp')" @control-cancel="closeModal('deleteApp')" />

    <ModalsConfirm :show-modal="true" v-if="isOpen('restoreApp')" title="Restore That App" :for-delete="false"
      sub-title="Are you sure you want to restore that app ?" confirm-btn-type="other"
      @control-other="emitEvent('restoreApp')" @control-cancel="closeModal('restoreApp')" />

    <DashboardTeamInviteMemberUpdate :showModal="true" v-if="isOpen('invitememberupdate')" />
    <DashboardTeamEditTeamPictureModal @uploadSuccess="openToast('Image Uploaded Successfully')"
      @removeSuccess="openToast('Image Deleted Successfully')" :showModal="true" v-if="isOpen('editteampic')" />
    <DashboardTeamEditUserPermissionsModal @onSuccess="e => openToast(e)" :showModal="true"
      v-if="isOpen('userpermissions')" />
    <DashboardMySiteSelectSiteModal @onSuccess="e => openToast(e)" :showModal="true" v-if="isOpen('selectSite')" />
    <DashboardMySiteUpgradeModal :showModal="isOpen('upgrade')" />
    <!--

    <DashboardMySiteSelectsitemodal :showModal="selectSiteModal" />
    <DashboardTeamEdituserpermissionsmodal :showModal="editPermissionsModal" /> -->

    <!-- <DashboardMySiteUpgradeModal :showModal="showUpgradeModal" />
        -->
    <ModalsConfirm :showModal="isOpen('resetModal')" title="Rest All Accessibility Settings"
      sub-title="Are you sure you want to reset all accessibility settings to their default values? This action cannot be undone and will overwrite any customized settings"
      confirm-btn-type="confirm" @control-confirm="closeModal('resetModal')"
      @control-cancel="closeModal('resetModal')" />

    <ModalsConfirm :show-modal="isOpen('deleteModal')" title="Delete your site"
      sub-title="Are you sure you want to delete your site, Tamkin.App? This action is irreversible and will permanently remove all your data and settings. You will also lose access to many features"
      confirm-btn-type="delete" @control-delete="closeModal('deleteModal')"
      @control-cancel="closeModal('deleteModal')" />

    <SettingsTransfermodalstep1 :show-modal="isOpen('transferstep1')" />
    <SettingsTransfermodalstep2 :show-modal="isOpen('transferstep2')" />

    <div
      class="lg:relative flex items-center justify-start flex-col bg-[#FFFEFE] dark:bg-tamkinDarkPrimary z-[100] border-l-0 border-t-0 border-b-0 border-r border-[1px] border-lightGrey dark:border-darkborder w-full"
      :class="[
    sideBarOpenMobile
      ? 'fixed inset-0 z-[9999] w-full h-screen '
      : 'hidden lg:flex',
    sideBarOpen ? 'max-w-[280px] ' : 'max-w-[75px]',
  ]">
      <div class="h-full w-full relative" :class="[sideBarOpen ? 'mt-[8px]' : 'mt-[0]']">
        <div @click="toggleSidebar" :class="[
    !sideBarOpen
      ? ' rotate-180 lg:!top-[133px] ltr:lg:left-[62px]'
      : 'top-[154px] rtl:lg:right-[94%] ltr:lg:left-[268px]',
  ]" class="!overflow-visible cursor-pointer close_sidebar_btn fixed items-center justify-center bg-white dark:bg-tamkinDarkPrimary border-[1px] dark:shadow-sm dark:shadow-blur-2 dark:-shadow-y-[0.2px] dark:shadow-whiteTamkin border-linecolor dark:border-[#C5C5C5] rounded-full w-[24px] h-[24px] group z-[150] lg:flex hidden">
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none"
            class="fill-tamkin group-hover:stroke-white group-hover:fill-white w-[8px] h-[10px]"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z" />
          </svg>
        </div>

        <DashboardNavbar :side-bar-open="sideBarOpen" :mobileSidebar="sideBarOpenMobile"
          @toggleSidebarMobile="toggleSidebarMobile" @toggleSidebar="toggleSidebar" />
      </div>
    </div>

      <div
        class="flex items-start lg:flex-row flex-col md:justify-between lg:justify-between relative w-full"
      >
        <!-- upper nav and content -->
        <div class="relative top-0 w-full">
          <nav
            style="box-shadow: 0px 4px 24px 8px #51459f14"
            class="sticky top-0 flex z-[60] items-center justify-between w-full
            bg-[#FFFEFE] dark:bg-tamkinDarkPrimary rtl:space-x-reverse  h-[70px]"
          >
            <div
              class="flex  items-center lg:space-x-0 space-x-[10px]  w-full "
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

              <div class="py-[17px] search_input relative  w-full !ml-[40px]">
                <input
                  type="text"
                  class="input_dashboard_search 2xl:w-full lg:w-3/4 "
                  v-model="search"
                  placeholder="Search ..."
                />
                <div
                  class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
                >
                  <img src="/assets/imgs/icons/search.svg" />
                </div>
                <div
                  v-if="isSearchfilled"
                  @click="clearInput"
                  class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer"
                >
                  <img src="/assets/imgs/icons/clear_search.svg" />
                </div>
              </div>

              <div
                class="flex items-center justify-end  lg:space-x-[20px] w-full"

              >
                <div class="py-[17px] search_input relative lg:hidden block w-1/4">
                  <input
                    type="text"
                    class="input_dashboard_search w-1/4"
                    v-model="search"
                    placeholder="Search ..."
                  />
                  <div
                    class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
                  >
                    <img src="/assets/imgs/icons/search.svg" />
                  </div>
                  <div
                    v-if="isSearchfilled"
                    @click="clearInput"
                    class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer"
                  >
                    <img src="/assets/imgs/icons/clear_search.svg" />
                  </div>
                </div>
                <Langswitcher/>

                <Darkmode />
                <NotificationBell/>
                <!-- {{ userName }} -->
            <Userprofilemenu />

              </div>
            </div>
          </nav>

          <div class=" relative" :class="isLinkActive('/profile') ? '' : 'pt-[20px] px-[20px] ipad-max:px-[20px] lg:px-[40px]'">
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
                isLinkActive('/addons') ||
                isLinkActive('/statistics') ||
                isLinkActive('/overview') ||
                isLinkActive('/customize') ||
                isLinkActive('/settings') ||

                isLinkActive('/sign-language/*')
              "
            ></div>
            <div class="relative px-[15px]">
              <NavbarOverview
                v-if="
                  isLinkActive('/overview') ||
                  isLinkActive('/settings') ||
                  isLinkActive('/addons') ||
                  isLinkActive('/customize') ||
                  isLinkActive('/addons') ||
                  isLinkActive('/statistics')
                "
              />
            </div>

            <transition name="slide-up">
              <DashboardAddonsSaveFooter
                :show-footer="shouldShowFooter"
                @cancel_action="cancelAc"
              />
            </transition>
            <!-- <NuxtPage class="" /> -->
            <slot />
          </div>
        </div>
      </div>
      <!-- end of upper nav and content -->
    </div>
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

/* .sidebar-leave-active in <2.1.8 */
  {
  transform: translateX(-75px);
}

.sidebar {
  transform: translateX(100%);
}
</style>
