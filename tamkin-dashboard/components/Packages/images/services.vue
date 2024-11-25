<script lang="ts" setup>
import { useFullUrl } from "@/composables/useSharedFunctions";

const packagesStore= usePackgesStore()

const { fullUrl } = useFullUrl();

</script>

<template>
    <div v-if="packagesStore.getAddonsOrExtras('Services').length"
      class="flex items-center flex-col justify-center relative w-full mt-[32px] h-[296px] 
      rounded-[10px] bg-gradient-to-l rounded-[10px]  from-[#F0EAF7] space-y-[24px] via-[#85C8D6]/[23%] to-[#DAD1FF] relative"
    >
     
      <div class="text-[20px] leading-[30px] font-[500] text-[#3D3D3D] font-[700]">
        {{$t('Images  services')}}
      </div>
  
      <div 
         v-for="srv in packagesStore.getAddonsOrExtras('Services')"
      class="bg-white/[73%] w-5/6 rounded-[10px] h-[173px] p-[20px] relative flex  items-center justify-between space-y-[14px]"> 
<div class="flex flex-col items-start justify-center">
  <div class="flex items-center justify-start rtl:space-x-reverse space-x-[16px]">
    <div>
      <img :src="fullUrl(srv.icon)" class="w-[31px] h-[26px]" alt="">
    </div>
  <div class="text-[#021328] font-[500] text-[14px] leading-[20px]">
    {{$t(srv.title)}}
  </div>
  
  
  </div>
  <div class="text-[#393767] font-[400] text-[11px] leading-[18px] mt-2">
    {{$t(srv.description)}}
  
  
  
  </div>
  <div v-if="srv.package_price_role[0].discount_month !== 0 || srv.package_price_role[0].discount_yearly !==0"
  class="absolute top-[90px] left-[150px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]"
>
  <div
    class="absolute right-[0] text-[#EA4335] text-[15px] leading-[18.17px] font-[400] line-through"
  >
  <span v-if="packagesStore.discountType === 'month'">
    ${{ srv.package_price_role[0].cost_before_month }}
  </span>
  <span v-if="packagesStore.discountType === 'year'">
    ${{ srv.package_price_role[0].cost_before_yearly  }}
  </span>
  </div>
</div>
  
  <div class="my-[8px]">
    <span class="text-[12px] leading-[18px] font-[700]">$
      {{ 
        packagesStore.discountType === 'month' 
          ? srv.package_price_role[0].cost_month
          : srv.package_price_role[0].cost_yearly
      }}
      </span
    ><span class="text-[10px] font-[500] leading-[15px] text-darkGrey">/{{$t(packagesStore.discountType)}}</span>
  </div>
  
  <div
    class="cursor-pointer text-[10px] font-[600] leading-[32px] flex items-center justify-start rtl:space-x-reverse space-x-[14px]"
  >
    <div>{{$t('Purchase Now')}}</div>
    <svg
      width="9"
      height="15"
      class="w-[4px] h-[6px] rtl:rotate-180"
      viewBox="0 0 9 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.72769 7.25391L-2.14577e-06 1.80922L1.63615 0.253906L9 7.25391L1.63615 14.2539L-2.14577e-06 12.6986L5.72769 7.25391Z"
        class="fill-[#021328] group-hover:fill-white"
      />
    </svg>
  </div>
</div>

<div>
  <img src="/imgs/image_services_vector.png" class="w-[94px] h-[92px] mb-4" alt="">
</div>
      </div>
 
    </div>
  </template>
  