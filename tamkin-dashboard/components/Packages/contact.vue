<script lang="ts" setup>
const tgl = () => {
  if (process.client && window.$chatwoot) {
    window.$chatwoot.toggleBubbleVisibility("show");
    window.$chatwoot.toggle();
  }
};
</script>

<template>
  <div
    class="w-full h-[334px] bg-white rounded-[10px] relative mt-[32px] mx-auto dark:bg-tamkinDarkPrimary border-[1px] dark:border-darkborder dark:text-whiteTamkin"
  >
    <!-- Gradient Overlay -->
    <div
      class="hidden md:block absolute z-20 w-[95%] h-[170px] dark:bg-p top-[50%] rtl:left-[44.9%] ltr:left-[50%] transform -translate-x-[47.3%] -translate-y-[50%] rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#D5F6F4] via-[#D5F6F4]/[30%] to-white"
    ></div>

    <!-- Image -->
    <div
      class="p-4 md:p-0 static md:absolute rtl:left-[70px] ltr:right-[70px] top-[25px] z-50"
    >
      <img
        src="/imgs/av.png"
        alt=""
        class="w-[300px] h-[295px] mx-auto md:mx-[unset]"
      />
    </div>

    <!-- Content Section -->
    <div
      class="static md:absolute mt-[32px] md:mt-0 h-[246px] z-50 w-full md:w-[379px] rtl:right-0 ltr:left-0 bg-gradient-to-t from-[#F7C1D3]/[52%] to-[#A9CAF2]/[52%] top-[45px] rtl:rounded-l-[55px] ltr:rounded-r-[55px] flex items-start justify-center flex-col p-[32px]"
    >
      <div
        class="text-[20px] font-[600] leading-[24px] text-black dark:text-white rtl:text-right ltr:text-left"
      >
        {{ $t("Have more questions?") }}
      </div>
      <div
        class="text-[14px] font-[500] leading-[25px] text-black dark:text-white mt-[10px] rtl:text-right ltr:text-left"
      >
        {{
          $t(
            `We're here to help reach out anytime for the answers and support you need!`
          )
        }}
      </div>

      <button
        @click="tgl"
        class="btn-dashboard hover_tamkin max-w-[136px] mt-[30px]"
      >
        {{ $t("Contact us") }}
      </button>
    </div>
  </div>
</template>
