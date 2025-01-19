<script lang="ts" setup>
import { useGetCryptoList } from "@/composables/useCrypto";
import VueQrcode from "@chenfengyuan/vue-qrcode";
import { useCrypto } from "@/composables/useMySite";
import { useClipboard } from '@vueuse/core'
const cryptostore = useCryptoStore();
const mysiteStore = useMySiteStore();
const source = mysiteStore.selectedCrypto.wallet_address
const { text, copy, copied, isSupported } = useClipboard({ source })
const {
  isOpen: isModalOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const { getCryptoList } = useGetCryptoList();
const {  paywithCrypto,messageData,codeStatus} = useCrypto();

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const state = reactive({
  TXID: "",
});
const rules = {
  TXID: { required },
};
const {$toast} = useNuxtApp()
const v$ = useVuelidate(rules, state);

const isCryptoMenuOpen = ref(false);
const isPromoFilled = ref(false);
const promo = ref("");
const validPromo = ref(false);
const cryptoNameMapping = {
  BNB: "binancecoin",
  BTC: "bitcoin",
  ETH: "ethereum",
  TSLT: "tamkin",
  USDT: "tether",
};
watch(promo, (ov, nv) => {
  return promo.value.length > 0
    ? (isPromoFilled.value = true)
    : (isPromoFilled.value = false);
});
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
    return (usdTotal / rate).toFixed(0).toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    // throw new Error(`Cryptocurrency ${selectedCrypto.coingecko_id} not found in the rates`);
  }
}

const isOpen = ref(false);
const search = ref("");

const toggleDropdown = () => {
  isCryptoMenuOpen.value = !isCryptoMenuOpen.value;
};

