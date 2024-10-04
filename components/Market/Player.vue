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
    const script1Url = 'https://p.tamkin.app/mobile/runtime.a6792ebd11ba6d755107.bundle.js';
    const script2Url = 'https://p.tamkin.app/mobile/app.af7ab7c5ada08b26b6a0.bundle.js';
    
    // Function to remove an existing script if it exists
    function removeScript(scriptUrl) {
        const existingScript = document.querySelector('script[src="' + scriptUrl + '"]');
        if (existingScript) {
            existingScript.remove();
        }
    }

    // Function to add a new script
    function addScript(scriptUrl) {
        const script = document.createElement('script');
        script.src = scriptUrl;
        script.defer = true;
        const playerSDKContainer = document.getElementById('SDKPlayerContainer');
        playerSDKContainer.appendChild(script);
    }

    // Function to append or refresh the <tamkin-sdk> inside #tamkinSDK
    function appendTamkinSDK() {
        const tamkinSDKContainer = document.getElementById('tamkinSDK');
        // Remove the existing <tamkin-sdk> if it already exists
        const existingSDK = tamkinSDKContainer.querySelector('tamkin-sdk');
        if (existingSDK) {
            // existingSDK.remove();
        }else{
            // Create and append a new <tamkin-sdk> element
            const newSDK = document.createElement('tamkin-sdk');
            newSDK.setAttribute('charwidth', '550');
            newSDK.setAttribute('charheight', '550');
            tamkinSDKContainer.appendChild(newSDK);
        }
    }

    // First append the <tamkin-sdk> element
    appendTamkinSDK();

    // Then remove and reload scripts
    removeScript(script1Url);
    addScript(script1Url);

    removeScript(script2Url);
    addScript(script2Url);
}

function controlPlayerLoad() {
  window.characterLoadStarted = () => {
    playerStore.characterLoaded = false
  }
  window.characterLoadFinished = () => {
    // for the first time when character loads
    // and the watcher takes over the subsequent changes in active character
    setTimeout(() => {
      playerStore.wearSavedClothes()
    }, 100);

    setTimeout(() => {
      playerStore.characterLoaded = true
    }, 5000);
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
  <div class="absolute top-0 left-1/2 transform -translate-x-1/2 z-[1]" id="SDKPlayerContainer">
    <!-- <img src="/assets/pngs/market/man_standing.png" class="h-[600px]" alt="" /> -->

    <div style="height: 350px;margin-top: -20px" v-show="playerStore.characterLoaded" class="h-[600px]" id="tamkinSDK">
      <!-- <tamkin-sdk charwidth="550" charheight="550"></tamkin-sdk> -->
    </div>
    <div v-if="!playerStore.characterLoaded" style="height:350px; position:absolute; top:0; left:50%; transform: translateX(-50%)" class=" d-flex align-items-center justify-content-center">
      <!-- <div class="spinner-border text-primary"></div> -->
      <Vue3Lottie :animationData="playerLoader" :loop="true" :autoplay="true" :height="300" :width="300" :no-margin="true" />
    </div>
  </div>
</template>
