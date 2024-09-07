<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { StripeElements, StripeElement } from "vue-stripe-js";
import { useNuxtApp } from "#app";
import { useRouter } from "vue-router";
import { useAddNewCard } from "~/composables/useBilling";
const { addNewCardToStripe } = useAddNewCard();
// Stripe publishable key
const stripeKey = ref(
  "pk_test_51PsNOm2M5zlGZwf5AZsxAxBBW65wE8IWHIHQMXGYfV3XbXAgGv1Ca3HMooFq2O9zcEfpQsk9baxN1ki6vnIca0ag00QCvJdwBM"
);
const stripeLoaded = ref(false);
const cardOptions = ref({ hidePostalCode: true });
const elementsOptions = ref({
  mode: "setup",
  locale: "en",
  currency: "usd",
});
const elms = ref<any>(null); // Define type for elms
const card = ref<any>(null); // Define type for card
const disabledPay = ref(true);

const router = useRouter();
const { $toast } = useNuxtApp(); // Assuming you have a toast notification system

// Load Stripe
onMounted(async () => {
  try {
    const stripe = await loadStripe(stripeKey.value); // No template literal needed
    if (stripe) {
      stripeLoaded.value = true;
    } else {
      console.error("Failed to load Stripe");
    }
  } catch (error) {
    console.error("Error loading Stripe:", error);
  }
});

// Stripe Element Ready Event
const stripeElementReadyEV = () => {
  // Stripe element is ready
  console.log("Stripe element is ready");
};

// Completed Stripe Event
const completedStripe = (event: any) => {
  if (event.complete) {
    disabledPay.value = false;
  } else {
    disabledPay.value = true;
  }
};

// Handle Save Card
const handleSave = async () => {
  if (!elms.value) return;

  const { error, paymentMethod } = await elms.value.instance.createPaymentMethod({
    elements: elms.value.elements,
  });

  // Send paymentMethodId to your API
  console.log("intent", paymentMethod);
  const paymentMethodId = paymentMethod.id;
  await sendPaymentMethodIdToApi(paymentMethodId);
  $toast("Card added successfully!");
  // router.push('/success'); // Redirect on success
};

// Send payment method ID to API
const sendPaymentMethodIdToApi = async (paymentMethodId: string) => {
  try {
    await addNewCardToStripe(paymentMethodId);
  } catch (error) {
    console.error("Failed to send payment method ID:", error);
    $toast("Failed to save card");
  }
};

// Close Modal Card
const closeModalCard = () => {
  if (process.client) {
    closeModal("add_new_card_billing");
    invoiceStore.loadCards = false;
  }
};

// Use Composables

const billingStore = useBillingStore();
const invoiceStore = useInvoicesStore();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();

// Fetch Countries

// Add New Card
const addNew = async () => {
  handleSave();
};
</script>

<template>
  <div
    class="mysite_bg_modal dark:bg-p fixed z-[9999] top-[0] rtl:lg:left-0 ltr:lg:right-0 rounded-[10px] lg:p-[30px] lg:w-[803px] w-full h-full lg:h-screen overflow-y-auto lg:overflow-x-hidden"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn_payment !cursor-pointer z-[999] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
      @click="closeModalCard"
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
      <div class="flex flex-col lg:items-start justify-center w-full">
        <div class="flex items-center justify-center">
          <h1
            class="text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin rtl:lg:mr-[20px] ltr:lg:ml-[20px] lg:mt-0 mt-[60px]"
          >
            {{ $t("Add New Card") }}
          </h1>
        </div>
        <div
          class="flex flex-col items-start justify-center w-full bg-white dark:bg-tamkinDarkPrimary rounded-[10px] mt-[33px]"
          style="box-shadow: 0px 4px 24px 8px #51459f14"
        >
          <h1
            class="text-[16px] leading-[36px] font-[600] rtl:mr-[20px] ltr:ml-[20px] text-darkGrey dark:text-whiteTamkin mt-[31px]"
          >
            {{ $t("Card Info") }}
          </h1>

          <StripeElements
            class="w-full px-[20px]"
            dir="ltr"
            v-if="stripeLoaded"
            v-slot="{ elements, instance }"
            ref="elms"
            @ready="stripeElementReadyEV"
            @change="completedStripe"
            :stripe-key="stripeKey"
          >
            <StripeElement
              ref="card"
              type="card"
              :options="cardOptions"
              :elements="elements"
              class="w-full"
            />
          </StripeElements>

          <div
            class="flex flex-col items-center justify-center w-full mt-[20px] mb-[30px]"
          >
            <button class="bg-[#4CAF50] text-white px-6 py-2 rounded" @click="addNew">
              {{ $t("Save Card") }}
            </button>
          </div>
          <!-- Placeholder for focusing -->

          <!-- <div class="px-[20px]">
            <label
              for="remember_me"
              class="flex items-center rtl:space-x-reverse space-x-[8px] h-[22px] dark:text-whiteTamkin text-neutral-400 text-[15px] font-medium font-['Poppins'] leading-snug"
            >
              <input
                v-model="state.is_primary"
                type="checkbox"
                :checked="billingStore.cards?.length === 0"
                class="border-[1px] cursor-pointer w-[18px] h-[18px] border-[#A7A7A7] dark:border-darkborder bg-transparent rounded-[4px] text-tamkin ring-0 focus:ring-0 focus:outline-none"
                id="remember_me"
              />
              <div
                class="text-[14px] font-[400] text-black mt-1 ltr:font-[Poppins] rtl:font-[Almarai]"
              >
                {{ $t("Set as Primary Card") }}
              </div>
            </label>
          </div> -->
          <div
            class="mt-[39px] mb-[34px] flex items-center justify-end px-[20px] rtl:mr-auto ltr:ml-auto rtl:space-x-reverse space-x-[16px]"
          >
            <button class="btn_bordered_dashboard" @click="closeModalCard">
              {{ $t("Cancel") }}
            </button>
            <button class="btn-dashboard" @click="addNew">
              {{ $t("Save") }}
            </button>
            <!-- <button
              class="btn-dashboard hover_tamkin"
              @click="addCard"
              :disabled="submitInviteLoading || v$.$invalid"
            >
              <div class="flex items-center justify-center">
                <div :class="submitInviteLoading ? 'rtl:ml-2 ltr:mr-2' : ''">
                  {{ $t("Save") }}
                </div>

                <svg
                  v-if="submitInviteLoading"
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
            </button> -->
          </div>

          <!-- <div class="mt-[129px]  mx-auto mb-[34px]">

      </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
