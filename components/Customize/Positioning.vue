<script lang="ts" setup>
import { useCustomizeStore} from "@/stores/customize.js";
const customizeStore = useCustomizeStore();
// const buttonPositionDesktop = ref("top_left");
// const buttonPositionMobile = ref("top_left_mobile");
const {colorMode,gradient1,gradient2,currentColor,buttonPositionDesktop,buttonPositionMobile,
  initialPositionMobile,initialPositionDesktop,switchButtonLocation,buttonSizeSlider} = storeToRefs(customizeStore);



const gradientClasses = computed(() => {
  return colorMode.value === 'gradient' && gradient1.value && gradient2.value
    ? 'bg-gradient-to-b' // Tailwind utility for background gradient
    : ''; // No extra class if not gradient
});

const backgroundImageStyle = computed(() => {
  if (colorMode.value === 'gradient' && gradient1.value && gradient2.value) {
    return {
      backgroundImage: `linear-gradient(to bottom, ${gradient1.value}, ${gradient2.value})`,
    };
  } else {
    return {
      backgroundColor: currentColor.value,
    };
  }
});

watch([currentColor],()=>{},{immediate:true})


</script>

<template>
  <div
    class="flex items-center justify-start mt-[32px] px-[15px] rtl:space-x-reverse space-x-[18px]"
  >
    <div
      class="pb-[12px] text-[14px] leading-[32px]  text-darkGrey cursor-pointer"
      @click="customizeStore.changeButtonMobileOrDesktop('desktop')"
      :class="[
        switchButtonLocation === 'desktop' ? 'custom-border-bottom font-[600]' : 'font-[500]',
      ]"
    >
      Button Location Desktop
    </div>

    <div
      class="pb-[12px] text-[14px] leading-[32px]  text-darkGrey cursor-pointer"
      @click="customizeStore.changeButtonMobileOrDesktop('mobile')"
      :class="[switchButtonLocation === 'mobile' ? 'custom-border-bottom font-[600]' : 'font-[500]']"
    >
      Button Location Mobile
    </div>
  </div>

<div class="flex items-center justify-between" v-if="switchButtonLocation === 'desktop'">
  <div
  class="bg-[#F2FBF9] rounded-lg p-10 w-2/4 relative mx-[15px] h-[173px] mt-[16px] border-[1px]"
>

  <div
    class="absolute top-0 left-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[42]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        @click="customizeStore.changebuttonPositionDesktop('top_left')"
        id="top_left"
        type="radio"
        name="position_radio"
        class="hidden"
      />
      <label for="top_left" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionDesktop !== 'top_left'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        @click="customizeStore.changebuttonPositionDesktop('middle_left')"
        id="middle_left"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="buttonPositionDesktop === 'middle_left'"
      />
      <label for="middle_left" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionDesktop !== 'middle_left'"
        ></span>
    <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
     
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        @click="customizeStore.changebuttonPositionDesktop('bottom_left')"
        id="bottom_left"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="buttonPositionDesktop === 'bottom_left'"
      />
      <label for="bottom_left" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionDesktop !== 'bottom_left'"
        ></span>
        <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
          <img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
              </div>
      </label>
    </div>
  </div>
  <div
    class="absolute top-0 right-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[42]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        @click="customizeStore.changebuttonPositionDesktop('top_right')"
        id="top_right"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="buttonPositionDesktop === 'top_right'"
      />
      <label for="top_right" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionDesktop !== 'top_right'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="middle_right"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="customizeStore.changebuttonPositionDesktop('middle_right')"
        :checked="buttonPositionDesktop === 'middle_right'"
      />
      <label for="middle_right" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionDesktop !== 'middle_right'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="bottom_right"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="customizeStore.changebuttonPositionDesktop('bottom_right')"
        :checked="buttonPositionDesktop === 'bottom_right'"
      />
      <label for="bottom_right" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionDesktop !== 'bottom_right'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
  </div>
  <div
    class="absolute top-0 left-0 right-[15px] bottom-0 flex flex-col items-center justify-between py-5 z-[41]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        id="top_center"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="customizeStore.changebuttonPositionDesktop('top_center')"
        :checked="buttonPositionDesktop === 'top_center'"
      />
      <label for="top_center" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionDesktop !== 'top_center'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="bottom_center"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="customizeStore.changebuttonPositionDesktop('bottom_center')"
        :checked="buttonPositionDesktop === 'bottom_center'"
      />
      <label for="bottom_center" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionDesktop !== 'bottom_center'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
  </div>
</div>


<div class="relative">
  <div class="absolute " :class="[buttonPositionDesktop === 'top_left' ? 'top-[30px] ipad-max:left-[50px] lg:left-[70px]' :'',
  buttonPositionDesktop === 'middle_left' ? 'ipad-max:top-[60px] lg:top-[80px] ipad-max:left-[50px] lg:left-[70px]':'',
    buttonPositionDesktop === 'bottom_left' ? 'ipad-max:top-[100px] lg:top-[140px] ipad-max:left-[50px] lg:left-[70px]':'',
    buttonPositionDesktop === 'top_center' ? 'ipad-max:top-[20px] lg:top-[30px] left-[48%]':'',
    buttonPositionDesktop === 'bottom_center' ? 'ipad-max:top-[100px] lg:top-[140px] left-[48%]':'',
    buttonPositionDesktop === 'top_right' ? 'top-[30px] ipad-max:right-[50px] lg:right-[70px]':'',
    buttonPositionDesktop === 'middle_right' ? 'top-[80px] ipad-max:right-[50px] lg:right-[70px]':'',
    buttonPositionDesktop === 'bottom_right' ? 'ipad-max:top-[100px] lg:top-[140px] ipad-max:right-[50px] lg:right-[70px]':'',
  ]">
  <div class="w-[24px] h-[24px]  rounded-full flex items-center justify-center" 
  :class="gradientClasses" :style="backgroundImageStyle">
    <img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[16px] h-[16px]">
        </div>
  </div>
  <img src="/assets/imgs/customize/laptop.svg" alt="Laptop Image" class="w-96 h-auto">
