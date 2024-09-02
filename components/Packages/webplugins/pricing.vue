<script lang="ts" setup>

const pricingType = inject('pricingType')
const packagesStore = usePackgesStore()

onMounted(()=>{

})
</script>


<template>
    <div class="flex items-center justify-center relative">

        <div
        
          class="flex items-center lg:flex-row md:flex-row rtl:space-x-reverse  md:space-x-[10px] flex-col justify-center h-full w-full mt-[32px]"
        >
      
          <div 

          v-for="pak in packagesStore.getPackageByTypeAndCategory" 
          
          :key="pak.name"

            class="flex items-center flex-col custom-border justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] group bg-selected dark:hover:bg-p dark:hover:bg-p w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div class="absolute top-[-30px] left-[15px]">
              <img :src="`http://tamkin.app/${pak.icon}`" class="w-[50px] h-[50px]" />
            </div>
  
            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 relative w-full">
                <h1
                  class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                 {{pak.title}}
                </h1>
                <h2
                  class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                  {{pak.sub_title}}
                </h2>
                <div
                  class="absolute top-[41px] left-[-8px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]"
                >
                  <div
                    class="absolute left-[10px] text-[#EA4335] text-[12px] leading-[18.17px] font-[400] crossed-out"
                  >
                    <span>$18,000</span>
                  </div>
                </div>
                <h3
                  class="mt-[10px] text-black dark:text-whiteTamkin font-[600] text-[24px] leading-[29px]"
                >
                  $ 00
                  <span
                    class="!font-[500] !text-darkGrey dark:!text-whiteTamkin !text-[18px]"
                    >/month</span
                  >
                </h3>
  
                <p
                  class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                 {{pak.description}}
                </p>
              </div>
            </div>
  
            <div
              class="flex group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin flex-col items-start justify-center w-full space-y-[10px] h-[305px] custom-border-collapse rounded-t-none rounded-[10px] p-4"
            >
              <div v-for="item in pak.package_items" :key="item.name"
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
                <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
  
        
         
        </div>
      </div>

</template>