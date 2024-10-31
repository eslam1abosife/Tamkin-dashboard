<script lang="ts" setup>
import {useGetPackages,useGetStats} from '@/composables/useInternal'
import { useFullUrl } from "@/composables/useSharedFunctions";
import {
  useDeleteApp,
  useRestoreApp,
  useGetPackage,
} from "@/composables/useMySite";
const {locale} = useI18n()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const { fullUrl } = useFullUrl();

const {getPackages} = useGetPackages()
const {getStats} = useGetStats()
const props = defineProps({
  type: {
    type: String,
  },
});
const translateStore = useTranslateStore()
const emit = defineEmits(["changePlan"]);

const currentPlan = ref(props.type);

const changePlan = (data: string) => {
  currentPlan.value = data;
  emit("changePlan", data);
};
const currentAPP = ref()
// Watch for changes in the prop to update the local state
watch(
  () => props.type,
  (newType) => {
    currentPlan.value = newType;
  }
);
onBeforeMount(async ()=>{
      translateStore.loadingPackage = true

      const result = await getPackages()
      const result2 = await getStats()
      if(result){
        currentAPP.value = result
translateStore.internalPackages = result.package
translateStore.statsPackage = result2
      }

      translateStore.loadingPackage = false

    })

    const getMediaPackage = computed(()=>{
    if(translateStore.internalPackages.length){
     return  translateStore.internalPackages.find(p=>p.package_category === 'Documents') 
     }
    })

    const getMediaStats = computed(()=>{
      if(translateStore.statsPackage){
        return translateStore.statsPackage.total.documents.package
      }
    })

const { getPackage, messageStatus, codeStatus } = useGetPackage();

const mysiteStore = useMySiteStore();
const { loadingBlock } = storeToRefs(mysiteStore);
const loadingUpgrade = ref([]);

const upgradeModalPackage = async (app, pack) => {
  await loadingUpgrade.value.push({ app: app.name, pack: pack.name });

  mysiteStore.updatePayment = true;

  const packagemodal = await getPackage(pack.name);
  mysiteStore.currentWebsite = {
    ...app,
    package: [packagemodal.package],
  };
  await mysiteStore.setCurrentPackage({
    ...packagemodal.package,
    package_price_role: packagemodal.price_roles,
    billing_duration:
      pack.month_difference > 0
        ? Number(pack.month_difference) === 3
          ? "3 months"
          : Number(pack.month_difference) === 12
          ? "yearly"
          : Number(pack.month_difference) === 1
          ? "monthly"
          : "none"
        : "none",
    status: new Date() > new Date(pack.to_date) ? "Expired" : pack.status,
  });

  navigateTo(null, "internalMediaservices", "upgrade_mysite_package");
  loadingUpgrade.value.splice({ app: app.name, pack: pack.package_name });
};
const loadingPlaceholder =ref(false)
const refreshData = async () => {
  translateStore.loadingPackage = true

  loadingPlaceholder.value = true
  const result = await getPackages()
      const result2 = await getStats()
      if(result){
        translateStore.currentApp = result
translateStore.internalPackages = result.package

translateStore.statsPackage = result2
loadingPlaceholder.value = false

      }

      translateStore.loadingPackage = false

};
const loadingextra = ref([])
const openBuyMoreExtra = async (app,pack,id)=>{
  await loadingextra.value.push({ app: app.name, pack: pack.name,id:id });

  const packagemodal = await getPackage(pack.name);
  mysiteStore.currentWebsite = {
    ...app,
    package: [packagemodal.package],
  };

   navigateTo(null, "internalMediaservices", "buy_extra__service");
   loadingextra.value.splice({ app: app.name, pack: pack.name,id:id });

}
const getPackageAndOpenPaymenModal = async (app, pack) => {
  await loadingBlock.value.push({ app: app.name, pack: pack.name });

  mysiteStore.updatePayment = true;

  const packagemodal = await getPackage(pack.name);
  mysiteStore.currentWebsite = {
    ...app,
    package: [packagemodal.package],
  };

  await mysiteStore.setCurrentPackage({
    ...packagemodal.package,
    package_price_role: packagemodal.price_roles,
    billing_duration:
      pack.month_difference > 0
        ? Number(pack.month_difference) === 3 && pack.remarks !== 'Free Trial'
          ? "3 months"
          : Number(pack.month_difference) === 12&& pack.remarks !== 'Free Trial'
          ? "yearly"
          : Number(pack.month_difference) === 1&& pack.remarks !== 'Free Trial'
          ? "monthly"
          : "none"
        : "none",
    status: new Date() > new Date(pack.to_date) ? "Expired" : pack.status,
  });

  navigateTo(null, "internalMediaservices", "add_package_modal_mysite");
  loadingBlock.value.splice({ app: app.name, pack: pack.name });
};

