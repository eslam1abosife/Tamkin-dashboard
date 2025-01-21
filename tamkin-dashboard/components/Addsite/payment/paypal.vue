<script lang="ts" setup>
import { useModalManager } from "@/composables/useModalManager";
import { usePaybyPaypalOrCard } from "@/composables/useAddSite";
const { locale } = useI18n();

const { payaddsite, messageData, codeStatus } = usePaybyPaypalOrCard();
const addSiteStore = useAddSiteStore();

const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();
const { $toast } = useNuxtApp();
const loadingPayment = ref(false);
const showMoreMethods = ref(false);
const chooseOtherPaymentMethod = ref("");
watch(addSiteStore.promo, (ov, nv) => {
  return addSiteStore.promo.length > 0
    ? (addSiteStore.isPromoFilled = true)
    : (addSiteStore.isPromoFilled = false);
});
const clearInput = () => {
  addSiteStore.promo = "";
  addSiteStore.validPromo = false;
};
const changepaymentMethod = (method: any) => {
  chooseOtherPaymentMethod.value = method;
};
const redirectTo = computed(() => {
  return "/add-site";
});
const continueCheckOut = async () => {
  loadingPayment.value = true;
  const res = await payaddsite(null, "paypal", redirectTo.value);
  // alert(locale.value)
  if (codeStatus.value === 200) {
    //  console.log(res)
    // redirecct to res.data.data is a url
    window.location.href = res;

    loadingPayment.value = false;
  } else {
    $toast(messageData.value, { hideIn: 3000, type: "error" });
    loadingPayment.value = false;
  }
};
const props = defineProps({
  showModal: Boolean,
});

const percentageOff = computed(() => {
  const cartTotal = addSiteStore.packagePayload.total;
  const discountAmount = addSiteStore.currentDiscount;

  if (discountAmount > 0 && cartTotal > 0) {
    // Calculate the percentage of the discount relative to the total
    const discountPercentage = (discountAmount / cartTotal) * 100;
    return discountPercentage;
  }
  return 0;
});
const discountAmount = computed(() => {
  const cartTotal = addSiteStore.packagePayload.total;
  const discountPercentage = addSiteStore.currentDiscount;

  if (discountPercentage > 0 && cartTotal > 0) {
    // Calculate the amount of discount
    const amountDiscounted = (discountPercentage / 100) * cartTotal;
    return amountDiscounted;
  }
  return 0;
});
</script>

