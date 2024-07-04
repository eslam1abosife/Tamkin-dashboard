<script lang="ts" setup>
const isPageStrucChecked = ref(false);
const isScreenChecked = ref(false);
const isHideImagesChecked = ref(false);
const isContrastChecked = ref(false);
const isVoiceNavigationChecked = ref(false);
const isDictChecked = ref(false);
const isHighLightChecked = ref(false);
const isLineHeightChecked = ref(false);
const isSaturationChecked = ref(false);
const isBiggerTextChecked = ref(false);
const isPauseAnimationChecked = ref(false);
const isToolTipChecked = ref(false);
const isCursorChecked = ref(false);
const isTextSpacingChecked = ref(false);
const isContrastPlusChecked = ref(false);
const openResizeMenuAdjust = ref(false);
const openMenuResize = (typeMenu: any) => {
  if (typeMenu === "adjust") {
    openResizeMenuAdjust.value = !openResizeMenuAdjust.value;
  }
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center   w-full relative">
    <MessagesLockedFeature/>
    <div class=" bg-white rounded-[10px] w-full">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Adjust the Main Menu
            </h1>
          </div>

          <div
            @click.stop="openMenuResize('adjust')"
            :class="[
              openResizeMenuAdjust ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ml-auto mr-[15px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeMenuAdjust
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
              v-if="openResizeMenuAdjust"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="miniSizeAdjust = !miniSizeAdjust"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[openResizeMenuAdjust ? '!fill-white' : '']"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
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
          class="flex flex-col items-start justify-center ml-[15px] mt-[18px] divide-y pb-[16px]"
          v-if="!miniSizeAdjust"
        >
          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isPageStrucChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/page_str.svg"
                alt=""
                :class="[!isPageStrucChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isPageStrucChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Page Structure </span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle"
                  class="relative inline-flex items-center cursor-pointer h-[32px]"
                >
                  <input
                    type="checkbox"
                    id="toggle"
                    class="sr-only"
                    v-model="isPageStrucChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isPageStrucChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isPageStrucChecked }"
                    >
                      <img
                        v-if="isPageStrucChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isScreenChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/language sign.svg"
                alt=""
                :class="[!isScreenChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isScreenChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Screen Reader</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_screen"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_screen"
                    class="sr-only"
                    v-model="isScreenChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isScreenChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isScreenChecked }"
                    >
                      <img
                        v-if="isScreenChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isHideImagesChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/hide_images.svg"
                alt=""
                :class="[!isHideImagesChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isHideImagesChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Hide Images</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_hide_images"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_hide_images"
                    class="sr-only"
                    v-model="isHideImagesChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isHideImagesChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isHideImagesChecked }"
                    >
                      <img
                        v-if="isHideImagesChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isContrastChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/contrast.svg"
                alt=""
                :class="[!isContrastChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isContrastChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Smart Contrast</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_contrast"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_contrast"
                    class="sr-only"
                    v-model="isContrastChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isContrastChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isContrastChecked }"
                    >
                      <img
                        v-if="isContrastChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isVoiceNavigationChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/voice_navigation.svg"
                alt=""
                :class="[!isVoiceNavigationChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isVoiceNavigationChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Voice Navigation</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_voice"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_voice"
                    class="sr-only"
                    v-model="isVoiceNavigationChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isVoiceNavigationChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isVoiceNavigationChecked }"
                    >
                      <img
                        v-if="isVoiceNavigationChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isDictChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/a-z.svg"
                alt=""
                :class="[!isDictChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isDictChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Dictionary</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_dict"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_dict"
                    class="sr-only"
                    v-model="isDictChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isDictChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isDictChecked }"
                    >
                      <img
                        v-if="isDictChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isHighLightChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/clip.svg"
                alt=""
                :class="[!isHighLightChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isHighLightChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Highlight Links</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_hightlights"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_hightlights"
                    class="sr-only"
                    v-model="isHighLightChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isHighLightChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isHighLightChecked }"
                    >
                      <img
                        v-if="isHighLightChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isLineHeightChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/line_height.svg"
                alt=""
                :class="[!isLineHeightChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isLineHeightChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Line Height</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_line_height"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_line_height"
                    class="sr-only"
                    v-model="isLineHeightChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isLineHeightChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isLineHeightChecked }"
                    >
                      <img
                        v-if="isLineHeightChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isSaturationChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/saturation.svg"
                alt=""
                :class="[!isSaturationChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isSaturationChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Saturation</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_saturation"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_saturation"
                    class="sr-only"
                    v-model="isSaturationChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isSaturationChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isSaturationChecked }"
                    >
                      <img
                        v-if="isSaturationChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isBiggerTextChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/text.svg"
                alt=""
                :class="[!isBiggerTextChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isBiggerTextChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Bigger Text</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_bigger"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_bigger"
                    class="sr-only"
                    v-model="isBiggerTextChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isBiggerTextChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isBiggerTextChecked }"
                    >
                      <img
                        v-if="isBiggerTextChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isPauseAnimationChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/pause.svg"
                alt=""
                :class="[!isPauseAnimationChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isPauseAnimationChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Pause Animation</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_pause_animation"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_pause_animation"
                    class="sr-only"
                    v-model="isPauseAnimationChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isPauseAnimationChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isPauseAnimationChecked }"
                    >
                      <img
                        v-if="isPauseAnimationChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isToolTipChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/tooltip.svg"
                alt=""
                :class="[!isToolTipChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isToolTipChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Tooltip</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_tooltip"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_tooltip"
                    class="sr-only"
                    v-model="isToolTipChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isToolTipChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isToolTipChecked }"
                    >
                      <img
                        v-if="isToolTipChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isCursorChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/cursor.svg"
                alt=""
                :class="[!isCursorChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isCursorChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Cursor</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_cursor"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_cursor"
                    class="sr-only"
                    v-model="isCursorChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isCursorChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isCursorChecked }"
                    >
                      <img
                        v-if="isCursorChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isTextSpacingChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/text_spacing.svg"
                alt=""
                :class="[!isTextSpacingChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isTextSpacingChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Text Spacing</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_textspacing"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_textspacing"
                    class="sr-only"
                    v-model="isTextSpacingChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isTextSpacingChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isTextSpacingChecked }"
                    >
                      <img
                        v-if="isTextSpacingChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <img
                src="/assets/imgs/addons/left_item.svg"
                alt=""
                :class="[!isContrastPlusChecked ? 'opacity-60' : '']"
              />

              <img
                src="/assets/imgs/addons/contrast_plus.svg"
                alt=""
                :class="[!isContrastPlusChecked ? 'opacity-60' : '']"
              />
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!isContrastPlusChecked ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Contrast +</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_contrast_plus"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_contrast_plus"
                    class="sr-only"
                    v-model="isContrastPlusChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      isContrastPlusChecked
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isContrastPlusChecked }"
                    >
                      <img
                        v-if="isContrastPlusChecked"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-6 h-6"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-6 h-6"
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
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>
  </div>
</template>
