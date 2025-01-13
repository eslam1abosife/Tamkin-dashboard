<script lang="ts" setup>
const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const pricingType = inject("pricingType");
const packagesStore = usePackgesStore();
const mySiteStore = useMySiteStore();
const localePath = useLocalePath();
const navStore = useNavbarStore();
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};

const props = defineProps({
  currentPackage: {
    type: Object,
    default: null,
  },
  currentPackId: {
    type: String,
  },
  currentwebsite: {
    type: String,
  },
});

const currentPackage = computed(
  () => props.currentPackage || mySiteStore.currentPackage
);

function getDayLabel(number) {
  return number === 1 ? "day" : "days";
}

const openBuyModal = (pck) => {
  packagesStore.currentPackage = pck;
  packagesStore.currentWebsite = "";
  packagesStore.openedCurrentSite = false;

  openModal("add_package_modal_packages");
};

const route = useRoute();

const openModalToUpgrade = async (pack) => {
  if (isLinkActive("/overview")) {
    await mySiteStore.setCurrentPackage({ ...pack, billing_duration: "none" });

    mySiteStore.currentWebsite = navStore.defaultappobj || null;
  } else {
    await mySiteStore.setCurrentPackage(pack);
  }

  return navigateTo(
    "upgrade_mysite_package",
    "mysite",
    "add_package_modal_mysite"
  );
};

const cryptoStroe = useCryptoStore();

function convertUsdToCrypto(usdTotal, rates) {
  const rate = rates["tamkin"];
  if (rate) {
    return (usdTotal / rate).toFixed(0);
  }
}
</script>

<template>
  <div
    class="flex flex-col dark:bg-tamkinDarkPrimary items-center justify-center w-full mt-[42px] pb-[24px] px-[14px]"
  >
    <div class="grid grid-cols-3 gap-[10px] w-full">
      <div
        v-for="pak in packagesStore
          .getPackagesByTypeTitle(
            'Package',
            currentPackage?.type
              ? currentPackage?.type
              : isLinkActive('/overview')
              ? 'Accessibility'
              : isLinkActive('/sign-language/overview')
              ? 'Sign language'
              : '',
            (currentPackage?.title === 'Free'
              ? currentPackage?.category
              : currentPackage?.category) || null
          )
          .filter((p) => p.site_type === 'website')"
        :key="pak.name"
        class="flex dark:bg-tamkinDarkPrimary items-center flex-col custom-border mx-auto justify-start !rounded-t-[10px] relative !rounded-b-none mt-[48px] group hover:bg-selected dark:hover:bg-p w-full"
        :class="[currentPackId === pak.name ? 'dark:bg-p bg-selected' : '']"
      >
        <div
          v-if="pak.type_deal !== 'None'"
          :class="[
            pak.type_deal === 'Best Value'
              ? 'bg-[#C16487]'
              : pak.type_deal === 'Best Deal'
              ? 'bg-gradient-to-br from-[#2dada3] to-[#71dad2]'
              : 'bg-[#5E4352]',
          ]"
          class="absolute flex dark:text-whiteTamkin items-center justify-center text-[13px] leading-[17.76px] font-[500] w-[83px] h-[28px] rounded-[10px] text-white top-[-15px] rtl:right-[150px] ltr:left-[150px]"
        >
          <div>{{ $t(pak.type_deal) }}</div>
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
              class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin"
            >
              {{ $t(pak.title) }}
            </h1>
            <h2
              class="font-[400] h-[30px] text-[14px] leading-[15px] text-[#536174] dark:text-whiteTamkin"
            >
              {{ $t(pak.sub_title) }}
            </h2>

            <h3
              v-if="
                pak.package_price_role[0].cost_month > 0 ||
                pak.package_price_role[0].cost_yearly > 0 ||
                pak.cost_investor === 0
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
              >
                /{{ $t(packagesStore.discountType) }}
              </span>
            </h3>

            <h3
              v-else-if="pak.type !== 'Investors'"
              class="mt-[16px] text-black dark:text-whiteTamkin font-[600] text-[24px] leading-[29px]"
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
                ${{
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
                ${{
                  pak.package_price_role[0].cost_before_yearly
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </span>
            </div>

            <p
              v-if="pak.type !== 'Investors'"
              class="font-[700] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin"
            >
              {{ $t(pak.description) }}
            </p>

            <div v-else-if="pak.cost_investor > 0">
              <div>
                $
                {{
                  pak.cost_investor
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
              <h2
                class="font-[500] my-[16px] text-[14px] leading-[15px] text-[#536174] dark:text-whiteTamkin"
              >
                {{ $t(pak.description) }}
                <span class="font-[700]"
                  >{{
                    convertUsdToCrypto(pak.cost_investor, cryptoStroe.rates)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                  TSLT</span
                >
              </h2>
            </div>
          </div>
        </div>

        <!-- Package Items -->
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
            <img
              class="w-[16px] h-[16px]"
              :src="
                item.is_available
                  ? '/assets/imgs/checked_list_active.svg'
                  : '/assets/imgs/checked_list_inactive.svg'
              "
            />
            <h3 class="text-[12px] font-[400] leading-[20px]">
              {{ $t(item.title) }}
            </h3>
          </div>

          <!-- Action Button -->
          <div class="flex items-center justify-center mx-auto w-full">
            <button
              @click="openModalToUpgrade(pak)"
              :disabled="
                (pak.cost_month !== 0 && pak.cost_yearly !== 0) ||
                pak.title === 'Free' ||
                (currentPackage?.type === 'Investors' &&
                  mySiteStore.currentPackage?.name === pak.name)
              "
              class="btn-dashboard hover_tamkin w-full !rounded-[19px] mx-auto"
            >
              <!-- Button Text Logic -->
              <span v-if="pak.is_contact_us"> {{ $t("Contact us") }} </span>
              <span
                v-else-if="
                  !isLinkActive('/overview') &&
                  currentPackage?.name === pak.name &&
                  currentPackage?.status !== 'Rejected' &&
                  mySiteStore.currentWebsite?.status !== 'Rejected' &&
                  currentPackage?.status !== 'Cancelled' &&
                  pak.title !== 'Free'
                "
              >
                {{
                  currentPackage?.type !== "Investors"
                    ? $t("Renew")
                    : $t("Current Package")
                }}
              </span>
              <span
                v-else-if="
                  currentPackage?.name === pak.name &&
                  (currentPackage?.status === 'Rejected' ||
                    currentPackage?.status === 'Cancelled')
                "
              >
                {{ $t("Try Again") }}
              </span>
              <span
                v-else-if="
                  pak.trial_days > 0 ||
                  (pak.trial_days === 0 &&
                    pak.cost_month !== 0 &&
                    pak.cost_yearly !== 0)
                "
              >
                {{ pak.trial_days > 0 ? $t("Free Trial") : "" }}
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
    </div>
  </div>
</template>
