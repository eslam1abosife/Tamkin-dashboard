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
      class="w-full bg-gradient-to-l from-[#3B68A4] via-[#9CB2D3] to-[#ECEEF9] rounded-[10px] 
      flex flex-col items-start justify-center "
    >
      <div class="h-[200px] flex items-center justify-between w-full relative">
        <div class="absolute left-[30%] bottom-[10px] ">
            <img
              src="/assets/imgs/translatephotos/vector.png"
              class="w-[134px] h-[124px] opacity-20 "
              alt=""
            />
          </div>
          <div class="absolute left-[50%] bottom-[-80px] ">
          <div class="bg-white bg-opacity-40 w-[150px] h-[150px] rounded-full">

          </div>
          </div>
        <div class="flex flex-col items-start justify-center px-[15px]">
          <div class="flex items-center space-x-[10px]">
            <div>
              <img
                class="w-[40px] h-[40px]"
                src="/assets/imgs/translatevideo/free_trial.png"
                alt=""
              />
            </div>
            <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
              Free Trial
            </div>
          </div>

          <div class="text-[12px] lg:text-[15px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
            Enjoy a 14-day free trial, where you can translate up to 50 words and 50
            minutes
          </div>

          <div
          class=" h-[35px] flex items-center justify-start space-x-[25px] "
          >
            <div class="flex items-center justify-start">
              <div>
                <img
                  src="/assets/imgs/translatedocs/words.svg"
                  class="w-[40px] h-[40px] object-cover object-center block m-0 p-0"
                  alt=""
                />
              </div>

              <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Words</span></div>
            </div>
            <div class="flex items-center justify-start ">
              <div>
                <img
                  src="/assets/imgs/translatedocs/chars.svg"
                  class="w-[40px] h-[40px] object-cover object-center block m-0 p-0" 
                  alt=""
                />
              </div>

              <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]">Characters</span></div>
            </div>
          </div>

          <button
            @click="changePlan('freetrial_Ex')"
            class="btn-dashboard hover_tamkin mt-[8px] w-[158px] "
          >
            Upgrade now
          </button>
        </div>
   
        <div class="lg:flex hidden  items-center ">
  
          <div class="w-full h-full relative mt-[40px] ">
       
            <img
              src="/assets/imgs/translatephotos/hero.png"
              class="w-[348px] h-[225px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentPlan === 'freetrial_Ex'"
      class="w-full bg-gradient-to-l from-[#3B68A4] via-[#9CB2D3] to-[#ECEEF9] rounded-[10px] 
      flex flex-col items-start justify-center "
    >
      <div class="h-[200px] flex items-center justify-between w-full relative">
        <div class="absolute left-[30%] bottom-[10px] ">
            <img
              src="/assets/imgs/translatephotos/vector.png"
              class="w-[134px] h-[124px] opacity-20 "
              alt=""
            />
          </div>
        <div class="flex flex-col items-start justify-center px-[15px]">
          <div class="flex items-center space-x-[10px]">
            <div>
              <img
                class="w-[40px] h-[40px]"
                src="/assets/imgs/translatevideo/free_trial.png"
                alt=""
              />
            </div>
            <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
              Free Trial
            </div>
          </div>

          <div class="text-[12px] lg:text-[15px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
            Your free trial has expired. For more words and characters, you can purchase the package
          </div>

          <div
          class=" h-[35px] flex items-center justify-start space-x-[25px] "
          >
            <div class="flex items-center justify-start space-x-[10px] ">
              <div>
                <img
                  src="/assets/imgs/translatedocs/limited.svg"
                  class="w-[19px] h-[19px] "
                  alt=""
                />
              </div>

              <div class="text-[12px] lg:text-[14px] font-[500] text-[#3C3F49]"><span class="font-[700] mr-1">50 </span>Words</div>
            </div>
            <div class="flex items-center justify-start space-x-[10px] ">
              <div>
                <img
                  src="/assets/imgs/translatedocs/limited.svg"
                  class="w-[19px] h-[19px]"
                  alt=""
                />
              </div>

              <div class="text-[12px] lg:text-[14px] font-[500] text-[#3C3F49]"><span class="font-[700] mr-1">50 </span>Characters</div>
            </div>
          </div>

          <button
            @click="changePlan('pro_pack')"
            class="btn-dashboard hover_tamkin mt-[8px] w-[158px] "
          >
            Upgrade now
          </button>
        </div>
   
        <div class="lg:flex hidden  items-center ">
  
          <div class="w-full h-full relative mt-[40px]">
       
            <img
              src="/assets/imgs/translatephotos/hero.png"
              class="w-[348px] h-[225px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div
    v-if="currentPlan === 'pro_pack'"
    class="w-full bg-gradient-to-l from-[#3B68A4] via-[#9CB2D3] to-[#ECEEF9] rounded-[10px] 
      flex flex-col items-start justify-center  "
  >
    <div class="h-[200px] flex items-center justify-between w-full relative">
        <div class="absolute left-[30%] bottom-[10px] ">
            <img
              src="/assets/imgs/translatephotos/vector.png"
              class="w-[134px] h-[124px] opacity-20 "
              alt=""
            />
          </div>
      <div class="flex flex-col items-start justify-center px-[15px]">
        <div class="flex items-center space-x-[10px]">
          <div>
            <img
              class="w-[40px] h-[40px]"
              src="/assets/imgs/translatevideo/pro.png"
              alt=""
            />
          </div>
          <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
            PRO- Package          </div>
        </div>

        <div class="text-[12px] lg:text-[15px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-[500px]">
            You are now on the Pro package. You can utilize the remaining words and character in your current plan. To access additional services, consider upgrading to a higher package.
        </div>

        <!-- <div
        class=" h-[35px] flex items-center justify-start space-x-[25px] "
        >
          <div class="flex items-center justify-start space-x-[10px] ">
            <div>
              <img
                src="/assets/imgs/translatedocs/limited.svg"
                class="w-[19px] h-[19px] "
                alt=""
              />
            </div>

            <div class="text-[12px] lg:text-[14px] font-[500] text-[#3C3F49]"><span class="font-[700] mr-1">50 </span>Words</div>
          </div>
          <div class="flex items-center justify-start space-x-[10px] ">
            <div>
              <img
                src="/assets/imgs/translatedocs/limited.svg"
                class="w-[19px] h-[19px]"
                alt=""
              />
            </div>

            <div class="text-[12px] lg:text-[14px] font-[500] text-[#3C3F49]"><span class="font-[700] mr-1">50 </span>Characters</div>
          </div>
        </div> -->

        <button
          @click="changePlan('pro_used')"
          class="btn-dashboard hover_tamkin mt-[8px] w-[158px] "
        >
          Upgrade now
        </button>
      </div>
 
      <div class="lg:flex hidden  items-center ">

        <div class="w-full h-full relative mt-[40px]">
     
          <img
            src="/assets/imgs/translatephotos/hero.png"
            class="w-[348px] h-[225px]"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>

  <div
  v-if="currentPlan === 'pro_used'"
  class="w-full bg-gradient-to-l from-[#3B68A4] via-[#9CB2D3] to-[#ECEEF9] rounded-[10px] 
      flex flex-col items-start justify-center "
