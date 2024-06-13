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
});
const rules = {
    email: { required, email },
    password: { required },
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
</script>

<template>
  <div class="max-w-[600px] h-[600px] relative">
    <div class="flex items-center justify-center w-full mt-[16px] ">
        <div class="flex items-start justify-between flex-col w-full lg:p-0 p-3 ">
            <div class="flex-1 lg:mx-[-5px] mx-auto">
                <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[81.28px]" />
              </div>
            <div class="mx-auto text-center   xl:w-auto ipad-max:w-full w-full">
           
              <h1 class="text-[26px] lg:text-[32px] mb-[6px]" style="line-height: 48px;">{{ $t("successfully") }}</h1>
        
              <h3 class="text-[15px] lg:text-[20px] font-[600] text-darkGrey  mb-[23px]" style="line-height: 30px;">
                {{ $t("password_reset_successfully") }}
              </h3>
              
              
             
            </div>
          </div>
       </div>

       <div class="absolute top-[500px] lg:top-[570px] space-y-[16px] inset-0  lg:p-0 p-3">
        <button class="btn-grad-action w-full">
          {{ $t("continue") }}
        </button>
      </div>
 </div>
  </template>

