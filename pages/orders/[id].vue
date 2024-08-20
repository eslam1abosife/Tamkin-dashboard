<script lang="ts" setup>
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  lastEventCall,
  eventCounter,
  setData,
} = useModalManager();
const marketStore = useMarketStore();

definePageMeta({
  layout: "dashboard",
});

const openModalAndHideChat = ()=>{
  if(process.client && !isOpen('requestmodal_update')){
    window.$chatwoot.toggleBubbleVisibility('hide')
    openModal('requestmodal_update','order-id')
  }
}
</script>

<template>
  <div class="w-full relative">
    <LazyProfileBillingModalsEditcard />
    <ProfileBillingModalsAddnewCard />
    <ProfileOrdersTracking/>
    <ProfileOrdersRequest/>
<ProfileOrdersViewdetails/>

    <div class="space-y-[5px]">
      <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
        Order details
      </h1>

      <h2 @click="$router.push('/orders')"
        class="cursor-pointer ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
        Orders
      </h2>
    </div>

    <div
      class="w-full flex flex-col items-evenly justify-evenly px-[20px] h-full bg-white mt-[20px] rounded-[10px]"
    >
      <div
        class="flex items-center  justify-between  w-full mt-[26px] pb-[24px] border-b-[1px] border-[#D9D9D9]"
      >
        <div class="text-[13px] font-[500] leading-[10px] text-[#23262F] ">
          Order ID : <span class="!font-[600] text-tamkin">289422</span>
        </div>

        <div class="h-[24px] w-[1px] bg-[#D9D9D9]">

        </div>
        <div
          class="text-[13px] font-[500] space-x-[10px] text-[#23262F] flex items-center justify-center"
        >
          <div>Order Date :</div>
          <div class="flex items-center justify-start space-x-[8px]">
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.5 1V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V1H11C11 1 11.4142 1 11.7071 1.29289C11.7071 1.29289 12 1.58579 12 2V12C12 12 12 12.4142 11.7071 12.7071C11.7071 12.7071 11.4142 13 11 13H1C1 13 0.585785 13 0.292893 12.7071C0.292893 12.7071 0 12.4142 0 12V2C0 2 0 1.58579 0.292893 1.29289C0.292893 1.29289 0.585786 1 1 1H2.5V0.5C2.5 0.223858 2.72386 0 3 0C3.27614 0 3.5 0.223858 3.5 0.5V1H8.5ZM1 5V12H11V5H1ZM11 4H1V2H2.5V2.5C2.5 2.77614 2.72386 3 3 3C3.27614 3 3.5 2.77614 3.5 2.5V2H8.5V2.5C8.5 2.77614 8.72386 3 9 3C9.27614 3 9.5 2.77614 9.5 2.5V2H11V4Z"
                fill="#021328"
                fill-opacity="1"
              />
            </svg>

            <div>Feb 2, 2023</div>
          </div>
        </div>
        <div class="h-[24px] w-[1px] bg-[#D9D9D9]">

        </div>
        <div
          class="text-[13px] font-[500] space-x-[10px] text-[#23262F] flex items-center justify-center"
        >

      <img src="/imgs/cc.png" class="w-[32px] h-[32px]" alt="">
          <div>Via Card : xxxx xxxx xxxx 9015</div>
        
        </div>
        <div class="h-[24px] w-[1px] bg-[#D9D9D9]">

        </div>
        <div
        class="text-[13px] font-[500] space-x-[10px] text-[#23262F] flex items-center justify-center"
      >

    <img src="/imgs/success.png" class="w-[32px] h-[32px]" alt="">
        <div>Successful purchase</div>
      
      </div>
      </div>
      <div class="text-[14px] font-[500] leading-[20px] text-[#23262F] mt-[41px]">
        Order Items
      </div>
      <div class="space-y-4 mt-[10px]">
        <!-- Item 1 -->
        <div class="flex items-center border-b justify-between pb-4">
          <div class="flex items-center space-x-4">
            <div
              class="rounded-lg bg-[#F8F8F8] dark:bg-tamkinDarkPrimary w-[97px] h-[101px] flex items-center justify-center border"
            >
              <img src="/imgs/shirt.png" alt="Top" class="w-[47px] h-[50px]" />
            </div>
            <div>
              <div class="flex items-center justify-start space-x-[10px]">
                <div>
                  <img
                    src="/assets/pngs/market/top_inactive.svg"
                    alt="Top"
                    class="w-[26px] h-[26px]"
                  />
                </div>
                <div class="py-2">
                  <h3 class="font-[500] text-[#878787] capitalize dark:text-whiteTamkin">
                    Top
                  </h3>
                </div>
              </div>
              <p
                class="text-darkGrey dark:text-whiteTamkin text-sm font-[500] text-left mt-[6px] capitalize"
              >
                Item name
              </p>
            </div>
          </div>
          <div class="flex items-end flex-col justify-start mt-[44px]  mr-[1px]">
            <p class="text-[#021328] text-[16px] font-[500] dark:text-whiteTamkin">
               <span class="px-1">$10</span>
            </p>
          </div>
        </div>
      </div>
      <div class="space-y-4 pt-[14px]">
        <!-- Item 1 -->
        <div class="flex items-center border-b justify-between pb-4 " >
          <div class="flex items-center space-x-4">
           <div class="rounded-lg bg-[#F8F8F8]  w-[97px] h-[101px] flex items-center justify-center border">
              <img src="/assets/pngs/market/special_character.png" alt="Top" class="w-[63px] h-[67px] ">
           </div>
            <div>
             <div class="flex items-center justify-start space-x-[10px] ">
              <div>
                  <img src="/assets/pngs/market/top_inactive.svg" alt="Top" class="w-[26px] h-[26px] ">

              </div>
              <div class="py-2">
                <h3 class="font-[500] text-[#878787] capitalize dark:text-whiteTamkin">Character</h3>
              </div>
             </div>
              <p class="text-darkGrey text-sm font-[500] text-left mt-[6px] capitalize dark:text-whiteTamkin" >Request a specific character</p>

              <div class="flex items-center justify-start space-x-[26px] mt-[12px] ">
                <button class="text-tamkin underline font-[500] text-[13px] " @click="openModalAndHideChat">Edit request</button>
                <button class="text-tamkin underline font-[500] text-[13px] " @click="openModal('tracking_custom_order','order-id')">Track</button>
                <button class="text-tamkin underline font-[500] text-[13px] " @click="openModal('requestmodal_details','order-id')">View Details</button>

              </div>
            </div>
          </div>
          <div class="flex items-end flex-col justify-start mt-[16px] mr-[1px] ">
           
        
            <p class="text-[#021328] text-[16px] font-[500] dark:text-whiteTamkin"> <span class="px-1">$80</span></p>
          </div>
        </div>
    
    
      </div>

      <div class="pb-[10px]">
        <table class="min-w-full ">
   
            <tbody>
           
         
        
              <tr class="text-[14px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"         
              >
                <td
                  class="py-2 px-5 border-b  dark:border-light text-right font-[500] w-full  dark:text-whiteTamkin"
                  colspan="2"
                >
                Subtotal
                </td>
                <td class="py-2   border-b dark:border-light text-right w-full font-[500]  dark:text-whiteTamkin" colspan="2">
                120$
                </td>
              </tr>
              <tr class="text-[14px] leading-[24px]  bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"       
              >
                <td 
                  class="py-2 px-5 border-b dark:border-light text-right font-[500] w-full dark:text-whiteTamkin"
                  colspan="2"
                >
                Discount
  
                </td>
                <td class="py-2   border-b dark:border-light text-right w-full font-[500] dark:text-whiteTamkin" colspan="2">
                 50$
                </td>
              </tr>
              <tr class="text-[14px] leading-[24px]  bg-[#FAFCFE] dark:bg-p"         
              >
                <td
                  class="py-2 px-5 border-b dark:border-light text-right font-[500] w-full dark:text-whiteTamkin"
                  colspan="2"
                >
                Total
  
                </td>
                <td class="py-2 border-b dark:border-light text-right w-full font-[500] dark:text-whiteTamkin" colspan="2">
                  $80
                </td>
              </tr>
            </tbody>
          </table>
      
       
       
      </div>
    </div>

 
  </div>
  <div></div>
</template>
