<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
definePageMeta({
  layout: "dashboard",
});
const moreDetails = ref(false);
const pricingType = ref("monthly");
const switchBetweenMonthlyAndAnnual = (v: any) => {
  pricingType.value = v;
};

const openMoreDetails = () => {
  moreDetails.value = !moreDetails.value;
};

const boxShadowStyle = computed(() => {
  return moreDetails.value ? { boxShadow: "0px 0px 5.6px 0px #C8FEF9" } : {};
});
const {$toast } = useNuxtApp()

onMounted(()=>{
  $toast('errosdsdr',{hideIn:400000,type:'error'})
})
</script>

<template>
  <div class="!px-0 w-full">
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <div class="text-[18px] font-[700] leading-[35px] text-black whitespace-nowrap">
        Sign Language
        <span
          class="bg-gradient-to-br from-[#46A095] via-[#46A095] to-[#17159D] text-transparent bg-clip-text"
          >Web Plugins Package</span
        >
      </div>

      <div
        class="text-[14px] font-[400] leading-[20px] text-[#18181B] text-center w-7/12"
      >
        Enhance your website with our Web Plugins Package, offering seamless integration
        of sign language support for an inclusive user experience.
      </div>
    </div>
    <!-- SECONDARY NAV-->

    <div class="flex items-center justify-center mt-[60px] space-x-[40px]">
      <div
        class="h-[24px] bg-gradient-to-r from-[#2DADA3] to-[#3A4D8F] flex items-center justift-center rounded-[4px] p-[10px]"
      >
        <div class="text-[12px] font-[500] leading-[18px] text-white text-center">
          Web Plugins
        </div>
      </div>

      <div class="h-[24px] flex items-center justift-center rounded-[4px] p-[10px]">
        <div class="text-[12px] font-[400] leading-[18px] text-[#878787] text-center">
          Media
        </div>
      </div>

      <div class="h-[24px] flex items-center justift-center rounded-[4px] p-[10px]">
        <div class="text-[12px] font-[400] leading-[18px] text-[#878787] text-center">
          Documents
        </div>
      </div>

      <div class="h-[24px] flex items-center justift-center rounded-[4px] p-[10px]">
        <div class="text-[12px] font-[400] leading-[18px] text-[#878787] text-center">
          Images
        </div>
      </div>
      <div class="h-[24px] flex items-center justift-center rounded-[4px] p-[10px]">
        <div class="text-[12px] font-[400] leading-[18px] text-[#878787] text-center">
          bundle
        </div>
      </div>
    </div>
    <!-- SECONDARY NAV-->

    <!-- PACKAGES-->
    <div class="flex items-center justify-center">
      <div
        key="1"
        class="flex items-center lg:flex-row md:flex-row md:space-x-[10px] flex-col justify-center h-full w-3/4 mt-[32px]"
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
    <!-- PACKAGES-->

