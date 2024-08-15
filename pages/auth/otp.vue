<script lang="ts" setup>

import { onMounted } from "vue";
import VOtpInput from "vue3-otp-input";
import { useResendCode, useVerifyCode, useLogin } from '@/composables/useAuth';
import { useRoute, useRouter } from '#vue-router';
import DashboardToastSuccess from "~/components/Dashboard/Toast/Success.vue";


const route = useRoute();
const router = useRouter();
const { resendCode, loading: resendLoading } = useResendCode();

definePageMeta({
  layout: 'auth'
})


const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindModal = ref("");
const disableButton = ref(true);
const verificationCode = ref('');

const handleOnChange = (value: string) => {
  console.log('changed', value)
  disableButton.value = true;
  verificationCode.value = value;
};

const clearInput = () => {
  otpInput.value?.clearInput();
};

const fillInput = (value: string) => {
  console.log(value);
  otpInput.value?.fillInput(value);
};

const countdown = ref(29); // countdown timer in seconds
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

const doResendCode = async () => {
  errMsg.value = null;
  const email = localStorage.getItem('registerd_email');
  try {
    await resendCode(email);
    clearInterval(intervalId);
    showResent.value = false;
    countdown.value = 29;
    successMsg.value = 'resent Successfully!';
    sentSuccessfully.value = true;
    setTimeout(() => {
      sentSuccessfully.value = false;
    }, 2000);
    startCountdown();
  } catch(err) {
    errMsg.value = err;
    console.error(err);
  }



}
const sentSuccessfully = ref(false);
const errMsg = ref(null);
const successMsg = ref(null);
const verifyLoading = ref(false);

const doVerifyCode = async () => {
  errMsg.value = null;
  disableButton.value = false;

  if (!verificationCode.value) {
    console.log('verificationCode.value', verificationCode.value)
    console.error('Verification code is not defined');
    return;
  }

  const user = JSON.parse(localStorage.getItem('registerd_user')) || null;
  const email = localStorage.getItem('registerd_email');
  console.log(user, email);

  if (!email) {
    console.error('Email is not defined');
    return;
  }

  try {
    const { verifyCode, loading } = useVerifyCode({ email, key: verificationCode.value });
    verifyLoading.value = loading;

    if (user && route.query.from != 'forget-password') {
      // const { loginUser } = useLogin(user);

      await verifyCode();
      // await loginUser();
      // successMsg.value = 'Logged in Successfully!';
      // sentSuccessfully.value = true;
      router.push('/auth/success?from=register');
    } else {
      const { checkForgetCode } = useVerifyCode({ email, key: verificationCode.value });

      await checkForgetCode();
      localStorage.setItem('curr_code', verificationCode.value);
      router.push('/auth/new-password');
    }

    sentSuccessfully.value = true;
    setTimeout(() => {
      sentSuccessfully.value = false;
    }, 5000);

  } catch (err) {
    console.error(err);
    errMsg.value = err || 'An error occurred during verification.';
  } finally {
    verifyLoading.value = false;
  }
};


// onMounted(() => {
//   doResendCode();
// });

</script>


<template>
  <DashboardToastSuccess v-if="sentSuccessfully" :hideIn="5000" :message="successMsg"
                         class="top-[8%] !inset-x-[13%]" ></DashboardToastSuccess>

  <div class="max-w-[600px] h-[600px] relative">
    <div class="flex items-center justify-center w-full mt-[16px] ">
      <div class="flex items-start justify-between flex-col w-full lg:p-0 p-3 ">
        <div class="flex-1 lg:mx-[-5px] mx-auto">
          <img @click="$router.push('/')" src="/assets/imgs/logo.png" alt="Tamkin logo" class="cursor-pointer w-[160px] h-[81.28px]" />
        </div>
        <div class="mx-auto text-center   xl:w-auto ipad-max:w-full w-full">
        

          <h1 class=" dark:text-whiteTamkin text-[20px] lg:text-[32px] mb-[3px]" style="line-height: 48px;">{{ $t("verification") }}</h1>

          <h3 class=" dark:text-whiteTamkin/90 text-[16px] lg:text-[20px] font-[500] text-darkGrey  mb-[14px]" style="line-height: 30px;">
            {{ $t("enter_verification_code") }}
          </h3>


          <div class="space-y-[16px]">
            <div class="space-y-[16px] mt-[24px] ">
              <v-otp-input class="flex flex-row items-center justify-center rtl:flex-row-reverse mx-auto space-x-[10px] 
              lg:space-x-[16px] xl:space-x-[22px]"
                ref="otpInput" :input-classes="errMsg ? 'otp_field border-danger' : `otp_field`" :conditionalClass="['border-tamkin', 'two', 'three', 'four']"
                inputType="letter-numeric" :num-inputs="6" v-model:value="bindModal" :should-auto-focus="true"
                :should-focus-order="true" @on-change="handleOnChange" @update:value="verificationCode = $event" />
            </div>

<!--            <h6 v-if="errMsg" class="text-[red] mb-5 mt-5"> {{errMsg}} </h6>-->
          </div>
        </div>
      </div>

      <div class=" absolute top-[500px] ipad-max:top-[500px] xl:top-[570px] space-y-[16px] inset-0  lg:p-0 p-3">
        <button
            :class="{'btn-inactive': !verificationCode || verifyLoading}"
            class="btn-grad-action w-full  !mb-[8px]"
            :disabled="!verificationCode || verifyLoading"
            @click="doVerifyCode">
          <img v-if="verifyLoading" class="inline-block mx-2" src="/assets/imgs/loading.svg"/> {{verifyLoading ? $t('verfiy_processing') : $t('verfiy') }}
        </button>

        <div v-if="route.query.from !== 'forget-password'" class="flex gap-2 items-center  justify-center !mt-[0]">
          <div>
            <p class="flex gap-[5px] text-center font-[500] dark:text-whiteTamkin">
              <span>{{ $t('didnt_receive_code') }}</span>
              <span class="text-error w-[50px]"
                    v-if="!showResent && !resendLoading">{{ formattedCountdown }}</span>
            </p>
          </div>
          <div class="w-[50px]">
            <img class="inline" src="/assets/imgs/loading-green.svg" v-if="resendLoading" />
            <a  @click.prevent="doResendCode" href="#" class="w-[50px] text-tamkin underline "
                v-else-if="!(!showResent && !resendLoading) && !resendLoading">{{ $t('resendCode') }}</a>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>


<style lang="scss">
.border-danger {
  border-color: red !important;
}
</style>