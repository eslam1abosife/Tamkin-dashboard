<script lang="ts" setup>
import { useGetSubscriptions } from "@/composables/usePackages";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
import {
  useCancelSubscription,
  useGetTotalAmountPacks,
  useGetRenewdetails,
} from "@/composables/usePackages";
const { locale, t } = useI18n();

useHead({
  title: t("Subscriptions - Tamkin Dashboard"),
});
const { detailsRenew, messageData: rn, codeStatus: rr } = useGetRenewdetails();

const {
  cancelPackage,
  codeStatus: subCodeStatus,
  messageStatus: subMessageStatus,
} = useCancelSubscription();
const { getTotalAmountPackages } = useGetTotalAmountPacks();
const { $toast } = useNuxtApp();
const { getAvatarLetters } = useGetAvatarLetters();
import {
  useDeleteApp,
  useRestoreApp,
  useGetPackage,
} from "@/composables/useMySite";
const { getPackage, messageStatus, codeStatus } = useGetPackage();
const { getSubs } = useGetSubscriptions();
const loadingSubs = ref(false);
const loadingRenews = ref(false);
const localePath = useLocalePath();
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],

  requiredPermission: "subscriptions",
});
const route = useRoute();
const subs = ref([]);
onBeforeMount(() => {});
const isPageRefreshed = ref(false);

onMounted(async () => {
  checkPaymentStatus();
  loadingRenews.value = true;
  loadingSubs.value = true;

  const res = await getSubs();
  subs.value = res;
  loadingSubs.value = false;

  const renewdetails = await detailsRenew();
  subsStore.totalRenews = renewdetails;
  loadingRenews.value = false;
});

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  lastEventCall,
  eventCounter,
  setData,
} = useModalManager();

const configrun = useRuntimeConfig();
const totalAmount = ref();
const isSearchfilled = ref(false);
const search = ref("");
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};

const filterBYTime = ref(0);
const filterByType = ref(0);
const changePeriod = (p) => {
  filterBYTime.value = p;
  if (p || p === 0) {
    filterByType.value = "";
  }
};
const filtertype = (p) => {
  filterByType.value = p;
  if (filterBYTime.value === 0) {
    filterBYTime.value = "";
  } else {
    filterBYTime.value = "";
  }
};

const filteredSubs = computed(() => {
  if (search.value) {
    return subs.value
      .filter((sub) => sub.subscripitions.length > 0) // Check if subscriptions exist
      .filter(
        (sub) =>
          sub.app_domain &&
          sub.app_domain.toLowerCase().includes(search.value.toLowerCase())
      ); // Ensure app_domain is not null or undefined
  }
  return subs.value
    .filter((sub) => sub.subscripitions.length > 0)
    .filter((sub) => {
      // Filter the subscriptions that match the filters
      const filteredSubscriptions = sub.subscripitions.filter((f) => {
        const timeMatch = filterBYTime.value
          ? Number(f.month_difference) === filterBYTime.value
          : true;

        const typeMatch = filterByType.value
          ? f.type && f.type === filterByType.value
          : true;

        return timeMatch && typeMatch;
      });

      // Only return subs where there are matching subscriptions
      return filteredSubscriptions.length > 0;
    });
});

const currentInvoice = ref("");
const currentApp = ref("");
const loadingBlock = ref([]);
const cancelSubscriptionInternal = async () => {
  await cancelPackage(currentInvoice.value, currentApp.value);
  if (subCodeStatus.value === 200) {
    closeModal("cancel_subscription_subs");
    $toast(t("Your subscription has been successfully cancelled."), {
      hideIn: 3000,
    });
    loadingSubs.value = true;
    const res = await getSubs();
    loadingSubs.value = false;

    subs.value = res;
  } else {
    $toast(subMessageStatus.value, { hideIn: 3000, type: "error" });
    closeModal("cancel_subscription_subs");
  }
};
const router = useRouter();

