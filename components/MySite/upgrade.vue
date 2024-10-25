<script lang="ts" setup>
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";

const { getAvatarLetters } = useGetAvatarLetters();

const formatToUrl = (domain) => {
  // Check if the domain starts with "http://" or "https://"
  if (!/^https?:\/\//i.test(domain)) {
    // If not, prepend "https://"
    domain = "https://" + domain;
  }
  return domain;
};
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const packagesStore = usePackgesStore()
const closeModalPackage = () => {
  closeModal("upgrade_mysite_package");
};
const runtimeConfig = useRuntimeConfig()
const mySiteStore = useMySiteStore()
const loadingPacks = ref(true)
onBeforeMount(async ()=>{

  await packagesStore.getDataPackage()
  loadingPacks.value = false
})
const switchBetweenMonthlyAndAnnual = (v: any) => {
  packagesStore.discountType = v;
};
</script>

<template>
  <div
    class="mysite_bg_modal dark:bg-p fixed  !top-[-2px] 
    lg:inset-auto inset-0 rtl:lg:left-0 ltr:lg:right-0 rounded-[10px] 
    lg:p-[30px] w-[1000px] h-screen overflow-y-auto lg:overflow-x-hidden"
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
        <div
        class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
      >
        <img
          src="/assets/imgs/icons/mysite_select.svg"
          class="w-[40px] h-[40px]"
          v-if="mySiteStore.currentWebsite?.title === 'Internal Service' "
        />

        <div
          v-if="
            
            !mySiteStore.currentWebsite?.favicon &&
            mySiteStore.currentWebsite?.title !== 'Internal Service'
          "
          class="w-[40px] h-[40px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"
        >
          {{ mySiteStore.currentWebsite?.title ? getAvatarLetters(mySiteStore.currentWebsite?.title) : "" }}
        </div>
        <div
          v-if="
            
            mySiteStore.currentWebsite?.favicon &&
            mySiteStore.currentWebsite?.title !== 'Internal Service'
          "
        >
          <img
            v-if="mySiteStore.currentWebsite.favicon"
            :src="mySiteStore.currentWebsite.favicon"
            class="w-[40px] h-[40px] rounded-full ipad-max:hidden lg:block hidden"
          />
        </div>
        <div class="flex items-center rtl:space-x-reverse space-x-[16px]">
          <!-- <h2 class="font-[600] text-[16px] leading-[24px] text-[#C5C5C5]">Select Site</h2> -->
          <div>
            <h2
              class="font-[500] text-[14px] leading-[14px] dark:text-whiteTamkin text-darkGrey underline"
            >
              {{ mySiteStore.currentWebsite?.app_domain || $t(`${mySiteStore.currentWebsite?.title}`) }}
            </h2>
          </div>
          <div>
            <a
              :class="[
                mySiteStore.currentWebsite?.title === 'Internal Service'
                  ? '!text-darkGrey/40 cursor-not-allowed'
                  : '',
              ]"
              :href="
              mySiteStore.currentWebsite?.title === 'Internal Service'
                  ? '#'
                  : mySiteStore.currentWebsite
                  ? formatToUrl(mySiteStore.currentWebsite.app_domain)
                  : ''
              "
              :target="mySiteStore.currentWebsite?.title === 'Internal Service' ? '' : '_blank'"
              class="text-tamkin font-[500] text-[14px] leading-[24px] flex"
              >{{ $t("Visit Site") }}
              <svg
                data-slot="icon"
                class="size-6 ltr:ml-[14px] rtl:mr-[14px]"
                fill="none"
                stroke-width="1.5"
                :class="[
                  mySiteStore.currentWebsite?.title === 'Internal Service'
                    ? '!text-darkGrey/40 cursor-not-allowed'
                    : '!text-tamkinStart',
                ]"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                ></path></svg
            ></a>
          </div>
        </div>
      </div>
        </h1>
    
   <div  v-if="!loadingPacks"
        class="mt-[24px] w-full bg-white relative dark:bg-tamkinDarkPrimary rounded-[10px] h-full shadow-md -shadow-y-[1px]"
        
      >
      
    <div  v-if="mySiteStore.currentPackage.type !== 'Investors'"
    class="flex items-center justify-between rounded-full bg-tamkinLight h-[42px]  w-auto
    dark:bg-transparent dark:border-darkGrey absolute rtl:left-[20px] ltr:right-[20px] top-[235px] p-[4px] border border-gray-300"
  >
    <button
      @click="switchBetweenMonthlyAndAnnual('month')"
      :class="[
        packagesStore.discountType === 'month'
          ? 'bg-white dark:bg-light rounded-full'
          : '',
      ]"
      class="w-auto px-3 transition-all h-[32px] 
      flex items-center justify-center ease-in-out text-darkGrey dark:text-whiteTamkin font-[500] text-[12px] leading-[22.5px]"
    >
      {{ $t('Monthly') }}
    </button>
    <button
      @click="switchBetweenMonthlyAndAnnual('year')"
      :class="[
        packagesStore.discountType === 'year'
          ? 'bg-white dark:bg-light rounded-full'
          : '',
      ]"
      class="w-auto px-3 transition-all h-[32px] flex items-center justify-center ease-in-out
       text-darkGrey rtl:space-x-reverse space-x-1 dark:text-whiteTamkin font-[500] text-[12px] leading-[22.5px] "
    >
      <div>{{$t('Annual')}}</div>
      <div class="flex items-center justify-center rtl:space-x-reverse space-x-[4px]" >
        <div  class="text-black font-[800] !text-[10px]">{{ $t('SAVE')}}</div>
      <div class="text-black font-[800] !text-[10px]">
        {{
          packagesStore.types.length ?  packagesStore.types.find(type => type.title === mySiteStore.currentPackage.type).discount_yearly :''
        }}%</div
      >
      </div>
    </button>
  </div>
        <div
          class="flex items-center justify-start rounded-[10px] h-[212px] w-full
           rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#35b4a9] to-tamkinEnd lg:to-[#c8fdf9]"
        >
          <div class="flex flex-col items-start justify-center w-full px-[15px]">
            <div>
              <h1 class="text-white font-[500] text-[18px] leading-[30px]">
               {{ $t('Your Current Plan') }} 
              </h1>
              <h3 class="text-white font-[500] text-[13px] leading-[21px]">
                {{ $t('Your current plan provides comprehensive features tailored to meet your needs.') }}
              </h3>
            </div>
            <div
              class="h-[55px]  px-[20px] bg-white dark:bg-tamkinDarkPrimary bg-opacity-75 rounded-[41px] space-x-[42px]
              flex items-center justify-between  w-auto  rtl:space-x-reverse p-2 mt-[24px]  "
            >
              <div class=" flex items-center justify-start rtl:space-x-reverse space-x-[8px] ">
                <div>
               <img  
               :src="runtimeConfig.public.baseImagerUrl + (mySiteStore.currentPackage ? mySiteStore.currentPackage.icon : '/')" 
                class="lg:w-[30px] lg:h-[30px]  " />
                </div>
                <div class="text-[10px]   lg:text-[14px] font-[500]
                ipad-max:text-[12px]
    ipad-max:leading-[10px] whitespace-nowrap
                lg:leading-[22.5px] text-darkGrey dark:text-whiteTamkin">
      {{$t(mySiteStore.currentPackage.title)}}  {{mySiteStore.currentPackage.title === 'Free' ? ' - ' +$t(`${mySiteStore.currentPackage.category}` ):'' }} - {{ mySiteStore.currentPackage.type !== null ? $t(mySiteStore.currentPackage.type) : $t('Internal Service') }} 
    
            </div>
              </div>
              
              <div
              v-if="mySiteStore.currentPackage.status === 'Expired'"
            
              class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px]  flex items-center justify-center 
                    h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
            >
              {{ $t(`Expired`) }}
            </div>
              
            <div
            v-if="mySiteStore.currentPackage.status === 'Active'"
          
            class="bg-gradient-to-r from-tamkinStart to-tamkinEnd rounded-[17px]  flex items-center justify-center 
                  h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
          >
            {{ $t(`Active`) }}
          </div>
            <div
            v-if="mySiteStore.currentWebsite.status  === 'Rejected' || mySiteStore.currentPackage.status === 'Rejected' || mySiteStore.currentPackage.status === 'Cancelled'"
          
            class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px]  flex items-center justify-center 
                  h-[25px]  w-[100px] text-white text-[12px] leading-[18px]"
          >
            {{ $t(`Rejected`) }}
          </div>
              <div
              v-if="mySiteStore.currentPackage.status === 'Pending'"
            
              class="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[17px]  flex items-center justify-center 
                    h-[25px] max-w-[150px] w-3/4 text-white text-[12px] leading-[18px]"
            >
              {{ mySiteStore.currentPackage.status === 'Pending'? $t('Under Review') : $t(`${mySiteStore.currentPackage.status}`) }}
            </div>
    
       
            </div>
          </div>
    
          <div class="rtl:mr-auto rtl:scale-x-[-1]  ltr:ml-auto h-full w-full lg:block hidden">
            <img 
              src="/assets/imgs/overview/current_plan_upgrade.svg"
              class="w-full h-full rtl:rounded-tr-[10px] ltr:rounded-tr-[10px]"
              
            />
          </div>
        </div>
    
      <MySitePricing v-if="!loadingPacks" />
       
      </div> 

      <div    class="w-full mt-[24px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full shadow-md -shadow-y-[1px]" 
      v-if="loadingPacks" >
    
        <div class="flex items-center justify-start rounded-[10px] h-[212px] w-full animate-pulse bg-gray-300">
          <div class="flex flex-col items-start justify-center w-full px-[15px]">
            <div>
              <!-- Title Placeholder -->
              <div class="h-[30px] w-3/4 bg-gray-400 rounded-md mb-2"></div>
              <!-- Subtitle Placeholder -->
              <div class="h-[21px] w-2/3 bg-gray-400 rounded-md"></div>
            </div>
        
            <!-- Placeholder for the Plan Information -->
            <div
              class="h-[55px] px-[20px] bg-gray-400 rounded-[41px] space-x-[42px] flex items-center justify-between w-auto p-2 mt-[24px]"
            >
              <div class="flex items-center justify-start rtl:space-x-reverse space-x-[4px]">
                <!-- Icon Placeholder -->
                <div class="h-[22px] w-[22px] lg:h-[10px] lg:w-[10px] bg-gray-500 rounded-full"></div>
                <!-- Text Placeholder -->
                <div class="h-[22px] w-[150px] bg-gray-400 rounded-md"></div>
              </div>
        
              <!-- Status Placeholder -->
              <div class="h-[25px] lg:w-[88px] bg-gray-500 rounded-[17px]"></div>
            </div>
          </div>
        
       
        </div>
      
        <div  class="flex flex-col items-center justify-center w-full mt-[42px] px-[20px] pb-[24px] animate-pulse">
          <div class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly h-full w-full 
          gap-2  mt-[32px]">
            <!-- Placeholder for each package item -->
            <div v-for="n in 3" :key="n" class="flex items-center flex-col border-[1px] mx-auto justify-start bg-white 
            rounded-t-[10px] relative mt-[35px] w-full ">
              <div class="bg-gray-300 w-[50px] h-[50px] rounded-full absolute top-[-30px] rtl:right-[15px] ltr:left-[15px]"></div>
        
              <div class="flex items-center justify-center w-full px-[15px] mt-[48px]">
                <div class="w-full">
                  <div class="bg-gray-300 h-[30px] rounded mb-[8px]"></div>
                  <div class="bg-gray-300 h-[20px] w-[150px] rounded mb-[16px]"></div>
                  <div class="bg-gray-300 h-[29px] w-[100px] rounded"></div>
                  <div class="bg-gray-200 h-[16px] w-[120px] mt-[10px] rounded"></div>
                  <div class="bg-gray-200 h-[16px] w-[80px] mt-[10px] rounded"></div>
                </div>
              </div>
        
              <div class="flex flex-col items-start justify-center w-full space-y-[10px] p-4">
                <div class="bg-gray-300 h-[20px] w-[200px] rounded"></div>
                <div class="bg-gray-300 h-[20px] w-[150px] rounded"></div>
                <div class="bg-gray-300 h-[20px] w-[100px] rounded"></div>
                <div class="bg-gray-200 w-full h-[40px] rounded-[19px] mt-[20px]"></div>
              </div>
            </div>
          </div>
        </div>
        </div>
      <OverviewWidgetEmbdedCode v-if=" mySiteStore.currentWebsite?.title !== 'Internal Service'" class="!mt-[30px] !w-full"/>
    

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
