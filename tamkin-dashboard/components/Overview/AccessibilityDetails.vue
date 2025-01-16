
<script lang="ts" setup>
import { useCollapseStore } from "@/stores/collapse.js";
import { vOnClickOutside } from "@vueuse/components";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, registerables } from "chart.js";
import shadowPlugin from "@/chartjs/plugins/shadowPlugin.js"; // Adjust the path if necessary
const {t} = useI18n()
const statsStore = useStatsStore()
const collapseStore = useCollapseStore();
const { width, height } = useWindowSize();
const navStore = useNavbarStore()
ChartJS.register(...registerables, shadowPlugin);

const chart13 = ref("");
const chart14 = ref("");

watch(width, (newWidth) => {
  //   console.log(newWidth);
  chart13.value.chart.resize(50, 50);
  chart14.value.chart.resize(50, 50);
});

// const chartData = ref({
//   labels: [
//     "2024-10-01",
//     "2024-10-02",
//     "2024-10-03",
//     "2024-10-04",
//     "2024-10-05",
//     "2024-10-06",
//     "2024-10-07",
//     "2024-10-08",
//     "2024-10-09",
//   ],
//   datasets: [
//     {
//       label: "My Dataset",
//       data: [10, 5, 15, 20, 10, 15, 25, 10, 5],
//       borderColor: "rgba(75, 192, 192, 1)",
//       backgroundColor: "rgba(75, 192, 192, 0.2)",
//       fill: false,
//       tension: 0.1,
//     },
//   ],
// });
const chartData = ref({})
// const chartData2 = ref({
//   labels: [
//     "2024-10-01",
//     "2024-10-02",
//     "2024-10-03",
//     "2024-10-04",
//     "2024-10-05",
//     "2024-10-06",
//     "2024-10-07",
//     "2024-10-08",
//     "2024-10-09",
//   ],
//   datasets: [
//     {
//       label: "My Dataset",
//       data: [10, 5, 15, 20, 10, 15, 25, 10, 5],
//       borderColor: "rgba(218, 16, 11, 1)",
//       backgroundColor: "rgba(218, 16, 11, 1)",
//       fill: false,
//       tension: 0.1,
//     },
//   ],
// });
const chartData2 = ref()
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
      shadowColor: "rgba(31, 139, 36, 0.30)", // #1F8B242E in RGBA
      shadowBlur: 8, // 8px blur
      shadowOffsetX: 0, // 0px horizontal offset
      shadowOffsetY: 4, // 4px vertical offset
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
watchEffect(() => {
  chartData.value = {
      labels: statsStore.overviewStats.details && statsStore.overviewStats.details.function.chart.length > 0 ? statsStore.overviewStats.details.function.chart.map(t => t.date) : ['2023-12-01', '2024-01-15', '2024-02-28', '2024-03-10','2023-12-01', '2024-01-15', '2024-02-28', '2024-03-10'],
      datasets: [
        {
          label: "Profiles",
          data: statsStore.overviewStats.details && statsStore.overviewStats.details.function.chart.length > 0 ? statsStore.overviewStats.details.function.chart.map(t => t.count) : [1, 1, 1, 1, 1, 1, 1, 1, 1],
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          tension: 0.1,
        },
      ],
    };
// if(statsStore.overviewStats && statsStore.overviewStats?.details?.profile?.chart?.length > 0){
  chartData2.value = {
      labels: statsStore.overviewStats && statsStore.overviewStats?.details?.profile?.chart?.length > 0 ? statsStore.overviewStats.details.profile.chart.map(t => t.date) : ['2023-12-01', '2024-01-15', '2024-02-28', '2024-03-10','2023-12-01', '2024-01-15', '2024-02-28', '2024-03-10'],
      datasets: [
        {
          label: t("Profile"),
          data: statsStore.overviewStats && statsStore.overviewStats?.details?.profile?.chart?.length > 0  ? statsStore.overviewStats.details.profile.chart.map(t => t.count) : [1, 1, 1, 1, 1, 1, 1, 1, 1],
          borderColor: "rgba(218, 16, 11, 1)",
      backgroundColor: "rgba(218, 16, 11, 1)",
          fill: false,
          tension: 0.1,
        },
      ],
    };
// }
})

// const percentageChange = computed(() => {
//   const currentValue = statsStore.overviewStats.details?.function?.current_value;
//   const oldValue = statsStore.overviewStats.details?.function?.old_value;

