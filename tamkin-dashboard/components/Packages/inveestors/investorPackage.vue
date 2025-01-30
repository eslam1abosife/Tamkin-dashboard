<script lang="ts" setup>
const localePath = useLocalePath();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData,
} = useModalManager();
</script>

<template>
  <div
    class="w-full mx-auto flex flex-col md:flex-row p-6 bg-gradient-to-t from-white dark:from-[#2D333D] dark:to-[#4b7e7a] to-[#8EE6DF] rounded-xl mt-[32px] items-center rtl:space-x-reverse space-x-4 relative"
    style="box-shadow: 1px 1px 26.4px 0px #71dad269"
  >
    <div>
      <h2 class="text-xl font-bold mb-2 h-[41px] dark:text-white">
        {{ $t("Investor Package") }}
      </h2>
      <p
        class="text-[14px] font-[400] leading-[21px] mb-4 w-3/4 text-darkGrey dark:text-white/80"
      >
        {{
          $t(
            "Based on the detailed information you’ve provided, a personalized package will be carefully determined to meet your specific needs and preferences"
          )
        }}
      </p>
      <button
        class="btn-dashboard hover_tamkin max-w-[202px]"
        @click="openModal('join_to_investor')"
      >
        {{ $t("Join Now") }}
      </button>
    </div>
    <div
      class="relative z-50 w-[212px] h-[142px] m-[48px] md:flex hidden botton-[36px]"
    >
      <img
        src="/imgs/investor_package_hero.png"
        alt="Robot Image"
        class="w-[100%] h-[100%]"
      />
    </div>
    <div
      class="flex items-center justify-center absolute top-[25px] rtl:left-[19px] ltr:right-[19px] rtl:space-x-reverse space-x-[10px]"
    >
      <div>
        <img src="/imgs/investor/A1.svg" class="w-[28px] h-[28px]" alt="" />
      </div>
      <div>
        <img src="/imgs/investor/AA.svg" class="w-[28px] h-[28px]" alt="" />
      </div>
      <div>
        <img src="/imgs/investor/C.svg" class="w-[28px] h-[28px]" alt="" />
      </div>
    </div>
  </div>
</template>
