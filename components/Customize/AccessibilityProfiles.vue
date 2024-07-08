<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'

import { useCollapseStore } from "@/stores/collapse.js";
const collapseStore = useCollapseStore();

const customizeStore = useCustomizeStore();
const {isChecked,toggleCheckbox} = customizeStore

</script>

<template>
  <div
    class="flex flex-col items-center justify-center  w-full mt-[40px] "
  >
  <div class=" bg-white rounded-[10px] w-full  px-[15px]">
    <div class="flex items-center justify-start pt-[24px] w-full">
      <div>
        <h1 class="text-[20px] font-[500] leading-[30px]">
          Manage your Accessibility Profiles
        </h1>
      </div>
      <div
       @click.stop="collapseStore.collapseMenu('manage_access_profiles')"
            v-on-click-outside="() => collapseStore.removeMenu('manage_access_profiles')"
        :class="[
          collapseStore.menus.includes('manage_access_profiles') ? 'active_notification !text-darkGrey' : '',
        ]"
        class="relative ltr:ml-auto ltr:mr-[15px] rtl:mr-auto rtl:ml-[0] flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
      >
        <svg
          width="18"
          height="5"
          viewBox="0 0 18 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          :class="[
            collapseStore.menus.includes('manage_access_profiles') 
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
          v-if="collapseStore.menus.includes('manage_access_profiles') "
          class="mini_SizeMenu"
        >
          <div
            class="mini_wrap"
            @click="collapseStore.collapseCard('manage_access_profiles_card') "
          >
            <div>
              <img
                src="/assets/imgs/addons/min_size.svg"
                alt=""
                :class="[collapseStore.menus.includes('manage_access_profiles') ? '!fill-white' : '']"
              />
            </div>
            <div class="text_mini">
              {{ !collapseStore.collapses.includes('manage_access_profiles_card')? 'Minisize':'Maxsize' }}
            </div>
          </div>

          <div
            class="arrow"
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
      class="flex flex-col items-start justify-center  pb-[16px] mt-[18px] divide-y"
      v-if="!collapseStore.collapses.includes('manage_access_profiles_card')"
    >
      <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isChecked('motor_active') ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/monitor_im.svg"
            alt=""
            :class="[!isChecked('motor_active') ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isChecked('motor_active') ? 'opacity-60' : '']"
          >
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
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                id="toggle_motor"
                class="sr-only"
                 :checked="isChecked('motor_active')"
            @change="toggleCheckbox('motor_active')"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked('motor_active')
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{ 'active': isChecked('motor_active') }"
                >
                  <img
                    v-if="isChecked('motor_active')"
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

      <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isChecked('color_blind') ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/color_blind.svg"
            alt=""
            :class="[!isChecked('color_blind') ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isChecked('color_blind') ? 'opacity-60' : '']"
          >
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
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                id="toggle_colorBlind"
                class="sr-only"
                  :checked="isChecked('color_blind')"
            @change="toggleCheckbox('color_blind')"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked('color_blind')
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{ 'active': isChecked('color_blind') }"
                >
                  <img
                    v-if="isChecked('color_blind')"
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

      <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isChecked('visuallyImpraired') ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/vis_impaired.svg"
            alt=""
            :class="[!isChecked('visuallyImpraired') ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isChecked('visuallyImpraired') ? 'opacity-60' : '']"
          >
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
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                id="toggle_visually_imp"
                class="sr-only"
                      :checked="isChecked('visuallyImpraired')"
            @change="toggleCheckbox('visuallyImpraired')"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked('visuallyImpraired')
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{
                    'active': isChecked('visuallyImpraired'),
                  }"
                >
                  <img
                    v-if="isChecked('visuallyImpraired')"
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

      <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isChecked('Seizure') ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/seizure.svg"
            alt=""
            :class="[!isChecked('Seizure') ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isChecked('Seizure') ? 'opacity-60' : '']"
          >
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
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                id="toggle_seizure_epli"
                class="sr-only"
                       :checked="isChecked('Seizure')"
            @change="toggleCheckbox('Seizure')"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked('Seizure')
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{ 'active': isChecked('Seizure') }"
                >
                  <img
                    v-if="isChecked('Seizure')"
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

      <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isChecked('blind') ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/blind.svg"
            alt=""
            :class="[!isChecked('blind') ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isChecked('blind') ? 'opacity-60' : '']"
          >
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
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                id="toggle_blind_manage"
                class="sr-only"
                 :checked="isChecked('blind')"
            @change="toggleCheckbox('blind')"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked('blind')
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{ 'active': isChecked('blind') }"
                >
                  <img
                    v-if="isChecked('blind')"
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

      <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isChecked('dyslexia') ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/df.svg"
            alt=""
            :class="[!isChecked('dyslexia') ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isChecked('dyslexia') ? 'opacity-60' : '']"
          >
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
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                id="toggle_Dyslexia"
                class="sr-only"
                   :checked="isChecked('dyslexia')"
            @change="toggleCheckbox('dyslexia')"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked('dyslexia')
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{ 'active': isChecked('dyslexia') }"
                >
                  <img
                    v-if="isChecked('dyslexia')"
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

      <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isChecked('congitive') ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/congitive.svg"
            alt=""
            :class="[!isChecked('congitive') ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isChecked('congitive') ? 'opacity-60' : '']"
          >
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
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                id="toggle_congitive_manage"
                class="sr-only"
                       :checked="isChecked('congitive')"
            @change="toggleCheckbox('congitive')"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked('congitive')
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{ 'active': isChecked('congitive') }"
                >
                  <img
                    v-if="isChecked('congitive')"
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

      <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isChecked('ADHD') ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/adhd.svg"
            alt=""
            :class="[!isChecked('ADHD') ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isChecked('ADHD') ? 'opacity-60' : '']"
          >
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
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                id="toggle_adhd"
                class="sr-only"
              :checked="isChecked('ADHD')"
            @change="toggleCheckbox('ADHD')"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked('ADHD')
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{ 'active': isChecked('ADHD') }"
                >
                  <img
                    v-if="isChecked('ADHD')"
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
      class="py-[24px] w-3/4 text-[16px] leading-[24px] font-[400] text-[#585B5B] ml-[15px]"
    >
      Temporibus rerum vel laudantium. Earum velit qui quis quia autem iusto
      est veritatis dolore. Exercitationem et omnis ea quidem
    </div>
  </div>
  </div>
</template>
