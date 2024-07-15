<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
import { useModalStore } from "@/stores/modal";
import { useNavbarStore } from "@/stores/navbar";
import { useAddonStore } from "@/stores/addons.js";
import { useCustomizeStore } from "@/stores/customize.js";
import { useSettingsStore } from "@/stores/settings.js";
import { useStatsStore } from "@/stores/stats.js";

const statsStore = useStatsStore()

const checkboxStore = useAddonStore();
const custmizeStore = useCustomizeStore();
const settingsStore = useSettingsStore();
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
const modalStore = useModalStore();
const navStore = useNavbarStore();
const navStoreRef = storeToRefs(navStore);
const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
const {controlResetModal,controlDeleteModal} = useModalStore()

const {
  showShareModal,
  editPictureTeamModal,
  editPermissionsModal,
  inviteMemberModal,
  selectSiteModal,
  editUserModal,
  InviteMemberUpdateModal,
  showUpgradeModal,
  resetModal,
  deleteModal,
  transferModalStep1,
  transferStep2,
  
} = storeToRefs(modalStore);
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
const router = useRouter()
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

const shouldShowFooter = computed(() => {
  const isAddonsLinkActive = (isLinkActive("/addons") && checkboxStore.hasChanges()) || (isLinkActive('/addons') && 
  checkboxStore.force_change_menuCards) || (isLinkActive('/addons') && checkboxStore.force_change_profileCards);
  const isCustomizeLinkActive =      isLinkActive('/customize') &&  currentColor.value !== "#2dada3" || 
  isLinkActive('/customize') && gradient1.value !== "#2dada3" || isLinkActive('/customize') && gradient2.value !== "#2dada3"  || isLinkActive('/customize') && custmizeStore.hasChanges()

 
  
  const isSettingsLinkActive = isLinkActive("/settings") && settingsStore.hasChanges();
  const isStatsActive = isLinkActive("/statistics") && statsStore.google_enabled;

  // console.log('isAddonsLinkActive:', isAddonsLinkActive);
  // console.log('isCustomizeLinkActive:', isCustomizeLinkActive);
  // console.log('isSettingsLinkActive:', isSettingsLinkActive);

  return isAddonsLinkActive || isCustomizeLinkActive || isSettingsLinkActive || isStatsActive;
});

const cancelAc = () => {
  const isCustomizeLinkActive = isLinkActive("/customize") && (
    custmizeStore.forceChange_buttonShape ||
    force_change_profileCards.value ||
    force_change_MainMenuCard.value ||
    currentColor.value !== "#2dada3" ||
    gradient1.value !== "#2dada3" ||
    gradient2.value !== "#2dada3" ||
    custmizeStore.hasChanges()
  );
  const isAddonsLinkActive = (isLinkActive("/addons") && checkboxStore.hasChanges()) || (isLinkActive('/addons') && checkboxStore.force_change_menuCards) || (isLinkActive('/addons') && checkboxStore.force_change_profileCards);
  const isSettingsLinkActive = isLinkActive("/settings") && settingsStore.hasChanges();
  const isStatsActive = isLinkActive("/statistics") && statsStore.google_enabled;

  if (isCustomizeLinkActive) {
    custmizeStore.cancelAll();
  }

  if(isAddonsLinkActive){
    checkboxStore.cancelAll();

  }

  if(isSettingsLinkActive){
    settingsStore.cancelAll();

  }

  
  if(isStatsActive){
    statsStore.google_enabled = false

  }
};
const showConfirmModal = ref(false);
const confirmWithSaveFn = ()=>{
  if(isLinkActive(localePath('/addons'))){
    // checkboxStore.showSaveBeforeLeaveModal()
  }
}
const hasUnsavedChanges = () => {
    return (isLinkActive(localePath("/addons")) && checkboxStore.hasChanges()) || 
           (isLinkActive(localePath('/addons')) && (checkboxStore.force_change_menuCards || checkboxStore.force_change_profileCards)) ||
           (isLinkActive(localePath("/customize")) && (
              custmizeStore.forceChange_buttonShape ||
              force_change_profileCards.value ||
              force_change_MainMenuCard.value ||
              currentColor.value !== "#2dada3" ||
              gradient1.value !== "#2dada3" ||
              gradient2.value !== "#2dada3" ||
              custmizeStore.hasChanges()
            )) ||
           (isLinkActive(localePath("/settings")) && settingsStore.hasChanges());
  };

