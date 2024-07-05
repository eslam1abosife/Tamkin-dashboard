<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import { Vue3ColorPicker } from "@cyhnkckali/vue3-color-picker";
import "@cyhnkckali/vue3-color-picker/dist/style.css";

import upTamkin from "/assets/imgs/up_tamkin.svg";

definePageMeta({
  layout: "dashboard",
});
const state = reactive({
  teamName: "",
});
const rules = {
  teamName: { required },
};

const v$ = useVuelidate(rules, state);

const localePath = useLocalePath();

const openMenuResize = (typeMenu: any) => {
  if (typeMenu === "adjust") {
    openResizeMenuAdjust.value = !openResizeMenuAdjust.value;
  }
};

const currentColor = ref("#2DADA3");
const colorMode = ref("solid");
const gradient1 = ref("");
const gradient2 = ref("");
const route = useRoute();
const isLinkActive = (path) => {
  //   const localePath = this.$i18n.localePath(path);
  return route.path === localePath(path);
};

const isADHDChecked = ref(false);
const openResizeMenuManage = ref(false);
const openResizeMenuAdjust = ref(false);
const miniSizeManage = ref(false);
const miniSizeAdjust = ref(false);
const miniSizeLiveTranslation = ref(false);
const openResizeMenuLiveTranslationStats = ref(false);
const openResizeMenuLiveTranslataion = ref(false);
// In case of a range picker, you'll receive [Date, Date]
const buttonSizeSlider = ref(2);
const buttonShapeSelector = ref("type1");

const liveTranslationAsDefaultOrTranslationAbove = ref("default");

const defaultLiveTranslationButtonSelection = ref("en");
const aboveLivetranslationButtonSelection = ref("en");

const openResizeAccessMode =ref(false)
const miniSizeAccessMode =ref(false)
const openResizeWidgetCustomiztion = ref(false)
const miniSizeWidgetCustomiztion = ref(false)

const openResizeButtonLocation = ref(false)
const miniSizeButtonLocation = ref(false)
const changeButtonShape = (shape: string) => {
  buttonShapeSelector.value = shape;
};
const changeLivePositionDefaultOrAbove = (v: string) => {
  liveTranslationAsDefaultOrTranslationAbove.value = v;
};

const changeDefaultButtonShape = (v: string) => {
  defaultLiveTranslationButtonSelection.value = v;
};

const changeAboveButtonPosition = (v: string) => {
  aboveLivetranslationButtonSelection.value = v;
};

const liveTranslationMiniSize = () => {
  miniSizeLiveTranslation.value = !miniSizeLiveTranslation.value;
};

const resizeAccessMode = () => {
  miniSizeAccessMode.value = !miniSizeAccessMode.value;
};
const resizeWidgetCustomize = () => {
  miniSizeWidgetCustomiztion.value = !miniSizeWidgetCustomiztion.value;
};
const resizeButtonLocation = () => {
  miniSizeButtonLocation.value = !miniSizeButtonLocation.value;
};
const liveTranslationStats = ref(false);
</script>

