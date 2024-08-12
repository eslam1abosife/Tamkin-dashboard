<script lang="ts" setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  type: {
    type: String,
  },
  mediaType:String
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
  <div class="w-full !mt-[120px] mb-[30px]" >
    <div
      v-if="currentPlan === 'freetrial'"
      class="w-full bg-gradient-to-r from-[#778096] via-[#AA98A2] to-[#ECC1BF] rounded-[10px] 
      flex flex-col items-start justify-between h-full p-[15px] relative"
    >
    <div class="flex flex-col items-start justify-between h-[180px] w-full">
      <div class="flex items-center space-x-[10px]">
        <img class="w-[40px] h-[40px]" src="/assets/imgs/signlanguageservices/freetrial.png" alt="" />
        <div class="text-[16px] lg:text-[18px] font-[600] text-white leading-[30px]">
          Free Trial
        </div>
      </div>

      <div class="text-[14px] lg:text-[18px] ipad-max:text-[14px]  ipad-max:w-2/4 font-[600] text-white
      lg:leading-[33px] leading-[20px] w-full lg:w-2/4">
        Enjoy a 14-day free trial, where you can translate up to 50 words and 50 minutes
      </div>

 

      <button @click="changePlan('pro')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
        Try it Now
      </button>
    </div>

    <div class="lg:flex hidden absolute right-[100px] inset-y-[0] h-full ">

     
         <div class="relative h-full z-[10]">
          
        <img src="/assets/imgs/signlanguageservices/hero.png"               class="w-[222px] h-[163px]"
         alt="" />
   
      </div>
      <div class="absolute lg:right-[350px] ipad-max:right-[250px] bottom-[3px] w-full">
        <img src="/assets/imgs/signlanguageservices/vector.png" class="w-[202px]  h-[202px] opacity-15" alt="" />
       
      </div>
      <div class="absolute lg:right-[0] ipad-max:right-[0] bottom-[14px] w-[287px]">

      <img src="/assets/imgs/signlanguageservices/translate_audiobanner.png" class="w-[287px]  h-[47px] " alt="" />
    </div>
</div>
    </div>


    <div v-if="currentPlan === 'pro'" class="w-full  rounded-[10px] 

    flex flex-col items-start justify-between h-full p-[15px] relative"
              :class="[mediaType === 'media' ? 'bg-gradient-to-r from-[#778096] via-[#AA98A2] to-[#ECC1BF]' : mediaType === 'docs' ? 'bg-[#DEE4F9]' : 'bg-gradient-to-r from-[#D6D4F4] via-[#EBE2EA] to-[#FFEFE0]']">
              <div class="flex flex-col items-start justify-between h-[180px] w-full">
                  <div class="flex items-center space-x-[10px]">
                      <img class="w-[40px] h-[40px]" src="/assets/imgs/signlanguageservices/pro_plan.png" alt="" />
                      <div class="text-[16px] lg:text-[18px] font-[600] leading-[30px]"
                          :class="[mediaType === 'docs' || mediaType === 'photos' ? 'text-darkGrey' : 'text-white']">
                          PRO- Package
                      </div>
                  </div>
  
                  <div class="text-[14px] lg:text-[18px] ipad-max:text-[14px]  ipad-max:w-2/4 
    lg:leading-[33px] leading-[20px] w-full lg:w-2/4"
                      :class="[mediaType === 'docs' ? 'text-darkGrey font-[500] ' : mediaType === 'media' ? 'text-white font-[600]' : 'text-darkGrey font-[500]' ]">
                      You are currently on PRO- Package                  </div>
  
  
  
                  <button @click="changePlan('freetrial')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
                      Try it Now
                  </button>
              </div>
  
              <div class="lg:flex hidden absolute right-[100px] inset-y-[0] h-full " v-if="mediaType === 'media'">
  
  
                  <div class="relative h-full z-[10]">
  
                      <img src="/assets/imgs/signlanguageservices/hero.png" class="w-[222px] h-[163px]" alt="" />
  
                  </div>
                  <div class="absolute lg:right-[350px] ipad-max:right-[250px] bottom-[3px] w-full">
                      <img src="/assets/imgs/signlanguageservices/vector.png" class="w-[202px]  h-[202px] opacity-15"
                          alt="" />
  
                  </div>
                  <div class="absolute lg:right-[0] ipad-max:right-[0] bottom-[14px] w-[287px]">
  
                      <img src="/assets/imgs/signlanguageservices/translate_audiobanner.png" class="w-[287px]  h-[47px] "
                          alt="" />
                  </div>
              </div>
  
              <div class="lg:flex hidden absolute right-[150px] inset-y-auto h-full " v-if="mediaType === 'docs'">
  
  
                  <div class="relative h-full z-[10]">
  
                      <img src="/assets/imgs/signlanguageservices/word_hero.png" class="w-[351px] h-[163px]" alt="" />
  
                  </div>
                  <div class="absolute right-[-300px] top-[20px] w-full space-y-[50px]">
                      <div
                          class="rotate-6 w-[156px] h-[36px] flex items-center justify-center bg-white rounded-[5px] text-[16px] leading-[19px] font-[400] text-[#49545F]">
                          Translate Word
                      </div>
  
                      <div
                          class="-rotate-6 w-[156px] h-[36px] flex items-center justify-center bg-white rounded-[5px] text-[16px] leading-[19px] font-[400] text-[#49545F]">
                          Translate PDF
                      </div>
                  </div>
  
              </div>
              <div class="lg:flex hidden absolute right-[0] inset-y-auto h-full " v-if="mediaType === 'photos'">
  
  
                  <div class="relative h-full z-[10]">
  
                      <img src="/assets/imgs/signlanguageservices/hero_photos.png" class="w-[273px] h-[182px]" alt="" />
  
                  </div>
                  <div class="absolute right-[400px] top-[-15px] w-full space-y-[50px]">
                      <img src="/assets/imgs/signlanguageservices/vector_photos.png" alt="">
                  </div>
  
              </div>
          </div>


  <div
  v-if="currentPlan === 'plat'"
  class="w-full bg-gradient-to-r from-[#308580] via-[#5EA4A0] to-[#9ACECA] rounded-[10px] 
  flex flex-col items-start justify-between h-full pb-[10px] pt-[5px] px-[10px] relative"
