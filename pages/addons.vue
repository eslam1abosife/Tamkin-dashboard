<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const checkboxStore = useAddonStore();
const collapseStore = useCollapseStore();
const { collapseMenu, collapseCard } = collapseStore;
const { menus } = storeToRefs(collapseStore);

definePageMeta({
  layout: "dashboard",
middleware:['auth','permissions'],

});
const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
const miniSizeLiveTranslation = ref(false);
const verticalView = ref(false);
const horizontalView = ref(true);
const annual_prices = ref(false);

const liveTransaltionSwitchToVerticalOrHorizontal = (directionVOrH: any) => {
  if (directionVOrH === "vertical") {
    verticalView.value = true;

    horizontalView.value = false;
  } else if (directionVOrH === "horizontal") {
    verticalView.value = false;

    horizontalView.value = true;
  }
  if (directionVOrH === "horizontal" && miniSizeLiveTranslation.value) {
    verticalView.value = false;

    horizontalView.value = true;
    miniSizeLiveTranslation.value = false;
  }
};
const {$toast } = useNuxtApp()
onMounted(()=>{
  // $toast('error',{hideIn:400000,type:'error'})
})
onBeforeMount(() => {
 


  [
    "tamkin_player",
    "media_player",
    "page_str",
    "screen_reader",
    "hide_images",
    "smart_contrast",
    "voice_navigation",
    "dictionary",
    "highlight_links",
    "line_height",
    "saturation",
    "bigger_text",
    "pause_animation",
    "tool_tip",
    "cursor",
    "text_spacing",
    "contrast_plus",
    "dyslexia",
    "ADHD",
    "congitive",
    "blind",
    "Seizure",
    "visuallyImpraired",
    "color_blind",
    "reading_mode",
    "text_align",
    "motor_active",
  ].forEach((name) => {
    checkboxStore.addCheckbox(name);
  });


  checkboxStore.initializeCheckboxes([
    "text_align",
    "tamkin_player",
    "reading_mode",
    "media_player",
    "page_str",
    "screen_reader",
    "hide_images",
    "smart_contrast",
    "voice_navigation",
    "dictionary",
    "highlight_links",
    "line_height",
    "saturation",
    "bigger_text",
    "pause_animation",
    "tool_tip",
    "cursor",
    "text_spacing",
    "contrast_plus",
    "dyslexia",
    "ADHD",
    "congitive",
    "blind",
    "Seizure",
    "visuallyImpraired",
    "color_blind",
    "motor_active",
  ]);
});



let pendingNavigation = null;

const detectUnsavedChanges = () => {
  return (
    (isLinkActive("/addons") && checkboxStore.hasChanges()) ||
    (isLinkActive("/addons") && checkboxStore.force_change_menuCards) ||
    (isLinkActive("/addons") && checkboxStore.force_change_profileCards)
  );
};

