<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import mysiteAnimation from "~/assets/animation/mysite.json";
import { useModalStore } from "@/stores/modal";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
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
const modalStore = useModalStore();
const dataAvailable = ref(true);
const editTeamNameMode = ref(false);

const currentTab = ref("saved");

const switchTab = (tab: any) => {
  currentTab.value = tab;
};

const checked = ref([]);
const deletedSites = ref([
  { id: "1", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "2", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "3", name: "Tamkin", image: "https://via.placeholder.com/24" },
  { id: "4", name: "Tamkin", image: "https://via.placeholder.com/24" },
]);

const checkAll = computed({
  get() {
    return (
      deletedSites.value && checked.value.length === deletedSites.value.length
    );
  },
  set(value) {
    checked.value = value ? deletedSites.value.map((lang) => lang.id) : [];
  },
});
const localePath = useLocalePath();

const isSearchfilled = ref(false);
const search = ref("");
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};
const openMenuResize = (typeMenu:any)=>{
    if(typeMenu === 'adjust'){
        openResizeMenuAdjust.value = !openResizeMenuAdjust.value
        }
}
const isPageStrucChecked = ref(false);
const isScreenChecked = ref(false);
const isHideImagesChecked = ref(false);
const isContrastChecked = ref(false);
const isVoiceNavigationChecked =ref(false)
const isDictChecked =ref(false)
const isHighLightChecked =ref(false)
const isLineHeightChecked =ref(false)
const isSaturationChecked =ref(false)
const isBiggerTextChecked =ref(false)
const isPauseAnimationChecked =ref(false)
const isToolTipChecked = ref(false)
const isCursorChecked = ref(false)
const isTextSpacingChecked = ref(false)
const isContrastPlusChecked = ref(false)

const isMotorActive = ref(false)
const isColorBlindChecked = ref(false)
const isVisuallyImprairedChecked = ref(false)
const isSeizureChecked = ref(false)
const isBlindChecked = ref(false)
const isDyslexiaChecked = ref(false)
const isCongitiveChecked = ref(false)
const isADHDChecked = ref(false)

const openResizeMenuManage = ref(false)
const openResizeMenuAdjust = ref(false)
const miniSizeManage = ref(false)
const miniSizeAdjust = ref(false)
const miniSizeLiveTranslation = ref(false)
const verticalView = ref(false)
const horizontalView = ref(true)
const openResizeMenuLiveTranslataion = ref(false)

const liveTransaltionSwitchToVerticalOrHorizontal = (directionVOrH:any)=>{

  verticalView.value = !verticalView.value

  horizontalView.value = !horizontalView.value
  miniSizeLiveTranslation.value =false


}

const liveTranslationMiniSize = ()=>{
  verticalView.value = false
horizontalView.value = false
  miniSizeLiveTranslation.value = !miniSizeLiveTranslation.value
}
</script>

<template>
  <div class="w-full h-full relative">
    <!-- <div class="bg-whiteTamkin h-[75px] w-full fixed rounded-t-[10px] z-[100] ml-[-40px] bottom-0" style="box-shadow: 4px 4px 24px 8px #51459F1A;"></div> -->
    <div
      class="absolute left-0 right-0 w-full h-[100px] z-20 top-[-25%]"
      style="
        box-shadow: 0px 4px 24px 8px #51459f1a;
        background: linear-gradient(
          180deg,
          #fefefe 0%,
          #eef5ff 47.07%,
          #f6f3fc 72.04%,
          #fef5f6 100%
        );
      "
    ></div>
    <div class="mt-[23px] w-full h-full relative">
      <div class="space-y-[10px]">
        <h1 class="text-left text-[24px] leading-[36px] font-[600]">Addons</h1>

        <h2
          class="text-left text-[15px] font-[400] leading-[22.5px] text-darkGrey"
        >
          Enable the Accessibility Services Addons to improve usability and
          enhance your experience.
        </h2>
      </div>

      <div
        class="ipad-max:-mx-6 mt-[5px] flex lg:space-y-0 space-y-[16px] items-center lg:flex-row flex-col w-full justify-center lg:justify-start"
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
        class="w-full mx-auto h-[43px] rounded-[22px] bg-white flex items-center px-[10px] justify-center"
      >
        <div
          class="text-center cursor-pointer text-[#A7A7A7] text-[15px] leading-[22.5px] font-[600] mr-[72px] flex-1"
        >
          Overview
        </div>
        <div
          style="
            background: linear-gradient(
              180deg,
              #fefefe 0%,
              #eef5ff 47.07%,
              #f6f3fc 72.04%,
              #fef5f6 100%
            );
          "
          class="w-[96px] h-[31px] cursor-pointer rounded-[22px] border-[1px] border-black flex items-center justify-center text-darkGrey text-[15px] leading-[22.5px] font-[500] text-center mr-[72px] flex-1"
        >
          Addons
        </div>
        <div
          class="text-[#A7A7A7] text-[15px] leading-[22.5px] font-[600] text-left mr-[72px] flex-1"
        >
          Statistics
        </div>
        <div
          class="text-[#A7A7A7] text-[15px] leading-[22.5px] font-[600] text-center flex-1"
        >
          Customize
        </div>
        <div
          class="text-[#A7A7A7] text-[15px] leading-[22.5px] font-[600] text-center ml-[72px] flex-1"
        >
          Settings
        </div>
      </div>
      <div class="mt-[30px] bg-white rounded-[10px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
         <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
                Adjust the Main Menu
              </h1>
         </div>

         <div @click.stop="openMenuResize('adjust')" 
         :class="[openResizeMenuAdjust ? 'active_notification !text-darkGrey' :'']" 
         class="relative ml-auto mr-[15px] flex items-center justify-center cursor-pointer  bg-[#F2F2F2]
          rounded-[10px] w-[36px] h-[36px]">
            <svg width="18" height="5" viewBox="0 0 18 5" fill="none" xmlns="http://www.w3.org/2000/svg"
            :class="[openResizeMenuAdjust ? 'stroke-current !text-white !fill-white' :'']"
            
            >
                <path d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z" fill="currentColor"/>
                </svg>
                
            <div v-if="openResizeMenuAdjust" style="box-shadow: 0px 2px 6px 0px #00000040;
