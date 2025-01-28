<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { helpers } from "@vuelidate/validators";
import Multiselect from "vue-multiselect";
import { useGetAppInvites } from "@/composables/useTeam";
import { useGetTrafficByType } from "@/composables/useAddSite";

const { getTrafficType } = useGetTrafficByType();

const localePath = useLocalePath();
const route = useRoute();

const isLinkActive = (path) => {
  if (process.client) {
    const localizedPath = localePath(path); // Assuming you use i18n
    return route.path === localizedPath;
  }
  return false;
};
import {
  useCheckifSiteblocked,
  useGetTraffic,
  useGetPriceByTraffic,
  useGetPendingPackages,
} from "@/composables/usePackages";
import { useGetPackage } from "~/composables/useMySite";
const { locale } = useI18n();
const { getPendingPacks } = useGetPendingPackages();
const {
  getInviteApps,
  defaultApp,
  apps,
  loading: getSitesLoading,
} = useGetAppInvites();
const { checkifBlockedSite, messageStatus, codeStatus } =
  useCheckifSiteblocked();
const packagesStore = usePackgesStore();
const { getPriceByTraffic } = useGetPriceByTraffic();
const loadingPriceTraffic = ref(false);
function getDayLabel(number) {
  return number === 1 ? "day" : "days";
}
const { getTraffic } = useGetTraffic();
const pdappsarr = ref([]);
onBeforeMount(async () => {
  const pdapps = await getPendingPacks();
  pdappsarr.value = pdapps;
});
const domainRegex =
  /^(?:(?:https?:\/\/)?(?:www\.)?(?!www\.)[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})$/;
const listOfApps = computed(() => {
  const category = getCategory.value;
  const currentTypeTitle = packagesStore.currentType.title;
  // Pre-filter apps by removing deleted ones
  const validApps = apps.value.filter((app) => app.status !== "deleted");

  // Optimize logic based on conditions
  if (category === 0 && currentTypeTitle === "Sign language") {
    // Return apps with non-null domains
    // return validApps.filter((app) => app.app_domain !== null && pdappsarr.value.filter(a=>a.app_name !== app.name).length);
    return validApps.filter(
      (app) =>
        app.app_domain !== null &&
        app.package &&
        app.package.length > 0 &&
        !pdappsarr.value.some(
          (a) =>
            a.app_name === app.name && a.package_type === app.package[0].type
        )
    );
  }

  if (category && category !== 0) {
    // Return apps with null domains for non-'Plugins' category
    return validApps.filter((app) => app.app_domain === null);
  }

  if (!category && currentTypeTitle !== "Sign language") {
    // Return apps with non-null domains for non-'Sign language' types
    // return validApps.filter((app) => app.app_domain !== null);
    return apps.value.filter(
      (app) =>
        app.app_domain !== null &&
        app.package &&
        app.package.length > 0 &&
        !pdappsarr.value.some(
          (t) => t.app_name === app.name && t.package_type === currentTypeTitle
        )
    );
  }

  return [];
});

const isDomain = helpers.withParams({ type: "isDomain" }, (value) => {
  return domainRegex.test(value);
});
const state = reactive({
  newWebsite: "",
});
const rules = {
  newWebsite: { required, isDomain },
};
const webs = ref([]);

const v$ = useVuelidate(rules, state);

const loadingAddWebsite = ref(false);
const selectedPackage = ref(
  packagesStore.currentPackage.trial_days > 0
    ? 0
    : packagesStore.currentPackage.package_type !== "Extra"
    ? 3
    : 1
);

const selectPackage = (plan: any) => {
  selectedPackage.value = plan;
};

const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const levelof = ref(packagesStore.traffic_level);

const websiteExist = ref(false);
const cleanWebsiteUrl = (url: string) => {
  return url.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");
};

const canAddWebsite = async (website) => {
  const cleanedWebsiteUrl = cleanWebsiteUrl(website);
  let isWebsiteInApps = false;
  let isWebsiteInUrls = false;

  if (
    (Array.isArray(packagesStore.urls) && packagesStore.urls.length) ||
    (Array.isArray(apps.value) && apps.value.length)
  ) {
    isWebsiteInApps = apps.value.some(
      (ap) => ap.app_domain === cleanedWebsiteUrl
    );

    isWebsiteInUrls =
      packagesStore.urls.length &&
      packagesStore.urls.some((website) => website.url === cleanedWebsiteUrl);
  }

  const res = await checkifBlockedSite(cleanedWebsiteUrl);
  const isBlocked = res.length > 0;

  return (
    !isWebsiteInApps &&
    codeStatus.value === 200 &&
    !isBlocked &&
    !isWebsiteInUrls
  );
};

const addWebsite = async () => {
  loadingAddWebsite.value = true;

  if (!v$.value.$invalid) {
    const traffic = await getTraffic(state.newWebsite, "url");

    if (await canAddWebsite(state.newWebsite)) {
      const cleanedWebsiteUrl = cleanWebsiteUrl(state.newWebsite);
      loadingByWebsite.value[cleanedWebsiteUrl] = true;
      // Push the new website to the store

      packagesStore.urls.push({
        title: cleanedWebsiteUrl,
        url: cleanedWebsiteUrl,
        traffic:
          traffic[0].traffic <= 100000
            ? "Small"
            : traffic[0].traffic > 100000 && traffic[0].traffic <= 1000000
            ? "Medium"
            : "Large",
      });
      if (packagesStore.currentType.title === "Accessibility") {
        // Fetch price traffic for the newly added website
        const res = await getPriceByTraffic(
          [cleanedWebsiteUrl], // Pass the new website URL
          packagesStore.currentPackage.name,
          webs.value.map((we) => we.name) // Assuming you want to include these for the API call
        );

        // Update pricebytraffic with the new price information
        pricebytraffic.value = [...pricebytraffic.value, ...res];
        loadingByWebsite.value[cleanedWebsiteUrl] = false;
      }
    } else {
      websiteExist.value = true;
    }

    state.newWebsite = "";
    v$.value.$reset();
    loadingAddWebsite.value = false;
  }
};

// watch(levelof, (ov, nv) => {
//   // if(levelof.value === 'Up to 100K page views/mo' && ){

//   // }
// })
const trafficTooHighApps = ref([]);
const trafficTooHighUrls = ref([]);
const removeWebsite = (website: any) => {
  // Remove the website from packagesStore.urls
  packagesStore.urls = packagesStore.urls.filter(
    (item: any) => item.title !== website
  );

  // Remove the website from trafficTooHighUrls
  trafficTooHighUrls.value = trafficTooHighUrls.value.filter(
    (item: any) => item.title !== website
  );

  // Remove the website from pricebytraffic
  pricebytraffic.value = pricebytraffic.value.filter(
    (item: any) => item.website !== website
  );
};

