

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
        <h1 class="text-[26px] lg:text-[32px] font-medium ">Sign Up</h1>
       
        <h3 class="text-[15px] lg:text-[20px] font-[600] text-secondary_text">Sign up to enjoy the feature of TAMKIN</h3>


       <div class="space-y-[24px] mt-[24px] w-full">
        <div class="w-full relative">
            <input type="text" placeholder="full name" id="fullname"  class="input_floating_label peer border"
            v-model="v$.fullName.$model"
            :class="{
                input_error:
                (v$.fullName.$error && v$.fullName.required.$invalid) ,
                input_success: !v$.fullName.$error && !v$.fullName.$invalid,
            }"
            />
            <label for="fullname" class="floating_label">Fullname*</label>
            <div
            class="w-full lg:w-4/6 mt-2"
            v-if="
              (v$.fullName.$error && v$.fullName.required.$invalid) 
            "
          >
            <p class="font-[300] text-right text-[10px]  text-red-600 absolute bottom-[10px]  right-10">
              <span v-if="v$.fullName.$error && v$.fullName.required.$invalid"
                >The Full name is required</span
              >
           
            </p>
          </div>
        </div>
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

        <div class="w-full relative">
            <input type="password" placeholder="password" id="password" class="input_floating_label peer" 
            v-model="v$.password.$model"
            :class="{
              input_error:
                (v$.password.$error && v$.password.required.$invalid),
                input_success: !v$.password.$error && !v$.password.$invalid,

            }"
            />
            <label for="password" class="floating_label">Password*</label>
            <div
            class="w-full lg:w-4/6 mt-2"
            v-if="
              (v$.password.$error && v$.password.required.$invalid)
            "
          >
          <p class="font-[300] text-right text-[10px]  text-red-600 absolute bottom-[10px]  right-10">
            <span v-if="v$.password.$error && v$.password.required.$invalid"
                >Password is required</span
              >
            
            </p>
          </div>
        </div>
        <div class="w-full relative">
            <input type="password" placeholder="password confirm"  id="password_confirm" class="input_floating_label peer" 
            v-model="v$.password_confirm.$model"
            :class="{
              input_error:
                (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid),
                input_success: !v$.password_confirm.$error && !v$.password_confirm.$invalid,

            }"
            />
            <label for="password_confirm" class="floating_label">Confirm Password*</label>
            <div
            class="w-full lg:w-4/6 mt-2"
            v-if="
              (v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid)
            "
          >
          <p class="font-[300] text-right text-[10px]  text-red-600 absolute bottom-[10px]  right-10">
            <span v-if="v$.password_confirm.$error && v$.password_confirm.sameAs.$invalid"
                >password should be the same</span
              >
            
            </p>
          </div>
        </div>
   <div class="flex flex-col items-center justify-center">
    <div class="text-[15px] font-[400] leading-5 text-secondary_text">
        <p > By continuing, I agree to TAMKIN</p>
      </div>
<div > 
    <a href="" class="text-tamkin underline">Terms of Use </a> &
    <a href="" class="text-tamkin underline">Privacy Statement</a> 

</div>
   </div>
    
          </div>


       </div>
       <div class=" mt-[12px] flex flex-col items-center justify-center">
        <button class="btn-grad-action"    :disabled="v$.email.$invalid || v$.password.$invalid ||  v$.fullName.$invalid || v$.password_confirm.$invalid">Register</button>
        <button class="transition-all ease-in-out hover:bg-tamkin/15  border-[1px] border-tamkin rounded-lg bg-transparent w-[300px] md:w-[400px]  xl:w-[580px]  h-[45px] font-[600] text-[20px] mt-[12px]">
            <div class="flex items-center justify-center space-x-[16px] lg:space-x-[8px]">
                <div class="lg:text-base text-sm">Register with Google</div>
                <img src="/assets/imgs/google_login.png" alt="" class=" lg:h-full h-[20px]">
            </div>
        </button>
        <p class="mt-[8px]">Already have an account?? <nuxt-link to="/auth/login" class="text-tamkin underline">Log in</nuxt-link></p>
      </div>

    
</div>

</template>




