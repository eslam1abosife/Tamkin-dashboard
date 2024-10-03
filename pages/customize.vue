<script lang="ts" setup>
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
import "@cyhnkckali/vue3-color-picker/dist/style.css";
import { vOnClickOutside } from "@vueuse/components";

import { useCollapseStore } from "@/stores/collapse.js";
import { useCustomizeStore } from "@/stores/customize.js";
import { useGetAccessaility } from "@/composables/useAccessibility";

const { getAccessability } = useGetAccessaility();

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
  selectedIcon,
  force_change_MainMenuCard,
  force_change_profileCards,
  forceChange_buttonShape,
  buttonIcons,
} = storeToRefs(customizeStore);

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
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

const thumbStyle = computed(() => {
  // const minSize = 50; // Min size of outer circle
  // const maxSize = 65; // Max size of outer circle
  const size = buttonSizeSlider.value;
  // minSize + ((maxSize - minSize) * (buttonSizeSlider.value - 2)) / (97 - 2); // Scaled size
  const position = langStore.direction === "rtl" ? "right" : "left";

  return {
    width: `${size}px`,
    height: `${size}px`,
    transform:
      langStore.direction === "rtl"
        ? `translate(50%, -50%)`
        : `translate(-50%, -50%)`,
    [position]: `${buttonSizeSlider.value}%`,
  };
});
const border_style = computed(() => {
  // const minSize = 36; // Min size of outer circle
  // const maxSize = 40; // Max size of outer circle
  // const size =
  //   minSize + ((maxSize - minSize) * (buttonSizeSlider.value - 2)) / (98 - 2); // Scaled size

  return {
    width: `${buttonSizeSlider.value}px`,
    height: `${buttonSizeSlider.value}px`,
    left: `${buttonSizeSlider.value}%`,
  };
});
const imgStyle = computed(() => {
  const minSize = 26; // Min size of inner icon
  const maxSize = 80; // Max size of inner icon
  const size = buttonSizeSlider.value;
  // minSize + ((maxSize - minSize) * (buttonSizeSlider.value - 2)) / (98 - 2); // Scaled size

  return {
    width: `${size}px`,
    height: `${size}px`,
  };
});

onBeforeMount(() => {
  getAccessability();
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
  const buttonPositionCheck =
    customizeStore.buttonPositionDesktop !== "top_left" ||
    customizeStore.buttonPositionMobile !== "top_left_mobile";
  const forceChangeCheck =
    customizeStore.forceChange_buttonShape === true ||
    customizeStore.force_change_profileCards === true ||
    customizeStore.force_change_MainMenuCard === true;

  const conditionMet = buttonPositionCheck || forceChangeCheck;

  console.log(conditionMet);

  // customizeStore.cancelAll()
});

const handleRangeChange = (event) => {
  buttonSizeSlider.value = event.target.value;
  checkSliderValue();
};

const checkSliderValue = () => {
  if (Number(buttonSizeSlider.value) > 3) {
    customizeStore.force_change_MainMenuCard = true;
  } else {
    customizeStore.force_change_MainMenuCard = false;
  }
};

const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
let pendingNavigation = null;

