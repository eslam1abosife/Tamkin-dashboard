<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";
import { vOnClickOutside } from "@vueuse/components";
import { Line } from "vue-chartjs";
import { useWindowSize } from "@vueuse/core";
import { useCollapseStore } from "@/stores/collapse.js";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale,
} from "chart.js";

const collapseStore = useCollapseStore();
const modalStore = useModalStore();


import "chartjs-adapter-date-fns"; // Import the date adapter

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale
);


const { width, height } = useWindowSize();
const chart13 = ref("");
const chart14 = ref("");

watch(width, (newWidth) => {
  //   console.log(newWidth);
  chart13.value.chart.resize(50, 50);
  chart14.value.chart.resize(50, 50);
});
definePageMeta({
  layout: "dashboard",
});




const showUpgradePlan = ref(false)


const chartData = ref({
  labels: [
    "2024-10-01",
    "2024-10-02",
    "2024-10-03",
    "2024-10-04",
    "2024-10-05",
    "2024-10-06",
    "2024-10-07",
    "2024-10-08",
    "2024-10-09",
  ],
  datasets: [
    {
      label: "My Dataset",
      data: [10, 5, 15, 20, 10, 15, 25, 10, 5],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: false,
      tension: 0.1,
    },
  ],
});
const chartData2 = ref({
  labels: [
    "2024-10-01",
    "2024-10-02",
    "2024-10-03",
    "2024-10-04",
    "2024-10-05",
    "2024-10-06",
    "2024-10-07",
    "2024-10-08",
    "2024-10-09",
  ],
  datasets: [
    {
      label: "My Dataset",
      data: [10, 5, 15, 20, 10, 15, 25, 10, 5],
      borderColor: "rgba(218, 16, 11, 1)",
      backgroundColor: "rgba(218, 16, 11, 1)",
      fill: false,
      tension: 0.1,
    },
  ],
});
const options = ref({
  responsive: true,
  maintainAspectRatio: true,
  elements: {
    point: {
      radius: 0,
    },
  },
  plugins: {
    legend: {
      display: false, // This will remove the legend
    },
    tooltip: {
      enabled: false, // This will disable the tooltips
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // This will remove the grid lines on the x-axis
      },
      ticks: {
        display: false, // This will remove the labels from the x-axis
      },
      border: {
        display: false, // This will remove the border line on the x-axis
      },
    },
    y: {
      grid: {
        display: false, // This will remove the grid lines on the y-axis
      },
      ticks: {
        display: false, // This will remove the labels from the y-axis
      },
      border: {
        display: false, // This will remove the border line on the y-axis
      },
    },
  },
});
const progress = ref(30.78);
</script>

