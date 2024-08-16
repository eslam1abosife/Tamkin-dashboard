<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import ethIcon from '/assets/imgs/crypto_methods_icons/1.svg'

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

</script>

<template>
  <div  v-if="isOpen('crypto_step_2_e')"
    class="fixed z-[9999] top-[50px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px]  h-[513px] 
    w-[600px]"
    style="left: 50%; transform: translate(-50%, 0)"
  >

  <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('crypto_step_2_e')">
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
<div class=" mx-auto max-h-[100%] w-full">
  <h1 class="rtl:text-right ltr:text-left font-[700] text-darkGrey  dark:text-whiteTamkin text-[18px] leading-[36px]">
    Withdraw Money
</h1>



    <div class="mt-[32px] w-full h-[81px] px-[10px] py-[20px] flex items-center justify-start space-x-[100px] rounded-[10px]
     bg-[#F8F9FC] custom-border-tamkin padding-override-1">

<div class="flex items-center justify-start gap-4">
    <div>
        <img :src="ethIcon" class="w-[39px] h-[39px]" alt="">
    </div>
    <div class="flex items-start justify-start flex-col">
<div class="text-[#021328] text-[14px] font-[500] ">
Tamkin  
</div>

<div class="text-[#021328] text-[12px]  font-[500] ">
KA02928765333
</div>
    </div>
</div>
<div class="flex items-start justify-start flex-col">
    <div class="text-[#021328] text-[14px] font-[500] ">
        0x2d5jdska9erptjfew7364432
    </div>
    

        </div>
</div>


<div class="text-[14px] font-[600] text-[#021328] mt-[14px]">
    Amount
</div>

<div class="mt-2 text-[13px] font-[500] text-darkGrey leading-[15px]">
    How much would you like to withdraw ?
</div>

  

<div class="mt-[44px] mx-auto text-center relative">
    <input
      type="text"
      v-model="amount"
      @input="formatAmount"
      class="mx-auto focus:outline-none focus:border-0 focus:ring-0 text-[#021328] font-[600] border-0 text-center"
      placeholder="$0.00"
    />
  </div>


  <div class="text-center text-[14px] font-[600] text-darkGrey">

    Available balance  <span class="!font-[500]">$ 849</span>
  </div>
  
  

       <div class="mt-[101px] px-[20px] rtl:mr-auto ltr:ml-auto">
        <button class="btn-dashboard hover_tamkin"  @click="navigateTo('crypto_step_2_e','referral','crypto_success_referral')">
         Withdraw
      </button>
      </div>
</div>
  </div>
</template>

<style lang="scss">

</style>
