<script lang="ts" setup>
import { useCustomizeStore } from "@/stores/customize.js";

const customizeStore = useCustomizeStore();
const {isChecked,toggleCheckbox} = customizeStore
 const moveHide = ref('')

const moveHideWidget = (v:string)=>{
    moveHide.value = v;
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center mt-[32px] px-[15px]">
    <div class="h-[55px] bg-[#FAFCFE] dark:bg-tamkinDarkPrimary p-[6px] flex items-center justify-start w-full mt-[4px] border-b dark:border-darkborder">
     
        <div class="flex items-center justify-start rtl:space-x-reverse space-x-[13px] w-full">
          <img 
            src="/assets/imgs/customize/move_acess.svg"
            class="h-[28px] w-[28px]"
            
          />
          <div class="flex flex-col items-start justify-center w-full">
            <div class="text-[#23262F] dark:text-whiteTamkin font-[500] text-[14px] leading-[16.39px]">
              <span>Move / hide accessibility</span>
            </div>
            <div
              class="text-[#585B5B] dark:text-whiteTamkin font-[500] text-[10px]
              
              lg:w-full w-40 truncate lg:text-[12px] leading-[13.66px] mt-[8px]"
            >
              <span>
                Reposition or conceal accessibility features to simplify the interface              </span>
            </div>
          </div>
          <div class="ml-auto">
            <label
              for="toggle_move_acess"
              class="toggle_wrap"
            >
              <input
                type="checkbox"
                id="toggle_move_acess"
                class="sr-only"
:checked="isChecked('move_access')"
            @change="toggleCheckbox('move_access')"
              />
              <div
                class="toggle_parent"
                :class="[
                  isChecked('move_access')
                    ? 'active'
                    : 'in_active',
                ]"
              >
                <div
                  class="toggle_inner"
                  :class="{ 'active': isChecked('move_access') }"
                >
                  <img 
                    v-if="isChecked('move_access')"
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

      <div class="flex items-center lg:flex-nowrap flex-wrap justify-center lg:justify-between  mt-[24px] 
       w-full rtl:space-x-reverse lg:space-x-[60px] dark:bg-tamkinDarkPrimary dark:text-whiteTamkin"
       v-if="isChecked('move_access')">
        <div class=" flex items-center justify-start h-[45px] w-[140px] px-[15px] rtl:space-x-reverse space-x-[10px] cursor-pointer"
        :class="[moveHide ==='left_side' ? 'custom-border padding-2' : '']"
        @click="moveHideWidget('left_side')">
            <div>
                <img  src="/assets/imgs/customize/left_side.svg"  class="w-3/4 h-3/4"/>
            </div>
            <div class="text-[14px]">
                Left Side
            </div>
         
        </div>
        <div class="flex items-center  justify-start  h-[45px] w-[140px] px-[15px] rtl:space-x-reverse space-x-[10px] cursor-pointer"
        @click="moveHideWidget('right_side')"
        :class="[moveHide === 'right_side' ? 'custom-border padding-2' : '']"

        >
            <div>
                <img  src="/assets/imgs/customize/right_side.svg"  class="w-3/4 h-3/4"/>
            </div>
            <div class="text-[14px] w-full">
              Right Side
            </div>
         
        </div>
        <div class="rtl:mr-auto ltr:ml-auto flex items-center justify-start  h-[45px] w-[140px] px-[15px]
         rtl:space-x-reverse space-x-[10px] cursor-pointer"
           @click="moveHideWidget('hide')"
        :class="[moveHide === 'hide' ? 'custom-border padding-2' : '']"
        >
            <div>
                <img  src="/assets/imgs/customize/hide.svg"  class="w-3/4 h-3/4"/>
            </div>
            <div class="text-[14px]">
              Hide
            </div>
         
        </div>
      </div>
  </div>
</template>
