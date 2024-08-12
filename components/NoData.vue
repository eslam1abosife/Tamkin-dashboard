<script lang="ts" setup>
import { defineProps } from 'vue';


const props = defineProps({
  text: {
    type: String,
    default: 'No Data Found!',
  },
});
</script>

<template>
  <div class="no-data-container min-h-[200px] mt-10">
    <img class="w-14 h-14 block mx-auto" src="/imgs/no-data.svg" alt="">
    <h6 class="no-data-text mt-2">{{ text }}</h6>
  </div>
</template>

<style scoped>
.no-data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  /* Add more styling as needed */
}

.no-data-image {
  width: 200px; /* Adjust size as needed */
  height: auto;
  margin-bottom: 20px;
}

.no-data-text {
  font-size: 1.2em;
  color: #555;
}
</style>
