<script lang="ts" setup>
import { useCustomizeStore } from "@/stores/customize.js";
const customizeStore = useCustomizeStore();
// const buttonPositionDesktop = ref("postion1");
// const buttonPositionMobile = ref("postion1");
const {
  colorMode,
  gradient1,
  gradient2,
  currentColor,
  buttonPositionDesktop,
  buttonPositionMobile,
  initialPositionMobile,
  initialPositionDesktop,
  switchButtonLocation,
  buttonSizeSlider,
  selectedIcon,
} = storeToRefs(customizeStore);

const gradientClasses = computed(() => {
  return colorMode.value === "gradient" && gradient1.value && gradient2.value
    ? "bg-gradient-to-b" // Tailwind utility for background gradient
    : ""; // No extra class if not gradient
});

const backgroundImageStyle = computed(() => {
  if (colorMode.value === "gradient" && gradient1.value && gradient2.value) {
    return {
      backgroundImage: `linear-gradient(to bottom, ${gradient1.value}, ${gradient2.value})`,
    };
  } else {
    return {
      backgroundColor: currentColor.value,
    };
  }
});

watch([currentColor], () => {}, { immediate: true });
</script>

<template>
  <div
    class="flex items-center justify-start mt-[32px] rtl:space-x-reverse space-x-[18px]"
  >
    <div
      v-if="customizeStore.isButtonDesktopPositionActive"
      class="pb-[12px] text-[10px] lg:text-[13px] lg:leading-[32px] text-darkGrey dark:text-whiteTamkin cursor-pointer"
      @click="customizeStore.changeButtonMobileOrDesktop('desktop')"
      :class="[
        switchButtonLocation === 'desktop'
          ? 'custom-border-bottom font-[600]'
          : 'font-[500]',
      ]"
    >
      {{ $t("Button Location Desktop") }}
    </div>

    <div
      v-if="customizeStore.isButtonMobilePositionActive"
      class="pb-[12px] text-[10px] lg:text-[13px] lg:leading-[32px] text-darkGrey dark:text-whiteTamkin cursor-pointer"
      @click="customizeStore.changeButtonMobileOrDesktop('mobile')"
      :class="[
        switchButtonLocation === 'mobile'
          ? 'custom-border-bottom font-[600]'
          : 'font-[500]',
      ]"
    >
      {{ $t("Button Location Mobile") }}
    </div>
  </div>

  <div
    class="flex items-center justify-between lg:flex-nowrap flex-wrap"
    v-if="
      switchButtonLocation === 'desktop' &&
      customizeStore.isButtonDesktopPositionActive
    "
  >
    <div
      class="bg-[#F2FBF9] dark:bg-tamkinDarkPrimary rounded-lg p-10 w-full lg:w-2/6 relative h-[173px] mt-[16px] border-[1px]"
    >
      <div
        class="absolute top-0 left-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[42]"
      >
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion1').active == 1"
        >
          <input
            @click="customizeStore.changebuttonPositionDesktop('postion1')"
            id="postion1"
            type="radio"
            name="position_radio"
            class="hidden"
          />
          <label for="postion1" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionDesktop !== 'postion1'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion2').active == 1"
        >
          <input
            @click="customizeStore.changebuttonPositionDesktop('postion2')"
            id="postion2"
            type="radio"
            name="position_radio"
            class="hidden"
            :checked="buttonPositionDesktop === 'postion2'"
          />
          <label for="postion2" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionDesktop !== 'postion2'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion3').active == 1"
        >
          <input
            @click="customizeStore.changebuttonPositionDesktop('postion3')"
            id="postion3"
            type="radio"
            name="position_radio"
            class="hidden"
            :checked="buttonPositionDesktop === 'postion3'"
          />
          <label for="postion3" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionDesktop !== 'postion3'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
      </div>
      <div
        class="absolute top-0 right-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[42]"
      >
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion6').active == 1"
        >
          <input
            @click="customizeStore.changebuttonPositionDesktop('postion6')"
            id="postion6"
            type="radio"
            name="position_radio"
            class="hidden"
            :checked="buttonPositionDesktop === 'postion6'"
          />
          <label for="postion6" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionDesktop !== 'postion6'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion7').active == 1"
        >
          <input
            id="postion7"
            type="radio"
            name="position_radio"
            class="hidden"
            @click="customizeStore.changebuttonPositionDesktop('postion7')"
            :checked="buttonPositionDesktop === 'postion7'"
          />
          <label for="postion7" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionDesktop !== 'postion7'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion8').active == 1"
        >
          <input
            id="postion8"
            type="radio"
            name="position_radio"
            class="hidden"
            @click="customizeStore.changebuttonPositionDesktop('postion8')"
            :checked="buttonPositionDesktop === 'postion8'"
          />
          <label for="postion8" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionDesktop !== 'postion8'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
      </div>
      <div
        class="absolute top-0 left-0 right-[15px] bottom-0 flex flex-col items-center justify-between py-5 z-[41]"
      >
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion4').active == 1"
        >
          <input
            id="postion4"
            type="radio"
            name="position_radio"
            class="hidden"
            @click="customizeStore.changebuttonPositionDesktop('postion4')"
            :checked="buttonPositionDesktop === 'postion4'"
          />
          <label for="postion4" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionDesktop !== 'postion4'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion5').active == 1"
        >
          <input
            id="postion5"
            type="radio"
            name="position_radio"
            class="hidden"
            @click="customizeStore.changebuttonPositionDesktop('postion5')"
            :checked="buttonPositionDesktop === 'postion5'"
          />
          <label for="postion5" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionDesktop !== 'postion5'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="relative lg:mt-0 mt-[24px] md:mx-auto">
      <div
        class="absolute"
        :class="[
          buttonPositionDesktop === 'postion1' && customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion1').active == 1
            ? 'top-[30px] ipad-max:left-[60px] left-[70px]'
            : '',
          buttonPositionDesktop === 'postion2' && customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion2').active == 1
            ? 'ipad-max:top-[60px] top-[80px] ipad-max:left-[60px] left-[70px]'
            : '',
          buttonPositionDesktop === 'postion3' && customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion3').active == 1
            ? 'ipad-max:top-[120px] top-[110px] ipad-max:left-[60px] left-[70px]'
            : '',
          buttonPositionDesktop === 'postion4'&& customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion4').active == 1
            ? 'ipad-max:top-[20px] top-[30px] left-[48%]'
            : '',
          buttonPositionDesktop === 'postion5'&& customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion5').active == 1
            ? 'ipad-max:top-[120px] top-[110px] left-[48%]'
            : '',
          buttonPositionDesktop === 'postion6'&& customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion6').active == 1
            ? 'top-[30px] ipad-max:right-[60px] right-[70px]'
            : '',
          buttonPositionDesktop === 'postion7'&& customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion7').active == 1
            ? 'top-[80px] ipad-max:right-[60px] right-[70px]'
            : '',
          buttonPositionDesktop === 'postion8'&& customizeStore.buttonDesktopPositions.find((el:any)=> el.value === 'postion8').active == 1
            ? 'ipad-max:top-[120px] top-[110px] ipad-max:right-[60px] right-[70px]'
            : '',
        ]"
      >
        <div
          class="w-[24px] h-[24px] rounded-full flex items-center justify-center"
          :class="gradientClasses"
          :style="backgroundImageStyle"
        >
          <img
            :src="`https://tamkin.app/${selectedIcon}`"
            class="w-[16px] h-[16px]"
          />
        </div>
      </div>
      <img
        src="/assets/imgs/customize/laptop.svg"
        alt="Laptop Image"
        class="w-full h-auto"
      />
    </div>
  </div>

  <div
    class="flex items-center justify-between lg:flex-nowrap flex-wrap"
    v-if="
      switchButtonLocation === 'mobile' &&
      customizeStore.isButtonMobilePositionActive
    "
  >
    <div
      class="bg-[#F2FBF9] dark:bg-tamkinDarkPrimary rounded-lg p-10 w-full lg:w-2/6 relative h-[173px] mt-[16px] border-[1px]"
    >
      <div
        class="absolute top-0 left-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[42]"
      >
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion1').active == 1"
        >
          <input
            @click="customizeStore.changebuttonPositionMobile('postion1')"
            id="postion1"
            type="radio"
            name="position_radio"
            class="hidden"
          />
          <label for="postion1" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionMobile !== 'postion1'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion2').active == 1"
        >
          <input
            @click="customizeStore.changebuttonPositionMobile('postion2')"
            id="postion2"
            type="radio"
            name="position_radio"
            class="hidden"
            :checked="buttonPositionMobile === 'postion2'"
          />
          <label for="postion2" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionMobile !== 'postion2'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion2').active == 1"
        >
          <input
            @click="customizeStore.changebuttonPositionMobile('postion3')"
            id="postion3"
            type="radio"
            name="position_radio"
            class="hidden"
            :checked="buttonPositionMobile === 'postion3'"
          />
          <label for="postion3" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionMobile !== 'postion3'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
      </div>
      <div
        class="absolute top-0 right-[15px] bottom-0 flex flex-col justify-around items-center py-2 z-[40]"
      >
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion4').active == 1"
        >
          <input
            @click="customizeStore.changebuttonPositionMobile('postion4')"
            id="postion4"
            type="radio"
            name="position_radio"
            class="hidden"
            :checked="buttonPositionMobile === 'postion4'"
          />
          <label for="postion4" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionMobile !== 'postion4'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion5').active == 1"
        >
          <input
            id="postion5"
            type="radio"
            name="position_radio"
            class="hidden"
            @click="customizeStore.changebuttonPositionMobile('postion5')"
            :checked="buttonPositionMobile === 'postion5'"
          />
          <label for="postion5" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionMobile !== 'postion5'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
        <div
          class="w-[28px] h-[28px]"
          v-if="customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion6').active == 1"
        >
          <input
            id="postion6"
            type="radio"
            name="position_radio"
            class="hidden"
            @click="customizeStore.changebuttonPositionMobile('postion6')"
            :checked="buttonPositionMobile === 'postion6'"
          />
          <label for="postion6" class="flex items-center cursor-pointer">
            <span
              class="radio-tamkin !border-[#A7A7A7]"
              v-if="buttonPositionMobile !== 'postion6'"
            ></span>
            <div
              class="w-[28px] h-[28px] rounded-full flex items-center justify-center"
              :class="gradientClasses"
              :style="backgroundImageStyle"
              v-else
            >
              <img
                :src="`https://tamkin.app/${selectedIcon}`"
                class="w-[22px] h-[22px]"
              />
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="relative lg:mt-0 mt-[24px] md:mx-auto">
      <div
        class="absolute"
        :class="[
          buttonPositionMobile === 'postion1' && customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion1').active == 1
            ? 'top-[30px]  ltr:lg:left-[50px] rtl:lg:right-[120px]  position1'
            : '',
          buttonPositionMobile === 'postion2'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion2').active == 1
            ? 'top-[80px] ltr:lg:left-[50px] rtl:lg:right-[120px] position2'
            : '',
          buttonPositionMobile === 'postion3'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion3').active == 1
            ? 'top-[150px] lg:top-[140px] md:left-[10px] left-[0] rtl:lg:right-[120px]  ltr:lg:left-[50px] position3'
            : '',

          buttonPositionMobile === 'postion4'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion4').active == 1
            ? 'top-[30px] ltr:lg:left-[120px] rtl:lg:left-[250px]  position4'
            : '',
          buttonPositionMobile === 'postion5'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion5').active == 1
            ? 'top-[80px]  ltr:lg:left-[120px] rtl:lg:left-[250px] position5'
            : '',
          buttonPositionMobile === 'postion6'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion6').active == 1
            ? 'top-[150px] lg:top-[140px] md:left-[75px] left-[65px] rtl:lg:right-[270px] lg:left-[120px] position6'
            : '',
        ]"
      >
        <div
          class="w-[18px] h-[18px] rounded-full flex items-center justify-center"
          :class="gradientClasses"
          :style="backgroundImageStyle"
        >
          <img
            :src="`https://tamkin.app/${selectedIcon}`"
            class="w-[12px] h-[12px]"
          />
        </div>
      </div>
      <div
        class="absolute"
        :class="[
          buttonPositionMobile === 'postion1' && customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion1').active == 1
            ? 'position1 ipad-max:top-[50px] top-[50px] lg:top-[30px] ltr:lg:left-[270px] rtl:lg:right-[270px]'
            : '',
          buttonPositionMobile === 'postion2'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion2').active == 1
            ? 'position2 top-[80px] ltr:lg:left-[270px] rtl:lg:right-[270px]'
            : '',
          buttonPositionMobile === 'postion3'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion3').active == 1
            ? 'position3 top-[130px] lg:top-[140px] ltr:lg:left-[270px] rtl:lg:right-[270px]'
            : '',

          buttonPositionMobile === 'postion4'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion4').active == 1
            ? 'position4 top-[50px] ipad-max:top-[50px] lg:top-[30px] right-[5px] md:right-[20px] ipad-max:right-[20px] lg:right-[56px]'
            : '',
          buttonPositionMobile === 'postion5'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion5').active == 1
            ? 'position5 top-[90px] lg:top-[80px]   right-[5px] md:right-[20px] ipad-max:right-[20px] lg:right-[56px]'
            : '',
          buttonPositionMobile === 'postion6'&& customizeStore.buttonMobilePositions.find((el:any)=> el.value === 'postion6').active == 1
            ? 'position6 top-[130px] lg:top-[140px] ipad-max:top-[130px]  right-[5px] md:right-[20px] ipad-max:right-[20px] lg:right-[56px]'
            : '',
        ]"
      >
        <div
          class="w-[22px] h-[22px] rounded-full flex items-center justify-center"
          :class="gradientClasses"
          :style="backgroundImageStyle"
        >
          <img
            :src="`https://tamkin.app/${selectedIcon}`"
            class="w-[14px] h-[14px]"
          />
        </div>
      </div>
      <div
        class="flex items-center justify-center lg:justify-evenly rtl:space-x-reverse space-x-[20px] ipad-max:space-x-[50px] lg:space-x-[100px] lg:px-[40px]"
      >
        <img
          src="/assets/imgs/customize/iphone.svg"
          alt="Laptop Image"
          class="w-full h-full"
        />
        <img
          src="/assets/imgs/customize/ipad.svg"
          alt="Laptop Image"
          class="lg:w-full ipad-max:w-[200px] ipad-max:h-[200px] w-[200px] h-[200px] lg:h-auto"
        />
      </div>
    </div>
  </div>
</template>

<style></style>
