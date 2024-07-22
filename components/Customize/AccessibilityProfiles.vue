<script lang="ts" setup>
import draggable from 'vuedraggable'

import { vOnClickOutside } from '@vueuse/components'

import { useCollapseStore } from "@/stores/collapse.js";
const collapseStore = useCollapseStore();

const customizeStore = useCustomizeStore();
const {isChecked,toggleCheckbox} = customizeStore
import { useCustomizeStore } from "@/stores/customize.js";

onMounted(()=>{
  customizeStore.initializeCardsMenu([
 {
  icon:'monitor_im.svg',
  name:'Motor impaired',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'motor_active'
 },
 {
  icon:'color_blind.svg',
  name:'Color blind',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'color_blind'
 },
 {
  icon:'vis_impaired.svg',
  name:'Visually-impaired',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'hide_images'
 },
 {
  icon:'seizure.svg',
  name:'Seizure & Epileptic',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'Seizure'
 },
 {
  icon:'blind.svg',
  name:'Blind',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'blind'
 },
 {
  icon:'df.svg',
  name:'Dyslexia',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'dyslexia'
 },
 {
  icon:'congitive.svg',
  name:'Congitive & Learning',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'congitive'
 },
 {
  icon:'adhd.svg',
  name:'ADHD',
  description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
  checkboxId:'ADHD'
 },


  ], 'manageProfileCardsCustomize', 'initialManageProfileCardsCustomize');

})
const getImagePath = (icon) => {
  return new URL(`/public/assets/imgs/addons/${icon}`, import.meta.url).href;
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center  w-full mt-[40px] " 
  >
  <div 
  

  class=" bg-white rounded-[10px] w-full  px-[15px] shadow-md  -shadow-y-[1px]" :class="[collapseStore.collapses.includes('manage_access_profiles_card') ? 'pb-[24px]' :'pb-[10px]']">
    <div class="flex items-center justify-start pt-[24px] w-full">
      <div>
        <h1 class="text-[18px] font-[500] leading-[30px]">
          Manage your Accessibility Profiles
        </h1>
      </div>
      <div
       @click.stop="collapseStore.collapseMenu('manage_access_profiles')"
            v-on-click-outside="() => collapseStore.removeMenu('manage_access_profiles')"
        :class="[
          collapseStore.menus.includes('manage_access_profiles') ? 'active_notification !text-darkGrey' : '',
        ]"
        class="relative ltr:ml-auto rtl:mr-auto  flex items-center justify-center cursor-pointer bg-[#F2F2F2] rounded-[10px] w-[36px] h-[36px]"
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
          class="mini_SizeMenu divide-y"
        >
        <div
        class="mini_wrap"
      >
        <div>
          <img 
            src="/assets/imgs/addons/annual_convert.svg"
            
            :class="[
              collapseStore.menus.includes('select_date_range') ? '!fill-white' : '',
            ]"
          />
        </div>
        <div class="text_mini">
          Switch To Annual
        </div>
      </div>
          <div
            class="mini_wrap"
            @click="collapseStore.collapseCard('manage_access_profiles_card') "
          >
            <div>
              <img 
                src="/assets/imgs/addons/min_size.svg"
                
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
    <draggable
        
    v-model="customizeStore.manageProfileCardsCustomize"
    @change="customizeStore.onDragChange('manageProfileCardsCustomize', 'initialManageProfileCardsCustomize')"
    @start="customizeStore.onDragStart('initialManageProfileCardsCustomize')"
    @end="customizeStore.onDragEnd('manageProfileCardsCustomize', 'initialManageProfileCardsCustomize')"
    item-key="name" class="w-full"  handle=".handle">
      <template #item="{element}" >
      <div  
        class="h-[55px] bg-[#FAFCFE] p-[6px] flex items-center justify-start w-full mt-[4px]"
      >
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img 
            src="/assets/imgs/addons/left_item.svg"
            
            :class="[!isChecked(element.checkboxId) ? 'opacity-60' : '']"
            class="cursor-pointer handle"
          />

          <img 
            :src="getImagePath(element.icon)"
            
            :class="[!isChecked(element.checkboxId) ? 'opacity-60' : '']"
          />
          <div
            class="flex flex-col items-start justify-center w-full"
            :class="[!isChecked(element.checkboxId) ? 'opacity-60' : '']"
          >
            <div class="text-[#23262F] font-[500] text-[14px] leading-[16.39px]">
              <span>{{element.name}}</span>
            </div>
            <div
              class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
            >
              <span>
             {{ element.description }}
              </span>
            </div>
          </div>
          <div class="ml-auto">
            <label
              :for="element.checkboxId"
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                :id="element.checkboxId"
                class="sr-only"
                :checked="isChecked(element.checkboxId)"
                @change="toggleCheckbox(element.checkboxId)"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked(element.checkboxId)
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{ 'active': isChecked(element.checkboxId) }"
                >
                  <img 
                    v-if="isChecked(element.checkboxId)"
                    src="/assets/imgs/addons/active_toggle.svg"
                    class="w-[28px] h-[28px]"
                    
                  />
                  <img 
                    v-else
                    src="/assets/imgs/addons/toggle.svg"
                    class="w-[28px] h-[28px]"
                    
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </template>
      </draggable>

    
    </div>

    
  </div>
  </div>
</template>
