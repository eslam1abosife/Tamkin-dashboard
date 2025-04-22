<script lang="ts" setup>
import { useGetCryptoList } from "@/composables/useCrypto";
const {
  isOpen: isModalOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const { getCryptoList } = useGetCryptoList();

const cryptostore = useCryptoStore();
const mysiteStore = useMySiteStore();

const isCryptoMenuOpen = ref(false);
const isPromoFilled = ref(false);
const promo = ref("");
const validPromo = ref(false);

// watch(mysiteStore.promo, (ov, nv) => {
//   return mysiteStore.promo
//     ? (mysiteStore.isPromoFilled = true)
//     : (mysiteStore.isPromoFilled = false);
// });
const clearInput = () => {
  promo.value = "";
  validPromo.value = false;
};
const addPromoCode = () => {
  if (promo.value) {
    validPromo.value = !validPromo.value;
  }
};

const removePromoCode = () => {
  if (promo.value) {
    validPromo.value = !validPromo.value;
    promo.value = "";
  }
};
const ChangeCurrentCryptoMethod = (method: any) => {
  //   selectedCrypto.value = method
};

function convertUsdToCrypto(usdTotal, rates, selectedCrypto) {
  const rate = rates[mysiteStore.selectedCrypto.coingecko_id];
  if (rate) {
    return (usdTotal / rate).toFixed(0);
  } else {
    return "undefined";
    // throw new Error(`Cryptocurrency ${selectedCrypto.coingecko_id} not found in the rates`);
  }
}

const isOpen = ref(false);
const search = ref("");

const toggleDropdown = () => {
  isCryptoMenuOpen.value = !isCryptoMenuOpen.value;
};

const selectCryptoMethod = (method) => {
  if (mysiteStore.selectedCrypto !== method) {
    mysiteStore.selectedCrypto = method;
    isCryptoMenuOpen.value = false;
    mysiteStore.promo = "";
    mysiteStore.currentDiscount = 0;
    mysiteStore.validPromo = false;
  } else {
    mysiteStore.selectedCrypto = method;
    isCryptoMenuOpen.value = false;
  }
};
const loading = ref(false);
const filteredCryptoMethods = computed(() => {
  return cryptostore.list
    .filter((method) =>
      method.title.toLowerCase().includes(search.value.toLowerCase())
    )
    .sort((a, b) => a.sort - b.sort);
});
const loadingData = ref(true);
onBeforeMount(async () => {
  await cryptostore.setCryptoList();
  await cryptostore.getRates();
  loadingData.value = false;

  const featuredRate = cryptostore.list.find((rate) => rate.is_featured === 1);

  if (!mysiteStore.selectedCrypto) {
    mysiteStore.selectedCrypto = featuredRate;
  }

  // console.log()
});
const fetchRates = async () => {
  try {
    await cryptostore.getRates(); // Ensure getRates is a method that returns a promise
    console.log("Rates updated");
  } catch (error) {
    console.error("Error fetching rates:", error);
  }
};

// Set up the interval
let intervalId: number | undefined;

onMounted(() => {
  intervalId = setInterval(fetchRates, 60000); // 60000 ms = 1 minute
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
const percentageOff = computed(() => {
  const cartTotal = mysiteStore.packagePayload.total;
  const discountPercentage = mysiteStore.currentDiscount;

  if (discountPercentage > 0 && cartTotal > 0) {
    // Calculate the discount amount based on the percentage
    return cartTotal * (discountPercentage / 100);
  }
  return 0;
});
const discountAmount = computed(() => {
  const cartTotal = mysiteStore.packagePayload.total;
  const cryptoDiscount = mysiteStore.selectedCrypto?.discount || 0;
  const couponDiscount = mysiteStore.currentDiscount;

  // Apply coupon discount first
  const amountAfterCoupon = cartTotal * (1 - couponDiscount / 100);

  // Apply crypto discount to the amount after coupon
  const finalTotal = amountAfterCoupon * (1 - cryptoDiscount / 100);

  // Calculate the discount amount
  return cartTotal - finalTotal;
});

const finalAmount = computed(() => {
  const cartTotal = mysiteStore.packagePayload.total;
  const cryptoDiscount = mysiteStore.selectedCrypto?.discount || 0;
  const couponDiscount = mysiteStore.currentDiscount;

  // Apply coupon discount first
  const amountAfterCoupon = cartTotal * (1 - couponDiscount / 100);

  // Apply crypto discount to the amount after coupon
  const finalTotal = amountAfterCoupon * (1 - cryptoDiscount / 100);

  return finalTotal;
});
</script>

<template>
  <div
    class="bg-selected dark:bg-p fixed z-[9999] top-[0] left-0 rtl:lg:left-0 ltr:lg:left-auto ltr:lg:right-0 rounded-[10px] p-[20px] lg:w-[600px] w-full h-full lg:h-screen !overflow-y-auto lg:overflow-x-hidden"
  >
    <div class="w-full h-full">
      <div class="flex flex-col items-start justify-center w-full">
        <div class="flex items-center justify-between">
          <div
            style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
            class="close_btn_payment !cursor-pointer z-[999] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin !top-[23px]"
            @click="
              () => {
                closeModal('crypto_mysite_step1');
                mysiteStore.selectedPaymentMethod = '';
                mysiteStore.selectedCrypto = '';
              }
            "
          >
            <svg
              class="w-[12px] h-[12px]"
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div class="flex items-center gap-3">
            <div
              @click="
                navigateTo(
                  'crypto_mysite_step1',
                  'mysite',
                  'payment_methods_mysite'
                )
              "
              class="cursor-pointer flex items-center justify-center rtl:rotate-180 bg-white dark:bg-tamkinDarkPrimary border-[1px] border-linecolor rounded-full w-[30px] h-[30px]"
              style="box-shadow: 0px 4px 8.7px 0px #daf3f1"
            >
              <svg
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
                class="fill-tamkin group-hover:stroke-white group-hover:fill-white dark:stroke-light"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"
                />
              </svg>
            </div>
            <h1
              class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin mb-0"
            >
              {{ $t("Payment processes") }}
            </h1>
          </div>
        </div>
        <div
          class="flex flex-col items-start justify-center bg-white dark:bg-tamkinDarkPrimary w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
          :class="[loadingData ? 'pb-[120px]' : '']"
          style="box-shadow: 0px 4px 24px 8px #51459f14"
        >
          <h1
            class="text-[18px] leading-[36px] font-[600] ltr:ml-[20px] rtl:mr-[20px] text-darkGrey dark:text-whiteTamkin mt-[31px]"
          >
            {{ $t("Crypto Payment") }}
          </h1>
          <p
            class="ltr:ml-[20px] rtl:mr-[20px] text-[14px] font-[400] leading-[22.5px] mt-[14px] text-darkGrey dark:text-whiteTamkin"
          >
            {{
              $t(
                "Choose the cryptocurrency you want to complete the payment process"
              )
            }}
          </p>

          <div
            class="flex flex-col items-center justify-center space-y-[12px] mt-[24px] mx-auto w-full"
            v-if="!loadingData"
          >
            <div
              class="flex flex-col items-center justify-center w-full px-[20px]"
            >
              <div
                v-if="mysiteStore.selectedCrypto"
                class="w-full h-[100px] cursor-pointer custom-border-tamkin bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-between rounded-[10px] border-lightGrey rtl:pr-[11px] ltr:pl-[11px]"
              >
                <div
                  class="flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
                >
                  <img
                    :src="`http://tamkin.app/${mysiteStore.selectedCrypto.icon}`"
                    class="w-[25px] h-[25px]"
                  />
                  <div
                    class="flex items-start flex-col justify-start space-y-[-4px]"
                  >
                    <div
                      class="text-[18px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{ mysiteStore.selectedCrypto.title }} -
                      <span class="!font-[300]">{{
                        mysiteStore.selectedCrypto.network
                      }}</span>
                    </div>

                    <div
                      class="text-[#021328] text-[14px] font-[500] dark:text-whiteTamkin"
                      v-if="
                        mysiteStore.selectedCrypto &&
                        mysiteStore.selectedCrypto.is_featured === 1
                      "
                    >
                      {{ $t("Pay Via") }}
                      {{ mysiteStore.selectedCrypto.title }} {{ $t("and get") }}
                      <span class="text-[14px] font-[700]"
                        >{{ mysiteStore.selectedCrypto.discount }}%</span
                      >
                      {{ $t("discount") }}
                    </div>
                  </div>
                </div>

                <div class="order-1 mx-[30px]">
                  <input
                    :id="'radio_' + mysiteStore.selectedCrypto.name"
                    type="radio"
                    name="radio"
                    class="hidden"
                    :value="mysiteStore.selectedCrypto.name"
                    @click=""
                    checked
                    number
                  />
                  <label
                    :for="'radio_' + mysiteStore.selectedCrypto.name"
                    class="flex items-center cursor-pointer p-1"
                  >
                    <span
                      class="w-[22px] h-[22px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                    ></span>
                  </label>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-between w-full px-[20px]">
              <div class="w-full mt-[20px]">
                <div class="relative w-full font-[Poppins]">
                  <button
                    @click="toggleDropdown"
                    class="input_search_country ltr:!pl-[10px] rtl:!pr-[10px] !rounded-[10px] !py-[6px] peer w-full ltr:text-left rtl:text-right"
                    :class="[isCryptoMenuOpen ? 'rounded-b-none' : '']"
                  >
                    <span
                      class="floating_label"
                      v-if="!mysiteStore.selectedCrypto"
                      >{{ $t("Choose Crypto currency") }}</span
                    >
                    <div
                      class="flex items-center justify-between w-full space-x-[10px] rtl:space-x-reverse"
                      v-else
                    >
                      <div
                        class="flex items-center justify-start space-x-[10px] rtl:space-x-reverse"
                      >
                        <img
                          :src="`http://tamkin.app/${mysiteStore.selectedCrypto.icon}`"
                          class="w-[25px] h-[25px]"
                        />
                        <span
                          class="rtl:ml-auto ltr:mr-auto text-[14px] leading-[24px] font-[500] text-[#3D3D3D] dark:text-whiteTamkin"
                          >{{ mysiteStore.selectedCrypto.title }} -
                          <span class="!font-[300]">{{
                            mysiteStore.selectedCrypto.network
                          }}</span>
                        </span>
                        <!-- <span class="!text-light">{{ selectedCrypto.symbols }}</span> -->
                      </div>
                      <div class="flex items-center justify-end">
                        <div class="rtl:mr-auto ltr:ml-auto">
                          <div
                            class="text-[14px] leading-[24px] font-[500] text-[#878787] dark:text-whiteTamkin"
                          >
                            {{
                              cryptostore.rates[
                                mysiteStore.selectedCrypto.coingecko_id
                              ]
                            }}
                          </div>
                        </div>

                        <img
                          v-if="mysiteStore.selectedCrypto"
                          src="/assets/imgs/menu-down.svg"
                          :class="[
                            isCryptoMenuOpen ? 'rotate-90' : 'rtl:rotate-180',
                          ]"
                          class="rtl:mr-[24px] ltr:ml-[24px] rtl:ml-[-10px] ltr:mr-[10px] mb-[2px] rtl:float-left ltr:float-right stroke-current fill-darkGrey dark:fill-whiteTamkin dark:text-whiteTamkin text-darkGrey w-[10px] h-[10px]"
                        />
                      </div>
                    </div>

                    <img
                      v-if="!mysiteStore.selectedCrypto"
                      src="/assets/imgs/menu-down.svg"
                      :class="[
                        isCryptoMenuOpen ? 'rotate-90' : 'rtl:rotate-180',
                      ]"
                      class="rtl:mr-[24px] ltr:ml-[24px] rtl:ml-[-10px] ltr:mr-[10px] mb-[2px] rtl:float-left ltr:float-right stroke-current fill-darkGrey dark:fill-whiteTamkin dark:text-whiteTamkin text-darkGrey w-[10px] h-[10px]"
                    />
                  </button>
                  <div
                    v-if="isCryptoMenuOpen"
                    class="absolute z-10 top-[52px] bg-white dark:bg-tamkinDarkPrimary rounded-[12px] border-[1px] dark:border-darkborder border-[#C8CFEB] shadow w-full py-[16px]"
                  >
                    <ul>
                      <li
                        @click="selectCryptoMethod(cryptoMethod)"
                        v-for="cryptoMethod in filteredCryptoMethods"
                        :key="cryptoMethod.code"
                        class="flex items-center rtl:font-[Poppins] hover:bg-gray-100 dark:hover:bg-darkGrey py-[6px] px-[10px] cursor-pointer"
                      >
                        <img
                          :src="`http://tamkin.app/${cryptoMethod.icon}`"
                          class="w-[25px] h-[25px]"
                        />
                        <span
                          class="rtl:mr-[16px] ltr:ml-[10px] text-[14px] leading-[24px] font-[500] text-[#3D3D3D] dark:text-whiteTamkin"
                          >{{ cryptoMethod.title }} -
                          <span class="!font-[300]">{{
                            cryptoMethod.network
                          }}</span>
                        </span>
                        <!-- <span class="!text-light">{{ cryptoMethod.symbols }}</span> -->
                        <div class="rtl:mr-auto ltr:ml-auto">
                          <div
                            class="text-[14px] leading-[24px] font-[500] text-[#878787] dark:text-whiteTamkin"
                          >
                            {{ cryptostore.rates[cryptoMethod.coingecko_id] }}
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex flex-col items-start justify-center space-y-[24px] w-full px-[20px]"
              v-if="mysiteStore.selectedCrypto"
            >
              <div
                class="flex-1 w-full text-[14px] font-[400] leading-[24px] mt-[10px] dark:text-whiteTamkin text-[#A7A7A7] whitespace-pre-line"
              >
                {{ $t("By Choosing this crypto Currency that equal") }}
                <span class="!font-[600]">
                  {{
                    convertUsdToCrypto(
                      mysiteStore.packagePayload.total,
                      cryptostore.rates,
                      mysiteStore.selectedCrypto.title
                    )
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    " " +
                    mysiteStore.selectedCrypto.title
                  }}
                </span>
                {{ $t("your payment will be") }} :
              </div>

              <div
                class="rounded-[10px] custom-border-tamkin padding-override-1 w-full md:w-auto px-[20px] h-[54px] flex items-center justify-center mx-auto"
              >
                <h3 class="">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]"
                  >
                    <div
                      class="text-[16px] leading-[24px] font-[500] font-[Inter] text-[#3D3D3D] dark:text-whiteTamkin/70"
                    >
                      ${{
                        mysiteStore.packagePayload.total
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }}
                      =
                      <!-- <span class="text-black font-[500] dark:text-whiteTamkin">
                            {{convertUsdToCryptos(mysiteStore.cartTotal,cryptostore.rates)}} {{selectedCrypto.title}}</span> -->
                      {{
                        convertUsdToCrypto(
                          mysiteStore.packagePayload.total -
                            mysiteStore.currentDiscount,
                          cryptostore.rates,
                          mysiteStore.selectedCrypto.title
                        )
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }}
                    </div>
                    <div>
                      <img
                        :src="`http://tamkin.app/${mysiteStore.selectedCrypto.icon}`"
                        class="w-[25px] h-[25px]"
                      />
                    </div>
                  </div>
                </h3>
              </div>
            </div>
            <!-- here-->

            <!-- here-->

            <div
              class="flex flex-col items-center justify-center space-y-[12px] mx-auto w-full"
            >
              <div
                class="flex items-center justify-center rtl:space-x-reverse space-x-[10px] md:space-x-[24px] w-full px-[20px]"
              >
                <div
                  class="lg:py-[17px] search_input w-full lg:w-3/4 mt-[24px]"
                >
                  <input
                    type="text"
                    @input="mysiteStore.noDiscount = false"
                    class="input_dashboard_search max-md:!px-[15px] w-full text-darkGrey dark:text-whiteTamkin !h-[40px]"
                    v-model="mysiteStore.promo"
                    :placeholder="$t('Promo Code')"
                    :class="[
                      mysiteStore.validPromo
                        ? '!bg-[#E8F8F6] dark:!bg-[#170705] !text-[#E8F8F6] dark:!text-[#170705] '
                        : '',
                      mysiteStore.noDiscount
                        ? '!bg-red-500/10 !text-red-500 !border-red-500'
                        : '',
                    ]"
                  />

                  <div
                    class="absolute top-[-8px] lg:top-[8px] right-0 left-0 max-md:px-1 p-[16px] flex items-center justify-evenly rtl:space-x-reverse space-x-1 md:space-x-[10px]"
                    v-if="mysiteStore.validPromo"
                  >
                    <img
                      src="/assets/imgs/promo_valid.svg"
                      class="max-md:w-[16px]"
                    />
                    <div
                      class="text-[13px] md:text-[15px] font-[500] text-darkGrey dark:text-white/70"
                    >
                      <span class="text-[#021328] font-[700] dark:text-white"
                        >{{ mysiteStore.currentDiscount }}%</span
                      >
                      {{ $t("Discount") }} (-${{ percentageOff }})
                    </div>
                    <img
                      src="/assets/imgs/promo_valid_.svg"
                      class="max-md:w-[18px]"
                    />
                  </div>
                  <div
                    v-if="mysiteStore.isPromoFilled && !mysiteStore.noDiscount"
                    @click="clearInput"
                    class="absolute top-[-8px] lg:top-[-27px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer lg:mt-[36px]"
                  >
                    <img src="/assets/imgs/close_promo.svg" />
                  </div>
                </div>

                <div class="text-center mt-[24px] w-auto md:w-2/6">
                  <button
                    class="btn-dashboard max-md:!text-[13px] hover_tamkin w-full mx-auto text-center text-nowrap"
                    @click="mysiteStore.addPromoCode"
                    :disabled="!mysiteStore.promo || mysiteStore.loadingPromo"
                    v-if="!mysiteStore.validPromo"
                  >
                    <div class="flex items-center justify-center">
                      <div
                        :class="
                          mysiteStore.loadingPromo ? 'rtl:ml-2 ltr:mr-2' : ''
                        "
                      >
                        {{ $t("Apply code") }}
                      </div>

                      <svg
                        v-if="mysiteStore.loadingPromo"
                        class="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <button
                    v-else
                    class="btn_bordered_dashboard max-md:!text-[13px] error text-nowrap w-auto md:w-[140px] mx-auto text-center"
                    @click="mysiteStore.removePromoCode"
                  >
                    {{ $t("Remove Code") }}
                  </button>
                </div>
              </div>
              <div
                v-if="mysiteStore.noDiscount"
                class="rtl:ml-auto ltr:!mr-auto px-[20px] !-mt-4 text-[12px] text-red-500"
              >
                {{ $t("Coupon code not found") }}
              </div>
            </div>
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="py-2 ltr:pl-[20px] whitespace-nowrap rtl:pr-[20px] border-b dark:border-darkborder dark:text-whiteTamkin text-[16px] leading-[30px] text-darkGrey font-[600] ltr:text-left rtl:text-right"
                    colspan="12"
                  >
                    {{ $t("Summary") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
                  v-if="false"
                >
                  <td
                    class="py-2 px-5 whitespace-nowrap border-b dark:border-darkborder text-right font-[500] w-full dark:text-whiteTamkin"
                    colspan="2"
                  >
                    {{
                      $t("Promo Code") +
                      " : " +
                      mysiteStore.currentDiscount +
                      "%"
                    }}
                  </td>
                  <td
                    class="py-2 px-5 border-b whitespace-nowrap dark:border-darkborder text-right w-full dark:text-whiteTamkin"
                    colspan="2"
                  >
                    ${{ percentageOff }}
                  </td>
                </tr>
                <tr
                  v-if="
                    mysiteStore.validPromo ||
                    (mysiteStore.selectedCrypto &&
                      mysiteStore.selectedCrypto.is_featured === 1)
                  "
                  class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
                >
                  <td
                    class="py-2 pr-4 whitespace-nowrap border-b dark:border-darkborder text-right font-[500] w-full dark:text-whiteTamkin"
                    colspan="2"
                  >
                    {{ $t("Discount") }}
                  </td>
                  <td
                    class="py-2 px-5 whitespace-nowrap border-b text-right w-full font-[500] dark:text-whiteTamkin"
                    colspan="2"
                  >
                    ${{
                      discountAmount
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </td>
                </tr>
                <tr
                  class="text-[14px] leading-[24px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
                  v-if="mysiteStore.selectedCrypto"
                >
                  <td
                    class="py-2 px-5 border-b whitespace-nowrap dark:border-darkborder text-right font-[500] w-full dark:text-whiteTamkin"
                    colspan="2"
                  >
                    {{ $t("Total Crypto") }}
                  </td>
                  <td
                    class="py-2 px-4 border-b whitespace-nowrap dark:border-darkborder text-right w-full font-[500] whitespace-nowrap dark:text-whiteTamkin"
                    colspan="2"
                  >
                    {{
                      convertUsdToCrypto(
                        finalAmount,
                        cryptostore.rates,
                        mysiteStore.selectedCrypto.title
                      )
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                      " " +
                      mysiteStore.selectedCrypto.title
                    }}
                  </td>
                </tr>
                <tr
                  v-if="false"
                  class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
                >
                  <td
                    class="py-2 px-5 border-b whitespace-nowrap dark:border-darkborder text-right font-[500] w-full dark:text-whiteTamkin"
                    colspan="2"
                  >
                    {{ $t("Total") }}
                  </td>
                  <td
                    class="py-2 px-5 border-b whitespace-nowrap text-right w-full font-[500] dark:text-whiteTamkin"
                    colspan="2"
                  >
                    ${{
                      finalAmount
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-if="loadingData"
            class="flex flex-col items-center justify-start space-y-[12px] mt-[24px] mx-auto w-full min-h-full"
          >
            <!-- Placeholder for Selected Crypto -->
            <div
              class="flex flex-col items-center justify-center w-full px-[20px] min-h-full"
            >
              <div
                class="w-full h-[100px] cursor-pointer bg-gray-200 dark:bg-p dark:border-darkborder animate-pulse rounded-[10px] border-lightGrey"
              >
                <div class="flex items-center justify-between p-[16px]">
                  <div
                    class="flex items-center rtl:space-x-reverse space-x-[13px]"
                  >
                    <div
                      class="w-[25px] h-[25px] bg-gray-300 dark:bg-tamkinDarkPrimary rounded-full"
                    ></div>
                    <div class="flex flex-col justify-center space-y-[-4px]">
                      <div
                        class="w-[150px] h-[18px] bg-gray-300 dark:bg-tamkinDarkPrimary rounded mb-[12px]"
                      ></div>
                      <div
                        class="w-[100px] h-[14px] bg-gray-300 dark:bg-tamkinDarkPrimary rounded mt-[4px]"
                      ></div>
                    </div>
                  </div>
                  <div
                    class="w-[22px] h-[22px] bg-gray-300 dark:bg-tamkinDarkPrimary rounded-full border dark:border-darkborder border-tamkin"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Placeholder for Dropdown Button -->
            <div class="flex items-center justify-between w-full px-[20px]">
              <div class="w-full mt-[20px]">
                <div class="relative w-full">
                  <button
                    class="w-full bg-gray-200 dark:bg-p animate-pulse h-[40px] rounded-[10px] flex items-center justify-between px-[16px]"
                  >
                    <div
                      class="w-[90%] h-[14px] bg-gray-300 dark:bg-tamkinDarkPrimary rounded"
                    ></div>
                    <div
                      class="w-[10px] h-[10px] bg-gray-300 dark:bg-tamkinDarkPrimary rounded"
                    ></div>
                  </button>
                  <div
                    class="absolute z-10 top-[52px] bg-gray-200 dark:bg-tamkinDarkPrimary dark:border-darkborder animate-pulse rounded-[12px] border-light border-[#C8CFEB] shadow w-full py-[16px]"
                  >
                    <ul class="w-full">
                      <li
                        class="flex items-center w-full justify-between hover:bg-gray-300 dark:bg-p dark:hover:bg-p py-[6px] px-[10px] cursor-pointer"
                      >
                        <div
                          class="w-[15px] h-[15px] bg-gray-300 dark:bg-tamkinDarkPrimary rounded-full"
                        ></div>
                        <div
                          class="w-[60%] h-[14px] bg-gray-300 dark:bg-tamkinDarkPrimary rounded mx-[10px]"
                        ></div>
                        <div
                          class="ml-auto w-[30%] h-[14px] bg-gray-300 dark:bg-tamkinDarkPrimary rounded"
                        ></div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="mt-[39px] mx-auto mb-[34px] px-[20px] w-full"
            v-if="!loadingData"
          >
            <button
              class="btn-dashboard hover_tamkin !h-[40px] w-full"
              :disabled="!mysiteStore.selectedCrypto"
              @click="
                navigateTo(
                  'crypto_mysite_step1',
                  'mysite',
                  'crypto_mysite_step2'
                )
              "
            >
              {{ $t("Continue") }}
            </button>
          </div>
          <!-- <div class="mt-[129px]  mx-auto mb-[34px]">
    <button class="processing_payment   lg:w-[535px] w-full " disabled>
      Payment Processing...
    </button>
  </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
