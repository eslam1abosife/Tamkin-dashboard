<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const  packagesStore = usePackgesStore()
const localePath = useLocalePath()
const route = useRoute()


const isLinkActive = (path) => {
  if (process.client) {
    const localizedPath = localePath(path); // Assuming you use i18n
    return route.path === localizedPath;
  }
  return false;
};
definePageMeta({
    layout:'dashboard',
})

onBeforeMount(async ()=>{


})




</script>

<template>
<div class="!px-0 w-full relative">
<!-- <PackagesPaymentModalsPackage/> -->

<KeepAlive>

  <PackagesNavbar  />
</KeepAlive>

<!-- <PackagesNavbartab v-else-if="!packagesStore.showNavbar && packagesStore.currentTabTitle !== 'Plugins'"/> -->

  <NuxtPage/>
  
</div>
</template>

<style>

</style>
