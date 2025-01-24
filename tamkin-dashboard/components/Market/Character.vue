<script setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
const { locale } = useI18n();
import { useGetAppInvites, useUpdateDefaultApp } from "@/composables/useTeam";

import { useMarketStore } from "@/stores/market";
const marketStore = useMarketStore();
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();
import { useModalManager } from "@/composables/useModalManager";
import { useGetCategoriesWithSkinItems } from "@/composables/useMarket";
import { useEditCustomerCharacter } from "@/composables/useMarket";
import { useFullUrl } from "@/composables/useSharedFunctions";
const { fullUrl } = useFullUrl();
const {
  defaultApp,
} = useGetAppInvites();
const customCharacterCost = useEditCustomerCharacter().customCharacterCost;
const {
  isOpen,
  openModal,
  setData,
} = useModalManager();

const openModalAndHideChat = () => {
  if (process.client && !isOpen("requestmodal")) {
    // window.$chatwoot.toggleBubbleVisibility('hide')
    openModal("requestmodal", "market");
  }
};
const { loadingChars } = useGetCategoriesWithSkinItems();

const windowWidth = ref(0);
const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(() => {
  updateWindowWidth();
  window.addEventListener('resize', updateWindowWidth);
});
onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
</script>

<template>
  <!--========= Content Component =========-->
  <!-- Large Screen -->
  <div v-if="!loadingChars && windowWidth >= 768"
    class="grid grid-cols-1 ipad-max:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 overflow-x-hidden 2xl:grid-cols-5 bg-white dark:bg-[#344153] pt-4 !pb-4 px-[15px] rounded-b-[10px] gap-4 lg:gap-2 2xl:gap-2 ipad-max:gap-8 relative z-[10]"
    >
    <div class="group market_card_char !justify-center order-1 relative" @click="() => {
        if (defaultApp) {
          openModalAndHideChat(), setData(null);
        }
      }
      ">
      <div v-if="!defaultApp"
        class="absolute bottom-[0] inset-x-auto w-[150px] bg-[#747171] text-white text-[10px] text-center leading-[15px] font-[500] rounded-md py-1 hidden group-hover:block !opacity-100 transition-opacity duration-200">
        {{ $t("You have to set A default website to use the market") }}
      </div>
      <div>
        <img src="/assets/pngs/market/add_char.png" class="w-[94px] h-[106px]" alt="" />
      </div>
      <div class="relative max-md:w-full">
        <button class="btn-dashboard hover_tamkin !rounded-full !h-[40px] !text-[14px] !p-2" :disabled="!defaultApp"
          @click="() => {
              if (defaultApp) {
                openModalAndHideChat(), setData(null);
              }
            }
            ">
          {{ $t("Specific Character") }}
        </button>
        <div class="flex flex-col !mt-[16px]">
          <!-- item with discount -->
          <div v-if="customCharacterCost.offer_cost > 0" class="flex items-center justify-between w-full">
            <div class="flex items-start flex-col justify-evenly space-y-[10px]">
              <div
                class="w-auto h-[20px] bg-gradient-to-r from-[#FFD97E] via-[#FEE772] to-[#FFF1AD] rounded-[3px] font-[500] text-darkGrey text-[10px] flex items-center justify-start px-1">
                <div>
                  %{{
                    (
                      ((customCharacterCost.cost -
                        customCharacterCost.offer_cost) /
                        customCharacterCost.cost) *
                      100
                    ).toFixed(2)
                  }}
                  {{ $t("OFF") }}
                </div>
              </div>
              <div class="flex items-center justify-center">
                <div
                  class="text-[13px] font-[600] text-darkGrey dark:text-whiteTamkin rtl:pl-[10px] ltr:pr-[10px] leading-[10px]">
                  ${{ customCharacterCost.offer_cost }}
                </div>
                <div class="text-[13px] font-[400] text-[#EC5A4E] line-through decoration-[1px] leading-[10px]">
                  ${{ customCharacterCost.cost }}
                </div>
              </div>
            </div>
          </div>
          <!-- item without a discount -->
          <div class="flex items-end justify-between w-full mt-[5px]" v-if="
            customCharacterCost.cost &&
            (!customCharacterCost.offer_cost ||
              customCharacterCost.offer_cost == 0)
          ">
            <div class="text-[13px] font-[600] text-darkGrey dark:text-whiteTamkin pr-[10px] leading-[10px]">
              ${{ customCharacterCost.cost }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- @click.stop="marketStore.selectItemforPreview(char)" -->
    <div class="market_card_char order-1 cursor-pointer dark:bg-tamkinDarkPrimary"
      @click="playerStore.changeCharacter(char)" :role="marketStore.owned(char) ? 'button' : ''"
      v-for="char in playerStore.characters" :key="char.name" :class="[
        playerStore.activeCharacter?.name == char.name
          ? 'bg-selected dark:bg-p custom-border-tamkin padding-override-1  '
          : '',
      ]">
      <div :class="[
        playerStore.activeCharacter?.name == char.name
          ? 'dark:bg-p_secondary'
          : '',
      ]" class="w-full dark:bg-p bg-white flex items-center justify-center rounded-[10px] relative"
        :style="'background-color: ' + char.background_color + '!important;'">
        <div class="h-[120px] flex items-end justify-center">
          <img :src="fullUrl(char.image)" :alt="char.text" class="w-[94px] h-[120px]" />
        </div>
        <div
          class="absolute top-0 left-0 w-[51px] h-[17px] rounded-tl-[10px] flex items-center text-[#021328] justify-center"
          v-if="char.is_used" style="
            background: linear-gradient(
              90deg,
              #71dad2 0%,
              #ade8e4 26.17%,
              #a9e7e2 71.17%,
              #71dad2 100%
            );
          ">
          <div class="text-[10px] leading-[20px] font-[500]">
            {{ $t("Applied") }}
          </div>
        </div>
        <div v-else-if="char.is_pending"
          class="absolute top-0 left-0 w-[64px] bg-gradient-to-r from-yellow-300 to-yellow-100 h-[17px] rounded-tl-[10px] flex items-center text-[#021328] justify-center">
          <div class="text-[10px] font-[500] leading-[10px]">
            {{ $t("Pending") }}
          </div>
        </div>
        <div
          class="absolute top-0 left-0 w-[66px] h-[17px] rounded-tl-[10px] flex items-center text-[#021328] justify-center"
          style="
            background: linear-gradient(
              270deg,
              #b3f8f2 0%,
              #75a7ee 31.17%,
              #d2bcff 60.17%,
              #fde7ea 100%
            );
          " v-else-if="char.is_purchased">
          <div class="text-[10px] font-[500] leading-[20px]">
            {{ $t("Purchased") }}
          </div>
        </div>
        <div
          class="absolute top-0 left-0 w-[56px] h-[17px] bg-gradient-to-r from-[#FED2B6] via-[#FED8D3] to-[#FEF4DD] rounded-tl-[10px] flex items-center text-[#021328] justify-center"
          v-else-if="char.is_package">
          <div class="text-[10px] font-[500] leading-[20px]">
            {{ $t("Package") }}
          </div>
        </div>
        <div v-else-if="char.is_special_offer"
          class="absolute top-0 left-0 w-[64px] h-[17px] bg-[#F36363] rounded-[3px] flex items-center justify-center">
          <div class="text-[9px] leading-[20px] text-whiteTamkin">
            {{ $t("Special Offer") }}
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center w-full items-evenly space-y-[4px] p-1">
        <h1 :class="[
          playerStore.activeCharacter?.name == char.name
            ? 'dark:text-whiteTamkin'
            : 'dark:text-whiteTamkin ',
        ]" class="text-[11px] font-[500] w-full leading-[17px] mt-2">
          {{ $t(char.text) }}
        </h1>
        <p :class="[
          playerStore.activeCharacter?.name == char.name
            ? 'dark:text-whiteTamkin'
            : 'dark:text-whiteTamkin ',
        ]" class="text-[10px] font-[300] leading-[17px] max-w-2/4 truncate">
          {{ $t(char.description) }}
        </p>

        <!-- <div v-if="char.specialOffer || char.offer_cost > 0 || char.package" class="flex flex-col"> -->
        <div class="flex flex-col !mt-[16px]">
          <!-- item with discount -->
          <div v-if="marketStore.cartable(char) && char.offer_cost > 0"
            class="flex items-center justify-between w-full">
            <div class="flex items-start flex-col justify-evenly space-y-[10px]">
              <div
                class="w-auto h-[20px] bg-gradient-to-r from-[#FFD97E] via-[#FEE772] to-[#FFF1AD] rounded-[3px] font-[500] text-darkGrey text-[10px] flex items-center justify-start px-1">
                <div>
                  %{{
                    (((char.cost - char.offer_cost) / char.cost) * 100).toFixed(
                      2
                    )
                  }}
                  {{ $t("OFF") }}
                </div>
              </div>
              <div class="flex items-center justify-center">
                <div :class="[
                  playerStore.activeCharacter?.name == char.name
                    ? 'dark:text-whiteTamkin'
                    : 'dark:text-whiteTamkin ',
                ]" class="text-[13px] font-[600] rtl:pl-[10px] ltr:pr-[10px] leading-[10px]">
                  ${{ char.offer_cost }}
                </div>
                <div class="text-[13px] font-[400] text-[#EC5A4E] line-through decoration-[1px] leading-[10px]">
                  ${{ char.cost }}
                </div>
              </div>
            </div>
            <button :disabled="!defaultApp" v-if="marketStore.cartable(char)" @click.stop="() => {
                if (defaultApp) {
                  marketStore.addToCart(char, 'character');
                }
              }
              " :class="[
                marketStore.isInCart(char.name)
                  ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                  : !defaultApp
                    ? 'bg-opacity-40 !cursor-not-allowed '
                    : '',
              ]"
              class="disabled:bg-gray-200 hover:disabled:bg-gray-200 bg-white dark:bg-darkTamkin hover:bg-gradient-to-b from-tamkinStart to-tamkinEnd disabled:hover:border-0 disabled:hover:bg-none disabled:cursor-not-allowed relative mt-[10px] cursor-pointer group w-[35px] h-[35px] rtl:mr-auto ltr:ml-auto hover:border-0 rounded-lg flex items-center justify-center border dark:border-darkborder">
              <div v-if="!defaultApp"
                class="absolute bottom-[44px] ltr:right-[20%] rtl:left-[20%] w-[150px] bg-[#747171] text-white text-[10px] text-center leading-[15px] font-[500] rounded-md py-1 hidden group-hover:block !opacity-100 transition-opacity duration-200">
                {{ $t("You have to set A default website to use the market") }}
              </div>
              <svg :class="[
                marketStore.isInCart(char.name)
                  ? 'text-white'
                  : 'text-tamkin',
                !defaultApp ? '!text-tamkin' : '',
              ]" class="group-hover:text-white" width="25" height="25" viewBox="0 0 23 23" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.08 12.2849H7.22568L5.65425 4.42773H21.3685C21.4835 4.42816 21.5969 4.45378 21.7008 4.5028C21.8048 4.55182 21.8967 4.62304 21.9701 4.71145C22.0435 4.79985 22.0967 4.90329 22.1258 5.01446C22.1549 5.12563 22.1592 5.24184 22.1385 5.35488L20.85 11.6406C20.8199 11.8223 20.7257 11.9873 20.5844 12.1055C20.4431 12.2237 20.2642 12.2873 20.08 12.2849Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M5.6543 4.42801L4.9943 1.91373C4.95807 1.73626 4.86164 1.57675 4.72132 1.46221C4.58101 1.34767 4.40543 1.28512 4.2243 1.28516H1.72573"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M7.22656 12.2852L7.88656 15.5852C7.92279 15.7626 8.01922 15.9221 8.15954 16.0367C8.29985 16.1512 8.47543 16.2138 8.65656 16.2137H18.2266"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M17.4408 21.714C17.0069 21.714 16.6551 21.3622 16.6551 20.9283C16.6551 20.4944 17.0069 20.1426 17.4408 20.1426C17.8748 20.1426 18.2266 20.4944 18.2266 20.9283C18.2266 21.3622 17.8748 21.714 17.4408 21.714Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M9.58343 21.714C9.14949 21.714 8.79771 21.3622 8.79771 20.9283C8.79771 20.4944 9.14949 20.1426 9.58343 20.1426C10.0174 20.1426 10.3691 20.4944 10.3691 20.9283C10.3691 21.3622 10.0174 21.714 9.58343 21.714Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <!-- item without a discount -->
          <div class="flex items-end justify-between w-full mt-[5px]" v-if="
            marketStore.cartable(char) &&
            char.cost &&
            (!char.offer_cost || char.offer_cost == 0)
          ">
            <div class="text-[13px] font-[600] text-darkGrey dark:text-whiteTamkin pr-[10px] leading-[10px]">
              ${{ char.cost }}
            </div>
            <button :disabled="!defaultApp" @click.stop="marketStore.addToCart(char, 'character')" :class="[
              marketStore.isInCart(char.name)
                ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                : '',
            ]"
              class="disabled:bg-gray-200 hover:disabled:bg-gray-200 bg-white dark:bg-darkTamkin hover:bg-gradient-to-b from-tamkinStart to-tamkinEnd disabled:hover:border-0 disabled:hover:bg-none disabled:cursor-not-allowed relative mt-[10px] cursor-pointer group w-[35px] h-[35px] rtl:mr-auto ltr:ml-auto hover:border-0 rounded-lg flex items-center justify-center border dark:border-darkborder">
              <svg :class="[
                marketStore.isInCart(char.name)
                  ? 'text-white'
                  : 'text-tamkin',
                !defaultApp ? '!text-tamkin' : '',
              ]" class="group-hover:text-white" width="25" height="25" viewBox="0 0 23 23" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.08 12.2849H7.22568L5.65425 4.42773H21.3685C21.4835 4.42816 21.5969 4.45378 21.7008 4.5028C21.8048 4.55182 21.8967 4.62304 21.9701 4.71145C22.0435 4.79985 22.0967 4.90329 22.1258 5.01446C22.1549 5.12563 22.1592 5.24184 22.1385 5.35488L20.85 11.6406C20.8199 11.8223 20.7257 11.9873 20.5844 12.1055C20.4431 12.2237 20.2642 12.2873 20.08 12.2849Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M5.6543 4.42801L4.9943 1.91373C4.95807 1.73626 4.86164 1.57675 4.72132 1.46221C4.58101 1.34767 4.40543 1.28512 4.2243 1.28516H1.72573"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M7.22656 12.2852L7.88656 15.5852C7.92279 15.7626 8.01922 15.9221 8.15954 16.0367C8.29985 16.1512 8.47543 16.2138 8.65656 16.2137H18.2266"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M17.4408 21.714C17.0069 21.714 16.6551 21.3622 16.6551 20.9283C16.6551 20.4944 17.0069 20.1426 17.4408 20.1426C17.8748 20.1426 18.2266 20.4944 18.2266 20.9283C18.2266 21.3622 17.8748 21.714 17.4408 21.714Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M9.58343 21.714C9.14949 21.714 8.79771 21.3622 8.79771 20.9283C8.79771 20.4944 9.14949 20.1426 9.58343 20.1426C10.0174 20.1426 10.3691 20.4944 10.3691 20.9283C10.3691 21.3622 10.0174 21.714 9.58343 21.714Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <!-- <div v-else class="flex-grow"></div> -->
      </div>
    </div>
  </div>
  <!-- small Screen -->
  <Splide v-if ="!loadingChars && windowWidth < 768" :options="{
    rewind: true,
    arrows: false,
    direction: `${locale === 'ar' ? 'rtl' : 'ltr'}`,
    gap: 10,
    perPage: 2,
    // breakpoints: {
    //   600: {
    //     perPage: 1,
    //   },
    // },
    width: '100%',
  }" class="max-md:pb-7 bg-white dark:bg-[#344153] pt-4 px-[15px] rounded-b-[10px] relative z-[10]">
    <SplideSlide>
        <div class="group market_card_char !justify-center order-1 relative" @click="() => {
          if (defaultApp) {
            openModalAndHideChat(), setData(null);
          }
        }
        ">
        <div v-if="!defaultApp"
          class="absolute bottom-[0] inset-x-auto w-[150px] bg-[#747171] text-white text-[10px] text-center leading-[15px] font-[500] rounded-md py-1 hidden group-hover:block !opacity-100 transition-opacity duration-200">
          {{ $t("You have to set A default website to use the market") }}
        </div>
        <div>
          <img src="/assets/pngs/market/add_char.png" class="w-[94px] h-[106px]" alt="" />
        </div>
        <div class="relative max-md:w-full">
          <button class="btn-dashboard hover_tamkin !rounded-full !h-[40px] !text-[14px] !p-2" :disabled="!defaultApp"
            @click="() => {
                if (defaultApp) {
                  openModalAndHideChat(), setData(null);
                }
              }
              ">
            {{ $t("Specific Character") }}
          </button>
          <div class="flex flex-col !mt-[16px]">
            <!-- item with discount -->
            <div v-if="customCharacterCost.offer_cost > 0" class="flex items-center justify-between w-full">
              <div class="flex items-start flex-col justify-evenly space-y-[10px]">
                <div
                  class="w-auto h-[20px] bg-gradient-to-r from-[#FFD97E] via-[#FEE772] to-[#FFF1AD] rounded-[3px] font-[500] text-darkGrey text-[10px] flex items-center justify-start px-1">
                  <div>
                    %{{
                      (
                        ((customCharacterCost.cost -
                          customCharacterCost.offer_cost) /
                          customCharacterCost.cost) *
                        100
                      ).toFixed(2)
                    }}
                    {{ $t("OFF") }}
                  </div>
                </div>
                <div class="flex items-center justify-center">
                  <div
                    class="text-[13px] font-[600] text-darkGrey dark:text-whiteTamkin rtl:pl-[10px] ltr:pr-[10px] leading-[10px]">
                    ${{ customCharacterCost.offer_cost }}
                  </div>
                  <div class="text-[13px] font-[400] text-[#EC5A4E] line-through decoration-[1px] leading-[10px]">
                    ${{ customCharacterCost.cost }}
                  </div>
                </div>
              </div>
            </div>
            <!-- item without a discount -->
            <div class="flex items-end justify-between w-full mt-[5px]" v-if="
              customCharacterCost.cost &&
              (!customCharacterCost.offer_cost ||
                customCharacterCost.offer_cost == 0)
            ">
              <div class="text-[13px] font-[600] text-darkGrey dark:text-whiteTamkin pr-[10px] leading-[10px]">
                ${{ customCharacterCost.cost }}
              </div>
            </div>
          </div>
        </div>
        </div>
    </SplideSlide>
    <SplideSlide v-for="char in playerStore.characters" :key="char.name">
      <div class="market_card_char order-1 cursor-pointer dark:bg-tamkinDarkPrimary" @click="playerStore.changeCharacter(char)" :role="marketStore.owned(char) ? 'button' : ''" :class="[
        playerStore.activeCharacter?.name == char.name
          ? 'bg-selected dark:bg-p custom-border-tamkin padding-override-1  '
          : '',
      ]">
      <div :class="[
        playerStore.activeCharacter?.name == char.name
          ? 'dark:bg-p_secondary'
          : '',
      ]" class="w-full dark:bg-p bg-white flex items-center justify-center rounded-[10px] relative"
        :style="'background-color: ' + char.background_color + '!important;'">
        <div class="h-[120px] flex items-end justify-center">
          <img :src="fullUrl(char.image)" :alt="char.text" class="w-[94px] h-[120px]" />
        </div>
        <div
          class="absolute top-0 left-0 w-[51px] h-[17px] rounded-tl-[10px] flex items-center text-[#021328] justify-center"
          v-if="char.is_used" style="
            background: linear-gradient(
              90deg,
              #71dad2 0%,
              #ade8e4 26.17%,
              #a9e7e2 71.17%,
              #71dad2 100%
            );
          ">
          <div class="text-[10px] leading-[20px] font-[500]">
            {{ $t("Applied") }}
          </div>
        </div>
        <div v-else-if="char.is_pending"
          class="absolute top-0 left-0 w-[64px] bg-gradient-to-r from-yellow-300 to-yellow-100 h-[17px] rounded-tl-[10px] flex items-center text-[#021328] justify-center">
          <div class="text-[10px] font-[500] leading-[10px]">
            {{ $t("Pending") }}
          </div>
        </div>
        <div
          class="absolute top-0 left-0 w-[66px] h-[17px] rounded-tl-[10px] flex items-center text-[#021328] justify-center"
          style="
            background: linear-gradient(
              270deg,
              #b3f8f2 0%,
              #75a7ee 31.17%,
              #d2bcff 60.17%,
              #fde7ea 100%
            );
          " v-else-if="char.is_purchased">
          <div class="text-[10px] font-[500] leading-[20px]">
            {{ $t("Purchased") }}
          </div>
        </div>
        <div
          class="absolute top-0 left-0 w-[56px] h-[17px] bg-gradient-to-r from-[#FED2B6] via-[#FED8D3] to-[#FEF4DD] rounded-tl-[10px] flex items-center text-[#021328] justify-center"
          v-else-if="char.is_package">
          <div class="text-[10px] font-[500] leading-[20px]">
            {{ $t("Package") }}
          </div>
        </div>
        <div v-else-if="char.is_special_offer"
          class="absolute top-0 left-0 w-[64px] h-[17px] bg-[#F36363] rounded-[3px] flex items-center justify-center">
          <div class="text-[9px] leading-[20px] text-whiteTamkin">
            {{ $t("Special Offer") }}
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center w-full items-evenly space-y-[4px] p-1">
        <h1 :class="[
          playerStore.activeCharacter?.name == char.name
            ? 'dark:text-whiteTamkin'
            : 'dark:text-whiteTamkin ',
        ]" class="text-[11px] font-[500] w-full leading-[17px] mt-2">
          {{ $t(char.text) }}
        </h1>
        <p :class="[
          playerStore.activeCharacter?.name == char.name
            ? 'dark:text-whiteTamkin'
            : 'dark:text-whiteTamkin ',
        ]" class="text-[10px] font-[300] leading-[17px] max-w-2/4 truncate">
          {{ $t(char.description) }}
        </p>

        <!-- <div v-if="char.specialOffer || char.offer_cost > 0 || char.package" class="flex flex-col"> -->
        <div class="flex flex-col !mt-[16px]">
          <!-- item with discount -->
          <div v-if="marketStore.cartable(char) && char.offer_cost > 0"
            class="flex items-center justify-between w-full">
            <div class="flex items-start flex-col justify-evenly space-y-[10px]">
              <div
                class="w-auto h-[20px] bg-gradient-to-r from-[#FFD97E] via-[#FEE772] to-[#FFF1AD] rounded-[3px] font-[500] text-darkGrey text-[10px] flex items-center justify-start px-1">
                <div>
                  %{{
                    (((char.cost - char.offer_cost) / char.cost) * 100).toFixed(
                      2
                    )
                  }}
                  {{ $t("OFF") }}
                </div>
              </div>
              <div class="flex items-center justify-center">
                <div :class="[
                  playerStore.activeCharacter?.name == char.name
                    ? 'dark:text-whiteTamkin'
                    : 'dark:text-whiteTamkin ',
                ]" class="text-[13px] font-[600] rtl:pl-[10px] ltr:pr-[10px] leading-[10px]">
                  ${{ char.offer_cost }}
                </div>
                <div class="text-[13px] font-[400] text-[#EC5A4E] line-through decoration-[1px] leading-[10px]">
                  ${{ char.cost }}
                </div>
              </div>
            </div>
            <button :disabled="!defaultApp" v-if="marketStore.cartable(char)" @click.stop="() => {
                if (defaultApp) {
                  marketStore.addToCart(char, 'character');
                }
              }
              " :class="[
                marketStore.isInCart(char.name)
                  ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                  : !defaultApp
                    ? 'bg-opacity-40 !cursor-not-allowed '
                    : '',
              ]"
              class="disabled:bg-gray-200 hover:disabled:bg-gray-200 bg-white dark:bg-darkTamkin hover:bg-gradient-to-b from-tamkinStart to-tamkinEnd disabled:hover:border-0 disabled:hover:bg-none disabled:cursor-not-allowed relative mt-[10px] cursor-pointer group w-[35px] h-[35px] rtl:mr-auto ltr:ml-auto hover:border-0 rounded-lg flex items-center justify-center border dark:border-darkborder">
              <div v-if="!defaultApp"
                class="absolute bottom-[44px] ltr:right-[20%] rtl:left-[20%] w-[150px] bg-[#747171] text-white text-[10px] text-center leading-[15px] font-[500] rounded-md py-1 hidden group-hover:block !opacity-100 transition-opacity duration-200">
                {{ $t("You have to set A default website to use the market") }}
              </div>
              <svg :class="[
                marketStore.isInCart(char.name)
                  ? 'text-white'
                  : 'text-tamkin',
                !defaultApp ? '!text-tamkin' : '',
              ]" class="group-hover:text-white" width="25" height="25" viewBox="0 0 23 23" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.08 12.2849H7.22568L5.65425 4.42773H21.3685C21.4835 4.42816 21.5969 4.45378 21.7008 4.5028C21.8048 4.55182 21.8967 4.62304 21.9701 4.71145C22.0435 4.79985 22.0967 4.90329 22.1258 5.01446C22.1549 5.12563 22.1592 5.24184 22.1385 5.35488L20.85 11.6406C20.8199 11.8223 20.7257 11.9873 20.5844 12.1055C20.4431 12.2237 20.2642 12.2873 20.08 12.2849Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M5.6543 4.42801L4.9943 1.91373C4.95807 1.73626 4.86164 1.57675 4.72132 1.46221C4.58101 1.34767 4.40543 1.28512 4.2243 1.28516H1.72573"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M7.22656 12.2852L7.88656 15.5852C7.92279 15.7626 8.01922 15.9221 8.15954 16.0367C8.29985 16.1512 8.47543 16.2138 8.65656 16.2137H18.2266"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M17.4408 21.714C17.0069 21.714 16.6551 21.3622 16.6551 20.9283C16.6551 20.4944 17.0069 20.1426 17.4408 20.1426C17.8748 20.1426 18.2266 20.4944 18.2266 20.9283C18.2266 21.3622 17.8748 21.714 17.4408 21.714Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M9.58343 21.714C9.14949 21.714 8.79771 21.3622 8.79771 20.9283C8.79771 20.4944 9.14949 20.1426 9.58343 20.1426C10.0174 20.1426 10.3691 20.4944 10.3691 20.9283C10.3691 21.3622 10.0174 21.714 9.58343 21.714Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
          <!-- item without a discount -->
          <div class="flex items-end justify-between w-full mt-[5px]" v-if="
            marketStore.cartable(char) &&
            char.cost &&
            (!char.offer_cost || char.offer_cost == 0)
          ">
            <div class="text-[13px] font-[600] text-darkGrey dark:text-whiteTamkin pr-[10px] leading-[10px]">
              ${{ char.cost }}
            </div>
            <button :disabled="!defaultApp" @click.stop="marketStore.addToCart(char, 'character')" :class="[
              marketStore.isInCart(char.name)
                ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                : '',
            ]"
              class="disabled:bg-gray-200 hover:disabled:bg-gray-200 bg-white dark:bg-darkTamkin hover:bg-gradient-to-b from-tamkinStart to-tamkinEnd disabled:hover:border-0 disabled:hover:bg-none disabled:cursor-not-allowed relative mt-[10px] cursor-pointer group w-[35px] h-[35px] rtl:mr-auto ltr:ml-auto hover:border-0 rounded-lg flex items-center justify-center border dark:border-darkborder">
              <svg :class="[
                marketStore.isInCart(char.name)
                  ? 'text-white'
                  : 'text-tamkin',
                !defaultApp ? '!text-tamkin' : '',
              ]" class="group-hover:text-white" width="25" height="25" viewBox="0 0 23 23" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.08 12.2849H7.22568L5.65425 4.42773H21.3685C21.4835 4.42816 21.5969 4.45378 21.7008 4.5028C21.8048 4.55182 21.8967 4.62304 21.9701 4.71145C22.0435 4.79985 22.0967 4.90329 22.1258 5.01446C22.1549 5.12563 22.1592 5.24184 22.1385 5.35488L20.85 11.6406C20.8199 11.8223 20.7257 11.9873 20.5844 12.1055C20.4431 12.2237 20.2642 12.2873 20.08 12.2849Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M5.6543 4.42801L4.9943 1.91373C4.95807 1.73626 4.86164 1.57675 4.72132 1.46221C4.58101 1.34767 4.40543 1.28512 4.2243 1.28516H1.72573"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M7.22656 12.2852L7.88656 15.5852C7.92279 15.7626 8.01922 15.9221 8.15954 16.0367C8.29985 16.1512 8.47543 16.2138 8.65656 16.2137H18.2266"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M17.4408 21.714C17.0069 21.714 16.6551 21.3622 16.6551 20.9283C16.6551 20.4944 17.0069 20.1426 17.4408 20.1426C17.8748 20.1426 18.2266 20.4944 18.2266 20.9283C18.2266 21.3622 17.8748 21.714 17.4408 21.714Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M9.58343 21.714C9.14949 21.714 8.79771 21.3622 8.79771 20.9283C8.79771 20.4944 9.14949 20.1426 9.58343 20.1426C10.0174 20.1426 10.3691 20.4944 10.3691 20.9283C10.3691 21.3622 10.0174 21.714 9.58343 21.714Z"
                  stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <!-- <div v-else class="flex-grow"></div> -->
      </div>
    </div>
    </SplideSlide>
  </Splide>

  <!--========= Loader Component =========-->
  <div v-if="loadingChars"
    class="grid grid-cols-2 ipad-max:grid-cols-3 lg:grid-cols-5 md:grid-cols-4 overflow-x-hidden 2xl:grid-cols-5 bg-white dark:bg-[#344153] pt-4 !pb-4 px-[15px] rounded-b-[10px] gap-4 lg:gap-2 2xl:gap-2 ipad-max:gap-8 relative z-[10]">
    <div v-for="i in 5" :key="i" class="market_card_char animate-pulse order-1 cursor-pointer">
      <div class="w-full bg-gray-300 dark:bg-[#3a4a60] flex items-center justify-center rounded-[10px] relative">
        <div class="h-[120px] flex items-end justify-center"></div>
      </div>
      <div class="flex flex-col justify-center w-full items-evenly space-y-[10px] p-1">
        <div class="h-[14px] w-[60%] bg-gray-300 dark:bg-gray-700 rounded mt-2"></div>
        <div class="flex flex-col !mt-[30px] space-y-[5px]">
          <div class="flex items-center justify-between w-full mt-[24px]">
            <div class="bg-gray-300 dark:bg-gray-700 h-[20px] w-[35%] rounded"></div>
            <div class="w-[35px] h-[35px] bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
