<script lang="ts" setup>
const { locale, t } = useI18n();
const navbarStore = useNavbarStore();
import { useModalManager } from "@/composables/useModalManager";
import { useVuelidate } from "@vuelidate/core";
import { useGetAppInvites, useUpdateDefaultApp } from "@/composables/useTeam";
import {
  useDeleteApp,
  useRestoreApp,
  useGetPackage,
} from "@/composables/useMySite";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
import { useCancelSubscription } from "@/composables/usePackages";
definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
  requiredPermission: "my-site",
});
useHead({
  title: t("My Site - Tamkin Dashboard"),
});
const { $toast } = useNuxtApp();

const { updateDefaultApp, loading: submitLoading } = useUpdateDefaultApp();
const { getPackage, messageStatus, codeStatus } = useGetPackage();
const {
  getInviteApps,
  defaultApp,
  apps,
  loading: getSitesLoading,
} = useGetAppInvites();
const { getAvatarLetters } = useGetAvatarLetters();
const mysiteStore = useMySiteStore();
const { loadingBlock } = storeToRefs(mysiteStore);
const {
  cancelPackage,
  codeStatus: subCodeStatus,
  messageStatus: subMessageStatus,
} = useCancelSubscription();
const route = useRoute();
const router = useRouter();
const getApps = async () => {
  mysiteStore.loadingApps = true;
  const user = JSON.parse(localStorage.getItem("user"));
  await getInviteApps({ agency: user.agency });
  mysiteStore.loadingApps = false;
};
onMounted(async () => {
  getApps();
  checkPaymentStatus();
});
onUpdated(async () => {
  if (route.query && route.query.ping) {
    scrollToTarget();
  }
});
const scrollToTarget = () => {
  console.log("route.query.ping:", route.query.ping);
  const divel = document.getElementById(route.query.ping as string);

  if (divel) {
    divel.scrollIntoView({ behavior: "smooth" });

    divel.classList.add("ping-effect");

    setTimeout(() => {
      divel.classList.remove("ping-effect");
    }, 1000);
  } else {
    console.log("Element not found:", route.query.ping);
  }
};

watch(
  () => route.query.ping,
  (newQuery) => {
    scrollToTarget();
  }
);
import { required, email, sameAs } from "@vuelidate/validators";
import { watch, computed, ref } from "vue";

const state = reactive({
  teamName: "",
});
const rules = {
  teamName: { required },
};

const v$ = useVuelidate(rules, state);

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
const dataAvailable = ref(true);
const editTeamNameMode = ref(false);

const currentTab = ref("saved");

const switchTab = (tab: any) => {
  currentTab.value = tab;
  currentPage.value = 1;
};

const localePath = useLocalePath();
const isSearchfilled = ref(false);
const search = ref("");
watch(search, (ov, nv) => {
  currentPage.value = 1;
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};

const visiblePages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxVisiblePages / 2)
  );
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages.value) {
    endPage = totalPages.value;
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const perPageOptions = ref([5, 10, 20]);
const perPage = ref(perPageOptions.value[0]);
const currentPage = ref(1);
const totalPages = computed(() =>
  Math.ceil(appList.value.length / perPage.value)
);

const changePerPage = (option: number) => {
  perPage.value = option;
  currentPage.value = 1;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  } else {
    return num.toString();
  }
};

const currAppName = ref(null);
const openDeleteMember = (appName) => {
  navigateTo(null, "mysite", "deleteApp");
  currAppName.value = appName;
};

const openRestoreApp = (appName) => {
  navigateTo(null, "mysite", "restoreApp");
  currAppName.value = appName.name;
};

const toastAppear = ref(false);
const toastMsg = ref(null);

watch(eventCounter, async () => {
  toastAppear.value = false;
  toastMsg.value = null;

  if (lastEventCall.value === "deleteApp") {
    const { deleteApp } = useDeleteApp();

    // Log the current app and default app names
    console.log("Current App Name:", currAppName.value);
    // console.log("Default App Name:", defaultApp.value.name);

    // Check if the current app being deleted is the default app
    // if (currAppName.value.name === defaultApp.value.name) {
    //   const currentIndex = appList.value.findIndex(
    //     (app) => app.title === currAppName.value.title
    //   );

    //   let nextApp = null; // Set the next app to null (empty)

    //   // Log the current index and app list
    //   console.log("Current Index:", currentIndex);
    //   console.log("App List:", appList.value);

    //   // Check if the app being deleted is the last one in the list
    //   if (currentIndex === -1 || currentIndex === appList.value.length - 1) {
    //     // No need to find a specific app, just set it to null
    //     nextApp = "";
    //   } else {
    //     // Otherwise, set the next app in the list as nextApp
    //     nextApp = appList.value[currentIndex + 1];
    //   }

    //   // Log next app and update the default app if valid
    //   console.log("Next App Before Updating Default:", nextApp);

    //   // If nextApp is valid, set it as default. Otherwise, set it to null (empty).
    //   if (nextApp) {
    //     console.log("Calling updateDefaultApp with:", nextApp.name);
    //     // await updateDefaultApp(nextApp.name);
    //   } else {
    //     console.log("No valid next app found. Setting default to empty.");
    //     // await updateDefaultApp(""); // Set the default app to empty
    //   }
    // }

    // Delete the app
    await deleteApp(currAppName.value.name);
    console.log("App deleted, proceeding to update default app.");
    await getApps();

    // Close modal and update UI
    closeModal("deleteApp");
    currentTab.value = "deleted";
    $toast(t("deleted successfully!"), { hideIn: 3000 });
  } else if (lastEventCall.value === "restoreApp") {
    const { restoreApp } = useRestoreApp();
    await restoreApp(currAppName.value);
    closeModal("restoreApp");
    currentTab.value = "saved";
    toastMsg.value = "restored successfully!";
  }

  // Reset current page and show the toast
  currentPage.value = 1;
  toastAppear.value = true;

  // Refresh app list
  getApps();
});

const deletedAppListLength = computed(() => {
  return apps.value.filter((ele) => ele.status === "deleted").length;
  // .filter((ele) =>
  //   ele.title
  //     .toLowerCase()
  //     .includes(search.value.toString().toLowerCase().trim())
  // ).length;
});

const notDeletedAppListLength = computed(() => {
  return apps.value.filter((ele) => {
    // ;
    const isNotDeleted = ele.status !== "deleted" && ele.status !== "draft";
    const isNotInternal = ele.title !== "Internal Service";
    const matchesSearch = ele.title
      .toLowerCase()
      .includes(search.value.toString().toLowerCase().trim());

    return isNotDeleted && isNotInternal && matchesSearch;
  }).length;
});

const appList = computed(() => {
  if (currentTab.value !== "internal") {
    const translatedSearchValue = search.value.toLowerCase().trim();
    return apps.value.filter((ele) => {
      if (currentTab.value === "deleted") {
        return (
          ele.status === "deleted" &&
          ele.type !== "Internal Services" &&
          (ele.title.toLowerCase().includes(translatedSearchValue) ||
            ele.app_domain.toLowerCase().includes(translatedSearchValue))
        );
      } else {
        return (
          ele.status !== "deleted" &&
          ele.type !== "Internal Services" &&
          (ele.title.toLowerCase().includes(translatedSearchValue) ||
            ele.app_domain.toLowerCase().includes(translatedSearchValue))
        );
      }
    });
  } else {
    return apps.value
      .find((t) => t.title === "Internal Service")
      .package.filter((ele) => {
        const translatedTitle = ele.title.toLowerCase().trim();
        const titleForSearch =
          currentTab.value === "internal"
            ? t(`${ele.title}`).toLowerCase().trim() +
              " - " +
              t(`${ele.package_category}`).toLowerCase().trim()
            : translatedTitle;

        const translatedSearchValue = search.value.toLowerCase().trim();

        return titleForSearch.includes(translatedSearchValue);
      });
  }
});
const currentListOpen = ref();

const paginatedFilteredAppList = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage.value;
  const endIndex = startIndex + perPage.value;

  return appList.value.slice(startIndex, endIndex);
});
const runtimeConfig = useRuntimeConfig();
const formatToUrl = (domain) => {
  if (!/^https?:\/\//i.test(domain)) {
    domain = "https://" + domain;
  }
  return domain;
};