>
<div class="flex flex-col items-start justify-between h-[180px] w-full">
  <div class="flex items-center space-x-[10px]">
    <img class="w-[49px] h-[55px]" src="/assets/imgs/signlanguageservices/plat_icon.png" alt="" />
    <div class="text-[16px] lg:text-[18px] font-[600] text-white leading-[30px]">
      Platinum
    </div>
  </div>

  <div class="text-[14px] lg:text-[15px] ipad-max:text-[14px]  ipad-max:w-2/4 font-[500] text-white
  lg:leading-[27px] leading-[20px] w-full lg:w-2/4 drop-shadow-lg">
  In this package, you can translate videos, audio, and images, as well as your Word, PDF, and image files
  </div>

<div class="flex items-center justify-start space-x-[24px]" >
  <div class="flex items-center justify-center">
    <div>
      <img src="/assets/imgs/signlanguageservices/package_star.png" class="w-[30px] h-[30px] block m-0 p-0" alt="">
    </div>
<div class="text-whiteTamkin font-[600] text-[15px] leading-[22px]">
  Media 
</div>
  </div>
  <div class="flex items-center justify-center">
    <div>
      <img src="/assets/imgs/signlanguageservices/package_star.png" class="w-[30px] h-[30px] block m-0 p-0" alt="">
    </div>
<div class="text-whiteTamkin font-[600] text-[15px] leading-[22px]">
  Documents   
</div>
  </div>
  <div class="flex items-center justify-center">
    <div>
      <img src="/assets/imgs/signlanguageservices/package_star.png" class="w-[30px] h-[30px]" alt="">
    </div>
<div class="text-whiteTamkin font-[600] text-[15px] leading-[22px]">
  Images   
</div>
  </div>
</div>
<div class="flex items-center justify-start space-x-[24px]" >
  <div class="flex items-center justify-center space-x-[8px]">
    <div>
      <img src="/assets/imgs/signlanguageservices/words_icon.png" class="w-[24px] h-[35px] block m-0 p-0" alt="">
    </div>
<div class="text-whiteTamkin font-[600] text-[18px] leading-[33px]">
  5000 Words
</div>
  </div>

  <div class="flex items-center justify-center space-x-[8px]">
    <div>
      <img src="/assets/imgs/signlanguageservices/charac_icon.png" class="w-[24px] h-[35px] block m-0 p-0" alt="">
    </div>
<div class="text-whiteTamkin font-[600] text-[18px] leading-[33px]">
  3000 Character
</div>
  </div>

  <div class="flex items-center justify-center space-x-[8px]">
    <div>
      <img src="/assets/imgs/signlanguageservices/clock_icon.png" class="w-[27px] h-[35px] block m-0 p-0" alt="">
    </div>
<div class="text-whiteTamkin font-[600] text-[18px] leading-[33px]">
  60 Minutes
</div>
  </div>
</div>

</div>

<div class="lg:flex hidden absolute right-[0] inset-y-auto h-full ">

 
     <div class="relative h-full z-[10]">
      
    <img src="/assets/imgs/signlanguageservices/hand_gift.png"               class="w-[222px] h-[163px]"
     alt="" />

  </div>


</div>
</div>
  </div>
</template>