const checkPaymentStatus = async () => {
  if (route.query && route.query.paid && route.query.locale) {
    if (route.query.locale === "ar") {
      await router.push({
        path: "/ar/subscriptions",
        query: { paid: route.query.paid, locale: "ar" },
      });

      openModal("success_pay_mysite", "mysite");
      if (isOpen("success_pay_mysite")) {
        // await router.replace({ query: {} });
      }
    } else {
      openModal("success_pay_mysite", "mysite");
      // await router.replace({ query: {} });
      if (isOpen("success_pay_mysite")) {
        // await router.replace({ query: {} });
      }
    }
  }
};

const mysiteStore = useMySiteStore();
const getPackageAndOpenPaymenModal = async (app, pack) => {
  await loadingBlock.value.push({ app: app.name, pack: pack.package_name });

  mysiteStore.updatePayment = true;

  const packagemodal = await getPackage(pack.package_name);
  mysiteStore.currentWebsite = {
    ...app,
    package: [packagemodal.package],
  };

  await mysiteStore.setCurrentPackage({
    ...packagemodal.package,
    package_price_role: packagemodal.price_roles,
    billing_duration:
      pack.month_difference > 0
        ? Number(pack.month_difference) === 3 && pack.remarks !== "Free Trial"
          ? "3 months"
          : Number(pack.month_difference) === 12 &&
            pack.remarks !== "Free Trial"
          ? "yearly"
          : Number(pack.month_difference) === 1 && pack.remarks !== "Free Trial"
          ? "monthly"
          : "none"
        : "none",
    status: new Date() > new Date(pack.to_date) ? "Expired" : pack.status,
  });

  navigateTo(null, "subscriptions", "add_package_modal_mysite");
  loadingBlock.value.splice({ app: app.name, pack: pack.package_name });
};
const loadingUpgrade = ref([]);
/**
 * Upgrades a website package.
 * @param {Object} app - The website.
 * @param {Object} pack - The package to upgrade to.
 */
const upgradeModalPackage = async (app, pack) => {
  await loadingUpgrade.value.push({ app: app.name, pack: pack.package_name });

  mysiteStore.updatePayment = true;

  const packagemodal = await getPackage(pack.package_name);
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

  navigateTo(null, "subscriptions", "upgrade_mysite_package");
  loadingUpgrade.value.splice({ app: app.name, pack: pack.package_name });
};
const refreshData = async () => {
  loadingSubs.value = true;
  const res = await getSubs();
  subs.value = res;

  loadingSubs.value = false;
};
const subsStore = useSubsStore();
const openRenewall = async () => {
  subsStore.selectedPaymentMethod = "";
  subsStore.selectedCrypto = "";
  subsStore.packagePayload = {
    total: subsStore.totalRenews.reduce((sum, item) => {
      return sum + (item.amount || 0);
    }, 0),
  };
  return navigateTo(null, "subs", "payment_methods_subs");
};
const openInvestor = (app, pack) => {
  mysiteStore.currentWebsite = {
    ...app,
    package: pack,
  };
  openModal("join_to_investor");
};
</script>

