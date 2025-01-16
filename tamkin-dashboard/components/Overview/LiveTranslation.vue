<script lang="ts" setup>
import { useCollapseStore } from "@/stores/collapse.js";
import { useOverviewStore } from "@/stores/overview";
import { vOnClickOutside } from "@vueuse/components";
const statsStore = useStatsStore();
const overviewStore = useOverviewStore();

const collapseStore = useCollapseStore();
function formatNumber(value) {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + "M";
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1) + "k";
  } else {
    return value.toString();
  }
}
function calculatePercentage(total, usage) {
  return ((usage / total) * 100).toFixed(0);
}
const navStore = useNavbarStore();
</script>

<template>
  <div
    v-if="statsStore.loadingStats"
    class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full pb-[24px] w-full mb-[24px] relative animate-pulse"
    style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08)"
  >
    <!-- Header Placeholder -->
    <div class="flex items-center justify-start px-[15px] pt-[24px]">
      <div class="w-3/4 space-y-2">
        <div class="h-[24px] bg-gray-300 rounded dark:bg-gray-700 w-2/3"></div>
        <div class="h-[18px] bg-gray-200 rounded dark:bg-gray-600 w-full"></div>
      </div>
      <div class="ml-auto flex space-x-2">
        <div
          class="h-[30px] w-[80px] bg-gray-300 dark:bg-gray-600 rounded-full dark:bg-gray-700"
        ></div>
        <div
          class="h-[20px] w-[20px] bg-gray-300 dark:bg-gray-600 rounded-full dark:bg-gray-700"
        ></div>
      </div>
    </div>

    <!-- Main Content Placeholder -->
    <div
      class="flex lg:rtl:space-x-reverse lg:space-x-8 items-center ipad-max:flex-wrap lg:flex-row flex-col justify-center lg:justify-between px-[15px] w-full mt-[16px]"
    >
      <!-- Circular Progress Placeholder -->
      <div
        class="h-[180px] w-[180px] bg-gray-200 rounded-full dark:bg-gray-700 mt-[60px]"
      ></div>

      <!-- Stats Section Placeholder -->
      <div
        class="flex flex-col items-start justify-center w-3/4 space-y-[10px] mt-[32px] px-[4px]"
      >
        <!-- Placeholder for the Stats Headers -->
        <div
          class="flex rtl:space-x-reverse lg:space-x-8 items-center lg:flex-nowrap flex-wrap justify-evenly lg:justify-between w-full"
        >
          <div class="text-center space-y-2">
            <div class="flex items-center space-x-[10px] rtl:space-x-reverse">
              <div
                class="h-[16px] bg-gray-300 w-16 rounded dark:bg-gray-600"
              ></div>
            </div>
            <div
              class="h-[24px] bg-gray-200 w-12 rounded dark:bg-gray-700 mx-auto"
            ></div>
          </div>

          <div class="text-center space-y-2">
            <div class="flex items-center space-x-[10px] rtl:space-x-reverse">
              <div
                class="h-[16px] bg-gray-300 w-16 rounded dark:bg-gray-600"
              ></div>
            </div>
            <div
              class="h-[24px] bg-gray-200 w-12 rounded dark:bg-gray-700 mx-auto"
            ></div>
          </div>

          <div class="text-center lg:mt-0 mt-[10px] space-y-2">
            <div class="flex items-center space-x-[10px] rtl:space-x-reverse">
              <div
                class="h-[16px] bg-gray-300 w-16 rounded dark:bg-gray-600"
              ></div>
            </div>
            <div
              class="h-[24px] bg-gray-200 w-12 rounded dark:bg-gray-700 mx-auto"
            ></div>
          </div>
        </div>

        <!-- Progress Bars Placeholder -->
        <div class="w-full space-y-4">
          <div
            class="flex flex-col items-center justify-center w-full space-y-[6px]"
          >
            <div class="flex items-center mt-[32px] w-full">
              <div
                class="lg:w-1/4 h-[16px] bg-gray-300 w-1/2 rounded dark:bg-gray-600"
              ></div>
              <div
                class="h-[16px] bg-gray-300 rounded w-12 ml-auto dark:bg-gray-600"
              ></div>
            </div>
            <div class="w-full flex items-center rtl:space-x-reverse space-x-2">
              <div
                class="bg-gray-200 rounded-full h-4 w-full relative dark:bg-gray-400 overflow-hidden"
              >
                <div
                  class="bg-[#F3DFD1] h-full rounded-r-full"
                  style="width: 20%"
                ></div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-center w-full space-y-[6px]"
          >
            <div class="flex items-center mt-[32px] w-full">
              <div
                class="lg:w-1/4 h-[16px] bg-gray-300 w-1/2 rounded dark:bg-gray-600"
              ></div>
              <div
                class="h-[16px] bg-gray-300 rounded w-12 ml-auto dark:bg-gray-600"
              ></div>
            </div>
            <div class="w-full flex items-center rtl:space-x-reverse space-x-2">
              <div
                class="bg-gray-200 rounded-full h-4 w-full relative dark:bg-gray-400 overflow-hidden"
              >
                <div
                  class="bg-[#D7D4F4] h-full rounded-r-full"
                  style="width: 40%"
                ></div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-center w-full space-y-[6px]"
          >
            <div class="flex items-center mt-[32px] w-full">
              <div
                class="lg:w-1/4 h-[16px] bg-gray-300 w-1/2 rounded dark:bg-gray-600"
              ></div>
              <div
                class="h-[16px] bg-gray-300 rounded w-12 ml-auto dark:bg-gray-600"
              ></div>
            </div>
            <div class="w-full flex items-center rtl:space-x-reverse space-x-2">
              <div
                class="bg-gray-200 rounded-full h-4 w-full relative dark:bg-gray-400 overflow-hidden"
              >
                <div
                  class="bg-[#CEE5F0] h-full rounded-r-full"
                  style="width: 60%"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="
      navStore.defaultappobj?.package?.filter((p) => p.type === 'Accessibility')
        .length && !statsStore.loadingStats
    "
    class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full pb-[24px] w-full mb-[24px] relative"
    style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08)"
  >
    <div class="flex items-center justify-start px-[15px]">
      <div class="w-3/4">
        <h1 class="text-[18px] font-[500] leading-[30px]">
          <div class="flex items-center justify-start pt-[24px]">
            <div>
              <h1
                class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
              >
                {{ $t("Live Translation Overview") }}
              </h1>

              <p
                class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin/90 pt-[6px]"
              >
                {{
                  $t(
                    "Live Translation Overview offers insights into real-time translation technologies, enabling instant communication between speakers of different languages"
                  )
                }}
              </p>
            </div>
          </div>
        </h1>
      </div>
      <div>
        <button
          @click="$router.push('/statistics')"
          class="absolute rtl:left-[60px] ltr:right-[60px] top-[5px] lg:top-[21px] btn_bordered_dashboard rtl:mr-auto ltr:ml-auto rounded-full lg:!p-[10px] !p-[4px] lg:order-1 order-2 lg:my-0 my-4"
        >
          {{ $t("View All") }}
        </button>
        <div
          @click.stop="collapseStore.collapseMenu('livetranslation_overview')"
          v-on-click-outside="
            () => collapseStore.removeMenu('livetranslation_overview')
          "
          :class="[
            collapseStore.menus.includes('livetranslation_overview')
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
              collapseStore.menus.includes('livetranslation_overview')
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
            v-if="collapseStore.menus.includes('livetranslation_overview')"
            style="box-shadow: 0px 2px 6px 0px #00000040"
            class="mini_SizeMenu"
          >
            <div
              class="mini_wrap"
              @click="
                collapseStore.collapseCard('livetranslation_overview_card')
              "
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
                  !collapseStore.collapses.includes(
                    "livetranslation_overview_card"
                  )
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
                  class="fill-white dark:!fill-darkTamkin"
                  filter="url(#shadow-sm)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!collapseStore.collapses.includes('livetranslation_overview_card')"
      class="flex lg:rtl:space-x-reverse lg:space-x-8 items-center ipad-max:flex-wrap lg:flex-row flex-col justify-center lg:justify-between px-[15px] w-full mt-[16px]"
    >
      <div class="h-full mt-[60px] ipad-max:mx-auto w-1/4 flex justify-center">
        <Circularprogressbar
          :initial-percentage="
            calculatePercentage(
              statsStore.overviewStats.total,
              statsStore.overviewStats.usage
            )
          "
          :total="formatNumber(statsStore.overviewStats.total)"
        />
      </div>

      <div
        class="flex flex-col items-start justify-center w-full space-y-[10px] mt-[32px] px-[4px]"
      >
        <div
          class="flex rtl:space-x-reverse lg:space-x-8 items-center lg:flex-nowrap flex-wrap justify-evenly lg:justify-between w-full"
        >
          <div class="text-center">
            <div class="flex items-center space-x-[10px] rtl:space-x-reverse">
              <span
                class="block w-3 h-3 bg-[#FFBA6B] rounded-full mx-auto"
              ></span>
              <span class="text-gray-500 dark:text-whiteTamkin">{{
                $t("Used")
              }}</span>
            </div>
            <span
              class="block text-[12px] md:text-[14px] font-semibold dark:text-whiteTamkin/90"
              >{{ statsStore.overviewStats.usage.toFixed(0) }}%</span
            >
          </div>
          <div class="text-center">
            <div class="flex items-center space-x-[10px] rtl:space-x-reverse">
              <span
                class="block w-3 h-3 bg-[#DEF3FE] dark:bg-whiteTamkin rounded-full mx-auto"
              ></span>

              <span
                class="text-gray-500 text-[12px] md:text-[14px] dark:text-whiteTamkin"
                >{{ $t("User Assistance") }}</span
              >
            </div>
            <span
              class="block text-[12px] md:text-[14px] font-semibold dark:text-whiteTamkin/90"
              >{{ statsStore.overviewStats.user }}</span
            >
          </div>
          <div class="text-center lg:mt-0 mt-[10px]">
            <div class="flex items-center space-x-[10px] rtl:space-x-reverse">
              <span
                class="block w-3 h-3 rounded-full mx-auto"
                style="
                  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
                "
              ></span>
              <span
                class="text-gray-500 text-[12px] md:text-[14px] dark:text-whiteTamkin"
                >{{ $t("Pages Translated") }}</span
              >
            </div>
            <span
              class="block text-[12px] md:text-[14px] font-semibold dark:text-whiteTamkin/90"
              >{{ statsStore.overviewStats.page }}</span
            >
          </div>
        </div>
        <div class="w-full">
          <div
            class="flex flex-col items-center justify-center w-full space-y-[6px]"
          >
            <div class="flex items-center mt-[32px] w-full">
              <div
                class="lg:w-1/4 text-[#3D3D3D] dark:text-whiteTamkin text-[14px] leading-[24px] font-[400] mr-auto"
              >
                {{ $t("Average Daily") }}
              </div>
              <span
                class="text-[#A6A6A6] text-sm ml-auto dark:text-whiteTamkin/90"
                >{{ statsStore.overviewStats.liveTranslation.daily.max }}</span
              >
            </div>
            <div class="w-full flex items-center rtl:space-x-reverse space-x-2">
              <div
                style="background: rgba(242, 243, 245, 1)"
                class="rounded-full h-4 w-full relative overflow-hidden"
              >
                <div
                  class="bg-[#F3DFD1] h-full rounded-r-full"
                  :style="{
                    width: `${statsStore.overviewStats.liveTranslation.daily.avg}%`,
                  }"
                ></div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-center w-full space-y-[6px]"
          >
            <div class="flex items-center mt-[32px] w-full">
              <div
                class="lg:w-1/4 text-[#3D3D3D] dark:text-whiteTamkin text-[14px] leading-[24px] font-[400] mr-auto"
              >
                {{ $t("Average Weekly") }}
              </div>
              <span
                class="text-[#A6A6A6] text-sm ml-auto dark:text-whiteTamkin/90"
                >{{
                  statsStore.overviewStats.liveTranslation.weeckly.max
                }}</span
              >
            </div>
            <div class="w-full flex items-center rtl:space-x-reverse space-x-2">
              <div
                style="background: rgba(242, 243, 245, 1)"
                class="rounded-full h-4 w-full relative overflow-hidden"
              >
                <div
                  class="bg-[#D7D4F4] h-full rounded-r-full"
                  :style="{
                    width: `${statsStore.overviewStats.liveTranslation.weeckly.avg}%`,
                  }"
                ></div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-col items-center justify-center w-full space-y-[6px]"
          >
            <div class="flex items-center mt-[32px] w-full">
              <div
                class="lg:w-1/4 text-[#3D3D3D] text-[14px] dark:text-whiteTamkin leading-[24px] font-[400] mr-auto"
              >
                {{ $t("Average Monthly") }}
              </div>
              <span
                class="text-[#A6A6A6] text-sm ml-auto dark:text-whiteTamkin/90"
                >{{ statsStore.overviewStats.liveTranslation.mount.max }}</span
              >
            </div>
            <div class="w-full flex items-center rtl:space-x-reverse space-x-2">
              <div
                style="background: rgba(242, 243, 245, 1)"
                class="rounded-full h-4 w-full relative overflow-hidden"
              >
                <div
                  class="bg-[#CEE5F0] h-full rounded-r-full"
                  :style="{
                    width: `${statsStore.overviewStats.liveTranslation.mount.avg}%`,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Progress Bars -->
  </div>
</template>