const removeWebsiteFromSelectedApps = (website: any) => {
  // Remove the website from webs
  webs.value = webs.value.filter((item: any) => item.app_domain !== website);

  pricebytraffic.value = pricebytraffic.value.filter(
    (item: any) => item.website !== website
  );

  // Uncomment if you need to remove from trafficTooHighApps as well
  // trafficTooHighApps.value = trafficTooHighApps.value.filter(
  //   (item: any) => item.title !== website
  // );
};

const pricebytraffic = ref([]);
const calculateEstimatedPrice = computed(() => {
  if (packagesStore.currentType.title !== "Accessibility") {
    return selectedPackage.value === 12
      ? packagesStore.currentPackage.package_price_role[0].cost_yearly
      : selectedPackage.value === 3
      ? packagesStore.currentPackage.package_price_role[0].cost_3_month
      : packagesStore.currentPackage.package_price_role[0].cost_month;
  }
  // if (packagesStore.currentType.title === "Accessibility") {
  //   if (levelof.value !== "Over 1M page views/mo") {
  //     // Handle the case for traffic below 1M
  //     return selectedPackage.value === 12
  //       ? packagesStore.currentPackage.cost_yearly
  //       : selectedPackage.value === 3
  //       ? packagesStore.currentPackage.cost_3_month
  //       : selectedPackage.value === 1
  //       ? packagesStore.currentPackage.cost_month
  //       : packagesStore.currentPackage.trial_days > 0
  //       ? 0
  //       : 0;
  //   } else if (
  //     levelof.value === "Over 1M page views/mo" &&
  //     pricebytraffic.value.length > 0
  //   ) {
  //     // Handle the case for traffic over 1M
  //     // Find the matching website in webs or packagesStore.urls
  //     const openedCurrentSite =
  //       webs.value.find((item: any) =>
  //         pricebytraffic.value.some(
  //           (priceItem: any) => priceItem.website === item.app_domain
  //         )
  //       ) ||
  //       packagesStore.urls.find((item: any) =>
  //         pricebytraffic.value.some((priceItem: any) => priceItem.website === item.url)
  //       );

  //     if (openedCurrentSite) {
  //       // Find the corresponding price entry in pricebytraffic for the current website
  //       const priceInfo = pricebytraffic.value.find(
  //         (priceItem: any) =>
  //           priceItem.website === openedCurrentSite.app_domain ||
  //           priceItem.website === openedCurrentSite.url
  //       );

  //       if (priceInfo) {
  //         // Return cost based on the selected package
  //         return selectedPackage.value === 12
  //           ? priceInfo.cost_year // Return yearly cost if selectedPackage is 12
  //           : selectedPackage.value === 1
  //           ? priceInfo.cost_month // Return monthly cost if selectedPackage is 1
  //           : priceInfo.cost_3_month;
  //       }
  //     }

  //     return 0; // Return 0 if no matching website or price is found
  //   }
  // }
});
const loadingByWebsite = ref({});

const calculatePrice = (website) => {
  let currentWebsite;
  if (Array.isArray(packagesStore.urls)) {
    currentWebsite = packagesStore.urls.find((item) => item.url === website);
    // rest of your logic
  } else {
    console.error("packagesStore.urls is not an array:", packagesStore.urls);
  }
  const currentApp = webs.value.find((item) => item.app_domain === website);

  // Check if either currentWebsite or currentApp exists and pricebytraffic has data
  if ((currentWebsite || currentApp) && pricebytraffic.value.length > 0) {
    const targetDomain = currentWebsite?.url || currentApp?.app_domain; // Safely get the domain
    const priceInfo = pricebytraffic.value.find(
      (priceItem) => priceItem.website === targetDomain
    );

    // Ensure priceInfo is found before accessing its properties
    if (priceInfo) {
      switch (selectedPackage.value) {
        case 12:
          return priceInfo.cost_year; // Return yearly cost if selectedPackage is 12
        case 3:
          return priceInfo.cost_3_month; // Return 3-month cost if selectedPackage is 3
        case 1:
          return priceInfo.cost_month; // Return monthly cost if selectedPackage is 1
        default:
          return 0; // Default case when no valid package is selected
      }
    }
  }

  return 0; // Default return value if no valid website or pricing info is found
};

const calculateTotalPrice = () => {
  if (pricebytraffic.value.length > 0) {
    // Sum all prices in pricebytraffic
    const totalCost = pricebytraffic.value.reduce((sum, priceItem) => {
      return (
        sum +
        (selectedPackage.value === 12
          ? priceItem.cost_year || 0 // Fallback to 0 if undefined
          : selectedPackage.value === 3
          ? priceItem.cost_3_month || 0 // Fallback to 0 if undefined
          : selectedPackage.value === 1
          ? priceItem.cost_month || 0 // Fallback to 0 if undefined
          : 0) // Default case
      );
    }, 0); // Start summing from 0

    return totalCost; // Return the total sum
  }

  return 0; // Default return if no conditions are met
};

const packageTypeToSend = computed(() => {
  const isSignLanguage = packagesStore.currentType.title === "Sign language";
  const isAccessibility = packagesStore.currentType.title === "Accessibility";
  const isPackageType = packagesStore.currentPackage.package_type === "Package";
  const isAddonsType = packagesStore.currentPackage.package_type === "Addons";
  // alert(packagesStore.currentType.title)
  if (isSignLanguage && !isPackageType) {
    return getCategory.value === 0 ? "Plugins" : getCategory.value;
  }

  if (isSignLanguage && isPackageType && getCategory.value) {
    return getCategory.value;
  }

  if (isAccessibility && isAddonsType) {
    return "Accessibility";
  }

  return null; // Default return if no conditions are met
});

const appsrosend = computed(() => {
  if (webs.value.length) {
    return webs.value.map((website: any) => website.name);
  } else if (
    (packagesStore.currentType.title === "Sign language" ||
      packagesStore.currentType.name === "Sign language") &&
    getCategory.value !== 0
  ) {
    return apps.value
      .filter((t) => t.title === "Internal Service")
      .map((m) => m.name);
  } else {
    return [];
  }
});

/**
 * Sets the package payload and navigates to the payment methods page.
 * @returns {Promise<void>}
 */
const conintuePay = () => {
  packagesStore.packagePayload = {
    package: packagesStore.currentPackage.name,
    urls: packagesStore.urls.length
      ? packagesStore.urls.filter((website: any) => website.url !== null)
      : [].map((website: any) => website.url),
    apps: appsrosend.value,
    payDateType: selectedPackage.value,
    locale: locale.value,
    total:
      packagesStore.currentType.title === "Accessibility"
        ? calculateTotalPrice()
        : calculateEstimatedPrice.value.toFixed(0),
    packageExtraType: packageTypeToSend.value,
    packageTrie:
      packagesStore.currentType.title !== "Sign language"
        ? packagesStore.traffic_level
        : null,
  };
  return navigateTo(
    "add_package_modal_packages",
    "packages",
    "payment_methods_packages"
  );
};

