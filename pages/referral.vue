<script lang="ts" setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {  useGetReferralLink,useGetAllReferrals,useGetRewards} from '~/composables/useReferral';
import { useClipboard } from '@vueuse/core'

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
definePageMeta({
    layout:'dashboard'
})
const {getReferralLink} = useGetReferralLink();
const {getAllReferrals} = useGetAllReferrals();
const loadingBlock=ref(true)

import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
const state = reactive({
  email: "",
  Name: "",
  Company: "",
  Subject:'',
  Inquiry:''


});
const rules = {
  email: { required, email },
  Name: { required },
  Company:{},
  Subject:{required},
  Inquiry:{required}


};
const getStatus=(method:number)=> {
      switch (method) {
        case 0:
          return 'draft';
        case 1:
          return 'success';
        case 2:
          return 'rejected';
        
      }
    };
    const getStatusStyle=(method:number)=> {
      switch (method) {
        case 0:
          return 'bg-orange-400';
        case 1:
          return 'bg-tamkin';
        case 2:
          return 'bg-red-600';
        
      }
    };
const v$ = useVuelidate(rules, state);
const currentTab = ref('rewards')
const dateF = ref();
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
const withdrawStore = useWithdrawStore()
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

const referralLink=ref('');
const allReferrals=ref([])

onMounted(async () => {
  if(process.client){
    const user = JSON.parse(localStorage.getItem('user'));
  
    const resultLink =await  getReferralLink();
    const allReferralsResult =await  getAllReferrals(user.agency);


        referralLink.value=resultLink.data;
        allReferrals.value=allReferralsResult.data;
      console.log(allReferrals.value)
      loadingBlock.value=false
  
  }

})

const { data, pending, error } = await useAsyncData('referral', async () => {
  await Promise.all([
    withdrawStore.getAllrewards(),
    withdrawStore.gettotalAmount(),
    withdrawStore.getcurrentLimit(),
    withdrawStore.getcurrentRate(),
  ]);

  return true 
});
const { text, copy, copied, isSupported } = useClipboard({ referralLink })
const formatDateOfReward = (dateof)=>{
  const date = new Date(dateof); // Replace with your date
const formattedDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric'
}).format(date);

return formattedDate
}

const isInputDisabled = computed(() => Number(withdrawStore.currentAmount) === 0);

</script>


<template>
    <div class="relative w-full h-full mb-[16px] pt-[24px]">
      <ProfileReferralWidthdrawPaypalSuccess/>
      <ProfileReferralWidthdrawPaypalStep2/>
      <ProfileReferralWidthdrawPaypalWithdraw/>
      <ProfileReferralWidthdrawCryptoStep2/>
      <ProfileReferralWidthdrawCryptoStep1/>
      <ProfileReferralWidthdrawCryptoSuccess/>
      <ProfileReferralWidthdrawBankSuccess/>
      <ProfileReferralWidthdrawBankWidthdraw/>
      <ProfileReferralWidthdrawBankDetails/>
  <ProfileReferralWidthdrawPaymentMethods/>
     <div class="flex items-center justify-center flex-col" >
        <div class="text-[18px] font-[600] leading-[28px] text-black text-center">
            <div class="bg-gradient-to-r from-[#2EBEB3] via-[#7082FF]  to-[#F86CD9] text-transparent bg-clip-text">
            Refer a Client, Earn Rewards
           </div>
<div class="!font-[500]">
  Share your unique referral link and earn rewards for every Client who joins.
</div>
        </div>


        <div style="box-shadow: 1px 1px 9.8px 0px #6A99D724;
" class="bg-white w-full flex flex-col items-center justify-center my-[16px] py-[32px]  rounded-[10px]">
<div class="text-black text-[18px] font-[500] leading-[28px] ">
    How It Works
</div>

<div class="flex items-center justify-between w-full mt-[36px]">

    <div class="flex flex-col items-center justify-center w-full">
        <div>
            <img src="/imgs/step_1_referral.png" class="w-[56px] h-[49px]" alt="">
        </div>
        <div class="text-[12px] font-[500] leading-[16px] text-black text-center mt-[10px]">
            Share Your Link<br>
