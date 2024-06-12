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
   <div class="max-w-[600px]">
    <div class="flex items-start justify-center flex-col w-full">
        <div class="mx-auto text-center mt-[24px]  xl:w-auto ipad-max:w-full w-full ">
          <div class="">
            <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="lg:mx-0 mx-auto lg:mb-0 mb-3 w-[160px] h-[81.28px]" />
          </div>
          <h1 class="text-[26px] lg:text-[32px]" style="line-height: 48px;">{{ $t("sign_up") }}</h1>
    
          <h3 class="text-[15px] lg:text-[20px] font-[600] text-darkGrey" style="line-height: 48px;">
            {{ $t('sign_up_to_enjoy_features_of_tamkin') }}</h3>

       
          <div class="space-y-[16px]">
          
    
            <div class="space-y-[16px] w-full flex-1">
                <div class="space-y-[16px] mt-[24px] w-full">
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
    
              <!-- Login button -->
              <div class=" w-full">
                <button class="btn-grad-action"    :disabled="v$.email.$invalid || v$.password.$invalid ||  v$.fullName.$invalid || v$.password_confirm.$invalid">{{ $t('register') }}</button>

              </div>

              <button style="line-height: 30px;" class="mt-[10px] transition-all ease-in-out hover:bg-tamkin/15 border-[1.5px] border-tamkin rounded-[10px] bg-transparent h-[40px] lg:h-[50px]  w-full">
                <div class="flex items-center justify-center space-x-[16px] lg:space-x-[8px]">
                  <div class="font-[600] text-[16px] lg:text-[20px]">{{ $t("signUpWithGoogle") }}</div>
                  <img src="/assets/imgs/google_login.png" alt="" class="w-[23px] h-[23px]" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
   </div>
  </template>

