<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
const  packagesStore = usePackgesStore()
const localePath = useLocalePath()
const route = useRoute()
const isLinkActive = (path: string) => {
  const currentPath = route.path;
  const localizedPath = localePath(path);

  // Compare the current path with the localized path
  return currentPath === localizedPath;
};
definePageMeta({
    layout:'dashboard',
    middleware:['packages'],
})
const shownavbatab = computed(() => {
  // Define paths in their localized form
  const activeRoutes = [
    '/packages/accessibility',
    '/packages/live-translation',
    '/packages/bundle',
    '/packages/investors'
  ].map(path => localePath(path)); // Transform paths to their localized versions

  // Get the localized path of the current route
  const currentLocalizedPath = localePath(route.path);

  // Check if the current path is one of the active routes
  const isActiveRoute = activeRoutes.includes(currentLocalizedPath);

  // Check if the current tab matches the first category name and categories are not empty
  const isCategoryMatch = packagesStore.categories.length > 0;

  return isActiveRoute && isCategoryMatch;
});


onMounted(async ()=>{
  await packagesStore.getPackagesTypes(); 
  await packagesStore.getCategories()


if(isLinkActive('/packages/bundle')){
  const currentType = packagesStore.types.find((t) => t.title === 'Bundle')
  packagesStore.currentType = currentType
}
if(isLinkActive('/packages/accessibility')){
  const currentType = packagesStore.types.find((t) => t.title === 'Accessibility')
  packagesStore.currentType = currentType
}

if(isLinkActive('/packages/investors')){
  const currentType = packagesStore.types.find((t) => t.title === 'Investors')
  packagesStore.currentType = currentType
}

if(isLinkActive('/packages/live-translation')){
  const currentType = packagesStore.types.find((t) => t.title === 'Live Translation')
  packagesStore.currentType = currentType
}
if(isLinkActive('/packages')){
  const currentType = packagesStore.types.find((t) => t.title === 'Sign language')
  packagesStore.currentType = currentType
}


})


</script>

<template>
<div class="!px-0 w-full">
<PackagesNavbar v-if="packagesStore.showNavbar   " />

<PackagesNavbartab v-else-if="!packagesStore.showNavbar && packagesStore.currentTabTitle !== 'Plugins'"/>

  <NuxtPage/>
  
</div>
</template>

<style>

</style>
