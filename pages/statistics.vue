<script lang="ts" setup>
import { useNavbarStore } from "@/stores/navbar";
import { storeToRefs } from "pinia";
import { useWindowSize } from "@vueuse/core";
import { vOnClickOutside } from "@vueuse/components";
import { useCollapseStore } from "@/stores/collapse.js";
import { useStatsStore } from "@/stores/stats.js";
import upTamkin from "/assets/imgs/up_tamkin.svg";
import { Line } from "vue-chartjs";
const langStore = useLangSwitch();
const collapseStore = useCollapseStore();
const statsStore = useStatsStore()
const navStore = useNavbarStore();
const { sideBarOpen } = storeToRefs(navStore);
const chart12 = ref("");
const chart2 = ref("");
const colorMode = useColorMode();

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

const data = ref({
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
  ], // example dates
  datasets: [
    {
      label: "My Dataset",
      data: [10, 5, 15, 20, 10, 15, 25, 10, 5], // example data
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: false,
      tension: 0.1,
    },
  ],
});

import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
definePageMeta({
  layout: "dashboard",
});

const { width, height } = useWindowSize();

// watch(width, (newWidth) => {
//   console.log(newWidth);
//   chart12.value.chart.resize(320, 320);
//   chart2.value.chart.resize(320, 320);
// });
const dateF = ref();

const dateOpen = ref(false);

const alertFn = () => {
  if (dateOpen.value) {
    dateOpen.value = false;
  } else {
    dateOpen.value = true;
  }
};

const isADHDChecked = ref(false);

const localePath = useLocalePath();
const selectDate = () => {
  dp.value.selectDate();
};
const handleDate = ()=>{
  selectedInterval.value = '';

}
const resizeCharts = () => {
  const containerWidth = document.querySelector('.container_chart')?.offsetWidth || width.value;
  const newChartWidth = navStore.sideBarOpen ? '50%' : '100%'; // Use 50% if sidebar is open, 100% if closed

  if (chart12.value && chart2.value) {
    chart12.value.chart.resize(containerWidth, 200); // Set width to containerWidth
    chart2.value.chart.resize(containerWidth, 200); // Set width to containerWidth
  }
};


// Watch for changes in the window width and sidebar state
watch(sideBarOpen, () => {
  resizeCharts();
});

watch(() => navStore.sideBarOpen, () => {
  resizeCharts();
});



const search = ref("");
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};

const isOpen = ref(false);
const percentageChange = ref(3.6);
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
const colors = ['red', 'blue', 'yellow', 'green'];


