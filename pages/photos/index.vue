<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
definePageMeta({
  layout: "dashboard",
middleware:['auth','permissions'],

});

const currentPlan = ref("freetrial");
const changePlan = (plan: string) => {
  currentPlan.value = plan;
};


function beforeEnterNotification(el) {
  el.style.transform = "translateX(100%)";
  el.style.opacity = "0";
}

function enterNotification(el, done) {
  // Set the initial position and opacity
  el.style.transform = "translateX(50px)";
  el.style.opacity = "0";

  // Trigger reflow to ensure the initial styles are applied
  el.offsetHeight;

  // Start the transition
  setTimeout(() => {
    el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
    done();
  }, 0);
}

function leaveNotification(el, done) {
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  el.style.transform = "translateX(50px)";
  el.style.opacity = "0";
  setTimeout(() => {
    done();
  }, 500);
}
</script>

<template>
  <div class="w-full h-full relative">
    <TranslateModalsUpgrade/>
  
  

      <TranslatephotosModalsTranslate v-if="isOpen('translate_images')" />

    <div class="space-y-[10px] mb-[16px]">
      <div class="flex items-center justify-between w-full">
        <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
      Photo Services    </h1>

      <div class="bg-gradient-to-br from-[#E0F8F8] via-[#F9E8FF] to-[#FFE9EE] space-x-[8px] h-[41px] flex items-center justify-start rounded-[5px] -shadow-y-1 px-[24px]">
        <div>
          <img src="/assets/imgs/icons/tamkin_small.svg" alt="">
        </div>
        <div class="text-[12px] font-[500] text-darkGrey">
          Tamkin.App
        </div>
      </div>
      </div>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      We make translations easy, convenient, and closer than ever for your enjoyment.     </h2>
    </div>


 
    <TranslatephotosPackage :type="currentPlan" @change-plan="changePlan" />
    <TranslatephotosTypes :plan="currentPlan" />
    <TranslatePlan />
    <TranslateStats
      v-if="currentPlan === 'freetrial_Ex' || currentPlan === 'pro_pack'"
    />
    <TranslatePlanCard
      v-if="currentPlan === 'freetrial_Ex' || currentPlan === 'pro_pack'"
    />
    <TranslatephotosTable/>
  </div>
</template>
