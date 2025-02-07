<script lang="ts" setup>
import { useOverviewStore } from "@/stores/overview";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";

const { getAvatarLetters } = useGetAvatarLetters();
import "@splidejs/vue-splide/css";
const { locale } = useI18n();
const overviewStore = useOverviewStore();

const props = defineProps({
  planType: {
    type: String,
    required: true,
  },
  isInstalled: {
    type: Boolean,
    required: true,
  },
});
const pricingType = ref("monthly");
const packagesStore = usePackgesStore();
const navStore = useNavbarStore();
const runtimeConfig = useRuntimeConfig();
const mySiteStore = useMySiteStore();
const loadingPacks = ref(true);

onBeforeMount(async () => {
  navStore.loadingPacks = false;

  await packagesStore.getDataPackage();

  navStore.loadingPacks = false;
  loadingPacks.value = false;
  mySiteStore.currentWebsite = navStore.defaultappobj;

  if (
    mySiteStore.currentWebsite &&
    Array.isArray(mySiteStore.currentWebsite.package)
  ) {
    mySiteStore.currentPackage = mySiteStore.currentWebsite.package.find(
      (pck) => pck.type === "Sign language"
    );
  } else {
    mySiteStore.currentPackage = {
      type: "Sign language",
    }; // Optionally set to null if no valid package is found
  }
});

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
const switchBetweenMonthlyAndAnnual = (v: any) => {
  packagesStore.discountType = v;
};
const geteFilterInfo = (level: any) => {
  packagesStore.traffic_level = level.name;
};
const currentIndex = ref(0);

const back = ref(false);

const next = () => {
  back.value = false;
  currentIndex.value++;
};
const prev = () => {
  back.value = true;
  if (currentIndex.value == 1) {
    currentIndex.value--;
  }
};
const getCurrentAccessPackage = computed(() => {
  return navStore.defaultappobj &&
    Array.isArray(navStore.defaultappobj.package) &&
    navStore.defaultappobj.package.length
    ? navStore.defaultappobj.package.find((p) => p.type === "Sign language")
    : {
        // title:'No Package',
        // type:'Sign language'
      };
});
</script>

