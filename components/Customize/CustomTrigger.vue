<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

import { useCollapseStore } from "@/stores/collapse.js";
const collapseStore = useCollapseStore();
import { useCustomizeStore } from "@/stores/customize.js";

const customizeStore = useCustomizeStore();
const { isChecked, toggleCheckbox } = customizeStore;
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import VCodeBlock from "@wdns/vue-code-block";

const state = reactive({
  custom_id: "",
});
const rules = {
  custom_id: { required },
};

const v$ = useVuelidate(rules, state);
const currentCode = computed(() => {
  return `<span id="${v$.value.custom_id.$model}" tabindex="0">Click for Accessibility</span>`;
});

const openResizeMenuAdjust = ref(false);
const miniSizeAdjust = ref(false);
const isOpen = ref(false);
const search = ref("");
const languages = [
  { code: "en", name: "English (Usa)" },
  { code: "ar", name: "Arabic (Saudi Arabia)" },
  { code: "fr", name: "French (France)" },
  // Add more countries as needed
];
const openMenuResize = (typeMenu: any) => {
  if (typeMenu === "widgetType") {
    openResizeMenuAdjust.value = !openResizeMenuAdjust.value;
  }
};

const selectedLanguage = ref(null);
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectLanguage = (lang: any) => {
  selectedLanguage.value = lang;
  isOpen.value = false;
};
const filterdLanguages = computed(() => {
  return languages.filter((lang) =>
    lang.name.toLowerCase().includes(search.value.toString().toLowerCase())
  );
});

const moveAccess = ref(false);
const moveHide = ref("");

const moveHideWidget = (v: string) => {
  moveHide.value = v;
};
const copyDone = ref(false);

