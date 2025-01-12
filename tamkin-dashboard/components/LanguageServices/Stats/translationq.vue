<script lang="ts" setup>
import { Line } from "vue-chartjs";
import { vOnClickOutside } from "@vueuse/components";

import { Chart as ChartJS, registerables } from "chart.js";

import shadowPlugin from "@/chartjs/plugins/shadowPlugin.js"; // Adjust the path if necessary

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
</script>

<template>
  <div
    class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] pb-[24px] shadow-md -shadow-y-[1px] relative"
  >
    <div class="flex items-center justify-start">
      <div class="pt-[24px]">
        <h1
          class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
        >
          {{ $t("Translation quality") }}
        </h1>
        <p
          class="font-[400] text-[12px] lg:text-[14px] leading-[22.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]"
        >
          {{
            $t(
              "Select Date Range specifies start and end dates to analyze or display data."
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

      <div class="flex items-center justify-between w-full">
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
                  class="text-[20px] font-[600] text-black leading-[30px]"
                  v-if="
                    statsStore.translation_quality &&
                    statsStore.translation_quality.translated_content
                  "
                >
                  {{ statsStore.translation_quality.translated_content }}
                  {{ $t("words") }}
                </h1>
              </div>
              <!-- <div class="h-[80px] left-1/2 right-0 absolute">
                <Line
                  ref="chart13"
                  :data="chartData"
                  :options="options"
                  class="h-[80px]"
                />
              </div> -->
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
                  class="text-[20px] font-[600] text-black leading-[30px]"
                  v-if="
                    statsStore.translation_quality &&
                    statsStore.translation_quality.untranslated_content
                  "
                >
                  {{ statsStore.translation_quality.untranslated_content }}
                  {{ $t("words") }}
                </h1>
              </div>
              <!-- <div class="h-[80px] left-1/2 right-0 absolute">
                <Line
                  ref="chart14"
                  :data="chartData"
                  :options="options"
                  class="h-[80px]"
                />
              </div> -->
            </div>
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-start w-2/4"
          v-if="statsStore.translation_quality"
        >
          <CircularProgressBar
            v-if="accuracy"
            :initialPercentage="accuracy"
            class="w-full small_circle text-[12px]"
          />

          <div class="text-[18px] font-[500] text-black dark:text-whiteTamkin">
            {{ $t("Translation accuracy") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
