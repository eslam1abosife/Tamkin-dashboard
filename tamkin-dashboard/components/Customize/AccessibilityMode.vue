<script lang="ts" setup>
import { useCustomizeStore } from "@/stores/customize.js";

const customizeStore = useCustomizeStore();
const { isChecked, toggleCheckbox } = customizeStore;
const settingsStore = useSettingsStore();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center mt-[32px] px-[15px] relative"
    :class="[
      !settingsStore.manageAccessibility.find(
        (t) =>
          t.feature === 'tamkin_accessibility_acc_manage_accessibility_mode'
      )
        ? 'h-[200px]'
        : '',
    ]"
  >
    <MessagesLockedFeature
      v-if="
        !settingsStore.manageAccessibility.find(
          (t) =>
            t.feature === 'tamkin_accessibility_acc_manage_accessibility_mode'
        )
      "
    />
    <div
      v-if="
        customizeStore.moveHideFeature.active == 1 &&
        customizeStore.moveHideFeature.value == 1
      "
      class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary p-[6px] flex items-center justify-start w-full mt-[4px] border-b dark:border-darkborder relative"
    >
      <div
        class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
      >
        <img
          :src="`https://www.tamkin.app${customizeStore.moveHideFeature.icon}`"
          class="h-[28px] w-[28px]"
        />
        <div class="flex flex-col items-start justify-center w-full">
          <div
            class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[14px] leading-[16.39px]"
          >
            <span>{{
              $t(
                customizeStore.moveHideFeature.label
                  ? customizeStore.moveHideFeature.label
                  : ""
              )
            }}</span>
          </div>
          <div
            class="text-[#585B5B] dark:text-whiteTamkin font-[500] text-[10px] lg:w-full w-40 truncate lg:text-[12px] leading-[13.66px] mt-[8px]"
          >
            <span>
              {{
                $t(
                  customizeStore.moveHideFeature.description
                    ? customizeStore.moveHideFeature.description
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
                  'acc-customize-accessibility-mode-move-/-hide-accessibility'
                )
              "
              @change="
                toggleCheckbox(
                  'acc-customize-accessibility-mode-move-/-hide-accessibility'
                )
              "
            />
            <div
              class="toggle_parent"
              :class="[
                isChecked(
                  'acc-customize-accessibility-mode-move-/-hide-accessibility'
                )
                  ? 'active'
                  : 'in_active',
              ]"
            >
              <div
                class="toggle_inner"
                :class="{
                  active: isChecked(
                    'acc-customize-accessibility-mode-move-/-hide-accessibility'
                  ),
                }"
              >
                <img
                  v-if="
                    isChecked(
                      'acc-customize-accessibility-mode-move-/-hide-accessibility'
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
        !isChecked('acc-customize-accessibility-mode-move-/-hide-accessibility')
          ? 'blur-[2px] !cursor-not-allowed'
          : '',
      ]"
    >
      <div
        v-if="customizeStore.accessibilityModeItems.find((el:any)=> el.value == 'left').active == 1"
        class="flex items-center justify-center max-md:flex-1 text-nowrap h-[45px] px-[5px] md:px-[15px] rtl:space-x-reverse space-x-[5px] md:space-x-[10px] cursor-pointer"
        :class="[
          customizeStore.accessibilityMode === 'left'
            ? 'custom-border padding-2'
            : '',
        ]"
        @click="
          () => {
            if (
              isChecked(
                'acc-customize-accessibility-mode-move-/-hide-accessibility'
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
            class="md:w-[25px] w-[20px] md:h-[25px] h-[20px]  dark:invert"
          />
        </div>
        <div class="text-[14px]">
          {{ $t("Left Side") }}
        </div>
      </div>
      <div
        v-if="customizeStore.accessibilityModeItems.find((el:any)=> el.value == 'hide').active == 1"
        class="md:rtl:mr-auto max-md:flex-1 text-nowrap max-md:justify-center md:ltr:ml-auto flex items-center justify-start h-[45px] px-[5px] md:px-[15px] rtl:space-x-reverse space-x-[5px] md:space-x-[10px] cursor-pointer"
        @click="
          () => {
            if (
              isChecked(
                'acc-customize-accessibility-mode-move-/-hide-accessibility'
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
        class="flex items-center max-md:flex-1 text-nowrap justify-center h-[45px] px-[5px] md:px-[15px] rtl:space-x-reverse space-x-[5px] md:space-x-[10px] cursor-pointer"
        @click="
          () => {
            if (
              isChecked(
                'acc-customize-accessibility-mode-move-/-hide-accessibility'
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
            class="md:w-[25px] w-[20px] md:h-[25px] h-[20px]  dark:invert"
          />
        </div>
        <div class="text-[14px]">{{ $t("Right Side") }}</div>
      </div>
    </div>
  </div>
</template>
