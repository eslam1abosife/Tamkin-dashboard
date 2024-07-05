<script lang="ts" setup>
import VCodeBlock from "@wdns/vue-code-block";
import { useModalStore } from "@/stores/modal";
import banner from "assets/imgs/gradient_embded.png";
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
import { Line } from "vue-chartjs";
import { useWindowSize } from "@vueuse/core";

const { width, height } = useWindowSize();
const chart13 = ref("");
const chart14 = ref("");

watch(width, (newWidth) => {
  //   console.log(newWidth);
  chart13.value.chart.resize(300, 80);
  chart14.value.chart.resize(300, 80);
});
const { openShareModal } = useModalStore();
definePageMeta({
  layout: "dashboard",
});
const code = ref(true);
const advancedCode = ref(false);
const currentCode = ref(``);
const copyDone = ref(false);
const showAdancedCode = () => {
  if (!advancedCode.value) {
    code.value = false;
    advancedCode.value = true;

    currentCode.value = `const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
`;
  } else {
    code.value = true;
    advancedCode.value = false;

    currentCode.value = `const foo = 'bar';`;
  }
};

onBeforeMount(() => {
  currentCode.value = `const foo = 'bar';`;
  code.value = true;
});
const copyCode = () => {
  copyDone.value = true;
};

watch(copyDone, (newValue) => {
  if (newValue) {
    // Reset copyDone after the hideIn duration
    setTimeout(() => {
      copyDone.value = false;
    }, 2000);
  }
});
const localePath = useLocalePath();

const openResizeMenuManage = ref(false);
const openResizeMenuLiveOverview = ref(false);
const openResizeAcccessDetails = ref(false);
const miniSizeLicense = ref(false);
const miniSizeManage = ref(false);
const miniSizeAdjust = ref(false);
const miniSizeLiveOverview = ref(false);
const miniSizeDetailsAccess = ref(false);
const openResizeResetAllAccess = ref(false);
const miniSizeResetAll = ref(false);
const route = useRoute();
const pricingType = ref("monthly");
const switchBetweenMonthlyAndAnnual = (v: any) => {
  pricingType.value = v;
};
const isLinkActive = (path) => {
  //   const localePath = this.$i18n.localePath(path);
  return route.path === localePath(path);
};

const resetAllMiniSize = () => {
  miniSizeResetAll.value = !miniSizeResetAll.value;
};

const liveoverviewMinisize = () => {
  miniSizeLiveOverview.value = !miniSizeLiveOverview.value;
};
const currentIndex = ref(0);

const back = ref(false);

const next = () => {
  back.value = false;
  currentIndex.value++;
};
const prev = () => {
  back.value = true;
  if (currentIndex.value == 1) {
    currentIndex.value--;
  }
};

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

function increaseProgress() {
  progress.value = Math.min(progress.value + 10, 100);
}
</script>

