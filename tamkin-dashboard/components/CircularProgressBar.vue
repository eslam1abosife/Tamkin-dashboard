<template>
  <div class="circle-container">
    <svg width="250" height="250" viewBox="0 0 250 250">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: #2dada3; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #71dad2; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <circle class="circle-bg" cx="125" cy="125" r="105" />
      <circle
        class="circle-progress"
        :stroke-dashoffset="offset"
        cx="125"
        cy="125"
        r="105"
        stroke="url(#gradient)"
        stroke-dasharray="659.73"
      />
      <circle class="circle-dotted" cx="125" cy="125" r="85" stroke="url(#gradient)" />
    </svg>
    <div class="content flex  flex-col space-y-2">
      <div class="text-[32px] leading-[26px] font-[600] text-darkGrey dark:text-whiteTamkin">
        {{ initialPercentage }}%
      </div>
      <div class="text-[32px] leading-[26px] font-[600] text-darkGrey dark:text-whiteTamkin">
        {{total}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  initialPercentage: {
    type: Number,
    default: 10,
  },
  total: {
    type: String
  }
});

const percentage = ref(props.initialPercentage);

// Adjusted radius and circumference for a 250x250 circle
const radius = 105;
const circumference = 2 * Math.PI * radius;

const offset = computed(() => {
  return circumference - (percentage.value / 100) * circumference;
});

watch(
  () => props.initialPercentage,
  (newVal) => {
    percentage.value = newVal;
  }
);
</script>

<style scoped>
.circle-container {
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle-bg,
.circle-progress {
  fill: none;
  stroke-width: 30;
}
.circle-bg {
  stroke: #e5f6ff;
}
.circle-progress {
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: 50% 50%;
}
.circle-dotted {
  fill: none;
  stroke-dasharray: 4, 18;
  stroke-width: 1;
}
.content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