<template>
  <div class="w-full mx-auto">
    <PackagesPaymentModalsJoinInvestorStep1
      @update-data="refreshData"
      v-if="isOpen('join_to_investor')"
    />
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <SubsRenewPaymentMethods />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <SubsRenewCard v-if="isOpen('cardModal_subs')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <SubsRenewCryptoStep1 v-if="isOpen('crypto_subs_step1')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <SubsRenewCryptoStep2 v-if="isOpen('crypto_subs_step2')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <SubsRenewPaypal v-if="isOpen('paypal_subs')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySiteUpgrade
        :class="isOpen('shareModal') ? 'z-[99]' : 'z-[9999]'"
        v-if="isOpen('upgrade_mysite_package')"
      />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <!-- Modal for adding a package -->
      <MySitePaymentPackage v-if="isOpen('add_package_modal_mysite')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentPaymentmethods />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentCard v-if="isOpen('cardModal_mysite')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentSuccess
        @updateData="refreshData"
        v-if="isOpen('success_pay_mysite')"
      />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <ProfileBillingModalsAddnewCard v-if="isOpen('add_new_card_billing')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentCryptoStep1 v-if="isOpen('crypto_mysite_step1')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentCryptoStep2 v-if="isOpen('crypto_mysite_step2')" />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentCryptoSuccess v-if="isOpen('success_pay_mysite')" />
    </transition>

    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentCryptoSuccess
        @updateData="refreshData"
        v-if="isOpen('crypto_mysite_success')"
      />
    </transition>
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySitePaymentPaypal />
    </transition>
    <ModalsConfirm
      :show-modal="true"
      v-if="isOpen('cancel_subscription_subs')"
      title="Cancel Subscription"
      sub-title="Are you sure you want to Cancel the subscription?"
      confirm-btn-type="delete"
      deleteButtonName="Cancel Subscription"
      @control-delete="cancelSubscriptionInternal"
      @control-cancel="closeModal('cancel_subscription_subs')"
    />
    <div class="space-y-[10px]">
      <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
        {{ $t("Subscriptions") }}
      </h1>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
        {{
          $t(
            "Subscriptions manage and renew your services plans for continuous access to premium features"
          )
        }}
      </h2>
    </div>

    <div
      v-if="
        !loadingRenews &&
        subs.filter((t) => t.subscripitions.length > 0).length > 0
      "
      style="box-shadow: 0px 4px 12px 0px #00000014"
      class="w-full h-[125px] rounded-[10px] rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#C0CAFF]/[79%] to-white/[79%] dark:to-darkTamkin/[79%] px-[16px] my-[30px] relative flex items-center justify-between"
    >
      <div class="absolute left-[40%] z-10">
        <img
          src="/imgs/subscription_hero.png"
          class="w-[233px] h-[121px]"
          alt=""
        />
      </div>
      <div class="absolute left-[0%]">
        <img
          src="/imgs/subscription_hero.png"
          class="w-[150px] h-[80px]"
          alt=""
        />
      </div>
      <div class="absolute bottom-[60px] right-[0%]">
        <img
          src="/imgs/subscription_hero.png"
          class="w-[156px] h-[59px]"
          alt=""
        />
      </div>
      <div class="flex flex-col items-start justify-start static z-[40]">
        <div
          class="text-[18px] leading-[27px] font-[600] text-[#3D3D3D] dark:text-white dark:drop-shadow-xl"
        >
          ${{
            subsStore.totalRenews.reduce((sum, item) => {
              return sum + (item.amount || 0);
            }, 0)
              ? subsStore.totalRenews
                  .reduce((sum, item) => {
                    return sum + (item.amount || 0);
                  }, 0)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : 0
          }}
        </div>
        <div
          class="text-[13px] font-[500] leading-[19px] text-darkGrey dark:text-white dark:drop-shadow-xl mt-[6px]"
        >
          {{ $t("Total value of renewals") }}
        </div>
      </div>

      <button
        @click="openRenewall"
        class="btn-dashboard hover_tamkin static z-[40] w-[126px]"
      >
        {{ $t("Renew All") }}
      </button>
    </div>

    <div
      v-else-if="loadingRenews"
      class="w-full h-[125px] dark:bg-tamkinDarkPrimary bg-gray-300 animate-pulse my-[30px] rounded-[10px]"
    ></div>

    <div
      class="bg-white dark:bg-tamkinDarkPrimary w-full h-full mt-[32px] rounded-[10px] p-[32px]"
      v-if="
        subs.filter((t) => t.subscripitions.length > 0).length === 0 &&
        !loadingSubs
      "
    >
      <div class="flex flex-col items-center justify-center space-y-[10px]">
        <img src="/imgs/no_subs.png" class="w-[71px] h-[71px]" alt="" />
        <div
          class="text-[14px] leading-[28px] font-[400] text-darkGrey dark:text-white w-f md:w-1/4 text-center"
        >
          {{
            $t(`You don't have any subscriptions in this list at the moment`)
          }}
        </div>

        <button
          @click="$router.push(localePath('/packages'))"
          class="btn-dashboard hover_tamkin w-[158px]"
        >
          {{ $t("Subscribe Now") }}
        </button>
      </div>
    </div>
    <div
      v-else-if="loadingSubs"
      class="bg-gray-300 dark:bg-tamkinDarkPrimary rounded-[10px] h-[273px] w-full animate-pulse"
    ></div>
    <div
      v-if="
        subs.filter((t) => t.subscripitions.length > 0).length > 0 &&
        !loadingSubs
      "
      style="box-shadow: 0px 4px 12px 0px #00000014"
      class="bg-white dark:bg-tamkinDarkPrimary rounded-[10px] w-full h-full px-[16px] py-[28px]"
    >
      <div
        class="flex flex-col md:flex-row items-center md:justify-between w-full space-x-[24px] rtl:space-x-reverse"
      >
        <div class="lg:w-[80%] w-full">
          <div class="py-[17px] search_input">
            <input
              type="text"
              class="input_dashboard_search lg:w-[80%] w-full"
              v-model="search"
              :placeholder="`${$t('Search')} ...`"
            />
            <div
              class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
            >
              <img src="/assets/imgs/icons/search.svg" />
            </div>
            <div
              v-if="isSearchfilled"
              @click="clearInput"
              class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer"
            >
              <img src="/assets/imgs/icons/clear_search.svg" />
            </div>
          </div>
        </div>
        <div
          class="!mx-auto md:!me-0 md:!ms-6 flex items-center rtl:space-x-reverse md:space-x-[8px] space-x-[5px] justify-center flex-wrap md:flex-nowrap"
        >
          <div
            @click="changePeriod(0)"
            :class="[
              filterBYTime === 0 ? 'bg-tamkinLight dark:!text-black' : '',
            ]"
            class="border-[1px] w-fit min-w-9 px-[0.3rem] py-2 md:px-0 md:py-0 md:w-[82px] md:h-[45px] hover:dark:bg-darkSecondary hover:dark:!text-whiteTamkin hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center text-xs md:text-[13px] font-[500] dark:text-whiteTamkin leading-[19.5px]"
          >
            {{ $t("All") }}
          </div>
          <div
            @click="changePeriod(1)"
            :class="[
              filterBYTime === 1 ? 'bg-tamkinLight dark:!text-black' : '',
            ]"
            class="border-[1px] w-fit min-w-9 px-[0.3rem] py-2 md:px-0 md:py-0 md:w-[82px] hover:dark:bg-darkSecondary hover:dark:!text-whiteTamkin md:h-[45px] hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center text-xs md:text-[13px] font-[500] dark:text-whiteTamkin leading-[19.5px]"
          >
            {{ $t("Monthly") }}
          </div>
          <div
            @click="changePeriod(3)"
            :class="[
              filterBYTime === 3 ? 'bg-tamkinLight dark:!text-black' : '',
            ]"
            class="border-[1px] hover:dark:bg-darkSecondary hover:dark:!text-whiteTamkin w-fit min-w-9 px-[0.3rem] py-2 md:px-0 md:py-0 md:w-[82px] md:h-[45px] hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center text-xs md:text-[13px] font-[500] dark:text-whiteTamkin leading-[19.5px]"
          >
            {{ $t("3 Months") }}
          </div>
          <div
            @click="changePeriod(12)"
            :class="[
              filterBYTime === 12 ? 'bg-tamkinLight dark:!text-black' : '',
            ]"
            class="border-[1px] hover:dark:bg-darkSecondary hover:dark:!text-whiteTamkin w-fit min-w-9 px-[0.3rem] py-2 md:px-0 md:py-0 md:w-[82px] md:h-[45px] hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center text-xs md:text-[13px] font-[500] dark:text-whiteTamkin leading-[19.5px]"
          >
            {{ $t("Yearly") }}
          </div>
          <div
            @click="filtertype('Investors')"
            :class="[
              filterByType === 'Investors'
                ? 'bg-tamkinLight dark:!text-black'
                : '',
            ]"
            class="border-[1px] hover:dark:bg-darkSecondary hover:dark:!text-whiteTamkin w-fit min-w-9 px-[0.3rem] py-2 md:px-0 md:py-0 md:w-[82px] md:h-[45px] hover:bg-tamkinLight cursor-pointer border-[#D9D9D9] rounded-[10px] flex items-center justify-center text-xs md:text-[13px] font-[500] dark:text-whiteTamkin leading-[19.5px]"
          >
            {{ $t("Investor") }}
          </div>
        </div>
      </div>
      <div v-if="!loadingSubs">
        <div v-for="(sub, index) in filteredSubs" :key="index">
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[10px] mt-[42px]"
          >
            <div>
              <img
                src="/assets/imgs/icons/mysite_select.svg"
                class="w-[30px] h-[30px]"
                v-if="sub?.title === 'Internal Service'"
              />

              <div
                v-if="!sub?.favicon && sub?.title !== 'Internal Service'"
                class="w-[30px] h-[30px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"
              >
                {{ sub?.title ? getAvatarLetters(sub?.title) : "" }}
              </div>
              <div v-if="sub?.favicon && sub?.title !== 'Internal Service'">
                <img
                  v-if="sub.favicon"
                  :src="sub.favicon"
                  class="w-[30px] h-[30px] rounded-full ipad-max:hidden lg:block hidden"
                />
              </div>
            </div>
            <div
              class="text-darkGrey dark:text-whiteTamkin/80 font-[600] text-[15px]"
            >
              {{ sub.app_domain ? sub.app_domain : $t(`${sub.title}`) }}
            </div>
          </div>
          <div class="relative rounded-xl mt-[19px] overflow-y-auto">
            <div class="">
              <table
                class="table-auto w-full text-sm h-[140px] rounded-[10px] bg-[#F5F9FF] dark:bg-darkGrey"
              >
                <thead>
                  <tr>
                    <th
                      class="w-1/4 border-b text-[13px] font-[500] leading-[19px] text-black p-3 rtl:pr-4 ltr:pl-4 dark:text-white rtl:text-right ltr:text-left border-[#D9D9D9] dark:border-darkborder"
                    >
                      {{ $t("Products") }}
                    </th>
                    <th
                      class="w-1/6 border-b text-[13px] font-[500] leading-[19px] text-black p-3 dark:text-white rtl:text-right ltr:text-left border-[#D9D9D9] dark:border-darkborder"
                    >
                      {{ $t("Status") }}
                    </th>
                    <th
                      class="w-1/6 border-b text-[13px] font-[500] leading-[19px] text-black p-3 dark:text-white rtl:text-right ltr:text-left border-[#D9D9D9] dark:border-darkborder"
                    >
                      {{ $t("Start Billing") }}
                    </th>
                    <th
                      class="w-1/6 border-b text-[13px] font-[500] leading-[19px] whitespace-nowrap text-black p-3 dark:text-white rtl:text-right ltr:text-left border-[#D9D9D9] dark:border-darkborder"
                    >
                      {{ $t("Next Billing") }}
                    </th>
                    <th
                      class="w-1/6 border-b text-[13px] font-[500] leading-[19px] whitespace-nowrap text-black m p-3 dark:text-white rtl:text-right ltr:text-left border-[#D9D9D9] dark:border-darkborder"
                    >
                      {{ $t("Payment Method") }}
                    </th>
                    <th
                      class="w-1/6 border-b rtl:text-right ltr:text-left text-[13px] font-[500] leading-[19px] rtl:pl-[32px] ltr:pr-[32px] text-black p-3 dark:text-white text-center border-[#D9D9D9] dark:border-darkborder"
                    >
                      {{ $t("Action") }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-[#F5F9FF] dark:bg-darkGrey">
                  <tr
                    v-for="sb in sub.subscripitions.filter((f) => {
                      // Time filter: checks if filterBYTime.value exists and matches the month_difference value
                      const timeMatch = filterBYTime
                        ? Number(f.month_difference) === filterBYTime
                        : true;

                      // Type filter: Ensures that type is not empty and matches filterByType.value
                      const typeMatch = filterByType
                        ? f.type && f.type === filterByType
                        : f.type
                        ? true
                        : false;

                      // Return only subscriptions where both filters match
                      return timeMatch && typeMatch;
                    })"
                    :key="sb.name"
                  >
                    <td
                      class="w-2/6 text-[14px] leading-[21px] font-[600] p-3 border-b border-[#D9D9D9] dark:border-darkborder text-black dark:text-white"
                    >
                      <div
                        class="flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <img
                          :src="
                            configrun.public.baseImagerUrl + sb.package_icon
                          "
                          class="w-[20px] h-[20px] object-cover rounded-full overflow-hidden"
                          alt="Image"
                        />
                        <span class="whitespace-nowrap">
                          {{
                            $t(
                              sb.package_title
                                .split(" ")
                                .filter((t) => t !== "Buy")
                                .join(" ")
                            )
                          }}
                          <span v-if="sub.title === 'Internal Service'"
                            >- {{ $t(`${sb.extreatype}`) }}</span
                          >
                          <span class="font-[400]">
                            - {{ $t(`${sb.type}`) }}</span
                          ></span
                        >
                      </div>
                    </td>

                    <td
                      :class="
                        sb.status === 'active' || sb.status === 'Active'
                          ? 'text-tamkin '
                          : sb.status === 'Pending' || sb.status === 'Pendding'
                          ? 'text-orange-400'
                          : 'text-red-600'
                      "
                      class="capitalize w-1/6 whitespace-nowrap text-[14px] p-3 leading-[21px] font-[600] border-b border-[#D9D9D9] dark:border-darkborder text-black dark:text-white"
                    >
                      {{
                        $t(`${sb.status[0].toUpperCase() + sb.status.slice(1)}`)
                      }}
                    </td>
                    <td
                      class="w-1/6 p-3 text-[14px] whitespace-nowrap leading-[21px] font-[500] border-b border-[#D9D9D9] dark:border-darkborder text-black dark:text-white whitespace-nowrap"
                    >
                      {{
                        new Date(sb.from_date).toLocaleDateString(
                          locale === "ar" ? "ar-EG" : "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      }}
                    </td>
                    <td
                      class="w-1/6 p-3 text-[14px] leading-[21px] whitespace-nowrap font-[500] border-b border-[#D9D9D9] dark:border-darkborder text-black dark:text-white whitespace-nowrap"
                    >
                      {{
                        sb.package_type !== "Extra" && sb.type !== "Investors"
                          ? new Date(sb.to_date).toLocaleDateString(
                              locale === "ar" ? "ar-EG" : "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "-"
                      }}
                    </td>

                    <td
                      class="w-1/6 p-3 text-[14px] leading-[21px] font-[500] border-b border-[#D9D9D9] dark:border-darkborder text-black dark:text-white whitespace-nowrap"
                    >
                      <div class="!w-[140px] truncate">
                        {{ $t(sb.mode_of_payment) }}
                        {{
                          sb.remarks !== "Free Trial" && sb.type !== "Investors"
                            ? " - " + $t(`${sb.remarks}`)
                            : $t(
                                sb.remarks
                                  .toLowerCase()
                                  .replace(/[^a-zA-Z0-9]+/g, " ") // Replace non-alphanumeric characters with spaces
                                  .replace(/\b\w/g, (chr) => chr.toUpperCase()) // Capitalize the first letter of each word
                              )
                        }}
                      </div>
                    </td>
                    <td
                      class="text-[14px] p-3 leading-[21px] font-[500] border-b border-[#D9D9D9] dark:border-darkborder text-black dark:text-white whitespace-nowrap"
                    >
                      <div
                        class="flex items-center justify-center rtl:space-x-reverse space-x-[8px] rtl:pl-[12px] ltr:pr-[12px]"
                      >
                        <button
                          :disabled="
                            sb.package_type === 'Addons' ||
                            sb.package_type === 'Extra' ||
                            (sb.status === 'Pending' && sb.type !== 'Investors')
                          "
                          class="disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer relative group"
                          @click.stop="
                            sb.type === 'Investors'
                              ? openInvestor(sub, sb)
                              : upgradeModalPackage(sub, sb)
                          "
                        >
                          <svg
                            v-if="
                              loadingUpgrade.find(
                                (entry) =>
                                  entry.pack === sb.package_name &&
                                  entry.app === sub.name
                              )
                            "
                            class="animate-spin h-5 w-5 text-tamkin"
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
                          <svg
                            v-else
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            class="size-5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="18"
                              height="18"
                              rx="9"
                              fill="#61BDAD"
                            />
                            <path
                              d="M9 3L3 7.08517V9.9068L9 5.82163L15 9.9068V7.08517L9 3ZM9 6.39661L5.07792 9.10035V11.4953L9 8.79152L12.9221 11.4953V9.10035L9 6.39661ZM9 9.36764L6.74026 10.9254V12.7187L9 11.1801L11.2597 12.7187V10.9254L9 9.36764ZM9 11.7539L6.74026 13.2925V15L9 13.4614L11.2597 15V13.2925L9 11.7539Z"
                              fill="white"
                            />
                          </svg>

                          <!-- Tooltip -->
                          <div
                            class="absolute top-[-25px] rtl:left-[20%] ltr:right-[20%] w-[100px] bg-[#747171] text-white text-[10px] px-[4px] leading-[15px] font-[500] rounded-md py-1 hidden group-hover:block transition-opacity duration-200 z-[500]"
                          >
                            {{ $t("Upgrade Package") }}
                          </div>
                        </button>

                        <button
                          :disabled="
                            sb.package_type === 'Extra' ||
                            sb.status === 'Pending' ||
                            sb.type === 'Investors'
                          "
                          class="disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer relative group"
                          @click.stop="getPackageAndOpenPaymenModal(sub, sb)"
                        >
                          <svg
                            v-if="
                              loadingBlock.find(
                                (entry) =>
                                  entry.pack === sb.package_name &&
                                  entry.app === sub.name
                              )
                            "
                            class="animate-spin h-5 w-5 text-tamkin"
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

                          <svg
                            v-else
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            class="size-5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                          >
                            <rect
                              width="18"
                              height="18"
                              fill="url(#pattern0_11966_4756)"
                            />
                            <defs>
                              <pattern
                                id="pattern0_11966_4756"
                                patternContentUnits="objectBoundingBox"
                                width="1"
                                height="1"
                              >
                                <use
                                  xlink:href="#image0_11966_4756"
                                  transform="translate(-0.132812 -0.132812) scale(0.0140625)"
                                />
                              </pattern>
                              <image
                                id="image0_11966_4756"
                                width="90"
                                height="90"
                                xlink:href="data:image/png;base64,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"
                              />
                            </defs>
                          </svg>

                          <!-- Tooltip -->
                          <div
                            class="absolute top-[-25px] rtl:left-[10%] ltr:right-[10%] w-[80px] bg-[#747171] text-white text-[10px] px-[4px] leading-[15px] font-[500] rounded-md py-1 hidden group-hover:block transition-opacity duration-200"
                          >
                            {{ $t("Upgrade Plan") }}
                          </div>
                        </button>
                        <button
                          :disabled="
                            sb.package_type === 'Extra' ||
                            sb.status === 'Pending' ||
                            sb.type === 'Investors' ||
                            sb.status === 'Expired' ||
                            sb.status === 'expire'
                          "
                          class="disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer relative group"
                          @click="
                            () => {
                              currentApp = sub.name;
                              currentInvoice = sb.package_name;
                              openModal('cancel_subscription_subs');
                            }
                          "
                        >
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            class="size-[20px]"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                          >
                            <rect
                              width="19"
                              height="19"
                              fill="url(#pattern0_11966_4757)"
                            />
                            <defs>
                              <pattern
                                id="pattern0_11966_4757"
                                patternContentUnits="objectBoundingBox"
                                width="1"
                                height="1"
                              >
                                <use
                                  xlink:href="#image0_11966_4757"
                                  transform="translate(-0.0625 -0.0625) scale(0.0125)"
                                />
                              </pattern>
                              <image
                                id="image0_11966_4757"
                                width="90"
                                height="90"
                                xlink:href="data:image/png;base64,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"
                              />
                            </defs>
                          </svg>
                          <div
                            class="absolute top-[-25px] rtl:left-[10%] ltr:right-[10%] rtl:w-[82px] ltr:w-[110px] bg-[#747171] text-white text-[10px] px-[4px] leading-[15px] font-[500] rounded-md py-1 hidden group-hover:block transition-opacity duration-200"
                          >
                            {{ $t("Cancel Subscription") }}
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div
          class="flex mt-[42px] flex-col justify-start rounded-[10px] pt-[12px] pb-[16px] mb-[16px] bg-white dark:bg-tamkinDarkPrimary"
          v-for="t in 3"
        >
          <div class="relative lg:overflow-x-hidden overflow-x-auto w-full">
            <table
              class="table-auto divide-y last:border-b dark:last:border-b-darkborder w-full divide-gray-200 dark:divide-darkborder"
            >
              <thead>
                <tr>
                  <th
                    class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin rtl:pr-[8px] ltr:pl-[8px] rtl:lg:pr-[16px] ltr:lg:pl-[16px]"
                  >
                    <div
                      class="w-[100px] h-[20px] bg-gray-300 rounded animate-pulse"
                    ></div>
                  </th>
                  <th
                    class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div
                      class="w-[200px] h-[20px] bg-gray-300 rounded animate-pulse"
                    ></div>
                  </th>
                  <th
                    class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div
                      class="w-[150px] h-[20px] bg-gray-300 rounded animate-pulse"
                    ></div>
                  </th>
                  <th
                    class="py-3.5 pr-[8px] text-center text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div
                      class="w-3/4 h-[20px] bg-gray-300 rounded animate-pulse"
                    ></div>
                  </th>
                </tr>
              </thead>
              <tbody
                class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200 dark:divide-darkborder w-full"
              >
                <tr v-for="index in 2" :key="index">
                  <td
                    class="lg:pr-0 pr-[100px] rtl:lg:pr-[16px] ltr:lg:pl-[16px] text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div
                      class="flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
                    >
                      <div
                        class="w-[30px] h-[30px] bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"
                      ></div>
                      <div
                        class="w-[150px] h-[20px] bg-gray-300 dark:bg-gray-600 rounded animate-pulse"
                      ></div>
                    </div>
                  </td>
                  <td
                    class="py-4 ltr:text-left rtl:text-right text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div
                      class="w-[200px] h-[20px] bg-gray-300 rounded animate-pulse"
                    ></div>
                  </td>
                  <td
                    class="py-4 text-center text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div
                      class="w-[150px] h-[20px] bg-gray-300 rounded animate-pulse"
                    ></div>
                  </td>
                  <td
                    class="py-4 text-center text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                  >
                    <div
                      class="w-[90px] h-[20px] bg-gray-300 rounded animate-pulse"
                    ></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      ​

      <Noresult
        v-if="filteredSubs.length === 0 && subs.length && !loadingSubs"
      />
    </div>
  </div>
</template>
