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

const currentPlan = ref("tryit");
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
  <TranslateModalsShare/>
      <TranslateModalsTranslate v-if="isOpen('translate_video')" translate-type="video" key="video_modal" />
      <TranslateModalsTranslate v-if="isOpen('translate_audio')" translate-type="audio" />
      <TranslateModalsTranslate v-if="isOpen('translate_live_video')" translate-type="live video" />
    <div class="mb-[16px]" id="package" >
      <div class="flex items-center justify-between w-full">
        <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
      {{$t('Media services')}}
      </h1>

   
      </div>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      {{ $t('We make translations easy, convenient, and closer than ever for your enjoyment.') }}      </h2>
    </div>

    <TranslatePackage :type="currentPlan" @change-plan="changePlan" id="types" />
    <TranslateTypes :plan="currentPlan"/>
    <TranslatePlan />
<TranslateHerobanner/>
    <TranslateStats
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslatePlanCard
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslateTable type="Translate Videos"/>
  </div>
</template>
