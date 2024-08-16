<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useRegister, useGoogle, useLogin } from "@/composables/useAuth";
import { useIncludeWord } from '@/composables/useSharedFunctions';

const { isIncludeWord } = useIncludeWord();

definePageMeta({
  layout: "auth",
});

const state = reactive({
  email: "",
  password: "",
  full_name: "",
  confirm_password: "",
});
const rules = {
  email: { required, email },
  password: { required },
  full_name: { required },
  confirm_password: { required, sameAs: sameAs(computed(() => state.password)) },
};

const v$ = useVuelidate(rules, state);

const isPasswordVisible = ref(false);
const isconfirmPasswordVisible = ref(false)
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const toggleConfirmPasswordVisibility = () => {
  isconfirmPasswordVisible.value = !isconfirmPasswordVisible.value;
};
const passwordFieldType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const ConfirmpasswordFieldType = computed(() => (isconfirmPasswordVisible.value ? 'text' : 'password'));

const { register, loading } = useRegister(state);
const { loginUser } = useLogin(state);
const { loginWithGoogle, loading: googleLoading } = useGoogle();

const errorMsg = ref(null);

const doRegister = async () => {
  errorMsg.value = null;
  try {
    await register((user) => {
      localStorage.setItem("registerd_user", JSON.stringify(user));
      localStorage.setItem("registerd_email", user.email);
    });
  } catch (err) {
    errorMsg.value = err;
  }
}

const doLoginWithGoogle = async () => {
  errorMsg.value = null;
  try {
    await loginWithGoogle();
  } catch (err) {
    errorMsg.value = err;
  }
}


const clearFieldError = (condition) => {
  if (condition) {
    errorMsg.value = null;
  }
}
</script>

