<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
// import { useModalStore } from "@/stores/modal";
import { useNavbarStore } from "@/stores/navbar";
import { useAddonStore } from "@/stores/addons.js";
import { useCustomizeStore } from "@/stores/customize.js";
import { useSettingsStore } from "@/stores/settings.js";
import { useStatsStore } from "@/stores/stats.js";
import { useMarketStore } from "@/stores/market.js";
import { useModalManager } from '@/composables/useModalManager';
import { useUserStore } from "@/stores/auth"; // Import the Pinia store
import { useTranslateStore } from "~/stores/translate";
const translateStore = useTranslateStore()

onMounted(() => {
  if(localStorage.getItem('user')) {
    const userStore = useUserStore();
    const user = JSON.parse(localStorage.getItem('user'));
    userStore.setUser(user.value);
  }
})

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
  return localePath(route.path) === localePath(path);
};

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  emitEvent
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

watch(() => route.path, (newPath, oldPath) => {
  sideBarOpenMobile.value = false;
}, { immediate: true });
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
  return JSON.stringify(translateStore.styles) ;
});
const anyChangesInPlayerTranslate = computed(() => {
  return JSON.stringify(translateStore.styles) ;
});
const showFooterSaveStyles = ref(false)
const showFooterSavePlayer= ref(false)

watch(anyChangesInStylesTranslate, (newValue, oldValue) => {

},{deep:true});

