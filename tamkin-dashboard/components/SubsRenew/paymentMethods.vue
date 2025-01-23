<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';


const subsStore = useSubsStore()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const props = defineProps({
  showModal: Boolean
})

const goToPaymentMethod = async (method: any) => {
  
  if (subsStore.selectedPaymentMethod === 'by_card') {
    subsStore.promo = "";
    subsStore.currentDiscount = 0;
    subsStore.validPromo = false;
    return navigateTo('payment_methods_subs', 'subs', 'cardModal_subs')
  }

  if( subsStore.packagePayload.payDateType !== 0 ){
    if (subsStore.selectedPaymentMethod=== 'by_paypal') {
        subsStore.promo = "";
        subsStore.currentDiscount = 0;
        subsStore.validPromo = false;
    return navigateTo('payment_methods_subs', 'subs', 'paypal_subs')

    // const res = await createOrder('paypal')
    // console.log(res.headers.location)
  }
  if (subsStore.selectedPaymentMethod === 'by_crypto') {
    subsStore.promo = "";
    subsStore.currentDiscount = 0;
    subsStore.validPromo = false;
    return navigateTo('payment_methods_subs', 'subs', 'crypto_subs_step1')

  }
  }else {
    return false
  }
 
}
</script>

<template>

  <div v-if="isOpen('payment_methods_subs')"
    class="bg-selected dark:bg-p fixed z-[9999] top-[0] left-0 rtl:lg:left-0 ltr:lg:left-auto ltr:lg:right-0 rounded-[10px] p-[20px] lg:w-[600px] w-full h-full lg:h-screen !overflow-y-auto lg:overflow-x-hidden">
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn_payment !cursor-pointer z-[999]
   dark:bg-tamkinDarkPrimary dark:text-whiteTamkin !top-[23px]" @click="()=>{
    closeModal('payment_methods_subs')
    subsStore.selectedPaymentMethod = ''
   }">
      <svg class="w-[12px] h-[12px]" width="14" height="13" viewBox="0 0 14 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor" />
      </svg>
    </div>
    <div class="w-full h-full">

      <div class="flex flex-col items-start justify-center w-full">

        <div class="flex items-center justify-center">
      
          <h1
            class="text-[16px] lg:text-[18px] rtl:font-[Almarai]  leading-[36px] font-[600] dark:text-whiteTamkin text-darkGrey ltr:ml-[20px] rtl:mr-[20px] lg:mt-0 mt-[60px]">
            {{ $t('Choose Payment Methods') }}
          </h1>
        </div>
        <div
          class="flex flex-col items-start justify-center bg-white dark:bg-tamkinDarkPrimary  w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
          style="box-shadow: 0px 4px 24px 8px #51459f14">
          <h1
            class="text-[18px] leading-[36px] rtl:font-[Almarai] font-[600] ltr:ml-[20px] rtl:mr-[20px] text-darkGrey dark:text-whiteTamkin mt-[31px]">
            {{ $t('Payment Methods') }}
          </h1>
          <p
            class=" ltr:ml-[20px] rtl:mr-[20px] rtl:font-[Almarai] text-[14px] font-[400] leading-[22.5px] mt-[14px] text-darkGrey dark:text-whiteTamkin">
          {{ $t('Choose the payment method you want to complete this payment') }}
          </p>


          <div class="flex flex-col items-start justify-center space-y-[12px] mt-[50px] w-full px-[20px]">
            <div class="w-full">
              <div @click="subsStore.selectedPaymentMethod = 'by_card'"
                :class="[subsStore.selectedPaymentMethod == 'by_card' ? 'custom-border-tamkin' : 'border-[1px] ']"
                class="mx-auto  w-full h-[87px] cursor-pointer bg-[#FAFCFE]  dark:bg-tamkinDarkPrimary
            flex items-center justify-between rounded-[10px] border-lightGrey dark:border-darkborder ltr:pl-[16px] rtl:pr-[16px]">
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                  <div><img src="/assets/imgs/payment_methods/cc.svg" class="w-[40px] h-[40px]" /></div>
                  <div class="text-[16px] leading-[44px] font-[600] ltr:font-[Poppins] rtl:font-[Almarai]  text-darkGrey dark:text-whiteTamkin">
                    {{ $t('Pay Via Card') }}</div>
                </div>
                <div class="order-1 mx-[4px]">
                  <input id="radio5" type="radio" name="radio" class="hidden" value="by_card"
                  v-model="subsStore.selectedPaymentMethod" :checked="subsStore.selectedPaymentMethod === 'by_card'" />
                  <label for="radio5" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                    <span
                      class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"></span>
                  </label>
                </div>
              </div>

            </div>

            <div class=" w-full ">
              <div @click="()=>{

                if(subsStore.packagePayload.payDateType !== 0){

                  subsStore.selectedPaymentMethod = 'by_crypto';
                }
              }"
                :class="[subsStore.selectedPaymentMethod == 'by_crypto' &&  subsStore.packagePayload.payDateType !== 'trial' ? 'custom-border-tamkin' : 'border-[1px] ',
                
                subsStore.packagePayload.payDateType === 0 ?'!cursor-not-allowed opacity-50' :''
                ]" class="mx-auto  w-full  h-[87px] cursor-pointer bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-between
             rounded-[10px] border-lightGrey dark:border-darkborder ltr:pl-[16px] rtl:pr-[16px]">
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                  <div><img src="/assets/imgs/payment_methods/crypto.svg" class="w-[40px] h-[40px]" /></div>
                  <div class="text-[16px] leading-[44px] rtl:font-[Almarai] ltr:font-[Poppins] font-[600]  text-darkGrey dark:text-whiteTamkin">
                    {{$t('Pay Via Crypto')}}</div>
                </div>
                <div class="order-1 mx-[4px]">
                  <input id="radio_crypto" type="radio" name="radio" class="hidden" value="by_crypto"
                  :disabled="subsStore.packagePayload.payDateType === 0"  v-model="subsStore.selectedPaymentMethod" :checked="subsStore.selectedPaymentMethod === 'by_crypto' && subsStore.currentPackage.trial_days === 0" />
                  <label for="radio_crypto" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                    <span
                      class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"></span>
                  </label>
                </div>
              </div>

            </div>
            <div class=" w-full ">
              <div @click="()=>{

                if(subsStore.packagePayload.payDateType !== 0){

                  subsStore.selectedPaymentMethod = 'by_paypal';
                }
              }"
                :class="[subsStore.selectedPaymentMethod == 'by_paypal'  && subsStore.packagePayload.payDateType !== 'trial' ? 'custom-border-tamkin' : 'border-[1px] ',
                subsStore.packagePayload.payDateType === 0  ?'!cursor-not-allowed opacity-50' :''
                 
                 ]" class="mx-auto  w-full  h-[87px] cursor-pointer bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center 
            justify-between rounded-[10px] border-lightGrey dark:border-darkborder ltr:pl-[16px] rtl:pr-[16px]">
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                  <div><img src="/assets/imgs/payment_methods/paypal.svg" class="w-[40px] h-[40px]" /></div>
                  <div class="text-[16px] leading-[44px] rtl:font-[Almarai] font-[600]  text-darkGrey dark:text-whiteTamkin">
                  {{ $t('Pay Via PayPal') }}
                </div>
                </div>
                <div class="order-1 mx-[4px]">
                  <input id="radio_paypal" type="radio" name="radio" class="hidden" value="by_paypal"
                  :disabled="subsStore.packagePayload.payDateType === 0"  v-model="subsStore.selectedPaymentMethod" :checked="subsStore.selectedPaymentMethod === 'by_paypal' && subsStore.currentPackage.trial_days === 0" />
                  <label for="radio_paypal" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                    <span
                      class="w-[24px] h-[24px] bg-white  dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"></span>
                  </label>
                </div>
              </div>

            </div>
          </div>
          <div class="my-[26px] px-[20px] rtl:mr-auto ltr:ml-auto">
            <button class="btn-dashboard hover_tamkin" :disabled="!subsStore.selectedPaymentMethod" @click="goToPaymentMethod(subsStore.selectedPaymentMethod)">
              {{ $t('Continue to Payment') }}
            </button>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>
