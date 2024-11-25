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
     return  translateStore.internalPackages.find(p=>p.package_category === 'Images') 
     }
    })

    const getMediaStats = computed(()=>{
      if(translateStore.statsPackage){
        return translateStore.statsPackage.total.images.package
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
  const { images } = translateStore.usedCredit || {};
  const { package: pkg, extre } = translateStore.statsPackage.total?.images || {};

    return images.images_words ===  pkg.images_words + extre.images_words ;

});


</script>

<template>
  <div class="w-full">
    <div v-if="getMediaPackage && !translateStore.loadingPackage"
      class="w-full rtl:bg-gradient-to-r ltr:bg-gradient-to-l from-[#3B68A4] via-[#9CB2D3] to-[#ECEEF9] rounded-[10px] flex flex-col items-start justify-center p-[15px] relative"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full relative">
        <div class="absolute -bottom-4 rtl:left-[300px] ltr:right-[300px]  flex justify-center items-center">
          <div
            class="h-[100px] ipad-max:w-[100px] ipad-max:h-[50px] w-[200px] bg-white opacity-20 rounded-tl-full rounded-tr-full"
          ></div>
        </div>
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img
            class="w-[40px] h-[40px]"
            :src="fullUrl(getMediaPackage.icon)"
            alt=""
          />
          <div
            class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]"
          >
           {{getMediaPackage.title}}
          </div>
        </div>

        <div
          class="text-[12px] lg:text-[14px] ipad-max:text-[12px] ipad-max:w-2/4 font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4"
        >
         {{ getMediaPackage.sub_title }}
        </div>

        <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
          <div class="flex items-center">
            <img
              src="/assets/imgs/translatedocs/words.svg"
              class="w-[40px] h-[40px] object-cover object-center block m-0 p-0"
              alt=""
            />
            <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">
              {{getMediaStats.images_words}} <span class="font-[500]">{{$t('Words')}}</span>
            </div>
          </div>
          <!-- <div class="flex items-center">
            <img
              src="/assets/imgs/translatedocs/chars.svg"
              class="w-[40px] h-[40px] object-cover object-center block m-0 p-0"
              alt=""
            />
            <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">
              50 <span class="font-[500]">{{$t('Characters')}}</span>
            </div>
          </div> -->
        </div>
        <div class="flex items-center justify-center rtl:space-x-reverse space-x-[20px]" v-if="!userconsume">
          <button v-if="getMediaPackage.title !== 'Free'"
           :disabled="  loadingBlock.find(
            (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name
          ) || getMediaPackage.status === 'Pending'"
          @click="getPackageAndOpenPaymenModal(currentAPP,getMediaPackage)" class="btn-dashboard hover_tamkin mt-[8px] w-auto">
            {{ $t(getMediaPackage.endpackage && new Date() > new Date(getMediaPackage.endpackage)  ? 'Renew Plan' : 'Upgrade Plan') }}
      
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
          <!-- <button 
           :disabled="  loadingextra.find(
            (entry) => entry.pack === getMediaPackage.name && entry.app === currentAPP.name && entry.id === 1
          )"
          @click="openBuyMoreExtra(currentAPP,getMediaPackage,1)" class="btn-dashboard hover_tamkin mt-[8px] w-auto">
      
                      {{ $t('Buy more Characters') }}
      
      
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
          </button> -->
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

      <div class="lg:flex hidden absolute ltr:-right-[24px] rtl:-left-[24px] top-[16px] h-full ">
        <div class="relative h-full z-[10]">
          <img src="/assets/imgs/translatephotos/hero.png" class="w-[340px] h-[221px]  rtl:scale-x-[-1]" />
        </div>
        <div
        class="absolute rtl:left-[10px]  ltr:right-[10px]  bg-[#F2F7FF]  z-[1] bottom-2 w-[100px] h-[80px]"
      >

      </div>
        <div
          class="absolute lg:right-[400px] ipad-max:right-[200px] top-16 bottom-0 w-full"
        >
          <img
            src="/assets/imgs/translatephotos/vector.png"
            class="w-[134px] h-[124px] opacity-20"
            alt=""
          />
        </div>
      </div>
    </div>
 
  </div>

  <div v-if=" translateStore.loadingPackage" class="w-full h-[190px] rounded-[10px] bg-gray-200 animate-pulse"></div>

</template>
