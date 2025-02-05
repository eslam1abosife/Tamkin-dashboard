<script lang="ts" setup>
const packagesStore = usePackgesStore()
const navStore  = useNavbarStore()

onMounted(async ()=>{
  await packagesStore.getInvestorUser()

})
</script>


<template>

    <div class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full pb-[2rem] w-full shadow-md -shadow-y-[1px]" >
        <div class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]">
          <div>
            <h1 class="font-[500] leading-[30px] text-[18px]  rtl:mr-[-20px] dark:text-whiteTamkin">
              <div v-html="$t('Exclusive Investor Package')" class=" flex justify-start rtl:!flex-row"></div>
            </h1>

            <p class="text-[14px] leading-[24px] font-[400] text-[#585B5B]  dark:text-whiteTamkin/90 pt-[6px] w-[90%]">
          {{$t('Investors participating in the Investor Program will receive an exclusive package with many additional benefits and special access to advanced tools and services')}}
            </p>
          </div>
        </div>
        <div class="flex items-center justify-end rtl:space-x-reverse space-x-[10px] mt-4 px-[15px] order-2 cursor-pointer" @click="packagesStore.showMoreINInvestors = !packagesStore.showMoreINInvestors">
          <div>
            <h2 class=" whitespace-nowrap underline text-[14px] font-[400] leading-[24px] text-[#151515] dark:text-whiteTamkin">
              {{$t('What’s included?')}}
            </h2>
          </div>
          <div class="cursor-pointer" >
            <img
              src="/assets/imgs/arrow-right.svg"
              class="w-[12px] h-[10px] rtl:rotate-180 cursor-pointer dark:[filter:brightness(10)]"
              :class="[packagesStore.showMoreINInvestors ? '!rotate-90 ' : 'rotate-0']"
            />
          </div>
        </div>
 
 <PackagesInveestorsPackages class="!pt-[0px] !px-[15px]" :current-type="'Investors'"/>
      </div>
</template>