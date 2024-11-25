<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useForgetPassword } from '@/composables/useAuth';
import { useIncludeWord } from '@/composables/useSharedFunctions';

const { isIncludeWord } = useIncludeWord();

definePageMeta({
    layout: "auth",
});
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
// import { useAuthStore } from "@/stores/auth"; // import the auth store we just created

// const authStore = useAuthStore();
// const { loading } = storeToRefs(authStore); // make authenticated state reactive with storeToRefs


const state = reactive({
    email: "",
});
const rules = {
    email: { required, email },
};
const v$ = useVuelidate(rules, state);
const { forgetPassword, loading } = useForgetPassword(state);
const errorMsg = ref(null);

const doForgetPassword = async () => {
    errorMsg.value = null;
    localStorage.setItem('registerd_email', state.email);
    useCookie('can_view').value = 'otp';

    try {
        await forgetPassword();
    } catch (error) {
        console.log('errrrrrrrror', error)
        errorMsg.value = error;
        useCookie('can_view').value =  false;

    }
}
</script>

<template>
    <div class="max-w-[600px] h-[600px] relative">
        <div class="flex items-center justify-center w-full mt-[16px] ">
            <div class="flex items-start justify-between flex-col w-full lg:p-0 p-3 ">
                <div class="flex-1 lg:mx-[-5px] mx-auto">
                    <img @click="$router.push(localePath('/auth/login'))" src="/assets/imgs/logo.png" alt="Tamkin logo"
                        class="cursor-pointer w-[160px] h-[81.28px]" />
                </div>
                <div class="mx-auto text-center   xl:w-auto ipad-max:w-full w-full">


                    <h1 class="dark:text-whiteTamkin text-[20px] lg:text-[32px] mb-[3px]" style="line-height: 48px;">{{
                        $t("Forgot Password") }}</h1>

                    <h3 class="dark:text-whiteTamkin/90 text-[16px] lg:text-[20px] font-[500] text-darkGrey  mb-[14px]"
                        style="line-height: 30px;">
                        {{ $t("Enter your email for the verification we will send 4 digits code to your email") }}
                    </h3>

                    <div class="space-y-[23px] w-full">


                        <div class="space-y-[23px] w-full ">
                            <div class="w-full relative">
                                <input @input="errorMsg = ''" type="email" placeholder="{{$t('email')}}" id="email"
                                    class="input_floating_label peer" v-model="v$.email.$model" :class="{
                        input_error:
                            (v$.email.$error && v$.email.required.$invalid) ||
                            (v$.email.$error && v$.email.email.$invalid) ||
                            isIncludeWord(errorMsg, ['confirm', 'not found']),
                        input_success: !v$.email.$error && !v$.email.$invalid && !isIncludeWord(errorMsg, ['confirm', 'not found']),
                    }" />
                                <label for="email" class="floating_label" :class="[
                        (v$.email.$error && v$.email.required.$invalid) ||
                            (v$.email.$error && v$.email.email.$invalid) || isIncludeWord(errorMsg, ['confirm', 'not found'])
                            ? '!text-error'
                            : '',
                    ]">
                                    {{ $t("Email*") }}
                                </label>
                                <div class="w-full lg:w-4/6 mt-2"
                                    v-if="(v$.email.$error && v$.email.required.$invalid) ||
                        (v$.email.$error && v$.email.email.$invalid) || isIncludeWord(errorMsg, ['confirm', 'not found'])">
                                    <p class="error_message">
                                        <span v-if="v$.email.$error && v$.email.required.$invalid">{{
                        $t("The email address is required") }}</span>
                                        <span v-else-if="v$.email.required.$invalid ||
                        (v$.email.$error && v$.email.email.$invalid)">{{ $t("Please enter a valid email address")
                                            }}</span>

                                        <span v-else-if="isIncludeWord(errorMsg, ['confirm', 'not found'])">
                                            {{ $t(errorMsg)
                                            }}</span>


                                    </p>
                                </div>
                                <h6 v-if="errorMsg && !isIncludeWord(errorMsg, ['confirm', 'not found'])"
                                    class="text-[red] font-light text-[14px] !mt-[15px]"> {{ $t(errorMsg) }} </h6>

                            </div>





                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="absolute top-[550px] md:top-[550px] lg:top-[570px] xl:top-[570px] space-y-[16px] inset-0  lg:p-0 p-3">
            <button class="btn-grad-action w-full" :class="(v$.email.$invalid || loading)"
                @click.prevent="doForgetPassword" :disabled="v$.email.$invalid || loading">

           
                        <div class="flex items-center justify-center">
                            <div class="rtl:ml-4 ltr:mr-4">
                             {{$t("Continue")}}
                            </div>
                       
                             <svg  v-if="loading" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                           </div>
            </button>
        </div>
    </div>
</template>


<style lang="scss"></style>