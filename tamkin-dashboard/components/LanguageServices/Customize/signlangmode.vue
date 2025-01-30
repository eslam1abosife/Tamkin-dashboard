<script lang="ts" setup>
import { useCustomizeStore } from "@/stores/customize.js";
import { vOnClickOutside } from "@vueuse/components";

const customizeStore = useCustomizeStore();
const collapseStore = useCollapseStore();
const { isChecked, toggleCheckbox } = customizeStore;
const moveHide = ref("");
const background = ref("");
const contrast = ref("");
const keyboard = ref("");

const moveHideWidget = (v: string) => {
  moveHide.value = v;
};
const backgroundWidgetValues = (v: string) => {
  background.value = v;
};
</script>

<template>
  <div
    class="mt-[34px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] mb-[40px] shadow-md -shadow-y-[1px] relative"
  >
    <div
      class="flex items-center justify-start mx-[15px] pt-[24px]"
    >
      <div>
        <h1
          class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
        >
          {{
            $t(
              customizeStore.getAccAttributes(
                "deaf-customize-sign-language-mode"
              )?.title
                ? customizeStore.getAccAttributes(
                    "deaf-customize-sign-language-mode"
                  )?.title
                : ""
            )
          }}
        </h1>

        <p
          class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin pt-[6px]"
        >
          <span v-if="!collapseStore.collapses.includes('access_mode_card')">
            {{
              $t(
                customizeStore.getAccAttributes(
                  "deaf-customize-sign-language-mode"
                )?.description_on_show
                  ? customizeStore.getAccAttributes(
                      "deaf-customize-sign-language-mode"
                    )?.description_on_show
                  : ""
              )
            }}
          </span>
          <span v-else>
            {{
              $t(
                customizeStore.getAccAttributes(
                  "deaf-customize-sign-language-mode"
                )?.description_on_hide
                  ? customizeStore.getAccAttributes(
                      "deaf-customize-sign-language-mode"
                    )?.description_on_hide
                  : ""
              )
            }}
          </span>
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
          <!-- <div class="mini_wrap">
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
            <div class="text_mini">{{ $t("Switch To Annual") }}</div>
          </div> -->
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

    <div
      v-if="!collapseStore.collapses.includes('access_mode_card')"
      class="relative flex flex-col items-center justify-center mt-[32px] px-[15px]"
      :class="
        !customizeStore.managePlayerPackages.find(
          (t) => t.feature === 'tamkin_deaf_dumb_deaf_manage_sign_language_mode'
        )
          ? 'pb-[90px]'
          : ''
      "
    >
      <div
        class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary p-[6px] flex items-center justify-start w-full mt-[4px] border-b dark:border-darkborder"
      >
        <MessagesLockedFeature
          v-if="
            !customizeStore.managePlayerPackages.find(
              (t) =>
                t.feature === 'tamkin_deaf_dumb_deaf_manage_sign_language_mode'
            )
          "
        />
        <div
          class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
        >
          <img
            :src="`https://www.tamkin.app${customizeStore.playerMoveHideFeature.icon}`"
            class="h-[28px] w-[28px]"
          />
          <div class="flex flex-col items-start justify-center w-full">
            <div
              class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[14px] leading-[16.39px]"
            >
              <span>
                {{
                  $t(
                    customizeStore.playerMoveHideFeature.label
                      ? customizeStore.playerMoveHideFeature.label
                      : ""
                  )
                }}
              </span>
            </div>
            <div
              class="text-[#585B5B] dark:text-whiteTamkin font-[500] text-[10px] lg:w-full w-40 truncate lg:text-[12px] leading-[13.66px] mt-[8px]"
            >
              <span>
                {{
                  $t(
                    customizeStore.playerMoveHideFeature.description
                      ? customizeStore.playerMoveHideFeature.description
                      : ""
                  )
                }}
              </span>
            </div>
          </div>
          <div class="ml-auto">
            <label for="toggle_move_acess" class="toggle_wrap">
              <input
                type="checkbox"
                id="toggle_move_acess"
                class="sr-only"
                :checked="
                  isChecked(
                    'deaf-customize-sign-language-mode-move-/-hide-sign-language-player'
                  )
                "
                @change="
                  toggleCheckbox(
                    'deaf-customize-sign-language-mode-move-/-hide-sign-language-player'
                  )
                "
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked(
                    'deaf-customize-sign-language-mode-move-/-hide-sign-language-player'
                  )
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{
                    active: isChecked(
                      'deaf-customize-sign-language-mode-move-/-hide-sign-language-player'
                    ),
                  }"
                >
                  <img
                    v-if="
                      isChecked(
                        'deaf-customize-sign-language-mode-move-/-hide-sign-language-player'
                      )
                    "
                    src="/assets/imgs/addons/active_toggle.svg"
                    class="w-[28px] absolute left-[0px] h-[28px]"
                  />
                  <img
                    v-else
                    src="/assets/imgs/addons/toggle.svg"
                    class="w-[28px] absolute left-[0px] h-[28px]"
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div
        v-if="customizeStore.isAccessbilityModeIconsActive"
        class="flex items-center flex-row justify-between mt-[24px] w-full rtl:space-x-reverse space-x-2 lg:space-x-[60px] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
        :class="[
          !isChecked(
            'deaf-customize-sign-language-mode-move-/-hide-sign-language-player'
          )
            ? 'blur-[2px] !cursor-not-allowed'
            : '',
        ]"
      >
          <div
            v-if="customizeStore.accessibilityModeItems.find((el:any)=> el.value == 'left').active == 1"
            class="flex items-center max-md:justify-center justify-start h-[45px] max-md:flex-1 text-nowrap md:w-[140px] px-[5px] md:px-[15px] rtl:space-x-reverse space-x-[5px] md:space-x-[10px] cursor-pointer"
            :class="[
              customizeStore.accessibilityMode === 'left'
                ? 'custom-border padding-2'
                : '',
            ]"
            @click="
              () => {
                if (
                  isChecked(
                    'deaf-customize-sign-language-mode-move-/-hide-sign-language-player'
                  )
                ) {
                  customizeStore.moveHideWidget('left');
                }
              }
            "
          >
            <div>
              <img
                src="/assets/imgs/customize/left_side.svg"
                class="md:w-[25px] w-[20px] md:h-[25px] h-[20px] dark:invert"
              />
            </div>
            <div class="text-[14px]">{{ $t("Left Side") }}</div>
          </div>
          <div
          v-if="customizeStore.accessibilityModeItems.find((el:any)=> el.value == 'hide').active == 1"
          class="flex max-md:justify-center items-center justify-start h-[45px] max-md:flex-1 text-nowrap md:w-[140px] px-[5px] md:px-[15px] rtl:space-x-reverse space-x-[5px] md:space-x-[10px] cursor-pointer"
          @click="
            () => {
              if (
                isChecked(
                  'deaf-customize-sign-language-mode-move-/-hide-sign-language-player'
                )
              ) {
                customizeStore.moveHideWidget('hide');
              }
            }
          "
          :class="[
            customizeStore.accessibilityMode === 'hide'
              ? 'custom-border padding-2'
              : '',
          ]"
        >
          <div>
            <img
              src="/assets/imgs/customize/hide.svg"
              class="md:w-[25px] w-[20px] h-auto object-cover dark:invert"
            />
          </div>
          <div class="text-[14px]">{{ $t("Hide") }}</div>
        </div>
          <div
            v-if="customizeStore.accessibilityModeItems.find((el:any)=> el.value == 'right').active == 1"
            class="flex items-center max-md:justify-center justify-start h-[45px] max-md:flex-1 text-nowrap md:w-[140px] px-[5px] md:px-[15px] rtl:space-x-reverse space-x-[5px] md:space-x-[10px] cursor-pointer"
            @click="
              () => {
                if (
                  isChecked(
                    'deaf-customize-sign-language-mode-move-/-hide-sign-language-player'
                  )
                ) {
                  customizeStore.moveHideWidget('right');
                }
              }
            "
            :class="[
              customizeStore.accessibilityMode === 'right'
                ? 'custom-border padding-2'
                : '',
            ]"
          >
            <div>
              <img
                src="/assets/imgs/customize/right_side.svg"
                class="md:w-[25px] w-[20px] md:h-[25px] h-[20px] dark:invert"
              />
            </div>
            <div class="text-[14px]">{{ $t("Right Side") }}</div>
          </div>
      </div>
    </div>
  </div>
</template>
