<script lang="ts" setup>
const packagesStore = usePackgesStore();
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
    v-if="packagesStore.getAddonsOrExtras('Addons').length"
    class="flex items-center flex-col justify-center relative w-full h-auto py-[50px] rounded-[10px] bg-gradient-to-r rounded-[10px] from-[#ECDBF8] px-[24px] space-y-[24px] via-[#D0D0FD] to-[#F4E5DB]"
  >
    <div class="absolute z-[20] top-12">
      <img src="/imgs/access_widgets_hero.png" class="w-3/6 h-2/4" alt="" />
    </div>

    <div
      class="text-[#24292F] font-[600] text-[24px] text-center relative z-50 top-[-24px]"
    >
      {{ $t("Accessibility Addons") }}
    </div>
    <div class="absolute z-[20] top-[-140px] rtl:left-[40px] ltr:right-[-40px]">
      <img
        src="/imgs/widget_access_hero_2.png"
        class="w-[400px] h-[600px]"
        alt=""
      />
    </div>

    <div class="grid grid-cols-4 ipad-max:grid-cols-2 gap-4 relative z-50">
      <div
        v-for="addon in packagesStore
          .getAddonsOrExtras('Addons')
          .sort((a, b) => a.sort - b.sort)"
        :key="addon.name"
        class="h-[300px] w-full dark:bg-tamkinDarkPrimary dark:text-whiteTamkin bg-white relative rounded-tl-[2px] rounded-br-[2px] p-[16px] rounded-tr-[22px] rounded-bl-[22px] flex flex-col items-center justify-start"
        style="box-shadow: 0px 4px 4px 0px #00000021"
      >
        <div class="flex flex-col items-center justify-start w-full">
          <div
            class="h-[45px] w-[45px] dark:text-whiteTamkin bg-[#F7F7F7] rounded-full flex flex-col items-center justify-center"
          >
            <div>
              <img
                :src="`https://tamkin.app/${addon.icon}`"
                class="w-[42px] h-[42px]"
                alt=""
              />
            </div>
          </div>
          <div
            class="font-[600] dark:text-whiteTamkin text-[14px] text-center text-[#18191F] mt-[16px]"
          >
            {{ $t(addon.title) }}
          </div>
          <div
            class="text-[#393767] dark:text-whiteTamkin font-[400] text-[12px] text-center mt-[6px]"
          >
            {{ $t(addon.description) }}
          </div>
        </div>

        <div class="flex flex-col items-center justify-center w-full">
          <div class="absolute bottom-[60px]">
            <div class="dark:text-whiteTamkin">
              <span class="text-[16px] leading-[18px] font-[700]">
                $
                {{
                  packagesStore.discountType === "month"
                    ? addon.package_price_role[0].cost_month
                    : addon.package_price_role[0].cost_yearly
                }}</span
              ><span class="text-[16px] font-[500] leading-[15px] text-darkGrey"
                >/ {{ $t(packagesStore.discountType) }}</span
              >
            </div>
            <div
              v-if="
                addon.package_price_role[0].discount_month !== 0 ||
                addon.package_price_role[0].discount_yearly !== 0 ||
                (Number(addon.package_price_role[0].cost_month) !== 0 &&
                  Number(addon.package_price_role[0].cost_yearly) !== 0)
              "
              class="flex items-center justify-center w-full"
            >
              <div
                v-if="
                  Number(addon.package_price_role[0].cost_month) !== 0 &&
                  Number(addon.package_price_role[0].cost_yearly) !== 0
                "
                class="text-[#EA4335] text-[14px] leading-[18.17px] font-[500] line-through"
              >
                <span
                  v-if="
                    packagesStore.discountType === 'month' &&
                    addon.package_price_role[0].discount_month !== 0
                  "
                >
                  ${{ addon.package_price_role[0].cost_before_month }}
                  <span class="text-[14px] font-[500] leading-[24px]"
                    >/ {{ $t(packagesStore.discountType) }}</span
                  >
                </span>
                <span
                  v-if="
                    packagesStore.discountType === 'year' &&
                    addon.package_price_role[0].discount_yearly !== 0
                  "
                >
                  ${{ addon.package_price_role[0].cost_before_yearly }}
                  <span class="text-[14px] font-[500] leading-[24px]"
                    >/ {{ $t(packagesStore.discountType) }}</span
                  >
                </span>
              </div>
            </div>
          </div>
          <div
            @click="openBuyModal(addon)"
            class="absolute bottom-[18px] dark:text-whiteTamkin text-[#18191F] text-[11px] font-[600] !mt-[24px] flex items-center rtl:space-x-reverse space-x-[14px] justify-evenly cursor-pointer"
          >
            <div class="dark:text-whiteTamkin">{{ $t("Purchase Now") }}</div>
            <svg
              width="9"
              class="w-[5px] h-[8px] rtl:rotate-180 dark:fill-whiteTamkin"
              viewBox="0 0 9 15"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.72769 7.25391L-2.14577e-06 1.80922L1.63615 0.253906L9 7.25391L1.63615 14.2539L-2.14577e-06 12.6986L5.72769 7.25391Z"
                class="fill-[#021328] group-hover:fill-white dark:fill-whiteTamkin"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
