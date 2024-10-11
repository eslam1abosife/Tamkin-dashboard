<template>
  <div class="circle-container">
    <svg width="180" height="180" viewBox="0 0 180 180">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: #2dada3; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #71dad2; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <circle class="circle-bg" cx="90" cy="90" r="75" />
      <circle
        class="circle-progress"
        :stroke-dashoffset="offset"
        cx="90"
        cy="90"
        r="75"
        stroke="url(#gradient)"
        stroke-dasharray="471.238"
      />
      <circle class="circle-dotted" cx="90" cy="90" r="55" stroke="url(#gradient)" />
    </svg>
    <div class="content">
      <div class="text-[10px] leading-[26px] font-[400] text-[#A6A6A6] dark:text-whiteTamkin">
        {{ $t('Remaining') }}
      </div>
      <div class="text-[12px] leading-[26px] font-[600] text-[#3D3D3D] dark:text-whiteTamkin">
        <span class="text-tamkin">1000</span> Words
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
});

const percentage = ref(props.initialPercentage);

const radius = 75;
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
  width: 180px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle-bg,
.circle-progress {
  fill: none;
  stroke-width: 20;
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
