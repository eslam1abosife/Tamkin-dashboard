<script lang="ts" setup>
import { required, email, sameAs } from "@vuelidate/validators";
import { watch, computed, ref } from "vue";
import { useModalManager } from "@/composables/useModalManager";
import { useVuelidate } from "@vuelidate/core";
import { useGetOrderInvoice } from "~/composables/useMarket";
import visaIcon from "/assets/imgs/payment_methods/visa.svg";
import masterIcon from "/assets/imgs/payment_methods/master.svg";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const { locale, t } = useI18n();

useHead({
  title: t("Orders - Tamkin Dashboard"),
});
// const getApps = async () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   await getInviteApps({ agency: user.agency });
// };
// import { useUserStore } from "#imports";
const amr = useUserStore();
console.log(amr);
const orders = ref([]);
onMounted(async () => {
  // getApps();
  loadingBlock.value = true;
  const { getOrderInvoice } = useGetOrderInvoice();
  const result = await getOrderInvoice();
  orders.value = result.data;
  loadingBlock.value = false;
});
const dateF = ref();
const langStore = useLangSwitch();
const loadingBlock = ref(true);
const dateOpen = ref(false);

const alertFn = () => {
  if (dateOpen.value) {
    dateOpen.value = false;
  } else {
    dateOpen.value = true;
  }
};
const colorMode = useColorMode();
const savedCards = ref([
  { id: 1, number: "Tamkin  ****3536", type: "visa" },
  { id: 2, number: "Tamkin  ****6792", type: "master" },
]);

definePageMeta({
  layout: "dashboard",
  middleware: ["auth", "permissions"],
  requiredPermission: "orders",
});
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

const format = (date) => {
  const options = { year: "numeric", month: "short", day: "2-digit" };

  const formatDate = (d) => d.toLocaleDateString("en-US", options);

  if (Array.isArray(date)) {
    const start = formatDate(date[0]);
    const end = formatDate(date[1]);
    return ` ${start} - ${end}`;
  } else {
    return `Selected date is ${formatDate(date)}`;
  }
};

const checkAll = computed({
  get() {
    return (
      deletedSites.value && checked.value.length === deletedSites.value.length
    );
  },
  set(value) {
    checked.value = value ? deletedSites.value.map((lang) => lang.id) : [];
  },
});
const localePath = useLocalePath();

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

const projectNameArr = [
  { id: 1, name: "Active" },
  { id: 2, name: "Pending" },
  { id: 3, name: "Expired" },
  { id: 6, name: "Canceled" },
];
const statusImages = [
  "/imgs/limited.png",
  "/imgs/under_review.png",
  "/imgs/success.png",
];
const paymentImages = [
  "/assets/imgs/payment_methods/crypto.svg",
  "/assets/imgs/payment_methods/cc.svg",
  "/assets/imgs/payment_methods/paypal.svg",
];
const getStatusImage = (status: string) => {
  switch (status) {
    case "Declined":
      return statusImages[0];
    case "Successful":
      return statusImages[2];
    case "Paid":
      return statusImages[2];
    case "Cancelled":
      return statusImages[0];
    default:
      return statusImages[1];
  }
};
const getPaymentImage = (method: string) => {
  switch (method) {
    case "Crypto":
      return paymentImages[0];
    case "Credit":
      return paymentImages[1];
    case "PayPal":
      return paymentImages[2];
    default:
      return paymentImages[1];
  }
};
const handleSelectedItemProjectName = (item: any) => {
  console.log(item);
};

const currentMenu = ref("");

const openMenu = (menu: any) => {
  currentMenu.value = currentMenu.value === menu ? "" : menu;
};

const currentPage = ref(1);
const pageSize = ref(10);
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return orders.value.slice(start, end);
});

// Computed property for total pages
const totalPages = computed(() => {
  return Math.ceil(orders.value.length / pageSize.value);
});

const pageButtons = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;

  if (totalPages.value <= maxPagesToShow) {
    // Show all pages if total pages are less than or equal to 5
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    // Show a range of pages
    let start = Math.max(currentPage.value - 2, 1);
    let end = Math.min(currentPage.value + 2, totalPages.value);

    if (currentPage.value <= 3) {
      end = Math.min(5, totalPages.value);
    }

    if (currentPage.value >= totalPages.value - 2) {
      start = Math.max(totalPages.value - 4, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
  }

  return pages;
});
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const setPageSize = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1; // Reset to the first page
};
</script>

