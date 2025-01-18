<script lang="ts" setup>
import { defineProps } from 'vue';


const props = defineProps({
  imgUrl: {
    type: String,
  },
  text: {
    type: String,
    default: 'No results found',
  },
  showSubText:Boolean
});
</script>

<template>
  <div class="no-data-container min-h-[200px] mt-10">
    <img class="w-[105px] h-[60px] block mx-auto" :class="!$slots.button && 'w-[115px] h-[70px]'" :src="imgUrl ? imgUrl : '/assets/imgs/no-data-found.svg'" alt="">
    <h6 class="no-data-text mt-2 !text-[15px] font-medium dark:!text-white/70" :class="!$slots.button && '!text-[16px]'">{{ $t(text) }}</h6>
    <div class="mt-2 p-0 mb-8 " :class="!$slots.button ? '!mt-1' : '!mt-8'">
      <slot name="button" />
      <p v-if="showSubText" class="text-xs text-gray-500">{{$t('It seems we can’t find any results based on your search.')}}</p>
    </div>
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
