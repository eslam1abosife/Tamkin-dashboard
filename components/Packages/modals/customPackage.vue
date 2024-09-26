<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs,helpers } from "@vuelidate/validators";
import { useModalManager } from '@/composables/useModalManager';
import { useShareEmbedCode } from "@/composables/useEmbedCode";
import { useCustomPackage, useGetPackages } from "~/composables/usePackages";
import { useCheckifSiteblocked, useGetTraffic,useGetPriceByTraffic } from "@/composables/usePackages";
const {t} = useI18n()
const { checkifBlockedSite, messageStatus:messageStatusBlocked, codeStatus:codeStatusBlocked } = useCheckifSiteblocked();
const domainRegex = /^(?:(?:https?:\/\/)?(?:www\.)?(?!www\.)[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,})(?:\/.*)?$/;

const isDomain = helpers.withParams({ type: "isDomain" }, (value) => {
  return domainRegex.test(value);
});
const { sendCustomPackage,codeStatus,messageStatus} = useCustomPackage();
const packagesStore = useGetPackages()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData
} = useModalManager();
const state = reactive({
    website: "",
    number_of_sites:"",
    company_name: "",
    services: "",
    phone_number:"",
});
const rules = {
    website: { required ,isDomain},
    number_of_sites: { required },
    company_name: { required },
    services: { required },
    phone_number: { required },

};

const v$ = useVuelidate(rules, state);

const props = defineProps({
  showModal: Boolean,
});

onMounted(async () => {
  await nextTick();
  const state = getData();

  if (!defaultApp.value) {
    await getInviteApps({
      agency: state.currTeamId
    });
  }
})
const { shareEmbedCode, loading } = useShareEmbedCode();
const emit = defineEmits(['onSuccess']);
const {$toast}= useNuxtApp()
const errMsg = ref(null);
const loadingPackage = ref(false)
const blockedError = ref(false)
const cleanWebsiteUrl = (url: string) => {
  return url.replace(/^(https?:\/\/)?(www\.)?/, "");
}

const submit = async () => {
    loadingPackage.value = true
   let resbl;
   if (state.website !== '') {
    resbl = await checkifBlockedSite(state.website);

    if (resbl.length > 0) {
      blockedError.value = true
      loadingPackage.value = false;

      return; 
    }
   const res =  await sendCustomPackage({...state,package:getData().package})

 if(codeStatus.value === 200){

    $toast(t(`Request Sent successfully`),{hideIn:3000})
    closeModal('custom_package')
    packagesStore.bundleSelectedPackage = ''

    state.company_name = ''
    state.website = ''
    state.number_of_sites = ''
    state.services = ''
    state.phone_number = ''
    loadingPackage.value = false
    v$.value.$reset()
 }else {
    $toast(messageStatus.value,{hideIn:3000})
    loadingPackage.value = false

 }

}}
</script>

