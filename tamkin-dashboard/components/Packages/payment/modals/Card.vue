<script lang="ts" setup>
import { useModalManager } from "@/composables/useModalManager";
import { useFullUrl } from "@/composables/useSharedFunctions";
import { usePayByCorPaypal } from "@/composables/usePackages";
import { useCouponCode } from "@/composables/useMarket";
const { locale } = useI18n();
const navbarStore = useNavbarStore();
const { paybycorpaypal, messageData, codeStatus } = usePayByCorPaypal();
const { ApplyCoupon } = useCouponCode();
const billingStore = useBillingStore();
const packagesStore = usePackgesStore();
import {
  useGetCards,
  useDeleteCard,
  useInvoices,
  useInvoicePdf,
} from "@/composables/useBilling";
const { $toast } = useNuxtApp();
const { getCards } = useGetCards();
const { fullUrl } = useFullUrl();
const cardOptions = ref({
  disabled: true,
});

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  setData,
} = useModalManager();
const colorMode = useColorMode();

const currentCard = ref("");
const loading = ref(false);
const isPromoFilled = ref(false);
const promo = ref("");
const validPromo = ref(false);
const showMoreMethods = ref(false);
const chooseOtherPaymentMethod = ref("");
const loadingPayment = ref(false);
const urlPayment = ref("");
watch(promo, (ov, nv) => {
  return promo.value.length > 0
    ? (isPromoFilled.value = true)
    : (isPromoFilled.value = false);
});
const clearInput = () => {
  promo.value = "";
  validPromo.value = false;
};
const addPromoCode = async () => {
  if (promo.value) {
    const code = await ApplyCoupon(promo.value);
    validPromo.value = !validPromo.value;
  }
};
const gotoPaymentMethod = () => {
  if (chooseOtherPaymentMethod.value === "by_crypto") {
    navigateTo("cardModal_packages", "packages", "crypto_packages_step1");
  } else {
    navigateTo("cardModal_packages", "packages", "paypal_packages");
  }
};
const removePromoCode = () => {
  if (promo.value) {
    validPromo.value = !validPromo.value;
    promo.value = "";
  }
};
const selectedPaymentMethod = ref("");
const changeCurrentCard = (savedCard: any) => {
  currentCard.value = savedCard.id;
  chooseOtherPaymentMethod.value = "";
  showMoreMethods.value = false;
  // alert('selected')
};

const changepaymentMethod = (method: any) => {
  if (packagesStore.packagePayload.payDateType === 0) {
    return false;
  } else {
    chooseOtherPaymentMethod.value = method;
    currentCard.value = "";
  }
};

watch(currentCard, (ov, nv) => {});
const props = defineProps({
  showModal: Boolean,
});
const usepaystore = usePaymentStore();
const handleIframeMessage = (event) => {
  if (event.data && event.data.event === "paid") {
    // alert('yea')
    usepaystore.stateOfPayment = "paid";
    // packagesStore.removeMultipleFromCart(packagesStore.cartItems)
    navigateTo("cardModal_packages", "packages", "success_pay_package");
    urlPayment.value = "";
    loadingPayment.value = false;
    packagesStore.currentPackage = "";
    packagesStore.urls = "";
  } else if (event.data && event.data.event === "faild") {
    usepaystore.stateOfPayment = "failed";
    // packagesStore.removeMultipleFromCart(packagesStore.cartItems)

    navigateTo("cardModal_packages", "packages", "success_pay_package");
    urlPayment.value = "";
    loadingPayment.value = false;
  }
};
/**
 * Called when the iframe has finished loading.
 * Currently just logs a message to the console
 */
