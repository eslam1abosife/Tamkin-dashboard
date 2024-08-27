<script lang="ts" setup>

import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { useChangeAccountPassword } from "@/composables/useProfile";

const { changeAccountPassword,errorFields,loading } = useChangeAccountPassword();
const emit = defineEmits(['closeEditingMode'])
const state = reactive({

  oldpass: "",
  password:"",
  password_confirm:""
});
const rules = {
  oldpass: { required },
  password:{required},
  password_confirm: { required, sameAs: sameAs(computed(() => state.password)) },



};
const isDuplicatePassword = computed(() => {
  return state.oldpass === state.password || state.oldpass === state.password_confirm;
});
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

const {$toast} = useNuxtApp()
const currentMode = inject('currentMode')

const updatePassword = async () => {

  const isValid = await v$.value.$validate();
  if (isValid) {
    await changeAccountPassword({
      password: state.oldpass,
      new_password: state.password,
    });
   await emit('closeEditingMode')
    $toast('Password updated successfully', { hideIn: 3000});
 

  }
  // console.log(errorFields)
  
}


</script>
<template>
  <div class="flex flex-col h-full w-full p-4">
    <!-- Content Section -->
    <div class="flex-grow">
      <div class="text-[16px] font-[500] leading-[24px] text-[#3D3D3D]">
        Change Your Password
      </div>

      <div class="space-y-[23px] w-full flex flex-col items-center mt-[20px]">
        <!-- Old Password Input -->
        <div class="relative w-full">
          <input
            :type="oldPassfieldType"
            placeholder=""
            id="oldpass"
            @input="errorFields = errorFields.filter(error => error.field !== 'old_password')"
            class="input_floating_label peer w-full"
            v-model="v$.oldpass.$model"
            :class="{
              input_error: (v$.oldpass.$error && v$.oldpass.required.$invalid) ||
                          errorFields.some(error => error.field === 'old_password'),
              input_success: !v$.oldpass.$error && !v$.oldpass.$invalid &&
                             !errorFields.some(error => error.field === 'old_password')
            }"
          />
          <label
            for="oldpass"
            class="floating_label"
            :class="[
              (v$.oldpass.$error && v$.oldpass.required.$invalid) ||
              (errorFields.length > 0 && errorFields[0].field === 'old_password') ? '!text-error' : ''
            ]"
          >
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
              <span v-if="v$.oldpass.$error && v$.oldpass.required.$invalid">
                {{ $t("Old Password is required") }}
              </span>
            </p>
          </div>
          <div class="w-full lg:w-4/6" v-if="(errorFields.length > 0 && errorFields[0].field === 'old_password') && !v$.oldpass.$error && !v$.oldpass.required.$invalid">
            <p class="error_message_password">
              {{ errorFields[0].message }}
            </p>
          </div>
        </div>

        <!-- New Password Input -->
        <div class="relative w-full">
          <input
            :type="passwordFieldType"
            placeholder="{{ $t('password') }}"
            id="password"
            @input="errorFields = errorFields.filter(error => error.field !== 'password')"
            class="input_floating_label peer w-full"
            v-model="v$.password.$model"
            :class="{
              input_error: 
                (v$.password.$error && v$.password.required.$invalid) ||
                errorFields.some(error => error.field === 'password') || 
                isDuplicatePassword,
              
              input_success: 
                !v$.password.$error && 
                !v$.password.$invalid &&
                !errorFields.some(error => error.field === 'password') &&
                !isDuplicatePassword
            }"
            
          />
          <label
            for="password"
            class="floating_label"
            :class="[
              (v$.password.$error && v$.password.required.$invalid) ||
              errorFields.some(error => error.field === 'password') || isDuplicatePassword ? '!text-error' : ''
            ]"
          >
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
              <span v-if="v$.password.$error && v$.password.required.$invalid">
                {{ $t("password_is_required") }}
              </span>
            </p>
          </div>
          <div class="w-full lg:w-4/6" v-if="(errorFields.length > 0 && errorFields[0].field === 'password') && !v$.password.$error && !v$.password.required.$invalid">
            <p class="error_message_password">
              <span>{{ errorFields[0].message }}</span>
            </p>
          </div>
          <div class="w-full lg:w-4/6" v-if="isDuplicatePassword">
            <p class="error_message_password">
              <span>  {{ $t('New password cannot be the same as the old password') }}</span>
            </p>
          </div>
   
        </div>

        <!-- Confirm Password Input -->
        <div class="w-full relative">
          <input
            :type="ConfirmpasswordFieldType"
            placeholder="{{ $t('confirm_password') }}"
            id="password_confirm"
            class="input_floating_label peer w-full"
            v-model="v$.password_confirm.$model"
            :class="{
              input_error: (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) || (v$.password_confirm.$error && v$.password_confirm.required.$invalid),
              input_success: !v$.password_confirm.$error && !v$.password_confirm.$invalid
            }"
          />
          <label
            for="password_confirm"
            class="floating_label"
            :class="[
              (v$.password_confirm.$error && v$.password_confirm.required.$invalid) ||
              (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) ? '!text-error' : ''
            ]"
          >
            {{ $t('confirm_password') }}*
          </label>
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
          <div class="w-full lg:w-4/6" v-if="(v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) || (v$.password_confirm.$error && v$.password_confirm.required.$invalid)">
            <p class="error_message_password">
              <span v-if="v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid || v$.password_confirm.$error && v$.password_confirm.required.$invalid">
                {{ $t('password_should_be_the_same') }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-auto ml-auto ">

      <button class="btn-dashboard hover_tamkin w-[200px]" @click="updatePassword" 
      :disabled="loading || v$.$invalid || isDuplicatePassword">

      <div class="flex items-center justify-center">
        <div :class="loading ? 'mr-2' : ''"> Update Password</div>
        <svg
          v-if="loading"
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      </button>
    </div>
  </div>
</template>

