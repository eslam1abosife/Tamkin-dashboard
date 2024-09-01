<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const  packagesStore = usePackgesStore()
const localePath = useLocalePath()
const route = useRoute()
definePageMeta({
    layout:'dashboard'
})
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);
  const pattern = localePath(path);

  // If the pattern does not contain a wildcard, do an exact match
  if (!pattern.includes("*")) {
    return currentPath === pattern;
  }

  // Convert wildcard pattern to regex
  const regex = new RegExp("^" + pattern.replace(/\/\*/g, ".*") + "$");

  return regex.test(currentPath);
};
const shownavbatab = computed(()=>{
  return isLinkActive('/packages/accessibility')  || isLinkActive('/packages/live-translation') || packagesStore.currentTab === 'webplugins'
 ||  isLinkActive('/packages/bundle') ||  
  isLinkActive('/packages/investors') 
})
</script>

<template>
<div class="!px-0 w-full">
  
<!-- Display PackagesNavbar if URL matches '/packages/*' and currentTab is 'webplugins' -->
<PackagesNavbar v-if="shownavbatab"/>

<!-- Display PackagesNavbartab if URL does not match '/packages/*' and currentTab is not 'webplugins' -->
<PackagesNavbartab v-if="!shownavbatab"/>

  <NuxtPage/>
  
</div>
</template>

<style>

</style>