const detectUnsavedChanges = () => {
  return (
    forceChange_buttonShape.value ||
    force_change_profileCards.value ||
    force_change_MainMenuCard.value ||
    currentColor.value !== "#2dada3" ||
    gradient1.value !== "#2dada3" ||
    gradient2.value !== "#2dada3" ||
    customizeStore.hasChanges()
  );
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
    <LazyModalsConfirm
      :showModal="customizeStore.routeLeaveModal"
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
        section-title="Customize"
        section-sub-title="Customization empowers users to shape their digital environment"
      />

      <div
        class="mt-[64px] md:mt-[94px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] shadow-md -shadow-y-[1px] relative"
        :class="[
          collapseStore.collapses.includes('button_color_card')
            ? 'pb-[24px]'
            : 'pb-[0]',
        ]"
      >
        <div class="flex items-center justify-start px-[15px]">
          <div class="mt-[24px]">
            <h1
              class="text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
            >
              {{ $t('Button Color') }}
            </h1>
            <p
              class="font-[400] text-[14px] leading-[22.95px] dark:text-whiteTamkin text-darkGrey mt-[10px]"
            >
             {{$t('Choose the appropriate color that you prefer to appear in the icons and buttons')}}
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
              v-if="collapseStore.menus.includes('button_color')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="mini_SizeMenu divide-y"
            >
              <div class="mini_wrap">
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
                <div class="text_mini">{{$t('Switch To Annual')}}</div>
              </div>
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('button_color_card')"
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
                    !collapseStore.collapses.includes("button_color_card")
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
          class="flex flex-col items-start justify-center mt-[18px] pb-[16px] overflow-hidden"
          v-if="!collapseStore.collapses.includes('button_color_card')"
        >
          <div
            class="flex items-center justify-center lg:justify-between w-full lg:flex-nowrap flex-wrap lg:px-0 px-[15px] lg:space-y-0 space-y-[10px]"
          >
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
                <div
                  class="text-[14px] leading-[21px] font-[400] text-[#585B5B] dark:text-whiteTamkin"
                >
                  {{ $t('Solid') }}
                </div>
              </div>

              <div
                :class="[
                  customizeStore.colorMode === 'gradient'
                    ? 'custom-border-tamkin padding-override-1'
                    : 'border-[1px] dark:border-darkborder  rounded-[10px]',
                ]"
                @click="customizeStore.colorMode = 'gradient'"
                class="flex items-center justify-start rtl:space-x-reverse space-x-[10px] w-[153px] h-[34px] px-[15px] cursor-pointer"
              >
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #585b5b 0%,
                      #bac1c0 100%
                    );
                  "
                  class="h-[24px] w-[24px] rounded-[5px]"
                ></div>
                <div
                  class="text-[14px] leading-[21px] font-[400] text-[#585B5B] dark:text-whiteTamkin"
                >
                  {{ $t('Gradient') }}
                </div>
              </div>
            </div>
            <div
              v-if="customizeStore.colorMode === 'solid'"
              :style="{ border: `1px solid ${customizeStore.currentColor}` }"
              class="lg:mx-[15px] rtl:mr-auto ltr:ml-auto flex items-center justify-start rtl:space-x-reverse space-x-[10px] w-full h-[34px] rounded-[10px] px-[15px] cursor-pointer"
            >
              <div
                class="h-[24px] w-[24px] rounded-full"
                :style="{ backgroundColor: customizeStore.currentColor }"
              ></div>
              <div
                class="text-[14px] leading-[21px] font-[400] text-[#585B5B] dark:text-whiteTamkin"
              >
                {{ customizeStore.currentColor }}
              </div>
            </div>

            <div
              v-if="customizeStore.colorMode === 'gradient'"
              class="flex items-center justify-start border-[1px] border-tamkin w-full h-[34px] 
              rounded-[10px] lg:mx-[15px] cursor-pointer"
            >
              <div
                class="flex items-center justify-center rtl:space-x-reverse space-x-[10px] px-[15px]"
              >
                <div
                  class="h-[24px] w-[24px] rounded-full"
                  :style="{ backgroundColor: customizeStore.gradient1 }"
                ></div>
                <div
                  class="text-[14px] leading-[21px] font-[400] text-[#585B5B] dark:text-whiteTamkin"
                >
                  {{ customizeStore.gradient1 }}
                </div>
              </div>
              <div
                class="flex items-center justify-center rtl:space-x-reverse space-x-[10px] rtl:mr-auto ltr:ml-auto rtl:pl-[15px] ltr:pr-[15px]"
              >
                <div
                  class="h-[24px] w-[24px] rounded-full"
                  :style="{ backgroundColor: customizeStore.gradient2 }"
                ></div>
                <div
                  class="text-[14px] leading-[21px] font-[400] text-[#585B5B] dark:text-whiteTamkin"
                >
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
        class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] shadow-md -shadow-y-[1px] relative"
        :class="[
          collapseStore.collapses.includes('button_type_card')
            ? 'pb-[24px]'
            : 'pb-[10px]',
        ]"
      >
        <div class="flex items-center justify-start">
          <div class="pt-[24px]">
            <h1
              class="text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
            >
              {{ $t('Button Type') }}
            </h1>
            <p
              class="font-[400] text-[14px] leading-[22.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]"
            >
              {{$t('Choosing the right button type and size is essential for intuitive navigation')}}
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
                  ? 'stroke-current !text-white !fill-white'
                  : 'dark:text-whiteTamkin',
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
              <div class="mini_wrap">
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
                
                <div class="text_mini">{{$t('Switch To Annual')}}</div>
              </div>
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('button_type_card')"
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
                    !collapseStore.collapses.includes("button_type_card")
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
          class="w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg overflow-hidden"
          v-if="
            !collapseStore.collapses.includes('button_type_card') && buttonIcons
          "
        >
          <div>
            <h1
              class="text-[14px] font-[500] leading-[24px] dark:text-whiteTamkin"
            >
              {{ $t('Button Shape') }}
            </h1>
            <p
              class="font-[400] text-[12px] leading-[18.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]"
            >
              {{ $t('Choose the button Shape you prefer to appear in the widget') }}
            </p>
          </div>
          <div class="flex items-center justify-between mt-[40px]">
            <div
              v-for="icon in buttonIcons"
              :key="icon.value"
              class="cursor-pointer w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative"
              :class="[
                buttonShapeSelector === icon.value ? 'bg-tamkinLight' : '',
              ]"
              @click="customizeStore.changeButtonShape(icon.value, icon.icon)"
            >
              <div v-if="buttonShapeSelector === icon.value">
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
                    :src="`https://tamkin.app/${icon.icon}`"
                    class="w-[26px] h-[26px]"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="my-[30px]">
            <h1
              class="text-[14px] font-[500] leading-[24px] dark:text-whiteTamkin"
            >
              {{ $t('Button Size') }}
            </h1>
            <p
              class="font-[400] text-[12px] leading-[18.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]"
            >
              {{ $t('Pull the button to select the right size for you') }}
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
                class="absolute shadow-sm shadow-tamkinLight shadow-spread-1 -shadow-y-[1px] shadow-b-[1px] top-1/2 flex items-center justify-center bg-tamkinLight rounded-full pointer-events-none transform -translate-y-1/2"
                :class="{
                  'flex-row-reverse': langStore.direction === 'rtl',
                  'flex-row': langStore.direction !== 'rtl',
                }"
                :style="thumbStyle"
              >
                <div
                  class="rounded-full flex items-center justify-center"
                  :class="gradientClasses"
                  :style="[border_style, backgroundImageStyle]"
                >
                  <img
                    :src="`https://tamkin.app/${selectedIcon}`"
                    :style="imgStyle"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomizeLiveButtonTranslation />

      <CustomizeButtonLocation />
      <div
        class="mt-[34px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] mb-[40px] shadow-md -shadow-y-[1px] relative"
      >
        <div
          class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]"
        >
          <div>
            <h1
              class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
            >
              {{$t('Widget Customization')}}
            </h1>

            <p
              class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin pt-[6px]"
            >
              {{$t('Customize your widgets for a tailored browsing experience')}}
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
            class="menu_button_control"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                collapseStore.menus.includes('widget_custom')
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
              v-if="collapseStore.menus.includes('widget_custom')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="mini_SizeMenu divide-y"
            >
              <div class="mini_wrap">
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
                <div class="text_mini">Switch To Annual</div>
              </div>
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('widget_custom_card')"
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
                    !collapseStore.collapses.includes("widget_custom_card")
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

        <CustomizeWidgetCustomize
          v-if="!collapseStore.collapses.includes('widget_custom_card')"
        />
      </div>

      <div
        class="mt-[34px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] mb-[40px] shadow-md -shadow-y-[1px] relative"
      >
        <div
          class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]"
        >
          <div>
            <h1
              class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
            >
              {{ $t('Accessibility Mode') }}
            </h1>

            <p
              class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin pt-[6px]"
            >
             {{ $t('Accessibility Mode optimizes interface for diverse user needs and disabilities') }}
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
            class="menu_button_control"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                collapseStore.menus.includes('access_mode')
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
              v-if="collapseStore.menus.includes('access_mode')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="mini_SizeMenu divide-y"
            >
              <div class="mini_wrap">
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
                <div class="text_mini">{{$t('Switch To Annual')}}</div>
              </div>
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('access_mode_card')"
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
                    !collapseStore.collapses.includes("access_mode_card")
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
