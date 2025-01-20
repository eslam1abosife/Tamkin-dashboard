<script lang="ts" setup>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
const { locale } = useI18n();
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const pricingType = inject("pricingType");
const packagesStore = usePackgesStore();
const addSiteStore = useAddSiteStore();
const mySiteStore = useMySiteStore();
const loadedData = ref(true);
function getDayLabel(number) {
  return number === 1 ? "day" : "days";
}

const route = useRoute();
const splide = ref("");
// const getCurrentPackageToUpgrade = computed(()=>{

// return mySiteStore.currentWebsite.package.find(pck => pck.name === route.query.package)
// })
const openModalToUpgrade = (pack) => {
  mySiteStore.setCurrentPackage(pack);

  // mysiteStore.currentPackage = app.package ? :null
  //   mySiteStore.currentWebsite = app
  //   mySiteStore.openedCurrentSite = true
  loadedData.value = false;

  navigateTo("upgrade_no_package", "mysite", "add_package_modal_mysite");

  //   loadingPackage.value.splice({app:app,pack:pack})
};
// watch(() => addSiteStore.getSortedPackagesAddSite, (newValue) => {

// });

// const sortedPlans = ref([]);

// watch(
//   () => addSiteStore.packages,
//   (newPackages) => {

//     addSiteStore.sortedPlans =    addSiteStore.getSortedPackagesAddSite
//   },
//   { immediate: true } // Run the watch when the component mounts
// );
onMounted(() => {
  // console.log(splide.value.options)
  // loadedData.value = true
});
const destroySplide = () => {
  // Prevent Splide from being destroyed if needed
  //   alert('gg destryoed')
  loadedData.value = false;
};
const moveSplide = (newIndex) => {
  // Prevent Splide from being destroyed if needed
  if (newIndex.index === 0) {
    mySiteStore.currentType = "Sign language";
  } else {
    mySiteStore.currentType = "Accessibility";
  }

  loadedData.value = false;
};
</script>

