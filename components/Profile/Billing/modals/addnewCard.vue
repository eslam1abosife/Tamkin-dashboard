<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { StripeElements, StripeElement } from "vue-stripe-js";
import { useNuxtApp } from "#app";
import { useRouter } from "vue-router";
import { useAddNewCard } from "~/composables/useBilling";
import { useVuelidate } from "@vuelidate/core";
import {
  useGetCards,
  useDeleteCard,
  useInvoices,
  useInvoicePdf,
} from "@/composables/useBilling";
const {t,locale} = useI18n()
const { getCards } = useGetCards();

 
import {
  required,
  email,
  sameAs,
  maxLength,
  numeric,
  minLength,
} from "@vuelidate/validators";
import { useGetAllCountries, useChangeMemberInfo } from "@/composables/useProfile";

const { getCountries, countries } = useGetAllCountries();


const { addNewCardToStripe ,response} = useAddNewCard();
let state = reactive({
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  is_primary: null,
});
const rules = {
  firstName: { required },
  lastName: { required },
  address: { required },
  city: { required },
  state: { required },
  zip: { required },
  country: { required },
};
const v$ = useVuelidate(rules, state);


const stripeKey = ref(
  "pk_test_51PsNOm2M5zlGZwf5AZsxAxBBW65wE8IWHIHQMXGYfV3XbXAgGv1Ca3HMooFq2O9zcEfpQsk9baxN1ki6vnIca0ag00QCvJdwBM"
);
const stripeLoaded = ref(false);
const cardOptions = ref({ 
  showIcon: true,
  style: {
  base: {
    fontFamily: locale.value === 'ar' ? 'Almarai, sans-serif' : 'Poppins, sans-serif',  // Ensure fallback fonts are specified
    fontWeight: '400', // Set weight for Arabic and non-Arabic
    colorTextPlaceholder: '#A7A7A7',

  },
}

  
});
const cardCvcOptions = ref({
  placeholder: t('CVC'),
  style: {
  base: {
    fontFamily: locale.value === 'ar' ? 'Almarai, sans-serif' : 'Poppins, sans-serif',  // Ensure fallback fonts are specified
    fontWeight: '400', // Set weight for Arabic and non-Arabic
    colorTextPlaceholder: '#a7a7a7',

  },
}

})
const elementsOptions = ref({
  locale: locale.value,
  fonts: [
    {
      cssSrc: locale.value === 'ar' ? 'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap' :'https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
    }
  ]

});
const elms = ref<any>(null); 
const card = ref<any>(null); 
const disabledPay = ref(true);
const cardNumberElement = ref(null);
const loadingAddCard = ref(false)
const cardExpiryElement = ref(null);
const cardCvcElement = ref(null);
const router = useRouter();
const { $toast } = useNuxtApp();
const cardErrors = ref([]);
const cardIsEmpty = ref(true); 
const expiryChange = ref(true)
const cvvChange = ref(true)
const loadingFont =ref(true)
const elementsReady = ref(false);


onMounted(async () => {
  try {

    const stripe = await loadStripe(stripeKey.value);    await getCountries();

    if (stripe) {
 

      stripeElementReadyEV()
  elementsReady.value = true

    } else {
      console.error("Failed to load Stripe");
    }

  } catch (error) {
    console.error("Error loading Stripe:", error);
  }
});
const handleSelectedItemProjectName = (item: any) => {
  console.log(item)
  state.country = item.id
};
// Stripe Element Ready Event
const stripeElementReadyEV = () => {
  // Stripe element is ready
  console.log("Stripe element is ready");
      stripeLoaded.value = true;

};

// Completed Stripe Event
const completedStripe = (event: any) => {
  if (event.error) {
        cardErrors.value = [t(event.error.message)] // Update with new errors
        console.log(event.error)
      } else {
        cardErrors.value = [] // Clear errors if no errors
      }
  if (event.complete) {
    cardIsEmpty.value = false;
  } else {
    cardIsEmpty.value = true;
  }
};
const expiryErrors = ref([])

/**
 * Handles changes to the expiry date input element.
 * If the input is valid, resets the expiryChange flag and clears any errors.
 * If the input is invalid, sets the expiryChange flag and displays the error message.
 * @param {{complete: boolean, error: {message: string}}} event - Stripe expiry change event
 */
