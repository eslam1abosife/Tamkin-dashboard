<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
definePageMeta({
  layout: "dashboard",
});
const moreDetails = ref(false);
const pricingType = ref("monthly");
const packagesStore = usePackgesStore()
const switchBetweenMonthlyAndAnnual = (v: any) => {
  pricingType.value = v;
};

const openMoreDetails = () => {
  moreDetails.value = !moreDetails.value;
};

const boxShadowStyle = computed(() => {
  return moreDetails.value ? { boxShadow: "0px 0px 5.6px 0px #C8FEF9" } : {};
});


provide("pricingType", pricingType);
</script>

<template>
  <div class="w-full relative px-[40px]">
    <div class="flex flex-col items-center justify-center w-full mt-[26px]">
      <div class="text-[18px] font-[700] leading-[35px] text-black max-w-[500px] text-center " >
        
     
      
    <div v-html="packagesStore.getPackageDetails('Bundle','All-in-One Bundle Package','bundle').color_title"></div>   
     
        
      </div>

  
    </div>


    <div class="flex flex-col items-center justify-center bg-white rounded-[10px] mt-[68px] ">

      <div class="flex items-center justify-center flex-col w-full px-[18px]">
        <PackagesBundlePackages/>
    <div
      @click="openMoreDetails"
      :style="boxShadowStyle"
      :class="[moreDetails ? 'bg-[#35C0B4] !text-white ' : 'bg-white']"
      class="hover:bg-[#35C0B4] hover:text-white group w-full mx-auto my-[29px] h-[37px] rounded-b-[10px] space-x-[20px] cursor-pointer flex items-center justify-center"
    >
      <div
        class="text-[14px] font-[500] leading-[21px] group-hover:text-white"
        :class="[moreDetails ? 'text-white ' : 'text-black']"
      >
        View the full feature list
      </div>
      <div>
        <svg
          :class="[moreDetails ? 'rotate-90' : '']"
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

    <div
      class="overflow-x-auto w-full mx-auto rounded-[8px] mb-[32px]"
      v-if="moreDetails"
    >
      <table class="min-w-full bg-white">
        <thead class="bg-[#ECECF0] h-[50px] !rounded-b-[8px]">
          <tr>
            <th
              class="px-6 py-3 text-left text-[18px] font-[600] leading-[18px] text-[#18181B] w-2/6"
            >
              Features
            </th>
            <th
              class="px-6 py-3 text-left text-[14px] font-[500] leading-[17px] text-[#71717A] w-1/6"
            >
              PRO
            </th>
            <th
              class="px-6 py-3 text-left text-[14px] font-[500] leading-[17px] text-[#71717A] w-1/6"
            >
              PRO PLUS
            </th>
            <th
              class="px-6 py-3 text-left text-[14px] font-[500] leading-[17px] text-[#71717A] w-1/6"
            >
              PRO PLUS
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 text-sm font-medium text-gray-900 text-left">
              <div
                class="flex items-center justify-start text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin relative"
              >
                <div>Live Translations - addons</div>
                <div class="relative">
                  <span
                    class="tooltip packages"
                    id="saveButton"
                    :title="
                      $t(
                        'The status shows the code is installed, embedded, and services are now visible and operational'
                      )
                    "
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
            <td class="px-6 py-4 text-center">
              <img
                src="/assets/imgs/checked_list_active.svg"
                alt="Checked List"
                class="mr-auto"
              />
            </td>
          </tr>

          <tr>
            <td class="px-6 py-4 text-sm font-medium text-gray-900 text-left">
              Live Translations - addons
              <i class="ml-1 text-sm text-gray-400 fas fa-info-circle"></i>
            </td>
            <td class="px-6 py-4 text-center">
              <i class="text-teal-500 fas fa-check-circle"></i>
            </td>
            <td class="px-6 py-4 text-left">-</td>
            <td class="px-6 py-4 text-center">
              <img
                src="/assets/imgs/checked_list_active.svg"
                alt="Checked List"
                class="mr-auto"
              />
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-sm font-medium text-gray-900 text-left">
              Live Translations - addons
              <i class="ml-1 text-sm text-gray-400 fas fa-info-circle"></i>
            </td>
            <td class="px-6 py-4 text-center">
              <i class="text-teal-500 fas fa-check-circle"></i>
            </td>
            <td class="px-6 py-4 text-left">-</td>
            <td class="px-6 py-4 text-center">
              <img
                src="/assets/imgs/checked_list_active.svg"
                alt="Checked List"
                class="mr-auto"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>


    <!-- FAQ START-->

    <PackagesFaq/>


    <!-- FAQ END-->

    <div class="w-full h-[334px] bg-white rounded-[10px] relative mt-[32px] mx-auto">
      <div
        class="absolute z-20 w-[95%] h-[170px] top-[90px] bg-gradient-to-l from-[#D5F6F4] via-[#D5F6F4]/[30%] to-white"
      ></div>

      <div class="absolute right-[70px] top-[25px] z-50">
        <img src="/imgs/av.png" alt="" />
      </div>
      <div
        class="absolute h-[246px] z-50 w-[379px] left-0 bg-gradient-to-t from-[#F7C1D3]/[52%] to-[#A9CAF2]/[52%] top-[45px] rounded-r-[55px] flex items-start justify-center flex-col p-[32px]"
      >
        <div class="text-[20px] font-[600] leading-[24px] text-black text-left">
          Have more questions?
        </div>
        <div class="text-[14px] font-[500] leading-[25px] text-black mt-[10px] text-left">
          We're here to help reach out anytime for the answers and support you need!
        </div>

        <button class="btn-dashboard hover_tamkin max-w-[136px] mt-[32px]">
          Contact us
        </button>
      </div>
    </div>
</div>
    <!-- END SHOW MORE DETAILS-->




  </div>
</template>

<style></style>
