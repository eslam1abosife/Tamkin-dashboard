<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useGoogle, useLogin } from "@/composables/useAuth";
import { useGetCurrentTeam } from "~/composables/useTeam";
import { useRouter } from "#vue-router";
import DashboardToastSuccess from "~/components/Dashboard/Toast/Success.vue";
import { useIncludeWord } from "@/composables/useSharedFunctions";

const { isIncludeWord } = useIncludeWord();

definePageMeta({
  layout: "auth",
});

const state = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, state);

const isPasswordVisible = ref(false);

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};

const passwordFieldType = computed(() =>
  isPasswordVisible.value ? "text" : "password"
);

const { loginWithGoogle, loading: googleLoading } = useGoogle();
const { loginUser, loading: loginLoading, user } = useLogin(state);

const router = useRouter();
const errorMsg = ref("");
const loginSuccessfully = ref(false);
const profileStore = useProfileStore()
const doLogin = async () => {
  errorMsg.value = null;
  firebaseErrorMsg.value = null;
  try {
    await loginUser();
    loginSuccessfully.value = true;
    setTimeout(() => {
      loginSuccessfully.value = false;
    }, 2000);
    await profileStore.fetchMember()
    await profileStore.getCurrentTeam()

    router.push("/overview");
  } catch (error) {
    const errMsg =
      typeof error === "string" ? error : "There is something wrong";
    if (isIncludeWord(errMsg, ["confirm", "needs"])) {
      localStorage.setItem("registerd_email", state.email);
      router.push("/auth/otp?from=register");
    } else {
      errorMsg.value = error;
    }
  }
};
const firebaseErrorMsg = ref(null);

const doLoginWithGoogle = async () => {
  errorMsg.value = null;
  firebaseErrorMsg.value = null;
  try {
    await loginWithGoogle();
    await profileStore.fetchMember()
    await profileStore.getCurrentTeam()
  } catch (err) {
    firebaseErrorMsg.value = err;
  }
};

const clearFieldError = (condition) => {
  if (condition) {
    errorMsg.value = null;
  }
};
</script>