const handleSaveAndMove = () => {
  checkboxStore.saveAndMove();
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const handleCancelLeave = () => {
  checkboxStore.routeLeaveModal = false; // Close the modal
};

onBeforeRouteLeave((to, from, next) => {
  if (detectUnsavedChanges()) {
    checkboxStore.showSaveBeforeLeaveModal();
    pendingNavigation = { next, to };
  } else {
    next(); // No unsaved changes, proceed normally
  }
});

const shouldShowFooter = computed(() => {
  const isAddonsLinkActive =
    (isLinkActive("/addons") && checkboxStore.hasChanges()) ||
    (isLinkActive("/addons") && checkboxStore.force_change_menuCards) ||
    (isLinkActive("/addons") && checkboxStore.force_change_profileCards);

// alert(isAddonsLinkActive)
  return (
    isAddonsLinkActive 

  );
});

const cancelAc = () => {

  const isAddonsLinkActive =
    (isLinkActive("/addons") && checkboxStore.hasChanges()) ||
    (isLinkActive("/addons") && checkboxStore.force_change_menuCards) ||
    (isLinkActive("/addons") && checkboxStore.force_change_profileCards);


  // const translatePlayer =
  //   isLinkActive("/translate/video") && translateStore.hasChangesPlayer;

 

  if (isAddonsLinkActive) {
    checkboxStore.cancelAll();
  }

};
</script>

<template>
  <div class="relative h-full w-full">

    <transition name="slide-up">
      <DashboardAddonsSaveFooter
        :show-footer="shouldShowFooter"
       @cancel_action="cancelAc"
      />
    </transition>
    <LazyModalsConfirm
      :showModal="checkboxStore.routeLeaveModal"
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
        websiteImgName="tamkin_hand.svg"
        website-title="Tamkin.App"
        website-link="google.com"
        section-title="Addons"
        section-sub-title="Enable the Accessibility Services Addons to improve usability and enhance your
          experience."
      />

      <AddonsAdjustmain />
<AddonsProfilecards/>
      <div
        class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] mb-[80px] shadow-md -shadow-y-[1px] relative"
      >
        <div
          class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]"
        >
          <div>
            <h1
              class="text-[14px] xs:text-[12px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
            >
              Live Translation
            </h1>

            <p
              class="xs:text-[10px] text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin/90 pt-[6px]"
            >
              Live translation converts speech or text from one language to another
              instantly, facilitating real-time communication.
            </p>
          </div>

          <div
            @click.stop="collapseStore.collapseMenu('LiveTranslationAddons')"
            v-on-click-outside="() => collapseStore.removeMenu('LiveTranslationAddons')"
            :class="[
              menus.includes('LiveTranslationAddons')
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class="menu_button_control top-[21px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                menus.includes('LiveTranslationAddons')
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
              v-if="menus.includes('LiveTranslationAddons')"
              class="mini_SizeMenu divide-y"
            >
              <div class="mini_wrap" @click="annual_prices = !annual_prices">
                <div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5.5L5.5 9.9256V12.9824L12 8.55677L18.5 12.9824V9.9256L12 5.5ZM12 9.17966L7.75108 12.1087V14.7032L12 11.7742L16.2489 14.7032V12.1087L12 9.17966ZM12 12.3983L9.55195 14.0859V16.0286L12 14.3618L14.4481 16.0286V14.0859L12 12.3983ZM12 14.9834L9.55195 16.6502V18.5L12 16.8332L14.4481 18.5V16.6502L12 14.9834Z"
                      class="fill-[#585B5B] dark:fill-whiteTamkin"
                    />
                  </svg>
                </div>
                <div class="text_mini">
                  Convert to {{ annual_prices ? "Monthly" : "Annual" }}
                </div>
              </div>

              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('LiveTranslationAddonsCard')"
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
                    !collapseStore.collapses.includes("LiveTranslationAddonsCard")
                      ? "Minisize"
                      : "Maxsize"
                  }}
                </div>
              </div>

              <div
                class="mini_wrap"
                v-if="
                  verticalView &&
                  !collapseStore.collapses.includes('LiveTranslationAddonsCard')
                "
                @click="liveTransaltionSwitchToVerticalOrHorizontal('horizontal')"
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
                      d="M18.0714 18.5H6.92857C6.6823 18.5 6.44611 18.4022 6.27197 18.228C6.09783 18.0539 6 17.8177 6 17.5714V13.8571C6 13.6109 6.09783 13.3747 6.27197 13.2005C6.44611 13.0264 6.6823 12.9286 6.92857 12.9286H18.0714C18.3177 12.9286 18.5539 13.0264 18.728 13.2005C18.9022 13.3747 19 13.6109 19 13.8571V17.5714C19 17.8177 18.9022 18.0539 18.728 18.228C18.5539 18.4022 18.3177 18.5 18.0714 18.5ZM6.92857 13.8571H6.92764L6.92857 17.5714H18.0714V13.8571H6.92857ZM18.0714 11.0714H6.92857C6.6823 11.0714 6.44611 10.9736 6.27197 10.7995C6.09783 10.6253 6 10.3891 6 10.1429V6.42857C6 6.1823 6.09783 5.94611 6.27197 5.77197C6.44611 5.59783 6.6823 5.5 6.92857 5.5H18.0714C18.3177 5.5 18.5539 5.59783 18.728 5.77197C18.9022 5.94611 19 6.1823 19 6.42857V10.1429C19 10.3891 18.9022 10.6253 18.728 10.7995C18.5539 10.9736 18.3177 11.0714 18.0714 11.0714ZM6.92857 6.42857H6.92764L6.92857 10.1429H18.0714V6.42857H6.92857Z"
                      class="dark:fill-white fill-[#585B5B]"
                    />
                  </svg>
                </div>
                <div class="text_mini">Horizontal View</div>
              </div>
              <div
                class="mini_wrap"
                v-if="
                  horizontalView &&
                  !collapseStore.collapses.includes('LiveTranslationAddonsCard')
                "
                @click="liveTransaltionSwitchToVerticalOrHorizontal('vertical')"
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
                      d="M6 17.5714L6 6.42857C6 6.1823 6.09783 5.94611 6.27197 5.77197C6.44611 5.59783 6.6823 5.5 6.92857 5.5L10.6429 5.5C10.8891 5.5 11.1253 5.59783 11.2995 5.77197C11.4736 5.94611 11.5714 6.1823 11.5714 6.42857L11.5714 17.5714C11.5714 17.8177 11.4736 18.0539 11.2995 18.228C11.1253 18.4022 10.8891 18.5 10.6429 18.5H6.92857C6.6823 18.5 6.44611 18.4022 6.27197 18.228C6.09783 18.0539 6 17.8177 6 17.5714ZM10.6429 6.42857V6.42764L6.92857 6.42857L6.92857 17.5714H10.6429L10.6429 6.42857ZM13.4286 17.5714L13.4286 6.42857C13.4286 6.1823 13.5264 5.94611 13.7005 5.77197C13.8747 5.59783 14.1109 5.5 14.3571 5.5L18.0714 5.5C18.3177 5.5 18.5539 5.59783 18.728 5.77197C18.9022 5.94611 19 6.1823 19 6.42857V17.5714C19 17.8177 18.9022 18.0539 18.728 18.228C18.5539 18.4022 18.3177 18.5 18.0714 18.5H14.3571C14.1109 18.5 13.8747 18.4022 13.7005 18.228C13.5264 18.0539 13.4286 17.8177 13.4286 17.5714ZM18.0714 6.42857V6.42764L14.3571 6.42857L14.3571 17.5714H18.0714V6.42857Z"
                      class="fill-[#585B5B] dark:fill-white"
                    />
                  </svg>
                </div>
                <div class="text_mini">Vertical View</div>
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
                    <filter id="shadow-sm" x="0" y="-20%" width="140%" height="140%">
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
          class="flex items-center justify-center lg:justify-between lg:flex-nowrap flex-wrap lg:px-[25px] mt-[64px] w-full lg:space-y-0 space-y-10 md:space-y-0 md:space-x-10 md:flex-nowrap ipad-max:space-x-10 lg:space-x-24 2xl:space-x-44 md:px-[25px]"
          v-if="
            horizontalView &&
            !collapseStore.collapses.includes('LiveTranslationAddonsCard')
          "
        >
          <div
            class="w-full max-w-[270px] flex flex-col items-center justify-start h-[267px] relative custom-border rounded-big rounded-[19px] hover:bg-selected dark:hover:bg-p"
          >
            <div
              class="text-[14px] lg:text-[20px] font-[600] text-[#021328] dark:text-whiteTamkin mt-[48px]"
            >
              ${{ annual_prices ? 1200 : "100.00" }}
              <span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
            </div>
            <div
              class="text-[14px] font-[500] text-[#021328] dark:text-whiteTamkin mt-[12px]"
            >
              For 1 million characters
            </div>
            <div
              class="text-[13px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin mt-[12px]"
            >
              Almost 50 Page
            </div>
            <div class="w-full custom-border padding-override-1 mt-[4px]"></div>
            <div
              class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]"
            >
              <div>
                <img src="/assets/imgs/addons/live_icon.svg" class="w-[23px] h-[23px]" />
              </div>
              <div
                class="text-[12px] leading-[14.16px] font-[500] text-black dark:text-whiteTamkin"
              >
                Live translation
              </div>
            </div>
            <button
              class="btn_bordered_dashboard mt-[24px] !text-darkGrey dark:!text-whiteTamkin hover:!text-white"
            >
              Upgrade Now
            </button>
            <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
              <img src="/assets/imgs/addons/live_icon.svg" />
            </div>
          </div>

          <div
            class="w-full max-w-[270px] flex flex-col items-center justify-start h-[267px] relative custom-border rounded-big rounded-[19px] hover:bg-selected dark:hover:bg-p"
          >
            <div
              class="text-[14px] lg:text-[20px] font-[600] text-[#021328] dark:text-whiteTamkin mt-[48px]"
            >
              ${{ annual_prices ? 2400 : "200.00" }}
              <span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
            </div>
            <div
              class="text-[14px] font-[500] text-[#021328] dark:text-whiteTamkin mt-[12px]"
            >
              For 1 million characters
            </div>
            <div
              class="text-[13px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin mt-[12px]"
            >
              Almost 100 Page
            </div>
            <div class="w-full custom-border padding-override-1 mt-[4px]"></div>
            <div
              class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]"
            >
              <div>
                <img src="/assets/imgs/addons/live_icon.svg" class="w-[23px] h-[23px]" />
              </div>
              <div
                class="text-[12px] leading-[14.16px] font-[500] text-black dark:text-whiteTamkin"
              >
                Live translation
              </div>
            </div>
            <button class="btn-dashboard hover_tamkin mt-[24px] w-[140px]">Active</button>
            <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
              <img src="/assets/imgs/addons/live_icon.svg" />
            </div>
          </div>

          <div
            class="w-full max-w-[270px] flex flex-col items-center justify-start h-[267px] relative custom-border rounded-big rounded-[19px] hover:bg-selected dark:hover:bg-p"
          >
            <div
              class="text-[14px] lg:text-[20px] font-[600] text-[#021328] dark:text-whiteTamkin mt-[48px]"
            >
              ${{ annual_prices ? 3600 : "300.00" }}
              <span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
            </div>
            <div
              class="text-[14px] font-[500] text-[#021328] dark:text-whiteTamkin mt-[12px]"
            >
              For 2 million characters
            </div>
            <div
              class="text-[13px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin mt-[12px]"
            >
              Almost 500 Page
            </div>
            <div class="w-full custom-border padding-override-1 mt-[4px]"></div>
            <div
              class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]"
            >
              <div>
                <img src="/assets/imgs/addons/live_icon.svg" class="w-[23px] h-[23px]" />
              </div>
              <div
                class="text-[12px] leading-[14.16px] font-[500] text-black dark:text-whiteTamkin"
              >
                Live translation
              </div>
            </div>
            <button
              class="btn_bordered_dashboard mt-[24px] !text-darkGrey dark:!text-whiteTamkin hover:!text-white"
            >
              Upgrade Now
            </button>
            <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
              <img src="/assets/imgs/addons/live_icon.svg" />
            </div>
          </div>
        </div>

        <div
          class="flex items-center flex-col justify-center lg:justify-start mt-[56px] space-y-[24px] pb-[16px] px-[15px]"
          v-if="
            verticalView && !collapseStore.collapses.includes('LiveTranslationAddonsCard')
          "
        >
          <div
            class="flex items-center justify-start h-[77px] bg-selected dark:bg-p_secondary w-full relative custom-border rounded-big rounded-[19px]"
          >
            <div class="ltr:ml-[15px] rtl:mr-[15px]">
              <img src="/assets/imgs/addons/live_vertical.svg" />
            </div>

            <div class="flex flex-col items-start justify-center py-[14px] mx-[15px]">
              <div
                class="text-[14px] lg:text-[20px] font-[600] text-[#021328] dark:text-whiteTamkin"
              >
                ${{ annual_prices ? 1200 : "100.00"
                }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
              </div>
              <div
                class="text-[12px] lg:text-[14px] whitespace-nowrap font-[500] text-[#585B5B] dark:text-whiteTamkin/90"
              >
                For 1 million characters
              </div>
            </div>

            <button
              class="rtl:mr-auto ltr:ml-auto btn_bordered_dashboard lg:w-1/6 ipad-max:w-1/4 mt-[24px] md:w-1/4 w-2/4 hover:!text-white my-[19px] rtl:ml-[15px] ltr:mr-[15px] !p-1"
            >
              Upgrade Now
            </button>
          </div>

          <div
            class="flex items-center justify-start h-[77px] w-full bg-selected dark:bg-p_secondary relative custom-border rounded-big rounded-[19px]"
          >
            <div class="ltr:ml-[15px] rtl:mr-[15px]">
              <img src="/assets/imgs/addons/live_vertical.svg" />
            </div>

            <div class="flex flex-col items-start justify-center py-[14px] mx-[15px]">
              <div
                class="text-[14px] lg:text-[20px] font-[600] text-[#021328] dark:text-whiteTamkin"
              >
                ${{ annual_prices ? 2400 : "200.00"
                }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
              </div>
              <div
                class="text-[12px] lg:text-[14px] whitespace-nowrap font-[500] text-[#585B5B] dark:text-whiteTamkin/90"
              >
                For 1 million characters
              </div>
            </div>

            <button
              class="rtl:mr-auto ltr:ml-auto btn-dashboard hover_tamkin lg:w-1/6 ipad-max:w-1/4 mt-[24px] md:w-1/4 w-2/4 mt-[24px] my-[19px] rtl:ml-[15px] ltr:mr-[15px]"
            >
              Active
            </button>
          </div>

          <div
            class="flex items-center justify-start h-[77px] w-full bg-selected dark:bg-p_secondary relative custom-border rounded-big rounded-[19px]"
          >
            <div class="ltr:ml-[15px] rtl:mr-[15px]">
              <img src="/assets/imgs/addons/live_vertical.svg" />
            </div>

            <div
              class="flex flex-col items-start justify-center py-[14px] mx-[15px] relative"
            >
              <div
                class="text-[14px] lg:text-[20px] font-[600] text-[#021328] dark:text-whiteTamkin"
              >
                ${{ annual_prices ? 3600 : "300.00"
                }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
              </div>
              <div
                class="text-[12px] lg:text-[14px] whitespace-nowrap font-[500] text-[#585B5B] dark:text-whiteTamkin/90"
              >
                For 2 million characters
              </div>
            </div>
            <div class="absolute top-[2px] right-[0]">
              <img src="/assets/imgs/addons/start.svg" class="w-full h-full" />
            </div>
            <button
              class="rtl:mr-auto ltr:ml-auto btn_bordered_dashboard lg:w-1/6 ipad-max:w-1/4 mt-[24px] md:w-1/4 w-2/4 hover:!text-white my-[19px] rtl:ml-[15px] ltr:mr-[15px] !p-1"
            >
              Upgrade Now
            </button>
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
