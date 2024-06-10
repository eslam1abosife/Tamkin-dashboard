

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
    <div class="pt-[6px] max-w-[580px] w-full text-center flex flex-col items-center justify-evenly mx-auto">
        <h1 class="text-[26px] lg:text-[32px] font-medium ">Sign Up</h1>
       
        <h3 class="text-[15px] lg:text-[20px] font-[600] text-secondary_text">Sign up to enjoy the feature of TAMKIN</h3>


       <div class="space-y-[24px] mt-[24px] w-full">
        <div class="w-full relative">
            <input type="text" placeholder="full name" id="fullname"  class="input_floating_label peer border" />
            <label for="fullname" class="floating_label">Fullname*</label>

        </div>
        <div class="w-full relative">
            <input type="email" placeholder="email" id="email"  class="input_floating_label peer border" />
            <label for="email" class="floating_label">Email*</label>

        </div>

        <div class="w-full relative">
            <input type="password" placeholder="password" id="password" class="input_floating_label peer" />
            <label for="password" class="floating_label">Password*</label>

        </div>
        <div class="w-full relative">
            <input type="password" placeholder="password" id="Confirmpassword" class="input_floating_label peer" />
            <label for="Confirmpassword" class="floating_label">Confirm Password*</label>

        </div>
   <div class="flex flex-col items-center justify-center">
    <div class="text-[15px] font-[400] leading-5 text-secondary_text">
        <p > By continuing, I agree to TAMKIN</p>
      </div>
<div > 
    <a href="" class="text-tamkin underline">Terms of Use </a> &
    <a href="" class="text-tamkin underline">Privacy Statement</a> 

</div>
   </div>
    
          </div>


       </div>
       <div class=" mt-[12px] flex flex-col items-center justify-center">
        <button class="btn-grad-action">Login</button>
        <button class="transition-all ease-in-out hover:bg-tamkin/15  border-[1px] border-tamkin rounded-lg bg-transparent w-[300px] md:w-[400px]  xl:w-[580px]  h-[45px] font-[600] text-[20px] mt-[12px]">
            <div class="flex items-center justify-center space-x-[16px] lg:space-x-[8px]">
                <div class="lg:text-base text-sm">Register with Google</div>
                <img src="/assets/imgs/google_login.png" alt="" class=" lg:h-full h-[20px]">
            </div>
        </button>
        <p class="mt-[8px]">Already have an account?? <a href="" class="text-tamkin underline">Log in</a></p>
      </div>

    
</div>

</template>




