<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from "@vuelidate/validators";
import { useAuthStore } from '@/stores/auth'; // import the auth store we just created
definePageMeta({
    layout:'auth'
})

const state = reactive({
    email: "",
    password: "",
    password_confirm: "",
    fullName: "",
});
const rules = {
    email: { required, email },
    password: { required },
    password_confirm: { required, sameAs: sameAs(computed(() => state.password)) },
    fullName: { required },
  
};
const v$ = useVuelidate(rules, state);


const registerUser = async () => {

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

  // console.error('reg failed:', error.);
}
};

</script>

<template>
   <div class="container mx-auto">
    <div class="flex items-start justify-center flex-col w-full">
      <div class="mx-auto text-center mt-[24px] xl:w-auto ipad-max:w-full w-full p-3 flex-grow-0">
          <div class="">
              <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="lg:mx-0 mx-auto lg:mb-0 mb-3 w-[160px] h-[81.28px]" />
          </div>
          <h1 class="text-[26px] lg:text-[32px]" style="line-height: 48px;">{{ $t('forgot_password_prompt') }}</h1>
          <h3 class="text-[15px] lg:text-[20px] font-[600] text-darkGrey text-center"  style="line-height: 30px;">{{ $t('enter_email_for_verification') }}</h3>
  
          <div class="space-y-[16px] w-full">
              <div class="space-y-[16px]">
                  <div class="space-y-[16px] mt-[24px] ">
                      <div class=" relative">
                          <input 
                              type="email" 
                              placeholder="{{ $t('email') }}" 
                              id="email"  
                              class="input_floating_label peer" 
                              v-model="v$.email.$model"
                              :class="{
                                  input_error: (v$.email.$error && v$.email.required.$invalid) || (v$.email.$error && v$.email.email.$invalid),
                                  input_success: !v$.email.$error && !v$.email.$invalid,
                              }"
                          />
                          <label for="email" class="floating_label" :class="[
                              (v$.email.$error && v$.email.required.$invalid) || (v$.email.$error && v$.email.email.$invalid) ? '!text-error':''
                          ]">{{ $t('email') }}*</label>
                          <div class="w-full lg:w-4/6 mt-2" v-if="(v$.email.$error && v$.email.required.$invalid) || (v$.email.$error && v$.email.email.$invalid)">
                              <p class="error_message">
                                  <span v-if="v$.email.$error && v$.email.required.$invalid">{{ $t('email_address_is_required') }}</span>
                                  <span v-else-if="v$.email.required.$invalid || (v$.email.$error && v$.email.email.$invalid)">{{ $t('please_enter_valid_email_address') }}</span>
                              </p>
                          </div>
                      </div>
                  </div>
  
                  <!-- Register button -->
                  <div class="w-full">
                      <button class="btn-grad-action w-full" :disabled="v$.email.$invalid || v$.password.$invalid || v$.fullName.$invalid || v$.password_confirm.$invalid">{{ $t('continue') }}</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
  
   </div>
  </template>
