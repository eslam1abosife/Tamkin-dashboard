<script lang="ts" setup>

import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
const state = reactive({

  oldpass: "",
  password:"",
  password_confirm:""
});
const rules = {
  oldpass: { required },
  password:{required},
  password_confirm: { required, sameAs: sameAs(computed(() => state.new_password)) },



};
const v$ = useVuelidate(rules, state);
const isPasswordVisible = ref(false);
const isconfirmPasswordVisible = ref(false)
const isOldPassVisible = ref(false)
const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
const toggleOldPassVisible = () => {
  isOldPassVisible.value = !isOldPassVisible.value;
};
const toggleConfirmPasswordVisibility = () => {
  isconfirmPasswordVisible.value = !isconfirmPasswordVisible.value;
};
const passwordFieldType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));
const oldPassfieldType = computed(() => (isOldPassVisible.value ? 'text' : 'password'));
const ConfirmpasswordFieldType = computed(() => (isconfirmPasswordVisible.value ? 'text' : 'password'));
</script>

<template>
<div class="flex flex-col items-start justify-start w-full !mt-[32px]">

    <div class="text-[16px] font-[500] leading-[24px] text-[#3D3D3D]">
        Change Your Password

    </div>

    <div class="space-y-[23px] w-full flex flex-col items-center mt-[20px] ">

      <div class=" relative w-full">
        <input :type="oldPassfieldType" placeholder="" id="oldpass"
               class="input_floating_label peer  w-full" v-model="v$.oldpass.$model" :class="{
    input_error: v$.oldpass.$error && v$.oldpass.required.$invalid,
    input_success: !v$.oldpass.$error && !v$.oldpass.$invalid,
  }"/>
        <label for="oldpass" class="floating_label"
               :class="[(v$.oldpass.$error && v$.oldpass.required.$invalid) ? '!text-error' : '',]">
          {{ $t("Old Password") }}*
        </label>
        <div class="password_eye"
             v-if="!isOldPassVisible" @click="toggleOldPassVisible">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="svg_eye">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
          </svg>
        </div>
        <div class="password_eye" v-else
             @click="toggleOldPassVisible">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="svg_eye">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>


        </div>


        <div class="w-full lg:w-4/6" v-if="v$.oldpass.$error && v$.oldpass.required.$invalid">
          <p class="error_message_password">
            <span v-if="v$.oldpass.$error && v$.oldpass.required.$invalid">{{
                $t("Old Password is required")
              }}</span>
          </p>
        </div>
      </div>

 
      <div class=" relative w-full">
        <input :type="passwordFieldType" placeholder="{{$t('password')}}" id="password"
               class="input_floating_label peer  w-full" v-model="v$.password.$model" :class="{
    input_error: v$.password.$error && v$.password.required.$invalid,
    input_success: !v$.password.$error && !v$.password.$invalid,
  }"/>
        <label for="password" class="floating_label"
               :class="[(v$.password.$error && v$.password.required.$invalid) ? '!text-error' : '',]">
          {{ $t("password") }}*
        </label>
        <div class="password_eye"
             v-if="!isPasswordVisible" @click="togglePasswordVisibility">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="svg_eye">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
          </svg>
        </div>
        <div class="password_eye" v-else
             @click="togglePasswordVisibility">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="svg_eye">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>


        </div>


        <div class="w-full lg:w-4/6" v-if="v$.password.$error && v$.password.required.$invalid">
          <p class="error_message_password">
            <span v-if="v$.password.$error && v$.password.required.$invalid">{{
                $t("password_is_required")
              }}</span>
          </p>
        </div>
      </div>

      <div class="w-full relative">
        <input :type="ConfirmpasswordFieldType" placeholder="{{ $t('confirm_password') }}" id="password_confirm"
               class="input_floating_label peer  w-full" v-model="v$.password_confirm.$model" :class="{
    input_error:
      (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) || (v$.password_confirm.$error && v$.password_confirm.required.$invalid),
    input_success: !v$.password_confirm.$error && !v$.password_confirm.$invalid,

  }"/>
        <label for="password_confirm" class="floating_label" :class="[(v$.password_confirm.$error && v$.password_confirm.required.$invalid) ||
    (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) ? '!text-error' : ''
    ,]">{{ $t('confirm_password') }}*</label>


        <div class="password_eye"
             v-if="!isconfirmPasswordVisible" @click="toggleConfirmPasswordVisibility">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="svg_eye">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/>
          </svg>
        </div>
        <div class="password_eye" v-else
             @click="toggleConfirmPasswordVisibility">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="svg_eye">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>


        </div>
        <div class="w-full lg:w-4/6 " v-if="(v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) || (v$.password_confirm.$error && v$.password_confirm.required.$invalid)
    ">
          <p class="error_message_password">
            <span
                v-if="v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid || v$.password_confirm.$error && v$.password_confirm.required.$invalid">{{
                $t('password_should_be_the_same')
              }}</span>


          </p>
        </div>
      </div>
</div>
      <div class="mt-[52px] ml-auto">
        <button class="btn-dashboard hover_tamkin ml-auto">Update Password</button>
      </div>
</div>
</template>
