<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
definePageMeta({
    layout:'dashboard'
})
</script>

<template>
<div class="!px-0 w-full">
  <div class="h-[200px] w-full  bg-gradient-to-l from-[#055249] via-[#6D54D6] to-[#121061] relative flex items-center justify-center">
    <div class="absolute ">
      <img src="/imgs/moon.png" class="w-[203px] h-[203px]" alt="">
    </div>
    <div class="absolute left-0 -top-4">
      <img src="/imgs/lines_packages.png" class="w-[161px] h-[178px]" alt="">
    </div>

    <div class="absolute left-0 bottom-0">
      <img src="/imgs/package_hand.png" class="w-[149px] h-[84px]" alt="">
    </div>
    <div class="absolute right-[14px] inset-y-auto">
      <img src="/imgs/packages_hero.png" class="w-[174px] h-[154px]" alt="">
    </div>
   <div class="flex items-center justify-center flex-col">
    <div class="text-[20px] font-[600] leading-[32px] text-white">
      Tamkin Your Communication Journey 


    </div>
    <div class="flex items-center justify-center space-x-[22px] absolute bottom-0">
      <div class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px]  bg-[#FFFFFF61]/[38%] flex items-center justify-center flex-col ">
        <div>
          <img src="/imgs/sign_lang.png" class="w-[28px] h-[17px]" alt="">
        </div>
<div class="text-[10px] font-[500]  text-white">
  Sign language
</div>
      </div>

      <div class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px]   flex items-center justify-center flex-col ">
        <div>
          <img src="/imgs/access.png" class="w-[17px] h-[16px]" alt="">
        </div>
<div class="text-[10px] font-[500]  text-white">
  Accessibility
</div>
      </div>

      
      <div class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px]   flex items-center justify-center flex-col ">
        <div>
          <img src="/imgs/live_Translation.png" class="w-[23px] h-[16px]" alt="">
        </div>
<div class="text-[10px] font-[500]  text-white">
  Live Translation
</div>
      </div>

      <div class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px]   flex items-center justify-center flex-col ">
        <div>
          <img src="/imgs/investors.png" class="w-[18px] h-[18px]" alt="">
        </div>
<div class="text-[10px] font-[500]  text-white">
  Investors
</div>
      </div>
      <div class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px]   flex items-center justify-center flex-col ">
        <div>
          <img src="/imgs/bundle.png" class="w-[16px] h-[18px]" alt="">
        </div>
<div class="text-[10px] font-[500]  text-white">
  Bundle
</div>
      </div>
    </div>
   </div>
 
  </div>


  <NuxtPage/>
  
</div>
</template>

<style>

</style>
