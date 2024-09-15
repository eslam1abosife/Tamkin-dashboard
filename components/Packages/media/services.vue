<script lang="ts" setup>
import { useFullUrl } from "@/composables/useSharedFunctions";

const { fullUrl } = useFullUrl();

const packagesStore= usePackgesStore()
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div v-if="packagesStore.getAddonsOrExtras('Services').length"
  class="flex items-center flex-col justify-center relative w-full mt-[32px] h-[296px] rounded-[10px] bg-gradient-to-r from-[#DAD1FF] via-[#85C8D6]/[23%] to-[#71DAD2] relative"
>
  <div class="absolute top-[-22px] right-[36px]">
    <img src="/imgs/media_services.png" class="w-[190px] h-[128px]" alt="" />
  </div>
  <div class="text-[20px] leading-[30px] font-[500] text-[#3D3D3D] font-[700]">
    Media services
  </div>

  <div class="flex items-center justify-center rtl:space-x-reverse  space-x-[14px] px-[8px] mt-[46px]">
    <div v-for="srv in packagesStore.getAddonsOrExtras('Services')"
      class="h-[165px] col-span-4 w-full p-[32px] rounded-[10px] bg-[#F7F8FF] flex relative flex-col items-start justify-center"
    >
      <div class="flex items-center justity-center w-full rtl:space-x-reverse  space-x-[13px] mt-[10px]">
        <div>
          <img
            :src="fullUrl(srv.icon)"
            class="ipad-max:w-[20px] ipad-max:h-[20px] w-[25px] h-[25px]"
            alt=""
          />
        </div>
        <div
          class="text-[14px] ipad-max:text-[12px] font-[500] ipad-max:leading-[10px] leading-[24px] text-[#585B5B]"
        >
          {{srv.title}}
        </div>
      </div>
      <div
        class="mt-[8px] ipad-max:text-[10px] text-[12px] ipad-max:leading-[14px] leading-[16px] font-[400] text-[#393767]"
      >
        {{srv.description}}
      </div>
      <div v-if="srv.package_price_role[0].discount_month !== 0 || srv.package_price_role[0].discount_yearly !==0"
      class="absolute top-[97px] left-[150px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]"
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
        ><span class="text-[10px] font-[500] leading-[15px] text-darkGrey">/{{packagesStore.discountType}}</span>
      </div>

      <div
        class="cursor-pointer text-[10px] font-[600] leading-[32px] flex items-center justify-start rtl:space-x-reverse  space-x-[14px]"
      >
        <div>Purchase Now</div>
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

  </div>
</div>

<PackagesFeatures/>

</div>
</template>