" class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px]  bg-white rounded-[10px] border-[1px] border-lightGrey">
                <div 
               
                class="flex items-center justify-start cursor-pointer space-x-[8px] 
                mt-[20px] mb-[8px] py-[8px] px-[12px] border-t border-b w-full" @click="miniSizeAdjust  = !miniSizeAdjust">
                    <div>
                        
                        <img src="/assets/imgs/addons/min_size.svg" alt=""  > 
                    </div>
                    <div class="text-[14px] leading-[21px] font-[400] ">Minisize</div>
                   
                </div>
       
                <div class="absolute top-[10px] right-[-10px] z-[50] !border-none">


                    <img src="/assets/imgs/addons/arrow_menu.svg" tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    " alt="" class="w-full h-full    ">
                </div>
            </div>
           
         </div>
        </div>

        <div
          class="flex flex-col items-start justify-center ml-[15px] mt-[18px] divide-y"
          v-if="!miniSizeAdjust"
        >
          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start space-x-[13px] w-full " >
              <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isPageStrucChecked ? 'opacity-60':'']"/>

              <img src="/assets/imgs/addons/page_str.svg" alt="" :class="[!isPageStrucChecked ? 'opacity-60':'']"/>
              <div class="flex flex-col items-start justify-center w-full" :class="[!isPageStrucChecked ? 'opacity-60':'']">
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Page Structure </span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle"
                  class="relative inline-flex items-center cursor-pointer h-[32px]"
                >
                  <input
                    type="checkbox"
                    id="toggle"
                    class="sr-only"
                    v-model="isPageStrucChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white  rounded-full 
                    peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[isPageStrucChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' :'border-[1px] border-lightGrey']"

                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                      transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isPageStrucChecked }"
                    >
                    <img v-if="isPageStrucChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
                    <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start space-x-[13px] w-full " >
              <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isScreenChecked ? 'opacity-60':'']"/>

              <img src="/assets/imgs/addons/language sign.svg" alt="" :class="[!isScreenChecked ? 'opacity-60':'']"/>
              <div class="flex flex-col items-start justify-center w-full" :class="[!isScreenChecked ? 'opacity-60':'']">
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Screen Reader</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_screen"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_screen"
                    class="sr-only"
                    v-model="isScreenChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white  rounded-full 
                    peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[isScreenChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
                    :'border-[1px] border-lightGrey']"

                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                      transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isScreenChecked }"
                    >
                    <img v-if="isScreenChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
                    <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
          class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
        >
          <div class="flex items-center justify-start space-x-[13px] w-full " >
            <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isHideImagesChecked ? 'opacity-60':'']"/>

            <img src="/assets/imgs/addons/hide_images.svg" alt="" :class="[!isHideImagesChecked ? 'opacity-60':'']"/>
            <div class="flex flex-col items-start justify-center w-full" :class="[!isHideImagesChecked ? 'opacity-60':'']">
              <div
                class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
              >
                <span>Hide Images</span>
              </div>
              <div
                class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
              >
                <span>
                  Voluptate ullam minima assumenda nesciunt delectus sequi.
                  Veniam suscipit nesciunt esse sint aperiam aliquid
                </span>
              </div>
            </div>
            <div class="ml-auto">
              <label
                for="toggle_hide_images"
                class="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="toggle_hide_images"
                  class="sr-only"
                  v-model="isHideImagesChecked"
                />
                <div
                  class="w-14 h-8 bg-white  rounded-full 
                  peer-checked:bg-green-500 transition-colors duration-200"
                  :class="[isHideImagesChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
                  :'border-[1px] border-lightGrey']"

                >
                  <div
                    class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                    transition-transform duration-200 transform"
                    :class="{ 'translate-x-full ': isHideImagesChecked }"
                  >
                  <img v-if="isHideImagesChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
                  <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        
        <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start space-x-[13px] w-full " >
          <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isContrastChecked ? 'opacity-60':'']"/>

          <img src="/assets/imgs/addons/contrast.svg" alt="" :class="[!isContrastChecked ? 'opacity-60':'']"/>
          <div class="flex flex-col items-start justify-center w-full" :class="[!isContrastChecked ? 'opacity-60':'']">
            <div
              class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
            >
              <span>Smart Contrast</span>
            </div>
            <div
              class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
            >
              <span>
                Voluptate ullam minima assumenda nesciunt delectus sequi.
                Veniam suscipit nesciunt esse sint aperiam aliquid
              </span>
            </div>
          </div>
          <div class="ml-auto">
            <label
              for="toggle_contrast"
              class="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle_contrast"
                class="sr-only"
                v-model="isContrastChecked"
              />
              <div
                class="w-14 h-8 bg-white  rounded-full 
                peer-checked:bg-green-500 transition-colors duration-200"
                :class="[isContrastChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
                :'border-[1px] border-lightGrey']"

              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                  transition-transform duration-200 transform"
                  :class="{ 'translate-x-full ': isContrastChecked }"
                >
                <img v-if="isContrastChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
                <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
          
      <div
      class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
    >
      <div class="flex items-center justify-start space-x-[13px] w-full " >
        <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isVoiceNavigationChecked ? 'opacity-60':'']"/>

        <img src="/assets/imgs/addons/voice_navigation.svg" alt="" :class="[!isVoiceNavigationChecked ? 'opacity-60':'']"/>
        <div class="flex flex-col items-start justify-center w-full" :class="[!isVoiceNavigationChecked ? 'opacity-60':'']">
          <div
            class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
          >
            <span>Voice Navigation</span>
          </div>
          <div
            class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
          >
            <span>
              Voluptate ullam minima assumenda nesciunt delectus sequi.
              Veniam suscipit nesciunt esse sint aperiam aliquid
            </span>
          </div>
        </div>
        <div class="ml-auto">
          <label
            for="toggle_voice"
            class="relative inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="toggle_voice"
              class="sr-only"
              v-model="isVoiceNavigationChecked"
            />
            <div
              class="w-14 h-8 bg-white  rounded-full 
              peer-checked:bg-green-500 transition-colors duration-200"
              :class="[isVoiceNavigationChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
              :'border-[1px] border-lightGrey']"

            >
              <div
                class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                transition-transform duration-200 transform"
                :class="{ 'translate-x-full ': isVoiceNavigationChecked }"
              >
              <img v-if="isVoiceNavigationChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
              <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>




    <div
    class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
  >
    <div class="flex items-center justify-start space-x-[13px] w-full " >
      <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isDictChecked ? 'opacity-60':'']"/>

      <img src="/assets/imgs/addons/a-z.svg" alt="" :class="[!isDictChecked ? 'opacity-60':'']"/>
      <div class="flex flex-col items-start justify-center w-full" :class="[!isDictChecked ? 'opacity-60':'']">
        <div
          class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
        >
          <span>Dictionary</span>
        </div>
        <div
          class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
        >
          <span>
            Voluptate ullam minima assumenda nesciunt delectus sequi.
            Veniam suscipit nesciunt esse sint aperiam aliquid
          </span>
        </div>
      </div>
      <div class="ml-auto">
        <label
          for="toggle_dict"
          class="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="toggle_dict"
            class="sr-only"
            v-model="isDictChecked"
          />
          <div
            class="w-14 h-8 bg-white  rounded-full 
            peer-checked:bg-green-500 transition-colors duration-200"
            :class="[isDictChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
            :'border-[1px] border-lightGrey']"

          >
            <div
              class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
              transition-transform duration-200 transform"
              :class="{ 'translate-x-full ': isDictChecked }"
            >
            <img v-if="isDictChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
            <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>









  <div
  class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
  <div class="flex items-center justify-start space-x-[13px] w-full " >
    <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isHighLightChecked ? 'opacity-60':'']"/>

    <img src="/assets/imgs/addons/clip.svg" alt="" :class="[!isHighLightChecked ? 'opacity-60':'']"/>
    <div class="flex flex-col items-start justify-center w-full" :class="[!isHighLightChecked ? 'opacity-60':'']">
      <div
        class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
      >
        <span>Highlight Links</span>
      </div>
      <div
        class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
      >
        <span>
          Voluptate ullam minima assumenda nesciunt delectus sequi.
          Veniam suscipit nesciunt esse sint aperiam aliquid
        </span>
      </div>
    </div>
    <div class="ml-auto">
      <label
        for="toggle_hightlights"
        class="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="toggle_hightlights"
          class="sr-only"
          v-model="isHighLightChecked"
        />
        <div
          class="w-14 h-8 bg-white  rounded-full 
          peer-checked:bg-green-500 transition-colors duration-200"
          :class="[isHighLightChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
          :'border-[1px] border-lightGrey']"

        >
          <div
            class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
            transition-transform duration-200 transform"
            :class="{ 'translate-x-full ': isHighLightChecked }"
          >
          <img v-if="isHighLightChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
          <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
          </div>
        </div>
      </label>
    </div>
  </div>
