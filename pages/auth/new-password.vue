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
        <h1 class="text-[32px] font-medium ">New Password</h1>
       
        <h3 class="text-[20px] font-[600] text-secondary_text">Set the new password for your account so you can login and access all features.</h3>
  
  

       <div class="space-y-[24px] mt-[13px]">
        <div class="w-full relative">
            <input type="password" placeholder="new password" id="newPass"  class="input_floating_label peer" />
            <label for="newPass" class="floating_label">Enter new Password*</label>

        </div>

        <div class="w-full relative">
            <input type="password" placeholder="new password" id="ConfirmPass"  class="input_floating_label peer" />
            <label for="ConfirmPass" class="floating_label">Confirm Password*</label>

        </div>



       </div>
       <div class="mt-[150px] mb-[131px]">
        <button class="border-[1px] border-tamkin transition-all ease-in-out hover:text-black w-full text-[20px] font-[600] py-[16px] px-[8px]  bg-gradient-to-b from-tamkin/100 to-tamkin/70 hover:from-tamkin/50 hover:to-tamkin/50 rounded-[10px]  text-white">
            <span class="transition-all ease-out">Update Password</span>
          </button>
      </div>
    </div>
</div>

</template>


