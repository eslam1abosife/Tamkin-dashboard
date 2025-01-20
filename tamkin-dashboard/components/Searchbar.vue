<script lang="ts" setup>
import { useGetAppPackage } from "@/composables/useSearch";
import { useSearchWebsite } from "@/composables/useSearch";
import { useDebounceFn } from "@vueuse/core";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
import {
  useDeleteApp,
  useRestoreApp,
  useGetPackage,
} from "@/composables/useMySite";
const { getPackage, messageStatus, codeStatus } = useGetPackage();
const localePath = useLocalePath();
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const { getPackwebsite } = useGetAppPackage();
const { getAvatarLetters } = useGetAvatarLetters();
const { searchWebsite } = useSearchWebsite();
// const getPackageAndOpenPaymenModal = async (app, pack) => {
//   if (pack) {
//     await loadingBlock.value.push({ app: app, pack: pack });

//     if (
//       new Date(app.package.find((k) => k.name === pack).endpackage) <
//         new Date() ||
//       app.package.find((k) => k.name === pack).status === "Cancelled" ||
//       app.package.find((k) => k.name === pack).status === "Rejected" ||
//       app.package.find((k) => k.name === pack).title === "Free" ||
//       app.package.find((k) => k.name === pack).cancel_package
//     ) {
//       mysiteStore.updatePayment = true;

//       loadingBlock.value.push({ app: app, pack: pack });

//       mysiteStore.currentWebsite = app;
//       const packagemodal = await getPackage(
//         app.package.find((k) => k.name === pack).name
//       );

//       await mysiteStore.setCurrentPackage({
//         ...packagemodal.package,
//         package_price_role: packagemodal.price_roles,
//         billing_duration: app.package.find((k) => k.name === pack)
//           .billing_duration,
//           type: app.package.find((k) => k.name === pack).type,
//         status:
//         app.package.find((k) => k.name === pack).type !== 'Investors'&& new Date() >
//           new Date(app.package.find((k) => k.name === pack).endpackage)
//             ? "Expired"
//             : app.package.find((k) => k.name === pack).type === 'Investors' ? app.package.find((k) => k.name === pack).investor_status: app.package.find((k) => k.name === pack).status,
//       });

//       if(   app.package.find((k) => k.name === pack).type !== 'Investors'){
//         navigateTo(null, "mysite", "upgrade_mysite_package");
//       }else if (   app.package.find((k) => k.name === pack).type === 'Investors'){
//         openInvestor(app,app.package.find((k) => k.name === pack))
//       }
//       loadingBlock.value.splice({ app: app, pack: pack });
//     } else {
//       // if(app.title === 'Internal Service'){
//       //   mysiteStore.updatePayment = false
//       // }
//       // if(app.title !== 'Internal Service') {
//       mysiteStore.updatePayment = true;
//       // }
//       // alert(mysiteStore.updatePayment)

//       // console.log('here apps',app.package.find(k=>k.name === pack).name)
//       const packagemodal = await getPackage(
//         app.package.find((k) => k.name === pack).name
//       );

//       await mysiteStore.setCurrentPackage({
//         ...packagemodal.package,
//         package_price_role: packagemodal.price_roles,
//         billing_duration: app.package.find((k) => k.name === pack)
//           .billing_duration,
//       });

//       // mysiteStore.currentPackage = app.package ? :null
//       mysiteStore.currentWebsite = app;
//       mysiteStore.openedCurrentSite = true;
//       // mysiteStore.selectedApp = ""

//       navigateTo(null, "mysite", "add_package_modal_mysite");
//       loadingBlock.value.splice({ app: app, pack: pack });
//     }
//   } else {
//     loadingBlock.value.push({ app: app });
//     mysiteStore.updatePayment = false;
//     mysiteStore.currentType = "Sign language";

//     mysiteStore.currentWebsite = app;
//     navigateTo(null, "mysite", "upgrade_no_package");
//     loadingBlock.value.splice({ app: app });
//   }
// };

