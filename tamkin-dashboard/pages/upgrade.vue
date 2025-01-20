<script lang="ts" setup>
import { useGetAppByName } from "@/composables/useMySite";
const { locale } = useI18n();

const { getAppByName } = useGetAppByName();
const packagesStore = usePackgesStore();
const mySiteStore = useMySiteStore();
const navStore = useNavbarStore();
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});

const currentApp = ref();
const route = useRoute();
const loadingPage = ref(true);
onMounted(async () => {
  const res = await getAppByName(route.query.app);
  await packagesStore.getPacks();
  if (res.length) {
    currentApp.value = res[0];
    mySiteStore.currentWebsite = res[0];
    loadingPage.value = false;
  } else {
    showError({
      statusCode: 400,
      message: "Something went Wrong",
      fatal: true,
    });
  }

  if (!getCurrentPackageToUpgrade.value) {
    showError({
      statusCode: 400,
      message: "Something went Wrong",
      fatal: true,
    });
  }
});
const getCurrentPackageToUpgrade = computed(() => {
  return !loadingPage.value
    ? mySiteStore.currentWebsite.package.find(
        (pck) => pck.name === route.query.package
      )
    : "";
});

const runtimeConfig = useRuntimeConfig();
const switchBetweenMonthlyAndAnnual = (v: any) => {
  packagesStore.discountType = v;
};
</script>