const handleExpiryChange = (event: any) => {
  if (event.complete) {
    expiryChange.value = false;
    
  } else if(event.error) {
    expiryErrors.value = [t(event.error.message)] 
    console.log(event.error)

  }else {
    expiryErrors.value = [] 
  }

};
const profileStore = useProfileStore()
const cvvErrors = ref([])

    const handleChangeCVV = (event: any) => {
      // Check if there are any errors
      if (event.error) {
        cvvErrors.value = [t(event.error.message)] // Update with new errors
        console.log(event.error)

      } else {
        cardErrors.value = [] // Clear errors if no errors
      }
      if (event.complete) {
    cvvChange.value = false;

  } else {
    cvvChange.value = true;
  }
    }
// Handle Save Card
const handleSave = async () => {
  loadingAddCard.value  = true
  if (!elms.value) return;

  const { error, paymentMethod } = await elms.value.instance.createPaymentMethod({
    type: 'card',
    card: cardNumberElement.value.stripeElement, 

    billing_details: {
    name: state.firstName +' '+ state.lastName,         // Customer's name
    email: profileStore.member.member_email,  // Customer's email

    // phone: '+123456789',      // Customer's phone number (optional)
    address: {
      line1: state.address,   // Street address
      city: state.city,       // City
      state: state.state,            // State/Province
      country: state.country,   
      postal_code:state.zip       // Country (2-letter code)
    },
  },
  });

  // Send paymentMethodId to your API
  // console.log("intent", paymentMethod);
  const paymentMethodId = paymentMethod.id;
  await sendPaymentMethodIdToApi(paymentMethodId);
  if(response.value.data.succeeded === false){
      cardErrors.value = [t('This card cannot be used right now. please try with different card')]// Update with new errors
      loadingAddCard.value  = false

    }else {
   
      if(currentView('add_new_card_billing') === 'Market'){
      navigateTo('add_new_card_billing','market','cardModal_market')

    } else if(currentView('add_new_card_billing') === 'packages'){
      navigateTo('add_new_card_billing','packages','cardModal_packages')

    }
    else if(currentView('add_new_card_billing') === 'addSite'){
      navigateTo('add_new_card_billing','addSite','cardModal_addsite')

    }
    else {
      closeModal('add_new_card_billing')
    }

      $toast(t("Card added successfully!"));
      billingStore.loadCards = true
      await getCards();
      billingStore.loadCards = false

    }
  // router.push('/success'); // Redirect on success
};

