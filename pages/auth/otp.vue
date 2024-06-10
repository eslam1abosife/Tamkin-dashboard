<script lang="ts" setup>
definePageMeta({
    layout:'auth'
})

</script>

<template>

<div class="">
<div class="">
    <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[82px] lg:mx-0 mx-auto lg:mb-0 mb-6 ">

</div>
    <div class="pt-[6px] max-w-[580px] mx-auto text-center">
        <h1 class="text-[32px] font-medium ">Verification</h1>
       
        <h3 class="text-[20px] font-[600] text-secondary_text">Enter your 6 digits code that you received on your email.</h3>
  
  

       <div class="space-y-[24px] mt-[24px]">
        <div class="flex flex-col ">
            <div class="flex flex-row items-center justify-center mx-auto w-full max-w-xs space-x-[22px]">
              <div class="w-16 h-16 ">
                <input 
               
                class="w-[78px] h-[56px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-light shadow-sm text-lg bg-light-grey focus:bg-gray-50 focus:ring-1 focus:ring-tamkin [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number"  min="0" max="9" maxlength="1" name="" id="">
              </div>
              <div class="w-16 h-16 ">
                <input class="w-[78px] h-[56px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-light shadow-sm text-lg bg-light-grey focus:bg-gray-50 focus:ring-1 focus:ring-tamkin [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"  type="number"  min="0" max="9" maxlength="1" name="" id="">
              </div>
              <div class="w-16 h-16 ">
                <input class="w-[78px] h-[56px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-light shadow-sm text-lg bg-light-grey focus:bg-gray-50 focus:ring-1 focus:ring-tamkin [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" min="0" max="9" maxlength="1" name="" id="">
              </div>
              <div class="w-16 h-16 ">
                <input class="w-[78px] h-[56px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-light shadow-sm text-lg bg-light-grey focus:bg-gray-50 focus:ring-1 focus:ring-tamkin [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  "    type="number" min="0" max="9" maxlength="1" name="" id="">
              </div>
              <div class="w-16 h-16 ">
                <input class="w-[78px] h-[56px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-light shadow-sm text-lg bg-light-grey focus:bg-gray-50 focus:ring-1 focus:ring-tamkin [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"  type="number"  min="0" max="9" maxlength="1" name="" id="">
              </div>
                <div class="w-16 h-16 ">
                <input class="w-[78px] h-[56px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-light shadow-sm text-lg bg-light-grey focus:bg-gray-50 focus:ring-1 focus:ring-tamkin [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"  type="number"  min="0" max="9" maxlength="1" name="" id="">
              </div>
            </div>

            <div class="flex flex-col pt-[325px]">
                <button disabled class="disabled:cursor-not-allowed disabled:hover:text-white border-[1px] border-tamkin transition-all ease-in-out  hover:text-black w-full text-[20px] font-[600] py-[16px] px-[8px]  bg-gradient-to-b disabled:from-light disabled:to-light disabled:border-0 from-tamkin/100 to-tamkin/70 hover:from-tamkin/50 hover:to-tamkin/50 rounded-[10px]  text-white">
                    <span class="transition-all ease-out">Continue</span>
                  </button>
    
              <div class="mt-[12px] flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>If you didn’t receive a code! </p> <span class="text-red-600">00:10</span>
              </div>
            </div>
          </div>

       



       </div>
  
    </div>
</div>

</template>


