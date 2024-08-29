<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
const state = reactive({
  bankName: "",
  acc_holder: "",
  account_number: "",
  iban: "",
  bic: "",
  account_curreny: "",
});
const rules = {
    bankName: { required },
    acc_holder: { required },
    account_number: { required },
    iban: { required },
    bic: { required },
    account_curreny: { required },
};

const v$ = useVuelidate(rules, state);


const withDrawStore = useWithdrawStore()

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();


const checked = ref('');

const amount = ref('');

const formatAmount = (event) => {
  const value = event.target.value.replace(/[^\d]/g, ''); // Remove all non-numeric characters
  const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas as thousand separators
  amount.value = `$${formattedValue || '0.00'}`; // Ensure the format is $xxx,xxx or $0.0 if empty
};

const formatDateOfReward = (dateof)=>{
  const date = new Date(dateof); // Replace with your date
const formattedDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: '2-digit',
  year: 'numeric'
}).format(date);

return formattedDate
}

const openSupport = ()=>{
  if(process.client){
    window.$chatwoot.toggle()
  }
}

const closeModalAndReset = async ()=>{
  withDrawStore.transactionDetails = {}
  withDrawStore.setBankDetails({
          bank_name: '',
          account_holder: '',
          account_number: '',
          iban: '',
          bic: '',
          account_currency: '',
        });
  withDrawStore.withdrawAmount = 0
  withDrawStore.selectedPaymentMethod = ""

  closeModal('success_bank_withdraw')

}
const getStatusStyle=(method:number)=> {
      switch (method) {
        case 'Pending':
          return 'text-orange-400';
        case 'Success':
          return 'text-tamkin';
        case 'Rejected':
          return 'text-red-600';
        
      }
    };
</script>

<template>
    <div
    v-if="isOpen('success_bank_withdraw')"
    class="fixed z-[9999] top-0 2xl:top-[50px] lg:top-[40px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] 
    p-[30px] h-auto 2xl:h-[600px] lg:w-[640px]
  ipad-max:top-[0] w-full"    style="left: 50%; transform: translate(-50%, 0)"
  >
    <!-- Close Button -->
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeModalAndReset"
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
  
    <!-- Modal Content -->
    <div class="mx-auto max-h-[100%] w-full">
      <div class="flex flex-col items-center justify-start w-full">
        <div class="bg-[#F1F1F1] w-[70px] h-[70px] my-[4px] rounded-full flex items-center justify-center">
          <img src="/imgs/success_bank.png" class="w-[60px] h-[50px]" alt="">
        </div>
        <div class=" font-[700] text-[20px] leading-[36px] text-darkGrey">
          {{$t('Congratulations')}}
        </div>
  
        <div class="text-[12px] font-[500] leading-[27px] text-darkGrey text-center">
          {{ $t('Your withdrawal request will be taken into consideration and your funds will be transferred to your account') }}
        </div>
  
        <div class="flex items-center justify-between w-full">
          <div class="text-[14px] font-[500] text-[#021328]">
            {{formatDateOfReward(withDrawStore.transactionDetails.creation)}}

          </div>
  
          <div class="text-[14px] font-[500] text-[#021328]">
            {{withDrawStore.transactionDetails.amount}} $
          </div>
        </div>
  
        <div class="flex items-center justify-between w-full mt-[4px]">
          <div class="text-[12px] font-[500] text-darkGrey">
            {{ $t('Trans ID') }}: {{withDrawStore.transactionDetails.name}}
          </div>
  
          <div class="text-[14px] font-[500] " :class="getStatusStyle(withDrawStore.transactionDetails.status)">
            {{$t(withDrawStore.transactionDetails.status)}}
          </div>
        </div>
  
        <div class="flex items-center justify-between w-full mt-[24px]">
          <div class="text-[14px] font-[500] text-[#021328]">
            {{ $t('Account details') }}
          </div>
        </div>
  
        <div class="flex items-center justify-between w-full mt-[8px]">
          <div class="text-[12px] font-[500] text-darkGrey">
            {{$t('Bank')}}
          </div>
  
          <div class="text-[14px] font-[500] text-[#021328]">
            {{withDrawStore.transactionDetails.bank_name}}

          </div>
        </div>
  
        <div class="flex items-center justify-between w-full mt-[8px]">
          <div class="text-[12px] font-[500] text-darkGrey">
            {{$t('Account holder')}}
          </div>
  
          <div class="text-[14px] font-[500] text-[#021328]">
            {{withDrawStore.transactionDetails.account_holder}}

          </div>
        </div>
  
        <div class="flex items-center justify-between w-full mt-[8px]">
          <div class="text-[12px] font-[500] text-darkGrey">
            {{ $t('IBAN') }}
          </div>
  
          <div class="text-[14px] font-[500] text-[#021328]">
            {{withDrawStore.transactionDetails.iban}}

          </div>
        </div>
  
        <div class="flex items-center justify-between w-full mt-[8px]">
          <div class="text-[12px] font-[500] text-darkGrey">
            {{ $t('Swift') }}
          </div>
  
          <div class="text-[14px] font-[500] text-[#021328]">
            {{withDrawStore.transactionDetails.bic}}

          </div>
        </div>
      </div>
  
      <div
        class="h-auto py-[14px] px-[20px] w-full bg-gradient-to-r from-[#11D5C6]/20 to-[#82ABE2]/20 rounded-[10px] mt-[10px] flex flex-col sm:flex-row items-center justify-between"
      >
        <div class="flex flex-col items-start justify-start">
          <div class="text-[14px] font-[500] text-[#021328]">
            {{ $t('Need help?') }}
          </div>
          <div class="text-[12px] font-[500] w-full sm:w-3/4 leading-[27px] text-darkGrey">
           {{ $t('If there is a problem with the transactions, make sure to contact your support') }}
          </div>
        </div>
  
        <div class="mt-[10px] sm:mt-0 cursor-pointer" @click="openSupport">
          <img src="/imgs/support.png" class="w-[120px] h-[37px]" alt="">
        </div>
      </div>
  
      <div class="my-[16px] px-[20px] rtl:mr-auto ltr:ml-auto">
        <button class="btn-dashboard hover_tamkin" @click="closeModalAndReset">
          {{$t('Done')}}
        </button>
      </div>
    </div>
  </div>
  
</template>

<style lang="scss">

</style>
