<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useNavbarStore } from "@/stores/navbar";
import { useWindowSize } from "@vueuse/core";
import { ar } from "date-fns/locale";

import { useDownloadSignLangCSV } from "~/composables/useAccessibility";
const { t, locale } = useI18n();
const { downloadSignLangChartCsv } = useDownloadSignLangCSV();
const isOpen = ref(false);
const localePath = useLocalePath();
const { width, height } = useWindowSize();
const colorMode = useColorMode();
const chart12 = ref("");
const chart2 = ref("");
const navStore = useNavbarStore();
const collapseStore = useCollapseStore();
const statsStore = useStatsStore();
const langStore = useLangSwitch();
import { Line } from "vue-chartjs";

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
import "chartjs-adapter-date-fns"; // Import the date adapter

const { sideBarOpen } = storeToRefs(navStore);
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

const options = ref({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    x: {
      border: {
        color: (c) => {
          return colorMode.preference === "dark" ? "white" : "#585B5B";
        },
      },
      grid: {
        display: false,
      },
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "MMM dd",
        displayFormats: {
          day: "MMM dd",
        },
      },

      ticks: {
        padding: 5,
        autoSkip: true,
        maxTicksLimit: 9,
        color: (c) => {
          return colorMode.preference === "dark" ? "white" : "#616161";
        },

        callback: function (value) {
          const date = new Date(value);
          const options = { month: "short", day: "numeric" };
          return date.toLocaleDateString("en-US", options);
        },
      },
      offset: false, // Disable offset for ticks
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
});

const updateChartOptions = async (isDarkMode: any) => {
  if (isDarkMode === "dark") {
    options.value.scales.x.ticks.color = "#ffffff";
  } else {
    options.value.scales.x.ticks.color = "#000000";
  }

  await nextTick();

  // Update the chart instances
  if (chart12.value) {
    chart12.value.chart.update();
  }
  if (chart2.value) {
    chart2.value.chart.update();
  }
};

onMounted(async () => {
  await nextTick();
  updateChartOptions(colorMode.preference);
});
watch(
  () => colorMode.preference,
  async (newVal) => {
    await nextTick();
    updateChartOptions(newVal);
  }
);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
const selectedInterval = ref("");
const selectOption = (option: any) => {
  selectedInterval.value = option;
  isOpen.value = false;
  dateF.value = "";
};

const format = (date: any) => {
  const options = { year: "numeric", month: "short", day: "2-digit" };

  const formatDate = (d) => d.toLocaleDateString("en-US", options);

  if (Array.isArray(date)) {
    const start = formatDate(date[0]);
    const end = formatDate(date[1]);
    return ` ${start} - ${end}`;
  } else {
    return `Selected date is ${formatDate(date)}`;
  }
};
const myStyles = computed(() => {
  return {
    height: `200px`,
    width: "100%",
    position: "relative",
  };
});

const handleDate = () => {
  selectedInterval.value = "";
};

const resizeCharts = () => {
  const containerWidth =
    document.querySelector(".container_chart")?.offsetWidth || width.value;
  const newChartWidth = navStore.sideBarOpen ? "50%" : "100%"; // Use 50% if sidebar is open, 100% if closed

  if (chart12.value && chart2.value) {
    chart12.value.chart.resize(containerWidth, 200); // Set width to containerWidth
    chart2.value.chart.resize(containerWidth, 200); // Set width to containerWidth
  }
};

watch(sideBarOpen, () => {
  resizeCharts();
});

watch(
  () => navStore.sideBarOpen,
  () => {
    resizeCharts();
  }
);

