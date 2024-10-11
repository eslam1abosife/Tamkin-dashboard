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

watch(
  () => props.type,
  (newType) => {
    currentPlan.value = newType;
  }
);
// scrollToSection('types')

const scrollToSection = (sectionId) =>{
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
</script>

<template>
  <div class="w-full">
    <div
      v-if="currentPlan === 'tryit'"
      class="w-full bg-gradient-to-l from-[#A3D9C6A8] via-[#FAECCCA8] to-[#A5D6F2A8] rounded-[10px]
       flex flex-col items-start justify-between h-full p-[15px] relative"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/free_trial.png" alt="" />
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            Free Trial
          </div>
        </div>

        <div class="text-[12px] lg:text-[14px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
          Enjoy a 14-day free trial, where you can translate up to 50 words and 50 minutes
        </div>

        <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/words_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">WORDS</span></div>
          </div>
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/min_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 <span class="font-[500]">Minutes</span></div>
          </div>
        </div>

        <button @click="changePlan('freetrial')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
          {{ $t('Try it Now') }}
        </button>
      </div>

      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute lg:right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div>

    <div
      v-if="currentPlan === 'freetrial'"
      class="w-full bg-gradient-to-l from-[#A3D9C6A8] via-[#FAECCCA8] to-[#A5D6F2A8] rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/free_trial.png" alt="" />
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            Free Trial
          </div>
        </div>

        <div class="text-[12px] lg:text-[14px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
          Enjoy a 14-day free trial, where you can translate up to 50 words and 50 minutes
        </div>

        <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/words_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Words</span></div>
          </div>
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/min_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Minutes</span></div>

          </div>
        </div>

        <button @click="changePlan('freetrial_expired')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
          {{ $t('Upgrade now') }}
        </button>
      </div>

      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div>
    <div
    v-if="currentPlan === 'freetrial_expired'"
    class="w-full  rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
    style="background: linear-gradient(90deg, rgba(212, 177, 248, 0.66) 3%, rgba(161, 206, 203, 0.66) 26.17%, rgba(245, 201, 197, 0.66) 52.17%, rgba(113, 218, 210, 0.66) 78.17%, rgba(165, 214, 242, 0.66) 100%);"
  >
    <div class="flex flex-col items-start justify-between  h-[180px] w-full">
      <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
        <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/free_trial.png" alt="" />
        <div class="text-[20px] font-[600] text-[#3C3F49] leading-[30px]">
          Free Trial
        </div>
      </div>

      <div class="text-[15px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full ipad-max:w-full lg:w-3/4">
        Your free trial has expired. For more words and minutes,
      </div>

      <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img src="/assets/imgs/translatevideo/limited.svg" class="w-[20px] h-[20px]" alt="" />
          <div class="text-[14px] font-[500] text-[#3C3F49]">50 WORDS</div>
        </div>
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img src="/assets/imgs/translatevideo/limited.svg" class="w-[20px] h-[20px]" alt="" />
          <div class="text-[14px] font-[500] text-[#3C3F49]">50 Minutes</div>
        </div>
      </div>

      <button @click="changePlan('pro')" class="btn-dashboard hover_tamkin mt-[8px] w-[158px]">
        {{ $t('Upgrade Now') }}
      </button>
    </div>

    <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
      <div class="relative h-full">
        <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
        <div class="absolute bottom-0 right-0 mr-[15px]">
          <img src="/assets/imgs/translatevideo/star.svg" alt="" />
        </div>
      </div>
      <div class="absolute right-[160px] w-full">
        <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
      </div>
    </div>
  </div>
    <div
      v-if="currentPlan === 'pro'"
      class="w-full rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
      style="background: linear-gradient(90deg, rgba(212, 177, 248, 0.66) 3%, rgba(161, 206, 203, 0.66) 26.17%, rgba(245, 201, 197, 0.66) 52.17%, rgba(113, 218, 210, 0.66) 78.17%, rgba(165, 214, 242, 0.66) 100%);"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/pro.png" alt="" />
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            PRO- Package
          </div>
        </div>

        <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px] font-[400] text-[#021328] leading-[20px] lg:leading-[27px] 
        lg:flex-shrink ipad-max:w-3/4 w-full lg:w-3/4">
          Your available words and minutes have been used up. Please purchase a new package or add more words and minutes to continue using the service
        </div>

        <div class="flex items-center rtl:space-x-reverse space-x-[50px]">
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/words_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Words</span></div>
          </div>
          <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
            <img src="/assets/imgs/translatevideo/min_icon.png" class="w-[25px] h-[25px]" alt="" />
            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Minutes</span></div>
          </div>
        </div>

        <button @click="changePlan('pro_out_credit')" class="btn-dashboard hover_tamkin mt-[8px] !w-[158px]">
          {{$t('Upgrade Now')}}
        </button>
      </div>

      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div>

  

    <div
      v-if="currentPlan === 'pro_out_credit'"
      class="w-full rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
      style="background: linear-gradient(90deg, rgba(212, 177, 248, 0.66) 3%, rgba(161, 206, 203, 0.66) 26.17%, rgba(245, 201, 197, 0.66) 52.17%, rgba(113, 218, 210, 0.66) 78.17%, rgba(165, 214, 242, 0.66) 100%);"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/pro.png" alt="" />
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            PRO- Package
          </div>
        </div>

        <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px]  font-[400] text-[#021328] leading-[20px] lg:leading-[27px] 
        lg:flex-shrink ipad-max:w-3/4 w-full lg:w-3/4">
          You are now on the Pro package. You can utilize the remaining words and minutes in your current plan. To access additional services, consider upgrading to a higher package.
        </div>

        <button @click="changePlan('pro_used')" class="btn-dashboard hover_tamkin w-[158px]">
          {{$t('Upgrade Now')}}
        </button>
      </div>

      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div>

    <div
      v-if="currentPlan === 'pro_used'"
      class="w-full rounded-[10px] flex flex-col items-start justify-between h-full p-[15px] relative"
      style="background: linear-gradient(90deg, rgba(212, 177, 248, 0.66) 3%, rgba(161, 206, 203, 0.66) 26.17%, rgba(245, 201, 197, 0.66) 52.17%, rgba(113, 218, 210, 0.66) 78.17%, rgba(165, 214, 242, 0.66) 100%);"
    >
      <div class="flex flex-col items-start justify-between h-[180px] w-full">
        <div class="flex items-center rtl:space-x-reverse space-x-[10px]">
          <img class="w-[40px] h-[40px]" src="/assets/imgs/translatevideo/pro.png" alt="" />
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            PRO- Package
          </div>
        </div>

        <div class="text-[12px] lg:text-[14px] ipad-max:text-[12px]  font-[400] text-[#021328] leading-[20px] lg:leading-[27px]
         lg:flex-shrink ipad-max:w-3/4 w-full lg:w-3/4">
          Your available words and minutes have been used up. Please purchase a new package or add more words and minutes to continue using the service
        </div>

        <div class="flex items-center rtl:space-x-reverse space-x-[10px] w-full mt-[8px]">
          <button @click="changePlan('pro')" class="btn_bordered_dashboard hover_tamkin lg:!w-[158px]">
            {{ $t('Buy more words') }}
          </button>
          <button @click="changePlan('pro')" class="btn_bordered_dashboard hover_tamkin !p-2 lg:!w-[158px]">
            {{ $t('Buy more Minutes') }}
          </button>
        </div>
      </div>

      <div class="lg:flex hidden absolute rtl:left-0 ltr:right-0 bottom-4 h-full">
        <div class="relative h-full">
          <img src="/assets/imgs/translatevideo/bg_package.svg" class="w-[218px] h-[240px]" alt="" />
          <div class="absolute bottom-0 right-0 mr-[15px]">
            <img src="/assets/imgs/translatevideo/star.svg" alt="" />
          </div>
        </div>
        <div class="absolute right-[160px] w-full">
          <img src="/assets/imgs/translatevideo/plan_vector.svg" class="w-[218px] h-[240px]" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>


