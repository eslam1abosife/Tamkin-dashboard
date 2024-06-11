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
<div class="">
    <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[82px] lg:mx-0 mx-auto lg:mb-0 mb-6 ">

</div>
    <div class="pt-[6px] max-w-[580px] mx-auto text-center">
        <h1 class="text-[32px] font-medium ">{{$t('newPassprom')}}</h1>
       
        <h3 class="text-[20px] font-[600] text-secondary_text">{{$t('set_new_password')}}</h3>
  
  

       <div class="space-y-[24px] mt-[13px]">
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
       <div class=" mt-[52px] flex flex-col items-center justify-center">
        <button class="btn-grad-action"  :disabled="v$.password.$invalid ||  v$.password_confirm.$invalid" >{{$t('continue')}}</button>
    </div>
    </div>
</div>

</template>


