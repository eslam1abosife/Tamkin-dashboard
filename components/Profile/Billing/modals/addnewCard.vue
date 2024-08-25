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
import UAEFLAG from "/assets/imgs/flags/UAE.svg";
import EGYPTFLAG from "/assets/imgs/flags/Element.svg";
import SAUDIFLAG from "/assets/imgs/flags/Vector.svg";
import { useAddNewCard,useGetCards ,useDeleteCard } from "@/composables/useBilling";
import { useGetAllCountries, useChangeMemberInfo } from "@/composables/useProfile";

const { getCountries, countries } = useGetAllCountries();
const billingStore = useBillingStore();




const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
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
let state = reactive({
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

onMounted(async () => {
  await getCountries();
});
const checkInput = (event) =>{
      const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];

      if (!allowedKeys.includes(event.key)) {
        event.preventDefault();
      }
    }

const submitInviteLoading = ref(false);


const handleSelectedItemProjectName = (item: any) => {
  // console.log(item)
  state.country = item.name
};
const { $toast } = useNuxtApp();

const { addNewCard } = useAddNewCard();

const { getCards } = useGetCards();

const addCard = async ()=>{

  // console.log('addCard data',state)
  submitInviteLoading.value = true
  await addNewCard({
        card_number : state.cardNumber.replace(/\s+/g, ''),
        fname       : state.firstName,
        lname       : state.lastName,
        cvv         : state.cvv,
        expiry_date : state.expireDate,
        address     : state.address,
        city        : state.city,
        state       : state.state,
        country     : state.country,
        zip         : state.zip,
        is_primary  : true
  });
  getCards();

  closeModal('add_new_card_billing')

  $toast('Card Added successfully', { hideIn: 3000 });

  submitInviteLoading.value = false
  state.cardNumber= ""
      state.firstName = ""
    state.lastName = ""
   state.cvv = ""
 state.expireDate = ""
state.address = ""
   state.city = ""
    state.state = ""
   state.country = ""
   state.zip = ""
v$.value.$reset()
}
const closeModalCard = ()=>{


if(process.client){
  window.$chatwoot.toggleBubbleVisibility('show')
  closeModal('add_new_card_billing')
}

}
</script>

<template>
  <div v-if="isOpen('add_new_card_billing')"
    class="mysite_bg_modal  dark:bg-p fixed z-[9999] top-[0]  rtl:lg:left-0 ltr:lg:right-0
    rounded-[10px] lg:p-[30px]
     lg:w-[803px] w-full h-full lg:h-screen overflow-y-auto lg:overflow-x-hidden"

  >
  <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn_payment !cursor-pointer z-[999]
   dark:bg-tamkinDarkPrimary dark:text-whiteTamkin" @click="closeModalCard">
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

        <div
        class="flex flex-col lg:items-start justify-center w-full"

      >
        <div class="flex items-center justify-center ">

          <h1
            class="text-[18px] leading-[36px] font-[600] text-darkGrey  dark:text-whiteTamkin rtl:lg:mr-[20px] ltr:lg:ml-[20px] lg:mt-0 mt-[60px]"
          >
            Billing Info
          </h1>
        </div>
        <div
          class="flex flex-col items-start justify-center bg-white dark:bg-tamkinDarkPrimary rounded-[10px] mt-[33px] "
          style="box-shadow: 0px 4px 24px 8px #51459f14"
        >
          <h1
            class="text-[16px] leading-[36px] font-[600] rtl:mr-[20px] ltr:ml-[20px] text-darkGrey  dark:text-whiteTamkin mt-[31px]"
          >
            Billing Info
          </h1>

          <div
            class="flex flex-col items-start justify-center px-[20px] mt-[21px] w-full"
          >
            <div
              class="flex items-center justify-start lg:flex-row flex-col lg:rtl:space-x-reverse space-x-[42px] lg:space-y-[0]
               space-y-[25px] mb-[25px] w-full"
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
            </div>
          </div>

          <h1
            class="text-[16px] leading-[36px] font-[600] rtl:mr-[20px] ltr:ml-[20px] text-darkGrey  dark:text-whiteTamkin mt-[0px]"
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
              class="flex items-start lg:items-center justify-center lg:justify-start lg:flex-row flex-col lg:space-y-0 space-y-[16px] lg:rtl:space-x-reverse space-x-[42px] lg:mb-[25px] w-full"
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
              class="lg:mt-0 mt-[16px] flex items-start lg:items-center justify-center lg:justify-start lg:flex-row flex-col lg:space-y-0
              space-y-[16px] lg:rtl:space-x-reverse space-x-[42px] lg:mb-[25px] w-full"
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

                <TranslateSelectInput
                    @getCurrentSelectedItem="handleSelectedItemProjectName"
                    :enableSearch="true"
                    placeholderinput="Country*"
                    :errorField="v$.country.$error && v$.country.required.$invalid"
                    :list="countries"
                    nameKey="name"
                    idField="name"
                    iconKey="image"
                    :successField="!v$.country.$error && !v$.country.$invalid"
                    :currentListValue="state.country"
                />

                              <div class="w-full lg:w-4/6 " v-if="(v$.country.$error && v$.country.required.$invalid)">
                                <p class="error_message">
                                  <span v-if="v$.country.$error && v$.country.required.$invalid">{{ $t("Please enter The Country")
                                    }}</span>

                                </p>
                              </div>
                            </div>



            </div>
          </div>
          <div class=" px-[20px]">
            <label for="remember_me"
            class="flex items-center space-x-[8px] h-[22px] dark:text-whiteTamkin text-neutral-400 text-[15px] font-medium font-['Poppins'] leading-snug ">
            <input type="checkbox" :checked="billingStore.cards?.length === 0"
              class="border-[1px]  cursor-pointer w-[18px] h-[18px] border-[#A7A7A7] dark:border-darkborder bg-transparent rounded-[4px]
               text-tamkin ring-0 focus:ring-0 focus:outline-none"
              id="remember_me" />
              <div class="text-[14px] font-[400] text-black mt-1">
                Set as primary card Submit
              </div>
           </label>
        </div>
          <div class="mt-[39px] mb-[34px] flex items-center justify-end px-[20px] ml-auto space-x-[16px]">
            <button class="btn_bordered_dashboard  " @click="closeModal('add_new_card_billing')">
              Cancel
                      </button>

        <button class="btn-dashboard hover_tamkin " @click="addCard" :disabled="submitInviteLoading || v$.$invalid">
          <div class="flex items-center justify-center">
            <div :class="submitInviteLoading ? 'mr-2':''">
              Save
            </div>

            <svg  v-if="submitInviteLoading" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>

        </button>
      </div>


          <!-- <div class="mt-[129px]  mx-auto mb-[34px]">

      </div> -->
        </div>
      </div>


    </div>
  </div>
</template>


<style>

</style>