</div>


<div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
<div class="flex items-center justify-start space-x-[13px] w-full " >
  <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isLineHeightChecked ? 'opacity-60':'']"/>

  <img src="/assets/imgs/addons/line_height.svg" alt="" :class="[!isLineHeightChecked ? 'opacity-60':'']"/>
  <div class="flex flex-col items-start justify-center w-full" :class="[!isLineHeightChecked ? 'opacity-60':'']">
    <div
      class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
    >
      <span>Line Height</span>
    </div>
    <div
      class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
    >
      <span>
        Voluptate ullam minima assumenda nesciunt delectus sequi.
        Veniam suscipit nesciunt esse sint aperiam aliquid
      </span>
    </div>
  </div>
  <div class="ml-auto">
    <label
      for="toggle_line_height"
      class="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle_line_height"
        class="sr-only"
        v-model="isLineHeightChecked"
      />
      <div
        class="w-14 h-8 bg-white  rounded-full 
        peer-checked:bg-green-500 transition-colors duration-200"
        :class="[isLineHeightChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
        :'border-[1px] border-lightGrey']"

      >
        <div
          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
          transition-transform duration-200 transform"
          :class="{ 'translate-x-full ': isLineHeightChecked }"
        >
        <img v-if="isLineHeightChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
        <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
        </div>
      </div>
    </label>
  </div>
</div>
</div>









<div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
<div class="flex items-center justify-start space-x-[13px] w-full " >
  <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isSaturationChecked ? 'opacity-60':'']"/>

  <img src="/assets/imgs/addons/saturation.svg" alt="" :class="[!isSaturationChecked ? 'opacity-60':'']"/>
  <div class="flex flex-col items-start justify-center w-full" :class="[!isSaturationChecked ? 'opacity-60':'']">
    <div
      class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
    >
      <span>Saturation</span>
    </div>
    <div
      class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
    >
      <span>
        Voluptate ullam minima assumenda nesciunt delectus sequi.
        Veniam suscipit nesciunt esse sint aperiam aliquid
      </span>
    </div>
  </div>
  <div class="ml-auto">
    <label
      for="toggle_saturation"
      class="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle_saturation"
        class="sr-only"
        v-model="isSaturationChecked"
      />
      <div
        class="w-14 h-8 bg-white  rounded-full 
        peer-checked:bg-green-500 transition-colors duration-200"
        :class="[isSaturationChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
        :'border-[1px] border-lightGrey']"

      >
        <div
          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
          transition-transform duration-200 transform"
          :class="{ 'translate-x-full ': isSaturationChecked }"
        >
        <img v-if="isSaturationChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
        <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
        </div>
      </div>
    </label>
  </div>
</div>
</div>








