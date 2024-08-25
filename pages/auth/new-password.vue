<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useSetPasswordToNewMember,useConfirmForgetPassword } from "@/composables/useAuth";
import DashboardToastSuccess from "~/components/Dashboard/Toast/Success.vue";
import { useIncludeWord } from "@/composables/useSharedFunctions";
import { useRoute } from 'vue-router';

const { isIncludeWord } = useIncludeWord();
const route             = useRoute();

definePageMeta({
  layout: "auth",
});

const state = reactive({
  password: "",
  password_confirm: "",
  key: "",
  email: "",
});

const rules = {
  password: { required },
  key: { required },
  password_confirm: {
    required,
    sameAs: sameAs(computed(() => state.password)),
  },
};

const v$ = useVuelidate(rules, state);

const isPasswordVisible = ref(false);
const isconfirmPasswordVisible = ref(false);
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const toggleConfirmPasswordVisibility = () => {
  isconfirmPasswordVisible.value = !isconfirmPasswordVisible.value;
};
const passwordFieldType = computed(() =>
  isPasswordVisible.value ? "text" : "password"
);
const ConfirmpasswordFieldType = computed(() =>
  isconfirmPasswordVisible.value ? "text" : "password"
);

const { confirmForgetPassword, loading } = useConfirmForgetPassword();

const { setPasswordToNewMember } = useSetPasswordToNewMember();
const errMsg = ref(null);

const doChangePassword = async () => {
  errMsg.value = null;
  const email = localStorage.getItem("registerd_email");
  const key = localStorage.getItem("curr_code");

  try {
    console.log('state.email',state.email)
    if (state.email) {
      console.log("if")
      await setPasswordToNewMember({
        email   : state.email,
        password: state.password
      });
    } else {
      console.log("else")
      await confirmForgetPassword({
        email   : email,
        password: state.password,
        key: key,
      });
    }

  } catch (err) {
    errMsg.value = err;
  }
};


onMounted(() => {
  state.email = route.query.email;
});
</script>

<template>
  <div class="max-w-[600px] relative h-[600px]">
    <div class="flex items-center justify-center w-full mt-[16px]">
      <div class="flex items-start justify-between flex-col w-full lg:p-0 p-3">
        <div class="flex-1 lg:mx-[-5px] mx-auto">
          <img @click="$router.push('/')" src="/assets/imgs/logo.png" alt="Tamkin logo"
            class="cursor-pointer w-[160px] h-[81.28px]" />
        </div>

        <div class="mx-auto text-center xl:w-auto ipad-max:w-full">
          <h1 class="dark:text-whiteTamkin text-[20px] lg:text-[32px] mb-[3px]" style="line-height: 48px">
            {{ $t("newPassprom") }}
          </h1>

          <h3 class="dark:text-whiteTamkin/90 text-[16px] lg:text-[20px]font-[500] text-darkGrey mb-[14px]"
            style="line-height: 30px">
            {{ $t("set_new_password") }}
          </h3>

          <div class="space-y-[23px] w-full">

            <div class="space-y-[23px] w-full flex flex-col items-center">
              <div class="w-full relative">
                <input @input="errMsg = null" :type="passwordFieldType" placeholder="{{$t('password')}}" id="password"
                  class="input_floating_label peer" v-model="v$.password.$model" :class="{
            input_error:
              (v$.password.$error && v$.password.required.$invalid) ||
              isIncludeWord(errMsg, ['password', 'Strong']),
            input_success: !v$.password.$error && !v$.password.$invalid && !isIncludeWord(errMsg, ['password', 'Strong']),
          }" />

                <label for="password" class="floating_label" :class="[
            (v$.password.$error && v$.password.required.$invalid) ||
              isIncludeWord(errMsg, ['Password', 'Strong'])
              ? '!text-error'
              : '',
          ]">
                  {{ $t("password") }}*
                </label>

                <div class="w-full" v-if="(v$.password.$error && v$.password.required.$invalid) ||
            (v$.password.$error && v$.password.required.$invalid) || isIncludeWord(errMsg, ['password', 'Strong'])">
                  <p class="error_message">
                    <span v-if="isIncludeWord(errMsg, ['password'])">
                      Password: 8+ chars, uppercase, number, symbol
                    </span>
                  </p>
                </div>

                <div class="password_eye" v-if="!isPasswordVisible" @click="togglePasswordVisibility">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="svg_eye">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                </div>
                <div class="password_eye" v-else @click="togglePasswordVisibility">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="svg_eye">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>

                <div class="w-full lg:w-4/6" v-if="v$.password.$error && v$.password.required.$invalid">
                  <p class="error_message_password">
                    <span v-if="v$.password.$error && v$.password.required.$invalid">{{ $t("password_is_required")
                      }}</span>
                  </p>
                </div>
              </div>

              <div class="w-full relative">
                <input :type="ConfirmpasswordFieldType" placeholder="{{ $t('confirm_password') }}" id="password_confirm"
                  class="input_floating_label peer" v-model="v$.password_confirm.$model" :class="{
            input_error:
              (v$.password_confirm.$error &&
                v$.password_confirm.sameAs.$invalid) ||
              (v$.password_confirm.$error &&
                v$.password_confirm.required.$invalid),
            input_success:
              !v$.password_confirm.$error &&
              !v$.password_confirm.$invalid,
          }" />
                <label for="password_confirm" class="floating_label" :class="[
            (v$.password_confirm.$error &&
              v$.password_confirm.required.$invalid) ||
              (v$.password_confirm.$error &&
                v$.password_confirm.sameAs.$invalid)
              ? '!text-error'
              : '',
          ]">{{ $t("confirm_password") }}*</label>

                <div class="password_eye" v-if="!isconfirmPasswordVisible" @click="toggleConfirmPasswordVisibility">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="svg_eye">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                </div>
                <div class="password_eye" v-else @click="toggleConfirmPasswordVisibility">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="svg_eye">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <div class="w-full lg:w-4/6" v-if="(v$.password_confirm.$error &&
            v$.password_confirm.sameAs.$invalid) ||
            (v$.password_confirm.$error &&
              v$.password_confirm.required.$invalid)
            ">
                  <p class="error_message_password">
                    <span v-if="(v$.password_confirm.$error &&
            v$.password_confirm.sameAs.$invalid) ||
            (v$.password_confirm.$error &&
              v$.password_confirm.required.$invalid)
            ">{{ $t("password_should_be_the_same") }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h6 v-if="errMsg && !isIncludeWord(errMsg, ['password', 'Strong'])"
      class="text-center text-[red] font-light text-[14px] mb-5 mt-5">There is something wrong</h6>

    <div class="absolute top-[550px] md:top-[550px] lg:top-[570px] xl:top-[570px] space-y-[16px] inset-0 lg:p-0 p-3">
      <button class="btn-grad-action w-full" @click="doChangePassword"  :disabled="v$.password.$invalid || v$.password_confirm.$invalid || loading
            ">

            <div class="flex items-center justify-center">
              <div class="mr-4">
               {{$t("updatePassword")}}
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
