<script lang="ts" setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  type: {
    type: String,
  },
});
const emit = defineEmits(["changePlan"]);

const currentPlan = ref(props.type);

const changePlan = (data: string) => {
  currentPlan.value = data;
  emit("changePlan", data);
};

// Watch for changes in the prop to update the local state
watch(
  () => props.type,
  (newType) => {
    currentPlan.value = newType;
  }
);


</script>

<template>
  <div class="w-full">
    <div
      v-if="currentPlan === 'freetrial'"
      class="w-full bg-gradient-to-bl from-[#B0E2E9] via-[#FCDEDE] to-[#B1E3EA] rounded-[10px] 
      flex flex-col items-start justify-between h-full p-[15px] relative"
    >
    <div class="flex flex-col items-start justify-between h-[180px] w-full">
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/free_trial.png" alt="" />
        <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
          Free Trial
        </div>
      </div>

      <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px] ipad-max:w-2/4 font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
        Enjoy a 14-day free trial, where you can translate up to 50 words and 50 minutes
      </div>

      <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
        <div class="flex items-center ">
          <img src="/assets/imgs/translatedocs/words.svg"                   class="w-[40px] h-[40px] object-cover object-center block m-0 p-0" 
          alt="" />
          <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">WORDS</span></div>
        </div>
        <div class="flex items-center ">
          <img src="/assets/imgs/translatedocs/chars.svg"                   class="w-[40px] h-[40px] object-cover object-center block m-0 p-0" 
          alt="" />
          <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">Character</span></div>
        </div>
      </div>

      <button @click="changePlan('freetrial_begin')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
        {{ $t('Try it Now') }}
      </button>
    </div>

    <div class="lg:flex hidden absolute rtl:left-0 ltr:right-[0] top-[-6px] h-full ">

     
         <div class="relative h-full z-[10]">
          
        <img src="/assets/imgs/translatedocs/hero.svg"               class="w-[304px] h-[220px]"
         alt="" />
   
      </div>
      <div class="absolute lg:right-[350px] ipad-max:right-[250px] ipad-max:top-32 bottom-4 w-full">
        <img src="/assets/imgs/translatedocs/welcome.svg" class="w-full  h-full" alt="" />
      </div>
    </div>
    </div>
    <div
    v-if="currentPlan === 'freetrial_begin'"
    class="w-full bg-gradient-to-bl from-[#B0E2E9] via-[#FCDEDE] to-[#B1E3EA] rounded-[10px] 
    flex flex-col items-start justify-between h-full p-[15px] relative"
  >
  <div class="flex flex-col items-start justify-between h-[180px] w-full">
    <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
      <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/free_trial.png" alt="" />
      <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
        Free Trial
      </div>
    </div>

    <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px] ipad-max:w-2/4 font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
      Enjoy a 14-day free trial, where you can translate up to 50 words and 50 minutes
    </div>

    <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
      <div class="flex items-center ">
        <img src="/assets/imgs/translatedocs/words.svg"                   class="w-[40px] h-[40px] object-cover object-center block m-0 p-0" 
        alt="" />
        <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">WORDS</span></div>
      </div>
      <div class="flex items-center ">
        <img src="/assets/imgs/translatedocs/chars.svg"                   class="w-[40px] h-[40px] object-cover object-center block m-0 p-0" 
        alt="" />
        <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Character</span></div>
      </div>
    </div>

    <button @click="changePlan('freetrial_Ex')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
    {{ $t('Upgrade now') }}
    </button>
  </div>

  <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0-bottom-[6px]  h-full">
    <div class="relative h-full">
      <img src="/assets/imgs/translatedocs/hero.svg"                    class="w-[250px] h-[200px]"
       alt="" />
 
    </div>
    <div class="absolute lg:right-[350px] ipad-max:right-[250px] ipad-max:top-32 bottom-4 w-full">
      <img src="/assets/imgs/translatedocs/welcome.svg" class="w-full  h-full" alt="" />
    </div>
  </div>
  </div>
    <div
    v-if="currentPlan === 'freetrial_Ex'"
    class="w-full bg-gradient-to-bl from-[#B0E2E9] via-[#FCDEDE] to-[#B1E3EA] rounded-[10px] 
    flex flex-col items-start justify-between h-full p-[15px] relative"
  >
  <div class="flex flex-col items-start justify-between h-[180px] w-full">
    <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
      <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/free_trial.png" alt="" />
      <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
        Free Trial
      </div>
    </div>

    <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px] ipad-max:w-2/4 font-[400] 
    text-[#021328] w-full lg:w-3/4">
      Your free trial has expired. For more words and characters, you can purchase the package
    </div>

    <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <img src="/assets/imgs/translatedocs/limited.svg" class="w-[19px] h-[19px]" alt="" />
        <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">WORDS</span></div>
      </div>
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <img src="/assets/imgs/translatedocs/limited.svg" class="w-[19px] h-[19px]" alt="" />
        <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">Character</span></div>
      </div>
    </div>

    <button @click="changePlan('pro_pack')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
    {{ $t('Upgrade now') }}
    </button>
  </div>

  <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0-bottom-[6px]  h-full">
    <div class="relative h-full">
      <img src="/assets/imgs/translatedocs/hero.svg"                    class="w-[250px] h-[200px]"
       alt="" />
 
    </div>
    <div class="absolute lg:right-[350px] ipad-max:right-[250px] ipad-max:top-32 bottom-4 w-full">
      <img src="/assets/imgs/translatedocs/welcome.svg" class="w-full  h-full" alt="" />
    </div>
  </div>
  </div>
  <div
    v-if="currentPlan === 'pro_pack'"
    class="w-full bg-gradient-to-bl from-[#B0E2E9] via-[#FCDEDE] to-[#B1E3EA] rounded-[10px] 
    flex flex-col items-start justify-between h-full p-[15px] relative"
  >
  <div class="flex flex-col items-start justify-between h-[180px] w-full">
    <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
      <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/pro.png" alt="" />
      <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
        PRO- Package 
      </div>
    </div>

    <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px] ipad-max:w-2/4 font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
      You are now on the Pro package. You can utilize the remaining words and character in your current plan. To access additional services, consider upgrading to a higher package.    </div>

    <!-- <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <img src="/assets/imgs/translatedocs/limited.svg" class="w-[19px] h-[19px]" alt="" />
        <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">WORDS</span></div>
      </div>
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <img src="/assets/imgs/translatedocs/limited.svg" class="w-[19px] h-[19px]" alt="" />
        <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">Character</span></div>
      </div>
    </div> -->

    <button @click="changePlan('pro_used')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
      {{ $t('Upgrade now') }}
    </button>
  </div>

  <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0-bottom-[6px]  h-full">
    <div class="relative h-full">
      <img src="/assets/imgs/translatedocs/hero.svg"                    class="w-[250px] h-[200px]"
       alt="" />
 
    </div>
    <div class="absolute lg:right-[350px] ipad-max:right-[250px] ipad-max:top-32 bottom-4 w-full">
      <img src="/assets/imgs/translatedocs/welcome.svg" class="w-full  h-full" alt="" />
    </div>
  </div>
  </div>
 
  <div
    v-if="currentPlan === 'pro_used'"
    class="w-full bg-gradient-to-bl from-[#B0E2E9] via-[#FCDEDE] to-[#B1E3EA] rounded-[10px] 
    flex flex-col items-start justify-between h-full p-[15px] relative"
  >
  <div class="flex flex-col items-start justify-between h-[180px] w-full">
    <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
      <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/pro.png" alt="" />
      <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
        PRO- Package 
      </div>
    </div>

    <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px] ipad-max:w-2/4 font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
      Your available words and character have been used up. Please purchase a new package or add more words and character to continue using the service      </div>

    
    
      <div class="flex items-center rtl:space-x-reverse space-x-[10px] w-full mt-[8px]">
        <button
        @click="changePlan('freetrial')"
        class="btn_bordered_dashboard hover_tamkin  lg:!w-auto"
      >
      {{ $t('Buy more words') }}
      </button>
      <button
      @click="changePlan('pro_pack')"
      class="btn_bordered_dashboard hover_tamkin  !p-2 lg:!w-auto "
    >
    {{ $t('Buy more Minutes') }}
    </button>
      </div>
  </div>

  <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0-bottom-[6px]  h-full">
    <div class="relative h-full">
      <img src="/assets/imgs/translatedocs/hero.svg"                    class="w-[250px] h-[200px]"
       alt="" />
 
    </div>
    <div class="absolute lg:right-[350px] ipad-max:right-[250px] ipad-max:top-32 bottom-4 w-full">
      <img src="/assets/imgs/translatedocs/welcome.svg" class="w-full  h-full" alt="" />
    </div>
  </div>
  </div>

  </div>
</template>
