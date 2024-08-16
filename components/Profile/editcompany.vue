<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import UAEFLAG from "/assets/imgs/flags/UAE.svg";
import EGYPTFLAG from "/assets/imgs/flags/Element.svg";
import SAUDIFLAG from "/assets/imgs/flags/Vector.svg";
const state = reactive({

    company:"",
    phone:"",
    country:"",
    city:"",
address:"",
companyfield:""

});
const rules = {
company:{required},
phone:{required},
country:{required},
city:{required},
address:{required},
companyfield:{required}



};

const emit = defineEmits(['cancelupdate'])

const cancelUpdate = ()=>{
    emit('cancelupdate')
}
const v$ = useVuelidate(rules, state);

const countries = [
  { code: "AE", name: "UAE", flag: UAEFLAG,id:1 },
  { code: "EG", name: "Egypt", flag: EGYPTFLAG,id:2 },
  { code: "SA", name: "KSA", flag: SAUDIFLAG,id:3 },
];

const handleSelectedItemProjectName = (item: any) => {
  console.log(item)
};
</script>

<template>

<div class="w-full h-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4  w-full !mt-[32px] ">
       


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


            <TranslateSelectInput @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="true" 
            placeholderinput="Country*" 
            iconKey="flag" 
            :errorField="v$.country.$error && v$.country.required.$invalid" :list="countries" nameKey="name" idField="id" 
            
            :successField="!v$.country.$error && !v$.country.$invalid"
            />
            
                        <div class="w-full lg:w-4/6 " v-if="(v$.country.$error && v$.country.required.$invalid)">
                          <p class="error_message">
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


            <TranslateSelectInput @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="false" 
            placeholderinput="Company specialization*" 
            
            :errorField="v$.companyfield.$error && v$.companyfield.required.$invalid" :list="countries" nameKey="name" idField="id" 
            
            :successField="!v$.companyfield.$error && !v$.companyfield.$invalid"
            />
            
                        <div class="w-full lg:w-4/6 " v-if="(v$.companyfield.$error && v$.companyfield.required.$invalid)">
                          <p class="error_message">
                            <span v-if="v$.companyfield.$error && v$.companyfield.required.$invalid">{{ $t("Please enter The Company Specialization")
                              }}</span>
                
                          </p>
                        </div>
                      </div>

     

        
      </div>

      <div class="flex items-end justify-end space-x-[16px] absolute bottom-[24px]  right-[30px]">

        <button class="btn_bordered_dashboard" @click="cancelUpdate">Cancel</button>
        <button class="btn-dashboard hover_tamkin w-[125px]">Update</button>
      </div>
</div>

</template>