<script lang="ts" setup>
import { useModalManager } from "@/composables/useModalManager";
import Vue3TagsInput from "vue3-tags-input";
// import "vue3-carousel/dist/carousel.css";
import { useGetAppInvites, useUpdateDefaultApp } from "@/composables/useTeam";
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
const { locale,t } = useI18n();

const { getInviteApps, defaultApp, apps, loading: getSitesLoading } = useGetAppInvites();
const addSiterStore = useAddSiteStore()
const {tags,validatedSites,loadingBlock} = storeToRefs(addSiterStore)
useHead({
  title: t("Add Site - Tamkin Dashboard"),

})
const tag = ref('')
const cleanWebsiteUrl = (url: string) => {
  // Remove the protocol (http, https) and www if present
  const cleanedUrl = url.replace(/^(https?:\/\/)?(www\.)?/, "");
  // Remove any path or query parameters by splitting at the first "/"
  return cleanedUrl.split("/")[0];
};

// import {
//   Carousel,
//   Slide,
//   Pagination,
//   Navigation,
// } from "vue3-carousel/dist/carousel.es.js";

import {
  useCheckifSiteblocked,
  useGetTraffic,
  useGetPriceByTraffic,
} from "@/composables/usePackages";
const { getTraffic } = useGetTraffic();
const loadingPage = ref(true)
const { checkifBlockedSite, messageStatus, codeStatus } = useCheckifSiteblocked();

definePageMeta({
  layout: "dashboard",
  middleware: ['auth', 'permissions'],
  requiredPermission: "add-site",
}); 

const addSiteStore = useAddSiteStore()
const breakpoints = {
  // 700px and up
  300: {
    itemsToShow: 1.3,
    snapAlign: 'left',
  },
  700: {
    itemsToShow: 1.5,
    snapAlign: 'center',
  },
  // 1024 and up
  1024: {
    itemsToShow: 3,
   
    snapAlign: 'center',
  }
}

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const loadingModal = ref(false)
const collapsed = ref(false);
const customValidate = (value) => {
  const regex = new RegExp(
    /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/ // Full URL validation
  );
  return regex.test(value);
};

let previousTagCount = 0;

const handleChangeTag = (tags: any) => {
  // Update the tags value with normalized domain names
  tags.value = tags;

  if (tags.length > previousTagCount) {
    // New tag added, handle the new tag
    const newTag = tags[tags.length - 1]; // Access the last tag
    const alreadyValidated = validatedSites.value.some(site => site.domain === newTag);
    if (!alreadyValidated) {
      checkifSiteBlockedOrNot(newTag);
    }
  } else if (tags.length < previousTagCount) {
    // A tag was removed, find the tag that is missing
    const removedTags = validatedSites.value.filter(
      site => !tags.includes(site.domain) // Compare current tags with validatedSites
    );
    // Remove the site that corresponds to the removed tag
    if (removedTags.length > 0) {
      validatedSites.value = validatedSites.value.filter(
        site => site.domain !== removedTags[0].domain
      );
    }
  }

  // Update the previous tag count for future comparisons
  previousTagCount = tags.length;
};



const selectedPlan = ref("");
const selectPlan = (plan: any) => {
  selectedPlan.value = plan;
};
const route = useRoute()
const router = useRouter()
const checkPaymentStatus = async () => {
  if (route.query && route.query.paid && route.query.locale) {
    if (route.query.locale === "ar") {
      await router.push({
        name: route.name,
        query: { paid: route.query.paid, locale: "ar" },
      });

      await nextTick();
      openModal("success_pay_addsite");
    } else {
      openModal("success_pay_addsite");
    }
  }
};
const runconfig = useRuntimeConfig()
onMounted(async () => {
  // addSiteStore.currentPackage = ''

  await addSiteStore.getPackages()
  checkPaymentStatus()
  selectedPlan.value = addSiteStore.packages.sort((a, b) => a.sort - b.sort)[0]
  loadingPage.value = false


  const user = JSON.parse(localStorage.getItem("user"));
  const sites = await getInviteApps({ agency: user.agency });

  validatedSites.value = []
  loadingBlock.value = []
})
const {$toast} = useNuxtApp()
const checkifSiteBlockedOrNot = async (site) => {
  // Start loading for the site
  loadingBlock.value.push(site);

  // Clean the site URL
  const cleanUrl = cleanWebsiteUrl(site);

  // Check if the site exists in apps.value by matching with app_domain
  const siteInApps = apps.value.some(app => app.app_domain === cleanUrl);
  
  if (siteInApps) {
    $toast('One of the websites is already included in your list of sites.',{hideIn:3000,type:'warning'})

    // If site exists in apps, mark it as not blocked and push to validatedSites
    validatedSites.value.push({ domain: cleanUrl, blocked: false, title: cleanUrl, exists: true });
  } else {
    // Check if the site is blocked
    const siteCheck = await checkifBlockedSite(site);
    if (siteCheck.length === 0) {
      validatedSites.value.push({ domain: cleanUrl, blocked: false, title: cleanUrl, exists: false });
    } else {
      validatedSites.value.push({ domain: cleanUrl, blocked: true, title: cleanUrl, exists: false });
    }
  }

  // Stop loading for the site
  loadingBlock.value.pop(site);
};