//   if (typeof currentValue === "number" && typeof oldValue === "number") {
//     if (oldValue === 0) {
//       if (currentValue > 0) {
//         return {
//           percentage: "100%",
//           trend: "uptrend",
//         };
//       } else if (currentValue === 0) {
//         return {
//           percentage: "0%",
//           trend: "no change",
//         };
//       } else {
//         return {
//           percentage: "-100%", 
//           trend: "downtrend",
//         };
//       }
//     } else {
//       const change = ((currentValue - oldValue) / oldValue) * 100;
//       const trend = change > 0 ? "uptrend" : change < 0 ? "downtrend" : "no change";
      
//       return {
//         percentage: change.toFixed(2), 
//         trend,
//       };
//     }
//   } else {
//     return {
//       percentage: "N/A",
//       trend: "N/A",
//     };
//   }
// });
const runtimecc = useRuntimeConfig()
const baseColors = ["#F3DFD1", "#D7D4F4", "#CEE6F0", "#DAF3F1"];


function generateSimilarColor(hexColor, variation = 10) {
  const hexToRgb = (hex) =>
    hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) =>
      "#" + r + r + g + g + b + b
    )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));

  const rgbToHex = (r, g, b) =>
    `#${[r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")}`;

  const [r, g, b] = hexToRgb(hexColor).map((val) =>
    Math.min(255, Math.max(0, val + Math.floor(Math.random() * (variation * 2 + 1) - variation)))
  );

  return rgbToHex(r, g, b);
}

const generatedColor = ref("");

function generateColorPalette() {
  const randomBaseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
  return generateSimilarColor(randomBaseColor);
}


</script>

<template>
  <div  v-if="statsStore.loadingStats"
  class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full pb-[24px] w-full shadow-md -shadow-y-[1px] relative animate-pulse"
>
  <!-- Header Placeholder -->
  <div class="flex items-center justify-start px-[15px]  pt-[24px]">
    <div class="w-3/4 space-y-2">
      <div class="h-[24px] bg-gray-300 rounded dark:bg-gray-700 w-2/3"></div>
      <div class="h-[18px] bg-gray-200 rounded dark:bg-gray-600 w-full"></div>
    </div>
    <div class="ml-auto flex space-x-2">
      <div class="h-[30px] w-[80px] bg-gray-300 dark:bg-gray-600 rounded-full dark:bg-gray-700"></div>
      <div class="h-[20px] w-[20px] bg-gray-300 dark:bg-gray-600 rounded-full dark:bg-gray-700"></div>
    </div>
  </div>

  <!-- Cards Placeholder -->
  <div class="grid grid-cols-12 gap-6 mt-[16px]">
    <!-- Left Column -->
    <div class="px-[15px] rounded-[10px] lg:col-span-6 col-span-12 ipad-max:col-span-12 space-y-4">
      <div class="bg-gray-200 rounded-[10px] h-[108px] px-[15px] dark:bg-gray-700"></div>

      <!-- Placeholder Items List -->
      <div class="space-y-2 h-[254px] bg-gray-200 rounded-[10px] p-4 dark:bg-gray-700">
        <div class="h-[20px] bg-gray-300 rounded w-1/2 dark:bg-gray-600"></div>
        <div class="flex items-center space-x-4">
          <div class="w-3/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
          <div class="w-2/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="w-3/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
          <div class="w-2/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="w-3/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
          <div class="w-2/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="w-3/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
          <div class="w-2/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
      </div>
    </div>

    <!-- Right Column -->
    <div class="px-[15px] rounded-[10px] lg:col-span-6 col-span-12 ipad-max:col-span-12 space-y-4">
      <div class="bg-gray-200 rounded-[10px] h-[108px] px-[15px] dark:bg-gray-700"></div>

      <!-- Placeholder Items List -->
      <div class="space-y-2 h-[254px] bg-gray-200 rounded-[10px] p-4 dark:bg-gray-700">
        <div class="h-[20px] bg-gray-300 rounded w-1/2 dark:bg-gray-600"></div>
        <div class="flex items-center space-x-4">
          <div class="w-3/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
          <div class="w-2/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="w-3/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
          <div class="w-2/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="w-3/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
          <div class="w-2/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
        <div class="flex items-center space-x-4">
          <div class="w-3/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
          <div class="w-2/4 h-[16px] bg-gray-300 rounded dark:bg-gray-600"></div>
        </div>
      </div>
    </div>
  </div>
