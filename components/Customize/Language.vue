<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'

import { useCollapseStore } from "@/stores/collapse.js";
const collapseStore = useCollapseStore();
import { useCustomizeStore } from "@/stores/customize.js";


const customizeStore = useCustomizeStore();
const {isChecked,toggleCheckbox} = customizeStore
const isOpen = ref(false);
const search = ref("");
const languages = [
  { code: "en", name: "English (Usa)" },
  { code: "ar", name: "Arabic (Saudi Arabia)" },
  { code: "fr", name: "French (France)" },
  // Add more countries as needed
];

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
    lang.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const moveAccess = ref(false);
const moveHide = ref('')

const moveHideWidget = (v:string)=>{
    moveHide.value = v;
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center w-full mt-[40px] "
  >
    <div class="bg-white rounded-[10px] w-full px-[15px]">
      <div class="flex items-center justify-start ml-[15px] pt-[16px]">
        <div>
          <h1 class="text-[20px] font-[500] leading-[30px]">Language</h1>

          <p
            class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
          >
            Customize your widgets for a tailored browsing experience
          </p>
        </div>

        <div
        @click.stop="collapseStore.collapseMenu('language_customize')"
            v-on-click-outside="() => collapseStore.removeMenu('language_customize')"
          :class="[
            collapseStore.menus.includes('language_customize') 
            ? 'active_notification !text-darkGrey' : '',
          ]"
          class="relative ltr:ml-auto ltr:mr-[15px] rtl:mr-auto rtl:ml-[-15px] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
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
                : '',
            ]"
          >
            <path
              d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
              fill="currentColor"
            />
          </svg>

          <div
            v-if="collapseStore.menus.includes('language_customize') "
            style="box-shadow: 0px 2px 6px 0px #00000040"
            class="flex flex-col items-start justify-start divide-y !cursor-default absolute z-[1000] top-0 right-[50px] w-[203px] bg-white rounded-[10px] border-[1px] border-lightGrey"
          >
            <div
              class="flex items-center justify-start cursor-pointer rtl:space-x-reverse space-x-[8px] py-[16px] px-[12px] w-full"
              @click="  collapseStore.collapseCard('language_customize_card') 
