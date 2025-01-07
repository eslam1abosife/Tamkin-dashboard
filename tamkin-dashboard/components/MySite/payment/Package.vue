<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { helpers } from "@vuelidate/validators";
import Multiselect from "vue-multiselect";
import { useGetAppInvites } from "@/composables/useTeam";
import {useGetTrafficByType} from '@/composables/useAddSite'
const localePath = useLocalePath()
const {getTrafficType} = useGetTrafficByType()
const route = useRoute()
onBeforeMount(async ()=>{
    if(mysiteStore.urls.length ===0){
        mysiteStore.urls.push(mysiteStore.currentWebsite)
    }
  await geteFilterInfo()

   await getTrafficType(mysiteStore.currentPackage.name)
    mysiteStore.currentLevel = mysiteStore.levelsTraffic[0]
// levelof.value = mysiteStore.currentLevel.name
})
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
} from "@/composables/usePackages";
const { locale } = useI18n();
const { getInviteApps, defaultApp, apps, loading: getSitesLoading } = useGetAppInvites();
const { checkifBlockedSite, messageStatus, codeStatus } = useCheckifSiteblocked();
const mysiteStore = useMySiteStore()
const { getPriceByTraffic } = useGetPriceByTraffic();
const loadingPriceTraffic = ref(false);
function getDayLabel(number) {
  return number === 1 ? "day" : "days";
}
const { getTraffic } = useGetTraffic();

const domainRegex = /^(?:(?:https?:\/\/)?(?:www\.)?(?!www\.)[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})(?:\/.*)?$/;


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
 mysiteStore.currentPackage.billing_duration === '3-monthly' || mysiteStore.currentPackage.billing_duration === '3 months'  ? 12 : 3
);


const selectPackage = async (plan: any) => {
  selectedPackage.value = plan;
  await geteFilterInfo()
};
const selectPackageWeb = (plan: any) => {
  selectedPackage.value = plan;
};
const props = defineProps({
  showModal: Boolean,
});

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const openedCurrentSite = ref("");
const levelof = ref( );

