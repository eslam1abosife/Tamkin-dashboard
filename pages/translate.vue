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
    <TranslateModalsRename/>
    <TranslateModalsUpgrade/>
    <transition @before-enter="beforeEnterNotification" @enter="enterNotification" @leave="leaveNotification">
      <TranslateVideoModalsTranslate v-if="isOpen('translate_video')" key="video_modal" />
    </transition>
    <transition @before-enter="beforeEnterNotification" @enter="enterNotification" @leave="leaveNotification">
      <TranslateAudioModalsTranslate v-if="isOpen('translate_audio')" key="audio_modal"  />
    </transition>
    <div class="space-y-[10px] mb-[16px]">
      <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
        Translate video
      </h1>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
        We make translations easy, convenient, and closer than ever for your enjoyment.
      </h2>
    </div>

    <TranslateVideoPlan />
    <TranslateVideoPackage :type="currentPlan" @change-plan="changePlan" />
    <TranslateVideoTypes />

    <TranslateVideoStats
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslatePlanCard
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslateVideoTable />
  </div>
</template>
