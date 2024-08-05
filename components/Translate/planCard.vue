<script lang="ts" setup>
const showExpired = ref(false);
</script>

<template>
  <div
    class="bg-white dark:bg-tamkinDarkPrimary custom-border-tamkin padding-override-1 w-full rtl:space-x-reverse
     space-x-[16px] rounded-[10px] h-[119px] mt-[16px] px-[15px] flex items-center justify-start mb-[16px]"
  >
    <div>
      <img src="/assets/imgs/overview/plan-calender.svg" />
    </div>
    <div class="flex flex-col items-start justify-center w-full">
      <div
        class="font-[500] text-[18px] leading-[27px] text-darkGrey dark:text-whiteTamkin"
      >
        <h1>Monthly Plan</h1>
      </div>
      <div
        class="flex items-center justify-start w-full rtl:space-x-reverse space-x-[6px] cursor-pointer h-[30px]"
        @click="showExpired = !showExpired"
      >
        <transition name="fade" mode="out-in">
          <template v-if="!showExpired">
            <div class="flex items-center" key="not-expired">
              <div
                class="text-[13px] leading-[24px] font-[400] w-[130px] dark:text-whiteTamkin"
              >
                Package Expires in
              </div>
              <div
                class="flex items-center justify-center custom-border-tamkin padding-override-1 h-[23px] p-[12px] text-[13px] leading-[24px] font-[500] w-[130px] dark:text-whiteTamkin"
              >
                Aug 20,2024
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex items-center" key="expired">
              <div class="text-[13px] leading-[24px] font-[400] text-[#EA4335] w-[130px]">
                Expired
              </div>
              <div
                class="flex items-center justify-center border-[1px] rounded-[10px] text-[#EA4335] border-[#EA4335] h-[23px] p-[12px] text-[13px] leading-[24px] font-[500] w-[130px]"
              >
                Aug 10,2024
              </div>
            </div>
          </template>
        </transition>
      </div>
    </div>

    <div class="relative">
      <div
        v-if="!showExpired"
        class="flex items-center justify-center absolute top-[-10px] transform left-[50%] h-[19px] 
        bg-[#B36B8A] text-white w-[69px] text-[12px] leading-[18px] font-[500] rounded-[10px]"
      >
        SAVE 12%
      </div>
      <button
        class="rounded-full w-[178px]"
        :class="[showExpired ? 'btn-dashboard hover_tamkin' : 'btn_bordered_dashboard']"
        @click="modalStore.controlShowUpgradeModal"
      >
        {{ !showExpired ? "Switch To Annual" : "Renew" }}
      </button>
    </div>
  </div>
</template>
