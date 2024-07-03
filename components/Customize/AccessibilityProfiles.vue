<script lang="ts" setup>
const openResizeMenuManage = ref(false);
const miniSizeManage = ref(false);
const isMotorActive = ref(false);
const isColorBlindChecked = ref(false);
const isVisuallyImprairedChecked = ref(false);
const isSeizureChecked = ref(false);
const isBlindChecked = ref(false);
const isDyslexiaChecked = ref(false);
const isCongitiveChecked = ref(false);
const isADHDChecked = ref(false);
</script>

<template>
  <div
    class="flex flex-col items-center justify-center  w-full mt-[40px] "
  >
  <div class=" bg-white rounded-[10px] w-full  px-[15px]">
    <div class="flex items-center justify-start ml-[15px] pt-[35px] w-full">
      <div>
        <h1 class="text-[20px] font-[500] leading-[30px]">
          Manage your Accessibility Profiles
        </h1>
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
      class="flex flex-col items-start justify-center ml-[15px] pb-[16px] mt-[18px] divide-y"
      v-if="!miniSizeManage"
    >
      <div
        class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start space-x-[13px] w-full">
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isMotorActive ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/monitor_im.svg"
            alt=""
            :class="[!isMotorActive ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isMotorActive ? 'opacity-60' : '']"
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
              class="relative inline-flex items-center cursor-pointer h-[32px]"
            >
              <input
                type="checkbox"
                id="toggle_motor"
                class="sr-only"
                v-model="isMotorActive"
              />
              <div
                class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                :class="[
                  isMotorActive
                    ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                    : 'border-[1px] border-lightGrey',
                ]"
              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                  :class="{ 'translate-x-full ': isMotorActive }"
                >
                  <img
                    v-if="isMotorActive"
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
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isColorBlindChecked ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/color_blind.svg"
            alt=""
            :class="[!isColorBlindChecked ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isColorBlindChecked ? 'opacity-60' : '']"
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
              class="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle_colorBlind"
                class="sr-only"
                v-model="isColorBlindChecked"
              />
              <div
                class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                :class="[
                  isColorBlindChecked
                    ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                    : 'border-[1px] border-lightGrey',
                ]"
              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                  :class="{ 'translate-x-full ': isColorBlindChecked }"
                >
                  <img
                    v-if="isColorBlindChecked"
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
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isVisuallyImprairedChecked ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/vis_impaired.svg"
            alt=""
            :class="[!isVisuallyImprairedChecked ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isVisuallyImprairedChecked ? 'opacity-60' : '']"
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
              class="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle_visually_imp"
                class="sr-only"
                v-model="isVisuallyImprairedChecked"
              />
              <div
                class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                :class="[
                  isVisuallyImprairedChecked
                    ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                    : 'border-[1px] border-lightGrey',
                ]"
              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                  :class="{
                    'translate-x-full ': isVisuallyImprairedChecked,
                  }"
                >
                  <img
                    v-if="isVisuallyImprairedChecked"
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
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isSeizureChecked ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/seizure.svg"
            alt=""
            :class="[!isSeizureChecked ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isSeizureChecked ? 'opacity-60' : '']"
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
              class="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle_seizure_epli"
                class="sr-only"
                v-model="isSeizureChecked"
              />
              <div
                class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                :class="[
                  isSeizureChecked
                    ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                    : 'border-[1px] border-lightGrey',
                ]"
              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                  :class="{ 'translate-x-full ': isSeizureChecked }"
                >
                  <img
                    v-if="isSeizureChecked"
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
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isBlindChecked ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/blind.svg"
            alt=""
            :class="[!isBlindChecked ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isBlindChecked ? 'opacity-60' : '']"
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
              class="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle_blind_manage"
                class="sr-only"
                v-model="isBlindChecked"
              />
              <div
                class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                :class="[
                  isBlindChecked
                    ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                    : 'border-[1px] border-lightGrey',
                ]"
              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                  :class="{ 'translate-x-full ': isBlindChecked }"
                >
                  <img
                    v-if="isBlindChecked"
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
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isDyslexiaChecked ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/df.svg"
            alt=""
            :class="[!isDyslexiaChecked ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isDyslexiaChecked ? 'opacity-60' : '']"
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
              class="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle_Dyslexia"
                class="sr-only"
                v-model="isDyslexiaChecked"
              />
              <div
                class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                :class="[
                  isDyslexiaChecked
                    ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                    : 'border-[1px] border-lightGrey',
                ]"
              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                  :class="{ 'translate-x-full ': isDyslexiaChecked }"
                >
                  <img
                    v-if="isDyslexiaChecked"
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
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isCongitiveChecked ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/congitive.svg"
            alt=""
            :class="[!isCongitiveChecked ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isCongitiveChecked ? 'opacity-60' : '']"
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
              class="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle_congitive_manage"
                class="sr-only"
                v-model="isCongitiveChecked"
              />
              <div
                class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                :class="[
                  isCongitiveChecked
                    ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                    : 'border-[1px] border-lightGrey',
                ]"
              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                  :class="{ 'translate-x-full ': isCongitiveChecked }"
                >
                  <img
                    v-if="isCongitiveChecked"
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
          <img
            src="/assets/imgs/addons/left_item.svg"
            alt=""
            :class="[!isADHDChecked ? 'opacity-60' : '']"
          />

          <img
            src="/assets/imgs/addons/adhd.svg"
            alt=""
            :class="[!isADHDChecked ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isADHDChecked ? 'opacity-60' : '']"
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
              class="relative inline-flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="toggle_adhd"
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
