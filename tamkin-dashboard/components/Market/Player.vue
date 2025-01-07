<script setup>
import playerLoader from "~/assets/animation/handload.json";
import { Vue3Lottie } from "vue3-lottie";

import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();
// const loadedchar = ref()


watch(
  () => playerStore.activeCharacter,
  (newVal, oldVal) => {
    setTimeout(() => {
      window.adjustCameraBasedOnCharacter(playerStore.cameraPosition, 400, 550);

    }, 2000);
  },
  { once: true }
);

onMounted(() => {
  controlPlayerLoad();

})
const loaCharProxy = ref(0);

const loadedplayer = ref(false);
const loaChar = ref(window.loaChar);
let interval;
let interval2;
const updateLoaChar = () => {
  loaChar.value = window.loaChar;
  // emit("loadedPlayer", loaChar.value);
};
function controlPlayerLoad() {
  interval = setInterval(() => {
    if (loaChar.value !== window.loaChar) {
      updateLoaChar();
    }
  }, 100);

  // interval2 = setInterval(checkLoadedByNameInput, 0);


  window.characterLoadStarted = () => {
    playerStore.characterLoaded = false;
  };
  window.characterLoadFinished = () => {
    setTimeout(() => {
      playerStore.characterLoaded = true;
    }, 2000);
  };

  // on animation start
  window.onRunning = () => {
    console.log("onRunning");
  };
  // on animation end
  window.onFinished = () => {
    console.log("onFinished");
  };
  playerStore.changeCharacter(playerStore.activeCharacter, false);

  
}

watch(loaCharProxy, (newVal) => {
    if (newVal === 1) {
      loadedplayer.value = true;
      // alert('new value')

    }
  });
</script>

<template>
  <div
    class="absolute top-0 left-1/2 transform -translate-x-1/2 z-[1] mt-[-20px]"
    id="SDKPlayerContainer"
  >

    <div class="h-full w-full rounded-[10px]">
      <div v-show="!loaChar">

        <Vue3Lottie
          :animationData="playerLoader"
          :loop="true"
          :autoplay="true"
          :height="300"
          :width="300"
          :no-margin="true"
        />
      </div>

      <tamkin-sdk-web-character
        v-show="loaChar && playerStore.activeCharacter"
        charWidth="250"
        charHeight="500"
        class="centered-div"
      ></tamkin-sdk-web-character>
      <!-- :character="playerStore.activeCharacter.name" -->
    </div>
  </div>
</template>
<style lang="scss">
#buttons {
  @apply mt-[20px] #{!important};
}
</style>
