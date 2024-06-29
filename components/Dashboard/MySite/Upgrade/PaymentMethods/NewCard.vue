<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  sameAs,
  maxLength,
  numeric,
  minLength,
} from "@vuelidate/validators";
import UAEFLAG from "~/assets/imgs/flags/UAE.svg";
import EGYPTFLAG from "~/assets/imgs/flags/Element.svg";
import SAUDIFLAG from "~/assets/imgs/flags/Vector.svg";

import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();
const props = defineProps({
  showModal: Boolean,
});
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
});
const rules = {
  firstName: { required },
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

</script>

<template>
  <div
    class="flex flex-col lg:items-start justify-center w-full"
    v-if="showModal"
  >
    <div class="flex items-center justify-center ">
      <div
        @click="modalStore.backControl"
        class="cursor-pointer close_sidebar_btn group flex items-center justify-center    bg-white border-[1px]
        border-linecolor rounded-full w-[30px] h-[30px]"        style="box-shadow: 0px 4px 8.7px 0px #daf3f1"
      >
        <svg
          width="9"
          height="15"
          viewBox="0 0 9 15"
          fill="none"
          class="fill-tamkin group-hover:stroke-white group-hover:fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"
          />
        </svg>
      </div>
      <h1
        class="text-[24px] leading-[36px] font-[600] text-darkGrey lg:mr-0 mr-[auto] lg:ml-[20px] lg:mt-0 mt-[60px]"
      >
        Billing Info
      </h1>
    </div>
    <div
      class="flex flex-col items-start justify-center bg-white rounded-[10px] mt-[33px] "
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >
      <h1
        class="text-[20px] leading-[36px] font-[600] ml-[20px] text-darkGrey mt-[31px]"
      >
        Billing Info
      </h1>

      <div
        class="flex flex-col items-start justify-center px-[20px] mt-[21px] w-full"
      >
        <div
          class="flex items-center justify-start lg:flex-row flex-col lg:space-x-[42px] lg:space-y-[0] space-y-[25px] mb-[25px] w-full"
        >
          <div class="w-full lg:w-[330px]">
            <div class="w-full relative">
              <input
                type="text"
                placeholder="{{$t('First Name')}}"
                id="firstName"
                class="input_floating_label peer w-full lg:w-[330px]"
                v-model="v$.firstName.$model"
                :class="{
                  input_error:
                    v$.firstName.$error && v$.firstName.required.$invalid,
                  input_success: !v$.firstName.$error && !v$.firstName.$invalid,
                }"
              />
              <label
                for="email"
                class="floating_label"
                :class="[
                  v$.firstName.$error && v$.firstName.required.$invalid
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("firstName") }}*
              </label>
              <div
                class="w-full lg:w-4/6"
                v-if="v$.firstName.$error && v$.firstName.required.$invalid"
              >
                <p class="error_message">
                  <span
                    v-if="v$.firstName.$error && v$.firstName.required.$invalid"
                    >{{ $t("First Name is required") }}</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-[330px]">
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
          </div>
        </div>

        <div
          class="flex items-center justify-start lg:flex-row flex-col w-full"
        >
          <div class="w-full lg:w-[704px] relative">
            <input
              type="text"
              placeholder="{{$t('Card Number')}}"
              id="cardNumber"
              @keydown="checkInput"

              :maxlength="20"
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
          class="flex items-center justify-start lg:flex-row flex-col lg:space-x-[42px] lg:space-y-[0] space-y-[25px] my-[25px] w-full"
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
        </div>
      </div>

      <h1
        class="text-[20px] leading-[36px] font-[600] ml-[20px] text-darkGrey mt-[31px]"
      >
        Billing address
      </h1>

      <div
        class="flex flex-col items-start justify-center px-[20px] mt-[21px] w-full"
      >
        <div
          class="flex items-start lg:flex-row flex-col justify-center mb-[25px] w-full"
        >
          <div class="w-full lg:w-[704px] relative mx-auto">
            <input
              type="text"
              placeholder="{{$t('Address')}}"
              id="address"
              class="input_floating_label peer w-full lg:w-[704px]"
              v-model="v$.address.$model"
              :class="{
                input_error: v$.address.$error && v$.address.required.$invalid,
                input_success: !v$.address.$error && !v$.address.$invalid,
              }"
            />
            <label
              for="address"
              class="floating_label"
              :class="[
                v$.address.$error && v$.address.required.$invalid
                  ? '!text-error'
                  : '',
              ]"
            >
              {{ $t("Address") }}*
            </label>
            <div
              class="w-full lg:w-4/6"
              v-if="v$.address.$error && v$.address.required.$invalid"
            >
              <p class="error_message">
                <span
                  v-if="v$.address.$error && v$.address.required.$invalid"
                  >{{ $t("Address is required") }}</span
                >
              </p>
            </div>
          </div>
        </div>
        <div
          class="flex items-start lg:items-center justify-center lg:justify-start lg:flex-row flex-col lg:space-y-0 space-y-[16px] lg:space-x-[42px] lg:mb-[25px] w-full"
        >
          <div class="w-full lg:w-[330px]">
            <div class="relative">
              <input
                type="text"
                placeholder="{{$t('City')}}"
                id="city"
                class="input_floating_label peer w-full lg:w-[330px]"
                v-model="v$.city.$model"
                :class="{
                  input_error: v$.city.$error && v$.city.required.$invalid,
                  input_success: !v$.city.$error && !v$.city.$invalid,
                }"
              />
              <label
                for="city"
                class="floating_label"
                :class="[
                  v$.city.$error && v$.city.required.$invalid
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("City") }}*
              </label>
              <div
                class="w-full lg:w-4/6"
                v-if="v$.city.$error && v$.city.required.$invalid"
              >
                <p class="error_message">
                  <span v-if="v$.city.$error && v$.city.required.$invalid">{{
                    $t("City is required")
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-[330px]">
            <div class="relative">
              <input
                type="text"
                placeholder="{{$t('State')}}"
                id="state"
                class="input_floating_label peer w-full lg:w-[330px]"
                v-model="v$.state.$model"
                :class="{
                  input_error: v$.state.$error && v$.state.required.$invalid,
                  input_success: !v$.state.$error && !v$.state.$invalid,
                }"
              />
              <label
                for="state"
                class="floating_label"
                :class="[
                  v$.state.$error && v$.state.required.$invalid
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("State") }}*
              </label>
              <div
                class="w-full lg:w-4/6"
                v-if="v$.state.$error && v$.state.required.$invalid"
              >
                <p class="error_message">
                  <span v-if="v$.state.$error && v$.state.required.$invalid">{{
                    $t("State is required")
                  }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-start lg:items-center justify-center lg:justify-start lg:flex-row flex-col lg:space-y-0 space-y-[16px] lg:space-x-[42px] lg:mb-[25px] w-full"
        >
          <div class="w-full lg:w-[330px]">
            <div class="relative">
              <input
                type="text"
                placeholder="{{$t('Zip / Postal Code')}}"
                id="zip"
                class="input_floating_label peer w-full lg:w-[330px]"
                v-model="v$.zip.$model"
                :class="{
                  input_error: v$.zip.$error && v$.zip.required.$invalid,
                  input_success: !v$.zip.$error && !v$.zip.$invalid,
                }"
              />
              <label
                for="email"
                class="floating_label"
                :class="[
                  v$.zip.$error && v$.zip.required.$invalid
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("Zip / Postal Code") }}*
              </label>
              <div
                class="w-full lg:w-4/6"
                v-if="v$.zip.$error && v$.zip.required.$invalid"
              >
                <p class="error_message">
                  <span v-if="v$.zip.$error && v$.zip.required.$invalid">{{
                    $t("Zip / Postal Code is required")
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-[330px] lg:mt-0 mt-[16px]">
            <div class="relative w-full lg:w-64">
              <button
                @click="toggleDropdown"
                class="input_search_country !rounded-[10px] peer w-full lg:w-[330px] text-left"
                :class="[isOpen ? 'rounded-b-none' : '']"
              >
                <span class="floating_label">{{
                  selectedCountry ? selectedCountry.name : "Country*"
                }}</span>

                <img
                  src="/assets/imgs/payment_methods/country_arrow.svg"
                  alt=""
                  :class="[isOpen ? 'rotate-90' : '']"
                  class="px-[22px] mb-[2px] float-right"
                />
              </button>
              <div
                v-if="isOpen"
                class="absolute z-10 top-[52px] w-[330px] bg-white border rounded shadow"
              >
                <div class="py-[21px] w-full search_input mx-auto px-[20px]">
                  <input
                    type="text"
                    class="input_dashboard_search w-full  "
                    v-model="search"
                    placeholder="Search ..."
                  />
                  <div
                    class="absolute top-[12px] lg:top-[20px] lg:left-[20px] left-[10px] lg:p-[16px]"
                  >
                    <img src="/assets/imgs/icons/search.svg" alt="" />
                  </div>
                  <div
                    v-if="search"
                    @click="search = ''"
                    class="absolute top-[12px] lg:top-[18px] right-[20px] p-[16px] cursor-pointer"
                  >
                    <img src="/assets/imgs/icons/clear_search.svg" alt="" />
                  </div>
                </div>
                <ul>
                  <li
                    v-for="country in filteredCountries"
                    :key="country.code"
                    class="border-b-[1px] flex items-center px-4 py-2 hover:bg-gray-100"
                  >
                    <img :src="country.flag" alt="" class="w-6 h-4 mr-2" />
                    <span>{{ country.name }}</span>
                    <div class="ml-auto">
                      <input
                        type="checkbox"
                        @click="selectCountry(country)"
                        :id="`checkbox_` + country.code"
                        :value="country.code"
                        :checked="
                          selectedCountry
                            ? selectedCountry.code === country.code
                            : false
                        "
                        class="peer sr-only"
                      />
                      <label
                        :for="`checkbox_` + country.code"
                        class="relative block border-[1px] cursor-pointer w-[18px] h-[18px] border-lightGrey bg-whiteTamkin rounded-[4px] peer-checked:bg-gradient-checked"
                      >
                        <svg
                          class="peer-checked:block absolute inset-0 m-auto w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </label>
                    </div>
                  </li>
                  <hr />
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex items-center lg:flex-row flex-col justify-center lg:justify-between space-x-[24px] w-full px-[20px]"
      >
        <div class="lg:py-[17px] search_input w-full lg:w-3/4 mt-[39px]">
          <input
            type="text"
            class="input_dashboard_search w-full text-darkGrey"
            v-model="promo"
            placeholder="Promo Code"
            :class="[validPromo ? '!bg-[#E8F8F6] !text-[#E8F8F6] ' : '']"
          />
          <div
            class="absolute top-[-8px] lg:top-[11px] left-[29px] p-[16px] flex items-center justify-evenly space-x-[10px]"
            v-if="validPromo"
          >
            <img src="/assets/imgs/promo_valid.svg" alt="" />
            <div class="text-[15px] font-[500] text-darkGrey">
              <span class="text-[#021328] font-[700]">12%</span> Discount
              (-$2,444 )
            </div>
            <img src="/assets/imgs/promo_valid_.svg" class="" alt="" />
          </div>
          <div
            v-if="isPromoFilled"
            @click="clearInput"
            class="absolute top-[-8px] lg:top-[-27px] right-0 p-[16px] cursor-pointer lg:mt-[39px]"
          >
            <img src="/assets/imgs/close_promo.svg" alt="" />
          </div>
        </div>
        <div class="text-center mt-[16px] lg:mt-[39px]">
          <button
            class="btn-dashboard no_hover w-6/6 mx-auto text-center ]"
            @click="addPromoCode"
            v-if="!validPromo"
          >
            Apply Code
          </button>
          <button
            v-else
            class="btn_bordered_dashboard error w-6/6 mx-auto text-center"
            @click="removePromoCode"
          >
            Remove Code
          </button>
        </div>
      </div>
      <table class="min-w-full">
        <thead>
          <tr>
            <th
              class="py-2 pl-[20px] border-b text-[20px] leading-[30px] text-darkGrey font-[600] text-left"
              colspan="12"
            >
              Summary
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-[16px] leading-[24px] font-[500] bg-[#FAFCFE]"
            v-if="validPromo"
          >
            <td
              class="py-2 px-5 border-b text-right font-[500] w-full"
              colspan="2"
            >
              Subtotal
            </td>
            <td class="py-2 px-5 border-b text-right w-full font-[500]" colspan="2">
              $50,444.00
            </td>
          </tr>
          <tr
            v-if="validPromo"
            class="text-[16px] leading-[24px] font-[500] bg-[#FAFCFE]"
          >
            <td
              class="py-2 px-5 border-b text-right font-[500] w-full"
              colspan="2"
            >
              Discount
            </td>
            <td class="py-2 px-5 border-b text-right w-full font-[500]" colspan="2">
              $50,444.00
            </td>
          </tr>
          <tr class="text-[16px] leading-[24px] font-[500] bg-[#FAFCFE]">
            <td
              class="py-2 px-5 border-b text-right font-[500] w-full"
              colspan="2"
            >
              Total
            </td>
            <td class="py-2 px-5 border-b text-right w-full font-[500]" colspan="2">
              $50,444.00
            </td>
          </tr>
        </tbody>
      </table>
      <div class="mt-[39px] mx-auto mb-[34px]">
        <button
          class="btn-dashboard no_hover lg:w-[535px] w-full"
          @click="modalStore.paymentSuccessModal"
          v-if="!modalStore.loading"
        >
          Confirm Payment
        </button>
        <button class="processing_payment lg:w-[535px] w-full" v-else>
          Payment Processing...
        </button>
      </div>

      <div class="">

        <img src="/assets/imgs/payment_methods/accepted-cards.svg" alt="">
      </div>
      <!-- <div class="mt-[129px]  mx-auto mb-[34px]">
  
  </div> -->
    </div>
  </div>
</template>
