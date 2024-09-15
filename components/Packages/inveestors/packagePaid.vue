<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

definePageMeta({
  layout: "dashboard",
});
const moreDetails = ref(false);
const pricingType = ref("monthly");
const packagesStore = usePackgesStore();

</script>

<template>
  <div v-if="packagesStore.investorUser" class="bg-gradient-to-t from-white to-[#8EE6DF] h-[249px] w-full flex items-start space-x-[80px] justify-start 
  rounded-lg shadow-lg p-6  mx-auto">
  
<div class="flex flex-col items-start justify-center w-4/6 space-y-[16px]">
  <div class="flex items-center justify-between w-full">
    <div class="text-[15px] font-[600] leading-[19px] ">
      Investor Package
    </div>
    <div>
      <img :src="`https://tamkin.app/${packagesStore.investorUser.icon}`" class="w-[33px] h-[33px]" alt="">
    </div>
    </div>
<div class="flex items-center justify-between w-full">
<div class="text-[15px] font-[500] leading-[19px] text-darkGrey">
  Wallet Address
</div>
<div class="text-[15px] font-[600] leading-[19px] text-darkGrey">
  {{packagesStore.investorUser.wallet_address}}
</div>
</div>

<div class="flex items-center justify-between w-full">
  <div class="text-[15px] font-[500] leading-[19px] text-darkGrey">
    Hash
  </div>
  <div class="text-[15px] font-[600] leading-[19px] text-[#2DB9B0]">
    {{packagesStore.investorUser.transaction_hashes}}
  </div>
  </div>

  <div class="flex items-center justify-between w-full">
    <div class="text-[15px] font-[500] leading-[19px] text-darkGrey">
      Amount
    </div>
    <div class="text-[15px] font-[600] leading-[19px] text-darkGrey">
      {{packagesStore.investorUser.amount}}  {{ packagesStore.investorUser.title}} 

    </div>
    </div>

    <div class="flex items-center justify-between w-full">
      <div class="text-[15px] font-[500] leading-[19px] text-darkGrey">
        Status
      </div>
      <div  v-if="packagesStore.investorUser.status === 'In Review' || packagesStore.investorUser.status === 'Reject'" class="w-[70px] h-[30px] rounded-[5px] bg-[#FFCECE]/[64%] flex items-center justify-center">
       <div class="text-[12px] leading-[19px] font-[600] text-darkGrey">
        {{packagesStore.investorUser.status === 'Reject' ? 'Rejected': 'In Review'}} 
       </div>
      </div>
      <div  v-if="packagesStore.investorUser.status === 'Active'" class="w-[67px] h-[30px] rounded-[5px] bg-gradient-to-b from-tamkinStart to-tamkinEnd flex items-center justify-center">
        <div class="text-[12px] leading-[19px] font-[600] text-white">
         Active
        </div>
       </div>
      </div>
</div>

<div>
  <img src="/imgs/investor_package_hero.png" class="w-[227px] h-[175px]" alt="">
</div>


  



  </div>
  


      
</template>