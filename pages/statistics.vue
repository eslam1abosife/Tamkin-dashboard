<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import mysiteAnimation from "~/assets/animation/mysite.json";
import { useModalStore } from "@/stores/modal";
import { useNavbarStore } from "@/stores/navbar";
import { storeToRefs } from 'pinia'

const navStore = useNavbarStore();
const {sideBarOpen} = storeToRefs(navStore)

import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
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

import upTamkin from "/assets/imgs/up_tamkin.svg";
import { Line } from "vue-chartjs";

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
const state = reactive({
  teamName: "",
});
const rules = {
  teamName: { required },
};

const dateF = ref();
const v$ = useVuelidate(rules, state);
const modalStore = useModalStore();
const dataAvailable = ref(true);
const editTeamNameMode = ref(false);
const dateOpen = ref(false);

const alertFn = () => {
  if (dateOpen.value) {
    dateOpen.value = false;
  } else {
    dateOpen.value = true;
  }
};
const currentTab = ref("saved");

const switchTab = (tab: any) => {
  currentTab.value = tab;
};

const checked = ref([]);
const deletedSites = ref([
  { id: "1", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "2", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "3", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "4", name: "Tamkin", image: "https://via.placeholder.com/24" },
]);

const checkAll = computed({
  get() {
    return (
      deletedSites.value && checked.value.length === deletedSites.value.length
    );
  },
  set(value) {
    checked.value = value ? deletedSites.value.map((lang) => lang.id) : [];
  },
});
const localePath = useLocalePath();
const selectDate = () => {
  

  dp.value.selectDate();
};
const isSearchfilled = ref(false);
const chart1 = ref(null);
const chart2 = ref(null);
watch(sideBarOpen, async (newVal) => {
  await nextTick();
  chart1.value.chart.resize(100,100);
  chart2.value.chart.resize(100,100);
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
const openMenuResize = (typeMenu: any) => {
  if (typeMenu === "adjust") {
    openResizeMenuAdjust.value = !openResizeMenuAdjust.value;
  }
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

const options = ref({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false, // This will remove the legend
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // This will remove the grid lines on the x-axis
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
        callback: function (value) {
          const date = new Date(value);
          const options = { month: "short", day: "numeric" };
          return date.toLocaleDateString("en-US", options);
        },
      },
    },
    y: {
      grid: {
        display: false, // This will remove the grid lines on the x-axis
      },
      ticks: {
        display: false, // This will remove the labels from the y-axis
      },
    },
  },
});
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
const selectedInterval = ref("");
const selectOption = (option) => {
  selectedInterval.value = option;
  isOpen.value = false;
};
const route = useRoute();
const isLinkActive = (path) => {
  //   const localePath = this.$i18n.localePath(path);
  return route.path === localePath(path);
};


const isADHDChecked = ref(false);

const openResizeMenuManage = ref(false);
const openResizeMenuAdjust = ref(false);
const miniSizeManage = ref(false);
const miniSizeAdjust = ref(false);
const miniSizeLiveTranslation = ref(false);
const openResizeMenuLiveTranslationStats =ref(false)
const openResizeMenuLiveTranslataion = ref(false);
const annual_prices = ref(false);
// In case of a range picker, you'll receive [Date, Date]
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

const liveTranslationMiniSize = () => {

    miniSizeLiveTranslation.value = !miniSizeLiveTranslation.value;
  
};

const liveTranslationStats= ref(false)
</script>

