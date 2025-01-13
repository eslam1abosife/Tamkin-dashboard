<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

const collapseStore = useCollapseStore();
const statsStore = useStatsStore();
const navStore = useNavbarStore();
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
          {{ $t("Usage stats by function") }}
        </h1>
        <p
          class="font-[400] text-[12px] lg:text-[14px] leading-[22.95px] text-darkGrey dark:text-whiteTamkin mt-[10px]"
        >
          {{
            $t(
              "Usage stats by function show how each feature is used in a system or app."
            )
          }}
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
          v-if="collapseStore.menus.includes('usage_stats')"
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
            @click="collapseStore.collapseCard('usage_stats_card')"
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
                !collapseStore.collapses.includes("usage_stats_card")
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
      class="relative w-full mt-[24px] mx-auto bg-white dark:bg-tamkinDarkPrimary rounded-lg lg:overflow-x-hidden overflow-x-auto"
      v-if="!collapseStore.collapses.includes('usage_stats_card')"
    >
      <MessagesLockedFeature
        v-if="
          navStore.defaultappobj?.package?.filter(
            (p) => p.type === 'Sign language'
          ).length === 0
        "
      />
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
              class="py-3 border-b-2 border-gray-200 dark:text-whiteTamkin dark:border-[#333333] ltr:text-left rtl:text-right text-[10px] lg:text-[14px] font-[400] leading-[18px] text-black w-2/4"
            >
              {{ $t("Function") }}
            </th>
            <th
              class="py-3 border-b-2 border-gray-200 dark:text-whiteTamkin dark:border-[#333333] ltr:!text-left rtl:!text-right text-[10px] lg:text-[14px] font-[400] lg:leading-[18px] text-black"
            >
              {{ $t("Time Enabled") }}
            </th>
            <th
              class="py-3 border-b-2 border-gray-200 dark:border-[#333333] dark:text-whiteTamkin rtl:!text-left ltr:!text-right text-[10px] lg:text-[14px] font-[400] lg:leading-[18px] text-black"
            >
              {{ $t("Percentage") }}
            </th>
          </tr>
        </thead>
        <tbody
          v-if="
            statsStore.loadingStats &&
            navStore.defaultappobj?.package?.filter(
              (p) => p.type === 'Sign language'
            ).length > 0
          "
        >
          <tr
            class="h-[56px] bg-gray-200 w-full animate-pulse dark:bg-p"
            v-for="i in 6"
            :key="i"
          >
            <td
              class="border-b border-gray-300 text-sm dark:border-[#333333] dark:bg-p"
            ></td>
            <td
              class="border-b border-gray-300 text-sm dark:border-[#333333] dark:bg-p"
            ></td>
            <td
              class="border-b border-gray-300 text-sm dark:border-[#333333] dark:bg-p"
            ></td>
          </tr>
        </tbody>

        <tbody
          v-else-if="
            navStore.defaultappobj?.package?.filter(
              (p) => p.type === 'Sign language'
            ).length > 0 && !statsStore.loadingStats
          "
        >
          <tr
            v-for="functionItem in statsStore.signLangFunctions.sort(
              (a, b) => a.sort - b.sort
            )"
            :key="functionItem.name"
            class="bg-[#FAFCFE] dark:bg-tamkinDarkPrimary h-[56px]"
          >
            <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
              >
                <div>
                  <img
                    :src="`https://tamkin.app/${functionItem.icon}`"
                    class="w-[20px] h-[20px] lg:w-[25px] lg:h-[25px]"
                  />
                </div>
                <div class="">
                  <p
                    class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin"
                  >
                    {{ functionItem.label }}
                  </p>
                </div>
              </div>
            </td>
            <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
              <p
                class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin"
              >
                {{ functionItem.time_enabled }}
              </p>
            </td>
            <td class="border-b border-gray-200 text-sm dark:border-[#333333]">
              <div class="circular-progress rtl:mr-auto ltr:ml-auto">
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
                    :style="`stroke-dasharray: ${functionItem.percentage.toFixed(
                      0
                    )},100`"
                  ></circle>
                </svg>
                <div
                  class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin"
                >
                  {{ functionItem.percentage.toFixed(0) }}%
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
