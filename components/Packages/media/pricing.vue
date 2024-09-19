<script lang="ts" setup>
const packagesStore = usePackgesStore();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  setData
} = useModalManager();
const openBuyModal = (pck)=>{
  packagesStore.currentPackage = pck
  openModal('add_package_modal_packages')
}
</script>

<template>
  <div class="flex items-center flex-col justify-center relative w-full">
    <div class="w-full gap-[36px] grid grid-cols-3 mt-[32px]">
      <div
        v-for="pak in packagesStore.getPackageByTypeAndCategory('Package')"
        :key="pak.name"
        class="w-full mx-auto p-6 bg-white rounded-[10px] ipad-max:h-auto h-auto relative flex flex-col justify-between"
        style="box-shadow: 0px 0px 10.1px 0px #dadada"
      >
        <div
          v-if="pak.type_deal !== 'None'"
          class="absolute flex items-center justify-center text-[13px] leading-[17.76px] font-[500] w-[83px] h-[28px] rounded-[10px] text-white dark:text-darkTamkin top-[-15px] rtl:right-[50%] ltr:left-[40%] rtl:lg:right-[250px] ltr:lg:left-[40%]"
          style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
        >
          <div>{{ $t(pak.type_deal) }}</div>
        </div>

        <div class="flex justify-center">
          <img
            :src="`https://tamkin.app/${pak.icon}`"
            alt="Icon"
            class="size-24 object-contain"
            
          />
        </div>

        <div class="text-center mb-2">
          <h2 class="text-[20px] leading-[30px] font-[600]">{{ $t(pak.title) }}</h2>
          <p class="text-[#536174] text-[12px] font-[400] leading-[15px]">
            {{ $t(pak.sub_title) }}
          </p>
        </div>

        <div class="text-center mt-[11px]">
          <p class="text-[20px] leading-[29px] font-[600]">
            <span class="text-[20px] leading-[29px] font-[600]">
              {{
                pak.package_price_role[0].cost_month === 0 &&
                pak.package_price_role[0].cost_yearly === 0
                  ? $t("Free Package")
                  : pak.package_price_role[0].cost_month !== 0 &&
                    pak.package_price_role[0].cost_yearly !== 0 &&
                    packagesStore.discountType === "month"
                  ? "$" + " " + pak.package_price_role[0].cost_month.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : "$" + " " + pak.package_price_role[0].cost_yearly.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </span>

            <span
              class="text-[20px] font-[500] leading-[24px] text-darkGrey"
              v-if="
                Number(pak.package_price_role[0].cost_month) !== 0 &&
                Number(pak.package_price_role[0].cost_yearly) !== 0
              "
            >
              /{{ $t(packagesStore.discountType) }}
            </span>
          </p>

          <div
            v-if="
              pak.package_price_role[0].discount_month ||
              pak.package_price_role[0].discount_yearly
            "
            class="flex items-center justify-center"
          >
            <div
              class="text-[#EA4335] text-[16px] leading-[18.17px] font-[500] line-through"
            >
              <span
                v-if="
                  packagesStore.discountType === 'month' &&
                  pak.package_price_role[0].cost_before_month !== 0
                "
              >
                ${{ pak.package_price_role[0].cost_before_month .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
               
              </span>
              <span
                v-if="
                  packagesStore.discountType === 'year' &&
                  pak.package_price_role[0].cost_before_yearly !== 0
                "
              >
                ${{ pak.package_price_role[0].cost_before_yearly .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
               
              </span>
            </div>
          </div>

          <p class="text-[12px] leading-[32px] font-[700] text-darkGrey">
            {{ $t(pak.description) }}
          </p>
        </div>

        <div class="mx-auto text-center w-full flex items-center justify-center mt-[16px]">
          <div
            class="mb-6 space-y-[10px] text-center flex flex-col items-start justify-center"
          >
            <div
              v-for="listFeature in pak.package_items
                .filter((k) => k.section === 'Package')
                .sort((a, b) => a.idx - b.idx)"
              :key="listFeature.name"
              class="flex items-center justify-start rtl:space-x-reverse space-x-[14px] !mx-auto w-full"
            >
              <div>
                <img
                  :src="
                    listFeature.is_available === 1
                      ? `/assets/imgs/checked_list_active.svg`
                      : `/assets/imgs/checked_list_inactive.svg`
                  "
                />
              </div>
              <span class="text-[13px] font-[400] leading-[20px] text-darkGrey">
                {{ $t(listFeature.title) }}
              </span>
            </div>
          </div>
        </div>
        <!-- Button at the bottom -->
        <div class="text-center w-full ">
          <button
          @click="openBuyModal(pak)"

            :disabled="
              pak.package_price_role[0].cost_month === 0 ||
              pak.package_price_role[0].cost_yearly === 0
            "
            class="btn-dashboard hover_tamkin max-w-[205px] !rounded-[19px] mx-auto"
          >
            <span
              v-if="
                pak.trial_days > 0 ||
                (pak.trial_days === 0 &&
                  pak.package_price_role[0].cost_month !== 0 &&
                  pak.package_price_role[0].cost_yearly !== 0)
              "
            >
              {{
                pak.trial_days > 0
                  ? `${$t('Try now for')} ${pak.trial_days} ${getDayLabel(pak.trial_days)}`
                  : $t("Get Started")
              }}</span
            >
            <span
              v-if="
                pak.package_price_role[0].cost_month === 0 ||
                pak.package_price_role[0].cost_yearly === 0
              "
              >{{ $t("Free Package") }}</span
            >
          </button>
        </div>
      </div>
    </div>
    <PackagesFeatures :current-page="'sign'" />
  </div>
</template>