<div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
<div class="flex items-center justify-start space-x-[13px] w-full " >
  <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isBiggerTextChecked ? 'opacity-60':'']"/>

  <img src="/assets/imgs/addons/text.svg" alt="" :class="[!isBiggerTextChecked ? 'opacity-60':'']"/>
  <div class="flex flex-col items-start justify-center w-full" :class="[!isBiggerTextChecked ? 'opacity-60':'']">
    <div
      class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
    >
      <span>Bigger Text</span>
    </div>
    <div
      class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
    >
      <span>
        Voluptate ullam minima assumenda nesciunt delectus sequi.
        Veniam suscipit nesciunt esse sint aperiam aliquid
      </span>
    </div>
  </div>
  <div class="ml-auto">
    <label
      for="toggle_bigger"
      class="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle_bigger"
        class="sr-only"
        v-model="isBiggerTextChecked"
      />
      <div
        class="w-14 h-8 bg-white  rounded-full 
        peer-checked:bg-green-500 transition-colors duration-200"
        :class="[isBiggerTextChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
        :'border-[1px] border-lightGrey']"

      >
        <div
          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
          transition-transform duration-200 transform"
          :class="{ 'translate-x-full ': isBiggerTextChecked }"
        >
        <img v-if="isBiggerTextChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
        <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
        </div>
      </div>
    </label>
  </div>
</div>
</div>






<div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
<div class="flex items-center justify-start space-x-[13px] w-full " >
  <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isPauseAnimationChecked ? 'opacity-60':'']"/>

  <img src="/assets/imgs/addons/pause.svg" alt="" :class="[!isPauseAnimationChecked ? 'opacity-60':'']"/>
  <div class="flex flex-col items-start justify-center w-full" :class="[!isPauseAnimationChecked ? 'opacity-60':'']">
    <div
      class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
    >
      <span>Pause Animation</span>
    </div>
    <div
      class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
    >
      <span>
        Voluptate ullam minima assumenda nesciunt delectus sequi.
        Veniam suscipit nesciunt esse sint aperiam aliquid
      </span>
    </div>
  </div>
  <div class="ml-auto">
    <label
      for="toggle_pause_animation"
      class="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle_pause_animation"
        class="sr-only"
        v-model="isPauseAnimationChecked"
      />
      <div
        class="w-14 h-8 bg-white  rounded-full 
        peer-checked:bg-green-500 transition-colors duration-200"
        :class="[isPauseAnimationChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
        :'border-[1px] border-lightGrey']"

      >
        <div
          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
          transition-transform duration-200 transform"
          :class="{ 'translate-x-full ': isPauseAnimationChecked }"
        >
        <img v-if="isPauseAnimationChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
        <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
        </div>
      </div>
    </label>
  </div>
</div>
</div>
<div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
<div class="flex items-center justify-start space-x-[13px] w-full " >
  <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isToolTipChecked ? 'opacity-60':'']"/>

  <img src="/assets/imgs/addons/tooltip.svg" alt="" :class="[!isToolTipChecked ? 'opacity-60':'']"/>
  <div class="flex flex-col items-start justify-center w-full" :class="[!isToolTipChecked ? 'opacity-60':'']">
    <div
      class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
    >
      <span>Tooltip</span>
    </div>
    <div
      class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
    >
      <span>
        Voluptate ullam minima assumenda nesciunt delectus sequi.
        Veniam suscipit nesciunt esse sint aperiam aliquid
      </span>
    </div>
  </div>
  <div class="ml-auto">
    <label
      for="toggle_tooltip"
      class="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle_tooltip"
        class="sr-only"
        v-model="isToolTipChecked"
      />
      <div
        class="w-14 h-8 bg-white  rounded-full 
        peer-checked:bg-green-500 transition-colors duration-200"
        :class="[isToolTipChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
        :'border-[1px] border-lightGrey']"

      >
        <div
          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
          transition-transform duration-200 transform"
          :class="{ 'translate-x-full ': isToolTipChecked }"
        >
        <img v-if="isToolTipChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
        <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
        </div>
      </div>
    </label>
  </div>
</div>
</div>



<div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
<div class="flex items-center justify-start space-x-[13px] w-full " >
  <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isCursorChecked ? 'opacity-60':'']"/>

  <img src="/assets/imgs/addons/cursor.svg" alt="" :class="[!isCursorChecked ? 'opacity-60':'']"/>
  <div class="flex flex-col items-start justify-center w-full" :class="[!isCursorChecked ? 'opacity-60':'']">
    <div
      class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
    >
      <span>Cursor</span>
    </div>
    <div
      class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
    >
      <span>
        Voluptate ullam minima assumenda nesciunt delectus sequi.
        Veniam suscipit nesciunt esse sint aperiam aliquid
      </span>
    </div>
  </div>
  <div class="ml-auto">
    <label
      for="toggle_cursor"
      class="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle_cursor"
        class="sr-only"
        v-model="isCursorChecked"
      />
      <div
        class="w-14 h-8 bg-white  rounded-full 
        peer-checked:bg-green-500 transition-colors duration-200"
        :class="[isCursorChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
        :'border-[1px] border-lightGrey']"

      >
        <div
          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
          transition-transform duration-200 transform"
          :class="{ 'translate-x-full ': isCursorChecked }"
        >
        <img v-if="isCursorChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
        <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
        </div>
      </div>
    </label>
  </div>
</div>
</div>


<div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
<div class="flex items-center justify-start space-x-[13px] w-full " >
  <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isTextSpacingChecked ? 'opacity-60':'']"/>

  <img src="/assets/imgs/addons/text_spacing.svg" alt="" :class="[!isTextSpacingChecked ? 'opacity-60':'']"/>
  <div class="flex flex-col items-start justify-center w-full" :class="[!isTextSpacingChecked ? 'opacity-60':'']">
    <div
      class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
    >
      <span>Text Spacing</span>
    </div>
    <div
      class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
    >
      <span>
        Voluptate ullam minima assumenda nesciunt delectus sequi.
        Veniam suscipit nesciunt esse sint aperiam aliquid
      </span>
    </div>
  </div>
  <div class="ml-auto">
    <label
      for="toggle_textspacing"
      class="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle_textspacing"
        class="sr-only"
        v-model="isTextSpacingChecked"
      />
      <div
        class="w-14 h-8 bg-white  rounded-full 
        peer-checked:bg-green-500 transition-colors duration-200"
        :class="[isTextSpacingChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
        :'border-[1px] border-lightGrey']"

      >
        <div
          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
          transition-transform duration-200 transform"
          :class="{ 'translate-x-full ': isTextSpacingChecked }"
        >
        <img v-if="isTextSpacingChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
        <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
        </div>
      </div>
    </label>
  </div>
