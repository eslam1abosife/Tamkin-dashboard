<script lang="ts" setup>
import { useModalManager } from "@/composables/useModalManager";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { helpers } from "@vuelidate/validators";

const { isOpen, currentView, openModal, closeModal, goBack, navigateTo } =
  useModalManager();

const domainRegex =
  /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;

const isDomain = helpers.withParams({ type: "isDomain" }, (value) => {
  return domainRegex.test(value);
});
const state = reactive({
  newWebsite: "",
});
const rules = {
  newWebsite: { required, isDomain },
};

const v$ = useVuelidate(rules, state);

const modalStore = useModalStore();
const { plansModal } = storeToRefs(modalStore);
const selectedPackage = ref("");
const selectPackage = (plan: any) => {
  selectedPackage.value = plan;
};
const props = defineProps({
  showModal: Boolean,
});
</script>

<template>
  <div
    class="flex flex-col items-start justify-center w-full lg:overflow-x-hidden"
    v-if="isOpen('billing')"
  >
    <h1
      class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin lg:px-0 px-[20px] lg:mt-0 mt-[60px]"
    >
      Upgrade Plan
    </h1>
    <div
      class="flex flex-col items-start justify-center lg:overflow-x-hidden overflow-x-scroll bg-white dark:bg-tamkinDarkPrimary w-full h-full px-[20px] rounded-[10px] mt-[33px] mb-[80px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >
      <h1
        class="text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin mt-[31px]"
      >
        Select Your Plan
      </h1>

      <div
        class="flex items-center lg:flex-row flex-col justify-center lg:justify-start w-full rtl:space-x-reverse space-x-[14px]"
      >
        <div
          class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] relative w-full pt-2.5 pr-2.5 pb-2.5 rtl:pr-2 ltr:pl-2 h-[87px] !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
          :class="[
            selectedPackage === 'monthly'
              ? 'custom-border-tamkin'
              : 'custom-border ',
          ]"
        >
          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 relative w-full">
              <h1 class="font-[500] text-[14px] dark:text-whiteTamkin">
                Monthly Plan
              </h1>
            </div>
            <div class="order-1 mx-[30px]">
              <input
                id="monthly"
                type="radio"
                name="packages_radio"
                class="hidden"
                value="monthly"
                @click.stop="selectPackage('monthly')"
              />
              <label for="monthly" class="flex items-center cursor-pointer">
                <span class="radio-tamkin"></span>
              </label>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] w-full pt-2.5 pr-2.5 pb-2.5 rtl:pr-2 ltr:pl-2 h-[87px] !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
          :class="[
            selectedPackage === 'annual'
              ? 'custom-border-tamkin'
              : 'custom-border ',
          ]"
        >
          <div class="flex items-center justify-center w-full">
            <div class="order-2 w-full h-full">
              <div
                style="
                  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
                "
                class="absolute text-[13px] leading-[17.76px] font-[600] w-[69px] custom-border rounded-[10px] h-[22px] flex items-center justify-center py-[4.5] px-[0.5px] top-[-10px] rtl:right-[30%] ltr:left-[30%] text-white"
              >
                <span>Popular</span>
              </div>
              <h1 class="font-[500] text-[14px] dark:text-whiteTamkin">
                Annual Plan
              </h1>
              <h2 class="font-[500] text-[10px]">
                <span
                  class="!text-[#021328] font-[700] dark:!text-whiteTamkin/80"
                  >12%
                </span>
                <span class="text-[#536174] dark:text-whiteTamkin/80"
                  >Discount on the monthly Plan</span
                >
              </h2>
            </div>
            <div class="order-1 mx-[30px]">
              <input
                id="annual"
                type="radio"
                name="packages_radio"
                class="hidden"
                value="annual"
                @click.stop="selectPackage('annual')"
              />
              <label for="annual" class="flex items-center cursor-pointer">
                <span class="radio-tamkin"></span>
              </label>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-start bg-selected dark:bg-p rtl:space-x-reverse space-x-[16px] relative w-full pt-2.5 pr-2.5 pb-2.5 rtl:pr-2 ltr:pl-2 h-[87px] !rounded-[10px] mt-[35px]"
          :class="[
            selectedPackage === '3year_plan'
              ? 'custom-border-tamkin'
              : 'custom-border ',
          ]"
        >
          <div class="flex items-center justify-center w-full">
            <div class="order-2 w-full">
              <div
                style="background: #c16487"
                class="absolute text-[13px] leading-[17.76px] font-[600] w-[89px] rounded-[10px] h-[22px] flex items-center justify-center top-[-10px] left-[30%] text-white"
              >
                <span>Best Value</span>
              </div>
              <h1 class="font-[500] text-[14px] dark:text-whiteTamkin">
                3- Year Plan
              </h1>
              <h2 class="font-[500] text-[10px]">
                <span
                  class="!text-[#021328] font-[700] dark:!text-whiteTamkin/80"
                  >20%
                </span>
                <span class="text-[#536174] dark:text-whiteTamkin/80"
                  >Discount on the monthly Plan</span
                >
              </h2>
            </div>
            <div class="order-1 mx-[30px]">
              <input
                id="3year"
                type="radio"
                name="packages_radio"
                class="hidden"
                value="3year_plan"
                @click.stop="selectPackage('3year_plan')"
              />
              <label for="3year" class="flex items-center cursor-pointer">
                <span class="radio-tamkin"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex items-center lg:flex-row flex-col justify-center lg:justify-between w-full mt-[50px]"
      >
        <div class="w-full 2xl:w-[520px] lg:w-[550px] 3xl:w-[500px] relative">
          <input
            type="newWebsite"
            placeholder="{{$t('web site')}}"
            id="email"
            class="input_floating_label peer focus:outline-0 text-darkGrey w-full !h-[40px]"
            v-model="v$.newWebsite.$model"
            :class="{
              input_error:
                (v$.newWebsite.$error && v$.newWebsite.required.$invalid) ||
                (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid),
              error_text:
                (v$.newWebsite.$error && v$.newWebsite.required.$invalid) ||
                (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid),
              input_success:
                (!v$.newWebsite.$error && !v$.newWebsite.$invalid) ||
                (!v$.newWebsite.$error && !v$.newWebsite.isDomain.$invalid),
            }"
          />
          <label
            for="newWebsite"
            class="floating_label"
            :class="[
              (v$.newWebsite.$error && v$.newWebsite.required.$invalid) ||
              (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid)
                ? '!text-error'
                : '',
            ]"
          >
            {{ $t("Add a Website") }}*
          </label>
          <div
            class="w-full lg:w-4/6"
            v-if="
              (v$.newWebsite.$error && v$.newWebsite.required.$invalid) ||
              (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid)
            "
          >
            <p class="error_message">
              <span
                v-if="
                  (v$.newWebsite.$error && v$.newWebsite.required.$invalid) ||
                  (v$.newWebsite.$error && v$.newWebsite.isDomain.$invalid)
                "
                >{{ $t("Website is not valid") }}</span
              >
            </p>
          </div>
        </div>

        <div class="lg:w-[140px] lg:mt-0 mt-[16px]">
          <button
            class="w-full btn-dashboard-normal normal_hover h-[45px] text-[12px] flex items-center justify-center font-[600]"
          >
            Add Website
          </button>
        </div>
      </div>

      <table class="min-w-full dark:bg-tamkinDarkPrimary bg-white mt-[62px]">
        <thead>
          <tr>
            <th
              class="py-2 px-[0px] border-b text-[16px] leading-[24px] text-[#A7A7A7] dark:text-whiteTamkin font-[500] ltr:text-left rtl:text-right"
            >
              Website
            </th>
            <th
              class="py-2 border-b text-[16px] leading-[24px] text-[#A7A7A7] dark:text-whiteTamkin font-[500] ltr:text-left rtl:text-right"
            >
              Tier
            </th>
            <th
              class="py-2 border-b text-[16px] leading-[24px] text-[#A7A7A7] dark:text-whiteTamkin font-[500] rtl:text-left ltr:text-right"
            >
              Price
            </th>
          </tr>
        </thead>
        <tbody class="">
          <tr>
            <td
              class="py-2 border-b ltr:text-left rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin flex items-center justify-start rtl:space-x-reverse space-x-[33px]"
            >
              <div class="w-[150px]">
                <span>Tamkin.App</span>
              </div>
              <div class="cursor-pointer">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  class="text-[#D9D9D9] hover:text-[#E80902]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </td>
            <td
              class="py-2 border-b ltr:text-left rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
            >
              Large
            </td>
            <td
              class="py-2 border-b text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
            >
              $30,444.00
            </td>
          </tr>
          <tr>
            <td
              class="py-2 border-b ltr:text-left rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin flex items-center justify-start rtl:space-x-reverse space-x-[33px]"
            >
              <div class="w-[150px]">
                <span class="w-[150px]">Pinterest.App</span>
              </div>
              <div class="cursor-pointer">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  class="text-[#D9D9D9] dark:text-whiteTamkin hover:text-[#E80902]"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </td>
            <td
              class="py-2 pr-[100px] border-b ltr:text-left rtl:text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
            >
              Small
            </td>
            <td
              class="py-2 border-b text-right text-[16px] leading-[24px] font-[400] text-darkGrey dark:text-whiteTamkin"
            >
              $20,444.00
            </td>
          </tr>
          <tr
            class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
          >
            <td
              class="py-2 pr-[40px] border-b text-right font-[500] w-full dark:text-whiteTamkin"
              colspan="2"
            >
              Subtotal
            </td>
            <td
              class="py-2 border-b text-right w-full dark:text-whiteTamkin/80"
              colspan="2"
            >
              $50,444.00
            </td>
          </tr>
          <tr
            class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary"
          >
            <td
              class="py-2 pr-[40px] border-b text-right font-[500] w-full dark:text-whiteTamkin"
              colspan="2"
            >
              Total
            </td>
            <td
              class="py-2 border-b text-right w-full dark:text-whiteTamkin/80"
              colspan="2"
            >
              $50,444.00
            </td>
          </tr>
        </tbody>
      </table>
      <div class="my-[26px] rtl:mr-auto ltr:ml-auto">
        <button
          class="btn-dashboard hover_tamkin"
          @click="navigateTo('billing', 'add-site', 'paymentMethods')"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  </div>
</template>
