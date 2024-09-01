<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
definePageMeta({
    layout:'dashboard'
})
</script>

<template>
<div class="!px-0 w-full">
  
<PackagesNavbar/>

  <NuxtPage/>
  
</div>
</template>

<style>

</style>