<template>
  <DashboardToastSuccess v-if="loginSuccessfully" :hideIn="2000" :message="'Login Done Successfully'"
    class="top-[8%] left-0"></DashboardToastSuccess>

  <div class="max-w-[600px] h-[600px] relative">
    <div class="flex items-center justify-center w-full mt-[16px]">
      <div class="flex items-start justify-between flex-col w-full lg:p-0 p-3">
        <div class="flex-1 lg:mx-[-5px] mx-auto">
          <img src="/assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[81.28px]" />
        </div>
        <div class="mx-auto text-center xl:w-auto ipad-max:w-full w-full">
          <h1 class="text-[20px] lg:text-[32px] mb-[3px] dark:text-whiteTamkin" style="line-height: 48px">
            {{ $t("Login") }}
          </h1>

          <h3 class="text-[16px] lg:text-[20px] font-[500] text-darkGrey mb-[14px] dark:text-whiteTamkin/90"
            style="line-height: 48px">
            {{ $t("new_to_tamkin") }}
            <a @click="$router.push('/auth/register')"
              class="cursor-pointer text-tamkin underline dark:brightness-[1] brightness-[0.8]">
              {{$t("Register With Google")}}</a>
          </h3>
          <button :disabled="googleLoading" :class="googleLoading && 'btn-inactive'" @click="doLoginWithGoogle"
            style="line-height: 30px" class="google_login_button">
            <div class="flex items-center justify-center space-x-[16px] lg:space-x-[12px]">
              <template v-if="googleLoading">
                <img class="inline-block mx-2" src="/assets/imgs/loading.svg" />
                <span class="font-[600] text-[14px] lg:text-[16px] dark:text-whiteTamkin">{{ $t("login_with_google")
                  }}</span>
              </template>
              <template v-else>
                <div class="font-[600] text-[14px] lg:text-[16px] dark:text-whiteTamkin">
                  {{ $t("login_with_google") }}
                </div>
                <img src="/assets/imgs/google_login.png" class="w-[19px] h-[19px]" />
              </template>
            </div>
          </button>

          <h6 v-if="firebaseErrorMsg" class="text-[red] font-light text-[14px] !mt-[5px]">
            {{ firebaseErrorMsg }}
          </h6>

          <div class="space-y-[23px] w-full">
            <div class="relative flex items-center mx-auto w-full mt-[23px]">
              <div class="flex-grow border-t border-lightGrey dark:border-darkborder"></div>
              <span class="flex-shrink mx-4 text-secondary_text text-[20px] font-[500] dark:text-whiteTamkin">{{
    $t("or")
  }}</span>
              <div class="flex-grow border-t border-lightGrey dark:border-darkborder"></div>
            </div>

            <h6 v-if="isIncludeWord(errorMsg, ['firebase'])" class="text-[red] font-light text-[14px] !mt-[5px]">
              {{ errorMsg }}
            </h6>

            <h6 v-if="errorMsg &&
    !isIncludeWord(errorMsg, [
      'confirm',
      'not found',
      'firebase',
    ]) &&
    !isIncludeWord(errorMsg, ['Error in Email Or Password'])
    " class="text-[red] font-light text-[14px] !mt-[5px]">
              {{ errorMsg }}
            </h6>

            <div class="space-y-[23px] w-full">
              <div class="w-full relative">
                <input @input="
    clearFieldError(
      isIncludeWord(errorMsg, ['confirm', 'not found'])
    )
    " type="email" placeholder="{{$t('email')}}" id="email" class="input_floating_label peer" v-model="v$.email.$model"
                  :class="{
    input_error:
      (v$.email.$error && v$.email.required.$invalid) ||
      (v$.email.$error && v$.email.email.$invalid) ||
      isIncludeWord(errorMsg, ['confirm', 'not found']),
    error_text:
      (v$.email.$error && v$.email.required.$invalid) ||
      (v$.email.$error && v$.email.email.$invalid) ||
      isIncludeWord(errorMsg, ['confirm', 'not found']),
    input_success:
      !v$.email.$error &&
      !v$.email.$invalid &&
      !isIncludeWord(errorMsg, ['confirm', 'not found']),
  }" />
                <label for="email" class="floating_label" :class="[
    (v$.email.$error && v$.email.required.$invalid) ||
      (v$.email.$error && v$.email.email.$invalid) ||
      isIncludeWord(errorMsg, ['confirm', 'not found'])
      ? '!text-error'
      : '',
  ]">
                  {{ $t("Email") }}*
                </label>
                <div class="w-full lg:w-4/6 mt-2" v-if="(v$.email.$error && v$.email.required.$invalid) ||
    (v$.email.$error && v$.email.email.$invalid) ||
    isIncludeWord(errorMsg, ['confirm', 'not found'])
    ">
                  <p class="error_message">
                    <span v-if="v$.email.$error && v$.email.required.$invalid">{{ $t("email_address_is_required")
                      }}</span>
                    <span v-else-if="v$.email.required.$invalid ||
    (v$.email.$error && v$.email.email.$invalid)
    ">{{ $t("please_enter_valid_email_address") }}</span>

                    <span v-else-if="isIncludeWord(errorMsg, ['confirm', 'not found'])
    ">
                      {{ errorMsg }}
                    </span>
                  </p>
                </div>
              </div>

              <div class="w-full relative">
                <input :type="passwordFieldType" placeholder="{{$t('password')}}" id="password"
                  class="input_floating_label peer" v-model="v$.password.$model" :class="{
    input_error:
      (v$.password.$error && v$.password.required.$invalid) ||

      isIncludeWord(errorMsg, ['Error in Email Or Password']),
    error_text:
      (v$.password.$error && v$.password.$invalid) ||
      (v$.password.$error && v$.password.$invalid) ||
      isIncludeWord(errorMsg, ['Error in Email Or Password']),
    input_success:
      !v$.password.$error &&
      !v$.password.$invalid &&
      !isIncludeWord(errorMsg, ['Error in Email Or Password']),

  }" />
                <label for="password" class="floating_label" :class="[
    (v$.password.$error && v$.password.required.$invalid) ||
      isIncludeWord(errorMsg, ['Error in Email Or Password'])
      ? '!text-error'
      : '',
  ]">
                  {{ $t("Password") }}*
                </label>
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

                <div class="w-full lg:w-4/6 mt-2" v-if="(v$.password.$error && v$.password.required.$invalid) ||
    isIncludeWord(errorMsg, ['Error in Email Or Password'])
    ">
                  <p class="error_message_password">
                    <span v-if="v$.password.$error && v$.password.required.$invalid">{{ $t("password_is_required")
                      }}</span>

                    <span v-else-if="isIncludeWord(errorMsg, ['Error in Email Or Password'])
    ">Password is not correct</span>
                  </p>
                </div>
              </div>

              <!-- Remember me and Forgot password -->
              <div class="flex flex-row items-center justify-between">
                <div>
                  <label for="remember_me"
                    class="h-[22px] dark:text-whiteTamkin text-neutral-400 text-[15px] font-medium font-['Poppins'] leading-snug">
                    <input type="checkbox"
                      class="border-[1px] w-[18px] h-[18px] border-lightGrey dark:border-darkborder bg-transparent rounded-[4px] text-tamkin ring-0 focus:ring-0 focus:outline-none"
                      id="remember_me" />
                    {{ $t("remember_me") }}</label>
                </div>
                <div class="">
                  <a @click="$router.push('/auth/reset-password')"
                    class="cursor-pointer text-[15px] font-[500] underline text-tamkin">{{ $t("Forget password ?") }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute top-[550px] md:top-[550px] lg:top-[570px] xl:top-[570px] space-y-[16px] inset-0 lg:p-0 p-3">
      <button class="btn-grad-action w-full" @click="doLogin()"
        :disabled="v$.email.$invalid || v$.password.$invalid || loginLoading">

    <div class="flex items-center justify-center">
     <div class="mr-4">
      {{$t("login_button")}}
     </div>

      <svg  v-if="loginLoading" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
       <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
       <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
     </svg>
    </div>
      </button>
    </div>
  </div>
</template>

<style lang="scss"></style>
