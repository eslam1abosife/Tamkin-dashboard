<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";

import { useGetAllCountries, useChangeMemberInfo } from "@/composables/useProfile";

const { getCountries, countries } = useGetAllCountries();

const loadingUpdate = ref(false);

const profileStore = useProfileStore();
const props = defineProps({
  loadingPersonal:Boolean

})

const state = reactive({
  first_name: "",
  last_name: "",
  phone: "",
  country:  "",
  // city:"",
  // address:""
});
const rules = {
  first_name: { required },
  last_name: { required },
  phone: { required },
  country: { required },
  // city:{required},
  // address:{required}
};
const telInputStyleClasses = computed(() => {
  return [
    "!rounded-[10px]",
    {
      input_error: v$.value.phone.$error && v$.value.phone.required.$invalid,
      input_success: !v$.value.phone.$error && !v$.value.phone.$invalid,
    },
  ];
});
const emit = defineEmits(["cancelupdate", "updatePersonalInfo"]);

const cancelUpdate = () => {
  emit("cancelupdate");
  resetcancel()
};

const updatePersonalInfo = async () => {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    emit('updatePersonalInfo',state)
    // emit('cancelupdate')
  }
};

const v$ = useVuelidate(rules, state);


const handleSelectedItemProjectName = (item: any) => {
  state.country = item.name;
  // console.log(item);
};
const localPhone =ref()
const countryCode = ref()
const getPhone = (number: string, phoneObject: { number: string }) => {
  // console.log(phoneObject)
  localPhone.value = phoneObject.nationalNumber; // Update local phone state
  countryCode.value =phoneObject.countryCallingCode

};

watch(localPhone, (newPhone) => {
  // state.phone = newPhone; // Update the main state when local phone changes
});
watch(() => state, (newState) => {
  // Perform any necessary actions with the updated state
  profileStore.updateProfilePayload = {...state,phone:`00${countryCode.value}${localPhone.value}`}
}, { deep: true });
onMounted(async () => {
  state.first_name = profileStore.member.first_name;
  state.last_name = profileStore.member.last_name;
  state.phone = profileStore.member.phone;
  state.country = profileStore.member.country;

  // Extract country code and local phone from state.phone
  const phoneMatch = state.phone.match(/^00(\d{1,3})(\d+)$/);
  if (phoneMatch) {
    countryCode.value = phoneMatch[1];
    localPhone.value = phoneMatch[2];
  }

  await getCountries();
});

const resetcancel = () =>{
  state.first_name = profileStore.member.first_name;
  state.last_name = profileStore.member.last_name;
  state.phone = profileStore.member.phone;
  state.country = profileStore.member.country;
}
</script>

