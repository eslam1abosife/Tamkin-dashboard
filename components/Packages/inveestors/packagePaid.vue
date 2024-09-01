<template>
    <div class="bg-gradient-to-r  w-full from-[#CEEFFF]  to-[#F4FCFF] relative space-x-[80px] 
    flex items-center justify-between p-2  mt-[32px]">

        <div

class=" flex flex-col items-start justify-start p-[15px] ipad-max:w-full w-3/4 relative"
>
<div
  class="absolute bg-gradient-to-br from-[#FBC558] to-[#F7AAFD] w-full h-[160px] rounded-full right-0 left-1/4 opacity-30 blur-xl z-[-1]"
></div>

<div class="flex items-center justify-start w-full rtl:space-x-reverse space-x-[16px] h-[41px]">
  <div>
    <img src="/imgs/investor/AA.svg" class="w-[38px] h-[38px]" alt="" />
  </div>
  <div
    class="text-[16px] ipad-max:text-[13px] font-[600] leading-[22px] text-[#3D3D3D]"
  >
    {{$t('Investor member')}}
  </div>
</div>

<div
  class="mt-[18px] border-[1px] border-[#A7A7A7] w-full h-[40px] rounded-[10px] flex items-center justify-between px-[10px]"
>
  <div class="flex items-center rtl:rtl:space-x-reverse space-x-reverse rtl:space-x-reverse space-x-[8px]">
    <div
    class="text-[#878787] w-44 ipad-max:w-36 2xl:w-52 dark:text-whiteTamkin/70 text-[12px] leading-[24px]"
  >
  0x2d5jd....364432345
  </div>

  
  
  </div>
  <img
 
    class="rtl:mr-auto ltr:ml-auto cursor-pointer w-[18px] h-[18px]"

    src="/imgs/copy.png"
  />
</div>

<div
  class="mt-[18px] border-[1px] border-[#A7A7A7] w-full h-[40px] rounded-[10px] flex items-center justify-between px-[10px]"
>
  <div class="flex items-center justify-between w-full">
    <div
      class="text-[14px] ipad-max:text-[11px] font-[600] leading-[21px] text-[#1E1E1E]"
    >
      {{ $t('Token Balance') }}
    </div>

    <div class="text-[12px] ipad-max:text-[10px] font-[600] text-[#1E1E1E]">
        5,000,00 TSLT
    </div>
  </div>
</div>
</div>
     
<div>
    <img src="/imgs/hero_package.png" class="w-[300px] h-[220px]" alt="">
</div>
      
      </div>
      
</template>