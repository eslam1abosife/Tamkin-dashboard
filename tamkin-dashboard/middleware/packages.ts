export default defineNuxtRouteMiddleware(async (to, from) => {
  // const packagesStore = usePackgesStore();
  // await packagesStore.getPackagesTypes(); // Ensure types are fetched

  // // Map of paths to package types
  // const routeMapping = {
  //   '/packages': 'Packages',
  //   '/packages/accessibility': 'Accessibility',
  //   '/packages/live-translation': 'Live Translation',
  //   '/packages/investors': 'Investors',
  //   '/packages/bundle': 'Bundle',
  // };

  // // Get the current locale path
  // const localePath = useLocalePath();

  // // Check if types are loaded and find the matching type
  // if (packagesStore.types.length > 0) {
  //   for (const [path, type] of Object.entries(routeMapping)) {
  //     if (localePath(path) === to.path) {
  //       packagesStore.currentType = packagesStore.types.find(
  //         (t) => t.name === type
  //       );
  //       break;
  //     }
  //   }
  // } else {
  //   console.error("No package types found. Make sure `getPackagesTypes` is populating the `types` array correctly.");
  // }
});
