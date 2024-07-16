<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();

const selectedPaymentMethod = ref("by_card");
const props = defineProps({
  showModal:Boolean
})

const goToPaymentMethod = (method:any)=>{
if(selectedPaymentMethod.value === 'by_card'){
return modalStore.payViaCard()
}
if(selectedPaymentMethod.value === 'by_paypal'){
  
}
if(selectedPaymentMethod.value === 'by_crypto'){
  return modalStore.payViaCrypto()

}
}
</script>

<template>

  <div class="flex flex-col items-start justify-center w-full" v-if="showModal">
  
    <div class="flex items-center justify-center">
        <div
   @click="modalStore.backControl"

  class="cursor-pointer close_sidebar_btn group flex items-center justify-center    bg-white border-[1px]
   border-linecolor rounded-full w-[30px] h-[30px]"

   style="box-shadow: 0px 4px 8.7px 0px #DAF3F1;
"
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
  <h1 class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey ltr:ml-[20px] rtl:mr-[20px] lg:mt-0 mt-[60px]">
    Choose Payment Methods
    </h1>
    </div>
    <div
      class="flex flex-col items-start justify-center bg-white w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >
      <h1
        class="text-[18px] leading-[36px] font-[600] ltr:ml-[20px] rtl:mr-[20px] text-darkGrey mt-[31px]"
      >
      Payment Methods
      </h1>
<p class=" ltr:ml-[20px] rtl:mr-[20px] text-[14px] font-[400] leading-[22.5px] mt-[14px] text-darkGrey">Choose the payment method you want to complete this payment</p>
    

   <div class="flex flex-col items-start justify-center space-y-[12px] mt-[50px] w-full px-[5px] lg:px-[20px]">
    <div class="w-full">
        <div 
        @click="selectedPaymentMethod = 'by_card'"
        :class="[selectedPaymentMethod == 'by_card' ? 'custom-border-tamkin' : 'border-[1px] ']"
        class="mx-auto  w-full h-[87px] cursor-pointer bg-[#FAFCFE] 
        flex items-center justify-between rounded-[10px] border-lightGrey ltr:pl-[16px] rtl:pr-[16px]">
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                <div><img  src="/assets/imgs/payment_methods/cc.svg"  class="w-[40px] h-[40px]"/></div>
                <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey">Pay Via Card</div>
            </div>
            <div class="order-1 mx-[4px]">
                <input
                  id="radio5"
                  type="radio"
                  name="radio"
                  class="hidden"
                  value="by_card"
                v-model="selectedPaymentMethod"
                :checked="selectedPaymentMethod === 'by_card'"

                />
                <label for="radio5" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                  <span
                    class="w-[24px] h-[24px] bg-white inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
                </label>
              </div>
        </div>
        
    </div>
 
    <div class=" w-full ">
        <div 
        @click="selectedPaymentMethod = 'by_crypto'"
        :class="[selectedPaymentMethod == 'by_crypto' ? 'custom-border-tamkin' : 'border-[1px] ']"
        class="mx-auto  w-full  h-[87px] cursor-pointer bg-[#FAFCFE] flex items-center justify-between
         rounded-[10px] border-lightGrey ltr:pl-[16px] rtl:pr-[16px]">
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                <div><img  src="/assets/imgs/payment_methods/crypto.svg"  class="w-[40px] h-[40px]"/></div>
                <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey">Pay Via Crypto currency</div>
            </div>
            <div class="order-1 mx-[4px]">
                <input
                  id="radio_crypto"
                  type="radio"
                  name="radio"
                  class="hidden"
                  value="by_crypto"
                v-model="selectedPaymentMethod"
                :checked="selectedPaymentMethod === 'by_crypto'"

                />
                <label for="radio_crypto" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                  <span
                    class="w-[24px] h-[24px] bg-white inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
                </label>
              </div>
        </div>
        
    </div>
    <div class=" w-full ">
        <div 
        @click="selectedPaymentMethod = 'by_paypal'"
        :class="[selectedPaymentMethod == 'by_paypal' ? 'custom-border-tamkin' : 'border-[1px] ']"
        class="mx-auto  w-full  h-[87px] cursor-pointer bg-[#FAFCFE] flex items-center 
        justify-between rounded-[10px] border-lightGrey ltr:pl-[16px] rtl:pr-[16px]">
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                <div><img  src="/assets/imgs/payment_methods/paypal.svg"  class="w-[40px] h-[40px]"/></div>
                <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey">Pay Via PayPal</div>
            </div>
            <div class="order-1 mx-[4px]">
                <input
                  id="radio_paypal"
                  type="radio"
                  name="radio"
                  class="hidden"
                  value="by_paypal"
                v-model="selectedPaymentMethod"
                :checked="selectedPaymentMethod === 'by_paypal'"

                />
                <label for="radio_paypal" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                  <span
                    class="w-[24px] h-[24px] bg-white inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
                </label>
              </div>
        </div>
        
    </div>
   </div>
   <div class="my-[26px] px-[20px] rtl:mr-auto ltr:ml-auto">
    <button class="btn-dashboard hover_tamkin" @click="goToPaymentMethod(selectedPaymentMethod)">
      Continue to Payment
  </button>
  </div>

    </div>
 
  </div>
</template>


