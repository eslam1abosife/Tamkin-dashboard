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
   <div class="container mx-auto">
    <div class="flex items-start justify-center flex-col w-full">
      <div class="mx-auto text-center mt-[24px] xl:w-auto ipad-max:w-full w-full p-3 flex-grow-0">
          <div class="">
              <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="lg:mx-0 mx-auto lg:mb-0 mb-3 w-[160px] h-[81.28px]" />
          </div>
          <h1 class="text-[26px] lg:text-[32px]" style="line-height: 48px;">{{ $t('verification') }}</h1>
          <h3 class="text-[15px] lg:text-[20px] font-[600] text-darkGrey text-center"  style="line-height: 30px;">{{ $t('enter_verification_code') }}</h3>
  
          <div class="space-y-[16px] w-full">
              <div class="space-y-[16px]">
                  <div class="space-y-[16px] mt-[24px] ">
                    <v-otp-input
                    class="flex flex-row items-center justify-center rtl:flex-row-reverse mx-auto w-full max-w-xs space-x-[8px] lg:space-x-[22px]"
                  ref="otpInput"
                  input-classes="otp_field"
                  :conditionalClass="['one', 'two', 'three', 'four']"
                  inputType="letter-numeric"
                  :num-inputs="6"
                  v-model:value="bindModal"
                  :should-auto-focus="true"
                  :should-focus-order="true"
                  @on-change="handleOnChange"
                  @on-complete="handleOnComplete"
                />
                  </div>
  
                  <!-- Register button -->
                  <div class="w-full">
                    <button class="btn-grad-action" :disabled="disableButton" >{{$t('continue')}}</button>
                    <p class="mt-[8px]">{{$t('didnt_receive_code')}} <span href="" class="text-error " v-if="!showResent">{{formattedCountdown}}</span> <a href="" class="text-tamkin underline " v-else>{{$t('resendCode')}}</a></p>                  </div>
              </div>
          </div>
      </div>
  </div>
  
   </div>
  </template>