function onIframeLoad() {
  // console.log('Iframe has loaded');
}
const iframe = ref(null);
const loadingCards = ref(true);
onMounted(async () => {
  urlPayment.value = "";
  await getCards();
  loadingCards.value = false;

  if (billingStore.cards.length) {
    const primaryCard = billingStore.cards.find(
      (card) => card.isprimary === true
    );
    if (primaryCard) {
      currentCard.value = primaryCard.id;
    }
  }

  window.addEventListener("message", handleIframeMessage);
  // window.addEventListener('failed', handleIframeMessage);
});
const continueCheckOut = async () => {
  loadingPayment.value = true;
  const res = await paybycorpaypal(currentCard.value, "Card");
  // loadingPayment.value = false;

  // return navigateTo('cardModal','add-site','crypto')
  if (
    codeStatus.value === 200 &&
    res !== "A 3-day trial package is configured in the app"
  ) {
    const resTheme = colorMode.value === "dark" ? res + "&is_dark=1" : res;

    urlPayment.value = resTheme;

    // packagesStore.removeMultipleFromCart(packagesStore.cartItems);
    packagesStore.urls = [];
    packagesStore.promo = "";
    packagesStore.validPromo = false;
    packagesStore.currentDiscount = 0;
  } else if (res === "A 3-day trial package is configured in the app") {
    packagesStore.urls = [];
    usePaymentStore().stateOfPayment = "paid";
    return navigateTo("cardModal_packages", "packages", "success_pay_package");
  } else {
    $toast(messageData.value, { hideIn: 3000, type: "error" });
    loadingPayment.value = false;
    urlPayment.value = "";
  }
};
const percentageOff = computed(() => {
  const cartTotal = packagesStore.packagePayload.total;
  const discountPercentage = packagesStore.currentDiscount;

  if (discountPercentage > 0 && cartTotal > 0) {
    return cartTotal * (discountPercentage / 100);
  }
  return 0;
});

onBeforeUnmount(() => {
  window.removeEventListener("message", handleIframeMessage);
});
</script>

