<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

const collapseStore = useCollapseStore();
const statsStore = useStatsStore();
const navStore = useNavbarStore();

const usagePercentage = computed(() => {
  return statsStore.sign_languageStats.used
    ? Math.round(
        (statsStore.sign_languageStats.used /
          statsStore.sign_languageStats.total) *
          100
      )
    : 0;
});

const formattedTotal = computed(() => {
  return statsStore.sign_languageStats.total >= 1_000_000
    ? (statsStore.sign_languageStats.total / 1_000_000).toFixed(2) + "M"
    : statsStore.sign_languageStats.total
    ? statsStore.sign_languageStats.total
    : 0;
});
</script>
<template>
  <div
    class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[32px] pt-[24px] mb-[40px] relative shadow-md -shadow-y-[1px] px-[15px]"
  >
    <div class="flex items-center justify-start">
      <div
        :class="[
          collapseStore.collapses.includes('translation_stats_card')
            ? 'mt-[0]'
            : '',
        ]"
      >
        <h1
          class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
        >
          {{ $t("Translation") }}
        </h1>
        <p
          class="font-[400] text-[12px] lg:text-[14px] leading-[22.95px] text-darkGrey dark:text-whiteTamkin mt-[15px] w-3/4"
        >
          {{
            $t(
              "translation converts speech or text from one language to another instantly, facilitating real-time communication."
            )
          }}
        </p>
      </div>
      <div
        @click.stop="collapseStore.collapseMenu('translation_stats')"
        v-on-click-outside="() => collapseStore.removeMenu('translation_stats')"
        :class="[
          collapseStore.menus.includes('translation_stats')
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
            collapseStore.menus.includes('translation_stats')
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
          v-if="collapseStore.menus.includes('translation_stats')"
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
            @click="collapseStore.collapseCard('translation_stats_card')"
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
                !collapseStore.collapses.includes("translation_stats_card")
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
    class="w-full px-[16px] mt-[24px] mx-auto bg-white rounded-lg overflow-hidden dark:bg-tamkinDarkPrimary animate-pulse"
    v-if="statsStore.loadingStatsIntranlsation"
  >
    <div
      class="h-[26px] w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-[24px]"
    ></div>

    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th
            class="py-3 bg-gray-200 dark:bg-gray-700 rounded h-6 w-1/2"
          ></th>
          <th
            class="py-3 bg-gray-200 dark:bg-gray-700 rounded h-6 w-1/4"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr class="h-[56px]" v-for="i in 5" :key="i">
          <td class="border-b border-gray-200 dark:border-darkborder text-sm">
            <div
              class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
            >
              <div
                class="w-[36px] h-[36px] bg-gray-200 dark:bg-gray-700 rounded-full"
              ></div>
              <div
                class="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            </div>
          </td>
          <td class="border-b border-gray-200 dark:border-darkborder text-sm">
            <div class="circular-progress rtl:mr-auto ltr:ml-auto">
              <div
                class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      class="h-[26px] w-1/3 bg-gray-200 dark:bg-gray-700 rounded my-[24px]"
    ></div>

    <table class="min-w-full leading-normal">
      <thead>
        <tr>
          <th
            class="py-3 bg-gray-200 dark:bg-gray-700 rounded h-6 w-1/2"
          ></th>
          <th
            class="py-3 bg-gray-200 dark:bg-gray-700 rounded h-6 w-1/4"
          ></th>
        </tr>
      </thead>
      <tbody>
        <tr class="h-[56px]" v-for="i in 5" :key="i">
          <td class="border-b border-gray-200 dark:border-darkborder text-sm">
            <div class="flex items-start flex-col justify-center">
              <div
                class="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"
              ></div>
              <div
                class="w-1/2 h-3 bg-gray-200 dark:bg-gray-700 rounded"
              ></div>
            </div>
          </td>
          <td class="border-b border-gray-200 dark:border-darkborder text-sm">
            <div class="circular-progress rtl:mr-auto ltr:ml-auto">
              <div
                class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
    <div
      class="relative w-full lg:mt-[-70px] mx-auto  rounded-lg overflow-hidden dark:bg-tamkinDarkPrimary"
      v-if="!collapseStore.collapses.includes('translation_stats_card') && !statsStore.loadingStatsIntranlsation"
      :class="[ navStore.defaultappobj?.package?.filter(
        (p) => p.type === 'Sign language'
      ).length === 0 ? 'h-[500px]':'']"
    >
      <MessagesLockedFeature
        v-if="
          navStore.defaultappobj?.package?.filter(
            (p) => p.type === 'Sign language'
          ).length === 0
        "
        class="mt-[100px]"
      />
      <div  
      :class="[ navStore.defaultappobj?.package?.filter(
        (p) => p.type === 'Sign language'
      ).length > 0 ? 'visible':'invisible']"
        class="flex items-center justify-start rtl:mr-auto ltr:ml-auto ltr:mr-[15px] h-[105px] my-[28px] rounded-[10px] w-full
         ipad-max:w-full lg:w-[369px] custom-border bg-white dark:bg-p"
      >
        <div
          class="circular-progress big bg-white dark:bg-transparent rounded-full rtl:mr-[10px] ltr:ml-[10px]"
        >
          <svg viewBox="0 0 36 36"  width="60" height="60">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stop-color="#E494C4" stop-opacity="0.2" />
                <stop offset="50%" stop-color="#D389D6" stop-opacity="0.7" />
                <stop offset="100%" stop-color="#CBB5EA" stop-opacity="0.7" />
              </linearGradient>
              
            </defs>
            <circle class="bg-circle" cx="18" cy="18" r="15.91549431"></circle>
            <circle
              class="progress-circle"
              cx="18"
              cy="18"
              r="15.91549431"
                opacity="0.7"
              :style="`stroke-dasharray: ${usagePercentage.toFixed(0)},100`"
            ></circle>
          </svg>

       

          <div
            class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin"
          >
            <div class="flex flex-col items-center justify-center">
              <div>{{ usagePercentage }}%</div>
              <div v-if="statsStore.sign_languageStats">
                {{ formattedTotal }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-center w-full space-y-[8px] px-[24px] dark:text-whiteTamkin"
        >
          <div
            class="flex items-center justify-between w-full"
            v-if="statsStore.sign_languageStats"
          >
            <div class="text-[13px] font-[400] leading-[19px]">
              {{ statsStore.sign_languageStats.used }}
            </div>
            <div class="text-[13px] font-[600] leading-[19px]">
              {{ usagePercentage }} %
            </div>
          </div>

          <div class="flex items-center justify-between w-full">
            <div class="text-[13px] font-[400] leading-[19px]">
              {{ $t("User Assistance") }}
            </div>
            <div
              class="text-[13px] font-[600] leading-[19px]"
              v-if="statsStore.sign_languageStats"
            >
              {{ statsStore.sign_languageStats.user_Assistance }}
            </div>
          </div>
          <div class="flex items-center justify-between w-full">
            <div class="text-[13px] font-[400] leading-[19px]">
              {{ $t("Pages Translated") }}
            </div>
            <div
              class="text-[13px] font-[600] leading-[19px]"
              v-if="statsStore.sign_languageStats"
            >
              {{ statsStore.sign_languageStats.page_Translated }}
            </div>
          </div>
        </div>
      </div>

      <!-- <h1
        class="text-[14px] lg:text-[18px] font-[500] leading-[26px] my-[24px] dark:text-whiteTamkin"
      >
        {{ $t("Languages") }}
      </h1> -->

      <table
        class="min-w-full leading-normal"
        v-if="statsStore.languages && statsStore.languages.length"
      >
        <thead>
          <tr>
            <th
            :class="   navStore.defaultappobj?.package?.filter(
              (p) => p.type === 'Sign language'
            ).length === 0 ? 'opacity-10' : ' '" 
              class="py-3 border-b-2 w-full border-gray-200 bg-white dark:bg-tamkinDarkPrimary dark:border-darkborder dark:text-whiteTamkin ltr:text-left rtl:text-right text-[14px] font-[400] leading-[18px] text-black"
            >
              {{ $t("languages") }}
            </th>

            <th
            :class="   navStore.defaultappobj?.package?.filter(
              (p) => p.type === 'Sign language'
            ).length === 0 ? 'opacity-10' : ' '" 
              class="py-3 border-b-2 w-full border-gray-200 bg-white dark:bg-tamkinDarkPrimary dark:border-darkborder dark:text-whiteTamkin text-right text-[14px] font-[400] leading-[18px] text-black"
            >
              {{ $t("Usage") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="lang in statsStore.languages"
            class="bg-white dark:bg-tamkinDarkPrimary dark:border-darkborder h-[56px]"
          >
            <td class="border-b border-gray-200 text-sm dark:border-darkborder">
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[9px]"
              >
                <div>
                  <img
                    :src="`https://tamkin.app/${lang.icon}`"
                    class="w-[20px] h-[20px] lg:w-[36px] lg:h-[36px]"
                  />
                </div>
                <div class="">
                  <p
                    class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin"
                  >
                    {{ lang.title }}
                  </p>
                </div>
              </div>
            </td>

            <td class="border-b border-gray-200 text-sm dark:border-darkborder">
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
                    :style="`stroke-dasharray: ${lang.percentage.toFixed(
                      0
                    )},100`"
                  ></circle>
                </svg>
                <div
                  class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin"
                >
                  {{ Number(lang.percentage).toFixed(0) }}%
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <h1
      :class="   navStore.defaultappobj?.package?.filter(
              (p) => p.type === 'Sign language'
            ).length === 0 ? 'opacity-10' : ' '" 
        class="text-[14px] lg:text-[18px] font-[500] leading-[26px] my-[24px] dark:text-whiteTamkin"
      >
        {{ $t("Pages Translated") }}
      </h1>

      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th
            :class="   navStore.defaultappobj?.package?.filter(
              (p) => p.type === 'Sign language'
            ).length === 0 ? 'opacity-10' : ' '" 
              class="py-3 border-b-2 w-full border-gray-200 dark:bg-tamkinDarkPrimary dark:border-darkborder bg-white dark:text-whiteTamkin ltr:text-left rtl:text-right text-[14px] font-[400] leading-[18px] text-black"
            >
              {{ $t("Page") }}
            </th>

            <th
            :class="   navStore.defaultappobj?.package?.filter(
              (p) => p.type === 'Sign language'
            ).length === 0 ? 'opacity-10' : ' '" 
              class="py-3 border-b-2 w-full border-gray-200 bg-white dark:bg-tamkinDarkPrimary dark:border-darkborder dark:text-whiteTamkin text-right text-[14px] font-[400] leading-[18px] text-black"
            >
              {{ $t("Usage") }}
            </th>
          </tr>
        </thead>
        <tbody
          v-if="statsStore.pagesTranslated && statsStore.pagesTranslated.length"
        >
          <tr

            class="bg-white h-[56px] dark:bg-tamkinDarkPrimary"
            v-for="(page, i) in statsStore.pagesTranslated"
            :key="i"
          >
            <td class="border-b border-gray-200 text-sm dark:border-darkborder">
              <div class="flex items-start flex-col justify-center">
                <div
                  class="text-[10px] lg:text-[13px] leading-[19px] font-[400] dark:text-whiteTamkin text-black"
                >
                  {{ page.page }}
                </div>
                <!-- <div class="">
                  <p
                    class="text-[10px] leading-[13px] font-[400] text-[#979897] dark:text-whiteTamkin"
                  >
                    Translated by 10 user
                  </p>
                </div> -->
              </div>
            </td>

            <td class="border-b border-gray-200 text-sm dark:border-darkborder">
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
                    :style="`stroke-dasharray: ${Number(page.percentage).toFixed(
                      0
                    )},100`"
                  ></circle>
                </svg>
                <div
                  class="progress-text text-[8px] lg:text-[10px] leading-[13px] font-[500] dark:text-whiteTamkin"
                >
                  {{ Number(page.percentage).toFixed(0) }}%
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
