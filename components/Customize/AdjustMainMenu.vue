<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import { useCustomizeStore } from "@/stores/customize.js";
import { useCollapseStore } from "@/stores/collapse.js";
const collapseStore = useCollapseStore();

const customizeStore = useCustomizeStore();
const {isChecked,toggleCheckbox} = customizeStore
 const moveHide = ref('')
</script>

<template>
  <div
    class="flex flex-col items-center justify-center   w-full relative">
    <!-- <MessagesLockedFeature/> -->
    <div class=" bg-white rounded-[10px] w-full">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Adjust the Main Menu
            </h1>
          </div>

          <div
            @click.stop="collapseStore.collapseMenu('adjust_main_menu_customize')"
            v-on-click-outside="() => collapseStore.removeMenu('adjust_main_menu_customize')"

            :class="[
              collapseStore.menus.includes('adjust_main_menu_customize') ? 'active_notification !text-darkGrey' : '',
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
                collapseStore.menus.includes('adjust_main_menu_customize')
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
              v-if="collapseStore.menus.includes('adjust_main_menu_customize')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="collapseStore.collapseCard('adjust_main_menu_customize_card')"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[collapseStore.menus.includes('adjust_main_menu_customize') ? '!fill-white' : '']"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  {{ !collapseStore.collapses.includes('adjust_main_menu_customize_card')?'Minisize':'Maxsize' }}
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
          v-if="!collapseStore.collapses.includes('adjust_main_menu_customize_card')"
        >
          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start space-x-[13px] w-full">
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
                      :class="{'active': isChecked('page_str') }"
                    >
                      <img
                        v-if="isChecked('page_str')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('screen_reader') }"
                    >
                      <img
                        v-if="isChecked('screen_reader')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('hide_images') }"
                    >
                      <img
                        v-if="isChecked('hide_images')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('smart_contrast') }"
                    >
                      <img
                        v-if="isChecked('smart_contrast')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('voice_navigation') }"
                    >
                      <img
                        v-if="isChecked('voice_navigation')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('dictionary') }"
                    >
                      <img
                        v-if="isChecked('dictionary')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('line_height') }"
                    >
                      <img
                        v-if="isChecked('line_height')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('saturation') }"
                    >
                      <img
                        v-if="isChecked('saturation')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('bigger_text') }"
                    >
                      <img
                        v-if="isChecked('bigger_text')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('pause_animation') }"
                    >
                      <img
                        v-if="isChecked('pause_animation')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('tool_tip') }"
                    >
                      <img
                        v-if="isChecked('tool_tip')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('cursor') }"
                    >
                      <img
                        v-if="isChecked('cursor')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('text_spacing') }"
                    >
                      <img
                        v-if="isChecked('text_spacing')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
                      :class="{'active': isChecked('contrast_plus') }"
                    >
                      <img
                        v-if="isChecked('contrast_plus')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="h-[28px] w-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="h-[28px] w-[28px]"
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
