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
      class="w-full bg-gradient-to-l from-[#A3D9C6A8] via-[#FAECCCA8] to-[#A5D6F2A8] rounded-[10px] 
      flex flex-col items-start justify-center space-y-[24px]"
    >
      <div class="h-[240px] flex items-center justify-between w-full">
        <div class="flex flex-col items-start justify-center px-[15px] space-y-[10px]">
          <div class="flex items-center space-x-[10px]">
            <div>
              <img
                class="w-[40px] h-[40px]"
                src="/assets/imgs/translatevideo/free_trial.png"
                alt=""
              />
            </div>
            <div class="text-[16px] lg:text-[20px] font-[600] text-[#3C3F49] leading-[30px]">
              Free Trial
            </div>
          </div>

          <div class="text-[12px] lg:text-[15px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full lg:w-3/4">
            Enjoy a 14-day free trial, where you can translate up to 50 words and 50
            minutes
          </div>

          <div
          class=" h-[35px] flex items-center justify-start space-x-[50px]  "
          >
            <div class="flex items-center justify-start space-x-[10px] ">
              <div>
                <img
                  src="/assets/imgs/translatevideo/words_icon.png"
                  class="w-[40px] h-[40px] object-cover object-center block m-0 p-0"
                  alt=""
                />
              </div>

              <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]"> WORDS</span></div>
            </div>
            <div class="flex items-center justify-start space-x-[10px] ">
              <div>
                <img
                  src="/assets/imgs/translatevideo/min_icon.png"
                  class="w-[31px] h-[31px]"
                  alt=""
                />
              </div>

              <div class="text-[12px] lg:text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]"> Minutes</span></div>
            </div>
          </div>

          <button
            @click="changePlan('freetrial_expired')"
            class="btn-dashboard hover_tamkin mt-[16px] w-[158px] "
          >
            Try it now
          </button>
        </div>

        <div class="lg:flex hidden  items-center">
          <div class="absolute right-[160px]">
            <img
              src="/assets/imgs/translatevideo/plan_vector.svg"
              class="w-[218px] h-[240px]"
              alt=""
            />
          </div>
          <div class="w-full h-full relative">
            <div class="absolute bottom-0 right-0 mr-[15px]">
              <img src="/assets/imgs/translatevideo/star.svg" alt="" />
            </div>
            <img
              src="/assets/imgs/translatevideo/banner_second.png"
              class="w-[218px] h-[240px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentPlan === 'pro'"
      class="w-full rounded-[10px] flex flex-col items-start justify-center space-y-[24px]"
      style="
        background: linear-gradient(
          90deg,
          rgba(212, 177, 248, 0.66) 3%,
          rgba(161, 206, 203, 0.66) 26.17%,
          rgba(245, 201, 197, 0.66) 52.17%,
          rgba(113, 218, 210, 0.66) 78.17%,
          rgba(165, 214, 242, 0.66) 100%
        );
      "
    >
      <div class="h-[240px] flex items-center justify-between w-full">
        <div
          class="flex flex-col items-start justify-center px-[15px] space-y-[10px] lg:w-3/4"
        >
          <div class="flex items-center space-x-[10px]">
            <div>
              <img
                class="w-[40px] h-[40px]"
                src="/assets/imgs/translatevideo/pro.png"
                alt=""
              />
            </div>
            <div class="text-[16px] lg:text-[20px] font-[600] text-[#3C3F49] leading-[30px]">
              PRO- Package
            </div>
          </div>

          <div class="text-[12px] lg:text-[15px] font-[400] text-[#021328] leading-[20px] lg:leading-[27px]  lg:flex-shrink ipad-max:w-full  w-full lg:w-3/4">
            Your available words and minutes have been used up. Please purchase a new
            package or add more words and minutes to continue using the service
          </div>

          <div
          class=" h-[35px] flex items-center justify-start space-x-[50px]  "
        >
          <div class="flex items-center justify-start space-x-[10px] ">
            <div>
              <img
                src="/assets/imgs/translatevideo/words_icon.png"
                class="w-[40px] h-[40px] object-cover object-center block m-0 p-0"
                alt=""
              />
            </div>

            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]"> Words</span></div>
          </div>
          <div class="flex items-center justify-start space-x-[10px] ">
            <div>
              <img
                src="/assets/imgs/translatevideo/min_icon.png"
                class="w-[31px] h-[31px]"
                alt=""
              />
            </div>

            <div class="text-[14px] font-[700] text-[#3C3F49]">50 / 50 <span class="font-[500]"> Minutes</span></div>
          </div>
        </div>

          <button
            @click="changePlan('pro_out_credit')"
            class="btn-dashboard hover_tamkin mt-[16px] !w-[158px] "
          >
            Try it now
          </button>
        </div>

        <div class="lg:flex hidden items-center relative  ">
          <div class="absolute right-[160px] w-[218px] h-[240px]">
            <img
              src="/assets/imgs/translatevideo/plan_vector.svg"
              class="w-[218px] h-[240px]"
              alt=""
            />
          </div>
          <div class="w-full h-full">
            <div class="absolute bottom-0 right-0 mr-[15px]">
              <img src="/assets/imgs/translatevideo/star.svg" alt="" />
            </div>
            <img
              src="/assets/imgs/translatevideo/banner_second.png"
              class="w-[218px] h-[240px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentPlan === 'freetrial_expired'"
      class="w-full rounded-[10px] flex flex-col items-start justify-center space-y-[24px]"
      style="
        background: linear-gradient(
          90deg,
          rgba(212, 177, 248, 0.66) 3%,
          rgba(161, 206, 203, 0.66) 26.17%,
          rgba(245, 201, 197, 0.66) 52.17%,
          rgba(113, 218, 210, 0.66) 78.17%,
          rgba(165, 214, 242, 0.66) 100%
        );
      "
    >
      <div class="h-[240px] flex items-center justify-between w-full">
        <div class="flex flex-col items-start justify-center px-[15px] space-y-[10px]">
          <div class="flex items-center space-x-[10px]">
            <div>
              <img
                class="w-[40px] h-[40px]"
                src="/assets/imgs/translatevideo/free_trial.png"
                alt=""
              />
            </div>
            <div class="text-[20px] font-[600] text-[#3C3F49] leading-[30px]">
              Free Trial
            </div>
          </div>

          <div class="text-[15px] font-[400] text-[#021328] lg:leading-[27px] leading-[20px] w-full ipad-max:w-full lg:w-3/4">
            Your free trial has expired. For more words and minutes,
          </div>

          <div
          class=" h-[35px] flex items-center justify-start space-x-[50px]  "
          >
          <div class="flex items-center justify-start space-x-[10px] ">
            <div>
                <img
                  src="/assets/imgs/translatevideo/limited.svg"
                  class="w-[20px] h-[20px]"
                  alt=""
                />
              </div>

              <div class="text-[14px] font-[500] text-[#3C3F49]">50 WORDS</div>
            </div>
            <div class="flex items-center justify-start space-x-[10px] ">
              <div>
                <img
                  src="/assets/imgs/translatevideo/limited.svg"
                  class="w-[20px] h-[20px]"
                  alt=""
                />
              </div>

              <div class="text-[14px] font-[500] text-[#3C3F49]">50 Minutes</div>
            </div>
          </div>

          <button
            @click="changePlan('pro')"
            class="btn-dashboard hover_tamkin mt-[16px] w-[158px] "
          >
            Try it now
          </button>
        </div>

        <div class=" items-center lg:flex hidden ">
          <div class="absolute right-[160px]">
            <img
              src="/assets/imgs/translatevideo/plan_vector.svg"
              class="w-[218px] h-[240px]"
              alt=""
            />
          </div>
          <div class="w-full h-full relative">
            <div class="absolute bottom-0 right-0 mr-[15px]">
              <img src="/assets/imgs/translatevideo/star.svg" alt="" />
            </div>
            <img
              src="/assets/imgs/translatevideo/banner_second.png"
              class="w-[218px] h-[240px]"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

 

  <div
  v-if="currentPlan === 'pro_out_credit'"
  class="w-full rounded-[10px] flex flex-col items-start justify-center space-y-[24px]"
  style="
    background: linear-gradient(
      90deg,
      rgba(212, 177, 248, 0.66) 3%,
      rgba(161, 206, 203, 0.66) 26.17%,
      rgba(245, 201, 197, 0.66) 52.17%,
      rgba(113, 218, 210, 0.66) 78.17%,
      rgba(165, 214, 242, 0.66) 100%
    );
  "