const loadingPackage = ref([]);
const getPackageAndOpenPaymenModal = async (app, pack) => {
  if (pack) {
    await loadingBlock.value.push({ app: app, pack: pack });

    if (
      new Date(app.package.find((k) => k.name === pack).endpackage) <
        new Date() ||
      app.package.find((k) => k.name === pack).status === "Cancelled" ||
      app.package.find((k) => k.name === pack).status === "Rejected" ||
      app.package.find((k) => k.name === pack).status === "Expired" ||
      app.package.find((k) => k.name === pack).title === "Free" ||
      app.package.find((k) => k.name === pack).cancel_package
    ) {
      mysiteStore.updatePayment = true;

      loadingBlock.value.push({ app: app, pack: pack });

      mysiteStore.currentWebsite = app;

      const packagemodal = await getPackage(
        app.package.find((k) => k.name === pack).name
      );

      await mysiteStore.setCurrentPackage({
        ...packagemodal.package,
        package_price_role: packagemodal.price_roles,
        billing_duration: app.package.find((k) => k.name === pack)
          .billing_duration,
        type: app.package.find((k) => k.name === pack).type,
        status:
          app.package.find((k) => k.name === pack).type !== "Investors" &&
          new Date() >
            new Date(app.package.find((k) => k.name === pack).endpackage)
            ? "Expired"
            : app.package.find((k) => k.name === pack).type === "Investors"
            ? app.package.find((k) => k.name === pack).investor_status
            : app.package.find((k) => k.name === pack).status,
      });

      if (app.package.find((k) => k.name === pack).type !== "Investors") {
        navigateTo(null, "mysite", "upgrade_mysite_package");
      } else if (
        app.package.find((k) => k.name === pack).type === "Investors"
      ) {
        openInvestor(
          app,
          app.package.find((k) => k.name === pack)
        );
      }
      loadingBlock.value.splice({ app: app, pack: pack });
    } else {
      // if(app.title === 'Internal Service'){
      //   mysiteStore.updatePayment = false
      // }
      // if(app.title !== 'Internal Service') {
      mysiteStore.updatePayment = true;
      // }
      // alert(mysiteStore.updatePayment)

      // console.log('here apps',app.package.find(k=>k.name === pack).name)
      const packagemodal = await getPackage(
        app.package.find((k) => k.name === pack).name
      );

      await mysiteStore.setCurrentPackage({
        ...packagemodal.package,
        package_price_role: packagemodal.price_roles,
        billing_duration: app.package.find((k) => k.name === pack)
          .billing_duration,
      });

      // mysiteStore.currentPackage = app.package ? :null
      mysiteStore.currentWebsite = app;
      mysiteStore.openedCurrentSite = true;
      // mysiteStore.selectedApp = ""

      navigateTo(null, "mysite", "add_package_modal_mysite");
      loadingBlock.value.splice({ app: app, pack: pack });
    }
  } else {
    loadingBlock.value.push({ app: app });
    mysiteStore.updatePayment = false;
    mysiteStore.currentType = "Sign language";
    mysiteStore.currentWebsite = app;
    navigateTo(null, "mysite", "upgrade_no_package");
    loadingBlock.value.splice({ app: app });
  }
};
const pcktype = ref({
  name: "Sign language",
  id: 1,
});
const typesOfPackages = ref([
  {
    name: "Accessibility",
    id: 2,
  },
  {
    name: "Sign language",
    id: 1,
  },
]);
const getPackType = (pk) => {
  pcktype.value = pk;
};
const checkPaymentStatus = async () => {
  if (route.query && route.query.paid && route.query.locale) {
    if (route.query.locale === "ar") {
      await router.push({
        name: route.name,
        query: { paid: route.query.paid, locale: "ar" },
      });

      await nextTick();
      openModal("success_pay_mysite", "mysite");
    } else {
      openModal("success_pay_mysite", "mysite");
    }
  }
};

