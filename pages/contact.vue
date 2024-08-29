<script lang="ts" setup>
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
definePageMeta({
  layout: 'dashboard'
})
import {useVuelidate} from "@vuelidate/core";
import {required, email, sameAs} from "@vuelidate/validators";
import {useContactSales} from "@/composables/usecontact";



const {contactSales, sendSuccessfully} = useContactSales();

const state = reactive({
  email: "",
  Name: "",
  Company: "",
  Subject: '',
  Inquiry: ''


});
  const rules = {
    email: {required, email},
    Name: {required},
    Company: {},
    Subject: {required},
    Inquiry: {required}


  };

    const v$ = useVuelidate(rules, state);
    const loadingContact = ref(false)

    const submitContact = async () => {
      loadingContact.value = true

      await contactSales({
          full_name: state.Name,
          email    : state.email,
          company  : state.Company,
          subject  : state.Subject,
          message  : state.Inquiry,
          source   : state.email,
      });

      if (sendSuccessfully){
        setTimeout(() => {
          state.email   = "";
          state.Name    = "";
          state.Company = "";
          state.Subject = "";
          state.Inquiry = "";
          v$.value.$reset()
          openModal('successContact', 'contact', {})
          loadingContact.value = false
        }, 3000)
      }
      else {
        // $toast('error', { hideIn: 3000});
      }

    }
</script>


<template>
  <div class="relative w-full h-full mb-[16px]">

    <ModalsSuccessModal
        :show-modal="isOpen('successContact')"
        :title="$t('Thanks for contact us')"
        :sub-title="$t('We will contact you as soon as possible')"
        icon="contact_success.svg"
    />
    <div
        class="flex items-start justify-between mx-auto px-6 py-12 shadow-md bg-white dark:bg-tamkinDarkPrimary rounded-[10px] w-full max-h-[700px] ">
      <div class="flex flex-col items-center lg:items-start justify-center w-full space-y-6">
        <div class="flex items-center justify-center rtl:space-x-reverse space-x-4">
          <h1 class="text-[14px] lg:text-[18px]  font-semibold text-[#021328] dark:text-whiteTamkin">{{$t('Contact Sales')}}</h1>
          <img src="/assets/pngs/contact.png" class="w-[40px] h-[40px]" alt="Contact Sales Icon"/>
        </div>

        <p class="text-[12px] lg:text-[14px] text-darkGrey  dark:text-whiteTamkin text-center  rtl:lg:text-right ltr:lg:text-left w-full">
          {{ $t(`Let’s get this conversation started tell us about yourself, and we’ll get in touch as soon as we can`) }}
        </p>

        <div class="w-full space-y-6 lg:pr-[24px]">

          <div class="w-full relative">
            <input type="text" placeholder="{{$t('Name')}}" id="Name" class="input_floating_label peer w-full"
                   v-model="v$.Name.$model" :class="{
                input_error:
                  (v$.Name.$error && v$.Name.required.$invalid),
                input_success: !v$.Name.$error && !v$.Name.$invalid,
              }"/>
            <label for="Name" class="floating_label" :class="[
              (v$.Name.$error && v$.Name.required.$invalid)
                ? '!text-error'
                : '',
            ]">
              {{ $t("Name*") }}
            </label>
            <div class="w-full lg:w-4/6 mt-2" v-if="(v$.Name.$error && v$.Name.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.Name.$error && v$.Name.required.$invalid">{{
                    $t("The name is required")
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
              }"/>
            <label for="email" class="floating_label" :class="[
              (v$.email.$error && v$.email.required.$invalid) ||
                (v$.email.$error && v$.email.email.$invalid)
                ? '!text-error'
                : '',
            ]">
              {{ $t("Email*") }}
            </label>
            <div class="w-full lg:w-4/6 mt-2" v-if="(v$.email.$error && v$.email.required.$invalid) ||
              (v$.email.$error && v$.email.email.$invalid)">
              <p class="error_message">
                <span v-if="v$.email.$error && v$.email.required.$invalid">{{
                    $t("The email address is required")
                  }}</span>
                <span v-else-if="v$.email.required.$invalid ||
                  (v$.email.$error && v$.email.email.$invalid)">{{
                    $t("Please enter a valid email")
                  }}</span>
              </p>
            </div>
          </div>
          <div class="w-full relative">
            <input type="text" placeholder="{{$t('Company')}}" id="Company" class="input_floating_label peer w-full"
                   v-model="v$.Company.$model"/>
            <label for="Company" class="floating_label">
              {{ $t("Company") }}
            </label>

          </div>

          <div class="w-full relative">
            <input type="text" placeholder="{{$t('Subject')}}" id="Subject" class="input_floating_label peer w-full"
                   v-model="v$.Subject.$model" :class="{
                input_error:
                  (v$.Subject.$error && v$.Subject.required.$invalid),
                input_success: !v$.Subject.$error && !v$.Subject.$invalid,
              }"/>
            <label for="Subject" class="floating_label" :class="[
              (v$.Subject.$error && v$.Subject.required.$invalid)
                ? '!text-error'
                : '',
            ]">
              {{ $t("Subject*") }}
            </label>
            <div class="w-full lg:w-4/6 mt-2" v-if="(v$.Subject.$error && v$.Subject.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.Subject.$error && v$.Subject.required.$invalid">{{
                    $t("Subject is required")
                  }}</span>

              </p>
            </div>
          </div>

          <div class="relative w-full">
            <textarea id="Inquiry" placeholder="Inquiry*" class="input_floating_label_text_area peer w-full  "
                      v-model="v$.Inquiry.$model" :class="{
                input_error: (v$.Inquiry.$error && v$.Inquiry.required.$invalid),
                input_success: !v$.Inquiry.$error && !v$.Inquiry.$invalid,
              }"></textarea>
            <label for="Inquiry" class="floating_label_text_area" :class="[
              (v$.Inquiry.$error && v$.Inquiry.required.$invalid) ? '!text-error' : '',
            ]">
              {{ $t("Inquiry*") }}
            </label>
            <div class="w-full lg:w-4/6 mb-4" v-if="(v$.Inquiry.$error && v$.Inquiry.required.$invalid)">
              <p class="error_message text_area">
                <span v-if="v$.Inquiry.$error && v$.Inquiry.required.$invalid">{{
                    $t("Inquiry is required")
                  }}</span>

              </p>
            </div>
          </div>

          <div class="flex justify-center rtl:space-x-reverse space-x-4">
            <button class="btn-dashboard hover_tamkin w-2/6" :disabled="v$.$invalid || loadingContact"
                    @click="submitContact">
              <div class="flex items-center justify-center">
                <div :class="loadingContact ? 'rtl:ml-2 ltr:mr-2':''">
                  {{$t('Submit')}}
                </div>

                <svg v-if="loadingContact" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="hidden lg:flex flex-col rtl:items-end ltr:items-start justify-center space-y-[10px] w-2/4  ">
        <div class=" text-darkGrey  dark:text-whiteTamkin text-[14px] lg:text-[18px]  ltr:ml-[10px] rtl:mr-[10px] font-[400]  leading-[26px]
            font-[Mali] rtl:font-[Almarai] ipad-max:mt-[130px] mt-[110px] ">
          {{$t('You will have more surprises and enjoy with us')}}
        </div>
        <div class="w-full h-full">
          <img src="/assets/pngs/desk.png" class="h-full 2xl:h-[303px] w-full"/>
        </div>
      </div>
    </div>
  </div>


</template>
