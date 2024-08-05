<template>
    <div class="color-picker">
      <div class="color-picker__preview" :style="{ backgroundColor: color }" @click="togglePicker"></div>
      <div v-if="isPickerVisible" class="color-picker__panel">
        <div class="color-picker__gradient">
          <input type="color" v-model="color" class="color-picker__input" />
        </div>
        <div class="color-picker__controls">
          <input type="text" v-model="color" class="color-picker__hex" />
          <input type="range" v-model="alpha" min="0" max="100" class="color-picker__alpha" />
          <div class="color-picker__alpha-label">{{ alpha }}%</div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const color = ref('#ff0000');
  const alpha = ref(100);
  const isPickerVisible = ref(false);
  
  const togglePicker = () => {
    isPickerVisible.value = !isPickerVisible.value;
  };
  </script>
  
  <style scoped>
  .color-picker {
    position: relative;
    display: inline-block;
  }
  .color-picker__preview {
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }
  .color-picker__panel {
    position: absolute;
    top: 50px;
    left: 0;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    z-index: 1000;
  }
  .color-picker__gradient {
    position: relative;
    width: 200px;
    height: 150px;
    background: linear-gradient(to right, #fff, rgba(255, 0, 0, 0));
  }
  .color-picker__input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .color-picker__controls {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  .color-picker__hex {
    width: 80px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
  }
  .color-picker__alpha {
    flex: 1;
    margin-right: 10px;
  }
  .color-picker__alpha-label {
    width: 40px;
    text-align: center;
  }
  </style>
  