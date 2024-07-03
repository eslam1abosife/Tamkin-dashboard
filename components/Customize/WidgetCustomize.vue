<script lang="ts" setup>
const overSizeWidget = ref(false);
const columnsWidget = ref(false);
const accessibillityWidget =ref(false)
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
            class="relative inline-flex items-center cursor-pointer h-[32px]"
          >
            <input
              type="checkbox"
              id="toggle_oversized"
              class="sr-only"
              v-model="overSizeWidget"
            />
            <div
              class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
              :class="[
                overSizeWidget
                  ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                  : 'border-[1px] border-lightGrey',
              ]"
            >
              <div
                class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                :class="{ 'translate-x-full ': overSizeWidget }"
              >
                <img
                  v-if="overSizeWidget"
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
          class="relative inline-flex items-center cursor-pointer h-[32px]"
        >
          <input
            type="checkbox"
            id="toggle_cols3"
            class="sr-only"
            v-model="columnsWidget"
          />
          <div
            class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
            :class="[
                columnsWidget
                ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                : 'border-[1px] border-lightGrey',
            ]"
          >
            <div
              class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
              :class="{ 'translate-x-full ': columnsWidget }"
            >
              <img
                v-if="columnsWidget"
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
        class="relative inline-flex items-center cursor-pointer h-[32px]"
      >
        <input
          type="checkbox"
          id="toggle_profiles"
          class="sr-only"
          v-model="accessibillityWidget"
        />
        <div
          class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
          :class="[
            accessibillityWidget
              ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
              : 'border-[1px] border-lightGrey',
          ]"
        >
          <div
            class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
            :class="{ 'translate-x-full ': accessibillityWidget }"
          >
            <img
              v-if="accessibillityWidget"
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
</template>