const totalCost = computed(() => {
  const urlCount = packagesStore.urls.length || 0;
  const webCount = webs.value.length || 0;
  const price = calculateEstimatedPrice.value || 0;
  if (packagesStore.currentPackage.package_type === "Package") {
    return price * (urlCount + webCount);
  } else {
    // alert(packagesStore.currentPackage.package_price_role[0].cost_month )
    return packagesStore.currentPackage.package_price_role[0].cost_month;
  }
});

const getCategory = computed(() => {
  if (
    packagesStore.currentType &&
    (packagesStore.currentType.title === "Sign language" ||
      packagesStore.currentType.name === "Sign language") &&
    packagesStore.categories.length
  ) {
    const categoryItem = packagesStore.categories.find(
      (item: any) => item.name === packagesStore.currentPackage.category
    );

    return categoryItem && categoryItem.title === "Plugins"
      ? 0
      : categoryItem?.title || null;
  }

  return null;
});

const geteFilterInfo = async () => {
  if (
    packagesStore.currentType?.title === "Accessibility" &&
    (webs.value.length > 0 ||
      (Array.isArray(packagesStore.urls) && packagesStore.urls.length > 0))
  ) {
    try {
      // Ensure packagesStore.urls is an array before mapping
      const urls = Array.isArray(packagesStore.urls)
        ? packagesStore.urls.map((we) => we.url)
        : [];
      const appDomains = webs.value.map((we) => we.name);

      // Call the API with both arrays
      const res = await getPriceByTraffic(
        urls,
        packagesStore.currentPackage.name,
        appDomains
      );

      // Assign the response to pricebytraffic
      pricebytraffic.value = res;

      // Uncomment if needed: Assign the title from the first result to levelof.value
      // levelof.value = res[0]?.title || '';
    } catch (error) {
      console.error("Error fetching price by traffic:", error);
    } finally {
      // Ensure loading state is reset in both success and error cases
      loadingPriceTraffic.value = false;
    }
  }
};

// const getPackageById = (id) => {
//   const packageg = packagesStore.packages.find(
//     (pkg) =>
//       pkg.name === id && // Filter by the package id
//       pkg.type === packagesStore.currentType.name &&
//       pkg.package_type === "Package" &&
//       pkg.package_price_role.some((item) => item.title === levelof.value)
//   );
// // console.log(id)
//   if (packageg) {
//     const priceRole = packageg.package_price_role.find(
//       (item) => item.title === levelof.value
//     );
//     // alert(priceRole.cost_month)
//     return {
//       ...packageg,
//       // Add fields from the matched price role
//       cost_before_month: priceRole.cost_before_month,
//       cost_year: priceRole.cost_year,
//       cost_month: priceRole.cost_month,
//       cost_3_month: priceRole.cost_3_month,
//       cost_investor: priceRole.cost_investor,
//       is_contact_us: priceRole.is_contact_us,
//       data_cost_month: priceRole.data_cost_month,
//       cost_yearly: priceRole.cost_yearly,
//       discount_month: priceRole.discount_month,
//       discount_3_month: priceRole.discount_3_month,
//       discount_yearly: priceRole.discount_yearly,
//       cost_before_yearly: priceRole.cost_before_yearly,
//     };
//   }

//   return undefined; // Return undefined if not found
// };
// watch(
//   () => levelof.value,
//   () => {
//     loadingPriceTraffic.value = true;
//     packagesStore.currentPackage = getPackageById(packagesStore.currentPackage.name);
//     loadingPriceTraffic.value = false;

//   }
// );
watch(
  () => selectedPackage.value,
  () => {
    if (packagesStore.currentType.title === "Accessibility") {
      geteFilterInfo();
    }
  }
);
// watchEffect(() => {
//   if (
//     packagesStore.currentType.title === "Accessibility" &&
//     packagesStore.currentPackage.package_type === "Package"
//   ) {
//     // Determine the traffic limit based on the selected level
//     const trafficLimit =
//       levelof.value === "Up to 100K page views/mo"
//         ? 100000
//         : levelof.value === "Up to 1M page views/mo"
//         ? 1000000
//         : 0;
// // alert(trafficLimit)
//     // Find affected items in webs
//     const newAffectedItems = webs.value?.filter(
//       (item: any) => item.traffic > trafficLimit
//     );

//     if (newAffectedItems && newAffectedItems.length > 0) {
//       trafficTooHighApps.value = [...trafficTooHighApps.value, ...newAffectedItems];
//     }

//     // Find affected items in packagesStore.urls
//     const newAffectedItemsInUrls = packagesStore.urls?.filter((item: any) => {
//       const trafficValue =
//         item.traffic === "Small"
//           ? 100000
//           : item.traffic === "Medium"
//           ? 1000000
//           : 10000000; // For 'Large'
//       return trafficValue > trafficLimit;
//     });

//     if (newAffectedItemsInUrls && newAffectedItemsInUrls.length > 0) {
//       trafficTooHighUrls.value = [
//         ...trafficTooHighUrls.value,
//         ...newAffectedItemsInUrls.map((item) => ({
//           title: item.title,
//           url: item.url,
//           traffic:
//             item.traffic <= 100000
//               ? "Small"
//               : item.traffic > 100000 && item.traffic <= 1000000
//               ? "Medium"
//               : "Large",
//         })),
//       ];
//     }

//     // If level is 'Over 1M page views/mo', remove recently added items
//       // Remove items from trafficTooHighApps
//       trafficTooHighApps.value = trafficTooHighApps.value.filter(
//         (item: any) => !newAffectedItems.includes(item)
//       );

//       // Remove items from trafficTooHighUrls
//       trafficTooHighUrls.value = trafficTooHighUrls.value.filter(
//         (item: any) => !newAffectedItemsInUrls.some((newItem) => newItem.url === item.url)
//       );

//   }
// });
// Helper function to find the new websites added
const getNewWebsites = (oldWebs, newWebs) => {
  // Return websites that are present in newWebs but not in oldWebs
  return newWebs.filter((newWeb) => {
    return !oldWebs.some((oldWeb) => oldWeb.app_domain === newWeb.app_domain);
  });
};

