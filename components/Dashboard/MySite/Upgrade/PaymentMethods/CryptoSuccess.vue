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
   
      class="cursor-pointer close_sidebar_btn group flex items-center justify-center lg:ml-[10px] ml-[20px]   bg-white border-[1px]
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
  <h1 class="text-[20px] lg:text-[24px] leading-[36px] font-[600] text-darkGrey ml-[20px] lg:mt-0 mt-[60px]">
        Payment Process
    </h1>
    </div>
    <div
      class="flex flex-col items-center justify-center bg-white  w-full h-full rounded-[10px] mt-[33px] pt-[55px] mb-[87px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >

    <div>
        <img src="/assets/imgs/crypto_methods_icons/waiting.svg"  alt="">
    </div>
    

   <div class="flex flex-col items-center justify-center mx-auto  px-[70px]  w-full">
 
<div class="w-full my-[30px]">
    <h1 class="text-center text-tamkin text-[24px] leading-[40px] font-[500]">
        Please Wait...
    </h1>
</div>
 <div class="w-full ">
  <p class="text-[16px] text-center leading-[40px] font-[500] mt-[26px] text-[#1E1E1E]">
    
    the Coins balance will appear in your Coins Balance account only after transaction get confirmation and approved by our team.  


</p>
</div>




   </div>
   <div class="mt-[39px]  mx-auto mb-[260px]">
    <button class="btn-dashboard    lg:w-[535px] w-full " @click="modalStore.controlShowUpgradeModal">
        Back to My Site
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