<template>
  <div class="relative h-full w-full">
    <div class="mt-[23px] w-full h-full relative">
      <div class="space-y-[10px]">
        <h1 class="text-left text-[24px] leading-[36px] font-[600]">Overview</h1>

        <h2 class="text-left text-[15px] font-[400] leading-[22.5px] text-darkGrey">
          Overview provides system summary with key data and analytics for decision-making
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
                    <h2 class="font-[600] text-[16px] leading-[24px] text-darkGrey">
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
        <nuxt-link
          :class="[isLinkActive('/overview') ? 'active_subNavb' : 'sub_menu_item']"
          :to="localePath('/overview')"
          >Overview</nuxt-link
        >
        <nuxt-link
          :class="[isLinkActive('/addons') ? 'active_subNavb' : 'sub_menu_item']"
          :to="localePath('/addons')"
          >Addons</nuxt-link
        >
        <nuxt-link
          :to="localePath('/statistics')"
          :class="[isLinkActive('/statistics') ? 'active_subNavb' : 'sub_menu_item']"
        >
          Statistics
        </nuxt-link>
        <nuxt-link
          :to="localePath('/customize')"
          :class="[isLinkActive('/customize') ? 'active_subNavb' : 'sub_menu_item']"
          >Customize</nuxt-link
        >
        <nuxt-link
          :to="localePath('/settings')"
          :class="[isLinkActive('/settings') ? 'active_subNavb' : 'sub_menu_item']"
          >Settings</nuxt-link
        >
      </div>
      <div class="mt-[30px] bg-white rounded-[10px]">
        <div
          class="flex flex-col items-start justify-center ml-[15px] mt-[18px] divide-y"
          v-if="!miniSizeAdjust"
        >
          <div
            class="bg-white h-[87px] w-full rounded-[10px] flex items-center justify-start space-x-[10px]"
          >
            <div>
              <img
                src="/assets/imgs/overview/warning_overview.svg"
                class="w-[43px] h-[36px]"
                alt=""
              />
            </div>
            <div
              class="font-[400] px-[24px] text-[15px] leading-[28px] text-darkGrey ml-auto"
            >
              Please add Tamkin's embed code to your site to enable Tamkin's PRO Widget
              and unlock the full potential of digital accessibility and ADA compliance
            </div>
          </div>
        </div>

        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est
          veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px] relative">
        <DashboardToastSuccess
          v-if="copyDone"
          :hideIn="2000"
          :message="'Copied to clipboard'"
        />

        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">Widget Embed Code</h1>
            <h2 class="text-left text-[15px] font-[400] leading-[28.5px] text-darkGrey">
              Widget Embed Code allows you to easily integrate accessibility features into
              your website by adding a simple script to your site's HTML
            </h2>
          </div>
          <div
            @click="openResizeMenuManage = !openResizeMenuManage"
            :class="[openResizeMenuManage ? 'active_notification !text-darkGrey' : '']"
            class="relative ml-auto mr-[15px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeMenuManage ? 'stroke-current !text-white !fill-white' : '',
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
                <div class="text-[14px] leading-[21px] font-[400]">Minisize</div>
              </div>

              <div class="absolute top-[10px] right-[-10px] z-[50] !border-none">
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
          class="flex flex-col items-start justify-center px-[15px] pb-[16px] divide-y"
          v-if="!miniSizeManage"
        >
          <div class="w-full h-full rounded-[10px]">
            <div
              class="flex items-center lg:flex-row flex-col justify-center lg:space-y-0 space-y-[16px] lg:justify-between mt-[24px] w-full"
              style="padding: 30px, 16px, 20px, 15px"
            >
              <button
                @click="showAdancedCode()"
                class="btn__icon__dashboard ipad-max:text-[12px]"
                style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
              >
                <div>
                  <svg
                    width="12"
                    height="21"
                    viewBox="0 0 12 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.49697H11C11.2652 9.49697 11.5196 9.39161 11.7071 9.20407C11.8946 9.01654 12 8.76218 12 8.49697C12 8.23175 11.8946 7.9774 11.7071 7.78986C11.5196 7.60232 11.2652 7.49697 11 7.49697H7V3.90697L7.79 4.70697C7.88296 4.8007 7.99356 4.87509 8.11542 4.92586C8.23728 4.97663 8.36799 5.00277 8.5 5.00277C8.63201 5.00277 8.76272 4.97663 8.88458 4.92586C9.00644 4.87509 9.11704 4.8007 9.21 4.70697C9.30373 4.614 9.37812 4.5034 9.42889 4.38154C9.47966 4.25968 9.5058 4.12898 9.5058 3.99697C9.5058 3.86495 9.47966 3.73425 9.42889 3.61239C9.37812 3.49053 9.30373 3.37993 9.21 3.28697L6.71 0.786967C6.6149 0.695926 6.50275 0.624561 6.38 0.576967C6.13654 0.476949 5.86346 0.476949 5.62 0.576967C5.49725 0.624561 5.3851 0.695926 5.29 0.786967L2.79 3.28697C2.6017 3.47527 2.49591 3.73066 2.49591 3.99697C2.49591 4.26327 2.6017 4.51866 2.79 4.70697C2.9783 4.89527 3.2337 5.00106 3.5 5.00106C3.7663 5.00106 4.0217 4.89527 4.21 4.70697L5 3.90697V7.49697H1C0.734784 7.49697 0.48043 7.60232 0.292893 7.78986C0.105357 7.9774 0 8.23175 0 8.49697C0 8.76218 0.105357 9.01654 0.292893 9.20407C0.48043 9.39161 0.734784 9.49697 1 9.49697ZM11 11.497H1C0.734784 11.497 0.48043 11.6023 0.292893 11.7899C0.105357 11.9774 0 12.2317 0 12.497C0 12.7622 0.105357 13.0165 0.292893 13.2041C0.48043 13.3916 0.734784 13.497 1 13.497H5V17.087L4.21 16.287C4.11676 16.1937 4.00607 16.1198 3.88425 16.0693C3.76243 16.0188 3.63186 15.9929 3.5 15.9929C3.36814 15.9929 3.23757 16.0188 3.11575 16.0693C2.99393 16.1198 2.88324 16.1937 2.79 16.287C2.69676 16.3802 2.6228 16.4909 2.57234 16.6127C2.52188 16.7345 2.49591 16.8651 2.49591 16.997C2.49591 17.1288 2.52188 17.2594 2.57234 17.3812C2.6228 17.503 2.69676 17.6137 2.79 17.707L5.29 20.207C5.3851 20.298 5.49725 20.3694 5.62 20.417C5.7397 20.4699 5.86913 20.4972 6 20.4972C6.13087 20.4972 6.2603 20.4699 6.38 20.417C6.50275 20.3694 6.6149 20.298 6.71 20.207L9.21 17.707C9.3983 17.5187 9.50409 17.2633 9.50409 16.997C9.50409 16.7307 9.3983 16.4753 9.21 16.287C9.0217 16.0987 8.7663 15.9929 8.5 15.9929C8.2337 15.9929 7.9783 16.0987 7.79 16.287L7 17.087V13.497H11C11.2652 13.497 11.5196 13.3916 11.7071 13.2041C11.8946 13.0165 12 12.7622 12 12.497C12 12.2317 11.8946 11.9774 11.7071 11.7899C11.5196 11.6023 11.2652 11.497 11 11.497Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>Advanced View</div>
              </button>
              <div
                @click="openShareModal"
                class="cursor-pointer ipad-max:text-[12px] border-[2px] rounded-lg border-transparent bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] group"
              >
                <div class="bg-white rounded-md flex items-center justify-center">
                  <div class="pl-[16px]">
                    <svg
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 7.5C10.2044 7.5 9.44129 7.18393 8.87868 6.62132C8.31607 6.05871 8 5.29565 8 4.5C8 3.70435 8.31607 2.94129 8.87868 2.37868C9.44129 1.81607 10.2044 1.5 11 1.5C11.7956 1.5 12.5587 1.81607 13.1213 2.37868C13.6839 2.94129 14 3.70435 14 4.5C14 5.29565 13.6839 6.05871 13.1213 6.62132C12.5587 7.18393 11.7956 7.5 11 7.5ZM4.5 19.5C3.70435 19.5 2.94129 19.1839 2.37868 18.6213C1.81607 18.0587 1.5 17.2956 1.5 16.5C1.5 15.7044 1.81607 14.9413 2.37868 14.3787C2.94129 13.8161 3.70435 13.5 4.5 13.5C5.29565 13.5 6.05871 13.8161 6.62132 14.3787C7.18393 14.9413 7.5 15.7044 7.5 16.5C7.5 17.2956 7.18393 18.0587 6.62132 18.6213C6.05871 19.1839 5.29565 19.5 4.5 19.5ZM17.5 19.5C16.7044 19.5 15.9413 19.1839 15.3787 18.6213C14.8161 18.0587 14.5 17.2956 14.5 16.5C14.5 15.7044 14.8161 14.9413 15.3787 14.3787C15.9413 13.8161 16.7044 13.5 17.5 13.5C18.2956 13.5 19.0587 13.8161 19.6213 14.3787C20.1839 14.9413 20.5 15.7044 20.5 16.5C20.5 17.2956 20.1839 18.0587 19.6213 18.6213C19.0587 19.1839 18.2956 19.5 17.5 19.5Z"
                        stroke="url(#paint0_linear_275_10607)"
                        stroke-width="1.5"
                      />
                      <path
                        d="M19 11.5C19.0014 10.3648 18.7605 9.24243 18.2935 8.20776C17.8265 7.17309 17.1442 6.24995 16.292 5.5M3.00001 11.5C2.99866 10.3648 3.23952 9.24243 3.7065 8.20776C4.17348 7.17309 4.85584 6.24995 5.70801 5.5M9.00001 19.248C9.65338 19.416 10.3254 19.5007 11 19.5C11.6746 19.5007 12.3466 19.416 13 19.248"
                        stroke="url(#paint1_linear_275_10607)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_275_10607"
                          x1="11"
                          y1="1.5"
                          x2="11"
                          y2="19.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#2DADA3" />
                          <stop offset="1" stop-color="#71DAD2" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_275_10607"
                          x1="11"
                          y1="5.5"
                          x2="11"
                          y2="19.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#2DADA3" />
                          <stop offset="1" stop-color="#71DAD2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <button
                    class="h-[45px] btn px-4 py-2 rounded-md group-hover:bg-gradient-to-r group-hover:to-tamkinStart group-hover:from-tamkinEnd group-hover:text-transparent group-hover:bg-clip-text"
                  >
                    Share code with your team
                  </button>
                </div>
              </div>

              <div
                @click="copyCode"
                class="cursor-pointer ipad-max:text-[12px] border-[2px] rounded-lg border-transparent bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] group"
              >
                <div class="bg-white rounded-md flex items-center justify-center">
                  <div class="pl-[16px]">
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.829 11.361C19 10.948 19 10.423 19 9.375C19 8.327 19 7.802 18.829 7.389C18.7159 7.11593 18.5502 6.86782 18.3412 6.65883C18.1322 6.44984 17.8841 6.28407 17.611 6.171C17.198 6 16.673 6 15.625 6H9.1C7.84 6 7.21 6 6.729 6.245C6.30526 6.46078 5.96078 6.80526 5.745 7.229C5.5 7.709 5.5 8.339 5.5 9.6V16.125C5.5 17.173 5.5 17.698 5.671 18.111C5.9 18.662 6.338 19.101 6.889 19.329C7.302 19.5 7.827 19.5 8.875 19.5C9.923 19.5 10.448 19.5 10.861 19.329M18.829 11.361C18.7159 11.6341 18.5502 11.8822 18.3412 12.0912C18.1322 12.3002 17.8841 12.4659 17.611 12.579C17.198 12.75 16.673 12.75 15.625 12.75C14.577 12.75 14.052 12.75 13.639 12.921C13.3659 13.0341 13.1178 13.1998 12.9088 13.4088C12.6998 13.6178 12.5341 13.8659 12.421 14.139C12.25 14.552 12.25 15.077 12.25 16.125C12.25 17.173 12.25 17.698 12.079 18.111C11.9659 18.3841 11.8002 18.6322 11.5912 18.8412C11.3822 19.0502 11.1341 19.2159 10.861 19.329M18.829 11.361C18.2912 13.216 17.3017 14.9086 15.9492 16.2873C14.5967 17.666 12.9233 18.6878 11.079 19.261L10.861 19.329M14.5 6V5.1C14.5 3.84 14.5 3.21 14.255 2.729C14.0395 2.30541 13.6954 1.96095 13.272 1.745C12.79 1.5 12.16 1.5 10.9 1.5H4.6C3.34 1.5 2.71 1.5 2.229 1.745C1.80526 1.96078 1.46078 2.30526 1.245 2.729C1 3.209 1 3.839 1 5.1V11.4C1 12.66 1 13.29 1.245 13.771C1.461 14.195 1.805 14.539 2.229 14.755C2.709 15 3.34 15 4.601 15H5.5"
                        stroke="url(#paint0_linear_275_10529)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_275_10529"
                          x1="10"
                          y1="1.5"
                          x2="10"
                          y2="19.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#2DADA3" />
                          <stop offset="1" stop-color="#71DAD2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <button
                    class="h-[45px] px-4 py-2 rounded-md group-hover:bg-gradient-to-r group-hover:to-tamkinStart group-hover:from-tamkinEnd group-hover:text-transparent group-hover:bg-clip-text"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-[24px] w-full min-h-[50px]">
              <Client-only>
                <VCodeBlock
                  :code="currentCode"
                  highlightjs
                  lang="javascript"
                  theme="neon-bunny"
                />
              </Client-only>

              <h2
                class="text-left font-[500] text-[13px] text-[#979897] mb-[30px] mt-[20px]"
                style="line-height: 23.4px"
              >
                Managing multiple sites for multiple clients ? Great! Make sure you use
                <span class="text-darkGrey">the same embed code</span> on all of your
                sites !
              </h2>
            </div>
          </div>
        </div>

        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est
          veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px] pb-[24px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">Connect with us</h1>

            <p class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]">
              Connect with us to stay updated and receive support for all your
              accessibility needs
            </p>
          </div>

          <div
            @click="openResizeResetAllAccess = !openResizeResetAllAccess"
            :class="[
              openResizeResetAllAccess ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ml-auto mr-[15px] mt-[-24px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[40px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeResetAllAccess ? 'stroke-current !text-white !fill-white' : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="openResizeResetAllAccess"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="resetAllMiniSize"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[openResizeResetAllAccess ? '!fill-white' : '']"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">Minisize</div>
              </div>

              <div class="absolute top-[10px] right-[-10px] z-[50] !border-none">
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
          class="flex items-center flex-col justify-center mt-[24px] space-y-[24px] px-[15px]"
          v-if="!miniSizeResetAll"
        >
          <div
            :style="{ backgroundImage: `url(${banner})` }"
            style="width: 100%; height: 100%; background-size: cover"
            class="w-full rounded-lg text-center flex items-center justify-center"
          >
            <img
              src="/assets/imgs/icons/man.svg"
              alt="Character"
              class="w-[280px] h-full"
            />
            <div class="flex flex-col items-center justify-center px-[15px]">
              <h2
                class="text-[24px] ipad-max:leading-[30px] leading-[42px] font-[600] text-gray-800 mb-4"
              >
                Would you like to have early access to the platform?
              </h2>
              <button
                class="ipad-max:leading-[20px] h-[51px] bg-white text-tamkin space-x-[16px] py-3 rounded-[15px] font-[600] leading-[42px] text-[16px] flex items-center justify-center px-[16px]"
              >
                <div class="">Sign up to keep up with the latest news from us</div>
                <div>
                  <img src="/assets/imgs/icons/nicemove.svg" alt="" />
                </div>
              </button>
            </div>
          </div>

          <div class="">
            <h1
              class="text-center font-[500] text-[16px] lg:leading-[36px] leading-[20px] lg:text-[24px]"
            >
              Need help installing Tamkin ?
            </h1>
            <p
              class="text-center text-[14px] mt-[8px] text-[#A7A7A7]"
              style="line-height: 21px"
            >
              Our support team is help !
            </p>
          </div>

          <div
            class="lg:h-[60px] w-full bg-white flex p-[10px] rounded-[10px] items-center lg:flex-row flex-col justify-center lg:justify-between"
          >
            <div class="flex items-center space-x-[-12px] flex-1">
              <img src="/assets/imgs/icons/avatr1.svg" alt="" class="w-10 h-10" />
              <img src="/assets/imgs/icons/avatr1.svg" alt="" class="w-10 h-10" />
              <img src="/assets/imgs/icons/avatr1.svg" alt="" class="w-10 h-10" />
              <img src="/assets/imgs/icons/avatr1.svg" alt="" class="w-10 h-10" />
            </div>
            <div class="">
              <a
                href=""
                class="text-tamkin leading-[10px] text-[12px] lg:leading-[21px] lg:text-[14px] lg:text-right text-center font-[500] underline"
                >Schedule ameeting Withnour support team</a
              >
            </div>
          </div>
        </div>
        <div
          v-if="miniSizeResetAll"
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est
          veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px] h-full">
        <div
          class="flex items-center justify-start rounded-[10px] h-[212px] w-full"
          style="background: linear-gradient(90deg, #35b4a9 10.67%, #c8fdf9 76.5%)"
        >
          <div class="flex flex-col items-center justify-center w-full px-[15px]">
            <div>
              <h1 class="text-white font-[500] text-[20px] leading-[30px]">
                Your Current Plan
              </h1>
              <h3 class="text-white font-[500] text-[14px] leading-[21px]">
                Your current plan provides comprehensive features tailored to meet your
                needs.
              </h3>
            </div>

            <div
              class="h-[63px] w-[480px] bg-white bg-opacity-75 rounded-[41px] flex items-center justify-between mt-[24px] px-[15px]"
            >
              <div class="w-full flex items-center justify-evenly space-x-[4px]">
                <div>
                  <img src="/assets/imgs/freeplan.svg" class="w-[22px] h-[22px]" alt="" />
                </div>
                <div class="text-[15px] font-[500] leading-[22.5px] text-darkGrey">
                  Free Widget
                </div>
              </div>

              <div
                class="w-full text-[15px] font-[500] leading-[22.5px] text-darkGrey flex items-center justify-evenly space-x-[4px]"
              >
                <div>
                  <img
                    src="/assets/imgs/payment_methods/declined.svg"
                    class="w-[22px] h-[22px]"
                    alt=""
                  />
                </div>
                <div>Not installed</div>
              </div>

              <div class="w-full">
                <button
                  class="btn_bordered_dashboard bg-white rounded-[19px] ml-auto mx-[15px] !p-[10px] w-full"
                >
                  Upgrade Plans
                </button>
              </div>
            </div>
          </div>

          <div class="ml-auto h-full w-full">
            <img
              src="/assets/imgs/overview/current_plan_upgrade.svg"
              class="w-full h-full"
              alt=""
            />
          </div>
        </div>

        <div
          class="flex items-center flex-col justify-center px-[15px]"
          v-if="!miniSizeLicense"
        >
          <div
            class="h-[63px] w-[480px] bg-gray-200 bg-opacity-75 rounded-[41px] flex items-center justify-between mt-[24px] px-[15px]"
          >
            <div class="w-full flex items-center justify-start space-x-[16px]">
              <div>
                <img src="/assets/imgs/platplan.svg" class="w-[22px] h-[22px]" alt="" />
              </div>
              <div class="text-[15px] font-[500] leading-[22.5px] text-darkGrey">
                Pro widget
              </div>
            </div>

            <div class="w-[200px]">
              <button
                class="btn_bordered_dashboard bg-white rounded-[19px] ml-auto mx-[15px] !p-[10px] w-full"
              >
                Upgrade Plans
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between w-full mt-[32px]">
            <div class="text-[15px] leading-[22.5px] font-[500]">
              Accessibility Widget Pricing
            </div>

            <div
              class="inline-flex items-center rounded-full bg-tamkinLight p-1 border border-gray-300"
            >
              <button
                @click="switchBetweenMonthlyAndAnnual('monthly')"
                :class="[pricingType === 'monthly' ? 'bg-white rounded-full' : '']"
                class="py-2 px-4 transition-all ease-in-out text-darkGrey font-[500] text-[15px] leading-[22.5px]"
              >
                Monthly
              </button>
              <button
                :class="[pricingType === 'annual' ? 'bg-white rounded-full' : '']"
                @click="switchBetweenMonthlyAndAnnual('annual')"
                class="py-2 px-2 transition-all ease-in-out text-darkGrey font-[500] text-[15px] leading-[22.5px] mr-[4px]"
              >
                Annual
                <span class="!text-black text-[12px] leading-[18px] font-[600]"
                  >SAVE 12%</span
                >
              </button>
            </div>
          </div>
          <transition-group
            mode="in-out"
            tag="div"
            class="w-full overflow-x-hidden"
            name="slide-fade"
          >
            <div
              v-if="currentIndex === 0"
              key="1"
              class="flex items-center justify-between h-full w-full space-x-[36px] mt-[32px]"
            >
              <div
                class="flex items-center flex-col custom-border justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] bg-selected w-[300px]"
                style="padding: 16px, 10px, 16px, 10px"
              >
                <div class="absolute top-[-30px] left-[15px]">
                  <img src="/assets/imgs/freeplan.svg" class="w-[50px] h-[50px]" alt="" />
                </div>

                <div
                  class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
                >
                  <div class="order-2 relative w-full">
                    <h1 class="font-[600] text-[20px] leading-[30px]">Free Widget</h1>
                    <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                      For Individuals and Small Teams
                    </h2>

                    <h3
                      class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                    >
                      $ 00
                      <span class="!font-[500] !text-darkGrey !text-[20px]">/month</span>
                    </h3>

                    <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                      <span class="!font-[700]">UP to 100K </span>Page views/mo
                    </p>
                  </div>
                </div>

                <div
                  class="flex bg-selected flex-col items-start justify-center w-full space-y-[10px] h-[305px] custom-border-collapse rounded-t-none rounded-[10px] p-4"
                >
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
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
                    <button class="btn-dashboard rounded-full mt-[16px]">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="flex items-center flex-col custom-border-tamkin padding-override-1 justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-[300px]"
                style="padding: 16px, 10px, 16px, 10px"
              >
                <div class="absolute top-[-30px] left-[15px]">
                  <img src="/assets/imgs/proplan.svg" class="w-[50px] h-[50px]" alt="" />
                </div>

                <div
                  class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
                >
                  <div class="order-2 relative w-full">
                    <h1 class="font-[600] text-[20px] leading-[30px]">Pro- Widget</h1>
                    <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                      For Individuals and Small Teams
                    </h2>

                    <h3
                      class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                    >
                      $ {{ pricingType === "annual" ? "1000" : "150" }}
                      <span class="!font-[500] !text-darkGrey !text-[20px]"
                        >/{{ pricingType === "annual" ? "year" : "month" }}</span
                      >
                    </h3>

                    <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                      <span class="!font-[700]">UP to 1M </span>Page views/mo
                    </p>
                  </div>
                </div>

                <div
                  class="flex custom-border-collapse-tamkin flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
                >
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
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
                    <button class="btn-dashboard rounded-full mt-[16px]">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="flex items-center flex-col custom-border-tamkin padding-override-1 justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-[300px]"
                style="padding: 16px, 10px, 16px, 10px"
              >
                <div class="absolute top-[-30px] left-[15px]">
                  <img
                    src="/assets/imgs/overview/prem_plan.svg"
                    class="w-[50px] h-[50px]"
                    alt=""
                  />
                </div>

                <div
                  class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
                >
                  <div class="order-2 relative w-full">
                    <h1 class="font-[600] text-[20px] leading-[30px]">Premium</h1>
                    <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                      For Individuals and Small Teams
                    </h2>

                    <h3
                      class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                    >
                      $ {{ pricingType === "annual" ? "1500" : "300" }}
                      <span class="!font-[500] !text-darkGrey !text-[20px]"
                        >/{{ pricingType === "annual" ? "year" : "month" }}</span
                      >
                    </h3>

                    <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                      <span class="!font-[700]">UP to 2M </span>Page views/mo
                    </p>
                  </div>
                </div>

                <div
                  class="flex custom-border-collapse-tamkin flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
                >
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
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
                    <button class="btn-dashboard rounded-full mt-[16px]">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-else-if="currentIndex === 1"
              key="2"
              class="flex items-center justify-between h-full w-full space-x-[36px] mt-[32px]"
            >
              <div
                class="flex items-center flex-col custom-border-tamkin padding-override-1 justify-start !rounded-t-[10px] mt-[35px] w-[300px]"
                style="padding: 16px, 10px, 16px, 10px"
              >
                <div class="absolute top-[-30px] left-[15px]">
                  <img
                    src="/assets/imgs/overview/advanced_plan.svg"
                    class="w-[50px] h-[50px]"
                    alt=""
                  />
                </div>

                <div
                  class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
                >
                  <div class="order-2 relative w-full">
                    <h1 class="font-[600] text-[20px] leading-[30px]">Advanced</h1>
                    <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                      For Individuals and Small Teams
                    </h2>

                    <h3
                      class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                    >
                      $ {{ pricingType === "annual" ? "4000" : "400" }}
                      <span class="!font-[500] !text-darkGrey !text-[20px]"
                        >/{{ pricingType === "annual" ? "year" : "month" }}</span
                      >
                    </h3>

                    <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                      <span class="!font-[700]">UP to 3M </span>Page views/mo
                    </p>
                  </div>
                </div>

                <div
                  class="flex flex-col items-start justify-center w-full space-y-[10px] h-[305px] custom-border-collapse-tamkin rounded-t-none rounded-[10px] p-4"
                >
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
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
                    <button class="btn-dashboard rounded-full mt-[16px]">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="flex items-center flex-col custom-border-tamkin padding-override-1 justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-[300px]"
                style="padding: 16px, 10px, 16px, 10px"
              >
                <div class="absolute top-[-30px] left-[15px]">
                  <img
                    src="/assets/imgs/plat_plan.svg"
                    class="w-[50px] h-[50px]"
                    alt=""
                  />
                </div>

                <div
                  class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
                >
                  <div class="order-2 relative w-full">
                    <h1 class="font-[600] text-[20px] leading-[30px]">Platinum</h1>
                    <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                      For Individuals and Small Teams
                    </h2>

                    <h3
                      class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                    >
                      $ {{ pricingType === "annual" ? "5000" : "500" }}
                      <span class="!font-[500] !text-darkGrey !text-[20px]"
                        >/{{ pricingType === "annual" ? "year" : "month" }}</span
                      >
                    </h3>

                    <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                      <span class="!font-[700]">UP to 4M </span>Page views/mo
                    </p>
                  </div>
                </div>

                <div
                  class="flex custom-border-collapse-tamkin flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
                >
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
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
                    <button class="btn-dashboard rounded-full mt-[16px]">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>

              <div
                class="flex items-center flex-col custom-border-tamkin padding-override-1 justify-start !rounded-t-[10px] !rounded-b-none mt-[35px] w-[300px]"
                style="padding: 16px, 10px, 16px, 10px"
              >
                <div class="absolute top-[-30px] left-[15px]">
                  <img
                    src="/assets/imgs/overview/enterprise_plan.svg"
                    class="w-[50px] h-[50px]"
                    alt=""
                  />
                </div>

                <div
                  class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
                >
                  <div class="order-2 relative w-full">
                    <h1 class="font-[600] text-[20px] leading-[30px]">Enterprise</h1>
                    <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174]">
                      For Individuals and Small Teams
                    </h2>

                    <h3
                      class="mt-[16px] text-black font-[600] text-[24px] leading-[29px]"
                    >
                      $ {{ pricingType === "annual" ? "5500" : "600" }}
                      <span class="!font-[500] !text-darkGrey !text-[20px]">/month</span>
                    </h3>

                    <p class="font-[500] text-[10px] leading-[32px] text-darkGrey">
                      <span class="!font-[700]">UP to 5M </span>Page views/mo
                    </p>
                  </div>
                </div>

                <div
                  class="flex custom-border-collapse-tamkin flex-col items-start justify-center w-full space-y-[10px] h-[305px] rounded-t-none rounded-[10px] p-4"
                >
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
                    <div>
                      <img src="/assets/imgs/checked_list_active.svg" alt="" />
                    </div>
                    <div>
                      <h3 class="text-[14px] font-[400] leading-[20px]">
                        All analytics features
                      </h3>
                    </div>
                  </div>
                  <div class="flex items-center justify-start space-x-[24px]">
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
                    <button class="btn-dashboard rounded-full mt-[16px]">
                      Upgrade Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
          <div class="flex items-center justify-center mx-auto space-x-[8px] my-[32px]">
            <div
              :class="[currentIndex === 0 ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
              class="w-[15px] h-[15px] rounded-full cursor-pointer"
              @click="prev"
            ></div>
            <div
              :class="[currentIndex === 1 ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
              class="w-[15px] h-[15px] rounded-full cursor-pointer"
              @click="next"
            ></div>
          </div>
        </div>
        <div
          v-if="miniSizeLicense"
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est
          veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>
      <div
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
            class="absolute left-4 top-[6px] h-full w-[9px] z-[20] bg-tamkin rounded-full"
          ></div>
          <!-- Icons and Text -->
          <div class="flex items-start space-x-4 relative z-[50]">
            <!-- Icons -->
            <div class="flex flex-col space-y-16">
              <div
                class="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mt-[36px]"
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="Icon 1"
                  class="w-[27px] h-[27px]"
                />
              </div>
              <div
                class="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center"
              >
                <img
                  src="https://via.placeholder.com/40"
                  alt="Icon 2"
                  class="w-[27px] h-[27px]"
                />
              </div>
            </div>
            <!-- Text content -->
            <div class="flex flex-col space-y-[16px] ml-6 w-2/4 mt-[16px]">
              <div>
                <h2 class="text-[14px] leading-[21px] font-[500] mb-2">
                  Win Investor Package
                </h2>
                <p class="text-[#585B5B] text-[13px] leading-[24px] font-[500]">
                  Investors participating in the Investor Program will receive an
                  exclusive package with many additional benefits and special access to
                  advanced tools and services.
                </p>
              </div>
              <div>
                <h2 class="text-[14px] leading-[21px] font-[500] mb-2">
                  Monthly profits
                </h2>
                <p class="text-[#585B5B] text-[13px] leading-[24px] font-[500]">
                  This program includes 10% of Tamkin profits, distributed monthly in USDT
                  to investors who participate in and maintain the program on their tokens
                  without selling.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Big number and buttons -->
        <div class="flex items-center justify-end w-full relative z-[50]">
          <div class="flex space-x-4">
            <button class="btn-dashboard rounded-full h-[40px] w-[156px]">
              Buy Tamkin
            </button>
            <button
              class="btn_bordered_dashboard rounded-full bg-white w-[156px] h-[40px] !p-[4px] text-[15px] leading-[22.5px]"
            >
              Investor Program
            </button>
            <button
              class="btn_bordered_dashboard rounded-full bg-white w-[156px] h-[40px] !p-[4px] text-[15px] leading-[22.5px]"
            >
              Investor Package
            </button>
          </div>
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px] h-full pb-[24px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
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

        <div class="flex items-center flex-col justify-center px-[15px]">
          <div
            class="flex items-center justify-between h-full w-full space-x-[36px] mt-[32px]"
          >
            <div
              class="flex items-center flex-col justify-start custom-border-tamkin padding-override-1 !rounded-t-[10px] !rounded-b-none mt-[35px] w-[300px]"
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

                  <div
                    class="mt-[16px] text-black font-[600] text-[24px] leading-[29px] flex items-center justify-start space-x-[10px]"
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
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
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
              class="flex items-center flex-col justify-start custom-border-tamkin padding-override-1 !rounded-t-[10px] !rounded-b-none mt-[35px] w-[300px]"
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

                  <div
                    class="mt-[16px] text-black font-[600] text-[24px] leading-[29px] flex items-center justify-start space-x-[10px]"
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
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
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
              class="flex items-center flex-col justify-start custom-border-tamkin padding-override-1 !rounded-t-[10px] !rounded-b-none mt-[35px] w-[300px]"
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

                  <div
                    class="mt-[16px] text-black font-[600] text-[24px] leading-[29px] flex items-center justify-start space-x-[10px]"
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
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
                  <div>
                    <img src="/assets/imgs/checked_list_active.svg" alt="" />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start space-x-[24px]">
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
      <div
        class="bg-white custom-border-tamkin padding-override-1 w-full space-x-[16px] rounded-[10px] h-[119px] mt-[32px] px-[15px] flex items-center justify-start"
      >
        <div>
          <img src="/assets/imgs/overview/plan-calender.svg" alt="" />
        </div>
        <div class="flex flex-col items-start justify-center w-full">
          <div class="font-[500] text-[18px] leading-[27px] text-darkGrey w-full">
            Monthly Plan
          </div>
          <div class="flex items-center justify-start w-full space-x-[6px]">
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
          <button class="btn_bordered_dashboard rounded-full w-[178px]">
            Switch To Annual
          </button>
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px] h-full pb-[24px]">
        <div class="flex items-center justify-start">
          <div>
            <div class="flex items-center justify-start px-[15px]">
              <div class="w-3/4">
                <h1 class="text-[20px] font-[500] leading-[30px]">
                  <div class="flex items-center justify-start pt-[35px]">
                    <div>
                      <h1 class="text-[20px] font-[500] leading-[30px]">
                        Accessibility Details
                      </h1>

                      <p
                        class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
                      >
                        Accessibility Details provide comprehensive information to help
                        ensure your website complies with all accessibility standards
                      </p>
                    </div>
                  </div>
                </h1>
              </div>
              <div class="ml-auto flex items-center justify-evenly space-x-[16px]">
                <button class="btn_bordered_dashboard ml-auto rounded-full">
                  View All
                </button>

                <div
                  @click="openResizeAcccessDetails = !openResizeAcccessDetails"
                  :class="[openResizeAcccessDetails ? 'active_notification !text-darkGrey' : '']"
                  class="relative ml-auto mr-[15px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]">
                  <svg
                    width="18"
                    height="5"
                    viewBox="0 0 18 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="[
                      openResizeAcccessDetails
                        ? 'stroke-current !text-white !fill-white'
                        : '',
                    ]"                  >
                    <path
                      d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                      fill="currentColor"
                    />
                  </svg>

                  <div
                    v-if="openResizeAcccessDetails"
                    style="box-shadow: 0px 2px 6px 0px #00000040"
                    class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
                  >
                    <div
                      class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                      @click="miniSizeDetailsAccess = !miniSizeDetailsAccess"
                    >
                      <div>
                        <img
                          src="/assets/imgs/addons/min_size.svg"
                          alt=""
                          :class="[openResizeAcccessDetails ? '!fill-white' : '']"
                        />
                      </div>
                      <div class="text-[14px] leading-[21px] font-[400]">Minisize</div>
                    </div>

                    <div class="absolute top-[10px] right-[-10px] z-[50] !border-none">
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
          </div>
        </div>
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-[16px]"
          v-if="!miniSizeDetailsAccess"
        >
          <!-- Function Card -->
          <div class="px-[15px] rounded-[10px]">
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
                <div class="flex items-center justify-start space-x-[8px]">
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
              <div class="w-[300px] h-[80px] left-1/2 right-0 absolute">
                <Line
                  ref="chart13"
                  :data="chartData"
                  :options="options"
                  class="w-[300px] h-[80px]"
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
              <div class="flex items-center space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/language sign.svg"
                    alt="Motor impaired icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Screen Reader</div>
                <div class="w-2/4 flex items-center space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#F3DFD1] h-4 rounded-full" style="width: 30%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">30%</span>
                </div>
              </div>

              <div class="flex items-center space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/voice_navigation.svg"
                    alt="Color blind icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Voice Navigation</div>
                <div class="w-2/4 flex items-center space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#D7D4F4] h-4 rounded-full" style="width: 20%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">20%</span>
                </div>
              </div>

              <div class="flex items-center space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/saturation.svg"
                    alt="Visually-impaired icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Saturation</div>
                <div class="w-2/4 flex items-center space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#CEE6F0] h-4 rounded-full" style="width: 15%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">15%</span>
                </div>
              </div>

              <div class="flex items-center space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/cursor.svg"
                    alt="Seizure & Epileptic icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Cursor</div>
                <div class="w-2/4 flex items-center space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#DAF3F1] h-4 rounded-full" style="width: 8%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">8%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="px-[15px] rounded-[10px]">
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
                <div class="flex items-center justify-start space-x-[8px]">
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
              <div class="w-[300px] h-[80px] left-1/2 right-0 absolute">
                <Line
                  ref="chart14"
                  :data="chartData2"
                  :options="options"
                  class="w-[300px] h-[80px]"
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
              <div class="flex items-center space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/monitor_im.svg"
                    alt="Motor impaired icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Motor impaired</div>
                <div class="w-2/4 flex items-center space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#F3DFD1] h-4 rounded-full" style="width: 30%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">30%</span>
                </div>
              </div>

              <div class="flex items-center space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/color_blind.svg"
                    alt="Color blind icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Color blind</div>
                <div class="w-2/4 flex items-center space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#D7D4F4] h-4 rounded-full" style="width: 20%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">20%</span>
                </div>
              </div>

              <div class="flex items-center space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/vis_impaired.svg"
                    alt="Visually-impaired icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Visually-impaired</div>
                <div class="w-2/4 flex items-center space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#CEE6F0] h-4 rounded-full" style="width: 15%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">15%</span>
                </div>
              </div>

              <div class="flex items-center space-x-4 w-full">
                <div>
                  <img
                    src="/assets/imgs/addons/seizure.svg"
                    alt="Seizure & Epileptic icon"
                    class="w-[29px] h-[29px]"
                  />
                </div>
                <div class="w-3/4 text-[12px] leading-[15px]">Seizure & Epileptic</div>
                <div class="w-2/4 flex items-center space-x-2">
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

      <div class="mt-[30px] bg-white rounded-[10px] h-full pb-[24px]">
        <div class="flex items-center justify-start px-[15px]">
          <div class="w-3/4">
            <h1 class="text-[20px] font-[500] leading-[30px]">
              <div class="flex items-center justify-start pt-[35px]">
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
          <div class="ml-auto flex items-center justify-evenly space-x-[16px]">
            <button class="btn_bordered_dashboard ml-auto rounded-full">View All</button>
            <div
              @click="openResizeMenuLiveOverview = !openResizeMenuLiveOverview"
              :class="[
                openResizeMenuLiveOverview ? 'active_notification !text-darkGrey' : '',
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
                  openResizeMenuLiveOverview
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
                v-if="openResizeMenuLiveOverview"
                style="box-shadow: 0px 2px 6px 0px #00000040"
                class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
              >
                <div
                  class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                  @click="miniSizeLiveOverview = !miniSizeLiveOverview"
                >
                  <div>
                    <img
                      src="/assets/imgs/addons/min_size.svg"
                      alt=""
                      :class="[openResizeMenuLiveOverview ? '!fill-white' : '']"
                    />
                  </div>
                  <div class="text-[14px] leading-[21px] font-[400]">Minisize</div>
                </div>

                <div class="absolute top-[10px] right-[-10px] z-[50] !border-none">
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
          v-if="!miniSizeLiveOverview"
          class="flex space-x-8 items-center justify-between px-[15px] w-full mt-[16px]"
        >
          <!-- Donut Chart -->
          <div class="h-full">
            <circular-progress-bar :initial-percentage="progress" />
            <button class="btn-dashboard w-3/4 mx-auto" @click="increaseProgress">
              Increase Progress
            </button>
          </div>
          <!-- Labels and Values -->
          <div
            class="flex flex-col items-start justify-center w-full space-y-[10px] mt-[32px]"
          >
            <div class="flex space-x-8 items-center justify-between w-full">
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
                <div class="w-3/4 flex items-center space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#F3DFD1] h-4 rounded-full" style="width: 40%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">40</span>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-1/4 text-gray-500">Average Weekly</div>
                <div class="w-3/4 flex items-center space-x-2">
                  <div class="bg-gray-200 rounded-full h-4 w-full relative">
                    <div class="bg-[#D7D4F4] h-4 rounded-full" style="width: 70%"></div>
                  </div>
                  <span class="text-gray-500 text-sm">280</span>
                </div>
              </div>

              <div class="flex items-center">
                <div class="w-1/4 text-gray-500">Average Monthly</div>
                <div class="w-3/4 flex items-center space-x-2">
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
</style>
