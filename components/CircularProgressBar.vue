<template>
    <div class="circle-container">
      <svg width="300" height="300">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#2DADA3;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#71DAD2;stop-opacity:1" />
          </linearGradient>
        </defs>
        <circle class="circle-bg" cx="150" cy="150" r="110" />
        <circle class="circle-progress" :stroke-dashoffset="offset" cx="150" cy="150" r="110" stroke="url(#gradient)" stroke-dasharray="691.2" />
        <circle class="circle-dotted" cx="150" cy="150" r="85" stroke="url(#gradient)" />
      </svg>
      <div class="content">
        <!-- <div class="remain-text">Remain</div> -->
        <div class="text-[26px] leading-[26px] font-[600] text-darkGrey">{{ percentage.toFixed(2) }}%</div>
        <div class="text-[26px] leading-[26px] font-[600] text-darkGrey">1 M</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  
  const props = defineProps({
    initialPercentage: {
      type: Number,
      default: 30.78
    }
  });
  
  const percentage = ref(props.initialPercentage);
  
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  
  const offset = computed(() => {
    return circumference - (percentage.value / 100) * circumference;
  });
  
  watch(() => props.initialPercentage, (newVal) => {
    percentage.value = newVal;
  });
  </script>
  
  <style scoped>
  .circle-container {
    position: relative;
    width: 300px; /* Circle size */
    height: 300px; /* Circle size */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .circle-bg, .circle-progress {
    fill: none;
    stroke-width: 30; /* Stroke width */
  }
  .circle-bg {
    stroke: #e5e7eb;
  }
  .circle-progress {
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: 50% 50%;
  }
  .circle-dotted {
    fill: none;
    stroke-dasharray: 2, 15; /* Dash pattern */
    stroke-width: 1; /* Thin stroke for dotted line */
  }
  .content {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .remain-text {
    font-size: 20px; /* Adjusted font size */
    color: #ccc;
  }
  </style>
  