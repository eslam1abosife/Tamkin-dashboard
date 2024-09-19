<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { helpers } from '@vuelidate/validators'
import Multiselect from 'vue-multiselect'
import {useGetAppInvites} from '@/composables/useTeam';
import {useCheckifSiteblocked,useGetTraffic} from '@/composables/usePackages';
const {locale}= useI18n()
const { getInviteApps, defaultApp, apps, loading: getSitesLoading } = useGetAppInvites();
const {checkifBlockedSite,messageStatus,codeStatus} = useCheckifSiteblocked()
const profileStore = useProfileStore()

const {getTraffic } = useGetTraffic()

const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
const listOfApps = computed(() => {
  // Check if category is 'Plugins' and the current type is 'Sign language'
  if (getCategory.value === 'Plugins' && packagesStore.currentType.title === 'Sign language') {
    return apps.value.filter(app => app.app_domain !== null);
  }

  // Check if category is not 'Plugins'
  if (getCategory.value && getCategory.value !== 'Plugins') {
    return apps.value.filter(app => app.app_domain === null);
  }

  // Check if the current type is not 'Sign language' and category is not set
  if (!getCategory.value && packagesStore.currentType.title !== 'Sign language') {
    return apps.value;
  }

  // Return an empty array by default if no condition is met
  return [];
});


const isDomain = helpers.withParams(
  { type: 'isDomain' },
  (value) => {
    return domainRegex.test(value);
  }
);
const state = reactive({
  newWebsite: "",
});
const rules = {
  newWebsite: { required, isDomain },
};
const webs = ref([])


const v$ = useVuelidate(rules, state);

const loadingAddWebsite =ref(false)
const selectedPackage = ref(3);
const selectPackage = (plan: any) => {
  selectedPackage.value = plan
}
const props = defineProps({
  showModal: Boolean
})


const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const currentWebsite = ref('')
const packagesStore = usePackgesStore()
const levelof = ref(packagesStore.traffic_level)

const websiteExist = ref(false)
const addWebsite =async () => {
  loadingAddWebsite.value = true
  if (!v$.value.$invalid) {
    const res = await checkifBlockedSite(state.newWebsite)
const traffic = await getTraffic(state.newWebsite,'url')

    if (apps.value.filter(ap=>ap.app_domain === state.newWebsite).length === 0 && codeStatus.value === 200 && res.length === 0 && packagesStore.urls.filter((website: any) => website.url === state.newWebsite).length === 0 ) {
 
      packagesStore.urls.push({
        title: state.newWebsite,
        url: state.newWebsite,
        traffic: traffic[0].traffic <= 100000 
    ? 'Small' 
    : traffic[0].traffic > 100000 && traffic[0].traffic <= 1000000
        ? 'Medium' 
        : 'Large'
    })


    } else {
      websiteExist.value = true
    }

    state.newWebsite = '';
    v$.value.$reset()
  loadingAddWebsite.value = false;

  }
};

// watch(levelof, (ov, nv) => {
//   // if(levelof.value === 'Up to 100K page views/mo' && ){

//   // }
// })
const trafficTooHighApps = ref([])
const trafficTooHighUrls = ref([])
const removeWebsite = (website: any) => {
  packagesStore.urls = packagesStore.urls.filter((item: any) => item.title !== website);

  trafficTooHighUrls.value = trafficTooHighUrls.value.filter((item: any) => item.title !== website);
};

const removeWebsiteFromSelectedApps = (website: any) => {
  webs.value = webs.value.filter((item: any) => item.title !== website);

  trafficTooHighApps.value = trafficTooHighApps.value.filter((item: any) => item.title !== website);
};



const calculateEstimatedPrice = computed(() => {
 if(packagesStore.currentType.title !== 'Accessibility'){
  return selectedPackage.value === 12 ? packagesStore.currentPackage.package_price_role[0].cost_yearly : selectedPackage.value === 3 ?
    packagesStore.currentPackage.package_price_role[0].cost_3_month : packagesStore.currentPackage.package_price_role[0].cost_month


 }
 if(packagesStore.currentType.title === 'Accessibility'){ 
  return selectedPackage.value === 12 ? packagesStore.currentPackage.cost_yearly : selectedPackage.value === 3 ?
    packagesStore.currentPackage.cost_3_month : packagesStore.currentPackage.cost_month


 }


  })
