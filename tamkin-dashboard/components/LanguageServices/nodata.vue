<script lang="ts" setup></script>

<template>
  <div
    class="mt-[40px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] xs:px-0 px-[15px] flex items-center justify-center pb-[24px] shadow-md -shadow-y-[1px] relative"
  >
    <div
      class="flex flex-col items-center justify-center p-[100px] space-y-[16px]"
    >
      <div>
        <img
          src="/assets/imgs/signlanguageservices/no_addons.png"
          class="w-[118px] h-[107px]"
          alt=""
        />
      </div>
      <div
        class="text-[16px] leading-[24px] text-darkGrey font-[400] dark:text-whiteTamkin"
      >
        {{ $t("No data available for this section") }}
      </div>
    </div>
  </div>
</template>
