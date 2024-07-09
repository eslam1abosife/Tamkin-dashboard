<script lang="ts" setup>

const props = defineProps({
    planType:{
        type:String,
        required:true
    },
    isInstalled:{
        type:Boolean,
        required:true
    },
 
})
const pricingType = ref("monthly");
const switchBetweenMonthlyAndAnnual = (v: any) => {
  pricingType.value = v;
};

const currentIndex = ref(0);

const back = ref(false);

const next = () => {
  back.value = false;
  currentIndex.value++;
};
const prev = () => {
  back.value = true;
  if (currentIndex.value == 1) {
    currentIndex.value--;
  }
};

</script>


<template>


    <div
    class="mt-[30px] bg-white rounded-[10px] h-full"
    style="box-shadow: 0px 4px 4px 0px #00000014"
  >
    <div
      class="flex items-center justify-start rounded-[10px] h-[212px] w-full
       rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#35b4a9] to-[#c8fdf9]"
    >
      <div class="flex flex-col items-start justify-center w-full px-[15px]">
        <div>
          <h1 class="text-white font-[500] text-[20px] leading-[30px]">
            Your Current Plan
          </h1>
          <h3 class="text-white font-[500] text-[14px] leading-[21px]">
            Your current plan provides comprehensive features tailored to meet your
            needs.
          </h3>
        </div>

        <div
          class="h-[63px]   bg-white bg-opacity-75 rounded-[41px] w-[500px]
          flex items-center justify-around  space-x-[10px] mt-[24px]  "
        >
          <div class=" flex items-center justify-start rtl:space-x-reverse space-x-[4px]">
            <div>
              <img src="/assets/imgs/freeplan.svg" class="w-[22px] h-[22px] " alt="" v-if="planType === 'free'"/>
              <img src="/assets/imgs/proplan.svg" class="w-[22px] h-[22px] " alt="" v-if="planType === 'pro'"/>
              <img src="/assets/imgs/overview/advanced_plan.svg" class="w-[22px] h-[22px] " alt="" v-if="planType === 'advanced'"/>
              <img src="/assets/imgs/plat_plan.svg" class="w-[22px] h-[22px] " alt="" v-if="planType === 'platinum'"/>
              <img src="/assets/imgs/overview/enterprise_plan.svg" class="w-[22px] h-[22px] " alt="" v-if="planType === 'enterprise'"/>
              <!-- <img src="/assets/imgs/proplan.svg" class="w-[22px] h-[22px] mr-[13px]" alt="" v-else/> -->
            </div>
            <div class="text-[15px] font-[500] leading-[22.5px] text-darkGrey">
              {{ planType === 'free' ? 'Free Widget' : planType === 'pro' ? 'Pro- Widget':planType === 'platinum' ?'Platinum Widget':planType ==='advanced' ?'Advanced Widget':planType === 'enterprise'?'EnterPrise Widget' :''}}
            </div>
            <!-- <div class=" text-[15px] font-[500] leading-[22.5px] text-darkGrey" >
              Pro- Widget
            </div> -->
          </div>

          <div
            class="w-  text-[15px] font-[500] leading-[22.5px] text-darkGrey flex items-center 
            justify-evenly rtl:space-x-reverse space-x-[4px] mr-[4px]"
            v-if="!isInstalled"
         
          >
            <div > 
              <img
                src="/assets/imgs/payment_methods/declined.svg"
                class="w-[22px] h-[22px]"
                alt=""
              />
            </div>
            <div>Not installed</div>
          </div>

          <div class="">
            <button class="btn_bordered_dashboard bg-white rounded-[19px] rtl:mr-auto ltr:ml-auto mx-[15px]  !p-[6px] w-full">
              Upgrade Plans
            </button>
          </div>
        </div>
      </div>

      <div class="rtl:!mr-auto ltr:ml-auto h-full w-full lg:block hidden">
        <img
          src="/assets/imgs/overview/current_plan_upgrade.svg"
          class="w-full h-full"
          alt=""
        />
      </div>
    </div>

    <div
      class="flex items-center flex-col justify-center px-[15px]"
    >
      <div
        class="flex items-center lg:flex-row flex-col justify-center lg:justify-between lg:space-y-0 space-y-3 w-full mt-[32px]"
      >
        <div class="text-[15px] leading-[22.5px] font-[500]">
          Accessibility Widget Pricing
        </div>

        <div
          class="inline-flex items-center rounded-full bg-tamkinLight p-1 border border-gray-300"
        >
          <button
            @click="switchBetweenMonthlyAndAnnual('monthly')"
            :class="[pricingType === 'monthly' ? 'bg-white rounded-full' : '']"
            class="py-2 px-4 transition-all ease-in-out text-darkGrey font-[500] text-[15px] leading-[22.5px]"
          >
            Monthly
          </button>
          <button
            :class="[pricingType === 'annual' ? 'bg-white rounded-full' : '']"
            @click="switchBetweenMonthlyAndAnnual('annual')"
            class="py-2 px-2 transition-all ease-in-out text-darkGrey font-[500] text-[15px] leading-[22.5px] mr-[4px]"
          >
            Annual
            <span class="!text-black text-[12px] leading-[18px] font-[600]"
              >SAVE 12%</span
            >
          </button>
        </div>
      </div>
      <transition-group
        mode="in-out"
        tag="div"
        class="w-full overflow-x-hidden"
        name="slide-fade"
      >
        <div
          v-if="currentIndex === 0"
          key="1"
          class="flex items-center lg:flex-row flex-col justify-center lg:justify-between
           ipad-max:flex-wrap ipad-max:rtl:space-x-reverse  h-full w-full lg:rtl:space-x-reverse space-x-[36px] mt-[32px]"
        >
          <div
            class="flex items-center flex-col custom-border justify-start !rounded-t-[10px]
             !rounded-b-none mt-[35px] group hover:bg-selected w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div class="absolute top-[-30px] left-[15px]">
              <img src="/assets/imgs/freeplan.svg" class="w-[50px] h-[50px]" alt="" />
            </div>

            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 relative w-full">
                <h1 class="font-[600] text-[20px] leading-[30px]">Free Widget</h1>
                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                  For Individuals and Small Teams
                </h2>
                <div class="absolute top-[46px] left-[-6px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]">
                    <div class="absolute  left-[10px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400] crossed-out">
                      <span>$18,000</span>
                    </div>
                  </div>
                <h3
                  class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                >
                  $ 00
                  <span class="!font-[500] !text-darkGrey !text-[20px]">/month</span>
                </h3>

                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                  <span class="!font-[700]">UP to 100K </span>Page views/mo
                </p>
              </div>
            </div>

            <div
              class="flex group-hover:bg-selected  flex-col items-start justify-center w-full space-y-[10px] h-[305px] custom-border-collapse rounded-t-none rounded-[10px] p-4"
            >
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-center mx-auto w-full">
                <button class="btn-dashboard rounded-full mt-[16px]">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          <div
            class="flex items-center flex-col custom-border-tamkin padding-override-1  group hover:bg-selected
             justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
          <div class="absolute   flex items-center justify-center text-[13px] leading-[17.76px]  font-[500] w-[83px]
          h-[28px] rounded-[10px] text-white top-[-15px] rtl:right-[200px] 
          ltr:left-[100px] rtl:lg:right-[250px] ltr:lg:left-2/4" style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