<template>
  <div  v-if="isOpen('custom_package')"
    class="fixed z-[9999] top-[70px] ipad-max:top-[10px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] lg:w-[640px] lg:h-auto w-10/12"
    style="left: 50%; transform: translate(-50%, 0)">
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="closeModal('custom_package')">
      <svg class="w-[12px] h-[12px]" width="14" height="13" viewBox="0 0 14 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor" />
      </svg>
    </div>
    <h1 class="rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] ">
      {{$t('Custom Package')}}
    </h1>
{{ packagesStore.bundleSelectedPackage }}
    <p
    class="mt-[14px]  rtl:text-right ltr:text-left font-[500] text-black dark:text-whiteTamkin  text-[12px] leading-[24px]">
    {{$t('Custom Package allows users to tailor a set of services or products to meet specific needs, offering flexibility and personalized options for a unique experience')}}</p>

    <div class="w-full relative mt-[14px]">
      <input type="text" placeholder="" id="twebsite" @input="blockedError = false"
        class="input_floating_label peer !font-[400] dark:text-whiteTamkin" v-model="v$.website.$model" :class="{
          input_error:
            (v$.website.$error && v$.website.required.$invalid) || blockedError ||  (v$.website.$error && v$.website.isDomain.$invalid),
          error_text:
            (v$.website.$error && v$.website.required.$invalid) || blockedError ||  (v$.website.$error && v$.website.isDomain.$invalid),
          input_success:
            !v$.website.$error && !v$.website.$invalid && !blockedError,
        }"
         />
      <label for="twebsite" class="floating_label" :class="[
    (v$.website.$error && v$.website.required.$invalid) || blockedError ||  (v$.website.$error && v$.website.isDomain.$invalid)
      ? '!text-error'
      : '',
  ]">
        {{ $t("Website Url*") }}
      </label>
      <div class="w-full lg:w-4/6 " v-if="(v$.website.$error && v$.website.required.$invalid) || blockedError || 
      (v$.website.$error && v$.website.isDomain.$invalid)
    ">
        <p class="error_message">
      
          <span
          v-if="
            (v$.website.$error && v$.website.required.$invalid) ||
            (v$.website.$error && v$.website.isDomain.$invalid)
          "
          >{{ $t("Website is not valid") }}</span
        >
  <span v-if="blockedError">{{
    $t("Unable to add the current website because it is blocked.") 
  }}</span>
        </p>

      </div>
    </div>

    <div class="w-full relative mt-[14px]">
        <input type="number" placeholder="" id="nmb"
          class="input_floating_label peer relative !font-[400] dark:text-whiteTamkin" v-model="v$.number_of_sites.$model" :class="{
      input_error:
        (v$.number_of_sites.$error && v$.number_of_sites.required.$invalid) ,
      error_text:
        (v$.number_of_sites.$error && v$.number_of_sites.required.$invalid),
      input_success: !v$.number_of_sites.$error && !v$.number_of_sites.$invalid,
    }" />
        <label for="nmb" class="floating_label" :class="[
      (v$.number_of_sites.$error && v$.number_of_sites.required.$invalid)
        ? '!text-error'
        : '',
    ]">
          {{ $t("Number of Sites*") }}
        </label>
        <div class="w-full lg:w-4/6 " v-if="(v$.number_of_sites.$error && v$.number_of_sites.required.$invalid)
      ">
          <p class="error_message">
            <span v-if="v$.number_of_sites.$error && v$.number_of_sites.required.$invalid">{{
      $t("The Number of Sites is required")
    }}</span>
         
          </p>
        </div>
      </div>

      <div class="w-full relative mt-[14px]">
        <input type="text" placeholder="" id="comb"
          class="input_floating_label peer relative !font-[400] dark:text-whiteTamkin" v-model="v$.company_name.$model" :class="{
      input_error:
        (v$.company_name.$error && v$.company_name.required.$invalid) ,
      error_text:
        (v$.company_name.$error && v$.company_name.required.$invalid),
      input_success: !v$.company_name.$error && !v$.company_name.$invalid,
    }" />
        <label for="comb" class="floating_label" :class="[
      (v$.company_name.$error && v$.company_name.required.$invalid)
        ? '!text-error'
        : '',
    ]">
          {{ $t("Company Name*") }}
        </label>
        <div class="w-full lg:w-4/6 " v-if="(v$.company_name.$error && v$.company_name.required.$invalid)
      ">
          <p class="error_message">
            <span v-if="v$.company_name.$error && v$.company_name.required.$invalid">{{
      $t("The Company Name is required")
    }}</span>
         
          </p>
        </div>
      </div>

      <div class="w-full relative mt-[14px]">
        <input type="number" placeholder="" id="pb"
          class="input_floating_label peer relative !font-[400] dark:text-whiteTamkin" v-model="v$.phone_number.$model" :class="{
      input_error:
        (v$.phone_number.$error && v$.phone_number.required.$invalid) ,
      error_text:
        (v$.phone_number.$error && v$.phone_number.required.$invalid),
      input_success: !v$.phone_number.$error && !v$.phone_number.$invalid,
    }" />
        <label for="pb" class="floating_label" :class="[
      (v$.phone_number.$error && v$.phone_number.required.$invalid)
        ? '!text-error'
        : '',
    ]">
          {{ $t("Phone Number*") }}
        </label>
        <div class="w-full lg:w-4/6 " v-if="(v$.phone_number.$error && v$.phone_number.required.$invalid)
      ">
          <p class="error_message">
            <span v-if="v$.phone_number.$error && v$.phone_number.required.$invalid">{{
      $t("The Phone Number is required")
    }}</span>
         
          </p>
        </div>
      </div>

      
      <div class="relative w-full mt-[14px]">
        <textarea id="Inquiry" placeholder="Services*" class="input_floating_label_text_area peer w-full  "
                  v-model="v$.services.$model" :class="{
            input_error: (v$.services.$error && v$.services.required.$invalid),
            input_success: !v$.services.$error && !v$.services.$invalid,
          }"></textarea>
        <label for="Inquiry" class="floating_label_text_area" :class="[
          (v$.services.$error && v$.services.required.$invalid) ? '!text-error' : '',
        ]">
          {{ $t("Services*") }}
        </label>
        <div class="w-full lg:w-4/6 " v-if="(v$.services.$error && v$.services.required.$invalid)">
          <p class="error_message text_area">
            <span v-if="v$.services.$error && v$.services.required.$invalid">{{
                $t("Services are required")
              }}</span>

          </p>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center mt-[14px]">
        <div class="text-[15px] font-[400] leading-[10px] text-secondary_text dark:text-whiteTamkin">
          <p>{{ $t('By continuing, I agree to TAMKIN') }}</p>
        </div>
        <div class="text-[15px]">
          <a href="https://tamkin.app/terms?_lang=en" target="_blank" class="text-tamkin underline font-[400]">{{ $t('Terms of Use')
            }}</a> <span class="text-[15px] font-[400] dark:text-whiteTamkin" >& </span>
          <a href="https://tamkin.app/privacy-policy?_lang=en" target="_blank" class="text-tamkin underline font-[400]">{{
              $t('Privacy Statement') }}</a>
  
        </div>
      </div>
    <div class="">

      <button :disabled="v$.$invalid || loadingPackage"
 @click="submit"
        class="btn-dashboard hover_tamkin w-full px-[20px] mt-[14px] mx-auto">
       
        <div class="flex items-center justify-center">
            <div :class="loadingPackage ? 'rtl:ml-2 ltr:mr-2' : ''">
              {{ $t("Submit") }}
            </div>
  
            <svg v-if="loadingPackage" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>
          </div>

      </button>
    </div>
  </div>
</template>

<style lang="scss"></style>
