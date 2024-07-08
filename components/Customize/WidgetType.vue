<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import { useCustomizeStore } from "@/stores/customize.js";
const customizeStore = useCustomizeStore();

import { useCollapseStore } from "@/stores/collapse.js";
const collapseStore = useCollapseStore();

const {widgetType} = storeToRefs(customizeStore)



</script>

<template>
  <div
    class="flex flex-col items-center justify-center   w-full mt-[40px]">
    <div class=" bg-white rounded-[10px] w-full  px-[15px]">
        <div class="flex items-center justify-start ml-[15px] pt-[16px]">
          <div>
            <h1 class="text-[20px] font-[500] leading-[30px]">
                Widget Type
            </h1>
            
            <p
              class="text-[16px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
            >
            Control the size of the buttons that you want to appear in the list            </p>
          </div>

          <div
            @click.stop="collapseStore.collapseMenu('widget_type')"
            v-on-click-outside="() => collapseStore.removeMenu('widget_type')"
            :class="[
              collapseStore.menus.includes('widget_type') ? 'active_notification !text-darkGrey' : '',
            ]"
            class="relative ltr:ml-auto ltr:mr-[15px] rtl:mr-auto rtl:ml-[-15px] flex items-center justify-center cursor-pointer 
            bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
          >
            <svg
              width="18"
              height="5"
              viewBox="0 0 18 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              :class="[
                collapseStore.menus.includes('widget_type')
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
              v-if=" collapseStore.menus.includes('widget_type')"
              class="mini_SizeMenu"
            >
              <div
                class="mini_wrap"
                @click=" collapseStore.collapseCard('widget_type_card')"
              >
                <div>
                  <img
                    src="/assets/imgs/addons/min_size.svg"
                    alt=""
                    :class="[collapseStore.menus.includes('widget_type') ? '!fill-white' : '']"
                  />
                </div>
                <div class="text_mini">
                  {{ !collapseStore.collapses.includes('widget_type_card') ?'Minisize':'Maxsize' }}
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
          class="flex flex-col items-start justify-center rtlmr-[15px] ltr:ml-[15px] mt-[18px] divide-y pb-[16px]"
          v-if="!collapseStore.collapses.includes('widget_type_card')"
        >
    
<div class="flex items-center lg:flex-row flex-col justify-center lg:justify-between w-full lg:flex-wrap mx-auto ipad-max:flex-col ">
    <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-center relative w-full h-[48px] bg-[#FAFCFE] border-b-[2px] border-lightGrey">
            <div class="order-2 relative w-full">
              <h1 class="font-[500] text-[15px] leading-[22.5px]">Full Widget</h1>
           
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="full_widget"
                type="radio"
                name="plans_radio"
                class="hidden"
              :checked="widgetType === 'full_widget'"
                value="full_widget"
                @click.stop="customizeStore.selectWidgetType('full_widget')"
                         
              />
              <label for="full_widget" class="flex items-center cursor-pointer">
                <span
                  class="radio-tamkin"
                ></span>
              </label>
            </div>
          </div>
          <div>
            <img src="/assets/imgs/customize/full_widget.svg" class="lg:h-[200px] 2xl:h-full  " alt="">
          </div>
      </div>
      <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-center relative w-full h-[48px] bg-[#FAFCFE] border-b-[2px] border-lightGrey">
            <div class="order-2 relative w-full">
              <h1 class="font-[500] text-[15px] leading-[22.5px]">Mini Widget</h1>
           
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="mini_widget"
                type="radio"
                name="plans_radio"
                class="hidden"
                :checked="widgetType === 'mini_widget'"

                value="mini_widget"
                @click.stop="customizeStore.selectWidgetType('mini_widget')"
                         
              />
              <label for="mini_widget" class="flex items-center cursor-pointer">
                <span
                  class="radio-tamkin"
                ></span>
              </label>
            </div>
          </div>
          <div>
            <img src="/assets/imgs/customize/mini_widget.svg"  class="lg:h-[200px] 2xl:h-full  " alt="">
          </div>
      </div>

      <div class="flex flex-col items-center justify-center mt-[16px]">
        <div class="flex items-center justify-center relative w-full h-[48px] bg-[#FAFCFE] border-b-[2px] border-lightGrey">
            <div class="order-2 relative w-full">
              <h1 class="font-[500] text-[15px] leading-[22.5px]">Round Widget</h1>
           
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="rounded_widget"
                type="radio"
                name="plans_radio"
                class="hidden"
                :checked="widgetType === 'rounded_widget'"

                value="rounded_widget"
                @click.stop="customizeStore.selectWidgetType('rounded_widget')"
                         
              />
              <label for="rounded_widget" class="flex items-center cursor-pointer">
                <span
                  class="radio-tamkin"
                ></span>
              </label>
            </div>
          </div>
          <div>
            <img src="/assets/imgs/customize/rounded_widget.svg" class="lg:h-[200px] 2xl:h-full  " alt="">
          </div>
      </div>

      <div class="flex flex-col items-center justify-center mt-[16px]">
        <div class="flex items-center justify-center relative w-full h-[48px] bg-[#FAFCFE] border-b-[2px] border-lightGrey">
            <div class="order-2 relative w-full">
              <h1 class="font-[500] text-[15px] leading-[22.5px]">Minuscule Widget</h1>
           
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="minuscule_widget"
                type="radio"
                name="plans_radio"
                class="hidden"
               
                value="minuscule_widget"
                @click.stop="customizeStore.selectWidgetType('minuscule_widget')"
                         
              />
              <label for="minuscule_widget" class="flex items-center cursor-pointer">
                <span
                  class="radio-tamkin"
                ></span>
              </label>
            </div>
          </div>
          <div>
            <img src="/assets/imgs/customize/minu_widget.svg" class="lg:h-[200px] 2xl:h-full  " alt="">
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
