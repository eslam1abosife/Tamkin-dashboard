<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";

import { useGetAllCountries, useChangeMemberInfo } from "@/composables/useProfile";

const { getCountries, countries } = useGetAllCountries();

const { changeMemberInfo } = useChangeMemberInfo();

const profileStore = useProfileStore();


import UAEFLAG from "/assets/imgs/flags/UAE.svg";
import EGYPTFLAG from "/assets/imgs/flags/Element.svg";
import SAUDIFLAG from "/assets/imgs/flags/Vector.svg";

const state = reactive({

    first_name:"",
    last_name:"",
    phone:"",
    country:"",
    // city:"",
    // address:""
});
const rules = {
    first_name: { required },
    last_name:{required},
    phone:{required},
    country:{required},
    // city:{required},
    // address:{required}
};

const emit = defineEmits(['cancelupdate'])

const cancelUpdate = ()=>{
    emit('cancelupdate')
}
const updatePersonalInfo = async () => {

  const isValid = await v$.value.$validate();
  if (isValid) {
    await changeMemberInfo(state);
    emit('cancelupdate')
    profileStore.setMember();
  }
}

const v$ = useVuelidate(rules, state);


// const countries = [
//   { code: "AE", name: "UAE", flag: UAEFLAG,id:1 },
//   { code: "EG", name: "Egypt", flag: EGYPTFLAG,id:2 },
//   { code: "SA", name: "KSA", flag: SAUDIFLAG,id:3 },
// ];

const projectNameArr = [
  { id: 1, name: 'Project 1' },
  { id: 2, name: 'Project 54' },
  { id: 3, name: 'Project 4' },
  { id: 6, name: 'Project 2' },
  { id: 4, name: 'Project 166' },
  { id: 7, name: 'Project 5' }
];
const handleSelectedItemProjectName = (item: any) => {
  state.country = item.name;
  console.log(item)
};

onMounted(async () => {
  await getCountries();
});
</script>

<template>

<div class="w-full">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4  w-full !mt-[32px] ">
       

        <div class="w-full relative ">
            <input type="text" id="first_name" placeholder="" class="input_floating_label peer w-full"
              v-model="v$.first_name.$model" :class="{
          input_error:
            (v$.first_name.$error && v$.first_name.required.$invalid),
          input_success: !v$.first_name.$error && !v$.first_name.$invalid,
        }" />
            <label for="first_name" class="floating_label" :class="[
          (v$.first_name.$error && v$.first_name.required.$invalid)
            ? '!text-error'
            : '',
        ]">
              {{ $t("firstName") }}*
            </label>
            <div class="w-full lg:w-4/6 " v-if="(v$.first_name.$error && v$.first_name.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.first_name.$error && v$.first_name.required.$invalid">{{ $t("Please enter The First Name")
                  }}</span>
    
              </p>
            </div>
          </div>

          <div class="w-full relative ">
            <input type="text" id="last_name" placeholder="" class="input_floating_label peer w-full"
              v-model="v$.last_name.$model" :class="{
          input_error:
            (v$.last_name.$error && v$.last_name.required.$invalid),
          input_success: !v$.last_name.$error && !v$.last_name.$invalid,
        }" />
            <label for="last_name" class="floating_label" :class="[
          (v$.last_name.$error && v$.last_name.required.$invalid)
            ? '!text-error'
            : '',
        ]">
              {{ $t("lastName") }}*
            </label>
            <div class="w-full lg:w-4/6 " v-if="(v$.last_name.$error && v$.last_name.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.last_name.$error && v$.last_name.required.$invalid">{{ $t("Please enter The Last Name")
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


            <TranslateSelectInput 
              @getCurrentSelectedItem="handleSelectedItemProjectName" 
              :enableSearch="true" 
              placeholderinput="Country*" 
              :errorField="v$.country.$error && v$.country.required.$invalid" 
              :list="countries" nameKey="name" idField="name"
              iconKey="image" 
              :successField="!v$.country.$error && !v$.country.$invalid"
            />

            <div class="w-full lg:w-4/6 " v-if="(v$.country.$error && v$.country.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.country.$error && v$.country.required.$invalid">{{ $t("Please enter The Country")
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

      <div class="flex items-end justify-end space-x-[16px] absolute bottom-[24px]  right-[30px]">

        <button class="btn_bordered_dashboard" @click="cancelUpdate">Cancel</button>
        <button class="btn-dashboard hover_tamkin w-[125px]" @click="updatePersonalInfo">Update</button>
      </div>
</div>

</template>