<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useModalManager } from '@/composables/useModalManager';
import { Vue3Lottie } from 'vue3-lottie';
import upgradeAnimation from '/assets/animation/upgrade.json';
import {useGetPackages,useGetStats} from '@/composables/useInternal'
const {getPackages} = useGetPackages()
const {getStats} = useGetStats()
import {
  useDeleteApp,
  useRestoreApp,
  useGetPackage,
} from "@/composables/useMySite";
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const { getPackage, messageStatus, codeStatus } = useGetPackage();
const translateStore = useTranslateStore()
const mysiteStore = useMySiteStore();

const { loadingBlock } = storeToRefs(mysiteStore);

const loadingUpgrade = ref([]);

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

  navigateTo('upgradeTranslatePackage', "internalMediaservices", "add_package_modal_mysite");
  loadingBlock.value.splice({ app: app.name, pack: pack.name });
};

const getMediaPackage = computed(()=>{
    if(translateStore.internalPackages.length){
     return  translateStore.internalPackages.find(p=>p.package_category === props.typeofPackage) 
     }
    })

    const refreshData = async () => {
  translateStore.loadingPackage = true

  const result = await getPackages()
      const result2 = await getStats()
      if(result){
        translateStore.currentApp = result
translateStore.internalPackages = result.package

translateStore.statsPackage = result2

      }

      translateStore.loadingPackage = false

};
    onMounted(async ()=>{
     await refreshData()
    })

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

  navigateTo('upgradeTranslatePackage', "internalMediaservices", "upgrade_mysite_package");
  loadingUpgrade.value.splice({ app: app.name, pack: pack.package_name });
};
const props = defineProps({
  header: String,
  text:String,
  typeofPackage:String
});
</script>

<template>
  <div v-if="isOpen('upgradeTranslatePackage')"
    class="fixed z-[9999] top-1/4 bg-selected dark:bg-p rounded-[10px] p-[30px] lg:w-[640px] w-10/12"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('upgradeTranslatePackage')">
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
    <h1 class="rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]">
        {{header ? $t(header) : $t('Upgrade to upload more videos') }}
    </h1>


    <div class="flex items-center justify-center py-[10px]">
        <Vue3Lottie :animationData="upgradeAnimation" :height="100" :width="120" :noMargin="true" class="mx-auto"
    />
    </div>
    

    <div class="text-[16px] font-[500]  text-darkGrey leading-[30px]">
       {{ text? $t(text) : $t(' Sorry, you do not have enough words and minutes available to translate .Please upgrade to continue the translation process without interruption') }}
    </div>

    <div class="w-[190px] mx-auto">
      <button class="btn-dashboard hover_tamkin mt-[40px]  " 
      :disabled="  loadingUpgrade.find(
        (entry) => entry.pack === getMediaPackage.name && entry.app === translateStore.currentApp.name
      ) || getMediaPackage.status === 'Pending'"
      v-if="getMediaPackage.title !== 'Free'" 
      
      @click="getPackageAndOpenPaymenModal(  translateStore.currentApp,getMediaPackage)">
        {{ $t('Upgrade Now') }}
        <svg
        v-if="
        loadingUpgrade.find(
            (entry) => entry.pack === getMediaPackage.name && entry.app === translateStore.currentApp.name 
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
      <button class="btn-dashboard hover_tamkin mt-[40px]  "
      :disabled="  loadingUpgrade.find(
        (entry) => entry.pack === getMediaPackage.name && entry.app === translateStore.currentApp.name
      ) || getMediaPackage.status === 'Pending'"
      v-if="getMediaPackage.title === 'Free'" @click="upgradeModalPackage(  translateStore.currentApp,getMediaPackage)">
        {{ $t('Upgrade Now') }}

        <svg
        v-if="
        loadingUpgrade.find(
            (entry) => entry.pack === getMediaPackage.name && entry.app === translateStore.currentApp.name 
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
</template>

<style lang="scss">

</style>