">
<div class=" text-white">
 Best Deal
</div>
         </div>
            <div class="absolute top-[-30px] left-[15px]">
              <img src="/assets/imgs/proplan.svg" class="w-[50px] h-[50px]" alt="" />
            </div>

            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
  
              <div class="order-2 relative w-full">
          
                <h1 class="font-[600] text-[20px] leading-[30px]">Pro- Widget</h1>
                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                  For Individuals and Small Teams
                </h2>
                <div class="absolute top-[46px] left-[-6px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]">
                    <div class="absolute  left-[10px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400] crossed-out">
                      <span>$18,000</span>
                    </div>
                  </div>
                <h3
                  class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                >
                  $ {{ pricingType === "annual" ? "1000" : "150" }}
                  <span class="!font-[500] !text-darkGrey !text-[20px]"
                    >/{{ pricingType === "annual" ? "year" : "month" }}</span
                  >
                </h3>

                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                  <span class="!font-[700]">UP to 1M </span>Page views/mo
                </p>
              </div>
            </div>

            <div
              class="flex custom-border-collapse-tamkin
               group-hover:bg-selected
              flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
            >
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-center mx-auto w-full">
                <button class="btn-dashboard rounded-full mt-[16px]">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          <div
            class="flex items-center flex-col custom-border-tamkin 
             group hover:bg-selected
            padding-override-1 justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div class="absolute top-[-30px] left-[15px]">
              <img
                src="/assets/imgs/overview/prem_plan.svg"
                class="w-[50px] h-[50px]"
                alt=""
              />
            </div>

            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 relative w-full">
                <h1 class="font-[600] text-[20px] leading-[30px]">Premium</h1>
                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                  For Individuals and Small Teams
                </h2>

                <h3
                  class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                >
                  $ {{ pricingType === "annual" ? "1500" : "300" }}
                  <span class="!font-[500] !text-darkGrey !text-[20px]"
                    >/{{ pricingType === "annual" ? "year" : "month" }}</span
                  >
                </h3>

                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                  <span class="!font-[700]">UP to 2M </span>Page views/mo
                </p>
              </div>
            </div>

            <div
              class="flex custom-border-collapse-tamkin 
               group-hover:bg-selected
              flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
            >
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-center mx-auto w-full">
                <button class="btn-dashboard rounded-full mt-[16px]">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else-if="currentIndex === 1"
          key="2"
          class="flex items-center justify-between h-full w-full rtl:space-x-reverse space-x-[36px] mt-[32px] ipad-max:flex-wrap ipad-max:rtl:space-x-reverse space-x-0"
        >
          <div
            class="flex items-center flex-col custom-border-tamkin 
             group hover:bg-selected
            padding-override-1 justify-start !rounded-t-[10px] mt-[35px] w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div class="absolute top-[-30px] left-[15px]">
              <img
                src="/assets/imgs/overview/advanced_plan.svg"
                class="w-[50px] h-[50px]"
                alt=""
              />
            </div>

            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 relative w-full">
                <h1 class="font-[600] text-[20px] leading-[30px]">Advanced</h1>
                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                  For Individuals and Small Teams
                </h2>

                <h3
                  class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                >
                  $ {{ pricingType === "annual" ? "4000" : "400" }}
                  <span class="!font-[500] !text-darkGrey !text-[20px]"
                    >/{{ pricingType === "annual" ? "year" : "month" }}</span
                  >
                </h3>

                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                  <span class="!font-[700]">UP to 3M </span>Page views/mo
                </p>
              </div>
            </div>

            <div
              class="flex flex-col items-start justify-center
               group-hover:bg-selected
              w-full space-y-[10px] h-[305px] custom-border-collapse-tamkin rounded-t-none rounded-[10px] p-4"
            >
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-center mx-auto w-full">
                <button class="btn-dashboard rounded-full mt-[16px]">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          <div
            class="flex items-center flex-col custom-border-tamkin padding-override-1 justify-start !rounded-t-[10px] 
             group hover:bg-selected
            !rounded-b-none mt-[35px] w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div class="absolute top-[-30px] left-[15px]">
              <img
                src="/assets/imgs/plat_plan.svg"
                class="w-[50px] h-[50px]"
                alt=""
              />
            </div>

            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 relative w-full">
                <h1 class="font-[600] text-[20px] leading-[30px]">Platinum</h1>
                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                  For Individuals and Small Teams
                </h2>

                <h3
                  class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                >
                  $ {{ pricingType === "annual" ? "5000" : "500" }}
                  <span class="!font-[500] !text-darkGrey !text-[20px]"
                    >/{{ pricingType === "annual" ? "year" : "month" }}</span
                  >
                </h3>

                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                  <span class="!font-[700]">UP to 4M </span>Page views/mo
                </p>
              </div>
            </div>

            <div
              class="flex custom-border-collapse-tamkin
               group-hover:bg-selected
              flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
            >
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-center mx-auto w-full">
                <button class="btn-dashboard rounded-full mt-[16px]">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>

          <div
            class="flex items-center flex-col custom-border-tamkin 
             group hover:bg-selected
            padding-override-1 justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-full"
            style="padding: 16px, 10px, 16px, 10px"
          >
            <div class="absolute top-[-30px] left-[15px]">
              <img
                src="/assets/imgs/overview/enterprise_plan.svg"
                class="w-[50px] h-[50px]"
                alt=""
              />
            </div>

            <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
            >
              <div class="order-2 relative w-full">
                <h1 class="font-[600] text-[20px] leading-[30px]">Enterprise</h1>
                <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                  For Individuals and Small Teams
                </h2>

                <h3
                  class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                >
                  $ {{ pricingType === "annual" ? "5500" : "600" }}
                  <span class="!font-[500] !text-darkGrey !text-[20px]">/month</span>
                </h3>

                <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                  <span class="!font-[700]">UP to 5M </span>Page views/mo
                </p>
              </div>
            </div>

            <div
              class="flex custom-border-collapse-tamkin flex-col 
               group-hover:bg-selected
              items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
            >
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" alt="" />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    All analytics features
                  </h3>
                </div>
              </div>
              <div class="flex items-center justify-center mx-auto w-full">
                <button class="btn-dashboard rounded-full mt-[16px]">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
      <div class="flex items-center justify-center mx-auto rtl:space-x-reverse space-x-[8px] my-[32px]">
        <div
          :class="[currentIndex === 0 ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
          class="w-[15px] h-[15px] rounded-full cursor-pointer"
          @click="prev"
        ></div>
        <div
          :class="[currentIndex === 1 ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
          class="w-[15px] h-[15px] rounded-full cursor-pointer"
          @click="next"
        ></div>
      </div>
    </div>
   
  </div>
</template>