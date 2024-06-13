<script lang="ts" setup>

import { onMounted } from "vue";
import VOtpInput from "vue3-otp-input";

definePageMeta({
    layout: 'auth'
})


const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindModal = ref("");
const disableButton = ref(true)
const handleOnComplete = (value: string) => {
  disableButton.value = false
};

const handleOnChange = (value: string) => {
    disableButton.value = true

};

const clearInput = () => {
  otpInput.value?.clearInput();
};

const fillInput = (value: string) => {
  console.log(value);
  otpInput.value?.fillInput(value);
};

const countdown = ref(5); // countdown timer in seconds
const showResent = ref(false);
let intervalId: number | undefined;

const startCountdown = () => {
    intervalId = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            clearInterval(intervalId);
            showResent.value = true;
        }
    }, 1000);
};

// Call the function when the component is mounted
onMounted(() => {
    startCountdown();
});

// Clear the interval when the component is unmounted
onUnmounted(() => {
    clearInterval(intervalId);
});

const formattedCountdown = computed(() => {
    const minutes = Math.floor(countdown.value / 60);
    const seconds = countdown.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

</script>


<template>
    <div class="max-w-[600px] h-[600px] relative">
        <div class="flex items-center justify-center w-full mt-[16px] ">
            <div class="flex items-start justify-between flex-col w-full lg:p-0 p-3 ">
                <div class="flex-1 lg:mx-[-5px] mx-auto">
                    <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[81.28px]" />
                  </div>
                <div class="mx-auto text-center   xl:w-auto ipad-max:w-full w-full">
                  
                  
                  <h1 class="text-[26px] lg:text-[32px] mb-[6px]" style="line-height: 48px;">{{ $t("verification") }}</h1>
            
                  <h3 class="text-[15px] lg:text-[20px] font-[600] text-darkGrey  mb-[23px]" style="line-height: 30px;">
                    {{ $t("enter_verification_code") }}
                  </h3>
              
                
                  <div class="space-y-[16px]">
                    <div class="space-y-[16px] mt-[24px] ">
                      <v-otp-input
                      class="flex flex-row items-center justify-center rtl:flex-row-reverse mx-auto w-full max-w-xs space-x-[8px] lg:space-x-[22px]"
                    ref="otpInput"
                    input-classes="otp_field"
                    :conditionalClass="['border-tamkin', 'two', 'three', 'four']"
                    inputType="letter-numeric"
                    :num-inputs="6"
                    v-model:value="bindModal"
                    :should-auto-focus="true"
                    :should-focus-order="true"
                    @on-change="handleOnChange"
                    @on-complete="handleOnComplete"
                  />
                    </div>
    
                
                </div>
              </div>
           </div>
    
           <div class="absolute top-[500px] lg:top-[570px] space-y-[16px] inset-0  lg:p-0 p-3">
            <button class="btn-grad-action w-full"  :disabled="disableButton">
              {{ $t("verfiy") }}
            </button>

            <p class="mt-[8px] text-center font-[500]">{{$t('didnt_receive_code')}} <span href="" class="text-error " v-if="!showResent">{{formattedCountdown}}</span> <a href="" class="text-tamkin underline " v-else>{{$t('resendCode')}}</a></p>                  </div>

          </div>
     </div>
  </template>


  <style lang="scss">

</style>