const dateF = ref();
const dateOpen = ref(false);
// Function to get date range from interval
const getDateRangeFromInterval = (interval: any) => {
  const endDate = new Date();
  let startDate = new Date();

  switch (interval) {
    case "7 Days":
      startDate.setDate(endDate.getDate() - 7);
      break;
    case "14 Days":
      startDate.setDate(endDate.getDate() - 14);
      break;
    case "1 Month":
      startDate.setMonth(endDate.getMonth() - 1);
      break;
    case "2 Months":
      startDate.setMonth(endDate.getMonth() - 2);
      break;
    case "3 Months":
      startDate.setMonth(endDate.getMonth() - 3);
      break;
    default:
      return null; // No date range if interval is unrecognized
  }

  return [startDate, endDate];
};
const filterChartData = (
  loadscount: any,
  dateRange = null,
  interval = null
) => {
  let [startDate, endDate] =
    Array.isArray(dateRange) && dateRange.length === 2
      ? dateRange.map((date: any) => new Date(date))
      : getDateRangeFromInterval(interval) || [];

  if (!startDate || !endDate) return loadscount;

  return loadscount.filter((item: any) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });
};
// WatchEffect to update chart data only when needed
const chartDataOpens = ref();
const chartDataload = ref();
watchEffect(() => {
  if (statsStore.chartsData && statsStore.chartsData?.loadscount?.length > 0) {
    const filteredData = filterChartData(
      statsStore.chartsData.loadscount,
      dateF.value,
      selectedInterval.value
    );
    const sortedData = filteredData
      .slice()
      .sort((a: any, b: any) => new Date(a.date) - new Date(b.date));

    chartDataload.value = {
      labels: sortedData.map((t: any) => t.date),
      datasets: [
        {
          label: t("Player Load"),
          data: sortedData.map((t: any) => t.count),
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
          backgroundColor: "linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)",
          fill: false,
          pointRadius: 0, // Removes dots from the line chart
          pointHoverRadius: 0, // Disables the hover effect on points
          tension: 0, // Optional: Add smooth curves to the line
        },
      ],
    };
  } else {
    chartDataload.value = null;
  }

  if (statsStore.chartsData && statsStore.chartsData?.opencount?.length > 0) {
    const filteredData = filterChartData(
      statsStore.chartsData.opencount,
      dateF.value,
      selectedInterval.value
    );
    const sortedData = filteredData
      .slice()
      .sort((a: any, b: any) => new Date(a.date) - new Date(b.date));

    chartDataOpens.value = {
      labels: sortedData.map((t: any) => t.date),
      datasets: [
        {
          label: t("Player Opens"),
          data: sortedData.map((t: any) => t.count),
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
          backgroundColor: "linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%)",
          fill: false,
          pointRadius: 0, // Removes dots from the line chart
          pointHoverRadius: 0, // Disables the hover effect on points
          tension: 0, // Optional: Add smooth curves to the line
        },
      ],
    };
  } else {
    chartDataOpens.value = null;
  }
});

const loadingDownload = ref(false);
const downloadCSV = async () => {
  loadingDownload.value = true;

  const base64Data = await downloadSignLangChartCsv();

  const blob = base64ToBlob(base64Data, "text/csv");

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "chart_data_sign_language.csv";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  loadingDownload.value = false;
};

function base64ToBlob(base64: any, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length)
      .fill()
      .map((_, i) => slice.charCodeAt(i));
    byteArrays.push(new Uint8Array(byteNumbers));
  }

  return new Blob(byteArrays, { type: contentType });
}

const percentageChange = ref({
  loadscountPercentageChange: 0,
  opencountPercentageChange: 0,
});

