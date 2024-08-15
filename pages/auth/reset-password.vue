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
const { forgetPassword , loading } = useForgetPassword(state);
const errorMsg = ref(null);

const doForgetPassword = async () => {
  errorMsg.value = null;
  localStorage.setItem('registerd_email', state.email);
  try {
    await forgetPassword();
  } catch(error) {
    console.log('errrrrrrrror', error)
    errorMsg.value = error;
  }
}
</script>

<template>
    <div class="max-w-[600px] h-[600px] relative">
        <div class="flex items-center justify-center w-full mt-[16px] ">
            <div class="flex items-start justify-between flex-col w-full lg:p-0 p-3 ">
                <div class="flex-1 lg:mx-[-5px] mx-auto">
                    <img @click="$router.push('/')" src="/assets/imgs/logo.png" alt="Tamkin logo" class="cursor-pointer w-[160px] h-[81.28px]" />
                </div>
                <div class="mx-auto text-center   xl:w-auto ipad-max:w-full w-full">
                 
                    
                    <h1 class="dark:text-whiteTamkin text-[20px] lg:text-[32px] mb-[3px]" style="line-height: 48px;">{{
                        $t("forgot_password_prompt") }}</h1>

                    <h3 class="dark:text-whiteTamkin/90 text-[16px] lg:text-[20px] font-[500] text-darkGrey  mb-[14px]"
                        style="line-height: 30px;">
                        {{ $t("enter_email_for_verification") }}
                    </h3>

                    <div class="space-y-[23px] w-full">


                        <div class="space-y-[23px] w-full ">
                            <div class="w-full relative">
                                <input @input="errorMsg = ''" type="email" placeholder="{{$t('email')}}" id="email"
                                    class="input_floating_label peer" v-model="v$.email.$model" :class="{
                        input_error:
                            (v$.email.$error && v$.email.required.$invalid) ||
                            (v$.email.$error && v$.email.email.$invalid),
                        input_success: !v$.email.$error && !v$.email.$invalid,
                    }" />
                                <label for="email" class="floating_label" :class="[
                        (v$.email.$error && v$.email.required.$invalid) ||
                            (v$.email.$error && v$.email.email.$invalid)
                            ? '!text-error'
                            : '',
                    ]">
                                    {{ $t("email") }}*
                                </label>
                                <div class="w-full lg:w-4/6 mt-2" v-if="(v$.email.$error && v$.email.required.$invalid) ||
                        (v$.email.$error && v$.email.email.$invalid)">
                                    <p class="error_message">
                                        <span v-if="v$.email.$error && v$.email.required.$invalid">{{
                        $t("email_address_is_required") }}</span>
                                        <span v-else-if="v$.email.required.$invalid ||
                        (v$.email.$error && v$.email.email.$invalid)">{{ $t("please_enter_valid_email_address")
                                            }}</span>
                                    </p>
                                </div>
                                <h6 v-if="isIncludeWord(errorMsg, ['confirm', 'not found'])" class="text-[red] font-light text-[12px] !mt-[5px] text-start"> {{errorMsg}} </h6>
                                <h6 v-else class="text-[red] !mt-[15px]"> {{errorMsg}} </h6>

                            </div>





                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="absolute top-[550px] md:top-[550px] lg:top-[570px] xl:top-[570px] space-y-[16px] inset-0  lg:p-0 p-3">
            <button class="btn-grad-action w-full"
                    :class="(v$.email.$invalid || loading) && 'btn-inactive'"
                    @click.prevent="doForgetPassword"
                :disabled="v$.email.$invalid || loading">

              <img v-if="loading" class="inline-block mx-2" src="/assets/imgs/loading.svg"/> {{ !loading ? $t("continue") : $t("continue_processing") }}

            </button>
        </div>
    </div>
</template>


<style lang="scss"></style>