const conintuePay = ()=>{
  packagesStore.packagePayload = {
    package: packagesStore.currentPackage.name,
    urls:    packagesStore.urls.length ? packagesStore.urls
  .filter((website: any) => website.url !== null) : []
  .map((website: any) => website.url),
    apps: webs.value.length ? webs.value.map((website: any) => website.name):[],
    payDateType:selectedPackage.value,
    locale: locale.value,
    total: totalCost.value
  }
 return navigateTo('add_package_modal_packages', 'packages', 'payment_methods_packages')
}
onMounted(async ()=>{
  // await getInviteApps({agency: profileStore.company.name})


})
const totalCost = computed(() => {
  const urlCount = packagesStore.urls.length || 0;
  const webCount = webs.value.length || 0;
  const price = calculateEstimatedPrice.value || 0;
if(packagesStore.currentPackage.package_type === 'Package'){


  return price * (urlCount + webCount);
}else {
  return packagesStore.currentPackage.package_price_role[0].cost_month * (urlCount + webCount);

}
});

const getCategory = computed(() => {
  return packagesStore.categories.length ? packagesStore.categories.find((item: any) => item.name === packagesStore.currentPackage.category).title : null
})

const geteFilterInfo = (level: any) => {
  levelof.value = level.name;
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
  const packageg = packagesStore.packages.find(
    (pkg) =>
      pkg.name === id && // Filter by the package id
      pkg.type === packagesStore.currentType.name &&
      pkg.package_type === "Package" &&
      pkg.package_price_role.some(
        (item) => item.title === levelof.value
      )
  );

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
watch(() => levelof.value, () => {
  packagesStore.currentPackage = getPackageById(packagesStore.currentPackage.name);
  

})


watchEffect(() => {
  if (packagesStore.currentType.title === 'Accessibility') {
    // Determine the traffic limit based on the selected level
    const trafficLimit = levelof.value === 'Up to 100K page views/mo' 
      ? 100000 
      : levelof.value === 'Up to 1M page views/mo' 
        ? 1000000 
        : 0;

    // Find affected items in webs
    const newAffectedItems = webs.value?.filter((item: any) => item.traffic > trafficLimit);
    
    if (newAffectedItems && newAffectedItems.length > 0) {
      trafficTooHighApps.value = [
        ...trafficTooHighApps.value,
        ...newAffectedItems
      ];
    }

    // Find affected items in packagesStore.urls
    const newAffectedItemsInUrls = packagesStore.urls?.filter((item: any) => {
      const trafficValue = item.traffic === 'Small' 
        ? 100000 
        : item.traffic === 'Medium' 
          ? 1000000 
          : 10000000; // For 'Large'
      return trafficValue > trafficLimit;
    });

    if (newAffectedItemsInUrls && newAffectedItemsInUrls.length > 0) {
      trafficTooHighUrls.value = [
        ...trafficTooHighUrls.value,
        ...newAffectedItemsInUrls.map(item => ({
          title: item.title,
          url: item.url,
          traffic: item.traffic <= 100000 
            ? 'Small' 
            : item.traffic > 100000 && item.traffic <= 1000000
              ? 'Medium' 
              : 'Large'
        }))
      ];
    }
  }
});





</script>

<template>
  <div  class="mysite_bg_modal  dark:bg-p fixed z-[9999] !top-[-2px] 
  lg:inset-auto inset-0 rtl:lg:left-0 
    ltr:lg:right-0 rounded-[10px] lg:p-[30px] 
     lg:w-[600px] w-full h-screen overflow-y-auto lg:overflow-x-hidden">

    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn_payment !cursor-pointer z-[999]
   dark:bg-tamkinDarkPrimary dark:text-whiteTamkin" @click="closeModal('add_package_modal_packages')">
      <svg class="w-[12px] h-[12px]" width="14" height="13" viewBox="0 0 14 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor" />
      </svg>
    </div>
    <div class="w-full h-screen">

      <div class="flex flex-col items-start  justify-center w-full  lg:overflow-x-hidden">
        <h1
          class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin lg:px-0 px-[20px]  lg:mt-0 mt-[60px]">
          Upgrade Now
        </h1>
        <div 
      
        class="flex flex-col items-start justify-start lg:overflow-x-hidden 
        bg-white dark:bg-tamkinDarkPrimary w-full min-h-[70vh]
              px-[20px] rounded-[10px] mt-[33px] " style="box-shadow: 0px 4px 24px 8px #51459f14">

          <div v-if="packagesStore.currentPackage.package_type === 'Package'"
            class=" pt-[24px] flex items-center justify-center space-x-[18px]">
            <div>
              <img :src="`https://tamkin.app/${packagesStore.currentPackage.icon}`" class="w-[55px] h-[55px]" alt="">
            </div>
            <div class="font-[600] text-[18px] leading-[30px] text-black text-center">
              {{ packagesStore.currentPackage.title }} - {{ packagesStore.currentType.title }} {{ getCategory  ? '- '+ getCategory : ''}}
            </div>
          </div>
          <div
          v-if="packagesStore.currentPackage.package_type === 'Addons' || packagesStore.currentPackage.package_type === 'Extra'"
     class=" h-[61px] w-full border-b  mt-[28px] flex items-center justify-start space-x-[18px] bg-[#EFF5FF]">
       <div class="pl-[5px]">
           <img :src="`https://tamkin.app/${packagesStore.currentPackage.icon}`"   class="h-[45px] w-[45px] " alt="">
       </div>
       <div class="text-[16px] font-[600] leading-[24px]"> 
         {{ packagesStore.currentPackage.title }}
       </div>

       <div class="text-[15px] font-[400] leading-[26px] !ml-auto pr-[5px] text-[#1E1E1E]" v-if="packagesStore.currentPackage.package_type === 'Addons'">
          {{ packagesStore.currentType.title }} 
       </div>
       <div class="text-[15px] font-[400] leading-[26px] !ml-auto pr-[5px] text-[#1E1E1E]" v-if="packagesStore.currentPackage.package_type === 'Extra'">
        {{ packagesStore.currentPackage.sub_title }} 
     </div>
       </div>
          <div class="grid grid-cols-3 gap-4"    v-if="packagesStore.currentPackage.package_type === 'Addons' || packagesStore.currentPackage.package_type === 'Package'">


            <div
              class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5 pr-2.5 pb-2.5 rtl:pr-2 ltr:pl-2 h-[87px] !rounded-[10px] mt-[35px]"
              style="padding: 16px, 10px, 16px, 10px"
              :class="[selectedPackage === 1 ? 'custom-border-tamkin' : 'custom-border ']">

              <div class="flex items-center justify-center w-full ">
                <div class="order-2  w-full h-full">

                  <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">Monthly Plan</h1>
                  <h2 class="font-[500] text-[10px]"
                    v-if="packagesStore.currentPackage.package_price_role[0].discount_month !== 0">
                    <span
                      class="!text-[#021328] font-[700] dark:!text-whiteTamkin/80">{{ packagesStore.currentPackage.package_price_role[0].discount_month }}%
                    </span>
                    <span class="text-[#536174] dark:text-whiteTamkin/80">Discount on the monthly Plan</span>
                  </h2>
                </div>
                <div class="order-1 mx-[4px]">
                  <input id="month" type="radio" name="packages_radio" class="hidden" :checked="selectedPackage === 1"
                    @click.stop="selectPackage(1)" />
                  <label for="month" class="flex items-center cursor-pointer">
                    <span class="radio-tamkin"></span>
                  </label>
                </div>
              </div>
            </div>

            <div
              class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5 pr-2.5 pb-2.5 rtl:pr-2 ltr:pl-2 h-[87px] !rounded-[10px] mt-[35px]"
              style="padding: 16px, 10px, 16px, 10px"
              :class="[selectedPackage === 3 ? 'custom-border-tamkin' : 'custom-border ']">

              <div class="flex items-center justify-center w-full ">
                <div class="order-2  w-full h-full">
                  <div style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);" class="absolute text-[13px] leading-[17.76px] font-[400] w-[80px] rounded-[10px] 
                        h-[22px] flex items-center justify-center py-[4.5] 
                        px-[0.5px] top-[-10px] inset-x-auto text-white">
                    <span>Popular</span>
                  </div>
                  <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">3 Months Plan</h1>
                  <h2 class="font-[500] text-[10px]"
                    v-if="packagesStore.currentPackage.package_price_role[0].discount_3_month !== 0">
                    <span
                      class="!text-[#021328] font-[700] dark:!text-whiteTamkin/80">{{ packagesStore.currentPackage.package_price_role[0].discount_3_month }}%
                    </span>
                    <span class="text-[#536174] dark:text-whiteTamkin/80">Discount on the monthly Plan</span>
                  </h2>
                </div>
                <div class="order-1 mx-[4px]">
                  <input id="3month" type="radio" name="packages_radio" class="hidden" :checked="selectedPackage === 3"
                    @click.stop="selectPackage(3)" />
                  <label for="3month" class="flex items-center cursor-pointer">
                    <span class="radio-tamkin"></span>
                  </label>
                </div>
              </div>
            </div>
            <div
              class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5 pr-2.5 pb-2.5 rtl:pr-2 ltr:pl-2 h-[87px] !rounded-[10px] mt-[35px]"
              style="padding: 16px, 10px, 16px, 10px"
              :class="[selectedPackage === 12 ? 'custom-border-tamkin' : 'custom-border ']">

              <div class="flex items-center justify-center w-full ">
                <div class="order-2  w-full h-full">

                  <h1 class="font-[500] text-[12px] dark:text-whiteTamkin">Annual Plan</h1>
                  <h2 class="font-[500] text-[10px]"
                    v-if="packagesStore.currentPackage.package_price_role[0].discount_month !== 0">
                    <span
                      class="!text-[#021328] font-[700] dark:!text-whiteTamkin/80">{{ packagesStore.currentPackage.package_price_role[0].discount_month }}%
                    </span>
                    <span class="text-[#536174] dark:text-whiteTamkin/80">Discount on the monthly Plan</span>
                  </h2>
                </div>
                <div class="order-1 mx-[4px]">
                  <input id="annual" type="radio" name="packages_radio" class="hidden" :checked="selectedPackage === 12"
                    @click.stop="selectPackage(12)" />
                  <label for="annual" class="flex items-center cursor-pointer">
                    <span class="radio-tamkin"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>


          <multiselect 
    
          v-model="webs" :options="listOfApps" :multiple="true" :close-on-select="true"
            :clear-on-select="false" :preserve-search="true" placeholder="Choose sites" label="title" class="mt-[24px]"
            track-by="app_domain" :preselect-first="false">
            <template #selection="{ values, search, isOpen }">
              <span
                class="multiselect__single !font-[500] !text-darkGrey !text-[14px] absolute inset-y-[2px] left-[-5px]"
                v-if="values.length" v-show="!isOpen">{{ values.length }} {{ values.length > 1 ? 'Sites' : 'Site' }} selected</span>
      
            <img
            src="/assets/imgs/payment_methods/country_arrow.svg"
            :class="[isOpen ? 'rotate-90 ' : 'rtl:rotate-180']"

          
            class="absolute   w-[14px] h-[8px] inset-y-[15px] right-[19px]"
          />
              </template>
          </multiselect>

          <div v-if="(getCategory === 'Plugins' && packagesStore.currentType.title === 'Sign language') || packagesStore.currentType.title !== 'Sign language'"
            class="flex items-center lg:flex-row flex-col  justify-center  lg:justify-between w-full gap-4  mt-[24px]">
            <div class="w-full !relative ">
              <input type="text" placeholder="{{$t('web site')}}" id="newWebsite"
                class="input_floating_label peer  focus:outline-0 text-darkGrey w-full !h-[40px] "
                v-model="v$.newWebsite.$model" @input="()=>{
                  websiteExist = false
                }" :class="{
                  input_error:
                    (v$.newWebsite.$error && (v$.newWebsite.required.$invalid || v$.newWebsite.isDomain.$invalid)) || websiteExist === true,
                  error_text:
                    (v$.newWebsite.$error && (v$.newWebsite.required.$invalid || v$.newWebsite.isDomain.$invalid)) || websiteExist,
                  input_success:
                    !v$.newWebsite.$error && !v$.newWebsite.$invalid && !websiteExist
                }"
                 />
              <label for="newWebsite" class="floating_label" :class="[
                (v$.newWebsite.$error && v$.newWebsite.required.$invalid) ||
                  (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid) || websiteExist
                  ? '!text-error'
                  : '',
              ]">
                {{ $t("Add a Website") }}*
              </label>
              <div class="w-full lg:w-4/6 " v-if="
                (v$.newWebsite.$error && v$.newWebsite.required.$invalid) || (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid)
              ">
                <p class="error_message">
                  <span
                    v-if="(v$.newWebsite.$error && v$.newWebsite.required.$invalid) || (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid)">{{
                      $t("Website is not valid")
                    }}</span>

                </p>
              </div>
              <div class="w-full lg:w-4/6 " v-if="
                websiteExist
              ">
                <p class="error_message">
                  <span>{{
                    $t("This Website Cannot be added")
                  }}</span>

                </p>
              </div>
            </div>

            <div class="w-[240px]  lg:mt-0 mt-[16px]">
              <button @click="addWebsite" :disabled="v$.$invalid || loadingAddWebsite" 
              class="w-full btn-dashboard hover_tamkin  flex items-center justify-center 
                   ">
                   <div class="flex items-center justify-center">
                    <div :class="loadingAddWebsite ? 'rtl:ml-2 ltr:mr-2' : ''">
                      {{ $t("Add Website") }}
                    </div>

                    <svg v-if="loadingAddWebsite" class="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                      </circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                  </div>
              </button>
            </div>
          </div>

       <div class="w-full mt-[24px]" v-if="packagesStore.currentType.title === 'Accessibility' && packagesStore.currentPackage.package_type === 'Package'">
        <TranslateSelectInput
        @getCurrentSelectedItem="geteFilterInfo"
        :enableSearch="false"
        placeholderinput="Traffic level"
        :list="uniqueValues(packagesStore.getTraffiPrices('Package')).slice(0, 2)"
        nameKey="name"
        idField="id"
        
        :currentListValue="packagesStore.traffic_level"
      />
       </div>
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
                  class="py-2 px-[0px] border-b text-[16px] leading-[24px] text-[#A7A7A7] dark:text-whiteTamkin font-[500] ltr:text-left rtl:text-right">
                  Website
                </th>
                <th class="py-2  border-b text-[16px] leading-[24px] text-[#A7A7A7]
                     dark:text-whiteTamkin font-[500] text-left">
                  Tier
                </th>
                <th
                  class="py-2 border-b text-[16px] leading-[24px] text-[#A7A7A7] dark:text-whiteTamkin font-[500] rtl:text-left ltr:text-right">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(website, index) in packagesStore.urls" :key="index" :class="trafficTooHighUrls.some(w=>w.title  === website.title)? 'bg-red-50' :''"> 
            
                <td
                  class="py-2 border-b ltr:text-left rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin flex items-center justify-start rtl:space-x-reverse space-x-[33px]">
                  <div class="w-[150px] flex items-center h-[40px]">
                    <div
                    class="flex items-center justify-between text-[14px] leading-[12px]
                     text-[#18181B] font-[500] whitespace-nowrap"
                  >
         
                  <div>{{ website.title }}</div>
                    <span
                      v-if="trafficTooHighUrls.some(w=>w.title  === website.title)"
                      class="tooltip packages"
                      :data-tamkin="$t('The selected website exceeds the traffic limit of the chosen package.')"
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
                  <div class="cursor-pointer" @click="removeWebsite(website.title)">
                    <svg width="18" height="17" viewBox="0 0 18 17" class="text-[#D9D9D9] hover:text-[#E80902]"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                        fill="currentColor" />
                    </svg>
                  </div>
                </td>
                <td 
                  class="py-2 border-b ltr:text-left rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin">
                 {{ website.traffic }}
                </td>
                
                <td v-if="packagesStore.currentPackage.package_type === 'Package' "
                  class="py-2 border-b text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin">
                  ${{ calculateEstimatedPrice.toFixed(0)}}
                </td>
                <td v-if="packagesStore.currentPackage.package_type === 'Extra' || packagesStore.currentPackage.package_type === 'Addons'"
                class="py-2 border-b text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin">
                ${{ 
                
                  packagesStore.currentPackage.package_price_role.length ? packagesStore.currentPackage.package_price_role[0].cost_month.toFixed(0) :0
        
                
                
                }}
              </td>
              </tr>
              <tr v-for="(website, index) in webs" :key="index" :class="trafficTooHighApps.includes(website) ? 'bg-red-50' :''">
                <td
                  class="py-2 border-b ltr:text-left rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin flex items-center justify-start rtl:space-x-reverse space-x-[33px]">
                    <div class="w-[150px] flex items-center h-[40px]">
                      <div
                      class="flex items-center justify-between text-[14px] leading-[12px]
                       text-[#18181B] font-[500] whitespace-nowrap"
                    >
                    <div>{{ website.title }}</div>
                    <span
                    v-if="trafficTooHighApps.includes(website)"
                    class="tooltip packages"
                    :data-tamkin="$t('The selected website exceeds the traffic limit of the chosen package.')"
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
               
                  <div class="cursor-pointer" @click="removeWebsiteFromSelectedApps(website.title)">
                    <svg width="18" height="17" viewBox="0 0 18 17" class="text-[#D9D9D9] hover:text-[#E80902]"
                      fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                        fill="currentColor" />
                    </svg>
                  </div>
                </td>
                <td 
                  class="py-2 border-b ltr:text-left rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin">
                 {{ website.traffic <= 100000 
                  ? 'Small' 
                  : website.traffic > 100000 && website.traffic <= 1000000
                      ? 'Medium' 
                      : 'Large' }}
                </td>
                
                <td v-if="packagesStore.currentPackage.package_type === 'Package' "
                  class="py-2 border-b text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin">
                  ${{ calculateEstimatedPrice.toFixed(0) }}
                </td>
                <td v-if="packagesStore.currentPackage.package_type === 'Extra' || packagesStore.currentPackage.package_type === 'Addons'"
                class="py-2 border-b text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin">
               ${{ 
                
                packagesStore.currentPackage.package_price_role.length ? packagesStore.currentPackage.package_price_role[0].cost_month.toFixed(0) :0
      
              
              
              }}
              </td>
              </tr>
              <tr class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary">
                <td class="py-2 border-b  text-right font-[500] dark:text-whiteTamkin" colspan="2">
                  Total
                </td>
                <td class="py-2 border-b text-right font-[600] text-darkGrey dark:text-whiteTamkin" 
                v-if="packagesStore.currentPackage.package_type === 'Package' ">
                  ${{(calculateEstimatedPrice * webs.length + calculateEstimatedPrice * packagesStore.urls.length).toFixed(0)}}
                </td>
                <td class="py-2 border-b text-right font-[600] text-darkGrey dark:text-whiteTamkin"
                 v-if="packagesStore.currentPackage.package_type === 'Extra' || packagesStore.currentPackage.package_type === 'Addons'">
                 ${{
                  packagesStore.currentPackage.package_price_role[0].cost_month.toFixed(0) * webs.length + packagesStore.currentPackage.package_price_role[0].cost_month.toFixed(0) * packagesStore.urls.length
                }}
                
                </td>
              </tr>
            </tbody>
          </table>
<!-- {{ webs.length }} -->
          <div class="my-[26px] rtl:mr-auto ltr:ml-auto  " >
            <button class="btn-dashboard hover_tamkin" @click="conintuePay" 
            :disabled="packagesStore.urls.length === 0 && webs.length === 0 || trafficTooHighApps.length || trafficTooHighUrls.length">
              Continue to Payment
            </button>
          </div>
        </div>
      

      </div>


    </div>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


<style lang="scss" scoped>
:deep(.multiselect) {
  @apply relative;

  .multiselect__tags {
    @apply min-h-[40px] lg:text-[12px] rounded-[10px] rtl:lg:pr-[30px] ltr:lg:pl-[16px] 
    bg-white dark:bg-transparent border-lightGrey 
    md:w-full lg:w-full text-[13px] lg:text-[14px] 2xl:text-[14px] font-[500] ipad-max:max-w-full w-full border-[1px]
     focus:border-tamkin focus:ring-transparent focus:outline-none placeholder:text-transparent
      disabled:bg-gray-100 disabled:cursor-not-allowed;

    &.error_text {
      // @apply text-light; 
    }
  }

  .multiselect__placeholder {
    @apply cursor-text rounded-[10px] !mb-0 duration-100 ease-linear text-light
     peer-focus:text-darkGrey text-[13px] lg:text-[14px] 2xl:text-[14px]
      !font-[500] peer-focus:text-[12px] ipad-max:text-[10px] bg-transparent;
  }

  .multiselect__input {
    @apply h-auto;
  }

  .multiselect__input:focus {
    outline: none !important;
    @apply border-0 !ring-0 ring-transparent;
  }

  .multiselect__input::placeholder {
    @apply cursor-text rounded-[10px] duration-100 ease-linear text-light
     peer-focus:text-darkGrey text-[13px] lg:text-[14px] 2xl:text-[14px] font-[500] peer-focus:text-[12px] 
     ipad-max:text-[10px] ipad-max:peer-focus:text-[12px] bg-transparent
  }

  .multiselect__option--highlight {
    @apply bg-tamkinLight !text-darkGrey;
  }

  .multiselect__option--highlight::after {
    content: attr(data-select);
    @apply bg-tamkinLight text-darkGrey;
  }

  .multiselect__tag {
    @apply bg-tamkinLight text-darkGrey h-auto !rounded-[0px];
  }
}
</style>