function getLoadsCountSummary(
  loadscount = [],
  opencount = [],
  dateRange = null,
  interval = "7 Days"
) {
  let startDate, previousStartDate;
  const today = new Date();

  // Determine the start date and previous start date based on dateRange or interval
  if (Array.isArray(dateRange) && dateRange.length === 2) {
    startDate = new Date(dateRange[0]);
    previousStartDate = new Date(dateRange[0]);
    previousStartDate.setDate(
      previousStartDate.getDate() - (today - startDate) / (1000 * 60 * 60 * 24)
    );
  } else {
    startDate = new Date();
    previousStartDate = new Date();

    switch (interval) {
      case "7 Days":
        startDate.setDate(today.getDate() - 7);
        previousStartDate.setDate(today.getDate() - 14);
        break;
      case "14 Days":
        startDate.setDate(today.getDate() - 14);
        previousStartDate.setDate(today.getDate() - 28);
        break;
      case "1 Month":
        startDate.setMonth(today.getMonth() - 1);
        previousStartDate.setMonth(today.getMonth() - 2);
        break;
      case "2 Months":
        startDate.setMonth(today.getMonth() - 2);
        previousStartDate.setMonth(today.getMonth() - 4);
        break;
      case "3 Months":
        startDate.setMonth(today.getMonth() - 3);
        previousStartDate.setMonth(today.getMonth() - 6);
        break;
      default:
        startDate.setDate(today.getDate() - 7);
        previousStartDate.setDate(today.getDate() - 14);
    }
  }

  // Function to calculate total and percentage change for a dataset
  const calculateTotalsAndPercentage = (data = []) => {
    if (!Array.isArray(data)) return { currentTotal: 0, percentageChange: 0 };
    const currentTotal = data
      .filter(
        (item) =>
          new Date(item.date) >= startDate && new Date(item.date) <= today
      )
      .reduce((sum, item) => sum + item.count, 0);

    const previousTotal = data
      .filter(
        (item) =>
          new Date(item.date) >= previousStartDate &&
          new Date(item.date) < startDate
      )
      .reduce((sum, item) => sum + item.count, 0);

    const percentageChange =
      previousTotal > 0
        ? (((currentTotal - previousTotal) / previousTotal) * 100).toFixed(2)
        : currentTotal > 0
        ? 100
        : 0;

    return { currentTotal, percentageChange };
  };

  // Calculate for `loadscount` and `opencount`
  const loadscountResult = calculateTotalsAndPercentage(loadscount);
  const opencountResult = calculateTotalsAndPercentage(opencount);

  // Update the percentageChange ref
  percentageChange.value = {
    loadscountPercentageChange: loadscountResult.percentageChange,
    opencountPercentageChange: opencountResult.percentageChange,
  };

  // Return summary string
  const period = dateRange
    ? `${startDate.toLocaleDateString()} - ${today.toLocaleDateString()}`
    : interval;

  return {
    loadscountSummary: `${loadscountResult.currentTotal} ${t(
      "Times during"
    )} ${period}`,
    opencountSummary: `${opencountResult.currentTotal} ${t(
      "Times during"
    )} ${period}`,
  };
}
// Computed properties for summary calculations
const loadscountSummary = computed(
  () =>
    getLoadsCountSummary(
      statsStore.chartsData.loadscount,
      statsStore.chartsData.opencount,
      dateF.value,
      selectedInterval.value
    ).loadscountSummary
);
</script>