watch(
  () => webs.value,
  async (newWebs, oldWebs) => {
    const newWebsites = getNewWebsites(oldWebs, newWebs); // Get the websites that are newly added

    // Iterate over the new websites and make API calls for each
    if (packagesStore.currentType.title === "Accessibility") {
      for (let newWeb of newWebsites) {
        // Set loading state to true for this website
        loadingByWebsite.value[newWeb.app_domain] = true;

        try {
          // Make API call for the new website
          const res = await getPriceByTraffic(
            [], // The URLs in packagesStore
            packagesStore.currentPackage.name, // Current package name
            [newWeb.name] // Single website name for this API call
          );

          // Update the price for this website in pricebytraffic
          pricebytraffic.value = [...pricebytraffic.value, ...res];
        } catch (error) {
          console.error(
            `Failed to fetch price for ${newWeb.app_domain}`,
            error
          );
        }

        // Set loading state to false after API call is done
        loadingByWebsite.value[newWeb.app_domain] = false;
      }
    }
  },
  { deep: true } // Deep watcher to track nested changes within webs
);

// onMounted(async () => {

// if(packagesStore.currentPackage.type === 'Accessibility'){
//   const typeg = packagesStore.types.find(t=>t.title === 'Accessibility')
// packagesStore.currentType = typeg
// }

//   if (!packagesStore.traffic_level) {
//     const trafficLevels = packagesStore.getTraffiPrices("Package",'Accessibility');
//     // alert(trafficLevels[0].name)
//     packagesStore.setTrafficLevel(trafficLevels[0].name);

//   }
//  if(packagesStore.currentType.title === 'Accessibility'){
//   await geteFilterInfo(levelof.value || packagesStore.traffic_level)
//  }

// });
onMounted(async () => {
  //  loadingPriceTraffic.value = true
  // packagesStore.urls = []
  packagesStore.packagePayload = {};

  if (
    packagesStore.currentType.title === "Accessibility" &&
    (webs.value.length || packagesStore.urls.length)
  ) {
    await geteFilterInfo();

    await getTrafficType(packagesStore.currentPackage.name);
    //  levelof.value = packagesStore.levelsTraffic[0]
  }
  const user = JSON.parse(localStorage.getItem("user"));
  await getInviteApps({ agency: user.agency });

  // if(){

  // }

  //  loadingPriceTraffic.value = false

  // levelof.value = addSiteStore.currentLevel.name
});
/**
 * Function to check if a given website already exists in our database.
 * It cleans the given website domain and then checks if the clean domain exists in the list of apps or urls.
 * If it does, it sets the websiteExist ref to true, otherwise it sets it to false.
 */