Send your unique referral link to Clients
        </div>
    </div>

    <div class="flex flex-col items-center justify-center w-full">
        <div>
            <img src="/imgs/step_2_referral.png" class="w-[56px] h-[49px]" alt="">
        </div>
        <div class="text-[12px] font-[500] leading-[16px] whitespace-nowrap text-black text-center mt-[10px]">
            Client Signs Up
           <br>
           Your Client signs up using your link        </div>
    </div>

    <div class="flex flex-col items-center justify-center w-full">
        <div>
            <img src="/imgs/step_3_referral.png" class="w-[56px] h-[49px]" alt="">
        </div>
        <div class="text-[12px] font-[500] leading-[16px] whitespace-nowrap text-black text-center mt-[10px]">
            Earn Rewards<br>
            Receive your rewards when they join  </div>
    </div>
</div>
        </div>
     </div>

     <div class="flex items-center justify-center flex-col" >
      


        <div class="bg-white w-full grid grid-cols-12 gap-4 my-[16px] p-[32px]  rounded-[10px] ">

<div class="h-[247px] col-span-4 bg-gradient-to-t from-[#FEF5F5] via-[#E8FFFD] to-[#CCE4FF] w-full rounded-[10px] space-y-[40px] ">
<div class="flex items-center justify-between w-full p-[16px] relative">
<div class="text-[20px] font-[600] leading-[20px] text-[#021328]">
  Balance
</div>

<div class="absolute ipad-max:right-[-50px] right-[16px]">
  <img src="/imgs/balance_img.png" class="w-[140px] h-[120px]" alt="">
</div>
</div>
<div class="flex flex-col items-center justify-center space-y-[10px]">
  <div class="text-[18px] font-[600] leading-[20px] text-[#021328]">
    $ {{withdrawStore.currentAmount}}
  </div>
<div class="text-[11px] leading-[11px] font-[500] text-[#A5A5A5]">
  available
</div>
  <button class="btn-dashboard hover_tamkin w-[170px] " :disabled="isInputDisabled" @click="openModal('withdraw_paymentmethods','referral')">Withdraw</button>

  <p class="text-[10px] font-[400] text-[#585B5B]  w-3/4 text-center mx-auto">
    Please ensure that the amount meets the minimum requirement of ${{withdrawStore.limitofWithdraw}}
  </p>
</div>


</div>
<div class="h-[247px] col-span-8 bg-[#AED1FE24] w-full rounded-[10px]  relative p-[24px] ">
  <div class="absolute right-[0]">
    <img src="/imgs/hero_refer.png" class="h-[220px]" alt="">
  </div>
  <div class="flex items-start space-y-[22px] flex-col justify-start w-full relative">
  <div class="text-[20px] font-[600] leading-[20px] text-[#021328]">
    Refer Clients
  </div>
    <div class="text-[14px] font-[400] leading-[19px] text-[#021328">
    Refer new clients and earn <span class="!font-[700]">{{Object.keys(withdrawStore.currentRate).length === 0  ? withdrawStore.currentRate : 0}} %</span> for each successful referral who completes the registration process
  </div>

  <div
class="mt-[12px] border-[1px]  bg-white border-[#D9D9D9] w-full h-[54px] rounded-[10px] flex items-center justify-between  px-[10px]"
>
  <div class="text-[14px] font-[400] leading-[21px] ipad-max:text-[13px]">
    Referral Link
  </div>
<div class="flex items-center justify-end space-x-[12px]">
  <div
  class="ml-auto text-[14px] ipad-max:text-[13px] font-[500] leading-[21px] dark:text-whiteTamkin/70 "
>
{{ referralLink }}
<!-- https://example.com/ref/yourlink -->
</div>

  <img
class="ml-auto cursor-pointer w-[18px] h-[18px]"
@click="copy(referralLink)"
src="/imgs/copy.svg"
/>
</div>



</div>
  </div>
<div class="mt-[20px] text-[12px] font-[400] leading-[21px]">
<span class="!font-[600]">30</span> users have signed up using your referral link
</div>
  
  
  </div>


        </div>


        <div class="bg-white w-full flex flex-col items-start justify-center my-[16px] p-[32px]  rounded-[10px]">
         <div class="flex items-center justify-between ipad-max:space-x-[24px] w-full">

          <div class="p-[10px] ipad-max:w-full w-1/4 h-[42px] bg-[#F9F9F9]  rounded-[10px] flex items-center justify-center">
            <div 
            @click="currentTab = 'rewards'"
            :class="[currentTab === 'rewards' ? 'bg-[#DDF2F0]' : 'text-[#878787]']"
            class="cursor-pointer w-full h-[32px]  rounded-[33px] flex items-center justify-center text-[16px] font-[500] leading-[22px]">
              Withdraw
            </div>
            <div 
