<script setup>
import playerLoader from '~/assets/animation/handload.json'
import { Vue3Lottie } from 'vue3-lottie'

import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();

onMounted(() => {  
  doPlayerStuff();
})
function doPlayerStuff() {
    loadPlayerScripts();
    controlPlayerLoad();
}
function loadPlayerScripts() {
    const script1 = document.createElement('script');
    script1.src = 'https://p.tamkin.app/mobile/runtime.9d44d3eba4706ace325c.bundle.js';
    script1.defer = true;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://p.tamkin.app/mobile/app.62d4ea469fcae45928a2.bundle.js';
    script2.defer = true;
    document.body.appendChild(script2);
}
function controlPlayerLoad() {
  window.characterLoadStarted = () => {
    playerStore.characterLoaded = false
  }
  window.characterLoadFinished = () => {
    setTimeout(() => {
    //   playerStore.toggleCamera()
      playerStore.characterLoaded = true
      // for the first time when character loads
      // and the watcher takes over the subsequent changes in active character
      playerStore.wearSavedClothes()
      console.log('....character load finished');
      
    }, 100);
  }

  // on animation start
  window.onRunning = () => {
    console.log('onRunning');
  }
  // on animation end
  window.onFinished = () => {
    console.log('onFinished');
  }
}
</script>

<template>
  <div class="absolute top-0 left-1/2 transform -translate-x-1/2 z-[1]">
    <!-- <img src="/assets/pngs/market/man_standing.png" class="h-[600px]" alt="" /> -->

    <div style="height: 350px;margin-top: -20px" v-show="playerStore.characterLoaded" class="h-[600px]" id="tamkinSDK">
      <tamkin-sdk charwidth="550" charheight="550"></tamkin-sdk>
    </div>
    <div v-if="!playerStore.characterLoaded" style="height:350px;" class=" d-flex align-items-center justify-content-center">
      <!-- <div class="spinner-border text-primary"></div> -->
      <Vue3Lottie :animationData="playerLoader" :loop="true" :autoplay="true" :height="300" :width="300" :no-margin="true" />
    </div>
  </div>
</template>
