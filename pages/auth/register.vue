

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

    <div class="">
    <div class="">
        <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[82px] lg:mx-0 mx-auto lg:mb-0 mb-6 ">
    
    </div>
        <div class="pt-[6px] max-w-[580px] w-full text-center flex flex-col items-center justify-evenly mx-auto">
            <h1 class="text-[26px] lg:text-[32px] font-medium ">{{ $t('sign_up') }}</h1>
           
            <h3 class="text-[15px] lg:text-[20px] font-[600] text-secondary_text">{{ $t('sign_up_to_enjoy_features_of_tamkin') }}</h3>
    
    
           <div class="space-y-[24px] mt-[24px] w-full">
            <div class="w-full relative">
                <input type="text" placeholder="{{ $t('full_name') }}" id="fullname"  class="input_floating_label peer border"
                v-model="v$.fullName.$model"
                :class="{
                    input_error:
                    (v$.fullName.$error && v$.fullName.required.$invalid) ,
                    input_success: !v$.fullName.$error && !v$.fullName.$invalid,
                }"
                />
                <label for="fullname" class="floating_label" 
                
                :class="[     (v$.fullName.$error && v$.fullName.required.$invalid)? '!text-error':''
            ,]">{{ $t('full_name') }}*</label>
                <div
                class="w-full lg:w-4/6 mt-2"
                v-if="
                  (v$.fullName.$error && v$.fullName.required.$invalid) 
                "
              >
                <p class="error_message">
                  <span v-if="v$.fullName.$error && v$.fullName.required.$invalid"
                    >{{ $t('full_name_is_required') }}</span
                  >
               
                </p>
              </div>
            </div>
            <div class="w-full relative">
                <input type="email" placeholder="{{ $t('email') }}" id="email"  class="input_floating_label peer " 
                
                v-model="v$.email.$model"
                :class="{
                    input_error:
                    (v$.email.$error && v$.email.required.$invalid) ||
                    (v$.email.$error && v$.email.email.$invalid),
                    input_success: !v$.email.$error && !v$.email.$invalid,
                }"
                />
                <label for="email" class="floating_label" :class="[     (v$.email.$error && v$.email.required.$invalid) ||
                (v$.email.$error && v$.email.email.$invalid) ? '!text-error':''
            ,]">{{ $t('email') }}*</label>
                <div
                class="w-full lg:w-4/6 mt-2"
                v-if="
                  (v$.email.$error && v$.email.required.$invalid) ||
                  (v$.email.$error && v$.email.email.$invalid)
                "
              >
                <p class="error_message">
                  <span v-if="v$.email.$error && v$.email.required.$invalid"
                    >{{ $t('email_address_is_required') }}</span
                  >
                  <span
                    v-else-if="
                      v$.email.required.$invalid ||
                      (v$.email.$error && v$.email.email.$invalid)
                    "
                    >{{ $t('please_enter_valid_email_address') }}</span
                  >
                </p>
              </div>
            </div>
    
            <div class="w-full relative">
                <input type="password" placeholder="{{ $t('password') }}" id="password" class="input_floating_label peer" 
                v-model="v$.password.$model"
                :class="{
                  input_error:
                    (v$.password.$error && v$.password.required.$invalid),
                    input_success: !v$.password.$error && !v$.password.$invalid,
    
                }"
                />
                <label for="password" class="floating_label" :class="[    
                (v$.password.$error && v$.password.required.$invalid) ? '!text-error':''
            ,]">{{ $t('password') }}*</label>
                <div
                class="w-full lg:w-4/6 mt-2"
                v-if="
                  (v$.password.$error && v$.password.required.$invalid)
                "
              >
              <p class="error_message">
                <span v-if="v$.password.$error && v$.password.required.$invalid"
                    >{{ $t('password_is_required') }}</span
                  >
                
                </p>
              </div>
            </div>
            <div class="w-full relative">
                <input type="password" placeholder="{{ $t('confirm_password') }}"  id="password_confirm" class="input_floating_label peer" 
                v-model="v$.password_confirm.$model"
                :class="{
                  input_error:
                    (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) || (v$.password_confirm.$error && v$.password_confirm.required.$invalid),
                    input_success: !v$.password_confirm.$error && !v$.password_confirm.$invalid,
    
                }"
                />
                <label for="password_confirm" class="floating_label"
                :class="[     (v$.password_confirm.$error && v$.password_confirm.required.$invalid) ||
                (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) ? '!text-error':''
            ,]"
                >{{$t('confirm_password')}}*</label>
                <div
                class="w-full lg:w-4/6 mt-2"
                v-if="
                  (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid) || (v$.password_confirm.$error && v$.password_confirm.required.$invalid)
                "
              >
              <p class="error_message">
                <span v-if="v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid || v$.password_confirm.$error && v$.password_confirm.required.$invalid"
                    >{{ $t('password_should_be_the_same') }}</span
                  >
             
      
                </p>
              </div>
            </div>
       <div class="flex flex-col items-center justify-center">
        <div class="text-[15px] font-[400] leading-5 text-secondary_text">
            <p>{{ $t('by_continuing_i_agree_to_tamkin') }}</p>
          </div>
    <div > 
        <a href="" class="text-tamkin underline">{{ $t('terms_of_use') }}</a> &
        <a href="" class="text-tamkin underline">{{ $t('privacy_statement') }}</a> 
    
    </div>
       </div>
        
              </div>
    
    
           </div>
           <div class=" mt-[12px] flex flex-col items-center justify-center">
            <button class="btn-grad-action"    :disabled="v$.email.$invalid || v$.password.$invalid ||  v$.fullName.$invalid || v$.password_confirm.$invalid">{{ $t('register') }}</button>
            <button class="transition-all ease-in-out hover:bg-tamkin/15  border-[1px] border-tamkin rounded-lg bg-transparent w-[300px] md:w-[400px]  xl:w-[580px]  h-[45px] font-[600] text-[20px] mt-[12px]">
                <div class="flex items-center justify-center space-x-[16px] lg:space-x-[8px]">
                    <div class="lg:text-base text-sm">{{ $t('register_with_google') }}</div>
                    <img src="/assets/imgs/google_login.png" alt="" class=" lg:h-full h-[20px]">
                </div>
            </button>
            <p class="mt-[8px]">{{ $t('already_have_an_account') }} <nuxt-link to="/auth/login" class="text-tamkin underline">{{ $t('login') }}</nuxt-link></p>
          </div>
    
        
    </div>
    
    </template>
    


