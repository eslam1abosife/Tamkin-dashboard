<script lang="ts" setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
const { locale } = useI18n();
const localePath = useLocalePath();
const pricingType = inject("pricingType");
const packagesStore = usePackgesStore();
const cryptoStroe = useCryptoStore();
const props = defineProps({
  currentType: String,
});
function getDayLabel(number) {
  return number === 1 ? "day" : "days";
}
onBeforeMount(async () => {
  await cryptoStroe.getRates();
});
function convertUsdToCrypto(usdTotal, rates) {
  const rate = rates["tamkin"];
  if (rate) {
    return (usdTotal / rate).toFixed(0);
  } else {
    // throw new Error(`Cryptocurrency ${selectedCrypto.coingecko_id} not found in the rates`);
  }
}
const filteredPackages = computed(() => {
  return packagesStore.packages
    .filter(
      (pkg) =>
        pkg.type === "Investors" &&
        pkg.package_type === "Package" &&
        pkg.package_price_role.some(
          (item) => item.title === packagesStore.views_level
        )
    )
    .sort((a, b) => a.sort - b.sort)
    .map((pkg) => {
      const priceRole = pkg.package_price_role.find(
        (item) => item.title === packagesStore.views_level
      );
      // console.log('yea man')
      return {
        ...pkg,
        cost_before_month: priceRole.cost_before_month,
        cost_year: priceRole.cost_year,
        cost_month: priceRole.cost_month,
        cost_3_month: priceRole.cost_3_month,
        cost_investor: priceRole.cost_investor,
        is_contact_us: priceRole.is_contact_us,
        data_cost_month: priceRole.data_cost_month,
        cost_yearly: priceRole.cost_yearly,
        discount_month: priceRole.discount_month,
        discount_3_month: priceRole.discount_3_month,
        discount_yearly: priceRole.discount_yearly,
        cost_before_yearly: priceRole.cost_before_yearly,
      };
    });
});
</script>

<template>
  <div class="flex items-center flex-col justify-center w-full">
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
      class="h-full w-full mt-[32px] pb-7 xl:pb-0"
    >
      <SplideSlide
        v-for="pack in filteredPackages.sort((a, b) => a.sort - b.sort)"
        :key="pack.name"
      >
        <div
          :class="[
            packagesStore.investorUser &&
            packagesStore.investorUser.package === pack.name
              ? 'bg-selected'
              : '',
          ]"
          class="flex items-center dark:bg-p hover:dark:bg-p flex-col justify-start custom-border-tamkin padding-override-1 !rounded-t-[10px] !rounded-b-none mt-[35px] w-full ipad-max:w-full"
          style="padding: 16px, 10px, 16px, 10px"
        >
          <div
            v-if="pack.type_deal !== 'None'"
            class="absolute flex items-center justify-center text-[13px] leading-[17.76px] font-[500] w-[83px] h-[28px] rounded-[10px] text-white dark:text-darkTamkin top-[-15px] rtl:lg:right-[250px] ltr:lg:left-[250px]"
            style="
              background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
            "
          >
            <div class=" ">{{ $t(pack.type_deal) }}</div>
          </div>
          <div class="absolute top-[-35px] rtl:right-[5px] ltr:left-[5px]">
            <img
              class="w-[65px] h-[65px]"
              :src="`https://tamkin.app/${pack.icon}`"
            />
          </div>

          <div
            class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
          >
            <div class="order-2 relative w-full">
              <h1
                class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin"
              >
                {{ $t(pack.title) }}
              </h1>

              <div
                class="relative text-black dark:text-whiteTamkin font-[600] text-[20px] leading-[29px] flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
              >
                <div
                  class="!font-[400] !text-[#536174] !text-[14px] leading-[19px] dark:!text-whiteTamkin"
                >
                  {{ $t(pack.sub_title) }}
                </div>
                <!-- {{  pack.package_price_role[0] }} -->
                <div>
                  $
                  {{
                    pack.cost_investor
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </div>
              </div>
              <h2
                class="font-[500] my-[16px] text-[14px] leading-[15px] text-[#536174] dark:text-whiteTamkin"
              >
                {{ $t(pack.description) + " " }}
                <span class="font-[700]"
                  >{{
                    cryptoStroe.rates
                      ? (
                          convertUsdToCrypto(
                            pack.cost_investor,
                            cryptoStroe.rates
                          ) || 0
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "loading"
                  }}
                  TSLT</span
                >
              </h2>
            </div>
          </div>

          <div
            v-if="packagesStore.showMoreINInvestors"
            class="flex flex-col items-start justify-center w-full space-y-[10px] h-auto custom-border-collapse-tamkin rounded-t-none rounded-[10px] p-4 dark:text-whiteTamkin"
          >
            <div
              v-for="item in pack.package_items
                .filter((k) => k.section === 'Package')
                .sort((a, b) => a.idx - b.idx)"
              :key="item.name"
              class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
            >
              <div>
                <img
                  :src="
                    item.is_available
                      ? '/assets/imgs/checked_list_active.svg'
                      : '/assets/imgs/checked_list_inactive.svg'
                  "
                />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  {{ $t(item.title) }}
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-center mx-auto w-full">
              <button
                @click="
                  $router.push({ path: localePath({ name: 'how-to-join' }) })
                "
                :disabled="
                  packagesStore.investorUser &&
                  packagesStore.investorUser.package === pack.name
                "
                class="btn-dashboard hover_tamkin rounded-full mt-[16px] font-[600]"
              >
                {{
                  packagesStore.investorUser &&
                  packagesStore.investorUser.package === pack.name
                    ? $t("Current Package")
                    : packagesStore.investorUser &&
                      packagesStore.investorUser.package !== pack.name
                    ? $t("Buy more to upgrade")
                    : $t("How To Join")
                }}
              </button>
            </div>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>