<template>
  <div class="mt-[64px] w-full">
    <Splide
      ref="splide"
      @splide:move="moveSplide"
      @splide:destroy="destroySplide"
      :options="{
        destroy: false,
        gap: 10,
        arrows: false,
        rewind: false,
        perPage: 3,
        breakpoints: {
          768: {
            perPage: 1,
          },
          1024: {
            perPage: 3,
          },
          1400: {
            perPage: 1,
          },
        },
      }"
    >
      <SplideSlide
        v-for="(pak, i) in addSiteStore.getSortedPackagesAddSite"
        :key="pak.name"
      >
        <div
          class="flex items-center flex-col custom-border mx-auto justify-start !rounded-t-[10px] relative !rounded-b-none mt-[48px] group dark:bg-tamkinDarkPrimary bg-white hover:bg-selected dark:hover:bg-p dark:hover:bg-p w-full"
        >
          <div
            v-if="pak.type_deal !== 'None'"
            class="absolute flex items-center justify-center text-[13px] leading-[17.76px] font-[500] w-[83px] h-[28px] rounded-[10px] text-white dark:text-darkTamkin top-[-15px] rtl:right-[150px] ltr:left-[150px]"
            :class="[
              pak.type_deal === 'Best Value'
                ? ' bg-[#C16487] '
                : pak.type_deal === 'Best Deal'
                ? 'bg-gradient-to-br from-[#2dada3] to-[#71dad2]'
                : 'bg-[#5E4352]',
            ]"
          >
            <div class=" ">{{ $t(pak.type_deal) }}</div>
          </div>
          <div class="absolute top-[-30px] rtl:right-[15px] ltr:left-[15px]">
            <img
              :src="`http://tamkin.app/${pak.icon}`"
              class="w-[50px] h-[50px]"
            />
          </div>

          <div
            class="flex items-center justify-center w-full px-[15px] mt-[48px]"
          >
            <div class="order-2 w-full">
              <h1
                class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin dark:text-whiteTamkin"
              >
                {{ $t(pak.title) }}
              </h1>
              <h2
                class="font-[400] h-[30px] text-[14px] leading-[15px] text-[#536174] dark:text-whiteTamkin dark:text-whiteTamkin"
              >
                {{ $t(pak.sub_title) }}
              </h2>

              <h3
                v-if="
                  pak.package_price_role[0].cost_month > 0 ||
                  pak.package_price_role[0].cost_yearly > 0
                "
                class="mt-[16px] text-black dark:text-whiteTamkin font-[600] text-[24px] leading-[29px]"
              >
                $
                {{
                  packagesStore.discountType === "month"
                    ? pak.package_price_role[0].cost_month
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    : pak.package_price_role[0].cost_yearly
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}

                <span
                  class="!font-[500] !text-darkGrey dark:!text-whiteTamkin !text-[18px]"
                  >/{{ $t(packagesStore.discountType) }}</span
                >
              </h3>
              <h3
                class="mt-[16px] text-black dark:text-whiteTamkin font-[600] text-[24px] leading-[29px]"
                v-else
              >
                {{ $t("Free") }}
              </h3>
              <div
                v-if="
                  pak.package_price_role[0].cost_before_month !== 0 ||
                  pak.package_price_role[0].cost_before_yearly !== 0
                "
                class="text-[#EA4335] text-[16px] font-[500] line-through px-[2px]"
              >
                <span
                  v-if="
                    packagesStore.discountType === 'month' &&
                    pak.package_price_role[0].cost_before_month !== 0
                  "
                >
                  $
                  {{
                    pak.package_price_role[0].cost_before_month
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </span>
                <span
                  v-if="
                    packagesStore.discountType === 'year' &&
                    pak.package_price_role[0].cost_before_yearly !== 0
                  "
                >
                  $
                  {{
                    pak.package_price_role[0].cost_before_yearly
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </span>
              </div>
              <div
                v-if="
                  (packagesStore.discountType === 'month' &&
                    pak.package_price_role[0].cost_before_month === 0) ||
                  (packagesStore.discountType === 'year' &&
                    pak.package_price_role[0].cost_before_yearly === 0)
                "
                class="my-[24px]"
              ></div>

              <p
                class="font-[700] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin dark:text-whiteTamkin"
              >
                {{ $t(pak.description) }}
              </p>
            </div>
          </div>
          <div
            class="flex group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin flex-col items-start justify-center w-full space-y-[10px] h-full custom-border-collapse rounded-t-none rounded-[10px] p-4"
          >
            <div
              v-for="item in pak.package_items
                .filter((k) => k.section === 'Package')
                .sort((a, b) => a.idx - b.idx)"
              :key="item.name"
              class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]"
            >
              <div>
                <img
                  class="w-[16px] h-[16px]"
                  :src="
                    item.is_available
                      ? '/assets/imgs/checked_list_active.svg'
                      : '/assets/imgs/checked_list_inactive.svg'
                  "
                />
              </div>
              <div>
                <h3 class="text-[12px] font-[400] leading-[20px]">
                  {{ $t(item.title) }}
                </h3>
              </div>
            </div>

            <div
              class="flex items-center justify-center mx-auto w-full px-[14px]"
            >
              <button
                @click.prevent.stop="openModalToUpgrade(pak)"
                :disabled="
                  (pak.cost_month !== 0 && pak.cost_yearly !== 0) ||
                  pak.title === 'Free'
                "
                class="btn-dashboard hover_tamkin w-full !rounded-[19px] mx-auto"
              >
                <span v-if="pak.is_contact_us"> {{ $t("Contact us") }} </span>

                <span
                  v-else-if="
                    pak.trial_days > 0 ||
                    (pak.trial_days === 0 &&
                      pak.cost_month !== 0 &&
                      pak.cost_yearly !== 0)
                  "
                >
                  {{ pak.trial_days > 0 ? `${$t("Free Trial")}` : "" }}
                </span>

                <span
                  v-else-if="
                    (pak.cost_month === 0 && pak.cost_yearly === 0) ||
                    pak.title === 'Free'
                  "
                >
                  {{ $t("Free Package") }}
                </span>

                <span v-else>{{ $t("Get Started") }}</span>
              </button>
            </div>
          </div>
        </div>
      </SplideSlide>
    </Splide>
  </div>
</template>

<style>
.splide.is-initialized:not(.is-active) .splide__list {
  display: flex;
  @apply space-x-[10px] rtl:space-x-reverse;
}
</style>
