<script lang="ts" setup>
import { useCustomizeStore } from "@/stores/customize.js";
const navStore = useNavbarStore()

const customizeStore = useCustomizeStore();
const { isChecked, toggleCheckbox } = customizeStore;
</script>

<template>
  <div
    class="flex flex-col items-center justify-center mt-[32px] px-[15px] divide-y dark:divide-darkborder"
  >

  <MessagesLockedFeature  v-if="navStore.defaultappobj?.package?.filter(p => p.type === 'Accessibility').length === 0"/>

    <template
      v-for="item in customizeStore.widgetCustomizationItems"
      :key="item.name"
    >
      <div
        v-if="item.active"
        class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary p-[6px] flex items-center justify-start w-full mt-[4px]"
      >
        <div
          class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
        >
          <img
            :src="`https://tamkin.app${item.icon}`"
            class="h-[28px] w-[28px]"
          />
          <div class="flex flex-col items-start justify-center w-full">
            <div
              class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[14px] leading-[16.39px]"
            >
              <span>{{ $t(item.label) }}</span>
            </div>
            <div
              class="text-[#585B5B] dark:text-whiteTamkin font-[500] text-[10px] w-40 truncate lg:w-auto ipad-max:w-40 lg:text-[12px] leading-[13.66px] mt-[8px]"
            >
              <span>
                {{ $t(item.description ? item.description : "") }}
              </span>
            </div>
          </div>

          <div class="ml-auto">
            <label :for="item.name" class="toggle_wrap">
              <input
                type="checkbox"
                :id="item.name"
                class="sr-only"
                :checked="item.is_available ? isChecked(item.name) : false"
                :disabled="!item.is_available"
                @change="()=>{
                  item.is_available ? toggleCheckbox(item.name) : false
                }"
              />
              <div
                class="toggle_parent"
                :class="[isChecked(item.name) && item.is_available ? 'active' : 'in_active']"
              >
                <div
                  class="toggle_inner"
                  :class="{
                    active: isChecked(item.name) && item.is_available,
                  }"
                >
                  <img
                    v-if="isChecked(item.name) && item.is_available"
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
    </template>
  </div>
</template>