const internalServiceApp = computed(() => {
  return apps.value.length
    ? apps.value.find((t) => t.title === "Internal Service")
    : false;
});
const capitalizeFirstLetter = (str) => {
  if (!str) return str; // Return the string if it's empty or undefined
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const cancelSubscriptionInternal = async () => {
  await cancelPackage(
    mysiteStore.currentInvoice,
    mysiteStore.currentWebsite.name
  );
  if (subCodeStatus.value === 200) {
    closeModal("cancel_subscription_internal");
    $toast(t("Your subscription has been successfully cancelled."), {
      hideIn: 3000,
    });
    await getApps();
  } else {
    $toast(subMessageStatus.value, { hideIn: 3000, type: "error" });
    closeModal("cancel_subscription_internal");
  }
};
const refreshData = async () => {
  await getApps();
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
  <div class="w-full">
    <PackagesPaymentModalsJoinInvestorStep1
      @update-data="refreshData"
      v-if="isOpen('join_to_investor')"
    />

    <ModalsConfirm
      :show-modal="true"
      v-if="isOpen('cancel_subscription_internal')"
      title="Cancel Subscription"
      sub-title="Are you sure you want to Cancel the subscription?"
      confirm-btn-type="delete"
      deleteButtonName="Cancel Subscription"
      @control-delete="cancelSubscriptionInternal"
      @control-cancel="closeModal('cancel_subscription_internal')"
    />
    <transition
      :name="locale === 'ar' ? 'slide-left' : 'slide-right'"
      mode="out-in"
    >
      <MySiteNopackagebuy
        :class="isOpen('shareModal') ? 'z-[99]' : 'z-[9999]'"
        v-if="isOpen('upgrade_no_package')"
      />
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
      <MySitePaymentSuccess v-if="isOpen('success_pay_mysite')" />
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
      <MySitePaymentPaypal />
    </transition>
    <div class="space-y-[10px]">
      <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
        {{ $t("My Site") }}
      </h1>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
        {{
          $t(
            "Add your website domain to access Tamkin services, unlocking enhanced features and better online integration"
          )
        }}
      </h2>
    </div>

    <div
      class="mt-[18px] flex items-center justify-start rtl:space-x-reverse space-x-[16px] md:space-x-[36px]"
    >
      <div>
        <button
          class="btn-dashboard-normal normal_hover text-[14px] leading-[24px] font-[500]"
          @click.stop="$router.push(localePath('/add-site'))"
        >
          {{ $t("Add New Site") }}
        </button>
      </div>
      <div>
        <button
          @click.stop="$router.push(localePath('/packages'))"
          class="btn_bordered_dashboard normal_hover bg-white text-[14px] leading-[24px] font-[500]"
        >
          {{ $t("Upgrade Plans") }}
        </button>
      </div>
    </div>

    <div
      v-if="!mysiteStore.loadingApps"
      class="ipad-max:mt-[24px] mt-[44px] flex xl:space-y-0 space-y-[16px] items-center xl:flex-row flex-col justify-center xl:justify-start w-full rtl:space-x-reverse xl:space-x-[24px]"
    >
      <div
        class="flex items-center xl:flex-row flex-col justify-start px-[16px] py-[23px] w-full bg-white dark:bg-tamkinDarkPrimary md:h-[170px] h-[150px] xl:h-[129px] rounded-[10px]"
        style="box-shadow: 0px 4px 24px 8px #51459f1a"
      >
        <div class="w-full space-y-[16px]">
          <div>
            <h1
              class="font-[500] text-[16px] leading-[20px] text-darkGrey dark:text-whiteTamkin/90"
            >
              {{ $t("Select your default site") }}
            </h1>
          </div>

          <div
            class="flex items-end sm:items-center justify-between flex-col sm:flex-row"
          >
            <div
              class="flex items-center justify-between sm:justify-start w-full rtl:space-x-reverse space-x-[8px]"
            >
              <div class="flex items-center justify-between gap-3">
                <div
                  v-if="!mysiteStore.loadingApps && !defaultApp?.favicon"
                  class="w-[40px] h-[40px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"
                >
                  <!-- <span v-if="!apps.length"> -->
                  <span>
                    <img
                      src="/assets/imgs/icons/mysite_select.svg"
                      class="w-[40px] h-[40px]"
                    />
                  </span>

                  <!-- <span v-else>
                {{
                  defaultApp&&  defaultApp?.title ? getAvatarLetters(defaultApp?.title) : ""
                }}
               </span> -->
                </div>
                <div>
                  <h2
                    class="font-[500] text-[14px] leading-[14px] dark:text-whiteTamkin text-darkGrey underline"
                  >
                    <span v-if="defaultApp && defaultApp?.app_domain">
                      {{ defaultApp?.app_domain || $t(`${defaultApp?.title}`) }}
                    </span>
                    <span v-else>
                      {{ $t("No Site Selected!") }}
                    </span>
                  </h2>
                </div>
              </div>
              <div
                v-if="
                  !mysiteStore.loadingApps && defaultApp && defaultApp?.favicon
                "
              >
                <img
                  v-if="defaultApp && defaultApp.favicon"
                  :src="defaultApp.favicon"
                  class="w-[40px] h-[40px] rounded-full ipad-max:hidden lg:block hidden"
                />
              </div>

              <div class="flex items-center rtl:space-x-reverse space-x-[16px]">
                <div>
                  <a
                    :href="
                      defaultApp ? formatToUrl(defaultApp.app_domain) : '#'
                    "
                    :target="defaultApp ? '_blank' : ''"
                    class="text-tamkin font-[500] text-[14px] leading-[24px] flex"
                    :class="[
                      !defaultApp
                        ? '!text-darkGrey/40 dark:!text-white/70 cursor-not-allowed'
                        : '!text-tamkinStart',
                    ]"
                  >
                    {{ $t("Visit Site") }}
                    <svg
                      data-slot="icon"
                      class="size-6 ltr:ml-[10px] rtl:mr-[10px]"
                      fill="none"
                      stroke-width="1.5"
                      :class="[
                        !defaultApp
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

            <div>
              <button
                :disabled="mysiteStore.loadingApps || !apps.length"
                @click.stop="openModal('selectSite', 'my-site')"
                class="btn_bordered_dashboard text-[14px] w-[110px] leading-[22.5px] font-[500]"
              >
                {{ $t("Select Site") }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style="box-shadow: 0px 4px 24px 8px #51459f1a"
        class="relative h-[129px] w-full dark:bg-tamkinDarkPrimary dark:text-whiteTamkin bg-white rounded-[10px] flex items-center justify-start"
      >
        <div
          class="flex flex-col space-y-[4px] items-start justify-center p-[16px]"
        >
          <div
            class="h-[30px] w-[300px] rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#096BEB]/[14%] px-[10px] relative py-[4.5px] to-white dark:to-tamkinDarkPrimary flex items-center justify-start space-x-6"
          >
            <div class="text-[14px] font-[500] leading-[21px]">
              {{ $t("My Sites") }}
            </div>

            <div
              class="text-[14px] font-[500] leading-[21px] absolute start-24"
            >
              {{ apps.filter((ap) => ap.title !== "Internal Service").length }}
            </div>
          </div>

          <div
            class="h-[30px] w-[300px] rtl:bg-gradient-to-l ltr:bg-gradient-to-r dark:from-[#2b3f3d] from-[#A3F0EA] px-[10px] py-[4.5px] relative to-white dark:to-tamkinDarkPrimary flex items-center justify-start space-x-6"
          >
            <div class="text-[14px] font-[500] leading-[21px]">
              {{ $t("Active") }}
            </div>
            <div
              class="text-[14px] font-[500] leading-[21px] absolute start-24"
            >
              {{
                apps.filter(
                  (el) =>
                    el.status !== "deleted" &&
                    el.title !== "Internal Service" &&
                    el.package.length &&
                    el.package[0] &&
                    el.package[0].status === "Active"
                ).length
              }}
            </div>
          </div>
          <div
            class="h-[30px] w-[300px] rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#FFD9D9] dark:from-[#977474] px-[10px] py-[4.5px] relative to-white dark:to-tamkinDarkPrimary flex items-center justify-start space-x-6"
          >
            <div class="text-[14px] font-[500] leading-[21px]">
              {{ $t("Not installed") }}
            </div>
            <div
              class="text-[14px] font-[500] leading-[21px] absolute start-24"
            >
              {{
                apps.filter(
                  (el) =>
                    el.status !== "deleted" &&
                    el.title !== "Internal Service" &&
                    el.package &&
                    el.package[0] &&
                    el.package[0].status === "not_installed"
                ).length
              }}
            </div>
          </div>
        </div>
        <div class="absolute top-[11px] md:top-0 end-[-10px] md:end-[-26px]">
          <img
            :src="`/imgs/${
              navbarStore.isDark ? 'mysite_dark.png' : 'mysite.svg'
            }`"
            alt=""
            class="h-full w-[170px] md:w-[210px] rtl:scale-x-[-1]"
          />
        </div>
      </div>
    </div>
    <div
      v-if="mysiteStore.loadingApps"
      class="ipad-max:mt-[24px] mt-[44px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col justify-center lg:justify-start w-full rtl:space-x-reverse lg:space-x-[24px]"
    >
      <!-- Placeholder Container -->
      <div
        class="flex animate-pulse items-center lg:flex-row flex-col justify-start px-[16px] py-[23px] bg-white dark:bg-gray-700 w-full md:h-[170px] h-[150px] lg:h-[129px] rounded-[10px]"
        style="box-shadow: 0px 4px 24px 8px #51459f1a"
      >
        <!-- Placeholder Content -->
        <div class="w-full space-y-[16px]">
          <!-- Header Placeholder -->
          <div class="bg-gray-300 h-[20px] rounded-md dark:bg-p">
            <!-- Placeholder for Title -->
          </div>

          <!-- Body Content Placeholder -->
          <div
            class="flex flex-col lg:flex-row items-start lg:space-y-0 space-y-[10px] lg:items-center justify-between"
          >
            <!-- Placeholder for Image and Text -->
            <div
              class="flex items-center justify-start rtl:space-x-reverse space-x-[8px]"
            >
              <div
                class="w-[40px] h-[20px] bg-gray-300 dark:bg-p rounded-md"
              ></div>
              <div class="flex items-center rtl:space-x-reverse space-x-[16px]">
                <div
                  class="w-[100px] h-[14px] dark:bg-p bg-gray-300 rounded-md"
                ></div>
                <div
                  class="w-[120px] h-[14px] dark:bg-p bg-gray-300 rounded-md"
                ></div>
              </div>
            </div>

            <!-- Placeholder for Button -->
            <div>
              <div
                class="w-[100px] h-[30px] dark:bg-p bg-gray-300 rounded-md"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        style="box-shadow: 0px 4px 24px 8px #51459f1a"
        class="relative dark:bg-tamkinDarkPrimary h-[129px] w-full bg-white rounded-[10px] flex items-center justify-start animate-pulse"
      >
        <div
          class="flex flex-col space-y-[4px] items-start justify-center p-[16px]"
        >
          <!-- Placeholder for "My Sites" -->
          <div
            class="h-[30px] w-full relative py-[4.5px] to-white flex items-center justify-start space-x-6"
          >
            <div class="h-[21px] w-full dark:bg-p bg-gray-200 rounded"></div>
            <!-- Placeholder for text -->
            <div
              class="h-[21px] w-[30px] dark:bg-p bg-gray-200 rounded absolute rtl:right-28 ltr:left-24"
            ></div>
            <!-- Placeholder for number -->
          </div>

          <!-- Placeholder for "Active" -->
          <div
            class="h-[30px] w-full relative py-[4.5px] to-white flex items-center justify-start space-x-6"
          >
            <div class="h-[21px] w-full dark:bg-p bg-gray-200 rounded"></div>
            <!-- Placeholder for text -->
            <div
              class="h-[21px] w-[30px] dark:bg-p bg-gray-200 rounded absolute rtl:right-28 ltr:left-24"
            ></div>
            <!-- Placeholder for number -->
          </div>

          <!-- Placeholder for "Not installed" -->
          <div
            class="h-[30px] w-full relative py-[4.5px] to-white flex items-center justify-start space-x-6"
          >
            <div class="h-[21px] w-[100px] dark:bg-p bg-gray-200 rounded"></div>
            <!-- Placeholder for text -->
            <div
              class="h-[21px] w-[30px] dark:bg-p bg-gray-200 rounded absolute rtl:right-28 ltr:left-24"
            ></div>
            <!-- Placeholder for number -->
          </div>
        </div>

        <!-- Placeholder for image -->
        <div class="absolute top-0 right-[-26px]">
          <div class="h-full w-[210px] dark:bg-p bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <section class="w-full mx-auto mt-[24px]">
      <div
        class="flex flex-col"
        v-if="dataAvailable && !mysiteStore.loadingApps"
      >
        <div class="inline-block min-w-full align-middle">
          <div
            class="flex flex-col justify-start overflow-y-auto rounded-[10px] pt-[12px] pb-[16px] mb-[16px] bg-white dark:bg-tamkinDarkPrimary"
            style="box-shadow: 0px 4px 24px 8px #51459f1a"
          >
            <div
              class="flex items-start justify-start lg:justify-between flex-row"
            >
              <div
                class="flex items-start rtl:space-x-reverse space-x-[8px] md:space-x-[16px] ltr:pl-[16px] rtl:pr-[16px] lg:w-auto w-full"
              >
                <div
                  class="hover:bg-tamkinLight dark:hover:bg-tamkinEnd/60 px-[1px] p cursor-pointer"
                >
                  <div
                    @click.stop="switchTab('saved')"
                    :class="[
                      currentTab === 'saved'
                        ? 'border-b-[3px] border-tamkin  font-[600] '
                        : 'border-b-[3px] border-[#C5C5C5] dark:border-darkborder',
                    ]"
                    class="text-[12px] md:text-[14px] md:px-[4px] text-nowrap pb-[20px] pt-[16px] dark:text-whiteTamkin text-[#021328]"
                    style="line-height: 21px"
                  >
                    {{ $t("My Sites") }} (
                    {{
                      apps.filter(
                        (ap) =>
                          ap.title !== "Internal Service" &&
                          ap.status !== "deleted"
                      ).length
                    }}
                    )
                  </div>
                </div>
                <div
                  class="hover:bg-tamkinLight dark:hover:bg-tamkinEnd/60 px-[1px] cursor-pointer"
                  @click.stop="switchTab('deleted')"
                >
                  <div
                    :class="[
                      currentTab === 'deleted'
                        ? 'border-b-[3px] border-tamkin  font-[600]'
                        : 'border-b-[3px] border-[#C5C5C5] dark:border-darkborder',
                    ]"
                    class="text-[12px] md:text-[14px] md:px-[4px] text-nowrap font-[400] pb-[20px] pt-[16px] dark:text-white text-[#021328]"
                    style="line-height: 21px"
                  >
                    {{ $t("Deleted Sites") }} ( {{ deletedAppListLength }} )
                  </div>
                </div>
                <!-- <div
                    class="px-[1px] cursor-pointer"
                    @click.stop="
                      () => {
                        if (
                          apps.some(
                            (t) =>
                              t.title === 'Internal Service' &&
                              t.package &&
                              t.package.length
                          )
                        ) {
                          switchTab('internal');
                        }
                      }
                    "
                    :class="[
                      apps.some(
                        (t) =>
                          t.title === 'Internal Service' &&
                          t.package &&
                          t.package.length
                      )
                        ? 'hover:bg-tamkinLight dark:hover:bg-tamkinEnd/60'
                        : '!cursor-not-allowed bg-gray-50',
                    ]"
                  >
                    <div
                      :class="[
                        currentTab === 'internal'
                          ? 'border-b-[3px] border-tamkin  font-[600]'
                          : 'border-b-[3px] border-[#C5C5C5] dark:border-darkborder',
                      ]"
                      class="text-[14px] px-[4px] font-[400] pb-[20px] pt-[16px] dark:text-white text-[#021328]"
                      style="line-height: 21px"
                    >
                      {{ $t("Internal Service") }} (
                      {{
                        apps.length &&
                        apps.some(
                          (t) =>
                            t.title === "Internal Service" &&
                            t.package &&
                            t.package.length
                        )
                          ? apps.find((t) => t.title === "Internal Service")
                              .package.length
                          : 0
                      }}

                      )
                    </div>
                  </div> -->
              </div>
              <div
                class="flex items-center justify-end w-2/4 ps-[8px] pe-[16px]"
              >
                <div class="flex items-center justify-between w-full">
                  <div
                    class="py-[17px] search_input w-full lg:ltr:mr-[10px] lg:rtl:ml-[10px]"
                  >
                    <input
                      type="text"
                      class="input_dashboard_search w-full !h-[40px] min-w-[107px] md:min-w-[unset] ltr:!pr-[10px]"
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
                      @click.stop="clearInput"
                      class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer"
                    >
                      <img src="/assets/imgs/icons/clear_search.svg" />
                    </div>
                  </div>
                </div>
                <!-- <div class="flex items-center w-full py-[17px] ">
                <TranslateSelectInput
                @getCurrentSelectedItem="getPackType"
                :enableSearch="false"
                placeholderinput="Package type"
                :list="typesOfPackages"
                nameKey="name"
                idField="id"
             class="w-full"
                :currentListValue="pcktype.name"
              />
              </div> -->
              </div>
            </div>
            <div class="overflow-x-auto">
              <table
                class="table-auto divide-y w-full divide-gray-200 dark:divide-darkborder"
                v-if="
                  currentTab === 'saved' &&
                  paginatedFilteredAppList.length > 0 &&
                  !mysiteStore.loadingApps
                "
              >
                <thead>
                  <tr class="h-[50px]">
                    <th
                      class="text-nowrap ltr:pl-[16px] rtl:pr-[16px] h-[50px] ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{ $t("Sites URL") }}
                    </th>
                    <th
                      class="text-nowrap ltr:text-left xl:px-0 px-[16px] rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{ $t("Billing") }}
                    </th>
                    <th
                      class="text-nowrap ltr:text-left xl:px-0 px-[16px] rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{ $t("Package") }}
                    </th>
                    <th>
                      <div
                        class="text-nowrap xl:px-0 px-[16px] w-full flex items-center justify-start rtl:space-x-reverse space-x-[6px] ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                      >
                        <div>{{ $t("Status") }}</div>
                        <div>
                          <span
                            class="tooltip left"
                            id="saveButton"
                            :data-tamkin="
                              $t(
                                'The status shows the code is installed, embedded, and services are now visible and operational'
                              )
                            "
                          >
                            <span id="saveButton_label" class="">
                              <svg
                                width="16"
                                class="mx-[3px]"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                                  fill="#71DAD2"
                                />
                              </svg>
                            </span>
                          </span>
                        </div>
                      </div>
                    </th>

                    <th
                      class="text-nowrap ltr:text-left xl:px-0 px-[16px] rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{ $t("Date") }}
                    </th>

                    <th>
                      <div
                        class="text-nowrap flex items-center xl:px-0 px-[16px] justify-start rtl:space-x-reverse space-x-[6px] lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                      >
                        <div>{{ $t("Traffic") }}</div>
                        <div>
                          <span
                            class="tooltip right"
                            id="saveButton"
                            :data-tamkin="
                              $t(
                                'Monthly page views: The value indicates either the peak month or annual average'
                              )
                            "
                          >
                            <span id="saveButton_label" class="">
                              <svg
                                width="16"
                                class="mx-[3px]"
                                height="15"
                                viewBox="0 0 16 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.35922 15C12.455 15 15.8594 11.6029 15.8594 7.5C15.8594 3.40427 12.4475 0 8.35169 0C4.24897 0 0.859375 3.40427 0.859375 7.5C0.859375 11.6029 4.25619 15 8.35922 15ZM8.35953 13.7501C4.88836 13.7501 2.11589 10.9705 2.11589 7.5C2.11589 4.03643 4.88084 1.2499 8.35169 1.2499C11.815 1.2499 14.6016 4.03675 14.6091 7.5C14.6164 10.9708 11.8222 13.7501 8.35891 13.7501M8.35169 8.83084C8.70433 8.83084 8.90292 8.63225 8.91014 8.25013L9.02057 4.36773C9.0281 3.99251 8.73382 3.71329 8.34416 3.71329C7.94697 3.71329 7.66775 3.9853 7.67496 4.3602L7.77065 8.25013C7.77787 8.62503 7.98399 8.83084 8.35169 8.83084ZM8.35169 11.2205C8.77053 11.2205 9.14544 10.8823 9.14544 10.456C9.14544 10.0221 8.77806 9.69108 8.35169 9.69108C7.91779 9.69108 7.55731 10.0293 7.55731 10.456C7.55731 10.8751 7.92501 11.2205 8.35169 11.2205Z"
                                  fill="#71DAD2"
                                />
                              </svg>
                            </span>
                          </span>
                        </div>
                      </div>
                    </th>
                    <th
                      class="text-nowrap lg:text-[14px] text-center font-[600] lg:leading-[21px] text-[12px] ltr:pr-[50px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{ $t("Action") }}
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200 dark:divide-darkborder"
                >
                  <template
                    v-for="(app, index) in paginatedFilteredAppList"
                    :key="index"
                  >
                    <tr
                      :id="app.name"
                      class="h-[50px] dark:bg-tamkinDarkPrimary dark:border-darkborder"
                      :class="[
                        app.package &&
                        app.package[0] &&
                        ((app.package[0].status === 'not_installed' &&
                          app.package[0].type !== 'Investors') ||
                          (app.package[0].type === 'Investors' &&
                            app.package[0].status === 'not_installed'))
                          ? '!bg-[#FAEBEB] dark:!bg-[#977474]'
                          : '',

                        mysiteStore.selectedApp &&
                        mysiteStore.selectedApp.name === app.name
                          ? 'border-[1px] drop-shadow-md !border-tamkinStart'
                          : 'border-[1px]',
                      ]"
                    >
                      <td class="md:w-[25%] text-nowrap">
                        <div
                          class="relative h-[50px] flex items-center justify-start rtl:space-x-reverse space-x-[4px] ipad-max:space-x-[10px] lg:space-x-[16px] ipad-max:ltr:pl-[0px] ltr:pl-[18px] lg:ltr:pl-[18px] rtl:pr-[18px] text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                        >
                          <div
                            href="#"
                            class="gap-3 h-[50px] flex items-center justify-start"
                          >
                            <div
                              class="flex items-center justify-center"
                              v-if="app.favicon"
                            >
                              <img
                                :src="app.favicon"
                                class="size-8 ipad-max:hidden lg:block hidden rounded-full"
                              />
                            </div>
                            <div
                              v-else
                              class="size-8 bg-[#2DADA3] rounded-full text-white flex items-center justify-center text-[12px]"
                            >
                              {{ getAvatarLetters(app?.title) }}
                            </div>

                            <div class="order-1">{{ app.app_domain }}</div>
                          </div>
                          <div
                            v-if="defaultApp && defaultApp.name === app.name"
                            class="order-1 flex items-center justify-center text-white text-[10px] font-[500] lg:w-[47px] h-[23px] rounded-[17px] p-[10px]"
                            style="
                              background: linear-gradient(
                                180deg,
                                #2dada3 0%,
                                #71dad2 100%
                              );
                            "
                          >
                            {{ $t("Default") }}
                          </div>
                        </div>
                      </td>
                      <td
                        class="xl:px-0 px-[16px] lg:px-0 text-nowrap md:w-[150px] text-[12px] lg:text-[14px] ltr:text-left rtl:text-right font-[400] text-darkGrey dark:text-whiteTamkin"
                      >
                        {{
                          app.package.length
                            ? $t(
                                capitalizeFirstLetter(
                                  app.package[0].billing_duration
                                )
                              )
                            : "-"
                        }}
                      </td>
                      <td
                        class="xl:px-0 px-[16px] text-left text-nowrap text-[12px] lg:px-0 md:w-[150px] lg:text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                      >
                        <div
                          v-if="app.package.length > 0"
                          class="flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
                        >
                          <div
                            class="w-[20px] h-[20px] inline-block align-middle"
                          >
                            <img
                              v-if="app.package[0] && app.package[0].icon"
                              :src="
                                runtimeConfig.public.baseImagerUrl +
                                (app.package[0] ? app.package[0].icon : '/')
                              "
                              class="w-[20px] h-[20px]"
                              alt=""
                            />
                          </div>

                          <!-- Title Container -->
                          <div
                            class="inline-block align-middle rtl:mr-2 ltr:ml-2 w-24 truncate"
                          >
                            {{
                              app.package[0] && app.package[0].title
                                ? $t(`${app.package[0].title}`)
                                : "Draft website"
                            }}
                          </div>
                        </div>
                        <div class="rtl:text-right ltr:text-left" v-else>-</div>
                      </td>
                      <td
                        class="xl:px-0 px-[16px] lg:px-0 text-nowrap md:w-[150px] mx-auto text-center text-darkGrey dark:text-whiteTamkin"
                      >
                        <div v-if="app.package.length > 0">
                          <div
                            v-if="
                              app.package[0] &&
                              app.package[0].status === 'Expired' &&
                              app.package[0].type !== 'Investors'
                            "
                            class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
                          >
                            {{ $t(`Expired`) }}
                          </div>
                          <div
                            v-if="app.package[0].status === 'Rejected'"
                            class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
                          >
                            {{ $t(`${app.package[0].status}`) }}
                          </div>

                          <div
                            v-if="
                              app.package[0].status === 'draft' &&
                              app.package[0].type !== 'Investors'
                            "
                            class="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
                          >
                            {{ $t(`${app.package[0].status}`) }}
                          </div>
                          <div
                            v-if="
                              app.package[0].status &&
                              app.package[0].status === 'Active'
                            "
                            class="bg-gradient-to-r from-tamkinStart to-tamkinEnd rounded-[17px] flex items-center justify-center h-[25px] max-w-[150px] w-[100px] text-white text-[12px] leading-[18px]"
                          >
                            {{ $t(app.package[0].status) }}
                          </div>
                          <div
                            v-if="app.package[0].status === 'Pending'"
                            class="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[17px] flex items-center justify-center h-[25px] max-w-[150px] w-[100px] text-white text-[12px] leading-[18px]"
                          >
                            {{
                              app.package[0].status === "Pending"
                                ? $t("Under Review")
                                : $t(`${app.package[0].status}`)
                            }}
                          </div>

                          <nuxt-link
                            :to="localePath('/embed-code')"
                            v-if="app.package[0].status === 'not_installed'"
                            class="cursor-pointer text-[#DE4134] block ltr:text-left rtl:text-right text-[14px] font-[500] leading-[21px] underline"
                          >
                            {{ $t("Not installed") }}
                          </nuxt-link>
                        </div>
                        <div class="rtl:text-right ltr:text-left" v-else>-</div>
                      </td>
                      <td
                        class="xl:px-0 px-[16px] ltr:text-left text-nowrap rtl:text-right md:w-[150px] text-[12px] lg:text-[14px] leading-[24px] whitespace-nowrap lg:leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
                      >
                        {{
                          app.package.length === 0
                            ? "-"
                            : new Date(app.creation).toLocaleDateString(
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
                        class="xl:px-0 px-[16px] rtl:text-right text-nowrap ltr:text-left md:w-[150px] text-[14px] leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
                      >
                        {{ formatNumber(app.traffic) }}
                      </td>
                      <td
                        class="text-[14px] text-nowrap md:w-[150px] font-[400] px-[18px] text-darkGrey"
                      >
                        <div
                          class="flex items-center justify-center rtl:space-x-reverse space-x-[16px] relative"
                        >
                          <button
                            :disabled="
                              app.package.length &&
                              app.package[0].status === 'Pending'
                            "
                            class="disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center hover:opacity-50 w-6 h-6"
                            @click.stop="
                              getPackageAndOpenPaymenModal(
                                app,
                                app.package.length ? app.package[0].name : null
                              )
                            "
                          >
                            <img
                              src="/assets/imgs/installed.svg"
                              v-if="
                                !loadingBlock.find(
                                  (a) =>
                                    (app.package.length
                                      ? a.pack === app.package[0].name
                                      : true) && a.app === app
                                )
                              "
                            />

                            <svg
                              v-if="
                                loadingBlock.find(
                                  (a) =>
                                    (app.package.length
                                      ? a.pack === app.package[0].name
                                      : true) && a.app === app
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
                          </button>

                          <button
                            :disabled="
                              (app.package.length &&
                                app.package[0].status === 'Pending') ||
                              (app.package.length &&
                                app.package[0].status === 'Expired')
                            "
                            @click.stop="openDeleteMember(app)"
                            class="disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
                          >
                            <svg
                              width="18"
                              height="17"
                              rviewBox="0 0 18 17"
                              class="dark:text-whiteTamkin text-[#8C8C8C] group-hover:text-[#E80902] group-disabled:hover:text-[#8C8C8C]"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                                fill="currentColor"
                              />
                            </svg>
                          </button>

                          <button
                            :disabled="
                              app.package.length === 1 ||
                              app.package.length === 0
                            "
                            @click.prevent="
                              () => {
                                mysiteStore.selectedApp =
                                  mysiteStore.selectedApp === app ? null : app;
                              }
                            "
                            class="disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center hover:opacity-50"
                          >
                            <svg
                              :class="
                                mysiteStore.selectedApp === app
                                  ? 'rotate-180'
                                  : ''
                              "
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="size-4"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <template
                      v-if="
                        mysiteStore.selectedApp &&
                        mysiteStore.selectedApp.name === app.name
                      "
                    >
                      <tr
                        :class="[
                          mysiteStore.selectedApp &&
                          mysiteStore.selectedApp.name === app.name
                            ? '!border-[1px]  !border-t-0  !border-tamkinStart'
                            : '',
                          pack.status === 'not_installed' &&
                          new Date() < new Date(pack.endpackage)
                            ? 'bg-[#FAEBEB]'
                            : '',
                        ]"
                        class="h-[50px]"
                        v-for="(
                          pack, i
                        ) in mysiteStore.selectedApp.package.slice(1)"
                        :key="i"
                      >
                        <td class="w-[25%]">
                          <div
                            class="relative h-[50px] flex items-center justify-start ipad-max:ltr:pl-[0px] ltr:pl-[18px] lg:ltr:pl-[18px] rtl:pr-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                          >
                            <a
                              href="#"
                              class="gap-3 h-[50px] flex items-center justify-start"
                            >
                              <div
                                class="flex items-center justify-center"
                                v-if="mysiteStore.selectedApp.favicon"
                              >
                                <img
                                  :src="mysiteStore.selectedApp.favicon"
                                  class="size-8 ipad-max:hidden lg:block hidden rounded-full"
                                />
                              </div>
                              <div
                                v-else
                                class="size-8 bg-[#2DADA3] rounded-full text-white flex items-center justify-center text-[12px]"
                              >
                                {{
                                  getAvatarLetters(
                                    mysiteStore.selectedApp?.title
                                  )
                                }}
                              </div>

                              <div class="order-1">
                                {{ mysiteStore.selectedApp.app_domain }}
                              </div>
                            </a>
                            <!-- <div
                                    v-if="defaultApp.name === app.name"
                                    class="order-1 flex items-center justify-center text-white text-[10px] font-[500] leading-[15px] lg:w-[47px] h-[23px] rounded-[17px] p-[10px]"
                                    style="
                                      background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
                                    "
                                  >
                                    {{ $t("Default") }}
                                  </div> -->
                          </div>
                        </td>
                        <td
                          class="lg:px-0 w-[150px] text-[12px] lg:text-[14px] ltr:text-left rtl:text-right leading-[12px] lg:leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
                        >
                          {{
                            mysiteStore.selectedApp.package.length
                              ? $t(capitalizeFirstLetter(pack.billing_duration))
                              : "-"
                          }}
                        </td>
                        <td
                          class="ltr:text-left rtl:text-right text-[12px] lg:px-0 w-[150px] lg:text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                        >
                          <div v-if="pack" class="">
                            <!-- Image Container -->
                            <div
                              class="w-[20px] h-[20px] inline-block align-middle"
                            >
                              <img
                                v-if="pack.icon"
                                :src="
                                  runtimeConfig.public.baseImagerUrl + pack.icon
                                "
                                class="w-[20px] h-[20px]"
                                alt=""
                              />
                            </div>

                            <!-- Title Container -->
                            <div
                              class="inline-block align-middle rtl:mr-2 ltr:ml-2 w-24 truncate"
                            >
                              {{
                                pack && pack.title
                                  ? $t(`${pack.title}`)
                                  : "Draft website"
                              }}
                            </div>
                          </div>

                          <div class="rtl:text-right ltr:text-left" v-else>
                            -
                          </div>
                        </td>
                        <td
                          class="lg:px-0 w-[150px] mx-auto text-center text-darkGrey dark:text-whiteTamkin"
                        >
                          <div
                            v-if="mysiteStore.selectedApp.package.length > 0"
                          >
                            <div
                              v-if="
                                pack.status === 'Expired' &&
                                pack.type !== 'Investors'
                              "
                              class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
                            >
                              {{ $t(`Expired`) }}
                            </div>
                            <div
                              v-if="pack.status === 'Rejected'"
                              class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
                            >
                              {{ $t(`${pack.status}`) }}
                            </div>
                            <div
                              v-if="
                                pack.status === 'Active' ||
                                (pack.type === 'Investors' &&
                                  pack.investor_status === 'Active')
                              "
                              class="bg-gradient-to-r from-tamkinStart to-tamkinEnd rounded-[17px] flex items-center justify-center h-[25px] max-w-[150px] w-[100px] text-white text-[12px] leading-[18px]"
                            >
                              {{ $t(`${pack.status}`) }}
                            </div>
                            <div
                              v-if="pack.status === 'Pending'"
                              class="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[17px] flex items-center justify-center h-[25px] max-w-[150px] w-[100px] text-white text-[12px] leading-[18px]"
                            >
                              {{
                                pack.status === "Pending"
                                  ? $t("Under Review")
                                  : $t(`${pack.status}`)
                              }}
                            </div>
                            <nuxt-link
                              :to="localePath('/embed-code')"
                              v-if="pack && pack.status === 'not_installed'"
                              class="cursor-pointer text-[#DE4134] block ltr:text-left rtl:text-right text-[14px] font-[500] leading-[21px] underline"
                            >
                              {{ $t("Not installed") }}
                            </nuxt-link>
                          </div>
                          <div class="text-center" v-else>-</div>
                        </td>
                        <td
                          class="ltr:text-left rtl:text-right w-[150px] text-[12px] lg:text-[14px] leading-[24px] whitespace-nowrap lg:leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
                        >
                          {{
                            new Date(
                              mysiteStore.selectedApp.creation
                            ).toLocaleDateString(
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
                          class="rtl:text-right ltr:text-left w-[150px] text-[14px] leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
                        >
                          {{ formatNumber(mysiteStore.selectedApp.traffic) }}
                        </td>
                        <td
                          class="text-[14px] w-[150px] font-[400] text-darkGrey"
                        >
                          <div
                            class="flex items-center justify-center rtl:space-x-reverse space-x-[16px] relative"
                          >
                            <button
                              :disabled="
                                mysiteStore.selectedApp.package.length &&
                                pack.status === 'Pending'
                              "
                              class="disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center hover:opacity-50 w-6 h-6"
                              @click.stop="
                                getPackageAndOpenPaymenModal(
                                  mysiteStore.selectedApp,
                                  pack ? pack.name : null
                                )
                              "
                            >
                              <img
                                src="/assets/imgs/installed.svg"
                                v-if="
                                  !loadingBlock.find(
                                    (a) =>
                                      (pack ? a.pack === pack.name : true) &&
                                      a.app === mysiteStore.selectedApp
                                  )
                                "
                              />

                              <svg
                                v-if="
                                  loadingBlock.find(
                                    (a) =>
                                      (pack ? a.pack === pack.name : true) &&
                                      a.app === mysiteStore.selectedApp
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
                            </button>

                            <button
                              :disabled="
                                pack.status === 'Pending' ||
                                pack.status === 'Expired'
                              "
                              class="disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
                              @click.stop="
                                openDeleteMember(mysiteStore.selectedApp)
                              "
                            >
                              <!-- her eman-->
                              <svg
                                width="18"
                                height="17"
                                rviewBox="0 0 18 17"
                                class="dark:text-whiteTamkin text-[#8C8C8C] hover:text-[#E80902] cursor-pointer"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>

                            <button
                              :disabled="true"
                              class="disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center hover:opacity-50"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>

                      <!-- <tr
    :class="[ mysiteStore.selectedApp && mysiteStore.selectedApp.name === app.name ? '!border-[1px]  !border-t-0  !border-tamkinStart':'']"
  v-for="(pack,i) in mysiteStore.selectedApp.package.slice(1)" :key='i'
        class="h-[50px] "
      >
        <td class="w-[25%] ">
          <div
            class="relative h-[50px] flex items-center justify-start rtl:space-x-reverse space-x-[4px] 
            ipad-max:space-x-[10px] lg:space-x-[16px] ipad-max:ltr:pl-[0px] ltr:pl-[18px] lg:ltr:pl-[18px] rtl:pr-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
          >
            <a
              href="#"
              class="gap-3 h-[50px] flex items-center justify-start"
            >
            <div class="flex items-center justify-center h-[20px] w-[20px]" v-if="app.favicon">
              <img 
              :src="mysiteStore.selectedApp.favicon"
              class="size-8  ipad-max:hidden lg:block hidden"
            />
            </div>
              <div v-else class="size-8  bg-[#2DADA3] rounded-full 
              text-white flex items-center justify-center text-[12px]"> 
    {{ getAvatarLetters(mysiteStore.selectedApp?.title) }}

    </div>
    
    
              <div class="order-1">{{ mysiteStore.selectedApp.app_domain }}</div>
              
            </a>
          
          </div>
        </td>
      
        <td
          class="capitalize w-[150px] text-[12px] lg:text-[14px] ltr:text-left rtl:text-right
          font-[400] text-darkGrey dark:text-whiteTamkin"
        >
        {{ $t(`${mysiteStore.selectedApp.billing_duration === '3-monthly' ? '3 months' :mysiteStore.selectedApp.billing_duration === 'monthly' ?'Monthly' :'Annual'}`) }}
        </td>
        <td
          class="text-left w-[150px] text-[12px] lg:px-0 lg:text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
        >
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
          >
            <div class="w-[20px] h-[20px]">
      
              <img
                :src="runtimeConfig.public.baseImagerUrl + (pack.icon)"
                class="w-[20px] h-[20px]  rounded-full"
                alt=""
              />
            </div>
            <div>{{$t(pack.title)}}</div>
          </div>
        </td>
    
  <td
          class="lg:px-0  w-[150px] mx-auto text-center text-darkGrey dark:text-whiteTamkin"
        >
        <div
        v-if="new Date() > new Date(pack.endpackage)"
      
        class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px]  flex items-center justify-center 
              h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
      >
        {{ $t(`Expired`) }}
      </div>

        <div
        v-if="pack.status !=='Paid' && pack.status !=='not_installed' && new Date() < new Date(pack.endpackage)"
      
        class="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[17px]  flex items-center justify-center 
              h-[25px] max-w-[150px] w-3/4 text-white text-[12px] leading-[18px]"
      >
        {{ pack.status === 'Pending'? $t('Under Review') : $t(`${pack.status}`) }}
      </div>
      <div
      @click.stop="$router.push(localePath('/embed-code'))"
      v-if="pack.status ==='not_installed' && new Date() < new Date(pack.endpackage)"
      class="cursor-pointer  text-[#DE4134] ltr:text-left rtl:text-right text-[14px] font-[500] leading-[21px]  underline"
    >
      {{ $t("Not installed") }}
    </div>
        </td>
    
        <td
          class="ltr:text-left rtl:text-right w-[150px] text-[12px] lg:text-[14px] leading-[24px] whitespace-nowrap
            lg:leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
        >
          {{ new Date(app.creation).toDateString() }}
        </td>
    
        <td
          class="rtl:text-right lt:text-left text-[14px] w-[150px]   leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
        >
          {{ formatNumber(app.traffic) }}
        </td>
    
        <td
          class="text-[14px] w-[150px] font-[400] text-darkGrey "
        >
          <div
            class="flex items-center justify-center  rtl:space-x-reverse space-x-[16px]  relative"
          >
          
          <button  :disabled="
          pack.status === 'Pending' || 
            loadingBlock.find(a=>a.pack === pack.name && a.app === mysiteStore.selectedApp) || pack.billing_duration === 'yearly'"
            class="disabled:opacity-40  disabled:cursor-not-allowed flex items-center justify-center hover:opacity-50 h-6 w-6"
            @click.stop="getPackageAndOpenPaymenModal(app,pack.name)">
            <img src="/assets/imgs/installed.svg" v-if="!loadingBlock.find(a=>a.pack === pack.name && a.app === app)"/>
            
    <svg v-if="loadingBlock.find(a=>a.pack === pack.name && a.app === app)" class="animate-spin h-5 w-5 text-tamkin" xmlns="http://www.w3.org/2000/svg"
    fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
    </path>
    </svg>
                </button>
                
                          
            <button @click.stop="openDeleteMember(app)">
              <svg
                width="18"
                height="17"
                rviewBox="0 0 18 17"
                class="dark:text-whiteTamkin text-[#8C8C8C] hover:text-[#E80902] cursor-pointer"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                  fill="currentColor"
                />
              </svg>
            </button>

            <button  :disabled="true" 
            
          
            class="disabled:opacity-40  disabled:cursor-not-allowed flex items-center justify-center hover:opacity-50"
            >
          -
            
            
            </button> 
          </div>
        </td>
    
    
      </tr> -->
                    </template>
                  </template>
                </tbody>
              </table>

              <table
                class="min-w-full divide-y divide-gray-200 dark:divide-darkborder"
                v-else-if="
                  currentTab === 'deleted' &&
                  paginatedFilteredAppList.length > 0 &&
                  !mysiteStore.loadingApps
                "
              >
                <thead>
                  <tr class="h-[50px]">
                    <th
                      class="px-4 h-[50px] ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{ $t("Sites URL") }}
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200 dark:divide-darkborder"
                >
                  <tr
                    v-for="(app, index) in paginatedFilteredAppList"
                    :key="index"
                    class="h-[50px]"
                  >
                    <td
                      class="flex h-[50px] items-center justify-start rtl:space-x-reverse space-x-[10px] ltr:pl-[18px] rtl:pr-[18px] lg:mt-0 mt-[20px] text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                    >
                      <img
                        v-if="app.favicon"
                        :src="app.favicon"
                        class="size-8 object-cover rounded-full ipad-max:hidden lg:block hidden"
                      />
                      <div
                        v-else
                        class="size-8 bg-[#2DADA3] rounded-full text-white flex items-center justify-center text-[12px]"
                      >
                        <div class="flex items-center justify-center">
                          {{ getAvatarLetters(app?.title) }}
                        </div>
                      </div>

                      <div class="order-1">
                        {{ app.app_domain }}
                      </div>
                    </td>

                    <td
                      class="text-[14px] ltr:pr-[16px] rtl:pl-[16px] font-[400] dark:text-whiteTamkin text-darkGrey"
                    >
                      <button
                        @click.stop="openRestoreApp(app)"
                        class="rtl:mr-auto ltr:ml-auto btn_bordered_dashboard normal_hover w-[108px] h-[31px] flex items-center justify-center"
                      >
                        {{ $t("Restore") }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                class="table-auto divide-y divide-gray-200 dark:divide-darkborder"
                v-if="
                  currentTab === 'internal' &&
                  !mysiteStore.loadingApps &&
                  apps.find((t) => t.title === 'Internal Service')?.package
                    .length > 0
                "
              >
                <thead>
                  <tr class="h-[50px]">
                    <th
                      class="ltr:pl-[16px] rtl:pr-[16px] h-[50px] ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{ $t("Package") }}
                    </th>
                    <th
                      class="ltr:text-left xl:px-0 px-[16px] rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{ $t("Billing") }}
                    </th>
                    <th
                      class="ltr:text-left xl:px-0 px-[16px] rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] dark:text-whiteTamkin text-darkGrey"
                    >
                      {{ $t("Section") }}
                    </th>
                    <th
                      class="ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{ $t("Status") }}
                    </th>

                    <th
                      class="ltr:text-left rtl:text-right lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{ $t("Date") }}
                    </th>

                    <th
                      class="lg:text-[14px] font-[600] lg:leading-[21px] text-[12px] leading-[12px] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{ $t("Action") }}
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200"
                >
                  <tr
                    v-for="(pk, index) in paginatedFilteredAppList"
                    :key="index"
                    class="h-[50px]"
                  >
                    <td class="w-[25%]">
                      <div
                        class="relative h-[50px] flex items-center justify-start rtl:space-x-reverse space-x-[4px] ipad-max:space-x-[10px] lg:space-x-[16px] ipad-max:ltr:pl-[0px] ltr:pl-[18px] lg:ltr:pl-[18px] rtl:pr-[18px] text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                      >
                        <div class="size-10">
                          <img
                            v-if="pk.icon"
                            :src="runtimeConfig.public.baseImagerUrl + pk.icon"
                            class="object-contain"
                            alt=""
                          />
                        </div>

                        <div class="order-1">
                          {{
                            $t(`${pk.title}`) +
                            " - " +
                            $t(
                              `${
                                pk.title === "Free"
                                  ? pk.category1
                                  : pk.package_category
                              }`
                            )
                          }}
                        </div>
                      </div>
                    </td>

                    <td
                      class="xl:px-0 px-[16px] text-[12px] lg:text-[14px] ltr:text-left rtl:text-right leading-[12px] lg:leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{
                        pk.billing_duration
                          ? $t(capitalizeFirstLetter(pk.billing_duration))
                          : $t("Free - Monthly")
                      }}
                    </td>
                    <td
                      class="text-left text-[12px] xl:px-0 px-[16px] lg:text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                    >
                      <div
                        class="flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
                      >
                        <div>{{ $t(`${pk.type}`) }}</div>
                      </div>
                    </td>

                    <td
                      class="xl:px-0 px-[16px] mx-auto text-center text-darkGrey dark:text-whiteTamkin"
                    >
                      <div
                        v-if="pk.status === 'Active' || pk.status === 'draft'"
                        class="bg-gradient-to-r from-tamkinStart to-tamkinEnd rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
                      >
                        {{ $t(`Active`) }}
                      </div>

                      <div
                        v-if="pk.status === 'Expired'"
                        class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] lg:w-[88px] text-white text-[12px] leading-[18px]"
                      >
                        {{ $t(`Expired`) }}
                      </div>
                      <div
                        v-if="
                          pk.status === 'Pending' || pk.status === 'Pendding'
                        "
                        class="bg-gradient-to-r from-orange-600 to-orange-400 rounded-[17px] flex items-center justify-center h-[25px] w-[100px] text-white text-[12px] leading-[18px]"
                      >
                        {{
                          pk.status === "Pending" || pk.status === "Pendding"
                            ? $t("Under Review")
                            : $t(`${pk.status}`)
                        }}
                      </div>
                      <div
                        v-if="pk.status === 'Rejected'"
                        class="bg-gradient-to-r from-red-600 to-red-400 rounded-[17px] flex items-center justify-center h-[25px] w-[100px] text-white text-[12px] leading-[18px]"
                      >
                        {{ $t(`${pk.status}`) }}
                      </div>
                    </td>
                    <td
                      class="ltr:text-left rtl:text-right text-[12px] lg:text-[14px] leading-[24px] whitespace-nowrap lg:leading-[21px] font-[400] text-darkGrey dark:text-whiteTamkin"
                    >
                      {{
                        new Date(pk.from_date).toLocaleDateString(
                          locale === "ar" ? "ar-EG" : "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      }}
                    </td>

                    <td class="text-[14px] font-[400] text-darkGrey">
                      <div
                        class="flex items-center justify-center rtl:space-x-reverse space-x-[16px] relative"
                      >
                        <button
                          :disabled="
                            loadingBlock.find(
                              (a) =>
                                (pk ? a.pack === pk.name : true) &&
                                a.app === internalServiceApp
                            ) || pk.status === 'Pending'
                          "
                          class="disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center hover:opacity-50 h-6 w-6"
                          @click.stop="
                            getPackageAndOpenPaymenModal(
                              internalServiceApp,
                              pk ? pk.name : null
                            )
                          "
                        >
                          <img
                            src="/assets/imgs/installed.svg"
                            v-if="
                              !loadingBlock.find(
                                (a) =>
                                  (pk ? a.pack === pk.name : true) &&
                                  a.app === internalServiceApp
                              )
                            "
                          />

                          <svg
                            v-else
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
                        </button>

                        <button
                          :disabled="
                            pk.title == 'Free' ||
                            pk.status === 'Pending' ||
                            pk.cancel_package
                          "
                          @click.stop="
                            () => {
                              mysiteStore.currentInvoice = pk.package_name;
                              mysiteStore.currentWebsite = apps.find(
                                (a) => a.title === 'Internal Service'
                              );

                              openModal('cancel_subscription_internal');
                            }
                          "
                          class="disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
                        >
                          <svg
                            width="18"
                            height="17"
                            rviewBox="0 0 18 17"
                            class="dark:text-whiteTamkin text-[#8C8C8C] group-hover:text-[#E80902] group-disabled:hover:text-[#8C8C8C]"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <noresult
              class="!my-[30px]"
              v-if="search && paginatedFilteredAppList.length === 0"
            />

            <NoData
              class="!mt-[30px] !mb-[-30px]"
              v-if="
                currentTab === 'deleted' &&
                paginatedFilteredAppList.length === 0 &&
                !search &&
                !mysiteStore.loadingApps
              "
              imgUrl="/assets/imgs/no_sites.svg"
              :text="$t('No sites have been deleted')"
            >
            </NoData>

            <NoData
              class="!mt-[30px] !mb-[-30px]"
              v-if="
                currentTab === 'saved' &&
                paginatedFilteredAppList.length === 0 &&
                !search &&
                appList.length === 0 &&
                !mysiteStore.loadingApps
              "
              imgUrl="/assets/imgs/no_sites.svg"
              text="You don't have any sites now"
            >
              <button
                @click.stop="$router.push({ path: localePath('/add-site') })"
                class="btn-dashboard-normal normal_hover text-[14px] leading-[24px] font-[500]"
              >
                {{ $t("Add New Site") }}
              </button>
            </NoData>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col justify-start rounded-[10px] pt-[12px] pb-[16px] mb-[16px] bg-white dark:bg-tamkinDarkPrimary"
        style="box-shadow: 0px 4px 24px 8px #51459f1a"
        v-if="mysiteStore.loadingApps"
      >
        <div class="relative overflow-x-auto w-full">
          <table
            class="table-auto divide-y last:border-b dark:last:border-b-darkborder w-full divide-gray-200 dark:divide-darkborder"
          >
            <thead>
              <tr>
                <th
                  class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin rtl:pr-[8px] ltr:pl-[8px] rtl:lg:pr-[16px] ltr:lg:pl-[16px]"
                >
                  <div
                    class="w-[100px] h-[20px] dark:bg-p bg-gray-300 rounded animate-pulse"
                  ></div>
                </th>
                <th
                  class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin"
                >
                  <div
                    class="w-[200px] h-[20px] dark:bg-p bg-gray-300 rounded animate-pulse"
                  ></div>
                </th>
                <th
                  class="py-3.5 ltr:text-left rtl:text-right text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin"
                >
                  <div
                    class="w-[150px] h-[20px] dark:bg-p bg-gray-300 rounded animate-pulse"
                  ></div>
                </th>
                <th
                  class="py-3.5 pr-[8px] text-center text-[14px] font-[600] text-darkGrey dark:text-whiteTamkin"
                >
                  <div
                    class="w-3/4 h-[20px] dark:bg-p bg-gray-300 rounded animate-pulse"
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
                      class="w-[30px] h-[30px] dark:bg-p bg-gray-300 rounded-full animate-pulse"
                    ></div>
                    <div
                      class="w-[150px] h-[20px] dark:bg-p bg-gray-300 rounded animate-pulse"
                    ></div>
                  </div>
                </td>
                <td
                  class="py-4 ltr:text-left rtl:text-right text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                >
                  <div
                    class="w-[200px] h-[20px] dark:bg-p bg-gray-300 rounded animate-pulse"
                  ></div>
                </td>
                <td
                  class="py-4 text-center text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                >
                  <div
                    class="w-[150px] h-[20px] dark:bg-p bg-gray-300 rounded animate-pulse"
                  ></div>
                </td>
                <td
                  class="py-4 text-center text-[14px] font-[400] text-darkGrey dark:text-whiteTamkin"
                >
                  <div
                    class="w-[90px] h-[20px] dark:bg-p bg-gray-300 rounded animate-pulse"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="flex flex-col"
        v-if="!dataAvailable && !mysiteStore.loadingApps"
      >
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full align-middle md:px-6 lg:px-8">
            <div
              class="flex flex-col items-between justify-center rounded-[10px] pb-[42px] mb-[16px] dark:bg-tamkinDarkPrimary bg-white"
              style="box-shadow: 0px 4px 24px 8px #51459f1a"
            >
              <div
                class="flex items-center justify-center lg:justify-between flex-row"
              >
                <div
                  class="flex items-center rtl:space-x-reverse space-x-[16px] ltr:pl-[16px] rtl:pr-[16px]"
                >
                  <div class="hover:bg-tamkinLight px-[1px] cursor-pointer">
                    <div
                      @click.stop="switchTab('saved')"
                      class="text-[14px] border-b-[3px] border-tamkin px-[4px] font-[600] pb-[16px] text-[#021328]"
                      style="line-height: 21px"
                    >
                      {{ $t("My Sites") }}
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between ltr:pr-[16px] rtl:pl-[16px] w-2/4"
                >
                  <div
                    class="py-[17px] search_input w-full ltr:mr-[16px] rtl:ml-[16px]"
                  >
                    <input
                      type="text"
                      class="input_dashboard_search w-full"
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
                      @click.stop="clearInput"
                      class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer"
                    >
                      <img src="/assets/imgs/icons/clear_search.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="min-w-full divide-y divide-gray-200">
                <div
                  class="flex items-center justify-center h-[188px] mt-[74px]"
                >
                  <div
                    class="flex flex-col items-center justify-center space-y-[12px]"
                  >
                    <div>
                      <img src="/assets/imgs/no_sites.svg" />
                    </div>
                    <div class="mx-auto">
                      <h2
                        class="text-[15px] leading-[22.5px] font-[400] text-darkGrey"
                      >
                        {{ $t(`You don't have any sites now`) }}
                      </h2>
                      <div class="w-[140px] mt-[40px] mx-auto">
                        <button
                          @click.stop="
                            $router.push({ path: localePath('/add-site') })
                          "
                          class="btn-dashboard hover_tamkin text-[16px] mx-auto leading-[24px] font-[500]"
                        >
                          {{ $t("Add New Site") }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex justify-between items-center pb-[16px]"
        v-if="paginatedFilteredAppList.length > 0 && !mysiteStore.loadingApps"
      >
        <div class="flex items-center rtl:space-x-reverse space-x-2">
          <span
            class="dark:text-whiteTamkin text-darkGrey text-[13px] leading-[21px] font-[400]"
          >
            {{ $t("Per Page") }}
          </span>
          <div class="flex space-x-1 md:space-x-2 rtl:space-x-reverse">
            <button
              v-for="option in perPageOptions"
              :key="option"
              :style="
                perPage === option
                  ? 'background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);'
                  : ''
              "
              :class="[
                'px-3 py-1 rounded-md text-white focus:outline-none !text-[13px]',
                perPage === option ? '' : 'bg-[#A7A7A7] hover:bg-lightGrey',
              ]"
              @click.stop="changePerPage(option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
        <div
          class="flex items-center rtl:space-x-reverse space-x-1 md:space-x-2"
        >
          <span
            class="text-darkGrey dark:text-whiteTamkin text-[13px] leading-[21px] font-[400]"
          >
            {{ $t("Page") }}
          </span>
          <button
            @click.stop="prevPage"
            class="p-[4px] rounded-md bg-transparent !text-[13px] dark:text-whiteTamkin text-darkGrey hover:bg-light-grey"
            :disabled="currentPage === 1"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              class="rtl:rotate-180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.9254 4.55806C13.1915 4.80214 13.1915 5.19786 12.9254 5.44194L8.4375 9.55806C8.17138 9.80214 8.17138 10.1979 8.4375 10.4419L12.9254 14.5581C13.1915 14.8021 13.1915 15.1979 12.9254 15.4419C12.6593 15.686 12.2278 15.686 11.9617 15.4419L7.47378 11.3258C6.67541 10.5936 6.67541 9.40641 7.47378 8.67418L11.9617 4.55806C12.2278 4.31398 12.6593 4.31398 12.9254 4.55806Z"
                class="fill-[#585B5B] dark:fill-whiteTamkin"
              />
            </svg>
          </button>
          <div class="flex space-x-1 md:space-x-2 rtl:space-x-reverse">
            <button
              v-for="page in visiblePages"
              :key="page"
              :style="
                currentPage === page
                  ? 'background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);'
                  : ''
              "
              :class="[
                'px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin focus:outline-none flex items-center justify-center',
                currentPage === page ? 'text-white' : 'hover:bg-light-grey',
              ]"
              @click.stop="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          <button
            @click.stop="nextPage"
            class="p-[4px] rounded-md bg-transparent text-darkGrey dark:text-whiteTamkin hover:bg-light-grey"
            :disabled="currentPage === totalPages"
          >
            <svg
              width="20"
              height="20"
              class="rtl:rotate-180"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.07459 15.4419C6.80847 15.1979 6.80847 14.8021 7.07459 14.5581L11.5625 10.4419C11.8286 10.1979 11.8286 9.80214 11.5625 9.55806L7.07459 5.44194C6.80847 5.19786 6.80847 4.80214 7.07459 4.55806C7.34072 4.31398 7.77219 4.31398 8.03831 4.55806L12.5262 8.67418C13.3246 9.40641 13.3246 10.5936 12.5262 11.3258L8.03831 15.4419C7.77219 15.686 7.34072 15.686 7.07459 15.4419Z"
                class="fill-[#585B5B] dark:fill-whiteTamkin"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.ping-effect {
  animation: ping-animation 1s ease-out;
  background-color: rgb(230, 230, 138);
}

@keyframes ping-animation {
  0% {
    background-color: rgb(230, 230, 138);
  }
  100% {
    background-color: transparent;
  }
}
</style>
