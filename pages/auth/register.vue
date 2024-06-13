<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
definePageMeta({
  layout: "auth",
});
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "@/stores/auth"; // import the auth store we just created

const authStore = useAuthStore();
const { loading } = storeToRefs(authStore); // make authenticated state reactive with storeToRefs

const state = reactive({
  email: "",
  password: "",
  fullName: "",
  password_confirm: "",


});
const rules = {
  email: { required, email },
  password: { required },
  fullName: { required },
  password_confirm: { required, sameAs: sameAs(computed(() => state.password)) },


};

const v$ = useVuelidate(rules, state);

const loginUser = async () => {
  try {
    //   await authenticateUser({email:state.email,password:state.password}); // call authenticateUser and pass the user object
    // // redirect to homepage if user is authenticated
    // if (authenticated) {
    //   router.push('/admin/dashboard');
    //   // state.email = ""
    //   // state.password = ""
    // }
  } catch (error) {
    // Handle login errors
    // console.log(error)
    // console.error('Login failed:', error.);
  }
};
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



</script>

<template>
  <div class="max-w-[600px] h-[600px] relative">
    <div class="flex items-center justify-center w-full mt-[16px] ">
      <div class="flex items-start justify-between flex-col w-full lg:p-0 p-3 ">
        <div class="flex-1 lg:mx-[-5px] mx-auto">
          <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[81.28px]" />
        </div>
        <div class="mx-auto text-center   xl:w-auto ipad-max:w-full w-full">

          <h1 class="text-[26px] lg:text-[32px] mb-[6px]" style="line-height: 48px;">{{ $t("register") }}</h1>

          <h3 class="text-[15px] lg:text-[20px] font-[600] text-darkGrey  mb-[23px]" style="line-height: 48px;">
            {{ $t("sign_up_to_enjoy_features_of_tamkin") }}

          </h3>



          <div class="space-y-[23px] w-full ">
            <div class="w-full relative">
              <input type="text" placeholder="{{$t('full name')}}" id="email" class="input_floating_label peer"
                v-model="v$.fullName.$model" :class="{
            input_error:
              (v$.fullName.$error && v$.fullName.required.$invalid),
            input_success: !v$.fullName.$error && !v$.fullName.$invalid,
          }" />
              <label for="email" class="floating_label" :class="[
            (v$.fullName.$error && v$.fullName.required.$invalid)
              ? '!text-error'
              : '',
          ]">
                {{ $t("full_name") }}*
              </label>
              <div class="w-full lg:w-4/6 mt-2" v-if="(v$.fullName.$error && v$.fullName.required.$invalid)">
                <p class="error_message">
                  <span v-if="v$.fullName.$error && v$.fullName.required.$invalid">{{ $t("email_address_is_required")
                    }}</span>

                </p>
              </div>
            </div>
            <div class="w-full relative">
              <input type="email" placeholder="{{$t('email')}}" id="email" class="input_floating_label peer"
                v-model="v$.email.$model" :class="{
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
                  <span v-if="v$.email.$error && v$.email.required.$invalid">{{ $t("email_address_is_required")
                    }}</span>
                  <span v-else-if="v$.email.required.$invalid ||
            (v$.email.$error && v$.email.email.$invalid)">{{ $t("please_enter_valid_email_address")
                    }}</span>
                </p>
              </div>
            </div>

            <div class="w-full relative">
              <input :type="passwordFieldType" placeholder="{{$t('password')}}" id="password"
                class="input_floating_label peer" v-model="v$.password.$model" :class="{
            input_error: v$.password.$error && v$.password.required.$invalid,
            input_success: !v$.password.$error && !v$.password.$invalid,
          }" />
              <label for="password" class="floating_label"
                :class="[(v$.password.$error && v$.password.required.$invalid) ? '!text-error' : '',]">
                {{ $t("password") }}*
              </label>

              <div class="absolute bottom-[10px] ltr:right-[14px] rtl:left-[14px] cursor-pointer hover:opacty-80"
                v-if="!isPasswordVisible" @click="togglePasswordVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>


              </div>
              <div class="absolute bottom-[12px] ltr:right-[14px] rtl:left-[14px] cursor-pointer hover:opacty-80" v-else
                @click="togglePasswordVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>


              </div>
              <div class="w-full lg:w-4/6 mt-2" v-if="v$.password.$error && v$.password.required.$invalid">
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
              (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) || (v$.password_confirm.$error && v$.password_confirm.required.$invalid),
            input_success: !v$.password_confirm.$error && !v$.password_confirm.$invalid,

          }" />
              <label for="password_confirm" class="floating_label" :class="[(v$.password_confirm.$error && v$.password_confirm.required.$invalid) ||
            (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) ? '!text-error' : ''
            ,]">{{ $t('confirm_password') }}*</label>

              <div class="absolute bottom-[12px] ltr:right-[14px] rtl:left-[14px] cursor-pointer hover:opacty-80"
                v-if="!isconfirmPasswordVisible" @click="toggleConfirmPasswordVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>


              </div>
              <div class="absolute bottom-[12px] ltr:right-[14px] rtl:left-[14px] cursor-pointer hover:opacty-80" v-else
                @click="toggleConfirmPasswordVisibility">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>


              </div>
              <div class="w-full lg:w-4/6 mt-2" v-if="(v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) || (v$.password_confirm.$error && v$.password_confirm.required.$invalid)
            ">
                <p class="error_message_password">
                  <span
                    v-if="v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid || v$.password_confirm.$error && v$.password_confirm.required.$invalid">{{
            $t('password_should_be_the_same') }}</span>


                </p>
              </div>
            </div>


          </div>
        </div>
      </div>

    </div>
    <div class="flex flex-col items-center justify-center mt-[32px]">
      <div class="text-[15px] font-[400] leading-5 text-secondary_text">
        <p>{{ $t('by_continuing_i_agree_to_tamkin') }}</p>
      </div>
      <div>
        <a href="" class="text-tamkin underline">{{ $t('terms_of_use') }}</a> &
        <a href="" class="text-tamkin underline">{{ $t('privacy_statement') }}</a>

      </div>
    </div>

    <div class="absolute top-[550px] md:top-[550px] lg:top-[570px] xl:top-[570px] space-y-[16px] inset-0  lg:p-0 p-3">
      <button class="btn-grad-action w-full" @click="loginUser" v-if="!loading"
        :disabled="v$.email.$invalid || v$.password.$invalid || loading">
        {{ $t("register") }}
      </button>

      <button style="line-height: 30px;" class="google_login_button ">
        <div class="flex items-center justify-center space-x-[16px] lg:space-x-[8px]">
          <div class="font-[600] text-[16px] lg:text-[20px]">{{ $t("signUpWithGoogle") }}</div>
          <img src="/assets/imgs/google_login.png" alt="" class="w-[23px] h-[23px]" />
        </div>
      </button>
    </div>
  </div>



</template>


<style lang="scss"></style>