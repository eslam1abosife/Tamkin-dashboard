<script lang="ts" setup>

import {useMarketStore} from '@/stores/market.js'
definePageMeta({
    layout:'dashboard'
})

const marketStore = useMarketStore()
const cartItemCount = computed(() => marketStore.cartItems.length);
const showBadge = ref(false);
const {resetModal} = storeToRefs(marketStore)
watch(cartItemCount, (newCount, oldCount) => {
  if (newCount > 0 && newCount !== oldCount) {
    showBadge.value = true;
    setTimeout(() => showBadge.value = false, 500); // Hide after animation
  }
});

function beforeEnter(el) {
  el.style.transform = 'scale(0)';
  el.style.opacity = '0';
}

function enter(el, done) {
  el.offsetWidth; // Force reflow
  el.style.transition = 'all 0.5s ease';
  el.style.transform = 'scale(1)';
  el.style.opacity = '1';
  done();
}

function leave(el, done) {
  el.style.transition = 'all 0.5s ease';
  el.style.transform = 'scale(0)';
  el.style.opacity = '0';
  setTimeout(done, 500);
}



///7

function beforeEnterCart(el) {
  el.style.transform = 'translateX(100%)';
  el.style.opacity = '0';
}

function enterCart(el, done) {
  setTimeout(() => {
    el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    el.style.transform = 'translateX(0)';
    el.style.opacity = '1';
    done();
  }, 0);
}

function leaveCart(el, done) {
  el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
  el.style.transform = 'translateX(100%)';
  el.style.opacity = '0';
  setTimeout(() => {
    done();
  }, 500);
}
</script>



<template>



<div class="relative">
    <transition @before-enter="beforeEnterCart" @enter="enterCart" @leave="leaveCart">
        <MarketModalCart v-if="marketStore.showCart" key="cart_popup" id="test"/>
      </transition>
      <transition @before-enter="beforeEnterCart" @enter="enterCart" @leave="leaveCart">
        <MarketModalRequest v-if="marketStore.requestModal" key="request_modal_popup" />
      </transition>
      <MarketModalReset  v-if="resetModal"/>
  
    <div class="w-full h-full relative">

        <h1 class="ltr:text-left rtl:text-right text-[18px] font-[600]">Market</h1>
     <div class="bg-[#EEF1F3] rounded-[10px] w-full h-[300px] flex items-end justify-center relative ">
     
        
        <div @click="marketStore.openCart" class="cursor-pointer w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center absolute top-[16px] right-[16px] ">
            <transition name="grow" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="cartItemCount" key="cart-badge"
                     class="absolute -top-2 -right-1 bg-[#EA4335] w-[16px] h-[16px] rounded-full flex items-center justify-center 
                     text-white font-[600] text-[10px]">
                  {{ cartItemCount }}
                </div>
              </transition>
            <img src="/assets/pngs/market/cart.png"  class="w-[25px] h-[25px] animate_cart " alt="">
        </div>
        

    <div class="flex items-center justify-evenly absolute bottom-[16px] right-[16px] space-x-[32px]">
        <div class="cursor-pointer w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center" 
         @click="marketStore.openResetModal">
            <img src="/assets/pngs/market/reset.png"  class="w-[21px] h-[21px] " alt="">
        </div>
        <div class="cursor-pointer w-[35px] h-[35px] bg-white rounded-lg flex items-center justify-center  ">
            <img src="/assets/pngs/market/expand.png"  class="w-[21px] h-[21px] " alt="">
        </div>
    </div>
        <div>

            <img src="/assets/pngs/market/man.png" alt="">

        </div>
     </div>
        
  <MarketNavbar/>

    

<MarketCharacter v-if="marketStore.currentTab === 'character'"/>
<MarketTop v-if="marketStore.currentTab === 'top'"/>
<MarketBelt v-if="marketStore.currentTab === 'belt'"/>
<MarketBottom v-if="marketStore.currentTab === 'bottom'"/>
<MarketCap v-if="marketStore.currentTab === 'cap'"/>
<MarketOutfit v-if="marketStore.currentTab === 'outfit'"/>
<MarketBackground v-if="marketStore.currentTab === 'background'"/>
<MarketTies v-if="marketStore.currentTab === 'ties'"/>
<MarketGlasses v-if="marketStore.currentTab === 'glasses'"/>
<MarketShoes v-if="marketStore.currentTab === 'shoes'"/>
  
      

  
    </div>
</div>




</template>


<style>

.market_card_char{
   

    @apply  ipad-max:col-span-4 lg:col-span-3 2xl:col-span-1 col-span-6 p-3 h-full w-[200px] border-[1px]
     border-[#E6E8EC] flex flex-col items-center justify-start rounded-[10px]  space-y-[10px];
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
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
.grow-enter-active, .grow-leave-active {
    transition: all 0.5s ease;
  }
  
  .grow-enter, .grow-leave-to {
    transform: scale(0);
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active, .slide-appear-active {
    transition: transform 0.5s ease, opacity 0.5s ease;
  }
  
  .slide-enter, .slide-leave-to, .slide-appear {
    transform: translateX(100%);
    opacity: 0;
  }
  
  .slide-enter-to, .slide-leave, .slide-appear-to {
    transform: translateX(0);
    opacity: 1;
  }
</style>