const saveModalBeforeLeave = computed(()=>{
  return isLinkActive(localePath('/addons')) ?  checkboxStore.routeLeaveModal :false
})


</script>

<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir" class="bg_dashboard">
    
  <div class="relative min-h-screen" :class="[!navStoreRef.sideBarOpen ? 'flex' : 'flex']">
    <div v-if="
      showShareModal ||
      editPictureTeamModal ||
      editPermissionsModal ||
      inviteMemberModal ||
      selectSiteModal ||
      editUserModal ||
      InviteMemberUpdateModal ||
      showUpgradeModal ||
      resetModal ||
      deleteModal ||
      transferModalStep1 ||
      transferStep2 || checkboxStore.routeLeaveModal  || custmizeStore.routeLeaveModal ||settingsStore.routeLeaveModal ||
       statsStore.routeLeaveModal || modalStore.showSuccessModalContact
    " class="absolute z-[999] bg-black bg-opacity-70 h-full w-full overflow-hidden"></div>

    <ModalsSuccessModal :show-modal="modalStore.showSuccessModalContact" title="Thanks for contact us" sub-title="We will contact you as soon as possible " icon="contact_success.svg"/>
    <DashboardTeamEditUserModal :showModal="editUserModal" />

    <DashboardEmbedShareModal :showModal="showShareModal" />
    <DashboardTeamEditTeamPictureModal :showModal="editPictureTeamModal" />
    <DashboardTeamInviteMember :showModal="inviteMemberModal " />
    <DashboardTeamInviteMemberUpdate :showModal="InviteMemberUpdateModal" />
    <DashboardMySiteSelectSiteModal :showModal="selectSiteModal" />

    <DashboardTeamEditUserPermissionsModal :showModal="editPermissionsModal" />

    <DashboardMySiteUpgradeModal :showModal="showUpgradeModal" />
    <LazyModalsConfirm :showModal="resetModal" title="Rest All Accessibility Settings"
      sub-title="Are you sure you want to reset all accessibility settings to their default values? This action cannot be undone and will overwrite any customized settings"
      confirm-btn-type="confirm" @control-confirm="modalStore.controlResetModal" @control-cancel="controlResetModal" />
    <LazyModalsConfirm :showModal="deleteModal" title="Delete your site"
      sub-title="Are you sure you want to delete your site, Tamkin.App? This action is irreversible and will permanently remove all your data and settings. You will also lose access to many features"
      confirm-btn-type="delete" @control-delete="modalStore.controlDeleteModal" @control-cancel="
