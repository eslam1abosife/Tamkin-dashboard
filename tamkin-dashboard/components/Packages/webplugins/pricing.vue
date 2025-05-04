<script lang="ts" setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
const { locale } = useI18n();
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const pricingType = inject("pricingType");
const packagesStore = usePackgesStore();
function getDayLabel(number) {
  return number === 1 ? "day" : "days";
}
const openBuyModal = (pck) => {
  packagesStore.currentPackage = pck;
  packagesStore.currentWebsite = "";
  packagesStore.openedCurrentSite = false;

  openModal("add_package_modal_packages");
};
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div
      class="flex items-center xl:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly h-full w-full lg:rtl:space-x-reverse xl:space-x-[36px] mt-[32px] pt-5"
    >
      <Splide
        :options="{
          rewind: true,
          arrows: false,
          direction: `${locale === 'ar' ? 'rtl' : 'ltr'}`,
          gap: 36,
          perPage: 3,
          breakpoints: {
            768: {
              perPage: 1,
            },
            877: {
              perPage: 2,
            },
          },
          width: '100%',
        }"
        class="w-full pb-7 xl:pb-0"
      >
        <SplideSlide
          v-for="pak in packagesStore.getPackageByTypeAndCategory('Package')"
          :key="pak.name"
        >
          <div
            class="flex items-center flex-col dark:bg-tamkinDarkPrimary dark:text-whiteTamkin custom-border mx-auto justify-start !rounded-t-[10px] relative !rounded-b-none mt-[35px] group bg-white hover:bg-selected dark:hover:bg-p dark:hover:bg-p w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div
              v-if="pak.type_deal !== 'None'"
              :class="[
                pak.type_deal === 'Best Value'
                  ? ' bg-[#C16487] '
                  : pak.type_deal === 'Best Deal'
                  ? 'bg-gradient-to-br from-[#2dada3] to-[#71dad2]'
                  : 'bg-[#5E4352]',
              ]"
              class="absolute flex items-center justify-center text-[13px] leading-[17.76px] font-[500] w-[83px] h-[28px] rounded-[10px] text-white dark:text-whiteTamkin top-[-15px] rtl:lg:right-[50%] ltr:lg:left-[50%]"
            >
              <div class=" ">{{ $t(pak.type_deal) }}</div>
            </div>
            <div class="absolute top-[-30px] rtl:right-[15px] ltr:left-[15px]">
              <img
                :src="`http://tamkin.app/${pak.icon}`"
                class="w-[50px] h-[50px]"
              />
            </div>

            <div
              class="flex items-center justify-center w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 w-full">
                <h1
                  class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                  {{ $t(pak.title) }}
                </h1>
                <h2
                  class="h-[30px] font-[400] text-[12px] leading-[15px] text-[#536174] dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                  {{ $t(pak.sub_title) }}
                </h2>

                <h3
                  class="mt-[16px] text-black dark:text-whiteTamkin font-[600] text-[24px] leading-[29px]"
                >
                  $
                  {{
                    packagesStore.discountType === "month"
                      ? pak.package_price_role[0].cost_month
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : pak.package_price_role[0].cost_yearly
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}

                  <span
                    class="!font-[500] !text-darkGrey dark:!text-whiteTamkin !text-[18px]"
                    >/{{ $t(packagesStore.discountType) }}</span
                  >
                </h3>
                <div
                  v-if="
                    pak.package_price_role[0].cost_before_month !== 0 ||
                    pak.package_price_role[0].cost_before_yearly !== 0
                  "
                  class="text-[#EA4335] text-[16px] font-[500] line-through px-[2px]"
                >
                  <span
                    v-if="
                      packagesStore.discountType === 'month' &&
                      pak.package_price_role[0].cost_before_month !== 0
                    "
                  >
                    $
                    {{
                      pak.package_price_role[0].cost_before_month
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </span>
                  <span
                    v-if="
                      packagesStore.discountType === 'year' &&
                      pak.package_price_role[0].cost_before_yearly !== 0
                    "
                  >
                    $
                    {{
                      pak.package_price_role[0].cost_before_yearly
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </span>
                </div>
                <div
                  v-if="
                    (packagesStore.discountType === 'month' &&
                      pak.package_price_role[0].cost_before_month === 0) ||
                    (packagesStore.discountType === 'year' &&
                      pak.package_price_role[0].cost_before_yearly === 0)
                  "
                  class="my-[24px]"
                >
                  <!-- Content here will be displayed if either cost_before_month or cost_before_yearly is zero -->
                </div>

                <p
                  class="font-[700] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                  {{ $t(pak.description) }}
                </p>
              </div>
            </div>
            <div
              class="flex group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin flex-col items-start justify-center w-full space-y-[10px] h-auto custom-border-collapse rounded-t-none rounded-[10px] p-4"
            >
              <div
                v-for="item in pak.package_items
                  .filter((k) => k.section === 'Package')
                  .sort((a, b) => a.idx - b.idx)"
                :key="item.name"
                class="flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
              >
                <div class="w-[25px] h-[25px]">
                  <img
                    class="w-full h-full"
                    :src="
                      item.is_available
                        ? '/assets/imgs/checked_list_active.svg'
                        : '/assets/imgs/checked_list_inactive.svg'
                    "
                  />
                </div>
                <div>
                  <h3
                    class="text-[12px] whitespace-nowrap overflow-hidden font-[400] leading-[20px]"
                  >
                    {{ $t(item.title) }}
                  </h3>
                </div>
              </div>

              <div class="flex items-center justify-center mx-auto w-full">
                <button
                  @click="openBuyModal(pak)"
                  :disabled="
                    pak.cost_month !== 0 &&
                    pak.cost_yearly !== 0 &&
                    !pak.is_contact_us &&
                    pak.trial_days === 0
                  "
                  class="btn-dashboard hover_tamkin w-full !rounded-[19px] mx-auto"
                >
                  <!-- Contact Us Case -->
                  <span v-if="pak.is_contact_us"> {{ $t("Contact us") }} </span>

                  <!-- Trial or Buy Now Case -->
                  <span
                    v-else-if="
                      pak.trial_days > 0 ||
                      (pak.trial_days === 0 &&
                        pak.cost_month !== 0 &&
                        pak.cost_yearly !== 0)
                    "
                  >
                    {{
                      pak.trial_days > 0
                        ? `Try now for ${pak.trial_days} ${getDayLabel(
                            pak.trial_days
                          )}`
                        : ""
                    }}
                  </span>

                  <!-- Free Package Case -->
                  <span
                    v-else-if="pak.cost_month === 0 && pak.cost_yearly === 0"
                  >
                    {{ $t("Free Package") }}
                  </span>
                  <span v-else>{{ $t("Get Started") }}</span>
                </button>
              </div>
            </div>
          </div>
        </SplideSlide>
      </Splide>
    </div>

    <PackagesFeatures
      :current-page="'sign'"
      v-if="!packagesStore.loadingData"
    />
  </div>
</template>
