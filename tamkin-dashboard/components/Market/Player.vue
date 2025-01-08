<script setup>
import playerLoader from "~/assets/animation/handload.json";
import { Vue3Lottie } from "vue3-lottie";
import { usePlayerStore } from "@/stores/player";
import { useGetCategoriesWithSkinItems } from "@/composables/useMarket";
const {
  getFullDataFormated,
  characters,
} = useGetCategoriesWithSkinItems();

const playerStore = usePlayerStore();

const loaChar = ref(window.loaChar);
const loadedplayer = ref(false);
const showLoader = ref(true); // New flag to control loader visibility

const activeChar = ref("");


// Add event listener to update `loaChar` when the custom event is dispatched
const updateLoaChar = (event) => {
  loaChar.value = event.detail;
  window.adjustCameraBasedOnCharacter(playerStore.cameraPosition, 290, 600);
};

// Watch `playerStore.activeCharacter.text` for changes
watch(
  () => playerStore.activeCharacter,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      // Trigger loader
      showLoader.value = true;

      // Call `window.loadedByName` to check the status
      const isLoaded = await window.loadedByName(playerStore.activeCharacter.text);

      console.log("Character Loaded Status:", isLoaded);

      if (isLoaded) {
        // Simulate additional delay for character full loading
        setTimeout(() => {
          showLoader.value = false;
        }, 2000); // Adjust the delay as needed
      }
    }
  }
);

onMounted(async () => {
  // Fetch characters
  await getFullDataFormated();
  activeChar.value = characters.value.find((character) => character.is_used);
  // Add event listener for `loaCharChanged`
  window.addEventListener("loaCharChanged", updateLoaChar);

  // Initialize player loading
  controlPlayerLoad();
});

onUnmounted(() => {
  // Clean up the event listener
  window.removeEventListener("loaCharChanged", updateLoaChar);
});

function controlPlayerLoad() {
  // Set up character load handlers
  window.characterLoadStarted = () => {
    playerStore.characterLoaded = false;
    showLoader.value = true; // Ensure loader is active while character is loading
  };

  window.characterLoadFinished = () => {
    setTimeout(() => {
      playerStore.characterLoaded = true;
      showLoader.value = false; // Hide loader after loading is complete
    }, 2000); // Adjust delay to match loading time
  };

  window.onRunning = () => {
    console.log("onRunning");
  };

  window.onFinished = () => {
    console.log("onFinished");
  };

  // Trigger initial character change
  // playerStore.changeCharacter(playerStore.activeCharacter, false);
  playerStore.changeCharacter(activeChar.value, false);
}

// Modify the `window.loaChar` setter to emit the custom event
Object.defineProperty(window, "loaChar", {
/**
 * Retrieves the current value of the `loaChar` reference.
 * 
 * @returns {*} The current value of `loaChar`.
 */

  get() {
    return loaChar.value;
  },
  set(newValue) {
    loaChar.value = newValue;
    const event = new CustomEvent("loaCharChanged", { detail: newValue });
    window.dispatchEvent(event);
  },
});
</script>

<template>
  <div
    class="absolute top-0 left-1/2 transform -translate-x-1/2 z-[1] mt-[-24px]"
    id="SDKPlayerContainer"
  >
    <div class="h-full w-full rounded-[10px]">
      <!-- Show loading animation -->
      <div v-show="!loaChar || showLoader">
        <Vue3Lottie
          :animationData="playerLoader"
          :loop="true"
          :autoplay="true"
          :height="300"
          :width="300"
          :no-margin="true"
        />
      </div>

      <!-- Show character once loaded -->
      <tamkin-sdk-web-character
        v-show="loaChar && playerStore.activeCharacter && !showLoader"
        charWidth="250"
        charHeight="500"
        class="centered-div"
      ></tamkin-sdk-web-character>
    </div>
  </div>
</template>

<style lang="scss">
#buttons {
  @apply mt-[20px] #{!important};
}
</style>