@click="currentTab = 'refs'"
:class="[currentTab === 'refs' ? 'bg-[#DDF2F0]' : 'text-[#878787]']"

            class="cursor-pointer w-full h-[32px]  rounded-[33px] flex items-center justify-center text-[16px] font-[500] leading-[22px]">
              My Referrals
            </div>
          </div>

          <div class="w-full ipad-max:w-full lg:w-1/4">
            <VueDatePicker
              :enable-time-picker="false"
              @blur="dateOpen = false"
              @focus="dateOpen = true"
              class="relative"
              :clearable="false"
              disable-year-select
              month-name-format="long"
              :input-class-name="
                dateOpen && dateF ? 'bg_interval_open tamkin' : 'tamkin_date_input_ref'
              "
              :dark="colorMode.preference === 'dark'"
              placeholder="Select Date"
              v-model="dateF"
              :format="format"
              :position="langStore.direction === 'rtl' ? 'right' : 'left'"
              :auto-position="true"
              range
              :max-date="new Date()"
              @update:model-value="handleDate" 
            >
              <template #action-row="{ closePicker, selectDate }">
                <div
                  class="flex items-center justify-end rtl:space-x-reverse space-x-[16px] w-full"
                >
                  <button
                    @click="closePicker"
                    class="btn_bordered_dashboard flex items-center h-[19px] justify-center"
                  >
                    <div>Cancel</div>
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
                    <div>Done</div>
                  </button>
                </div>
              </template>
              <template #input-icon>
                <svg
                  class="ml-auto w-[10px] h-[10px] text-darkGrey dark:text-whiteTamkin"
                  :class="[
                    dateOpen && dateF
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
         


<div class="overflow-x-auto w-full mt-[16px]" v-if="currentTab === 'rewards' && !loadingBlock">
  <table class="min-w-full bg-white border-b table-fixed border-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="py-3 text-left text-[14px] font-[500] leading-[19px] text-black  w-1/4 px-4">Transaction ID</th>
        <th class="py-3 text-left text-[14px] font-[500] leading-[19px] text-black w-1/4 px-4">Date</th>
        <th class="py-3 text-left text-[14px] font-[500] leading-[19px] text-black  w-1/4 px-4">Amount</th>
        <th class="py-3 text-left text-[14px] font-[500] leading-[19px] text-black  w-1/4 px-4 ">Payment Methods</th>
        <th class="py-3 text-left text-[14px] font-[500] leading-[19px] text-black  w-2/4 px-4">Status</th>
      </tr>
    </thead>
    <tbody class="text-gray-700">
    
      <tr class="border-t border-gray-200" v-for="reward in withdrawStore.rewards">
        <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">{{reward.name}}</td>
        <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">{{formatDateOfReward(reward.posting_date)}}</td>
        <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">{{reward.total_commission +' ' + reward.price_list_currency}}</td>
        <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">********26789</td>
        <td class="py-4 px-4 flex items-center space-x-2 text-[14px] font-[500] leading-[19px] text-black">
          <span class="h-2 w-2 rounded-full bg-orange-400"></span>
          <span class="text-[14px] leading-[19px] text-[#021328] font-[600]">{{reward.status}}</span>
        </td>
      </tr>
     
    </tbody>
  </table>
</div>
          
          
<div class="overflow-x-auto w-full mt-[16px]" v-if="currentTab === 'refs'&& !loadingBlock">
  <table class="min-w-full bg-white border-b table-fixed border-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="py-3 text-left text-[14px] font-[500] leading-[19px] text-black px-4 w-2/6 ">Referral Name	</th>
        <th class="py-3 text-left text-[14px] font-[500] leading-[19px] text-black   px-4 w-2/6">Date</th>
        <th class="py-3 text-left text-[14px] font-[500] leading-[19px] text-black  px-4  w-2/6">Rewards Earned
        </th>

        <th class="py-3 text-left text-[14px] font-[500] leading-[19px] text-black   px-4 ">Status</th>
      </tr>
    </thead>
    <tbody class="text-gray-700">
    

      <template v-for="referral in allReferrals" :key="referral.name">
      
      <tr class="border-t border-gray-200">
        <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">{{ referral.name }}</td>
        <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">{{ referral.creation }}</td>
        <td class="py-4 px-4 text-[14px] font-[500] leading-[19px] text-black">{{ referral.amount }} AED</td>
        <td class="py-4 px-4 flex items-center space-x-2 text-[14px] font-[500] leading-[19px] text-black">
          <span class="h-2 w-2 rounded-full " :class="getStatusStyle(referral.docstatus)"></span>
          <span class="text-[14px] leading-[19px] text-[#021328] font-[600]">{{getStatus(referral.docstatus)}}</span>
        </td>
      </tr>
      </template>

    </tbody>
  </table>
