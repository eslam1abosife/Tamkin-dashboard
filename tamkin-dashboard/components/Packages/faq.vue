<script lang="ts" setup>
const packagesStore = usePackgesStore();
const isLinkActive = (path) => {
  if (process.client) {
    const localizedPath = localePath(path); // Assuming you use i18n
    return route.path === localizedPath;
  }
  return false;
};
</script>

<template>
  <div
    class="w-full h-full min-h-auto bg-white p-[30px] mx-auto mt-[32px] relative dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
  >
    <div class="absolute top-[180px] left-[100px]">
      <img
        src="/imgs/Astronaut.png"
        class="w-[167px] h-[174px] opacity-30"
        alt=""
      />
    </div>
    <div
      class="text-[#18191F] text-[20px] leading-[32px] rtl:text-right ltr:text-left font-[600] dark:text-whiteTamkin"
    >
      {{ $t("Frequently Asked Questions") }}
    </div>

    <div class="grid grid-cols-2 gap-[-48px] min-h-auto">
      <div
        class="flex items-start justify-center flex-col w-full relative mt-[24px]"
      >
        <!-- First Grid Item (FAQ list) -->
        <div
          v-for="faq in packagesStore.getFaqBasedOnType"
          :key="faq.name"
          @mouseover="
            packagesStore.currentFaq = faq.name;
            packagesStore.selectedQuestion = faq;
          "
          @mouseleave="
            packagesStore.currentFaq = faq.name;
            packagesStore.selectedQuestion = faq;
          "
          :class="[
            packagesStore.selectedQuestion.name === faq.name
              ? 'bg-[#E8F2FF]'
              : 'bg-white/[80%]',
          ]"
          class="h-[45px] w-[40vw] ipad-max:w-[35vw] border-[1px] dark:opacity-90 dark:border-darkborder dark:bg-p_secondary dark:text-whiteTamkin py-[15px] cursor-pointer rtl:space-x-reverse space-x-[9px] px-[10px] flex items-center justify-start relative z-[50]"
          style="box-shadow: 0px 0px 0.62px 0.62px #00000026"
        >
          <div
            class="w-[15px] h-[15px] rounded-full dark:text-whiteTamkin"
            :class="[
              packagesStore.selectedQuestion.name === faq.name
                ? '!bg-[#5D5FEF]'
                : 'bg-[#A5A6F6]',
            ]"
          ></div>
          <div
            class="text-[12px] font-[400] leading-[14px] text-black dark:text-whiteTamkin"
          >
            {{ $t(faq.question) }}
          </div>
          <div class="rtl:!mr-auto ltr:!ml-auto !mr-[7px]">
            <svg
              width="8"
              height="13"
              class="rtl:rotate-180"
              viewBox="0 0 8 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.46875 1.56641L6.44653 6.54418L1.46875 11.522"
                :class="[
                  packagesStore.selectedQuestion.name === faq.name
                    ? '!stroke-[#5D5FEF]'
                    : '!stroke-[#A5A6F6]',
                ]"
                stroke-width="1.24444"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Second Grid Item (FAQ Details) -->
      <div
        v-if="packagesStore.selectedQuestion.name === packagesStore.currentFaq"
        class="relative z-[40] w-full rounded-[10px] bg-[#FAFBFF] mt-[24px] dark:bg-tamkinDarkPrimary border-[1px] dark:border-darkborder dark:text-whiteTamkin"
        style="box-shadow: 0px 0px 2.49px 0.62px #00000026"
        :style="{
          'min-height':
            packagesStore.currentType.title === 'Sign language'
              ? '410px'
              : '280px',
        }"
      >
        <div
          class="rtl:pr-[120px] ltr:pl-[120px] rtl:text-right ltr:text-left mt-[32px] ipad-max:text-[10px] ipad-max:pl-[80px] text-[14px] font-[600] dark:text-whiteTamkin leading-[24px] text-black break-words w-full"
        >
          {{ $t(packagesStore.selectedQuestion.question) }}
        </div>
        <div
          class="rtl:pr-[120px] ltr:pl-[120px] ipad-max:pl-[80px] ipad-max:text-[10px] mt-[28px] rtl:text-right ltr:text-left text-[12px] font-[400] dark:text-whiteTamkin leading-[24px] text-black"
        >
          {{ $t(packagesStore.selectedQuestion.answer) }}
        </div>
      </div>
    </div>
  </div>
</template>
