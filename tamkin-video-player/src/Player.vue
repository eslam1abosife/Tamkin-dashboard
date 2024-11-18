<script lang="ts" setup>
import { onMounted, watch, ref } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import playerLoader from './lottie/loader.json';
const emit = defineEmits(['loadedPlayer']);
const props = defineProps({
  visiblePlayer: {
    type: Boolean,
    default: true
  }
});

function makeCuesDraggable() {
  const cueElements = document.querySelectorAll('.vjs-text-track-display .vjs-text-track-cue div');
  if (cueElements.length === 0) {
    console.warn('No cue elements found. Retrying in 100ms...');
    setTimeout(makeCuesDraggable, 100);
    return;
  }
  cueElements.forEach(cue => {
    let offsetY;
    cue.addEventListener('mousedown', (e) => {
      offsetY = e.clientY - cue.getBoundingClientRect().top;
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
    const mouseMoveHandler = (e) => {
      cue.style.position = 'absolute'; 
      cue.style.top = `${e.clientY - offsetY}px`; 
    };
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
  });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
    document.head.appendChild(link);
  });
}

async function loadfares() {
  try {
    await Promise.all([
      loadScript('https://cdn.tamkin.app/runtime.js'),
      loadScript('https://cdn.tamkin.app/app.js'),
      loadCSS('https://cdn.tamkin.app/app.css'),
    ]);
    console.log('All assets loaded successfully');
  } catch (error) {
    console.error(error);
  }
}

const loaCharProxy = ref(0);
const loadedplayer = ref(false);
const loaChar = ref(window.loaChar);

const updateLoaChar = () => {
  loaChar.value = window.loaChar;
  emit('loadedPlayer', loaChar.value);
};

let interval;
onMounted(() => {
  interval = setInterval(() => {
    if (loaChar.value !== window.loaChar) {
      updateLoaChar();
    }
  }, 100); 
  watch(loaCharProxy, (newVal) => {
    if (newVal === 1) {
      loadedplayer.value = true;
    }
  });
});



// watch(() => props.visiblePlayer, (newVal) => {
//   if (newVal) {
//     updateLoaChar();
//   }
// });
</script>

<template>
  <div
    class="h-[400px] rounded-lg relative"
    style="background:#F3F5FA;width:100%"
    v-show="props.visiblePlayer"
  >
    <tamkin-sdk-web-character
      charWidth="366"
      charHeight="400"
      class="centered-div"
    ></tamkin-sdk-web-character>
    <!-- <div v-show="!loaChar" class="flex items-center justify-center w-full">
      <Vue3Lottie :animationData="playerLoader" :loop="true" :autoplay="true" :height="300" :width="300" :no-margin="true" />
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

:deep(canvas) {
  @apply mx-auto;
  width: 100% !important;
  height: 400px !important;
}
:deep(.centered-div) {
  @apply mx-auto !important;
}
</style>
