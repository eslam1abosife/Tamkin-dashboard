<script lang="ts" setup>
import { useMarketStore } from "@/stores/market.js";
import cartAnimate from '~/assets/animation/cart.json'
import { Vue3Lottie } from 'vue3-lottie'
const marketStore = useMarketStore();

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Use 'smooth' for a smooth scroll or 'auto' for an instant scroll
  });
});
</script>

<template>
    <div 
    class=" fixed z-[9999] top-[150px]  right-[110px]   rounded-[16px] shadow-xl
       w-[246px] h-[280px]  bg-white flex  items-center justify-start flex-col space-y-[16px]"
    >
<div class="absolute shadow-2xl top-[15px]  right-[-15px]">
    <img src="/assets/pngs/market/Union.svg" alt="">
</div>
    <div>
        <Vue3Lottie :animationData="cartAnimate" :height="90" :width="90" :no-margin="true"
        />
    </div>
    <div>
        <h1 class="text-[14px] font-[500] text-tamkin">Your Item added here </h1>
    </div>

<div>
    <p class="text-[13px] font-[400] text-darkGrey text-center">click on the cart icon to check your items cart</p>
</div>
<div>
    <button class="btn-dashboard hover_tamkin" @click="marketStore.closeCartNotification">
        Done
    </button>
</div>
    </div>

</template>