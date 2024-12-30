<script setup>
import playerLoader from "~/assets/animation/handload.json";
import { Vue3Lottie } from "vue3-lottie";

import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();
watch(
  () => playerStore.activeCharacter,
  (newVal, oldVal) => {
    setTimeout(() => {
      playerStore.changeCharacter(playerStore.activeCharacter, false);
    }, 2000);
  },
  { once: true }
);

onMounted(() => {
  controlPlayerLoad();
});

function controlPlayerLoad() {
  window.characterLoadStarted = () => {
    playerStore.characterLoaded = false;
  };
  window.characterLoadFinished = () => {
    window.adjustCameraBasedOnCharacter(playerStore.cameraPosition, 280, 550);
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
}
</script>

<template>
  <div
    class="absolute top-0 left-1/2 transform -translate-x-1/2 z-[1] mt-[-20px]"
    id="SDKPlayerContainer"
  >
    <div class="h-full w-full rounded-[10px]">
      <div v-show="!playerStore.characterLoaded">
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
        v-show="playerStore.characterLoaded && playerStore.activeCharacter"
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
