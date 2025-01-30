<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

import { useCollapseStore } from "@/stores/collapse.js";
const collapseStore = useCollapseStore();
import { useCustomizeStore } from "@/stores/customize.js";

const customizeStore = useCustomizeStore();
const { isChecked, toggleCheckbox } = customizeStore;
const isOpen = ref(false);
const search = ref("");
const { languages, selectedLang } = storeToRefs(customizeStore);

const toggleDropdown = () => {
  isOpen.value = isOpen.value === true ? null : true;
};


const selectLanguage = (lang: any) => {
  selectedLang.value = lang;
  isOpen.value = false;
};
const filterdLanguages = computed(() => {
  return languages.value.filter((lang: any) =>
    lang.title.toLowerCase().includes(search.value.toString().toLowerCase())
  );
});
const closeDropdown = () => {
      isOpen.value = false;
    };
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full mt-[40px] mb-[100px]"
  >
    <div
      class="bg-white dark:bg-tamkinDarkPrimary rounded-[10px] w-full px-[15px] shadow-md -shadow-y-[1px] relative"
      :class="[
        collapseStore.collapses.includes('language_customize_card')
          ? 'pb-[24px]'
          : 'pb-[10px]',
      ]"
    >
      <div class="flex items-center justify-start pt-[16px]">
        <div>
          <h1
            class="text-[14px] lg:text-[18px] font-[500] leading-[30px] dark:text-whiteTamkin"
          >
            {{
              $t(
                customizeStore.getAccAttributes(
                  "deaf-customize-sign-language-player-language"
                )?.title
                  ? customizeStore.getAccAttributes(
                      "deaf-customize-sign-language-player-language"
                    )?.title
                  : ""
              )
            }}
          </h1>

          <p
            class="text-[12px] lg:text-[14px] leading-[24px] font-[400] text-[#585B5B] dark:text-whiteTamkin pt-[6px]"
          >
            <span
              v-if="
                !collapseStore.collapses.includes('language_customize_card')
              "
            >
              {{
                $t(
                  customizeStore.getAccAttributes(
                    "deaf-customize-sign-language-player-language"
                  )?.description_on_show
                    ? customizeStore.getAccAttributes(
                        "deaf-customize-sign-language-player-language"
                      )?.description_on_show
                    : ""
                )
              }}
            </span>
            <span v-else>
              {{
                $t(
                  customizeStore.getAccAttributes(
                    "deaf-customize-sign-language-player-language"
                  )?.description_on_hide
                    ? customizeStore.getAccAttributes(
                        "deaf-customize-sign-language-player-language"
                      )?.description_on_hide
                    : ""
                )
              }}
            </span>
          </p>
        </div>

        <div
          @click.stop="collapseStore.collapseMenu('language_customize')"
          v-on-click-outside="
            () => collapseStore.removeMenu('language_customize')
          "
          :class="[
            collapseStore.menus.includes('language_customize')
              ? 'active_notification !text-darkGrey'
              : '',
          ]"
          class="menu_button_control"
        >
          <svg
            width="18"
            height="5"
            viewBox="0 0 18 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :class="[
              collapseStore.menus.includes('language_customize')
                ? 'stroke-current !text-white !fill-white'
                : 'dark:text-white',
            ]"
          >
            <path
              d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
              fill="currentColor"
            />
          </svg>

          <div
            v-if="collapseStore.menus.includes('language_customize')"
            style="box-shadow: 0px 2px 6px 0px #00000040"
            class="mini_SizeMenu divide-y"
          >
            <!-- <div class="mini_wrap">
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5.5L5.5 9.9256V12.9824L12 8.55677L18.5 12.9824V9.9256L12 5.5ZM12 9.17966L7.75108 12.1087V14.7032L12 11.7742L16.2489 14.7032V12.1087L12 9.17966ZM12 12.3983L9.55195 14.0859V16.0286L12 14.3618L14.4481 16.0286V14.0859L12 12.3983ZM12 14.9834L9.55195 16.6502V18.5L12 16.8332L14.4481 18.5V16.6502L12 14.9834Z"
                    class="fill-[#585B5B] dark:fill-whiteTamkin"
                  />
                </svg>
              </div>
              <div class="text_mini">
                {{ $t("Switch To Annual") }}
              </div>
            </div> -->
            <div
              class="mini_wrap"
              @click="collapseStore.collapseCard('language_customize_card')"
            >
              <div>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7754 10.937L18.4995 7"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.7207 7H18.5V10.1496"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.2241 13.063L6.5 17"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.2793 17.0002H6.5V13.8506"
                    class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="text_mini">
                {{
                  !collapseStore.collapses.includes("language_customize_card")
                    ? $t("Minisize")
                    : $t("Maxsize")
                }}
              </div>
            </div>

            <div class="arrow">
              <svg
                width="16"
                class=""
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter
                    id="shadow-sm"
                    x="0"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feDropShadow
                      dx="1"
                      dy="1"
                      stdDeviation="1"
                      flood-color="rgba(0, 0, 0, 0.3)"
                    />
                  </filter>
                </defs>
                <path
                  d="M15.2266 7.80851C15.2266 10.0216 0.841317 15.4755 0.841317 15.4755V0.142578C0.841317 0.142578 15.2266 5.5954 15.2266 7.80851Z"
                  class="fill-white dark:!fill-darkTamkin"
                  filter="url(#shadow-sm)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative flex flex-col items-start justify-center  mt-[18px] pb-[16px]"
        v-if="!collapseStore.collapses.includes('language_customize_card')"
        :class="
          !customizeStore.managePlayerPackages.find(
            (t) =>
              t.feature === 'tamkin_deaf_dumb_deaf_manage_sign_language_mode'
          )
            ? 'pb-[179px]'
            : ''
        "
      >
        <MessagesLockedFeature
          v-if="
            !customizeStore.managePlayerPackages.find(
              (t) =>
                t.feature ===
                'tamkin_deaf_dumb_deaf_manage_sign_language_player_language'
            )
          "
        />
        <div
          v-if="customizeStore.islangListEnabled"
          class="w-full lg:w-[330px] lg:mt-0 mt-[8px]"
        >
            
            <div class="relative w-full lg:w-64"  v-on-click-outside="closeDropdown">
            <button

              @click="toggleDropdown"
              class="input_search_country !rounded-[10px] !h-[45px] peer w-full lg:w-[330px] rtl:text-right ltr:text-left"
              :class="[isOpen ? 'rounded-b-none' : '']"
            >
              <div
                class="floating_language_selector_ov flex flex-row items-center justify-start ! font-[500] !text-[13px] leading-[32px]"
                :class="[
                  selectedLang && selectedLang.title
                    ? '!text-black dark:!text-whiteTamkin'
                    : '!text-darkGrey',
                ]"
              >
                <div
                  v-if="selectedLang && selectedLang.code"
                  class="h-6 w-6 rounded-full flex items-center justify-center rtl:ml-[6px] ltr:mr-[6px]"
                  :class="[
                    selectedLang && selectedLang.code
                      ? 'bg-custom-gradient text-white'
                      : 'bg-[#F2FBF9] dark:bg-tamkinDarkPrimary text-tamkin',
                  ]"
                >
                  <div class="text-[12px] font-[400] leading-[14px] uppercase">
                    {{
                      selectedLang && selectedLang.code
                        ? selectedLang.code == "auto detect language"
                          ? "AD"
                          : selectedLang.code
                        : ""
                    }}
                  </div>
                </div>
                {{
                  selectedLang ? $t(`${selectedLang.title}`) : $t("Auto detect Language")
                }}
              </div>

              <svg
                width="11"
                height="14"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="[isOpen ? 'rtl:!rotate-90 ltr:rotate-90' : '']"
                class="rtl:rotate-180 fill-darkGrey dark:fill-whiteTamkin my-[4px] rtl:float-left ltr:float-right w-[20px] h-[10px] rtl:ml-[-15px] ltr:mr-[15px]"
               
              >
                <path
                  d="M11.027 8.61302C11.2715 8.81307 11.2715 9.18693 11.027 9.38698L1.31662 17.3319C0.990153 17.599 0.5 17.3667 0.5 16.9449L0.500001 1.05512C0.500001 0.633308 0.990154 0.401035 1.31662 0.668143L11.027 8.61302Z"
                  class="dark:fill-whiteTamkin"
                />
              </svg>
            </button>
            <div
              v-if="isOpen"

              class="absolute z-10 top-[52px] w-full lg:w-[330px] max-h-[260px] bg-white dark:bg-tamkinDarkPrimary border rounded shadow overflow-y-scroll"
            >
              <div class="py-[21px] search_input mx-auto w-full px-[20px]">
                <input
                  type="text"
                  class="input_dashboard_search w-full"
                  v-model="search"
                  :placeholder="`${$t('Search')} ...`"
                />
                <div
                  class="absolute top-[33px] lg:top-[20px] lg:left-[20px] left-[30px] lg:p-[16px]"
                >
                  <img src="/assets/imgs/icons/search.svg" />
                </div>
                <div
                  v-if="search"
                  @click="search = ''"
                  class="absolute top-[16px] lg:top-[18px] right-[20px] p-[16px] cursor-pointer"
                >
                  <img src="/assets/imgs/icons/clear_search.svg" />
                </div>
              </div>
              <ul>
                <li
                  v-for="lang in filterdLanguages"
                  :key="lang.code"
                  class="border-b-[1px] flex items-center px-[20px] py-2 hover:bg-gray-100 dark:hover:bg-darkGrey cursor-pointer"
                  @click="selectLanguage(lang)"
                >
                  <div
                    class="h-6 w-6 rounded-full flex items-center justify-center rtl:ml-[4px] ltr:mr-[4px]"
                    :class="[
                      selectedLang && selectedLang.code === lang.code
                        ? 'bg-custom-gradient text-white'
                        : 'bg-[#F2FBF9] dark:bg-darkGrey text-tamkin',
                    ]"
                  >
                    <div
                      class="text-[12px] font-[400] leading-[20px] uppercase dark:text-whiteTamkin"
                    >
                      {{
                        lang.code == "auto detect language" ? "AD" : lang.code
                      }}
                    </div>
                  </div>
                  <!-- <img  :src="country.flag"  class="w-6 h-4 mr-2" /> -->
                  <span class="text-[14px] dark:text-whiteTamkin">
                    {{ lang.title }}
                  </span>
                  <div
                    class="rtl:mr-auto ltr:ml-auto"
                    v-if="selectedLang && selectedLang.code === lang.code"
                  >
                    <img src="/assets/imgs/customize/selected_language.svg" />
                  </div>
                </li>
                <hr />
              </ul>
            </div>
          </div>
        </div>

        <div
          v-if="customizeStore.islangHighlightEnabled.active == 1"
          class="h-[55px] bg-[#FAFCFE]  dark:bg-tamkinDarkPrimary dark:border-darkborder p-[6px]
           flex items-center justify-start w-full mt-[16px] border-b-[2px] border-lightGrey"
        >
          <div
            class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full"
          >
            <img
              :src="`${
                customizeStore.islangHighlightEnabled.icon
                  ? 'https://www.tamkin.app' +
                    customizeStore.islangHighlightEnabled.icon
                  : '/assets/imgs/customize/lang_selector.svg'
              }`"
              class="h-[28px] w-[28px]"
            />
            <div class="flex flex-col items-start justify-center w-full">
              <div
                class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[12px] lg:text-[14px] lg:leading-[16.39px]"
              >
                <span>
                  {{
                    $t(
                      customizeStore.islangHighlightEnabled.label
                        ? customizeStore.islangHighlightEnabled.label
                        : ""
                    )
                  }}
                </span>
              </div>
            </div>
            <div class="rtl:mr-auto ltr:ml-auto">
              <label for="toggle_language_selector" class="toggle_wrap">
                <input
                  type="checkbox"
                  id="toggle_language_selector"
                  class="sr-only"
                  :checked="
                    isChecked(
                      'deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget'
                    )
                  "
                  @change="
                    toggleCheckbox(
                      'deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget'
                    )
                  "
                />
                <div
                  class="toggle_parent"
                  :class="[
                    isChecked(
                      'deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget'
                    )
                      ? 'active'
                      : 'in_active',
                  ]"
                >
                  <div
                    class="toggle_inner"
                    :class="{
                      active: isChecked(
                        'deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget'
                      ),
                    }"
                  >
                    <img
                      v-if="
                        isChecked(
                          'deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget'
                        )
                      "
                      src="/assets/imgs/translatevideo/sign_active.svg"
                      class="w-[28px]  absolute left-[11px]  h-[28px]"
                    />
                    <img
                      v-else
                      src="/assets/imgs/translatevideo/sign_inactive.svg"
                      class="w-[28px]  absolute left-[11px]  h-[28px]"
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.floating_language_selector_ov {
  @apply cursor-text rounded-[10px] absolute rtl:right-[15px] ltr:left-[15px]
    top-[12px] -translate-y-0 bg-white  dark:bg-tamkinDarkPrimary cursor-pointer
     dark:text-whiteTamkin duration-100 ease-linear text-light peer-focus:text-darkGrey 
    text-[14px] 2xl:text-[16px] text-[400] peer-focus:text-[12px] ipad-max:text-[12px] ipad-max:peer-focus:text-[12px] 
    2xl:peer-focus:text-[16px];
  transition: all 0.2s ease-in-out;
  line-height: 24px;
}
</style>