<template>
  <div
    v-if="isOpen('paypal_addsite')"
    class="bg-selected dark:bg-p fixed z-[9999] top-[0] rtl:lg:left-0 ltr:right-0 rounded-[10px] p-[20px] lg:w-[600px] w-full h-full lg:h-screen lg:overflow-x-hidden"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn_payment !cursor-pointer z-[999] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin !top-[23px]"
      @click="closeModal('paypal_addsite')"
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
        <div class="flex items-center justify-center mt-[-30px]">
          <div
            @click="
              navigateTo('paypal_addsite', 'addSite', 'payment_methods_addsite')
            "
            class="cursor-pointer close_sidebar_btn group flex items-center justify-center rtl:rotate-180 bg-white dark:bg-tamkinDarkPrimary border-[1px] border-linecolor rounded-full w-[30px] h-[30px]"
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
            class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin rtl:mr-[20px] ltr:ml-[20px] lg:mt-0 mt-[60px]"
          >
            {{ $t("Payment Process") }}
          </h1>
        </div>
        <div
          class="flex flex-col items-start justify-center bg-white dark:bg-tamkinDarkPrimary w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
          style="box-shadow: 0px 4px 24px 8px #51459f14"
        >
          <h1
            class="text-[18px] leading-[36px] font-[600] rtl:mr-[20px] ltr:ml-[20px] text-darkGrey dark:text-whiteTamkin mt-[31px]"
          >
            {{ $t("Paypal Payment") }}
          </h1>

          <div
            class="flex flex-col items-center justify-center space-y-[12px] mx-auto w-full"
          >
            <div
              class="flex items-center lg:flex-row flex-col justify-center lg:justify-between rtl:space-x-reverse space-x-[24px] w-full px-[20px]"
            >
              <div class="lg:py-[17px] search_input w-full lg:w-3/4 mt-[24px]">
                <input
                  type="text"
                  @input="addSiteStore.noDiscount = false"
                  class="input_dashboard_search w-full text-darkGrey dark:text-whiteTamkin !h-[40px]"
                  v-model="addSiteStore.promo"
                  :placeholder="$t('Promo Code')"
                  :class="[
                    addSiteStore.validPromo
                      ? '!bg-[#E8F8F6] dark:!bg-[#170705] !text-[#E8F8F6] dark:!text-[#170705] '
                      : '',
                    addSiteStore.noDiscount
                      ? '!bg-red-500/10 !text-red-500 !border-red-500'
                      : '',
                  ]"
                />

                <div
                  class="absolute top-[-8px] lg:top-[8px] rtl:right-[29px] ltr:left-[29px] p-[16px] flex items-center justify-evenly rtl:space-x-reverse space-x-[10px]"
                  v-if="addSiteStore.validPromo"
                >
                  <img src="/assets/imgs/promo_valid.svg" />
                  <div
                    class="text-[15px] font-[500] text-darkGrey dark:text-white/70"
                  >
                    <span class="text-[#021328] font-[700] dark:text-white"
                      >{{ addSiteStore.currentDiscount }}%</span
                    >
                    {{ $t("Discount") }} (-${{ discountAmount.toFixed(0) }})
                  </div>
                  <img src="/assets/imgs/promo_valid_.svg" class="" />
                </div>
                <div
                  v-if="addSiteStore.isPromoFilled && !addSiteStore.noDiscount"
                  @click="clearInput"
                  class="absolute top-[-8px] lg:top-[-27px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer lg:mt-[36px]"
                >
                  <img src="/assets/imgs/close_promo.svg" />
                </div>
              </div>

              <div class="text-center mt-[16px] lg:mt-[24px] w-2/6">
                <button
                  class="btn-dashboard hover_tamkin w-full mx-auto text-center"
                  @click="addSiteStore.addPromoCode"
                  :disabled="!addSiteStore.promo || addSiteStore.loadingPromo"
                  v-if="!addSiteStore.validPromo"
                >
                  <div class="flex items-center justify-center">
                    <div
                      :class="
                        addSiteStore.loadingPromo ? 'rtl:ml-2 ltr:mr-2' : ''
                      "
                    >
                      {{ $t("Apply code") }}
                    </div>

                    <svg
                      v-if="addSiteStore.loadingPromo"
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
                  class="btn_bordered_dashboard error w-[140px] mx-auto text-center"
                  @click="addSiteStore.removePromoCode"
                >
                  {{ $t("Remove Code") }}
                </button>
              </div>
            </div>
            <div
              v-if="addSiteStore.noDiscount"
              class="rtl:!ml-auto ltr:!mr-auto px-[20px] !-mt-4 text-[12px] text-red-500"
            >
              {{ $t("Coupon code not found") }}
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
                  v-if="addSiteStore.validPromo"
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
                    ${{
                      addSiteStore.packagePayload.total
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </td>
                </tr>
                <tr
                  v-if="addSiteStore.validPromo"
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
                    ${{
                      discountAmount
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
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
                      (addSiteStore.packagePayload.total - discountAmount)
                        .toFixed(0)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-[39px] w-full mx-auto mb-[34px] px-[20px]">
            <button
              class="btn-dashboard hover_tamkin w-full"
              @click="continueCheckOut()"
              :disabled="loadingPayment"
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
        </div>
      </div>
    </div>
  </div>
</template>
