<script lang="ts" setup>
const packagesStore = usePackgesStore();

</script>

<template>
    <div
    class="w-full p-[35px] rounded-[10px] bg-gradient-to-r from-[#3748E0]/[45%] via-[#FBE3C3]/[14%] to-[#8AB9FF]/[96%] h-auto mx-auto mt-[32px] relative"
  >
    <div class="absolute top-[-14px] left-0">
      <img src="/imgs/addons_vector.png" class="h-[120px]" alt="" />
    </div>
    <div class="absolute top-[-40px] z-[10] right-0">
      <img src="/imgs/addons_vector.png" class="h-[200px]" alt="" />
    </div>
    <div class="text-[20px] font-[600] leading-[32px] text-[#24292F] text-center">
      {{ $t('Additional add-ons') }}
    </div>

    <div class="grid gap-4 grid-cols-4 mt-[26px] ipad-max:grid-cols-2 relative z-50">
      <div
      v-for="addon in packagesStore.getAddonsOrExtras('Addons')" :key="addon.name"
        style="box-shadow: 0px 4px 4px 0px #00000021"
        class="h-[240px] w-full bg-white rounded-[10px] flex flex-col space-y-[14px] items-center justify-start relative"
      >
        <div
          class="h-[30px] mt-[14px] w-[30px] bg-[#F7F7F7] rounded-full flex items-center justify-center"
        >
          <img :src="`https://tamkin.app/${ addon.icon }`" class="w-[30px] h-[30px]" alt="" />
        </div>

        <div class="text-[#18191F] font-[600] text-[12px]">{{addon.title}}</div>
        <div class="text-[#2A285B] font-[400] text-[10px] text-center w-3/4">
         {{$t(addon.description)}}
        </div>

        <div class="font-[700] text-[12px] text-black absolute lg:bottom-14 2xl:bottom-16">
          ${{addon.package_price_role[0].cost_month}}<span class="!font-[500] !text-[10px] !leading-[15px] !text-darkGrey"
            >/</span
          ><span class="!font-[500] !text-darkGrey">month</span>
        </div>

        <div
          class=" absolute bottom-4 text-[#18191F] text-[10px] font-[600] !mt-[24px] flex items-center rtl:space-x-reverse space-x-[14px] justify-evenly cursor-pointer"
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

</template>