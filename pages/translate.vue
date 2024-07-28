<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

const currentPlan = ref("freetrial");
const changePlan = (plan: string) => {
  currentPlan.value = plan;
};
</script>

<template>
  <div class="w-full h-full relative">
    <!-- <transition>
      <TranslateVideoModalsTranslate key="cart_popup" id="test" />
    </transition> -->
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
