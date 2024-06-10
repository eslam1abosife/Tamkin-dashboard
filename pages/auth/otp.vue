<script lang="ts" setup>
definePageMeta({
    layout: 'auth'
})


import VOtpInput from "vue3-otp-input";
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindModal = ref("");
const disableButton = ref(true)
const handleOnComplete = (value: string) => {
  disableButton.value = false
};

const handleOnChange = (value: string) => {
    disableButton.value = true

};

const clearInput = () => {
  otpInput.value?.clearInput();
};

const fillInput = (value: string) => {
  console.log(value);
  otpInput.value?.fillInput(value);
};

</script>

<template>

    <div class="">
        <div class="">
            <img src="~assets/imgs/logo.png" alt="Tamkin logo" class="w-[160px] h-[82px] lg:mx-0 mx-auto lg:mb-0 mb-6 ">

        </div>
        <div class="pt-[60px] max-w-[580px] w-full text-center flex flex-col items-center justify-evenly mx-auto">
            <h1 class="text-[26px] lg:text-[32px] font-medium ">Sign Up</h1>

            <h3 class="text-[15px] lg:text-[20px] font-[600] text-secondary_text">Sign up to enjoy the feature of TAMKIN
            </h3>


            <div class="space-y-[24px] mt-[24px] w-full">
                <div class="flex flex-col ">
                    <div
                      >
                        <v-otp-input
                          class="flex flex-row items-center justify-center mx-auto w-full max-w-xs space-x-[8px] lg:space-x-[22px]"
                        ref="otpInput"
                        input-classes="otp_field"
                        :conditionalClass="['one', 'two', 'three', 'four']"
                      
                        inputType="letter-numeric"
                        :num-inputs="6"
                        v-model:value="bindModal"
                        :should-auto-focus="true"
                        :should-focus-order="true"
                        @on-change="handleOnChange"
                        @on-complete="handleOnComplete"
                      />
                   
                          
                        <!-- <div class="w-16 h-16 ">
                            <input
                                class="otp_field"
                                type="number" min="0" max="9" maxlength="1" name="" id="">
                        </div>
                        <div class="w-16 h-16 ">
                            <input
                                class="lg:w-[78px] lg:h-[56px] md:w-[50px] md:h-[40px] w-[50px] h-[50px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-lightGrey focus:ring-0 shadow-sm text-lg bg-whiteTamkin focus:bg-gray-50   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number" min="0" max="9" maxlength="1" name="" id="">
                        </div>
                        <div class="w-16 h-16 ">
                            <input
                                class="lg:w-[78px] lg:h-[56px] md:w-[50px] md:h-[40px] w-[50px] h-[50px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-lightGrey focus:ring-0 shadow-sm text-lg  bg-whiteTamkin focus:bg-gray-50   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number" min="0" max="9" maxlength="1" name="" id="">
                        </div>
                        <div class="w-16 h-16 ">
                            <input
                                class="lg:w-[78px] lg:h-[56px] md:w-[50px] md:h-[40px] w-[50px] h-[50px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-lightGrey focus:ring-0 shadow-sm text-lg  bg-whiteTamkin focus:bg-gray-50   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none  "
                                type="number" min="0" max="9" maxlength="1" name="" id="">
                        </div>
                        <div class="w-16 h-16 ">
                            <input
                                class="lg:w-[78px] lg:h-[56px] md:w-[50px] md:h-[40px] w-[50px] h-[50px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-lightGrey focus:ring-0 shadow-sm text-lg  bg-whiteTamkin focus:bg-gray-50   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number" min="0" max="9" maxlength="1" name="" id="">
                        </div>
                        <div class="w-16 h-16 ">
                            <input
                                class="lg:w-[78px] lg:h-[56px] md:w-[50px] md:h-[40px] w-[50px] h-[50px] flex flex-col items-center justify-center text-center px-5 outline-none rounded-[15px] border border-lightGrey focus:ring-0 shadow-sm text-lg  bg-whiteTamkin focus:bg-gray-50   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                type="number" min="0" max="9" maxlength="1" name="" id="">
                        </div> -->
                    </div>

                </div>


            </div>


        </div>
        <div class=" mt-[52px] flex flex-col items-center justify-center">
            <button class="btn-grad-action" :disabled="disableButton" >Continue</button>
            <p class="mt-[8px]">Already have an account?? <a href="" class="text-tamkin underline">Log in</a></p>
        </div>


    </div>

</template>


