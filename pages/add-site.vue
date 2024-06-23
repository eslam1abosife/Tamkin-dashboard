<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";
import { defineComponent } from "vue";
import Vue3TagsInput from "vue3-tags-input";
definePageMeta({
  layout: "dashboard",
});
const tags = ref([]);
const modalStore = useModalStore();

const currentTab = ref("1stpackages");
const collapsed = ref(false);
const switchTab = (tab: any) => {
  currentTab.value = tab;
};
const handleChangeTag = (tags: any) => {
  tags.value = tags;
}
</script>

<template>
  <div class="mt-[23px]">
    <div class="space-y-[10px]">
      <h1 class="text-left text-[24px] leading-[36px] font-[600]">Add Site</h1>

      <h2
        class="text-left text-[15px] font-[400] leading-[22.5px] text-darkGrey"
      >
        Enhance your site to improve accessibility and meet compliance standards
      </h2>
    </div>

    <div class="mt-[18px] flex items-center justify-between space-x-[36px]">
      <div>
        <h2 class="text-[20px] font-[600] leading-[30px] text-[#151515]">
          Select Your package
        </h2>
      </div>
      <div class="flex items-center space-x-[10px]">
        <div>
          <h2
            class="underline text-[14px] font-[400] leading-[24px] text-[#151515]"
          >
            What’s included?
          </h2>
        </div>
        <div class="cursor-pointer" @click="collapsed = !collapsed">
          <img src="/assets/imgs/arrow-right.svg" alt="" />
        </div>
      </div>
    </div>

    <div
      class="flex flex-col items-start justify-center"
      v-if="currentTab === '1stpackages'"
    >
      <div
        class="flex items-center lg:flex-row flex-col justify-start space-x-[8px] w-full"
      >
        <div
          class="flex items-center custom-border justify-start space-x-[16px] relative w-[538px] py-[62px] px-[10px] h-[149px] bg-whiteTamkin !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
        >
          <div class="absolute bottom-[119px] left-[34px]">
            <img
              src="/assets/imgs/freeplan.svg"
              class="w-[60px] h-[60px]"
              alt=""
            />
          </div>

          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 mt-[22px] relative w-full">
              <h1 class="font-[600] text-[20px] leading-[30px]">Free Widget</h1>
              <h2
                class="font-[400] text-[16px] leading-[21.86px] font-[Manrope] text-[#536174]"
              >
                For Individuals and Small Teams
              </h2>
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="radio5"
                type="radio"
                name="radio"
                class="hidden"
                value="0"
              />
              <label for="radio5" class="flex items-center cursor-pointer">
                <span
                  class="w-[24px] h-[24px] inline-block mr-1 rounded-full border border-grey"
                ></span>
              </label>
            </div>
          </div>

          <div
            v-if="collapsed"
            class="flex flex-col items-start justify-center space-y-[16px] left-[-16px] top-[90%] absolute z-[100] bg-white w-[538px] custom-border-collapse rounded-t-none rounded-[10px] mt-2 p-4"
          >
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-center custom-border justify-start space-x-[16px] relative w-[538px] py-[62px] px-[10px] h-[149px] bg-whiteTamkin !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
        >
          <div class="absolute bottom-[119px] left-[34px]">
            <img
              src="/assets/imgs/proplan.svg"
              class="w-[60px] h-[60px]"
              alt=""
            />
          </div>

          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 mt-[22px] relative w-full">
              <h1 class="font-[600] text-[20px] leading-[30px]">
                Pro-Accessibility Widget
              </h1>
              <h2
                class="font-[400] text-[16px] leading-[21.86px] font-[Manrope] text-[#536174]"
              >
                For Individuals and Small Teams
              </h2>
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="radio5"
                type="radio"
                name="radio"
                class="hidden"
                value="0"
              />
              <label for="radio5" class="flex items-center cursor-pointer">
                <span
                  class="w-[24px] h-[24px] inline-block mr-1 rounded-full border border-grey"
                ></span>
              </label>
            </div>
          </div>

          <div
            v-if="collapsed"
            class="flex flex-col items-start justify-center space-y-[16px] left-[-16px] top-[90%] absolute z-[100] bg-white w-[538px] custom-border-collapse rounded-t-none rounded-[10px] mt-2 p-4"
          >
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col items-start justify-center"
      v-if="currentTab === '2ndpackages'"
    >
      <div
        class="flex items-center lg:flex-row flex-col justify-start space-x-[8px] w-full"
      >
        <div
          class="flex items-center custom-border justify-start space-x-[16px] relative w-[538px] py-[62px] px-[10px] h-[149px] bg-whiteTamkin !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
        >
          <div class="absolute bottom-[119px] left-[34px]">
            <img
              src="/assets/imgs/platplan.svg"
              class="w-[60px] h-[60px]"
              alt=""
            />
          </div>

          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 mt-[22px] relative w-full">
              <h1 class="font-[600] text-[20px] leading-[30px]">Premium</h1>
              <h2
                class="font-[400] text-[16px] leading-[21.86px] font-[Manrope] text-[#536174]"
              >
                For Individuals and Small Teams
              </h2>
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="radio5"
                type="radio"
                name="radio"
                class="hidden"
                value="0"
              />
              <label for="radio5" class="flex items-center cursor-pointer">
                <span
                  class="w-[24px] h-[24px] inline-block mr-1 rounded-full border border-grey"
                ></span>
              </label>
            </div>
          </div>

          <div
            v-if="collapsed"
            class="flex flex-col items-start justify-center space-y-[16px] left-[-16px] top-[90%] absolute z-[100] bg-white w-[538px] custom-border-collapse rounded-t-none rounded-[10px] mt-2 p-4"
          >
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-center custom-border justify-start space-x-[16px] relative w-[538px] py-[62px] px-[10px] h-[149px] bg-whiteTamkin !rounded-[10px] mt-[35px]"
          style="padding: 16px, 10px, 16px, 10px"
        >
          <div class="absolute bottom-[119px] left-[34px]">
            <img
              src="/assets/imgs/plat_plan.svg"
              class="w-[60px] h-[60px]"
              alt=""
            />
          </div>

          <div class="flex items-center justify-center relative w-full">
            <div class="order-2 mt-[22px] relative w-full">
              <h1 class="font-[600] text-[20px] leading-[30px]">Platinum</h1>
              <h2
                class="font-[400] text-[16px] leading-[21.86px] font-[Manrope] text-[#536174]"
              >
                For Individuals and Small Teams
              </h2>
            </div>
            <div class="order-1 mx-[15px]">
              <input
                id="radio5"
                type="radio"
                name="radio"
                class="hidden"
                value="0"
              />
              <label for="radio5" class="flex items-center cursor-pointer">
                <span
                  class="w-[24px] h-[24px] inline-block mr-1 rounded-full border border-grey"
                ></span>
              </label>
            </div>
          </div>

          <div
            v-if="collapsed"
            class="flex flex-col items-start justify-center space-y-[16px] left-[-16px] top-[90%] absolute z-[100] bg-white w-[538px] custom-border-collapse rounded-t-none rounded-[10px] mt-2 p-4"
          >
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_active.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
            <div class="flex items-center justify-start space-x-[14px]">
              <div>
                <img src="/assets/imgs/checked_list_inactive.svg" alt="" />
              </div>
              <div>
                <h3 class="text-[14px] font-[400] leading-[20px]">
                  All analytics features
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex items-center justify-center mt-[22px] mx-auto space-x-[8px]"
    >
      <div
        :class="[currentTab === '1stpackages' ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
        class="w-[15px] h-[15px] rounded-full cursor-pointer"
        @click="switchTab('1stpackages')"
      ></div>
      <div
        :class="[currentTab === '2ndpackages' ? 'bg-tamkin' : 'bg-[#D9D9D9] ']"
        class="w-[15px] h-[15px] rounded-full cursor-pointer"
        @click="switchTab('2ndpackages')"
      ></div>
    </div>

    <div class="flex items-center justify-start  w-full">
 
        <h1 class="font-[600] text-[20px] leading-[30px]">Enter Website URLS</h1>
  
    </div>
    <vue3-tags-input
    :tags="tags"
    class="mt-[16px] w-full h-[164px] border-[1px] border-[#C5C5C5] bg-white focus:outline-none focus:ring-0 focus:ring-transparent"
    placeholder="Add new website"
    @on-tags-changed="handleChangeTag"
  />

 <button class="btn-dashboard-normal mt-[16px] ml-auto">Add Sites and Continue</button>
  </div>
</template>


<style lang="scss">
.v3ti-tag-content::after {
    content: url('assets/imgs/tick.svg'); /* Replace 'path/to/your/svg/icon.svg' with the actual path to your SVG file */
    margin-left: 5px; /* Adjust spacing */
    color: green; /* Color the check mark green */
  }
.v3ti--focus  {

    outline: 0;
    border-color: transparent;
    box-shadow:none !important;

}
.v3ti{
    @apply border-[1px] border-lightGrey;
}
.v3ti .v3ti-content{

    @apply ml-[24px] ;
}
.v3ti .v3ti-tag {
    @apply bg-tamkinLight text-darkGrey rounded-none mt-[23px] ;
    /*border: 1px solid #222222;*/
    /*border-radius: 0;*/
  }
  
  .v3ti .v3ti-new-tag{
    @apply mt-[23px] focus:outline-none focus:ring-0 ;
  }
  .v3ti .v3ti-tag .v3ti-remove-tag {
    color: transparent;
    transition: color .3s;
  }
  .v3ti-remove-tag{
    @apply hidden;
  }
  .v3ti .v3ti-tag .v3ti-remove-tag:hover {
    color: black;
  }
</style>