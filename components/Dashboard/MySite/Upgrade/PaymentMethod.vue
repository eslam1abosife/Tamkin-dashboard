<script lang="ts" setup>
const selectedPaymentMethod = ref("by_card");
</script>

<template>
  <div class="flex flex-col items-start justify-center w-full">
  
    <div class="flex items-center justify-center">
        <div
   
    class="cursor-pointer  flex items-center justify-center  bg-white border-[1px]
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
    <h1 class="text-[24px] leading-[36px] font-[600] text-darkGrey ml-[10px] lg:mt-0 mt-[60px]">
        Choose Payment Methods
    </h1>
    </div>
    <div
      class="flex flex-col items-center justify-center bg-white w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >
      <h1
        class="text-[24px] leading-[36px] font-[600] ml-[20px] text-darkGrey mt-[31px]"
      >
      Payment Methods
      </h1>
<p class=" ml-[20px] text-[15px] font-[400] leading-[22.5px] mt-[14px]">Choose the payment method you want to complete this payment</p>
    

   <div class="flex flex-col items-center justify-center space-y-[12px] mt-[50px] lg:p-0 px-[20px] w-full">
    <div class="flex flex-col items-center justify-center w-full">
        <div 
        @click="selectedPaymentMethod = 'by_card'"
        :class="[selectedPaymentMethod == 'by_card' ? 'custom-border-tamkin' : 'border-[1px] ']"
        class="mx-auto  w-full lg:w-[704px] h-[87px] cursor-pointer bg-[#FAFCFE] flex items-center justify-between rounded-[10px] border-lightGrey pl-[16px]">
            <div class="flex items-center justify-start space-x-[13px]">
                <div><img src="/assets/imgs/payment_methods/cc.svg" alt=""></div>
                <div class="text-[20px] leading-[44px] font-[600] font-[Inter] text-darkGrey">Pay Via Card</div>
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
                <label for="radio5" class="flex items-center cursor-pointer pr-[40px]">
                  <span
                    class="w-[24px] h-[24px] bg-white inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
                </label>
              </div>
        </div>
        
    </div>
 
    <div class="flex flex-col items-center justify-center w-full">
        <div 
        @click="selectedPaymentMethod = 'by_crypto'"
        :class="[selectedPaymentMethod == 'by_crypto' ? 'custom-border-tamkin' : 'border-[1px] ']"
        class="mx-auto  w-full lg:w-[704px] h-[87px] cursor-pointer bg-[#FAFCFE] flex items-center justify-between rounded-[10px] border-lightGrey pl-[16px]">
            <div class="flex items-center justify-start space-x-[13px]">
                <div><img src="/assets/imgs/payment_methods/crypto.svg" alt=""></div>
                <div class="text-[20px] leading-[44px] font-[600] font-[Inter] text-darkGrey">Pay Via Crypto currency</div>
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
                <label for="radio_crypto" class="flex items-center cursor-pointer pr-[40px]">
                  <span
                    class="w-[24px] h-[24px] bg-white inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
                </label>
              </div>
        </div>
        
    </div>
    <div class="flex flex-col items-center justify-center w-full">
        <div 
        @click="selectedPaymentMethod = 'by_paypal'"
        :class="[selectedPaymentMethod == 'by_paypal' ? 'custom-border-tamkin' : 'border-[1px] ']"
        class="mx-auto  w-full lg:w-[704px] h-[87px] cursor-pointer bg-[#FAFCFE] flex items-center justify-between rounded-[10px] border-lightGrey pl-[16px]">
            <div class="flex items-center justify-start space-x-[13px]">
                <div><img src="/assets/imgs/payment_methods/paypal.svg" alt=""></div>
                <div class="text-[20px] leading-[44px] font-[600] font-[Inter] text-darkGrey">Pay Via PayPal</div>
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
                <label for="radio_paypal" class="flex items-center cursor-pointer pr-[40px]">
                  <span
                    class="w-[24px] h-[24px] bg-white inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
                </label>
              </div>
        </div>
        
    </div>
   </div>
   <div class="mt-[129px] mb-[34px] ml-auto pr-[16px]">
    <button class="btn-dashboard hover_tamkin">
        Continue to Payment
    </button>
  </div>
    </div>
 
  </div>
</template>


