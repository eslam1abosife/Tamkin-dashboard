<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useFullUrl } from "@/composables/useSharedFunctions";

const billingStore = useBillingStore();
const marketStore = useMarketStore()
import { useGetCards,useDeleteCard,useInvoices ,useInvoicePdf } from "@/composables/useBilling";

const { getCards } = useGetCards();
const { fullUrl } = useFullUrl();


const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();


const currentCard = ref('')
const loading = ref(false)
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

  currentCard.value = savedCard.name
  chooseOtherPaymentMethod.value = ''

}

const changepaymentMethod = (method:any)=>{
  chooseOtherPaymentMethod.value = method
  currentCard.value = ''

}
const continueCheckOut = ()=>{
  if(currentCard.value){
    return navigateTo('cardModal','add-site','successPayment')
  }
  if(chooseOtherPaymentMethod.value === "by_crypto"){
    return navigateTo('cardModal','add-site','crypto')

  }
}
watch(currentCard,(ov,nv)=>{})
const props = defineProps({
  showModal:Boolean
})

onMounted(async ()=>{

    await getCards();
})
</script>

<template>
    <div v-if="isOpen('cardModal_market')"

    class="bg-selected dark:bg-p fixed z-[9999] top-[0] rtl:lg:left-0 ltr:right-0 rounded-[10px] p-[20px] lg:w-[600px] w-full h-full lg:h-screen lg:overflow-x-hidden"
  >
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn_payment !cursor-pointer z-[999]
     dark:bg-tamkinDarkPrimary dark:text-whiteTamkin !top-[23px]" @click="closeModal('cardModal_market')">
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
  
        <div class="flex flex-col items-start justify-center w-full" >
    
          <div class="flex items-center justify-center ">
              <div
           @click="navigateTo('cardModal_market','add-site','paymentMethods_market')"
      
      
        class="cursor-pointer close_sidebar_btn group flex items-center justify-center    bg-white dark:bg-tamkinDarkPrimary border-[1px]
         border-linecolor rounded-full w-[30px] h-[30px]"
      
         style="box-shadow: 0px 4px 8.7px 0px #DAF3F1;
      "
        >
          <svg
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            class="fill-tamkin group-hover:stroke-white dark:group-hover:stroke-light group-hover:fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"
            />
          </svg>
        </div>
        <h1 class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin ml-[20px] lg:mt-0 mt-[60px]">
              Payment Process
          </h1>
          </div>
          <div
            class="flex flex-col items-start justify-center bg-white dark:bg-tamkinDarkPrimary  w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
            style="box-shadow: 0px 4px 24px 8px #51459f14"
          >
            <h1
              class="text-[18px] leading-[36px] font-[600] ml-[20px] text-darkGrey dark:text-whiteTamkin mt-[31px]"
            >
            Cards Payment
            </h1>
      <p class=" ml-[20px] text-[14px] font-[400] leading-[22.5px] mt-[14px] dark:text-whiteTamkin/80">Choose the payment method you want to complete this payment</p>
          
      
         <div class="flex flex-col items-center justify-center space-y-[12px] mt-[24px]  mx-auto   w-full">
   
            <div class="flex flex-col items-center justify-start w-full px-[20px] "
            v-for="savedCard in billingStore.cards" :key="savedCard.name">
    
              <div 
              @click="changeCurrentCard(savedCard)"
              :class="[  
              
              currentCard === savedCard.name ? 'custom-border-tamkin' : 'border-[1px] ']"
                class="w-full h-[87px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary cursor-pointer flex items-center justify-between rounded-[10px]
                 border-lightGrey rtl:pr-[16px] ltr:pl-[16px]">
                <div class="flex items-center justify-start  rtl:space-x-reverse space-x-[13px] w-full">
                  <div><img :src=" fullUrl(savedCard.card_image)" class="w-[44px] h-[44px]" /></div>
                 <div class="flex items-center justify-between w-full">
                    <div class="flex flex-col items-start justify-start relative w-full">
                        <div class="absolute top-[10px] rtl:right-[250px] ltr:left-[250px] w-[62px] h-[23px]  rounded-[17px] bg-gradient-to-br flex items-center justify-center  from-tamkinStart to-tamkinEnd"
                           v-if="savedCard.is_primary">
                          <div class="text-[10px] font-[500] text-white">
                            {{ $t('Default') }}
                          </div>
                        </div>
                    
                        <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin flex items-center justify-start rtl:space-x-reverse space-x-[16px]">
                          <div class="w-36 truncate">{{ savedCard.card_holder_name }}</div>
                          <div>
                            ****{{ savedCard.card_number }}
                          </div>
                        </div>
                        <div class="text-darkGrey text-[13px] font-[400] leading-[10px]">
                          {{ $t('Expires on') }} &nbsp;{{ savedCard.expiry_date }}
                        </div>
                      </div>
                      <div class=" rtl:mr-auto ltr:ml-auto rtl:ml-[16px] ltr:mr-[16px]">
                        <input
                          :id="'radio_'+savedCard.name"
                          type="radio"
                          name="radio"
                          class="hidden"
                         :value="savedCard.name"
                         @click.stop
                        v-model="currentCard"
                        
        
                        number/>
                        <label                   :for="'radio_'+savedCard.name"
                        class="flex items-center cursor-pointer ">
                          <span
                            class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                          ></span>
                       
                        </label>
                      </div>
                 </div>
                </div>
    
              </div>
            </div>
           
            <div v-if="billingStore.cards?.length === 0" class="bg-white w-full h-[250px] mt-[32px] rounded-[10px] p-[32px]">
          
                <div class="flex flex-col items-center justify-center mt-[24px] space-y-[10px]"
               >
                  <img src="/imgs/no_methods.png" class="w-[51px] h-[35px]" alt="" />
                  <div class="text-[14px] leading-[28px] font-[400] text-darkGrey  text-center">
                    {{$t(`You haven't added any cards yet`)}}
                  </div>
                
                </div>
              </div>
        <div class="flex items-center lg:flex-row flex-col lg:justify-between w-full  px-[20px]">
          <div class="flex items-center rtl:space-x-reverse space-x-[10px] mt-[24px] ">
              <div class="cursor-pointer" @click="navigateTo('cardModal_market','Market','add_new_card_billing')">
                  <img  src="/assets/imgs/payment_methods/new_card.svg" />
                 </div>
             <div class="text-[14px] font-[600] leading-[24px] text-darkGrey dark:text-whiteTamkin" >Add New Card</div>
            
          </div>
      
          <div class="flex items-center  rtl:space-x-reverse space-x-[11px] mt-[24px]" @click="showMoreMethods = !showMoreMethods">
      <div class="cursor-pointer" >
          <div class="text-[14px] font-[500] underline leading-[24px] text-darkGrey dark:text-whiteTamkin">Show all payment options</div>
      
      </div>
      <div class="cursor-pointer"><img  src="/assets/imgs/arrow-right.svg"  class="w-[10px] h-[10px] rtl:rotate-180 " 
        :class="[showMoreMethods ? '!rotate-90' :'' ]" /></div>
          </div>
      
          
       </div>
      <!-- here-->
      
       
      
      <!-- here-->
      
      <div class="px-[20px] w-full " v-if="showMoreMethods">
        <div 
      @click="changepaymentMethod('by_paypal')"
      :class="[chooseOtherPaymentMethod === 'by_paypal'  ? 'custom-border-tamkin' : 'border-[1px] ']"
       class="mt-[31px] w-full   h-[87px] cursor-pointer bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-between rounded-[10px]
        border-lightGrey dark:border-light ltr:pl-[16px] rtl:pr-[16px]">
      <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
              <div><img  src="/assets/imgs/payment_methods/paypal.svg"  class="w-[40px] h-[40px]"/></div>
              <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin">Pay Via PayPal</div>
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
              <label for="radio_paypal" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                <span
                  class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                ></span>
              </label>
            </div>
      </div>
      </div>
      
      <div class="px-[20px] w-full" v-if="showMoreMethods">
        <div 
        @click="changepaymentMethod('by_crypto')"
        :class="[chooseOtherPaymentMethod === 'by_crypto' ? 'custom-border-tamkin' : 'border-[1px] ']"
        class="mx-auto  w-full  h-[87px] cursor-pointer bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-between rounded-[10px] 
        border-lightGrey dark:border-light rtl:pr-[16px] ltr:pl-[16px]">
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                <div><img  src="/assets/imgs/payment_methods/crypto.svg"  class="w-[40px] h-[40px]"/></div>
                <div class="text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin">Pay Via Crypto currency</div>
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
                <label for="radio_crypto" class="flex items-center cursor-pointer ltr:pr-[40px]  rtl:pl-[40px]">
                  <span
                    class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
                </label>
              </div>
        </div>
      </div>
      <div class="flex items-center lg:flex-row flex-col justify-center lg:justify-between rtl:space-x-reverse space-x-[24px] w-full px-[20px]"
      >
      <div class="lg:py-[17px] search_input w-full lg:w-3/4 mt-[24px]">
        <input
          type="text"
          class="input_dashboard_search w-full text-darkGrey  dark:text-whiteTamkin !h-[40px]" 
          v-model="promo"
          placeholder="Promo Code"
          :class="[validPromo ? '!bg-[#E8F8F6] !text-[#E8F8F6] ' : '']"
        />
        <div
          class="absolute top-[-8px] lg:top-[8px] rtl:right-[29px] ltr:left-[29px] p-[16px] flex items-center justify-evenly rtl:space-x-reverse space-x-[10px]"
          v-if="validPromo"
        >
          <img  src="/assets/imgs/promo_valid.svg"  />
          <div class="text-[15px] font-[500] text-darkGrey">
            <span class="text-[#021328] font-[700]">12%</span> Discount
            (-$2,444 )
          </div>
          <img  src="/assets/imgs/promo_valid_.svg" class=""  />
        </div>
        <div
          v-if="isPromoFilled"
          @click="clearInput"
          class="absolute top-[-8px] lg:top-[-27px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer lg:mt-[36px]"
        >
          <img  src="/assets/imgs/close_promo.svg"  />
        </div>
      </div>
      <div class="text-center mt-[16px] lg:mt-[24px] w-[150px]">
        <button
          class="btn-dashboard   hover_tamkin w-full mx-auto text-center "
          @click="addPromoCode"
          v-if="!validPromo"
        >
          Apply Code
        </button>
        <button
          v-else
          class="btn_bordered_dashboard error w-[140px]  mx-auto text-center"
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
                class="py-2  rtl:pr-[20px] ltr:pl-[20px] border-b dark:border-light text-[16px] leading-[30px] text-darkGrey dark:text-whiteTamkin font-[600] ltr:text-left rtl:text-right"
              colspan="12">
              Summary
              </th>
            </tr>
          </thead>
          <tbody>
         
       
            <tr class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"           v-if="validPromo"
            >
              <td
                class="py-2 px-5 border-b dark:border-light dark:text-whiteTamkin text-right font-[500] w-full"
                colspan="2"
              >
                Subtotal
              </td>
              <td class="py-2 px-5 border-b dark:border-light dark:text-whiteTamkin/80 text-right w-full font-[500]" colspan="2">
               {{marketStore.cartSubtotal}}
              </td>
            </tr>
            <tr           v-if="validPromo"
             class="text-[16px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
              <td
                class="py-2 px-5 border-b dark:border-light text-right font-[500] w-full dark:text-whiteTamkin"
                colspan="2"
              >
              Discount
              </td>
              <td class="py-2 px-5 border-b dark:border-light text-right w-full font-[500] dark:text-whiteTamkin/80" colspan="2">
                $50,444.00
              </td>
            </tr>
            <tr class="text-[16px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
              <td
                class="py-2 px-5 border-b dark:border-light text-right font-[500] w-full dark:text-whiteTamkin"
                colspan="2"
              >
                Total
              </td>
              <td class="py-2 px-5 border-b dark:border-light text-right w-full font-[500] dark:text-whiteTamkin/80"  colspan="2">
                ${{marketStore.cartSubtotal}}
              </td>
            </tr>
          </tbody>
        </table>
         </div>
         <div class="mt-[39px] w-full  mx-auto mb-[34px] px-[20px]">
          <button class="btn-dashboard hover_tamkin    w-full " @click="continueCheckOut()"  :disabled="!currentCard || billingStore.cards.length ===0"
        >

        <div class="flex items-center justify-center">
            <div :class="true ? 'rtl:ml-2 ltr:mr-2':''">
                {{ $t('Confirm Payment') }}
            </div>

            <svg  v-if="true" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
    
          </button>
     
     
        </div>
       
          </div>
       
        </div>
      </div>
    </div>
</template>


