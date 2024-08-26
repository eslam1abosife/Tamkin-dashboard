<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import ethIcon from '/assets/imgs/crypto_methods_icons/1.svg'
const withdrawStore = useWithdrawStore();





const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();

const withdrawloading =ref(false)
const checked = ref('');


const isInputDisabled = computed(() => Number(withdrawStore.currentAmount) === 0);

const amount = ref('');

const formatAmount = (event) => {
  let value = event.target.value.replace(/[^0-9.]/g, ''); // Remove all non-numeric and non-decimal characters

  // Ensure there's only one decimal point
  const decimalParts = value.split('.');
  if (decimalParts.length > 2) {
    value = `${decimalParts[0]}.${decimalParts[1]}`; // Keep only the first decimal
  }

  // Prevent more than 2 digits after the decimal point
  if (decimalParts[1] && decimalParts[1].length > 2) {
    decimalParts[1] = decimalParts[1].slice(0, 2);
    value = `${decimalParts[0]}${decimalParts[1] ? `.${decimalParts[1]}` : ''}`;
  }

  // Limit integer part to 5 digits
  if (decimalParts[0].length > 5) {
    decimalParts[0] = decimalParts[0].slice(0, 5);
    value = `${decimalParts[0]}${decimalParts[1] ? `.${decimalParts[1]}` : ''}`;
  }

  // Format the integer part with commas (only when the user types the decimal point)
  const formattedInteger = parseInt(decimalParts[0] || '0').toLocaleString();
  const formattedValue = `${formattedInteger}${decimalParts[1] ? `.${decimalParts[1]}` : ''}`;

  // Ensure the formatted value does not exceed currentAmount
  const formattedNumericValue = parseFloat(formattedValue.replace(/,/g, ''));
  const currentAmountValue = parseFloat(withdrawStore.currentAmount.replace(/,/g, ''));

  if (formattedNumericValue > currentAmountValue) {
    amount.value = currentAmountValue.toFixed(2);
    withdrawStore.withdrawAmount = currentAmountValue.toFixed(2);
  } else {
    amount.value = value; // Allow the user to see what they are typing without extra formatting
    withdrawStore.withdrawAmount = formattedNumericValue.toFixed(2);
  }
};


// Computed property to check if withdraw button should be disabled
const isWithdrawDisabled = computed(() => {
  // Extract numeric value from the amount, ensuring only valid numbers are parsed
  const numericValue = parseFloat(amount.value.replace(/,/g, ''));

  // Check if the numeric value is less than the minimum limit (e.g., 1)
  return isNaN(numericValue) || numericValue < 1;
});

// Watch amount changes to update withdrawAmount in store
watch(amount, (newValue) => {
  const cleanedValue = newValue.replace('$', '').replace(/,/g, ''); // Remove currency symbol and commas
  withdrawStore.withdrawAmount = parseFloat(cleanedValue).toFixed(2); // Ensure two decimal places
});



const completeWithDraw = async () => {
  if (isWithdrawDisabled.value) return; // Prevent withdrawal if conditions are not met
  withdrawloading.value = true;
  await withdrawStore.withdrawcrypto();
  navigateTo('crypto_step_2_e', 'referral', 'crypto_success_referral');
  withdrawloading.value = false;
  amount.value = '$0.00'
};

const closeAndReset = ()=>{
  withdrawStore.selectedPaymentMethod = ""
  withdrawStore.cryptoDetails.wallet = ""
  withdrawStore.selectedCrypto = ""
  amount.value = "$0.00"
  closeModal('crypto_step_2_e')
}

</script>

<template>
  <div  v-if="isOpen('crypto_step_2_e')"
    class="fixed z-[9999] top-[50px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px]  h-[513px] 
    w-[600px]"
    style="left: 50%; transform: translate(-50%, 0)"
  >

  <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeAndReset">
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



    <div class="mt-[32px]  h-[81px] px-[10px] py-[20px] grid grid-cols-4  rounded-[10px]
     bg-[#F8F9FC] custom-border-tamkin padding-override-1">

<div class="flex items-center justify-start gap-4">
    <div>
        <img :src="`http://tamkin.app/${withdrawStore.selectedCrypto.icon}`" class="w-[39px] h-[39px]" alt="">
    </div>
    <div class="flex items-start justify-start flex-col ">
<div class="text-[#021328] text-[14px] font-[500] ">
{{withdrawStore.selectedCrypto.title}}  
</div>

<div class="text-[#021328] text-[12px]  font-[500] ">
{{withdrawStore.selectedCrypto.network}}
</div>
    </div>
</div>
<div class="flex items-start justify-start flex-col ">
    <div class="text-[#021328] text-[14px] font-[500] w-96 truncate">
        {{withdrawStore.cryptoDetails.wallet}}
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
  placeholder="0"
/>
  </div>


  <div class="text-center text-[14px] font-[600] text-darkGrey">

    Available balance  <span class="!font-[500]">$ {{withdrawStore.currentAmount}}</span>
  </div>
  
  

       <div class="mt-[101px] px-[20px] rtl:mr-auto ltr:ml-auto">
        <button class="btn-dashboard hover_tamkin"  @click="completeWithDraw" :disabled="isWithdrawDisabled || withdrawloading">
          <div class="flex items-center justify-center space-x-[6px]">
            <div :class="withdrawloading ? 'mr-2':''">
           Withdraw
            </div>
       
             <svg  v-if="withdrawloading" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
           </div>
      </button>
      </div>
</div>
  </div>
</template>

<style lang="scss">

</style>
