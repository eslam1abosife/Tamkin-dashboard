<script lang="ts" setup>
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
import "@cyhnkckali/vue3-color-picker/dist/style.css";
import { vOnClickOutside } from "@vueuse/components";

import { useCollapseStore } from "@/stores/collapse.js";
import { useCustomizeStore } from "@/stores/customize.js";
const langStore = useLangSwitch();
const collapseStore = useCollapseStore();
const customizeStore = useCustomizeStore();
const {
  colorMode,
  gradient1,
  gradient2,
  currentColor,
  buttonSizeSlider,
  buttonShapeSelector,
  force_change_MainMenuCard,
  force_change_profileCards,
  forceChange_buttonShape
} = storeToRefs(customizeStore);
definePageMeta({
  layout: "dashboard",
});

const changeGradientColor1 = computed(() => {
  return colorMode.value === "gradient" && gradient1.value && gradient2.value
    ? gradient1.value
    : currentColor.value;
});

const changeGradientColor2 = computed(() => {
  return colorMode.value === "gradient" && gradient1.value && gradient2.value
    ? gradient2.value
    : currentColor.value;
});
const gradientClasses = computed(() => {
  return colorMode.value === "gradient" && gradient1.value && gradient2.value
    ? "bg-gradient-to-b" // Tailwind utility for background gradient
    : ""; // No extra class if not gradient
});

const backgroundImageStyle = computed(() => {
  if (colorMode.value === "gradient" && gradient1.value && gradient2.value) {
    return {
      backgroundImage: `linear-gradient(to bottom, ${gradient1.value}, ${gradient2.value})`,
    };
  } else {
    return {
      backgroundColor: currentColor.value,
    };
  }
});
// const buttonShapeSelector = ref("type1");