const checkforexistingwebsite = () => {
  const cleanDomain = cleanWebsiteUrl(state.newWebsite);

  if (
    apps.value.filter((website: any) => website.app_domain === cleanDomain)
      .length > 0 ||
    (packagesStore.urls.length &&
      packagesStore.urls.filter((website: any) => website.url === cleanDomain)
        .length > 0)
  ) {
    websiteExist.value = true;
  } else {
    websiteExist.value = false;
  }
};
// watch(()=>selectPackage,async ()=>{
//   if (levelof.value === "Over 1M page views/mo") {
//     const res = await getPriceByTraffic(
//       [...(packagesStore.urls.length ? packagesStore.urls.map((we) => we.url) : [])],
//       packagesStore.currentPackage.name,
//       [...(webs.value.length ? webs.value.map((we) => we.name) : [])]
//     );
//     pricebytraffic.value = res;
//   }
// })
const closeModalPackage = () => {
  packagesStore.urls = [];
  webs.value = [];
  packagesStore.selectedPaymentMethod = "";
  closeModal("add_package_modal_packages");
};
const formattedEstimatedPrice = computed(() => {
  if (selectedPackage.value !== 0) {
    return calculateEstimatedPrice.value
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return 0;
});
// Computed property for the price when the package type IS 'Accessibility'
const formattedAccessibilityPrice = (websiteDomain) => {
  // loadingPricesAccess.value.push(websiteDomain)

  if (
    packagesStore.currentPackage.trial_days > 0 &&
    selectedPackage.value === 0
  ) {
    return 0;
  } else {
    // loadingPricesAccess.value.splice(websiteDomain)

    return calculatePrice(websiteDomain)
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //
};

const formattedTotal = computed(() => {
  const formatNumber = (num) =>
    num
      .toFixed(0)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getPackagePrice = () => {
    if (selectedPackage.value === 1) {
      return packagesStore.currentPackage.package_price_role[0].cost_month;
    } else if (selectedPackage.value === 3) {
      return packagesStore.currentPackage.package_price_role[0].cost_3_month;
    } else {
      return packagesStore.currentPackage.package_price_role[0].cost_yearly;
    }
  };

  const packagePrice = getPackagePrice();

  const totalForWebs = packagePrice * webs.value.length;
  const totalForUrls = packagePrice * packagesStore.urls.length;

  if (
    getCategory.value !== 0 &&
    packagesStore.currentType.title === "Sign language"
  ) {
    return packagePrice * 1;
  } else {
    return formatNumber(totalForWebs + totalForUrls);
  }
});
</script>

<template>
  <div
    class="mysite_bg_modal dark:bg-p fixed z-[9999] !top-[-2px] lg:inset-auto inset-0 rtl:lg:left-0 ltr:lg:right-0 rounded-[10px] px-[16px] py-[30px] lg:px-[30px] lg:w-[600px] w-full h-screen overflow-y-auto lg:overflow-x-hidden"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn_payment !cursor-pointer z-[999] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
      @click="closeModalPackage"
    >
      <svg
        class="w-[12px] h-[12px]"
        width="14"
        height="13"
        viewBox="0 0 14 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="w-full h-screen">
      <div
        class="flex flex-col items-start justify-center w-full lg:overflow-x-hidden"
      >
        <h1
          class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin lg:px-0 px-[20px] lg:mt-0"
        >
          {{ $t("Add Package") }}
        </h1>
        <div
          class="flex flex-col items-start justify-start lg:overflow-x-hidden bg-white dark:bg-tamkinDarkPrimary w-full min-h-[70vh] px-[20px] rounded-[10px] mt-[33px]"
          style="box-shadow: 0px 4px 24px 8px #51459f14"
        >
          <div
            v-if="
              !packagesStore.openedCurrentSite &&
              packagesStore.currentPackage.package_type === 'Package'
            "
            class="pt-[24px] flex items-left sm:items-center flex-col sm:flex-row justify-center rtl:space-x-reverse space-x-[0px] sm:space-x-[18px] w-full"
          >
            <div>
              <img
                :src="`https://tamkin.app/${packagesStore.currentPackage.icon}`"
                class="w-[32px] h-[32px]"
                alt=""
              />
            </div>
            <div class="flex gap-1 sm:gap-10 justify-between">
              <div
                class="font-[600] dark:text-whiteTamkin text-[16px] leading-[30px] text-black text-left sm:text-center"
              >
                {{ $t(packagesStore.currentPackage.title) }}
              </div>
              <div
                class="font-[400] text-left sm:text-center dark:text-whiteTamkin text-[12px] sm:text-[14px] leading-[30px] text-black rtl:!mr-auto ltr:!ml-auto"
              >
                {{
                  packagesStore.currentType.title +
                    "" +
                    packagesStore.currentType.title !==
                  "Sign language"
                    ? $t(packagesStore.currentType.title + " " + "Package")
                    : ""
                }}
                {{
                  packagesStore.currentType.title === "Sign language"
                    ? "- " +
                      (getCategory === 0 ? $t("Plugins") : $t(`${getCategory}`))
                    : ""
                }}
              </div>
            </div>
          </div>
          <div
            v-if="
              packagesStore.currentPackage.package_type === 'Addons' ||
              packagesStore.currentPackage.package_type === 'Extra'
            "
            class="h-[61px] w-full border-b dark:border-darkborder mt-[28px] flex items-center justify-start rtl:space-x-reverse space-x-[18px] bg-[#EFF5FF] dark:bg-darkTamkin"
          >
            <div class="rtl:pr-[5px] ltr:pl-[5px]">
              <img
                :src="`https://tamkin.app/${packagesStore.currentPackage.icon}`"
                class="h-[45px] w-[45px]"
                alt=""
              />
            </div>
            <div
              class="text-[13px] md:text-[16px] font-[600] leading-[24px] dark:text-white"
            >
              {{ $t(packagesStore.currentPackage.title) }}
            </div>

            <div
              class="text-[12px] p-1 md:text-[15px] font-[400] leading-[26px] dark:text-white rtl:!mr-auto ltr:!ml-auto pr-[5px] text-[#1E1E1E]"
              v-if="packagesStore.currentPackage.package_type === 'Addons'"
            >
              {{ $t(packagesStore.currentType.title) }} -
              <!-- {{ $t(packagesStore.currentPackage.package_type) }}  -->
              {{
                getCategory
                  ? $t(getCategory)
                  : $t(packagesStore.currentPackage.package_type)
              }}
            </div>
            <div
              class="text-[12px] p-1 md:text-[15px] font-[400] dark:text-white leading-[26px] rtl:!mr-auto ltr:!ml-auto pr-[5px] text-[#1E1E1E]"
              v-if="packagesStore.currentPackage.package_type === 'Extra'"
            >
              {{ $t(packagesStore.currentPackage.sub_title) }}
            </div>
          </div>
          <div
            class="flex items-center justify-center gap-x-4 flex-wrap sm:flex-nowrap"
            v-if="
              packagesStore.currentPackage.package_type === 'Addons' ||
              packagesStore.currentPackage.package_type === 'Package'
            "
          >
            <div
              v-if="packagesStore.currentPackage.trial_days > 0"
              class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5 px-1.5 pb-2.5 h-[87px] !rounded-[10px] mt-[35px]"
              :class="[
                selectedPackage === 0
                  ? 'custom-border-tamkin'
                  : 'custom-border ',
              ]"
            >
              <div class="flex items-center justify-center w-full">
                <div class="order-2 w-3/4 h-full">
                  <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">
                    {{ $t("Free Trial") }}
                  </h1>
                  <h2 class="font-[500] text-[10px] dark:text-white">
                    {{ $t("Free trial for") }}
                    {{
                      +" " +
                      packagesStore.currentPackage.trial_days +
                      " " +
                      $t(getDayLabel(packagesStore.currentPackage.trial_days))
                    }}
                  </h2>
                </div>
                <div class="order-1 rtl:pl-4 ltr:pr-4">
                  <input
                    id="free_trial"
                    type="radio"
                    name="packages_radio"
                    class="hidden"
                    :checked="selectedPackage === 0"
                    @click.stop="selectPackage(0)"
                  />
                  <label
                    for="free_trial"
                    class="flex items-center cursor-pointer"
                  >
                    <span class="radio-tamkin"></span>
                  </label>
                </div>
              </div>
            </div>
            <div
              v-if="
                packagesStore.currentWebsite.billing_duration !== 'monthly' &&
                packagesStore.currentPackage.trial_days === 0
              "
              class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5 px-1.5 pb-2.5 h-[87px] !rounded-[10px] mt-[35px]"
              :class="[
                selectedPackage === 1
                  ? 'custom-border-tamkin'
                  : 'custom-border ',
              ]"
            >
              <div class="flex items-center justify-center w-full">
                <div class="order-2 w-3/4 h-full">
                  <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">
                    {{ $t("Monthly Plan") }}
                  </h1>
                  <h2
                    class="font-[500] text-[10px]"
                    v-if="
                      packagesStore.currentPackage.package_price_role[0]
                        .discount_month !== 0
                    "
                  >
                    <span
                      class="!text-[#021328] font-[700] dark:text-white dark:!text-whiteTamkin/80"
                      >{{
                        packagesStore.currentPackage.package_price_role[0]
                          .discount_month
                      }}%
                    </span>
                    <span class="text-[#536174] dark:text-whiteTamkin/80">{{
                      $t("Discount on the Monthly Plan")
                    }}</span>
                  </h2>
                </div>
                <div class="order-1 rtl:pl-4 ltr:pr-4">
                  <input
                    id="month"
                    type="radio"
                    name="packages_radio"
                    class="hidden"
                    :checked="selectedPackage === 1"
                    @click.stop="selectPackage(1)"
                  />
                  <label for="month" class="flex items-center cursor-pointer">
                    <span class="radio-tamkin"></span>
                  </label>
                </div>
              </div>
            </div>
            <div
              v-if="
                packagesStore.openedCurrentSite.billing_duration !==
                  '3-monthly' || packagesStore.currentPackage.trial_days === 0
              "
              class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5 px-1.5 pb-2.5 h-[87px] !rounded-[10px] mt-[35px]"
              :class="[
                selectedPackage === 3
                  ? 'custom-border-tamkin'
                  : 'custom-border ',
              ]"
            >
              <div class="flex items-center justify-center w-full">
                <div class="order-2 w-3/4 h-full">
                  <div
                    style="
                      background: linear-gradient(
                        180deg,
                        #2dada3 0%,
                        #71dad2 100%
                      );
                    "
                    class="absolute text-[13px] leading-[17.76px] font-[400] w-[80px] rounded-[10px] h-[22px] flex items-center justify-center py-[4.5] px-[0.5px] top-[-10px] left-[calc(50%-40px)] text-white"
                  >
                    <span>{{ $t("Popular") }}</span>
                  </div>
                  <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">
                    {{ $t("3 Months Plan") }}
                  </h1>
                  <h2
                    class="font-[500] text-[10px]"
                    v-if="
                      packagesStore.currentPackage.package_price_role[0]
                        .discount_3_month !== 0
                    "
                  >
                    <span
                      class="!text-[#021328] font-[700] dark:text-white dark:!text-whiteTamkin/80"
                      >{{
                        packagesStore.currentPackage.package_price_role[0]
                          .discount_3_month
                      }}%
                    </span>
                    <span class="text-[#536174] dark:text-whiteTamkin/80">{{
                      $t("Discount on the 3 Months Plan")
                    }}</span>
                  </h2>
                </div>
                <div class="order-1 rtl:pl-4 ltr:pr-4">
                  <input
                    id="3month"
                    type="radio"
                    name="packages_radio"
                    class="hidden"
                    :checked="selectedPackage === 3"
                    @click.stop="selectPackage(3)"
                  />
                  <label for="3month" class="flex items-center cursor-pointer">
                    <span class="radio-tamkin"></span>
                  </label>
                </div>
              </div>
            </div>
            <div
              v-if="
                packagesStore.openedCurrentSite.billing_duration !== 'yearly'
              "
              class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5 px-1.5 pb-2.5 h-[87px] !rounded-[10px] mt-[35px]"
              :class="[
                selectedPackage === 12
                  ? 'custom-border-tamkin'
                  : 'custom-border ',
              ]"
            >
              <div class="flex items-center justify-center w-full">
                <div class="order-2 w-3/4 h-full">
                  <div
                    class="absolute text-[13px] dark:text-whiteTamkin bg-[#C16487] leading-[17.76px] font-[400] w-[90px] rounded-[10px] h-[22px] flex items-center justify-center py-[4.5] px-[0.5px] top-[-10px] left-[calc(50%-40px)] text-white"
                  >
                    <span>{{ $t("Best Value") }}</span>
                  </div>
                  <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">
                    {{ $t("Annual Plan") }}
                  </h1>
                  <h2
                    class="font-[500] text-[10px]"
                    v-if="
                      packagesStore.currentPackage.package_price_role[0]
                        .discount_yearly !== 0
                    "
                  >
                    <span
                      class="!text-[#021328] font-[700] dark:text-white dark:!text-whiteTamkin/80"
                      >{{
                        packagesStore.currentPackage.package_price_role[0]
                          .discount_yearly
                      }}%
                    </span>
                    <span class="text-[#536174] dark:text-whiteTamkin/80">{{
                      $t("Discount on the Annual Plan")
                    }}</span>
                  </h2>
                </div>
                <div class="order-1 rtl:pl-4 ltr:pr-4">
                  <input
                    id="annual"
                    type="radio"
                    name="packages_radio"
                    class="hidden"
                    :checked="selectedPackage === 12"
                    @click.stop="selectPackage(12)"
                  />
                  <label for="annual" class="flex items-center cursor-pointer">
                    <span class="radio-tamkin"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <multiselect
            v-model="webs"
            v-if="getCategory === null || getCategory === 0"
            :options="listOfApps"
            :disabled="isLinkActive('/my-site')"
            :multiple="true"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            :selectLabel="$t('Press enter to select')"
            :deselectLabel="$t('Press enter to remove')"
            :placeholder="$t('Choose sites')"
            label="app_domain"
            class="mt-[24px] dark:bg-tamkinDarkPrimary"
            :selected-label="$t('Selected')"
            track-by="app_domain"
            :showNoOptions="false"
            :showNoResults="false"
          >
            <template #selection="{ values, search, isOpen }" :maxHeight="200">
              <span
                class="multiselect__single !font-[500] dark:bg-p dark:!text-whiteTamkin !text-darkGrey !text-[14px] absolute inset-y-[2px] left-[-5px]"
                v-if="values.length"
                v-show="!isOpen"
                >{{ values.length }}
                {{ values.length > 1 ? $t("Sites") : $t("Site") }}
                {{ $t("Selected") }}</span
              >

              <img
                src="/assets/imgs/payment_methods/country_arrow.svg"
                :class="[isOpen ? 'rotate-90 ' : 'rtl:rotate-180']"
                class="absolute w-[14px] h-[8px] inset-y-[15px] rtl:left-[19px] ltr:right-[19px]"
              />
            </template>
            <template #option="props">
              <div class="option__desc">
                <span class="option__title">{{ props.option.app_domain }}</span>
              </div>
            </template>
          </multiselect>

          <input
            v-if="
              getCategory !== 0 &&
              packagesStore.currentType.title === 'Sign language'
            "
            :disabled="true"
            type="text"
            placeholder=""
            id="newWebsite"
            class="input_floating_label peer focus:outline-0 text-darkGrey flex-1 w-full !h-[40px] mt-[24px]"
            :value="$t('Internal Service')"
          />

          <div
            v-if="
              (packagesStore.currentPackage.package_type !== 'Extra' &&
                packagesStore.currentPackage.package_type !== 'Addons' &&
                packagesStore.currentType.title === 'Sign language' &&
                packagesStore.currentTab.title === 'Plugins') ||
              packagesStore.currentType.title === 'Accessibility'
            "
            class="flex items-center flex-row justify-between w-full gap-2 md:gap-4 mt-[24px]"
          >
            <div class="w-full !relative">
              <input
                type="text"
                placeholder=""
                id="newWebsite"
                class="input_floating_label peer focus:outline-0 text-darkGrey flex-1 w-full !h-[40px]"
                v-model="v$.newWebsite.$model"
                @input="checkforexistingwebsite"
                :disabled="loadingAddWebsite"
                :class="{
                  input_error:
                    (v$.newWebsite.$error &&
                      (v$.newWebsite.required.$invalid ||
                        v$.newWebsite.isDomain.$invalid)) ||
                    websiteExist === true,
                  error_text:
                    (v$.newWebsite.$error &&
                      (v$.newWebsite.required.$invalid ||
                        v$.newWebsite.isDomain.$invalid)) ||
                    websiteExist,
                  input_success:
                    !v$.newWebsite.$error &&
                    !v$.newWebsite.$invalid &&
                    !websiteExist,
                }"
              />
              <label
                for="newWebsite"
                class="floating_label"
                :class="[
                  (v$.newWebsite.$error && v$.newWebsite.required.$invalid) ||
                  (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid) ||
                  websiteExist
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("Add a Website*") }}
              </label>
              <div
                class="w-full lg:w-4/6"
                v-if="
                  websiteExist ||
                  (v$.newWebsite.$error && v$.newWebsite.required.$invalid) ||
                  (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid)
                "
              >
                <p class="error_message">
                  <span
                    v-if="
                      (v$.newWebsite.$error &&
                        v$.newWebsite.required.$invalid) ||
                      (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid)
                    "
                    >{{ $t("Website is not valid") }}</span
                  >

                  <span v-if="websiteExist">{{
                    $t("Website Already Added or Not Valid")
                  }}</span>
                </p>
              </div>
            </div>

            <div class="md:w-[240px] w-auto">
              <button
                @click="addWebsite"
                :disabled="v$.$invalid || loadingAddWebsite || websiteExist"
                class="w-full btn-dashboard hover_tamkin dark:text-whiteTamkin flex items-center justify-center text-nowrap max-md:px-3"
              >
                <div class="flex items-center justify-center">
                  <div :class="loadingAddWebsite ? 'rtl:ml-2 ltr:mr-2' : ''">
                    {{ $t("Add Website") }}
                  </div>

                  <svg
                    v-if="loadingAddWebsite"
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- <div
            class="w-full mt-[24px]"
            v-if="
              (packagesStore.currentType.title === 'Accessibility' &&
             packagesStore.currentPackage.package_type === 'Package') || packagesStore.openedCurrentSite
            "
          >
            <TranslateSelectInput
              @getCurrentSelectedItem="geteFilterInfo"
              :enableSearch="false"
              placeholderinput="Traffic level"
              :list="uniqueValues(packagesStore.getTraffiPrices('Package'))"
              nameKey="name"
              idField="id"
              :currentListValue="levelof"
            />
          </div> -->
          <!-- <TranslateSelectInput
              @getCurrentSelectedItem="geteFilterInfo"
              :enableSearch="false"
              placeholderinput="Traffic level"
              :list="levelsTraffic"
              nameKey="name"
              idField="name"
              class="mt-[24px]"
            /> -->
          <div class="overflow-x-auto w-full mt-3 md:mt-[16px]">
            <table class="w-full dark:bg-tamkinDarkPrimary bg-white mt-[62px]">
              <thead>
                <tr>
                  <th
                    class="py-2 px-[0px] border-b text-[16px] leading-[24px] text-[#A7A7A7] dark:text-whiteTamkin font-[500] ltr:text-left rtl:text-right"
                  >
                    {{ $t("Website") }}
                  </th>
                  <th
                    class="py-2 border-b text-[16px] leading-[24px] text-[#A7A7A7] dark:text-whiteTamkin font-[500] rtl:text-right ltr:text-left"
                  >
                    {{ $t("Tier") }}
                  </th>
                  <th
                    class="py-2 border-b text-[16px] text-center leading-[24px] text-[#A7A7A7] dark:text-whiteTamkin font-[500]"
                  >
                    {{ $t("Price") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(website, index) in packagesStore.urls"
                  :key="index"
                  :class="
                    trafficTooHighUrls.some((w) => w.title === website.title) &&
                    levelof !== 'Over 1M page views/mo'
                      ? 'bg-red-50'
                      : ''
                  "
                >
                  <td
                    class="py-2 border-b whitespace-nowrap ltr:pr-[10px] rtl:pl-[10px] ltr:text-left rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin flex items-center justify-start rtl:space-x-reverse space-x-[33px]"
                  >
                    <div class="w-[150px] flex items-center h-[40px]">
                      <div
                        class="flex items-center dark:text-whiteTamkin justify-between text-[14px] leading-[12px] text-[#18181B] font-[500] whitespace-nowrap"
                      >
                        <div>{{ website.title }}</div>
                        <span
                          v-if="
                            trafficTooHighUrls.some(
                              (w) => w.title === website.title
                            ) && levelof !== 'Over 1M page views/mo'
                          "
                          class="tooltip packages"
                          :data-tamkin="
                            $t(
                              'The selected website exceeds the traffic limit of the chosen package.'
                            )
                          "
                        >
                          <svg
                            width="16"
                            class="ml-auto"
                            height="15"
                            viewBox="0 0 16 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                              fill="red"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div
                      class="cursor-pointer"
                      @click="removeWebsite(website.title)"
                    >
                      <svg
                        width="18"
                        height="17"
                        viewBox="0 0 18 17"
                        class="text-[#D9D9D9] hover:text-[#E80902]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </td>
                  <td
                    class="py-2 border-b ltr:text-left whitespace-nowrap rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    {{
                      packagesStore.currentPackage.package_type === "Package" &&
                      packagesStore.currentPackage.type === "Accessibility"
                        ? $t(`${website.traffic}`)
                        : $t("Not applicable")
                    }}
                  </td>

                  <td
                    v-if="
                      packagesStore.currentPackage.package_type === 'Package' &&
                      packagesStore.currentPackage.type !== 'Accessibility'
                    "
                    class="py-2 border-b text-left text-[16px] leading-[24px] w-[80px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div class="flex items-center justify-center">
                      <div v-if="!loadingPriceTraffic">
                        {{ formattedEstimatedPrice }}
                      </div>

                      <svg
                        v-if="loadingPriceTraffic"
                        class="animate-spin h-5 w-5 text-tamkin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  </td>

                  <td
                    v-if="
                      packagesStore.currentPackage.package_type === 'Package' &&
                      packagesStore.currentPackage.type === 'Accessibility'
                    "
                    class="py-2 border-b text-left text-[16px] leading-[24px] w-[80px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div class="flex items-center justify-center">
                      <div v-if="!loadingByWebsite[website.url]">
                        ${{ formattedAccessibilityPrice(website.url) }}
                      </div>

                      <svg
                        v-else
                        class="animate-spin h-5 w-5 text-tamkin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  </td>
                  <td
                    v-if="
                      packagesStore.currentPackage.package_type === 'Addons'
                    "
                    class="py-2 border-b text-center text-[16px] leading-[24px] w-1/6 font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    ${{
                      (() => {
                        const formatNumber = (num) =>
                          Math.floor(num)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        const getPackagePrice = () => {
                          if (selectedPackage === 1) {
                            return packagesStore.currentPackage
                              .package_price_role[0].cost_month;
                          } else if (selectedPackage === 3) {
                            return packagesStore.currentPackage
                              .package_price_role[0].cost_3_month;
                          } else {
                            return packagesStore.currentPackage
                              .package_price_role[0].cost_yearly;
                          }
                        };

                        const packagePrice = getPackagePrice();

                        return formatNumber(packagePrice);
                      })()
                    }}
                  </td>
                </tr>
                <tr
                  v-for="(website, index) in webs"
                  :key="index"
                  :class="
                    trafficTooHighApps.includes(website) &&
                    levelof !== 'Over 1M page views/mo'
                      ? 'bg-red-50'
                      : ''
                  "
                >
                  <td
                    class="py-2 border-b px-2 ltr:text-left whitespace-nowrap rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div
                      class="flex items-center justify-start rtl:space-x-reverse space-x-[33px]"
                    >
                      <div class="w-[150px] flex items-center h-[40px]">
                        <div
                          class="flex items-center justify-between dark:text-whiteTamkin text-[14px] leading-[12px] text-[#18181B] font-[500] whitespace-nowrap"
                        >
                          <div>
                            {{
                              website.title &&
                              website.title === "Internal Service"
                                ? $t(website.title)
                                : website.app_domain
                            }}
                          </div>
                          <span
                            v-if="
                              trafficTooHighApps.includes(website) &&
                              levelof !== 'Over 1M page views/mo'
                            "
                            class="tooltip packages"
                            :data-tamkin="
                              $t(
                                'The selected website exceeds the traffic limit of the chosen package.'
                              )
                            "
                          >
                            <svg
                              width="16"
                              class="ml-auto"
                              height="15"
                              viewBox="0 0 16 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                                fill="red"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div
                        class="cursor-pointer"
                        @click="
                          removeWebsiteFromSelectedApps(website.app_domain)
                        "
                      >
                        <svg
                          width="18"
                          height="17"
                          viewBox="0 0 18 17"
                          class="text-[#D9D9D9] hover:text-[#E80902]"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td
                    class="py-2 px-2 border-b text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    {{
                      packagesStore.currentPackage.package_type !== "Package" ||
                      !website.app_domain
                        ? $t("Not applicable")
                        : website.traffic <= 100000
                        ? $t("Small")
                        : website.traffic > 100000 && website.traffic <= 1000000
                        ? $t("Medium")
                        : $t("Large")
                    }}
                  </td>

                  <td
                    v-if="
                      packagesStore.currentPackage.package_type === 'Package' &&
                      packagesStore.currentType.title !== 'Accessibility'
                    "
                    class="py-2 px-2 border-b text-left text-[16px] leading-[24px] w-[80px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div class="flex items-center justify-center">
                      <div v-if="!loadingPriceTraffic">
                        ${{ formattedEstimatedPrice }}
                      </div>

                      <svg
                        v-if="loadingPriceTraffic"
                        class="animate-spin h-5 w-5 text-tamkin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  </td>
                  <td
                    v-if="
                      packagesStore.currentPackage.package_type === 'Package' &&
                      packagesStore.currentType.title === 'Accessibility'
                    "
                    class="py-2 border-b text-left text-[16px] leading-[24px] w-[80px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div class="flex items-center justify-center">
                      <div v-if="!loadingByWebsite[website.app_domain]">
                        ${{ formattedAccessibilityPrice(website.app_domain) }}
                      </div>

                      <svg
                        v-else
                        class="animate-spin h-5 w-5 text-tamkin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  </td>

                  <!-- <td
                v-if="
             
                packagesStore.currentPackage.package_type === 'Extra'
            
              "
                  class="py-2 border-b text-center text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
                >
                  ${{
                    selectedPackage === 1
                      ? packagesStore.currentPackage.package_price_role[0].cost_month.toFixed(
                          0
                        )
                      : selectedPackage === 3
                      ? packagesStore.currentPackage.package_price_role[0].cost_3_month.toFixed(
                          0
                        )
                      : packagesStore.currentPackage.package_price_role[0].cost_yearly.toFixed(
                          0
                        )
                  }}
                </td> -->
                  <td
                    v-if="
                      packagesStore.currentPackage.package_type === 'Addons'
                    "
                    class="py-2 border-b text-center text-[16px] leading-[24px] w-1/6 font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    ${{
                      (() => {
                        const formatNumber = (num) =>
                          Math.floor(num)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        const getPackagePrice = () => {
                          if (selectedPackage === 1) {
                            return packagesStore.currentPackage
                              .package_price_role[0].cost_month;
                          } else if (selectedPackage === 3) {
                            return packagesStore.currentPackage
                              .package_price_role[0].cost_3_month;
                          } else {
                            return packagesStore.currentPackage
                              .package_price_role[0].cost_yearly;
                          }
                        };

                        const packagePrice = getPackagePrice();

                        return formatNumber(packagePrice);
                      })()
                    }}
                  </td>
                  <td
                    v-if="packagesStore.currentPackage.package_type === 'Extra'"
                    class="py-2 border-b text-[16px] text-center leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    ${{
                      packagesStore.currentPackage.package_price_role[0].cost_month
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </td>
                </tr>
                <tr
                  class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
                >
                  <td
                    class="py-2 border-b rtl:text-left ltr:text-right px-8 font-[500] dark:text-whiteTamkin"
                    colspan="2"
                  >
                    {{ $t("Total") }}
                  </td>
                  <td
                    class="py-2 border-b text-center font-[600] text-darkGrey dark:text-whiteTamkin"
                    v-if="
                      packagesStore.currentPackage.package_type === 'Package' &&
                      packagesStore.currentType.title !== 'Accessibility'
                    "
                  >
                    ${{
                      packagesStore.currentPackage.trial_days > 0 &&
                      selectedPackage === 0
                        ? "0"
                        : getCategory !== 0
                        ? calculateEstimatedPrice
                            .toFixed(0)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        : (
                            calculateEstimatedPrice.toFixed(0) *
                            (webs.length + packagesStore.urls.length)
                          )
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </td>

                  <td
                    class="py-2 border-b text-center font-[600] text-darkGrey dark:text-whiteTamkin"
                    v-if="
                      packagesStore.currentPackage.package_type === 'Package' &&
                      packagesStore.currentType.title === 'Accessibility'
                    "
                  >
                    ${{
                      packagesStore.currentPackage.trial_days > 0 &&
                      selectedPackage === 0
                        ? "0"
                        : calculateTotalPrice()
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </td>
                  <td
                    class="py-2 border-b text-center font-[600] text-darkGrey dark:text-whiteTamkin"
                    v-if="
                      packagesStore.currentPackage.package_type === 'Addons'
                    "
                  >
                    ${{ formattedTotal }}
                  </td>
                  <td
                    v-if="
                      !packagesStore.openedCurrentSite &&
                      packagesStore.currentPackage.package_type === 'Extra'
                    "
                    class="py-2 border-b text-center text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    ${{
                      packagesStore.currentPackage.package_price_role[0]
                        .cost_month
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- {{ webs.length }} -->
          <div class="my-[26px] rtl:mr-auto ltr:ml-auto max-md:w-full">
            <button
              class="btn-dashboard hover_tamkin hover:dark:bg-tamkinDarkPrimary max-md:w-full dark:text-whiteTamkin"
              @click="conintuePay"
              :disabled="
                (!getCategory &&
                  packagesStore.urls.length === 0 &&
                  webs.length === 0) ||
                websiteExist ||
                (packagesStore.currentType.title === 'Accessibility' &&
                  Object.values(loadingByWebsite).includes(true))
              "
            >
              {{ $t("Continue to Payment") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped></style>
