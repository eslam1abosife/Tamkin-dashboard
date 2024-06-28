<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
definePageMeta({
  layout: "auth",
});


const state = reactive({
  TXID: "",
});
const rules = {
  TXID: { required },
};

const v$ = useVuelidate(rules, state);
const props = defineProps({
  showModal:Boolean
})
</script>

<template>
  <div class="flex flex-col items-start justify-center w-full" v-if="showModal">
  
    <div class="flex items-center justify-center ">
        <div
        @click="modalStore.backControl"

      class="cursor-pointer close_sidebar_btn group flex items-center justify-center   bg-white border-[1px]
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
  <h1 class="text-[24px] lg:text-[24px] leading-[36px] font-[600] text-darkGrey ml-[20px] lg:mt-0 mt-[60px]">
        Payment Methods
    </h1>
    </div>
    <div
      class="flex flex-col items-start justify-center bg-white  w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >
      <h1
        class="text-[20px] leading-[36px] font-[600] ml-[20px] text-darkGrey mt-[31px]"
      >
      Confirm your Payment
      </h1>
<p class=" ml-[20px] text-[16px] font-[400] leading-[29px] mt-[14px] text-darkGrey">
    Please send <span class="text-tamkin font-[600]"> 1.938344 EHT </span>  to the address below. the Coins balance will appear in your Coins Balance account only after transaction get confirmation and approved by our team.  

</p>
    

   <div class="flex flex-col items-center justify-center space-y-[12px] mt-[50px]  mx-auto   w-full">
 
<!-- here-->

 <div class="px-[20px] flex items-center flex-col lg:flex-row lg:space-x-[16px] justify-center lg:space-y-[0] space-y-[16px] lg:justify-start w-full">

  <img src="/assets/imgs/crypto_methods_icons/qr.svg" alt="">
  <div class="w-full">
    <h2 class="text-[16px] leading-[24px] font-[600] mb-[18px]">Send amount : <span class="text-tamkin"> 1.938344 EHT</span> </h2>
    <div class="border custom-border-tamkin padding-override-1 w-full  h-[47px] rounded-[10px] flex items-center justify-between px-[10px]">

      <div class="flex items-center space-x-[8px]">
        <img src="/assets/imgs/crypto_methods_icons/3.svg" alt="">
        <div class="text-[#878787]">
          0x2d5jdska9erptjfew7364432
        </div>
      
      </div>
      <img class="ml-auto" src="/assets/imgs/crypto_methods_icons/copy_code.svg" alt="">

    </div>
  </div>
 
 </div>
 <div class="w-full ml-[40px] ">
  <p class="text-[16px] leading-[29px] font-[600] mt-[26px]">To speed up verification Process please enter your wallet address from where you’ll transferring your amount to our address.  </p>
</div>


<div class="w-full relative px-[20px]">
  <input type="email" placeholder="{{$t('TXID')}}" id="TXID" class="input_floating_label peer w-full"
    v-model="v$.TXID.$model" :class="{
input_error:
(v$.TXID.$error && v$.TXID.required.$invalid),
error_text:
(v$.TXID.$error && v$.TXID.required.$invalid),
input_success: !v$.TXID.$error && !v$.TXID.$invalid,
}" />
  <label for="TXID" class="floating_label" :class="[
(v$.TXID.$error && v$.TXID.required.$invalid) 
? '!text-error'
: '',
]">
    {{ $t("Insert transaction TXID -HASH") }}*
  </label>
  <div class="w-full lg:w-4/6 mt-2" v-if="(v$.TXID.$error && v$.TXID.required.$invalid)">
    <p class="error_message">
      <span v-if="v$.TXID.$error && v$.TXID.required.$invalid">{{ $t("Transaction TXID -HASH is required")}}</span>

    
    </p>
  </div>
</div>

   </div>
   <div class="mt-[39px]  mx-auto mb-[34px]" v-if="!modalStore.loading">
    <button class="btn-dashboard no_hover   lg:w-[535px] w-full " @click="modalStore.controlCryptoSuccessModal">
      Confirm Payment
    </button>
    <button class="btn_bordered_dashboard normal_hover mx-auto  mt-[18px] lg:w-[535px] w-full " disabled>
      Cancel
    </button>
  </div>
  <div class="mt-[39px]  mx-auto mb-[34px]" v-else>
    <button class="processing_payment   lg:w-[535px] w-full "  disabled>
      Payment Processing...
    </button>
  </div>
   <!-- <div class="mt-[129px]  mx-auto mb-[34px]">
    <button class="processing_payment   lg:w-[535px] w-full " disabled>
      Payment Processing...
    </button>
  </div> -->
    </div>
 
  </div>
</template>


