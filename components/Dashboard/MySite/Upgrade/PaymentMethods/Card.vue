<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();
const savedCards = ref([
    {'id':1,number:'Tamkin  ****3536',type:'visa'},
    {'id':2,number:'Tamkin  ****6792',type:'master'},
]);

import visaIcon from '/assets/imgs/payment_methods/visa.svg'
import masterIcon from '/assets/imgs/payment_methods/master.svg'
const currentCard = ref()

const isPromoFilled = ref(false);
const promo = ref("");
const validPromo = ref(false)
const showMoreMethods = ref(false)
const chooseOtherPaymentMethod = ref('')
watch(promo, (ov, nv) => {
  return promo.value.length > 0
    ? (isPromoFilled.value = true)
    : (isPromoFilled.value = false);
});
const clearInput = () => {
    promo.value = "";
    validPromo.value = false

};
const addPromoCode = ()=>{
   if(promo.value){
    validPromo.value = !validPromo.value
   }
}

const removePromoCode = ()=>{
   if(promo.value){
    validPromo.value = !validPromo.value
    promo.value =""
   }
}
const selectedPaymentMethod = ref("");
const changeCurrentCard = (savedCard:any)=>{

  currentCard.value = savedCard.id
  chooseOtherPaymentMethod.value = ''

}

const changepaymentMethod = (method:any)=>{
  chooseOtherPaymentMethod.value = method
  currentCard.value = ''

}

watch(currentCard,(ov,nv)=>{})
const props = defineProps({
  showModal:Boolean
})
</script>

<template>
  <div class="flex flex-col items-start justify-center w-full" v-if="showModal">
  
    <div class="flex items-center justify-center ">
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
  <h1 class="text-[24px] lg:text-[24px] leading-[36px] font-[600] text-darkGrey ml-[20px] lg:mt-0 mt-[60px]">
        Payment Process
    </h1>
    </div>
    <div
      class="flex flex-col items-start justify-center bg-white  w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >
      <h1
        class="text-[20px] leading-[36px] font-[600] ml-[20px] text-darkGrey mt-[31px]"
      >
      Cards Payment
      </h1>
<p class=" ml-[20px] text-[15px] font-[400] leading-[22.5px] mt-[14px]">Choose the payment method you want to complete this payment</p>
    

   <div class="flex flex-col items-center justify-center space-y-[12px] mt-[24px]  mx-auto   w-full">
    <div class="flex flex-col items-center justify-center w-full px-[20px]" v-for="savedCard in savedCards " :key="savedCard.id">
        <div 
        @click=" changeCurrentCard(savedCard)"
        :class="[currentCard === savedCard.id ? 'custom-border-tamkin' : 'border-[1px] ']"
        class=" w-full   h-[87px] cursor-pointer bg-[#FAFCFE] flex items-center justify-between rounded-[10px]
         border-lightGrey pl-[16px]">
            <div class="flex items-center justify-start space-x-[13px]">
                <div><img :src="savedCard.type === 'visa' ? visaIcon : masterIcon" alt=""></div>
                <div class="text-[20px] leading-[44px] font-[600] font-[Inter] text-darkGrey">{{savedCard.number}}</div>
            </div>
            <div class="order-1 mx-[4px]">
                <input
                  :id="'radio_'+savedCard.id"
                  type="radio"
                  name="radio"
                  class="hidden"
                 :value="savedCard.id"
                 @click.stop
                v-model="currentCard"
                

                number/>
                <label                   :for="'radio_'+savedCard.id"
                class="flex items-center cursor-pointer pr-[40px]">
                  <span
                    class="w-[24px] h-[24px] bg-white inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
               
                </label>
              </div>
        </div>
        
    </div>
  <div class="flex items-center lg:flex-row flex-col lg:justify-between w-full  px-[20px]">
    <div class="flex items-center space-x-[10px] mt-[24px] ">
        <div class="cursor-pointer" @click="modalStore.addNewCardModal">
            <img src="/assets/imgs/payment_methods/new_card.svg" alt="">
           </div>
       <div class="text-[16px] font-[600] leading-[24px] text-darkGrey" >Add New Card</div>
      
    </div>

    <div class="flex items-center  space-x-[11px] mt-[24px]" @click="showMoreMethods = !showMoreMethods">
<div class="cursor-pointer" >
    <div class="text-[16px] font-[500] underline leading-[24px] text-darkGrey">Show all payment options</div>

</div>
<div class="cursor-pointer"><img src="/assets/imgs/arrow-right.svg"  class="w-[10px] h-[16px] " :class="[showMoreMethods ? 'rotate-90' :'' ]" alt=""></div>
    </div>

    
 </div>
<!-- here-->

 

<!-- here-->

<div class="px-[20px] w-full " v-if="showMoreMethods">
  <div 