controlDeleteModal" />

    <SettingsTransferModalStep1 :show-modal="transferModalStep1" />
    <SettingsTransferModalStep2 :show-modal="transferStep2" />

    <div
      class="lg:relative flex items-center justify-start flex-col bg-[#FFFEFE] 
      z-[100] border-t-0 border-b-0 border-r border-[1px] border-lightGrey w-full" 

      :class="[
        sideBarOpenMobile
          ? 'fixed inset-0 z-[9999] w-full h-screen '
          : 'hidden lg:flex',
        sideBarOpen ? 'max-w-[280px]' : 'max-w-[75px]',
      ]">
      
      <div
        class="h-full w-full relative "
       :class="[sideBarOpen ? 'mt-[8px]' : 'mt-[0]']">
        <div @click="toggleSidebar"  :class="[
          !sideBarOpen
            ? ' rotate-180 lg:!top-[133px] ltr:lg:left-[62px]'
            : 'top-[154px] rtl:lg:right-[94%] ltr:lg:left-[268px]',
        ]"
          class="!overflow-visible cursor-pointer close_sidebar_btn fixed  items-center justify-center 
          bg-white border-[1px] border-linecolor rounded-full w-[24px] h-[24px] group z-[150] lg:flex hidden">
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none"
            class="fill-tamkin group-hover:stroke-white group-hover:fill-white w-[8px] h-[10px]" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z" />
          </svg>
        </div>
        <DashboardNavbar :sideBarOpen="sideBarOpen" :mobileSidebar="sideBarOpenMobile"
          @toggleSidebarMobile="toggleSidebarMobile" @toggleSidebar="toggleSidebar" style="transform: translateZ(0);
          " />
      </div>
    </div>

    <div
      class="flex items-start lg:flex-row flex-col justify-center lg:justify-between relative w-full ">
      <!-- upper nav and content -->
      <div class="relative top-0 w-full">
        <nav style="box-shadow: 0px 4px 24px 8px #51459f14"
        class="fixed top-0 flex z-[60] items-center  justify-between w-full bg-[#FFFEFE] rtl:space-x-reverse px-[40px] h-[70px]">
     
        <div class="flex ipad-max:max-w-2xl  w-full" :class="[sideBarOpen ? 'lg:max-w-[82.5%]' : 'lg:max-w-[97%]']">
          <div class="flex items-center justify-between rtl:space-x-reverse space-x-[10px] lg:hidden" @click="toggleSidebarMobile" style="transform: translateZ(0);">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </div>
          <div class="flex-grow">
            <div class="py-[17px] search_input relative">
              <input type="text" class="input_dashboard_search w-full" v-model="search" placeholder="Search ..." />
              <div class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]">
                <img src="/assets/imgs/icons/search.svg" alt="" />
              </div>
              <div v-if="isSearchfilled" @click="clearInput" class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer">
                <img src="/assets/imgs/icons/clear_search.svg" alt="" />
              </div>
            </div>
          </div>
          <div class="flex items-center lg:justify-end justify-center lg:ml-auto space-x-[24px] lg:space-x-[43px] w-full" :class="[sideBarOpen ? 'lg:max-w-[50%]' : 'lg:max-w-[50%]']">
            <div @click="showNotifiations = !showNotifiations" :class="[showNotifiations ? 'active_notification' : '']"
              class="cursor-pointer flex items-center justify-center border-[1px] border-[#EAEAEA] rounded-[8px] bg-[#FFFEFE] w-[40px] h-[40px]">
              <div class="relative stroke-current text-darkGrey">
                <div :class="[showNotifiations ? 'hidden' : '']" class="absolute bottom-[10px] ltr:left-[5px] rtl:right-[5px] bg-[#FB726D] w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  <span class="text-[12px] font-[700] text-white" style="line-height: 68px">5</span>
                </div>
                <svg width="18" height="18" viewBox="0 0 20 22" fill="none" :class="[showNotifiations ? 'active_bell' : '']" class="" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 5.4087 15.3679 3.88258 14.2426 2.75736C13.1174 1.63214 11.5913 1 10 1C8.4087 1 6.88258 1.63214 5.75736 2.75736C4.63214 3.88258 4 5.4087 4 7C4 14 1 16 1 16H19C19 16 16 14 16 7Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M11.7295 20C11.5537 20.3031 11.3014 20.5547 10.9978 20.7295C10.6941 20.9044 10.3499 20.9965 9.99953 20.9965C9.64915 20.9965 9.30492 20.9044 9.0013 20.7295C8.69769 20.5547 8.44534 20.3031 8.26953 20" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
            <div class="flex items-center justify-center rtl:space-x-reverse lg:space-x-[18px] lg:pr-[37px]">
              <div class="lg:block hidden">
                <img src="/assets//imgs/avatar.png" class="w-[40px] h-[40px]" alt="" />
              </div>
              <div class="lg:block hidden">
                <h2 class="font-[400] text-[12px]" style="line-height: 14.4px">
                  Ali Ahmed
                </h2>
              </div>
              <div class="lg:block hidden">
                <img src="/assets/imgs/arrow.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      

        <div class="pt-[85px] lg:px-[40px] relative overflow-x-hidden ">
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

          <transition name="slide-up">
            <DashboardAddonsSaveFooter :show-footer="shouldShowFooter" @cancel_action="cancelAc" />
          </transition>
          <NuxtPage />
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
</style>
