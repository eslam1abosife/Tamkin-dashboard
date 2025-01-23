<script lang="ts" setup>
import { useGetAppInvites, useUpdateDefaultApp } from "@/composables/useTeam";

const {
  getInviteApps,
  defaultApp,
  apps,
  loading: getSitesLoading,
} = useGetAppInvites();
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
const { locale } = useI18n();
const addSiteStore = useAddSiteStore();
const route = useRoute();

const localePath = useLocalePath();

const { getAvatarLetters } = useGetAvatarLetters();

const formatToUrl = (domain) => {
  // Check if the domain starts with "http://" or "https://"
  if (!/^https?:\/\//i.test(domain)) {
    // If not, prepend "https://"
    domain = "https://" + domain;
  }
  return domain;
};
const addSiterStore = useAddSiteStore();
const selectedPlan = ref("");
const collapsed = ref(false);
const loadingDataModal = ref(true);
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const packagesStore = usePackgesStore();
const closeModalPackage = () => {
  closeModal("upgrade_no_package");
};

const mySiteStore = useMySiteStore();

const switchBetweenMonthlyAndAnnual = (v: any) => {
  packagesStore.discountType = v;
};
const getApps = async () => {
  mySiteStore.loadingApps = true;
  const user = JSON.parse(localStorage.getItem("user"));
  await getInviteApps({ agency: user.agency });
  mySiteStore.loadingApps = false;
};
onBeforeMount(async () => {
  // await getApps();
  await packagesStore.getDataPackage();
  await addSiterStore.getPackages();

  loadingDataModal.value = false;
  mySiteStore.currentWebsite = defaultApp.value;

  // selectedPlan.value = addSiterStore.packages.sort((a, b) => a.sort - b.sort)[0]
});
// const sortedPlans = computed(() => {
//   const desiredType = "Sign language";

//   const specificTypePackages = addSiterStore.packages
//     .filter((pkg) => pkg.type === desiredType)

//     .slice(0, 3);

//   const otherPackages = addSiterStore.packages
//     .filter((pkg) => pkg.type !== desiredType)
//     .slice(0, 3);

//   return [...specificTypePackages, ...otherPackages];
// });

// const selectPlan = async (plan: any) => {
//   selectedPlan.value = plan;
//   await mySiteStore.setCurrentPackage(plan);

//   // mysiteStore.currentPackage = app.package ? :null
//   //   mySiteStore.currentWebsite = app
//   //   mySiteStore.openedCurrentSite = true

//   return navigateTo("upgrade_no_package", "mysite", "add_package_modal_mysite");
// };
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);

  let pattern = path.startsWith(`/${locale.value}`) ? path : localePath(path);

  if (!pattern.startsWith("/")) {
    pattern = "/" + pattern;
  }

  if (!pattern.includes("*")) {
    return currentPath === pattern;
  }

  const regexPattern = "^" + pattern.replace(/\*/g, ".*") + "$";
  const regex = new RegExp(regexPattern);

  return regex.test(currentPath);
};
</script>

<template>
  <div
<<<<<<< HEAD
    class="mysite_bg_modal max-w-full dark:bg-p fixed z-[9999] !top-[-2px] rtl:left-0 ltr:right-0 rounded-[10px] px-4 lg:p-[30px] w-[900px] h-[100%] sm:h-screen overflow-y-auto"
=======
    class="mysite_bg_modal max-w-full dark:bg-p fixed z-[9999] !top-[-2px] rtl:left-0 ltr:right-0 rounded-[10px] px-4 px-[16px] py-[30px] lg:px-[30px] w-[900px] h-screen overflow-y-auto"
