<template>
    <div v-for="i in 8" :key="i"
    class="scroll-item animate-pulse !bg-gray-300 dark:!bg-gray-600 cursor-pointer flex items-center justify-center rtl:space-x-reverse space-x-[10px] rounded-t-xl flex-grow"
  ></div>
</template>

<script setup lang="ts">

</script>

<style >
.scroll-item {
    flex: 0 0 150px; /* Fixed width for each item */
    @apply h-[45px];
  }
  
</style>