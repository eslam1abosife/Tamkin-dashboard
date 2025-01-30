<script lang="ts" setup>
const statsStore = useStatsStore();
</script>

<template>
  <div
    class="shadow-md -shadow-y-[1px] flex items-center justify-center rtl:space-x-reverse space-x-[13px] dark:bg-tamkinDarkPrimary bg-white w-full h-[114px] px-[18px] border-[1px] border-lightGrey dark:border-darkborder rounded-[10px]"
  >
    <div class="flex items-center justify-start flex-1">
      <div>
        <img
          src="/assets/imgs/google_analytics.svg"
          class="w-[71px] h-[63px]"
        />
      </div>
      <div class="rtl:mr-[13px] ltr:ml-[13px]">
        <h1
          class="text-[12px] lg:text-[16px] leading-[22px] font-[500] text-[#23262F] dark:text-whiteTamkin"
        >
          {{ $t("Google Analytics") }}
        </h1>
        <p
          class="text-[10px] lg:text-[14px] truncate w-auto lg:leading-[19px] text-[#585B5B] dark:text-whiteTamkin font-[400] mt-[8px]"
        >
          Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam
          suscipit nesciunt esse sint aperiam aliquid
        </p>
      </div>
    </div>
    <div class="ml-auto flex items-center">
      <label for="toggle_google_a" class="toggle_wrap">
        <input
          type="checkbox"
          id="toggle_google_a"
          class="sr-only"
          v-model="statsStore.google_enabled"
        />
        <div
          class="toggle_parent"
          :class="[statsStore.google_enabled ? 'active' : 'in_active']"
        >
          <div
            class="toggle_inner"
            :class="{ active: statsStore.google_enabled }"
          >
            <img
              v-if="statsStore.google_enabled"
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
</template>
