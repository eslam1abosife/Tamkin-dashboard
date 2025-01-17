<script lang="ts" setup>
const {
  isOpen:isModalOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
import UAEFLAG from '/assets/imgs/flags/UAE.svg'
import EGYPTFLAG from '/assets/imgs/flags/Element.svg'
import SAUDIFLAG from '/assets/imgs/flags/Vector.svg'
const props = defineProps({
  showModal:Boolean
})
const savedCards = ref([
    {'id':1,number:'ETH',type:'eth'},
    {'id':2,number:'BNB',type:'bnb'},
    {'id':2,number:'USDTD',type:'usdt'},
]);

import bnbIcon from '/assets/imgs/crypto_methods_icons/3.svg'
import usdtIcon from '/assets/imgs/crypto_methods_icons/2.svg'
import ethIcon from '/assets/imgs/crypto_methods_icons/1.svg'
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
const ChangeCurrentCryptoMethod = (method:any)=>{

  selectedCrypto.value = method

}



watch(currentCard,(ov,nv)=>{})

const cryptoMethods = [
  { code: 'ETH', name: 'ETH', flag: bnbIcon },
  { code: 'USDT', name: 'USDT', flag: usdtIcon},
  { code: 'BNB', name: 'BNB', flag:ethIcon},
  // Add more countries as needed
];
const isOpen = ref(false);
const search = ref('');
const selectedCrypto = ref(  { code: 'ETH', name: 'ETH', flag: bnbIcon });

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectCryptoMethod = (method) => {
    selectedCrypto.value = method;
  isOpen.value = false;
};
const loading = ref(false)
const filteredCryptoMethods = computed(() => {
  return cryptoMethods.filter((method) =>
  method.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <div class="flex flex-col items-start justify-center w-full" v-if="showModal">
  
    <div class="flex items-center justify-center ">
        <div
        @click="navigateTo('crypto','add-site','paymentMethods')"

     class="cursor-pointer  flex items-center justify-center    bg-white dark:bg-tamkinDarkPrimary border-[1px]
   border-linecolor rounded-full w-[30px] h-[30px]"

   style="box-shadow: 0px 4px 8.7px 0px #DAF3F1;
"
  >
    <svg
      width="9"
      height="15"
      viewBox="0 0 9 15"
      fill="none"
      class="fill-tamkin group-hover:stroke-white group-hover:fill-white dark:stroke-light"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"
      />
    </svg>
  </div>
  <h1 class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey  dark:text-whiteTamkin ltr:ml-[20px] rtl:mr-[20px] lg:mt-0 mt-[60px]">
        Payment Methods
    </h1>
    </div>
    <div
      class="flex flex-col items-start justify-center bg-white dark:bg-tamkinDarkPrimary  w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >
      <h1
        class="text-[18px] leading-[36px] font-[600] ltr:ml-[20px] rtl:mr-[20px] text-darkGrey dark:text-whiteTamkin mt-[31px]"
      >
      Crypto Payment
      </h1>
<p class=" ltr:ml-[20px] rtl:mr-[20px] text-[14px] font-[400] leading-[22.5px] mt-[14px] text-darkGrey dark:text-whiteTamkin">Choose the cryptocurrency you want to complete the payment process</p>
    

   <div class="flex flex-col items-center justify-center space-y-[12px] mt-[24px]  mx-auto   w-full">
    <div class="flex flex-col items-center justify-center w-full px-[20px]" v-if="selectedCrypto">
        <div 
    
        
        class=" w-full   h-[100px] cursor-pointer custom-border-tamkin bg-[#FAFCFE] 
        dark:bg-tamkinDarkPrimary flex items-center justify-between rounded-[10px]
         border-lightGrey rtl:pr-[16px] ltr:pl-[16px]">
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                <div><img  :src="selectedCrypto.code === 'BNB' ?
                   ethIcon : selectedCrypto.code === 'ETH'  ? bnbIcon : usdtIcon" /></div>
                
                <div class="flex items-start flex-col justify-center space-y-[-4px]">
                  <div class="text-[18px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin">{{selectedCrypto.name}}</div>

                  <div class="text-[#021328] text-[14px] font-[500] dark:text-whiteTamkin">Pay Via {{ selectedCrypto.code }} and get <span class="text-[14px] font-[700]">20%</span> discount</div>

                </div>
            </div>

            <div class="order-1 mx-[4px]">
                <input
                  :id="'radio_'+selectedCrypto.id"
                  type="radio"
                  name="radio"
                  class="hidden"
                 :value="selectedCrypto.id"
     @click=""
  checked
                

                number/>
                <label                   :for="'radio_'+selectedCrypto.id"
                class="flex items-center cursor-pointer rtl:pl-[40px] ltr:pr-[40px]">
                  <span
                    class="w-[22px] h-[22px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                  ></span>
               
                </label>
              </div>
        </div>
        
    </div>

  

  <div class="flex items-center justify-between w-full  px-[20px] ">
    
    <div class="w-full lg:mt-0 mt-[16px]">
        <p class=" text-[16px] font-[400]  leading-[24px] ltr:text-left rtl:text-right mt-[10px] mb-[23px] dark:text-whiteTamkin text-[#3D3D3D]">
            Please choose other currency</p>
        
        <div class="relative w-full  ">
            <button
              @click="toggleDropdown"
              class=" input_search_country !rounded-[10px] !py-[6px] peer w-full  ltr:text-left rtl:text-right "
               :class="[isOpen ? 'rounded-b-none' : '']"
            >
              <span class="floating_label" v-if="!selectedCrypto">Choose Crypto currency</span>
              <div class="flex items-center justify-start " v-else>
                <img 
                :src="selectedCrypto.flag"
                
                class="rtl:!mr-[16px] ltr:!ml-[-12px] w-[25px] h-[25px]"
              />
              <span class="rtl:mr-[16px] ltr:ml-[16px] text-[14px] leading-[24px] font-[500] text-[#3D3D3D] dark:text-whiteTamkin">{{ selectedCrypto.name }}</span>
              <div class="rtl:mr-auto ltr:ml-auto ">
                <div class=" text-[14px] leading-[24px] font-[500] text-[#878787] dark:text-whiteTamkin">
                    0.00009 {{ selectedCrypto.name === 'ETH'  ? 'EHT' :  selectedCrypto.name === 'BNB' ?'BNB' : 'USDT'}}
                </div>
               </div>
             
                
               <img  src="/assets/imgs/menu-down.svg"         :class="[isOpen ? 'rotate-90':'']"       
               class=" rtl:mr-[24px] ltr:ml-[24px] rtl:ml-[20px] ltr:mr-[55px] mb-[2px] rtl:float-left ltr:float-right
                stroke-current fill-darkGrey dark:fill-whiteTamkin dark:text-whiteTamkin text-darkGrey w-[10px] h-[10px]"
             />
            </div>
            
         
            </button>
            <div
              v-if="isOpen"
              class="absolute z-10 top-[52px] bg-white dark:bg-tamkinDarkPrimary rounded-[12px] border-[1px] dark:border-light 
              border-[#C8CFEB] shadow w-full  py-[16px]"
            >
           
              <ul>
                <li
                @click="selectCryptoMethod(cryptoMethod)"
                  v-for="cryptoMethod in filteredCryptoMethods"
                  :key="cryptoMethod.code"

                  class="flex items-center  hover:bg-gray-100 dark:hover:bg-darkGrey py-[6px] px-[16px] cursor-pointer"
                >
                  <img 
                    :src="cryptoMethod.flag"
                    
                    class="w-[30px] h-[30px]"
                  />
                  <span class="rtl:mr-[16px] ltr:ml-[16px] text-[16px] leading-[24px] font-[500] text-[#3D3D3D] dark:text-whiteTamkin">{{ cryptoMethod.name }}</span>
                  <div class="rtl:mr-auto ltr:ml-auto rtl:ml-[72px] ltr:mr-[72px]">
                    <div class=" text-[16px] leading-[24px] font-[500] text-[#878787] dark:text-whiteTamkin">
                        0.00009 {{ cryptoMethod.name === 'ETH'  ? 'EHT' :  cryptoMethod.name === 'BNB' ?'BNB' : 'USDT'}}
                    </div>
                   </div>
               
                </li>
             
              </ul>
            </div>
       
    
    
    </div>
</div>
    
 </div>
<div class="flex flex-col items-start justify-center space-y-[24px] w-full px-[20px]">

  <div class="flex-1 w-full    text-[14px] font-[400]  leading-[24px] mt-[10px] dark:text-whiteTamkin text-[#A7A7A7] whitespace-pre-line ">
      By Choosing this crypto Currency that equal 0.00009 EHT your payment 


      will be : 

  </div>
    
    
        <div class=" rounded-[10px] custom-border-tamkin padding-override-1 w-[270px] h-[54px] flex items-center justify-center 
         mx-auto" >
    
            <h3 class="">
    
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]">
                    <div class="text-[16px] leading-[24px] font-[500] font-[Inter] text-[#3D3D3D] dark:text-whiteTamkin/70">
                        
                        AED 9.09 = <span class="text-black font-[500] dark:text-whiteTamkin">1.938344 {{selectedCrypto.name}}</span>
    
    
                    </div>
                    <div><img  
                      :src="selectedCrypto.code === 'BNB' ? 
                      ethIcon : selectedCrypto.code === 'ETH'  ?
                       bnbIcon : usdtIcon" class="w-[25px] h-[25px]"/></div>
                 
                </div>
            </h3>
    
                
        </div>
</div>
<!-- here-->

 

<!-- here-->

 <div class="flex items-center justify-between  rtl:space-x-reverse space-x-[24px] w-full  px-[20px] ">
  <div class="lg:py-[17px] search_input w-full lg:w-3/4 mt-[10px]">
    <input
      type="text"
      class="input_dashboard_search w-full text-darkGrey dark:text-whiteTamkin !h-[40px]"
    v-model="promo"
      placeholder="Promo Code"
      :class="[validPromo ? '!bg-[#E8F8F6] dark:!bg-[#170705] !text-[#E8F8F6] dark:!text-[#170705] ' : '']"
    />
   <div class="absolute top-[-8px] lg:top-[8px] rtl:right-[7.5px] ltr:left-[7.5px] p-[16px] 
   flex items-center justify-evenly rtl:space-x-reverse space-x-[10px]" v-if="validPromo">
    <img  src="/assets/imgs/promo_valid.svg" />
    <div class="text-[15px] font-[500] text-darkGrey dark:text-white/70 ">
            <span class="text-[#021328]  font-[700]">12%</span> Discount (-$2,444 )
    </div>
    <img  src="/assets/imgs/promo_valid_.svg" class="" />

   </div>
    <div
      v-if="isPromoFilled"
      @click="clearInput"
      class="absolute top-[-8px] lg:top-[-27px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer lg:mt-[36px]" 
    >
      <img  src="/assets/imgs/close_promo.svg"  />
    </div>
  </div>
      <div class="text-center mt-[10px]">
        <button class="btn-dashboard hover_tamkin w-6/6 mx-auto text-center " @click="addPromoCode" v-if="!validPromo">Apply Code</button>
        <button v-else class="btn_bordered_dashboard 
error w-6/6 mx-auto text-center " @click="removePromoCode">Remove Code</button>
      </div>
 </div>
 <table class="min-w-full ">
    <thead>
      <tr>
        <th
          class="py-2 ltr:pl-[20px] rtl:pr-[20px] border-b dark:border-light dark:text-whiteTamkin text-[16px] leading-[30px] text-darkGrey font-[600] ltr:text-left rtl:text-right"
        colspan="12">
        Summary
        </th>
      
      </tr>
    </thead>
    <tbody>
   
 
      <tr class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"           v-if="validPromo"
      >
        <td
          class="py-2 px-5 border-b text-right font-[500] w-full dark:text-whiteTamkin "
          colspan="2"
        >
          Subtotal
        </td>
        <td class="py-2 px-5 border-b text-right w-full dark:text-whiteTamkin " colspan="2">
          $50,444.00
        </td>
      </tr>
      <tr           v-if="validPromo"
       class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
        <td
          class="py-2 pr-4 border-b text-right font-[500] w-full dark:text-whiteTamkin "
          colspan="2"
        >
        Discount
        </td>
        <td class="py-2 pr-4 border-b text-right w-full font-[500] dark:text-whiteTamkin "  colspan="2">
          $50,444.00
        </td>
      </tr>
      <tr class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"         
      >
        <td
          class="py-2 px-5 border-b text-right font-[500] w-full dark:text-whiteTamkin "
          colspan="2"
        >
          Total
        </td>
        <td class="py-2 px-5 border-b text-right w-full font-[500] dark:text-whiteTamkin " colspan="2">
          $50,444.00
        </td>
      </tr>
      <tr class="text-[14px] leading-[24px]  bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"         
      >
        <td
          class="py-2 px-5 border-b text-right font-[500] w-full dark:text-whiteTamkin "
          colspan="2"
        >
        Total Crypto
        </td>
        <td class="py-2 px-3 border-b text-right w-full font-[500] dark:text-whiteTamkin " colspan="2">
          EHT 1.938344
        </td>
      </tr>
    </tbody>
  </table>
   </div>
   <div class="mt-[39px]  mx-auto mb-[34px]">
    <button class="btn-dashboard hover_tamkin !h-[40px]   lg:w-[535px] w-full " @click="navigateTo('crypto','add-site','cryptosend')"
     v-if="!loading">
      Confirm Payment
    </button>
    <button class="processing_payment !h-[40px]  lg:w-[535px] w-full " v-else disabled>
      Loading..
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


