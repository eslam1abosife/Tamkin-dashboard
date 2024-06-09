<script lang="ts" setup>


</script>

<template>

<div>
    <div class="grid grid-cols-12">
        <div class="col-span-6 w-[604px] h-[832px] bg-gradient-to-b from-teal-500 to-teal-300 order-2 ml-auto"></div>        
        
        <div class="col-span-6 mt-[48px] ml-[42px] order-1">
            <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[82px]">

            <div class="mt-[6px] max-w-[580px] mx-auto text-center">
                <h1 class="text-[32px] font-medium ">Log In</h1>
               
                <h3 class="text-[20px] font-[600] text-secondary_text">New To TAMKIN <a href="" class="text-tamkin underline">Get Started</a></h3>
          
                <button class="transition-all ease-in-out hover:bg-tamkin/15  border-[1px] border-tamkin rounded-lg bg-transparent  w-[580px] h-[55px] font-[600] text-[20px] mt-[36px]">
                    <div class="flex items-center justify-center space-x-[8px]">
                        <div>Log in  with Google</div>
                        <img src="/assets/imgs/google_login.png" alt="">
                    </div>
                </button>
                <div class="relative flex  items-center  mx-auto mt-[24px]">
                    <div class="flex-grow border-t border-gray-400"></div>
                    <span class="flex-shrink mx-4 text-secondary_text text-[20px] font-[600] ">Or</span>
                    <div class="flex-grow border-t border-gray-400"></div>
                </div>

               <div class="space-y-[24px] mt-[24px]">
                <div class="w-full relative">
                    <input type="email" placeholder="email" class="input_floating_label peer" />
                    <label for="email" class="floating_label">Email*</label>

                </div>

                <div class="w-full relative">
                    <input type="password" placeholder="password" class="input_floating_label peer" />
                    <label for="password" class="floating_label">Password*</label>

                </div>

              <div class="flex items-center space-x-[290px]">
                <div class="w-full space-x-[8px]">
                    <input type="checkbox"  class="rounded-[4px] text-tamkin ring-0 focus:ring-0" name="remember_me" checked/>
                    <label for="remember_me">Remember me</label>
                </div>
                <div class="w-full space-x-[8px]">
                    <a class="text-[15px] font-[500] underline text-tamkin"> Forgot Password?</a>
                </div>
              </div>

      

               </div>
               <div class="mt-[100px]">
                <button class="border-[1px] border-tamkin transition-all ease-in-out hover:text-black w-full text-[20px] font-[600] py-[16px] px-[8px]  bg-gradient-to-b from-tamkin/100 to-tamkin/70 hover:from-tamkin/50 hover:to-tamkin/50 rounded-[10px]  text-white">
                    <span class="transition-all ease-out">Login</span>
                  </button>
              </div>
            </div>
        </div>
    </div>
</div>

</template>


