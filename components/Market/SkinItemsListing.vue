<script setup>
import { useMarketStore } from "@/stores/market";
import { usePlayerStore } from "@/stores/player";
import { useFullUrl } from "@/composables/useSharedFunctions";
const { fullUrl } = useFullUrl();

const marketStore = useMarketStore();
const playerStore = usePlayerStore();
const props = defineProps(["currentCategoryWithSkinItems"]);
</script>

<template>
  <div
    class="grid grid-cols-12 lg:grid-cols-5 md:grid-cols-4 overflow-x-hidden 2xl:grid-cols-5 ipad-max:grid-cols-5 bg-white pt-4 !pb-4 px-[15px] rounded-b-[10px] lg:gap-2 2xl:gap-2 ipad-max:gap-8 relative z-[10]">
    <!-- @click.stop="marketStore.selectItemforPreview(skin_item)" -->
    <div
      v-if="currentCategoryWithSkinItems.skin_items_list.length > 0"
      class="market_card_char order-1 cursor-pointer"
      @click="playerStore.wearClothes(skin_item)" :role="marketStore.owned(skin_item) ? 'button' : ''"
      v-for="skin_item in currentCategoryWithSkinItems.skin_items_list"
      :key="skin_item.name"
      :class="[
        playerStore.lastClickedSkinItemName == skin_item.name
          ? '!bg-selected custom-border-tamkin padding-override-1'
          : '',
      ]"
      >
      <div class="w-full bg-[#f2efef] flex items-center justify-center rounded-[10px] relative">
        <div class="h-[120px] flex items-center justify-center">
          <img :src="fullUrl(skin_item.image)" class="w-[78px] h-[78px]" :alt="skin_item.text" />
        </div>
        <div
          class="absolute top-0 left-0 w-[51px] h-[17px] rounded-tl-[10px] flex items-center text-[#021328] justify-center"
          v-if="skin_item.is_weared"
          style="
            background: linear-gradient(
              90deg,
              #71dad2 0%,
              #ade8e4 26.17%,
              #a9e7e2 71.17%,
              #71dad2 100%
            );
          "
        >
          <div class="text-[9px] leading-[10px] font-[500]">{{$t('Applied')}}</div>
        </div>
        <div
          v-else-if="skin_item.is_purchased"
          class="absolute top-0 left-0 w-[64px] h-[17px] rounded-tl-[10px] flex items-center text-[#021328] justify-center"
          style="
            background: linear-gradient(
              270deg,
              #b3f8f2 0%,
              #75a7ee 31.17%,
              #d2bcff 60.17%,
              #fde7ea 100%
            );
          "
        >
          <div class="text-[10px] font-[500] leading-[10px]">{{$t('Purchased')}}</div>
        </div>
        <div
          class="absolute top-0 left-0 w-[64px] h-[17px] bg-gradient-to-r from-[#FED2B6] via-[#FED8D3] to-[#FEF4DD] rounded-tl-[10px] flex items-center text-[#021328] justify-center"
          v-else-if="skin_item.is_package">
          <div class="text-[10px] font-[500] leading-[10px]">{{$t('Package')}}</div>
        </div>
        <div
          class="absolute top-0 left-0 w-[64px] h-[17px] bg-[#F36363] rounded-[3px] flex items-center text-white justify-center"
          v-else-if="skin_item.is_special_offer"
        >
          <div class="text-[9px] leading-[10px]">{{$t('Special Offer')}}</div>
        </div>
      </div>
      <div class="flex flex-col justify-center items-evenly w-full space-y-[10px] p-1">
        <h1 class="text-[11px] font-[500] w-full text-darkGrey leading-[17px] mt-2">
          {{ $t(skin_item.text) }}
        </h1>
        <p
        class="text-[10px] font-[300]  text-darkGrey dark:text-whiteTamkin leading-[17px] max-w-2/4 truncate "
      >
        {{ $t(`${skin_item.description}`)}} 
      </p>
        <!-- <div v-if="skin_item.specialOffer || skin_item.discount || skin_item.package" class="flex flex-col"> -->
        <div class="flex flex-col !mt-[16px]">
          <div
            v-if="marketStore.cartable(skin_item) && skin_item.offer_cost > 0"
            class="flex items-center justify-between w-full"
            >
            <div class="flex items-start flex-col justify-evenly space-y-[10px]">
              <div
                class="w-[80px] h-[20px] bg-gradient-to-r from-[#FFD97E] via-[#FEE772] to-[#FFF1AD] rounded-[3px] font-[500] text-darkGrey text-[11px] flex items-center justify-center"
                class2="w-auto h-[20px] bg-gradient-to-r from-[#FFD97E] via-[#FEE772] to-[#FFF1AD] rounded-[3px] font-[500] text-darkGrey text-[10px] flex items-center justify-start px-1"
                >
                <div>%{{ (((skin_item.cost - skin_item.offer_cost) / skin_item.cost) * 100).toFixed(2) }} {{$t('OFF')}}</div>
              </div>
              <div class="flex items-center justify-center">
                <div class="text-[13px] font-[600] text-darkGrey rtl:pl-[10px] ltr:pr-[10px] leading-[10px]">
                  ${{ skin_item.offer_cost }}
                </div>
                <div
                  class="text-[13px] font-[400] text-[#EC5A4E] line-through decoration-[1px] leading-[10px]"
                >
                  ${{ skin_item.cost }}
                </div>
              </div>
            </div>
            <div
              @click.stop="marketStore.addToCart(skin_item, 'skin_Item', currentCategoryWithSkinItems.text, currentCategoryWithSkinItems.file, )"
              :class="[
                marketStore.isInCart(skin_item.name)
                  ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                  : '',
              ]"
              class="mt-[10px] cursor-pointer group w-[35px] h-[35px] rtl:mr-auto ltr:ml-auto hover:border-0 bg-white hover:bg-gradient-to-b from-tamkinStart to-tamkinEnd rounded-lg flex items-center justify-center border"
            >
              <svg
                :class="[
                  marketStore.isInCart(skin_item.name)
                    ? 'text-white'
                    : 'text-tamkin',
                ]"
                class="group-hover:text-white"
                width="25"
                height="25"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.08 12.2849H7.22568L5.65425 4.42773H21.3685C21.4835 4.42816 21.5969 4.45378 21.7008 4.5028C21.8048 4.55182 21.8967 4.62304 21.9701 4.71145C22.0435 4.79985 22.0967 4.90329 22.1258 5.01446C22.1549 5.12563 22.1592 5.24184 22.1385 5.35488L20.85 11.6406C20.8199 11.8223 20.7257 11.9873 20.5844 12.1055C20.4431 12.2237 20.2642 12.2873 20.08 12.2849Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.6543 4.42801L4.9943 1.91373C4.95807 1.73626 4.86164 1.57675 4.72132 1.46221C4.58101 1.34767 4.40543 1.28512 4.2243 1.28516H1.72573"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.22656 12.2852L7.88656 15.5852C7.92279 15.7626 8.01922 15.9221 8.15954 16.0367C8.29985 16.1512 8.47543 16.2138 8.65656 16.2137H18.2266"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.4408 21.714C17.0069 21.714 16.6551 21.3622 16.6551 20.9283C16.6551 20.4944 17.0069 20.1426 17.4408 20.1426C17.8748 20.1426 18.2266 20.4944 18.2266 20.9283C18.2266 21.3622 17.8748 21.714 17.4408 21.714Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.58343 21.714C9.14949 21.714 8.79771 21.3622 8.79771 20.9283C8.79771 20.4944 9.14949 20.1426 9.58343 20.1426C10.0174 20.1426 10.3691 20.4944 10.3691 20.9283C10.3691 21.3622 10.0174 21.714 9.58343 21.714Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div
            class="flex items-end justify-between w-full "
            v-if="marketStore.cartable(skin_item) && skin_item.cost && (!skin_item.offer_cost || skin_item.offer_cost == 0)"
          >
            <div
              class="text-[13px] font-[600] text-darkGrey rtl:pl-[10px] ltr:pr-[10px] leading-[10px]"
            >
              ${{ skin_item.cost }}
            </div>
            <div
              @click.stop="marketStore.addToCart(skin_item, 'skin_Item', currentCategoryWithSkinItems.text, currentCategoryWithSkinItems.file)"
              :class="[
                marketStore.isInCart(skin_item.name)
                  ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd'
                  : '',
              ]"
              class="cursor-pointer group w-[35px] h-[35px] rtl:mr-auto ltr:ml-auto hover:border-0 bg-white hover:bg-gradient-to-b from-tamkinStart to-tamkinEnd rounded-lg flex items-center justify-center border"
            >
              <svg
                :class="[
                  marketStore.isInCart(skin_item.name)
                    ? 'text-white'
                    : 'text-tamkin',
                ]"
                class="group-hover:text-white"
                width="25"
                height="25"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.08 12.2849H7.22568L5.65425 4.42773H21.3685C21.4835 4.42816 21.5969 4.45378 21.7008 4.5028C21.8048 4.55182 21.8967 4.62304 21.9701 4.71145C22.0435 4.79985 22.0967 4.90329 22.1258 5.01446C22.1549 5.12563 22.1592 5.24184 22.1385 5.35488L20.85 11.6406C20.8199 11.8223 20.7257 11.9873 20.5844 12.1055C20.4431 12.2237 20.2642 12.2873 20.08 12.2849Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.6543 4.42801L4.9943 1.91373C4.95807 1.73626 4.86164 1.57675 4.72132 1.46221C4.58101 1.34767 4.40543 1.28512 4.2243 1.28516H1.72573"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.22656 12.2852L7.88656 15.5852C7.92279 15.7626 8.01922 15.9221 8.15954 16.0367C8.29985 16.1512 8.47543 16.2138 8.65656 16.2137H18.2266"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.4408 21.714C17.0069 21.714 16.6551 21.3622 16.6551 20.9283C16.6551 20.4944 17.0069 20.1426 17.4408 20.1426C17.8748 20.1426 18.2266 20.4944 18.2266 20.9283C18.2266 21.3622 17.8748 21.714 17.4408 21.714Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.58343 21.714C9.14949 21.714 8.79771 21.3622 8.79771 20.9283C8.79771 20.4944 9.14949 20.1426 9.58343 20.1426C10.0174 20.1426 10.3691 20.4944 10.3691 20.9283C10.3691 21.3622 10.0174 21.714 9.58343 21.714Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-else class="w-full">
      <div class="w-full bg-[#f2efef] flex items-center justify-center rounded-[10px] relative">
          No data found!
      </div>
    </div> -->
  </div>
</template>
