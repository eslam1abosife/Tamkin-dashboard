<script lang="ts" setup>
import VCodeBlock from "@wdns/vue-code-block";
import { useModalStore } from "@/stores/modal";

const { controlResetModal ,controlDeleteModal,controlStep1TransferModal,openShareModal} = useModalStore();
definePageMeta({
  layout: "dashboard",
});
const code = ref(true);
const advancedCode = ref(false);
const currentCode = ref(``);
const copyDone = ref(false);
const showAdancedCode = () => {
  if (!advancedCode.value) {
    code.value = false;
    advancedCode.value = true;

    currentCode.value = `const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
`;
  } else {
    code.value = true;
    advancedCode.value = false;

    currentCode.value = `const foo = 'bar';`;
  }
};

onBeforeMount(() => {
  currentCode.value = `const foo = 'bar';`;
  code.value = true;
});
const copyCode = () => {
  copyDone.value = true;
};

watch(copyDone, (newValue) => {
  if (newValue) {
    // Reset copyDone after the hideIn duration
    setTimeout(() => {
      copyDone.value = false;
    }, 2000);
  }
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
const openMenuResize = (typeMenu: any) => {
  if (typeMenu === "adjust") {
    openResizeMenuAdjust.value = !openResizeMenuAdjust.value;
  }
};
const isPageStrucChecked = ref(false);

const openResizeMenuManage = ref(false);
const openResizeMenuAdjust = ref(false);
const openResizeLicenseMenu = ref(false)
const miniSizeLicense = ref(false)
const miniSizeManage = ref(false);
const miniSizeAdjust = ref(false);
const miniSizeLiveTranslation = ref(false);
const verticalView = ref(false);
const horizontalView = ref(true);
const openResizeResetAllAccess = ref(false);
const miniSizeResetAll = ref(false);
const route = useRoute();
const widgetEnabledOnSite = ref(false)
const widgetEnabledOnMobile = ref(false)
const soundEffects = ref(false)
const isLinkActive = (path) => {
  //   const localePath = this.$i18n.localePath(path);
  return route.path === localePath(path);
};

const liveTranslationMiniSize = () => {
  verticalView.value = false;
  horizontalView.value = false;

  if (!miniSizeLiveTranslation.value) {
    miniSizeLiveTranslation.value = true;
  }
};
const resetAllMiniSize = ()=>{
  miniSizeResetAll.value = !miniSizeResetAll.value
}
const licenseMiniSize = () => {
  miniSizeLicense.value = !miniSizeLicense.value
};
</script>

<template>
  <div class="relative h-full w-full">
    <div class="mt-[23px] w-full h-full relative">
 
      <div class="space-y-[10px]">
        <h1 class="text-left text-[24px] leading-[36px] font-[600]">
          Settings
        </h1>

        <h2
          class="text-left text-[15px] font-[400] leading-[22.5px] text-darkGrey"
        >
          Settings let you customize your preferences and configurations
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
          :to="localePath('/statistics')"
          :class="[
            isLinkActive('/statistics') ? 'active_subNavb' : 'sub_menu_item',
          ]"
        >
          Statistics
        </nuxt-link>
        <nuxt-link
          :to="localePath('/customize')"
          :class="[
            isLinkActive('/customize') ? 'active_subNavb' : 'sub_menu_item',
          ]"
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
            <h1 class="text-[20px] font-[500] leading-[30px]">
              General Settings
            </h1>
            <h2
              class="text-left text-[15px] font-[400] leading-[28.5px] text-darkGrey"
            >
              Accessibility Settings allow users to customize their website
              experience to ensure it is accessible and user-friendly
            </h2>
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
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
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
          class="flex flex-col items-start justify-center ml-[15px] mt-[18px] divide-y pb-[16px]"
          v-if="!miniSizeAdjust"
        >
        

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!widgetEnabledOnSite ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Widget enabled on this site </span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_Widget_enabled_on_this_site"
                  class="relative inline-flex items-center cursor-pointer h-[32px]"
                >
                  <input
                    type="checkbox"
                    id="toggle_Widget_enabled_on_this_site"
                    class="sr-only"
                    v-model="widgetEnabledOnSite"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      widgetEnabledOnSite
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': widgetEnabledOnSite }"
                    >
                      <img
                        v-if="widgetEnabledOnSite"
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
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!widgetEnabledOnMobile ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span>Widget enabled on mobile</span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_Widget_enabled_on_mobile"
                  class="relative inline-flex items-center cursor-pointer h-[32px]"
                >
                  <input
                    type="checkbox"
                    id="toggle_Widget_enabled_on_mobile"
                    class="sr-only"
                    v-model="widgetEnabledOnMobile"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      widgetEnabledOnMobile
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': widgetEnabledOnMobile }"
                    >
                      <img
                        v-if="widgetEnabledOnMobile"
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
            </div>
          </div>

          <div
            class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
          >
            <div class="flex items-center justify-start space-x-[13px] w-full">
              <div
                class="flex flex-col items-start justify-center w-full"
                :class="[!soundEffects ? 'opacity-60' : '']"
              >
                <div
                  class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]"
                >
                  <span> Sound effects</span>
                </div>
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_Sound_effects"
                  class="relative inline-flex items-center cursor-pointer h-[32px]"
                >
                  <input
                    type="checkbox"
                    id="toggle_Sound_effects"
                    class="sr-only"
                    v-model="soundEffects"
                  />
                  <div
                    class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                    :class="[
                      soundEffects
                        ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                        : 'border-[1px] border-lightGrey',
                    ]"
                  >
                    <div
                      class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                      :class="{ 'translate-x-full ': soundEffects }"
                    >
                      <img
                        v-if="soundEffects"
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

      <div class="mt-[30px] bg-white rounded-[10px] relative" >
        <DashboardToastSuccess
        v-if="copyDone"
        :hideIn="2000"
        :message="'Copied to clipboard'"
      />

        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              Widget Embed Code
            </h1>
            <h2
              class="text-left text-[15px] font-[400] leading-[28.5px] text-darkGrey "
            >
              Widget Embed Code allows you to easily integrate accessibility
              features into your website by adding a simple script to your
              site's HTML
            </h2>
          </div>
          <div
            @click="openResizeMenuManage = !openResizeMenuManage"
            :class="[
              openResizeMenuManage ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ml-auto mr-[15px] 
            flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
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
          class="flex flex-col items-start justify-center px-[15px] pb-[16px]  divide-y"
          v-if="!miniSizeManage"
        >
          <div
            class=" w-full h-full  rounded-[10px]"
        
          >
            <div
              class="flex items-center lg:flex-row flex-col justify-center lg:space-y-0 space-y-[16px] 
              lg:justify-between mt-[24px] w-full"
              style="padding: 30px, 16px, 20px, 15px"
            >
              <button
                @click="showAdancedCode()"
                class="btn__icon__dashboard ipad-max:text-[12px]"
                style="
                  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
                "
              >
                <div>
                  <svg
                    width="12"
                    height="21"
                    viewBox="0 0 12 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 9.49697H11C11.2652 9.49697 11.5196 9.39161 11.7071 9.20407C11.8946 9.01654 12 8.76218 12 8.49697C12 8.23175 11.8946 7.9774 11.7071 7.78986C11.5196 7.60232 11.2652 7.49697 11 7.49697H7V3.90697L7.79 4.70697C7.88296 4.8007 7.99356 4.87509 8.11542 4.92586C8.23728 4.97663 8.36799 5.00277 8.5 5.00277C8.63201 5.00277 8.76272 4.97663 8.88458 4.92586C9.00644 4.87509 9.11704 4.8007 9.21 4.70697C9.30373 4.614 9.37812 4.5034 9.42889 4.38154C9.47966 4.25968 9.5058 4.12898 9.5058 3.99697C9.5058 3.86495 9.47966 3.73425 9.42889 3.61239C9.37812 3.49053 9.30373 3.37993 9.21 3.28697L6.71 0.786967C6.6149 0.695926 6.50275 0.624561 6.38 0.576967C6.13654 0.476949 5.86346 0.476949 5.62 0.576967C5.49725 0.624561 5.3851 0.695926 5.29 0.786967L2.79 3.28697C2.6017 3.47527 2.49591 3.73066 2.49591 3.99697C2.49591 4.26327 2.6017 4.51866 2.79 4.70697C2.9783 4.89527 3.2337 5.00106 3.5 5.00106C3.7663 5.00106 4.0217 4.89527 4.21 4.70697L5 3.90697V7.49697H1C0.734784 7.49697 0.48043 7.60232 0.292893 7.78986C0.105357 7.9774 0 8.23175 0 8.49697C0 8.76218 0.105357 9.01654 0.292893 9.20407C0.48043 9.39161 0.734784 9.49697 1 9.49697ZM11 11.497H1C0.734784 11.497 0.48043 11.6023 0.292893 11.7899C0.105357 11.9774 0 12.2317 0 12.497C0 12.7622 0.105357 13.0165 0.292893 13.2041C0.48043 13.3916 0.734784 13.497 1 13.497H5V17.087L4.21 16.287C4.11676 16.1937 4.00607 16.1198 3.88425 16.0693C3.76243 16.0188 3.63186 15.9929 3.5 15.9929C3.36814 15.9929 3.23757 16.0188 3.11575 16.0693C2.99393 16.1198 2.88324 16.1937 2.79 16.287C2.69676 16.3802 2.6228 16.4909 2.57234 16.6127C2.52188 16.7345 2.49591 16.8651 2.49591 16.997C2.49591 17.1288 2.52188 17.2594 2.57234 17.3812C2.6228 17.503 2.69676 17.6137 2.79 17.707L5.29 20.207C5.3851 20.298 5.49725 20.3694 5.62 20.417C5.7397 20.4699 5.86913 20.4972 6 20.4972C6.13087 20.4972 6.2603 20.4699 6.38 20.417C6.50275 20.3694 6.6149 20.298 6.71 20.207L9.21 17.707C9.3983 17.5187 9.50409 17.2633 9.50409 16.997C9.50409 16.7307 9.3983 16.4753 9.21 16.287C9.0217 16.0987 8.7663 15.9929 8.5 15.9929C8.2337 15.9929 7.9783 16.0987 7.79 16.287L7 17.087V13.497H11C11.2652 13.497 11.5196 13.3916 11.7071 13.2041C11.8946 13.0165 12 12.7622 12 12.497C12 12.2317 11.8946 11.9774 11.7071 11.7899C11.5196 11.6023 11.2652 11.497 11 11.497Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div>Advanced View</div>
              </button>
              <div
                @click="openShareModal"
                class="cursor-pointer ipad-max:text-[12px] border-[2px] 
                rounded-lg border-transparent bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] group"
              >
                <div
                  class="bg-white rounded-md flex items-center justify-center"
                >
                  <div class="pl-[16px]">
                    <svg
                      width="22"
                      height="21"
                      viewBox="0 0 22 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 7.5C10.2044 7.5 9.44129 7.18393 8.87868 6.62132C8.31607 6.05871 8 5.29565 8 4.5C8 3.70435 8.31607 2.94129 8.87868 2.37868C9.44129 1.81607 10.2044 1.5 11 1.5C11.7956 1.5 12.5587 1.81607 13.1213 2.37868C13.6839 2.94129 14 3.70435 14 4.5C14 5.29565 13.6839 6.05871 13.1213 6.62132C12.5587 7.18393 11.7956 7.5 11 7.5ZM4.5 19.5C3.70435 19.5 2.94129 19.1839 2.37868 18.6213C1.81607 18.0587 1.5 17.2956 1.5 16.5C1.5 15.7044 1.81607 14.9413 2.37868 14.3787C2.94129 13.8161 3.70435 13.5 4.5 13.5C5.29565 13.5 6.05871 13.8161 6.62132 14.3787C7.18393 14.9413 7.5 15.7044 7.5 16.5C7.5 17.2956 7.18393 18.0587 6.62132 18.6213C6.05871 19.1839 5.29565 19.5 4.5 19.5ZM17.5 19.5C16.7044 19.5 15.9413 19.1839 15.3787 18.6213C14.8161 18.0587 14.5 17.2956 14.5 16.5C14.5 15.7044 14.8161 14.9413 15.3787 14.3787C15.9413 13.8161 16.7044 13.5 17.5 13.5C18.2956 13.5 19.0587 13.8161 19.6213 14.3787C20.1839 14.9413 20.5 15.7044 20.5 16.5C20.5 17.2956 20.1839 18.0587 19.6213 18.6213C19.0587 19.1839 18.2956 19.5 17.5 19.5Z"
                        stroke="url(#paint0_linear_275_10607)"
                        stroke-width="1.5"
                      />
                      <path
                        d="M19 11.5C19.0014 10.3648 18.7605 9.24243 18.2935 8.20776C17.8265 7.17309 17.1442 6.24995 16.292 5.5M3.00001 11.5C2.99866 10.3648 3.23952 9.24243 3.7065 8.20776C4.17348 7.17309 4.85584 6.24995 5.70801 5.5M9.00001 19.248C9.65338 19.416 10.3254 19.5007 11 19.5C11.6746 19.5007 12.3466 19.416 13 19.248"
                        stroke="url(#paint1_linear_275_10607)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_275_10607"
                          x1="11"
                          y1="1.5"
                          x2="11"
                          y2="19.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#2DADA3" />
                          <stop offset="1" stop-color="#71DAD2" />
                        </linearGradient>
                        <linearGradient
                          id="paint1_linear_275_10607"
                          x1="11"
                          y1="5.5"
                          x2="11"
                          y2="19.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#2DADA3" />
                          <stop offset="1" stop-color="#71DAD2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <button
                    class="h-[45px] btn px-4 py-2 rounded-md group-hover:bg-gradient-to-r
                     group-hover:to-tamkinStart group-hover:from-tamkinEnd group-hover:text-transparent group-hover:bg-clip-text"
                  >
                    Share code with your team
                  </button>
                </div>
              </div>

              <div
                @click="copyCode"
                class="cursor-pointer ipad-max:text-[12px] border-[2px] rounded-lg border-transparent bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] group"
              >
                <div
                  class="bg-white rounded-md flex items-center justify-center"
                >
                  <div class="pl-[16px]">
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.829 11.361C19 10.948 19 10.423 19 9.375C19 8.327 19 7.802 18.829 7.389C18.7159 7.11593 18.5502 6.86782 18.3412 6.65883C18.1322 6.44984 17.8841 6.28407 17.611 6.171C17.198 6 16.673 6 15.625 6H9.1C7.84 6 7.21 6 6.729 6.245C6.30526 6.46078 5.96078 6.80526 5.745 7.229C5.5 7.709 5.5 8.339 5.5 9.6V16.125C5.5 17.173 5.5 17.698 5.671 18.111C5.9 18.662 6.338 19.101 6.889 19.329C7.302 19.5 7.827 19.5 8.875 19.5C9.923 19.5 10.448 19.5 10.861 19.329M18.829 11.361C18.7159 11.6341 18.5502 11.8822 18.3412 12.0912C18.1322 12.3002 17.8841 12.4659 17.611 12.579C17.198 12.75 16.673 12.75 15.625 12.75C14.577 12.75 14.052 12.75 13.639 12.921C13.3659 13.0341 13.1178 13.1998 12.9088 13.4088C12.6998 13.6178 12.5341 13.8659 12.421 14.139C12.25 14.552 12.25 15.077 12.25 16.125C12.25 17.173 12.25 17.698 12.079 18.111C11.9659 18.3841 11.8002 18.6322 11.5912 18.8412C11.3822 19.0502 11.1341 19.2159 10.861 19.329M18.829 11.361C18.2912 13.216 17.3017 14.9086 15.9492 16.2873C14.5967 17.666 12.9233 18.6878 11.079 19.261L10.861 19.329M14.5 6V5.1C14.5 3.84 14.5 3.21 14.255 2.729C14.0395 2.30541 13.6954 1.96095 13.272 1.745C12.79 1.5 12.16 1.5 10.9 1.5H4.6C3.34 1.5 2.71 1.5 2.229 1.745C1.80526 1.96078 1.46078 2.30526 1.245 2.729C1 3.209 1 3.839 1 5.1V11.4C1 12.66 1 13.29 1.245 13.771C1.461 14.195 1.805 14.539 2.229 14.755C2.709 15 3.34 15 4.601 15H5.5"
                        stroke="url(#paint0_linear_275_10529)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_275_10529"
                          x1="10"
                          y1="1.5"
                          x2="10"
                          y2="19.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#2DADA3" />
                          <stop offset="1" stop-color="#71DAD2" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <button
                    class="h-[45px] px-4 py-2 rounded-md group-hover:bg-gradient-to-r group-hover:to-tamkinStart group-hover:from-tamkinEnd group-hover:text-transparent group-hover:bg-clip-text"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-[24px]  w-full min-h-[50px]">
              <Client-only>
                <VCodeBlock
                  :code="currentCode"
                  highlightjs
                  lang="javascript"
                  theme="neon-bunny"
                />
              </Client-only>

              <h2
                class="text-left font-[500] text-[13px] text-[#979897] mb-[30px] mt-[20px]"
                style="line-height: 23.4px"
              >
                Managing multiple sites for multiple clients ? Great! Make sure
                you use
                <span class="text-darkGrey">the same embed code</span> on all of
                your sites !
              </h2>
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

      <div class="mt-[30px] bg-white rounded-[10px] pb-[24px] ">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
                Rest All Accessibility Settings
            </h1>

            <p
              class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px] w-3/4"
            >
            Reset all accessibility settings to their default configurations, restoring original preferences and ensuring a standard user experience for all users
            </p>
          </div>

          <div
            @click="
              openResizeResetAllAccess = !openResizeResetAllAccess
            "
            :class="[
              openResizeResetAllAccess
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class="relative ml-auto mr-[15px] mt-[-24px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[40px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeResetAllAccess
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
              v-if="openResizeResetAllAccess"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
      

              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="resetAllMiniSize"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[
                      openResizeResetAllAccess ? '!fill-white' : '',
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
          class="flex items-center lg:flex-row flex-col justify-center lg:justify-start mt-[24px]
           divide-y space-y-[42px] lg:space-y-0 lg:space-x-[100px] px-[15px]"
          v-if=" !miniSizeResetAll"
        >
    
        <button class="w-full btn_bordered_dashboard hover_tamkin flex items-center justify-center group" @click="controlResetModal">
            <div>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                class="group-hover:hidden block">
                    <path d="M14.5 16H19.5V21M10.5 8H5.5V3M19.9176 9.0034C19.3569 7.61566 18.4181 6.41304 17.208 5.53223C15.9979 4.65141 14.5652 4.12752 13.0723 4.02051C11.5794 3.9135 10.0861 4.2274 8.7627 4.92661C7.43933 5.62582 6.33882 6.68254 5.58594 7.97612M5.08203 14.9971C5.64272 16.3848 6.58146 17.5874 7.79157 18.4682C9.00169 19.3491 10.4359 19.8723 11.9288 19.9793C13.4217 20.0863 14.9138 19.7725 16.2371 19.0732C17.5605 18.374 18.6603 17.3175 19.4131 16.0239" stroke="url(#paint0_linear_3592_46947)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_3592_46947" x1="12.4998" y1="3" x2="12.4998" y2="21" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2DADA3"/>
                    <stop offset="1" stop-color="#71DAD2"/>
                    </linearGradient>
                    </defs>
                    </svg>
                <svg class="group-hover:block hidden" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 16.5H19.5V21.5M10.5 8.5H5.5V3.5M19.9176 9.5034C19.3569 8.11566 18.4181 6.91304 17.208 6.03223C15.9979 5.15141 14.5652 4.62752 13.0723 4.52051C11.5794 4.4135 10.0861 4.7274 8.7627 5.42661C7.43933 6.12582 6.33882 7.18254 5.58594 8.47612M5.08203 15.4971C5.64272 16.8848 6.58146 18.0874 7.79157 18.9682C9.00169 19.8491 10.4359 20.3723 11.9288 20.4793C13.4217 20.5863 14.9138 20.2725 16.2371 19.5732C17.5605 18.874 18.6603 17.8175 19.4131 16.5239" stroke="url(#paint0_linear_4555_30965)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <defs>
                    <linearGradient id="paint0_linear_4555_30965" x1="12.4998" y1="3.5" x2="12.4998" class=" !stroke-white"
                    y2="21.5" gradientUnits="userSpaceOnUse">
                    <stop stop-color="currentColor"/>
                    <stop offset="1" stop-color="currentColor"/>
                    </linearGradient>
                    </defs>
                    </svg>
                    
          
                        
            </div>
           <div class="bg-gradient-to-b from-[#2DADA3] to-[#71DAD2] bg-clip-text">
            Rest All Accessibility Settings
           </div>
        </button>

        </div>
        <div
          v-if="miniSizeResetAll"
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
        </div>
      
      </div>


      <div class="mt-[30px] bg-white rounded-[10px] pb-[24px] mb-[80px]">
        <div class="flex items-center justify-start ml-[15px] pt-[35px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
              License Settings
            </h1>

            <p
              class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px] w-3/4"
            >
            Transfer License to Another Website allows you to move your existing accessibility widget license to a different site, ensuring continued accessibility compliance






          </p>
          </div>

          <div
            @click="
            
            openResizeLicenseMenu= !openResizeLicenseMenu
            "
            :class="[
              openResizeLicenseMenu
                ? 'active_notification !text-darkGrey'
                : '',
            ]"
            class="relative ml-auto mr-[15px] mt-[-24px] flex items-center justify-center cursor-pointer 
            bg-[#F2F2F2] rounded-[10px] w-[46px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                openResizeLicenseMenu
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
              v-if="openResizeLicenseMenu"
              style="box-shadow: 0px 2px 6px 0px #00000040"
              class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
            >
          

              <div
                class="flex items-center justify-start cursor-pointer space-x-[8px] py-[16px] px-[12px] w-full"
                @click="licenseMiniSize"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[
                      openResizeLicenseMenu ? '!fill-white' : '',
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
          class="flex items-center flex-col justify-center  divide-y  lg:space-y-0  px-[15px]"
          v-if="!miniSizeLicense"
        >
    
        <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start space-x-[13px] w-full">
          <div
            class="flex flex-col items-start justify-center w-full"
        
          >
            <div
              class="!text-[#585B5B] font-[500] text-[14px] leading-[24px] w-full"
            >
              <span>Widget enabled on this site </span>
            </div>
          </div>
          <div class="ml-auto w-full">
          <button class="btn_bordered_dashboard ml-auto !p-[5px] w-1/4 text-[14px] font-[500] leading-[22.5px]" @click="controlStep1TransferModal">
            Transfer License
          </button>
          </div>
        </div>
      </div>

      <div
      class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
    >
      <div class="flex items-center justify-start  w-full">
        <div
          class="flex flex-col items-start justify-center w-full"
         
        >
          <div
            class="!text-[#585B5B] font-[500] text-[14px] leading-[24px] w-full"
          >
            <span>Delete site permanently removes your profile and data from the system </span>
          </div>
        </div>
        <div class="ml-auto w-full">
        <button class="btn_bordered_dashboard error ml-auto w-1/4 text-[14px] font-[500] leading-[22.5px]" @click="controlDeleteModal">
          Delete Site
        </button>
        </div>
      </div>
    </div>

        </div>
        <div
          v-if="miniSizeLicense"
          class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
        >
          Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
          est veritatis dolore. Exercitationem et omnis ea quidem
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