<template>
  <div
    class="mt-[44px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] shadow-md -shadow-y-[1px] px-[15px] relative"
  >
    <div class="flex items-center justify-start">
      <div class="pt-[24px]">
        <h1
          class="text-[14px] xs:text-[12px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
        >
          {{ $t("Select Date Range") }}
        </h1>
        <p
          class="font-[400] xs:text-[10px] text-[12px] lg:text-[14px] leading-[22.95px] text-darkGrey mt-[10px] dark:text-whiteTamkin"
        >
          {{
            $t(
              "Select Date Range specifies start and end dates to analyze or display data."
            )
          }}
        </p>
      </div>

      <div
        @click.stop="collapseStore.collapseMenu('select_date_range')"
        v-on-click-outside="() => collapseStore.removeMenu('select_date_range')"
        :class="[
          collapseStore.menus.includes('select_date_range')
            ? 'active_notification !text-darkGrey'
            : '',
        ]"
        class="menu_button_control"
      >
        <svg
          width="18"
          height="5"
          viewBox="0 0 18 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="[
            collapseStore.menus.includes('select_date_range')
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
          v-if="collapseStore.menus.includes('select_date_range')"
          class="mini_SizeMenu divide-y"
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
            @click="collapseStore.collapseCard('select_date_range_card')"
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
                !collapseStore.collapses.includes("select_date_range_card")
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
      v-if="!collapseStore.collapses.includes('select_date_range_card')"
      class="relative w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg"
    >
      <MessagesLockedFeature
        v-if="
          navStore.defaultappobj?.package?.filter(
            (p) => p.type === 'Sign language'
          ).length === 0
        "
      />

      <div
        class="relative flex flex-col items-start justify-center mt-[18px] lg:pb-[16px] w-full"
      >
        <div
          class="flex items-center justify-between lg:space-y-0 space-y-4 lg:flex-nowrap flex-wrap w-full"
        >
          <div
            class="flex items-center justify-start lg:flex-nowrap flex-wrap rtl:space-x-reverse lg:space-y-0 space-y-4 lg:space-x-[24px] w-full"
          >
            <div class="w-full ipad-max:w-full lg:w-1/4 rtl:!font-[Almarai]">
              <VueDatePicker
                :enable-time-picker="false"
                @blur="dateOpen = false"
                @focus="dateOpen = true"
                class="relative rtl:!font-[Almarai]"
                :clearable="false"
                disable-year-select
                month-name-format="long"
                :input-class-name="
                  dateOpen && dateF
                    ? 'bg_interval_open tamkin '
                    : 'tamkin_date_input rtl:!font-[Almarai]'
                "
                :dark="colorMode.preference === 'dark'"
                :placeholder="$t('Select Period')"
                v-model="dateF"
                :format="format"
                :locale="locale"
                :format-locale="locale === 'ar' ? ar : ''"
                :position="langStore.direction === 'rtl' ? 'right' : 'left'"
                :auto-position="false"
                range
                :max-date="new Date()"
                @update:model-value="handleDate"
              >
                <template #action-row="{ closePicker, selectDate }">
                  <div
                    class="flex items-center justify-end rtl:space-x-reverse space-x-[10px] md:space-x-[16px] w-full"
                  >
                    <button
                      @click="
                        () => {
                          closePicker();
                          dateF = '';
                        }
                      "
                      :disabled="!dateF"
                      class="btn_bordered_dashboard rtl:!font-[Almarai] error hover_tamkin flex items-center h-[19px] w-2/6 justify-center group max-md:!p-4"
                    >
                      <div>{{ $t("Clear") }}</div>
                    </button>
                    <button
                      @click="closePicker"
                      class="btn_bordered_dashboard rtl:!font-[Almarai] flex items-center h-[19px] justify-center max-md:!p-4"
                    >
                      <div>{{ $t("Cancel") }}</div>
                    </button>
                    <button
                      @click="selectDate"
                      class="btn-dashboard hover_tamkin rtl:!font-[Almarai] flex items-center h-[19px] w-2/6 justify-center group max-md:!p-4"
                    >
                      <div>
                        <svg
                          class="group-hover:fill-tamkin"
                          width="13"
                          height="14"
                          viewBox="0 0 13 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.15274 8.92575L3.08759 6.86047L2.35742 7.59063L5.15274 10.3861L10.8321 4.70673L10.1019
         3.97657L5.15274 8.92575Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div>{{ $t("Done") }}</div>
                    </button>
                  </div>
                </template>
                <template #input-icon>
                  <svg
                    class="ml-auto w-[10px] h-[10px] text-darkGrey dark:text-whiteTamkin"
                    :class="[
                      dateOpen && dateF
                        ? 'rotate-90 !text-white '
                        : dateOpen && !dateF
                        ? 'rotate-90'
                        : 'rotate-0 rtl:rotate-180',
                    ]"
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.1409 7.60957C10.3911 7.80973 10.3911 8.19027 10.1409
                 8.39043L1.44125 15.3501C1.11387 15.612 0.628906 15.3789 0.628906 14.9597L0.628907 
                 1.04031C0.628907 0.62106 1.11387 0.387973 1.44125 0.649878L10.1409 7.60957Z"
                      fill="currentColor"
                    />
                  </svg>
                </template>
              </VueDatePicker>
            </div>
            <div
              class="relative ltr:text-left rtl:text-right w-full lg:w-1/4 ipad-max:w-full"
            >
              <div>
                <button
                  @click.prevent="toggleDropdown"
                  v-on-click-outside="
                    () => {
                      isOpen = false;
                    }
                  "
                  type="button"
                  class="tamkin_date_input flex items-center justify-evenly text-darkGrey dark:text-whiteTamkin w-full"
                  id="options-menu"
                  :class="[isOpen ? 'bg_interval_open' : '']"
                  aria-haspopup="true"
                  aria-expanded="true"
                >
                  {{
                    selectedInterval ? selectedInterval : $t("Interval Period")
                  }}

                  <svg
                    class="rtl:mr-auto rtl:ml-[14px] ltr:ml-auto ltr:mr-[14px] w-[10px] h-[10px]"
                    :class="[
                      isOpen
                        ? 'rotate-90 !text-white '
                        : 'rotate-0 rtl:rotate-180',
                    ]"
                    @click.stop="toggleDropdown"
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.1409 7.60957C10.3911 7.80973 10.3911 8.19027 10.1409
               8.39043L1.44125 15.3501C1.11387 15.612 0.628906 15.3789 0.628906 14.9597L0.628907 
               1.04031C0.628907 0.62106 1.11387 0.387973 1.44125 0.649878L10.1409 7.60957Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              <div
                v-if="isOpen"
                class="origin-top-right absolute rtl:left-0 ltr:right-0 mt-2 w-full z-[100] rounded-md shadow-lg bg-white dark:bg-tamkinDarkPrimary ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div class="py-1" role="none">
                  <a
                    :class="[
                      selectedInterval === '7 Days'
                        ? 'custom-border-tamkin padding-override-1 no_bottom dark:bg-gray-600  bg-tamkinLight'
                        : '',
                    ]"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:dark:bg-gray-600 hover:bg-tamkinLight cursor-pointer"
                    role="menuitem"
                    @click="selectOption('7 Days')"
                    >{{ $t("7 Days") }}</a
                  >
                  <a
                    :class="[
                      selectedInterval === '14 Days'
                        ? 'custom-border-tamkin padding-override-1 no_bottom dark:bg-gray-600 bg-tamkinLight'
                        : '',
                    ]"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:dark:bg-gray-600 hover:bg-tamkinLight cursor-pointer"
                    role="menuitem"
                    @click="selectOption('14 Days')"
                    >{{ $t("14 Days") }}</a
                  >
                  <a
                    :class="[
                      selectedInterval === '1 Month'
                        ? 'custom-border-tamkin padding-override-1 no_bottom dark:bg-gray-600 bg-tamkinLight'
                        : '',
                    ]"
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:dark:bg-gray-600 hover:bg-tamkinLight cursor-pointer"
                    role="menuitem"
                    @click="selectOption('1 Month')"
                    >{{ $t("1 Month") }}</a
                  >
                  <a
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:dark:bg-gray-600 hover:bg-tamkinLight cursor-pointer"
                    role="menuitem"
                    :class="[
                      selectedInterval === '2 Months'
                        ? 'custom-border-tamkin padding-override-1 no_bottom bg-tamkinLight'
                        : '',
                    ]"
                    @click="selectOption('2 Months')"
                    >{{ $t("2 Months") }}</a
                  >
                  <a
                    class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:dark:bg-gray-600 hover:bg-tamkinLight cursor-pointer"
                    role="menuitem"
                    :class="[
                      selectedInterval === '3 Months'
                        ? 'custom-border-tamkin padding-override-1 no_bottom dark:bg-gray-600 bg-tamkinLight'
                        : '',
                    ]"
                    @click="selectOption('3 Months')"
                    >{{ $t("3 Months") }}</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="lg:mr-[-15px] lg:px-[15px] max-md:w-full">
            <div
              v-if="statsStore.loadingStats"
              class="bg-gray-200 dark:bg-p animate-pulse w-[160px] h-[32px] rounded-[13px]"
            ></div>
            <button
              v-else-if="
                !statsStore.loadingStats &&
                navStore.defaultappobj?.package?.filter(
                  (p) => p.type === 'Sign language'
                ).length > 0
              "
              @click="downloadCSV"
              :disabled="loadingDownload || (!chartDataOpens && !chartDataload)"
              class="btn-dashboard hover_tamkin flex items-center h-[30px] lg:h-[19px] !rounded-[13px] !text-[13px] !leading-[10px] justify-center w-full md:w-[160px]"
            >
              <div class="flex items-center justify-center">
                <div :class="loadingDownload ? 'rtl:ml-2 ltr:mr-2' : ''">
                  <div>{{ $t("Download CSV") }}</div>
                </div>

                <svg
                  v-if="loadingDownload"
                  class="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-start lg:space-x-[48px] rtl:space-x-reverse lg:flex-nowrap flex-wrap"
      >
        <div
          v-if="statsStore.loadingStats"
          class="animate-pulse mt-[30px] dark:bg-p bg-gray-300 rounded-[10px] h-[255px] w-full"
        ></div>
        <div
          v-else
          class="container_chart mt-[30px] p-[8px] h-[255px] w-full relative custom-border-tamkin padding-override-1 rounded-[8px] shadow-sm"
        >
          <div class="custom-legend">
            <div
              class="text-[11px] leading-[15px] text-[#616161] dark:text-whiteTamkin font-[600]"
            >
              <h3>{{ $t("Player Loads") }}</h3>
              <p class="font-[400]" v-if="dateF || selectedInterval">
                {{ $t(`${loadscountSummary}`) }}
              </p>
            </div>
            <div
              v-if="chartDataload"
              class="text-[20px] leading-[27px] font-[600] dark:text-whiteTamkin"
            >
              <div
                class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]"
                :class="{
                  positive: percentageChange.loadscountPercentageChange >= 0,
                  negative: percentageChange.loadscountPercentageChange < 0,
                }"
              >
                <img
                  :src="
                    percentageChange.loadscountPercentageChange < 0
                      ? '/assets/imgs/overview/down.svg'
                      : '/assets/imgs/overview/up.svg'
                  "
                  :class="[
                    percentageChange.loadscountPercentageChange >= 0
                      ? 'rotate-0'
                      : 'rotate-90',
                  ]"
                  class="w-[19px] h-[19px]"
                />
                <div>+{{ percentageChange.loadscountPercentageChange }}%</div>
              </div>
            </div>
          </div>

          <Line
            v-if="chartDataload"
            ref="chart12"
            :data="chartDataload"
            :options="options"
            :style="myStyles"
            :class="[navStore.sideBarOpen ? '' : 'mx-auto']"
          />
          <div v-else class="flex items-center justify-center h-full w-full">
            <h1 class="text-center dark:text-whiteTamkin">
              {{ $t("No data available yet") }}
            </h1>
          </div>
        </div>

        <div
          v-if="statsStore.loadingStats"
          class="animate-pulse mt-[30px] dark:bg-p bg-gray-300 rounded-[10px] h-[255px] w-full"
        ></div>

        <div
          v-else
          class="container_chart mt-[30px] p-[8px] w-full h-[255px] relative custom-border-tamkin padding-override-1 rounded-[8px] shadow-sm"
        >
          <div class="custom-legend">
            <div
              class="text-[11px] leading-[15px] text-[#616161] font-[600] dark:text-whiteTamkin"
            >
              <h3>{{ $t("Player Opens") }}</h3>
              <p class="font-[400]" v-if="dateF || selectedInterval">
                {{ $t(`${loadscountSummary}`) }}
              </p>
            </div>
            <div
              v-if="chartDataOpens"
              class="text-[20px] leading-[27px] font-[600] dark:text-whiteTamkin"
            >
              <div
                class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]"
                :class="{
                  positive: percentageChange.opencountPercentageChange >= 0,
                  negative: percentageChange.opencountPercentageChange < 0,
                }"
              >
                <img
                  :src="
                    percentageChange.opencountPercentageChange < 0
                      ? '/assets/imgs/overview/down.svg'
                      : '/assets/imgs/overview/up.svg'
                  "
                  class="w-[19px] h-[19px]"
                />
                <div>{{ percentageChange.opencountPercentageChange }}%</div>
              </div>
            </div>
          </div>
          <Line
            v-if="chartDataOpens"
            ref="chart2"
            :data="chartDataOpens"
            :options="options"
            :style="myStyles"
            class="w-full !mx-auto text-center"
            :class="[navStore.sideBarOpen ? '' : 'mx-auto']"
          />
          <div v-else class="flex items-center justify-center h-full w-full">
            <h1 class="text-center dark:text-whiteTamkin">
              {{ $t("No data available yet") }}
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bg_interval_open {
  @apply !text-white bg-gradient-to-b from-tamkinStart to-tamkinEnd dark:bg-tamkinDarkPrimary;

  &.tamkin {
    @apply rounded-[10px] h-[32px];
  }
}

