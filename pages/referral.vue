<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  useGetReferralLink,
  useGetRewards,
  useGetAllReferrals,
  useGetCustomerCount,
} from "~/composables/useReferral";
import { useClipboard } from "@vueuse/core";
const {t} = useI18n()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
definePageMeta({
  layout: "dashboard",
});
const { getReferralLink } = useGetReferralLink();
const { getAllReferrals } = useGetAllReferrals();
const { getcustomerCount } = useGetCustomerCount();

const loadingBlock = ref(true);

import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
const state = reactive({
  email: "",
  Name: "",
  Company: "",
  Subject: "",
  Inquiry: "",
});
const rules = {
  email: { required, email },
  Name: { required },
  Company: {},
  Subject: { required },
  Inquiry: { required },
};

const changeTab = (tab: any) => {
  currentTab.value = tab;
  dateF.value = [];
};

const getStatusStyle = (method: number) => {
  switch (method) {
    case "Paid":
      return "bg-tamkin";
    case "Pending":
      return "bg-orange-400";
    case "Success":
      return "bg-tamkin";
    case "rejected":
      return "bg-red-600";
    case "Completed":
      return "bg-tamkin";
    case "Transfered":
      return "bg-tamkin";
  }
};
const v$ = useVuelidate(rules, state);
const currentTab = ref("rewards");
const dateF = ref([]);
const colorMode = useColorMode();
const langStore = useLangSwitch();

const dateOpen = ref(false);

const alertFn = () => {
  if (dateOpen.value) {
    dateOpen.value = false;
  } else {
    dateOpen.value = true;
  }
};
// const withdrawStore = useWithdrawStore()
const format = (date) => {
  const options = { year: "numeric", month: "short", day: "2-digit" };

  const formatDate = (d) => d.toLocaleDateString("en-US", options);

  if (Array.isArray(date)) {
    const start = formatDate(date[0]);
    const end = formatDate(date[1]);
    return ` ${start} - ${end}`;
  } else {
    return `Selected date is ${formatDate(date)}`;
  }
};
const disabledIfPendingRecords = computed(() => {
  // Check if there is any record with a status of "Pending"
  const hasPendingRecords = withdrawStore.rewards.some(item => item.status === 'Pending');

  // Check if currentAmount is zero or less
  const isAmountZeroOrLess = withdrawStore.currentAmount <= 0;

  // Disable if either condition is true
  return hasPendingRecords || isAmountZeroOrLess;
});

const source = ref("");
const withdrawStore = useWithdrawStore();

const { $toast } = useNuxtApp();
onMounted(async () => {
  await withdrawStore.getAllrewards();
  await withdrawStore.gettotalAmount();
  await withdrawStore.getcurrentLimit();
  await withdrawStore.getcurrentRate();
  await getcustomerCount();
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("user"));

    const resultLink = await getReferralLink();
    await getAllReferrals();

    source.value = resultLink.data;
    // withdrawStore.Allrefs.value=withdrawStore.AllrefsResult.data;
    // console.log(withdrawStore.Allrefs.value)
  }
  loadingBlock.value = false;
});

const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};
const { text, copy, copied, isSupported } = useClipboard({ source });
const formatDateOfReward = (dateof) => {
  const date = new Date(dateof); // Convert to Date object
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);

  return formattedDate;
};

