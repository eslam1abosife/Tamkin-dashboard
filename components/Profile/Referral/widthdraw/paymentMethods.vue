<script lang="ts" setup>
import { useModalManager } from "@/composables/useModalManager";
import { useGetAppInvites, useUpdateDefaultApp } from "@/composables/useTeam";
import { useGetPaymentTypes } from "@/composables/useReferral";
import { useRuntimeConfig } from "#app";

const { getInviteApps, defaultApp, apps } = useGetAppInvites();
const { updateDefaultApp } = useUpdateDefaultApp();
const { getPaymentTypes } = useGetPaymentTypes();

const getApps = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  await getInviteApps({ agency: user.agency });
};
const config = useRuntimeConfig();
const baseImageURL = config.public.baseImagerUrl;

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();

const props = defineProps({
  showModal: Boolean,
});
const checked = ref("");

const withdrawStore = useWithdrawStore();

const isSearchfilled = ref(false);
// const withdrawStore.selectedPaymentMethod = ref("");

const search = ref("");
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});

const paymentMethods = ref([]);
onMounted(async () => {
  const result = await getPaymentTypes();
  paymentMethods.value = result.data;

  // console.log(paymentMethods.value)
  await getApps();

  if (defaultApp.value) {
    // console.log(defaultApp.value.name);
    // console.log(checked.value);
    checked.value = defaultApp.value.name;
  }
});
const loadingPayment = ref(false);

const goToPaymentMethod = (method: any) => {
  if (withdrawStore.selectedPaymentMethod.title === "Bank Account") {
    loadingPayment.value = true;
    setTimeout(() => {
      withdrawStore.paymentMethodName = withdrawStore.selectedPaymentMethod.name;
      navigateTo("withdraw_paymentmethods", "referrals", "details_bank_withdraw");
      loadingPayment.value = false;
    }, 1500);
  }
  if (withdrawStore.selectedPaymentMethod.title === "PayPal") {
    loadingPayment.value = true;
    setTimeout(() => {
      withdrawStore.paymentMethodName = withdrawStore.selectedPaymentMethod.name;
      navigateTo("withdraw_paymentmethods", "referrals", "paypal_withdraw_step1");
      loadingPayment.value = false;
    }, 1500);
  }
  if (withdrawStore.selectedPaymentMethod.title === "Crypto currency") {
    loadingPayment.value = true;
    setTimeout(() => {
      withdrawStore.paymentMethodName = withdrawStore.selectedPaymentMethod.name;
      navigateTo("withdraw_paymentmethods", "referrals", "crypto_step1");

      loadingPayment.value = false;
    }, 1500);
  }
};

const closeModalAndresetPaymentMethods = () => {
  withdrawStore.selectedPaymentMethod = "";
  closeModal("withdraw_paymentmethods");
};
</script>