<template>
  <div
    class="mt-[64px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full shadow-md -shadow-y-[1px]"
  >
    <div
      class="flex flex-col items-start justify-start w-full lg:overflow-x-hidden"
    >
      <div
        v-if="!loadingPacks"
        class="w-full bg-white relative dark:bg-tamkinDarkPrimary rounded-[10px] h-full shadow-md -shadow-y-[1px]"
      >
        <div
          class="flex items-center justify-between rounded-full bg-tamkinLight h-[42px] w-auto dark:bg-tamkinDarkPrimary dark:border-darkborder absolute rtl:left-[20px] ltr:right-[20px] top-[235px] p-[4px] border border-gray-300"
        >
          <button
            @click="switchBetweenMonthlyAndAnnual('month')"
            :class="[
              packagesStore.discountType === 'month'
                ? 'bg-white dark:bg-darkTamkin rounded-full'
                : '',
            ]"
            class="w-auto px-3 transition-all h-[32px] flex items-center justify-center ease-in-out text-darkGrey dark:text-whiteTamkin/80 font-[500] text-[12px] leading-[22.5px]"
          >
            {{ $t("Monthly") }}
          </button>
          <button
            @click="switchBetweenMonthlyAndAnnual('year')"
            :class="[
              packagesStore.discountType === 'year'
                ? 'bg-white dark:bg-darkTamkin rounded-full'
                : '',
            ]"
            class="w-auto px-3 transition-all h-[32px] flex items-center justify-center ease-in-out text-darkGrey rtl:space-x-reverse space-x-1 dark:text-whiteTamkin/80 font-[500] text-[12px] leading-[22.5px]"
          >
            <div>{{ $t("Annual") }}</div>
            <div
              class="flex items-center justify-center rtl:space-x-reverse space-x-[4px]"
            >
                <div class="text-black dark:text-white font-[800] !text-[10px]">
                {{ $t("SAVE") }}
              </div>
                <div class="text-black dark:text-white font-[800] !text-[10px]">
                {{
                  packagesStore.types.length
                    ? packagesStore.types.find(
                        (type) => type.title === "Sign language"
                      ).discount_yearly
                    : ""
                }}%
              </div>
            </div>
          </button>
        </div>
        <div
          class="flex items-center justify-start rounded-[10px] h-[212px] w-full rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#423568] to-tamkinEnd lg:to-[#c8fdf9] dark:to-[#26687945]/[27%] "
        >
          <div
            class="flex flex-col items-start justify-center w-full px-[15px]"
          >
            <div>
              <h1 class="text-white font-[500] text-[18px] leading-[30px]">
                {{ $t("Your Current Plan") }}
              </h1>
              <h3 class="text-white font-[500] text-[13px] leading-[21px]">
                {{
                  $t(
                    "Your current plan provides comprehensive features tailored to meet your needs."
                  )
                }}
              </h3>
            </div>
            <div
              v-if="
                navStore.defaultappobj?.package?.length &&
                navStore.defaultappobj.package.find(
                  (p) => p.type === 'Sign language'
                )
              "
              class="h-[55px] px-[20px] bg-white dark:bg-gray-600 dark:bg-opacity-100 bg-opacity-75 rounded-[41px] space-x-[0px] md:space-x-[42px] flex items-center justify-between rtl:space-x-reverse p-2 mt-[24px] w-full"
            >
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[8px] w-full"
              >
                <div>
                  <img
                    :src="
                      runtimeConfig.public.baseImagerUrl +
                      (getCurrentAccessPackage
                        ? getCurrentAccessPackage.icon
                        : '/')
                    "
                    class="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div
                  class="text-[10px] lg:text-[14px] font-[500] ipad-max:text-[12px] ipad-max:leading-[10px] whitespace-nowrap lg:leading-[22.5px] text-darkGrey dark:text-whiteTamkin"
                >
                  {{ $t(getCurrentAccessPackage.title) }} -
                  {{ $t(`${getCurrentAccessPackage.type}`) }}
                </div>
              </div>

              <nuxt-link
                :to="localePath('/embed-code')"
                v-if="getCurrentAccessPackage.status === 'not_installed'"
                class="cursor-pointer text-[#DE4134] text-[12px] md:text-[14px] font-[500] leading-[15px] md:leading-[21px] underline text-nowrap"
              >
                {{ $t("Not installed") }}
              </nuxt-link>
              <div
                v-if="getCurrentAccessPackage.status === 'Expired'"
                class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
              >
                {{ $t(`Expired`) }}
              </div>

              <div
                v-if="getCurrentAccessPackage.status === 'Active'"
                class="bg-gradient-to-r from-tamkinStart to-tamkinEnd rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
              >
                {{ $t(`Active`) }}
              </div>
              <div
                v-if="
                  getCurrentAccessPackage.status === 'Rejected' ||
                  getCurrentAccessPackage.status === 'Rejected' ||
                  getCurrentAccessPackage.status === 'Cancelled'
                "
                class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] w-[100px] text-white text-[12px] leading-[18px]"
              >
                {{ $t(`Rejected`) }}
              </div>
              <div
                v-if="getCurrentAccessPackage.status === 'Pending'"
                class="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[17px] flex items-center justify-center h-[25px] max-w-[150px] w-3/4 text-white text-[12px] leading-[18px]"
              >
                {{
                  getCurrentAccessPackage.status === "Pending"
                    ? $t("Under Review")
                    : $t(`${getCurrentAccessPackage.status}`)
                }}
              </div>
            </div>
            <div
              v-else
              class="h-[55px] px-[20px] bg-white dark:bg-gray-600 dark:bg-opacity-100 bg-opacity-75 rounded-[41px] space-x-[42px] flex items-center justify-between rtl:space-x-reverse p-2 mt-[24px] w-full"
            >
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[8px] w-full"
              >
                <div></div>
                <div
                  class="text-[10px] lg:text-[14px] font-[500] ipad-max:text-[12px] ipad-max:leading-[10px] whitespace-nowrap lg:leading-[22.5px] text-darkGrey dark:text-whiteTamkin"
                >
                  {{ $t("No Current Package") }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="rtl:mr-auto rtl:scale-x-[-1]  ltr:ml-auto h-full w-full lg:block hidden"
          >
            <!-- <img
              src="/imgs/vector_plan.png"
              class="w-full h-full rtl:rounded-tr-[10px] ltr:rounded-tr-[10px]"
            /> -->
            <img
                :src="`/assets/imgs/overview/${navStore.isDark ? 'current_plan_upgrade_dark.png' : 'current_plan_upgrade.svg'}`"
                class="w-full h-full rtl:rounded-tr-[10px] ltr:rounded-tr-[10px] dark:[object-position:41px_36%] dark:[object-fit:cover] dark:w-[368px] dark:ltr:ml-auto dark:rtl:mr-0" />
          </div>
        </div>

        <!-- <div  
            class="flex items-center justify-start w-full absolute z-[999]  rtl:right-[3.3%] left-[3.3%] top-[90px] p-[4px] rtl:space-x-reverse space-x-[14px]"
          >
            <div class="text-black dark:text-whiteTamkin font-[600] text-[14px]">
              {{ $t('Choose Traffic level') }} :
            </div>
            <TranslateSelectInput
              @getCurrentSelectedItem="geteFilterInfo"
              :enableSearch="false"
              placeholderinput="Traffic level"
              :list="uniqueValues(packagesStore.getTraffiPrices('Package'))"
              nameKey="name"
              idField="id"
              class="!w-1/4 !bg-white "
              :currentListValue="packagesStore.traffic_level"
            />
          </div> -->
        <MySitePricing
          v-if="!loadingPacks"
          :current-package="
            getCurrentAccessPackage ? getCurrentAccessPackage : {}
          "
          :current-pack-id="getCurrentAccessPackage?.name"
        />
      </div>

      <div
        class="w-full bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full shadow-md -shadow-y-[1px]"
        v-if="loadingPacks"
      >
        <div
          class="flex items-center dark:bg-p dark:border-[1px] dark:border-darkborder justify-start rounded-[10px] h-[212px] w-full animate-pulse bg-gray-300"
        >
          <div
            class="flex flex-col items-start justify-center w-full px-[15px]"
          >
            <div>
              <!-- Title Placeholder -->
              <div
                class="h-[30px] w-3/4 dark:bg-tamkinDarkPrimary bg-gray-400 rounded-md mb-2"
              ></div>
              <!-- Subtitle Placeholder -->
              <div
                class="h-[21px] w-2/3 dark:bg-tamkinDarkPrimary bg-gray-400 rounded-md"
              ></div>
            </div>

            <!-- Placeholder for the Plan Information -->
            <div
              class="h-[55px] px-[20px] dark:bg-tamkinDarkPrimary bg-gray-400 rounded-[41px] space-x-[42px] flex items-center justify-between w-auto p-2 mt-[24px]"
            >
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[4px]"
              >
                <!-- Icon Placeholder -->
                <div
                  class="h-[22px] w-[22px] lg:h-[10px] dark:bg-p lg:w-[10px] dark:bg-p bg-gray-500 rounded-full"
                ></div>
                <!-- Text Placeholder -->
                <div
                  class="h-[22px] w-[150px] bg-gray-400 dark:bg-p rounded-md"
                ></div>
              </div>

              <!-- Status Placeholder -->
              <div
                class="h-[25px] lg:w-[88px] dark:bg-p bg-gray-500 rounded-[17px]"
              ></div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-center w-full mt-[42px] px-[20px] pb-[24px] animate-pulse"
        >
          <div
            class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly h-full w-full gap-2 mt-[32px]"
          >
            <!-- Placeholder for each package item -->
            <div
              v-for="n in 3"
              :key="n"
              class="flex items-center flex-col border-[1px] dark:border-darkborder mx-auto justify-start dark:bg-p bg-white rounded-t-[10px] relative mt-[35px] w-full"
            >
              <div
                class="bg-gray-300 dark:bg-p_secondary w-[50px] h-[50px] rounded-full absolute top-[-30px] rtl:right-[15px] ltr:left-[15px]"
              ></div>

              <div
                class="flex items-center justify-center w-full px-[15px] mt-[48px]"
              >
                <div class="w-full">
                  <div
                    class="bg-gray-300 h-[30px] dark:bg-p_secondary rounded mb-[8px]"
                  ></div>
                  <div
                    class="bg-gray-300 h-[20px] dark:bg-p_secondary w-[150px] rounded mb-[16px]"
                  ></div>
                  <div
                    class="bg-gray-300 h-[29px] dark:bg-p_secondary w-[100px] rounded"
                  ></div>
                  <div
                    class="bg-gray-200 h-[16px] dark:bg-p_secondary w-[120px] mt-[10px] rounded"
                  ></div>
                  <div
                    class="bg-gray-200 h-[16px] dark:bg-p_secondary w-[80px] mt-[10px] rounded"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col items-start justify-center w-full space-y-[10px] p-4"
              >
                <div
                  class="bg-gray-300 dark:bg-p_secondary h-[20px] w-[200px] rounded"
                ></div>
                <div
                  class="bg-gray-300 dark:bg-p_secondary h-[20px] w-[150px] rounded"
                ></div>
                <div
                  class="bg-gray-300 dark:bg-p_secondary h-[20px] w-[100px] rounded"
                ></div>
                <div
                  class="bg-gray-200 dark:bg-p_secondary w-full h-[40px] rounded-[19px] mt-[20px]"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.splide__pagination {
  @apply !bottom-[-20px];
}

.splide__pagination__page.is-active {
  @apply !bg-tamkin;
}
</style>
