<script lang="ts" setup>
import { useCustomizeStore } from "@/stores/customize.js";

const customizeStore = useCustomizeStore();
const { isChecked, toggleCheckbox } = customizeStore;
</script>

<template>
  <div
    class="flex flex-col items-center justify-center mt-[32px] px-[15px] divide-y dark:divide-darkborder"
  >
    <div
      class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary p-[6px] flex items-center justify-start w-full mt-[4px]"
    >
      <div
        class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
      >
        <img src="/assets/imgs/customize/xl.svg" class="h-[28px] w-[28px]" />
        <div class="flex flex-col items-start justify-center w-full">
          <div
            class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[14px] leading-[16.39px]"
          >
            <span>{{ $t("Oversized Widget") }}</span>
          </div>
          <div
            class="text-[#585B5B] dark:text-whiteTamkin font-[500] text-[10px] w-40 truncate lg:w-auto ipad-max:w-40 lg:text-[12px] leading-[13.66px] mt-[8px]"
          >
            <span>
              {{
                $t(
                  "An XL Oversized Widget provides a larger, more prominent displayarea for key features"
                )
              }}
            </span>
          </div>
        </div>
        <div class="ml-auto">
          <label for="toggle_oversized" class="toggle_wrap">
            <input
              type="checkbox"
              id="toggle_oversized"
              class="sr-only"
              :checked="
                isChecked(
                  'acc-customize-widget-customization--oversized-widget'
                )
              "
              @change="
                toggleCheckbox(
                  'acc-customize-widget-customization--oversized-widget'
                )
              "
            />
            <div
              class="toggle_parent"
              :class="[
                isChecked(
                  'acc-customize-widget-customization--oversized-widget'
                )
                  ? 'active'
                  : 'in_active',
              ]"
            >
              <div
                class="toggle_inner"
                :class="{
                  active: isChecked(
                    'acc-customize-widget-customization--oversized-widget'
                  ),
                }"
              >
                <img
                  v-if="
                    isChecked(
                      'acc-customize-widget-customization--oversized-widget'
                    )
                  "
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
    <div
      class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary p-[6px] flex items-center justify-start w-full mt-[4px]"
    >
      <div
        class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
      >
        <img
          src="/assets/imgs/customize/columns.svg"
          class="h-[28px] w-[28px]"
        />
        <div class="flex flex-col items-start justify-center w-full">
          <div
            class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[14px] leading-[16.39px]"
          >
            <span>{{ $t("3 Column Layout Widget") }}</span>
          </div>
          <div
            class="text-[#585B5B] dark:text-whiteTamkin text-[10px] w-40 truncate lg:w-auto ipad-max:w-40 lg:text-[12px] leading-[13.66px] mt-[8px]"
          >
            <span>
              {{
                $t(
                  "Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid"
                )
              }}
            </span>
          </div>
        </div>
        <div class="ml-auto">
          <label for="toggle_cols3" class="toggle_wrap">
            <input
              type="checkbox"
              id="toggle_cols3"
              class="sr-only"
              :checked="
                isChecked(
                  'acc-customize-widget-customization--3-column-layout-widget'
                )
              "
              @change="
                toggleCheckbox(
                  'acc-customize-widget-customization--3-column-layout-widget'
                )
              "
            />
            <div
              class="toggle_parent"
              :class="[
                isChecked(
                  'acc-customize-widget-customization--3-column-layout-widget'
                )
                  ? 'active'
                  : 'in_active',
              ]"
            >
              <div
                class="toggle_inner"
                :class="{
                  active: isChecked(
                    'acc-customize-widget-customization--3-column-layout-widget'
                  ),
                }"
              >
                <img
                  v-if="
                    isChecked(
                      'acc-customize-widget-customization--3-column-layout-widget'
                    )
                  "
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
    <div
      class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary p-[6px] flex items-center justify-start w-full mt-[4px]"
    >
      <div
        class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
      >
        <img
          src="/assets/imgs/customize/accessibillity.svg"
          class="h-[28px] w-[28px]"
        />
        <div class="flex flex-col items-start justify-center w-full">
          <div
            class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[14px] leading-[16.39px]"
          >
            <span>{{ $t("Accessibility Profiles") }}</span>
          </div>
          <div
            class="text-[#585B5B] dark:text-whiteTamkin font-[500] text-[10px] w-40 truncate lg:w-auto ipad-max:w-40 lg:text-[12px] leading-[13.66px] mt-[8px]"
          >
            <span>
              {{ $t("You can choose specific features to be shown to you") }}
            </span>
          </div>
        </div>
        <div class="ml-auto">
          <label for="toggle_profiles" class="toggle_wrap">
            <input
              type="checkbox"
              id="toggle_profiles"
              class="sr-only"
              :checked="
                isChecked(
                  'acc-customize-widget-customization--accessibility-profiles'
                )
              "
              @change="
                toggleCheckbox(
                  'acc-customize-widget-customization--accessibility-profiles'
                )
              "
            />
            <div
              class="toggle_parent"
              :class="[
                isChecked(
                  'acc-customize-widget-customization--accessibility-profiles'
                )
                  ? 'active'
                  : 'in_active',
              ]"
            >
              <div
                class="toggle_inner"
                :class="{
                  active: isChecked(
                    'acc-customize-widget-customization--accessibility-profiles'
                  ),
                }"
              >
                <img
                  v-if="
                    isChecked(
                      'acc-customize-widget-customization--accessibility-profiles'
                    )
                  "
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
  </div>
</template>
