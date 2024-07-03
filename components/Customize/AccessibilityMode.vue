<script lang="ts" setup>
const moveAccess = ref(false);
const moveHide = ref('')

const moveHideWidget = (v:string)=>{
    moveHide.value = v;
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center mt-[32px] px-[15px]">
    <div class="h-[65px] bg-[#FAFCFE] p-[12px] flex items-center justify-start w-full mt-[4px] border-b">
     
        <div class="flex items-center justify-start space-x-[13px] w-full">
          <img
            src="/assets/imgs/customize/move_acess.svg"
            class="h-[28px] w-[28px]"
            alt=""
          />
          <div class="flex flex-col items-start justify-center w-full">
            <div class="text-[#23262F] font-[500] text-[16px] leading-[16.39px]">
              <span>Move / hide accessibility</span>
            </div>
            <div
              class="text-[#585B5B] font-[500] text-[12px] leading-[13.66px] mt-[8px]"
            >
              <span>
                Reposition or conceal accessibility features to simplify the interface              </span>
            </div>
          </div>
          <div class="ml-auto">
            <label
              for="toggle_move_acess"
              class="relative inline-flex items-center cursor-pointer h-[32px]"
            >
              <input
                type="checkbox"
                id="toggle_move_acess"
                class="sr-only"
                v-model="moveAccess"
              />
              <div
                class="w-14 h-8 bg-white rounded-full peer-checked:bg-green-500 transition-colors duration-200"
                :class="[
                    moveAccess
                    ? 'custom-border-tamkin custom-border-tamkin-rounded-small'
                    : 'border-[1px] border-lightGrey',
                ]"
              >
                <div
                  class="absolute left-1 top-1 w-6 h-6 bg-white border border-gray-300 rounded-full transition-transform duration-200 transform"
                  :class="{ 'translate-x-full ': moveAccess }"
                >
                  <img
                    v-if="moveAccess"
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

      <div class="flex items-center justify-between  mt-[24px] w-full space-x-[60px]" v-if="moveAccess">
        <div class=" flex items-center justify-start h-[50px] w-[180px] px-[15px] space-x-[10px] cursor-pointer"
        :class="[moveHide ==='left_side' ? 'custom-border padding-2' : '']"
        @click="moveHideWidget('left_side')">
            <div>
                <img src="/assets/imgs/customize/left_side.svg" alt="" >
            </div>
            <div>
                Left Side
            </div>
         
        </div>
        <div class="flex items-center  justify-start  h-[50px] w-[180px] px-[15px] space-x-[10px] cursor-pointer"
        @click="moveHideWidget('right_side')"
        :class="[moveHide === 'right_side' ? 'custom-border padding-2' : '']"

        >
            <div>
                <img src="/assets/imgs/customize/right_side.svg" alt="">
            </div>
            <div>
                Right Side
            </div>
         
        </div>
        <div class="ml-auto flex items-center justify-start  h-[50px] w-[180px] px-[15px] space-x-[10px] cursor-pointer"
           @click="moveHideWidget('hide')"
        :class="[moveHide === 'hide' ? 'custom-border padding-2' : '']"
        >
            <div>
                <img src="/assets/imgs/customize/hide.svg" alt="">
            </div>
            <div>
               Hide
            </div>
         
        </div>
      </div>
  </div>
</template>
