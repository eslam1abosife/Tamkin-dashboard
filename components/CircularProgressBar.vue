<template>
  <div class="circle-container">
    <svg viewBox="0 0 300 300" :class="svgClass">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#2DADA3;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#71DAD2;stop-opacity:1" />
        </linearGradient>
      </defs>
      <circle class="circle-bg" cx="150" cy="150" r="110" />
      <circle class="circle-progress" :stroke-dashoffset="offset" cx="150" cy="150" r="110" stroke="url(#gradient)"
       stroke-dasharray="691.2" />
      <circle class="circle-dotted" cx="150" cy="150" r="85" stroke="url(#gradient)" />
    </svg>
    <div class="content">
      <div class="percentage-text">{{ formattedPercentage }}%</div>
      <div class="value-text" v-if="showText">1 M</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  initialPercentage: {
    type: Number,
    default: 30
  },
  showText: Boolean,
  svgClass:String
});

const percentage = ref(props.initialPercentage);

const radius = 110;
const circumference = 2 * Math.PI * radius;

const offset = computed(() => {
  return circumference - (percentage.value / 100) * circumference;
});

const formattedPercentage = computed(() => {
  return parseFloat(percentage.value.toFixed(2)).toString().replace(/\.00$/, '');
});

watch(() => props.initialPercentage, (newVal) => {
  percentage.value = newVal;
});
</script>

<style scoped>
.circle-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin: auto;
}

svg {
  display: block;
}

.circle-bg, .circle-progress {
  fill: none;
  stroke-width: 30;
}

.circle-bg {
  stroke: #E5F6FF;
}

.circle-progress {
  stroke-linecap: round;
  transform: rotate(90deg);
  transform-origin: 50% 50%;
}

.circle-dotted {
  fill: none;
  stroke-dasharray: 2, 15;
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

.percentage-text, .value-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--darkGrey);
}

@media (min-width: 1024px) {
  .percentage-text, .value-text {
    font-size: 1.5rem;
  }
}
</style>
