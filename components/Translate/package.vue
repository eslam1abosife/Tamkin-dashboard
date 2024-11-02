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
const emit = defineEmits(["changePlan"]);
const translateStore = useTranslateStore()
const currentPlan = ref(props.type);

const changePlan = (data: string) => {
  currentPlan.value = data;
  emit("changePlan", data);
};

watch(
  () => props.type,
  (newType) => {
    currentPlan.value = newType;
  }
);
// scrollToSection('types')
const currentAPP = ref()
const scrollToSection = (sectionId) =>{
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
     return  translateStore.internalPackages.find(p=>p.package_category === 'Media') 
     }
    })

    const getMediaStats = computed(()=>{
      if(translateStore.statsPackage){
        return translateStore.statsPackage.total.media.package
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
  const { media } = translateStore.usedCredit;
  const { package: pkg, extre } = translateStore.statsPackage.total.media;

  if (media) {
    return (
      translateStore.usedCredit.media.video_words + extre.media_words === pkg.video_words && 
      translateStore.usedCredit.media.audio_words+ extre.media_words === pkg.aduio_words  &&
      translateStore.usedCredit.media.audio_minutes + extre.media_minutes === pkg.aduio_minutes && 
      translateStore.usedCredit.media.live_transaction_media + extre.media_minutes  === pkg.live_transaction_media && 
      translateStore.usedCredit.media.video_minutes+ extre.media_minutes  === pkg.video_minutes 
    );
  } else {
    return false;
  }
});

</script>

<template>
  <div class="w-full">
    <div
  v-if="getMediaPackage && !translateStore.loadingPackage "
    :class="[getMediaPackage.title === 'Free' ? 'bg-gradient-to-l from-[#A3D9C6A8] via-[#FAECCCA8] to-[#A5D6F2A8]':'bg-gradient-services']"
      class="w-full  rounded-[10px]
       flex flex-col items-start justify-between h-full p-[15px] relative"
    >

    <transition :name="locale === 'ar' ? 'slide-left' : 'slide-right'" mode="out-in">
      <MySiteBuyextra v-if="isOpen('buy_extra__service')"/>

    </transition>


  <transition
  :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
  mode="out-in"
>
  <MySitePaymentCryptoSuccess @update-data="refreshData"/>
</transition>

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


      
      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div>

    <div v-if=" translateStore.loadingPackage" class="w-full h-[190px] rounded-[10px] bg-gray-200 animate-pulse"></div>

    <!-- <div
      v-if="currentPlan === 'freetrial'"
      class="w-full bg-gradient-to-l from-[#A3D9C6A8] via-[#FAECCCA8] to-[#A5D6F2A8] rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/free_trial.png" alt="" />
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            Free Trial
          </div>
        </div>

        <div class="text-[12px] lg:text-[14px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
          Enjoy a 14-day free trial, where you can translate up to 50 words and 50 minutes
        </div>

        <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/words_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Words</span></div>
          </div>
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/min_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Minutes</span></div>

          </div>
        </div>

        <button @click="changePlan('freetrial_expired')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
          {{ $t('Upgrade now') }}
        </button>
      </div>

      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div>
    <div
    v-if="currentPlan === 'freetrial_expired'"
    class="w-full  rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
    style="background: linear-gradient(90deg, rgba(212, 177, 248, 0.66) 3%, rgba(161, 206, 203, 0.66) 26.17%, rgba(245, 201, 197, 0.66) 52.17%, rgba(113, 218, 210, 0.66) 78.17%, rgba(165, 214, 242, 0.66) 100%);"
  >
    <div class="flex flex-col items-start justify-between  h-[180px] w-full">
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/free_trial.png" alt="" />
        <div class="text-[20px] font-[600] text-[#3C3F49] leading-[30px]">
          Free Trial
        </div>
      </div>

      <div class="text-[15px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full ipad-max:w-full lg:w-3/4">
        Your free trial has expired. For more words and minutes,
      </div>

      <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img src="/assets/imgs/translatevideo/limited.svg" class="w-[20px] h-[20px]" alt="" />
          <div class="text-[14px] font-[500] text-[#3C3F49]">50 WORDS</div>
        </div>
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img src="/assets/imgs/translatevideo/limited.svg" class="w-[20px] h-[20px]" alt="" />
          <div class="text-[14px] font-[500] text-[#3C3F49]">50 Minutes</div>
        </div>
      </div>

      <button @click="changePlan('pro')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
        {{ $t('Upgrade Now') }}
      </button>
    </div>

    <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
      <div class="relative h-full">
        <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
        <div class="absolute bottom-0 right-0 mr-[15px]">
          <img src="/assets/imgs/translatevideo/star.svg" alt="" />
        </div>
      </div>
      <div class="absolute right-[160px] w-full">
        <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
      </div>
    </div>
  </div>
    <div
      v-if="currentPlan === 'pro'"
      class="w-full rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
      style="background: linear-gradient(90deg, rgba(212, 177, 248, 0.66) 3%, rgba(161, 206, 203, 0.66) 26.17%, rgba(245, 201, 197, 0.66) 52.17%, rgba(113, 218, 210, 0.66) 78.17%, rgba(165, 214, 242, 0.66) 100%);"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/pro.png" alt="" />
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            PRO- Package
          </div>
        </div>

        <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px] font-[400] text-[#021328] leading-[20px] lg:leading-[27px] 
        lg:flex-shrink ipad-max:w-3/4 w-full lg:w-3/4">
          Your available words and minutes have been used up. Please purchase a new package or add more words and minutes to continue using the service
        </div>

        <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/words_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Words</span></div>
          </div>
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/min_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Minutes</span></div>
          </div>
        </div>

        <button @click="changePlan('pro_out_credit')" class="btn-dashboard hover_tamkin mt-[8px] !w-[158px]">
          {{$t('Upgrade Now')}}
        </button>
      </div>

      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div>

  

    <div
      v-if="currentPlan === 'pro_out_credit'"
      class="w-full rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
      style="background: linear-gradient(90deg, rgba(212, 177, 248, 0.66) 3%, rgba(161, 206, 203, 0.66) 26.17%, rgba(245, 201, 197, 0.66) 52.17%, rgba(113, 218, 210, 0.66) 78.17%, rgba(165, 214, 242, 0.66) 100%);"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/pro.png" alt="" />
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            PRO- Package
          </div>
        </div>

        <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px]  font-[400] text-[#021328] leading-[20px] lg:leading-[27px] 
        lg:flex-shrink ipad-max:w-3/4 w-full lg:w-3/4">
          You are now on the Pro package. You can utilize the remaining words and minutes in your current plan. To access additional services, consider upgrading to a higher package.
        </div>

        <button @click="changePlan('pro_used')" class="btn-dashboard hover_tamkin w-[158px]">
          {{$t('Upgrade Now')}}
        </button>
      </div>

      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div>

    <div
      v-if="currentPlan === 'pro_used'"
      class="w-full rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
      style="background: linear-gradient(90deg, rgba(212, 177, 248, 0.66) 3%, rgba(161, 206, 203, 0.66) 26.17%, rgba(245, 201, 197, 0.66) 52.17%, rgba(113, 218, 210, 0.66) 78.17%, rgba(165, 214, 242, 0.66) 100%);"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/pro.png" alt="" />
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            PRO- Package
          </div>
        </div>

        <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px]  font-[400] text-[#021328] leading-[20px] lg:leading-[27px]
         lg:flex-shrink ipad-max:w-3/4 w-full lg:w-3/4">
          Your available words and minutes have been used up. Please purchase a new package or add more words and minutes to continue using the service
        </div>

        <div class="flex items-center rtl:space-x-reverse space-x-[10px] w-full mt-[8px]">
          <button @click="changePlan('pro')" class="btn_bordered_dashboard hover_tamkin !w-auto">
            {{ $t('Buy more words') }}
          </button>
          <button @click="changePlan('pro')" class="btn_bordered_dashboard hover_tamkin !p-2 !w-auto">
            {{ $t('Buy more Minutes') }}
          </button>
        </div>
      </div>

      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div> -->
  </div>
</template>