<template>
  <div class="relative h-full w-full">
    <div class="mt-[23px] w-full h-full relative">
      <div class="space-y-[10px]">
        <h1 class="text-left text-[24px] leading-[36px] font-[600]">
          Customize
        </h1>

        <h2
          class="text-left text-[15px] font-[400] leading-[22.5px] text-darkGrey"
        >
          Customization empowers users to shape their digital environment
        </h2>
      </div>

      <div
        class="relative ipad-max:-mx-6 mt-[5px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col w-full justify-center lg:justify-start"
      >
        <div
          class="flex items-center lg:flex-row flex-col justify-start py-[23px] w-full rounded-[10px]"
        >
          <div class="w-full space-y-[16px]">
            <div class="flex flex-col lg:flex-row items-center justify-between">
              <div class="flex items-center justify-start space-x-[8px]">
                <div
                  class="flex items-center justify-center bg-white w-[60px] h-[60px] custom-border-tamkin custom-border-tamkin-rounded rounded-full"
                  style="box-shadow: 0px 4px 24px 8px #51459f1a"
                >
                  <img src="/assets/imgs/tamkin_hand.svg" alt="" />
                </div>
                <div class="flex items-center space-x-[16px]">
                  <!-- <h2 class="font-[600] text-[16px] leading-[24px] text-[#C5C5C5]">Select Site</h2> -->
                  <div>
                    <h2
                      class="font-[600] text-[16px] leading-[24px] text-darkGrey"
                    >
                      Tamkin.App
                    </h2>
                  </div>
                  <div>
                    <a
                      href=""
                      class="text-tamkin font-[600] text-[16px] leading-[24px] flex ]"
                      >Visit Site
                      <img
                        src="/assets/imgs/icons/external_link.svg"
                        class="ml-[14px]"
                        alt=""
                    /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="w-full mx-auto h-[43px] rounded-[22px] bg-white flex items-center px-[20px] justify-around"
      >
        <nuxt-link       :class="[isLinkActive('/overview') ? 'active_subNavb' : 'sub_menu_item']"
        :to="localePath('/overview')">Overview</nuxt-link>
        <nuxt-link
   
          :class="[
            isLinkActive('/addons') ? 'active_subNavb' : 'sub_menu_item',
          ]"
          :to="localePath('/addons')"
          >Addons</nuxt-link
        >
        <nuxt-link
          :class="[
            isLinkActive('/statistics') ? 'active_subNavb' : 'sub_menu_item',
          ]"
          :to="localePath('/statistics')"

        >
          Statistics
        </nuxt-link>
        <nuxt-link
        
          :class="[
            isLinkActive('/customize') ? 'active_subNavb' : 'sub_menu_item',
          ]"
          :to="localePath('/customize')"

          >Customize</nuxt-link
        >
        <nuxt-link
        :to="localePath('/settings')"

          :class="[
            isLinkActive('/settings') ? 'active_subNavb' : 'sub_menu_item',
          ]"
          >Settings</nuxt-link
        >
      </div>
      <div class="mt-[30px] bg-white rounded-[10px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">Button Color</h1>
            <p
              class="font-[400] text-[15px] leading-[22.95px] text-darkGrey mt-[10px]"
            >
              Choose the appropriate color that you prefer to appear in the
              icons and buttons
            </p>
          </div>

          <div
            @click.stop="openMenuResize('adjust')"
            :class="[
              openResizeMenuAdjust ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ml-auto mr-[15px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeMenuAdjust
                  ? 'stroke-current !text-white !fill-white'
                  : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="openResizeMenuAdjust"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="miniSizeAdjust = !miniSizeAdjust"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[openResizeMenuAdjust ? '!fill-white' : '']"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
                <img
                  src="/assets/imgs/addons/arrow_menu.svg"
                  tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    "
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col items-start justify-center mt-[18px] pb-[16px] overflow-hidden"
          v-if="!miniSizeAdjust"
        >
          <div class="flex items-center justify-between w-full">
            <div
              class="flex items-center justify-start px-[15px] space-x-[29px] w-full"
            >
              <div
                @click="colorMode = 'solid'"
                :class="[
                  colorMode === 'solid'
                    ? 'custom-border-tamkin padding-override-1'
                    : 'border-[1px] rounded-[10px]',
                ]"
                class="flex items-center justify-start space-x-[10px] w-[153px] h-[34px] px-[15px] cursor-pointer"
              >
                <div class="bg-[#585B5B] h-[24px] w-[24px] rounded-[5px]"></div>
                <div
                  class="text-[14px] leading-[21px] font-[400] text-[#585B5B]"
                >
                  Solid
                </div>
              </div>

              <div
                :class="[
                  colorMode === 'gradient'
                    ? 'custom-border-tamkin padding-override-1'
                    : 'border-[1px] rounded-[10px]',
                ]"
                @click="colorMode = 'gradient'"
                class="flex items-center justify-start space-x-[10px] w-[153px] h-[34px] px-[15px] cursor-pointer"
              >
                <div
                  style="
                    background: linear-gradient(
                      180deg,
                      #585b5b 0%,
                      #bac1c0 100%
                    );
                  "
                  class="h-[24px] w-[24px] rounded-[5px]"
                ></div>
                <div
                  class="text-[14px] leading-[21px] font-[400] text-[#585B5B]"
                >
                  Gradient
                </div>
              </div>
            </div>
            <div
              v-if="colorMode === 'solid'"
              :style="{ border: `1px solid ${currentColor}` }"
              class="mx-[15px] ml-auto flex items-center justify-start space-x-[10px] w-full h-[34px] rounded-[10px] px-[15px] cursor-pointer"
            >
              <div
                class="h-[24px] w-[24px] rounded-full"
                :style="{ backgroundColor: currentColor }"
              ></div>
              <div class="text-[14px] leading-[21px] font-[400] text-[#585B5B]">
                {{ currentColor }}
              </div>
            </div>

            <div
              v-if="colorMode === 'gradient'"
              class="flex items-center justify-start border-[1px] border-tamkin w-full h-[34px] rounded-[10px] mx-[15px] cursor-pointer"
            >
              <div
                class="flex items-center justify-center space-x-[10px] px-[15px]"
              >
                <div
                  class="h-[24px] w-[24px] rounded-full"
                  :style="{ backgroundColor: gradient1 }"
                ></div>
                <div
                  class="text-[14px] leading-[21px] font-[400] text-[#585B5B]"
                >
                  {{ gradient1 }}
                </div>
              </div>
              <div
                class="flex items-center justify-center space-x-[10px] ml-[50%] pr-[15px]"
              >
                <div
                  class="h-[24px] w-[24px] rounded-full"
                  :style="{ backgroundColor: gradient2 }"
                ></div>
                <div
                  class="text-[14px] leading-[21px] font-[400] text-[#585B5B]"
                >
                  {{ gradient2 }}
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-start w-full px-[5px]"
            v-if="colorMode === 'solid'"
          >
            <Client-only>
              <Vue3ColorPicker
                v-model="currentColor"
                mode="solid"
                :showColorList="false"
                :showEyeDrop="false"
                :showAlpha="false"
                type="HEX"
                class="!h-[201px] !w-full !shadow-none !bg-transparent"
                :showInputMenu="false"
                :showInputSet="false"
                :showPickerMode="false"
              />
            </Client-only>
          </div>

          <div
            class="flex items-center justify-evenly w-full px-[5px]"
            v-if="colorMode === 'gradient'"
          >
            <div class="flex items-center justify-start w-full">
              <Client-only>
                <Vue3ColorPicker
                  v-model="gradient1"
                  mode="solid"
                  :showColorList="false"
                  :showEyeDrop="false"
                  :showAlpha="false"
                  type="HEX"
                  class="!h-[201px] !w-full !shadow-none !bg-transparent"
                  :showInputMenu="false"
                  :showInputSet="false"
                  :showPickerMode="false"
                />
              </Client-only>
            </div>
            <div class="flex items-center justify-start w-full">
              <Client-only>
                <Vue3ColorPicker
                  v-model="gradient2"
                  mode="solid"
                  :showColorList="false"
                  :showEyeDrop="false"
                  :showAlpha="false"
                  type="HEX"
                  class="!h-[201px] !w-full !shadow-none !bg-transparent"
                  :showInputMenu="false"
                  :showInputSet="false"
                  :showPickerMode="false"
                />
              </Client-only>
            </div>
          </div>
        </div>

        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">Button Type</h1>
            <p
              class="font-[400] text-[15px] leading-[22.95px] text-darkGrey mt-[10px]"
            >
              Choosing the right button type and size is essential for intuitive
              navigation
            </p>
          </div>

          <div
            @click="openResizeMenuManage = !openResizeMenuManage"
            :class="[
              openResizeMenuManage ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ml-auto mr-[15px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeMenuManage
                  ? 'stroke-current !text-white !fill-white'
                  : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="openResizeMenuManage"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="miniSizeManage = !miniSizeManage"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[openResizeMenuManage ? '!fill-white' : '']"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
                <img
                  src="/assets/imgs/addons/arrow_menu.svg"
                  tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    "
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="w-full px-[16px] mt-[24px] mx-auto bg-white rounded-lg overflow-hidden"
          v-if="!miniSizeManage"
        >
          <div>
            <h1 class="text-[16px] font-[500] leading-[24px]">button Shape</h1>
            <p
              class="font-[400] text-[13px] leading-[18.95px] text-darkGrey mt-[10px]"
            >
              Choose the button Shape you prefer to appear in the widget
            </p>
          </div>
          <div class="flex items-center justify-between mt-[40px]">
            <div
              class="cursor-pointer w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative"
              :class="[buttonShapeSelector === 'type1' ? 'bg-tamkinLight' : '']"
              @click="changeButtonShape('type1')"
            >
              <div v-if="buttonShapeSelector === 'type1'">
                <img
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  alt=""
                />
              </div>
              <div class="">
                <img src="/assets/imgs/customize/access.svg" alt="" />
              </div>
            </div>

            <div
              class="w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative cursor-pointer"
              :class="[buttonShapeSelector === 'type2' ? 'bg-tamkinLight' : '']"
              @click="changeButtonShape('type2')"
            >
              <div v-if="buttonShapeSelector === 'type2'">
                <img
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  alt=""
                />
              </div>
              <div class="">
                <img src="/assets/imgs/customize/type2.svg" alt="" />
              </div>
            </div>

            <div
              :class="[buttonShapeSelector === 'type3' ? 'bg-tamkinLight' : '']"
              class="w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative cursor-pointer"
              @click="changeButtonShape('type3')"
            >
              <div v-if="buttonShapeSelector === 'type3'">
                <img
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  alt=""
                />
              </div>
              <div class="">
                <img src="/assets/imgs/customize/type 3.svg" alt="" />
              </div>
            </div>

            <div
              :class="[buttonShapeSelector === 'type4' ? 'bg-tamkinLight' : '']"
              class="w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative cursor-pointer"
              @click.prevent="changeButtonShape('type4')"
            >
              <div v-if="buttonShapeSelector === 'type4'">
                <img
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  alt=""
                />
              </div>
              <div class="">
                <img src="/assets/imgs/customize/type4.svg" alt="" />
              </div>
            </div>

            <div
              :class="[buttonShapeSelector === 'type5' ? 'bg-tamkinLight' : '']"
              class="w-[75px] h-[64px] rounded-[24px] flex items-center justify-center relative cursor-pointer"
              @click.prevent="changeButtonShape('type5')"
            >
              <div v-if="buttonShapeSelector === 'type5'">
                <img
                  src="/assets/imgs/customize/tick.svg"
                  class="absolute top-[-10px] right-0"
                  alt=""
                />
              </div>
              <div class="">
                <img src="/assets/imgs/customize/typ5.svg" alt="" />
              </div>
            </div>
          </div>

          <div class="my-[30px]">
            <h1 class="text-[16px] font-[500] leading-[24px]">button size</h1>
            <p
              class="font-[400] text-[13px] leading-[18.95px] text-darkGrey mt-[10px]"
            >
              Pull the button to select the right size for you
            </p>
          </div>
          <div class="w-full flex flex-col items-center space-y-4">
            <div class="relative w-full mb-[34px]">
              <input
                type="range"
                min="2"
                max="98"
                v-model="buttonSizeSlider"
                class="range_tamkin_customize w-full h-[20px] rounded-full shadow appearance-none bg-tamkinLight cursor-pointer"
              />
              <div
                class="absolute inset-0 left-0 h-[20px] bg-[#2DADA3] rounded-full pointer-events-none"
                :style="{ width: `${buttonSizeSlider}%` }"
              ></div>
              <div
                class="absolute inset-0 left-0 flex items-center shadow-xl shadow-tamkinLight justify-center w-[52px] h-[52px] -mt-4 bg-tamkinLight rounded-full pointer-events-none transform -translate-x-1/2"
                :style="{ left: `${buttonSizeSlider}%` }"
              >
                <img
                  src="/assets/imgs/customize/access.svg"
                  class="w-[36px] h-[36px]"
                  alt="slider thumb"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px] pb-[24px] mb-[40px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Live Site Translations Button
            </h1>

            <p
              class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
            >
              The ‘Live Site Translations’ button instantly translates web
              content, bridging languages
            </p>
          </div>

          <div
            @click="
              openResizeMenuLiveTranslataion = !openResizeMenuLiveTranslataion
            "
            :class="[
              openResizeMenuLiveTranslataion
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class="relative ml-auto mr-[15px] mt-[-24px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeMenuLiveTranslataion
                  ? 'stroke-current !text-white !fill-white'
                  : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="openResizeMenuLiveTranslataion"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="liveTranslationMiniSize"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[
                      openResizeMenuLiveTranslataion ? '!fill-white' : '',
                    ]"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
                <img
                  src="/assets/imgs/addons/arrow_menu.svg"
                  tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    "
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full px-[16px] mt-[24px] mx-auto bg-white rounded-lg overflow-hidden"
          v-if="!miniSizeLiveTranslation"
        >
          <table class="min-w-full leading-normal">
            <thead class="bg-[#FAFCFE]">
              <tr class="">
                <th
                  class="w-full border-b-2 border-gray-200 text-left text-[14px] font-[400] leading-[18px] text-black"
                >
                  Enable Live Site Translations Button
                </th>
                <th
                  class="ml-auto w-full py-3 border-b-2 border-gray-200 text-[14px] font-[400] leading-[18px] text-black"
                >
                  <div class="flex items-center">
                    <label
                      for="toggle_enable_live_button"
                      class="relative inline-flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="toggle_enable_live_button"
                        class="sr-only"
                        v-model="isADHDChecked"
                      />
                      <div
                        class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                        :class="[
                          isADHDChecked
                            ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                            : 'border-[1px] border-lightGrey',
                        ]"
                      >
                        <div
                          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                          :class="{ 'translate-x-full ': isADHDChecked }"
                        >
                          <img
                            v-if="isADHDChecked"
                            src="/assets/imgs/addons/active_toggle.svg"
                            class="w-6 h-6"
                            alt=""
                          />
                          <img
                            v-else
                            src="/assets/imgs/addons/toggle.svg"
                            class="w-6 h-6"
                            alt=""
                          />
                        </div>
                      </div>
                    </label>
                  </div>
                </th>
              </tr>
            </thead>
          </table>

          <div class="flex items-center justify-between">
            <div
              @click="changeLivePositionDefaultOrAbove('default')"
              :class="[
                liveTranslationAsDefaultOrTranslationAbove === 'default'
                  ? 'custom-border'
                  : 'border-[1px]',
              ]"
              class="mx-[15px] ml-auto flex items-center justify-start space-x-[4px] w-full h-[34px] rounded-[10px] mt-[20px] px-[15px] cursor-pointer"
            >
              <div class=" ">
                <input
                  id="radio665"
                  type="radio"
                  name="plans_radio"
                  class="hidden"
                  :checked="
                    liveTranslationAsDefaultOrTranslationAbove === 'default'
                  "
                 :value="liveTranslationAsDefaultOrTranslationAbove"
                  @click="changeLivePositionDefaultOrAbove('default')"

                />
                <label for="radio665" class="flex items-center cursor-pointer">
                  <span class="radio-tamkin w-[19px] h-[19px]"></span>
                </label>
              </div>

              <div class="text-[14px] leading-[32px] font-[400] text-darkGrey">
                Use translation button as default button
              </div>
            </div>
            <div
              :class="[
                liveTranslationAsDefaultOrTranslationAbove === 'above'
                  ? 'custom-border'
                  : 'border-[1px]',
              ]"
              @click="changeLivePositionDefaultOrAbove('above')"
              class="mx-[15px] ml-auto flex items-center justify-start space-x-[4px] w-full h-[34px] rounded-[10px] mt-[20px] px-[15px] cursor-pointer"
            >
              <div class=" ">
                <input
                  id="radio_position"
                  type="radio"
                  name="plans_radio"
                  class="hidden"
                  :value="liveTranslationAsDefaultOrTranslationAbove"
                  @click="changeLivePositionDefaultOrAbove('above')"
                  :checked="
                    liveTranslationAsDefaultOrTranslationAbove === 'above'
                  "
                />
                <label
                  for="radio_position"
                  class="flex items-center cursor-pointer"
                >
                  <span class="radio-tamkin w-[19px] h-[19px]"></span>
                </label>
              </div>

              <div class="text-[14px] leading-[32px] font-[400] text-darkGrey">
                Position translation button above
              </div>
            </div>
          </div>

          <div
            class="flex items-center justify-between mt-[33px]"
            v-if="liveTranslationAsDefaultOrTranslationAbove === 'default'"
          >
            <div
              @click="changeDefaultButtonShape('gb')"
              :class="[
                defaultLiveTranslationButtonSelection === 'gb'
                  ? 'custom-border-tamkin padding-override-1'
                  : 'border-[1px]',
              ]"
              class="h-[100px] w-[100px] border-[1px] bg-[#F8FCFF] rounded-[10px] flex items-center justify-center cursor-pointer relative"
            >
              <div
                class="absolute top-[-3px] right-[5px]"
                v-if="defaultLiveTranslationButtonSelection === 'gb'"
              >
                <img src="/assets/imgs/customize/tick_two.svg" alt="" />
              </div>
              <img src="/assets/imgs/customize/gb.svg" alt="" />
            </div>
            <div
              @click="changeDefaultButtonShape('en')"
              :class="[
                defaultLiveTranslationButtonSelection === 'en'
                  ? 'custom-border-tamkin padding-override-1'
                  : 'border-[1px]',
              ]"
              class="h-[100px] w-[100px] border-[1px] bg-[#F8FCFF] rounded-[10px] flex items-center justify-center cursor-pointer relative"
            >
              <div
                class="absolute top-[-3px] right-[5px]"
                v-if="defaultLiveTranslationButtonSelection === 'en'"
              >
                <img src="/assets/imgs/customize/tick_two.svg" alt="" />
              </div>

              <img src="/assets/imgs/customize/en.svg" alt="" />
            </div>
            <div
              @click="changeDefaultButtonShape('langs')"
              :class="[
                defaultLiveTranslationButtonSelection === 'langs'
                  ? 'custom-border-tamkin padding-override-1'
                  : 'border-[1px]',
              ]"
              class="h-[100px] w-[100px] border-[1px] bg-[#F8FCFF] rounded-[10px] flex items-center justify-center cursor-pointer relative"
            >
              <div
                class="absolute top-[-3px] right-[5px]"
                v-if="defaultLiveTranslationButtonSelection === 'langs'"
              >
                <img src="/assets/imgs/customize/tick_two.svg" alt="" />
              </div>
              <img src="/assets/imgs/customize/langs.svg" alt="" />
            </div>
          </div>

          <div
            class="flex items-center justify-between mt-[33px]"
            v-if="liveTranslationAsDefaultOrTranslationAbove === 'above'"
          >
            <div
              @click="changeAboveButtonPosition('gb')"
              :class="[
                aboveLivetranslationButtonSelection === 'gb'
                  ? 'custom-border-tamkin padding-override-1'
                  : 'border-[1px]',
              ]"
              class="h-[100px] w-[100px] border-[1px] bg-[#F8FCFF] rounded-[10px] flex items-center justify-center cursor-pointer relative"
            >
              <div
                class="absolute top-[-3px] right-[5px]"
                v-if="aboveLivetranslationButtonSelection === 'gb'"
              >
                <img src="/assets/imgs/customize/tick_two.svg" alt="" />
              </div>
              <div class="flex flex-col items-center justify-center">
                <img
                  src="/assets/imgs/customize/gb.svg"
                  class="w-[40px] h-[40px]"
                  alt=""
                />
                <img
                  src="/assets/imgs/customize/access.svg"
                  class="w-[30px] h-[30px]"
                  alt=""
                />
              </div>
            </div>
            <div
              @click="changeAboveButtonPosition('en')"
              :class="[
                aboveLivetranslationButtonSelection === 'en'
                  ? 'custom-border-tamkin padding-override-1'
                  : 'border-[1px]',
              ]"
              class="h-[100px] w-[100px] border-[1px] bg-[#F8FCFF] rounded-[10px] flex items-center justify-center cursor-pointer relative"
            >
              <div
                class="absolute top-[-3px] right-[5px]"
                v-if="aboveLivetranslationButtonSelection === 'en'"
              >
                <img src="/assets/imgs/customize/tick_two.svg" alt="" />
              </div>

              <div
                class="flex flex-col items-center justify-center space-y-[8px]"
              >
                <img
                  src="/assets/imgs/customize/en.svg"
                  class="w-[30px] h-[30px]"
                  alt=""
                />
                <img
                  src="/assets/imgs/customize/access.svg"
                  class="w-[30px] h-[30px]"
                  alt=""
                />
              </div>
            </div>
            <div
              @click="changeAboveButtonPosition('langs')"
              :class="[
                aboveLivetranslationButtonSelection === 'langs'
                  ? 'custom-border-tamkin padding-override-1'
                  : 'border-[1px]',
              ]"
              class="h-[100px] w-[100px] border-[1px] bg-[#F8FCFF] rounded-[10px] flex items-center justify-center cursor-pointer relative"
            >
              <div
                class="absolute top-[-3px] right-[5px]"
                v-if="aboveLivetranslationButtonSelection === 'langs'"
              >
                <img src="/assets/imgs/customize/tick_two.svg" alt="" />
              </div>
              <div
                class="flex flex-col items-center justify-center space-y-[8px]"
              >
                <img
                  src="/assets/imgs/customize/langs.svg"
                  class="w-[30px] h-[30px]"
                  alt=""
                />
                <img
                  src="/assets/imgs/customize/access.svg"
                  class="w-[30px] h-[30px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[34px] bg-white rounded-[10px] pb-[24px] mb-[40px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Button Location
            </h1>

            <p
              class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
            >
              Select the location where you want the button to appear
            </p>
          </div>
       
          
          <div
            @click="
            openResizeButtonLocation = !openResizeButtonLocation
            "
            :class="[
              openResizeButtonLocation
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class="relative ml-auto mr-[15px] mt-[-24px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeButtonLocation
                  ? 'stroke-current !text-white !fill-white'
                  : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="openResizeButtonLocation"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="resizeButtonLocation"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[
                      openResizeButtonLocation ? '!fill-white' : '',
                    ]"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
                <img
                  src="/assets/imgs/addons/arrow_menu.svg"
                  tyle="box-shadow: 0px 2px 6px 0px #00000040;
                      "
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <CustomizePositioning v-if="!miniSizeButtonLocation"/>
        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[34px] bg-white rounded-[10px] pb-[24px] mb-[40px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Widget Customization
            </h1>

            <p
              class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
            >
              Customize your widgets for a tailored browsing experience
            </p>
          </div>
          
          <div
            @click="
            openResizeWidgetCustomiztion = !openResizeWidgetCustomiztion
            "
            :class="[
              openResizeWidgetCustomiztion
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class="relative ml-auto mr-[15px] mt-[-24px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeWidgetCustomiztion
                  ? 'stroke-current !text-white !fill-white'
                  : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="openResizeWidgetCustomiztion"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="resizeWidgetCustomize"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[
                      openResizeWidgetCustomiztion ? '!fill-white' : '',
                    ]"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
                <img
                  src="/assets/imgs/addons/arrow_menu.svg"
                  tyle="box-shadow: 0px 2px 6px 0px #00000040;
                      "
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <CustomizeWidgetCustomize v-if="!miniSizeWidgetCustomiztion"/>

        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <div class="mt-[34px] bg-white rounded-[10px] pb-[24px] mb-[40px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Accessibility Mode
            </h1>

            <p
              class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
            >
              Accessibility Mode optimizes interface for diverse user needs and
              disabilities
            </p>
          </div>

          <div
            @click="
            openResizeAccessMode = !openResizeAccessMode
            "
            :class="[
              openResizeAccessMode
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class="relative ml-auto mr-[15px] mt-[-24px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeAccessMode
                  ? 'stroke-current !text-white !fill-white'
                  : '',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>

            <div
              v-if="openResizeAccessMode"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="resizeAccessMode"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[
                      openResizeAccessMode ? '!fill-white' : '',
                    ]"
                  />
                </div>
                <div class="text-[14px] leading-[21px] font-[400]">
                  Minisize
                </div>
              </div>

              <div
                class="absolute top-[10px] right-[-10px] z-[50] !border-none"
              >
                <img
                  src="/assets/imgs/addons/arrow_menu.svg"
                  tyle="box-shadow: 0px 2px 6px 0px #00000040;
                      "
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <CustomizeAccessibilityMode v-if="!miniSizeAccessMode"/>

        <div
          v-else
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      </div>

      <CustomizeAdjustMainMenu />
      <CustomizeAccessibilityProfiles />
      <CustomizeWidgetType />
      <CustomizeLanguage />
      <CustomizeCustomTrigger />
    </div>
  </div>
</template>

<style>
.toggle {
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #eef5ff 47.07%,
    #f6f3fc 72.04%,
    #fef5f6 100%
  );
  box-shadow: 0px 4px 24px 8px rgba(81, 69, 159, 0.1);
}
.bg_interval_open {
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  @apply !text-white;

  &.tamkin {
    @apply rounded-[10px] h-[32px];
  }
}

.tamkin_date_input {
  box-shadow: 0px 1.54px 3.08px 0px #61616133;

  box-shadow: 0px 0.77px 1.54px 0px #61616133;

  @apply pl-[14px] text-[15px] w-full  h-[32px] rounded-[10px] border-[1px] border-[#585B5B8C] focus:!outline-0;
}

/* Add custom styles here if needed */
.range_tamkin_customize::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 40px;
  height: 40px;
  background: transparent; /* Hide the default thumb */
  cursor: pointer;
}

.range_tamkin_customize::-moz-range-thumb {
  width: 40px;
  height: 40px;
  background: transparent; /* Hide the default thumb */
  cursor: pointer;
}
</style>
