<script lang="ts" setup>
import { Line } from "vue-chartjs";
import { vOnClickOutside } from "@vueuse/components";

import { Chart as ChartJS, registerables } from "chart.js";

import shadowPlugin from "@/chartjs/plugins/shadowPlugin.js"; // Adjust the path if necessary
const { t } = useI18n();
const collapseStore = useCollapseStore();

ChartJS.register(...registerables, shadowPlugin);

const chart13 = ref("");
const chart14 = ref("");
const { width, height } = useWindowSize();

watch(width, (newWidth) => {
  //   console.log(newWidth);
  chart13.value.chart.resize(50, 50);
  chart14.value.chart.resize(50, 50);
});
// start code
const statsStore = useStatsStore();
const navStore = useNavbarStore();

const accuracy = computed(() => {
  return statsStore.translation_quality.translated_content
    ? Math.round(
        (statsStore.translation_quality.translated_content /
          statsStore.translation_quality.total) *
          100
      )
    : 0;
});
const chartData = ref({
  labels: [],
  datasets: [],
});
const chartData2 = ref({
  labels: [],
  datasets: [],
});

watchEffect(() => {
  //   translated_chart
  // untranslated_chart
  if (statsStore.translation_quality) {
    const sortedtranslated = statsStore.translation_quality.translated_chart
      ?.slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const sorteduntranslated = statsStore.translation_quality.untranslated_chart
      ?.slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    chartData.value = {
      labels:
        sortedtranslated.length > 0
          ? sortedtranslated.map((t) => t.date)
          : [
              "2023-12-01",
              "2024-01-15",
              "2024-02-28",
              "2024-03-10",
              "2023-12-01",
              "2024-01-15",
              "2024-02-28",
              "2024-03-10",
            ],
      datasets: [
        {
          label: t("Translated Words"),
          data:
            sortedtranslated.length > 0
              ? sortedtranslated.map((t) => t.count)
              : [1, 1, 1, 1, 1, 1, 1, 1], // Default non-zero value for the line to be visible
          borderColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: canvasCtx, chartArea } = chart;
            if (!chartArea) {
              // Return a default color until the chart is fully initialized
              return "#2DADA3";
            }

            // Create the gradient
            const gradient = canvasCtx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, "#2DADA3"); // Start color
            gradient.addColorStop(1, "#71DAD2"); // End color
            return gradient;
          },
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          tension: 0, // Ensures the line is perfectly straight
          borderWidth: 2, // Ensure the line is visible
          pointRadius: 0, // Optional: Hide points if you only want the line
        },
      ],
    };

    chartData2.value = {
      labels:
        sorteduntranslated.length > 0
          ? sorteduntranslated.map((t) => t.date)
          : [
              "2023-12-01",
              "2024-01-15",
              "2024-02-28",
              "2024-03-10",
              "2023-12-01",
              "2024-01-15",
              "2024-02-28",
              "2024-03-10",
            ],
      datasets: [
        {
          label: t("Untranslated Words"),
          data:
            sortedtranslated.length > 0
              ? sorteduntranslated.map((t) => t.count)
              : [1, 1, 1, 1, 1, 1, 1, 1],
          borderColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: canvasCtx, chartArea } = chart;
            if (!chartArea) {
              // Return a default color until the chart is fully initialized
              return "#2DADA3";
            }

            // Create the gradient
            const gradient = canvasCtx.createLinearGradient(
              0,
              chartArea.top,
              0,
              chartArea.bottom
            );
            gradient.addColorStop(0, "#2DADA3"); // Start color
            gradient.addColorStop(1, "#71DAD2"); // End color
            return gradient;
          },
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: false,
          tension: 0.1,
        },
      ],
    };
  }
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
</script>

