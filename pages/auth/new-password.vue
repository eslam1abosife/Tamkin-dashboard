<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from "@vuelidate/validators";
import { useAuthStore } from '@/stores/auth'; // import the auth store we just created
definePageMeta({
    layout:'auth'
})

const state = reactive({
    password: "",
    password_confirm: "",
});
const rules = {
    password: { required },
    password_confirm: { required, sameAs: sameAs(computed(() => state.password)) },
  
};
const v$ = useVuelidate(rules, state);

</script>

<template>
  <div class="">
    <div class="flex items-start justify-center flex-col w-full">
        <div class="mx-auto text-center mt-[24px]  xl:w-auto ipad-max:w-full w-full p-3">
          <div class="">
            <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="lg:mx-0 mx-auto lg:mb-0 mb-3 w-[160px] h-[81.28px]" />
          </div>
          <h1 class="text-[26px] lg:text-[32px]" style="line-height: 48px;">{{ $t('sign_up') }}</h1>
    
          <h3 class="text-[15px] lg:text-[20px] font-[600] text-darkGrey">{{ $t('sign_up_to_enjoy_features_of_tamkin') }}</h3>

       
          <div class="space-y-[16px]">
          
    
            <div class="space-y-[16px] w-full flex-1">
                <div class="space-y-[16px] mt-[24px] w-full">
                   
               
            
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
         
                
                      </div>
    
              <!-- Login button -->
              <div class=" w-full">
                <button class="btn-grad-action"  :disabled="v$.password.$invalid ||  v$.password_confirm.$invalid" >{{$t('continue')}}</button>

              </div>

          
            </div>
          </div>
        </div>
      </div>
   </div>
  </template>

