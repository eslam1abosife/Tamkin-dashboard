<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";

import bnbIcon from "/assets/imgs/crypto_methods_icons/3.svg";
import usdtIcon from "/assets/imgs/crypto_methods_icons/2.svg";
import ethIcon from "/assets/imgs/crypto_methods_icons/1.svg";
const withdrawStore = useWithdrawStore();
const state = storeToRefs(withdrawStore);
const { locale, locales } = useI18n()  
const rules = {
  wallet: { required },
};

const v$ = useVuelidate(rules, state.cryptoDetails);

const isCryptoMenuOpen = ref(false);

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();

const cryptoMethods = [
  { code: "ETH", name: "ETH", flag: bnbIcon },
  { code: "USDT", name: "USDT", flag: usdtIcon },
  { code: "BNB", name: "BNB", flag: ethIcon },
];

const toggleDropdown = () => {
  isCryptoMenuOpen.value = !isCryptoMenuOpen.value;
};

const selectCryptoMethod = (method) => {
  withdrawStore.selectedCrypto = method;
  isCryptoMenuOpen.value = false;
};
const search = ref("");

const loading = ref(false);
const filteredCryptoMethods = computed(() => {
  return withdrawStore.cryptoTypes.filter((method) =>
    method.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

onMounted(() => {
  withdrawStore.setCryptoList();
});
const isLoading = ref(false);
const gotoStep2 = () => {
  isLoading.value = true;
  setTimeout(() => {
    withdrawStore.cyrptoTransactionDetails = Object.assign(
      {},
      {
        wallet: withdrawStore.cryptoDetails,
        ...withdrawStore.selectedCrypto,
      }
    );
    navigateTo("crypto_step1", "referrals", "crypto_step_2_e");
    isLoading.value = false;
    isCryptoMenuOpen.value = false;

    v$.value.$reset();
  }, 1500);
};

const closeAndReset = () => {
  withdrawStore.selectedPaymentMethod = "";
  withdrawStore.cryptoDetails.wallet = "";
  withdrawStore.selectedCrypto = "";
  v$.value.$reset();
  closeModal("crypto_step1");
  isCryptoMenuOpen.value = false;
};
</script>

<template>
  <div
    v-if="isOpen('crypto_step1')"
    class="fixed z-[9999] top-[50px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] h-[513px] w-[600px]"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <!-- isOpen('withdraw_paymentmethods') -->
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeAndReset"
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
    <div class="mx-auto max-h-[100%] w-full">
      <h1
        class="rtl:text-right ltr:text-left font-[700] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]"
      >
       {{ $t('Withdraw Money') }}
      </h1>

      <div class="flex flex-col items-center justify-center w-full">
        <div class="w-full lg:mt-0 mt-[16px]">
          <p
            class="text-[16px] font-[400] leading-[24px] ltr:text-left rtl:text-right mt-[10px] mb-[23px] dark:text-whiteTamkin text-[#3D3D3D]"
          >
            {{ $t("Please choose withdrawal currency") }}
          </p>

          <div class="relative w-full">
            <button
              @click="toggleDropdown"
              class="input_search_country ltr:!pl-[10px] rtl:!pr-[10px] !rounded-[10px] !py-[6px] peer w-full ltr:text-left rtl:text-right"
              :class="[isCryptoMenuOpen ? 'rounded-b-none' : '']"
            >
              <span class="floating_label" v-if="!withdrawStore.selectedCrypto"
                >{{$t('Choose Crypto currency')}}</span
              >
              <div class="flex items-center justify-between w-full space-x-[10px] rtl:space-x-reverse" v-else>
                <div class="flex items-center justify-start space-x-[10px] rtl:space-x-reverse">
                  <img
                :src="`http://tamkin.app/${withdrawStore.selectedCrypto.icon}`"
                class=" w-[25px] h-[25px]"
              />
              <span
                class=" rtl:ml-auto ltr:mr-auto text-[14px] leading-[24px] font-[500] text-[#3D3D3D] dark:text-whiteTamkin"
                >{{ withdrawStore.selectedCrypto.title }} -
                <span class="!text-light">{{
                  withdrawStore.selectedCrypto.symbols
                }}</span></span
              >
               </div>
            <div class="flex items-center justify-end ">
              <div class="rtl:mr-auto ltr:ml-auto">
                <div
                  class="text-[14px] leading-[24px] font-[500] text-[#878787] dark:text-whiteTamkin"
                >
                  {{ withdrawStore.selectedCrypto.network }}
                </div>
              </div>

              <img
                v-if="withdrawStore.selectedCrypto"
                src="/assets/imgs/menu-down.svg"
                :class="[isCryptoMenuOpen ? 'rotate-90' : 'rtl:rotate-180']"
                class="rtl:mr-[24px] ltr:ml-[24px] rtl:ml-[-10px] 
                ltr:mr-[10px] mb-[2px] rtl:float-left ltr:float-right stroke-current
                 fill-darkGrey dark:fill-whiteTamkin dark:text-whiteTamkin text-darkGrey w-[10px] h-[10px]"
              />
            </div>
              </div>

              <img
                v-if="!withdrawStore.selectedCrypto"
                src="/assets/imgs/menu-down.svg"
                :class="[isCryptoMenuOpen ? 'rotate-90' : 'rtl:rotate-180']"
                class="rtl:mr-[24px] ltr:ml-[24px] rtl:ml-[-10px] 
                ltr:mr-[10px] mb-[2px] rtl:float-left ltr:float-right stroke-current
                 fill-darkGrey dark:fill-whiteTamkin dark:text-whiteTamkin text-darkGrey w-[10px] h-[10px]"              />
            </button>
            <div
              v-if="isCryptoMenuOpen"
              class="absolute z-10 top-[52px] bg-white dark:bg-tamkinDarkPrimary rounded-[12px] border-[1px] 
              dark:border-light border-[#C8CFEB] shadow w-full py-[16px]"
            >
              <ul>
                <li
                  @click="selectCryptoMethod(cryptoMethod)"
                  v-for="cryptoMethod in filteredCryptoMethods"
                  :key="cryptoMethod.code"
                  class="flex items-center hover:bg-gray-100 dark:hover:bg-darkGrey py-[6px] px-[10px] cursor-pointer"
                >
                  <img
                    :src="`http://tamkin.app/${cryptoMethod.icon}`"
                    class="w-[25px] h-[25px]"
                  />
                  <span
                    class="rtl:mr-[16px] ltr:ml-[10px] text-[14px] leading-[24px] font-[500] text-[#3D3D3D] dark:text-whiteTamkin"
                    >{{ cryptoMethod.title }} -
                    <span class="!text-light">{{ cryptoMethod.symbols }}</span></span
                  >

                  <div class="rtl:mr-auto ltr:ml-auto ">
                    <div
                      class="text-[14px] leading-[24px] font-[500] text-[#878787] dark:text-whiteTamkin"
                    >
                      {{ cryptoMethod.network }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="text-[14px] font-[600] text-[#021328] mt-[24px]">
        {{ $t("Wallet Address") }}
      </div>

      <div class="w-full relative mt-[14px] rounded-[10px]">
        <div class="absolute top-[12px] rtl:pr-[10px] ltr:pl-[10px]">
          <img
            v-if="withdrawStore.selectedCrypto && withdrawStore.selectedCrypto.icon"
            :src="`http://tamkin.app/${withdrawStore.selectedCrypto.icon}`"
            class="w-[20px] h-[20px]"
          />
        </div>
        <input
          type="text"
          placeholder=""
          id="walletAddress"
          :disabled="!withdrawStore.selectedCrypto"
          :class="[
            v$.wallet.$error && v$.wallet.required.$invalid
              ? 'input_error'
              : !v$.wallet.$error && !v$.wallet.$invalid
              ? 'input_success'
              : 'border-[1px] border-lightGrey ',
          ]"
          class="disabled:bg-gray-100 disabled:cursor-not-allowed peer focus:outline-none h-[40px] 
          focus:border-lightGrey rounded-[10px] focus:ring-0 rtl:pr-[42px] ltr:pl-[42px] w-full"
          v-model="v$.wallet.$model"
        />
        <label
          for="walletAddress"
          class="floating_label !mr-0 !ml-0"
          :class="[v$.wallet.$error && v$.wallet.required.$invalid ? '!text-error' : '',
          withdrawStore.selectedCrypto ? 'rtl:!mr-[10px] ltr:!ml-[32px]':''
          ]"
        >
          {{ $t("Wallet Address") }}*
        </label>
        <div
          class="w-full lg:w-4/6"
          v-if="v$.wallet.$error && v$.wallet.required.$invalid"
        >
          <p class="error_message">
            <span v-if="v$.wallet.$error && v$.wallet.required.$invalid">{{
              $t("Wallet Address is required")
            }}</span>
          </p>
        </div>
      </div>
      <div
        class="text-[12px] font-[500] leading-[18px] text-[#021328] mt-[16px]"
        v-if="withdrawStore.selectedCrypto"
      >

     
        {{ $t("Please ensure you enter the correct address on the") }}
    <span v-if="locale === 'ar'">
      {{ $t("network") +' '}}
    </span>
        <span class="!font-[700]"
          >{{ withdrawStore.selectedCrypto.network }} {{ locale === 'ar'  ? '.':' ' }}
        </span>

        <span v-if="locale === 'en'">
            {{ $t("network") }}.
        </span>
        
        {{ $t("Using an incorrect network may result in the permanent loss of your funds") }}
      </div>

      <div class="mt-[16px] w-full h-[36px]" v-if="!withdrawStore.selectedCrypto"></div>

      <div
        class="ipad-max:mt-[90px] mt-[91px] 2xl:mt-[119px] rtl:mr-auto ltr:ml-auto"
      >
        <button
          class="btn-dashboard hover_tamkin"
          @click="gotoStep2"
          :disabled="isLoading || v$.$invalid || !withdrawStore.selectedCrypto"
        >
          <div class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]">
            <div :class="isLoading ? 'rtl:ml-2 ltr:mr-2' : ''">{{$t('Continue')}}</div>

            <svg
              v-if="isLoading"
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
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
