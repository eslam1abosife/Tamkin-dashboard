<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
const withdrawStore = useWithdrawStore()
const rules = {
    paypalEmail: { required,email },
   
};

const v$ = useVuelidate(rules, withdrawStore.paypal);
const isLoading = ref(false)



const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();


const checked = ref('');

const goToStep2 = ()=>{
  isLoading.value = true
 setTimeout(()=>{
  navigateTo('paypal_withdraw_step1','referral','paypal_withdraw_step2')
  isLoading.value = false
  v$.value.$reset()

 },1500)

}
const closeAndreseStt = ()=>{

  closeModal('paypal_withdraw_step1')
  withdrawStore.transactionDetails = {}
  withdrawStore.paypal.paypalEmail = ""
  withdrawStore.withdrawAmount = 0
  withdrawStore.selectedPaymentMethod = ""
}
</script>

<template>
  <div  v-if="isOpen('paypal_withdraw_step1')"
    class="fixed z-[9999] top-[100px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px]  h-[400px] 
    w-[600px] max-h-[80vh]"
    style="left: 50%; transform: translate(-50%, 0)"
  >
  <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeAndreseStt">
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
    {{$t('Withdraw Money')}}
</h1>

<p class="mt-[16px] rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin  text-[14px] leading-[24px]">
    {{$t('Enter your PayPal email address')}}</p>


    <div class="space-y-[26px] w-full mt-[32px]  pb-[30px]">
        <div class="w-full relative">
          <input type="text" placeholder="" id="paypalEmail" class="input_floating_label  peer w-full  "
            v-model="v$.paypalEmail.$model" :class="{
        input_error:
          (v$.paypalEmail.$error && v$.paypalEmail.required.$invalid) ||(v$.paypalEmail.$error && v$.paypalEmail.email.$invalid),
        input_success: !v$.paypalEmail.$error && !v$.paypalEmail.$invalid,
      }" />
          <label for="paypalEmail" class="floating_label " :class="[
        (v$.paypalEmail.$error && v$.paypalEmail.required.$invalid) ||(v$.paypalEmail.$error && v$.paypalEmail.email.$invalid)
          ? '!text-error'
          : '',
      ]">
            {{ $t("Paypal Email Address*") }}
          </label>
          <div class="w-full lg:w-4/6 " v-if="(v$.paypalEmail.$error && v$.paypalEmail.required.$invalid) ||(v$.paypalEmail.$error && v$.paypalEmail.email.$invalid)">
            <p class="error_message">
              <span v-if="v$.paypalEmail.$error && v$.paypalEmail.required.$invalid">{{ $t("Paypal Email is Invalid")
                }}</span>
                <span v-if="v$.paypalEmail.$error && v$.paypalEmail.email.$invalid">{{ $t("Paypal Email is Invalid")
                }}</span>
            </p>
          </div>
        </div>

  
        <p class="w-3/4 mt-[16px] rtl:text-right ltr:text-left font-[500] text-darkGrey dark:text-whiteTamkin  text-[12px] leading-[24px]">
            {{ $t('Ensure that you enter the correct PayPal email address. Incorrect details may result in a failed transaction') }}

 
    
</p>
      </div>
  
      

       <div class="mt-[38px] px-[20px] rtl:mr-auto ltr:ml-auto" >
        <button :disabled="v$.$invalid || isLoading" class="btn-dashboard hover_tamkin"  @click="goToStep2">
          <div class="flex items-center justify-center space-x-[6px]">
            <div :class="isLoading ? 'rtl:ml-2 ltr:mr-2':''">
           {{ $t('Continue') }}
            </div>
       
             <svg  v-if="isLoading" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
