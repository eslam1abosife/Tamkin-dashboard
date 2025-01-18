<script lang="ts" setup>
import { useMarketStore } from "@/stores/market.js";
import cartAnimate from '~/assets/animation/cart.json'
import { Vue3Lottie } from 'vue3-lottie'
const marketStore = useMarketStore();
const navStore = useNavbarStore();

onMounted(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Use 'smooth' for a smooth scroll or 'auto' for an instant scroll
  });
});
</script>

<template>
    <div 
    class="fixed z-[9999] top-[140px] rtl:right-[400px] ltr:right-[110px] rounded-[16px] shadow-xl w-[246px] h-[220px] bg-white dark:bg-tamkinDarkPrimary"
    >
<div class="flex items-center justify-evenly flex-col ">
    <div class="absolute shadow-2xl top-[15px]  right-[-15px]">
        <img :src="`/assets/pngs/market/${navStore.isDark ? 'Union_dark.svg' : 'Union.svg'}`" alt="arrow">
    </div>
    <Vue3Lottie :animationData="cartAnimate" :height="60" :width="60" :no-margin="true"
    />
        <div >
            <h1 class="text-[14px] font-[500] text-tamkin">{{$t('Your Item added here')}}</h1>
        </div>
    
    <div class=" p-[24px]">
        <p class="text-[13px] font-[400] text-darkGrey dark:text-white text-center">{{$t('click on the cart icon to check your items cart')}}</p>
    </div>
    <div>
        <button class="btn-dashboard hover_tamkin" @click="marketStore.closeCartNotification">
            {{ $t('Done') }}
        </button>
    </div>
</div>
    </div>

</template>