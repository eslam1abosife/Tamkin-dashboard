<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";

import {
  useGetAllCountries,
  useGetAllCompanySpecializations,
  useChangeCompanyInfo,
} from "@/composables/useProfile";

const { getCountries, countries } = useGetAllCountries();
const { fetchCompanySpecializations, companySpecializations, loading } =
  useGetAllCompanySpecializations();
const { changeCompanyInfo, loading: companyInfoLoading } =
  useChangeCompanyInfo();

const profileStore = useProfileStore();
const { data, pending, error } = useFetch(() => fetchCompanySpecializations());

const state = reactive({
  company: profileStore.company.agency_name,
  country: profileStore.company.country,
  phone: profileStore.company.phone,
  company_specialization: profileStore.company.company_specialization,
});
const rules = {
  company: { required },
  phone: { required },
  country: { required },
  company_specialization: { required },
};

const telInputStyleClasses = computed(() => {
  return [
    "!rounded-[10px]",
    {
      input_error: v$.value.phone.$error && v$.value.phone.required.$invalid,
      input_success: !v$.value.phone.$error && !v$.value.phone.$invalid,
    },
  ];
});

const emit = defineEmits(["cancelupdate", "updateProfile"]);
const props = defineProps({
  loadingUpdate: Boolean,
});
const cancelUpdate = () => {
  emit("cancelupdate");
  resetcancel();
};
const { $toast } = useNuxtApp();

const updateProfile = async () => {
  v$.value.$touch();
  if (!v$.value.$invalid) {
    emit("updateProfile", state);
    // emit('cancelupdate')
  }
};

const v$ = useVuelidate(rules, state);

const handleSelectedCountry = (item: any) => {
  state.country = item.name;
  // console.log(item)
};

const handleSelectedSpecialization = (item: any) => {
  state.company_specialization = item.name;
  // console.log(item)
};
const localPhoneCompany = ref();
const countryCodeCompany = ref();

const getPhoneC = (number: string, phoneObject: { number: string }) => {
  localPhoneCompany.value = phoneObject.nationalNumber; // Update local phone state
  countryCodeCompany.value = phoneObject.countryCallingCode;
};
watch(localPhoneCompany, (newPhone) => {
  // localPhoneCompany.phone = newPhone; // Update the main state when local phone changes
  // console.log(`00${countryCodeCompany.value}${localPhoneCompany.value}`)
});
watch(
  () => state,
  (newState) => {
    // Use a spread operator to create a new object
    profileStore.updatedCompanyPayload = {
      ...state,
      phone: `00${countryCodeCompany.value}${localPhoneCompany.value}`,
    };
  },
  { deep: true }
);

onMounted(async () => {
  state.company = profileStore.company.agency_name;
  state.country = profileStore.company.country;
  state.phone = profileStore.company.phone;
  state.company_specialization = profileStore.company.company_specialization;
  // Extract country code and local phone from state.phone
  const phoneMatch = state.phone.match(/^00(\d{1,3})(\d+)$/);
  if (phoneMatch) {
    countryCodeCompany.value = phoneMatch[1];
    localPhoneCompany.value = phoneMatch[2];
  }
});

const resetcancel = () => {
  state.company = profileStore.company.agency_name;
  state.country = profileStore.company.country;
  state.phone = profileStore.company.phone;
  state.company_specialization = profileStore.company.company_specialization;
};
</script>

