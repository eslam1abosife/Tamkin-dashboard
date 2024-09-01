<script lang="ts" setup>

const pricingType = inject('pricingType')
</script>


<template>
    <div class="flex items-center justify-center relative">

        <div
          key="1"
          class="flex items-center lg:flex-row md:flex-row md:space-x-[10px] flex-col justify-center h-full w-full mt-[32px]"
        >
          <div
            class="flex items-center flex-col custom-border justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] group bg-selected dark:hover:bg-p dark:hover:bg-p w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div class="absolute top-[-30px] left-[15px]">
              <img src="/imgs/free_widget_icon.png" class="w-[50px] h-[50px]" />
            </div>
  
            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 relative w-full">
                <h1
                  class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                  Free Widget
                </h1>
                <h2
                  class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                  For Individuals and Small Teams
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
                  <span class="!font-[700]">UP to 100K </span>Page views/mo
                </p>
              </div>
            </div>
  
            <div
              class="flex group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin flex-col items-start justify-center w-full space-y-[10px] h-[305px] custom-border-collapse rounded-t-none rounded-[10px] p-4"
            >
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_inactive.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
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
  
          <div
            class="flex items-center flex-col custom-border-tamkin padding-override-1 group hover:bg-selected dark:hover:bg-p dark:hover:bg-p bg-white justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div
              class="absolute flex items-center justify-center text-[13px] leading-[17.76px] font-[500] w-[83px] h-[28px] rounded-[10px] text-white dark:text-darkTamkin top-[-15px] rtl:right-[200px] ltr:left-[100px] rtl:lg:right-[250px] ltr:lg:left-2/4"
              style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
            >
              <div class=" ">Best Deal</div>
            </div>
            <div class="absolute top-[-30px] left-[15px]">
              <img src="/imgs/pro_widget_icon.png" class="w-[50px] h-[50px]" />
            </div>
  
            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 relative w-full">
                <h1
                  class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                  Pro- Widget
                </h1>
                <h2
                  class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                  For Individuals and Small Teams
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
                  $ {{ pricingType === "annual" ? "1000" : "150" }}
                  <span
                    class="!font-[500] !text-darkGrey dark:!text-whiteTamkin !text-[18px]"
                    >/{{ pricingType === "annual" ? "year" : "month" }}</span
                  >
                </h3>
  
                <p
                  class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin dark:text-whiteTamkin"
                >
                  <span class="!font-[700]">UP to 1M </span>Page views/mo
                </p>
              </div>
            </div>
  
            <div
              class="flex custom-border-collapse-tamkin group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin dark:group-hover:bg-p dark:text-whiteTamkin flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
            >
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_inactive.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-center mx-auto w-full">
                <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                  Start free trial
                </button>
              </div>
            </div>
          </div>
  
          <div
            class="flex items-center flex-col custom-border-tamkin group hover:bg-selected dark:hover:bg-p bg-white padding-override-1 justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div class="absolute top-[-30px] left-[15px]">
              <img src="/imgs/premium_icon.png" class="w-[50px] h-[50px]" />
            </div>
  
            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 relative w-full">
                <h1 class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin">
                  Premium
                </h1>
                <h2
                  class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin"
                >
                  For Individuals and Small Teams
                </h2>
  
                <h3
                  class="mt-[10px] text-black font-[600] text-[24px] leading-[29px] dark:text-whiteTamkin"
                >
                  $ {{ pricingType === "annual" ? "1500" : "300" }}
                  <span
                    class="!font-[500] !text-darkGrey !text-[18px] dark:!text-whiteTamkin"
                    >/{{ pricingType === "annual" ? "year" : "month" }}</span
                  >
                </h3>
  
                <p
                  class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin"
                >
                  <span class="!font-[700]">UP to 2M </span>Page views/mo
                </p>
              </div>
            </div>
  
            <div
              class="flex custom-border-collapse-tamkin group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
            >
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_inactive.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
              >
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-center mx-auto w-full">
                <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                  Start free trial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

</template>