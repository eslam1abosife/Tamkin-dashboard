<script lang="ts" setup>

const localePath = useLocalePath()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData,
} = useModalManager();
</script>

<template>

    <div class="w-full mx-auto h-[250px] p-6 bg-gradient-to-t from-white to-[#8EE6DF] rounded-xl mt-[32px]  flex
     items-center rtl:space-x-reverse space-x-4 relative" style="box-shadow: 1px 1px 26.4px 0px #71DAD269;
">

<div class="absolute rtl:right-[50%] ltr:left-[50%]">
<img src="/imgs/eth.png" class="w-[136px] h-[209px]" alt="">
</div>
        <div class="flex-1">
          <h2 class="text-xl font-bold mb-2 h-[41px]">{{$t('Investor Package')}}</h2>
          <p class="text-black text-[14px] font-[400] leading-[21px] mb-4 w-3/4 h-[87px] text-darkGrey">
{{ $t('Based on the detailed information you’ve provided, a personalized package will be carefully determined to meet your specific needs and preferences') }}


          </p>
          <button class="btn-dashboard hover_tamkin max-w-[202px]" 
          @click="openModal('join_to_investor')">{{$t('Join Now')}}</button>
        </div>
        <div class="relative z-50 botton-[36px] mt-[10px]">
          <img src="/imgs/investor_package_hero.png" alt="Robot Image" class="w-[212px] h-[142px]"/>
        </div>
  
   <div class="flex items-center justify-center absolute top-[25px] rtl:left-[19px] ltr:right-[19px] rtl:space-x-reverse space-x-[10px]">
    <div>
      <img src="/imgs/investor/A1.svg" class="w-[28px] h-[28px]" alt="">
    </div>
    <div>
      <img src="/imgs/investor/AA.svg" class="w-[28px] h-[28px]" alt="">
    </div>
    <div>
      <img src="/imgs/investor/C.svg" class="w-[28px] h-[28px]" alt="">
    </div>
   </div>
      </div>
      

</template>