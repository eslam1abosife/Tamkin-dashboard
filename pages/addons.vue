<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import { useCollapseStore } from "@/stores/collapse.js";
import { useAddonStore } from "@/stores/addons.js";

const checkboxStore = useAddonStore();
const collapseStore = useCollapseStore();
const { collapseMenu, collapseCard } = collapseStore;
const { menus } = storeToRefs(collapseStore);
definePageMeta({
  layout: "dashboard",
});

const miniSizeLiveTranslation = ref(false);
const verticalView = ref(false);
const horizontalView = ref(true);
const openResizeMenuLiveTranslataion = ref(false);
const annual_prices = ref(false);
const route = useRoute();

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
  ].forEach((name) => {
    checkboxStore.addCheckbox(name);
  });
  checkboxStore.initializeCheckboxes([
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
</script>

<template>
  <div class="relative h-full w-full">
    <div class="w-full h-full relative">
      <HeaderAccess 
      websiteImgName="tamkin_hand.svg"
      website-title="Tamkin.App"
      website-link="google.com"
      section-title="Addons" 
      section-sub-title="Enable the Accessibility Services Addons to improve usability and enhance your
          experience."/>
     
      <div class="mt-[50px] bg-white rounded-[10px]">
        <div class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">Adjust the Main Menu</h1>
          </div>

          <div
            @click.stop="collapseMenu('adjustMenu')"
            :class="[
              menus.includes('adjustMenu') ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ltr:ml-auto ltr:mr-[15px]  rtl:mr-auto rtl:ml-[15px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                menus.includes('adjustMenu')
                  ? 'stroke-current !text-white !fill-white'
                  : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="menus.includes('adjustMenu')"
              v-on-click-outside="() => collapseStore.removeMenu('adjustMenu')"
              class="mini_SizeMenu"
            >
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('adjustMenu')"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[
                      collapseStore.menus.includes('adjustMenu') ? '!fill-white' : '',
                    ]"
                  />
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
                <img
                  src="/assets/imgs/addons/arrow_menu.svg"
                  tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    "
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col items-start justify-center ltr:ml-[15px] rtl:mr-[15px] mt-[18px] divide-y pb-[16px]"
          v-if="!collapseStore.collapses.includes('adjustMenu')"
        >
          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('page_str') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/page_str.svg"
                alt=""
                :class="[!isChecked('page_str') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('page_str') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Page Structure </span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle"
                    class="sr-only"
                    :checked="isChecked('page_str')"
                    @change="toggleCheckbox('page_str')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('page_str')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('page_str') }"
                    >
                      <img
                        v-if="isChecked('page_str')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('screen_reader') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/language sign.svg"
                alt=""
                :class="[!isChecked('screen_reader') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('screen_reader') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Screen Reader</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_screen"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_screen"
                    class="sr-only"
                    :checked="isChecked('screen_reader')"
                    @change="toggleCheckbox('screen_reader')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('screen_reader')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('screen_reader') }"
                    >
                      <img
                        v-if="isChecked('screen_reader')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('hide_images') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/hide_images.svg"
                alt=""
                :class="[!isChecked('hide_images') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('hide_images') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Hide Images</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_hide_images"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_hide_images"
                    class="sr-only"
                    :checked="isChecked('hide_images')"
                    @change="toggleCheckbox('hide_images')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('hide_images')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('hide_images') }"
                    >
                      <img
                        v-if="isChecked('hide_images')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('smart_contrast') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/contrast.svg"
                alt=""
                :class="[!isChecked('smart_contrast') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('smart_contrast') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Smart Contrast</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_contrast"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_contrast"
                    class="sr-only"
                    :checked="isChecked('smart_contrast')"
                    @change="toggleCheckbox('smart_contrast')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('smart_contrast')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('smart_contrast') }"
                    >
                      <img
                        v-if="isChecked('smart_contrast')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('voice_navigation') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/voice_navigation.svg"
                alt=""
                :class="[!isChecked('voice_navigation') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('voice_navigation') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Voice Navigation</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_voice"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_voice"
                    class="sr-only"
                    :checked="isChecked('voice_navigation')"
                    @change="toggleCheckbox('voice_navigation')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('voice_navigation')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('voice_navigation') }"
                    >
                      <img
                        v-if="isChecked('voice_navigation')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('dictionary') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/a-z.svg"
                alt=""
                :class="[!isChecked('dictionary') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('dictionary') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Dictionary</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_dict"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_dict"
                    class="sr-only"
                    :checked="isChecked('dictionary')"
                    @change="toggleCheckbox('dictionary')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('dictionary')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('dictionary') }"
                    >
                      <img
                        v-if="isChecked('dictionary')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('highlight_links') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/clip.svg"
                alt=""
                :class="[!isChecked('highlight_links') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('highlight_links') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Highlight Links</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_hightlights"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_hightlights"
                    class="sr-only"
                    :checked="isChecked('highlight_links')"
                    @change="toggleCheckbox('highlight_links')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('highlight_links')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('highlight_links') }"
                    >
                      <img
                        v-if="isChecked('highlight_links')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('line_height') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/line_height.svg"
                alt=""
                :class="[!isChecked('line_height') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('line_height') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Line Height</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_line_height"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_line_height"
                    class="sr-only"
                    :checked="isChecked('line_height')"
                    @change="toggleCheckbox('line_height')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('line_height')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('line_height') }"
                    >
                      <img
                        v-if="isChecked('line_height')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('saturation') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/saturation.svg"
                alt=""
                :class="[!isChecked('saturation') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('saturation') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Saturation</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_saturation"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_saturation"
                    class="sr-only"
                    :checked="isChecked('saturation')"
                    @change="toggleCheckbox('saturation')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('saturation')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('saturation') }"
                    >
                      <img
                        v-if="isChecked('saturation')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('bigger_text') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/text.svg"
                alt=""
                :class="[!isChecked('bigger_text') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('bigger_text') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Bigger Text</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_bigger"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_bigger"
                    class="sr-only"
                    :checked="isChecked('bigger_text')"
                    @change="toggleCheckbox('bigger_text')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('bigger_text')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('bigger_text') }"
                    >
                      <img
                        v-if="isChecked('bigger_text')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('pause_animation') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/pause.svg"
                alt=""
                :class="[!isChecked('pause_animation') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('pause_animation') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Pause Animation</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_pause_animation"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_pause_animation"
                    class="sr-only"
                    :checked="isChecked('pause_animation')"
                    @change="toggleCheckbox('pause_animation')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('pause_animation')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('pause_animation') }"
                    >
                      <img
                        v-if="isChecked('pause_animation')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('tool_tip') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/tooltip.svg"
                alt=""
                :class="[!isChecked('tool_tip') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('tool_tip') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Tooltip</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_tooltip"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_tooltip"
                    class="sr-only"
                    :checked="isChecked('tool_tip')"
                    @change="toggleCheckbox('tool_tip')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('tool_tip')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('tool_tip') }"
                    >
                      <img
                        v-if="isChecked('tool_tip')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('cursor') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/cursor.svg"
                alt=""
                :class="[!isChecked('cursor') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('cursor') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Cursor</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_cursor"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_cursor"
                    class="sr-only"
                    :checked="isChecked('cursor')"
                    @change="toggleCheckbox('cursor')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('cursor')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('cursor') }"
                    >
                      <img
                        v-if="isChecked('cursor')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('text_spacing') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/text_spacing.svg"
                alt=""
                :class="[!isChecked('text_spacing') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('text_spacing') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Text Spacing</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_textspacing"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_textspacing"
                    class="sr-only"
                    :checked="isChecked('text_spacing')"
                    @change="toggleCheckbox('text_spacing')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('text_spacing')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('text_spacing') }"
                    >
                      <img
                        v-if="isChecked('text_spacing')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('contrast_plus') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/contrast_plus.svg"
                alt=""
                :class="[!isChecked('contrast_plus') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('contrast_plus') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Contrast +</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_contrast_plus"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_contrast_plus"
                    class="sr-only"
                    :checked="isChecked('contrast_plus')"
                    @change="toggleCheckbox('contrast_plus')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('contrast_plus')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('contrast_plus') }"
                    >
                      <img
                        v-if="isChecked('contrast_plus')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ltr:ml-[15px] rtl:mr-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est
          veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px]">
        <div class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Manage your Accessibility Profiles
            </h1>
          </div>
          <div
            @click="collapseStore.collapseMenu('ManageMenu')"
            :class="[
              menus.includes('ManageMenu') ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ltr:ml-auto ltr:mr-[15px]  rtl:mr-auto rtl:ml-[15px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                menus.includes('ManageMenu')
                  ? 'stroke-current !text-white !fill-white'
                  : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="menus.includes('ManageMenu')"
              v-on-click-outside="() => collapseStore.removeMenu('ManageMenu')"
              class="mini_SizeMenu"
            >
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('ManageCard')"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[menus.includes('ManageMenu') ? '!fill-white' : '']"
                  />
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
                <img
                  src="/assets/imgs/addons/arrow_menu.svg"
                  tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    "
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col items-start justify-center ltr:ml-[15px] rtl:mr-[15px] pb-[16px] mt-[18px] divide-y"
          v-if="!collapseStore.collapses.includes('ManageCard')"
        >
          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('motor_active') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/monitor_im.svg"
                alt=""
                :class="[!isChecked('motor_active') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('motor_active') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Motor impaired</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_motor"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_motor"
                    class="sr-only"
                    :checked="isChecked('motor_active')"
                    @change="toggleCheckbox('motor_active')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('motor_active')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('motor_active') }"
                    >
                      <img
                        v-if="isChecked('motor_active')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('color_blind') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/color_blind.svg"
                alt=""
                :class="[!isChecked('color_blind') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('color_blind') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Color blind</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_colorBlind"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_colorBlind"
                    class="sr-only"
                    :checked="isChecked('color_blind')"
                    @change="toggleCheckbox('color_blind')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('color_blind')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('color_blind') }"
                    >
                      <img
                        v-if="isChecked('color_blind')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('visuallyImpraired') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/vis_impaired.svg"
                alt=""
                :class="[!isChecked('visuallyImpraired') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('visuallyImpraired') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Visually-impaired</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_visually_imp"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_visually_imp"
                    class="sr-only"
                    :checked="isChecked('visuallyImpraired')"
                    @change="toggleCheckbox('visuallyImpraired')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('visuallyImpraired')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{
                        'active': isChecked('visuallyImpraired'),
                      }"
                    >
                      <img
                        v-if="isChecked('visuallyImpraired')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('Seizure') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/seizure.svg"
                alt=""
                :class="[!isChecked('Seizure') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('Seizure') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Seizure & Epileptic</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_seizure_epli"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_seizure_epli"
                    class="sr-only"
                    :checked="isChecked('Seizure')"
                    @change="toggleCheckbox('Seizure')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('Seizure')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('Seizure') }"
                    >
                      <img
                        v-if="isChecked('Seizure')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('blind') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/blind.svg"
                alt=""
                :class="[!isChecked('blind') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('blind') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Blind</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_blind_manage"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_blind_manage"
                    class="sr-only"
                    :checked="isChecked('blind')"
                    @change="toggleCheckbox('blind')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('blind')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('blind') }"
                    >
                      <img
                        v-if="isChecked('blind')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('dyslexia') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/df.svg"
                alt=""
                :class="[!isChecked('dyslexia') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('dyslexia') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Dyslexia</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_Dyslexia"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_Dyslexia"
                    class="sr-only"
                    :checked="isChecked('dyslexia')"
                    @change="toggleCheckbox('dyslexia')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('dyslexia')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('dyslexia') }"
                    >
                      <img
                        v-if="isChecked('dyslexia')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('congitive') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/congitive.svg"
                alt=""
                :class="[!isChecked('congitive') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('congitive') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Congitive & Learning</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_congitive_manage"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_congitive_manage"
                    class="sr-only"
                    :checked="isChecked('congitive')"
                    @change="toggleCheckbox('congitive')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('congitive')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('congitive') }"
                    >
                      <img
                        v-if="isChecked('congitive')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isChecked('ADHD') ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/adhd.svg"
                alt=""
                :class="[!isChecked('ADHD') ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isChecked('ADHD') ? 'opacity-60' : '']"
              >
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>ADHD</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
                    suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_adhd"
                  class="toggle_wrap"
                >
                  <input
                    type="checkbox"
                    id="toggle_adhd"
                    class="sr-only"
                    :checked="isChecked('ADHD')"
                    @change="toggleCheckbox('ADHD')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('ADHD')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('ADHD') }"
                    >
                      <img
                        v-if="isChecked('ADHD')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ltr:ml-[15px] rtl:mr-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est
          veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px] pb-[24px] mb-[80px]">
        <div class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">Live Translation</h1>

            <p class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]">
              Live translation converts speech or text from one language to another
              instantly, facilitating real-time communication.
            </p>
          </div>

          <div
            @click="collapseStore.collapseMenu('LiveTranslationAddons')"
            :class="[
              menus.includes('LiveTranslationAddons')
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class="relative ltr:ml-auto ltr:mr-[15px]  rtl:mr-auto rtl:ml-[15px] mt-[-24px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
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
                  : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="menus.includes('LiveTranslationAddons')"
              v-on-click-outside="() => collapseStore.removeMenu('LiveTranslationAddons')"
              class="mini_SizeMenu"
            >
              <div
                class="mini_wrap"
                @click="annual_prices = !annual_prices"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/annual_convert.svg"
                    alt=""
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
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[
                      menus.includes('LiveTranslationAddons') ? '!fill-white' : '',
                    ]"
                  />
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
                class="flex items-center justify-start cursor-pointer rtl:space-x-reverse space-x-[8px] py-[16px] px-[12px] border-b w-full"
                v-if="verticalView"
                @click="liveTransaltionSwitchToVerticalOrHorizontal('horizontal')"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/horizontal_view.svg"
                    alt=""
                    :class="[openResizeMenuLiveTranslataion ? '!fill-white' : '']"
                  />
                </div>
                <div class="text_mini">Horizontal View</div>
              </div>
              <div
                class="flex items-center justify-start cursor-pointer rtl:space-x-reverse space-x-[8px] py-[16px] px-[12px] border-b w-full"
                v-if="horizontalView"
                @click="liveTransaltionSwitchToVerticalOrHorizontal('vertical')"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/vertical_view.svg"
                    alt=""
                    :class="[openResizeMenuLiveTranslataion ? '!fill-white' : '']"
                  />
                </div>
                <div class="text_mini">Vertical View</div>
              </div>
              <div class="arrow">
                <img
                  src="/assets/imgs/addons/arrow_menu.svg"
                  tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    "
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-center lg:flex-row flex-col justify-center lg:justify-start mt-[56px] divide-y space-y-[42px] lg:space-y-0 lg:rtl:space-x-reverse space-x-[100px] px-[15px]"
          v-if="
            horizontalView &&
            !collapseStore.collapses.includes('LiveTranslationAddonsCard')
          "
        >
          <div
            class="flex flex-col items-center justify-start h-[267px] w-full relative custom-border rounded-big rounded-[19px]"
          >
            <div class="text-[20px] font-[600] text-[#021328] mt-[48px]">
              ${{ annual_prices ? 1200 : "100.00"
              }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
            </div>
            <div class="text-[14px] font-[500] text-[#021328] mt-[12px]">
              For 1 million characters
            </div>
            <div class="text-[13px] font-[500] text-[#A7A7A7] mt-[12px]">
              Almost 50 Page
            </div>

            <div class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]">
              <div>
                <img
                  src="/assets/imgs/addons/live_icon.svg"
                  class="w-[23px] h-[23px]"
                  alt=""
                />
              </div>
              <div class="text-[12px] leading-[14.16px] font-[500] text-black">
                Live translation
              </div>
            </div>

            <button
              class="btn_bordered_dashboard mt-[24px] !text-darkGrey hover:!text-white"
            >
              Upgrade Now
            </button>

            <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
              <img src="/assets/imgs/addons/live_icon.svg" alt="" />
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-start h-[267px] w-full relative custom-border rounded-big rounded-[19px]"
          >
            <div class="text-[20px] font-[600] text-[#021328] mt-[48px]">
              ${{ annual_prices ? 2400 : "200.00"
              }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
            </div>
            <div class="text-[14px] font-[500] text-[#021328] mt-[12px]">
              For 1 million characters
            </div>
            <div class="text-[13px] font-[500] text-[#A7A7A7] mt-[12px]">
              Almost 100 Page
            </div>

            <div class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]">
              <div>
                <img
                  src="/assets/imgs/addons/live_icon.svg"
                  class="w-[23px] h-[23px]"
                  alt=""
                />
              </div>
              <div class="text-[12px] leading-[14.16px] font-[500] text-black">
                Live translation
              </div>
            </div>

            <button class="btn-dashboard hover_tamkin mt-[24px] w-[140px]">Active</button>

            <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
              <img src="/assets/imgs/addons/live_icon.svg" alt="" />
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-start h-[267px] w-full relative custom-border rounded-big rounded-[19px]"
          >
            <div class="text-[20px] font-[600] text-[#021328] mt-[48px]">
              ${{ annual_prices ? 3600 : "300.00"
              }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
            </div>
            <div class="text-[14px] font-[500] text-[#021328] mt-[12px]">
              For 2 million characters
            </div>
            <div class="text-[13px] font-[500] text-[#A7A7A7] mt-[12px]">
              Almost 500 Page
            </div>

            <div class="flex items-center justify-evenly mt-[12px] rtl:space-x-reverse space-x-[6px]">
              <div>
                <img
                  src="/assets/imgs/addons/live_icon.svg"
                  class="w-[23px] h-[23px]"
                  alt=""
                />
              </div>
              <div class="text-[12px] leading-[14.16px] font-[500] text-black">
                Live translation
              </div>
            </div>

            <button
              class="btn_bordered_dashboard mt-[24px] !text-darkGrey hover:!text-white"
            >
              Upgrade Now
            </button>

            <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
              <img src="/assets/imgs/addons/live_icon.svg" alt="" />
            </div>
            <div class="absolute top-[17px] right-[18px]">
              <img src="/assets/imgs/addons/start.svg" alt="" />
            </div>
          </div>
        </div>
        <div
          v-if="collapseStore.collapses.includes('LiveTranslationAddonsCard')"
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ltr:ml-[15px] rtl:mr-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est
          veritatis dolore. Exercitationem et omnis ea quidem
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
            class="flex items-center justify-start h-[77px] w-full relative custom-border rounded-big rounded-[19px]"
          >
            <div class="ltr:ml-[15px] rtl:mr-[15px]">
              <img src="/assets/imgs/addons/live_vertical.svg" alt="" />
            </div>

            <div class="flex flex-col items-start justify-center py-[14px] mx-[15px]">
              <div class="text-[20px] font-[600] text-[#021328]">
                ${{ annual_prices ? 1200 : "100.00"
                }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
              </div>
              <div class="text-[14px] font-[500] text-[#585B5B]">
                For 1 million characters
              </div>
            </div>

            <button
              class="rtl:mr-auto ltr:ml-auto btn_bordered_dashboard mt-[24px] !text-darkGrey hover:!text-white my-[19px] rtl:ml-[15px] ltr:mr-[15px]"
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
            class="flex items-center justify-start h-[77px] w-full relative custom-border rounded-big rounded-[19px]"
          >
            <div class="ltr:ml-[15px] rtl:mr-[15px]">
              <img src="/assets/imgs/addons/live_vertical.svg" alt="" />
            </div>

            <div class="flex flex-col items-start justify-center py-[14px] mx-[15px]">
              <div class="text-[20px] font-[600] text-[#021328]">
                ${{ annual_prices ? 2400 : "200.00"
                }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
              </div>
              <div class="text-[14px] font-[500] text-[#585B5B]">
                For 1 million characters
              </div>
            </div>

            <button
              class="rtl:mr-auto ltr:ml-auto btn-dashboard hover_tamkin w-[140px] mt-[24px] my-[19px] rtl:ml-[15px] ltr:mr-[15px]"
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
              <img src="/assets/imgs/addons/live_vertical.svg" alt="" />
            </div>

            <div class="flex flex-col items-start justify-center py-[14px] mx-[15px]">
              <div class="text-[20px] font-[600] text-[#021328]">
                ${{ annual_prices ? 3600 : "300.00"
                }}<span class="text-[13px]">/{{ annual_prices ? "year" : "mo" }}</span>
              </div>
              <div class="text-[14px] font-[500] text-[#585B5B]">
                For 2 million characters
              </div>
            </div>

            <button
              class="rtl:mr-auto ltr:ml-auto btn_bordered_dashboard mt-[24px] !text-darkGrey hover:!text-white my-[19px] rtl:ml-[15px] ltr:mr-[15px]"
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