// Send payment method ID to API
const sendPaymentMethodIdToApi = async (paymentMethodId: string) => {
  try {
    await addNewCardToStripe(paymentMethodId,state.is_primary);
 
  } catch (error) {
    // console.error("Failed to send payment method ID:", error);
    $toast(t("Failed to save card"));
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
    class="mysite_bg_modal dark:bg-p fixed z-[9999] top-[0] rtl:lg:left-0 ltr:lg:right-0 rounded-[10px] 
    lg:p-[30px] lg:w-[600px] w-full h-full lg:h-screen overflow-y-auto lg:overflow-x-hidden"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn_payment !cursor-pointer mr-[10px]  z-[999] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
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
            class="text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin  lg:mt-0 mt-[60px]"
          >
            {{ $t("Add New Card") }}
          </h1>
        </div>
        <div v-if="stripeLoaded && elementsReady"
          class="flex flex-col items-start justify-center w-full bg-white dark:bg-tamkinDarkPrimary rounded-[10px] mt-[33px]"
          style="box-shadow: 0px 4px 24px 8px #51459f14"
        >
          <h1
            class="text-[16px] leading-[36px] font-[600] rtl:mr-[20px] ltr:ml-[20px] text-darkGrey dark:text-whiteTamkin 
            mt-[31px]"
          >
            {{ $t("Card Info") }}
          </h1>

          <div
            class="flex flex-col items-start justify-center px-[20px] mt-[21px] w-full"
          >
            <div
              class="flex items-center justify-start lg:flex-row flex-col  rtl:space-x-reverse space-x-[20px] lg:space-y-[0]
               space-y-[25px] mb-[25px] w-full"
            >
              <div class="w-full">
                <div class="w-full relative">
                  <input
                    type="text"
                    placeholder="{{$t('First Name')}}"
                    id="firstName"
                    class="input_floating_label peer w-full "
                    v-model="v$.firstName.$model"
                    :class="{
                      input_error:
                        v$.firstName.$error && v$.firstName.required.$invalid,
                      input_success: !v$.firstName.$error && !v$.firstName.$invalid,
                    }"
                  />
                  <label
                    for="firstName"
                    class="floating_label"
                    :class="[
                      v$.firstName.$error && v$.firstName.required.$invalid
                        ? '!text-error'
                        : '',
                    ]"
                  >
                    {{ $t("First Name*") }}
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
              <div class="w-full ">
                <div class="relative">
                  <input
                    type="text"
                    placeholder=""
                    id="lastName"
                    class="input_floating_label peer w-full "
                    v-model="v$.lastName.$model"
                    :class="{
                      input_error:
                        v$.lastName.$error && v$.lastName.required.$invalid,
                      input_success: !v$.lastName.$error && !v$.lastName.$invalid,
                    }"
                  />
                  <label
                    for="lastName"
                    class="floating_label"
                    :class="[
                      v$.lastName.$error && v$.lastName.required.$invalid
                        ? '!text-error'
                        : '',
                    ]"
                  >
                    {{ $t("Last Name*") }}
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

          <StripeElements
            class="w-full relative rtl:!font-[Almarai] ltr:!font-[Poppins]"
            
            v-slot="{ elements, instance }"
            ref="elms"
            @ready="stripeElementReadyEV"
            :stripe-key="stripeKey"
            :elements-options="elementsOptions"
            v-if="stripeLoaded && elementsReady"
            
          >
    
            <StripeElement

              ref="cardNumberElement"
              type="cardNumber"
            @change="completedStripe"
              :class="{
                input_error:
                 cardErrors && cardErrors.length > 0,
              }"
              :options="cardOptions"
              :elements="elements"
              class="w-full input_floating_label "
            />
            <div
            class="w-full lg:w-4/6 absolute rtl:left-[17px] ltr:right-[17px]"
            v-if="cardErrors && cardErrors.length > 0"
          >
            <p class="error_message">
              <span
               
                >{{ cardErrors[0] }}</span
              >
            </p>
          </div>
        
            <div class="flex items-center justify-center mt-[14px] w-full  space-x-[20px] rtl:space-x-reverse">
         <div class="relative w-2/4">
          <StripeElement
          ref="card_cvc"
          type="cardCvc"

          :class="{
            input_error:
           cvvErrors.length > 0
          }"
          :options="cardCvcOptions"
        @change="handleChangeCVV"
          :elements="elements"
          class=" input_floating_label w-full"
          />
      
        <div
        class="w-full lg:w-4/6 absolute bottom-0 rtl:left-[17px] ltr:right-[10px]"
        v-if=" cvvErrors.length > 0"
      >
        <p class="error_message">
         {{ $t('CVV is not valid')}}
          
        </p>
      </div>
         </div>
      <div class="relative w-2/4">
        <StripeElement
        ref="card"

        type="cardExpiry"
        
        :options="cardOptions"
        @change="handleExpiryChange"
        :class="{
          input_error:
          expiryErrors && expiryErrors.length > 0,
        }"
        :elements="elements"
        class=" input_floating_label w-full "
      />

      <div
      class="w-full lg:w-4/6 absolute bottom-0 rtl:left-[17px] ltr:right-[10px]"
      v-if="expiryErrors && expiryErrors.length > 0"
    >
      <p class="error_message">
        <span
         
          >{{ $t('Date is not valid') }}</span
        >
      </p>
    </div>
      </div>
            </div>
          </StripeElements>
</div>
       
<h1
class="!text-[16px] !leading-[36px] !font-[600] rtl:mr-[20px] ltr:ml-[20px] !text-darkGrey dark:text-whiteTamkin 
mt-[31px]"
>
{{$t('Billing Address')}}
</h1>


         
<div
class="flex flex-col items-start justify-center !px-[20px] mt-[21px] w-full"
>
<div
  class="flex items-start lg:flex-row flex-col justify-center mb-[25px] w-full"
>
  <div class="w-full relative mx-auto">
    <input
      type="text"
      placeholder="{{$t('Address')}}"
      id="address"
      class="input_floating_label peer w-full "
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
  class="flex items-start lg:items-center justify-center lg:justify-start lg:flex-row flex-col lg:space-y-0 space-y-[16px] 
   rtl:space-x-reverse space-x-[20px] lg:mb-[25px] w-full"
>
  <div class="w-full">
    <div class="relative">
      <input
        type="text"
        placeholder="{{$t('City')}}"
        id="city"
        class="input_floating_label peer w-full "
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
  <div class="w-full ">
    <div class="relative">
      <input
        type="text"
        placeholder="{{$t('State')}}"
        id="state"
        class="input_floating_label peer w-full "
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
  space-y-[16px]  rtl:space-x-reverse space-x-[20px] lg:mb-[25px] w-full"