</div>
</div>


<div class="flex items-center justify-between" v-if="switchButtonLocation === 'mobile'">
  <div
  class="bg-[#F2FBF9] rounded-lg p-10 w-2/4 relative mx-[15px] h-[173px] mt-[16px] border-[1px]"
>
  <div
    class="absolute top-0 left-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[42]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        @click="customizeStore.changebuttonPositionMobile('top_left_mobile')"
        id="top_left_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
      />
      <label for="top_left_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionMobile !== 'top_left_mobile'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        @click="customizeStore.changebuttonPositionMobile('middle_left_mobile')"
        id="middle_left_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="buttonPositionMobile === 'middle_leeft_mobile'"
      />
      <label for="middle_left_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionMobile !== 'middle_left_mobile'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        @click="customizeStore.changebuttonPositionMobile('bottom_left_mobile')"
        id="bottom_left_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="buttonPositionMobile === 'bottom_left'"
      />
      <label for="bottom_left_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionMobile !== 'bottom_left_mobile'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
  </div>
  <div
    class="absolute top-0 right-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[40]"
  >
    <div class="w-[28px] h-[28px]">
      <input
        @click="customizeStore.changebuttonPositionMobile('top_right_mobile')"
        id="top_right_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        :checked="buttonPositionMobile === 'top_right_mobile'"
      />
      <label for="top_right_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionMobile !== 'top_right_mobile'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="middle_right_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="customizeStore.changebuttonPositionMobile('middle_right_mobile')"
        :checked="buttonPositionMobile === 'middle_right_mobile'"
      />
      <label for="middle_right_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin  !border-[#A7A7A7]"
          v-if="buttonPositionMobile !== 'middle_right_mobile'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
    <div class="w-[28px] h-[28px]">
      <input
        id="bottom_right_mobile"
        type="radio"
        name="position_radio"
        class="hidden"
        @click="customizeStore.changebuttonPositionMobile('bottom_right_mobile')"
        :checked="buttonPositionMobile === 'bottom_right_mobile'"
      />
      <label for="bottom_right_mobile" class="flex items-center cursor-pointer">
        <span
          class="radio-tamkin !border-[#A7A7A7]"
          v-if="buttonPositionMobile !== 'bottom_right_mobile'"
        ></span>
            <div class="w-[28px] h-[28px]  rounded-full flex items-center justify-center" :class="gradientClasses" :style="backgroundImageStyle" v-else>
<img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[22px] h-[22px]">
    </div>
      </label>
    </div>
  </div>

</div>


<div class="relative">
  <div class="absolute " :class="[buttonPositionMobile === 'top_left_mobile' ? 'top-[30px] left-[50px]' :'',
  buttonPositionMobile === 'middle_left_mobile' ? 'top-[80px] left-[50px]':'',
  buttonPositionMobile === 'bottom_left_mobile' ? 'top-[140px] left-[50px]':'',

  buttonPositionMobile === 'top_right_mobile' ? 'top-[30px] left-[115px]':'',
  buttonPositionMobile === 'middle_right_mobile' ? 'top-[80px] left-[115px]':'',
  buttonPositionMobile === 'bottom_right_mobile' ? 'top-[140px] left-[115px]':'',
  ]">
  <div class="w-[18px] h-[18px]  rounded-full flex items-center justify-center" 
  :class="gradientClasses" :style="backgroundImageStyle">
    <img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[12px] h-[12px]">
        </div>
  </div>
  <div class="absolute " :class="[buttonPositionMobile === 'top_left_mobile' ? 'top-[30px] right-[230px]' :'',
  buttonPositionMobile === 'middle_left_mobile' ? 'top-[80px] right-[230px]':'',
  buttonPositionMobile === 'bottom_left_mobile' ? 'top-[140px] right-[230px]':'',

  buttonPositionMobile === 'top_right_mobile' ? 'top-[30px] right-[50px]':'',
  buttonPositionMobile === 'middle_right_mobile' ? 'top-[80px] right-[50px]':'',
  buttonPositionMobile === 'bottom_right_mobile' ? 'top-[140px] right-[50px]':'',
  ]">
  <div class="w-[22px] h-[22px]  rounded-full flex items-center justify-center" 
  :class="gradientClasses" :style="backgroundImageStyle">
    <img src="/assets/imgs/icons/ios_access.svg" alt="" class="w-[14px] h-[14px]">
        </div>
  </div>
 <div class="flex items-center justify-evenly rtl:space-x-reverse space-x-[29px] px-[40px]">
  <img src="/assets/imgs/customize/iphone.svg" alt="Laptop Image" class="w-[102px] h-auto">
  <img src="/assets/imgs/customize/ipad.svg" alt="Laptop Image" class="ipad-max:hidden w-[225px] h-auto">
 </div>
</div>
</div>
</template>


<style>


</style>