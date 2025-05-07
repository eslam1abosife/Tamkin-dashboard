<script lang="ts" setup>
import { Line } from "vue-chartjs";

import { vOnClickOutside } from "@vueuse/components";
import shadowPlugin from "@/chartjs/plugins/shadowPlugin.js"; // Adjust the path if necessary

import { Chart as ChartJS, registerables } from "chart.js";
import CircularProgressBar from "~/components/CircularProgressBar.vue";

ChartJS.register(...registerables, shadowPlugin);
const statsStore = useStatsStore();
const chart13 = ref("");
const chart14 = ref("");
const { width, height } = useWindowSize();

watch(width, (newWidth) => {
  if (chart13.value?.chart) {
    chart13.value.chart.resize(50, 50);
  }
  if (chart14.value?.chart) {
    chart14.value.chart.resize(50, 50);
  }
});
const translationPercentage = computed(() => {
  const translated = statsStore.translation_quality.translated_content;
  const notTranslated = statsStore.translation_quality.untranslated_content;
  const total = statsStore.sign_languageStats.total;
  return Math.ceil((translated / (translated + notTranslated)) * 100);
});
const collapseStore = useCollapseStore();

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

    if (sortedtranslated?.length) {
      chartData.value = {
        labels: sortedtranslated.map((t) => t.date),
        datasets: [
          {
            label: "Translated Words",
            data: sortedtranslated.map((t) => t.count),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false,
            tension: 0.1,
          },
        ],
      };
    }

    if (sorteduntranslated?.length) {
      chartData2.value = {
        labels: sorteduntranslated.map((t) => t.date),
        datasets: [
          {
            label: "Untranslated Words",
            data: sorteduntranslated.map((t) => t.count),
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false,
            tension: 0.1,
          },
        ],
      };
    }
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
        @click.stop="collapseStore.collapseMenu('translation_acc')"
        v-on-click-outside="() => collapseStore.removeMenu('translation_acc')"
        :class="[
          collapseStore.menus.includes('translation_acc')
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
            collapseStore.menus.includes('translation_acc')
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
          v-if="collapseStore.menus.includes('translation_acc')"
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
            <div class="text_mini">Switch To Annual</div>
          </div> -->
          <div
            class="mini_wrap"
            @click="collapseStore.collapseCard('translation_acc_card')"
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
                !collapseStore.collapses.includes("translation_acc_card")
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
      class="w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg lg:overflow-x-hidden overflow-x-auto"
      v-if="!collapseStore.collapses.includes('translation_acc_card')"
    >
      <div
        class="flex items-center justify-between rtl:space-x-reverse space-x-[10px] md:space-x-[40px]"
      >
        <div
          class="h-[92px] w-full rounded-[23px] dark:bg-p dark:text-whiteTamkin bg-[#F7FAFD] flex flex-col items-center justify-center space-y-[10px]"
        >
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[4px]"
          >
            <div class="bg-[#71DAD2] w-2 h-2 rounded-full"></div>
            <div
              class="text-[12px] font-[400] text-[#787486] dark:text-white/80 leading-[18px]"
            >
              {{ $t("Total") }}
            </div>
          </div>
          <div
            class="text-[17px] md:text-[24px] leading-[16px] font-[600] text-darkGrey dark:text-white/80"
          >
            {{ statsStore.sign_languageStats.total }}
          </div>
        </div>

        <div
          class="h-[92px] w-full rounded-[23px] dark:bg-p bg-[#F7FAFD] flex flex-col items-center justify-center space-y-[10px]"
        >
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[4px]"
          >
            <div class="bg-[#FFBA6B] w-2 h-2 rounded-full"></div>
            <div
              class="text-[12px] font-[400] text-[#787486] dark:text-white/80 leading-[18px]"
            >
              {{ $t("Used") }}
            </div>
          </div>
          <div
            class="text-[17px] md:text-[24px] leading-[16px] font-[600] text-darkGrey dark:text-white/80"
          >
            {{ statsStore.sign_languageStats.used }}
          </div>
        </div>

        <div
          class="h-[92px] w-full rounded-[23px] dark:bg-p bg-[#F7FAFD] flex flex-col items-center justify-center space-y-[10px]"
        >
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[4px]"
          >
            <div class="bg-[#A35EFE] w-2 h-2 rounded-full"></div>
            <div
              class="text-[12px] font-[400] text-[#787486] dark:text-white/80 leading-[18px]"
            >
              {{ $t("Remaining") }}
            </div>
          </div>
          <div
            class="text-[17px] md:text-[24px] leading-[16px] font-[600] text-darkGrey dark:text-white/80"
          >
            {{
              Number(statsStore.sign_languageStats.total) -
              statsStore.sign_languageStats.used
            }}
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center justify-between gap-1 w-full mt-[66px]">
        <div class="grid grid-cols-12 w-full">
          <div
            class="rounded-[10px] col-span-12 dark:bg-tamkinDarkPrimary lg:w-[89%] ipad-max:w-full 2xl:w-[85%]"
          >
            <div
              class="flex justify-between dark:bg-p bg-[#F7FAFD] rounded-[10px] items-center mb-4 relative h-[108px] px-[15px]"
            >
              <div class="space-y-[16px]">
                <h2
                  class="whitespace-nowrap text-[12px] sm:text-[14px] leading-[20px] dark:text-whiteTamkin font-[500] text-darkGrey"
                >
                  {{ $t("Translated content") }}
                </h2>
                <h1
                  class="text-[14px] whitespace-nowrap md:text-[20px] font-[600] text-black dark:text-white leading-[30px]"
                >
                  {{ statsStore.translation_quality.translated_content }}
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
          <div
            class="rounded-[10px] col-span-12 lg:w-[89%] ipad-max:w-full 2xl:w-[85%]"
          >
            <div
              class="flex dark:bg-p justify-between bg-[#F7FAFD] rounded-[10px] items-center mb-4 ipad-max:w-full relative h-[108px] px-[15px]"
            >
              <div class="space-y-[16px]">
                <h2
                  class="whitespace-nowrap text-[12px] sm:text-[14px] leading-[20px] font-[500] text-darkGrey dark:text-whiteTamkin"
                >
                  {{ $t("Untranslated content") }}
                </h2>
                <h1
                  class="text-[14px] whitespace-nowrap md:text-[20px] font-[600] text-black dark:text-white leading-[30px]"
                >
                  {{ statsStore.translation_quality.untranslated_content }}
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

        <div class="flex flex-col items-center justify-start w-2/4">
          <div class="mt-[-20px] ipad-max:mx-auto w-1/4 flex justify-center">
            <!-- <CircularProgressBar :initialPercentage="translationPercentage" 
             :total="`${statsStore.sign_languageStats.total}`" class="!w-[200px] !h-[200px]"/> -->

             <CircularProgressBar
            textsize="32px"
            :initialPercentage="translationPercentage ? translationPercentage : 0"
            class="small_circle !w-[150px] !h-[150px] text-[12px]"
          />
                  </div>
          <div class="text-[18px] dark:text-whiteTamkin text-center leading-[28px] mt-[14px] font-[500] text-[#021328]">
            {{ $t('Translation Accuracy') }}
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
      class="w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg"
    >
      <div
        class="flex items-center justify-between rtl:space-x-reverse space-x-[40px]"
      >
        <div
          class="h-[92px] w-full rounded-[23px] bg-gray-300 dark:bg-gray-700 flex flex-col items-center justify-center space-y-[10px]"
        >
          <div
            class="h-[10px] bg-gray-400 dark:bg-gray-600 rounded-full w-1/4"
          ></div>
          <div
            class="h-[24px] bg-gray-400 dark:bg-gray-600 rounded-md w-1/3"
          ></div>
        </div>
        <div
          class="h-[92px] w-full rounded-[23px] bg-gray-300 dark:bg-gray-700 flex flex-col items-center justify-center space-y-[10px]"
        >
          <div
            class="h-[10px] bg-gray-400 dark:bg-gray-600 rounded-full w-1/4"
          ></div>
          <div
            class="h-[24px] bg-gray-400 dark:bg-gray-600 rounded-md w-1/3"
          ></div>
        </div>
        <div
          class="h-[92px] w-full rounded-[23px] bg-gray-300 dark:bg-gray-700 flex flex-col items-center justify-center space-y-[10px]"
        >
          <div
            class="h-[10px] bg-gray-400 dark:bg-gray-600 rounded-full w-1/4"
          ></div>
          <div
            class="h-[24px] bg-gray-400 dark:bg-gray-600 rounded-md w-1/3"
          ></div>
        </div>
      </div>

      <div class="flex items-center justify-between w-full mt-[66px]">
        <div class="grid grid-cols-12 w-full">
          <div class="rounded-[10px] col-span-12">
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
          <div class="rounded-[10px] col-span-12">
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
<style scoped></style>