const addSitesAndOpenModal = async () => {
  loadingModal.value = true;

  try {
    await addSiteStore.setCurrentPackage(selectedPlan.value);

    const trafficPromises = validatedSites.value
      .filter(site => !site.blocked && !site.exists)
      .map(async (site) => {
      
        const traffic = selectedPlan.value.type === 'Accessibility' ? await getTraffic(site.domain, "url") : null; 
        return {
          url: cleanWebsiteUrl(site.domain),
          title: cleanWebsiteUrl(site.domain),
          traffic:  selectedPlan.value.type === 'Accessibility' ? determineTrafficLevel(traffic[0].traffic) : null,
        };
      });

    addSiteStore.urls = await Promise.all(trafficPromises);

    // Check if the current package is valid before navigating
    if (addSiteStore.currentPackage && addSiteStore.currentPackage.name) {
      navigateTo(null, 'addsite', 'add_package_modal_addsite');
    }
  } catch (error) {
    console.error("Error adding sites or opening modal:", error);
  } finally {
    loadingModal.value = false; 
  }
};


// Helper function to determine traffic level
const determineTrafficLevel = (traffic) => {
  if (traffic <= 100000) {
    return "Small";
  } else if (traffic <= 1000000) {
    return "Medium";
  } else {
    return "Large";
  }
};


const changeUrlTag = (obj) => {
  return true
}
const siteg = (name)=>{

      return validatedSites.value.find(g => g.domain === cleanWebsiteUrl(name));

}

const sortedPlans = computed(() => {
      const desiredType = 'Sign language';

      const specificTypePackages = addSiteStore.packages.filter(
        (pkg) => pkg.type === desiredType
      ).slice(0, 3);

      const otherPackages =addSiteStore.packages.filter(
        (pkg) => pkg.type !== desiredType
      ).slice(0, 3); 

      return [...specificTypePackages, ...otherPackages];
    })
</script>