"
            >
              <div>
                <img
                  src="/assets/imgs/addons/min_size.svg"
                  alt=""
                  :class="[collapseStore.menus.includes('language_customize')  ? '!fill-white' : '']"
                />
              </div>
              <div class="text-[14px] leading-[21px] font-[400]">{{!collapseStore.collapses.includes('language_customize_card')  ?'Minisize':'Maxsize'}}</div>
            </div>

            <div class="absolute top-[10px] right-[-10px] z-[50] !border-none">
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
        class="flex flex-col items-start justify-center ltr:mr-[15px] rtl:ml-[15px] mt-[18px]  pb-[16px]"
        v-if="!collapseStore.collapses.includes('language_customize_card') "
      >
        <div class="w-full lg:w-[330px] lg:mt-0 mt-[16px]">
          <div class="relative w-full lg:w-64">
            <button
              @click="toggleDropdown"
              class="input_search_country !rounded-[10px] peer w-full lg:w-[330px] rtl:text-right ltr:text-left"
              :class="[isOpen ? 'rounded-b-none' : '']"
            >
              <div
                class="floating_language_selector !font-[500] text-[14px] leading-[32px]"
                :class="[
                  selectedLanguage && selectedLanguage.name
                    ? '!text-black'
                    : '!text-darkGrey',
                ]"
              >
                {{
                  selectedLanguage
                    ? selectedLanguage.name
                    : "Auto detect Language"
                }}
              </div>

              <svg
                width="12"
                height="18"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="[isOpen ? 'rtl:!rotate-90 ltr:rotate-90' : '']"
                class="stroke-current rtl:rotate-180 fill-darkGrey my-[6px] rtl:float-left ltr:float-right w-[20px] h-[10px] rtl:ml-[15px] ltr:mr-[15px]"
              >
                <path
                  d="M11.027 8.61302C11.2715 8.81307 11.2715 9.18693 11.027 9.38698L1.31662 17.3319C0.990153 17.599 0.5 17.3667 0.5 16.9449L0.500001 1.05512C0.500001 0.633308 0.990154 0.401035 1.31662 0.668143L11.027 8.61302Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            <div
              v-if="isOpen"
              class="absolute z-10 top-[52px] w-[330px] bg-white border rounded shadow"
            >
              <div class="py-[21px] search_input mx-auto w-full px-[20px]">
                <input
                  type="text"
                  class="input_dashboard_search w-full"
                  v-model="search"
                  placeholder="Search ..."
                />
                <div
                  class="absolute top-[33px] lg:top-[20px] lg:left-[20px] left-[30px] lg:p-[16px]"
                >
                  <img src="/assets/imgs/icons/search.svg" alt="" />
                </div>
                <div
                  v-if="search"
                  @click="search = ''"
                  class="absolute top-[16px] lg:top-[18px] right-[20px] p-[16px] cursor-pointer"
                >
                  <img src="/assets/imgs/icons/clear_search.svg" alt="" />
                </div>
              </div>
              <ul>
                <li
                  v-for="lang in filterdLanguages"
                  :key="lang.code"
                  class="border-b-[1px] flex items-center px-[20px] py-2 hover:bg-gray-100 cursor-pointer"
                  @click="selectLanguage(lang)"
                >
                  <div
                    class="h-6 w-6 rounded-full flex items-center justify-center rtl:ml-[4px] ltr:mr-[4px]"
                    :class="[
                      selectedLanguage && selectedLanguage.code === lang.code
                        ? 'bg-custom-gradient text-white'
                        : 'bg-[#F2FBF9] text-tamkin',
                    ]"
                  >
                    <div
                      class="text-[12px] font-[400] leading-[20px] uppercase"
                    >
                      {{ lang.code }}
                    </div>
                  </div>
                  <!-- <img :src="country.flag" alt="" class="w-6 h-4 mr-2" /> -->
                  <span>{{ lang.name }}</span>
                  <div
                    class="rtl:mr-auto ltr:ml-auto"
                    v-if="
                      selectedLanguage && selectedLanguage.code === lang.code
                    "
                  >
                    <img
                      src="/assets/imgs/customize/selected_language.svg"
                      alt=""
                    />
                  </div>
                </li>
                <hr />
              </ul>
            </div>
          </div>
        </div>

        <div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[16px] border-b-[2px] border-lightGrey">
     
            <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
              <img
                src="/assets/imgs/customize/lang_selector.svg"
                class="h-[28px] w-[28px]"
                alt=""
              />
              <div class="flex flex-col items-start justify-center w-full">
                <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
                  <span>Show  language selector on the widget</span>
                </div>
             
              </div>
              <div class="ml-auto">
                <label
                  for="toggle_language_selector"
                  class="toggle_wrap h-[32px]"
                >
                  <input
                    type="checkbox"
                    id="toggle_language_selector"
                    class="sr-only"
                        :checked="isChecked('language')"
                    @change="toggleCheckbox('language')"
                  />
                  <div
                    class="toggle_parent"
                    :class="[
                      isChecked('language')
                        ? 'active'
                        : 'in_active',
                    ]"
                  >
                    <div
                      class="toggle_inner"
                      :class="{ 'active': isChecked('language') }"
                    >
                      <img
                        v-if="isChecked('language')"
                        src="/assets/imgs/addons/active_toggle.svg"
                        class="w-[28px] h-[28px]"
                        alt=""
                      />
                      <img
                        v-else
                        src="/assets/imgs/addons/toggle.svg"
                        class="w-[28px] h-[28px]"
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
        class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] rtl:mr-[15px] ltr:ml-[15px]"
      >
        Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
        est veritatis dolore. Exercitationem et omnis ea quidem
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.floating_language_selector {
  @apply cursor-text rounded-[10px] absolute rtl:right-[0] ltr:left-[15px] lg:rtl:right-[30px] lg:ltr:left-[30px] 
    top-[8px] lg:top-[12px] -translate-y-0 bg-white px-1 duration-100 ease-linear text-light peer-focus:text-darkGrey 
    text-[14px] 2xl:text-[16px] text-[400] peer-focus:text-[12px] ipad-max:text-[12px] ipad-max:peer-focus:text-[12px] 
    2xl:peer-focus:text-[16px];
  transition: all 0.2s ease-in-out;
  line-height: 24px;
}
</style>