</div>
</div>


<div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
<div class="flex items-center justify-start space-x-[13px] w-full " >
  <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isContrastPlusChecked ? 'opacity-60':'']"/>

  <img src="/assets/imgs/addons/contrast_plus.svg" alt="" :class="[!isContrastPlusChecked ? 'opacity-60':'']"/>
  <div class="flex flex-col items-start justify-center w-full" :class="[!isContrastPlusChecked ? 'opacity-60':'']">
    <div
      class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
    >
      <span>Contrast +</span>
    </div>
    <div
      class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
    >
      <span>
        Voluptate ullam minima assumenda nesciunt delectus sequi.
        Veniam suscipit nesciunt esse sint aperiam aliquid
      </span>
    </div>
  </div>
  <div class="ml-auto">
    <label
      for="toggle_contrast_plus"
      class="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle_contrast_plus"
        class="sr-only"
        v-model="isContrastPlusChecked"
      />
      <div
        class="w-14 h-8 bg-white  rounded-full 
        peer-checked:bg-green-500 transition-colors duration-200"
        :class="[isContrastPlusChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
        :'border-[1px] border-lightGrey']"

      >
        <div
          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
          transition-transform duration-200 transform"
          :class="{ 'translate-x-full ': isContrastPlusChecked }"
        >
        <img v-if="isContrastPlusChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
        <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
        </div>
      </div>
    </label>
  </div>
</div>
</div>

        </div>

        <div v-else class="py-[24px] w-3/4  text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]">
            Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est veritatis dolore. Exercitationem et omnis ea quidem
 
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
         <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
                Manage your Accessibility Profiles
              </h1>
         </div>
         <div @click="openResizeMenuManage =!openResizeMenuManage" :class="[openResizeMenuManage ? 'active_notification !text-darkGrey' :'']" class="relative ml-auto mr-[15px] flex items-center justify-center cursor-pointer  bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]">
            <svg width="18" height="5" viewBox="0 0 18 5" fill="none" xmlns="http://www.w3.org/2000/svg"
            :class="[openResizeMenuManage ? 'stroke-current !text-white !fill-white' :'']"
            
            >
                <path d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z" fill="currentColor"/>
                </svg>
                
            <div v-if="openResizeMenuManage" style="box-shadow: 0px 2px 6px 0px #00000040;