const thumbStyle = computed(() => {
  const minSize = 50; // Min size of outer circle
  const maxSize = 65; // Max size of outer circle
  const size = minSize + ((maxSize - minSize) * (buttonSizeSlider.value - 2)) / (97 - 2); // Scaled size
  const position = langStore.direction === "rtl" ? "right" : "left";

  return {
    width: `${size}px`,
    height: `${size}px`,
    transform:
      langStore.direction === "rtl" ? `translate(50%, -50%)` : `translate(-50%, -50%)`,
    [position]: `${buttonSizeSlider.value}%`,
  };
});
const border_style = computed(() => {
  const minSize = 36; // Min size of outer circle
  const maxSize = 40; // Max size of outer circle
  const size = minSize + ((maxSize - minSize) * (buttonSizeSlider.value - 2)) / (98 - 2); // Scaled size

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${buttonSizeSlider.value}%`,
  };
});
const imgStyle = computed(() => {
  const minSize = 26; // Min size of inner icon
  const maxSize = 80; // Max size of inner icon
  const size = minSize + ((maxSize - minSize) * (buttonSizeSlider.value - 2)) / (98 - 2); // Scaled size

  return {
    width: `${size}px`,
    height: `${size}px`,
  };
});


onBeforeMount(() => {
  [
    "language",
"enable_live_site",
    "oversized_widget",
    "move_access",
    "3_column_layout_widget",
    "accessibility_profiles",
    "move_hide_accessibility",
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
    "enable_custom_trigger",
    "show_lang_selector",
    "media_player",
    "tamkin_player",
    "reading_mode",
    "text_align",
    "df_friendly",
"pause_animation",
  ].forEach((name) => {
    customizeStore.addCheckbox(name);
  });
  customizeStore.initializeCheckboxes([
      "media_player",
    "tamkin_player",
    "language",
"enable_live_site",
    "oversized_widget",
    "move_access",
    "3_column_layout_widget",
    "accessibility_profiles",
    "move_hide_accessibility",
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
    "enable_custom_trigger",
    "show_lang_selector",
     "df_friendly",
"pause_animation",
"text_align",
"reading_mode",
  ]);
  const buttonPositionCheck = customizeStore.buttonPositionDesktop !== 'top_left' || customizeStore.buttonPositionMobile !== 'top_left_mobile';
const forceChangeCheck = customizeStore.forceChange_buttonShape === true || customizeStore.force_change_profileCards === true ||
 customizeStore.force_change_MainMenuCard === true

const conditionMet = buttonPositionCheck || forceChangeCheck;

console.log(conditionMet);

// customizeStore.cancelAll()

});

const handleRangeChange = (event)=>{
      buttonSizeSlider.value = event.target.value;
   checkSliderValue();
    }

    const checkSliderValue = () =>{
      if (Number(buttonSizeSlider.value) > 3) {
       customizeStore.force_change_MainMenuCard = true;
      } else {
     customizeStore.force_change_MainMenuCard = false;
      }
    }

watch(currentColor, (ov, nv) => {
  // console.log(nv)

});
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
let pendingNavigation = null;

const detectUnsavedChanges = () => {
  
  return forceChange_buttonShape.value || force_change_profileCards.value || force_change_MainMenuCard.value ||
   currentColor.value !== "#2dada3" || gradient1.value !== "#2dada3" || gradient2.value !== "#2dada3" || customizeStore.hasChanges()

};

const handleSaveAndMove = () => {
  customizeStore.saveAndMove();
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const handleCancelLeave = () => {
  customizeStore.routeLeaveModal = false; // Close the modal
};

onBeforeRouteLeave((to, from, next) => {
  if (detectUnsavedChanges()) {
    customizeStore.showSaveBeforeLeaveModal();
    pendingNavigation = { next, to };
  } else {
    next(); // No unsaved changes, proceed normally
  }
});
</script>

<template>
  <div class="relative h-full w-full">
    <LazyModalsConfirm :showModal="customizeStore.routeLeaveModal" title="Save  your changes"
    sub-title="Do you want to save the changes before moving on?"
    confirm-btn-type="other" @control-other="handleSaveAndMove" cancelButtonName="Discard"
    :savetoAllSitesBtn="true"
    @control-cancel="handleSaveAndMove" />
    <div class="w-full h-full relative">
      <Headeraccess
        websiteImgName="tamkin_hand.svg"
        website-title="Tamkin.App"
        website-link="google.com"
        section-title="Customize"
        section-sub-title="Customization empowers users to shape their digital environment"
      />

      <div
        class="mt-[64px] md:mt-[94px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] shadow-md -shadow-y-[1px] relative"
        :class="[collapseStore.collapses.includes('button_color_card') ? 'pb-[24px]' :'pb-[0]']"

      >
        <div
          class="flex items-center justify-start px-[15px]"
        >
          <div class=" mt-[24px]">
            <h1 class="text-[18px] font-[500] leading-[30px]  dark:text-whiteTamkin">Button Color</h1>
            <p class="font-[400] text-[14px] leading-[22.95px] dark:text-whiteTamkin text-darkGrey mt-[10px]">
              Choose the appropriate color that you prefer to appear in the icons and
              buttons
            </p>
          </div>

          <div
            @click.stop="collapseStore.collapseMenu('button_color')"
            v-on-click-outside="() => collapseStore.removeMenu('button_color')"
            :class="[
              collapseStore.menus.includes('button_color')
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
                collapseStore.menus.includes('button_color')
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="collapseStore.menus.includes('button_color')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
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
                @click="collapseStore.collapseCard('button_color_card')"
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
                    !collapseStore.collapses.includes("button_color_card")
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
          class="flex flex-col items-start justify-center mt-[18px] pb-[16px] overflow-hidden"
          v-if="!collapseStore.collapses.includes('button_color_card')"
        >
          <div class="flex items-center justify-center lg:justify-between w-full lg:flex-nowrap flex-wrap lg:px-0 px-[15px] lg:space-y-0 space-y-[10px]">
            <div
              class="flex items-center justify-start lg:px-[15px] rtl:space-x-reverse space-x-[29px] w-full"
            >
              <div
                @click="customizeStore.colorMode = 'solid'"
                :class="[
                  customizeStore.colorMode === 'solid'
                    ? 'custom-border-tamkin padding-override-1'
                    : 'border-[1px]  dark:border-darkborder  rounded-[10px]',
                ]"
                class="flex items-center justify-start rtl:space-x-reverse space-x-[10px] w-[153px] h-[34px] px-[15px] cursor-pointer"
              >
                <div class="bg-[#585B5B] h-[24px] w-[24px] rounded-[5px]"></div>
                <div class="text-[14px] leading-[21px] font-[400] text-[#585B5B]  dark:text-whiteTamkin">
                  Solid
                </div>
              </div>

              <div
                :class="[
                  customizeStore.colorMode === 'gradient'
                    ? 'custom-border-tamkin padding-override-1'
                    : 'border-[1px] dark:border-darkborder  rounded-[10px]',
                ]"
                @click="customizeStore.colorMode = 'gradient'"
                class="flex items-center justify-start 
                
                rtl:space-x-reverse space-x-[10px] w-[153px] h-[34px] px-[15px] cursor-pointer"
              >
                <div
                  style="background: linear-gradient(180deg, #585b5b 0%, #bac1c0 100%)"
                  class="h-[24px] w-[24px] rounded-[5px]"
                ></div>
                <div class="text-[14px] leading-[21px] font-[400] text-[#585B5B]  dark:text-whiteTamkin">
                  Gradient
                </div>
              </div>
            </div>
            <div
              v-if="customizeStore.colorMode === 'solid'"
              :style="{ border: `1px solid ${customizeStore.currentColor}` }"
              class="lg:mx-[15px] rtl:mr-auto ltr:ml-auto flex items-center justify-start
               rtl:space-x-reverse space-x-[10px] w-full h-[34px] rounded-[10px] px-[15px] cursor-pointer"
            >
              <div
                class="h-[24px] w-[24px] rounded-full"
                :style="{ backgroundColor: customizeStore.currentColor }"
              ></div>
              <div class="text-[14px] leading-[21px] font-[400] text-[#585B5B]  dark:text-whiteTamkin">
                {{ customizeStore.currentColor }}
              </div>
            </div>

            <div
              v-if="customizeStore.colorMode === 'gradient'"
              class="flex items-center  justify-start
           
              border-[1px] border-tamkin w-full h-[34px] rounded-[10px] lg:mx-[15px] cursor-pointer"
            >
              <div
                class="flex items-center justify-center rtl:space-x-reverse space-x-[10px] px-[15px]"
              >
                <div
                  class="h-[24px] w-[24px] rounded-full"
                  :style="{ backgroundColor: customizeStore.gradient1 }"
                ></div>
                <div class="text-[14px] leading-[21px] font-[400] text-[#585B5B]  dark:text-whiteTamkin">
                  {{ customizeStore.gradient1 }}
                </div>
              </div>
              <div
                class="flex items-center justify-center rtl:space-x-reverse space-x-[10px] ml-[20%] lg:ml-[50%] pr-[15px]"
              >
                <div
                  class="h-[24px] w-[24px] rounded-full"
                  :style="{ backgroundColor: customizeStore.gradient2 }"
                ></div>
                <div class="text-[14px] leading-[21px] font-[400] text-[#585B5B]  dark:text-whiteTamkin">
                  {{ customizeStore.gradient2 }}
                </div>
              </div>
            </div>
          </div>
      
          <div
            class="flex items-center justify-start w-full px-[5px]"
            v-if="customizeStore.colorMode === 'solid'"
          >
            <Client-only>
              <Vue3ColorPicker
                v-model="customizeStore.currentColor"
                mode="solid"
                :showColorList="false"
                :showEyeDrop="false"
                :showAlpha="false"
                type="HEX"
                class="!h-[201px] !w-full !shadow-none !bg-transparent"
                :showInputMenu="false"
                :showInputSet="false"
                :showPickerMode="false"
              />
            </Client-only>
          </div>

          <div
            class="flex items-center justify-evenly w-full px-[5px]"
            v-if="customizeStore.colorMode === 'gradient'"
          >
            <div class="flex items-center justify-start w-full">
              <Client-only>
                <Vue3ColorPicker
                  v-model="customizeStore.gradient1"
                  mode="solid"
                  :showColorList="false"
                  :showEyeDrop="false"
                  :showAlpha="false"
                  type="HEX"
                  class="!h-[201px] !w-full !shadow-none !bg-transparent"
                  :showInputMenu="false"
                  :showInputSet="false"
                  :showPickerMode="false"
                />
              </Client-only>
            </div>
            <div class="flex items-center justify-start w-full">
              <Client-only>
                <Vue3ColorPicker
                  v-model="customizeStore.gradient2"
                  mode="solid"
                  :showColorList="false"
                  :showEyeDrop="false"
                  :showAlpha="false"
                  type="HEX"
                  class="!h-[201px] !w-full !shadow-none !bg-transparent"
                  :showInputMenu="false"
                  :showInputSet="false"
                  :showPickerMode="false"
                />
              </Client-only>
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] shadow-md  -shadow-y-[1px] relative" 
        :class="[collapseStore.collapses.includes('button_type_card') ? 'pb-[24px]' :'pb-[10px]']"
        
      >
        <div
          class="flex items-center justify-start  "
        >
          <div class="pt-[24px]">
            <h1 class="text-[18px] font-[500] leading-[30px]  dark:text-whiteTamkin">Button Type</h1>
            <p class="font-[400] text-[14px] leading-[22.95px] text-darkGrey  dark:text-whiteTamkin mt-[10px]">
              Choosing the right button type and size is essential for intuitive
              navigation
            </p>
          </div>

          <div
            @click.stop="collapseStore.collapseMenu('button_type')"
            v-on-click-outside="() => collapseStore.removeMenu('button_type')"
            :class="[
              collapseStore.menus.includes('button_type')
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
                collapseStore.menus.includes('button_type')
? 'stroke-current !text-white !fill-white' : 'dark:text-whiteTamkin',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="collapseStore.menus.includes('button_type')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
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
                @click="collapseStore.collapseCard('button_type_card')"
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
                    !collapseStore.collapses.includes("button_type_card")
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
          class="w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg overflow-hidden"
          v-if="!collapseStore.collapses.includes('button_type_card')"
        >
          <div>
            <h1 class="text-[14px] font-[500] leading-[24px]  dark:text-whiteTamkin">Button Shape</h1>
            <p class="font-[400] text-[12px] leading-[18.95px] text-darkGrey  dark:text-whiteTamkin mt-[10px]">
              Choose the button Shape you prefer to appear in the widget
            </p>
          </div>
          <div class="flex items-center justify-between mt-[40px]">
            <div
              class="cursor-pointer w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative"
              :class="[buttonShapeSelector === 'type1' ? 'bg-tamkinLight' : '']"
              @click="customizeStore.changeButtonShape('type1')"
            >
              <div v-if="buttonShapeSelector === 'type1'">
                <img 
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  
                />
              </div>
              <div class="">
                <div
                  class="w-[36px] h-[36px] rounded-full flex items-center justify-center"
                  :class="gradientClasses"
                  :style="backgroundImageStyle"
                >
                  <img 
                    src="/assets/imgs/icons/ios_access.svg"
                    
                    class="w-[26px] h-[26px]"
                  />
                </div>
              </div>
            </div>

            <div
              class="w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative cursor-pointer"
              :class="[buttonShapeSelector === 'type2' ? 'bg-tamkinLight' : '']"
              @click="customizeStore.changeButtonShape('type2')"
            >
              <div v-if="buttonShapeSelector === 'type2'">
                <img 
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  
                />
              </div>
              <div class="">
                <svg
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <!-- Define the gradient -->
                    <linearGradient id="gradient_3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop
                        offset="0%"
                        :stop-color="changeGradientColor1"
                        stop-opacity="1"
                      />
                      <stop
                        offset="100%"
                        :stop-color="changeGradientColor2"
                        stop-opacity="1"
                      />
                    </linearGradient>
                    <pattern
                      id="pattern0_3325_50634"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use xlink:href="#image0_3325_50634" transform="scale(0.01)" />
                    </pattern>
                    <image
                      id="image0_3325_50634"
                      width="100"
                      height="100"
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADCElEQVR4nO3cu2tUQRjG4TWoiZGoURMFiYgRA9p5AbUMCFapvCAaRAvBQhDUCIoKNgHFTrT0EjGo/4CNwQhiEyGxszB2avDSeEWIPxl3Njl7UzS7883ueR8YCKQ433zvBjKzcyaTERERERERERERERERkb8CuoAeYFdKRw+w1vyjAqwBHiM5w0CnVRgdwNupUiTnDbDCIpDbUyVIoVuhw5gNfCkqQ3I+ux6FDKR96tFSTlvIQOYA38qWIl+D/oX4UO6q72UNBg3DB7Ia+FC+ptR6D6wKHogPZT3wzLoDERkB1pmEkQhlFrAR6AUOp3T0AhtcL0zDEBERqQSgCWhN6WiK4lMENAJngFfW/29GYBw4Dcy1DGPIugsRemgSCnDBeuYRO2+xGHRfxEhpr4MuEoGlZQqRaUtCBjIf+Jl4uORzvWkOFogP5WlBETLtSdAwfCDbgclEEZLletIdPBAfyiF9c1j0TeFBkzASoaz0i8MB4F5Kx4BfFHaYhiEiIiJ1BNgMXPMnv0dSOoaBq8Am6zDOaQulaMvkrFUYe/JrkYSdFoE8T1YgeUZDh7Eg//lSQkvIQBaXqkDytAYLxIeigw3ljQcNwwdy7A8Fpd1Ri0AagDvWM4+Qe/eyIXggicMO+/3CaAL4mNIxATwC9ukEvIiIiMQHaPabln3AqSoP94zdwDzreUcJ2GZ0Xtg9c6v1/KPizsEC77B9t7zdug/RAE5i77h1H6IB3LBOA7hu3YdoAJes0wAuWvchGu5wgPHB7Ul3G4V1H6IC9BsG0m89/+j4neObBmEMmm2Xx47sxWgPAobh3iJutJ531ICWQFc+jQELredbE4A24EUVw3gJLLeeZ00BOqt0L7DbEeiynl9NInsx2qcKhuGutt1iPa+aBnQD3ysQxg9gh/V86gKwd4YLR3cI+oD1POoKM9uAPGFdf10CLv9HGFes665b/PtqXqvwiFbzQ1qFx7OaHwMWhapHMr9DWeYbX2jU/U5Nsrt48whw3w/3szYLRUREREREREREREQkk/ALzMLaTo60uEQAAAAASUVORK5CYII="
                    />
                  </defs>
                  <!-- Use the gradient in the rectangle fill -->
                  <rect x="0.5" width="36" height="36" rx="18" fill="url(#gradient_3)" />
                  <rect
                    x="5.5"
                    y="5"
                    width="26"
                    height="26"
                    fill="url(#pattern0_3325_50634)"
                  />
                </svg>
              </div>
            </div>

            <div
              :class="[buttonShapeSelector === 'type3' ? 'bg-tamkinLight' : '']"
              class="w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative cursor-pointer"
              @click="customizeStore.changeButtonShape('type3')"
            >
              <div v-if="buttonShapeSelector === 'type3'">
                <img 
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  
                />
              </div>
              <div class="">
                <svg
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <rect x="0.5" width="36" height="36" rx="18" fill="url(#gradient_5)" />
                  <rect
                    x="5.5"
                    y="5"
                    width="26"
                    height="26"
                    fill="url(#pattern0_3325_50636)"
                  />
                  <defs>
                    <linearGradient id="gradient_5" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop
                        offset="0%"
                        :stop-color="changeGradientColor1"
                        stop-opacity="1"
                      />
                      <stop
                        offset="100%"
                        :stop-color="changeGradientColor2"
                        stop-opacity="1"
                      />
                    </linearGradient>
                    <pattern
                      id="pattern0_3325_50636"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use xlink:href="#image0_3325_50636" transform="scale(0.01)" />
                    </pattern>
                    <image
                      id="image0_3325_50636"
                      width="100"
                      height="100"
                      xlink:href="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
            </div>

            <div
              :class="[buttonShapeSelector === 'type4' ? 'bg-tamkinLight' : '']"
              class="w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative cursor-pointer"
              @click.prevent="customizeStore.changeButtonShape('type4')"
            >
              <div v-if="buttonShapeSelector === 'type4'">
                <img 
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  
                />
              </div>
              <div class="">
                <svg
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <rect x="0.5" width="36" height="36" rx="18" fill="url(#gradient_6)" />
                  <rect
                    x="5.5"
                    y="5"
                    width="26"
                    height="26"
                    fill="url(#pattern0_3325_50638)"
                  />
                  <defs>
                    <linearGradient id="gradient_6" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop
                        offset="0%"
                        :stop-color="changeGradientColor1"
                        stop-opacity="1"
                      />
                      <stop
                        offset="100%"
                        :stop-color="changeGradientColor2"
                        stop-opacity="1"
                      />
                    </linearGradient>
                    <pattern
                      id="pattern0_3325_50638"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use xlink:href="#image0_3325_50638" transform="scale(0.01)" />
                    </pattern>
                    <image
                      id="image0_3325_50638"
                      width="100"
                      height="100"
                      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFRElEQVR4nO2dbagUZRSANcsSgoJu/fBaUZhoVJSF9CPrR35k2AdEEBFxybJrYSQUQtwfV0sUNILQvqDCun1JBVEREah93fxxpS/CMjPiRlmRJWVgmE+c7Sy7xM7szOzOnHdnzgPzZ97Zu+c9z8zu3Xfe98yECY7jlBDgKOAG4HVgD/At8BYwABxtHV+lAE4G3iOancCp1nFWAmAKMEZ7dgEnWMdbeoD7SM5663hLD/99VyTld2CydcylBTiN9JxvHXdpAS7MIGShddylBbggg5D51nGXFmBqBiHnWMddaoC9KWTsByZZx1xqgFUphDxsHW/pAU4C9iWQcQCYZh1vJQAWAIdiZBwGrreOs1IA84EfW8j4FbjWOr5KAhwPLAEeA54AlgEnWsflOEGN/M4CLtZtpuyzjqsyAMcBi4BNwG7gn4gv9K+AjcAV8hrruEsHcBEwAhwkPX8Cz8o4mHU/eh5gIfA+3UPuMvrYVsZh9lfJj1fkPXI5i8oGcDbwM/kj7zHLur9BA0wCPqc4PvPBx3ghV1M8i4s75XoMYK2BkLXW/Q4W4AUDIc9b9ztYgI8MhIxa9ztYaD16mzc/WPc75GGRIwZC5D19eKWFkBkxSfsNGNbxqzyYYXIW9sBdwCg26DG3kw8LrPsfHMDSmIQN6DGrcxJym3X/gwNYE5OwOXrMyzkJecC6/8EBPBfzpVtbVgB8kZOQEev+BwfwYUSyxrX9mDYzTTrhA+v+BwfwfUSy3tZ2uVWbFzXpTkPG5IjbscJDesx15Ie897EupCHkrJhkLdVjhsiX6S6kIWReTKLmtvnS7xaXu5CGkFtjEtWnx3ycs5AlLqQh5P6IJP3UtCY9y4yTNKx2IQ0hmyOStF3bzyR/NruQhpAtEUl6RNsXFyBkiwtpL2S5tt/bxcTLL/9xF5JNyDxtf6qLQuojxzKbsRm/QhIImartO7oo5E79m3J/xYWkuEIONLVLRQYXYixkVNv6uyjDr5AOhDzZtHTNhQQg5B5tu8uFhCHkSm171IWEIeQMbXvXhdgLOSjjV9r2iwuxF7JT9/fRffx3SAIhz7SadABcmiLRcr/9ZqlvklGIT7qOWYawRvffkkLIDn3N9IxCNuX2EdBrSJL+l5xh3T+YQshr+po5GYXcbZ2HkCvFDet+KZWRlMcTrsKKEnKedR6CAvi6QyG1O34yLTSDkN3W/Q8Omc5JZx9ZyxPW9W0lxKeSthDSB/zRwRVSq4+V4b8sqfRwSsHnX28ArNQkDWW4Qi7T17yYUMhQ85iZ01rIRPnokao+Ga6QWhEAYFtCITP1v7uJLiP5FbMshZBa4TItwt9WiJOvkEP1M11L/LkQYyHjTUsW2i0c9SukACFjKW73upAChLypx892IWEIeVqPnwt802a7Kc+YSw1wR0Ih66xjrQQkF7LCOtZKQHIhN1rHWglILsRXPwUm5NxCAqo6JBfio7UBCTnshSzDErKvqHgqD8mEfFr5RAUm5B0XEpaQERdiN1+rFQ+6kLCErHQhYQkZcCFhCVnkQsISMtuFhCWk34WEI+SIVKNzIeEI2e8ywhKyy4WEJWS7CwlLyEsupFghK9oI2ehCipNxutRcbCOktmzBKeahw5/QnlpNXyd/IYMk4xqXUUzZ8fUJ76VPcyHdSfolwCqtVj0KfKkPBPuLbPwtPxJ1+07n8MrfHNNtq9xZBN6Qig1aYWidLqEb1KXU/VV/3pQkYoM+hHibVq7eq0mNQ4ZL6smXxTn1SdR7mgTIJgLqm9RSkcd/10XISl2pwyWVIq7Sx4NPsc6L8C+XYvEV5QZLPgAAAABJRU5ErkJggg=="
                    />
                  </defs>
                </svg>
              </div>
            </div>

            <div
              :class="[buttonShapeSelector === 'type5' ? 'bg-tamkinLight' : '']"
              class="w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative cursor-pointer"
              @click.prevent="customizeStore.changeButtonShape('type5')"
            >
              <div v-if="buttonShapeSelector === 'type5'">
                <img 
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  
                />
              </div>
              <div class="">
                <svg
                  width="37"
                  height="36"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <rect x="0.5" width="36" height="36" rx="18" fill="url(#gradient1_6)" />
                  <rect
                    x="5.5"
                    y="5"
                    width="26"
                    height="26"
                    fill="url(#pattern0_3325_50640)"
                  />
                  <defs>
                    <linearGradient id="gradient1_6" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop
                        offset="0%"
                        :stop-color="changeGradientColor1"
                        stop-opacity="1"
                      />
                      <stop
                        offset="100%"
                        :stop-color="changeGradientColor2"
                        stop-opacity="1"
                      />
                    </linearGradient>
                    <pattern
                      id="pattern0_3325_50640"
                      patternContentUnits="objectBoundingBox"
                      width="1"
                      height="1"
                    >
                      <use xlink:href="#image0_3325_50640" transform="scale(0.01)" />
                    </pattern>
                    <image
                      id="image0_3325_50640"
                      width="100"
                      height="100"
                      xlink:href="data:image/png;base64,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"
                    />
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div class="my-[30px] ">
            <h1 class="text-[14px] font-[500] leading-[24px]  dark:text-whiteTamkin">Button Size</h1>
            <p class="font-[400] text-[12px] leading-[18.95px] text-darkGrey  dark:text-whiteTamkin mt-[10px]">
              Pull the button to select the right size for you
            </p>
          </div>
          <div class="w-full flex flex-col items-center space-y-4 px-[15px]">
            <div class="relative w-full mb-[34px]">
              <input
                type="range"
                min="2"
                max="98"
               @input="handleRangeChange"
                class="range_tamkin_customize w-full h-[20px] rounded-full shadow appearance-none bg-tamkinLight cursor-pointer"
              />
              <div
                class="absolute top-0 h-[20px] bg-[#2DADA3] rounded-full pointer-events-none"
                :class="{
                  'right-0': langStore.direction === 'rtl',
                  'left-0': langStore.direction !== 'rtl',
                }"
                :style="{ width: `${buttonSizeSlider}%` }"
              ></div>
              <div
                class="absolute
                shadow-sm shadow-tamkinLight
                shadow-spread-1 -shadow-y-[1px]  shadow-b-[1px]
                top-1/2 flex items-center justify-center bg-tamkinLight  rounded-full pointer-events-none transform -translate-y-1/2"
                :class="{
                  'flex-row-reverse': langStore.direction === 'rtl',
                  'flex-row': langStore.direction !== 'rtl',
                }"
                :style="thumbStyle"
              >
                <div
                  class="rounded-full flex items-center justify-center "
                  :class="gradientClasses"
                  :style="[border_style, backgroundImageStyle]"
                >
                  <img 
                    src="/assets/imgs/gradient_icons/drag.svg"
                    :style="imgStyle"
                    v-if="buttonShapeSelector === 'type2'"
                    
                  />
                  <img 
                    src="/assets/imgs/gradient_icons/type2.svg"
                    :style="imgStyle"
                    v-if="buttonShapeSelector === 'type3'"
                    
                  />
                  <img 
                    src="/assets/imgs/gradient_icons/type3.svg"
                    :style="imgStyle"
                    v-if="buttonShapeSelector === 'type4'"
                    
                  />
                  <img 
                    src="/assets/imgs/gradient_icons/type4.svg"
                    :style="imgStyle"
                    v-if="buttonShapeSelector === 'type5'"
                    
                  />
                  <img 
                    v-if="buttonShapeSelector === 'type1'"
                    src="/assets/imgs/icons/ios_access.svg"
                    
                    :style="imgStyle"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>

  <CustomizeLiveButtonTranslation/>

    
<CustomizeButtonLocation/>
      <div
        class="mt-[34px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] mb-[40px] shadow-md  -shadow-y-[1px] relative"
        
      >
        <div
          class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]"
        >
          <div>
            <h1 class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin ">Widget Customization</h1>

            <p class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B]  dark:text-whiteTamkin  pt-[6px]">
              Customize your widgets for a tailored browsing experience
            </p>
          </div>

          <div
            @click.stop="collapseStore.collapseMenu('widget_custom')"
            v-on-click-outside="() => collapseStore.removeMenu('widget_custom')"
            :class="[
              collapseStore.menus.includes('widget_custom')
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class=" menu_button_control"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                collapseStore.menus.includes('widget_custom')
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="collapseStore.menus.includes('widget_custom')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
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
                @click="collapseStore.collapseCard('widget_custom_card')"
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
                    !collapseStore.collapses.includes("widget_custom_card")
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

        <CustomizeWidgetCustomize
          v-if="!collapseStore.collapses.includes('widget_custom_card')"
        />

        
      </div>

      <div
        class="mt-[34px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] mb-[40px] shadow-md  -shadow-y-[1px] relative"
        
      >
        <div
          class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]"
        >
          <div>
            <h1 class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">Accessibility Mode</h1>

            <p class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin pt-[6px]">
              Accessibility Mode optimizes interface for diverse user needs and
              disabilities
            </p>
          </div>

          <div
            @click.stop="collapseStore.collapseMenu('access_mode')"
            v-on-click-outside="() => collapseStore.removeMenu('access_mode')"
            :class="[
              collapseStore.menus.includes('access_mode')
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class=" menu_button_control"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                collapseStore.menus.includes('access_mode')
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="collapseStore.menus.includes('access_mode')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
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
                @click="collapseStore.collapseCard('access_mode_card')"
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
                    !collapseStore.collapses.includes("access_mode_card")
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

        <CustomizeAccessibilityMode
          v-if="!collapseStore.collapses.includes('access_mode_card')"
        />

       
      </div>

      <CustomizeAdjustMainMenu />
      <CustomizeAccessibilityProfiles />
      <CustomizeWidgetType />
      <CustomizeLanguage />
      <CustomizeCustomTrigger />
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
.bg_interval_open {
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  @apply !text-white;

  &.tamkin {
    @apply rounded-[10px] h-[32px];
  }
}

/* Add custom styles here if needed */
.range_tamkin_customize::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 40px;
  height: 40px;
  background: transparent; /* Hide the default thumb */
  cursor: pointer;
}

.range_tamkin_customize::-moz-range-thumb {
  width: 40px;
  height: 40px;
  background: transparent; /* Hide the default thumb */
  cursor: pointer;
}
.svg_container_access_3 {
  @apply w-[40px] h-[40px];

  svg {
    @apply w-[40px] h-[30px];
  }
}
</style>
