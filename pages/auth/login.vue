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
        <h1 class="text-[26px] lg:text-[32px] font-medium ">Log In</h1>
       
        <h3 class="text-[15px] lg:text-[20px] font-[600] text-secondary_text">New To TAMKIN <a href="" class="text-tamkin underline">Get Started</a></h3>
  
        <button class="transition-all ease-in-out hover:bg-tamkin/15  border-[1px] border-tamkin rounded-lg bg-transparent  w-full  h-[45px] font-[600] text-[20px] mt-[18px]">
            <div class="flex items-center justify-center space-x-[16px] lg:space-x-[8px]">
                <div class="lg:text-base text-sm">Log in  with Google</div>
                <img src="/assets/imgs/google_login.png" alt="" class=" lg:h-full h-[20px]">
            </div>
        </button>
        <div class="relative flex  items-center  mx-auto mt-[24px]">
            <div class="flex-grow border-t border-gray-400"></div>
            <span class="flex-shrink mx-4 text-secondary_text text-[20px] font-[600] ">Or</span>
            <div class="flex-grow border-t border-gray-400"></div>
        </div>

       <div class="space-y-[24px] mt-[24px] w-full">
        <div class="w-full relative">
            <input type="email" placeholder="email" id="email"  class="input_floating_label peer border" />
            <label for="email" class="floating_label">Email*</label>

        </div>

        <div class="w-full relative">
            <input type="password" placeholder="password" id="password" class="input_floating_label peer" />
            <label for="password" class="floating_label">Password*</label>

        </div>

      <div class="flex flex-row items-center justify-between p-3">
        <div class="">
            <input type="checkbox"  class="rounded-[4px] text-tamkin ring-0 focus:ring-0" id="remember_me" checked/>
            <label for="remember_me" class="px-[8px]">Remember me</label>
        </div>
        <div class=" ">
            <a class="text-[15px] font-[500] underline text-tamkin"> Forgot Password?</a>
        </div>
      </div>



       </div>
       <div class="pt-[40px] ">
        <button class="btn-grad-action">Login</button>

      </div>
    </div>
</div>

</template>