const selectCryptoMethod = (method) => {
  mysiteStore.selectedCrypto = method;
  isCryptoMenuOpen.value = false;
};
const loading = ref(false);
const filteredCryptoMethods = computed(() => {
  return cryptostore.list.filter((method) =>
    method.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(async () => {
  await cryptostore.setCryptoList();
  await cryptostore.getRates();
  // console.log()
});
const loadingPayment = ref(false);
const fetchRates = async () => {
  try {
    await cryptostore.getRates(); // Ensure getRates is a method that returns a promise
    console.log("Rates updated");
  } catch (error) {
    console.error("Error fetching rates:", error);
  }
};
const copywallet = ()=>{
  copy(source)
  if(copied){
$toast('Copied to clipboard',{hideIn:4000,type:'success'})
  }
}
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
/**
 * Pay with selected cryptocurrency
 */
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
const payCrypto = async () => {
  loadingPayment.value = true;
  await paywithCrypto(state.TXID, 

 `${ convertUsdToCrypto(
  mysiteStore.packagePayload.total - mysiteStore.currentDiscount,
                    cryptostore.rates,
                    mysiteStore.selectedCrypto.title
                  ) + ' '+ mysiteStore.selectedCrypto.title}`,
                  mysiteStore.selectedCrypto.code

  );
  if (codeStatus.value === 200) {



  navigateTo("crypto_mysite_step2", "mysite", "crypto_mysite_success");
  loadingPayment.value = false;
  mysiteStore.urls =[]
  mysiteStore.currentPackage = ''
    mysiteStore.packagePayload = ''
    mysiteStore.tags = []
    mysiteStore.validatedSites = []
    mysiteStore.loadingBlock = []
  // mysiteStore.removeMultipleFromCart(mysiteStore.cartItems);
  }else {
    $toast(messageData.value, { hideIn: 3000, type: 'error' });
    loadingPayment.value = false;
   
  }
};
const percentageOff = computed(() => {
  const subtotal = mysiteStore.cartSubtotal;
  const discount = mysiteStore.currentDiscount;

  if (subtotal > 0) {
    return (discount / subtotal) * 100;
  }
  return 0;
});
const cancelPayment =()=>{
  mysiteStore.promo = ""
  mysiteStore.validPromo = false
  mysiteStore.currentDiscount = 0
  mysiteStore.selectedCrypto = ""
  mysiteStore.urls =[]
  closeModal('crypto_mysite_step2')
}
</script>

<template>
  <div
   
    class="bg-selected dark:bg-p fixed z-[9999] top-[0] rtl:lg:left-0 ltr:right-0 rounded-[10px] p-[20px] lg:w-[600px] w-full h-full lg:h-screen lg:overflow-x-hidden"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn_payment !cursor-pointer z-[999] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin !top-[23px]"
      @click="()=>{
        closeModal('crypto_mysite_step2')
          mysiteStore.selectedPaymentMethod = '' 
        mysiteStore.selectedCrypto = ''
      }"
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
    <div class="w-full h-full">
      <div class="flex flex-col items-start justify-center w-full">
        <div class="flex flex-col items-start justify-center w-full relative">
          <div class="flex items-center justify-center">
            <div
              @click="navigateTo('crypto_mysite_step2', 'mysite', 'crypto_mysite_step1')"
              class="!cursor-pointer z-[999] close_sidebar_btn group flex items-center justify-center rtl:rotate-180 bg-white dark:bg-tamkinDarkPrimary border-[1px] border-linecolor dark:border-darkborder rounded-full w-[30px] h-[30px]"
              style="box-shadow: 0px 4px 8.7px 0px #daf3f1"
            >
              <svg
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
                class="fill-tamkin group-hover:stroke-white group-hover:fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"
                />
              </svg>
            </div>
            <h1
              class="text-[18px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin ltr:ml-[20px] rtl:mr-[20px] lg:mt-0 mt-[60px]"
            >
              {{$t('Payment processes')}}
            </h1>
          </div>
          <div
            class="flex flex-col items-start justify-center bg-white dark:bg-tamkinDarkPrimary w-full h-full rounded-[10px] mt-[33px] mb-[24px]"
            style="box-shadow: 0px 4px 24px 8px #51459f14"
          >
            <h1
              class="text-[18px] leading-[36px] font-[600] ltr:ml-[20px] rtl:mr-[20px] text-darkGrey dark:text-whiteTamkin mt-[31px]"
            >
              {{ $t('Confirm your Payment') }}
            </h1>
            <p
              class="ltr:ml-[20px] rtl:mr-[20px] text-[14px] font-[400] leading-[29px] mt-[14px] text-darkGrey dark:text-whiteTamkin"
            >
             {{$t('Please send')}}
              <span class="text-tamkin font-[600]">
                {{
                  convertUsdToCrypto(
                    finalAmount,
                    cryptostore.rates,
                    mysiteStore.selectedCrypto.title
                  )
                }}
                {{ mysiteStore.selectedCrypto.title +' '}}
              </span>
              {{ $t('to the address below. Please ensure you are sending to the correct address and network, as sending to the wrong address may result in a loss of funds') }}

           
            </p>

            <div
              class="flex flex-col items-center justify-center space-y-[12px] mt-[24px] mx-auto w-full px-[20px]"
            >
              <!-- here-->
              <div
                class="h-[50px] w-full bg-[#FAFCFE] dark:bg-tamkinDarkPrimary border-[1px] border-lightGrey dark:border-darkborder rounded-[10px] mb-[24px] flex items-center justify-start rtl:space-x-reverse space-x-[10px] px-[10px]"
              >
                <div>
                  <img src="/assets/imgs/info.svg" />
                </div>
                <div
                  class="font-[500] text-[14px] leading-[24px] text-darkGrey dark:text-whiteTamkin"
                >
                  {{$t('You must send money through')}}
                </div>
              </div>
              <div
                class="flex items-center flex-col lg:flex-row lg:rtl:space-x-reverse space-x-[16px] justify-center lg:space-y-[0] space-y-[16px] lg:justify-start w-full"
              >
              
              <div class="border rounded-lg">
                <vue-qrcode
                  :value="mysiteStore.selectedCrypto.wallet_address"
                  :options="{ width: 115, height: 115 }"
                ></vue-qrcode>
              </div>
                <div class="w-full">
                  <h2
                    class="text-[14px] leading-[24px] font-[600] mb-[18px] dark:text-whiteTamkin"
                  >
                    {{$t('Send amount')}} :
                    <span class="text-tamkin">
                      {{
                        convertUsdToCrypto(
                          finalAmount,
                          cryptostore.rates,
                          mysiteStore.selectedCrypto.title
                        )
                      }}
                      {{ mysiteStore.selectedCrypto.title }}</span
                    >
                  </h2>
                  <div
                    class="border custom-border-tamkin padding-override-1 w-full h-[40px] rounded-[10px]
                     flex items-center justify-between px-[10px]"
                  >
                    <div class="flex items-center rtl:space-x-reverse justify-center space-x-[8px]">
                      <img
                        :src="`http://tamkin.app/${mysiteStore.selectedCrypto.icon}`"
                        class="w-[20px] h-[20px]"
                      />
                      <div
                        class="text-[#878787] text-[12px] dark:text-whiteTamkin/70 truncate w-72 text-ellipsis whitespace-nowrap"
                      >
                        {{ mysiteStore.selectedCrypto.wallet_address }}
                      </div>
                    </div>
                    <img @click="copywallet()"
                      class="rtl:mr-auto ltr:ml-auto cursor-pointer h-[20px]"
                      src="/assets/imgs/crypto_methods_icons/copy_code.svg"
                    />
                  </div>
                </div>
              </div>

              <div class="w-full">
                <p
                  class="text-[14px] leading-[29px] font-[600] mt-[26px] dark:text-whiteTamkin"
                >
                  {{ $t(`To expedite verification, please provide the HASH or TXID of the transaction used to transfer the amount to our address`) }}
                </p>
              </div>

              <div class="w-full relative">
                <input
                  type="text"
                  placeholder="{{$t('TXID')}}"
                  id="TXID"
                  class="input_floating_label peer w-full"
                  v-model="v$.TXID.$model"
                  :class="{
                    input_error: v$.TXID.$error && v$.TXID.required.$invalid,
                    error_text: v$.TXID.$error && v$.TXID.required.$invalid,
                    input_success: !v$.TXID.$error && !v$.TXID.$invalid,
                  }"
                />
                <label
                  for="TXID"
                  class="floating_label"
                  :class="[
                    v$.TXID.$error && v$.TXID.required.$invalid ? '!text-error' : '',
                  ]"
                >
                  {{ $t("Insert transaction TXID -HASH*") }}
                </label>
                <div
                  class="w-full lg:w-4/6"
                  v-if="v$.TXID.$error && v$.TXID.required.$invalid"
                >
                  <p class="error_message">
                    <span v-if="v$.TXID.$error && v$.TXID.required.$invalid">{{
                      $t("Transaction TXID -HASH is required")
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="mt-[39px] mx-auto mb-[34px] px-[20px] w-full">
              <button
                class="btn-dashboard hover_tamkin !h-[40px] w-full"
                :disabled="v$.TXID.required.$invalid || loadingPayment"
                @click="payCrypto"
              >
                <div class="flex items-center justify-center">
                  <div :class="loadingPayment ? 'rtl:ml-2 ltr:mr-2' : ''">
                    {{ $t("Confirm Payment") }}
                  </div>

                  <svg
                    v-if="loadingPayment"
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
                class="btn_bordered_dashboard normal_hover mx-auto mt-[18px] w-full"
                @click="cancelPayment"
              >
                {{ $t('Cancel') }}
              </button>
            </div>
          </div>
        </div>

        <!-- <div class="mt-[129px]  mx-auto mb-[34px]">
    <button class="processing_payment   lg:w-[535px] w-full " disabled>
      Payment Processing...
    </button>
  </div> -->
      </div>
    </div>
  </div>
</template>
