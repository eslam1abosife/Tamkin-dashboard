<script lang="ts" setup>
const switchButtonLocation = ref("desktop");
const positionOnDesktop = ref("top_left");
const positionOnMobile = ref("top_left_mobile");


const changePositionOnDesktop = (position: string) => {
  positionOnDesktop.value = position;
};
const changePositionOnMobile = (position: string) => {
  positionOnMobile.value = position;
};
const changeButtonMobileOrDesktop = (v: string) => {
  switchButtonLocation.value = v;
};
</script>

<template>
  <div
    class="flex items-center justify-start mt-[32px] px-[15px] space-x-[18px]"
  >
    <div
      class="pb-[12px] text-[14px] leading-[32px] font-[600] text-darkGrey cursor-pointer"
      @click="changeButtonMobileOrDesktop('desktop')"
      :class="[
        switchButtonLocation === 'desktop' ? 'custom-border-bottom' : '',
      ]"
    >
      Button Location Desktop
    </div>

    <div
      class="pb-[12px] text-[14px] leading-[32px] font-[600] text-darkGrey cursor-pointer"
      @click="changeButtonMobileOrDesktop('mobile')"
      :class="[switchButtonLocation === 'mobile' ? 'custom-border-bottom' : '']"
    >
      Button Location Mobile
    </div>
  </div>

<div class="flex items-center justify-between" v-if="switchButtonLocation === 'desktop'">
  <div
  class="bg-[#F2FBF9] rounded-lg p-10 w-96 relative mx-[15px] h-[173px] mt-[32px]"
>
  <div
    class="absolute top-0 left-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[102]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        @click="changePositionOnDesktop('top_left')"
        id="top_left"
        type="radio"
        name="position_radio"
        class="hidden"
      />
      <label for="top_left" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnDesktop !== 'top_left'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        @click="changePositionOnDesktop('middle_left')"
        id="middle_left"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="positionOnDesktop === 'middle_left'"
      />
      <label for="middle_left" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnDesktop !== 'middle_left'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        @click="changePositionOnDesktop('bottom_left')"
        id="bottom_left"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="positionOnDesktop === 'bottom_left'"
      />
      <label for="bottom_left" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnDesktop !== 'bottom_left'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
  </div>
  <div
    class="absolute top-0 right-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[104]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        @click="changePositionOnDesktop('top_right')"
        id="top_right"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="positionOnDesktop === 'top_right'"
      />
      <label for="top_right" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnDesktop !== 'top_right'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="middle_right"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="changePositionOnDesktop('middle_right')"
        :checked="positionOnDesktop === 'middle_right'"
      />
      <label for="middle_right" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnDesktop !== 'middle_right'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="bottom_right"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="changePositionOnDesktop('bottom_right')"
        :checked="positionOnDesktop === 'bottom_right'"
      />
      <label for="bottom_right" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnDesktop !== 'bottom_right'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
  </div>
  <div
    class="absolute top-0 left-0 right-[15px] bottom-0 flex flex-col items-center justify-between py-5 z-[101]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        id="top_center"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="changePositionOnDesktop('top_center')"
        :checked="positionOnDesktop === 'top_center'"
      />
      <label for="top_center" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnDesktop !== 'top_center'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="bottom_center"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="changePositionOnDesktop('bottom_center')"
        :checked="positionOnDesktop === 'bottom_center'"
      />
      <label for="bottom_center" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnDesktop !== 'bottom_center'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
  </div>
</div>


<div class="relative">
  <div class="absolute " :class="[positionOnDesktop === 'top_left' ? 'top-[30px] left-[70px]' :'',
  positionOnDesktop === 'middle_left' ? 'top-[80px] left-[70px]':'',
    positionOnDesktop === 'bottom_left' ? 'top-[140px] left-[70px]':'',
    positionOnDesktop === 'top_center' ? 'top-[30px] left-[48%]':'',
    positionOnDesktop === 'bottom_center' ? 'top-[140px] left-[48%]':'',
    positionOnDesktop === 'top_right' ? 'top-[30px] right-[70px]':'',
    positionOnDesktop === 'middle_right' ? 'top-[80px] right-[70px]':'',
    positionOnDesktop === 'bottom_right' ? 'top-[140px] right-[70px]':'',
  ]">
    <img src="/assets/imgs/customize/access.svg" alt="Access Icon" class="w-[16px] h-[16px]">
  </div>
  <img src="/assets/imgs/customize/laptop.svg" alt="Laptop Image" class="w-96 h-auto">