@click="changepaymentMethod('by_paypal')"
:class="[chooseOtherPaymentMethod === 'by_paypal'  ? 'custom-border-tamkin' : 'border-[1px] ']"
 class="mt-[31px] w-full   h-[87px] cursor-pointer bg-[#FAFCFE] flex items-center justify-between rounded-[10px]
  border-lightGrey pl-[16px]">
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
       
          @click.stop
          value="by_paypal"
        v-model="chooseOtherPaymentMethod"

        />
        <label for="radio_paypal" class="flex items-center cursor-pointer pr-[40px]">
          <span
            class="w-[24px] h-[24px] bg-white inline-block mr-1 rounded-full border border-tamkin"
          ></span>
        </label>
      </div>
</div>
</div>

<div class="px-[20px] w-full" v-if="showMoreMethods">
  <div 
  @click="changepaymentMethod('by_crypto')"
  :class="[chooseOtherPaymentMethod === 'by_crypto' ? 'custom-border-tamkin' : 'border-[1px] ']"
  class="mx-auto  w-full  h-[87px] cursor-pointer bg-[#FAFCFE] flex items-center justify-between rounded-[10px] border-lightGrey pl-[16px]">
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
            @click.stop
              value="by_crypto"
        v-model="chooseOtherPaymentMethod"

          />
          <label for="radio_crypto" class="flex items-center cursor-pointer pr-[40px]">
            <span
              class="w-[24px] h-[24px] bg-white inline-block mr-1 rounded-full border border-tamkin"
            ></span>
          </label>
        </div>
  </div>
</div>
<div class="flex items-center lg:flex-row flex-col justify-center lg:justify-between space-x-[24px] w-full px-[20px]"
>
<div class="lg:py-[17px] search_input w-full lg:w-3/4 mt-[39px]">
  <input
    type="text"
    class="input_dashboard_search w-full text-darkGrey"
    v-model="promo"
    placeholder="Promo Code"
    :class="[validPromo ? '!bg-[#E8F8F6] !text-[#E8F8F6] ' : '']"
  />
  <div
    class="absolute top-[-8px] lg:top-[11px] left-[29px] p-[16px] flex items-center justify-evenly space-x-[10px]"
    v-if="validPromo"
  >
    <img src="/assets/imgs/promo_valid.svg" alt="" />
    <div class="text-[15px] font-[500] text-darkGrey">
      <span class="text-[#021328] font-[700]">12%</span> Discount
      (-$2,444 )
    </div>
    <img src="/assets/imgs/promo_valid_.svg" class="" alt="" />
  </div>
  <div
    v-if="isPromoFilled"
    @click="clearInput"
    class="absolute top-[-8px] lg:top-[-27px] right-0 p-[16px] cursor-pointer lg:mt-[39px]"
  >
    <img src="/assets/imgs/close_promo.svg" alt="" />
  </div>
</div>
<div class="text-center mt-[16px] lg:mt-[39px]">
  <button
    class="btn-dashboard  w-6/6 mx-auto text-center ]"
    @click="addPromoCode"
    v-if="!validPromo"
  >
    Apply Code
  </button>
  <button
    v-else
    class="btn_bordered_dashboard error w-6/6 mx-auto text-center"
    @click="removePromoCode"
  >
    Remove Code
  </button>
</div>
</div>
 <table class="min-w-full ">
    <thead>
      <tr>
        <th
          class="py-2 pl-[20px] border-b text-[20px] leading-[30px] text-darkGrey font-[600] text-left"
        colspan="12">
        Summary
        </th>
      
      </tr>
    </thead>
    <tbody>
   
 
      <tr class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE]"           v-if="validPromo"
      >
        <td
          class="py-2 px-5 border-b text-right font-[500] w-full"
          colspan="2"
        >
          Subtotal
        </td>
        <td class="py-2 px-5 border-b text-right w-full font-[500]" colspan="2">
          $50,444.00
        </td>
      </tr>
      <tr           v-if="validPromo"
       class="text-[16px] leading-[24px] font-[500] bg-[#FAFCFE]">
        <td
          class="py-2 px-5 border-b text-right font-[500] w-full"
          colspan="2"
        >
        Discount
        </td>
        <td class="py-2 px-5 border-b text-right w-full font-[500]" colspan="2">
          $50,444.00
        </td>
      </tr>
      <tr class="text-[16px] leading-[24px] font-[500] bg-[#FAFCFE]">
        <td
          class="py-2 px-5 border-b text-right font-[500] w-full"
          colspan="2"
        >
          Total
        </td>
        <td class="py-2 px-5 border-b text-right w-full font-[500]" colspan="2">
          $50,444.00
        </td>
      </tr>
    </tbody>
  </table>
   </div>
   <div class="mt-[39px]  mx-auto mb-[34px]">
    <button class="btn-dashboard hover_tamkin   lg:w-[535px] w-full " @click="modalStore.paymentSuccessModal" v-if="!modalStore.loading">
      Confirm Payment
    </button>

    <button class="processing_payment   lg:w-[535px] w-full " v-else disabled>
      Payment Processing...
    </button>
  </div>
 
    </div>
 
  </div>
</template>