<template>
  <div class=" w-full" v-if="!loadingPage">

    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <!-- Modal for adding a package -->
      <AddsitePaymentPackage v-if="isOpen('add_package_modal_addsite')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <AddsitePaymentPaymentmethods v-if="isOpen('payment_methods_addsite')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <AddsitePaymentCard v-if="isOpen('cardModal_addsite')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <AddsitePaymentSuccess v-if="isOpen('success_pay_addsite')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <ProfileBillingModalsAddnewCard v-if="isOpen('add_new_card_billing')" />
    </transition>

    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <AddsitePaymentCryptoStep1 v-if="isOpen('crypto_addsite_step1')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <AddsitePaymentCryptoStep2 v-if="isOpen('crypto_addsite_step2')" />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <AddsitePaymentCryptoSuccess />
    </transition>
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <AddsitePaymentPaypal />
    </transition>
    <div class="space-y-[10px]">
      <h1 class="rtl:text-right ltr:text-left text-[18px] leading-[36px] font-[600] dark:text-whiteTamkin">
        {{ $t('Add Site') }}
      </h1>

      <h2
        class="rtl:text-right ltr:text-left text-[14px] font-[400] leading-[22.5px] text-darkGrey dark:text-whiteTamkin">
        {{ $t('Enhance your site to improve accessibility and meet compliance standards') }}
      </h2>
    </div>

    <div class="mt-[18px] flex items-center justify-between mt-[32px]">
      <div>
        <h2 class="text-[14px] lg:text-[16px] font-[600] leading-[30px] text-[#151515] dark:text-whiteTamkin">
          {{ $t('Select Your package') }}
        </h2>
      </div>
      <div class="cursor-pointer flex items-center rtl:space-x-reverse space-x-[10px]" @click="collapsed = !collapsed">
        <div  > 
          <h2 class="underline text-[14px] font-[400] leading-[24px] text-[#151515] dark:text-whiteTamkin">
            {{ $t('What’s included?') }}
          </h2>
        </div>
        <div class="cursor-pointer" @click="collapsed = !collapsed">
          <img src="/assets/imgs/arrow-right.svg" class="w-[12px] h-[10px] rtl:rotate-180"
            :class="[collapsed ? '!rotate-90 ' : 'rotate-0']" />
        </div>
      </div>
    </div>
    <ClientOnly>
      <Splide   :options="{ rewind: false,perPage: 3,  gap: 10,arrows:false ,direction:`${locale === 'ar' ? 'rtl' : 'ltr'}`      }">
        <SplideSlide  v-for="(plan, i) in sortedPlans" :key="i" >
        <div class="flex flex-col items-start justify-center " >
          <div class=" flex items-center custom-border  justify-start rtl:space-x-reverse 
          relative py-[62px] w-full h-[149px] !rounded-[10px] mt-[35px]"
          :class="[
              selectedPlan && selectedPlan === plan
                ? 'bg-selected dark:bg-p '
                : 'bg-whiteTamkin dark:bg-tamkinDarkPrimary',
            ]">
            <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
              <img :src="runconfig.public.baseImagerUrl + plan.icon" class="w-[50px] h-[50px]" />
            </div>
            <div v-if="plan.type_deal !== 'None'" class="absolute   flex items-center justify-center text-[13px] leading-[17.76px]  font-[500] w-[83px]
            h-[28px] rounded-[10px] text-white dark:text-darkTamkin top-[-15px]
           rtl:right-2/4 ltr:left-2/4" style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
  ">
              <div class=" ">
                {{ $t(plan.type_deal) }}
              </div>

            </div>
            <div class="flex items-center justify-start relative w-full rtl:px-5 px-6">
              <div class="order-2 mt-[22px] relative w-full">
                <h1
                  class="font-[500] text-[18px] rtl:text-right ltr:text-left leading-[30px] dark:text-whiteTamkin
                   ipad-max:text-[14px] ipad-max:leading-[16px]">
                  {{ $t(plan.title) }} - <span class="!font-[300] !text-[16px]">{{ $t(plan.type) }}</span>
                </h1>
                <h2
                  class="font-[400] rtl:text-right ltr:text-left text-[14px] 
                  leading-[21.86px] text-[#536174] w-3/4 dark:text-whiteTamkin/80 ipad-max:text-[12px] ipad-max:leading-[16px]">
                  {{ $t(plan.sub_title) }}
                </h2>
              </div>
              <div class="order-1 ltr:pr-2 rtl:pl-2">
                <input :id="'plan_' + plan.name" type="radio" name="plans_radio" class="hidden"
                  @click.stop="selectPlan(plan)" :value="plan.name" :checked="selectedPlan === plan" />
                <label :for="'plan_' + plan.name" class="flex items-center cursor-pointer">
                  <span class="radio-tamkin"></span>
                </label>
              </div>
            </div>

          

          </div>
          <div v-if="collapsed" class="flex flex-col items-start justify-center space-y-[12px]  mt-[-10px]
          z-[200] h-auto w-full custom-border-collapse rounded-t-none rounded-[10px] p-4"
            :class="[selectedPlan && selectedPlan === plan ? 'bg-selected dark:bg-p' : 'bg-whiteTamkin dark:bg-tamkinDarkPrimary']">
            <div v-for="pf in plan.package_items.sort((a, b) => a.idx - b.idx)" :key="pf.name"
              class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" v-if="pf.is_available" />
                <img src="/assets/imgs/checked_list_inactive.svg" v-else />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  {{ $t(pf.title) }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        </SplideSlide>

      </Splide>

      <div id="custom-pagination" class="custom-pagination"></div>
      <!-- <carousel  class="!p-0" :dir="locale === 'ar' ? 'rtl' : 'ltr'" :wrap-around="false"  :breakpoints="breakpoints"
       :itemsToScroll="3"  >

        <Slide v-for="(plan, i) in addSiteStore.packages.sort((a, b) => a.sort - b.sort)" :key="i" >
          <div class=" flex items-center custom-border  justify-center rtl:space-x-reverse 
          relative py-[62px]  h-[149px] !rounded-[10px] mt-[35px]"
          :class="[
              selectedPlan && selectedPlan === plan
                ? 'bg-selected dark:bg-p '
                : 'bg-whiteTamkin dark:bg-tamkinDarkPrimary',
            ]">
            <div class="absolute bottom-[119px] rtl:right-[24px] ltr:left-[24px]">
              <img :src="runconfig.public.baseImagerUrl + plan.icon" class="w-[50px] h-[50px]" />
            </div>
            <div v-if="plan.type_deal !== 'None'" class="absolute   flex items-center justify-center text-[13px] leading-[17.76px]  font-[500] w-[83px]
            h-[28px] rounded-[10px] text-white dark:text-darkTamkin top-[-15px]
           rtl:right-2/4 ltr:left-2/4" style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
  ">
              <div class=" ">
                {{ $t(plan.type_deal) }}
              </div>

            </div>
            <div class="flex items-center justify-start relative w-full">
              <div class="order-2 mt-[22px] relative w-full">
                <h1
                  class="font-[500] text-[18px] rtl:text-right ltr:text-left leading-[30px] dark:text-whiteTamkin ipad-max:text-[14px] ipad-max:leading-[16px]">
                  {{ $t(plan.title) }} - <span class="!font-[300] !text-[16px]">{{ $t(plan.type) }}</span>
                </h1>
                <h2
                  class="font-[400] rtl:text-right ltr:text-left text-[14px] 
                  leading-[21.86px] text-[#536174] w-3/4 dark:text-whiteTamkin/80 ipad-max:text-[12px] ipad-max:leading-[16px]">
                  {{ $t(plan.sub_title) }}
                </h2>
              </div>
              <div class="order-1 mx-[15px] ipad-max:mx-2">
                <input :id="'plan_' + plan.name" type="radio" name="plans_radio" class="hidden"
                  @click.stop="selectPlan(plan)" :value="plan.name" :checked="selectedPlan === plan" />
                <label :for="'plan_' + plan.name" class="flex items-center cursor-pointer">
                  <span class="radio-tamkin"></span>
                </label>
              </div>
            </div>

            <div v-if="collapsed" class="flex flex-col items-start justify-center space-y-[12px]  !space-x-0
             top-[90%]  absolute z-[200] h-auto w-full custom-border-collapse rounded-t-none rounded-[10px] mt-2 p-4"
              :class="[selectedPlan && selectedPlan === plan ? 'bg-selected dark:bg-p' : 'bg-whiteTamkin dark:bg-tamkinDarkPrimary']">
              <div v-for="pf in plan.package_items.sort((a, b) => a.idx - b.idx)" :key="pf.name"
                class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
                <div>
                  <img src="/assets/imgs/checked_list_active.svg" v-if="pf.is_available" />
                  <img src="/assets/imgs/checked_list_inactive.svg" v-else />
                </div>
                <div>
                  <h3 class="text-[14px] font-[400] leading-[20px]">
                    {{ $t(pf.title) }}
                  </h3>
                </div>
              </div>
            </div>

          </div>
        </Slide>

        <template #addons>
          <Pagination :class="[collapsed ? '!mt-[250px]' : 'mt-64']" />
   
        </template>
      </carousel> -->
    </ClientOnly>



    <div class="flex items-center justify-center lg:justify-start w-full"
    :class="[collapsed ? '!mt-12' : 'mt-12']">
      <h1 class="font-[500] text-[16px] leading-[30px] dark:text-whiteTamkin">
        {{ $t('Enter Website URLS') }}
      </h1>
    </div>
    <Client-only>
      <vue3-tags-input :tags="tags"
        class="mt-[16px] w-full h-[164px] border-[1px] !rounded-[10px] border-[#C5C5C5] dark:border-darkborder dark:bg-tamkinDarkPrimary bg-white focus:outline-none focus:ring-1 dark:text-whiteTamkin focus:ring-[#C5C5C5]"
        :validate="customValidate" :placeholder="$t('Add new website')" @on-tags-changed="handleChangeTag">
        <template #item="{ name, index }">
          <div class="flex items-center justify-center p-[6px] rtl:space-x-reverse space-x-[13px]">
            <div>
              {{ cleanWebsiteUrl(name) }}
            </div>
            <svg v-if="loadingBlock.includes(cleanWebsiteUrl(name)) || !siteg(name)" class="animate-spin  h-3 w-3 text-tamkin"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
            <img src="/assets/imgs/tick.svg"
            v-if="!loadingBlock.includes(cleanWebsiteUrl(name)) && siteg(name) && !siteg(name).blocked && !siteg(name).exists" />
      
          <svg xmlns="http://www.w3.org/2000/svg"
            v-if="!loadingBlock.includes(cleanWebsiteUrl(name)) && siteg(name) && siteg(name).blocked && !siteg(name).exists"
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="size-4 text-tamkingErrorInput">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
      
          <svg
            v-if="!loadingBlock.includes(cleanWebsiteUrl(name)) && siteg(name) && siteg(name).exists"
            data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="size-4 text-yellow-600">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z">
            </path>
          </svg>
          </div>
        </template>
      </vue3-tags-input>
    </Client-only>
    <!-- 
 <div class="mt-[16px] w-full h-[164px]  bg-transparent focus:outline-none focus:ring-0 
    focus:ring-transparent" v-if="collapsed"></div> -->
    <!-- {{   }} -->
    <div class="">
      <button :disabled="!selectedPlan || loadingModal || validatedSites.length === 0 || 
      (validatedSites.every((site) => site.exists === true || site.blocked === true))"
        class="btn-dashboard hover_tamkin my-[16px] rtl:mr-auto ltr:ml-auto w-auto " @click="addSitesAndOpenModal">
        <div class="flex items-center justify-center">
          <div :class="loadingModal ? 'rtl:ml-2 ltr:mr-2' : ''">
            {{ $t('Add Sites and Continue') }}


          </div>

          <svg v-if="loadingModal" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
        </div>
      </button>
    </div>
  </div>
  <div class="overflow-x-hidden animate-pulse" v-else>
    <div class="space-y-[10px]">
      <div class="w-[150px] h-[30px] bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div class="w-[300px] h-[20px] bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>

    <div class="mt-[32px] flex items-center justify-between">
      <div class="w-[200px] h-[24px] bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div class="flex items-center space-x-[10px] rtl:space-x-reverse">
        <div class="w-[100px] h-[24px] bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div class="w-[12px] h-[12px] bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>

    <!-- Simulating the carousel content -->
    <div class="mt-[35px] flex space-x-[16px] rtl:space-x-reverse overflow-hidden">

      <!-- Add more placeholder divs to simulate multiple package cards -->
      <div class="relative w-11/12 py-[62px] h-[149px] bg-gray-300 dark:bg-gray-700 rounded-[10px]" v-for="(f, i) in 2"
        :key="i">

        <div class="mt-[22px]">
          <div class="w-[75%] h-[16px] bg-gray-300 dark:bg-gray-700 mt-[10px] rounded"></div>
        </div>
      </div>
    </div>

    <div class="mt-[36px] flex items-center justify-center lg:justify-start">
      <div class="w-[200px] h-[24px] bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>

    <div class="mt-[16px] w-full h-[164px] bg-gray-300 dark:bg-gray-700 rounded-[10px]"></div>

    <div class="flex items-center justify-center lg:justify-start w-full mt-[36px]">
      <div class="w-[220px] h-[48px] bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
</template>

<style>
.carousel{
  @apply !justify-between !w-full;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(60px);
}
.carousel__slide{
@apply !justify-start;
}
.carousel__track {
  @apply !grid grid-cols-3;
}

.carousel__viewport {
  @apply !overflow-visible relative;
}

.slide-fade-leave-active {
  display: none;
}

.carousel__pagination-button::after {
  @apply w-[15px] h-[15px] rounded-full cursor-pointer bg-[#D9D9D9] rtl:flex-row-reverse;

}

.carousel__pagination-button--active::after {
  @apply bg-tamkin;
}

.carousel__pagination-button--active::after:hover {
  @apply !bg-tamkin;
}

.carousel__pagination-button::after:hover {
  @apply !bg-[#D9D9D9];
}

.carousel__pagination-button:hover::after {
  @apply bg-current;
}
.splide__pagination{
  @apply !bottom-[-20px];
}
.splide__pagination__page.is-active{
@apply !bg-tamkin;
}

</style>
