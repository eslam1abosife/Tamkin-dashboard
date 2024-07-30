<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import { useCollapseStore } from "@/stores/collapse.js";
import { useCustomizeStore } from "@/stores/customize.js";
import { useAddonStore } from "@/stores/addons.js";
import draggable from 'vuedraggable'
const custmizeStore = useCustomizeStore()
const checkboxStore = useAddonStore();
const {force_change_menuCards, 
  force_change_profileCards} = storeToRefs(checkboxStore)
const collapseStore = useCollapseStore();
const { collapseMenu, collapseCard } = collapseStore;
const { menus } = storeToRefs(collapseStore);
definePageMeta({
  layout: "dashboard",
});
const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
const miniSizeLiveTranslation = ref(false);
const verticalView = ref(false);
const horizontalView = ref(true);
const openResizeMenuLiveTranslataion = ref(false);
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

const isChecked = (name: string) => {
  const checkbox = checkboxStore.checkboxes.find((checkbox) => checkbox.name === name);
  return checkbox ? checkbox.value : false;
};

const toggleCheckbox = (name: string) => {
  checkboxStore.toggleCheckbox(name);
};

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

  const customArrayKey = 'AdjustMainMenuCards';
const initialOrderKey = 'initialCardsOrder';

// Initialize cards
checkboxStore.initializeCardsMenu([
  {
  icon:'tamkin_player.svg',
  name:'Tamkin Player',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'tamkin_player'
 },
 {
  icon:'media_player.svg',
  name:'Media Player',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'media_player'
 },
    {
  icon:'language sign.svg',
  name:'Screen Reader',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'screen_reader'
 },
 {
  icon:'page_str.svg',
  name:'Page Structure',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'page_str'
 },
 
 {
  icon:'hide_images.svg',
  name:'Hide Images',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'hide_images'
 },
 {
  icon:'contrast.svg',
  name:'Smart Contrast',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'smart_contrast'
 },
 {
  icon:'voice_navigation.svg',
  name:'Voice Navigation',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'voice_navigation'
 },
 {
  icon:'a-z.svg',
  name:'Dictionary',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'dictionary'
 },
 {
  icon:'clip.svg',
  name:'Highlight Links',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'highlight_links'
 },
 {
  icon:'line_height.svg',
  name:'Line Height',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'line_height'
 },
 {
  icon:'saturation.svg',
  name:'Saturation',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'saturation'
 },

 {
  icon:'text.svg',
  name:'Bigger Text',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'bigger_text'
 },
 {
  icon:'df_friendly.svg',
  name:'Dyslexia Friendly',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'df_friendly'
 },
 {
  icon:'pause.svg',
  name:'Pause Animation',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'pause_animation'
 },
 {
  icon:'text_align.svg',
  name:'Text Align',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'text_align'
 },
 {
  icon:'reading_mode.svg',
  name:'Reading Mode',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'reading_mode'
 },
 {
  icon:'tooltip.svg',
  name:'Tooltip',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'tool_tip'
 },
 {
  icon:'cursor.svg',
  name:'Cursor',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'cursor'
 },
 {
  icon:'text_spacing.svg',
  name:'Text Spacing',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'text_spacing'
 },

 {
  icon:'contrast_plus.svg',
  name:'Contrast +',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'contrast_plus'
 },
  ], 'AdjustMainMenuCards', 'initialCardsOrder');

  // Initialize cards
checkboxStore.initializeCardsMenu([
 {
  icon:'monitor_im.svg',
  name:'Motor impaired',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'motor_active'
 },
 {
  icon:'color_blind.svg',
  name:'Color blind',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'color_blind'
 },
 {
  icon:'vis_impaired.svg',
  name:'Visually-impaired',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'hide_images'
 },
 {
  icon:'seizure.svg',
  name:'Seizure & Epileptic',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'Seizure'
 },
 {
  icon:'blind.svg',
  name:'Blind',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'blind'
 },
 {
  icon:'df.svg',
  name:'Dyslexia',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'dyslexia'
 },
 {
  icon:'congitive.svg',
  name:'Congitive & Learning',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'congitive'
 },
 {
  icon:'adhd.svg',
  name:'ADHD',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'ADHD'
 },


  ], 'manageProfileCards', 'initialManageProfileCards');

});

const getImagePath = (icon) => {
  return new URL(`/public/assets/imgs/addons/${icon}`, import.meta.url).href;
};

let pendingNavigation = null;

