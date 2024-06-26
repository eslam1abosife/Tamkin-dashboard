<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
const state = reactive({
    firstName: "",
    lastName: "",
    cardNumber: "",
    cvv: "",
    expireDate: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
});
const rules = {
  firstName: { required },
  lastName: { required },
  cardNumber: { required },
  cvv: { required },
  expireDate:{required},
  address:{required},
  city:{required},
  state:{required},
  zip:{required},
  country:{required},
};

const v$ = useVuelidate(rules, state);

</script>

<template>
  <div class="flex flex-col items-start justify-center w-full">
  
    <div class="flex items-center justify-center ">
        <div
   
    class="cursor-pointer  flex items-center justify-center  bg-white border-[1px]
   border-linecolor rounded-full w-[30px] h-[30px]"

   style="box-shadow: 0px 4px 8.7px 0px #DAF3F1;
"
  >
    <svg
      width="9"
      height="15"
      viewBox="0 0 9 15"
      fill="none"
      class="fill-tamkin group-hover:stroke-white group-hover:fill-white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.27231 7.5L9 12.9447L7.36385 14.5L0 7.5L7.36385 0.499998L9 2.05531L3.27231 7.5Z"
      />
    </svg>
  </div>
    <h1 class="text-[24px] leading-[36px] font-[600] text-darkGrey ml-[20px] lg:mt-0 mt-[60px]">
        Billing Info
    </h1>
    </div>
    <div
      class="flex flex-col items-start justify-center bg-white  w-full h-full rounded-[10px] mt-[33px] mb-[87px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
    >
      <h1
        class="text-[24px] leading-[36px] font-[600] ml-[20px] text-darkGrey mt-[31px]"
      >
      Billing Info
      </h1>
    

<div class="flex flex-col items-center justify-center  ml-[20px]" >

    <div class="flex items-center justify-start mt-[21px] space-x-[42px]">
        <div class="w-[330px]">
       
        
            <div class=" relative">
                <input type="email" placeholder="{{$t('email')}}" id="email" class="input_floating_label peer w-[330px]"
                  v-model="v$.firstName.$model" :class="{
              input_error:
                (v$.firstName.$error && v$.firstName.required.$invalid),
              input_success: !v$.firstName.$error && !v$.firstName.$invalid,
            }" />
                <label for="email" class="floating_label" :class="[
              (v$.firstName.$error && v$.firstName.required.$invalid)
                ? '!text-error'
                : '',
            ]">
                  {{ $t("email") }}*
                </label>
                <div class="w-full lg:w-4/6 mt-2" v-if="(v$.firstName.$error && v$.firstName.required.$invalid)">
                  <p class="error_message">
                    <span v-if="v$.firstName.$error && v$.firstName.required.$invalid">{{ $t("email_address_is_required")
                      }}</span>
                   
                  </p>
                </div>
              </div>
           
    
    
       </div>
       <div class="w-[330px]">
       
        
        <div class=" relative">
            <input type="email" placeholder="{{$t('email')}}" id="email" class="input_floating_label peer w-[330px]"
              v-model="v$.firstName.$model" :class="{
          input_error:
            (v$.firstName.$error && v$.firstName.required.$invalid),
          input_success: !v$.firstName.$error && !v$.firstName.$invalid,
        }" />
            <label for="email" class="floating_label" :class="[
          (v$.firstName.$error && v$.firstName.required.$invalid)
            ? '!text-error'
            : '',
        ]">
              {{ $t("email") }}*
            </label>
            <div class="w-full lg:w-4/6 mt-2" v-if="(v$.firstName.$error && v$.firstName.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.firstName.$error && v$.firstName.required.$invalid">{{ $t("email_address_is_required")
                  }}</span>
               
              </p>
            </div>
          </div>
       
    
    
    </div>
     </div>
     <div class="w-[704px]  mt-[25px]">
       
        
        <div class=" relative">
            <input type="email" placeholder="{{$t('email')}}" id="email" class="input_floating_label peer w-[704px]"
              v-model="v$.firstName.$model" :class="{
          input_error:
            (v$.firstName.$error && v$.firstName.required.$invalid),
          input_success: !v$.firstName.$error && !v$.firstName.$invalid,
        }" />
            <label for="email" class="floating_label" :class="[
          (v$.firstName.$error && v$.firstName.required.$invalid)
            ? '!text-error'
            : '',
        ]">
              {{ $t("email") }}*
            </label>
            <div class="w-full lg:w-4/6 mt-2" v-if="(v$.firstName.$error && v$.firstName.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.firstName.$error && v$.firstName.required.$invalid">{{ $t("email_address_is_required")
                  }}</span>
               
              </p>
            </div>
          </div>
       
    
    
    </div>
</div>


 <h1
 class="text-[24px] leading-[36px] font-[600] ml-[20px] text-darkGrey mt-[31px]"
>
Billing Info
</h1>




 
 <table class="min-w-full ">
    <thead>
      <tr>
        <th
          class="py-2 pl-[20px] border-b text-[20px] leading-[30px] text-darkGrey font-[600] text-left"
        colspan="12">
        Summary
        </th>
      
      </tr>
    </thead>
    <tbody>
    
    
      <tr class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE]"           v-if="validPromo"
      >
        <td
          class="py-2 px-5 border-b text-right font-semibold w-full"
          colspan="2"
        >
          Subtotal
        </td>
        <td class="py-2 px-5 border-b text-right w-full" colspan="2">
          $50,444.00
        </td>
      </tr>
      <tr           v-if="validPromo"
       class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE]">
        <td
          class="py-2 px-5 border-b text-right font-semibold w-full"
          colspan="2"
        >
        Discount
        </td>
        <td class="py-2 px-5 border-b text-right w-full" colspan="2">
          $50,444.00
        </td>
      </tr>
      <tr class="text-[16px] leading-[24px] font-[600] bg-[#FAFCFE]">
        <td
          class="py-2 px-5 border-b text-right font-semibold w-full"
          colspan="2"
        >
          Total
        </td>
        <td class="py-2 px-5 border-b text-right w-full" colspan="2">
          $50,444.00
        </td>
      </tr>
    </tbody>
    </table>
   <div class="mt-[39px]  mx-auto mb-[34px]">
    <button class="btn-dashboard no_hover   lg:w-[535px] w-full " disabled>
      Confirm Payment
    </button>
  </div>
   <!-- <div class="mt-[129px]  mx-auto mb-[34px]">
    <button class="processing_payment   lg:w-[535px] w-full " disabled>
      Payment Processing...
    </button>
  </div> -->
    </div>
 
  </div>
</template>