</div>
</div>


<div class="flex items-center justify-between" v-if="switchButtonLocation === 'mobile'">
  <div
  class="bg-[#F2FBF9] rounded-lg p-10 w-96 relative mx-[15px] h-[173px] mt-[32px]"
>
  <div
    class="absolute top-0 left-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[102]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        @click="changePositionOnMobile('top_left_mobile')"
        id="top_left_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
      />
      <label for="top_left_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnMobile !== 'top_left_mobile'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        @click="changePositionOnMobile('middle_left_mobile')"
        id="middle_left_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="positionOnMobile === 'middle_leeft_mobile'"
      />
      <label for="middle_left_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnMobile !== 'middle_left_mobile'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        @click="changePositionOnMobile('bottom_left_mobile')"
        id="bottom_left_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="positionOnMobile === 'bottom_left'"
      />
      <label for="bottom_left_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnMobile !== 'bottom_left_mobile'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
  </div>
  <div
    class="absolute top-0 right-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[104]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        @click="changePositionOnMobile('top_right_mobile')"
        id="top_right_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="positionOnMobile === 'top_right_mobile'"
      />
      <label for="top_right_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnMobile !== 'top_right_mobile'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="middle_right_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="changePositionOnMobile('middle_right_mobile')"
        :checked="positionOnMobile === 'middle_right_mobile'"
      />
      <label for="middle_right_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin  !border-[#A7A7A7]"
          v-if="positionOnMobile !== 'middle_right_mobile'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="bottom_right_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="changePositionOnMobile('bottom_right_mobile')"
        :checked="positionOnMobile === 'bottom_right_mobile'"
      />
      <label for="bottom_right_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="positionOnMobile !== 'bottom_right_mobile'"
        ></span>
        <img src="/assets/imgs/customize/access.svg" alt="" v-else />
      </label>
    </div>
  </div>

</div>


<div class="relative">
  <div class="absolute " :class="[positionOnMobile === 'top_left_mobile' ? 'top-[30px] left-[30px]' :'',
  positionOnMobile === 'middle_left_mobile' ? 'top-[80px] left-[30px]':'',
  positionOnMobile === 'bottom_left_mobile' ? 'top-[140px] left-[30px]':'',

  positionOnMobile === 'top_right_mobile' ? 'top-[30px] left-[90px]':'',
  positionOnMobile === 'middle_right_mobile' ? 'top-[80px] left-[90px]':'',
  positionOnMobile === 'bottom_right_mobile' ? 'top-[140px] left-[90px]':'',
  ]">
    <img src="/assets/imgs/customize/access.svg" alt="Access Icon" class="w-[16px] h-[16px]">
  </div>
  <div class="absolute " :class="[positionOnMobile === 'top_left_mobile' ? 'top-[30px] right-[210px]' :'',
  positionOnMobile === 'middle_left_mobile' ? 'top-[80px] right-[210px]':'',
  positionOnMobile === 'bottom_left_mobile' ? 'top-[140px] right-[210px]':'',

  positionOnMobile === 'top_right_mobile' ? 'top-[30px] right-[30px]':'',
  positionOnMobile === 'middle_right_mobile' ? 'top-[80px] right-[30px]':'',
  positionOnMobile === 'bottom_right_mobile' ? 'top-[140px] right-[30px]':'',
  ]">
    <img src="/assets/imgs/customize/access.svg" alt="Access Icon" class="w-[16px] h-[16px]">
  </div>
 <div class="flex items-center justify-evenly space-x-[29px] px-[15px]">
  <img src="/assets/imgs/customize/iphone.svg" alt="Laptop Image" class="w-[102px] h-auto">
  <img src="/assets/imgs/customize/ipad.svg" alt="Laptop Image" class="w-[225px] h-auto">
 </div>
</div>
</div>
</template>
