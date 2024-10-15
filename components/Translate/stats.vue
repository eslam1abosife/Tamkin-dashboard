<template>
  <div
    class="bg-white rounded-[13px] flex items-center p-[20px] justify-evenly w-full mt-[16px] rtl:space-x-reverse space-x-[19px]"
  >
    <div
      class="custom-border  w-full flex flex-col items-center px-[16px] justify-start  pt-[16px]"
    >
      <div class="flex items-center justify-between w-full">
        <div class="text-[16px] font-[500] text-[#021328]">Words Balance</div>

        <button
          class="btn-dashboard hover_tamkin w-[158px] !h-[40px]"
        >
          Upgrade Now
        </button>
      </div>

      <div class="flex flex-col items-center justify-start w-full pb-[24px]">
        <div>
          <TranslateCircle />
        </div>
        <div
          class="flex items-start  w-full justify-between pt-[16px] "
        >
          <div
            class="text-center flex items-center justify-evenly flex-col space-y-[10px]"
          >
            <div class="flex items-center justify-between rtl:space-x-reverse space-x-[6px]">
              <span
                style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
                class="block w-3 h-3 dark:bg-whiteTamkin rounded-full mx-auto"
              ></span>
              <span class="text-gray-500 text-[14px] dark:text-whiteTamkin">Your total minutes </span>
            </div>
            <span class="block text-[14px] font-semibold dark:text-whiteTamkin/90">20</span>
          </div>
          <div
            class="text-center flex items-center justify-evenly flex-col space-y-[10px]"
          >
            <div class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]">
              <span
                class="block w-3 h-3 bg-[#FFBA6B] dark:bg-whiteTamkin rounded-full mx-auto"
              ></span>
              <span class="text-gray-500 text-[14px] dark:text-whiteTamkin">Used </span>
            </div>
            <span class="block text-[14px]font-semibold dark:text-whiteTamkin/90">20</span>
          </div>
          <div
            class="text-center flex items-center justify-evenly flex-col space-y-[10px] "
          >
            <div class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]">
              <span
                class="block w-3 h-3 bg-[#DEF3FE] dark:bg-whiteTamkin rounded-full mx-auto"
              ></span>
              <span class="text-gray-500 text-[14px] dark:text-whiteTamkin">Remaining</span>
            </div>
            <span class="block font-semibold text-[14px] dark:text-whiteTamkin/90">20</span>
          </div>
        </div>

        <div class="w-full">
 

          <div class="flex flex-col items-center justify-center w-full space-y-[6px]">
            <div class="flex items-center mt-[24px] w-full">
              <div
                class="w-1/4 text-[#3D3D3D] dark:text-whiteTamkin text-[13px] leading-[24px] font-[400] mr-auto"
              >
                Internal Use
              </div>
              <span class="text-[#A6A6A6] text-[13px] ml-auto dark:text-whiteTamkin/90"
                >280</span
              >
            </div>
            <div class="w-full flex items-center rtl:rtl:space-x-reverse space-x-reverse rtl:space-x-reverse space-x-2">
              <div
                style="background: rgba(242, 243, 245, 1)"
                class="rounded-full h-3 w-full relative overflow-hidden"
              >
                <div class="bg-[#D7D4F4] h-full rounded-r-full" style="width: 40%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
    class="custom-border  w-full flex flex-col items-center px-[16px] justify-start  pt-[16px]"
  >
    <div class="flex items-center justify-between w-full">
      <div class="text-[16px] font-[500] text-[#021328]">Words Balance</div>

      <button
        class="btn-dashboard hover_tamkin w-[158px] !h-[40px]"
      >
        Upgrade Now
      </button>
    </div>

    <div class="flex flex-col items-center justify-start w-full pb-[24px]">
      <div>
        <TranslateCircle />
      </div>
      <div
        class="flex items-start  w-full justify-between pt-[16px] "
      >
        <div
          class="text-center flex items-center justify-evenly flex-col space-y-[10px]"
        >
          <div class="flex items-center justify-between rtl:space-x-reverse space-x-[6px]">
            <span
              style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
              class="block w-3 h-3 dark:bg-whiteTamkin rounded-full mx-auto"
            ></span>
            <span class="text-gray-500 text-[14px] dark:text-whiteTamkin">Your total minutes </span>
          </div>
          <span class="block text-[14px] font-semibold dark:text-whiteTamkin/90">20</span>
        </div>
        <div
          class="text-center flex items-center justify-evenly flex-col space-y-[10px]"
        >
          <div class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]">
            <span
              class="block w-3 h-3 bg-[#FFBA6B] dark:bg-whiteTamkin rounded-full mx-auto"
            ></span>
            <span class="text-gray-500 text-[14px] dark:text-whiteTamkin">Used </span>
          </div>
          <span class="block text-[14px]font-semibold dark:text-whiteTamkin/90">20</span>
        </div>
        <div
          class="text-center flex items-center justify-evenly flex-col space-y-[10px] "
        >
          <div class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]">
            <span
              class="block w-3 h-3 bg-[#DEF3FE] dark:bg-whiteTamkin rounded-full mx-auto"
            ></span>
            <span class="text-gray-500 text-[14px] dark:text-whiteTamkin">Remaining</span>
          </div>
          <span class="block font-semibold text-[14px] dark:text-whiteTamkin/90">20</span>
        </div>
      </div>

      <div class="w-full">


        <div class="flex flex-col items-center justify-center w-full space-y-[6px]">
          <div class="flex items-center mt-[24px] w-full">
            <div
              class="w-1/4 text-[#3D3D3D] dark:text-whiteTamkin text-[13px] leading-[24px] font-[400] mr-auto"
            >
              Internal Use
            </div>
            <span class="text-[#A6A6A6] text-[13px] ml-auto dark:text-whiteTamkin/90"
              >280</span
            >
          </div>
          <div class="w-full flex items-center rtl:rtl:space-x-reverse space-x-reverse rtl:space-x-reverse space-x-2">
            <div
              style="background: rgba(242, 243, 245, 1)"
              class="rounded-full h-3 w-full relative overflow-hidden"
            >
              <div class="bg-[#D7D4F4] h-full rounded-r-full" style="width: 40%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
