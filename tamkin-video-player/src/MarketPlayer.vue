<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref, onActivated, onBeforeMount, watchEffect } from 'vue';
import { Vue3Lottie } from 'vue3-lottie';
import playerLoader from './lottie/loader.json';

const emit = defineEmits(['loadedPlayer']);
const props = defineProps({
  visiblePlayer: {
    type: Boolean,
    default: true
  },
  currentCharacter: {
    type: Object,
    default:null
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
    script.src = `${src}?t=${new Date().getTime()}`;
    script.defer = true; 
    script.async = false;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve(link);
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
    document.head.appendChild(link);
  });
}

async function loadAssets() {
  try {
    const assets = await Promise.all([
      loadScript('https://cdn.tamkin.app/runtime.js'),
      loadScript('https://cdn.tamkin.app/app.js'),
      loadCSS('https://cdn.tamkin.app/app.css'),
    ]);
    loadedAssets.value = assets;
    console.log('All assets loaded successfully');
  } catch (error) {
    console.error(error);
  }
}

function unloadAssets() {
  loadedAssets.value.forEach((asset) => {
    if (asset.tagName === 'SCRIPT' && asset.parentNode === document.body) {
      document.body.removeChild(asset);
    } else if (asset.tagName === 'LINK' && asset.parentNode === document.head) {
      document.head.removeChild(asset);
    }
  });
  loadedAssets.value = [];
}

const loadedAssets = ref([]);
const loaCharProxy = ref(0);
const loadedplayer = ref(false);
const loaChar = ref(window.loaChar);

const updateLoaChar = () => {
  loaChar.value = window.loaChar;
  emit('loadedPlayer', loaChar.value);
};

let interval;
let interval2;
const isLoadedByNameInput = ref(false);

const checkLoadedByNameInput = () => {
  isLoadedByNameInput.value = window.loadedByName(props.currentCharacter.name);
};
onMounted(async () => {
  interval = setInterval(() => {
    if (loaChar.value !== window.loaChar) {
      updateLoaChar();
      window.adjustCameraBasedOnCharacter(2);

    }
  }, 100);
   interval2 = setInterval(checkLoadedByNameInput, 0);

  watch(loaCharProxy, (newVal) => {
    if (newVal === 1) {
      loadedplayer.value = true;

    }
  });
});

onUnmounted(() => {
  clearInterval(interval);
  clearInterval(interval2);
  loaChar.value = undefined
  window.loaChar = undefined
  // unloadAssets();
});

watch(() => props.visiblePlayer, (newVal) => {
  if (newVal) {
    updateLoaChar();
    window.changeCharacter(props.currentCharacter.name)

  }
});

watch(isLoadedByNameInput, (newValue, oldValue) => {
  if (newValue !== oldValue) {

    isLoadedByNameInput.value = newValue
   
  window.changeCharacter(props.currentCharacter.name)
  
    console.log('loadedByName("Input") changed to:', newValue);
  }
});
</script>

<template>
  <div class="h-[600px] rounded-lg relative">
    {{currentCharacter ? currentCharacter.name : 'loading'}}
    <tamkin-sdk-web-character
      v-show="isLoadedByNameInput"
      charWidth="512"
      charHeight="365"
      class="centered-div"
    ></tamkin-sdk-web-character>
    <div v-if="!isLoadedByNameInput">
      <Vue3Lottie :animationData="playerLoader" :loop="true" :autoplay="true" :height="300" :width="300" :no-margin="true" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
:deep(canvas) {
  width: 512px !important;
  height: 500px !important;
}

:deep(.centered-div) {
  @apply mx-auto !important;
}
</style>