<template>
  <div class="max-w-[600px] h-[600px] relative ">
    <div class="flex items-center justify-center w-full mt-[16px] ">
      <div class="flex items-start justify-between flex-col w-full lg:p-0 p-3 ">
        <div class="flex-1 lg:mx-[-5px] mx-auto">
          <img @click="$router.push('/')" src="/assets/imgs/logo.png" alt="Tamkin logo"
            class="cursor-pointer w-[160px] h-[81.28px]" />
        </div>
        <div class="mx-auto text-center   xl:w-auto ipad-max:w-full w-full">


          <h1 class="  text-[20px] lg:text-[32px] mb-[3px] dark:text-whiteTamkin" style="line-height: 48px;">{{
            $t("register") }}</h1>

          <h3 class=" text-[16px] lg:text-[20px] font-[500] text-darkGrey dark:text-whiteTamkin/90"
            style="line-height: 48px;">
            {{ $t("sign_up_to_enjoy_features_of_tamkin") }}

          </h3>

          <p class="text-[red] font-light text-[14px] !mt-[5px] mb-5"
            v-if="isIncludeWord(errorMsg, ['something wrong'])"> {{ errorMsg }} </p>

          <div class="space-y-[23px] w-full mt-[10px]">
            <div class="w-full relative">
              <input type="text" placeholder="{{$t('full name')}}" class="input_floating_label peer"
                v-model="v$.full_name.$model" :class="{
            input_error:
              (v$.full_name.$error && v$.full_name.required.$invalid),
            input_success: !v$.full_name.$error && !v$.full_name.$invalid,
          }" />
              <label for="email" class="floating_label" :class="[
            (v$.full_name.$error && v$.full_name.required.$invalid)
              ? '!text-error'
              : '',
          ]">
                {{ $t("full_name") }}*
              </label>
              <div class="w-full lg:w-4/6 mt-2" v-if="(v$.full_name.$error && v$.full_name.required.$invalid)">
                <p class="error_message">
                  <span v-if="v$.full_name.$error && v$.full_name.required.$invalid">{{ $t("fullname_is_required")
                    }}</span>

                </p>
              </div>

            </div>

            <div class="w-full relative">
              <input @input="clearFieldError(isIncludeWord(errorMsg, ['email']))" type="email"
                placeholder="{{$t('email')}}" id="email" class="input_floating_label peer" v-model="v$.email.$model"
                :class="{
            input_error:
              (v$.email.$error && v$.email.required.$invalid) ||
              (v$.email.$error && v$.email.email.$invalid) ||
              isIncludeWord(errorMsg, ['email']),
            input_success: !v$.email.$error && !v$.email.$invalid && !isIncludeWord(errorMsg, ['email']),
          }" />
              <label for="email" class="floating_label" :class="[
            (v$.email.$error && v$.email.required.$invalid) ||
              (v$.email.$error && v$.email.email.$invalid) ||
              isIncludeWord(errorMsg, ['email'])
              ? '!text-error'
              : '',
          ]">
                {{ $t("email") }}*
              </label>
              <div class="w-full lg:w-4/6 mt-2" v-if="(v$.email.$error && v$.email.required.$invalid) ||
            (v$.email.$error && v$.email.email.$invalid) || isIncludeWord(errorMsg, ['email'])">
                <p class="error_message">
                  <span v-if="v$.email.$error && v$.email.required.$invalid">{{ $t("email_address_is_required")
                    }}</span>
                  <span v-else-if="v$.email.required.$invalid ||
            (v$.email.$error && v$.email.email.$invalid)">{{ $t("please_enter_valid_email_address")
                    }}</span>

                  <span v-else-if="isIncludeWord(errorMsg, ['email'])"> {{ errorMsg }} </span>
                </p>
              </div>
            </div>
            <!-- <h6 v-if="isIncludeWord(errorMsg, ['email'])" class="text-[red] font-light text-[14px] !mt-[5px] text-start"> {{ errorMsg }} </h6> -->

            <div class="w-full relative">
              <input @input="clearFieldError(isIncludeWord(errorMsg, ['password']))" :type="passwordFieldType"
                placeholder="{{$t('password')}}" id="password" class="input_floating_label peer"
                v-model="v$.password.$model" :class="{
            input_error:
              (v$.password.$error && v$.password.required.$invalid) ||
              isIncludeWord(errorMsg, ['password']),
            input_success: !v$.password.$error && !v$.password.$invalid && !isIncludeWord(errorMsg, ['password']),
          }" />
              <label for="password" class="floating_label"
                :class="[(v$.password.$error && v$.password.required.$invalid) || isIncludeWord(errorMsg, ['password']) ? '!text-error' : '',]">
                {{ $t("password") }}*
              </label>


              <div class="w-full lg:w-4/6 mt-2" v-if="(v$.password.$error && v$.password.required.$invalid) ||
            (v$.password.$error && v$.password.required.$invalid) || isIncludeWord(errorMsg, ['password'])">
                <p class="error_message">
                  <span v-if="isIncludeWord(errorMsg, ['password'])">
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
              <!-- <h6 v-if="isIncludeWord(errorMsg, ['password'])"
                class="text-[red] font-light text-[14px] !mt-[5px] text-start">
                Password must be 8+ characters, with an uppercase letter, number, and special symbol
              </h6> -->

              <div class="password_eye" v-else @click="togglePasswordVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="svg_eye">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>


              </div>
              <div class="w-full lg:w-4/6 mt-2" v-if="v$.password.$error && v$.password.required.$invalid">
                <p class="error_message_password">
                  <span v-if="v$.password.$error && v$.password.required.$invalid">{{ $t("password_is_required")
                    }}</span>
                </p>
              </div>
            </div>

            <div class="w-full relative !mb-[18px]">
              <input :type="ConfirmpasswordFieldType" placeholder="{{ $t('confirm_password') }}" id="password_confirm"
                class="input_floating_label peer" v-model="v$.confirm_password.$model" :class="{
            input_error:
              (v$.confirm_password.$error && v$.confirm_password.sameAs.$invalid) || (v$.confirm_password.$error && v$.confirm_password.required.$invalid),
            input_success: !v$.confirm_password.$error && !v$.confirm_password.$invalid,

          }" />
              <label for="password_confirm" class="floating_label" :class="[(v$.confirm_password.$error && v$.confirm_password.required.$invalid) ||
            (v$.confirm_password.$error && v$.confirm_password.sameAs.$invalid) ? '!text-error' : ''
            ,]">{{ $t('confirm_password') }}*</label>

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
              <div class="w-full lg:w-4/6 mt-2" v-if="(v$.confirm_password.$error && v$.confirm_password.sameAs.$invalid) || (v$.confirm_password.$error && v$.confirm_password.required.$invalid)
            ">
                <p class="error_message_password">
                  <span
                    v-if="v$.confirm_password.$error && v$.confirm_password.sameAs.$invalid || v$.confirm_password.$error && v$.confirm_password.required.$invalid">{{
            $t('password_should_be_the_same') }}</span>


                </p>
              </div>
            </div>


          </div>
        </div>
      </div>

    </div>
    <div class="flex flex-col items-center justify-center ">
      <div class="text-[15px] font-[400] leading-5 text-secondary_text dark:text-whiteTamkin">
        <p>{{ $t('by_continuing_i_agree_to_tamkin') }}</p>
      </div>
      <div>
        <a href="https://tamkin.app/terms?_lang=en" target="_blank" class="text-tamkin underline">{{ $t('terms_of_use')
          }}</a> <span class="text-[15px] font-[400] dark:text-whiteTamkin" style="line-height:22.5px">& </span>
        <a href="https://tamkin.app/privacy-policy?_lang=en" target="_blank" class="text-tamkin underline">{{
            $t('privacy_statement') }}</a>

      </div>
    </div>


    <div class="absolute top-[550px] md:top-[550px] lg:top-[570px] xl:top-[560px] space-y-[16px] inset-0  lg:p-0 p-3 ">
      <button @click="doRegister" class="btn-grad-action w-full"
        :class="(v$.email.$invalid || v$.password.$invalid || loading || v$.confirm_password.$invalid) && 'btn-inactive'"
        :disabled="v$.email.$invalid || v$.password.$invalid || loading || v$.confirm_password.$invalid">
        <img v-if="loading" class="inline-block mx-2" src="/assets/imgs/loading.svg" /> {{ !loading ? $t("register") :
            $t("register_processing") }}
      </button>

      <button @click="doLoginWithGoogle" style="line-height: 30px;" class="google_login_button ">
        <template v-if="googleLoading">
          <img class="inline-block mx-2" src="/assets/imgs/loading.svg" /> <span
            class="font-[600] text-[14px] lg:text-[16px]  dark:text-whiteTamkin">{{ $t("signUpWithGoogle") }}</span>
        </template>
        <div v-else class="flex items-center justify-center space-x-[16px] lg:space-x-[8px]">
          <div class="font-[600] text-[12px] text-[14px] lg:text-[16px] dark:text-whiteTamkin">{{ $t("signUpWithGoogle")
            }}
          </div>
          <img src="/assets/imgs/google_login.png" class="w-[19px] h-[19px]" />
        </div>
      </button>
      <p class="text-[red] font-light text-[14px] !mt-[5px] text-center" v-if="isIncludeWord(errorMsg, ['firebase'])">
        {{ errorMsg }} </p>


      <div class="text-center pb-[20px]">
        <span
          class="text-darkGrey text-[16px] font-[400] font-['Poppins'] leading-[27px] ltr:pr-1 rtl:pl-1 dark:text-whiteTamkin">{{
            $t('already_have_an_account') }}</span>
        <a class="text-[16px] font-['Poppins'] underline leading-[27px] text-tamkin cursor-pointer font-[400]"
          @click="$router.push('/auth/login')">{{ $t('loginRegisterPage') }}</a>
      </div>

    </div>
  </div>



</template>


<style lang="scss"></style>