const isSearchfilled = ref(false);
const search = ref("");
const searchData = ref([]);
const loadingSearch = ref(false);
const noresult = ref(false);
const debouncedFn = useDebounceFn(
  async (query) => {
    if (query.length > 0) {
      loadingSearch.value = true; // Start loading when search begins
      const result = await searchWebsite(query);
      loadingSearch.value = false; // Stop loading after receiving results

      if (result.length === 0) {
        noresult.value = true;
      } else {
        noresult.value = false;
      }

      searchData.value = result;
    }
  },
  500,
  { maxWait: 5000 }
);

watch(search, (newValue, oldValue) => {
  searchData.value = [];
  noresult.value = false;
  isSearchfilled.value = newValue.length > 0;

  if (newValue.length > 0) {
    debouncedFn(newValue);
  } else {
    loadingSearch.value = false;
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * Clear the search input field and reset the search data to an empty array
     */
    /******  4af54f1b-89e4-41d3-864f-0093e87b66ea  *******/
  }
});

const clearInput = () => {
  search.value = "";
  searchData.value = [];
  noresult.value = false;
};

const mysiteStore = useMySiteStore();
</script>
<template>
  <div class="py-[17px] w-[100%] search_input relative">
    <input
      type="text"
      class="input_dashboard_search w-full h-[30px] md:h-[40px] pr-[14px] text-[10px]"
      @input="loadingSearch = true"
      v-model="search"
      :placeholder="`${$t('Search in Sites')} ...`"
    />
    <div
      class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
    >
      <img class="" src="/assets/imgs/icons/search.svg" />
    </div>
    <div
      v-if="isSearchfilled"
      @click="clearInput"
      class="absolute top-[40%] rtl:left-0 cursor-pointer ltr:right-0 lg:top-[16px] lg:p-[16px]"
    >
      <img src="/assets/imgs/icons/clear_search.svg" />
    </div>

    <div
      v-if="isSearchfilled"
      class="bg-white z-50 dark:bg-tamkinDarkPrimary dark:border-darkborder dark:text-whiteTamkin w-full max-h-[400px] h-auto overflow-y-auto absolute rounded-[10px] border-[1px] drop-shadow-xl top-16 flex flex-col items-start justify-start p-4"
    >
      <div v-if="!loadingSearch && searchData.length" class="w-full">
        <div
          v-for="site in searchData"
          :key="site.id"
          class="flex items-center divide-y justify-between p-3 rounded-[10px] cursor-pointer w-full hover:bg-gray-50 dark:hover:bg-darkTamkin"
        >
          <div
            class="flex items-center justify-start space-x-4 rtl:space-x-reverse w-full"
          >
            <div>
              <img
                src="/assets/imgs/icons/mysite_select.svg"
                class="w-[40px] h-[40px]"
                v-if="site?.title === 'Internal Service'"
              />
              <div
                v-else-if="!site?.favicon && site?.title !== 'Internal Service'"
                class="w-[40px] h-[40px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"
              >
                {{ site?.title ? getAvatarLetters(site?.title) : "" }}
              </div>
              <img
                v-if="site.favicon && site?.title !== 'Internal Service'"
                :src="site.favicon"
                class="w-[40px] h-[40px] rounded-full ipad-max:hidden lg:block hidden"
              />
            </div>
            <div class="text-[14px] font-[500] leading-[24px]">
              {{ site.app_domain }}
            </div>

            <button
              @click="
                () => {
                  $router.push({
                    path: localePath('/my-site'),
                    query: { ping: site.name },
                  });
                  isSearchfilled = false;
                  loadingSearch = false;
                  searchData = [];
                  clearInput();
                }
              "
              class="rtl:!mr-auto ltr:!ml-auto btn-dashboard hover_tamkin w-[110px] !border-tamkin"
            >
              {{ $t("Manage") }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="noresult" class="w-full">
        <div class="text-center text-[14px] font-[500] leading-[24px]">
          {{ $t("No Result") }}
        </div>
      </div>

      <div v-if="loadingSearch" class="w-full">
        <svg
          class="animate-spin mx-auto my-[10px] h-5 w-5 text-tamkin"
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
    </div>
  </div>
</template>