" class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px]  bg-white rounded-[10px] border-[1px] border-lightGrey">
                <div 
               
                class="flex items-center justify-start cursor-pointer space-x-[8px] 
                mt-[20px] mb-[8px] py-[8px] px-[12px] border-t border-b w-full" @click="miniSizeManage  = !miniSizeManage">
                    <div>
                        
                        <img src="/assets/imgs/addons/min_size.svg" alt="" :class="[openResizeMenuManage ? '!fill-white' :'']" > 
                    </div>
                    <div class="text-[14px] leading-[21px] font-[400] ">Minisize</div>
                   
                </div>
       
                <div class="absolute top-[10px] right-[-10px] z-[50] !border-none">


                    <img src="/assets/imgs/addons/arrow_menu.svg" tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    " alt="" class="w-full h-full    ">
                </div>
            </div>
           
         </div>
        </div>

        <div
          class="flex flex-col items-start justify-center ml-[15px] mt-[18px] divide-y" v-if="!miniSizeManage"
        >
          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start space-x-[13px] w-full " >
              <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isMotorActive ? 'opacity-60':'']"/>

              <img src="/assets/imgs/addons/monitor_im.svg" alt="" :class="[!isMotorActive ? 'opacity-60':'']"/>
              <div class="flex flex-col items-start justify-center w-full" :class="[!isMotorActive ? 'opacity-60':'']">
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Motor impaired</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_motor"
                  class="relative inline-flex items-center cursor-pointer h-[32px]"
                >
                  <input
                    type="checkbox"
                    id="toggle_motor"
                    class="sr-only"
                    v-model="isMotorActive"
                  />
                  <div
                    class="w-14 h-8 bg-white  rounded-full 
                    peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[isMotorActive ? 'custom-border-tamkin custom-border-tamkin-rounded-small' :'border-[1px] border-lightGrey']"

                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                      transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isMotorActive }"
                    >
                    <img v-if="isMotorActive" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
                    <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start space-x-[13px] w-full " >
              <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isColorBlindChecked ? 'opacity-60':'']"/>

              <img src="/assets/imgs/addons/color_blind.svg" alt="" :class="[!isColorBlindChecked ? 'opacity-60':'']"/>
              <div class="flex flex-col items-start justify-center w-full" :class="[!isColorBlindChecked ? 'opacity-60':'']">
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Color blind</span>
                </div>
                <div
                  class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
                >
                  <span>
                    Voluptate ullam minima assumenda nesciunt delectus sequi.
                    Veniam suscipit nesciunt esse sint aperiam aliquid
                  </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_colorBlind"
                  class="relative inline-flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="toggle_colorBlind"
                    class="sr-only"
                    v-model="isColorBlindChecked"
                  />
                  <div
                    class="w-14 h-8 bg-white  rounded-full 
                    peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[isColorBlindChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
                    :'border-[1px] border-lightGrey']"

                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                      transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': isColorBlindChecked }"
                    >
                    <img v-if="isColorBlindChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
                    <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div
          class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
        >
          <div class="flex items-center justify-start space-x-[13px] w-full " >
            <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isVisuallyImprairedChecked ? 'opacity-60':'']"/>

            <img src="/assets/imgs/addons/vis_impaired.svg" alt="" :class="[!isVisuallyImprairedChecked ? 'opacity-60':'']"/>
            <div class="flex flex-col items-start justify-center w-full" :class="[!isVisuallyImprairedChecked ? 'opacity-60':'']">
              <div
                class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
              >
                <span>Visually-impaired</span>
              </div>
              <div
                class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
              >
                <span>
                  Voluptate ullam minima assumenda nesciunt delectus sequi.
                  Veniam suscipit nesciunt esse sint aperiam aliquid
                </span>
              </div>
            </div>
            <div class="ml-auto">
              <label
                for="toggle_visually_imp"
                class="relative inline-flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="toggle_visually_imp"
                  class="sr-only"
                  v-model="isVisuallyImprairedChecked"
                />
                <div
                  class="w-14 h-8 bg-white  rounded-full 
                  peer-checked:bg-green-500 transition-colors duration-200"
                  :class="[isVisuallyImprairedChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
                  :'border-[1px] border-lightGrey']"

                >
                  <div
                    class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                    transition-transform duration-200 transform"
                    :class="{ 'translate-x-full ': isVisuallyImprairedChecked }"
                  >
                  <img v-if="isVisuallyImprairedChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
                  <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

            
        <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start space-x-[13px] w-full " >
          <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isSeizureChecked ? 'opacity-60':'']"/>

          <img src="/assets/imgs/addons/seizure.svg" alt="" :class="[!isSeizureChecked ? 'opacity-60':'']"/>
          <div class="flex flex-col items-start justify-center w-full" :class="[!isSeizureChecked ? 'opacity-60':'']">
            <div
              class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
            >
              <span>Seizure & Epileptic</span>
            </div>
            <div
              class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
            >
              <span>
                Voluptate ullam minima assumenda nesciunt delectus sequi.
                Veniam suscipit nesciunt esse sint aperiam aliquid
              </span>
            </div>
          </div>
          <div class="ml-auto">
            <label
              for="toggle_seizure_epli"
              class="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle_seizure_epli"
                class="sr-only"
                v-model="isSeizureChecked"
              />
              <div
                class="w-14 h-8 bg-white  rounded-full 
                peer-checked:bg-green-500 transition-colors duration-200"
                :class="[isSeizureChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
                :'border-[1px] border-lightGrey']"

              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                  transition-transform duration-200 transform"
                  :class="{ 'translate-x-full ': isSeizureChecked }"
                >
                <img v-if="isSeizureChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
                <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
  
    
      <div
      class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
    >
      <div class="flex items-center justify-start space-x-[13px] w-full " >
        <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isBlindChecked ? 'opacity-60':'']"/>

        <img src="/assets/imgs/addons/blind.svg" alt="" :class="[!isBlindChecked ? 'opacity-60':'']"/>
        <div class="flex flex-col items-start justify-center w-full" :class="[!isBlindChecked ? 'opacity-60':'']">
          <div
            class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
          >
            <span>Blind</span>
          </div>
          <div
            class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
          >
            <span>
              Voluptate ullam minima assumenda nesciunt delectus sequi.
              Veniam suscipit nesciunt esse sint aperiam aliquid
            </span>
          </div>
        </div>
        <div class="ml-auto">
          <label
            for="toggle_blind_manage"
            class="relative inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id="toggle_blind_manage"
              class="sr-only"
              v-model="isBlindChecked"
            />
            <div
              class="w-14 h-8 bg-white  rounded-full 
              peer-checked:bg-green-500 transition-colors duration-200"
              :class="[isBlindChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
              :'border-[1px] border-lightGrey']"

            >
              <div
                class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
                transition-transform duration-200 transform"
                :class="{ 'translate-x-full ': isBlindChecked }"
              >
              <img v-if="isBlindChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
              <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>







    <div
    class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
  >
    <div class="flex items-center justify-start space-x-[13px] w-full " >
      <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isDyslexiaChecked ? 'opacity-60':'']"/>

      <img src="/assets/imgs/addons/df.svg" alt="" :class="[!isDyslexiaChecked ? 'opacity-60':'']"/>
      <div class="flex flex-col items-start justify-center w-full" :class="[!isDyslexiaChecked ? 'opacity-60':'']">
        <div
          class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
        >
          <span>Dyslexia</span>
        </div>
        <div
          class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
        >
          <span>
            Voluptate ullam minima assumenda nesciunt delectus sequi.
            Veniam suscipit nesciunt esse sint aperiam aliquid
          </span>
        </div>
      </div>
      <div class="ml-auto">
        <label
          for="toggle_Dyslexia"
          class="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="toggle_Dyslexia"
            class="sr-only"
            v-model="isDyslexiaChecked"
          />
          <div
            class="w-14 h-8 bg-white  rounded-full 
            peer-checked:bg-green-500 transition-colors duration-200"
            :class="[isDyslexiaChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
            :'border-[1px] border-lightGrey']"

          >
            <div
              class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
              transition-transform duration-200 transform"
              :class="{ 'translate-x-full ': isDyslexiaChecked }"
            >
            <img v-if="isDyslexiaChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
            <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
            </div>
          </div>
        </label>
      </div>
    </div>
  </div>









  <div
  class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
  <div class="flex items-center justify-start space-x-[13px] w-full " >
    <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isCongitiveChecked ? 'opacity-60':'']"/>

    <img src="/assets/imgs/addons/congitive.svg" alt="" :class="[!isCongitiveChecked ? 'opacity-60':'']"/>
    <div class="flex flex-col items-start justify-center w-full" :class="[!isCongitiveChecked ? 'opacity-60':'']">
      <div
        class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
      >
        <span>Congitive & Learning</span>
      </div>
      <div
        class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
      >
        <span>
          Voluptate ullam minima assumenda nesciunt delectus sequi.
          Veniam suscipit nesciunt esse sint aperiam aliquid
        </span>
      </div>
    </div>
    <div class="ml-auto">
      <label
        for="toggle_congitive_manage"
        class="relative inline-flex items-center cursor-pointer"
      >
        <input
          type="checkbox"
          id="toggle_congitive_manage"
          class="sr-only"
          v-model="isCongitiveChecked"
        />
        <div
          class="w-14 h-8 bg-white  rounded-full 
          peer-checked:bg-green-500 transition-colors duration-200"
          :class="[isCongitiveChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
          :'border-[1px] border-lightGrey']"

        >
          <div
            class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
            transition-transform duration-200 transform"
            :class="{ 'translate-x-full ': isCongitiveChecked }"
          >
          <img v-if="isCongitiveChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
          <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
          </div>
        </div>
      </label>
    </div>
  </div>
