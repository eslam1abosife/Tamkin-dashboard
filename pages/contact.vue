<script lang="ts" setup>
definePageMeta({
    layout:'dashboard'
})
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
const state = reactive({
  email: "",
  Name: "",
  Company: "",
  Subject:'',
  Inquiry:''


});
const rules = {
  email: { required, email },
  Name: { required },
  Company:{},
  Subject:{required},
  Inquiry:{required}


};

const v$ = useVuelidate(rules, state);

</script>


<template>
    <div class="relative h-full w-full my-[16px]">

    <div class="flex items-center justify-center flex-col mx-auto px-6 py-12 shadow-md bg-white rounded-[10px] w-full max-w-4xl">
        <div class="flex flex-col items-center justify-center w-full space-y-6">
          <div class="flex items-center justify-center space-x-4">
            <h1 class="text-2xl font-semibold text-[#021328]">Contact Sales</h1>
            <img src="/assets/imgs/icons/contact_sales.svg" alt="Contact Sales Icon">
          </div>
      
          <p class="text-lg text-darkGrey text-center w-full">
            Let’s get this conversation started tell us about yourself, and we’ll get in touch as soon as we can
          </p>
      
          <form class="w-full space-y-6">
            
            <div class="w-full relative">
                <input type="text" placeholder="{{$t('Name')}}" id="Name" class="input_floating_label peer w-full"
                  v-model="v$.Name.$model" :class="{
              input_error:
                (v$.Name.$error && v$.Name.required.$invalid),
              input_success: !v$.Name.$error && !v$.Name.$invalid,
            }" />
                <label for="Name" class="floating_label" :class="[
              (v$.Name.$error && v$.Name.required.$invalid)
                ? '!text-error'
                : '',
            ]">
                  {{ $t("Name") }}*
                </label>
                <div class="w-full lg:w-4/6 mt-2" v-if="(v$.Name.$error && v$.Name.required.$invalid)">
                  <p class="error_message">
                    <span v-if="v$.Name.$error && v$.Name.required.$invalid">{{ $t("Please enter a valid Name")
                      }}</span>
  
                  </p>
                </div>
              </div>
              <div class="w-full relative">
                <input type="email" placeholder="{{$t('email')}}" id="email" class="input_floating_label peer w-full"
                  v-model="v$.email.$model" :class="{
              input_error:
                (v$.email.$error && v$.email.required.$invalid) ||
                (v$.email.$error && v$.email.email.$invalid),
              input_success: !v$.email.$error && !v$.email.$invalid,
            }" />
                <label for="email" class="floating_label" :class="[
              (v$.email.$error && v$.email.required.$invalid) ||
                (v$.email.$error && v$.email.email.$invalid)
                ? '!text-error'
                : '',
            ]">
                  {{ $t("email") }}*
                </label>
                <div class="w-full lg:w-4/6 mt-2" v-if="(v$.email.$error && v$.email.required.$invalid) ||
              (v$.email.$error && v$.email.email.$invalid)">
                  <p class="error_message">
                    <span v-if="v$.email.$error && v$.email.required.$invalid">{{ $t("email_address_is_required")
                      }}</span>
                    <span v-else-if="v$.email.required.$invalid ||
              (v$.email.$error && v$.email.email.$invalid)">{{ $t("please_enter_valid_email_address")
                      }}</span>
                  </p>
                </div>
              </div>
              <div class="w-full relative">
                <input type="text" placeholder="{{$t('Company')}}" id="Company" class="input_floating_label peer w-full"
                  v-model="v$.Company.$model" 
             />
                <label for="Company" class="floating_label" >
                  {{ $t("Company") }}
                </label>
              
              </div>
                
              <div class="w-full relative">
                <input type="text" placeholder="{{$t('Subject')}}" id="Subject" class="input_floating_label peer w-full"
                  v-model="v$.Subject.$model" :class="{
              input_error:
                (v$.Subject.$error && v$.Subject.required.$invalid),
              input_success: !v$.Subject.$error && !v$.Subject.$invalid,
            }" />
                <label for="Subject" class="floating_label" :class="[
              (v$.Subject.$error && v$.Subject.required.$invalid)
                ? '!text-error'
                : '',
            ]">
                  {{ $t("Subject") }}*
                </label>
                <div class="w-full lg:w-4/6 mt-2" v-if="(v$.Subject.$error && v$.Subject.required.$invalid)">
                  <p class="error_message">
                    <span v-if="v$.Subject.$error && v$.Subject.required.$invalid">{{ $t("Please enter a valid Subject")
                      }}</span>
  
                  </p>
                </div>
              </div>

              <div class="relative w-full">
                <textarea
                  id="Inquiry"
                  placeholder="Inquiry*"
                  class="input_floating_label_text_area peer w-full  "
                  v-model="v$.Inquiry.$model"
                  :class="{
                    input_error: (v$.Inquiry.$error && v$.Inquiry.required.$invalid),
                    input_success: !v$.Inquiry.$error && !v$.Inquiry.$invalid,
                  }"
                ></textarea>
                <label
                  for="Inquiry"
                  class="floating_label_text_area"
                  :class="[
                    (v$.Inquiry.$error && v$.Inquiry.required.$invalid) ? '!text-error' : '',
                  ]"
                >
                  {{ $t("Inquiry") }}*
                </label>
                <div class="w-full lg:w-4/6 mb-4" v-if="(v$.Inquiry.$error && v$.Inquiry.required.$invalid)">
                    <p class="error_message text_area">
                      <span v-if="v$.Inquiry.$error && v$.Inquiry.required.$invalid">{{ $t("Please enter an Inquiry")
                        }}</span>
    
                    </p>
                  </div>
              </div>
              
            <div class="flex justify-center space-x-4">
              <button type="button" class="btn_bordered_dashboard w-1/6">Cancel</button>
              <button type="submit" class="btn-dashboard hover_tamkin w-1/6">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
      
      
      
</template>