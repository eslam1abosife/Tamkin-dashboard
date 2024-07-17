<script lang="ts" setup>
definePageMeta({
    layout:'dashboard'
})



</script>



<template>



    <div class="w-full ">
        <h1 class="ltr:text-left rtl:text-right text-[18px] font-[600]">Market</h1>
     <div class="bg-[#EEF1F3] rounded-[10px] w-full h-[300px] flex items-end justify-center relative ">

        <div class="cursor-pointer w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center absolute top-[16px] right-[16px] ">
            <div class="absolute -top-2 -right-1 bg-[#EA4335] w-[16px] h-[16px] rounded-full flex items-center justify-center text-white font-[600] text-[10px]">1</div>
            <img src="/assets/pngs/market/cart.png"  class="w-[25px] h-[25px] " alt="">
        </div>

    <div class="flex items-center justify-evenly absolute bottom-[16px] right-[16px] space-x-[32px]">
        <div class="cursor-pointer w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center  ">
            <img src="/assets/pngs/market/reset.png"  class="w-[21px] h-[21px] " alt="">
        </div>
        <div class="cursor-pointer w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center  ">
            <img src="/assets/pngs/market/expand.png"  class="w-[21px] h-[21px] " alt="">
        </div>
    </div>
        <div>

            <img src="/assets/pngs/market/man.png" alt="">

        </div>
     </div>
        

  <MarketNavbar/>
    
    

    <div class="grid grid-cols-12 lg:grid-cols-12 2xl:grid-cols-5 ipad-max:grid-cols-12 bg-white p-10  lg:gap-4 2xl:gap-4 
    ipad-max:gap-8 ">
      <div class="market_card_char order-1">
        <div>
          <img src="/assets/pngs/market/add_char.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <button class="btn-dashboard hover_tamkin !rounded-full">
            specific character
          </button>
        </div>
      </div>
  
      <div class="market_card_char bg-selected order-1">
        <div class="w-[144px] h-[118px] bg-[#FAFAFA] flex items-end justify-center rounded-[10px] relative">
          <div class="absolute top-0 left-0">
            <img src="/assets/pngs/market/package.png" class="w-[64px] h-[17px]" alt="">
          </div>
          <img src="/assets/pngs/market/man.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <h1 class="text-[11px] font-[500] text-darkGrey leading-[17px]"> Fares aperiam perferendi at libero perferendis </h1>
        </div>
      </div>
  
      <div class="market_card_char !bg-white order-1">
        <div class="w-[144px] h-[118px] bg-[#FAFAFA] flex items-end justify-center rounded-[10px] relative">
          <div class="absolute top-0 left-0">
            <img src="/assets/pngs/market/purchased.png" class="w-[64px] h-[17px]" alt="">
          </div>
          <img src="/assets/pngs/market/man.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <h1 class="text-[11px] font-[500] text-darkGrey leading-[17px]"> Fares aperiam perferendi at libero perferendis </h1>
        </div>
      </div>
  
      <div class="market_card_char !bg-white order-1">
        <div class="w-[144px] h-[118px] bg-[#FAFAFA] flex items-end justify-center rounded-[10px] relative">
          <div class="absolute top-0 left-0">
            <img src="/assets/pngs/market/special_offer.png" class="w-[64px] h-[17px]" alt="">
          </div>
          <img src="/assets/pngs/market/man.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <h1 class="text-[11px] font-[500] text-darkGrey leading-[17px]"> Fares aperiam perferendi at libero perferendis </h1>
          <div class="flex flex-col items-evenly justify-center">
            <div class="w-[45px] h-[16px] bg-gradient-to-r from-[#FFD97E] via-[#FEE772] to-[#FFF1AD] rounded-[3px] font-[500] text-darkGrey text-[10px] flex items-center justify-center">
              <div>%30 OFF</div>
            </div>
            <div class="flex items-center justify-start">
              <div class="text-[13px] font-[600] text-darkGrey pr-[10px]">$100</div>
              <div class="text-[13px] font-[600] text-[#EC5A4E] line-through decoration-2">$150</div>
              <div class="cursor-pointer w-[35px] h-[35px] ml-auto bg-white rounded-lg flex items-center justify-center border">
                <img src="/assets/pngs/market/cart.png" class="w-[25px] h-[25px]" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="market_card_char !bg-white order-1">
        <div class="w-[144px] h-[118px] bg-[#FAFAFA] flex items-end justify-center rounded-[10px] relative">
          <div class="absolute top-0 left-0">
            <img src="/assets/pngs/market/special_offer.png" class="w-[64px] h-[17px]" alt="">
          </div>
          <img src="/assets/pngs/market/man.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <h1 class="text-[11px] font-[500] text-darkGrey leading-[17px]"> Fares aperiam perferendi at libero perferendis </h1>
          <div class="flex flex-col items-evenly justify-center">
            <div class="flex items-center justify-start">
              <div class="text-[13px] font-[600] text-darkGrey pr-[10px]">$100</div>
              <div class="cursor-pointer w-[35px] h-[35px] ml-auto bg-white rounded-lg flex items-center justify-center border">
                <img src="/assets/pngs/market/cart.png" class="w-[25px] h-[25px]" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="market_card_char !bg-white order-2">
        <div class="w-[144px] h-[118px] bg-[#FAFAFA] flex items-end justify-center rounded-[10px] relative">
          <div class="absolute top-0 left-0">
            <img src="/assets/pngs/market/applied.png" class="w-[51px] h-[17px]" alt="">
          </div>
          <img src="/assets/pngs/market/man.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <h1 class="text-[11px] font-[500] text-darkGrey leading-[17px]"> Fares aperiam perferendi at libero perferendis </h1>
          <div class="flex flex-col items-evenly justify-center">
            <!-- Additional content if needed -->
          </div>
        </div>
      </div>
      <div class="market_card_char !bg-white order-2">
        <div class="w-[144px] h-[118px] bg-[#FAFAFA] flex items-end justify-center rounded-[10px] relative">
     
          <img src="/assets/pngs/market/man.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <h1 class="text-[11px] font-[500] text-darkGrey leading-[17px]"> Fares aperiam perferendi at libero perferendis </h1>
          <div class="flex flex-col items-evenly justify-center">
            <!-- Additional content if needed -->
          </div>
        </div>
      </div>
      <div class="market_card_char !bg-white order-2">
        <div class="w-[144px] h-[118px] bg-[#FAFAFA] flex items-end justify-center rounded-[10px] relative">
      
          <img src="/assets/pngs/market/man.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <h1 class="text-[11px] font-[500] text-darkGrey leading-[17px]"> Fares aperiam perferendi at libero perferendis </h1>
          <div class="flex flex-col items-evenly justify-center">
            <!-- Additional content if needed -->
          </div>
        </div>
      </div>
      <div class="market_card_char !bg-white order-2">
        <div class="w-[144px] h-[118px] bg-[#FAFAFA] flex items-end justify-center rounded-[10px] relative">
      
          <img src="/assets/pngs/market/man.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <h1 class="text-[11px] font-[500] text-darkGrey leading-[17px]"> Fares aperiam perferendi at libero perferendis </h1>
          <div class="flex flex-col items-evenly justify-center">
            <!-- Additional content if needed -->
          </div>
        </div>
      </div>
      <div class="market_card_char !bg-white order-2">
        <div class="w-[144px] h-[118px] bg-[#FAFAFA] flex items-end justify-center rounded-[10px] relative">
      
          <img src="/assets/pngs/market/man.png" class="w-[94px] h-[106px]" alt="">
        </div>
        <div>
          <h1 class="text-[11px] font-[500] text-darkGrey leading-[17px]"> Fares aperiam perferendi at libero perferendis </h1>
          <div class="flex flex-col items-evenly justify-center">
            <!-- Additional content if needed -->
          </div>
        </div>
      </div>
    </div>

  
      

  
    </div>




</template>


<style>

.market_card_char{
   

    @apply  ipad-max:col-span-4 lg:col-span-3 2xl:col-span-1 col-span-6 p-3 h-[219px] w-[200px] border-[1px] border-[#E6E8EC] flex flex-col items-center justify-start rounded-[10px]  space-y-[10px];
}

</style>