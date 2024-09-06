<script lang="ts" setup>
const packagesStore = usePackgesStore()

</script>

<template>
  <div class="flex items-center justify-center relative w-9/12 ml-auto">
    <div class="w-full gap-4 grid grid-cols-3 mt-[32px]">
      <div
      v-for="pak in packagesStore.getPackageByTypeAndCategory('Package')" 
          
      :key="pak.name"
        class="w-full mx-auto p-6 bg-white rounded-[10px] ipad-max:h-auto h-auto"
        style="box-shadow: 0px 0px 10.1px 0px #dadada"
      >
        <div class="flex justify-center">
          <img :src="`https://tamkin.app/${pak.icon}`" alt="Icon" class="h-[80px] w-[80px]" />
        </div>
        <div class="text-center mb-2">
          <h2 class="text-[20px] leading-[30px] font-[600]">{{pak.title}}</h2>
          <p class="text-[#536174] text-[10px] font-[400] leading-[15px]">
           {{pak.sub_title}}
          </p>
        </div>
        <div class="text-center my-6">
          <p class="text-[20px] leading-[29px] font-[600]">
            $ <span class="text-[20px] leading-[29px] font-[600]">{{ pak.package_price_role[0].cost_month }}</span>
            <span class="text-[20px] font-[500] leading-[24px] text-darkGrey"
              >/month</span
            >
          </p>
          <p class="text-[10px] leading-[32px] font-[700] text-darkGrey">
            50 Words / 50 Minutes
          </p>
        </div>
      <div class="mx-auto text-center w-full flex items-center justify-center">
        <div class="mb-6 space-y-[14px]  text-center  flex flex-col items-start jusitfy-center">
          <div v-for="listFeature in pak.package_items" :key="listFeature.name" class=" 
       flex items-center justify-start rtl:space-x-reverse space-x-[14px] !mx-auto w-full">
          
          
            
            <div>
              <img :src="listFeature.is_available === 1 ? `/assets/imgs/checked_list_active.svg` : `/assets/imgs/checked_list_inactive.svg`" />
            </div>
            <span class="text-[13px] font-[400] leading-[20px] text-darkGrey"
              >{{listFeature.title}}</span
            >
       
          </div>

      
      
        </div>
      </div>
        <div class="text-center">
          <button
            class="btn-dashboard hover_tamkin max-w-[205px] !rounded-[19px] mx-auto"
          >
            Upgrade Now
          </button>
        </div>
      </div>

   
    </div>
  </div>
</template>
