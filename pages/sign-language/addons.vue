<script lang="ts" setup>
const signLangStore = useSignLangStore();


definePageMeta({
  layout: "dashboard",
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
    (isLinkActive("/sign-language/addons") && signLangStore.force_change_menuCards) ||
    (isLinkActive("/sign-language/addons") && signLangStore.force_change_profileCards)
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
    (isLinkActive("/sign-language/addons") && signLangStore.hasChanges()) ||
    (isLinkActive("/sign-language/addons") && signLangStore.force_change_menuCards) ||
    (isLinkActive("/sign-language/addons") && signLangStore.force_change_profileCards);

  return (
    isAddonsLinkActive
    
  
 
  );
});

const cancelAc = () => {

  const isAddonsLinkActive =
    (isLinkActive("/sign-language/addons") && signLangStore.hasChanges()) ||
    (isLinkActive("/sign-language/addons") && signLangStore.force_change_menuCards) ||
    (isLinkActive("/sign-language/addons") && signLangStore.force_change_profileCards);


    if (isAddonsLinkActive) {
      signLangStore.cancelAll();
  }
};
</script>

<template>
  <div class="relative h-full w-full">
    
    <LanguageServicesNavbar/>
    <transition name="slide-up">
      <DashboardAddonsSavefooter
        :show-footer="shouldShowFooter"
        @cancel_action="cancelAc"
      />
    </transition>
    <LazyModalsConfirm
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
      <Headeraccess
        websiteImgName="tamkin_hand.svg"
        website-title="Tamkin.App"
        website-link="google.com"
        section-title="Customize"
        section-sub-title="Customization empowers users to shape their digital environment"
      />

     <LanguageServicesAddons/>
<LanguageServicesNodata/>
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
