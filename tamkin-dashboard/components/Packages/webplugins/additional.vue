<script lang="ts" setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
const packagesStore = usePackgesStore();
const { locale } = useI18n();

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  setData,
} = useModalManager();
const openBuyModal = (pck) => {
  packagesStore.currentPackage = pck;
  openModal("add_package_modal_packages");
};
</script>

<template>
  <div
    v-if="
      packagesStore.getAddonsOrExtras('Addons').length &&
      !packagesStore.loadingData
    "
    class="w-full p-[35px] rounded-[10px] bg-gradient-to-r from-[#3748E0]/[45%] via-[#FBE3C3]/[14%] to-[#8AB9FF]/[96%] h-auto mx-auto mt-[32px] relative"
  >
    <div class="absolute top-[-14px] left-0">
      <img src="/imgs/addons_vector.png" class="h-[120px]" alt="" />
    </div>
    <div class="absolute top-[-40px] z-[5] right-0">
      <img src="/imgs/addons_vector.png" class="h-[200px]" alt="" />
    </div>
    <div
      class="text-[20px] font-[600] leading-[32px] text-[#24292F] dark:text-white text-center"
    >
      {{ $t("Additional add-ons") }}
    </div>

    <Splide
      :options="{
        rewind: true,
        arrows: false,
        direction: `${locale === 'ar' ? 'rtl' : 'ltr'}`,
        gap: 16,
        perPage: 4,
        breakpoints: {
          768: {
            perPage: 1,
          },
          1280: {
            perPage: 2,
          },
        },
        width: '100%',
      }"
      class="w-full pb-9 xl:pb-0 mt-[26px] relative z-[5]"
    >
      <SplideSlide
        v-for="addon in packagesStore
          .getAddonsOrExtras('Addons')
          .sort((a, b) => a.sort - b.sort)"
        :key="addon.name"
        ><div
          style="box-shadow: 0px 4px 4px 0px #00000021"
          class="h-[250px] w-full dark:bg-tamkinDarkPrimary dark:text-whiteTamkin bg-white rounded-[10px] flex flex-col space-y-[14px] items-center justify-start relative z-[10]"
        >
          <div class="mt-[14px] flex items-center justify-center">
            <img
              :src="`https://tamkin.app/${addon.icon}`"
              class="w-[42px] h-[42px]"
              alt=""
            />
          </div>

          <div
            class="text-[#18191F] font-[600] text-[14px] dark:text-whiteTamkin"
          >
            {{ $t(addon.title) }}
          </div>
          <div
            class="text-[#2A285B] font-[400] text-[10px] text-center w-3/4 dark:text-whiteTamkin"
          >
            {{ $t(addon.description) }}
          </div>

          <div
            class="font-[700] text-[14px] text-black absolute bottom-20 dark:text-whiteTamkin 2xl:bottom-16"
          >
            $
            {{
              packagesStore.discountType === "month"
                ? addon.package_price_role[0].cost_month
                : addon.package_price_role[0].cost_yearly
            }}

            <span
              class="!font-[500] !text-[10px] !leading-[15px] !text-darkGrey dark:text-whiteTamkin"
              >/</span
            ><span
              class="!font-[500] !text-darkGrey dark:!text-whiteTamkin/80"
              >{{ $t(packagesStore.discountType) }}</span
            >
          </div>
          <div
            v-if="
              addon.package_price_role[0].discount_month ||
              addon.package_price_role[0].discount_yearly
            "
            class="flex items-center justify-center w-full absolute bottom-[55px]"
          >
            <!-- Strikethrough price if there's a discount and both costs are non-zero -->
            <div
              v-if="
                Number(addon.package_price_role[0].cost_month) !== 0 &&
                Number(addon.package_price_role[0].cost_yearly) !== 0
              "
              class="text-[#EA4335] text-[14px] leading-[18.17px] font-[500] line-through"
            >
              <!-- Show previous cost for monthly if the discount type is 'month' -->
              <span
                v-if="
                  packagesStore.discountType === 'month' &&
                  addon.package_price_role[0].discount_month
                "
              >
                ${{ addon.package_price_role[0].cost_before_month }}
              </span>
              <!-- Show previous cost for yearly if the discount type is 'year' -->
              <span
                v-if="
                  packagesStore.discountType === 'year' &&
                  addon.package_price_role[0].discount_yearly
                "
              >
                ${{ addon.package_price_role[0].cost_before_yearly }}
              </span>
            </div>
          </div>

          <div
            @click="openBuyModal(addon)"
            class="absolute bottom-7 dark:text-whiteTamkin text-[#18191F] text-[11px] font-[600] !mt-[24px] flex items-center rtl:space-x-reverse space-x-[14px] justify-evenly cursor-pointer"
          >
            <div>{{ $t("Purchase Now") }}</div>
            <svg
              width="9"
              height="15"
              class="w-[5px] h-[8px] rtl:rotate-180 dark:fill-whiteTamkin"
              viewBox="0 0 9 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.72769 7.25391L-2.14577e-06 1.80922L1.63615 0.253906L9 7.25391L1.63615 14.2539L-2.14577e-06 12.6986L5.72769 7.25391Z"
                class="fill-[#021328] group-hover:fill-white dark:fill-whiteTamkin"
              />
            </svg>
          </div></div></SplideSlide
    ></Splide>
  </div>
</template>