<template>
  <div
    v-if="isOpen('withdraw_paymentmethods')"
    class="fixed z-[9999] top-0 2xl:top-[50px] lg:top-[40px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] h-auto 2xl:h-[600px] lg:w-[640px] ipad-max:top-[20px] w-full"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <!-- isOpen('withdraw_paymentmethods') -->
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeModalAndresetPaymentMethods"
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
    <div class="container mx-auto max-h-[100%]">
      <h1
        class="rtl:text-right ltr:text-left font-[700] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]"
      >
        {{$t('Withdraw Money')}}
      </h1>
      <!-- {{ paymentMethods }} -->
      <p
        class="mt-[16px] rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[14px] leading-[24px]"
      >
        {{$t('Ensure a smooth, secure, and hassle-free withdrawal by selecting a withdrawal method, which allows you to access your funds quickly and conveniently')}}
      </p>

      <div
        class="flex flex-col items-start justify-center space-y-[12px] mt-[30px] w-full"
      >
        <!-- <div class="w-full">
            <div 
            @click="withdrawStore.selectedPaymentMethod = 'by_bank'"
            :class="[withdrawStore.selectedPaymentMethod == 'by_bank' ? 'custom-border-tamkin' : 'border-[1px] ']"
            class="mx-auto  w-full h-[87px] cursor-pointer bg-[#FAFCFE]  dark:bg-tamkinDarkPrimary
            flex items-center justify-between rounded-[10px] border-lightGrey dark:border-light ltr:pl-[16px] rtl:pr-[16px]">
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                    <div><img  src="/assets/imgs/payment_methods/cc.svg"  class="w-[40px] h-[40px]"/></div>
                    <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin" >
                        Bank Account </div>
                </div>
                <div class="order-1 mx-[4px]">
                    <input
                      id="radio5"
                      type="radio"
                      name="radio"
                      class="hidden"
                      value="by_card"
                    v-model="withdrawStore.selectedPaymentMethod"
                    :checked="withdrawStore.selectedPaymentMethod === 'by_bank'"
    
                    />
                    <label for="radio5" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                      <span
                        class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                      ></span>
                    </label>
                  </div>
            </div>
            
        </div>
     
        <div class=" w-full ">
            <div 
            @click="withdrawStore.selectedPaymentMethod = 'by_crypto'"
            :class="[withdrawStore.selectedPaymentMethod == 'by_crypto' ? 'custom-border-tamkin' : 'border-[1px] ']"
            class="mx-auto  w-full  h-[87px] cursor-pointer bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-between
             rounded-[10px] border-lightGrey dark:border-light ltr:pl-[16px] rtl:pr-[16px]">
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                    <div><img  src="/assets/imgs/payment_methods/crypto.svg"  class="w-[40px] h-[40px]"/></div>
                    <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin">Crypto currency</div>
                </div>
                <div class="order-1 mx-[4px]">
                    <input
                      id="radio_crypto"
                      type="radio"
                      name="radio"
                      class="hidden"
                      value="by_crypto"
                    v-model="withdrawStore.selectedPaymentMethod"
                    :checked="withdrawStore.selectedPaymentMethod === 'by_crypto'"
    
                    />
                    <label for="radio_crypto" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                      <span
                        class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                      ></span>
                    </label>
                  </div>
            </div>
            
        </div>
        <div class=" w-full ">
            <div 
            @click="withdrawStore.selectedPaymentMethod = 'by_paypal'"
            :class="[withdrawStore.selectedPaymentMethod == 'by_paypal' ? 'custom-border-tamkin' : 'border-[1px] ']"
            class="mx-auto  w-full  h-[87px] cursor-pointer bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center 
            justify-between rounded-[10px] border-lightGrey dark:border-light ltr:pl-[16px] rtl:pr-[16px]">
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                    <div><img  src="/assets/imgs/payment_methods/paypal.svg"  class="w-[40px] h-[40px]"/></div>
                    <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin">PayPal</div>
                </div>
                <div class="order-1 mx-[4px]">
                    <input
                      id="radio_paypal"
                      type="radio"
                      name="radio"
                      class="hidden"
                      value="by_paypal"
                    v-model="withdrawStore.selectedPaymentMethod"
                    :checked="withdrawStore.selectedPaymentMethod === 'by_paypal'"
    
                    />
                    <label for="radio_paypal" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                      <span
                        class="w-[24px] h-[24px] bg-white  dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                      ></span>
                    </label>
                  </div>
            </div>
            
        </div>        -->

        <template v-for="method in paymentMethods" :key="method.name">
          <div class="w-full">
            <div
              @click="withdrawStore.selectedPaymentMethod = method"
              :class="[
                withdrawStore.selectedPaymentMethod == method
                  ? 'custom-border-tamkin'
                  : 'border-[1px] ',
              ]"
              class="mx-auto w-full h-[87px] cursor-pointer bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-between rounded-[10px] border-lightGrey dark:border-light ltr:pl-[16px] rtl:pr-[16px]"
            >
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]"
              >
                <div>
                  <img :src="baseImageURL + method.icon" class="w-[40px] h-[40px]" />
                </div>
                <div
                  class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin"
                >
                  {{ method.title }}
                </div>
              </div>
              <div class="order-1 mx-[4px]">
                <input
                  :id="'radio_' + method.title"
                  type="radio"
                  name="radio"
                  class="hidden"
                  :value="method.title"
                  v-model="withdrawStore.selectedPaymentMethod"
                  :checked="withdrawStore.selectedPaymentMethod === method"
                />
                <label
                  :for="'radio_' + method.title"
                  class="flex items-center cursor-pointer ltr:pr-[40px] rtl:pl-[40px]"
                >
                  <span
                    class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="ipad-max:mt-[40px] mt-[69px] px-[20px] rtl:mr-auto ltr:ml-auto">
        <button
          class="btn-dashboard hover_tamkin"
          :disabled="!withdrawStore.selectedPaymentMethod || loadingPayment"
          @click="goToPaymentMethod(withdrawStore.selectedPaymentMethod)"
        >
          <div class="flex items-center justify-center space-x-[6px]">
            <div :class="loadingPayment ? 'rtl:ml-2 ltr:mr-2' : ''">Continue</div>

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
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
