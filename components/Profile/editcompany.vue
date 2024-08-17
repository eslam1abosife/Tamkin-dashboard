<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";

import { useGetAllCountries, useGetAllCompanySpecializations, useChangeCompanyInfo } from "@/composables/useProfile";

const { getCountries, countries } = useGetAllCountries();
const { getAllCompanySpecializations, companySpecializations } = useGetAllCompanySpecializations();
const { changeCompanyInfo } = useChangeCompanyInfo();

const profileStore = useProfileStore();

const state = reactive({

    company:"",
    country:"",
    phone:"",
    company_specialization:""
    // city:"",
    // address:"",

});
const rules = {
company:{required},
phone:{required},
country:{required},
// city:{required},
// address:{required},
company_specialization:{required}



};

const emit = defineEmits(['cancelupdate'])

const cancelUpdate = ()=>{
    emit('cancelupdate')
}

const updateCompanyInfo = async () => {

  const isValid = await v$.value.$validate();
  if (isValid) {
    await changeCompanyInfo(state);
    await profileStore.updateProfileAbout();
    await profileStore.setCompany();
    emit('cancelupdate')
  }
}

const v$ = useVuelidate(rules, state);

// const countries = [
//   { code: "AE", name: "UAE", flag: UAEFLAG,id:1 },
//   { code: "EG", name: "Egypt", flag: EGYPTFLAG,id:2 },
//   { code: "SA", name: "KSA", flag: SAUDIFLAG,id:3 },
// ];

// const handleSelectedItemProjectName = (item: any) => {
//   state.country = item.name;
//   console.log(item)
// };

const handleSelectedCountry = (item: any) => {
  state.country = item.name;
  console.log(item)
};

const handleSelectedSpecialization = (item: any) => {
  state.company_specialization = item.name;
  console.log(item)
};

onMounted(async () => {
  await getCountries();
  await getAllCompanySpecializations();
});
</script>

<template>

<div class="w-full h-full">
    <div class="grid grid-cols-1 ipad-max:grid-cols-1 md:grid-cols-2 gap-4  w-full !mt-[32px] ">
       


          <div class="w-full relative ">
            <input type="text" id="company" placeholder="" class="input_floating_label peer w-full"
              v-model="v$.company.$model" :class="{
          input_error:
            (v$.company.$error && v$.company.required.$invalid),
          input_success: !v$.company.$error && !v$.company.$invalid,
        }" />
            <label for="company" class="floating_label" :class="[
          (v$.company.$error && v$.company.required.$invalid)
            ? '!text-error'
            : '',
        ]">
              {{ $t("Company") }}*
            </label>
            <div class="w-full lg:w-4/6 " v-if="(v$.company.$error && v$.company.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.company.$error && v$.company.required.$invalid">{{ $t("Please enter The Company Name")
                  }}</span>
    
              </p>
            </div>
          </div>

          <div class="w-full relative ">


            <TranslateSelectInput 
              @getCurrentSelectedItem="handleSelectedCountry" 
              :enableSearch="true" 
              placeholderinput="Country*" 
              :errorField="v$.country.$error && v$.country.required.$invalid" 
              :list="countries" nameKey="name" idField="name"
              iconKey="image"
              :successField="!v$.country.$error && !v$.country.$invalid"

            />
            
                        <div class="w-full lg:w-4/6  " v-if="(v$.country.$error && v$.country.required.$invalid)">
                          <p class="error_message " >
                            <span v-if="v$.country.$error && v$.country.required.$invalid">{{ $t("Please enter The Country")
                              }}</span>
                
                          </p>
                        </div>
                      </div>
          <div class="w-full relative ">
            <input type="number" id="phone" placeholder="" class="input_floating_label peer w-full"
              v-model="v$.phone.$model" :class="{
          input_error:
            (v$.phone.$error && v$.phone.required.$invalid),
          input_success: !v$.phone.$error && !v$.phone.$invalid,
        }" />
            <label for="phone" class="floating_label" :class="[
          (v$.phone.$error && v$.phone.required.$invalid)
            ? '!text-error'
            : '',
        ]">
              {{ $t("Phone Number") }}*
            </label>
            <div class="w-full lg:w-4/6 " v-if="(v$.phone.$error && v$.phone.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.phone.$error && v$.phone.required.$invalid">{{ $t("Please enter The Phone number")
                  }}</span>
    
              </p>
            </div>
          </div>

          <div class="w-full relative ">


            <TranslateSelectInput @getCurrentSelectedItem="handleSelectedSpecialization" :enableSearch="false" 
            placeholderinput="Company specialization*" 
            
            :errorField="v$.company_specialization.$error && v$.company_specialization.required.$invalid" :list="companySpecializations" nameKey="name" idField="name" 
            
            :successField="!v$.company_specialization.$error && !v$.company_specialization.$invalid"
            />
            
                        <div class="w-full lg:w-4/6 " v-if="(v$.company_specialization.$error && v$.company_specialization.required.$invalid)">
                          <p class="error_message">
                            <span v-if="v$.company_specialization.$error && v$.company_specialization.required.$invalid">{{ $t("Please enter The Company Specialization")
                              }}</span>
                
                          </p>
                        </div>
                      </div>

     

        
      </div>

      <div class="flex items-end justify-end space-x-[16px] absolute bottom-[24px]  right-[30px]">

        <button class="btn_bordered_dashboard" @click="cancelUpdate">Cancel</button>
        <button class="btn-dashboard hover_tamkin w-[125px]" @click="updateCompanyInfo" >Update</button>
      </div>
</div>


</template>