</div>

<div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
>
<div class="flex items-center justify-start space-x-[13px] w-full " >
  <img src="/assets/imgs/addons/left_item.svg" alt="" :class="[!isADHDChecked ? 'opacity-60':'']"/>

  <img src="/assets/imgs/addons/adhd.svg" alt="" :class="[!isADHDChecked ? 'opacity-60':'']"/>
  <div class="flex flex-col items-start justify-center w-full" :class="[!isADHDChecked ? 'opacity-60':'']">
    <div
      class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
    >
      <span>ADHD</span>
    </div>
    <div
      class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
    >
      <span>
        Voluptate ullam minima assumenda nesciunt delectus sequi.
        Veniam suscipit nesciunt esse sint aperiam aliquid
      </span>
    </div>
  </div>
  <div class="ml-auto">
    <label
      for="toggle_adhd"
      class="relative inline-flex items-center cursor-pointer"
    >
      <input
        type="checkbox"
        id="toggle_adhd"
        class="sr-only"
        v-model="isADHDChecked"
      />
      <div
        class="w-14 h-8 bg-white  rounded-full 
        peer-checked:bg-green-500 transition-colors duration-200"
        :class="[isADHDChecked ? 'custom-border-tamkin custom-border-tamkin-rounded-small' 
        :'border-[1px] border-lightGrey']"

      >
        <div
          class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full 
          transition-transform duration-200 transform"
          :class="{ 'translate-x-full ': isADHDChecked }"
        >
        <img v-if="isADHDChecked" src="/assets/imgs/addons/active_toggle.svg" class="w-6 h-6" alt="">
        <img v-else src="/assets/imgs/addons/toggle.svg" class="w-6 h-6" alt="">
        </div>
      </div>
    </label>
  </div>
</div>
</div>











        </div>

        <div v-else class="py-[24px] w-3/4  text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]">
            Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est veritatis dolore. Exercitationem et omnis ea quidem
 
        </div>
      </div>

      <div class="mt-[30px] bg-white rounded-[10px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
         <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
                Live Translation

              </h1>

              <p class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"> 
                Live translation converts speech or text from one language to another instantly, facilitating real-time communication.
              </p>
         </div>
         

         <div @click="openResizeMenuLiveTranslataion =!openResizeMenuLiveTranslataion" 
         :class="[openResizeMenuLiveTranslataion ? 'active_notification !text-darkGrey' :'']" 
         class="relative ml-auto mr-[15px] mt-[-24px] flex items-center justify-center cursor-pointer
           bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]">
            <svg width="18" height="5" viewBox="0 0 18 5" fill="none" xmlns="http://www.w3.org/2000/svg"
            :class="[openResizeMenuLiveTranslataion ? 'stroke-current !text-white !fill-white' :'']"
            
            >
                <path d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z" fill="currentColor"/>
                </svg>
                
            <div v-if="openResizeMenuLiveTranslataion" style="box-shadow: 0px 2px 6px 0px #00000040;