const userconsume = computed(() => {
  const { documents } = translateStore.usedCredit;
  const { package: pkg, extre } = translateStore.statsPackage.total.documents;

  if (documents) {
    return (

      translateStore.usedCredit.documents.docs_words + extre.documents_words === pkg.docs_words && 
      translateStore.usedCredit.documents.pdf_words + extre.documents_words === pkg.pdf_words
 
    );
  } else {
    return false;
  }
});

</script>

<template>
  <div class="w-full">
    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MySiteBuyextra v-if="isOpen('buy_extra__service')"/>

    </transition>


  <transition
  :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
  mode="out-in"
>
  <MySitePaymentCryptoSuccess @update-data="refreshData"/>
</transition>

    <div
    v-if="getMediaPackage && !translateStore.loadingPackage "

      class="w-full bg-gradient-to-bl from-[#B0E2E9] via-[#FCDEDE] to-[#B1E3EA] rounded-[10px] 
      flex flex-col items-start justify-between h-full p-[15px] relative"
    >
    <div class="flex flex-col items-start justify-between h-[160px] w-full">
    <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
      <img class="w-[40px] h-[40px]" :src="fullUrl(getMediaPackage.icon)" alt="" />
      <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px] flex items-center justify-start space-x-[20px]">
       <div>
        {{ $t(getMediaPackage.title) }} - {{ $t(getMediaPackage.type) }} - {{ $t(getMediaPackage.package_category) }}
       </div>
        <div
        class=" mx-auto text-center text-darkGrey dark:text-whiteTamkin"
      >
      
        <div
          v-if="new Date() < new Date(getMediaPackage.endpackage) && getMediaPackage.status === 'Active' || getMediaPackage.status === 'draft'  "
          class="bg-gradient-to-r from-tamkinStart to-tamkinEnd rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
        >
          {{ $t(`Active`) }}
        </div>

        <div
          v-if="new Date() > new Date(getMediaPackage.endpackage)"
          class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
        >
          {{ $t(`Expired`) }}
        </div>
        <div
          v-if="
          getMediaPackage.status === 'Pending' || getMediaPackage.status === 'Pendding'
          "
          class="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[17px] flex items-center justify-center h-[25px] w-[100px] text-white text-[12px] leading-[18px]"
        >
          {{
            getMediaPackage.status === "Pending" || getMediaPackage.status === "Pendding"
              ? $t("Under Review")
              : $t(`${getMediaPackage.status}`)
          }}
        </div>
        <div
          v-if="getMediaPackage.status === 'Rejected'"
          class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] w-[100px] text-white text-[12px] leading-[18px]"
        >
          {{ $t(`${getMediaPackage.status}`) }}
        </div>
      </div>
      </div>
    </div>
    <div class="text-[14px] lg:text-[14px] font-[500] text-[#3C3F49] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
      {{$t(getMediaPackage.sub_title)}}
     </div>
 
    <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <img src="/assets/imgs/translatevideo/words_icon.png" class="w-[25px] h-[25px]" alt="" />
        <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">WORDS</span></div>
      </div>
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <img src="/assets/imgs/translatevideo/min_icon.png" class="w-[25px] h-[25px]" alt="" />
        <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">Minutes</span></div>
      </div>
    </div>

  <div class="flex items-center justify-center space-x-[20px]" v-if="!userconsume">
    <button v-if="getMediaPackage.title !== 'Free'"
     :disabled="  loadingBlock.find(
      (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name
    ) || getMediaPackage.status === 'Pending'"
    @click="getPackageAndOpenPaymenModal(currentAPP,getMediaPackage)" class="btn-dashboard hover_tamkin mt-[8px] w-auto">
      {{ $t(getMediaPackage.endpackage && new Date() > new Date(getMediaPackage.endpackage)  ? 'Renew Plan' : 'Upgrade plan') }}

      <svg
      v-if="
        loadingBlock.find(
          (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name
        )
      "
      class="animate-spin mx-1 h-5 w-5 text-white"
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
    </button>
    <button
    :disabled="  loadingUpgrade.find(
      (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name
    ) || getMediaPackage.status === 'Pending'"
    @click="upgradeModalPackage(currentAPP,getMediaPackage)" 
    class="btn-dashboard hover_tamkin mt-[8px] w-auto">
      {{ $t('Upgrade Package') }}

      <svg
      v-if="
      loadingUpgrade.find(
          (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name
        )
      "
      class="animate-spin mx-1 h-5 w-5 text-white"
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
    </button>
  </div>

  <div class="flex items-center justify-center space-x-[20px]" v-else-if="userconsume">
    <button 
     :disabled="  loadingextra.find(
      (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name && entry.id === 1
    )"
    @click="openBuyMoreExtra(currentAPP,getMediaPackage,1)" class="btn-dashboard hover_tamkin mt-[8px] w-auto">

                {{ $t('Buy more Minutes') }}


      <svg
      v-if="
      loadingextra.find(
          (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name && entry.id === 1
        )
      "
      class="animate-spin mx-1 h-5 w-5 text-white"
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
    </button>
    <button
    :disabled="  loadingextra.find(
      (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name && entry.id === 2
    )"
    @click="openBuyMoreExtra(currentAPP,getMediaPackage,2)" 
    class="btn-dashboard hover_tamkin mt-[8px] w-auto">
      {{ $t('Buy more words') }}

      <svg
      v-if="
      loadingextra.find(
          (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name && entry.id === 2
        )
      "
      class="animate-spin mx-1 h-5 w-5 text-white"
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
    </button>
  </div>
</div>

    <div class="lg:flex hidden absolute rtl:left-0 ltr:right-[0] top-[-6px] h-full ">

     
         <div class="relative h-full z-[10]">
          
        <img src="/assets/imgs/translatedocs/hero.svg"               class="w-[304px] h-[220px]"
         alt="" />
   
      </div>
      <div class="absolute lg:right-[350px] ipad-max:right-[250px] ipad-max:top-32 bottom-4 w-full">
        <img src="/assets/imgs/translatedocs/welcome.svg" class="w-full  h-full" alt="" />
      </div>
    </div>
    </div>
    <div v-if=" translateStore.loadingPackage" class="w-full h-[190px] rounded-[10px] bg-gray-200 animate-pulse"></div>



 
  <div
    v-if="currentPlan === 'pro_used'"
    class="w-full bg-gradient-to-bl from-[#B0E2E9] via-[#FCDEDE] to-[#B1E3EA] rounded-[10px] 
    flex flex-col items-start justify-between h-full p-[15px] relative"
  >
  <div class="flex flex-col items-start justify-between h-[180px] w-full">
    <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
      <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/pro.png" alt="" />
      <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
        PRO- Package 
      </div>
    </div>

    <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px] ipad-max:w-2/4 font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
      Your available words and character have been used up. Please purchase a new package or add more words and character to continue using the service      </div>

    
    
      <div class="flex items-center rtl:space-x-reverse space-x-[10px] w-full mt-[8px]">
        <button
        @click="changePlan('freetrial')"
        class="btn_bordered_dashboard hover_tamkin  lg:!w-auto"
      >
      {{ $t('Buy more words') }}
      </button>
      <button
      @click="changePlan('pro_pack')"
      class="btn_bordered_dashboard hover_tamkin  !p-2 lg:!w-auto "
    >
    {{ $t('Buy more characters') }}
    </button>
      </div>
  </div>

  <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-[6px]  h-full">
    <div class="relative h-full">
      <img src="/assets/imgs/translatedocs/hero.svg"                    class="w-[250px] h-[200px]"
       alt="" />
 
    </div>
    <div class="absolute lg:right-[350px] ipad-max:right-[250px] ipad-max:top-32 bottom-4 w-full">
      <img src="/assets/imgs/translatedocs/welcome.svg" class="w-full  h-full" alt="" />
    </div>
  </div>
  </div>

  </div>
</template>
