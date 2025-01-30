<script lang="ts" setup>
const localePath = useLocalePath();
</script>

<template>
  <div
    class="shadow-md -shadow-y-[1px] bg-gradient-to-r custom-border rounded-big4x from-[#E5D5FA]/60 to-[#F8D3E0]/60 p-8 rounded-[43px] mt-[6px] w-full"
  >
    <h1
      class="text-[18px] leading-[30px] font-[600] text-[#1E1E1E] mb-6 mt-[16px]"
    >
      {{ $t(`Buy Tamkin Token - TSLT and Join in our Investor Program`) }}
    </h1>
    <div class="relative h-full mb-6 w-full">
      <div class="absolute rtl:left-0 ltr:right-0 top-10 lg:block hidden">
        <img src="/public/assets/imgs/overview/10p.svg" />
      </div>
      <div
        class="absolute w-[120%] h-[120%] md:w-[150%] md:h-[150%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1]"
      >
        <img
          class="w-[100%] h-[100%]"
          src="/public/assets/imgs/overview/svg_opacity.svg"
        />
      </div>

      <!-- Timeline bar -->
      <div
        class="absolute rtl:right-4 ltr:left-4 top-[6px] h-full 2xl:h-[220px] w-[9px] z-[20] bg-tamkin rounded-full"
      ></div>
      <!-- Icons and Text -->
      <div class="flex items-start relative z-[50]">
        <!-- Icons -->
        <div class="relative flex items-center justify-center">
          <div
            class="absolute rtl:right-[5px] ltr:left-[5px] top-12 w-[27px] h-[27px]"
          >
            <img
              src="/public/assets/imgs/icons/investor.svg"
              alt="Icon 1"
              class="w-[27px] h-[27px]"
            />
          </div>
          <div
            class="absolute rtl:right-[5px] ltr:left-[5px] top-36 w-[27px] max-h-[27px]"
          >
            <img
              src="/public/assets/imgs/icons/investor.svg"
              alt="Icon 2"
              class="w-[27px] h-[27px]"
            />
          </div>
        </div>
        <!-- Text content -->
        <div
          class="flex flex-col space-y-[16px] rtl:mr-14 ltr:ml-14 w-full md:w-2/4 mt-[16px]"
        >
          <div>
            <h2 class="text-[13px] leading-[21px] font-[500] mb-2">
              {{ $t("Win Investor Package") }}
            </h2>
            <p class="text-[#585B5B] text-[12px] leading-[24px] font-[500]">
              {{
                $t(
                  "Investors participating in the Investor Program will receive an exclusive package with many additional benefits and special access to advanced tools and services."
                )
              }}
            </p>
          </div>
          <div>
            <h2 class="text-[13px] leading-[21px] font-[500] mb-2">
              {{ $t("Monthly profits") }}
            </h2>
            <p class="text-[#585B5B] text-[12px] leading-[24px] font-[500]">
              {{
                $t(
                  "This program includes 10% of Tamkin profits, distributed monthly in USDT to investors who participate in and maintain the program on their tokens without selling."
                )
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- Big number and buttons -->
    <div class="flex items-center justify-end w-full relative z-[50]">
      <div class="flex md:w-auto rtl:space-x-reverse md:flex-row flex-col w-full">
        <a
          class="btn-dashboard rounded-full h-[40px] hover_tamkin w-full md:ml-2 md:w-fit md:min-w-[128px] mb-2 !px-3"
          href="https://www.lbank.com/trade/tslt_usdt"
          target="_blank"
          >{{ $t("Buy Tamkin") }}</a
        >
        <nuxt-link
          class="btn_bordered_dashboard rounded-full w-full md:w-fit md:ml-2 md:min-w-[128px] mb-2 !px-3 bg-white h-[40px]"
          :to="localePath('/how-to-join')"
          >{{ $t("Investor Program") }}</nuxt-link
        >
        <nuxt-link
          class="btn_bordered_dashboard rounded-full w-full md:w-fit md:ml-2 md:min-w-[128px] mb-2 !px-3 bg-white h-[40px]"
          :to="localePath('/packages/investors')"
          >{{ $t("Investor Package") }}</nuxt-link
        >
      </div>
    </div>
  </div>
</template>
