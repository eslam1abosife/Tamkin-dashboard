<template>
  <div class="flex justify-between bg-[#DFDFDF] toolbar-container">
    <div class="flex items-center rtl:space-x-reverse  space-x-2">
      <div class="toolbar-item">{{ $t('Page') }} {{ currentPage }} {{ $t('of') }} {{ totalPages }}</div>
      <div class="toolbar-item">{{ wordCount }} {{$t('words')}}</div>
      <div class="toolbar-item">English (United States)</div>
    </div>
    
    <div class="flex items-center rtl:space-x-reverse  space-x-2">
      <div class="zoom-controls">
        <button @click="zoomOut">-</button>
        <input type="range" min="100" max="300" step="10" v-model="zoomLevel" @input="emitZoomChange" class="zoom-slider" />

        <button @click="zoomIn">+</button>
      </div>
      
      <div class="toolbar-item">{{ zoomLevel }}%</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  wordCount: Number,
  currentPage: Number,
  totalPages: Number,
  initialZoomLevel: Number
});

const emit = defineEmits(['zoom-change']);

const zoomLevel = ref(props.initialZoomLevel || 100);

const emitZoomChange = () => {
  emit('zoom-change', zoomLevel.value);
};

const zoomIn = () => {
  if (zoomLevel.value < 300) {
    zoomLevel.value += 10;
    emitZoomChange();
  }
};

const zoomOut = () => {
  if (zoomLevel.value > 100) {
    zoomLevel.value -= 10;
    emitZoomChange();
  }
};
</script>

<style lang="scss">
.toolbar-container {
  background-color: #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-top: 1px solid #ccc;
  padding: 5px 10px;
}

.toolbar-item {
  @apply ipad-max:text-[10px] text-[14px] mx-1 font-[500] text-[#444444];
}

.zoom-controls {
  display: flex;
  align-items: center;
  space-x-2: 10px;
}

.zoom-controls button {
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  @apply text-[#444444];
}

.zoom-slider {
  -webkit-appearance: none;
  width: 100px;
  height: 6px;
  background: #989898;
  outline: none;
  opacity: 0.7;
  border-radius: 10px;
  transition: opacity 0.2s;
}

.zoom-slider:hover {
  opacity: 1;
}

.zoom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  background: white;
  cursor: pointer;
  border-radius: 50%;
}

.zoom-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: white;
  cursor: pointer;
  border-radius: 50%;
}
</style>
