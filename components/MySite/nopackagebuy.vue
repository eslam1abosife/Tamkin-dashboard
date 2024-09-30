<script lang="ts" setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
const {locale} = useI18n()
const addSiterStore = useAddSiteStore()
const selectedPlan = ref("");
const collapsed = ref(false);
const loadingDataModal = ref(true)
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
  closeModal("upgrade_no_package");
};
const runtimeConfig = useRuntimeConfig()
const mySiteStore = useMySiteStore()
const loadingPacks = ref(true)
onMounted(async ()=>{
  await addSiterStore.getPackages()
  loadingDataModal.value = false
  // selectedPlan.value = addSiterStore.packages.sort((a, b) => a.sort - b.sort)[0]
})
const sortedPlans = computed(() => {
      const desiredType = 'Sign language';

      const specificTypePackages = addSiterStore.packages.filter(
        (pkg) => pkg.type === desiredType
      ).slice(0, 3);

      const otherPackages =addSiterStore.packages.filter(
        (pkg) => pkg.type !== desiredType
      ).slice(0, 3); 

      return [...specificTypePackages, ...otherPackages];
    })
    const runconfig = useRuntimeConfig()
    const selectPlan = async (plan: any) => {
  selectedPlan.value = plan;
  await mySiteStore.setCurrentPackage(plan)

// mysiteStore.currentPackage = app.package ? :null
//   mySiteStore.currentWebsite = app
//   mySiteStore.openedCurrentSite = true

return   navigateTo('upgrade_no_package', "mysite", "add_package_modal_mysite");
};
</script>

<template>
  <div
    class="mysite_bg_modal dark:bg-p fixed z-[9999] !top-[-2px] 
    lg:inset-auto inset-0 rtl:lg:left-0 ltr:lg:right-0 rounded-[10px] 
    lg:p-[30px] w-[900px] h-screen overflow-y-auto "
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
          {{ $t("Upgrade") }}
        </h1>
    
        <div class="mt-[18px] flex items-center justify-between mt-[32px] w-full">
          <div>
            <h2 class="text-[14px] lg:text-[16px] font-[600] leading-[30px] text-[#151515] dark:text-whiteTamkin">
              {{ $t('Select Your package') }}
            </h2>
          </div>
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <div>
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
    
    
       <div class="w-full " v-if="!loadingDataModal">
        <ClientOnly >
          <Splide   :options="{ rewind: false,perPage: 3,  gap: 10,arrows:false ,direction:`${locale === 'ar' ? 'rtl' : 'ltr'}`      }">
            <SplideSlide  v-for="(plan, i) in sortedPlans" :key="i" >
            <div class="flex flex-col items-start justify-center " >
              <div class=" flex items-center custom-border  justify-start rtl:space-x-reverse 
              relative py-[62px] w-[93%] h-[149px] !rounded-[10px] mt-[35px]"
              :class="[
                  selectedPlan && selectedPlan === plan
                    ? 'bg-selected dark:bg-p '
                    : 'bg-whiteTamkin dark:bg-tamkinDarkPrimary',
                ]">
                <div class="absolute bottom-[125px] rtl:right-[24px] ltr:left-[24px]">
                  <img :src="runconfig.public.baseImagerUrl + plan.icon" class="w-[40px] h-[40px]" />
                </div>
                <div v-if="plan.type_deal !== 'None'" class="absolute   flex items-center justify-center text-[12px] 
                leading-[17.76px]  font-[500] w-[83px]
                h-[28px] rounded-[10px] text-white dark:text-darkTamkin top-[-15px]
               rtl:right-2/4 ltr:left-2/4" style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
      ">
                  <div class=" ">
                    {{ $t(plan.type_deal) }}
                  </div>
    
                </div>
                <div class="flex items-center justify-start relative w-full rtl:px-2 px-2">
                  <div class="order-2 mt-[22px] relative w-full">
                    <h1
                      class="font-[500] text-[14px] rtl:text-right ltr:text-left leading-[30px] dark:text-whiteTamkin
                       ipad-max:text-[14px] ipad-max:leading-[16px]">
                      {{ $t(plan.title) }} - <span class="!font-[300] !text-[14px]">{{ $t(plan.type) }}</span>
                    </h1>
                    <h2
                      class="font-[400] rtl:text-right ltr:text-left text-[12px] 
                      leading-[21.86px] text-[#536174] w-5/6 dark:text-whiteTamkin/80 ipad-max:text-[12px] ipad-max:leading-[16px]">
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
              z-[200] h-auto w-[93%] custom-border-collapse rounded-t-none rounded-[10px] p-4"
                :class="[selectedPlan && selectedPlan === plan ? 'bg-selected dark:bg-p' : 'bg-whiteTamkin dark:bg-tamkinDarkPrimary']">
                <div v-for="pf in plan.package_items.sort((a, b) => a.idx - b.idx)" :key="pf.name"
                  class="flex items-center justify-start rtl:space-x-reverse space-x-[24px] dark:text-whiteTamkin">
                  <div>
                    <img class="size-4" src="/assets/imgs/checked_list_active.svg" v-if="pf.is_available" />
                    <img class="size-4" src="/assets/imgs/checked_list_inactive.svg" v-else />
                  </div>
                  <div>
                    <h3 class="text-[12px] font-[400] leading-[20px]">
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
       </div>

        <div v-else class="mt-[35px] flex space-x-[16px] rtl:space-x-reverse w-full animate-pulse">

          <!-- Add more placeholder divs to simulate multiple package cards -->
          <div class="relative w-full py-[62px] h-[149px] bg-gray-300 dark:bg-gray-700 rounded-[10px]" v-for="(f, i) in 3"
            :key="i">
    
            <div class="mt-[22px]">
              <div class="w-full h-[16px] bg-gray-300 dark:bg-gray-700 mt-[10px] rounded"></div>
            </div>
          </div>
        </div>
      <OverviewWidgetEmbdedCode class="!mt-[30px] !w-full"/>
    

      </div>
    </div>
  </div>
</template>

<style  >
.splide__pagination{
  @apply !bottom-[-20px];
}
.splide__pagination__page.is-active{
@apply !bg-tamkin;
}</style>