.tamkin_date_input {
  box-shadow: 0px 1.54px 3.08px 0px #61616133;

  box-shadow: 0px 0.77px 1.54px 0px #61616133;

  @apply rtl:pr-[14px] ltr:pl-[14px] text-[15px] w-full  h-[32px] rounded-[10px] border-[1px] dark:border-darkborder border-[#585B5B8C] 
  dark:bg-tamkinDarkPrimary dark:text-whiteTamkin
  focus:!outline-0;
}
.dp__pointer::placeholder {
  @apply !text-darkGrey dark:!text-whiteTamkin opacity-100 !font-[400] font-[Poppins] rtl:font-[Almarai];
}
.tamkin_date_input::placeholder {
  @apply ltr:font-[Poppins] rtl:!font-[Almarai];
}
.dp__input.dp__input_icon_pad.dp__input_focus {
  @apply !outline-0 !ring-0 !border-[1px] !border-[#585B5B8C] font-[Poppins] rtl:font-[Almarai];
}
.dp__input {
  @apply rtl:pr-[14px] ltr:pl-[14px] text-[15px];
}
.dp__input_wrap .dp__input_icon {
  @apply ltr:right-[14px] rtl:left-[14px];
  inset-inline-start: auto !important;
}

.dp__calendar_item .dp__range_start {
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  @apply rounded-full;
}

.dp__calendar_item .dp__range_between {
  @apply bg-tamkinLight border-0;
}

.dp__calendar_item .dp__range_end {
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  @apply rounded-full;
}

.dp__calendar_item .dp__today {
  @apply rounded-full bg-white dark:bg-tamkinDarkPrimary font-[700] text-darkGrey dark:text-whiteTamkin border-[1px] 
  border-[#616161] dark:border-darkborder;
}
.dp__calendar_item .dp__today.dp__range_end {
  @apply rounded-full bg-white font-[700] !text-white !border-0 dark:bg-tamkinDarkPrimary
  dark:!text-whiteTamkin;
}
.dp__calendar_item .dp__today.dp__range_start {
  @apply rounded-full bg-white font-[700] !text-white dark:bg-tamkinDarkPrimary
  dark:!text-whiteTamkin !border-0;
}

.dp__calendar_item .dp__date_hover_start {
  @apply bg-tamkinLight;
}

.dp__calendar_item .dp__date_hover {
  @apply bg-tamkinLight;
}
.dp__inner_nav {
  @apply text-tamkin;
}

.dp--arrow-btn-nav:hover {
  @apply text-tamkin;
}
.custom-legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.legend-text h3 {
  margin: 0;
  font-size: 1.2em;
}
.legend-text p {
  margin: 0;
  font-size: 0.9em;
  color: #666;
}
.legend-percentage {
  font-size: 1.2em;
  font-weight: bold;
}
.legend-percentage .positive {
  color: green;
}
.legend-percentage .negative {
  color: red;
}

.dp__arrow_top {
  @apply rtl:top-[-6px] rtl:!rotate-45 rtl:translate-x-[50%];
}
.dp__overlay_cell_active {
  @apply bg-tamkin;
}

.dp__overlay_cell_pad:hover {
  @apply bg-tamkinLight text-darkGrey;
}

.dp__theme_dark {
  --dp-background-color: #323e50;
  --dp-text-color: #fffefe;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
.dp__calendar_header_item {
  @apply !text-[12px];
}
:root[dir="rtl"] {
  --dp-font-family: "Almarai", sans-serif !important;
}

.dp__pointer::placeholder {
  @apply rtl:!font-[Almarai];
}
</style>
