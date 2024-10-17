<script lang="ts" setup>
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
import { vOnClickOutside } from "@vueuse/components";

import "@cyhnkckali/vue3-color-picker/dist/style.css";

const collapseStore = useCollapseStore();
const customizeStore = useCustomizeStore();
</script>

<template>
  <div
    class="mt-[44px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] shadow-md -shadow-y-[1px] relative"
    :class="[
      collapseStore.collapses.includes('button_color_card')
        ? 'pb-[24px]'
        : 'pb-[0]',
    ]"
  >
    <div class="flex items-center justify-start px-[15px]">
      <div class="mt-[24px]">
        <h1 class="text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">
          {{
            customizeStore.getAccAttributes("deaf-customize-button-color")
              ?.title
          }}
        </h1>
        <p
          class="font-[400] text-[14px] leading-[22.95px] dark:text-whiteTamkin text-darkGrey mt-[10px]"
        >
          <span v-if="!collapseStore.collapses.includes('button_color_card')">
            {{
              customizeStore.getAccAttributes("deaf-customize-button-color")
                ?.description_on_show
            }}
          </span>
          <span v-else>
            {{
              customizeStore.getAccAttributes("deaf-customize-button-color")
                ?.description_on_hide
            }}
          </span>
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
            <div class="text_mini">Switch To Annual</div>
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
            class="flex items-center justify-start rtl:space-x-reverse space-x-[10px] w-[153px] h-[34px] px-[15px] cursor-pointer"
          >
            <div
              style="
                background: linear-gradient(180deg, #585b5b 0%, #bac1c0 100%);
              "
              class="h-[24px] w-[24px] rounded-[5px]"
            ></div>
            <div
              class="text-[14px] leading-[21px] font-[400] text-[#585B5B] dark:text-whiteTamkin"
            >
              Gradient
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
          class="flex items-center justify-start border-[1px] border-tamkin w-full h-[34px] rounded-[10px] lg:mx-[15px] cursor-pointer"
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
            class="flex items-center justify-center rtl:space-x-reverse space-x-[10px] ml-auto pr-[15px]"
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
</template>
