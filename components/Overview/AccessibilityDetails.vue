<template>
  <div class="mt-[30px] bg-white rounded-[10px] h-full pb-[24px] w-full" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
  ">
    <div class="flex items-center justify-start px-[15px]">
      <div class="w-3/4">
        <h1 class="text-[20px] font-[500] leading-[30px]">
          <div class="flex items-center justify-start pt-[24px]">
            <div>
              <h1 class="text-[20px] font-[500] leading-[30px]">Accessibility Details</h1>
              <p class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]">
                Accessibility Details provide comprehensive information to help ensure your website
                complies with all accessibility standards
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
          :class="[collapseStore.menus.includes('access_details') ? 'active_notification !text-darkGrey' : '']"
          class="lg:order-2 order-1 menu_button_control"
        >
          <svg
            width="18"
            height="5"
            viewBox="0 0 18 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :class="[collapseStore.menus.includes('access_details') ? 'stroke-current !text-white !fill-white' : '']"
          >
            <path
              d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
              fill="currentColor"
            />
          </svg>

          <div v-if="collapseStore.menus.includes('access_details')" class="mini_SizeMenu">
            <div class="mini_wrap" @click="collapseStore.collapseCard('access_details_card')">
              <div>
                <img
                  src="/assets/imgs/addons/min_size.svg"
                  alt=""
                  :class="[collapseStore.menus.includes('access_details') ? '!fill-white' : '']"
                />
              </div>
              <div class="text_mini">
                {{
                  !collapseStore.collapses.includes('access_details_card')
                    ? 'Minisize'
                    : 'Maxsize'
                }}
              </div>
            </div>

            <div class="arrow">
              <img
                src="/assets/imgs/addons/arrow_menu.svg"
         
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
      <div class="px-[15px] rounded-[10px] lg:col-span-6 col-span-12 ipad-max:col-span-12">
        <div
          class="flex justify-between items-center mb-4 custom-border-tamkin padding-override-1 relative h-[108px] px-[15px]"
        >
          <div>
            <h2 class="text-[14px] leading-[20px] font-[500] text-darkGrey">Function</h2>
          <div class="flex items-center justify-start space-x-[8px]">
            <div class="text-[24px] leading-[32px]">
              20
       
            </div>
            <div class="max-w-[45px] bg-tamkinLight rounded-[18px] text-[12px] leading-[18px] font-[500] space-x-[2px] px-2 h-[18px] flex items-center 
            justify-center">
              <div>225%</div>

              <img src="/assets/imgs/icons/arrow_chart_up.svg" alt="" />
            </div>
          </div>
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]">
              <div>
                <img src="/assets/imgs/overview/up.svg" alt="" />
              </div>
              <p class="text-[12px] leading-[16px] font-[400] text-darkGrey">
                <span class="text-tamkin !text-[14px] !leading-[20px] !font-[700]">
                  12% 
                </span>
                vs last 30 days
              </p>
            </div>
          </div>
          <div class="h-[80px] left-1/2 right-0 absolute">
            <Line ref="chart13" :data="chartData" :options="options" class=" h-[80px]" />
          </div>
        </div>
        <div
          class="space-y-2 h-[254px] custom-border-tamkin padding-override-1 flex flex-col items-start justify-center w-full px-[15px]"
        >
          <div class="text-[14px] font-[500] leading-[20px] text-darkGrey">Function</div>
          <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
            <div>
              <img
                src="/assets/imgs/addons/language sign.svg"
                alt="Motor impaired icon"
                class="w-[42px] !h-[42px]"
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
                class="w-[42px] !h-[42px]"
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
                class="w-[42px] !h-[42px]"
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
                class="w-[42px] !h-[42px]"
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

      <div class="px-[15px] rounded-[10px] lg:col-span-6 col-span-12 ipad-max:col-span-12">
        <div
          class="flex justify-between items-center mb-4 custom-border-tamkin padding-override-1 relative h-[108px] px-[15px]"
        >
          <div>
            <h2 class="text-[14px] leading-[20px] font-[500] text-darkGrey">Profile</h2>
            <div class="flex items-center justify-start space-x-[8px]">
              <div class="text-[24px] leading-[32px]">
                20
         
              </div>
              <div class="max-w-[45px] bg-[#FCD0CF] !text-[#910B08] rounded-[18px] text-[12px] leading-[18px] font-[500] space-x-[2px] px-2 h-[18px] flex items-center 
              justify-center">
                <div>112%</div>
  
                <img src="/assets/imgs/icons/arrow_down_chart.svg" alt="" />
              </div>
            </div>
          
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]">
              <div>
                <img src="/assets/imgs/overview/down.svg" alt="" />
              </div>
              <p class="text-[12px] leading-[16px] font-[400] text-darkGrey">
                <span class="text-[#DA100B] !text-[14px] !leading-[20px] !font-[700]">12%</span>
                vs last 30 days
              </p>
            </div>
          </div>
          <div class="h-[80px] left-1/2 right-0 absolute">
            <Line ref="chart14" :data="chartData2" :options="options" class="w-auto h-[80px]" />
          </div>
        </div>
        <div
          class="space-y-2 px-[15px] custom-border-tamkin padding-override-1 h-[254px]
           w-full flex flex-col items-start justify-center"
        >
          <div class="text-[14px] font-[500] leading-[20px] text-darkGrey">Profile</div>
          <div class="flex items-center rtl:space-x-reverse space-x-4 w-full">
            <div>
              <img
                src="/assets/imgs/addons/monitor_im.svg"
                alt="Motor impaired icon"
                class="w-[42px] !h-[42px]"
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
                class="w-[42px] !h-[42px]"
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
                class="w-[42px] !h-[42px]"
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
                class="w-[42px] !h-[42px]"
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
</template>

<script lang="ts" setup>
import { useCollapseStore } from "@/stores/collapse.js";
import { vOnClickOutside } from "@vueuse/components";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, registerables } from "chart.js";
import shadowPlugin from '@/chartjs/plugins/shadowPlugin.js'; // Adjust the path if necessary

const collapseStore = useCollapseStore();
const { width, height } = useWindowSize();

ChartJS.register(
  ...registerables,
  shadowPlugin
);

const chart13 = ref("");
const chart14 = ref("");

watch(width, (newWidth) => {
  //   console.log(newWidth);
  chart13.value.chart.resize(50, 50);
  chart14.value.chart.resize(50, 50);
});

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
    shadowPlugin: {
      shadowColor: 'rgba(31, 139, 36, 0.30)', // #1F8B242E in RGBA
      shadowBlur: 8,                    // 8px blur
      shadowOffsetX: 0,                 // 0px horizontal offset
      shadowOffsetY: 4,                 // 4px vertical offset
    },
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
</script>