" class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px]  bg-white rounded-[10px] border-[1px] border-lightGrey">
                <div 
               
                class="flex items-center justify-start cursor-pointer space-x-[8px] 
                  py-[16px] px-[12px]  w-full" @click="liveTranslationMiniSize">
                    <div>
                        
                        <img src="/assets/imgs/addons/min_size.svg" alt="" :class="[openResizeMenuLiveTranslataion ? '!fill-white' :'']" > 
                    </div>
                    <div class="text-[14px] leading-[21px] font-[400] ">Minisize</div>
                   
                </div>
       
                <div 
               
                class="flex items-center justify-start cursor-pointer space-x-[8px]  
               py-[16px] px-[12px] border-b w-full" v-if="verticalView " @click="liveTransaltionSwitchToVerticalOrHorizontal('horizontal')">
                    <div>
                        
                      <img src="/assets/imgs/addons/horizontal_view.svg" alt=""  :class="[openResizeMenuLiveTranslataion ? '!fill-white' :'']" > 
                    </div>
                    <div class="text-[14px] leading-[21px] font-[400] " >Horizontal View</div>
                   
                </div>
                <div 
               
                class="flex items-center justify-start cursor-pointer space-x-[8px] 
               py-[16px] px-[12px] border-b w-full" v-if="horizontalView" @click="liveTransaltionSwitchToVerticalOrHorizontal('vertical')">
                    <div>
                        
                      <img src="/assets/imgs/addons/vertical_view.svg" alt=""  :class="[openResizeMenuLiveTranslataion ? '!fill-white' :'']" > 
                    </div>
                    <div class="text-[14px] leading-[21px] font-[400] " >Vertical View</div>
                   
                </div>
                <div class="absolute top-[10px] right-[-10px] z-[50] !border-none">


                    <img src="/assets/imgs/addons/arrow_menu.svg" tyle="box-shadow: 0px 2px 6px 0px #00000040;
                    " alt="" class="w-full h-full    ">
                </div>
            </div>
           
         </div>

         
        </div>

        <div
          class="flex items-center lg:flex-row flex-col justify-center lg:justify-start  mt-[56px] divide-y 
          space-y-[42px] lg:space-y-0 lg:space-x-[100px] px-[15px]" v-if="horizontalView "
        >
        <div class="flex flex-col items-center justify-start h-[267px] w-full relative custom-border rounded-big rounded-[19px]">
          <div class="text-[20px] font-[600] text-[#021328] mt-[48px]">
            $100.00 <span class="text-[13px]">/mo</span>
          </div>
          <div class="text-[14px] font-[500] text-[#021328] mt-[12px]">
            For 1 million characters
          </div>
          <div class="text-[13px] font-[500] text-[#A7A7A7] mt-[12px]">
            Almost 50 Page
          </div>
        
          <div class="flex items-center justify-evenly mt-[12px] space-x-[6px]">
            <div>
              <img src="/assets/imgs/addons/live_icon.svg" class="w-[23px] h-[23px]" alt="">
            </div>
            <div class="text-[12px] leading-[14.16px] font-[500] text-black">
              Live translation
            </div>
          </div>
        
          <button class="btn_bordered_dashboard mt-[24px] !text-darkGrey hover:!text-white">
            Upgrade Now
          </button>
        
          <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
            <img src="/assets/imgs/addons/live_icon.svg" alt="">
          </div>
        </div>
        
        <div class="flex flex-col items-center justify-start h-[267px] w-full relative custom-border rounded-big rounded-[19px]">
          <div class="text-[20px] font-[600] text-[#021328] mt-[48px]">
            $200.00 <span class="text-[13px]">/mo</span>
          </div>
          <div class="text-[14px] font-[500] text-[#021328] mt-[12px]">
            For 1 million characters
          </div>
          <div class="text-[13px] font-[500] text-[#A7A7A7] mt-[12px]">
            Almost 100 Page
          </div>
        
          <div class="flex items-center justify-evenly mt-[12px] space-x-[6px]">
            <div>
              <img src="/assets/imgs/addons/live_icon.svg" class="w-[23px] h-[23px]" alt="">
            </div>
            <div class="text-[12px] leading-[14.16px] font-[500] text-black">
              Live translation
            </div>
          </div>
        
          <button class="btn-dashboard hover_tamkin mt-[24px] w-[140px]">
            Active
          </button>
        
          <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
            <img src="/assets/imgs/addons/live_icon.svg" alt="">
          </div>
        </div>
        
        <div class="flex flex-col items-center justify-start h-[267px] w-full relative custom-border rounded-big rounded-[19px]">
          <div class="text-[20px] font-[600] text-[#021328] mt-[48px]">
            $100.00 <span class="text-[13px]">/mo</span>
          </div>
          <div class="text-[14px] font-[500] text-[#021328] mt-[12px]">
            For 2 million characters
          </div>
          <div class="text-[13px] font-[500] text-[#A7A7A7] mt-[12px]">
            Almost 500 Page
          </div>
        
          <div class="flex items-center justify-evenly mt-[12px] space-x-[6px]">
            <div>
              <img src="/assets/imgs/addons/live_icon.svg" class="w-[23px] h-[23px]" alt="">
            </div>
            <div class="text-[12px] leading-[14.16px] font-[500] text-black">
              Live translation
            </div>
          </div>
        
          <button class="btn_bordered_dashboard mt-[24px] !text-darkGrey hover:!text-white">
            Upgrade Now
          </button>
        
          <div class="absolute top-[-35px] left-1/2 transform -translate-x-1/2">
            <img src="/assets/imgs/addons/live_icon.svg" alt="">
          </div>
          <div class="absolute top-[17px] right-[18px]">
            <img src="/assets/imgs/addons/start.svg" alt="">
          </div>
        </div>
        
     
        </div>
        <div v-if="miniSizeLiveTranslation" class="py-[24px] w-3/4  text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]">
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto est veritatis dolore. Exercitationem et omnis ea quidem

      </div>
        <div
        class="flex items-center flex-col justify-center lg:justify-start  mt-[56px]  space-y-[24px] pb-[16px] 
      px-[15px]" v-if="verticalView"
      >
      <div style="background: linear-gradient(180deg, #FEFEFE 0%, #EEF5FF 47.07%, #F6F3FC 72.04%, #FEF5F6 100%);
" class="flex  items-center justify-start h-[77px] w-full relative  custom-border rounded-big rounded-[19px]">
<div class="ml-[15px]">
  <img src="/assets/imgs/addons/live_vertical.svg" alt="">

</div>

        <div class="flex flex-col items-start justify-center py-[14px]  mx-[15px]">
      <div class="text-[20px] font-[600] text-[#021328] ">
        $100.00 <span class="text-[13px]">/mo</span>
      </div>
      <div class="text-[14px] font-[500] text-[#585B5B] ">
        For 1 million characters
      </div>

     </div>
      
       
      
        <button class="ml-auto btn_bordered_dashboard mt-[24px] !text-darkGrey hover:!text-white my-[19px] mr-[15px]">
          Upgrade Now
        </button>
   
      </div>
      
   
      <div style="background: linear-gradient(180deg, #FEFEFE 0%, #EEF5FF 47.07%, #F6F3FC 72.04%, #FEF5F6 100%);
      " class="flex  items-center justify-start h-[77px] w-full relative  custom-border rounded-big rounded-[19px]">
      <div class="ml-[15px]">
        <img src="/assets/imgs/addons/live_vertical.svg" alt="">
      
      </div>
      
              <div class="flex flex-col items-start justify-center py-[14px]  mx-[15px]">
            <div class="text-[20px] font-[600] text-[#021328] ">
              $200.00 <span class="text-[13px]">/mo</span>
            </div>
            <div class="text-[14px] font-[500] text-[#585B5B] ">
              For 1 million characters
            </div>
      
           </div>
            
             
            
              <button class="ml-auto btn-dashboard hover_tamkin w-[140px] mt-[24px]  my-[19px] mr-[15px]">
                Active
              </button>
         
            </div>

            <div style="background: linear-gradient(180deg, #FEFEFE 0%, #EEF5FF 47.07%, #F6F3FC 72.04%, #FEF5F6 100%);
            " class="flex  items-center justify-start h-[77px] w-full relative  custom-border rounded-big rounded-[19px]">
            <div class="ml-[15px]">
              <img src="/assets/imgs/addons/live_vertical.svg" alt="">
            
            </div>
            
                    <div class="flex flex-col items-start justify-center py-[14px]  mx-[15px]">
                  <div class="text-[20px] font-[600] text-[#021328] ">
                    $300.00 <span class="text-[13px]">/mo</span>
                  </div>
                  <div class="text-[14px] font-[500] text-[#585B5B] ">
                    For 2 million characters
                  </div>
            
                 </div>
                  
                   
                  
                    <button class="ml-auto btn_bordered_dashboard mt-[24px] !text-darkGrey hover:!text-white my-[19px] mr-[15px]">
                      Upgrade Now
                    </button>
               
                  </div>
      
   
      </div>
      </div>
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
</style>
