<script lang="ts" setup>
import { ref, toRefs } from "vue";
import { useModalManager } from "@/composables/useModalManager";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

// Initialize store
const withdrawStore = useWithdrawStore();

// Ensure bankDetails is initialized
if (!withdrawStore.bankDetails) {
  withdrawStore.bankDetails = {
    account_currency: "",
    account_holder: "",
    account_number: "",
    bank_name: "",
    bic: "",
    iban: "",
  };
}

const state = storeToRefs(withdrawStore);

// Validation rules
const rules = {
  bank_name: { required },
  account_holder: { required },
  account_number: { required },
  iban: { required },
  bic: { required },
  account_currency: { required },
};

const v$ = useVuelidate(rules, state.bankDetails);

const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();

const checked = ref("");
const loadingtowithdraw = ref(false);

const withdraw = async () => {
  loadingtowithdraw.value = true;
  setTimeout(() => {
    navigateTo("details_bank_withdraw", "referral", "bank_account_withdraw");
    loadingtowithdraw.value = false;
    v$.value.$reset();
  }, 1500);
};

const closeAndReset = () => {
  withdrawStore.selectedPaymentMethod = "";
  withdrawStore.setBankDetails({
    bank_name: "",
    account_holder: "",
    account_number: "",
    iban: "",
    bic: "",
    account_currency: "",
  });
  closeModal("details_bank_withdraw");
  v$.value.$reset();
};
</script>