<template>
  <div class="w-full relative">
    <!-- <LazyProfileBillingModalsEditcard /> -->
    <!-- <ProfileBillingModalsAddnewCard/> -->

    <div class="space-y-[10px]">
      <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
        {{ $t("Orders") }}
      </h1>

      <h2
        class="ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
        {{
          $t(
            "Effortlessly track all your orders in one place, ensuring you stay updated on their status"
          )
        }}
      </h2>
    </div>
    <div v-if="loadingBlock" class="animate-pulse mt-[24px]">
      <div class="overflow-x-auto">
        <table
          class="min-w-full h-[250px] bg-white dark:bg-tamkinDarkPrimary last:rounded-b-[10px]"
        >
          <thead
            class="bg-white dark:bg-tamkinDarkPrimary border-b text-[12px] leading-[18px] text-[#999999]"
          >
            <tr>
              <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
                {{ $t("Order ID") }}
              </th>
              <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
                {{ $t("Order items") }}
              </th>
              <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
                {{ $t("Payment Method") }}
              </th>
              <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
                {{ $t("Price") }}
              </th>
              <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
                {{ $t("order_status") }}
              </th>
              <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
                {{ $t("Date Order") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Placeholder Rows -->
            <tr
              v-for="n in 5"
              :key="n"
              class="border-t border-gray-200 table-row"
            >
              <td
                class="px-6 py-3 rtl:text-right ltr:text-left whitespace-nowrap"
              >
                <div class="h-4 dark:bg-p bg-gray-200 rounded"></div>
              </td>
              <td class="px-6 py-3 rtl:text-right ltr:text-left">
                <div class="h-4 dark:bg-p bg-gray-200 rounded w-3/4"></div>
              </td>
              <td class="px-6 py-3 rtl:text-right ltr:text-left">
                <div class="h-4 dark:bg-p bg-gray-200 rounded w-1/2"></div>
              </td>
              <td class="px-6 py-3 rtl:text-right ltr:text-left">
                <div class="h-4 dark:bg-p bg-gray-200 rounded w-1/4"></div>
              </td>
              <td class="px-6 py-3 rtl:text-right ltr:text-left">
                <div class="h-4 dark:bg-p bg-gray-200 rounded w-2/4"></div>
              </td>
              <td class="px-6 py-3 rtl:text-right ltr:text-left">
                <div class="h-4 dark:bg-p bg-gray-200 rounded w-1/3"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="orders?.length > 0" class="overflow-x-auto mt-[24px]">
      <table
        class="min-w-full bg-white dark:bg-tamkinDarkPrimary last:rounded-b-[10px]"
      >
        <thead
          class="bg-white dark:bg-tamkinDarkPrimary border-b text-[12px] leading-[18px] text-[#999999]"
        >
          <tr>
            <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
              {{ $t("Order ID") }}
            </th>
            <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
              {{ $t("Order items") }}
            </th>
            <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
              {{ $t("Payment Method") }}
            </th>
            <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
              {{ $t("Price") }}
            </th>
            <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
              {{ $t("order_status") }}
            </th>
            <th class="py-3 px-6 rtl:text-right ltr:text-left font-[500]">
              {{ $t("Date Order") }}
            </th>
          </tr>
        </thead>
        <tbody
          class="text-[#1C1C1C] dark:text-whiteTamkin text-[14px] font-[400] leading-[18px]"
        >
          <template v-for="order in paginatedRows" :key="order.id">
            <tr
              class="border-t border-gray-200 table-row cursor-pointer hover:dark:bg-p hover:dark:text-whiteTamkin hover:bg-gray-100"
              @click="$router.push(localePath('/orders/' + order.name))"
            >
              <td
                class="px-6 py-3 rtl:text-right ltr:text-left whitespace-nowrap"
              >
                <!-- <span>#CM9801</span> -->
                <span>{{ order.name }}</span>
              </td>
              <td class="px-6 py-3 rtl:text-right ltr:text-left">
                <div
                  class="flex items-center rtl:space-x-reverse space-x-[8px]"
                >
                  <div
                    class="flex items-center justify-center border-[1px] border-[#E6E8EC] rounded-full w-[24px] h-[24px]"
                  >
                    <img
                      src="/imgs/invoice.png"
                      class="h-[16px] w-[16px]"
                      alt=""
                    />
                  </div>

                  <!-- <span class="w-20 truncate">Special Character</span> -->
                  <span class="w-20 truncate">{{ $t(order.orderitems) }}</span>
                </div>
              </td>
              <td class="px-6 py-3 rtl:text-right ltr:text-left">
                <div class="flex items-center">
                  <img
                    :src="getPaymentImage(order.payment_method)"
                    alt="Placeholder"
                    class="w-[24px] h-[24px] rtl:ml-2 ltr:mr-2"
                  />

                  <span>{{ $t(order.payment_method) }}</span>
                </div>
              </td>
              <td class="px-6 py-3 rtl:text-right ltr:text-left uppercase">
                <span
                  >{{ order.price }}
                  <span>{{
                    order.currency ? order.currency : "USD"
                  }}</span></span
                >
              </td>
              <td class="px-6 py-3 rtl:text-right ltr:text-left">
                <div
                  class="flex items-center ml-1 rtl:space-x-reverse space-x-[8px]"
                >
                  <div
                    class="flex items-center justify-center"
                    :class="
                      order.order_status === 'Rejected' ||
                      order.order_status === 'Cancelled'
                        ? 'w-[24px] h-[24px]'
                        : 'w-[24px] h-[24px]'
                    "
                  >
                    <img
                      :src="getStatusImage(order.order_status)"
                      alt="Placeholder"
                      class="w-full h-full object-contain"
                      :class="
                        order.order_status === 'Declined' ||
                        order.order_status === 'Cancelled'
                          ? '!w-[18px] !h-[18px]'
                          : 'w-[24px] h-[24px]'
                      "
                    />
                  </div>
                  <span>{{ $t(order.order_status) }}</span>
                </div>
              </td>

              <td class="px-6 py-3 rtl:text-right ltr:text-left">
                <div
                  class="flex items-center rtl:space-x-reverse space-x-[8px]"
                >
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.5 1V0.5C8.5 0.223858 8.72386 0 9 0C9.27614 0 9.5 0.223858 9.5 0.5V1H11C11 1 11.4142 1 11.7071 1.29289C11.7071 1.29289 12 1.58579 12 2V12C12 12 12 12.4142 11.7071 12.7071C11.7071 12.7071 11.4142 13 11 13H1C1 13 0.585785 13 0.292893 12.7071C0.292893 12.7071 0 12.4142 0 12V2C0 2 0 1.58579 0.292893 1.29289C0.292893 1.29289 0.585786 1 1 1H2.5V0.5C2.5 0.223858 2.72386 0 3 0C3.27614 0 3.5 0.223858 3.5 0.5V1H8.5ZM1 5V12H11V5H1ZM11 4H1V2H2.5V2.5C2.5 2.77614 2.72386 3 3 3C3.27614 3 3.5 2.77614 3.5 2.5V2H8.5V2.5C8.5 2.77614 8.72386 3 9 3C9.27614 3 9.5 2.77614 9.5 2.5V2H11V4Z"
                      fill="black"
                      fill-opacity="0.4"
                    />
                  </svg>
                  <span class="">{{
                    new Date(order.date_order).toLocaleDateString()
                  }}</span>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <div
      v-if="orders?.length == 0 && !loadingBlock"
      class="bg-white w-full h-[250px] mt-[32px] flex flex-col items-center justify-center rounded-[10px] space-y-[16px] p-[32px]"
    >
      <img src="/imgs/no_orders.png" class="w-[67px] h-[71px]" alt="" />
      <div
        class="text-[14px] leading-[28px] font-[400] text-darkGrey w-1/4 text-center"
      >
        {{ $t("There are no orders at the moment") }}
      </div>
    </div>

    <div
      v-if="orders.length > 0"
      class="flex flex-col lg:flex-row md:flex-row justify-between items-center pb-[16px] mt-[16px]"
    >
      <div class="flex items-center rtl:space-x-reverse space-x-2 mb-4 lg:mb-0">
        <span
          class="dark:text-whiteTamkin text-darkGrey text-[13px] leading-[21px] font-[400]"
        >
          {{ $t("Per Page") }}
        </span>
        <div class="flex rtl:space-x-reverse space-x-2">
          <!-- Static buttons for per-page options -->
          <button
            :class="[
              'px-3 py-1 rounded-md text-white focus:outline-none !text-[13px]',
              {
                'bg-[#2dada3]': pageSize === 10,
                'bg-[#A7A7A7]': pageSize !== 10,
              },
            ]"
            @click="setPageSize(10)"
          >
            10
          </button>
          <button
            :class="[
              'px-3 py-1 rounded-md text-white focus:outline-none !text-[13px]',
              {
                'bg-[#2dada3]': pageSize === 20,
                'bg-[#A7A7A7]': pageSize !== 20,
              },
            ]"
            @click="setPageSize(20)"
          >
            20
          </button>
          <button
            :class="[
              'px-3 py-1 rounded-md text-white focus:outline-none !text-[13px]',
              {
                'bg-[#2dada3]': pageSize === 50,
                'bg-[#A7A7A7]': pageSize !== 50,
              },
            ]"
            @click="setPageSize(50)"
          >
            50
          </button>
        </div>
      </div>
      <div class="flex items-center rtl:space-x-reverse space-x-2">
        <span
          class="text-darkGrey dark:text-whiteTamkin text-[13px] leading-[21px] font-[400]"
        >
          {{ $t("Page") }}
        </span>
        <button
          class="p-[4px] rounded-md bg-transparent !text-[13px] dark:text-whiteTamkin text-darkGrey hover:bg-light-grey"
          @click="prevPage"
          :disabled="currentPage === 1"
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
              d="M12.9254 4.55806C13.1915 4.80214 13.1915 5.19786 12.9254 5.44194L8.4375 9.55806C8.17138 9.80214 8.17138 10.1979 8.4375 10.4419L12.9254 14.5581C13.1915 14.8021 13.1915 15.1979 12.9254 15.4419C12.6593 15.686 12.2278 15.686 11.9617 15.4419L7.47378 11.3258C6.67541 10.5936 6.67541 9.40641 7.47378 8.67418L11.9617 4.55806C12.2278 4.31398 12.6593 4.31398 12.9254 4.55806Z"
              class="fill-[#585B5B] dark:fill-whiteTamkin"
            />
          </svg>
        </button>
        <div class="flex rtl:space-x-reverse space-x-2">
          <!-- Static buttons for page numbers -->
          <button
            v-if="totalPages > 5 && currentPage > 3"
            @click="currentPage = 1"
            class="px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin flex items-center justify-center hover:bg-light-grey"
          >
            1
          </button>
          <button
            v-if="totalPages > 5 && currentPage > 4"
            class="px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin flex items-center justify-center hover:bg-light-grey"
          >
            ...
          </button>

          <!-- Show page numbers around the current page -->
          <button
            v-for="page in pageButtons"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin flex items-center justify-center',
              {
                'bg-gradient-to-b from-[#2dada3] to-[#71dad2] text-white':
                  currentPage === page,
                'hover:bg-light-grey': currentPage !== page,
              },
            ]"
          >
            {{ page }}
          </button>

          <!-- Always show the last two pages -->
          <button
            v-if="totalPages > 5 && currentPage < totalPages - 3"
            class="px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin flex items-center justify-center hover:bg-light-grey"
          >
            ...
          </button>
          <button
            v-if="totalPages > 5 && currentPage < totalPages - 2"
            @click="currentPage = totalPages"
            class="px-3 py-1 rounded-md w-[28px] h-[28px] bg-transparent text-darkGrey dark:text-whiteTamkin flex items-center justify-center hover:bg-light-grey"
          >
            {{ totalPages }}
          </button>
        </div>
        <button
          class="p-[4px] rounded-md bg-transparent text-darkGrey dark:text-whiteTamkin hover:bg-light-grey"
          @click="nextPage"
          :disabled="currentPage >= totalPages"
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
  </div>
</template>

<style>
.table-row:last-child {
  border-bottom: none !important;
}
</style>