</div>
  <div v-else-if="navStore.defaultappobj?.package?.filter(p => p.type === 'Accessibility').length && !statsStore.loadingStats"
    class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full pb-[24px] w-full shadow-md -shadow-y-[1px] relative"
  >
    <div class="flex items-center justify-start px-[15px]">
      <div class="w-3/4">
        <h1 class="text-[18px] font-[500] leading-[30px]">
          <div class="flex items-center justify-start pt-[24px]">
            <div>
              <h1
                class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
              >
                {{ $t("Accessibility Details") }}
              </h1>
              <p
                class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin/90 pt-[6px]"
              >
                {{
                  $t(
                    "Accessibility Details provide comprehensive information to help ensure your website complies with all accessibility standards"
                  )
                }}
              </p>
            </div>
          </div>
        </h1>
      </div>
      <div class="">
        <button
          @click="$router.push('/statistics')"
          class="absolute rtl:left-[60px] ltr:right-[60px] top-[5px] lg:top-[21px] btn_bordered_dashboard rtl:mr-auto ltr:ml-auto rounded-full lg:!p-[10px] !p-[4px] lg:order-1 order-2 lg:my-0 my-4"
        >
          {{ $t("View All") }}
        </button>
        <div
          @click="collapseStore.collapseMenu('access_details')"
          v-on-click-outside="() => collapseStore.removeMenu('access_details')"
          :class="[
            collapseStore.menus.includes('access_details')
              ? 'active_notification !text-darkGrey'
              : '',
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
                : 'dark:text-white',
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
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7754 10.937L18.4995 7"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.7207 7H18.5V10.1496"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.2241 13.063L6.5 17"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.2793 17.0002H6.5V13.8506"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="text_mini">
                {{
                  !collapseStore.collapses.includes("access_details_card")
                    ? $t("Minisize")
                    : $t("Maxsize")
                }}
              </div>
            </div>

            <div class="arrow">
              <svg
                width="16"
                class=""
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter
                    id="shadow-sm"
                    x="0"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feDropShadow
                      dx="1"
                      dy="1"
                      stdDeviation="1"
                      flood-color="rgba(0, 0, 0, 0.3)"
                    />
                  </filter>
                </defs>
                <path
                  d="M15.2266 7.80851C15.2266 10.0216 0.841317 15.4755 0.841317 15.4755V0.142578C0.841317 0.142578 15.2266 5.5954 15.2266 7.80851Z"
                  class="fill-white dark:!fill-darkTamkin"
                  filter="url(#shadow-sm)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6 mt-[16px]" v-if="!collapseStore.collapses.includes('access_details_card')">
      <div class="px-[15px] rounded-[10px] lg:col-span-6 col-span-12 ipad-max:col-span-12">
        <div
          class="flex justify-between items-center mb-4 custom-border-tamkin padding-override-1 relative h-[108px] px-[15px]"
        >

          <div>
            <h2
              class="text-[14px] leading-[20px] font-[500] text-darkGrey dark:text-whiteTamkin"
            >
              {{ $t("Function") }}
            </h2>
            <div
              class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
            >
              <div class="text-[24px] leading-[32px] dark:text-whiteTamkin/90">
                {{statsStore.overviewStats.details?.function?.current_value}}
              </div>
              <div
                class="max-w-auto bg-tamkinLight rounded-[18px] text-[12px] leading-[18px] font-[500] rtl:space-x-reverse space-x-[2px] px-2 h-[18px] flex items-center justify-center"
              >
                <div>{{ statsStore.overviewStats.details?.function?.percentage}}%</div>

                <img src="/assets/imgs/icons/arrow_chart_up.svg" />
              </div>
            </div>
            <div
              class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
            >
              <div>
                <img :src="statsStore.overviewStats.details?.function?.percentage > 0 ? `/assets/imgs/overview/up.svg` : `/assets/imgs/overview/down.svg`" />
              </div>
              <p
                class="text-[12px] leading-[16px] font-[400] text-darkGrey dark:text-whiteTamkin"
              >
                <span
                 :class="[statsStore.overviewStats.details.function.percentage > 0 ? 'text-tamkin' : 'text-[#DA100B]']" class=" !text-[14px] !leading-[20px] !font-[700]"
                >
                 {{statsStore.overviewStats.details?.function?.percentage ? statsStore.overviewStats.details?.function?.percentage : 0}}%
                </span>
                {{ $t("vs last 30 days") }}
              </p>
            </div>
          </div>
          <div class="h-[80px] rtl:left-0 ltr:right-0 absolute">
            <Line
              ref="chart13"
              :data="chartData"
              :options="options"
              class="h-[80px]"
            />
          </div>
        </div>
        <div
          class=" h-auto py-[16px] custom-border-tamkin padding-override-1 flex flex-col items-start justify-center w-full px-[15px]"
        >
          <div
            class="text-[14px] mb-[8px] font-[500] leading-[20px] text-darkGrey dark:text-whiteTamkin"
          >
            {{ $t("Function") }}
          </div>
         <template v-if="statsStore.overviewStats.used.function && statsStore.overviewStats.used.function.length > 0">

          <div :key="fnt.name" v-for="fnt in statsStore.overviewStats.used.function" class="flex items-center rtl:space-x-reverse space-x-4 w-full">
            <div>
              <img
                :src="runtimecc.public.baseImagerUrl+fnt.icon"
                :alt="fnt.label"
                class="w-[42px] !h-[42px]"
              />
            </div>
            <div class="w-3/4 text-[12px] leading-[15px] dark:text-whiteTamkin">
              {{ $t(fnt.label) }}
            </div>
            <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2 ">
              <div
                class="bg-gray-200 rounded-full h-4 w-full relative dark:bg-gray-400 overflow-hidden"
              >
                <div
                  class=" h-4 rounded-full absolute  left-0 top-0"
                  :style="{width: `${fnt.percentage.toFixed(0)}%`,background:generateColorPalette()               }"
                ></div>
              </div>
              <span
                class="text-gray-500 text-sm dark:text-whiteTamkin dark:text-whiteTamkin/90"
                >{{ fnt.percentage.toFixed(0)}}%</span
              >
            </div>
          </div>
         </template>

         <div v-else class="flex items-center justify-center h-full w-full">
          <h1 class="text-center dark:text-whiteTamkin">
            {{ $t('No data available yet') }}
          </h1>
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
          <h2
            class="text-[14px] leading-[20px] font-[500] text-darkGrey dark:text-whiteTamkin"
          >
            {{ $t("Profile") }}
          </h2>
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
          >
            <div class="text-[24px] leading-[32px] dark:text-whiteTamkin/90">
              {{statsStore.overviewStats.details?.profile?.current_value}}
            </div>
            <div
              class="max-w-auto bg-tamkinLight rounded-[18px] text-[12px] leading-[18px] font-[500] rtl:space-x-reverse space-x-[2px] px-2 h-[18px] flex items-center justify-center"
            >
              <div>{{ statsStore.overviewStats.details?.profile?.percentage}}%</div>

              <img src="/assets/imgs/icons/arrow_chart_up.svg" />
            </div>
          </div>
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
          >
            <div>
              <img :src="statsStore.overviewStats.details?.profile?.percentage > 0 ? `/assets/imgs/overview/up.svg` : `/assets/imgs/overview/down.svg`" />
            </div>
            <p
              class="text-[12px] leading-[16px] font-[400] text-darkGrey dark:text-whiteTamkin"
            >
              <span
               :class="[statsStore.overviewStats.details?.profile?.percentage > 0 ? 'text-tamkin' : 'text-[#DA100B]']" class=" !text-[14px] !leading-[20px] !font-[700]"
              >
               {{statsStore.overviewStats.details?.profile?.percentage}}%
              </span>
              {{ $t("vs last 30 days") }}
            </p>
          </div>
        </div>
          <div class="h-[80px] rtl:left-0 ltr:right-0 absolute">
            <Line
              ref="chart14"
              :data="chartData2"
              :options="options"
              class="w-auto h-[80px]"
            />
          </div>
        </div>
        <div
          class="py-[16px] px-[15px] custom-border-tamkin padding-override-1 h-auto w-full flex flex-col items-start justify-center"
        >
          <div
            class="text-[14px] mb-[8px] font-[500] leading-[20px] text-darkGrey dark:text-whiteTamkin"
          >
            {{ $t("Profile") }}
          </div>
         <template v-if="statsStore.overviewStats?.used?.profile && statsStore.overviewStats?.used?.profile?.length > 0">
          <div :key="fnt.name" v-for="fnt in statsStore.overviewStats?.used?.profile" class="flex items-center rtl:space-x-reverse space-x-4 w-full">
            <div>
              <img
                :src="runtimecc.public.baseImagerUrl+fnt.icon"
                :alt="fnt.label"
                class="w-[42px] !h-[42px]"
              />
            </div>
            <div class="w-3/4 text-[12px] leading-[15px] dark:text-whiteTamkin">
              {{ $t(fnt.label) }}
            </div>
            <div class="w-2/4 flex items-center rtl:space-x-reverse space-x-2 ">
              <div
                class="bg-gray-200 rounded-full h-4 w-full relative dark:bg-gray-400 overflow-hidden"
              >
                <div
                  class=" h-4 rounded-full absolute  left-0 top-0"
                  :style="{width: `${fnt.percentage.toFixed(0)}%`,background:generateColorPalette()               }"
                ></div>
              </div>
              <span
                class="text-gray-500 text-sm dark:text-whiteTamkin dark:text-whiteTamkin/90"
                >{{ fnt.percentage.toFixed(0)}}%</span
              >
            </div>
          </div>
         </template>

          <div v-else class="flex items-center justify-center h-full w-full">
            <h1 class="text-center dark:text-whiteTamkin">
              {{ $t('No data available yet') }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>

