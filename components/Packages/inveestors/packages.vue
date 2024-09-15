<script lang="ts" setup>
const localePath = useLocalePath()
const pricingType = inject('pricingType')
const packagesStore = usePackgesStore()
function getDayLabel(number) {
  return number === 1 ? 'day' : 'days';
}
onMounted(()=>{

})
</script>

<template>

    <div class="flex items-center flex-col justify-center  w-full">
        <div
          class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly h-full w-full lg:rtl:space-x-reverse lg:space-x-[36px] mt-[32px]"
        >
        
          <div  v-for="pack in packagesStore.getPackageByTypeAndCategory('Package').sort((a, b) => a.sort - b.sort)" :key="pack.name"
            class="flex items-center    hover:bg-selected  hover:dark:bg-p flex-col justify-start custom-border-tamkin padding-override-1
             !rounded-t-[10px] !rounded-b-none mt-[35px] w-full ipad-max:w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div class="absolute top-[-35px] left-[5px]">
              <img  class="w-[65px] h-[65px]"
                :src="`https://tamkin.app/${pack.icon}`"
           
                
              />
            </div>
    
            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px] "
            >
            
              <div class="order-2 relative w-full">
             
                <h1 class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin">{{pack.title}}</h1>
                <!-- <div class="absolute top-[46px] left-[100px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]">
                  <div class="absolute  left-[10px] text-[#EA4335] text-[14px] leading-[18.17px] font-[400] crossed-out">
                    <span>$18,000</span>
                  </div>
                </div> -->
                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin">
                 {{pack.description}}
                </h2>
    
                <div
                  class="relative mt-[16px] text-black dark:text-whiteTamkin  font-[600] text-[20px] leading-[29px] flex items-center 
                  justify-start rtl:space-x-reverse space-x-[10px]"
                >
                
                  <div class="!font-[400] !text-[#536174] !text-[12px] leading-[19px] dark:!text-whiteTamkin">
                   {{pack.sub_title}}
                  </div>
                
                  <div>$ {{pack.package_price_role[0].cost_investor}}</div>
                </div>
                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey  dark:text-whiteTamkin">
                  <span class="!font-[700]">UP to 100K </span>Page views/mo
                </p>
              </div>
            </div>
    
            <div
              class="flex flex-col items-start justify-center w-full space-y-[10px] h-[305px] custom-border-collapse-tamkin
               rounded-t-none rounded-[10px] p-4 dark:text-whiteTamkin"
            >
            <div v-for="item in pack.package_items.filter(k=>k.section === 'Package').sort((a, b) => a.idx - b.idx)"  :key="item.name"
              class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
            >
              <div>
                <img :src="item.is_available ? '/assets/imgs/checked_list_active.svg' : '/assets/imgs/checked_list_inactive.svg'" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  {{item.title}}
                </h3>
              </div>
            </div>
              <div class="flex items-center justify-center mx-auto w-full">
                <nuxt-link :to="localePath({name: 'how-to-join'})" class="btn-dashboard hover_tamkin  rounded-full mt-[16px] font-[600]">
                  How to join
                </nuxt-link>
              </div>
            </div>
          </div>
          
        </div>
      </div>

</template>