watch(anyChangesInPlayerTranslate, (newValue, oldValue) => {

  showFooterSavePlayer.value = true

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

 const translateStyle = isLinkActive('/translate/video') && translateStore.hasChanges && translateStore.subMode === 'style' && translateStore.currentMode === 'subtitles'
const translatePlayer = isLinkActive('/translate/video') && translateStore.hasChangesPlayer
 && translateStore.currentMode === 'player'
  return (
    isAddonsLinkActive ||
    isCustomizeLinkActive ||
    isSettingsLinkActive ||
    isStatsActive ||
    isMarketChanges ||
    translateStyle
    ||translatePlayer

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
  const translateStyle = isLinkActive('/translate/video') && translateStore.hasChanges && translateStore.subMode === 'style' && translateStore.currentMode === 'subtitles'
  const translatePlayer = isLinkActive('/translate/video') && translateStore.hasChangesPlayer
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
const hasUnsavedChanges = () => {
  return (
    (isLinkActive(localePath("/addons")) && checkboxStore.hasChanges()) ||
    (isLinkActive(localePath("/addons")) &&
      (checkboxStore.force_change_menuCards ||
        checkboxStore.force_change_profileCards)) ||
    (isLinkActive(localePath("/customize")) &&
      (custmizeStore.forceChange_buttonShape ||
        force_change_profileCards.value ||
        force_change_MainMenuCard.value ||
        currentColor.value !== "#2dada3" ||
        gradient1.value !== "#2dada3" ||
        gradient2.value !== "#2dada3" ||
        custmizeStore.hasChanges())) ||
    (isLinkActive(localePath("/settings")) && settingsStore.hasChanges())
  );
};



const openModals = computed(() => {
  return (
    isOpen('shareModal') ||
    isOpen('invitemember') || 
    isOpen('invitememberupdate') ||
    isOpen('editteampic') ||
    isOpen('editusermodal') || 
    isOpen('userpermissions') ||
    isOpen('selectSite') ||
    isOpen('upgrade') || 
    isOpen('translate_video') 
    ||
    isOpen('translate_audio') ||
    isOpen('renamemodal')||
    isOpen('upgradeTranslatePackage') ||
    isOpen('sharetranslate') ||
    isOpen('moreinfo_translate')||
    isOpen('translate_live_video')
    ||
    isOpen('translate_pdf_documents') ||
    isOpen('translate_word_documents') ||
    isOpen('transferstep1')||
    isOpen('transferstep2') ||
  isOpen('deleteTeamMember') ||
    isOpen('deleteModal') ||isOpen('resetModal') || isOpen('mycart')|| isOpen('requestmodal')
    ||
    isOpen('cardModal') ||
    isOpen('translate_images') ||
    isOpen('editname')
|| sideBarOpenMobile.value
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
    // resetModal.value ||
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

const closeSideBarOnMobileOverlay = ()=> {
  if (sideBarOpenMobile.value) {
    sideBarOpenMobile.value = false
  }
}
const logout = () => {
  const userStore = useUserStore();
  userStore.logout();
  router.push('/auth/login');
}

const userName = computed(() => {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? (user.full_name || user.display_name) : '';
  }
  return '';
});
</script>

<template>
  <Html class="dark:bg-p bg_dashboard" :lang="htmlAttrs.lang" :dir="htmlAttrs.dir"
    :class="[openModals ? '!overflow-hidden' : 'overflow-auto overflow-x-hidden']">
  <div class="relative min-h-screen   dark:!bg-p  " :class="[!navStoreRef.sideBarOpen ? 'flex' : 'flex']">
    <div v-if="
    openModals
    "  @click="closeSideBarOnMobileOverlay" class="absolute z-[200] bg-black  bg-opacity-70 h-full w-full overflow-hidden"></div>
    <div v-if="marketStore.firstItemNotificationShown"
      class="absolute z-[200] bg-black bg-opacity-30 h-full w-full overflow-hidden"></div>

    <!-- <ModalsSuccessmodal :show-modal="modalStore.showSuccessModalContact" title="Thanks for contact us"
      sub-title="We will contact you as soon as possible " icon="contact_success.svg" /> -->
 <DashboardTeamEditUserModal :showModal="true" v-if="isOpen('editusermodal')" />
    <DashboardEmbedShareModal :showModal="isOpen('shareModal')" />
    <DashboardTeamInviteMember :showModal="true" v-if="isOpen('invitemember')" />
    <DashboardTeamEditname/>

    <ModalsConfirm :show-modal="true" v-if="isOpen('deleteTeamMember')" title="Delete That Member"
                   sub-title="Are you sure you want to delete that team member ?"
                   confirm-btn-type="delete" @control-delete="emitEvent('deleteTeamMember')" @control-cancel="closeModal('deleteTeamMember')" />

    <DashboardTeamInviteMemberUpdate :showModal="true" v-if="isOpen('invitememberupdate')" />
    <DashboardTeamEditTeamPictureModal :showModal="isOpen('editteampic')" />
    <DashboardTeamEditUserPermissionsModal :showModal="true" v-if="isOpen('userpermissions')" />
    <DashboardMySiteSelectsitemodal :showModal="isOpen('selectSite')" />
    <DashboardMySiteUpgradeModal :showModal="isOpen('upgrade')" />
    <!--

    <DashboardMySiteSelectsitemodal :showModal="selectSiteModal" />
    <DashboardTeamEdituserpermissionsmodal :showModal="editPermissionsModal" /> -->

    <!-- <DashboardMySiteUpgradeModal :showModal="showUpgradeModal" />
        -->
    <ModalsConfirm :showModal="isOpen('resetModal')" title="Rest All Accessibility Settings"
      sub-title="Are you sure you want to reset all accessibility settings to their default values? This action cannot be undone and will overwrite any customized settings"
      confirm-btn-type="confirm" @control-confirm="closeModal('resetModal')" @control-cancel="closeModal('resetModal')" />

      <ModalsConfirm :show-modal="isOpen('deleteModal')" title="Delete your site"
      sub-title="Are you sure you want to delete your site, Tamkin.App? This action is irreversible and will permanently remove all your data and settings. You will also lose access to many features"
      confirm-btn-type="delete" @control-delete="closeModal('deleteModal')" @control-cancel="closeModal('deleteModal')" />

    <SettingsTransfermodalstep1 :show-modal="isOpen('transferstep1')" />
    <SettingsTransfermodalstep2 :show-modal="isOpen('transferstep2')" />

    <div class="lg:relative flex items-center justify-start flex-col bg-[#FFFEFE] dark:bg-tamkinDarkPrimary z-[100] 
        border-l-0 border-t-0 border-b-0 border-r border-[1px] border-lightGrey dark:border-darkborder w-full" :class="[
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
        ]"
          class="!overflow-visible cursor-pointer close_sidebar_btn fixed items-center justify-center bg-white
             dark:bg-tamkinDarkPrimary border-[1px] dark:shadow-sm dark:shadow-blur-2 dark:-shadow-y-[0.2px] 
             dark:shadow-whiteTamkin border-linecolor dark:border-[#C5C5C5]  rounded-full w-[24px] 
             h-[24px] group z-[150] lg:flex hidden">
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

    <div class="flex items-start lg:flex-row flex-col md:justify-between lg:justify-between relative w-full">
      <!-- upper nav and content -->
      <div class="relative top-0 w-full">
        <nav style="box-shadow: 0px 4px 24px 8px #51459f14"
          class="fixed top-0 flex z-[60] items-center justify-center lg:justify-between w-full
           bg-[#FFFEFE] dark:bg-tamkinDarkPrimary rtl:space-x-reverse lg:px-[40px] h-[70px]">
          <div class="flex ipad-max:w-[75%] items-center lg:space-x-0 space-x-[10px] lg:px-0 px-[20px]  w-full" :class="[sideBarOpen ? 'lg:max-w-[82.5%]' : 'lg:max-w-[97%]']">
            <div class="flex items-center justify-between  lg:hidden"
              @click="toggleSidebarMobile" style="transform: translateZ(0)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              </svg>
            </div>
          
            <div class="py-[17px] search_input relative flex-grow lg:block hidden">
              <input type="text" class="input_dashboard_search w-full" v-model="search" placeholder="Search ..." />
              <div
                class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]">
                <img src="/assets/imgs/icons/search.svg" />
              </div>
              <div v-if="isSearchfilled" @click="clearInput"
                class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer">
                <img src="/assets/imgs/icons/clear_search.svg" />
              </div>
            </div>
           
            <div
              class="flex items-center  justify-end lg:ml-auto space-x-[14px] lg:space-x-[43px] w-full"
              :class="[sideBarOpen ? 'lg:max-w-[50%]' : 'lg:max-w-[50%]']">
              <div class="py-[17px] search_input relative lg:hidden block">
                <input type="text" class="input_dashboard_search w-full" v-model="search" placeholder="Search ..." />
                <div
                  class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]">
                  <img src="/assets/imgs/icons/search.svg" />
                </div>
                <div v-if="isSearchfilled" @click="clearInput"
                  class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer">
                  <img src="/assets/imgs/icons/clear_search.svg" />
                </div>
              </div>
              <Darkmode />
              <div @click="showNotifiations = !showNotifiations"
                :class="[showNotifiations ? 'active_notification' : '']"
                class="cursor-pointer flex items-center justify-center border-[1px] 
                border-[#EAEAEA] dark:border-darkborder rounded-[8px] bg-[#FFFEFE] 
                dark:bg-tamkinDarkPrimary lg:w-[40px] w-[60px] h-[40px] ipad-max:w-[30px] ipad-max:h-[30px]">
                <div class="relative stroke-current dark:text-whiteTamkin text-darkGrey">
                  <div :class="[showNotifiations ? 'hidden' : '']"
                    class="absolute bottom-[10px] ltr:left-[5px] rtl:right-[5px] bg-[#FB726D] ipad-max:w-[14px] ipad-max:h-[14px] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                    <span class="ipad-max:text-[10px] text-[12px] font-[700] text-white" style="line-height: 68px">5</span>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 20 22" fill="none"
                    :class="[showNotifiations ? 'active_bell' : '']" class="ipad-max:h-[14px] ipad-max:w-[14px]" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M11.7295 20C11.5537 20.3031 11.3014 20.5547 10.9978 20.7295C10.6941 20.9044 10.3499 20.9965 9.99953 20.9965C9.64915 20.9965 9.30492 20.9044 9.0013 20.7295C8.69769 20.5547 8.44534 20.3031 8.26953 20"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
              <div class="flex items-center justify-center rtl:space-x-reverse lg:space-x-[18px] lg:pr-[37px]">
                <div class="lg:block hidden">
                  <img src="/assets//imgs/avatar.png" class="ipad-max:w-[30px] ipad-max:h-[30px] w-[40px] h-[40px]" />
                </div>
                <div class="lg:block hidden">
                  <h2 class="font-[400] ipad-max:text-[10px] text-[12px] dark:text-white whitespace-nowrap leading-[14.4px]" >
                    {{ userName }}
                  </h2>
                </div>
                <div class="lg:block hidden" @click="logout()">
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M0.000213623 10.9998C0.000256062 11.1975 0.0589275 11.3908 0.168812 11.5552C0.278696 11.7197 0.43486 11.8478 0.617559 11.9235C0.800259 11.9991 1.00129 12.0189 1.19524 11.9804C1.3892 11.9418 1.56736 11.8466 1.70721 11.7068L6.70721 6.70679C6.89468 6.51926 7 6.26495 7 5.99979C7 5.73462 6.89468 5.48031 6.70721 5.29279L1.70721 0.292787C1.56736 0.152978 1.3892 0.057771 1.19524 0.0192034C1.00129 -0.0193641 0.800259 0.000439122 0.617559 0.0761092C0.43486 0.151779 0.278696 0.279919 0.168812 0.444329C0.0589275 0.608738 0.000256062 0.802037 0.000213623 0.999787L0.000213623 10.9998Z"
                      class="dark:fill-white fill-[#585B5B]" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div class="pt-[85px] px-[20px] ipad-max:px-[20px] lg:px-[40px] relative">
          <div class="absolute left-0 right-0 w-full h-[270px] z-[-1] top-0" style="
                box-shadow: 0px 4px 24px 8px #51459f1a;
                background: linear-gradient(
                  180deg,
                  #fefefe 0%,
                  #eef5ff 47.07%,
                  #f6f3fc 72.04%,
                  #fef5f6 100%
                );
              " v-if="
                isLinkActive('/addons') ||
                isLinkActive('/statistics') ||
                isLinkActive('/overview') ||
                isLinkActive('/customize') ||
                isLinkActive('/settings')
              "></div>
          <div class="relative px-[15px]">
            <NavbarOverview v-if="
              isLinkActive('/overview') ||
              isLinkActive('/settings') ||
              isLinkActive('/addons') ||
              isLinkActive('/customize') ||
              isLinkActive('/addons') ||
              isLinkActive('/statistics')
            " />
          </div>



          <transition name="slide-up">
            <DashboardAddonsSaveFooter :show-footer="shouldShowFooter" @cancel_action="cancelAc" />
          </transition>
          <NuxtPage class="" />
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