>>>>>>> a269ff0c83ebf51a1e5da53bbb9fdfc00b8f5b11
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
      <div
        class="flex flex-col items-start justify-center w-full lg:overflow-x-hidden"
      >
        <h1
          class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin lg:px-0 px-[20px] lg:mt-0"
        >
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
          >
            <img
              src="/assets/imgs/icons/mysite_select.svg"
              class="w-[40px] h-[40px]"
              v-if="mySiteStore.currentWebsite?.title === 'Internal Service'"
            />

            <div
              v-if="
                !mySiteStore.currentWebsite?.favicon &&
                mySiteStore.currentWebsite?.title !== 'Internal Service'
              "
              class="w-[40px] h-[40px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"
            >
              {{
                mySiteStore.currentWebsite?.title
                  ? getAvatarLetters(mySiteStore.currentWebsite?.title)
                  : ""
              }}
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
                  {{
                    mySiteStore.currentWebsite?.app_domain ||
                    $t(`${mySiteStore.currentWebsite?.title}`)
                  }}
                </h2>
              </div>
              <div>
                <a
                  :class="[
                    mySiteStore.currentWebsite?.title === 'Internal Service'
                      ? '!text-darkGrey/40 dark:!text-white/70 cursor-not-allowed'
                      : '',
                  ]"
                  :href="
                    mySiteStore.currentWebsite?.title === 'Internal Service'
                      ? '#'
                      : mySiteStore.currentWebsite
                      ? formatToUrl(mySiteStore.currentWebsite.app_domain)
                      : ''
                  "
                  :target="
                    mySiteStore.currentWebsite?.title === 'Internal Service'
                      ? ''
                      : '_blank'
                  "
                  class="text-tamkin font-[500] text-[14px] leading-[24px] flex"
                  >{{ $t("Visit Site") }}
                  <svg
                    data-slot="icon"
                    class="size-6 ltr:ml-[14px] rtl:mr-[14px]"
                    fill="none"
                    stroke-width="1.5"
                    :class="[
                      mySiteStore.currentWebsite?.title === 'Internal Service'
                        ? '!text-darkGrey/40 dark:!text-white/70 cursor-not-allowed'
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
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </h1>

        <div
          v-if="!loadingDataModal"
          class="flex items-center justify-between rounded-full bg-tamkinLight h-[42px] w-auto dark:bg-tamkinDarkPrimary dark:border-darkborder absolute rtl:left-[30px] ltr:right-[30px] top-[100px] p-[4px] border border-gray-300"
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
                        (type) => type.title === mySiteStore.currentType
                      ).discount_yearly
                    : ""
                }}%
              </div>
            </div>
          </button>
        </div>
        <MySitePricingnopackage
          v-if="
            !loadingDataModal &&
            addSiteStore.getSortedPackagesAddSite.length > 0
          "
        />

        <div
          v-else
          :class="[isLinkActive('/sign-language/*') ? '' : ' pb-[24px] ']"
          class="flex flex-col items-center justify-center w-full mt-[42px]animate-pulse"
        >
          <div
            class="flex items-center lg:flex-row flex-col ipad-max:flex-wrap justify-center lg:justify-evenly rtl:space-x-reverse h-full w-full space-x-[10px] mt-[32px]"
          >
            <!-- Placeholder for each package item -->
            <div
              v-for="n in 3"
              :key="n"
              class="flex items-center dark:bg-tamkinDarkPrimary flex-col border-[1px] mx-auto justify-start bg-white rounded-t-[10px] relative mt-[35px] w-full dark:border-darkGrey"
            >
              <div
                class="bg-gray-300 dark:bg-gray-600 w-[50px] h-[50px] rounded-full absolute top-[-30px] rtl:right-[15px] ltr:left-[15px]"
              ></div>

              <div
                class="flex items-center justify-center w-full px-[15px] mt-[48px]"
              >
                <div class="w-full">
                  <div
                    class="bg-gray-300 dark:bg-gray-600 h-[30px] rounded mb-[8px]"
                  ></div>
                  <div
                    class="bg-gray-300 dark:bg-gray-600 h-[20px] w-[150px] rounded mb-[16px]"
                  ></div>
                  <div
                    class="bg-gray-300 dark:bg-gray-600 h-[29px] w-[100px] rounded"
                  ></div>
                  <div
                    class="bg-gray-200 dark:bg-gray-600 h-[16px] w-[120px] mt-[10px] rounded"
                  ></div>
                  <div
                    class="bg-gray-200 dark:bg-gray-600 h-[16px] w-[80px] mt-[10px] rounded"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col items-start justify-center w-full space-y-[10px] p-4"
              >
                <div
                  class="bg-gray-300 dark:bg-gray-600 h-[20px] w-[200px] rounded"
                  v-for="n in 6"
                ></div>

                <div
                  class="bg-gray-200 dark:bg-gray-600 w-full h-[40px] rounded-[19px] mt-[20px]"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <OverviewWidgetEmbdedCode class="!mt-[30px] !w-full" />
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
