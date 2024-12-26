<script lang="ts" setup>
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
  forceChange_buttonShape,
  buttonIcons,
  selectedIcon,
} = storeToRefs(customizeStore);

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

const thumbStyle = computed(() => {
  const minSize = 50; // Min size of outer circle
  const maxSize = 65; // Max size of outer circle
  const size =
    minSize + ((maxSize - minSize) * (buttonSizeSlider.value - 2)) / (97 - 2); // Scaled size
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
  const minSize = 36; // Min size of outer circle
  const maxSize = 40; // Max size of outer circle
  const size =
    minSize + ((maxSize - minSize) * (buttonSizeSlider.value - 2)) / (98 - 2); // Scaled size

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${buttonSizeSlider.value}%`,
  };
});
const imgStyle = computed(() => {
  const minSize = 26; // Min size of inner icon
  const maxSize = 80; // Max size of inner icon
  const size =
    minSize + ((maxSize - minSize) * (buttonSizeSlider.value - 2)) / (98 - 2); // Scaled size

  return {
    width: `${size}px`,
    height: `${size}px`,
  };
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

watch(currentColor, (ov, nv) => {
  // console.log(nv)
});
</script>

<template>
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
        <h1 class="text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">
          {{
            $t(
              customizeStore.getAccAttributes("deaf-customize-button-type")
                ?.title
            )
          }}
        </h1>
        <p
          class="font-[400] text-[14px] leading-[22.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]"
        >
          <span v-if="!collapseStore.collapses.includes('button_type_card')">
            {{
              $t(
                customizeStore.getAccAttributes("deaf-customize-button-type")
                  ?.description_on_show
                  ? customizeStore.getAccAttributes(
                      "deaf-customize-button-type"
                    )?.description_on_show
                  : ""
              )
            }}
          </span>
          <span v-else>
            {{
              $t(
                customizeStore.getAccAttributes("deaf-customize-button-type")
                  ?.description_on_hide
                  ? customizeStore.getAccAttributes(
                      "deaf-customize-button-type"
                    )?.description_on_hide
                  : ""
              )
            }}
          </span>
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
      class="relative w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg overflow-hidden"
      v-if="
        !collapseStore.collapses.includes('button_type_card') && buttonIcons
      "
    >
      <MessagesLockedFeature
        v-if="
          !customizeStore.managePlayerPackages.find(
            (t) => t.feature === 'tamkin_deaf_dumb_deaf_manage_button_type'
          )
        "
      />

      <div v-if="customizeStore.playerBtnShape.active == 1">
        <h1 class="text-[14px] font-[500] leading-[24px] dark:text-whiteTamkin">
          {{
            $t(
              customizeStore.playerBtnShape.label
                ? customizeStore.playerBtnShape.label
                : ""
            )
          }}
        </h1>
        <p
          class="font-[400] text-[12px] leading-[18.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]"
        >
          {{
            $t(
              customizeStore.playerBtnShape.description
                ? customizeStore.playerBtnShape.description
                : ""
            )
          }}
        </p>
      </div>
      <div
        v-if="customizeStore.playerBtnShape.active == 1"
        class="flex items-center justify-between mt-[40px]"
      >
        <template v-for="icon in buttonIcons" :key="icon.value">
          <div
            v-if="icon.active == 1"
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
        </template>
      </div>

      <div class="my-[30px]" v-if="customizeStore.playerBtnSize.active == 1">
        <h1 class="text-[14px] font-[500] leading-[24px] dark:text-whiteTamkin">
          {{
            $t(
              customizeStore.playerBtnSize.label
                ? customizeStore.playerBtnSize.label
                : ""
            )
          }}
        </h1>
        <p
          class="font-[400] text-[12px] leading-[18.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]"
        >
          {{
            $t(
              customizeStore.playerBtnSize.description
                ? customizeStore.playerBtnSize.description
                : ""
            )
          }}
        </p>
      </div>
      <div
        class="w-full flex flex-col items-center space-y-4"
        v-if="customizeStore.playerBtnSize.active == 1"
      >
        <div class="relative w-full mb-[34px]">
          <input
            type="range"
            min="3"
            max="96"
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
                class="w-[26px] h-[26px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