const copyCode = () => {
  copyDone.value = true;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full mt-[40px] relative mb-[80px]">
    <div class="bg-white dark:bg-tamkinDarkPrimary rounded-[10px] w-full px-[15px] relative shadow-md -shadow-y-[1px]"
      :class="[
        collapseStore.collapses.includes('custom_trigger_card')
          ? 'pb-[24px]'
          : 'pb-[10px]',
      ]">
      <div class="flex items-center justify-start pt-[16px] relative">
        <div class="flex flex-col items-start justify-center relative">
          <div>
            <h1 class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin">
              {{$t('Custom Trigger')}}
            </h1>

            <p
              class="text-[12px] ipad-max:w-3/4 lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin pt-[6px]">
              {{$t('Custom Trigger enables users to define specific conditions or events that automatically initiate tailored actions')}}
            </p>
          </div>

          <div
            class="py-[12px] lg:py-[24px] border-t-[2px] border-b-[2px] dark:border-darkborder border-lightGrey mt-[32px]"
            v-if="!collapseStore.collapses.includes('custom_trigger_card')">
            <p
              class="text-[10px] lg:text-[13px] leading-[22px] font-[400] text-darkGrey pt-[6px] dark:text-whiteTamkin">
              {{ $t(`A custom trigger replaces the original menu button and allows you to fix the position of the accessibility menu trigger to any element on your website. Open the accessibility menu when clicking an element with a pre-defined ID or class. To specify a class instead of an ID, precede the value with a period (.)`) }}
            </p>
          </div>
        </div>
      </div>
      <div @click.stop="collapseStore.collapseMenu('custom_trigger')"
        v-on-click-outside="() => collapseStore.removeMenu('custom_trigger')" :class="[
          collapseStore.menus.includes('custom_trigger')
            ? 'active_notification !text-darkGrey'
            : '',
        ]"
        class="absolute top-0 rtl:left-[15px] ltr:right-[0px] rtl:mr-auto ltr:ml-auto ltr:mr-[15px] mt-[25px] menu_button_control">
        <svg width="18" height="5" viewBox="0 0 18 5" fill="none" xmlns="http://www.w3.org/2000/svg" :class="[
          collapseStore.menus.includes('custom_trigger')
            ? 'stroke-current !text-white !fill-white'
            : 'dark:text-white',
        ]">
          <path
            d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
            fill="currentColor" />
        </svg>

        <div v-if="collapseStore.menus.includes('custom_trigger')" class="mini_SizeMenu divide-y">
          <div class="mini_wrap">
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 5.5L5.5 9.9256V12.9824L12 8.55677L18.5 12.9824V9.9256L12 5.5ZM12 9.17966L7.75108 12.1087V14.7032L12 11.7742L16.2489 14.7032V12.1087L12 9.17966ZM12 12.3983L9.55195 14.0859V16.0286L12 14.3618L14.4481 16.0286V14.0859L12 12.3983ZM12 14.9834L9.55195 16.6502V18.5L12 16.8332L14.4481 18.5V16.6502L12 14.9834Z"
                  class="fill-[#585B5B] dark:fill-whiteTamkin" />
              </svg>
            </div>
            <div class="text_mini">{{$t('Switch To Annual')}}</div>
          </div>
          <div class="mini_wrap" @click="collapseStore.collapseCard('custom_trigger_card')">
            <div>
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.7754 10.937L18.4995 7" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
            <div class="text_mini">
              {{
                !collapseStore.collapses.includes("custom_trigger_card")
                  ? $t("Minisize")
                  : $t("Maxsize")
              }}
            </div>
          </div>

          <div class="arrow">
            <svg width="16" class="" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow-sm" x="0" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="rgba(0, 0, 0, 0.3)" />
                </filter>
              </defs>
              <path
                d="M15.2266 7.80851C15.2266 10.0216 0.841317 15.4755 0.841317 15.4755V0.142578C0.841317 0.142578 15.2266 5.5954 15.2266 7.80851Z"
                class="fill-white dark:!fill-darkTamkin" filter="url(#shadow-sm)" />
            </svg>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start justify-center mt-[18px] max-w-full"
        :class="[!moveAccess ? 'pb-[16px]' : '']" v-if="!collapseStore.collapses.includes('custom_trigger_card')">
        <div
          class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary dark:border-darkborder p-[6px] flex items-center justify-start w-full px-[15px] mt-[16px] border-b-[2px] border-lightGrey">
          <div class="flex items-center justify-start space-x-[13px] w-full">
            <div class="flex flex-col items-start justify-center w-full">
              <div class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[14px] leading-[16.39px]">
                <span>{{$t('Enable custom trigger')}}</span>
              </div>
            </div>
            <div class="ltr:ml-auto rtl:mr-auto">
              <label for="toggle_custom_trigger" class="toggle_wrap">
                <input type="checkbox" id="toggle_custom_trigger" class="sr-only"
                  :checked="isChecked('enable_custom_trigger')" @change="toggleCheckbox('enable_custom_trigger')" />
                <div class="toggle_parent" :class="[isChecked('enable_custom_trigger') ? 'active' : 'in_active']">
                  <div class="toggle_inner" :class="{ active: isChecked('enable_custom_trigger') }">
                    <img v-if="isChecked('enable_custom_trigger')" src="/assets/imgs/addons/active_toggle.svg"
                      class="w-[28px] h-[28px]" />
                    <img v-else src="/assets/imgs/addons/toggle.svg" class="w-[28px] h-[28px]" />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div class="w-full relative my-[24px]" v-if="isChecked('enable_custom_trigger')">
          <input type="text" placeholder="{{$t('Custom id')}}" id="custom_id" class="input_floating_label peer !w-full"
            v-model="v$.custom_id.$model" :class="{
              input_error: v$.custom_id.$error && v$.custom_id.required.$invalid,
              error_text: v$.custom_id.$error && v$.custom_id.required.$invalid,
              input_success: !v$.custom_id.$error && !v$.custom_id.$invalid,
            }" />
          <label for="custom_id" class="floating_label" :class="[
            v$.custom_id.$error && v$.custom_id.required.$invalid ? '!text-error' : '',
          ]">
            {{ $t("Enter a custom ID value*") }}
          </label>
          <div class="w-full lg:w-4/6" v-if="v$.custom_id.$error && v$.custom_id.required.$invalid">
            <p class="error_message">
              <span v-if="v$.custom_id.$error && v$.custom_id.required.$invalid">{{
                $t("An Id Is Required")
              }}</span>
            </p>
          </div>
        </div>
        <div class="   " :class="[!state.custom_id ? 'w-full ' : 'max-w-2xl']"
          v-if="isChecked('enable_custom_trigger')">
          <Client-only>
            <VCodeBlock :code="currentCode" highlightjs lang="javascript" theme="neon-bunny"
              class="min-h-[78px] w-full " />
            <p class="font-[400] text-[#979897] dark:text-whiteTamkin text-[11px] leading-[19px]">
              {{$t('This ID can be added to any HTML element such as')}} &lt;a&gt;, &lt;img&gt;,
              &lt;div&gt;&lt;/div&gt;, &lt;span&gt;, &lt;li&gt;&lt;/li&gt;, etc.
            </p>
          </Client-only>
        </div>
        <div @click="copyCode" v-if="isChecked('enable_custom_trigger')"
          class="ltr:ml-auto rtl:mr-auto cursor-pointer ipad-max:text-[12px] border-[2px] 
          rounded-lg border-transparent bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] group">
          <div class="bg-white dark:bg-tamkinDarkPrimary rounded-md flex items-center justify-center">
            <div class="rtl:pr-[16px] ltr:pl-[16px]">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18.829 11.361C19 10.948 19 10.423 19 9.375C19 8.327 19 7.802 18.829 7.389C18.7159 7.11593 18.5502 6.86782 18.3412 6.65883C18.1322 6.44984 17.8841 6.28407 17.611 6.171C17.198 6 16.673 6 15.625 6H9.1C7.84 6 7.21 6 6.729 6.245C6.30526 6.46078 5.96078 6.80526 5.745 7.229C5.5 7.709 5.5 8.339 5.5 9.6V16.125C5.5 17.173 5.5 17.698 5.671 18.111C5.9 18.662 6.338 19.101 6.889 19.329C7.302 19.5 7.827 19.5 8.875 19.5C9.923 19.5 10.448 19.5 10.861 19.329M18.829 11.361C18.7159 11.6341 18.5502 11.8822 18.3412 12.0912C18.1322 12.3002 17.8841 12.4659 17.611 12.579C17.198 12.75 16.673 12.75 15.625 12.75C14.577 12.75 14.052 12.75 13.639 12.921C13.3659 13.0341 13.1178 13.1998 12.9088 13.4088C12.6998 13.6178 12.5341 13.8659 12.421 14.139C12.25 14.552 12.25 15.077 12.25 16.125C12.25 17.173 12.25 17.698 12.079 18.111C11.9659 18.3841 11.8002 18.6322 11.5912 18.8412C11.3822 19.0502 11.1341 19.2159 10.861 19.329M18.829 11.361C18.2912 13.216 17.3017 14.9086 15.9492 16.2873C14.5967 17.666 12.9233 18.6878 11.079 19.261L10.861 19.329M14.5 6V5.1C14.5 3.84 14.5 3.21 14.255 2.729C14.0395 2.30541 13.6954 1.96095 13.272 1.745C12.79 1.5 12.16 1.5 10.9 1.5H4.6C3.34 1.5 2.71 1.5 2.229 1.745C1.80526 1.96078 1.46078 2.30526 1.245 2.729C1 3.209 1 3.839 1 5.1V11.4C1 12.66 1 13.29 1.245 13.771C1.461 14.195 1.805 14.539 2.229 14.755C2.709 15 3.34 15 4.601 15H5.5"
                  stroke="url(#paint0_linear_275_10529)" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <defs>
                  <linearGradient id="paint0_linear_275_10529" x1="10" y1="1.5" x2="10" y2="19.5"
                    gradientUnits="userSpaceOnUse">
                    <stop stop-color="#2DADA3" />
                    <stop offset="1" stop-color="#71DAD2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div class="auto-full">
              <button
                class="h-[39px] text-[15px] leading-[27px] font-[500] px-4 py-2 
                rounded-md group-hover:bg-gradient-to-r group-hover:to-tamkinStart 
                dark:text-whiteTamkin group-hover:from-tamkinEnd group-hover:text-transparent group-hover:bg-clip-text">
                {{ $t('Copy') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.floating_language_selector {
  @apply cursor-text rounded-[10px] absolute rtl:right-[0] ltr:left-[15px] lg:rtl:right-[30px] lg:ltr:left-[30px] top-[8px] lg:top-[12px] -translate-y-0 bg-white px-1 duration-100 ease-linear text-light peer-focus:text-darkGrey text-[14px] 2xl:text-[16px] text-[400] peer-focus:text-[12px] ipad-max:text-[12px] ipad-max:peer-focus:text-[12px] 2xl:peer-focus:text-[16px];
  transition: all 0.2s ease-in-out;
  line-height: 24px;
}
</style>