const detectUnsavedChanges = () => {
  return (isLinkActive("/addons") && checkboxStore.hasChanges()) || 
         (isLinkActive('/addons') && checkboxStore.force_change_menuCards) || 
         (isLinkActive('/addons') && checkboxStore.force_change_profileCards);
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
</script>

<template>
  <div class="relative h-full w-full">
    <LazyModalsConfirm :showModal="checkboxStore.routeLeaveModal" title="Save  your changes"
    sub-title="Do you want to save the changes before moving on?"
    confirm-btn-type="other" @control-other="handleSaveAndMove" cancelButtonName="Discard"
    :savetoAllSitesBtn="true"
    @control-cancel="handleSaveAndMove" />
    <div class="w-full h-full relative">
      <Headeraccess 
      websiteImgName="tamkin_hand.svg"
      website-title="Tamkin.App"
      website-link="google.com"
      section-title="Addons" 
      section-sub-title="Enable the Accessibility Services Addons to improve usability and enhance your
          experience."/>
     
      <div class="mt-[64px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] xs:px-0 px-[15px] pb-[24px] shadow-md -shadow-y-[1px] relative">
        <div class="flex items-center justify-start  pt-[24px] xs:px-[15px]">
          <div>
            <h1 class="text-[14px] xs:text-[12px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin ">Adjust the Main Menu</h1>
          </div>

          <div
            @click.stop="collapseMenu('adjustMenu')"
            v-on-click-outside="() => collapseStore.removeMenu('adjustMenu')"
            :class="[
              menus.includes('adjustMenu') ? 'active_notification !text-darkGrey' : '',
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
                menus.includes('adjustMenu')
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="menus.includes('adjustMenu')"
              class="mini_SizeMenu shadow divide-y divide-darkGrey"
            >
            <div
            class="mini_wrap"
          >
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
              Switch To Annual
            </div>
          </div>
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('adjustMenu')"
              >
                <div>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                
                  >
                    <path d="M13.7754 10.937L18.4995 7"   class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <div class="text_mini">
                  {{
                    !collapseStore.collapses.includes("adjustMenu")
                      ? "Minisize"
                      : "Maxsize"
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
          class="flex flex-col items-start justify-center  mt-[18px] divide-y pb-[16px]"
          v-if="!collapseStore.collapses.includes('adjustMenu')"
        >
    
        <draggable
        
        v-model="checkboxStore.AdjustMainMenuCards"
        @change="checkboxStore.onDragChange('AdjustMainMenuCards', 'initialCardsOrder')"
        @start="checkboxStore.onDragStart('initialCardsOrder')"
        @end="checkboxStore.onDragEnd('AdjustMainMenuCards', 'initialCardsOrder')"
        item-key="name" class="w-full"  handle=".handle">
          <template #item="{element}" >
          <div  
            class="h-[55px] bg-[#FAFCFE] p-[6px] flex items-center justify-start w-full mt-[4px] dark:bg-darkborder dark:bg-opacity-20"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse xs:space-x-[4px] space-x-[13px] w-full">
              <img 
                src="/assets/imgs/addons/left_item.svg"
                
                :class="[!isChecked(element.checkboxId) ? 'opacity-60' : '']"
                class="cursor-pointer handle w-[8px] h-[20px] lg:w-[11px] lg:h-[25px]"
              />

              <img 
                :src="getImagePath(element.icon)"
                class="lg:w-[45px] lg:h-[46px] w-[30px] h-[30px]"
                :class="[!isChecked(element.checkboxId) ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked(element.checkboxId) ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F]  dark:text-whiteTamkin font-[500] text-[12px] lg:text-[14px] leading-[8px] 
                lg:leading-[16.39px]">
                  <span>{{element.name}}</span>
                </div>
                <div
                  class="text-[#585B5B] truncate whitespace-nowrap w-40
                  
                  dark:text-whiteTamkin/80 font-[500] text-[10px] lg:text-[12px] leading-[8px] lg:leading-[13.66px] mt-[8px]"
                >
                  <span>
                 {{ element.description }}
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  :for="element.checkboxId"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    :id="element.checkboxId"
                    class="sr-only"
                    :checked="isChecked(element.checkboxId)"
                    @change="toggleCheckbox(element.checkboxId)"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked(element.checkboxId)
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked(element.checkboxId) }"
                    >
                      <img 
                        v-if="isChecked(element.checkboxId)"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        
                      />
                      <img 
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </template>
          </draggable>
</div>
  
<div v-else class="text-[14px] leading-[24px] font-[400] text-[#585B5B] pt-[6px] dark:text-whiteTamkin ">
  Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est veritatis dolore. Exercitationem et omnis ea quidem

</div>
     

        
      
      </div>

      <div class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary 
      rounded-[10px] xs:px-0 px-[15px] pb-[24px] shadow-md -shadow-y-[1px] relative" >
        <div class="flex items-center justify-start pt-[24px] ">
          <div>
            <h1 class="xs:text-[12px] text-[14px] lg:text-[18px] font-[500] leading-[30px]  dark:text-whiteTamkin">
              Manage your Accessibility Profiles
            </h1>
          </div>
          <div
            @click.stop="collapseStore.collapseMenu('ManageMenu')"
            v-on-click-outside="() => collapseStore.removeMenu('ManageMenu')"

            :class="[
              menus.includes('ManageMenu') ? 'active_notification !text-darkGrey' : '',
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
                menus.includes('ManageMenu')
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="menus.includes('ManageMenu')"
              class="mini_SizeMenu divide-y"
            >
            <div
            class="mini_wrap"
          >
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
              Switch To Annual
            </div>
          </div>
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('ManageCard')"
              >
                <div>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                
                  >
                    <path d="M13.7754 10.937L18.4995 7"   class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                </div>
                <div class="text_mini">
                  {{
                    !collapseStore.collapses.includes("ManageCard")
                      ? "Minisize"
                      : "Maxsize"
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
          class="flex flex-col items-start justify-center pb-[16px] mt-[18px] divide-y"
          v-if="!collapseStore.collapses.includes('ManageCard')"
        >
     
        <draggable
        
        v-model="checkboxStore.manageProfileCards"
        @change="checkboxStore.onDragChange('manageProfileCards', 'initialManageProfileCards')"
        @start="checkboxStore.onDragStart('initialManageProfileCards')"
        @end="checkboxStore.onDragEnd('manageProfileCards', 'initialManageProfileCards')"
        item-key="name" class="w-full"  handle=".handle">
          <template #item="{element}" >
          <div  
            class="h-[55px] bg-[#FAFCFE] p-[6px] flex items-center justify-start w-full mt-[4px] dark:bg-darkborder 
            dark:bg-opacity-20"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse xs:space-x-[4px] space-x-[13px] w-full">
              <img 
                src="/assets/imgs/addons/left_item.svg"
                
                :class="[!isChecked(element.checkboxId) ? 'opacity-60' : '']"
                class="cursor-pointer handle w-[8px] h-[20px] lg:w-[11px] lg:h-[25px]"
              />

              <img 
                :src="getImagePath(element.icon)"
                      class="lg:w-[45px] lg:h-[46px] w-[30px] h-[30px]"
                :class="[!isChecked(element.checkboxId) ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked(element.checkboxId) ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F]  dark:text-whiteTamkin font-[500] text-[12px] lg:text-[14px] leading-[8px] 
                lg:leading-[16.39px]">
                  <span>{{element.name}}</span>
                </div>
                <div
                  class="text-[#585B5B] truncate whitespace-nowrap w-40
                  
                  dark:text-whiteTamkin/80 font-[500] text-[10px] lg:text-[12px] leading-[8px] lg:leading-[13.66px] mt-[8px]"
                >
                  <span>
                 {{ element.description }}
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  :for="element.checkboxId"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    :id="element.checkboxId"
                    class="sr-only"
                    :checked="isChecked(element.checkboxId)"
                    @change="toggleCheckbox(element.checkboxId)"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked(element.checkboxId)
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked(element.checkboxId) }"
                    >
                      <img 
                        v-if="isChecked(element.checkboxId)"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        
                      />
                      <img 
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </template>
          </draggable>
        </div>

        <div v-else class="text-[14px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]">
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est veritatis dolore. Exercitationem et omnis ea quidem
 
        </div>
      
      </div>

      <div class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] mb-[80px]
       shadow-md -shadow-y-[1px] relative">
        <div class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]">
          <div>
            <h1 class="text-[14px] xs:text-[12px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">Live Translation</h1>

            <p class="xs:text-[10px] text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin/90 pt-[6px]">
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
            class="menu_button_control top-[21px] "
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                menus.includes('LiveTranslationAddons')
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
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
              <div
                class="mini_wrap"
                @click="annual_prices = !annual_prices"
              >
                <div>
                  <img 
                    src="/assets/imgs/addons/annual_convert.svg"
                    
                    :class="[
                      menus.includes('LiveTranslationAddons') ? '!fill-white' : '',
                    ]"
                  />
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
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                
                  >
                    <path d="M13.7754 10.937L18.4995 7"   class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
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
                v-if="verticalView && !collapseStore.collapses.includes('LiveTranslationAddonsCard')"
                @click="liveTransaltionSwitchToVerticalOrHorizontal('horizontal')"
              >
                <div>
                  <img 
                    src="/assets/imgs/addons/horizontal_view.svg"
                    
                    :class="[openResizeMenuLiveTranslataion ? '!fill-white' : '']"
                  />
                </div>
                <div class="text_mini">Horizontal View</div>
              </div>
              <div
                class="mini_wrap"
                v-if="horizontalView && !collapseStore.collapses.includes('LiveTranslationAddonsCard')"
                @click="liveTransaltionSwitchToVerticalOrHorizontal('vertical')"
              >
                <div>
                  <img 
                    src="/assets/imgs/addons/vertical_view.svg"
                    
                    :class="[openResizeMenuLiveTranslataion ? '!fill-white' : '']"
                  />
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
        class="flex items-center justify-center lg:flex-nowrap 
        flex-wrap lg:px-[25px] mt-[64px] w-full lg:space-y-0 space-y-10 ipad-max:space-x-10 lg:space-x-44"
        v-if="
          horizontalView &&
          !collapseStore.collapses.includes('LiveTranslationAddonsCard')
        "
      >
        <div
          class="w-full max-w-[270px] flex flex-col items-center justify-start h-[267px] 
          relative custom-border rounded-big rounded-[19px] hover:bg-selected dark:hover:bg-p"
        >
          <div class="text-[14px] lg:text-[20px] font-[600] text-[#021328] dark:text-whiteTamkin mt-[48px]">
            ${{ annual_prices ? 1200 : "100.00" }}
            <span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
          </div>
          <div class="text-[14px] font-[500] text-[#021328] dark:text-whiteTamkin mt-[12px]">
            For 1 million characters
          </div>
          <div class="text-[13px] font-[500] text-[#A7A7A7] dark:text-whiteTamkin mt-[12px]">
            Almost 50 Page
          </div>
          <div class="w-full custom-border padding-override-1 mt-[4px]"></div>
          <div class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]">
            <div>
              <img  src="/assets/imgs/addons/live_icon.svg" class="w-[23px] h-[23px]"  />
            </div>
            <div class="text-[12px] leading-[14.16px] font-[500] text-black dark:text-whiteTamkin">Live translation</div>
          </div>
          <button class="btn_bordered_dashboard mt-[24px] !text-darkGrey dark:!text-whiteTamkin hover:!text-white">Upgrade Now</button>
          <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
            <img  src="/assets/imgs/addons/live_icon.svg"  />
          </div>
        </div>
      
        <div
          class="w-full max-w-[270px] flex flex-col items-center  justify-start h-[267px] relative custom-border 
          rounded-big rounded-[19px] hover:bg-selected dark:hover:bg-p"
        >
          <div class="text-[14px] lg:text-[20px] font-[600] text-[#021328] dark:text-whiteTamkin mt-[48px]">
            ${{ annual_prices ? 2400 : "200.00" }}
            <span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
          </div>
          <div class="text-[14px] font-[500] text-[#021328]  dark:text-whiteTamkin mt-[12px]">
            For 1 million characters
          </div>
          <div class="text-[13px] font-[500] text-[#A7A7A7]  dark:text-whiteTamkin mt-[12px]">
            Almost 100 Page
          </div>
          <div class="w-full custom-border padding-override-1 mt-[4px]"></div>
          <div class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]">
            <div>
              <img  src="/assets/imgs/addons/live_icon.svg" class="w-[23px] h-[23px]"  />
            </div>
            <div class="text-[12px] leading-[14.16px] font-[500] text-black  dark:text-whiteTamkin">Live translation</div>
          </div>
          <button class="btn-dashboard hover_tamkin mt-[24px] w-[140px]">Active</button>
          <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
            <img  src="/assets/imgs/addons/live_icon.svg"  />
          </div>
        </div>
      
        <div
          class="w-full max-w-[270px] flex flex-col items-center justify-start h-[267px] relative
           custom-border rounded-big rounded-[19px] hover:bg-selected dark:hover:bg-p"
        >
          <div class="text-[14px] lg:text-[20px] font-[600] text-[#021328]  dark:text-whiteTamkin mt-[48px]">
            ${{ annual_prices ? 3600 : "300.00" }}
            <span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
          </div>
          <div class="text-[14px] font-[500] text-[#021328]  dark:text-whiteTamkin mt-[12px]">
            For 2 million characters
          </div>
          <div class="text-[13px] font-[500] text-[#A7A7A7]  dark:text-whiteTamkin mt-[12px]">
            Almost 500 Page
          </div>
          <div class="w-full custom-border padding-override-1 mt-[4px]"></div>
          <div class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]">
            <div>
              <img  src="/assets/imgs/addons/live_icon.svg" class="w-[23px] h-[23px]"  />
            </div>
            <div class="text-[12px] leading-[14.16px] font-[500] text-black  dark:text-whiteTamkin">Live translation</div>
          </div>
          <button class="btn_bordered_dashboard mt-[24px] !text-darkGrey dark:!text-whiteTamkin hover:!text-white">Upgrade Now</button>
          <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
            <img  src="/assets/imgs/addons/live_icon.svg"  />
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
            style="
              background: linear-gradient(
                180deg,
                #fefefe 0%,
                #eef5ff 47.07%,
                #f6f3fc 72.04%,
                #fef5f6 100%
              );
            "
            class="flex items-center  justify-start h-[77px] w-full relative custom-border rounded-big rounded-[19px]"
          >
            <div class="ltr:ml-[15px] rtl:mr-[15px]">
              <img  src="/assets/imgs/addons/live_vertical.svg"  />
            </div>

            <div class="flex flex-col items-start justify-center py-[14px] mx-[15px]">
              <div class="text-[14px] lg:text-[20px] font-[600] text-[#021328]">
                ${{ annual_prices ? 1200 : "100.00"
                }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
              </div>
              <div class="text-[12px] lg:text-[14px] whitespace-nowrap font-[500] text-[#585B5B]">
                For 1 million characters
              </div>
            </div>

            <button
              class="rtl:mr-auto ltr:ml-auto btn_bordered_dashboard lg:w-auto w-2/4  mt-[24px] 
              !text-darkGrey hover:!text-white my-[19px] rtl:ml-[15px] ltr:mr-[15px]"
            >
              Upgrade Now
            </button>
          </div>

          <div
            style="
              background: linear-gradient(
                180deg,
                #fefefe 0%,
                #eef5ff 47.07%,
                #f6f3fc 72.04%,
                #fef5f6 100%
              );
            "
            class="flex items-center justify-start h-[77px] w-full relative custom-border rounded-big rounded-[19px]   "
          >
            <div class="ltr:ml-[15px] rtl:mr-[15px]">
              <img  src="/assets/imgs/addons/live_vertical.svg"  />
            </div>

            <div class="flex flex-col items-start justify-center py-[14px] mx-[15px] ">
              <div class="text-[14px] lg:text-[20px] font-[600] text-[#021328]">
                ${{ annual_prices ? 2400 : "200.00"
                }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
              </div>
              <div class="text-[12px] lg:text-[14px] whitespace-nowrap font-[500] text-[#585B5B]">
                For 1 million characters
              </div>
            </div>

            <button
              class="rtl:mr-auto ltr:ml-auto btn-dashboard hover_tamkin lg:w-[140px] w-2/4
                mt-[24px] my-[19px] rtl:ml-[15px] ltr:mr-[15px]"
            >
              Active
            </button>
          </div>

          <div
            style="
              background: linear-gradient(
                180deg,
                #fefefe 0%,
                #eef5ff 47.07%,
                #f6f3fc 72.04%,
                #fef5f6 100%
              );
            "
            class="flex items-center justify-start h-[77px] w-full relative custom-border rounded-big rounded-[19px]"
          >
            <div class="ltr:ml-[15px] rtl:mr-[15px]">
              <img  src="/assets/imgs/addons/live_vertical.svg"  />
            </div>

            <div class="flex flex-col items-start justify-center py-[14px] mx-[15px] relative">
              <div class="text-[14px] lg:text-[20px] font-[600] text-[#021328]">
                ${{ annual_prices ? 3600 : "300.00"
                }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
              </div>
              <div class="text-[12px] lg:text-[14px] whitespace-nowrap font-[500] text-[#585B5B]">
                For 2 million characters
              </div>
            </div>
            <div class="absolute top-[2px] right-[0]">
              <img  src="/assets/imgs/addons/start.svg"  class="w-full h-full"/>
            </div>
            <button
               class="rtl:mr-auto ltr:ml-auto btn_bordered_dashboard lg:w-auto w-2/4  mt-[24px] 
              !text-darkGrey !p-1 hover:!text-white my-[19px] rtl:ml-[15px] ltr:mr-[15px]"
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