const options = ref({
  responsive: false,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      border: {
        display: false,
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
        autoSkip: true,
        maxTicksLimit: 10,
        color: (c) => {
            return colorMode.preference === 'dark' ?'white' :'black'
          },
        callback: function (value) {
          const date = new Date(value);
          const options = { month: "short", day: "numeric" };
          return date.toLocaleDateString("en-US", options);
        },
      },
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

const updateChartOptions = async (isDarkMode) => {
  if (isDarkMode === 'dark') {
        options.value.scales.x.ticks.color = '#ffffff';
      } else {
        options.value.scales.x.ticks.color = '#000000';
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
  // Initial check for dark mode
  // updateChartOptions(colorMode.preference);

  // Watch for color mode changes
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
const selectOption = (option) => {
  selectedInterval.value = option;
  isOpen.value = false;
  dateF.value = ""

};




const format = (date) => {
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
const myStyles = computed(()=>{
  return {
        height: `200px`,
        width:"100%",
        position: 'relative'
      }
})

const route = useRoute();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};
let pendingNavigation = null;

const detectUnsavedChanges = () => {
  return isLinkActive("/statistics") && statsStore.google_enabled
    
};

const handleSaveAndMove = () => {
  statsStore.saveAndMove();
  if (pendingNavigation) {
    const { next, to } = pendingNavigation;
    next(); // Proceed with the stored navigation
    pendingNavigation = null; // Clear pending navigation after proceeding
  }
};

const handleCancelLeave = () => {
  statsStore.routeLeaveModal = false; // Close the modal
};

onBeforeRouteLeave((to, from, next) => {
  if (detectUnsavedChanges()) {
    statsStore.showSaveBeforeLeaveModal();
    pendingNavigation = { next, to };
  } else {
    next(); // No unsaved changes, proceed normally
  }
});
</script>

<template>
  <div class="relative h-full w-full">
    <LazyModalsConfirm :showModal="statsStore.routeLeaveModal" title="Save  your changes"
    sub-title="Do you want to save the changes before moving on?"
    confirm-btn-type="other" @control-other="handleSaveAndMove" cancelButtonName="Discard"
    :savetoAllSitesBtn="true"
    @control-cancel="handleSaveAndMove" />
    <div class="w-full h-full relative">
      <HeaderAccess
        websiteImgName="tamkin_hand.svg"
        website-title="Tamkin.App"
        website-link="google.com"
        section-title="Statistics"
        section-sub-title="Statistics involves collecting, analyzing, and interpreting data to provide
          useful insights."
      />

      <div
        class="mt-[64px] md:mt-[94px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] shadow-md -shadow-y-[1px] px-[15px] relative"

      >
        <div
          class="flex items-center justify-start  "
        >
          <div class="pt-[24px]">
            <h1 class="text-[14px] xs:text-[12px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">Select Date Range</h1>
            <p class="font-[400] xs:text-[10px] text-[12px] lg:text-[14px] leading-[22.95px] text-darkGrey mt-[10px] dark:text-whiteTamkin">
              Select Date Range specifies start and end dates to analyze or display data.
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
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
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
            <div
            class="mini_wrap"
          >
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
            <div class="text_mini">
              Switch To Annual
            </div>
          </div>
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('select_date_range_card')"
              >
                <div>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                
                  >
                    <path d="M13.7754 10.937L18.4995 7"   class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                </div>
                <div class="text_mini">
                  {{
                    !collapseStore.collapses.includes("select_date_range_card")
                      ? "Minisize"
                      : "Maxsize"
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

        <div  v-if="!collapseStore.collapses.includes('select_date_range_card')"
          class="flex flex-col items-start justify-center  mt-[18px] lg:pb-[16px] w-full"
         
        >
          <div class="flex items-center justify-between  lg:space-y-0 space-y-4  lg:flex-nowrap flex-wrap w-full">
            <div
              class="flex items-center justify-start 
             lg:flex-nowrap flex-wrap
              rtl:space-x-reverse lg:space-y-0 space-y-4 lg:space-x-[24px]  w-full"
            >
              <div class="w-full ipad-max:w-full lg:w-1/4">
                <VueDatePicker
                  :enable-time-picker="false"
                  @blur="dateOpen = false"
                  @focus="dateOpen = true"
                  class="relative"
                  :clearable="false"
                  disable-year-select
                  month-name-format="long"
                  :input-class-name="
                    dateOpen && dateF ? 'bg_interval_open tamkin' : 'tamkin_date_input'
                  "
                  :dark="colorMode.preference === 'dark'"
                  placeholder="Select Period"
                  v-model="dateF"
                  :format="format"
                  :position="langStore.direction === 'rtl' ? 'right' : 'left'"
                  :auto-position="false"
                  range
                  :max-date="new Date()"
                  @update:model-value="handleDate" 
                >
                  <template #action-row="{ closePicker, selectDate }">
                    <div
                      class="flex items-center justify-end rtl:space-x-reverse space-x-[16px] w-full"
                    >
                      <button
                        @click="closePicker"
                        class="btn_bordered_dashboard flex items-center h-[19px] justify-center"
                      >
                        <div>Cancel</div>
                      </button>
                      <button
                        @click="selectDate"
                        class="btn-dashboard hover_tamkin flex items-center h-[19px] w-2/6 justify-center group"
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
                        <div>Done</div>
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
                          : 'rotate-0',
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
              <div class="relative ltr:text-left rtl:text-right w-full lg:w-1/4 ipad-max:w-full">
                <div>
                  <button
                    @click="toggleDropdown"
                    type="button"
                    class="tamkin_date_input flex items-center justify-evenly text-darkGrey dark:text-whiteTamkin w-full"
                    id="options-menu"
                    :class="[isOpen ? 'bg_interval_open' : '']"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {{ selectedInterval ? selectedInterval : "Interval Period" }}

                    <svg
                      class="rtl:mr-auto rtl:ml-[14px] ltr:ml-auto ltr:mr-[14px] w-[10px] h-[10px]"
                      :class="[isOpen ? 'rotate-90 !text-white ' : 'rotate-0']"
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
                  v-on-click-outside="() => toggleDropdown"

                  class="origin-top-right absolute rtl:left-0 ltr:right-0 mt-2 w-full z-[100] rounded-md shadow-lg bg-white dark:bg-tamkinDarkPrimary  ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div class="py-1" role="none">
                    <a
                    
                      :class="[
                        selectedInterval === '7 Days'
                          ? 'custom-border-tamkin padding-override-1 no_bottom bg-tamkinLight'
                          : '',
                      ]"
                      class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:bg-tamkinLight"
                      role="menuitem"
                      @click="selectOption('7 Days')"
                      >7 Days</a
                    >
                    <a
                    
                      :class="[
                        selectedInterval === '14 Days'
                          ? 'custom-border-tamkin padding-override-1 no_bottom bg-tamkinLight'
                          : '',
                      ]"
                      class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:bg-tamkinLight"
                      role="menuitem"
                      @click="selectOption('14 Days')"
                      >14 Days</a
                    >
                    <a
                    
                      :class="[
                        selectedInterval === '1 Month'
                          ? 'custom-border-tamkin padding-override-1 no_bottom bg-tamkinLight'
                          : '',
                      ]"
                      class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:bg-tamkinLight"
                      role="menuitem"
                      @click="selectOption('1 Month')"
                      >1 Month</a
                    >
                    <a
                    
                      class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:bg-tamkinLight"
                      role="menuitem"
                      :class="[
                        selectedInterval === '2 Months'
                          ? 'custom-border-tamkin padding-override-1 no_bottom bg-tamkinLight'
                          : '',
                      ]"
                      @click="selectOption('2 Months')"
                      >2 Months</a
                    >
                    <a
                    
                      class="block px-4 py-2 text-sm text-gray-700 dark:text-whiteTamkin hover:bg-tamkinLight"
                      role="menuitem"
                      :class="[
                        selectedInterval === '3 Months'
                          ? 'custom-border-tamkin padding-override-1 no_bottom bg-tamkinLight'
                          : '',
                      ]"
                      @click="selectOption('3 Months')"
                      >3 Months</a
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="lg:mr-[-15px] lg:px-[15px] ">
              <button
                class="btn-dashboard hover_tamkin flex items-center h-[30px] lg:h-[19px]  !rounded-[13px] 
                !text-[13px] !leading-[10px] justify-center w-[130px]"
              >
                <div>Download CSV</div>
              </button>
            </div>
          </div>

         
        </div>
        <div class="flex items-center justify-start lg:space-x-[48px] lg:flex-nowrap flex-wrap  "  v-if="!collapseStore.collapses.includes('select_date_range_card')">
          <div  class="container_chart mt-[30px] h-[255px]  w-full  p-[8px] relative custom-border-tamkin 
          padding-override-1 rounded-[8px] shadow-sm">
            <div class="custom-legend" >
              <div class="text-[11px] leading-[15px] text-[#616161] dark:text-whiteTamkin font-[600]">
                <h3>Widget Loads</h3>
                <p class="font-[400]">5 Times during 7 days</p>
              </div>
              <div class="text-[20px] leading-[27px] font-[600] dark:text-whiteTamkin">
                <div class="flex items-center justify-center rtl:space-x-reverse space-x-[6px] " :class="{ positive: percentageChange >= 0, negative: percentageChange < 0 }">
                  <img  src="/assets/imgs/overview/up.svg" :class="[percentageChange >= 0 ? 'rotate-0' : 'rotate-90']"  class="w-[19px] h-[19px]" />
                  <div>+{{ percentageChange }}%</div>
                </div>
              </div>
            </div>
          
              <Line ref="chart12" :data="chartData" :options="options" :style="myStyles" 
            :class="[navStore.sideBarOpen ? '':'mx-auto']"  />
           
          </div>
      
          <div   class="container_chart mt-[30px] w-full h-[255px] p-[8px] relative custom-border-tamkin padding-override-1 rounded-[8px] shadow-sm">
            <div class="custom-legend">
              <div class="text-[11px] leading-[15px] text-[#616161] font-[600] dark:text-whiteTamkin">
                <h3>Widget Opens</h3>
                <p class="font-[400]">5 Times during 7 days</p>
              </div>
              <div class="text-[20px] leading-[27px] font-[600] dark:text-whiteTamkin">
                <div class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]" :class="{ positive: percentageChange >= 0, negative: percentageChange < 0 }">
                  <img  src="/assets/imgs/overview/down.svg"   class="w-[19px] h-[19px]" />
                  <div>-{{ percentageChange }}%</div>
                </div>
              </div>
            </div>
            <Line ref="chart2" :data="chartData" :options="options" :style="myStyles" :class="[navStore.sideBarOpen ? '':'mx-auto']" />
          </div>
        </div>
   
      </div>

      <div
        class="mt-[30px] bg-white  dark:bg-tamkinDarkPrimary rounded-[10px]
         px-[15px] pb-[24px] shadow-md -shadow-y-[1px] relative"
        
      >
        <div class="flex items-center justify-start ">
          <div class="pt-[24px]">
            <h1 class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">Usage stats by function</h1>
            <p class="font-[400] text-[12px] lg:text-[14px] leading-[22.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]">
              Usage stats by function show how each feature is used in a system or app.
            </p>
          </div>
          <div
            @click.stop="collapseStore.collapseMenu('usage_stats')"
            v-on-click-outside="() => collapseStore.removeMenu('usage_stats')"

            :class="[
              collapseStore.menus.includes('usage_stats')
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
                collapseStore.menus.includes('usage_stats')
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="collapseStore.menus.includes('usage_stats')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="mini_SizeMenu "
            >
            <div
            class="mini_wrap"
          >
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
            <div class="text_mini">
              Switch To Annual
            </div>
          </div>
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('usage_stats_card')"
              >
                <div>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                
                  >
                    <path d="M13.7754 10.937L18.4995 7"   class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                </div>
                <div class="text_mini">
                  {{
                    !collapseStore.collapses.includes("usage_stats_card")
                      ? "Minisize"
                      : "Maxsize"
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
          class="w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg lg:overflow-x-hidden overflow-x-auto"
          v-if="!collapseStore.collapses.includes('usage_stats_card')"
        >
          <table class="min-w-full  leading-normal">
            <thead>
              <tr>
                <th
                  class="py-3 border-b-2 border-gray-200 dark:text-whiteTamkin dark:border-[#333333] ltr:text-left
                   rtl:text-right text-[10px] lg:text-[14px] font-[400] leading-[18px] text-black w-2/4"
                >
                  Function
                </th>
                <th
                  class="py-3 border-b-2 border-gray-200 dark:text-whiteTamkin dark:border-[#333333] 
                   ltr:!text-left rtl:!text-right text-[10px] lg:text-[14px] font-[400] lg:leading-[18px] text-black"
                >
                  Time Enabled
                </th>
                <th
                  class="py-3 border-b-2 border-gray-200 dark:border-[#333333]
                   dark:text-whiteTamkin  rtl:!text-left ltr:!text-right text-[10px] lg:text-[14px]
                    font-[400] lg:leading-[18px] text-black"
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-[#FAFCFE] dark:bg-tamkinDarkPrimary h-[56px]">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/icons/tamkin_player.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px] "
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Tamkin Player</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/icons/media_player.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Media player</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/language sign.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Screen Reader</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/page_str.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Page Structure</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/hide_images.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Hide Images</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 10, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/contrast.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Smart Contrast</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 10, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/voice_navigation.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">
                        Voice Navigation
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/a-z.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Dictionary</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/clip.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Highlight Links</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/line_height.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Line Height</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/saturation.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Saturation</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/text.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Bigger Text</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/pause.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Pause Animation</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/tooltip.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Tooltip</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/cursor.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Cursor</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/text_spacing.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Text Spacing</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/contrast_plus.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Contrast +</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/icons/reading_mode.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Reading Mode</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>
              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/icons/df.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Dyslexia Friendly</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/icons/text_align.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Text Align</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] relative px-[15px] pb-[24px] mb-[30px] shadow-md -shadow-y-[1px]"
        
      >
        <div class="flex items-center justify-start ">
          <div class="pt-[24px]">
            <h1 class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">Usage stats by Profile</h1>

            <p class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] mt-[10px] dark:text-whiteTamkin">
              Usage stats by profile show how each feature is used in a system or app.
            </p>
          </div>

          <div
            @click="collapseStore.collapseMenu('usage_stats_profile')"
            v-on-click-outside="() => collapseStore.removeMenu('usage_stats_profile')"

            :class="[
              collapseStore.menus.includes('usage_stats_profile')
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
                collapseStore.menus.includes('usage_stats_profile')
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="collapseStore.menus.includes('usage_stats_profile')"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="mini_SizeMenu divide-y"
            >
            <div
            class="mini_wrap"
          >
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
            <div class="text_mini">
              Switch To Annual
            </div>
          </div>
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('usage_stats_profile_card')"
              >
                <div>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                
                  >
                    <path d="M13.7754 10.937L18.4995 7"   class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                </div>
                <div class="text_mini">
                  {{
                    !collapseStore.collapses.includes("usage_stats_profile_card")
                      ? "Minisize"
                      : "Maxsize"
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
          class="w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg overflow-hidden"
          v-if="!collapseStore.collapses.includes('usage_stats_profile_card')"
        >
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="py-3 border-b-2 border-gray-200 bg-white
                   dark:bg-tamkinDarkPrimary dark:text-whiteTamkin dark:border-darkborder 
                   ltr:text-left rtl:text-right text-[10px] lg:text-[14px] font-[400] lg:leading-[18px] text-black w-2/4"
                >
                  Function
                </th>
                <th
                  class="py-3 border-b-2 border-gray-200 bg-white dark:bg-tamkinDarkPrimary
                   dark:text-whiteTamkin dark:border-darkborder ltr:!text-left rtl:!text-right text-[10px] lg:text-[14px] font-[400] lg:leading-[18px] text-black"
                >
                  Time Enabled
                </th>
                <th
                  class="py-3 border-b-2 border-gray-200 bg-white dark:bg-tamkinDarkPrimary
                   dark:text-whiteTamkin dark:border-darkborder ltr:!text-right rtl:!text-left text-[10px] lg:text-[14px] font-[400] lg:leading-[18px] text-black"
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/monitor_im.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Motor impaired</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/color_blind.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Color blind</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/vis_impaired.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">
                        Visually-impaired
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 10, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/seizure.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">
                        Seizure & Epileptic
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 10, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/blind.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Blind</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/df.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Dyslexia</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/congitive.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">
                        Congitive & Learning
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px] dark:bg-tamkinDarkPrimary">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/addons/adhd.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">ADHD</p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        
        class="shadow-md -shadow-y-[1px] flex items-center justify-center rtl:space-x-reverse space-x-[13px] 
        dark:bg-tamkinDarkPrimary bg-white w-full h-[114px] px-[18px] border-[1px] border-lightGrey dark:border-darkborder rounded-[10px]"
      >
        <div class="flex items-center justify-start flex-1">
          <div>
            <img 
              src="/assets/imgs/google_analytics.svg"
              
              class="w-[71px] h-[63px]"
            />
          </div>
          <div class="ml-[13px]">
            <h1 class="text-[12px] lg:text-[16px] leading-[22px] font-[500] text-[#23262F] dark:text-whiteTamkin">
              Google Analytics
            </h1>
            <p class="text-[10px] lg:text-[14px] truncate  w-32 lg:leading-[19px] text-[#585B5B]  dark:text-whiteTamkin font-[400] mt-[8px]">
              Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit
              nesciunt esse sint aperiam aliquid
            </p>
          </div>
        </div>
        <div class="ml-auto flex items-center">
          <label for="toggle_google_a" class="toggle_wrap">
            <input
              type="checkbox"
              id="toggle_google_a"
              class="sr-only"
              v-model="statsStore.google_enabled"
            />
            <div class="toggle_parent" :class="[statsStore.google_enabled ? 'active' : 'in_active']">
              <div class="toggle_inner" :class="{ active: statsStore.google_enabled }">
                <img 
                  v-if="statsStore.google_enabled"
                  src="/assets/imgs/addons/active_toggle.svg"
                  class="w-[28px] h-[28px]"
                  
                />
                <img 
                  v-else
                  src="/assets/imgs/addons/toggle.svg"
                  class="w-[28px] h-[28px]"
                  
                />
              </div>
            </div>
          </label>
        </div>
      </div>

      <div
        class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[32px] 
        pt-[48px] mb-[40px] relative shadow-md -shadow-y-[1px] px-[15px]"
        
      >
        <div class="flex flex-col items-start  justify-start  w-full">
          <div >
            <h1
              class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
              :class="[
                !collapseStore.collapses.includes('live_translation_stats_card')
                  ? 'mt-[-24px]'
                  : 'mt-[-24px]',
              ]"
            >
              Live Translation
            </h1>

            <p
              class="text-[12px] lg:w-3/4 ipad-max:w-3/4 lg:text-[14px] leading-[24px] font-[400]
             text-[#585B5B] mt-[10px] dark:text-whiteTamkin "
            >
              Live translation converts speech or text from one language to another
              instantly, facilitating real-time communication.
            </p>
          </div>

          <div
            class="flex flex-col items-center justify-center mt-[-24px] space-y-[24px] relative w-full"
          >
            <div
              @click.stop="collapseStore.collapseMenu('live_translation_stats')"
              v-on-click-outside="() => collapseStore.removeMenu('live_translation_stats')"

              :class="[
                collapseStore.menus.includes('live_translation_stats')
                  ? 'active_notification !text-darkGrey'
                  : '',

                collapseStore.collapses.includes('live_translation_stats_card')
                  ? 'top-[-20px] right-[0]'
                  : 'top-[16px] right-[0]',
              ]"
              class="menu_button_control lg:!top-[-67px] ipad-max:!top-[-86px] xs:!top-[-100px]"
            >
              <svg
                width="18"
                height="5"
                viewBox="0 0 18 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="[
                  collapseStore.menus.includes('live_translation_stats')
                    ? 'stroke-current !text-white !fill-white'
                    : 'dark:!text-white',
                ]"
              >
                <path
                  d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                  fill="currentColor"
                />
              </svg>

              <div
                v-if="collapseStore.menus.includes('live_translation_stats')"
           
                style="box-shadow: 0px 2px 6px 0px #00000040"
                class="mini_SizeMenu divide-y"
              >
              <div
              class="mini_wrap"
            >
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
              <div class="text_mini">
                Switch To Annual
              </div>
            </div>
                <div
                  class="mini_wrap"
                  @click="collapseStore.collapseCard('live_translation_stats_card')"
                >
                  <div>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                
                    >
                      <path d="M13.7754 10.937L18.4995 7"   class="dark:!stroke-white stroke-darkGrey"
                      stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
  
  
                  </div>
                  <div class="text_mini">
                    {{
                      !collapseStore.collapses.includes("live_translation_stats_card")
                        ? "Minisize"
                        : "Maxsize"
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
          v-if="!collapseStore.collapses.includes('live_translation_stats_card')"
          class="flex items-center justify-start ml-auto mr-[15px] h-[105px] rounded-[10px] w-full ipad-max:w-full lg:w-[369px] 
          custom-border  bg-tamkin-main-bg dark:bg-p"
      
        >
          <div
            class="circular-progress big bg-white dark:bg-transparent rounded-full rtl:mr-[10px] ltr:ml-[10px]"
          >
            <svg viewBox="0 0 36 36" class=" " width="60" height="60">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color: #bb67ff; stop-opacity: 1" />
                  <stop offset="100%" style="stop-color: #ff5a7b; stop-opacity: 1" />
                </linearGradient>
              </defs>
              <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
              <circle
                class="progress-circle"
                cx="18"
                cy="18"
                r="15.91549431"
                style="stroke-dasharray: 80, 100"
              ></circle>
            </svg>
            <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
              <div class="flex flex-col items-center justify-center">
                <div>5%</div>
                <div>1 M</div>
              </div>
            </div>
          </div>
  
          <div
            class=" flex flex-col items-center justify-center w-full space-y-[8px] px-[24px] dark:text-whiteTamkin"
          >
            <div class="flex items-center justify-between w-full">
              <div class="text-[13px] font-[400] leading-[19px]">Used</div>
              <div class="text-[13px] font-[600] leading-[19px]">5.78%</div>
            </div>
  
            <div class="flex items-center justify-between w-full">
              <div class="text-[13px] font-[400] leading-[19px]">User Assistance</div>
              <div class="text-[13px] font-[600] leading-[19px]">20</div>
            </div>
            <div class="flex items-center justify-between w-full">
              <div class="text-[13px] font-[400] leading-[19px]">
                Pages Translated
              </div>
              <div class="text-[13px] font-[600] leading-[19px]">5</div>
            </div>
          </div>
        </div>
        </div>
     
        <div
          class="w-full px-[16px] mt-[24px] mx-auto bg-white rounded-lg overflow-hidden dark:bg-tamkinDarkPrimary"
          v-if="!collapseStore.collapses.includes('live_translation_stats_card')"
        >
          <h1 class="text-[14px] lg:text-[18px] font-[500] leading-[26px] mb-[24px] dark:text-whiteTamkin">
            Translated languages
          </h1>

          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="py-3 border-b-2 w-full border-gray-200 bg-white dark:bg-tamkinDarkPrimary dark:border-darkborder dark:text-whiteTamkin ltr:text-left rtl:text-right text-[14px] font-[400] leading-[18px] text-black"
                >
                  languages
                </th>

                <th
                  class="py-3 border-b-2 w-full border-gray-200 bg-white dark:bg-tamkinDarkPrimary dark:border-darkborder dark:text-whiteTamkin text-right text-[14px] font-[400] leading-[18px] text-black"
                >
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white dark:bg-tamkinDarkPrimary dark:border-darkborder h-[56px]">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/arabic.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">Arabic</p>
                    </div>
                  </div>
                </td>

                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-white h-[56px] dark:bg-tamkinDarkPrimary dark:border-darkborder ">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div
                    class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
                  >
                    <div>
                      <img 
                        src="/assets/imgs/english.svg"
                        class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                        
                      />
                    </div>
                    <div class="">
                      <p class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin">English</p>
                    </div>
                  </div>
                </td>

                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <h1 class="text-[14px] lg:text-[18px] font-[500] leading-[26px] my-[24px] dark:text-whiteTamkin">
            Pages Translated
          </h1>

          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="py-3 border-b-2 w-full border-gray-200 dark:bg-tamkinDarkPrimary dark:border-darkborder  bg-white dark:text-whiteTamkin ltr:text-left rtl:text-right text-[14px] font-[400] leading-[18px] text-black"
                >
                  Page
                </th>

                <th
                  class="py-3 border-b-2 w-full border-gray-200 bg-white dark:bg-tamkinDarkPrimary dark:border-darkborder dark:text-whiteTamkin  text-right text-[14px] font-[400] leading-[18px] text-black"
                >
                  Usage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white h-[56px] dark:bg-tamkinDarkPrimary ">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="flex items-start flex-col justify-center">
                    <div class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin text-black">
                      /Page
                    </div>
                    <div class="">
                      <p class="text-[10px] leading-[13px] font-[400] text-[#979897] dark:text-whiteTamkin">
                        Translated by 10 user
                      </p>
                    </div>
                  </div>
                </td>

                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      80%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-white dark:bg-tamkinDarkPrimary  h-[56px]">
                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="flex items-start flex-col justify-center">
                    <div class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin text-black">
                      /Page
                    </div>
                    <div class="">
                      <p class="text-[10px] leading-[13px] font-[400] text-[#979897] dark:text-whiteTamkin">
                        Translated by 10 user
                      </p>
                    </div>
                  </div>
                </td>

                <td class="border-b border-gray-200 text-sm dark:border-darkborder">
                  <div class="circular-progress rtl:mr-auto ltr:ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop
                            offset="0%"
                            style="stop-color: #bb67ff; stop-opacity: 1"
                          />
                          <stop
                            offset="100%"
                            style="stop-color: #ff5a7b; stop-opacity: 1"
                          />
                        </linearGradient>
                      </defs>
                      <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 10, 100"
                      ></circle>
                    </svg>
                    <div class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin">
                      10%
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
   
      </div>
    </div>
  </div>
</template>

<style>
.toggle {
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #eef5ff 47.07%,
    #f6f3fc 72.04%,
    #fef5f6 100%
  );
  box-shadow: 0px 4px 24px 8px rgba(81, 69, 159, 0.1);
}
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
  @apply !text-darkGrey dark:!text-whiteTamkin opacity-100 !font-[400] font-[Poppins];
}

.dp__input.dp__input_icon_pad.dp__input_focus {
  @apply !outline-0 !ring-0 !border-[1px] !border-[#585B5B8C];
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

.dp__overlay_cell_pad:hover{

  @apply bg-tamkinLight text-darkGrey;
}



.dp__theme_dark {
  --dp-background-color: #323E50;
  --dp-text-color: #FFFEFE;
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
</style>
