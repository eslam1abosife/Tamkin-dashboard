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

    <div class="overflow-x-auto w-3/4 mx-auto">
        <table class="min-w-full bg-white border border-gray-200">
            <thead class="bg-[#ECECF0]">
              <tr>
                <th class="px-6 py-3 text-left text-[18px] font-[600] leading-[18px] text-[#18181B]">Features</th>
                <th class="px-6 py-3 text-center text-[14px] font-[500] leading-[17px] text-[#71717A]">PRO</th>
                <th class="px-6 py-3 text-center text-[14px] font-[500] leading-[17px] text-[#71717A]">PRO PLUS</th>
                <th class="px-6 py-3 text-center text-[14px] font-[500] leading-[17px] text-[#71717A]">PRO PLUS</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr >
                <td class="px-6 py-4 text-sm font-medium text-gray-900 text-left">Live Translations - addons <i class="ml-1 text-sm text-gray-400 fas fa-info-circle"></i></td>
                <td class="px-6 py-4 text-center"><i class="text-teal-500 fas fa-check-circle"></i></td>
                <td class="px-6 py-4 text-center">-</td>
                <td class="px-6 py-4 text-left">
                  <img src="/assets/imgs/checked_list_active.svg" class="inline-block" style="vertical-align: middle;" />
                </td>
              </tr>
              <tr >
                <td class="px-6 py-4 text-sm font-medium text-gray-900 text-left">Live Translations - addons <i class="ml-1 text-sm text-gray-400 fas fa-info-circle"></i></td>
                <td class="px-6 py-4 text-center"><i class="text-teal-500 fas fa-check-circle"></i></td>
                <td class="px-6 py-4 text-center">-</td>
                <td class="px-6 py-4 text-center">
                  <i class="text-teal-500 fas fa-check-circle"></i>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 text-sm font-medium text-gray-900 text-left">Live Translations - addons <i class="ml-1 text-sm text-gray-400 fas fa-info-circle"></i></td>
                <td class="px-6 py-4 text-center"><i class="text-teal-500 fas fa-check-circle"></i></td>
                <td class="px-6 py-4 text-center">-</td>
                <td class="px-6 py-4 text-center">
                  <i class="text-teal-500 fas fa-check-circle"></i>
                </td>
              </tr>
            </tbody>
          </table>
          
          
      </div>
      
    <!-- SHOW MORE DETAILS-->
  </div>
</template>

<style></style>
