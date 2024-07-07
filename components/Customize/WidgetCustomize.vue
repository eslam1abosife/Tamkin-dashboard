<script lang="ts" setup>

import { useCustomizeStore } from "@/stores/customize.js";

const customizeStore = useCustomizeStore();
const {isChecked,toggleCheckbox} = customizeStore
</script>

<template>
  <div
    class="flex flex-col items-center justify-center mt-[32px] px-[15px] divide-y"
  >
    <div
      class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]">
      <div class="flex items-center justify-start space-x-[13px] w-full">
        <img
          src="/assets/imgs/customize/xl.svg"
          class="h-[28px] w-[28px]"
          alt=""
        />
        <div class="flex flex-col items-start justify-center w-full">
          <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
            <span>Oversized Widget</span>
          </div>
          <div
            class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
          >
            <span>
              An XL Oversized Widget provides a larger, more prominent display
              area for key features
            </span>
          </div>
        </div>
        <div class="ml-auto">
          <label
            for="toggle_oversized"
            class="toggle_wrap"
          >
            <input
              type="checkbox"
              id="toggle_oversized"
              class="sr-only"
              :checked="isChecked('oversized_widget')"
                               @change="toggleCheckbox('oversized_widget')"
            />
            <div
              class="toggle_parent"
              :class="[
                isChecked('oversized_widget')
                  ?'active'
                  : 'in_active',
              ]"
            >
              <div
                class="toggle_inner"
                :class="{ 'active': isChecked('oversized_widget') }"
              >
                <img
                  v-if="isChecked('oversized_widget')"
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
    <div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]">
     
    <div class="flex items-center justify-start space-x-[13px] w-full">
      <img
        src="/assets/imgs/customize/columns.svg"
        class="h-[28px] w-[28px]"
        alt=""
      />
      <div class="flex flex-col items-start justify-center w-full">
        <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
          <span>3 Column Layout Widget</span>
        </div>
        <div
          class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
        >
          <span>
            Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid 
          </span>
        </div>
      </div>
      <div class="ml-auto">
        <label
          for="toggle_cols3"
          class="toggle_wrap"
        >
          <input
            type="checkbox"
            id="toggle_cols3"
            class="sr-only"
            :checked="isChecked('3_column_layout_widget')"
            @change="toggleCheckbox('3_column_layout_widget')"
          />
          <div
            class="toggle_parent"
            :class="[
              isChecked('3_column_layout_widget')
                ?'active'
                : 'in_active',
            ]"
          >
            <div
              class="toggle_inner"
              :class="{ 'active': isChecked('3_column_layout_widget') }"
            >
              <img
                v-if="isChecked('3_column_layout_widget')"
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
  class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]">
  <div class="flex items-center justify-start space-x-[13px] w-full">
    <img
      src="/assets/imgs/customize/accessibillity.svg"
      class="h-[28px] w-[28px]"
      alt=""
    />
    <div class="flex flex-col items-start justify-center w-full">
      <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
        <span>Accessibility Profiles</span>
      </div>
      <div
        class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
      >
        <span>
            You can choose specific features to be shown to you
        </span>
      </div>
    </div>
    <div class="ml-auto">
      <label
        for="toggle_profiles"
        class="toggle_wrap"
      >
        <input
          type="checkbox"
          id="toggle_profiles"
          class="sr-only"
             :checked="isChecked('accessibility_profiles')"
            @change="toggleCheckbox('accessibility_profiles')"
        />
        <div
          class="toggle_parent"
          :class="[
            isChecked('accessibility_profiles')
              ?'active'
              : 'in_active',
          ]"
        >
          <div
            class="toggle_inner"
            :class="{ 'active': isChecked('accessibility_profiles') }"
          >
            <img
              v-if="isChecked('accessibility_profiles')"
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
</template>