>
  <div class="h-[200px] flex items-center justify-between w-full relative">
    <div class="absolute left-[30%] bottom-[10px] ">
        <img
          src="/assets/imgs/translatephotos/vector.png"
          class="w-[134px] h-[124px] opacity-20 "
          alt=""
        />
      </div>
    <div class="flex flex-col items-start justify-center px-[15px]">
      <div class="flex items-center space-x-[10px]">
        <div>
          <img
            class="w-[40px] h-[40px]"
            src="/assets/imgs/translatevideo/pro.png"
            alt=""
          />
        </div>
        <div class="text-[16px] lg:text-[18px] font-[600] text-[#3C3F49] leading-[30px]">
          PRO- Package          </div>
      </div>

      <div class="text-[12px] lg:text-[15px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-[500px]">
        Your available words and character have been used up. Please purchase a new package or add more words and character to continue using the service      </div>

    
        <div class="flex items-center space-x-[10px] w-full mt-[8px]">
            <button
            @click="changePlan('freetrial')"
            class="btn_bordered_dashboard hover_tamkin  lg:!w-[158px] "
          >
          Buy more words
          </button>
          <button
          @click="changePlan('pro')"
          class="btn_bordered_dashboard hover_tamkin  !p-2 lg:!w-[158px] "
        >
        Buy more Minutes
        </button>
          </div>
    
    </div>

    <div class="lg:flex hidden  items-center ">

      <div class="w-full h-full relative mt-[40px]">
   
        <img
          src="/assets/imgs/translatephotos/hero.png"
          class="w-[348px] h-[225px]"
          alt=""
        />
      </div>
    </div>
  </div>
</div>
  </div>
</template>
