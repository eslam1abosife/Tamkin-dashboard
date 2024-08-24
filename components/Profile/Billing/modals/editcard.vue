<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { useUpdateCard,useGetCards,useDeleteCard } from "@/composables/useBilling";

import {
  required,
  email,
  sameAs,
  maxLength,
  numeric,
  minLength,
} from "@vuelidate/validators";
import UAEFLAG from "/assets/imgs/flags/UAE.svg";
import EGYPTFLAG from "/assets/imgs/flags/Element.svg";
import SAUDIFLAG from "/assets/imgs/flags/Vector.svg";
import { useModalStore } from "@/stores/modal";
const {$toast} = useNuxtApp()
const billingStore = useBillingStore();

const props = defineProps({
  showModal: Boolean,
});
const {
  isOpen:isModalOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  eventCounter,
  lastEventCall,
  getData
} = useModalManager();
const formatExpiryDate = () => {
  let value = state.expireDate.replace(/\D/g, "");

  if (value.length > 2) {
    value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
  }

  state.expireDate = value;
};

const validDate = (value) => {
  if (!value || value.length !== 5) {
    return false;
  }

  const [month, year] = value.split("/").map(Number);
  return month >= 1 && month <= 12 && year >= 0 && year <= 99;
};
const creditCardPattern2 = /^(?:4[0-9]{15}|5[1-5][0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;

const futureDate = (value) => {
  if (!value || value.length !== 5) {
    return false;
  }

  const [month, year] = value.split("/").map(Number);
  const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year
  const currentMonth = new Date().getMonth() + 1; // Months are zero-based, so add 1

  return year > currentYear || (year === currentYear && month >= currentMonth);
};
const state = reactive({
  cardholdername: "",
  firstName: "",
  lastName: "",
  cardNumber: "",
  cvv: "",
  expireDate: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  is_primary: true,
});
const rules = {
  cardholdername: { required },
  lastName: { required },
  cardNumber: {
    required,
    creditCard: (value) => creditCardPattern2.test(value.replace(/\s+/g, "")), // Remove spaces before validation
  },
  cvv: { required, maxLength: maxLength(3), minLength: minLength(3), numeric },
  expireDate: { required, validDate, futureDate },
  address: { required },
  city: { required },
  state: { required },
  zip: { required },
  country: { required },
};

const v$ = useVuelidate(rules, state);
const isPromoFilled = ref(false);
const promo = ref("");
const validPromo = ref(false);
watch(promo, (ov, nv) => {
  return promo.value.length > 0
    ? (isPromoFilled.value = true)
    : (isPromoFilled.value = false);
});
const clearInput = () => {
  promo.value = "";
  validPromo.value = false;
};
const addPromoCode = () => {
  if (promo.value) {
    validPromo.value = !validPromo.value;
  }
};

const removePromoCode = () => {
  if (promo.value) {
    validPromo.value = !validPromo.value;
    promo.value = "";
  }
};
const creditCardPattern = /^[0-9]{16}$/;

const countries = [
  { code: "AE", name: "UAE", flag: UAEFLAG },
  { code: "EG", name: "Egypt", flag: EGYPTFLAG },
  { code: "SA", name: "KSA", flag: SAUDIFLAG },
  // Add more countries as needed
];
const isOpen = ref(false);
const search = ref("");
const selectedCountry = ref(null);
const loading = ref(false)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectCountry = (country) => {
  selectedCountry.value = country;
  isOpen.value = false;
};

const filteredCountries = computed(() => {
  return countries.filter((country) =>
    country.name.toLowerCase().includes(search.value.toLowerCase())
  );
});
watch(
  state,
  (newValue) => {

    const formattedValue = newValue.cardNumber
      .replace(/\s+/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    // alert('gg')
    if (newValue.cardNumber !== formattedValue) {
      state.cardNumber = formattedValue;
    }
  },
  { deep: true }
);

const checkInput = (event) =>{
      // Allow only numeric input
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];

      if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }


    const detectCardType = (number) => {
  const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,


};

  for (const [type, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(number.replace(/\s+/g, ''))) {
      return type;
    }
  }
  return null;
};

watch(
  () => state.cardNumber,
  (newValue) => {
    const cardType = detectCardType(newValue);
    if (cardType) {
      state.cardType = cardType;
    } else {
      state.cardType = null;
    }
  })

// const dataModal=ref({})
watchEffect(() => {
  if (isModalOpen('edit_card_billing_profile')) {
    // dataModal.value = getData();
    console.log('billingStore.card',billingStore.card);
    state.firstName = billingStore.card.card_holder_name;
    state.is_primary = billingStore.card.is_primary;
  }
});

  const { updateCard:update, savedCards } = useUpdateCard();
  const { getCards,updatedCards } = useGetCards();
  const enableLoading = ref(false);

  const updateCard =async ()=>{

    enableLoading.value = true;
    await update({
      name            : billingStore.card.name,
      is_primary      : state.is_primary,
      card_holder_name: state.firstName
    });
    closeModal('edit_card_billing_profile')
    $toast('Card Updated Successfully', { hideIn: 3000});
    enableLoading.value = false;
    getCards();

  }

  const handelCloseModal =async ()=>{

    closeModal('edit_card_billing_profile')
    // billingStore.card.card_holder_name = null

    console.log('billingStore.card.card_holder_name',billingStore.card)
  }


  // watch(updatedCards, async (oldVal,newVal) => {
  //   console.log('updateCard+++',newVal)
  //    // getCards();
  // })
  watch(eventCounter, async () => {
    if (lastEventCall.value === "deleteTeamMember") {
      try {
        // const { deleteCard } = useUpdateCard();

        // await deleteCard(dataModal.value.name);

        // closeModal('edit_card_billing_profile')
        // $toast('Card Updated Successfully', { hideIn: 3000});
      } catch (err) {
        console.error(err);
      }
    }
  });


</script>

<template>
  <div
       class="flex flex-col items-start justify-center  fixed z-[9999] top-1/6 bg-white
        dark:bg-tamkinDarkPrimary rounded-[10px] p-[24px] w-[700px] lg:h-auto"
    style="left: 50%; transform: translate(-50%, 0)"
    v-if="isModalOpen('edit_card_billing_profile')"
  >
  <!--  -->
  <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="handelCloseModal">
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
    <h1
    class="text-[18px] leading-[36px] font-[600] text-darkGrey  dark:text-whiteTamkin   "
  >
  Edit Card
  </h1>
  <h2
  class="text-[14px] leading-[27px] font-[500]  text-darkGrey  dark:text-whiteTamkin mt-[30px] "
>
Edit your saved card details
</h2>

      <div
        class="flex flex-col items-start justify-center mt-[21px] w-full"
      >
        <div
          class="flex items-center justify-start lg:flex-row flex-col lg:rtl:space-x-reverse space-x-[42px] lg:space-y-[0]
           space-y-[25px] mb-[25px] w-full"
        >
          <div class="w-full ">
            <div class="w-full relative">
              <input
                type="text"
                placeholder="{{$t('First Name')}}"
                id="firstName"
                class="input_floating_label peer w-full "
                v-model="state.firstName"
                :class="{
                  input_error:
                    v$.cardholdername.$error && v$.cardholdername.required.$invalid,
                  input_success: !v$.cardholdername.$error && !v$.cardholdername.$invalid,
                }"
              />
              <label
                for="email"
                class="floating_label"
                :class="[
                  v$.cardholdername.$error && v$.cardholdername.required.$invalid
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("Card Holder Name") }}*
              </label>
              <div
                class="w-full lg:w-4/6"
                v-if="v$.cardholdername.$error && v$.cardholdername.required.$invalid"
              >
                <p class="error_message">
                  <span
                    v-if="v$.cardholdername.$error && v$.cardholdername.required.$invalid"
                    >{{ $t("Card Holder name is required") }}</span
                  >
                </p>
              </div>
            </div>
          </div>
          <!-- <div class="w-full lg:w-[330px]">
            <div class="relative">
              <input
                type="text"
                placeholder="{{$t('Last Name')}}"
                id="lastName"
                class="input_floating_label peer w-full lg:w-[330px]"
                v-model="v$.lastName.$model"
                :class="{
                  input_error:
                    v$.lastName.$error && v$.lastName.required.$invalid,
                  input_success: !v$.lastName.$error && !v$.lastName.$invalid,
                }"
              />
              <label
                for="email"
                class="floating_label"
                :class="[
                  v$.lastName.$error && v$.lastName.required.$invalid
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("lastName") }}*
              </label>
              <div
                class="w-full lg:w-4/6"
                v-if="v$.lastName.$error && v$.lastName.required.$invalid"
              >
                <p class="error_message">
                  <span
                    v-if="v$.lastName.$error && v$.lastName.required.$invalid"
                    >{{ $t("Last Name is required") }}</span
                  >
                </p>
              </div>
            </div>
          </div> -->
        </div>

        <!-- <div
          class="flex items-center justify-start lg:flex-row flex-col w-full"
        >
          <div class="w-full lg:w-[704px] relative">
            <div class="absolute right-[20px] " :class="[state.cardType === 'mastercard' ? 'inset-y-[12px]' :'inset-y-[14px]']" v-if="!v$.cardNumber.$error && !v$.cardNumber.$invalid">
                <img src="/imgs/master.png" class="w-[24px] h-[16px]" alt="" v-if="state.cardType === 'mastercard'">
                <img src="/imgs/visa.png" class="w-[30px] h-[12px]" alt="" v-if="state.cardType === 'visa'">
            </div>
            <input
              type="text"
              placeholder="{{$t('Card Number')}}"
              id="cardNumber"
              @keydown="checkInput"

              :maxlength="19"
              class="input_floating_label peer w-full lg:w-[704px]"
              v-model="v$.cardNumber.$model"
              :class="{
                input_error:
                  (v$.cardNumber.$error && v$.cardNumber.required.$invalid) ||
                  (v$.cardNumber.$error && v$.cardNumber.creditCard.$invalid),
                input_success: !v$.cardNumber.$error && !v$.cardNumber.$invalid,
              }"
            />
            <label
              for="cardNumber"
              class="floating_label"
              :class="[
                v$.cardNumber.$error && v$.cardNumber.required.$invalid || v$.cardNumber.$error && v$.cardNumber.creditCard.$invalid
                  ? '!text-error'
                  : '',
              ]"
            >
              {{ $t("Card Number") }}*
            </label>
            <div
              class="w-full lg:w-4/6"
              v-if="
                (v$.cardNumber.$error && v$.cardNumber.required.$invalid) ||
                (v$.cardNumber.$error && v$.cardNumber.creditCard.$invalid)
              "
            >
              <p class="error_message">
                <span
                  v-if="v$.cardNumber.$error && v$.cardNumber.required.$invalid"
                  >{{ $t("Card Number is required") }}</span
                >
                <span
                  v-else-if="
                    v$.cardNumber.$error && v$.cardNumber.creditCard.$invalid
                  "
                  >{{ $t("Card Number is Not correct") }}</span
                >
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex items-center justify-start lg:flex-row flex-col lg:rtl:space-x-reverse space-x-[42px] lg:space-y-[0] space-y-[25px] my-[25px] w-full"
        >
          <div class="w-full lg:w-[330px]">
            <div class="relative">
              <input
                @input="formatExpiryDate"
                type="text"
                placeholder="{{$t('MM / YY')}}"
                id="expiryDate"
                class="input_floating_label peer w-full lg:w-[330px]"
                v-model="v$.expireDate.$model"
                :class="{
                  input_error:
                    (v$.expireDate.$error && v$.expireDate.required.$invalid) ||
                    (v$.expireDate.$error &&
                      v$.expireDate.validDate.$invalid) ||
                    (v$.expireDate.$error && v$.expireDate.futureDate.$invalid),
                  input_success:
                    !v$.expireDate.$error && !v$.expireDate.$invalid,
                }"
              />
              <label
                for="expiryDate"
                class="floating_label"
                :class="[
                  (v$.expireDate.$error && v$.expireDate.required.$invalid) ||
                  (v$.expireDate.$error && v$.expireDate.validDate.$invalid) ||
                  (v$.expireDate.$error && v$.expireDate.futureDate.$invalid)
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("MM / YY") }}*
              </label>
              <div class="w-full lg:w-4/6" v-if="v$.expireDate.$error">
                <p class="error_message">
                  <span v-if="v$.expireDate.required.$invalid">{{
                    $t("Expire date is required")
                  }}</span>
                  <span
                    v-else-if="
                      v$.expireDate.validDate.$invalid ||
                      v$.expireDate.futureDate.$invalid
                    "
                    >{{ $t("Expire date is Not Valid") }}</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-[330px]">
            <div class="relative">
              <input
                type="password"
                @keydown="checkInput"
              :maxlength="3"
                placeholder="{{$t('CVV')}}"
                id="cvv"
                class="input_floating_label peer w-full lg:w-[330px]"
                v-model="v$.cvv.$model"
                :class="{
                  input_error:
                    (v$.cvv.$error && v$.cvv.required.$invalid) ||
                    (v$.cvv.$error && v$.cvv.maxLength.$invalid) ||
                    (v$.cvv.$error && v$.cvv.numeric.$invalid) ||
                    (v$.cvv.$error && v$.cvv.minLength.$invalid),
                  input_success: !v$.cvv.$error && !v$.cvv.$invalid,
                }"
              />
              <label
                for="cvv"
                class="floating_label"
                :class="[
                  (v$.cvv.$error && v$.cvv.required.$invalid) ||
                  (v$.cvv.$error && v$.cvv.maxLength.$invalid)
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("CVV") }}*
              </label>
              <div
                class="w-full lg:w-4/6"
                v-if="
                  (v$.cvv.$error && v$.cvv.required.$invalid) ||
                  (v$.cvv.$error && v$.cvv.maxLength.$invalid) ||
                  (v$.cvv.$error && v$.cvv.numeric.$invalid) ||
                  (v$.cvv.$error && v$.cvv.minLength.$invalid)
                "
              >
                <p class="error_message">
                  <span v-if="v$.cvv.required.$invalid">{{
                    $t("CVV is required")
                  }}</span>
                  <span
                    v-if="
                      v$.cvv.maxLength.$invalid ||
                      v$.cvv.numeric.$invalid ||
                      v$.cvv.minLength.$invalid
                    "
                    >{{ $t("CVV is Not correct") }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div> -->

<div class="flex items-center justify-between  w-full mb-[20px]" >
    <div class=" ">
        <label for="remember_me"
        class="flex items-center space-x-[8px] h-[22px] dark:text-whiteTamkin text-neutral-400 text-[15px] font-medium font-['Poppins'] leading-snug ">
        <input type="checkbox"
               v-model="state.is_primary"
          class="border-[1px]  cursor-pointer w-[18px] h-[18px] border-[#A7A7A7] dark:border-darkborder bg-transparent rounded-[4px]
           text-tamkin ring-0 focus:ring-0 focus:outline-none"
          id="remember_me" />
          <div class="text-[14px] font-[400] text-black mt-1">
            Set as primary card Submit
          </div>
       </label>
    </div>


  <div class=" ml-auto">
    <button :disabled="!billingStore.card.deletion_allowed" @click="navigateTo('edit_card_billing_profile','billing','deleteModal_card')" class="bg-transparent text-[#EA4335] leading-[19px] underline text-[14px] font-[500] "
    >


     <span>Delete Payment Method</span>
    </button>
  </div>


</div>

      </div>






      <div class="flex items-center justify-end space-x-[10px]  w-full">
        <button class="btn_bordered_dashboard" @click="handelCloseModal">
            Cancel
           </button>
        <button :disabled="enableLoading" class="btn-dashboard hover_tamkin w-[120px]" @click="updateCard"
        >
        Submit
        </button>

      </div>

      <!-- <div class="mt-[129px]  mx-auto mb-[34px]">

  </div> -->

  </div>
</template>