<template>
  <div
    v-if="isOpen('details_bank_withdraw')"
    class="fixed z-[9999] top-0 2xl:top-[50px] lg:top-[40px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] h-[100%] lg:h-auto 2xl:h-[600px] lg:w-[640px] ipad-max:top-[20px] w-full"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeAndReset"
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
    <div class="mx-auto max-h-[100%] w-full mt-[-20px]">
      <h1
        class="rtl:text-right ltr:text-left font-[700] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]"
      >
        {{ $t("Withdraw Money") }}
      </h1>

      <p
        class="mt-[16px] rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[14px] leading-[24px]"
      >
        {{ $t("Enter bank details") }}
      </p>

      <div class="space-y-[26px] w-full mt-[32px] pb-[30px]">
        <div class="w-full relative">
          <input
            type="text"
            placeholder="{{$t('full name')}}"
            id="bank_name"
            class="input_floating_label !top-[12px] peer !h-[50px]"
            v-model="v$.bank_name.$model"
            :class="{
              input_error:
                v$.bank_name.$error && v$.bank_name.required.$invalid,
              input_success: !v$.bank_name.$error && !v$.bank_name.$invalid,
            }"
          />
          <label
            for="bank_name"
            class="floating_label !top-[12px]"
            :class="[
              v$.bank_name.$error && v$.bank_name.required.$invalid
                ? '!text-error'
                : '',
            ]"
          >
            {{ $t("Bank Name*") }}
          </label>
          <div
            class="w-full lg:w-4/6"
            v-if="v$.bank_name.$error && v$.bank_name.required.$invalid"
          >
            <p class="error_message">
              <span
                v-if="v$.bank_name.$error && v$.bank_name.required.$invalid"
                >{{ $t("Bank name is required") }}</span
              >
            </p>
          </div>
        </div>

        <div class="w-full relative">
          <input
            type="text"
            placeholder=""
            id="account_holder"
            class="input_floating_label !top-[12px] peer !h-[50px]"
            v-model="v$.account_holder.$model"
            :class="{
              input_error:
                v$.account_holder.$error && v$.account_holder.required.$invalid,
              input_success:
                !v$.account_holder.$error && !v$.account_holder.$invalid,
            }"
          />
          <label
            for="account_holder"
            class="floating_label !top-[12px]"
            :class="[
              v$.account_holder.$error && v$.account_holder.required.$invalid
                ? '!text-error'
                : '',
            ]"
          >
            {{ $t("Account holder*") }}
          </label>
          <div
            class="w-full lg:w-4/6"
            v-if="
              v$.account_holder.$error && v$.account_holder.required.$invalid
            "
          >
            <p class="error_message">
              <span
                v-if="
                  v$.account_holder.$error &&
                  v$.account_holder.required.$invalid
                "
                >{{ $t("Account Holder Name is required") }}</span
              >
            </p>
          </div>
        </div>

        <div
          class="flex items-center justify-between space-y-[26px] sm:space-y-[0px] flex-col sm:flex-row w-full space-x-[0px] rtl:space-x-reverse sm:space-x-[30px]"
        >
          <div class="w-full relative">
            <input
              type="text"
              placeholder=""
              id="account_number"
              class="input_floating_label !top-[12px] peer !h-[50px] w-full !h-[50px]"
              v-model="v$.account_number.$model"
              :class="{
                input_error:
                  v$.account_number.$error &&
                  v$.account_number.required.$invalid,
                input_success:
                  !v$.account_number.$error && !v$.account_number.$invalid,
              }"
            />
            <label
              for="account_number"
              class="floating_label !top-[12px]"
              :class="[
                v$.account_number.$error && v$.account_number.required.$invalid
                  ? '!text-error'
                  : '',
              ]"
            >
              {{ $t("Account Number*") }}
            </label>
            <div
              class="w-full lg:w-4/6"
              v-if="
                v$.account_number.$error && v$.account_number.required.$invalid
              "
            >
              <p class="error_message">
                <span
                  v-if="
                    v$.account_number.$error &&
                    v$.account_number.required.$invalid
                  "
                  >{{ $t("Account Number is required") }}</span
                >
              </p>
            </div>
          </div>
          <div class="w-full relative">
            <input
              type="text"
              placeholder=""
              id="iban"
              class="input_floating_label !top-[12px] peer !h-[50px] w-full !h-[50px]"
              v-model="v$.iban.$model"
              :class="{
                input_error: v$.iban.$error && v$.iban.required.$invalid,
                input_success: !v$.iban.$error && !v$.iban.$invalid,
              }"
            />
            <label
              for="iban"
              class="floating_label !top-[12px]"
              :class="[
                v$.iban.$error && v$.iban.required.$invalid
                  ? '!text-error'
                  : '',
              ]"
            >
              {{ $t("IBAN*") }}
            </label>
            <div
              class="w-full lg:w-4/6"
              v-if="v$.iban.$error && v$.iban.required.$invalid"
            >
              <p class="error_message">
                <span v-if="v$.iban.$error && v$.iban.required.$invalid">{{
                  $t("IBAN is required")
                }}</span>
              </p>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between space-y-[26px] sm:space-y-[0px] flex-col sm:flex-row w-full space-x-[0px] rtl:space-x-reverse sm:space-x-[30px]"
        >
          <div class="w-full relative">
            <input
              type="text"
              placeholder=""
              id="bic"
              class="input_floating_label !top-[12px] peer w-full !h-[50px]"
              v-model="v$.bic.$model"
              :class="{
                input_error: v$.bic.$error && v$.bic.required.$invalid,
                input_success: !v$.bic.$error && !v$.bic.$invalid,
              }"
            />
            <label
              for="bic"
              class="floating_label !top-[12px]"
              :class="[
                v$.bic.$error && v$.bic.required.$invalid ? '!text-error' : '',
              ]"
            >
              {{ $t("Swift*") }}
            </label>
            <div
              class="w-full lg:w-4/6"
              v-if="v$.bic.$error && v$.bic.required.$invalid"
            >
              <p class="error_message">
                <span v-if="v$.bic.$error && v$.bic.required.$invalid">{{
                  $t("Swift is required")
                }}</span>
              </p>
            </div>
          </div>
          <div class="w-full relative">
            <input
              type="text"
              placeholder=""
              id="account_currency"
              class="input_floating_label !top-[12px] peer !h-[50px] w-full !h-[50px]"
              v-model="v$.account_currency.$model"
              :class="{
                input_error:
                  v$.account_currency.$error &&
                  v$.account_currency.required.$invalid,
                input_success:
                  !v$.account_currency.$error && !v$.account_currency.$invalid,
              }"
            />
            <label
              for="account_currency"
              class="floating_label !top-[12px]"
              :class="[
                v$.account_currency.$error &&
                v$.account_currency.required.$invalid
                  ? '!text-error'
                  : '',
              ]"
            >
              {{ $t("Account Currency*") }}
            </label>
            <div
              class="w-full lg:w-4/6"
              v-if="
                v$.account_currency.$error &&
                v$.account_currency.required.$invalid
              "
            >
              <p class="error_message">
                <span
                  v-if="
                    v$.account_currency.$error &&
                    v$.account_currency.required.$invalid
                  "
                  >{{ $t("Account Currency is required") }}</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="ipad-max:mt-[40px] mt-[74px] rtl:mr-auto ltr:ml-auto">
        <button
          class="btn-dashboard hover_tamkin"
          @click="withdraw"
          :disabled="v$.$invalid || loadingtowithdraw"
        >
          <div
            class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]"
          >
            <div :class="loadingtowithdraw ? 'rtl:ml-2 ltr:mr-2' : ''">
              {{ $t("Continue") }}
            </div>

            <svg
              v-if="loadingtowithdraw"
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

<style lang="scss"></style>
