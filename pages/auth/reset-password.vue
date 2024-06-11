<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from "@vuelidate/validators";
definePageMeta({
    layout:'auth'
})
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '@/stores/auth'; // import the auth store we just created


const authStore = useAuthStore()
const {loading} = storeToRefs(authStore); // make authenticated state reactive with storeToRefs

const state = reactive({
    email: "",
});
const rules = {
    email: { required, email },
};

const v$ = useVuelidate(rules, state);


const resetPassword = ()=>{
    // fucntion to call the action in authstate
}

</script>

<template>

<div class="">
<div class="">
    <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[82px] lg:mx-0 mx-auto lg:mb-0 mb-6 ">

</div>
    <div class="pt-[6px] max-w-[580px] mx-auto text-center">
        <h1 class="text-[32px] font-medium ">Forgot Password</h1>
       
        <h3 class="text-[20px] font-[600] text-secondary_text">Enter your email for the verification we will send 4 digits code to your email</h3>
  
  

   
        <div class="space-y-[24px] mt-[13px]">
   
            <div class="w-full relative">
                <input type="email" placeholder="email" id="email"  class="input_floating_label peer " 
                
                v-model="v$.email.$model"
                :class="{
                    input_error:
                    (v$.email.$error && v$.email.required.$invalid) ||
                    (v$.email.$error && v$.email.email.$invalid),
                    input_success: !v$.email.$error && !v$.email.$invalid,
                }"
                />
                <label for="email" class="floating_label">Email*</label>
                <div
                class="w-full lg:w-4/6 mt-2"
                v-if="
                  (v$.email.$error && v$.email.required.$invalid) ||
                  (v$.email.$error && v$.email.email.$invalid)
                "
              >
                <p class="font-[300] text-right text-[10px]  text-red-600 absolute bottom-[10px]  right-10">
                  <span v-if="v$.email.$error && v$.email.required.$invalid"
                    >The email address is required</span
                  >
                  <span
                    v-else-if="
                      v$.email.required.$invalid ||
                      (v$.email.$error && v$.email.email.$invalid)
                    "
                    >Please Enter valid email address</span
                  >
                </p>
              </div>
            </div>
    
    
    
           </div>
           <div class=" mt-[52px] flex flex-col items-center justify-center">
            <button class="btn-grad-action"    :disabled="v$.email.$invalid  " >Continue</button>
        </div>
    </div>
</div>

</template>


