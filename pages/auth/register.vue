<script lang="ts" setup>
definePageMeta({
    layout:'auth'
})

</script>

<template>

<div class="">
    <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[82px] lg:mx-0 mx-auto lg:mb-0 mb-6 ">

    <div class="pt-[6px] max-w-[400px] xl:max-w-[580px] mx-auto text-center">
        <h1 class="text-[32px] font-medium ">Sign Up</h1>
       
        <h3 class="text-[20px] font-[600] text-secondary_text">Sign up to enjoy the feature of TAMKIN</h3>
  

       <div class="space-y-[24px] mt-[24px]">
        <div class=" relative">
            <input type="text" placeholder="fullname" id="fullname" class="input_floating_label peer" />
            <label for="fullname" class="floating_label">Full Name*</label>

        </div>
        <div class=" relative">
            <input type="email" placeholder="email"  class="input_floating_label peer" />
            <label for="email" class="floating_label">Email*</label>

        </div>

        <div class="relative">
            <input type="password" placeholder="password"  id="password" class="input_floating_label peer" />
            <label for="password" class="floating_label">Password*</label>

        </div>
        <div class=" relative">
            <input type="password" placeholder="confirm password" id="Cpassword" class="input_floating_label peer" />
            <label for="Cpassword" class="floating_label">Confirm Password*</label>

        </div>
      

       </div>
       <div class="flex flex-col items-center justify-center w-[288px] mx-auto mt-[32px]">
        <div class="text-[15px] font-[400] leading-5 text-secondary_text">
          <p > By continuing, I agree to TAMKIN</p>
        </div>
  <div > 
      <a href="" class="text-tamkin underline">Terms of Use </a> &
      <a href="" class="text-tamkin underline">Privacy Statement</a> 
  
  </div>
  
        </div>

        <div class="mt-[32px]">
            <button class="border-[1px] border-tamkin transition-all ease-in-out hover:text-black w-full text-[20px] font-[600] py-[16px] px-[8px]  bg-gradient-to-b from-tamkin/100 to-tamkin/70 hover:from-tamkin/50 hover:to-tamkin/50 rounded-[10px]  text-white">
                <span class="transition-all ease-out">Sign Up</span>
              </button>
          </div>

          <button class="transition-all ease-in-out hover:bg-tamkin/15  border-[1px] border-tamkin rounded-lg bg-transparent  w-[50%] lg:w-full lg:w-[580px] h-[55px] font-[600] text-[20px] mt-[18px]">
            <div class="flex items-center justify-center space-x-[8px]">
                <div>Register with Google</div>
                <img src="/assets/imgs/google_login.png" alt="">
            </div>
        </button>
  
        <p class="mt-[8px]">Already have an account?? <a href="" class="text-tamkin underline">Log in</a></p>
     
    </div>
</div>

</template>


