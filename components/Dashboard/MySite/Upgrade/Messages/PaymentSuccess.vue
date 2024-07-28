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
       
  <h1 class="text-[18px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin lg:mt-0 mt-[60px]">
        Payment Process
    </h1>
    </div>
    <div
      class="flex flex-col items-center justify-center bg-white dark:bg-tamkinDarkPrimary  w-full h-full rounded-[10px] mt-[33px] pt-[55px] mb-[87px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >

    <div>
        <img  src="/assets/imgs/payment_methods/success.svg" class="w-[74px] h-[85px]" />
    </div>
    

   <div class="flex flex-col items-center justify-center mx-auto  px-[70px]  w-full">
 
<div class="w-full mt-[16px]">
    <h1 class="text-center text-tamkin text-[18px] leading-[40px] font-[500]">
        Congratulation's
    </h1>
</div>
 <div class="w-full ">
  <p class="text-[14px] text-center leading-[40px] font-[500] mt-[16px] text-[#1E1E1E] dark:text-whiteTamkin">
    
    Now your site has been upgraded Now you can enjoy more features</p>
</div>




   </div>
   <div class="mt-[16px]  mx-auto mb-[260px]">
    <button class="btn-dashboard    lg:w-[400px] w-full " @click="modalStore.controlShowUpgradeModal" >
        Back to My Site    </button>
  
  </div>
   <!-- <div class="mt-[129px]  mx-auto mb-[34px]">
    <button class="processing_payment   lg:w-[535px] w-full " disabled>
      Payment Processing...
    </button>
  </div> -->
    </div>
 
  </div>
</template>