<!-- SHOW MORE DETAILS-->

    <div
      @click="openMoreDetails"
      :style="boxShadowStyle"
      :class="[moreDetails ? 'bg-[#35C0B4] !text-white ' : 'bg-white']"
      class="hover:bg-[#35C0B4] hover:text-white group w-3/4 mx-auto my-[29px] h-[37px] rounded-b-[10px] space-x-[20px] cursor-pointer flex items-center justify-center"
    >
      <div
        class="text-[14px] font-[500] leading-[21px] group-hover:text-white"
        :class="[moreDetails ? 'text-white ' : 'text-black']"
      >
        View the full feature list
      </div>
      <div>
        <svg
        :class="[moreDetails ? 'rotate-90':'']"
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.72769 7.25391L-2.14577e-06 1.80922L1.63615 0.253906L9 7.25391L1.63615 14.2539L-2.14577e-06 12.6986L5.72769 7.25391Z"
            :class="[moreDetails ? 'fill-white ' : 'fill-[#021328]']"
            class="group-hover:fill-white"

          />
        </svg>
      </div>
    </div>

    <div class="overflow-x-auto w-3/4 mx-auto rounded-[8px]" v-if="moreDetails">
      <table class="min-w-full bg-white  ">
        <thead class="bg-[#ECECF0] h-[50px]  !rounded-b-[8px]">
          <tr>
            <th class="px-6 py-3 text-left text-[18px] font-[600] leading-[18px] text-[#18181B] w-2/6">Features</th>
            <th class="px-6 py-3 text-left text-[14px] font-[500] leading-[17px] text-[#71717A] w-1/6">PRO</th>
            <th class="px-6 py-3 text-left text-[14px] font-[500] leading-[17px] text-[#71717A] w-1/6">PRO PLUS</th>
            <th class="px-6 py-3 text-left text-[14px] font-[500] leading-[17px] text-[#71717A] w-1/6">PRO PLUS</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr >
            <td class="px-6 py-4 text-sm font-medium text-gray-900 text-left ">
               
              <div
              class=" flex items-center justify-start
               text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin relative"
            >
              <div>Live Translations - addons</div>
              <div class="relative">
                <span
                  class="tooltip packages"
                  id="saveButton"
                  :title="$t('The status shows the code is installed, embedded, and services are now visible and operational')"
                >
                  <span id="saveButton_label" class="">
                    <svg
                      width="16"
                      class="mx-[3px]"
                      height="15"
                      viewBox="0 0 16 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                        fill="#71DAD2"
                      />
                    </svg>
                  </span>
                </span>
              </div>
            </div>

            </td>
            <td class="px-6 py-4 text-center">
              <i class="text-teal-500 fas fa-check-circle"></i>
            </td>
            <td class="px-6 py-4 text-left">-</td>
            <td class="px-6 py-4 text-center " >
              <img src="/assets/imgs/checked_list_active.svg" alt="Checked List" class="mr-auto" />
            </td>
          </tr>
       
          <tr >
            <td class="px-6 py-4 text-sm font-medium text-gray-900 text-left">
              Live Translations - addons <i class="ml-1 text-sm text-gray-400 fas fa-info-circle"></i>
            </td>
            <td class="px-6 py-4 text-center">
              <i class="text-teal-500 fas fa-check-circle"></i>
            </td>
            <td class="px-6 py-4 text-left">-</td>
            <td class="px-6 py-4 text-center " >
              <img src="/assets/imgs/checked_list_active.svg" alt="Checked List" class="mr-auto" />
            </td>
          </tr>
          <tr >
            <td class="px-6 py-4 text-sm font-medium text-gray-900 text-left">
              Live Translations - addons <i class="ml-1 text-sm text-gray-400 fas fa-info-circle"></i>
            </td>
            <td class="px-6 py-4 text-center">
              <i class="text-teal-500 fas fa-check-circle"></i>
            </td>
            <td class="px-6 py-4 text-left">-</td>
            <td class="px-6 py-4 text-center " >
              <img src="/assets/imgs/checked_list_active.svg" alt="Checked List" class="mr-auto" />
            </td>
          </tr>
        </tbody>
      </table>
      
      
      
      
          
          
      </div>
      
    <!-- END SHOW MORE DETAILS-->



    <!--BUY MORE START  words-->
<div class="w-3/4 p-[40px] grid gap-[30px] grid-cols-2 mx-auto h-[315px] bg-gradient-to-l from-[#EEE4FF] via-[#BCD7FF] to-[#F5FFFE] rounded-[10px]">

  <div class="relative flex p-[40px] flex-col items-center justify-start
    space-y-[10px] bg-white/[48%]  rounded-[10px] h-[245px] ">
<div class="absolute top-[-24.5px]">
<img src="/imgs/words.png" class="w-[49px] h-[70px] " alt="">
</div>

    <div class="text-[13px] leading-[19px] font-[500] text-black text-center"> 
  To increase your word count for translation services, you can purchase additional words now
</div>
<div class="text-[20px] font-[600] leading-[29px] text-black">
   $ 100 
</div>
<div class="text-[10px] font-[700] leading-[32px] text-darkGrey !mt-[-5px]">
  2500 Words 
</div>

<button class="btn_bordered_dashboard absolute bottom-[10px]">
  Buy more words