const websiteExist = ref(false);
const cleanWebsiteUrl = (url: string) => {
  // Remove the protocol (http, https) and www if present
  const cleanedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, "");
  // Remove any path or query parameters by splitting at the first "/"
  return cleanedUrl.split("/")[0];
};
const addWebsite = async () => {
  loadingAddWebsite.value = true;
  if (!v$.value.$invalid) {
    const res = await checkifBlockedSite(state.newWebsite);
    const traffic = await getTraffic(state.newWebsite, "url");

    if (
      apps.value.filter((ap) => ap.app_domain === state.newWebsite).length === 0 &&
      codeStatus.value === 200 &&
      res.length === 0 &&
      mysiteStore.urls.filter(
        (website: any) => website.url === cleanWebsiteUrl(state.newWebsite)
      ).length === 0
    ) {
      mysiteStore.urls.push({
        title: cleanWebsiteUrl(state.newWebsite),
        url: cleanWebsiteUrl(state.newWebsite),
        traffic:
          traffic[0].traffic <= 100000
            ? "Small"
            : traffic[0].traffic > 100000 && traffic[0].traffic <= 1000000
            ? "Medium"
            : "Large",
      });
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
  mysiteStore.urls = mysiteStore.urls.filter((item: any) => item.title !== website);

  trafficTooHighUrls.value = trafficTooHighUrls.value.filter(
    (item: any) => item.title !== website
  );
};

const removeWebsiteFromSelectedApps = (website: any) => {
  webs.value = webs.value.filter((item: any) => item.title !== website);

  trafficTooHighApps.value = trafficTooHighApps.value.filter(
    (item: any) => item.title !== website
  );
};
const pricebytraffic = ref([]);
const calculateEstimatedPrice = computed(() => {
  if (mysiteStore.currentPackage.type !== "Accessibility") {
    return selectedPackage.value === 12
      ? mysiteStore.currentPackage.package_price_role[0].cost_yearly
      : selectedPackage.value === 3
      ? mysiteStore.currentPackage.package_price_role[0].cost_3_month
      : mysiteStore.currentPackage.package_price_role[0].cost_month;
  }
  if (mysiteStore.currentPackage.type  === "Accessibility") {
    if (levelof.value !== "Over 1M page views/mo") {
      // Handle the case for traffic below 1M
      return selectedPackage.value === 12
        ? mysiteStore.currentPackage.package_price_role[0].cost_yearly 
        : selectedPackage.value === 3
        ? mysiteStore.currentPackage.package_price_role[0].cost_3_month 
        : selectedPackage.value === 1
        ? mysiteStore.currentPackage.package_price_role[0].cost_month 
        : mysiteStore.currentPackage.package_price_role[0].trial_days > 0
        ? 0
        : 0;
    } else if (
   
      pricebytraffic.value.length > 0
    ) {
      // Handle the case for traffic over 1M
      // Find the matching website in webs or mysiteStore.urls
      const openedCurrentSite =
        mysiteStore.urls.find((item: any) =>
          pricebytraffic.value.some((priceItem: any) => priceItem.website === item.url)
        );

      if (openedCurrentSite) {
        // Find the corresponding price entry in pricebytraffic for the current website
        const priceInfo = pricebytraffic.value.find(
          (priceItem: any) =>
          
            priceItem.website === openedCurrentSite.url
        );

        if (priceInfo) {
          // Return cost based on the selected package
          return selectedPackage.value === 12
            ? priceInfo.cost_year // Return yearly cost if selectedPackage is 12
            : selectedPackage.value === 1
            ? priceInfo.cost_month // Return monthly cost if selectedPackage is 1
            : priceInfo.cost_3_month;
        }
      }

      return 0; // Return 0 if no matching website or price is found
    }
  }
});
const calculatePrice = (website) => {
  const isAccessibility = mysiteStore.currentPackage && mysiteStore.currentPackage.type === "Accessibility";

  if (!isAccessibility) {
    // Handle non-Accessibility types
    return selectedPackage.value === 12
      ? mysiteStore.currentPackage.package_price_role[0].cost_yearly 
      : selectedPackage.value === 3
      ? mysiteStore.currentPackage.package_price_role[0].cost_3_month 
      : mysiteStore.currentPackage.package_price_role[0].cost_month;
  } 

//   // Handle Accessibility type
//   if (levelof.value !== "Over 1M page views/mo") {
//     // Traffic below 1M
//     return selectedPackage.value === 12
//       ? mysiteStore.currentPackage.cost_yearly  
//       : selectedPackage.value === 3
//       ? mysiteStore.currentPackage.cost_3_month 
//       : selectedPackage.value === 1
//       ? mysiteStore.currentPackage.cost_month 
//       : mysiteStore.currentPackage.trial_days > 0 
//       ? 0
//       : 0;
//   } 

  // Traffic over 1M
  if ( pricebytraffic.value.length > 0) {
    const currentWebsite = 
                           mysiteStore.urls.find((item) => item.url === website);


    if (currentWebsite) {
      const priceInfo = pricebytraffic.value.find(
        (priceItem) =>
          priceItem.website === currentWebsite.app_domain ||
          priceItem.website === currentWebsite.url
      );
      console.log('pricehree',priceInfo);
   

      if (priceInfo) {
        return selectedPackage.value === 12
          ? priceInfo.cost_year // Return yearly cost if selectedPackage is 12
          : selectedPackage.value === 3
          ? priceInfo.cost_3_month // Return 3-month cost if selectedPackage is 3
          : selectedPackage.value === 1
          ? priceInfo.cost_month // Return monthly cost if selectedPackage is 1
          : 0; // Default case
      }
    }
  }

  return 0; // Default return if no conditions are met
};


const calculateTotalPrice = () => {
  
  if ( pricebytraffic.value.length > 0) {
    // Sum the prices based on the selected package
    const totalCost = pricebytraffic.value.reduce((sum, priceItem) => {
      return sum + (
        selectedPackage.value === 12
          ? priceItem.cost_year // Sum yearly cost if selectedPackage is 12
          : selectedPackage.value === 3
          ? priceItem.cost_3_month // Sum 3-month cost if selectedPackage is 3
          : selectedPackage.value === 1
          ? priceItem.cost_month // Sum monthly cost if selectedPackage is 1
          : 0 // Default case
      );
    }, 0); 

    return totalCost; // Return the total sum
  }

 return 0
   
};
const packageTypeToSend = computed(() => {
  const {  currentPackage } = mysiteStore;


// if(currentPackage.type !== 'Accessibility'){
// return currentPackage.type ;
// }
});

/**
 * Sets the package payload and navigates to the payment methods page.
 * @returns {Promise<void>}
 */
 const packagesStore = usePackgesStore()

const conintuePay = () => {
  mysiteStore.packagePayload = {
    package: mysiteStore.currentPackage.name,
    urls: [],
    apps: [mysiteStore.currentWebsite.name],
    payDateType: selectedPackage.value,
    locale: locale.value,
    total: totalCost.value,
    packageExtraType: mysiteStore.currentPackage.category ? mysiteStore.currentPackage.category : null,
    packageTrie:    mysiteStore.currentPackage.type ==='Accessibility' ? packagesStore.traffic_level : mysiteStore.currentPackage.category,
  };
  return navigateTo("add_package_modal_mysite", "mysite", "payment_methods_mysite");
};

const totalCost = computed(() => {
  const urlCount = mysiteStore.urls.length || 0;
  const webCount = webs.value.length || 0;
  const price = calculateEstimatedPrice.value || 0;
    return price * urlCount ;

});



const geteFilterInfo = async () => {
  if (mysiteStore.currentPackage.type === 'Accessibility' && mysiteStore.currentPackage.package_type === 'Package') {
    loadingPriceTraffic.value = true;
    const res = await getPriceByTraffic(
     [],
      mysiteStore.currentPackage.name,
      [...(mysiteStore.urls.length ? mysiteStore.urls.map((we) => we.name) : [])]
    );
    pricebytraffic.value = res;
  levelof.value =res[0].title
  loadingPriceTraffic.value = false;
  }
};

const uniqueValues = (items) => {
  const seen = new Set();

  const uniqueItems = items.filter((item) => {
    if (seen.has(item.name)) {
      return false;
    }
    seen.add(item.name);
    return true;
  });

  return uniqueItems;
};
/**
 * Given a package id, returns the package with the matched
 * price role.
 *
 * @param {string} id - The package id to search for
 * @return {Object} The package with the matched price role
 * @property {number} cost_before_month - The cost before discount
 * @property {number} cost_year - The cost of the package per year
 * @property {number} cost_month - The cost of the package per month
 * @property {number} cost_3_month - The cost of the package for 3 months
 * @property {number} cost_investor - The cost of the package for investors
 * @property {boolean} is_contact_us - Whether to contact us to get the package
 * @property {number} data_cost_month - The cost of the package per month of data
 * @property {number} cost_yearly - The cost of the package per year
 * @property {number} discount_month - The discount for the month
 * @property {number} discount_3_month - The discount for 3 months
 * @property {number} discount_yearly - The discount for the year
 * @property {number} cost_before_yearly - The cost before discount for the year
 */
const getPackageById = (id) => {
  const packageg = mysiteStore.packages.find(
    (pkg) =>
      pkg.name === id && // Filter by the package id
      pkg.package_type === "Package" &&
      pkg.package_price_role.some((item) => item.title === levelof.value)
  );
// console.log(id)
  if (packageg) {
    const priceRole = packageg.package_price_role.find(
      (item) => item.title === levelof.value
    );
    // alert(priceRole.cost_month)
    return {
      ...packageg,
      // Add fields from the matched price role
      cost_before_month: priceRole.cost_before_month,
      cost_year: priceRole.cost_year,
      cost_month: priceRole.cost_month,
      cost_3_month: priceRole.cost_3_month,
      cost_investor: priceRole.cost_investor,
      is_contact_us: priceRole.is_contact_us,
      data_cost_month: priceRole.data_cost_month,
      cost_yearly: priceRole.cost_yearly,
      discount_month: priceRole.discount_month,
      discount_3_month: priceRole.discount_3_month,
      discount_yearly: priceRole.discount_yearly,
      cost_before_yearly: priceRole.cost_before_yearly,
    };
  }

  return undefined; // Return undefined if not found
};
watch(
  () => levelof.value,
  () => {
    // mysiteStore.currentPackage = getPackageById(mysiteStore.currentPackage.name);
  }
);

watchEffect(() => {
  if (
    mysiteStore.currentPackage.type === "Accessibility" &&
    mysiteStore.currentPackage.package_type === "Package"
  ) {
    // Determine the traffic limit based on the selected level
    const trafficLimit =
      levelof.value === "Up to 100K page views/mo"
        ? 100000
        : levelof.value === "Up to 1M page views/mo"
        ? 1000000
        : 0;

    const newAffectedItemsInUrls = mysiteStore.urls?.filter((item: any) => {
      const trafficValue =
        item.traffic === "Small"
          ? 100000
          : item.traffic === "Medium"
          ? 1000000
          : 10000000; // For 'Large'
      return trafficValue > trafficLimit;
    });

    if (newAffectedItemsInUrls && newAffectedItemsInUrls.length > 0) {
      trafficTooHighUrls.value = [
        ...trafficTooHighUrls.value,
        ...newAffectedItemsInUrls.map((item) => ({
          title: item.title,
          url: item.url,
          traffic:
            item.traffic <= 100000
              ? "Small"
              : item.traffic > 100000 && item.traffic <= 1000000
              ? "Medium"
              : "Large",
        })),
      ];
    }

    // If level is 'Over 1M page views/mo', remove recently added items
    if (levelof.value === "Over 1M page views/mo") {
 
      trafficTooHighUrls.value = trafficTooHighUrls.value.filter(
        (item: any) => !newAffectedItemsInUrls.some((newItem) => newItem.url === item.url)
      );
    }
  }
});

watch(mysiteStore.urls, async () => {
  if (levelof.value && levelof.value === "Over 1M page views/mo") {
    const res = await getPriceByTraffic(
      [...(mysiteStore.urls.length ? mysiteStore.urls.map((we) => we.url) : [])],
      mysiteStore.currentPackage.name,
      [...(webs.value.length ? webs.value.map((we) => we.name) : [])]
    );
    pricebytraffic.value = res;
  }
});
// watch(webs, async () => {
//   if (levelof.value === "Over 1M page views/mo") {
//     const res = await getPriceByTraffic(
//       [...(mysiteStore.urls.length ? mysiteStore.urls.map((we) => we.url) : [])],
//       mysiteStore.currentPackage.name,
//       [...(webs.value.length ? webs.value.map((we) => we.name) : [])]
//     );
//     pricebytraffic.value = res;
//   }
// });

onMounted(async () => {
//   if (mysiteStore.openedCurrentSite) {
//     webs.value.push(mysiteStore.currentWebsite);
//   }

// if(mysiteStore.openedCurrentSite &&mysiteStore.currentPackage.type === 'Accessibility'){
//   const typeg = mysiteStore.types.find(t=>t.title === 'Accessibility')
// mysiteStore.currentType = typeg
// }
  
//   if (!mysiteStore.traffic_level) {
//     const trafficLevels = mysiteStore.getTraffiPrices("Package",'Accessibility');
//     // alert(trafficLevels[0].name)
//     mysiteStore.setTrafficLevel(trafficLevels[0].name);

//   }
//  if(mysiteStore.currentType.title === 'Accessibility'){
//   await geteFilterInfo(levelof.value || mysiteStore.traffic_level)
//  }

 
});
/**
 * Function to check if a given website already exists in our database.
 * It cleans the given website domain and then checks if the clean domain exists in the list of apps or urls.
 * If it does, it sets the websiteExist ref to true, otherwise it sets it to false.
 */
const checkforexistingwebsite = () => {
  const cleanDomain = cleanWebsiteUrl(state.newWebsite);

  if (
    apps.value.filter((website: any) => website.app_domain === cleanDomain).length > 0 ||
    mysiteStore.urls.filter((website: any) => website.url === cleanDomain).length > 0
  ) {
    websiteExist.value = true;
  } else {
    websiteExist.value = false;
  }
};
watch(()=>selectPackage,async ()=>{
  if (levelof.value && levelof.value === "Over 1M page views/mo") {
    const res = await getPriceByTraffic(
      [...(mysiteStore.urls.length ? mysiteStore.urls.map((we) => we.url) : [])],
      mysiteStore.currentPackage.name,
      [...(webs.value.length ? webs.value.map((we) => we.name) : [])]
    );
    pricebytraffic.value = res;
  }
})
const closeModalPackage = () => {
  closeModal("add_package_modal_mysite");
  webs.value = [];
  mysiteStore.urls = [];
};
</script>

<template>
  <div
    class="mysite_bg_modal dark:bg-p fixed z-[9999] !top-[-2px] lg:inset-auto inset-0 rtl:lg:left-0 ltr:lg:right-0 rounded-[10px] lg:p-[30px] lg:w-[600px] w-full h-screen overflow-y-auto lg:overflow-x-hidden"
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
      <div class="flex flex-col items-start justify-center w-full lg:overflow-x-hidden">
        <h1
          class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin lg:px-0 px-[20px] lg:mt-0 mt-[60px]"
        >
          {{ $t("Add Package") }}
        </h1>
        <div
          class="flex flex-col items-start justify-start lg:overflow-x-hidden bg-white dark:bg-tamkinDarkPrimary w-full min-h-[70vh] px-[20px] rounded-[10px] mt-[33px]"
          style="box-shadow: 0px 4px 24px 8px #51459f14"
        >
         <div class="flex items-center justify-between w-full pt-[24px] ">
          <div
          class="flex items-center justify-start rtl:space-x-reverse space-x-[18px] "
        >
          <div>
            <img
              :src="`https://tamkin.app/${mysiteStore.currentPackage.icon}`"
              class="w-[32px] h-[32px]"
              alt=""
            />
          </div>
          <div class="font-[600] text-[16px] leading-[30px] text-black text-center">
            {{ $t(mysiteStore.currentPackage.title) }}
          </div>
       
        </div>
        <div class="font-[400] text-[16px] leading-[30px] text-black text-center ">
          {{ $t(mysiteStore.currentPackage.type) }}
        </div>
         </div>
       
          <div
          class="flex items-center justify-center gap-4 w-full"
        

        >
        <div class="flex items-center justify-center gap-4 w-full">
          <!-- Free Trial -->
          <div
            v-if="mysiteStore.currentPackage.trial_days > 0 && mysiteStore.currentPackage.billing_duration === 'none'"
          class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5
               px-1.5 pb-2.5  h-[87px] !rounded-[10px] mt-[35px]"
            :class="[selectedPackage === 0 ? 'custom-border-tamkin' : 'custom-border']"
          >
            <div class="flex items-center justify-center w-full">
              <div class="order-2 w-3/4 h-full">
                <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">{{ $t("Free Trial") }}</h1>
                <h2 class="font-[500] text-[10px]">
                  {{ $t("Free trial for") }} {{
                    mysiteStore.currentPackage.trial_days + " " +
                    $t(getDayLabel(mysiteStore.currentPackage.trial_days))
                  }}
                </h2>
              </div>
              <div class="order-1 w-1/4">
                <input
                  id="free_trial"
                  type="radio"
                  name="packages_radio"
                  class="radio-tamkin absolute opacity-0"
                  :checked="selectedPackage === 0"
                  @change="selectPackage(0)"
                />
                <label for="free_trial" class="flex items-center cursor-pointer">
                  <span class="radio-tamkin"></span>
                </label>
              </div>
            </div>
          </div>
        
          <!-- Monthly Plan -->
          <div
            v-if="mysiteStore.currentPackage.billing_duration !== 'none' || mysiteStore.currentPackage.trial_days === 0"
              class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5
               px-1.5 pb-2.5  h-[87px] !rounded-[10px] mt-[35px]"
            :class="[selectedPackage === 1 ? 'custom-border-tamkin' : 'custom-border']"
          >
            <div class="flex items-center justify-center w-full">
              <div v-if="mysiteStore.currentPackage.billing_duration === 'monthly' && !mysiteStore.currentPackage.cancel_package"
                class="bg-gradient-to-br from-yellow-600 to-yellow-300 absolute text-[13px] font-[400] w-[80px] 
                rounded-[10px] h-[22px] flex items-center justify-center px-[0.5px] top-[-10px] left-[calc(50%-45px)] text-white">
                <span>{{ $t("Renew") }}</span>
              </div>
              <div class="order-2 w-3/4 h-full">
                <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">{{ $t("Monthly Plan") }}</h1>
                <h2 class="font-[500] text-[10px]" v-if="mysiteStore.currentPackage.package_price_role[0].discount_month !== 0">
                  <span class="!text-[#021328] font-[700] dark:!text-whiteTamkin/80">{{ mysiteStore.currentPackage.package_price_role[0].discount_month }}%</span>
                  <span class="text-[#536174] dark:text-whiteTamkin/80">{{ $t("Discount on the Monthly Plan") }}</span>
                </h2>
              </div>
              <div class="order-1 w-1/4">
                <input
                  id="month"
                  type="radio"
                  name="packages_radio"
                  class="radio-tamkin absolute opacity-0"
                  :checked="selectedPackage === 1"
                  @change="selectPackage(1)"
                />
                <label for="month" class="flex items-center cursor-pointer">
                  <span class="radio-tamkin"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
          <div
       
              class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5
               px-1.5 pb-2.5  h-[87px] !rounded-[10px] mt-[35px]"
         
            :class="[selectedPackage === 3 ? 'custom-border-tamkin' : 'custom-border ']"
          >
            <div class="flex items-center justify-center w-full">
              <div class="order-2 w-3/4 h-full">
                <div v-if="mysiteStore.currentPackage.billing_duration === '3 months'&& !mysiteStore.currentPackage.cancel_package"
             
                class="bg-gradient-to-br from-yellow-600 to-yellow-300 absolute text-[13px] leading-[17.76px] font-[400] w-[80px] rounded-[10px] h-[22px] flex items-center justify-center py-[4.5] px-[0.5px] top-[-10px] left-[calc(50%-40px)] text-white"
              >
                <span>{{ $t("Renew") }}</span>
              </div>
                <div v-else
                  style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
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
                    mysiteStore.currentPackage.package_price_role[0]
                      .discount_3_month !== 0
                  "
                >
                  <span class="!text-[#021328] font-[700] dark:!text-whiteTamkin/80"
                    >{{
                      mysiteStore.currentPackage.package_price_role[0]
                        .discount_3_month
                    }}%
                  </span>
                  <span class="text-[#536174] dark:text-whiteTamkin/80">{{
                    $t("Discount on the 3 Months Plan")
                  }}</span>
                </h2>
              </div>
              <div class="order-1 w-1/4">
                <input
                  id="3month"
                  type="radio"
                  name="packages_radio"
                  class="radio-tamkin absolute opacity-0"
                  :checked="selectedPackage === 3"
                  @change="selectPackage(3)"
                />
                <label for="3month" class="flex items-center cursor-pointer">
                  <span class="radio-tamkin"></span>
                </label>
              </div>
            </div>
          </div>
          <div
   
             class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5
               px-1.5 pb-2.5  h-[87px] !rounded-[10px] mt-[35px]"
            :class="[
              selectedPackage === 12 ? 'custom-border-tamkin' : 'custom-border ',
            ]"
          >
            <div class="flex items-center justify-center w-full">
              <div class="order-2 w-3/4 h-full">
                <div v-if="mysiteStore.currentPackage.billing_duration === 'yearly'&& !mysiteStore.currentPackage.cancel_package"
          
                class="bg-gradient-to-br from-yellow-600 to-yellow-300 absolute text-[13px] leading-[17.76px] font-[400] w-[80px] rounded-[10px] h-[22px] flex items-center justify-center py-[4.5] px-[0.5px] top-[-10px] left-[calc(50%-40px)] text-white"
              >
                <span>{{ $t("Renew") }}</span>
              </div>
                <div v-else
                  class="absolute text-[13px] bg-[#C16487] leading-[17.76px] font-[400] 
                  w-[90px] rounded-[10px] h-[22px] flex items-center justify-center py-[4.5] px-[0.5px] top-[-10px] left-[calc(50%-45px)] text-white"
                >
                  <span>{{ $t("Best Value") }}</span>
                </div>
                <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">
                  {{ $t("Annual Plan") }}
                </h1>
                <h2
                  class="font-[500] text-[10px]"
                  v-if="
                    mysiteStore.currentPackage.package_price_role[0]
                      .discount_yearly !== 0
                  "
                >
                  <span class="!text-[#021328] font-[700] dark:!text-whiteTamkin/80"
                    >{{
                      mysiteStore.currentPackage.package_price_role[0]
                        .discount_yearly
                    }}%
                  </span>
                  <span class="text-[#536174] dark:text-whiteTamkin/80">{{
                    $t("Discount on the Annual Plan")
                  }}</span>
                </h2>
              </div>
              <div class="order-1 w-1/4">
                <input
                  id="annual"
                  type="radio"
                  name="packages_radio"
                  class="radio-tamkin absolute opacity-0"
                  :checked="selectedPackage === 12"
                  @change="selectPackage(12)"
                />
                <label for="annual" class="flex items-center cursor-pointer">
                  <span class="radio-tamkin"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
          <div

            class="flex items-center lg:flex-row flex-col justify-center lg:justify-between w-full gap-4 mt-[24px]"
          >
            <div class="w-full !relative">
              <input
              :disabled="true"
                type="text"
                placeholder=""
                id="newWebsite"
                class="input_floating_label peer focus:outline-0 text-darkGrey w-full !h-[40px]"
              :value="mysiteStore.currentWebsite.title !== 'Internal Service' ? mysiteStore.currentWebsite.app_domain : $t(`${mysiteStore.currentWebsite.title}`)"
               
              />
             
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
                      (v$.newWebsite.$error && v$.newWebsite.required.$invalid) ||
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

          </div>
<!-- 
          <div
            class="w-full mt-[24px]"
            v-if="
              mysiteStore.currentPackage.type === 'Accessibility' "
         
          >
            <TranslateSelectInput
              @getCurrentSelectedItem="geteFilterInfo"
              :enableSearch="false"
              placeholderinput="Traffic level"
              :list="mysiteStore.levelsTraffic ? mysiteStore.levelsTraffic : []"
              nameKey="name"
              idField="id"
              :current-list-value="levelof"
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

          <table class="min-w-full dark:bg-tamkinDarkPrimary bg-white mt-[62px]">
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
                v-for="(website, index) in mysiteStore.urls"
                :key="index"
                class="h-[45px]"
                :class="
                  false && trafficTooHighUrls.some((w) => w.title === website.title) &&
                  (levelof &&  levelof !== 'Over 1M page views/mo')
                    ? 'bg-red-50'
                    : ''
                "
              >
                <td
                  class="py-2 border-b ltr:text-left rtl:text-right text-[16px] leading-[24px]  font-[400] 
                  text-darkGrey dark:text-whiteTamkin flex items-center justify-start 
                  rtl:space-x-reverse space-x-[33px]"
                >
                  <div class="w-[150px] flex items-center h-[46px]">
                    <div
                      class="flex items-center justify-between text-[14px] leading-[12px] text-[#18181B] 
                      font-[500] whitespace-nowrap"
                    >
                      <div>{{ $t(`${website.title}`)}}</div>
                      <span
                        v-if=" false && 
                          trafficTooHighUrls.some((w) => w.title === website.title) &&
                         (levelof &&  levelof !== 'Over 1M page views/mo')
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
           
                </td>
                <td
                  class="h- border-b ltr:text-left rtl:text-right text-[16px]
                 font-[400] text-darkGrey dark:text-whiteTamkin "
                >

                  {{
                     mysiteStore.currentPackage.type === "Accessibility"
                      ?              $t(
                        website.traffic <= 100000
                          ? "Small"
                          : website.traffic <= 1000000
                          ? "Medium"
                          : "Large"
                      )
                      : $t("Not applicable")
                  }}
                </td>

                <td
                  v-if=" mysiteStore.currentPackage.type === 'Accessibility' && mysiteStore.currentPackage.package_type === 'Package' "
                  class="h-[45px] border-b text-center text-[16px] leading-[24px] w-1/6 font-[400] text-darkGrey dark:text-whiteTamkin"
                >
                 

                  <div class="flex items-center justify-center">
                    <div v-if="!loadingPriceTraffic">
                   
                      ${{ mysiteStore.currentPackage.trial_days > 0 && selectedPackage === 0 ? "0" :
                      calculatePrice(website.url)
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
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
                v-if=" mysiteStore.currentPackage.type === 'Accessibility' && mysiteStore.currentPackage.package_type !== 'Package' "
                class="h-[45px] border-b text-center text-[16px] leading-[24px] w-1/6 font-[400] text-darkGrey dark:text-whiteTamkin"
              >
               

                <div class="flex items-center justify-center">
                  <div v-if="!loadingPriceTraffic">
                 
                    ${{
             
                      selectedPackage === 3 ? mysiteStore.currentPackage.package_price_role[0].cost_3_month : 
                      selectedPackage === 12 ?
                       mysiteStore.currentPackage.package_price_role[0].cost_year : mysiteStore.currentPackage.package_price_role[0].cost_month
                      
                                
                                          
                                    
                                  }}
                  </div>
            
       
                </div>
              </td>
                <td
                v-if=" mysiteStore.currentPackage.type === 'Sign language'  || mysiteStore.currentPackage.type === 'Live Translation'"
                class="h-[45px] border-b text-center text-[16px] leading-[24px] w-1/6 font-[400] text-darkGrey dark:text-whiteTamkin"
              >
               

                <div class="flex items-center justify-center">
                  <div v-if="!loadingPriceTraffic">
                 
                    ${{ mysiteStore.currentPackage.trial_days > 0 && selectedPackage === 0 ? "0" :
                    calculateEstimatedPrice
                      .toFixed(0)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
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
              </tr>
            
              <tr
                class="text-[16px]  leading-[24px] font-[600] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
              >
                <td
                  class="  border-b rtl:text-left ltr:text-right px-8 font-[500] dark:text-whiteTamkin"
                  colspan="2"
                >
                  {{ $t("Total") }}
                </td>
                <td
                  class="h-[45px]  border-b text-center font-[600] text-darkGrey dark:text-whiteTamkin"
                  v-if="mysiteStore.currentPackage.type === 'Accessibility' && mysiteStore.currentPackage.package_type === 'Package'&& !loadingPriceTraffic"
                >
              ${{
                mysiteStore.currentPackage.trial_days > 0 && selectedPackage === 0
                      ? "0" :
                      selectedPackage !==0 ? 
                      calculateTotalPrice()
                       .toString()
                       .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                       :0
                
              }}
                
                
                </td>
                <td
                class="h-[45px]  border-b text-center font-[600] text-darkGrey dark:text-whiteTamkin"
                v-if="mysiteStore.currentPackage.type === 'Accessibility' && mysiteStore.currentPackage.package_type !== 'Package'"
              >
            ${{
             
selectedPackage === 3 ? mysiteStore.currentPackage.package_price_role[0].cost_3_month : 
selectedPackage === 12 ?
 mysiteStore.currentPackage.package_price_role[0].cost_year : mysiteStore.currentPackage.package_price_role[0].cost_month

          
                    
              
            }}
              
              
              </td>
                <td
                class=" h-[45px] border-b text-center font-[600] text-darkGrey dark:text-whiteTamkin"
                v-if="mysiteStore.currentPackage.type !== 'Accessibility' "
              >
            ${{
              mysiteStore.currentPackage.trial_days > 0 && selectedPackage === 0
                    ? "0" :
                    selectedPackage !==0 ? 
                 (
                 
                 calculateEstimatedPrice.toFixed(0) * mysiteStore.urls.length
                   )
                     .toString()
                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                     :0
              
            }}
              
              
              </td>
                <td                   class="h-[45px] border-b text-center flex items-center justify-center font-[600] text-darkGrey dark:text-whiteTamkin"
                v-if="loadingPriceTraffic"> 
                  <svg
                 
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
                </td>
              
       
          
              </tr>
            </tbody>
          </table>
          <!-- {{ webs.length }} -->
          <div class="my-[26px] rtl:mr-auto ltr:ml-auto">
            <button
              class="btn-dashboard hover_tamkin"
              @click="conintuePay"
              :disabled="
                (mysiteStore.urls.length === 0) ||
                (trafficTooHighApps.length && false) ||
                (trafficTooHighUrls.length && false) ||
                websiteExist || loadingPriceTraffic
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