>
  <div class="h-[240px] flex items-center justify-between w-full">
    <div
      class="flex flex-col items-start justify-center px-[15px] space-y-[10px] lg:w-3/4"
    >
      <div class="flex items-center space-x-[10px]">
        <div>
          <img
            class="w-[40px] h-[40px]"
            src="/assets/imgs/translatevideo/pro.png"
            alt=""
          />
        </div>
        <div class="text-[16px] lg:text-[20px] font-[600] text-[#3C3F49] leading-[30px]">
          PRO- Package
        </div>
      </div>

      <div class="text-[12px] lg:text-[15px] font-[400] text-[#021328] leading-[20px] lg:leading-[27px]  lg:flex-shrink ipad-max:w-full  w-full lg:w-3/4">
       You are now on the Pro package. You can utilize the remaining words and minutes in your current plan. To access additional services, consider upgrading to a higher package.
      </div>



  <div class="flex items-center space-x-[10px] w-full">
    <button
    @click="changePlan('pro')"
    class="btn_bordered_dashboard hover_tamkin mt-[16px] lg:!w-[158px] "
  >
  Buy more words
  </button>
  <button
  @click="changePlan('pro')"
  class="btn_bordered_dashboard hover_tamkin mt-[16px] !p-2 lg:!w-[158px] "
>
Buy more Minutes
</button>
  </div>
    </div>

    <div class="lg:flex hidden items-center relative  ">
      <div class="absolute right-[160px] w-[218px] h-[240px]">
        <img
          src="/assets/imgs/translatevideo/plan_vector.svg"
          class="w-[218px] h-[240px]"
          alt=""
        />
      </div>
      <div class="w-full h-full">
        <div class="absolute bottom-0 right-0 mr-[15px]">
          <img src="/assets/imgs/translatevideo/star.svg" alt="" />
        </div>
        <img
          src="/assets/imgs/translatevideo/banner_second.png"
          class="w-[218px] h-[240px]"
          alt=""
        />
      </div>
    </div>
  </div>
</div>
  </div>
</template>