<template>
  <div class="relative ">
    <div class=" ">
      <HeaderAccess 
      websiteImgName="tamkin_hand.svg"
      website-title="Tamkin.App"
      website-link="google.com"
      section-title="Overview" 
      section-sub-title=" Overview provides system summary with key data and analytics for decision-making"/>
     

   

      <div class="mt-[52px] bg-white rounded-[10px]" >
        <div
          class="flex flex-col items-start justify-center ltr:ml-[15px] rtl:mr-[15px] divide-y"
        >
          <div
            class="bg-white h-[87px] w-full rounded-[10px] flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
          >
            <div>
              <img
                src="/assets/imgs/overview/warning_overview.svg"
                class="w-[43px] h-[36px]"
                alt=""
              />
            </div>
            <div
              class="font-[400] lg:px-[24px] text-[12px] lg:text-[15px] leading-[28px] text-darkGrey ml-auto"
            >
              Please add Tamkin's embed code to your site to enable Tamkin's PRO Widget
              and unlock the full potential of digital accessibility and ADA compliance
            </div>
          </div>
        </div>

      
      </div>

      <LazyOverviewWidgetEmbdedCode   v-if="!showUpgradePlan"/>
      <LazyOverviewConnectWithUs   v-if="!showUpgradePlan"/>
      <LazyOverviewCurrentPlan :plan-type="'advanced'" :is-installed="false"/>
      <LazyOverviewTamkinTokenBanner />
  
    
      <div class="mt-[30px] bg-white rounded-[10px] h-full pb-[24px] w-full" v-if="!showUpgradePlan">
        <div class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Exclusive Investor Package
            </h1>

            <p class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]">
              Investors participating in the Investor Program will receive an exclusive
              package with many additional benefits and special access to advanced tools
              and services
            </p>
          </div>
        </div>

        <div class="flex items-center flex-col justify-center px-[15px] w-full">
          <div
            class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly h-full w-full lg:rtl:space-x-reverse space-x-[36px] mt-[32px]"
          >
            <div
              class="flex items-center flex-col justify-start custom-border-tamkin padding-override-1
               !rounded-t-[10px] !rounded-b-none mt-[35px] w-full ipad-max:w-full"
              style="padding: 16px, 10px, 16px, 10px"
            >
              <div class="absolute top-[-30px] left-[15px]">
                <img
                  src="/assets/imgs/overview/silver.svg"
                  class="w-[50px] h-[50px]"
                  alt=""
                />
              </div>

              <div
                class="flex items-center justify-center relative w-full px-[15px] mt-[48px] pb-[24px]"
              >
              
                <div class="order-2 relative w-full">
                  <h1 class="font-[600] text-[20px] leading-[30px]">Silver</h1>
                  <div class="absolute top-[32px] left-[100px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]">
                    <div class="absolute  left-[10px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400] crossed-out">
                      <span>$18,000</span>
                    </div>
                  </div>
                  <div
                    class="relative mt-[16px] text-black font-[600] text-[24px] leading-[29px] flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
                  >
                  
                    <div class="!font-[400] !text-[#536174] !text-[13px] leading-[19px]">
                      When investing
                    </div>
                  
                    <div>$ 10,000</div>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-col items-start justify-center w-full space-y-[10px] h-[305px] custom-border-collapse-tamkin rounded-t-none rounded-[10px] p-4"
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
                  <button class="btn-dashboard rounded-full mt-[16px] font-[600]">
                    Buy Tamkin
                  </button>
                </div>
              </div>
            </div>
            <div
              class="flex items-center flex-col justify-start ipad-max:w-full custom-border-tamkin 
              padding-override-1 !rounded-t-[10px] !rounded-b-none mt-[35px] w-full "
              style="padding: 16px, 10px, 16px, 10px"
            >
              <div class="absolute top-[-30px] left-[15px]">
                <img
                  src="/assets/imgs/overview/gold.svg"
                  class="w-[50px] h-[50px]"
                  alt=""
                />
              </div>

        
              <div
              class="flex items-center justify-center relative w-full px-[15px] mt-[48px] pb-[24px]"
            >
            
              <div class="order-2 relative w-full">
                  <h1 class="font-[600] text-[20px] leading-[30px]">Gold</h1>
                  <div class="absolute top-[32px] left-[100px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]">
                    <div class="absolute  left-[10px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400] crossed-out">
                      <span>$18,000</span>
                    </div>
                  </div>
                  <div
                    class="relative mt-[16px] w-full text-black font-[600] text-[24px] leading-[29px] 
                    flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
                  >
              
                    <div class="!font-[400] !text-[#536174] !text-[13px] leading-[19px]">
                      When investing
                    </div>
                    <div>$ 50,000</div>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-col items-start justify-center w-full space-y-[10px] h-[305px] custom-border-collapse-tamkin rounded-t-none rounded-[10px] p-4"
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
                  <button class="btn-dashboard rounded-full mt-[16px] font-[600]">
                    Buy Tamkin
                  </button>
                </div>
              </div>
            </div>
            <div
              class="flex items-center flex-col justify-start ipad-max:w-full custom-border-tamkin padding-override-1 
              !rounded-t-[10px] !rounded-b-none mt-[35px] w-full "
              style="padding: 16px, 10px, 16px, 10px"
            >
              <div class="absolute top-[-30px] left-[15px]">
                <img
                  src="/assets/imgs/overview/plat.svg"
                  class="w-[50px] h-[50px]"
                  alt=""
                />
              </div>

              <div
                class="flex items-center justify-center relative w-full px-[15px] mt-[48px] pb-[24px]"
              >
                <div class="order-2 relative w-full">
                  <h1 class="font-[600] text-[20px] leading-[30px]">Platinum</h1>
                  <div class="absolute top-[32px] left-[100px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400]">
                    <div class="absolute  left-[10px] text-[#EA4335] text-[15px] leading-[18.17px] font-[400] crossed-out">
                      <span>$18,000</span>
                    </div>
                  </div>
                  <div
                    class=" relative mt-[16px] text-black font-[600] text-[24px] leading-[29px] flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
                  >
                
                    <div class="!font-[400] !text-[#536174] !text-[13px] leading-[19px]">
                      When investing
                    </div>
                    <div>$ 80,000</div>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-col items-start justify-center w-full space-y-[10px] h-[305px] custom-border-collapse-tamkin rounded-t-none rounded-[10px] p-4"
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
                  <button class="btn-dashboard rounded-full mt-[16px] font-[600]">
                    Buy Tamkin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 

      <div class="mt-[30px] bg-white rounded-[10px] h-full pb-[24px] w-full"         v-if="showUpgradePlan"
      >
        <div class="flex items-center justify-start px-[15px]">
          <div class="w-3/4">
            <h1 class="text-[20px] font-[500] leading-[30px]">
              <div class="flex items-center justify-start pt-[24px]">
                <div>
                  <h1 class="text-[20px] font-[500] leading-[30px]">
                    Accessibility Details
                  </h1>

                  <p
                    class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
                  >
                  Accessibility Details provide comprehensive information  to help ensure your website complies with all accessibility standards
                  </p>
                </div>
              </div>
            </h1>
          </div>
          <div
            class="rtl:mr-auto ltr:ml-auto flex items-center lg:flex-row flex-col justify-center lg:space-y-0 space-y-[10px] 
            lg:justify-evenly rtl:space-x-reverse space-x-[16px]"
          >
            <button
            @click="$router.push('/statistics')"
              class="btn_bordered_dashboard rtl:mr-auto ltr:ml-auto rounded-full lg:!p-[10px] !p-[4px] lg:order-1 order-2 lg:my-0 my-4"
            >
              View All
            </button>
            <div
              @click="collapseStore.collapseMenu('access_details')"
              v-on-click-outside="() => collapseStore.removeMenu('access_details')"

              :class="[
                collapseStore.menus.includes('access_details') ? 'active_notification !text-darkGrey' : '',
              ]"
              class="lg:order-2 order-1 menu_button_control"
            >
              <svg
                width="18"
                height="5"
                viewBox="0 0 18 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="[
                  collapseStore.menus.includes('access_details')
                    ? 'stroke-current !text-white !fill-white'
                    : '',
                ]"
              >
                <path
                  d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                  fill="currentColor"
                />
              </svg>

              <div
                v-if="collapseStore.menus.includes('access_details')"
                class="mini_SizeMenu"
              >
                <div
                  class="mini_wrap"
                  @click="collapseStore.collapseCard('access_details_card')"
                >
                  <div>
                    <img
                      src="/assets/imgs/addons/min_size.svg"
                      alt=""
                      :class="[collapseStore.menus.includes('access_details') ? '!fill-white' : '']"
                    />
                  </div>
                  <div class="text_mini"> {{
                    !collapseStore.collapses.includes("access_details_card")
                      ? "Minisize"
                      : "Maxsize"
                  }}</div>
                </div>

                <div class="arrow">
                  <img
                    src="/assets/imgs/addons/arrow_menu.svg"
                    tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    "
                    alt=""
                    class="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-6 mt-[16px]" v-if="!collapseStore.collapses.includes('access_details_card')">
          <!-- Function Card -->
          <div
            class="px-[15px] rounded-[10px] lg:col-span-6 col-span-12 ipad-max:col-span-12"
          >
            <div
              class="flex justify-between items-center mb-4 custom-border-tamkin padding-override-1 relative h-[108px] px-[15px]"
            >
              <div>
                <h2 class="text-[14px] leading-[20px] font-[500] text-darkGrey">
                  Function
                </h2>
                <p class="text-[24px] leading-[32px]">
                  20
                  <span
                    class="bg-tamkinLight rounded-[18px] text-[12px] leading-[18px] font-[500] px-2 h-[18px]"
                    >225%</span
                  >
                </p>
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]">
                  <div>
                    <img src="/assets/imgs/overview/up.svg" alt="" />
                  </div>
                  <p class="text-[12px] leading-[16px] font-[400] text-darkGrey">
                    <span class="text-tamkin !text-[14px] !leading-[20px] !font-[700]"
                      >12%</span
                    >
                    vs last 30 days
                  </p>
                </div>
              </div>
              <div class="h-[80px] left-1/2 right-0 absolute">
                <Line
                  ref="chart13"
                  :data="chartData"
                  :options="options"
                  class=" h-[80px]"
                />
                <!-- <img src="path_to_graph_image" alt="Graph" class="h-16"> -->
              </div>
            </div>
            <div
              class="space-y-4 h-[254px] custom-border-tamkin padding-override-1 flex flex-col items-start justify-center w-full px-[15px]"
            >
              <div class="text-[14px] font-[500] leading-[20px] text-darkGrey">
                Function
              </div>
              <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/language sign.svg"
                    alt="Motor impaired icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Screen Reader</div>
                <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#F3DFD1] h-4 rounded-full" style="width: 30%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">30%</span>
                </div>
              </div>

              <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/voice_navigation.svg"
                    alt="Color blind icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Voice Navigation</div>
                <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#D7D4F4] h-4 rounded-full" style="width: 20%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">20%</span>
                </div>
              </div>

              <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/saturation.svg"
                    alt="Visually-impaired icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Saturation</div>
                <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#CEE6F0] h-4 rounded-full" style="width: 15%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">15%</span>
                </div>
              </div>

              <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/cursor.svg"
                    alt="Seizure & Epileptic icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Cursor</div>
                <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#DAF3F1] h-4 rounded-full" style="width: 8%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">8%</span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="px-[15px] rounded-[10px] lg:col-span-6 col-span-12 ipad-max:col-span-12"
          >
            <div
              class="flex justify-between items-center mb-4 custom-border-tamkin padding-override-1 relative h-[108px] px-[15px]"
            >
              <div>
                <h2 class="text-[14px] leading-[20px] font-[500] text-darkGrey">
                  Profile
                </h2>
                <p class="text-[24px] leading-[32px]">
                  20
                  <span
                    class="bg-[#FCD0CF] !text-[#910B08] rounded-[18px] text-[12px] leading-[18px] font-[500] px-2 h-[18px]"
                    >112%</span
                  >
                </p>
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]">
                  <div>
                    <img src="/assets/imgs/overview/down.svg" alt="" />
                  </div>
                  <p class="text-[12px] leading-[16px] font-[400] text-darkGrey">
                    <span class="text-[#DA100B] !text-[14px] !leading-[20px] !font-[700]"
                      >12%</span
                    >
                    vs last 30 days
                  </p>
                </div>
              </div>
              <div class="h-[80px] left-1/2 right-0 absolute">
                <Line
                  ref="chart14"
                  :data="chartData2"
                  :options="options"
                  class="w-auto h-[80px]"
                />
                <!-- <img src="path_to_graph_image" alt="Graph" class="h-16"> -->
              </div>
            </div>
            <div
              class="space-y-4 px-[15px] custom-border-tamkin padding-override-1 h-[254px] w-full flex flex-col items-start justify-center"
            >
              <div class="text-[14px] font-[500] leading-[20px] text-darkGrey">
                Profile
              </div>
              <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/monitor_im.svg"
                    alt="Motor impaired icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Motor impaired</div>
                <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#F3DFD1] h-4 rounded-full" style="width: 30%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">30%</span>
                </div>
              </div>

              <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/color_blind.svg"
                    alt="Color blind icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Color blind</div>
                <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#D7D4F4] h-4 rounded-full" style="width: 20%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">20%</span>
                </div>
              </div>

              <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/vis_impaired.svg"
                    alt="Visually-impaired icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Visually-impaired</div>
                <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#CEE6F0] h-4 rounded-full" style="width: 15%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">15%</span>
                </div>
              </div>

              <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/seizure.svg"
                    alt="Seizure & Epileptic icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Seizure & Epileptic</div>
                <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#DAF3F1] h-4 rounded-full" style="width: 8%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px] h-full pb-[24px] w-full mb-[24px]" v-if="showUpgradePlan">
        <div class="flex items-center justify-start px-[15px]">
          <div class="w-3/4">
            <h1 class="text-[20px] font-[500] leading-[30px]">
              <div class="flex items-center justify-start pt-[24px]">
                <div>
                  <h1 class="text-[20px] font-[500] leading-[30px]">
                    Live Translation Overview
                  </h1>

                  <p
                    class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
                  >
                    Live Translation Overview offers insights into real-time translation
                    technologies, enabling instant communication between speakers of
                    different languages
                  </p>
                </div>
              </div>
            </h1>
          </div>
          <div
            class="rtl:mr-auto ltr:ml-auto flex items-center lg:flex-row flex-col justify-center lg:space-y-0 space-y-[10px] lg:justify-evenly rtl:space-x-reverse space-x-[16px]"
          >
            <button
            @click="$router.push('/statistics')"

              class="btn_bordered_dashboard rtl:mr-auto ltr:ml-auto rounded-full lg:!p-[10px] !p-[4px] lg:order-1 order-2 lg:my-0 my-4"
            >
              View All
            </button>
            <div
              @click="collapseStore.collapseMenu('livetranslation_overview')"
              v-on-click-outside="() => collapseStore.removeMenu('livetranslation_overview')"

              :class="[
                collapseStore.menus.includes('livetranslation_overview') ? 'active_notification !text-darkGrey' : '',
              ]"
              class="lg:order-2 order-1 menu_button_control"
            >
              <svg
                width="18"
                height="5"
                viewBox="0 0 18 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="[
                  collapseStore.menus.includes('livetranslation_overview')
                    ? 'stroke-current !text-white !fill-white'
                    : '',
                ]"
              >
                <path
                  d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                  fill="currentColor"
                />
              </svg>

              <div
                v-if="collapseStore.menus.includes('livetranslation_overview')"
                style="box-shadow: 0px 2px 6px 0px #00000040"
                class="mini_SizeMenu"
              >
                <div
                  class="mini_wrap"
                  @click="collapseStore.collapseCard('livetranslation_overview_card')"
                >
                  <div>
                    <img
                      src="/assets/imgs/addons/min_size.svg"
                      alt=""
                      :class="[collapseStore.menus.includes('livetranslation_overview') ? '!fill-white' : '']"
                    />
                  </div>
                  <div class="text_mini"> {{
                    !collapseStore.collapses.includes("livetranslation_overview_card")
                      ? "Minisize"
                      : "Maxsize"
                  }}</div>
                </div>

                <div class="arrow">
                  <img
                    src="/assets/imgs/addons/arrow_menu.svg"
                    tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    "
                    alt=""
                    class="w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="!collapseStore.collapses.includes('livetranslation_overview_card')"
          class="flex lg:rtl:space-x-reverse space-x-8 items-center ipad-max:flex-wrap
           lg:flex-row flex-col justify-center lg:justify-between px-[15px] w-full mt-[16px]"
        >
          <!-- Donut Chart -->
          <div class="h-full ipad-max:mx-auto">
            <circular-progress-bar :initial-percentage="progress" />
          </div>
          <!-- Labels and Values -->
          <div
            class="flex flex-col items-start justify-center w-full space-y-[10px] mt-[32px] px-[4px]"
          >
            <div class="flex rtl:space-x-reverse space-x-8 items-center justify-between w-full">
              <div class="text-center">
                <span class="block w-3 h-3 bg-[#FFBA6B] rounded-full mx-auto"></span>
                <span class="text-gray-500">Used</span>
                <span class="block text-xl font-semibold">70%</span>
              </div>
              <div class="text-center">
                <span class="block w-3 h-3 bg-[#DEF3FE] rounded-full mx-auto"></span>
                <span class="text-gray-500">User Assistance</span>
                <span class="block text-xl font-semibold">20</span>
              </div>
              <div class="text-center">
                <span
                  class="block w-3 h-3 rounded-full mx-auto"
                  style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
                ></span>
                <span class="text-gray-500">Pages Translated</span>
                <span class="block text-xl font-semibold">5</span>
              </div>
            </div>
            <div class="space-y-4 w-full">
              <div class="flex items-center mt-[32px]">
                <div class="w-1/4 text-gray-500">Average Daily</div>
                <div class="w-3/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#F3DFD1] h-4 rounded-full" style="width: 40%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">40</span>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-1/4 text-gray-500">Average Weekly</div>
                <div class="w-3/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#D7D4F4] h-4 rounded-full" style="width: 70%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">280</span>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-1/4 text-gray-500">Average Monthly</div>
                <div class="w-3/4 flex items-center rtl:space-x-reverse space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#CEE6F0] h-4 rounded-full" style="width: 50%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">2000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Progress Bars -->
      </div>
  
        <div
          v-if="showUpgradePlan"
          class="bg-gradient-to-r custom-border rounded-big4x from-[#E5D5FA]/60 to-[#F8D3E0]/60 p-8 rounded-[43px] mt-[32px] w-full"
        >
          <h1 class="text-[20px] leading-[33px] font-[600] text-[#1E1E1E] mb-6 mt-[16px]">
            Buy Tamkin Token – TSLT and Join in our Investor Program
          </h1>
          <div class="relative mb-6 w-full">
            <div class="absolute right-0 top-10">
              <img src="/assets/imgs/overview/10p.svg" alt="" />
            </div>
            <div class="absolute top-[-80px] transform translate-x-[50%] z-[1]">
              <img src="/assets/imgs/overview/svg_opacity.svg" alt="" />
            </div>
            <!-- Timeline bar -->
            <div
              class="absolute left-4 top-[6px] h-full 2xl:h-[230px] w-[9px] z-[20] bg-tamkin rounded-full"
            ></div>
            <!-- Icons and Text -->
            <div class="flex items-start relative z-[50]">
              <!-- Icons -->
              <div class="relative flex items-center justify-center ">
                <div class="absolute left-[5px] top-10 w-[27px] h-[27px]">
                  <img src="/assets/imgs/icons/investor.svg" alt="Icon 1" class="w-[27px] h-[27px]" />
                </div>
                <div class="absolute left-[5px] top-40 w-[27px] max-h-[27px]">
                  <img src="/assets/imgs/icons/investor.svg" alt="Icon 2" class="w-[27px] h-[27px]" />
                </div>
              </div>
              <!-- Text content -->
              <div class="flex flex-col space-y-[16px] ml-14 w-2/4 mt-[16px]">
                <div>
                  <h2 class="text-[14px] leading-[21px] font-[500] mb-2">
                    Win Investor Package
                  </h2>
                  <p class="text-[#585B5B] text-[13px] leading-[24px] font-[500]">
                    Investors participating in the Investor Program will receive an exclusive package with many additional benefits and special access to advanced tools and services.
                  </p>
                </div>
                <div>
                  <h2 class="text-[14px] leading-[21px] font-[500] mb-2">
                    Monthly profits
                  </h2>
                  <p class="text-[#585B5B] text-[13px] leading-[24px] font-[500]">
                    This program includes 10% of Tamkin profits, distributed monthly in USDT to investors who participate in and maintain the program on their tokens without selling.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Big number and buttons -->
          <div class="flex items-center justify-end w-full relative z-[50]">
            <div class="flex space-x-4">
              <button class="btn-dashboard rounded-full h-[40px] w-[156px]">Buy Tamkin</button>
              <button class="btn_bordered_dashboard rounded-full bg-white w-[156px] h-[40px] !p-[4px] text-[15px] leading-[22.5px]">Investor Program</button>
              <button class="btn_bordered_dashboard rounded-full bg-white w-[156px] h-[40px] !p-[4px] text-[15px] leading-[22.5px]">Investor Package</button>
            </div>
          </div>
        </div>
      

           <div v-if="showUpgradePlan"
        class="bg-white custom-border-tamkin padding-override-1 w-full rtl:space-x-reverse space-x-[16px] 
        rounded-[10px] h-[119px] mt-[32px] px-[15px] flex items-center justify-start mb-[32px]"
      >
        <div>
          <img src="/assets/imgs/overview/plan-calender.svg" alt="" />
        </div>
        <div class="flex flex-col items-start justify-center w-full">
          <div class="font-[500] text-[18px] leading-[27px] text-darkGrey w-full">
            Monthly Plan
          </div>
          <div class="flex items-center justify-start w-full rtl:space-x-reverse space-x-[6px]">
            <div class="text-[13px] leading-[24px] font-[400]">Package Expires in</div>
            <div
              class="flex items-center justify-center custom-border-tamkin padding-override-1 h-[23px] p-[12px] text-[13px] leading-[24px] font-[500]"
            >
              Aug 20,2024
            </div>
          </div>
        </div>

        <div class="relative">
          <div
            class="flex items-center justify-center absolute top-[-10px] transform left-[30%] h-[19px] bg-[#B36B8A] text-white w-[69px] text-[12px] leading-[18px] font-[500] rounded-[10px]"
          >
            SAVE 12%
          </div>
          <button class="btn_bordered_dashboard rounded-full w-[178px]"  @click="modalStore.controlShowUpgradeModal">
            Switch To Annual
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(60px);
}
.div-slider {
}
.slide-fade-leave-active {
  display: none;
}
.crossed-out {
  position: relative;
  display: inline-block;
}
.crossed-out::before {
  content: "";
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  border-top: 2px solid red;
  transform: rotate(-12deg);
}
</style>
