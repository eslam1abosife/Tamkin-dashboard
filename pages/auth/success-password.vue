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
   <div class="">
    <div class="flex items-start justify-center flex-col w-full">
        <div class="flex items-start justify-center flex-col w-full p-3">

            <div class="lg:mx-0 mx-auto">
                <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="lg:mx-0 mx-auto lg:mb-0 mb-3 w-[160px] h-[81.28px]" />
              </div>
        <div class="mx-auto text-center mt-[24px] xl:w-auto ipad-max:w-full w-full p-3  ">
        
          <h1 class="text-[26px] lg:text-[32px]" style="line-height: 48px;">{{ $t("successfully") }}</h1>
    
          <h3 class="text-[15px] lg:text-[20px] font-[600] text-darkGrey" style="line-height: 48px;">
            {{ $t("password_reset_successfully") }}
          
          </h3>
      
          <div class="space-y-[16px] w-full">
       
    
            <div class="space-y-[16px] w-full">
          
    
              <div class="lg:pt-[40px] md:pt-[24px] w-full">
                <button class="btn-grad-action" @click="$router.push('/auth/login')" >{{$t('continue')}}</button>

              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
</div>
  </template>