const stripTime = (date) => {
  // Return a date with the time set to midnight
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const filteredReferrals = computed(() => {
  // If no filter date is selected, show all referrals
  if (!dateF.value || dateF.value.length < 2) {
    return withdrawStore.Allrefs;
  }

  // Extract start and end dates from the array
  const [startDateStr, endDateStr] = dateF.value;
  const startDate = stripTime(new Date(startDateStr));
  const endDate = stripTime(new Date(endDateStr));

  // Filter referrals based on the selected date range
  return withdrawStore.Allrefs.filter((referral) => {
    const referralDate = stripTime(new Date(referral.creation));
    return referralDate >= startDate && referralDate <= endDate;
  });
});

const isInputDisabled = computed(
  () => Number(withdrawStore.currentAmount) < Number(withdrawStore.limitofWithdraw)
);
const copyLink = () => {
  copy(source.value);

  $toast(t('Copied to clipboard'), { hideIn: 3000 });
};

const filteredWithdraw = computed(() => {
  // If no filter date is selected, show all referrals
  if (!dateF.value || dateF.value.length < 2) {
    return withdrawStore.rewards;
  }

  // Extract start and end dates from the array
  const [startDateStr, endDateStr] = dateF.value;
  const startDate = stripTime(new Date(startDateStr));
  const endDate = stripTime(new Date(endDateStr));

  // Filter referrals based on the selected date range
  return withdrawStore.rewards.filter((referral) => {
    const referralDate = stripTime(new Date(referral.creation));
    return referralDate >= startDate && referralDate <= endDate;
  });
});
const isCurrentRateEmpty = computed(() => {
  return (
    withdrawStore.currentRate === "" ||
    (typeof withdrawStore.currentRate === "object" &&
      Object.keys(withdrawStore.currentRate).length === 0)
  );
});
</script>

<template>
  <div class="relative w-full h-full mb-[16px] pt-[24px]">
    <ProfileReferralWidthdrawPaypalSuccess />
    <ProfileReferralWidthdrawPaypalStep2 />
    <ProfileReferralWidthdrawPaypalWithdraw />
    <ProfileReferralWidthdrawCryptoStep2 />
    <ProfileReferralWidthdrawCryptoStep1 />
    <ProfileReferralWidthdrawCryptoSuccess />
    <ProfileReferralWidthdrawBankSuccess />
    <ProfileReferralWidthdrawBankWidthdraw />
    <ProfileReferralWidthdrawBankDetails />
    <ProfileReferralWidthdrawPaymentMethods />
    <div class="flex items-center justify-center flex-col">
      <div class="text-[18px] font-[600] leading-[28px] text-black text-center">
        <div
          class="bg-gradient-to-r from-[#2EBEB3] via-[#7082FF] to-[#F86CD9] text-transparent bg-clip-text"
        >
          {{ $t('Refer a Client, Earn Rewards') }}
        </div>
        <div class="!font-[500]">
          {{ $t('Share your referral link and get a commission on all purchases made by customers you refer') }}
        </div>
      </div>

      <div
        style="box-shadow: 1px 1px 9.8px 0px #6a99d724"
        class="bg-white w-full flex flex-col items-center justify-center my-[16px] py-[32px] rounded-[10px]"
      >
        <div class="text-black text-[18px] font-[500] leading-[28px]">{{$t('How It Works')}}</div>

        <div class="flex items-center justify-between w-full mt-[36px]">
          <div class="flex flex-col items-center justify-center w-full">
            <div>
              <img src="/imgs/step_1_referral.png" class="w-[56px] h-[49px]" alt="" />
            </div>
            <div
              class="text-[12px] font-[500] leading-[16px] text-black text-center mt-[10px]"
            >
              {{$t('Share Your Link')}}<br />
              {{ $t('Send your unique referral link to Clients') }}
            </div>
          </div>

          <div class="flex flex-col items-center justify-center w-full">
            <div>
              <img src="/imgs/step_2_referral.png" class="w-[56px] h-[49px]" alt="" />
            </div>
            <div
              class="text-[12px] font-[500] leading-[16px] whitespace-nowrap text-black text-center mt-[10px]"
            >
              {{$t('Client signed, purchased')}}
              <br />
              {{$t('Your client signed up with your link and made a purchase')}}
            </div>
          </div>

          <div class="flex flex-col items-center justify-center w-full">
            <div>
              <img src="/imgs/step_3_referral.png" class="w-[56px] h-[49px]" alt="" />
            </div>
            <div
              id="refer_clients"
              class="text-[12px] font-[500] leading-[16px] whitespace-nowrap text-black text-center mt-[10px]"
            >
              {{$t('Earn Rewards')}}<br />
             {{$t('Receive rewards from every purchase he completes')}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center flex-col">
      <div
        class="bg-white w-full grid grid-cols-12 gap-4 my-[16px] p-[32px] rounded-[10px]"
      >
        <div
          class="h-[247px] col-span-4 bg-gradient-to-t from-[#FEF5F5] via-[#E8FFFD] to-[#CCE4FF] w-full rounded-[10px] space-y-[30px] ipad-max:space-y-[10px]"
        >
          <div class="flex items-center justify-between w-full p-[16px] relative">
            <div class="text-[20px] font-[600] leading-[20px] text-[#021328]">
              {{ $t('Balance') }}
            </div>

            <div
              class="absolute ipad-max:right-[-50px] ipad-max:top-[-50px] rtl:left-[16px] ltr:right-[16px]"
            >
              <img src="/imgs/balance_img.png" class="w-[140px] h-[120px]" alt="" />
            </div>
          </div>

          <!-- Loading placeholder -->
          <div
            v-if="loadingBlock"
            class="animate-pulse flex flex-col items-center justify-center space-y-[10px]"
          >
            <div class="h-[20px] bg-gray-200 w-[60%] rounded"></div>
            <div class="h-[11px] bg-gray-200 w-[30%] rounded"></div>
            <div class="h-[34px] w-[170px] bg-gray-200 rounded"></div>
            <p class="h-[10px] bg-gray-200 w-3/4 rounded"></p>
            <p class="h-[10px] bg-gray-200 w-3/4 rounded"></p>
          </div>

          <!-- Actual content -->
          <div v-else class="flex flex-col items-center justify-center space-y-[10px]">
            <div class="text-[18px] font-[600] leading-[20px] text-[#021328]">
              $ {{ withdrawStore.currentAmount }}
            </div>
            <div class="text-[11px] leading-[11px] font-[500] text-[#A5A5A5]">
              {{ $t('available') }}
            </div>
            <button
              class="btn-dashboard hover_tamkin w-[170px]"
              :disabled="isInputDisabled || disabledIfPendingRecords"
              @click="openModal('withdraw_paymentmethods', 'referral')"
            >
              {{$t('Withdraw')}}
            </button>

            <p
              class="text-[10px] ipad-max:text-[9px] font-[400] text-[#585B5B] w-3/4 text-center mx-auto"
            >
              {{$t('Please ensure that the amount meets the minimum requirement of')}}
              <span class="!font-[600]">${{ withdrawStore.limitofWithdraw }}</span>
            </p>
            <p
              class="text-[10px] ipad-max:text-[9px] font-[400] text-[#585B5B] text-center mx-auto"
            >
              {{ $t('* Transaction fees are not included in our coverage.') }}
            </p>
          </div>
        </div>

        <div
          class="h-[247px] col-span-8 bg-[#AED1FE24] w-full rounded-[10px] relative z-[10] p-[24px]"
        >
          <!-- Loading placeholder -->
          <div
            v-if="loadingBlock"
            class="animate-pulse flex flex-col space-y-[22px] w-full"
          >
            <div class="h-[20px] bg-gray-200 w-[30%] rounded"></div>
            <div class="h-[19px] bg-gray-200 w-[80%] rounded"></div>
            <div class="h-[54px] bg-gray-200 w-full rounded-[10px]"></div>
            <div class="h-[21px] bg-gray-200 w-[40%] mt-[20px] rounded"></div>
          </div>
          <!-- Actual content -->
          <div v-else class="flex flex-col space-y-[22px] w-full relative z-[20]">
            <div class="text-[20px] font-[600] leading-[20px] text-[#021328]">
              {{$t('Refer Clients')}}
            </div>
            <div class="text-[14px] font-[400] leading-[19px] text-[#021328]">
             {{$t('Refer new clients and earn')}}
              <span class="!font-[700]">
                {{ isCurrentRateEmpty ? 0 : withdrawStore.currentRate }}%</span
              >
             {{$t('for each successful referral who completes the registration process and purchase')}}
            </div>
            <div
              class="mt-[12px] border-[1px] bg-white border-[#D9D9D9] w-full h-[54px] rounded-[10px]
               flex items-center justify-between px-[10px] rtl:flex-row-reverse"
            >
              <div class="text-[14px] font-[400] leading-[21px] ipad-max:text-[10px]">
               {{$t('Referral Link')}}
              </div>
              <div class="flex items-center justify-end  space-x-[12px] rtl:flex-row-reverse">
                <div
                  class="ml-auto text-[12px] 2xl:text-[14px] ipad-max:text-[8px] ipad-max:whitespace-nowrap font-[500] leading-[21px] dark:text-whiteTamkin/70"
                >
                  {{ source }}
                </div>
                <img
                  class="ml-auto w-[18px] h-[18px] cursor-pointer"
                  @click="copyLink"
                  src="/imgs/copy.svg"
                />
              </div>
            </div>
            <div class="mt-[20px] text-[12px] font-[400] leading-[21px]">
              <span class="!font-[600]">{{ withdrawStore.refsCount }}</span> {{$t('users have signed up using your referral link')}}
            </div>
          </div>

          <!-- Background image -->
          <div class="absolute right-0 bottom-0 z-[10]">
            <img src="/imgs/hero_refer.png" class="h-[220px]" alt="" />
          </div>
        </div>
      </div>

      <div
        class="bg-white w-full flex flex-col items-start justify-center my-[16px] p-[32px] rounded-[10px]"
      >
        <div class="flex items-center justify-between ipad-max:space-x-[24px] w-full">
          <div
            class="p-[10px] ipad-max:w-full w-1/4 h-[42px] bg-[#F9F9F9] rounded-[10px] flex items-center justify-center"
          >
            <div
              @click="changeTab('rewards')"
              :class="[currentTab === 'rewards' ? 'bg-[#DDF2F0]' : 'text-[#878787]']"
              class="cursor-pointer w-full h-[32px] rounded-[33px] flex items-center justify-center text-[16px] font-[500] leading-[22px]"
            >
              {{ $t('Withdraw') }}
            </div>
            <div
              @click="changeTab('refs')"
              :class="[currentTab === 'refs' ? 'bg-[#DDF2F0]' : 'text-[#878787]']"
              class="cursor-pointer w-full h-[32px] rounded-[33px] flex items-center justify-center text-[16px] font-[500] leading-[22px]"
            >
              {{ $t('Referrals') }}
            </div>
          </div>

          <div class="w-full ipad-max:w-full lg:w-1/4">
            <VueDatePicker
            direction="ltr"
              :enable-time-picker="false"
              @blur="dateOpen = false"
              @focus="dateOpen = true"
              class="relative"
              :clearable="false"
              disable-year-select
              month-name-format="long"
              :input-class-name="'tamkin_date_input_ref'"
              :dark="colorMode.preference === 'dark'"
              :placeholder="$t('Select Date')"
              v-model="dateF"
              range
              :format="format"
              :position="langStore.direction === 'rtl' ? 'right' : 'left'"
              :auto-position="true"
            >
              <template #action-row="{ closePicker, selectDate }">
                <div
                  class="flex items-center justify-end rtl:space-x-reverse space-x-[16px] w-full"
                >
                  <button
                    @click="
                      () => {
                        dateF = [];
                        closePicker();
                      }
                    "
                    class="btn_bordered_dashboard flex items-center h-[19px] justify-center"
                  >
                    <div>{{$t('Clear')}}</div>
                  </button>
                  <button
                    @click="selectDate"
                    class="btn-dashboard hover_tamkin flex items-center h-[19px] w-2/6 justify-center group"
                  >
                    <div>
                      <svg
                        class="group-hover:fill-tamkin"
                        width="13"
                        height="14"
                        viewBox="0 0 13 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.15274 8.92575L3.08759 6.86047L2.35742 7.59063L5.15274 10.3861L10.8321 4.70673L10.1019
       3.97657L5.15274 8.92575Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div>{{$t('Done')}}</div>
                  </button>
                </div>
              </template>
              <template #input-icon>
                <svg
                  class="ml-auto w-[10px] h-[10px] text-darkGrey dark:text-whiteTamkin"
                  :class="[
                    dateOpen && dateF.length > 0
                      ? 'rotate-90 !text-white '
                      : dateOpen && !dateF
                      ? 'rotate-90'
                      : 'rotate-0',
                  ]"
                  width="11"
                  height="16"
                  viewBox="0 0 11 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.1409 7.60957C10.3911 7.80973 10.3911 8.19027 10.1409
               8.39043L1.44125 15.3501C1.11387 15.612 0.628906 15.3789 0.628906 14.9597L0.628907 
               1.04031C0.628907 0.62106 1.11387 0.387973 1.44125 0.649878L10.1409 7.60957Z"
                    fill="currentColor"
                  />
                </svg>
              </template>
            </VueDatePicker>
          </div>
        </div>

        <div
          class="overflow-x-auto w-full mt-[16px]"
          v-if="currentTab === 'rewards' && !loadingBlock && withdrawStore.rewards"
        >
          <table class="min-w-full bg-white border-b table-fixed border-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="py-3 ltr:text-left rtl:text-right text-[14px] font-[500] leading-[19px] text-black w-1/4 px-4"
                >
                 {{ $t('Transaction ID') }}
                </th>
                <th
                  class="py-3 ltr:text-left rtl:text-right text-[14px] font-[500] leading-[19px] text-black w-1/4 px-4"
                >
                  {{$t('Date')}}
                </th>
                <th
                  class="py-3 ltr:text-left rtl:text-right text-[14px] font-[500] leading-[19px] text-black w-1/4 px-4"
                >
                  {{ $t('Amount') }}
                </th>
                <th
                  class="py-3 ltr:text-left rtl:text-right text-[14px] font-[500] leading-[19px] text-black w-1/4  px-4"
                >
                  {{$t('Withdrawal Method')}}
                </th>
                <th
                  class="py-3 ltr:text-left rtl:text-right text-[14px] font-[500] leading-[19px] text-black w-2/4 m px-4"
                >
                  {{$t('Status')}}
                </th>
              </tr>
            </thead>
            <tbody class="text-gray-700" v-if="filteredWithdraw.length > 0">
              <tr class="border-t border-gray-200" v-for="reward in filteredWithdraw">
                <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">
                  {{ reward.name }}
                </td>
                <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">
                  {{ formatDateOfReward(reward.modified) }}
                </td>
                <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">
                  {{
                    reward.amount +
                    " " +
                    (reward.payment_type === "bank_account"
                      ? 'USD'
                      : reward.payment_type === "crypto"
                      ? reward.symbols
                      : reward.payment_type === "paypal"
                      ? "USD"
                      : "")
                  }}
                </td>
                <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">
                  {{
                    reward.payment_type === "bank_account"
                      ? reward.account_number
                      : reward.payment_type === "crypto"
                      ? reward.crypto_address
                      : reward.email_address
                  }}
                </td>
                <td
                  class="py-4 px-4 flex items-center space-x-2 rtl:space-x-reverse text-[14px] font-[500] leading-[19px] text-black "
                >
                  <span
                    class="h-2 w-2 rounded-full"
                    :class="getStatusStyle(reward.status)"
                  ></span>
                  <span
                    class="text-[14px] leading-[19px] text-[#021328] font-[600] whitespace-nowrap capitalize"
                    >{{ $t(reward.status) }}</span
                  >
                </td>
              </tr>
            </tbody>

            <tbody v-else-if="dateF.length > 0 && filteredWithdraw.length === 0">
              <tr>
                <td colspan="5" class="py-6 text-center">
                  <div class="flex justify-center items-center">
                    <Noresult
                      class="!mt-0"
                      text="No results found for the selected date."
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          class="overflow-x-auto w-full mt-[16px]"
          v-if="currentTab === 'refs' && !loadingBlock"
        >
          <table class="min-w-full bg-white border-b table-fixed border-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="py-3 ltr:text-left rtl:text-right text-[14px] font-[500] leading-[19px] text-black px-4 w-2/6"
                >
                  {{ $t('Referral Name') }}
                </th>
                <th
                  class="py-3 ltr:text-left rtl:text-right text-[14px] font-[500] leading-[19px] text-black px-4 w-2/6"
                >
                  {{ $t('Date') }}
                </th>
                <th
                  class="py-3 ltr:text-left rtl:text-right text-[14px] font-[500] leading-[19px] text-black px-4 w-2/6"
                >
                  {{$t('Rewards Earned')}}
                </th>

                <th
                  class="py-3 ltr:text-left rtl:text-right text-[14px] font-[500] leading-[19px] text-black px-4"
                >
                  {{$t('Status')}}
                </th>
              </tr>
            </thead>
            <tbody class="text-gray-700" v-if="filteredReferrals.length > 0">
              <template v-for="referral in filteredReferrals" :key="referral.name">
                <tr class="border-t border-gray-200">
                  <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">
                    {{ referral.customer_name }}
                  </td>
                  <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">
                    {{ formatDateOfReward(referral.modified) }}
                  </td>
                  <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">
                    {{ referral.total_commission }} AED
                  </td>
                  <td
                    class="py-4 px-4 flex items-center space-x-2 rtl:space-x-reverse text-[14px] font-[500] leading-[19px] text-black"
                  >
                    <span
                      class="h-2 w-2 rounded-full"
                      :class="getStatusStyle(referral.status)"
                    ></span>
                    <span
                      class="text-[14px] leading-[19px] text-[#021328] font-[600]  whitespace-nowrap capitalize"
                      >{{ $t(referral.status) }}</span
                    >
                  </td>
                </tr>
              </template>
            </tbody>
            <tbody v-else-if="filteredReferrals.length === 0 && dateF.length > 0">
              <tr>
                <td colspan="5" class="py-6 text-center">
                  <div class="flex justify-center items-center">
                    <Noresult
                      class="!mt-0"
                      text="No results found for the selected date."
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- NO REWARDS AVAILABLE-->
        <div
          class="flex flex-col items-center justify-center mx-auto mt-[44px]"
          v-if="
            currentTab === 'rewards' &&
            !loadingBlock &&
            withdrawStore.rewards.length === 0 &&
            dateF.length === 0
          "
        >
          <div>
            <img src="/imgs/no_rewards.png" class="w-[42px] h-[42px]" alt="" />
          </div>

          <div class="text-[14px] font-[400] leading-[19px] text-darkGrey mt-[10px]">
            {{$t('Currently, there are no withdrawals available')}}
          </div>

       
        </div>
        <!-- NO REWARDS AVAILABLE-->

        <!-- no Referrals available-->
        <div
          class="flex flex-col items-center justify-center mx-auto mt-[44px]"
          v-if="
            currentTab === 'refs' &&
            !loadingBlock &&
            withdrawStore.Allrefs?.length == 0 &&
            dateF.length === 0
          "
        >
          <div>
            <img src="/imgs/no_refs.png" class="w-[42px] h-[42px]" alt="" />
          </div>

          <div class="text-[14px] font-[400] leading-[19px] text-darkGrey mt-[10px]">
            {{$t('Currently, there are no rewards available')}}
          </div>

      
        </div>

        <!-- no Referrals available-->
        <div class="w-full mt-[16px]" v-if="loadingBlock">
          <div class="bg-white border-b table-fixed border-gray-200">
            <div class="h-[40px] flex items-center px-4 bg-gray-50 animate-pulse">
              <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
              <div class="w-1/4 h-6 bg-gray-300 rounded mx-2"></div>
              <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
              <div class="w-1/4 h-6 bg-gray-300 rounded mx-2"></div>
            </div>
            <div v-for="i in 5" :key="i" class="border-t border-gray-200">
              <div
                class="h-[60px] flex items-center px-4 space-x-4 bg-gray-50 animate-pulse"
              >
                <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
                <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
                <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
                <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.dp__menu {

  @apply rtl:!inset-x-auto;
}

.dp__arrow_bottom{
  @apply rtl:-rotate-45 rtl:bottom-[-6px];
}
.dp__pointer::placeholder {
  @apply !text-darkGrey dark:!text-whiteTamkin opacity-100 !font-[400] font-[Poppins] rtl:pb-1 rtl:!font-[Almarai];
}

.dp__input.dp__input_icon_pad.dp__input_focus {
  @apply !outline-0 !ring-0 !border-[1px] !border-[#585B5B8C];
}
.dp__input {
  @apply rtl:pr-[14px] ltr:pl-[14px] text-[15px];
}
.dp__input_wrap .dp__input_icon {
  @apply ltr:right-[14px] rtl:left-[14px];
  inset-inline-start: auto !important;
}

.dp--arrow-btn-nav:hover {
  @apply text-tamkin;
}
.custom-legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.legend-text h3 {
  margin: 0;
  font-size: 1.2em;
}
.legend-text p {
  margin: 0;
  font-size: 0.9em;
  color: #666;
}
.legend-percentage {
  font-size: 1.2em;
  font-weight: bold;
}
.legend-percentage .positive {
  color: green;
}
.legend-percentage .negative {
  color: red;
}

.dp__arrow_top {
  @apply rtl:top-[-6px] rtl:!rotate-45 rtl:translate-x-[50%];
}
.dp__overlay_cell_active {
  @apply bg-tamkin;
}

.dp__overlay_cell_pad:hover {
  @apply bg-tamkinLight text-darkGrey;
}

.dp__cell_inner.dp__cell_offset.dp__pointer.dp--past.dp__range_start {
  @apply text-white;
}

.dp__outer_menu_wrap {
  @apply z-[10];
}
.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #daf3f1;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #2dada3;
  --dp-primary-color: #2dada3;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #a7a7a7;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #daf3f1;
  --dp-border-color-focus: #daf3f1;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #2dada3;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #daf3f1;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
.no_result_tamkin {
  @apply w-full !mt-[-40px] !justify-start;
}

.dp__outer_menu_wrap {
  @apply w-full;
}
</style>