<template>
  <div class="relative h-full w-full">
    <div class="mt-[23px] w-full h-full relative">
      <div class="space-y-[10px]">
        <h1 class="text-left text-[24px] leading-[36px] font-[600]">
          Statistics
        </h1>

        <h2
          class="text-left text-[15px] font-[400] leading-[22.5px] text-darkGrey"
        >
          Statistics involves collecting, analyzing, and interpreting data to
          provide useful insights.
        </h2>
      </div>

      <div
        class="relative ipad-max:-mx-6 mt-[5px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col w-full justify-center lg:justify-start"
      >
        <div
          class="flex items-center lg:flex-row flex-col justify-start py-[23px] w-full rounded-[10px]"
        >
          <div class="w-full space-y-[16px]">
            <div class="flex flex-col lg:flex-row items-center justify-between">
              <div class="flex items-center justify-start space-x-[8px]">
                <div
                  class="flex items-center justify-center bg-white w-[60px] h-[60px] custom-border-tamkin custom-border-tamkin-rounded rounded-full"
                  style="box-shadow: 0px 4px 24px 8px #51459f1a"
                >
                  <img src="/assets/imgs/tamkin_hand.svg" alt="" />
                </div>
                <div class="flex items-center space-x-[16px]">
                  <!-- <h2 class="font-[600] text-[16px] leading-[24px] text-[#C5C5C5]">Select Site</h2> -->
                  <div>
                    <h2
                      class="font-[600] text-[16px] leading-[24px] text-darkGrey"
                    >
                      Tamkin.App
                    </h2>
                  </div>
                  <div>
                    <a
                      href=""
                      class="text-tamkin font-[600] text-[16px] leading-[24px] flex ]"
                      >Visit Site
                      <img
                        src="/assets/imgs/icons/external_link.svg"
                        class="ml-[14px]"
                        alt=""
                    /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="w-full mx-auto h-[43px] rounded-[22px] bg-white flex items-center px-[20px] justify-around"
      >
        <nuxt-link class="sub_menu_item">Overview</nuxt-link>
        <nuxt-link class="sub_menu_item"
        :class="[
          isLinkActive('/addons') ? 'active_subNavb' : 'sub_menu_item',
        ]"
        :to="localePath('/addons')"
        >Addons</nuxt-link>
        <nuxt-link
             :to="localePath('/statistics')"
          :class="[
            isLinkActive('/statistics') ? 'active_subNavb' : 'sub_menu_item',
          ]"
        >
          Statistics
        </nuxt-link>
        <nuxt-link 
        :to="localePath('/customize')"
        
        :class="[
          isLinkActive('/customize') ? 'active_subNavb' : 'sub_menu_item',
        ]">Customize</nuxt-link>
        <nuxt-link class="sub_menu_item"     :class="[
          isLinkActive('/settings') ? 'active_subNavb' : 'sub_menu_item',
        ]">Settings</nuxt-link>
      </div>
      <div class="mt-[30px] bg-white rounded-[10px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Select Date Range
            </h1>
            <p
              class="font-[400] text-[15px] leading-[22.95px] text-darkGrey mt-[10px]"
            >
              Select Date Range specifies start and end dates to analyze or
              display data.
            </p>
          </div>

          <div
            @click.stop="openMenuResize('adjust')"
            :class="[
              openResizeMenuAdjust ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ml-auto mr-[15px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeMenuAdjust
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
              v-if="openResizeMenuAdjust"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="miniSizeAdjust = !miniSizeAdjust"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[openResizeMenuAdjust ? '!fill-white' : '']"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
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

        <div
          class="flex flex-col items-start justify-center px-[15px] mt-[18px]  pb-[16px] overflow-hidden"
          v-if="!miniSizeAdjust"
        >
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center justify-start space-x-[24px] w-full">
              <div class="w-1/4">
                <VueDatePicker
                  :enable-time-picker="false"
                  @blur="dateOpen = false"
                  @focus="dateOpen = true"
                  class="relative"
                  :clearable="false"
                  disable-year-select
                  month-name-format="long"
                  :input-class-name="
                    dateOpen && dateF
                      ? 'bg_interval_open tamkin'
                      : 'tamkin_date_input'
                  "
                  placeholder="Select Period"
                  v-model="dateF"
                  :format="format"
                  position="left"
                  :auto-position="false"
                  range
                  :max-date="new Date()"
                >
                  <template #action-row="{ closePicker, selectDate }">
                    <div
                      class="flex items-center justify-end space-x-[16px] w-full"
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
                      class="ml-auto w-[10px] h-[10px] text-darkGrey"
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
              <div class="relative text-left w-1/4">
                <div>
                  <button
                    @click="toggleDropdown"
                    type="button"
                    class="tamkin_date_input flex items-center justify-evenly text-darkGrey"
                    id="options-menu"
                    :class="[isOpen ? 'bg_interval_open' : '']"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {{
                      selectedInterval ? selectedInterval : "Interval Period"
                    }}

                    <svg
                      class="ml-auto mr-[14px] w-[10px] h-[10px]"
                      :class="[isOpen ? 'rotate-90 !text-white ' : 'rotate-0']"
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
                  v-show="isOpen"
                  class="origin-top-right absolute right-0 mt-2 w-56 z-[100] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <div class="py-1" role="none">
                    <a
                      href="#"
                      :class="[
                        selectedInterval === '7 Days'
                          ? 'custom-border-tamkin padding-override-1 no_bottom bg-tamkinLight'
                          : '',
                      ]"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-tamkinLight"
                      role="menuitem"
                      @click="selectOption('7 Days')"
                      >7 Days</a
                    >
                    <a
                      href="#"
                      :class="[
                        selectedInterval === '14 Days'
                          ? 'custom-border-tamkin padding-override-1 no_bottom bg-tamkinLight'
                          : '',
                      ]"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-tamkinLight"
                      role="menuitem"
                      @click="selectOption('14 Days')"
                      >14 Days</a
                    >
                    <a
                      href="#"
                      :class="[
                        selectedInterval === '1 Month'
                          ? 'custom-border-tamkin padding-override-1 no_bottom bg-tamkinLight'
                          : '',
                      ]"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-tamkinLight"
                      role="menuitem"
                      @click="selectOption('1 Month')"
                      >1 Month</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-tamkinLight"
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
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-tamkinLight"
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
            <div class="2xl:w-[160px] lg:w-[170px] ">
              <button
                class="btn-dashboard hover_tamkin flex items-center h-[19px] w-full !rounded-[13px] !text-[14px] !leading-[24px] justify-center"
              >
                <div>Download CSV</div>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-start w-full lg:space-x-[31px] lg:flex-row flex-col overflow-x-hidden">
            <div
              class="mt-[30px] w-full p-[8px] relative custom-border-tamkin padding-override-1 rounded-[8px]"
              style="box-shadow: 0px 0px 3.9px 0px #00000040"
            >
              <div class="custom-legend">
                <div
                  class="text-[11px] leading-[15px] text-[#616161] font-[600]"
                >
                  <h3>Widget Loads</h3>
                  <p class="font-[400]">5 Times during 7 days</p>
                </div>
                <div class="text-[20px] leading-[27px] font-[600]">
                  <div
                    class="flex items-center justify-center space-x-[6px]"
                    :class="{
                      positive: percentageChange >= 0,
                      negative: percentageChange < 0,
                    }"
                  >
                    <img
                      :src="upTamkin"
                      :class="[
                        percentageChange >= 0 ? 'rotate-0' : 'rotate-90',
                      ]"
                      alt=""
                      class="w-[19px] h-[19px]"
                    />
                    <div>{{ percentageChange }}%</div>
                  </div>
                </div>
              </div>
              <Line
              ref="chart12"
                :data="chartData"
                :options="options"
                class="w-full h-[293px]"
              />
            </div>

            <div
              class="mt-[30px]  w-full p-[8px] relative custom-border-tamkin padding-override-1 rounded-[8px]"
              style="box-shadow: 0px 0px 3.9px 0px #00000040"
            >
              <div class="custom-legend">
                <div
                  class="text-[11px] leading-[15px] text-[#616161] font-[600]"
                >
                  <h3>Widget Opens</h3>
                  <p class="font-[400]">5 Times during 7 days</p>
                </div>
                <div class="text-[20px] leading-[27px] font-[600]">
                  <div
                    class="flex items-center justify-center space-x-[6px]"
                    :class="{
                      positive: percentageChange >= 0,
                      negative: percentageChange < 0,
                    }"
                  >
                    <img
                      :src="upTamkin"
                      :class="[
                        percentageChange >= 0 ? 'rotate-0' : 'rotate-90',
                      ]"
                      alt=""
                      class="w-[19px] h-[19px]"
                    />
                    <div>{{ percentageChange }}%</div>
                  </div>
                </div>
              </div>
              <Line
              ref="chart2"

                :data="chartData"
                :options="options"
                class="w-full h-[293px]"
              />
            </div>
          </div>
        </div>

        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Usage stats by function
            </h1>
            <p
              class="font-[400] text-[15px] leading-[22.95px] text-darkGrey mt-[10px]"
            >
              Usage stats by function show how each feature is used in a system
              or app.
            </p>
          </div>
          <div
            @click="openResizeMenuManage = !openResizeMenuManage"
            :class="[
              openResizeMenuManage ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ml-auto mr-[15px] flex 
            items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeMenuManage
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
              v-if="openResizeMenuManage"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="miniSizeManage = !miniSizeManage"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[openResizeMenuManage ? '!fill-white' : '']"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
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

        <div
          class="w-full px-[16px] mt-[24px] mx-auto bg-white  rounded-lg overflow-hidden"
          v-if="!miniSizeManage"
        >
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="py-3 border-b-2 border-gray-200 bg-white text-left text-[14px] font-[400] leading-[18px] text-black"
                >
                  Function
                </th>
                <th
                  class="py-3 border-b-2 border-gray-200 bg-white text-left text-[14px] font-[400] leading-[18px] text-black"
                >
                  Time Enabled
                </th>
                <th
                  class="py-3 border-b-2 border-gray-200 bg-white text-right text-[14px] font-[400] leading-[18px] text-black"
                >
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/language sign.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Screen Reader
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      80%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/page_str.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Page Structure
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      80%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/hide_images.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Hide Images
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 10, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/contrast.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Smart Contrast
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 10, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/voice_navigation.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Voice Navigation
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/a-z.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Dictionary
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/clip.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Highlight Links
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/line_height.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Line Height
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/saturation.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Saturation
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/text.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Bigger Text
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/pause.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Pause Animation
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/tooltip.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Tooltip
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/cursor.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Cursor
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/text_spacing.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Text Spacing
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>

              <tr class="bg-[#FAFCFE] h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-center justify-start space-x-[9px]">
                    <div>
                      <img
                        src="/assets/imgs/addons/contrast_plus.svg"
                        class="w-[36px] h-[36px]"
                        alt=""
                      />
                    </div>
                    <div class="">
                      <p class="text-[14px] leading-[19px] font-[400]">
                        Contrast +
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <p class="text-[14px] leading-[19px] font-[400]">13</p>
                </td>
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 30, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px] pb-[24px] mb-[40px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Usage stats by Profile
            </h1>

            <p
              class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
            >
              Usage stats by profile show how each feature is used in a system
              or app.
            </p>
          </div>

          <div
            @click="
              openResizeMenuLiveTranslataion = !openResizeMenuLiveTranslataion
            "
            :class="[
              openResizeMenuLiveTranslataion
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class="relative ml-auto mr-[15px] mt-[-24px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeMenuLiveTranslataion
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
              v-if="openResizeMenuLiveTranslataion"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
        

              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="liveTranslationMiniSize"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[
                      openResizeMenuLiveTranslataion ? '!fill-white' : '',
                    ]"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

           
             
              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
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
        <div
        class="w-full px-[16px] mt-[24px] mx-auto bg-white rounded-lg overflow-hidden"
        v-if="!miniSizeLiveTranslation"
      >
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="py-3 border-b-2 border-gray-200 bg-white text-left text-[14px] font-[400] leading-[18px] text-black"
              >
                Function
              </th>
              <th
                class="py-3 border-b-2 border-gray-200 bg-white text-left text-[14px] font-[400] leading-[18px] text-black"
              >
                Time Enabled
              </th>
              <th
                class="py-3 border-b-2 border-gray-200 bg-white text-right text-[14px] font-[400] leading-[18px] text-black"
              >
                Percentage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-[#FAFCFE] h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/addons/monitor_im.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                      Motor impaired
                    </p>
                  </div>
                </div>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <p class="text-[14px] leading-[19px] font-[400]">13</p>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 80, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    80%
                  </div>
                </div>
              </td>
            </tr>

            <tr class="bg-[#FAFCFE] h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/addons/color_blind.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                      Color blind
                    </p>
                  </div>
                </div>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <p class="text-[14px] leading-[19px] font-[400]">13</p>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto ">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 80, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    80%
                  </div>
                </div>
              </td>
            </tr>

            <tr class="bg-[#FAFCFE] h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/addons/vis_impaired.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                      Visually-impaired
                    </p>
                  </div>
                </div>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <p class="text-[14px] leading-[19px] font-[400]">13</p>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 10, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    10%
                  </div>
                </div>
              </td>
            </tr>

            <tr class="bg-[#FAFCFE] h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/addons/seizure.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                      Seizure & Epileptic
                    </p>
                  </div>
                </div>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <p class="text-[14px] leading-[19px] font-[400]">13</p>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 10, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    10%
                  </div>
                </div>
              </td>
            </tr>

            <tr class="bg-[#FAFCFE] h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/addons/blind.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                      Blind
                    </p>
                  </div>
                </div>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <p class="text-[14px] leading-[19px] font-[400]">13</p>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 30, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    10%
                  </div>
                </div>
              </td>
            </tr>

            <tr class="bg-[#FAFCFE] h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/addons/df.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                      Dyslexia
                    </p>
                  </div>
                </div>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <p class="text-[14px] leading-[19px] font-[400]">13</p>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 30, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    10%
                  </div>
                </div>
              </td>
            </tr>

            <tr class="bg-[#FAFCFE] h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/addons/congitive.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                      Congitive & Learning
                    </p>
                  </div>
                </div>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <p class="text-[14px] leading-[19px] font-[400]">13</p>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 30, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    10%
                  </div>
                </div>
              </td>
            </tr>

            <tr class="bg-[#FAFCFE] h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/addons/adhd.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                      ADHD
                    </p>
                  </div>
                </div>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <p class="text-[14px] leading-[19px] font-[400]">13</p>
              </td>
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 30, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    10%
                  </div>
                </div>
              </td>
            </tr>

         

     

          </tbody>
        </table>
      </div>
        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
     

       
      </div>
      <div class="flex items-center justify-center space-x-[13px] bg-white w-full h-[114px] px-[18px] border-[1px] border-lightGrey rounded-[10px]">
        <div class="flex items-center justify-start flex-1">
          <div>
            <img src="/assets/imgs/google_analytics.svg" alt="" class="w-[71px] h-[63px]">
          </div>
          <div class="ml-[13px]">
            <h1 class="text-[16px] leading-[22px] font-[500] text-[#23262F]">Google Analytics</h1>
            <p class="text-[14px] leading-[19px] text-[#585B5B] font-[400] mt-[8px]">
              Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid
            </p>
          </div>
        </div>
        <div class="ml-auto flex items-center">
          <label for="toggle_google_a" class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="toggle_google_a" class="sr-only" v-model="isADHDChecked"/>
            <div class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
              :class="[ isADHDChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' : 'border-[1px] border-lightGrey']">
              <div class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                :class="{ 'translate-x-full ': isADHDChecked }">
                <img v-if="isADHDChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt=""/>
                <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt=""/>
              </div>
            </div>
          </label>
        </div>
      </div>


      
      <div class="mt-[30px] bg-white rounded-[10px] pb-[24px] mb-[40px] ">
        <div class="flex items-center justify-start ml-[15px]  ">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px] " :class="[!liveTranslationStats ? 'mt-[-35px]' :'mt-[35px]']">
              Live Translation
  
            </h1>
  
            <p
              class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[15px] w-3/4"
            >
            Live translation converts speech or text from one language to another instantly, facilitating real-time communication.
            </p>
          </div>
  

      <div class="flex flex-col items-center justify-center pt-[35px] space-y-[24px] relative">
        <div
        @click="
          openResizeMenuLiveTranslationStats = !openResizeMenuLiveTranslationStats
        "
        :class="[
          openResizeMenuLiveTranslationStats
            ? 'active_notification !text-darkGrey'
            : '',

            liveTranslationStats ? 'top-[-32px] right-[-121px]' : 'top-[16px] right-[15px]'
        ]"

        class="absolute   flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
      >
        <svg
          width="18"
          height="5"
          viewBox="0 0 18 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="[
            openResizeMenuLiveTranslationStats
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
          v-if="openResizeMenuLiveTranslationStats"
          style="box-shadow: 0px 2px 6px 0px #00000040"
          class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
        >
      
          <div
            class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
            @click="liveTranslationStats = !liveTranslationStats"
          >
            <div>
              <img
                src="/assets/imgs/addons/min_size.svg"
                alt=""
                :class="[
                  openResizeMenuLiveTranslationStats ? '!fill-white' : '',
                ]"
              />
            </div>
            <div class="text-[14px] leading-[21px] font-[400]">
              Minisize
            </div>
          </div>

       
         
          <div
            class="absolute top-[10px] right-[-10px] z-[50] !border-none"
          >
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
      <div 
      v-if="!liveTranslationStats"
      class="flex items-center justify-start mr-[18px] h-[105px] rounded-[10px] w-[369px] custom-border" style="background: linear-gradient(180deg, #FEFEFE 0%, #EEF5FF 47.07%, #F6F3FC 72.04%, #FEF5F6 100%);
          ">
          <div class="circular-progress big  bg-white rounded-full ml-[10px]">
            <svg viewBox="0 0 36 36" class=" " width="60" height="60">
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
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
              <circle
                class="bg-circle"
                cx="18"
                cy="18"
                r="15.91549431"
              ></circle>
              <circle
                class="progress-circle"
                cx="18"
                cy="18"
                r="15.91549431"
                style="stroke-dasharray: 80, 100"
              ></circle>
            </svg>
            <div
              class="progress-text text-[10px] leading-[13px] font-[500]"
            >
            <div class="flex flex-col items-center justify-center ">
              <div>5%</div>
              <div >
                1 M
              </div>
            </div>
            </div>
          </div>

      <div class="flex flex-col items-center justify-center w-full space-y-[8px] px-[24px]" >
        <div class="flex items-center justify-between w-full">
          <div class="text-[14px] font-[400] leading-[19px]">
            Used
          </div>
          <div class="text-[14px] font-[600] leading-[19px]">
            5.78% 
          </div>
        </div>
      
        <div class="flex items-center justify-between w-full">
          <div class="text-[14px] font-[400] leading-[19px]">
            User Assistance
          </div>
          <div class="text-[14px] font-[600] leading-[19px]">
       20
          </div>
        </div>
        <div class="flex items-center justify-between w-full">
          <div class="text-[14px] font-[400] leading-[19px]">
            Pages Translated

          </div>
          <div class="text-[14px] font-[600] leading-[19px]">
            5
          </div>
        </div>
      </div>
        </div>
      </div>
          
          
        </div>
       
        <div
        class="w-full px-[16px] mt-[24px] mx-auto bg-white rounded-lg overflow-hidden"
        v-if="!liveTranslationStats"
      >
      <h1 class="text-[20px] font-[500] leading-[26px] mb-[24px]">
        Translated languages

      </h1>
      
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="py-3 border-b-2 w-full border-gray-200 bg-white text-left text-[14px] font-[400] leading-[18px] text-black"
              >
              languages
              </th>
       
              <th
                class="py-3 border-b-2 w-full border-gray-200 bg-white text-right text-[14px] font-[400] leading-[18px] text-black"
              >
              Usage
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/arabic.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                     Arabic
                    </p>
                  </div>
                </div>
              </td>
           
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 80, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    80%
                  </div>
                </div>
              </td>
            </tr>

            <tr class="bg-white h-[56px]">
              <td class="border-b border-gray-200 text-sm">
                <div class="flex items-center justify-start space-x-[9px]">
                  <div>
                    <img
                      src="/assets/imgs/english.svg"
                      class="w-[36px] h-[36px]"
                      alt=""
                    />
                  </div>
                  <div class="">
                    <p class="text-[14px] leading-[19px] font-[400]">
                      English
                    </p>
                  </div>
                </div>
              </td>
          
              <td class="border-b border-gray-200 text-sm">
                <div class="circular-progress ml-auto ">
                  <svg viewBox="0 0 36 36">
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
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
                    <circle
                      class="bg-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                    ></circle>
                    <circle
                      class="progress-circle"
                      cx="18"
                      cy="18"
                      r="15.91549431"
                      style="stroke-dasharray: 80, 100"
                    ></circle>
                  </svg>
                  <div
                    class="progress-text text-[10px] leading-[13px] font-[500]"
                  >
                    80%
                  </div>
                </div>
              </td>
            </tr>


         

     

          </tbody>
        </table>

        <h1 class="text-[20px] font-[500] leading-[26px] my-[24px]">
          Pages Translated
  
        </h1>
        
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="py-3 border-b-2 w-full border-gray-200 bg-white text-left text-[14px] font-[400] leading-[18px] text-black"
                >
                Page
                </th>
         
                <th
                  class="py-3 border-b-2 w-full border-gray-200 bg-white text-right text-[14px] font-[400] leading-[18px] text-black"
                >
                Usage
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-start flex-col justify-center ">
                    <div class="text-[14px] leading-[19px] font-[400] text-black">
                      /Page
                    </div>
                    <div class="">
                      <p class="text-[10px] leading-[13px] font-[400] text-[#979897]">
                       
                        Translated by 10 user 
                      </p>
                    </div>
                  </div>
                </td>
             
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 80, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      80%
                    </div>
                  </div>
                </td>
              </tr>
  
        
  
              <tr class="bg-white h-[56px]">
                <td class="border-b border-gray-200 text-sm">
                  <div class="flex items-start flex-col justify-center ">
                    <div class="text-[14px] leading-[19px] font-[400] text-black">
                      /Page
                    </div>
                    <div class="">
                      <p class="text-[10px] leading-[13px] font-[400] text-[#979897]">
                       
                        Translated by 10 user 
                      </p>
                    </div>
                  </div>
                </td>
             
                <td class="border-b border-gray-200 text-sm">
                  <div class="circular-progress ml-auto">
                    <svg viewBox="0 0 36 36">
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
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
                      <circle
                        class="bg-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                      ></circle>
                      <circle
                        class="progress-circle"
                        cx="18"
                        cy="18"
                        r="15.91549431"
                        style="stroke-dasharray: 10, 100"
                      ></circle>
                    </svg>
                    <div
                      class="progress-text text-[10px] leading-[13px] font-[500]"
                    >
                      10%
                    </div>
                  </div>
                </td>
              </tr>
  
       
  
            </tbody>
          </table>
      </div>
        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
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
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  @apply !text-white;

  &.tamkin {
    @apply rounded-[10px] h-[32px];
  }
}

.tamkin_date_input {
  box-shadow: 0px 1.54px 3.08px 0px #61616133;

  box-shadow: 0px 0.77px 1.54px 0px #61616133;

  @apply pl-[14px] text-[15px] w-full  h-[32px] rounded-[10px] border-[1px] border-[#585B5B8C] focus:!outline-0;
}
.dp__pointer::placeholder {
  @apply !text-darkGrey opacity-100 !font-[400] font-[Poppins];
}

.dp__input.dp__input_icon_pad.dp__input_focus {
  @apply !outline-0 !ring-0 !border-[1px] !border-[#585B5B8C];
}
.dp__input {
  @apply pl-[14px] text-[15px];
}
.dp__input_wrap .dp__input_icon {
  right: 14px;
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
  @apply rounded-full bg-white font-[700] text-darkGrey border-[1px] border-[#616161];
}
.dp__calendar_item .dp__today.dp__range_end {
  @apply rounded-full bg-white font-[700] !text-white !border-0;
}
.dp__calendar_item .dp__today.dp__range_start {
  @apply rounded-full bg-white font-[700] !text-white !border-0;
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
</style>
