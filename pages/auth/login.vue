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
    // password_confirm: "",
    // name: "",
    // type: ""
});
const rules = {
    email: { required, email },
    password: { required },
    // password_confirm: { required, sameAs: sameAs(computed(() => state.password)) },
    // name: { required },
    // type: { required },
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
<div class="">
    <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[82px] lg:mx-0 mx-auto lg:mb-0 mb-6 ">

</div>
    <div class="pt-[6px] max-w-[580px] w-full text-center flex flex-col items-center justify-evenly mx-auto">
        <h1 class="text-[26px] lg:text-[32px] font-medium ">Log In</h1>
       
        <h3 class="text-[15px] lg:text-[20px] font-[600] text-secondary_text">New To TAMKIN <a href="" class="text-tamkin underline">Get Started</a></h3>
  
        <button class="transition-all ease-in-out hover:bg-tamkin/15  border-[1px] border-tamkin rounded-lg bg-transparent  w-full  h-[45px] font-[600] text-[20px] mt-[18px]">
            <div class="flex items-center justify-center space-x-[16px] lg:space-x-[8px]">
                <div class="lg:text-base text-sm">Log in  with Google</div>
                <img src="/assets/imgs/google_login.png" alt="" class=" lg:h-full h-[20px]">
            </div>
        </button>
        <div class="relative flex  items-center  mx-auto mt-[24px]">
            <div class="flex-grow border-t border-darkGrey"></div>
            <span class="flex-shrink mx-4 text-secondary_text text-[20px] font-[600] ">Or</span>
            <div class="flex-grow border-t border-darkGrey"></div>
        </div>

       <div class="space-y-[24px] mt-[24px] w-full">
        <div class="w-full relative">
            <input type="email" placeholder="email" id="email"  class="input_floating_label peer " 
            
            v-model="v$.email.$model"
            :class="{
                input_error:
                (v$.email.$error && v$.email.required.$invalid) ||
                (v$.email.$error && v$.email.email.$invalid),
              valid_input: !v$.email.$error && !v$.email.$invalid,
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
                >حقل كلمة المرور مطلوب</span
              >
            
            </p>
          </div>
        </div>

      <div class="flex flex-row items-center justify-between p-3">
        <div class="">
            <input type="checkbox"  class="rounded-[4px] text-tamkin ring-0 focus:ring-0" id="remember_me" checked/>
            <label for="remember_me" class="px-[8px]">Remember me</label>
        </div>
        <div class=" ">
            <nuxt-link to="/auth/reset-password" class="text-[15px] font-[500] underline text-tamkin"> Forgot Password?</nuxt-link>
        </div>
      </div>



       </div>
       <div class="pt-[40px] ">
        <button class="btn-grad-action">Login</button>

      </div>
    </div>
</div>

</template>