<template>
  <div class="w-full h-full">
    <div
      class="grid grid-cols-1 ipad-max:grid-cols-1 md:grid-cols-2 gap-4 w-full !mt-[32px]"
    >
      <div class="w-full relative">
        <input
          type="text"
          id="company"
          placeholder=""
          class="input_floating_label peer w-full"
          v-model="v$.company.$model"
          :class="{
            input_error: v$.company.$error && v$.company.required.$invalid,
            input_success: !v$.company.$error && !v$.company.$invalid,
          }"
        />
        <label
          for="company"
          class="floating_label"
          :class="[
            v$.company.$error && v$.company.required.$invalid
              ? '!text-error'
              : '',
          ]"
        >
          {{ $t("Company*") }}
        </label>
        <div
          class="w-full lg:w-4/6"
          v-if="v$.company.$error && v$.company.required.$invalid"
        >
          <p class="error_message">
            <span v-if="v$.company.$error && v$.company.required.$invalid">{{
              $t("Please enter The Company Name")
            }}</span>
          </p>
        </div>
      </div>

      <div class="w-full relative">
        <!-- {{   profileStore.countries }} -->
        <TranslateSelectInput
          @getCurrentSelectedItem="handleSelectedCountry"
          :enableSearch="true"
          placeholderinput="Country*"
          :errorField="v$.country.$error && v$.country.required.$invalid"
          :list="profileStore.countries"
          nameKey="name"
          idField="name"
          iconKey="image"
          :successField="!v$.country.$error && !v$.country.$invalid"
          :currentListValue="state.country"
        />

        <div
          class="w-full lg:w-4/6"
          v-if="v$.country.$error && v$.country.required.$invalid"
        >
          <p class="error_message">
            <span v-if="v$.country.$error && v$.country.required.$invalid">{{
              $t("Please enter The Country")
            }}</span>
          </p>
        </div>
      </div>
      <div class="w-full relative">
        <vue-tel-input
          v-model="v$.phone.$model"
          @on-input="getPhoneC"
          :auto-format="false"
          class="!w-full"
          :dropdownOptions="{ showFlags: true, showDialCodeInSelection: true }"
          :inputOptions="{
            showDialCode: false,
            maxlength: 12,
            styleClasses: ['input_floating_label w-full bg-transparent'],
          }"
          mode="national"
          :styleClasses="telInputStyleClasses"
        >
          <template v-slot:arrow-icon="{ open }">
            <img
              src="/assets/imgs/payment_methods/country_arrow.svg"
              :class="[open ? 'rotate-90' : '']"
              class="rtl:mr-[20px] ltr:ml-[20px] mb-[0px] float-right w-[14px] h-[8px]"
            /> </template
        ></vue-tel-input>
        <label
          v-if="false"
          for="phone"
          class="floating_label"
          :class="[
            v$.phone.$error && v$.phone.required.$invalid ? '!text-error' : '',
          ]"
        >
          {{ $t("Phone Number*") }}
        </label>
        <div
          class="w-full lg:w-4/6"
          v-if="v$.phone.$error && v$.phone.required.$invalid"
        >
          <p class="error_message">
            <span v-if="v$.phone.$error && v$.phone.required.$invalid">{{
              $t("Please enter The Phone number")
            }}</span>
          </p>
        </div>
      </div>

      <div class="w-full relative">
        <TranslateSelectInput
          @getCurrentSelectedItem="handleSelectedSpecialization"
          :enableSearch="true"
          placeholderinput="Company specialization*"
          :errorField="
            v$.company_specialization.$error &&
            v$.company_specialization.required.$invalid
          "
          :list="companySpecializations"
          nameKey="name"
          idField="name"
          :successField="
            !v$.company_specialization.$error &&
            !v$.company_specialization.$invalid
          "
          :currentListValue="state.company_specialization"
        />

        <div
          class="w-full lg:w-4/6"
          v-if="
            v$.company_specialization.$error &&
            v$.company_specialization.required.$invalid
          "
        >
          <p class="error_message">
            <span
              v-if="
                v$.company_specialization.$error &&
                v$.company_specialization.required.$invalid
              "
              >{{ $t("Please enter The Company Specialization") }}</span
            >
          </p>
        </div>
      </div>
      <div
        class="flex items-end rtl:justify-end rtl:flex-row-reverse space-x-[16px] rtl:left-[30px] ltr:right-[30px]"
      >
        <button
          class="btn_bordered_dashboard w-[50%] sm:w-[100px]"
          @click="cancelUpdate"
        >
          {{ $t("Cancel") }}
        </button>
        <button
          class="btn-dashboard hover_tamkin w-[50%] sm:w-[125px]"
          :disabled="loadingUpdate || v$.$invalid || !profileStore.profileAbout"
          @click="updateProfile"
        >
          <div
            class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]"
          >
            <div :class="loadingUpdate ? 'rtl:ml-2 ltr:mr-2' : ''">
              {{ $t("Update") }}
            </div>

            <svg
              v-if="loadingUpdate"
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
</template>