<template>
  <div class="w-full">
    <div
      class="grid grid-cols-1 ipad-max:grid-cols-1 md:grid-cols-2 gap-4 w-full !mt-[32px]"
    >
      <div class="w-full relative">
        <input
          type="text"
          id="first_name"
          placeholder=""
          class="input_floating_label peer w-full"
          v-model="v$.first_name.$model"
          :class="{
            input_error: v$.first_name.$error && v$.first_name.required.$invalid,
            input_success: !v$.first_name.$error && !v$.first_name.$invalid,
          }"
        />
        <label
          for="first_name"
          class="floating_label"
          :class="[
            v$.first_name.$error && v$.first_name.required.$invalid ? '!text-error' : '',
          ]"
        >
          {{ $t("First Name*") }}
        </label>
        <div
          class="w-full lg:w-4/6"
          v-if="v$.first_name.$error && v$.first_name.required.$invalid"
        >
          <p class="error_message">
            <span v-if="v$.first_name.$error && v$.first_name.required.$invalid">{{
              $t("Please enter The First Name")
            }}</span>
          </p>
        </div>
      </div>

      <div class="w-full relative">
        <input
          type="text"
          id="last_name"
          placeholder=""
          class="input_floating_label peer w-full"
          v-model="v$.last_name.$model"
          :class="{
            input_error: v$.last_name.$error && v$.last_name.required.$invalid,
            input_success: !v$.last_name.$error && !v$.last_name.$invalid,
          }"
        />
        <label
          for="last_name"
          class="floating_label"
          :class="[
            v$.last_name.$error && v$.last_name.required.$invalid ? '!text-error' : '',
          ]"
        >
          {{ $t("Last Name*") }}
        </label>
        <div
          class="w-full lg:w-4/6"
          v-if="v$.last_name.$error && v$.last_name.required.$invalid"
        >
          <p class="error_message">
            <span v-if="v$.last_name.$error && v$.last_name.required.$invalid">{{
              $t("Please enter The Last Name")
            }}</span>
          </p>
        </div>
      </div>

      <div class="w-full relative">
        <vue-tel-input
          v-model="v$.phone.$model"
          @on-input="getPhone"
          :validCharactersOnly="true"
          :auto-format="false"
          class="!w-full"
                      :dropdownOptions="{showFlags:true,showDialCodeInSelection:true}"
                      :inputOptions="{ showDialCode: false,maxlength:12 , styleClasses: ['input_floating_label w-full bg-transparent'] }" 
                    mode="national"
                      :styleClasses="telInputStyleClasses" 
        >
          <template v-slot:arrow-icon="{ open }">
            <img
              src="/assets/imgs/payment_methods/country_arrow.svg"
              :class="[open ? 'rotate-90' : '']"
              class="rtl:mr-[20px] ltr:ml-[20px] mb-[0px] float-right w-[14px] h-[8px]"             /> </template
        ></vue-tel-input>
        <input
          v-if="false"
          type="number"
          id="phone"
          placeholder=""
          class="input_floating_label peer w-full"
          v-model="v$.phone.$model"
          :class="{
            input_error: v$.phone.$error && v$.phone.required.$invalid,
            input_success: !v$.phone.$error && !v$.phone.$invalid,
          }"
        />
        <label
          v-if="false"
          for="phone"
          class="floating_label"
          :class="[v$.phone.$error && v$.phone.required.$invalid ? '!text-error' : '']"
        >
          {{ $t("Phone Number*") }}
        </label>
        <div class="w-full lg:w-4/6" v-if="v$.phone.$error && v$.phone.required.$invalid">
          <p class="error_message">
            <span v-if="v$.phone.$error && v$.phone.required.$invalid">{{
              $t("Please enter The Phone number")
            }}</span>
          </p>
        </div>
      </div>

      <div class="w-full relative">
        <TranslateSelectInput
          @getCurrentSelectedItem="handleSelectedItemProjectName"
          :enableSearch="true"
          placeholderinput="Country*"
          :errorField="v$.country.$error && v$.country.required.$invalid"
          :list="countries"
          nameKey="name"
          idField="name"
          iconKey="image"
          :successField="!v$.country.$error && !v$.country.$invalid"
          :currentListValue="state.country"
        />

        <div
          class="w-full lg:w-4/6"
          v-if="v$.country.$error && v$.country.required.$invalid"
        >
          <p class="error_message">
            <span v-if="v$.country.$error && v$.country.required.$invalid">{{
              $t("Please enter The Country")
            }}</span>
          </p>
        </div>
      </div>

      <!-- <div class="w-full relative ">
            <input type="text" id="city" placeholder="" class="input_floating_label peer w-full"
              v-model="v$.city.$model" :class="{
          input_error:
            (v$.city.$error && v$.city.required.$invalid),
          input_success: !v$.city.$error && !v$.city.$invalid,
        }" />
            <label for="city" class="floating_label" :class="[
          (v$.city.$error && v$.city.required.$invalid)
            ? '!text-error'
            : '',
        ]">
              {{ $t("City") }}*
            </label>
            <div class="w-full lg:w-4/6 " v-if="(v$.city.$error && v$.city.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.city.$error && v$.city.required.$invalid">{{ $t("Please enter The City")
                  }}</span>
    
              </p>
            </div>
          </div>

          <div class="w-full relative ">
            <input type="text" id="address" placeholder="" class="input_floating_label peer w-full"
              v-model="v$.address.$model" :class="{
          input_error:
            (v$.address.$error && v$.address.required.$invalid),
          input_success: !v$.address.$error && !v$.address.$invalid,
        }" />
            <label for="address" class="floating_label" :class="[
          (v$.address.$error && v$.address.required.$invalid)
            ? '!text-error'
            : '',
        ]">
              {{ $t("Address") }}*
            </label>
            <div class="w-full lg:w-4/6 " v-if="(v$.address.$error && v$.address.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.address.$error && v$.address.required.$invalid">{{ $t("Please enter The Address")
                  }}</span>
    
              </p>
            </div>
          </div> -->
    </div>
 
    <div
      class="flex items-end justify-end rtl:flex-row-reverse  space-x-[16px] absolute bottom-[24px] rtl:left-[30px] ltr:right-[30px]"
    >
      <button class="btn_bordered_dashboard" @click="cancelUpdate">{{$t('Cancel')}}</button>
      <button class="btn-dashboard hover_tamkin w-[125px]" :disabled="loadingPersonal || v$.$invalid" @click="updatePersonalInfo" >

        <div class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]">
          <div :class="loadingPersonal ? 'rtl:ml-2 ltr:mr-2':''">
         {{ $t('Update') }}
          </div>
     
           <svg  v-if="loadingPersonal" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
         </div>
      </button>
    </div>
  </div>
</template>

<style>
.vue-tel-input {
  @apply rounded-[10px] bg-white h-[40px];
}

.vti__input {
  @apply p-[6px] font-[400];
}

.vti__dropdown-list.below {
  @apply ipad-max:!w-[400px] lg:!w-[250px] 2xl:!w-[340px] rounded-[10px] bg-white border border-[#D9D9D9] top-[52px];
}
.vti__dropdown {
  @apply rounded-[10px] bg-white;
}
.vti__dropdown-item {
  @apply px-[16px] py-2 text-[12px] !font-[Poppins] !font-[300];
}

.vti__dropdown-item.highlighted {
  @apply bg-tamkinLight;
}
.vue-tel-input:focus-within {
  @apply !shadow-none;
}
.vti__selection{
  .vti__flag {
    @apply !w-[30px];
  }
}

</style>