</div>



<!-- NO REWARDS AVAILABLE-->
<div class="flex flex-col items-center justify-center mx-auto mt-[44px]" v-if="currentTab === 'rewards' && !loadingBlock && allRewards?.length==0">
  <div>
    <img src="/imgs/no_rewards.png" class="w-[42px] h-[42px]" alt="">
  </div>

  <div class="text-[14px] font-[400] leading-[19px] text-darkGrey mt-[10px]">
    Currently, there are no rewards available
  </div>

  <button class="btn-dashboard hover_tamkin max-w-[151px] mt-[10px]"> Refer Clients</button>
</div>
  <!-- NO REWARDS AVAILABLE-->

  <!-- no Referrals available-->
  <div class="flex flex-col items-center justify-center mx-auto mt-[44px]"  v-if="currentTab === 'refs'&& !loadingBlock && allReferrals?.length==0 ">
    <div>
      <img src="/imgs/no_refs.png" class="w-[42px] h-[42px]" alt="">
    </div>
  
    <div class="text-[14px] font-[400] leading-[19px] text-darkGrey mt-[10px]">
      Currently, there are no referrals available
    </div>
  
    <button class="btn-dashboard hover_tamkin max-w-[151px] mt-[10px]"> Refer Clients</button>
  </div>

  <!-- no Referrals available-->
      <div v-if="loadingBlock"  class="h-[150px] w-full relative">

            <svg   class="absolute top-[70px] left-[50%] z-[999] mx-auto animate-spin  h-5 w-5 text-tamkin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>

                    </div>
     </div>

    </div>
      
      
      
</template>

<style>
.tamkin_date_input_ref {


  @apply rtl:pr-[14px] ltr:pl-[14px] text-[15px] w-full  h-[40px] rounded-[10px] border-[px]
   dark:border-darkborder border-[#D9D9D9] 
  dark:bg-tamkinDarkPrimary dark:text-whiteTamkin
  focus:!outline-0;
}
.dp__pointer::placeholder {
  @apply !text-darkGrey dark:!text-whiteTamkin opacity-100 !font-[400] font-[Poppins];
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

.dp__calendar_item .dp__range_start {
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  @apply rounded-full;
}

.dp__calendar_item .dp__range_between {
  @apply bg-tamkinLight border-0;
}

.dp__calendar_item .dp__range_end {
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  @apply rounded-full;
}

.dp__calendar_item .dp__today {
  @apply rounded-full bg-white dark:bg-tamkinDarkPrimary font-[700] text-darkGrey dark:text-whiteTamkin border-[1px] 
  border-[#616161] dark:border-darkborder;
}
.dp__calendar_item .dp__today.dp__range_end {
  @apply rounded-full bg-white font-[700] !text-white !border-0 dark:bg-tamkinDarkPrimary
  dark:!text-whiteTamkin;
}
.dp__calendar_item .dp__today.dp__range_start {
  @apply rounded-full bg-white font-[700] !text-white dark:bg-tamkinDarkPrimary
  dark:!text-whiteTamkin !border-0;
}

.dp__calendar_item .dp__date_hover_start {
  @apply bg-tamkinLight;
}

.dp__calendar_item .dp__date_hover {
  @apply bg-tamkinLight;
}
.dp__inner_nav {
  @apply text-tamkin;
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

.dp__overlay_cell_pad:hover{

  @apply bg-tamkinLight text-darkGrey;
}


.dp__cell_inner.dp__cell_offset.dp__pointer.dp--past.dp__range_start{
@apply text-white;

}

.dp__outer_menu_wrap {
  @apply z-[10];
}
.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #DAF3F1;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #2DADA3;
  --dp-primary-color: #2DADA3;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #A7A7A7;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #DAF3F1;
  --dp-border-color-focus: #DAF3F1;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #2DADA3;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #DAF3F1;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}

</style>