<template>
  <div class="relative">
    <div
      v-if="!loadingPage"
      class="flex items-center justify-between rounded-full bg-tamkinLight h-[42px] w-auto dark:bg-tamkinDarkPrimary dark:border-darkborder absolute rtl:left-[3.3%] ltr:right-[3.3%] top-[250px] p-[4px] border border-gray-300"
    >
      <button
        @click="switchBetweenMonthlyAndAnnual('month')"
        :class="[
          packagesStore.discountType === 'month'
            ? 'bg-white dark:bg-darkTamkin rounded-full'
            : '',
        ]"
        class="w-auto px-3 transition-all h-[32px] flex items-center justify-center ease-in-out text-darkGrey dark:text-whiteTamkin font-[500] text-[12px] leading-[22.5px]"
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
        class="w-auto px-3 transition-all h-[32px] flex items-center justify-center ease-in-out text-darkGrey rtl:space-x-reverse space-x-1 dark:text-whiteTamkin font-[500] text-[12px] leading-[22.5px]"
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
                    (type) => type.title === getCurrentPackageToUpgrade.type
                  ).discount_yearly
                : ""
            }}%
          </div>
        </div>
      </button>
    </div>
    <div
      v-if="!loadingPage"
      class="mt-[24px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full shadow-md -shadow-y-[1px]"
    >
      <div
        class="flex items-center justify-start rounded-[10px] h-[212px] w-full rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#35b4a9] to-tamkinEnd lg:to-[#c8fdf9] dark:to-darkTamkin"
      >
        <div class="flex flex-col items-start justify-center w-full px-[15px]">
          <div>
            <h1 class="text-white font-[500] text-[18px] leading-[30px]">
              Your Current Plan
            </h1>
            <h3 class="text-white font-[500] text-[13px] leading-[21px]">
              Your current plan provides comprehensive features tailored to meet
              your needs.
            </h3>
          </div>
          <div
            class="h-[55px] px-[20px] bg-white dark:bg-tamkinDarkPrimary bg-opacity-75 rounded-[41px] space-x-[42px] flex items-center justify-between w-auto p-2 mt-[24px]"
          >
            <div
              class="flex items-center justify-start rtl:space-x-reverse space-x-[4px]"
            >
              <div>
                <img
                  :src="
                    runtimeConfig.public.baseImagerUrl +
                    (getCurrentPackageToUpgrade
                      ? getCurrentPackageToUpgrade.icon
                      : '/')
                  "
                  class="lg:w-[22px] lg:h-[22px] w-[10px] h-[10px]"
                />
              </div>
              <div
                class="text-[10px] lg:text-[14px] font-[500] ipad-max:text-[12px] ipad-max:leading-[10px] whitespace-nowrap lg:leading-[22.5px] text-darkGrey dark:text-whiteTamkin"
              >
                {{ getCurrentPackageToUpgrade.title }} -
                {{
                  currentApp.app_domain !== null
                    ? currentApp.app_domain
                    : "Internal Service"
                }}
              </div>
            </div>

            <div
              v-if="
                new Date() > new Date(getCurrentPackageToUpgrade.endpackage)
              "
              class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
            >
              {{ $t(`Expired`) }}
            </div>
            <div
              v-if="
                getCurrentPackageToUpgrade.status === 'Rejected' ||
                getCurrentPackageToUpgrade.status === 'Cancelled'
              "
              class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] w-[100px] text-white text-[12px] leading-[18px]"
            >
              {{ $t(`Rejected`) }}
            </div>
            <div
              v-if="getCurrentPackageToUpgrade.status === 'Pending'"
              class="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[17px] flex items-center justify-center h-[25px] max-w-[150px] w-3/4 text-white text-[12px] leading-[18px]"
            >
              {{
                getCurrentPackageToUpgrade.status === "Pending"
                  ? $t("Under Review")
                  : $t(`${getCurrentPackageToUpgrade.status}`)
              }}
            </div>
          </div>
        </div>

        <div class="rtl:!mr-auto ltr:ml-auto h-full w-full lg:block hidden">
          <img
            :src="`/assets/imgs/overview/${
              navStore.isDark
                ? 'current_plan_upgrade_dark.png'
                : 'current_plan_upgrade.svg'
            }`"
            class="w-full h-full rtl:rounded-tr-[10px] ltr:rounded-tr-[10px]"
            :style="
              navStore.isDark
                ? 'object-position:41px 36%; object-fit:cover; width:368px; margin-inline-start:auto; '
                : ''
            "
          />
        </div>
      </div>

      <MySitePricing />
    </div>

    <div
      class="mt-[24px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full shadow-md -shadow-y-[1px]"
      v-if="loadingPage"
    >
      <div
        class="flex items-center justify-start rounded-[10px] h-[212px] w-full animate-pulse dark:bg-p bg-gray-300"
      >
        <div class="flex flex-col items-start justify-center w-full px-[15px]">
          <div>
            <!-- Title Placeholder -->
            <div
              class="h-[30px] w-3/4 bg-gray-400 dark:bg-tamkinDarkPrimary rounded-md mb-2"
            ></div>
            <!-- Subtitle Placeholder -->
            <div
              class="h-[21px] w-2/3 bg-gray-400 dark:bg-tamkinDarkPrimary rounded-md"
            ></div>
          </div>

          <!-- Placeholder for the Plan Information -->
          <div
            class="h-[55px] px-[20px] bg-gray-400 dark:bg-tamkinDarkPrimary rounded-[41px] space-x-[42px] flex items-center justify-between w-auto p-2 mt-[24px]"
          >
            <div
              class="flex items-center justify-start rtl:space-x-reverse space-x-[4px]"
            >
              <!-- Icon Placeholder -->
              <div
                class="h-[22px] w-[22px] lg:h-[10px] lg:w-[10px] dark:bg-p bg-gray-500 rounded-full"
              ></div>
              <!-- Text Placeholder -->
              <div
                class="h-[22px] w-[150px] bg-gray-400 dark:bg-p rounded-md"
              ></div>
            </div>

            <!-- Status Placeholder -->
            <div
              class="h-[25px] lg:w-[88px] bg-gray-500 dark:bg-p rounded-[17px]"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col items-center justify-center w-full mt-[42px] px-[20px] pb-[24px] animate-pulse"
      >
        <div
          class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly h-full w-full lg:rtl:space-x-reverse lg:space-x-[36px] mt-[32px]"
        >
          <!-- Placeholder for each package item -->
          <div
            v-for="n in 3"
            :key="n"
            class="flex items-center flex-col border-[1px] dark:bg-tamkinDarkPrimary dark:border-darkborder mx-auto justify-start bg-white rounded-t-[10px] relative mt-[35px] w-full p-4"
          >
            <div
              class="bg-gray-300 dark:bg-p w-[50px] h-[50px] rounded-full absolute top-[-30px] rtl:right-[15px] ltr:left-[15px]"
            ></div>

            <div
              class="flex items-center justify-center w-full px-[15px] mt-[48px]"
            >
              <div class="w-full">
                <div
                  class="bg-gray-300 dark:bg-p h-[30px] rounded mb-[8px]"
                ></div>
                <div
                  class="bg-gray-300 dark:bg-p h-[20px] w-[150px] rounded mb-[16px]"
                ></div>
                <div
                  class="bg-gray-300 dark:bg-p h-[29px] w-[100px] rounded"
                ></div>
                <div
                  class="bg-gray-200 dark:bg-p h-[16px] w-[120px] mt-[10px] rounded"
                ></div>
                <div
                  class="bg-gray-200 dark:bg-p h-[16px] w-[80px] mt-[10px] rounded"
                ></div>
              </div>
            </div>

            <div
              class="flex flex-col items-start justify-center w-full space-y-[10px] p-4"
            >
              <div
                class="bg-gray-300 dark:bg-p h-[20px] w-[200px] rounded"
              ></div>
              <div
                class="bg-gray-300 dark:bg-p h-[20px] w-[150px] rounded"
              ></div>
              <div
                class="bg-gray-300 dark:bg-p h-[20px] w-[100px] rounded"
              ></div>
              <div
                class="bg-gray-200 dark:bg-p w-full h-[40px] rounded-[19px] mt-[20px]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <OverviewWidgetEmbdedCode class="!mb-[24px]" />
  </div>
</template>