>
  <div class="w-full ">
    <div class="relative">
      <input
        type="text"
        placeholder=""
        id="zip"
        class="input_floating_label peer w-full"
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
        {{ $t("Postal Code") }}*
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
  <div class="w-full lg:mt-0 mt-[16px]">

    <TranslateSelectInput
        @getCurrentSelectedItem="handleSelectedItemProjectName"
        :enableSearch="true"
        placeholderinput="Country*"
        :errorField="v$.country.$error && v$.country.required.$invalid"
        :list="countries.map(m=>{return {name:m.country_name,icon:m.image,id:m.code}})"
        nameKey="name"
        idField="id"
        iconKey="icon"
        :successField="!v$.country.$error && !v$.country.$invalid"
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
  class="flex items-center rtl:space-x-reverse space-x-[8px] h-[22px] dark:text-whiteTamkin text-neutral-400 text-[15px] font-medium font-['Poppins'] leading-snug ">
  <input  v-model="state.is_primary" type="checkbox" :checked="billingStore.cards?.length === 0"
    class="border-[1px]  cursor-pointer w-[18px] h-[18px] border-[#A7A7A7] dark:border-darkborder bg-transparent rounded-[4px]
     text-tamkin ring-0 focus:ring-0 focus:outline-none"
    id="remember_me" />
    <div class="text-[14px] font-[400] text-black mt-1 ltr:font-[Poppins] rtl:font-[Almarai]">
    {{$t('Set as Primary Card')}}
    </div>
 </label>
</div>









          <div
            class="mt-[39px] mb-[34px] flex items-center justify-end px-[20px] rtl:mr-auto ltr:ml-auto rtl:space-x-reverse space-x-[16px]"
          >
            <button class="btn_bordered_dashboard" @click="closeModalCard">
              {{ $t("Cancel") }}
            </button>
            <button class="btn-dashboard hover_tamkin" @click="addNew" 
            :disabled="cvvChange || expiryChange ||cardIsEmpty || loadingAddCard || cardErrors.length  || v$.$invalid">
              <div class="flex items-center justify-center">
                <div :class="loadingAddCard ? 'rtl:ml-2 ltr:mr-2' : ''">{{$t('Save')}}</div>
      
                <svg
                  v-if="loadingAddCard"
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

          <!-- <div class="mt-[129px]  mx-auto mb-[34px]">

      </div> -->
        </div>
        <div v-if="!stripeLoaded && !elementsReady"
  class="flex flex-col items-start justify-center w-full bg-white dark:bg-tamkinDarkPrimary rounded-[10px] mt-[33px]"
  style="box-shadow: 0px 4px 24px 8px #51459f14"
>
  <h1
    class="text-[16px] leading-[36px] font-[600] rtl:mr-[20px] ltr:ml-[20px] text-darkGrey dark:text-whiteTamkin mt-[31px] animate-pulse bg-gray-300 w-32 h-6 rounded"
  ></h1>

  <div
    class="flex flex-col items-start justify-center px-[20px] mt-[21px] w-full"
  >
    <div
      class="flex items-center justify-start lg:flex-row flex-col rtl:space-x-reverse space-x-[20px] lg:space-y-[0]
      space-y-[25px] mb-[25px] w-full"
    >
      <div class="w-full animate-pulse">
        <div class="w-full h-10 bg-gray-300 rounded"></div>
        <div class="mt-2 w-4/6 h-4 bg-gray-300 rounded"></div>
      </div>

      <div class="w-full lg:w-[330px] animate-pulse">
        <div class="w-full h-10 bg-gray-300 rounded"></div>
        <div class="mt-2 w-4/6 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>

    <div class="flex items-center justify-center mt-[14px] space-x-[20px] animate-pulse">
      <div class="w-2/4 h-10 bg-gray-300 rounded"></div>
      <div class="w-2/4 h-10 bg-gray-300 rounded"></div>
    </div>

    <h1
      class="text-[16px] leading-[36px] font-[600] rtl:mr-[20px] ltr:ml-[20px] text-darkGrey dark:text-whiteTamkin mt-[14px] animate-pulse bg-gray-300 w-40 h-6 rounded"
    ></h1>

    <div class="w-full mt-[21px] animate-pulse">
      <div class="w-full h-10 bg-gray-300 rounded"></div>
      <div class="mt-2 w-4/6 h-4 bg-gray-300 rounded"></div>
    </div>

    <div class="flex lg:flex-row flex-col mt-[16px] space-y-[16px] lg:space-y-0 rtl:space-x-reverse space-x-[20px] lg:mb-[25px] w-full animate-pulse">
      <div class="w-full h-10 bg-gray-300 rounded"></div>
      <div class="w-full h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
</div>

      </div>
    </div>
  </div>
</template>

<style></style>
