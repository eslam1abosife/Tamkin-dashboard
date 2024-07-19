<script lang="ts" setup>
import { useMarketStore } from "@/stores/market.js";
definePageMeta({
  layout: "dashboard",
});

const marketStore = useMarketStore();
const cartItemCount = computed(() => marketStore.cartItems.length);
const showBadge = ref(false);
const { resetModal } = storeToRefs(marketStore);
watch(cartItemCount, (newCount, oldCount) => {
  if (newCount > 0 && newCount !== oldCount) {
    showBadge.value = true;
    setTimeout(() => (showBadge.value = false), 500); // Hide after animation
  }
});

function beforeEnter(el) {
  el.style.transform = "scale(0)";
  el.style.opacity = "0";
}

function enter(el, done) {
  el.offsetWidth; // Force reflow
  el.style.transition = "all 0.5s ease";
  el.style.transform = "scale(1)";
  el.style.opacity = "1";
  done();
}

function leave(el, done) {
  el.style.transition = "all 0.5s ease";
  el.style.transform = "scale(0)";
  el.style.opacity = "0";
  setTimeout(done, 500);
}

///7

function beforeEnterCart(el) {
  el.style.transform = "translateX(100%)";
  el.style.opacity = "0";
}

function enterCart(el, done) {
  setTimeout(() => {
    el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
    done();
  }, 0);
}

function leaveCart(el, done) {
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  el.style.transform = "translateX(100%)";
  el.style.opacity = "0";
  setTimeout(() => {
    done();
  }, 500);
}
</script>

<template>
  <div class="relative">
    <transition @before-enter="beforeEnterCart" @enter="enterCart" @leave="leaveCart">
      <MarketModalCart v-if="marketStore.showCart" key="cart_popup" id="test" />
    </transition>
    <transition @before-enter="beforeEnterCart" @enter="enterCart" @leave="leaveCart">
      <MarketModalRequest v-if="marketStore.requestModal" key="request_modal_popup" />
    </transition>
    <MarketModalReset v-if="resetModal" />
    <transition @before-enter="beforeEnterCart" @enter="enterCart" @leave="leaveCart">

    <MarketModalCartNotification v-if="marketStore.firstItemNotificationShown" />
  </transition>
    <div class="w-full h-full relative">
      <h1 class="ltr:text-left rtl:text-right text-[18px] font-[600]">Market</h1>
      <div
        class="bg-[#EEF1F3] rounded-[10px] w-full h-[300px] flex items-end justify-center relative"
      >
      <div
      @click="marketStore.openCart"
      class="cursor-pointer w-[35px] h-[35px] rounded-lg flex items-center justify-center absolute top-[16px] right-[16px] bg-transparent transition-colors duration-500 ease-in-out"
      :class="[
        marketStore.firstItemNotificationShown
          ? 'bg-gradient-to-b from-tamkinStart to-tamkinEnd z-[200]'
          : 'bg-white',
      ]"
    >
          <transition
            name="grow"
            @before-enter="beforeEnter"
            @enter="enter"
            @leave="leave"
          >
            <div
              v-if="cartItemCount"
              key="cart-badge"
              class="absolute -top-2 -right-1 bg-[#EA4335] w-[16px] h-[16px] rounded-full flex items-center justify-center text-white font-[600] text-[10px]"
            >
              {{ cartItemCount }}
            </div>
          </transition>
  
          <svg
                 :class="[marketStore.firstItemNotificationShown ? 'text-white ' :'text-tamkin']"
            class="group-hover:text-white animate_cart"
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

        <div
          class="flex items-center justify-evenly absolute bottom-[16px] right-[16px] space-x-[32px]"
        >
          <div
            class="cursor-pointer w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center"
            @click="marketStore.openResetModal"
          >
            <img src="/assets/pngs/market/reset.png" class="w-[21px] h-[21px]" alt="" />
          </div>
          <div
            class="cursor-pointer w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center"
          >
            <img src="/assets/pngs/market/expand.png" class="w-[21px] h-[21px]" alt="" />
          </div>
        </div>
        <div>
          <img src="/assets/pngs/market/man.png" alt="" />
        </div>
      </div>

      <MarketNavbar />

      <MarketCharacter v-if="marketStore.currentTab === 'character'" />
      <MarketTop v-if="marketStore.currentTab === 'top'" />
      <MarketBelt v-if="marketStore.currentTab === 'belt'" />
      <MarketBottom v-if="marketStore.currentTab === 'bottom'" />
      <MarketCap v-if="marketStore.currentTab === 'cap'" />
      <MarketOutfit v-if="marketStore.currentTab === 'outfit'" />
      <MarketBackground v-if="marketStore.currentTab === 'background'" />
      <MarketTies v-if="marketStore.currentTab === 'ties'" />
      <MarketGlasses v-if="marketStore.currentTab === 'glasses'" />
      <MarketShoes v-if="marketStore.currentTab === 'shoes'" />
    </div>
  </div>
</template>

<style>
.market_card_char {
  @apply cursor-pointer ipad-max:col-span-4 lg:col-span-3 2xl:col-span-1 col-span-6 p-3 h-full w-[200px] border-[1px]
     border-[#E6E8EC] flex flex-col items-center justify-start rounded-[10px]  space-y-[10px];
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.animate-bounce {
  animation: bounce 1s;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.animate-scale {
  animation: scale 0.5s;
}
.grow-enter-active,
.grow-leave-active {
  transition: all 0.5s ease;
}

.grow-enter,
.grow-leave-to {
  transform: scale(0);
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active,
.slide-appear-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter,
.slide-leave-to,
.slide-appear {
  transform: translateX(100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave,
.slide-appear-to {
  transform: translateX(0);
  opacity: 1;
}
</style>