</button>
  </div>

  <div class="relative flex p-[40px] flex-col items-center justify-start  space-y-[10px] bg-white/[48%]  rounded-[10px] h-[245px] ">
    <div class="absolute top-[-24.5px]">
    <img src="/imgs/more_words.png" class="w-[49px] h-[70px] " alt="">
    </div>
    
        <div class="text-[13px] leading-[19px] font-[500] text-black text-center"> 
      To increase your word count for translation services, you can purchase additional words now
    </div>
    <div class="text-[20px] font-[600] leading-[29px] text-black">
       $ 100 
    </div>
    <div class="text-[10px] font-[700] leading-[32px] text-darkGrey !mt-[-5px]">
      2500 Words 
    </div>
    
    <button class="btn_bordered_dashboard absolute bottom-[10px]">
      Buy more words
    </button>
      </div>
</div>


    <!-- BUY MORE END-->

<!-- BUY MORE MINUTES START-->
    <div class="w-3/4 p-[40px] grid gap-[30px] grid-cols-2 mx-auto h-[315px]  mt-[32px]
    bg-gradient-to-l from-[#D1F7F4]  to-[#FFFFFF] rounded-[10px]">

      <div class="relative flex p-[40px] flex-col items-center justify-start
        space-y-[10px] bg-white/[48%]  rounded-[10px] h-[245px] ">
    <div class="absolute top-[-39.5px]">
    <img src="/imgs/clock_F.png" class="w-[79px] h-[75px] " alt="">
    </div>
    
        <div class="text-[13px] leading-[19px] font-[500] text-black text-center"> 
          To increase your minutes count for translation services, you can purchase additional minutes now
    </div>
    <div class="text-[20px] font-[600] leading-[29px] text-black">
       $ 100 
    </div>
    <div class="text-[10px] font-[700] leading-[32px] text-darkGrey !mt-[-5px]">
      250 Minutes 
    </div>
    
    <button class="btn_bordered_dashboard absolute bottom-[10px]">
      Purchase Now
    </button>
      </div>
      <div class="relative flex p-[40px] flex-col items-center justify-start
      space-y-[10px] bg-white/[48%]  rounded-[10px] h-[245px] ">
  <div class="absolute top-[-39.5px]">
  <img src="/imgs/clock_s.png" class="w-[79px] h-[75px] " alt="">
  </div>
  
      <div class="text-[13px] leading-[19px] font-[500] text-black text-center"> 
        To increase your minutes count for translation services, you can purchase additional minutes now
  </div>
  <div class="text-[20px] font-[600] leading-[29px] text-black">
     $ 100 
  </div>
  <div class="text-[10px] font-[700] leading-[32px] text-darkGrey !mt-[-5px]">
    250 Minutes 
  </div>
  
  <button class="btn_bordered_dashboard absolute bottom-[10px]">
    Purchase Now
  </button>
    </div>
     
    </div>
    <!-- BUY MORE MINUTES END-->

    <!-- Additional addons start-->

      <div class="w-3/4 p-[35px] rounded-[10px] bg-gradient-to-r from-[#3748E0]/[45%] via-[#FBE3C3]/[14%] to-[#8AB9FF]/[96%] 
      h-auto mx-auto mt-[32px] relative">
      <div class="absolute top-[-14px] left-0">
        <img src="/imgs/addons_vector.png" class=" h-[120px]" alt="">
      </div>
      <div class="absolute top-[-40px] z-[10] right-0">
        <img src="/imgs/addons_vector.png" class=" h-[200px]" alt="">
      </div>
<div class="text-[20px] font-[600] leading-[32px] text-[#24292F] text-center">
  Additional add-ons
</div>

<div class="grid gap-4 grid-cols-4 mt-[26px] ipad-max:grid-cols-2 relative z-50">
  <div style="box-shadow: 0px 4px 4px 0px #00000021;
  " class="h-[240px]  w-full bg-white rounded-[10px] flex flex-col space-y-[14px] items-center justify-start">
    <div class="h-[30px] mt-[14px] w-[30px]  bg-[#F7F7F7] rounded-full flex items-center justify-center">
      <img src="/imgs/chart_.png" class="w-[14px] h-[15px]" alt="">
    </div>

    <div class="text-[#18191F] font-[600] text-[12px] "> 
      Customize
    </div>
    <div class="text-[#2A285B] font-[400] text-[10px] text-center  w-3/4">  
      Enhance Your Experience with the Customize Add-on - Purchase Now
    </div>

    <div class="font-[700] text-[12px] text-black !mt-[24px]">
      $150<span class="!font-[500] !text-[10px] !leading-[15px] !text-darkGrey">/</span><span class="!font-[500] !text-darkGrey">month</span>
    </div>

    <div class="text-[#18191F] text-[10px] font-[600]  !mt-[24px] flex items-center space-x-[14px] justify-evenly cursor-pointer">
   <div>
    Purchase Now
   </div>  <svg
        width="9"
        height="15"
        class="w-[4px] h-[6px]"
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
  <div style="box-shadow: 0px 4px 4px 0px #00000021;
  " class="h-[240px]  w-full bg-white rounded-[10px] flex flex-col space-y-[14px] items-center justify-start">
    <div class="h-[30px] mt-[14px] w-[30px]  bg-[#F7F7F7] rounded-full flex items-center justify-center">
      <img src="/imgs/chart_.png" class="w-[14px] h-[15px]" alt="">
    </div>

    <div class="text-[#18191F] font-[600] text-[12px] "> 
      Customize
    </div>
    <div class="text-[#2A285B] font-[400] text-[10px] text-center  w-3/4">  
      Enhance Your Experience with the Customize Add-on - Purchase Now
    </div>

    <div class="font-[700] text-[12px] text-black !mt-[24px]">
      $150<span class="!font-[500] !text-[10px] !leading-[15px] !text-darkGrey">/</span><span class="!font-[500] !text-darkGrey">month</span>
    </div>

    <div class="text-[#18191F] text-[10px] font-[600]  !mt-[24px] flex items-center space-x-[14px] justify-evenly cursor-pointer">
   <div>
    Purchase Now
   </div>  <svg
        width="9"
        height="15"
        class="w-[4px] h-[6px]"
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
  <div style="box-shadow: 0px 4px 4px 0px #00000021;
  "  class="h-[240px]  w-full bg-white rounded-[10px] flex flex-col space-y-[14px] items-center justify-start">
    <div class="h-[30px] mt-[14px] w-[30px]  bg-[#F7F7F7] rounded-full flex items-center justify-center">
      <img src="/imgs/chart_.png" class="w-[14px] h-[15px]" alt="">
    </div>

    <div class="text-[#18191F] font-[600] text-[12px] "> 
      Customize
    </div>
    <div class="text-[#2A285B] font-[400] text-[10px] text-center  w-3/4">  
      Enhance Your Experience with the Customize Add-on - Purchase Now
    </div>

    <div class="font-[700] text-[12px] text-black !mt-[24px]">
      $150<span class="!font-[500] !text-[10px] !leading-[15px] !text-darkGrey">/</span><span class="!font-[500] !text-darkGrey">month</span>
    </div>

    <div class="text-[#18191F] text-[10px] font-[600]  !mt-[24px] flex items-center space-x-[14px] justify-evenly cursor-pointer">
   <div>
    Purchase Now
   </div>  <svg
        width="9"
        height="15"
        class="w-[4px] h-[6px]"
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

  <div style="box-shadow: 0px 4px 4px 0px #00000021;
" class="h-[240px]  w-full bg-white rounded-[10px] flex flex-col space-y-[14px] items-center justify-start">
    <div class="h-[30px] mt-[14px] w-[30px]  bg-[#F7F7F7] rounded-full flex items-center justify-center">
      <img src="/imgs/chart_.png" class="w-[14px] h-[15px]" alt="">
    </div>

    <div class="text-[#18191F] font-[600] text-[12px] "> 
      Customize
    </div>
    <div class="text-[#2A285B] font-[400] text-[10px] text-center  w-3/4">  
      Enhance Your Experience with the Customize Add-on - Purchase Now
    </div>

    <div class="font-[700] text-[12px] text-black !mt-[24px]">
      $150<span class="!font-[500] !text-[10px] !leading-[15px] !text-darkGrey">/</span><span class="!font-[500] !text-darkGrey">month</span>
    </div>

    <div class="text-[#18191F] text-[10px] font-[600]  !mt-[24px] flex items-center space-x-[14px] justify-evenly cursor-pointer">
   <div>
    Purchase Now
   </div>  <svg
        width="9"
        height="15"
        class="w-[4px] h-[6px]"
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

    <!-- ADDTIONAL ADDONS END-->


    <!-- FAQ START-->

    <div class="w-3/4 h-[427px] bg-white p-[30px]">

    </div>
  </div>
</template>

<style></style>