<template>
  <div
    class="bg-selected dark:bg-p fixed z-[9999] top-[0] left-0 rtl:lg:left-0 ltr:lg:left-auto ltr:lg:right-0 rounded-[10px] p-[20px] lg:w-[600px] w-full h-full lg:h-screen !overflow-y-auto lg:overflow-x-hidden"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      v-if="!urlPayment"
      class="close_btn_payment !cursor-pointer z-[999] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin !top-[23px]"
      @click="
        () => {
          closeModal('cardModal_packages');
          packagesStore.selectedPaymentMethod = '';
        }
      "
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
    <div class="w-full h-full">
      <div class="flex flex-col items-start justify-center w-full">
        <div class="flex items-center justify-center">
          <div
            v-if="!urlPayment"
            @click="
              navigateTo(
                'cardModal_packages',
                'packages',
                'payment_methods_packages'
              )
            "
            class="cursor-pointer close_sidebar_btn group flex items-center justify-center bg-white dark:bg-tamkinDarkPrimary border-[1px] rtl:rotate-180 border-linecolor rounded-full w-[30px] h-[30px]"
            style="box-shadow: 0px 4px 8.7px 0px #daf3f1"
          >
            <svg
              width="9"
              height="15"
              viewBox="0 0 9 15"
              fill="none"
              class="fill-tamkin group-hover:stroke-white dark:group-hover:stroke-light group-hover:fill-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"
              />
            </svg>
          </div>
          <h1
            class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin rtl:mr-[20px] ltr:ml-[20px] lg:mt-0 mt-[0px]"
          >
            {{ $t("Payment processes") }}
          </h1>
        </div>
        <div
          class="flex flex-col items-start justify-center bg-white dark:bg-tamkinDarkPrimary w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
          style="box-shadow: 0px 4px 24px 8px #51459f14"
        >
          <h1
            class="text-[18px] leading-[36px] font-[600] rtl:mr-[20px] ltr:ml-[20px] text-darkGrey dark:text-whiteTamkin mt-[31px]"
          >
            {{ $t("Cards Payment") }}
          </h1>
          <p
            v-if="!urlPayment"
            class="rtl:mr-[20px] ltr:ml-[20px] text-[14px] font-[400] leading-[22.5px] mt-[14px] dark:text-whiteTamkin/80"
          >
            {{
              $t("Choose the payment method you want to complete this payment")
            }}
          </p>

          <div
            class="flex flex-col items-center justify-start w-full px-[20px] space-y-[10px] mt-[24px]"
            v-if="loadingCards"
          >
            <div
              v-for="n in 3"
              :key="n"
              class="w-full h-[87px] bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-between rounded-[10px] border-[1px] border-lightGrey rtl:pr-[16px] ltr:pl-[16px]"
            >
              <div
                class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
              >
                <div
                  class="bg-gray-300 dark:bg-gray-600 rounded-[10px] w-[44px] h-[30px]"
                ></div>
                <div class="flex items-center justify-between w-full">
                  <div
                    class="flex flex-col items-start justify-start relative w-full"
                  >
                    <div
                      class="absolute top-[10px] rtl:right-[50%] md:rtl:right-[250px] ltr:left-[40%] md:ltr:left-[250px] w-[62px] h-[23px] rounded-[17px] bg-gray-300 dark:bg-gray-600"
                    ></div>
                    <div
                      class="text-[16px] leading-[44px] font-[600] font-[Inter] text-gray-300 dark:text-gray-500 flex items-center justify-start rtl:space-x-reverse space-x-[16px]"
                    >
                      <div
                        class="bg-gray-300 dark:bg-gray-600 rounded w-36 h-[16px]"
                      ></div>
                      <div
                        class="bg-gray-300 dark:bg-gray-600 rounded w-10 h-[16px]"
                      ></div>
                    </div>
                    <div
                      class="bg-gray-300 dark:bg-gray-600 w-[100px] h-[10px] rounded mt-1"
                    ></div>
                  </div>
                  <div
                    class="rtl:mr-auto ltr:ml-auto rtl:ml-[16px] ltr:mr-[16px]"
                  >
                    <span
                      class="w-[24px] h-[24px] bg-gray-300 dark:bg-gray-600 inline-block rounded-full border"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-center space-y-[12px] mt-[24px] mx-auto w-full"
            v-if="!urlPayment"
          >
            <div
              class="flex flex-col items-center justify-start w-full px-[20px] space-y-[10px]"
              v-if="
                billingStore.cards &&
                billingStore.cards.length !== 0 &&
                !loadingCards
              "
            >
              <div
                v-for="savedCard in billingStore.cards"
                @click="changeCurrentCard(savedCard)"
                :key="savedCard.name"
                :class="[
                  currentCard === savedCard.id
                    ? 'custom-border-tamkin'
                    : 'border-[1px] ',
                ]"
                class="w-full h-[87px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary cursor-pointer flex items-center justify-between rounded-[10px] border-lightGrey rtl:pr-[16px] ltr:pl-[16px]"
              >
                <div
                  class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
                >
                  <div class="w-[44px]">
                    <img
                      :src="fullUrl(savedCard.logo)"
                      class="w-[44px] h-[44px]"
                    />
                  </div>
                  <div class="flex items-center justify-between w-full">
                    <div
                      class="flex flex-col items-start justify-start relative w-full"
                    >
                      <div
                        class="absolute top-[10px] rtl:right-[39%] md:rtl:right-[250px] ltr:left-[39%] md:ltr:left-[250px] w-[62px] h-[23px] rounded-[17px] bg-gradient-to-br flex items-center justify-center from-tamkinStart to-tamkinEnd"
                        v-if="savedCard.isprimary"
                      >
                        <div class="text-[10px] font-[500] text-white">
                          {{ $t("Default") }}
                        </div>
                      </div>

                      <div
                        class="text-[12px] md:text-[16px] leading-[44px] font-[600] font-[Inter] text-darkGrey dark:text-whiteTamkin flex items-center justify-start rtl:space-x-reverse space-x-[16px]"
                      >
                        <div class="w-36 truncate">
                          {{ savedCard.holdername }}
                        </div>
                        <div>****{{ savedCard.last4 }}</div>
                      </div>
                      <div
                        class="text-darkGrey text-[13px] dark:text-white/70 font-[400] leading-[10px]"
                      >
                        {{ $t("Expires on") }} &nbsp;{{ savedCard.expmonth }} /
                        {{ savedCard.expyear }}
                      </div>
                    </div>
                    <div
                      class="rtl:mr-auto ltr:ml-auto rtl:ml-[16px] ltr:mr-[16px]"
                    >
                      <input
                        :id="'radio_' + savedCard.id"
                        type="radio"
                        name="radio"
                        class="hidden"
                        :value="savedCard.id"
                        @click.stop
                        v-model="currentCard"
                        number
                      />
                      <label
                        :for="'radio_' + savedCard.id"
                        class="flex items-center cursor-pointer"
                      >
                        <span
                          class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="billingStore.cards?.length === 0 && !loadingCards"
              class="bg-white w-full h-[250px] mt-[32px] rounded-[10px] p-[32px] dark:bg-tamkinDarkPrimary"
            >
              <div
                class="flex flex-col items-center justify-center mt-[24px] space-y-[10px]"
              >
                <img
                  src="/imgs/no_methods.png"
                  class="w-[51px] h-[35px]"
                  alt=""
                />
                <div
                  class="text-[14px] leading-[28px] font-[400] text-darkGrey dark:text-white text-center"
                >
                  {{ $t(`You haven't added any cards yet`) }}
                </div>
              </div>
            </div>

            <div
              class="flex items-center justify-between w-full px-[20px]"
              v-if="!loadingCards"
            >
              <div
                class="flex items-center rtl:space-x-reverse space-x-[5px] md:space-x-[10px] mt-[24px]"
                @click="
                  navigateTo(
                    'cardModal_packages',
                    'packages',
                    'add_new_card_billing'
                  )
                "
              >
                <div class="cursor-pointer">
                  <img
                    v-if="navbarStore.isDark"
                    src="/assets/imgs/payment_methods/new_card_dark.svg"
                  />
                  <img v-else src="/assets/imgs/payment_methods/new_card.svg" />
                </div>
                <div
                  class="text-[13px] md:text-[14px] font-[600] leading-[24px] text-darkGrey dark:text-whiteTamkin"
                >
                  {{ $t("Add New Card") }}
                </div>
              </div>

              <div
                class="flex items-center rtl:space-x-reverse space-x-[5px] md:space-x-[11px] mt-[24px]"
                @click="showMoreMethods = !showMoreMethods"
              >
                <div class="cursor-pointer">
                  <div
                    class="text-[13px] md:text-[14px] font-[500] underline leading-[24px] text-darkGrey dark:text-whiteTamkin"
                  >
                    {{ $t("Show all payment options") }}
                  </div>
                </div>
                <div class="cursor-pointer">
                  <img
                    src="/assets/imgs/arrow-right.svg"
                    class="w-[10px] h-[10px] rtl:rotate-180"
                    :class="[showMoreMethods ? '!rotate-90' : '']"
                  />
                </div>
              </div>
            </div>
            <div
              v-else
              class="flex items-center lg:flex-row flex-col lg:justify-between w-full px-[20px] animate-pulse"
            >
              <!-- Left section for adding a new card -->
              <div
                class="flex items-center rtl:space-x-reverse space-x-[5px] md:space-x-[10px] mt-[24px]"
              >
                <div
                  class="cursor-pointer w-[40px] h-[40px] bg-gray-300 dark:bg-gray-600 rounded-md"
                ></div>
                <div
                  class="h-[24px] w-[150px] bg-gray-300 dark:bg-gray-600 rounded-md"
                ></div>
              </div>

              <!-- Right section for showing more payment options -->
              <div
                class="flex items-center rtl:space-x-reverse space-x-[5px] md:space-x-[11px] mt-[24px]"
              >
                <div
                  class="h-[24px] w-[180px] bg-gray-300 dark:bg-gray-600 rounded-md"
                ></div>
                <div
                  class="w-[10px] h-[10px] bg-gray-300 dark:bg-gray-600 rounded-full"
                ></div>
              </div>
            </div>

            <!-- here-->

            <!-- here-->

            <div class="w-full px-[20px]" v-if="showMoreMethods">
              <div
                @click="changepaymentMethod('by_crypto')"
                :class="[
                  chooseOtherPaymentMethod == 'by_crypto'
                    ? 'custom-border-tamkin'
                    : 'border-[1px] ',
                  packagesStore.packagePayload.payDateType === 0
                    ? '!cursor-not-allowed opacity-50'
                    : '',
                ]"
                class="mx-auto w-full h-[87px] cursor-pointer bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-between rounded-[10px] border-lightGrey dark:border-darkborder ltr:pl-[16px] rtl:pr-[16px]"
              >
                <div
                  class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]"
                >
                  <div>
                    <img
                      src="/assets/imgs/payment_methods/crypto.svg"
                      class="w-[40px] h-[40px]"
                    />
                  </div>
                  <div
                    class="text-[16px] leading-[44px] rtl:font-[Almarai] ltr:font-[Poppins] font-[600] text-darkGrey dark:text-whiteTamkin"
                  >
                    {{ $t("Pay Via Crypto") }}
                  </div>
                </div>
                <div class="order-1 mx-[4px]">
                  <input
                    id="radio_crypto"
                    type="radio"
                    name="radio"
                    class="hidden"
                    value="by_crypto"
                    :disabled="packagesStore.packagePayload.payDateType === 0"
                    @click.stop="changepaymentMethod('by_crypto')"
                    :checked="chooseOtherPaymentMethod === 'by_crypto'"
                  />
                  <label
                    for="radio_crypto"
                    class="flex items-center cursor-pointer ltr:pr-[40px] rtl:pl-[40px]"
                  >
                    <span
                      class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                    ></span>
                  </label>
                </div>
              </div>
            </div>
            <div class="w-full px-[20px]" v-if="showMoreMethods">
              <div
                @click="changepaymentMethod('by_paypal')"
                :class="[
                  chooseOtherPaymentMethod == 'by_paypal'
                    ? 'custom-border-tamkin'
                    : 'border-[1px] ',
                  packagesStore.packagePayload.payDateType === 0
                    ? '!cursor-not-allowed opacity-50'
                    : '',
                ]"
                class="mx-auto w-full h-[87px] cursor-pointer bg-[#FAFCFE] dark:bg-tamkinDarkPrimary flex items-center justify-between rounded-[10px] border-lightGrey dark:border-darkborder ltr:pl-[16px] rtl:pr-[16px]"
              >
                <div
                  class="flex items-center justify-start rtl:space-x-reverse space-x-[13px]"
                >
                  <div>
                    <img
                      src="/assets/imgs/payment_methods/paypal.svg"
                      class="w-[40px] h-[40px]"
                    />
                  </div>
                  <div
                    class="text-[16px] leading-[44px] rtl:font-[Almarai] font-[600] text-darkGrey dark:text-whiteTamkin"
                  >
                    {{ $t("Pay Via PayPal") }}
                  </div>
                </div>
                <div class="order-1 mx-[4px]">
                  <input
                    id="radio_paypal"
                    type="radio"
                    name="radio"
                    class="hidden"
                    value="by_paypal"
                    :class="[
                      packagesStore.packagePayload.payDateType === 0
                        ? '!cursor-not-allowed opacity-50'
                        : '',
                    ]"
                    :disabled="packagesStore.packagePayload.payDateType === 0"
                    @click.stop="changepaymentMethod('by_paypal')"
                    :checked="chooseOtherPaymentMethod === 'by_paypal'"
                  />
                  <label
                    for="radio_paypal"
                    class="flex items-center cursor-pointer ltr:pr-[40px] rtl:pl-[40px]"
                  >
                    <span
                      class="w-[24px] h-[24px] bg-white dark:bg-tamkinDarkPrimary inline-block mr-1 rounded-full border border-tamkin"
                    ></span>
                  </label>
                </div>
              </div>
            </div>

            <div
              class="flex flex-col items-center justify-center space-y-[12px] mx-auto w-full"
            >
              <div
                class="flex items-center justify-center rtl:space-x-reverse space-x-[10px] md:space-x-[24px] w-full px-[20px]"
              >
                <div
                  class="lg:py-[17px] search_input w-full lg:w-3/4 mt-[24px]"
                >
                  <input
                    type="text"
                    @input="packagesStore.noDiscount = false"
                    class="input_dashboard_search max-md:!px-[15px] w-full text-darkGrey dark:text-whiteTamkin !h-[40px]"
                    v-model="packagesStore.promo"
                    :placeholder="$t('Promo Code')"
                    :class="[
                      packagesStore.validPromo
                        ? '!bg-[#E8F8F6] dark:!bg-[#170705] !text-[#E8F8F6] dark:!text-[#170705] '
                        : '',
                      packagesStore.noDiscount
                        ? '!bg-red-500/10 !text-red-500 !border-red-500'
                        : '',
                    ]"
                  />

                  <div
                    class="absolute top-[-8px] lg:top-[8px] right-0 left-0 max-md:px-1 p-[16px] flex items-center justify-evenly rtl:space-x-reverse space-x-1 md:space-x-[10px]"
                    v-if="packagesStore.validPromo"
                  >
                    <img
                      src="/assets/imgs/promo_valid.svg"
                      class="max-md:w-[16px]"
                    />
                    <div
                      class="text-[13px] md:text-[15px] font-[500] text-darkGrey dark:text-white/70"
                    >
                      <span class="text-[#021328] font-[700] dark:text-white"
                        >{{ packagesStore.currentDiscount }}%</span
                      >
                      {{ $t("Discount") }} (-${{ percentageOff.toFixed(0) }})
                    </div>
                    <img
                      src="/assets/imgs/promo_valid_.svg"
                      class="max-md:w-[18px]"
                    />
                  </div>
                  <div
                    v-if="
                      packagesStore.isPromoFilled && !packagesStore.noDiscount
                    "
                    @click="clearInput"
                    class="absolute top-[-8px] lg:top-[-27px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer lg:mt-[36px]"
                  >
                    <img src="/assets/imgs/close_promo.svg" />
                  </div>
                </div>

                <div class="text-center mt-[24px] w-auto md:w-2/6">
                  <button
                    class="btn-dashboard max-md:!text-[13px] hover_tamkin w-full mx-auto text-center text-nowrap"
                    @click="packagesStore.addPromoCode"
                    :disabled="
                      !packagesStore.promo || packagesStore.loadingPromo
                    "
                    v-if="!packagesStore.validPromo"
                  >
                    <div class="flex items-center justify-center">
                      <div
                        :class="
                          packagesStore.loadingPromo ? 'rtl:ml-2 ltr:mr-2' : ''
                        "
                      >
                        {{ $t("Apply code") }}
                      </div>

                      <svg
                        v-if="packagesStore.loadingPromo"
                        class="animate-spin h-5 w-5 text-white"
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
                    </div>
                  </button>
                  <button
                    v-else
                    class="btn_bordered_dashboard max-md:!text-[13px] error text-nowrap w-auto md:w-[140px] mx-auto text-center"
                    @click="packagesStore.removePromoCode"
                  >
                    {{ $t("Remove Code") }}
                  </button>
                </div>
              </div>
              <div
                v-if="packagesStore.noDiscount"
                class="rtl:ml-auto ltr:!mr-auto px-[20px] !-mt-4 text-[12px] text-red-500"
              >
                {{ $t("Coupon code not found") }}
              </div>
            </div>
            <table class="min-w-full">
              <thead>
                <tr>
                  <th
                    class="py-2 rtl:pr-[20px] ltr:pl-[20px] border-b dark:border-darkborder text-[16px] leading-[30px] text-darkGrey dark:text-whiteTamkin font-[600] ltr:text-left rtl:text-right"
                    colspan="12"
                  >
                    {{ $t("Summary") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
                  v-if="percentageOff"
                >
                  <td
                    class="py-2 px-5 border-b dark:border-darkborder dark:text-whiteTamkin text-right font-[500] w-full"
                    colspan="2"
                  >
                    {{ $t("Subtotal") }}
                  </td>
                  <td
                    class="py-2 px-5 border-b dark:border-darkborder dark:text-whiteTamkin/80 text-right w-full font-[500]"
                    colspan="2"
                  >
                    ${{ packagesStore.packagePayload.total.toFixed(0) }}
                  </td>
                </tr>
                <tr
                  v-if="percentageOff"
                  class="text-[16px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
                >
                  <td
                    class="py-2 px-5 border-b dark:border-darkborder text-right font-[500] w-full dark:text-whiteTamkin"
                    colspan="2"
                  >
                    {{ $t("Discount") }}
                  </td>
                  <td
                    class="py-2 px-5 border-b dark:border-darkborder text-right w-full font-[500] dark:text-whiteTamkin/80"
                    colspan="2"
                  >
                    ${{ percentageOff.toFixed(0) }}
                  </td>
                </tr>
                <tr
                  class="text-[16px] leading-[24px] font-[500] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
                >
                  <td
                    class="py-2 px-5 border-b dark:border-darkborder text-right font-[500] w-full dark:text-whiteTamkin"
                    colspan="2"
                  >
                    {{ $t("Total") }}
                  </td>
                  <td
                    class="py-2 px-5 border-b dark:border-darkborder text-right w-full font-[500] dark:text-whiteTamkin/80"
                    colspan="2"
                  >
                    ${{
                      (
                        Number(packagesStore.packagePayload.total) -
                        percentageOff
                      )
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            class="mt-[39px] w-full mx-auto mb-[34px] px-[20px]"
            v-if="chooseOtherPaymentMethod !== ''"
          >
            <button
              class="btn-dashboard hover_tamkin w-full"
              @click="gotoPaymentMethod"
            >
              {{ $t("Switch Payment Method") }}
            </button>
          </div>
          <div
            class="mt-[39px] w-full mx-auto mb-[34px] px-[20px]"
            v-else-if="!urlPayment && !chooseOtherPaymentMethod"
          >
            <button
              class="btn-dashboard hover_tamkin w-full"
              @click="continueCheckOut"
              :disabled="
                !currentCard ||
                billingStore.cards.length === 0 ||
                loadingPayment
              "
            >
              <div class="flex items-center justify-center">
                <div :class="loadingPayment ? 'rtl:ml-2 ltr:mr-2' : ''">
                  {{ $t("Confirm Payment") }}
                </div>

                <svg
                  v-if="loadingPayment"
                  class="animate-spin h-5 w-5 text-white"
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
              </div>
            </button>
          </div>

          <div v-if="urlPayment" class="px-[20px] w-full mb-[14px] mt-[14px]">
            <iframe
              ref="iframe"
              :src="urlPayment"
              @load="onIframeLoad"
              class="w-full aspect-square"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