<template>
  <div
    v-if="!statsStore.loadingStatsIntranlsation"
    class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] pb-[24px] shadow-md -shadow-y-[1px] relative"
  >
    <div class="flex items-center justify-start">
      <div class="pt-[24px]">
        <h1
          class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
        >
          {{ $t("Translation Accuracy") }}
        </h1>
        <p
          class="font-[400] text-[12px] lg:text-[14px] leading-[22.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]"
        >
          {{
            $t(
              "Translation Accuracy: Ensuring precise and reliable translations to maintain high-quality communication and understanding"
            )
          }}
        </p>
      </div>
      <div
        @click.stop="collapseStore.collapseMenu('translation_q')"
        v-on-click-outside="() => collapseStore.removeMenu('translation_q')"
        :class="[
          collapseStore.menus.includes('translation_q')
            ? 'active_notification !text-darkGrey'
            : '',
        ]"
        class="menu_button_control divide-y"
      >
        <svg
          width="18"
          height="5"
          viewBox="0 0 18 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="[
            collapseStore.menus.includes('translation_q')
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
          v-if="collapseStore.menus.includes('translation_q')"
          style="box-shadow: 0px 2px 6px 0px #00000040"
          class="mini_SizeMenu"
        >
          <!-- <div class="mini_wrap">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5.5L5.5 9.9256V12.9824L12 8.55677L18.5 12.9824V9.9256L12 5.5ZM12 9.17966L7.75108 12.1087V14.7032L12 11.7742L16.2489 14.7032V12.1087L12 9.17966ZM12 12.3983L9.55195 14.0859V16.0286L12 14.3618L14.4481 16.0286V14.0859L12 12.3983ZM12 14.9834L9.55195 16.6502V18.5L12 16.8332L14.4481 18.5V16.6502L12 14.9834Z"
                  class="fill-[#585B5B] dark:fill-whiteTamkin"
                />
              </svg>
            </div>
            <div class="text_mini">{{ $t("Switch To Annual") }}</div>
          </div> -->
          <div
            class="mini_wrap"
            @click="collapseStore.collapseCard('translation_q_card')"
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
                !collapseStore.collapses.includes("translation_q_card")
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
                class="fill-white dark:!fill-tamkinDarkPrimary"
                filter="url(#shadow-sm)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div
      class="relative w-full mt-[24px] mx-auto dark:bg-tamkinDarkPrimary rounded-lg lg:overflow-x-hidden overflow-x-auto"
      v-if="!collapseStore.collapses.includes('translation_q_card')"
    >
      <MessagesLockedFeature
        v-if="
          navStore.defaultappobj?.package?.filter(
            (p) => p.type === 'Sign language'
          ).length === 0
        "
      />

      <div
        class="flex items-center flex-col md:flex-row justify-between w-full"
      >
        <div class="flex flex-col items-start justify-center w-full">
          <div class="rounded-[10px] w-full">
            <div
              class="flex justify-between rounded-[10px] items-center mb-4 border-[2px] border-[#88AAA5]/60 relative h-[108px] px-[15px]"
            >
              <div class="space-y-[16px]">
                <h2
                  class="text-[14px] leading-[20px] font-[500] text-darkGrey dark:text-whiteTamkin"
                >
                  {{ $t("Translated content") }}
                </h2>
                <h1
                  class="text-[20px] font-[600] text-black dark:text-white leading-[30px]"
                >
                  {{
                    statsStore.translation_quality.translated_content
                      ? statsStore.translation_quality.translated_content
                      : 0
                  }}
                  {{ $t("Words") }}
                </h1>
              </div>
              <div class="h-[80px] ltr:right-[33px] rtl:left-[33px] absolute">
                <Line
                  ref="chart13"
                  :data="chartData"
                  :options="options"
                  class="h-[80px]"
                />
              </div>
            </div>
          </div>
          <div class="rounded-[10px] w-full">
            <div
              class="flex justify-between rounded-[10px] items-center mb-4 border-[2px] border-[#88AAA5]/60 relative h-[108px] px-[15px]"
            >
              <div class="space-y-[16px]">
                <h2
                  class="text-[14px] leading-[20px] font-[500] text-darkGrey dark:text-whiteTamkin"
                >
                  {{ $t("Untranslated content") }}
                </h2>
                <h1
                  class="text-[20px] font-[600] text-black dark:text-white leading-[30px]"
                >
                  {{
                    statsStore.translation_quality.untranslated_content
                      ? statsStore.translation_quality.untranslated_content
                      : 0
                  }}
                  {{ $t("Words") }}
                </h1>
              </div>
              <div class="h-[80px] ltr:right-[33px] rtl:left-[33px] absolute">
                <Line
                  ref="chart14"
                  :data="chartData2"
                  :options="options"
                  class="h-[80px]"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-start w-2/4"
          v-if="statsStore.translation_quality"
        >
          <CircularProgressBar
            textsize="32px"
            :initialPercentage="accuracy ? accuracy : 0"
            class="small_circle !w-[150px] !h-[150px] text-[12px]"
          />

          <div
            class="text-[18px] leading-[28px] mt-[14px] font-[500] text-[#021328] dark:text-whiteTamkin"
          >
            {{ $t("Translation Accuracy") }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-else
    class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] pb-[24px] shadow-md -shadow-y-[1px] relative animate-pulse"
  >
    <div class="flex items-center justify-start">
      <div class="pt-[24px] w-full">
        <div
          class="h-[20px] bg-gray-300 dark:bg-gray-700 rounded-md w-2/3 mb-4"
        ></div>
        <div
          class="h-[14px] bg-gray-300 dark:bg-gray-700 rounded-md w-full"
        ></div>
      </div>
    </div>

    <div
      class="w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg lg:overflow-x-hidden overflow-x-auto"
    >
      <div class="flex items-center justify-between w-full mt-[66px]">
        <div class="grid grid-cols-12 w-full">
          <div class="rounded-[10px] col-span-12 ]">
            <div
              class="flex justify-between bg-gray-300 dark:bg-gray-700 rounded-[10px] items-center mb-4 relative h-[108px] px-[15px]"
            >
              <div class="space-y-[16px]">
                <div
                  class="h-[14px] bg-gray-400 dark:bg-gray-600 rounded-md w-1/3"
                ></div>
                <div
                  class="h-[24px] bg-gray-400 dark:bg-gray-600 rounded-md w-1/2"
                ></div>
              </div>
            </div>
          </div>
          <div class="rounded-[10px] col-span-12 w-full">
            <div
              class="flex justify-between bg-gray-300 dark:bg-gray-700 rounded-[10px] items-center mb-4 relative h-[108px] px-[15px]"
            >
              <div class="space-y-[16px]">
                <div
                  class="h-[14px] bg-gray-400 dark:bg-gray-600 rounded-md w-1/3"
                ></div>
                <div
                  class="h-[24px] bg-gray-400 dark:bg-gray-600 rounded-md w-1/2"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
