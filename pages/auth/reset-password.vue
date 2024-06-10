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
        <h1 class="text-[32px] font-medium ">Forgot Password</h1>
       
        <h3 class="text-[20px] font-[600] text-secondary_text">Enter your email for the verification we will send 4 digits code to your email</h3>
  
  

       <div class="space-y-[24px] mt-[24px]">
        <div class="w-full relative">
            <input type="email" placeholder="email" id="email"  class="input_floating_label peer" />
            <label for="email" class="floating_label">Email*</label>

        </div>

       



       </div>
       <div class="mt-[335px]">
        <button class="border-[1px] border-tamkin transition-all ease-in-out hover:text-black w-full text-[20px] font-[600] py-[16px] px-[8px]  bg-gradient-to-b from-tamkin/100 to-tamkin/70 hover:from-tamkin/50 hover:to-tamkin/50 rounded-[10px]  text-white">
            <span class="transition-all ease-out">Continue</span>
          </button>
      </div>
    </div>
</div>

</template>


