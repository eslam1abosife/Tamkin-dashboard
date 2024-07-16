<script lang="ts" setup>
import { useCollapseStore } from "@/stores/collapse.js";
import { useOverviewStore } from "@/stores/overview";
import { vOnClickOutside } from "@vueuse/components";

const overviewStore = useOverviewStore()

const collapseStore = useCollapseStore();
const progress = ref(30.78);



</script>


<template>
    <div class="mt-[30px] bg-white rounded-[10px] h-full pb-[24px] w-full mb-[24px]" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.08);
    ">
        <div class="flex items-center justify-start px-[15px]">
          <div class="w-3/4">
            <h1 class="text-[18px] font-[500] leading-[30px]">
              <div class="flex items-center justify-start pt-[24px]">
                <div>
                  <h1 class="text-[18px] font-[500] leading-[30px]">
                    Live Translation Overview
                  </h1>

                  <p
                    class="text-[14px] leading-[24px] font-[400] text-[#585B5B] pt-[6px]"
                  >
                    Live Translation Overview offers insights into real-time translation
                    technologies, enabling instant communication between speakers of
                    different languages
                  </p>
                </div>
              </div>
            </h1>
          </div>
          <div
            class="rtl:mr-auto ltr:ml-auto flex items-center lg:flex-row flex-col justify-center lg:space-y-0 space-y-[10px] lg:justify-evenly rtl:space-x-reverse space-x-[16px]"
          >
            <button
            @click="$router.push('/statistics')"

              class="btn_bordered_dashboard rtl:mr-auto ltr:ml-auto rounded-full lg:!p-[10px] !p-[4px] lg:order-1 order-2 lg:my-0 my-4"
            >
              View All
            </button>
            <div
              @click.stop="collapseStore.collapseMenu('livetranslation_overview')"
              v-on-click-outside="() => collapseStore.removeMenu('livetranslation_overview')"

              :class="[
                collapseStore.menus.includes('livetranslation_overview') ? 'active_notification !text-darkGrey' : '',
              ]"
              class="lg:order-2 order-1 menu_button_control"
            >
              <svg
                width="18"
                height="5"
                viewBox="0 0 18 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                :class="[
                  collapseStore.menus.includes('livetranslation_overview')
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
                v-if="collapseStore.menus.includes('livetranslation_overview')"
                style="box-shadow: 0px 2px 6px 0px #00000040"
                class="mini_SizeMenu"
              >
                <div
                  class="mini_wrap"
                  @click="collapseStore.collapseCard('livetranslation_overview_card')"
                >
                  <div>
                    <img 
                      src="/assets/imgs/addons/min_size.svg"
                      
                      :class="[collapseStore.menus.includes('livetranslation_overview') ? '!fill-white' : '']"
                    />
                  </div>
                  <div class="text_mini"> {{
                    !collapseStore.collapses.includes("livetranslation_overview_card")
                      ? "Minisize"
                      : "Maxsize"
                  }}</div>
                </div>

                <div class="arrow">
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
        </div>

        <div
          v-if="!collapseStore.collapses.includes('livetranslation_overview_card')"
          class="flex lg:rtl:space-x-reverse space-x-8 items-center ipad-max:flex-wrap
           lg:flex-row flex-col justify-center lg:justify-between px-[15px] w-full mt-[16px]"
        >
          <!-- Donut Chart -->
          <div class="h-full ipad-max:mx-auto">
            <circular-progress-bar :initial-percentage="progress" />
          </div>
          <!-- Labels and Values -->
          <div
            class="flex flex-col items-start justify-center w-full space-y-[10px] mt-[32px] px-[4px]"
          >
            <div class="flex rtl:space-x-reverse space-x-8 items-center justify-between w-full">
              <div class="text-center">
                <span class="block w-3 h-3 bg-[#FFBA6B] rounded-full mx-auto"></span>
                <span class="text-gray-500">Used</span>
                <span class="block text-xl font-semibold">70%</span>
              </div>
              <div class="text-center">
                <span class="block w-3 h-3 bg-[#DEF3FE] rounded-full mx-auto"></span>
                <span class="text-gray-500">User Assistance</span>
                <span class="block text-xl font-semibold">20</span>
              </div>
              <div class="text-center">
                <span
                  class="block w-3 h-3 rounded-full mx-auto"
                  style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
                ></span>
                <span class="text-gray-500">Pages Translated</span>
                <span class="block text-xl font-semibold">5</span>
              </div>
            </div>
            <div class=" w-full">
               <div class="flex flex-col items-center justify-center w-full space-y-[6px]">
                <div class="flex items-center mt-[32px] w-full">
                    <div class="w-1/4 text-[#3D3D3D] text-[14px] leading-[24px] font-[400]  mr-auto">Average Daily</div>
                    <span class="text-[#A6A6A6] text-sm ml-auto ">40</span>
                  
                  </div>
                  <div class="w-full flex items-center rtl:space-x-reverse space-x-2">
                      <div  style="background: rgba(242, 243, 245, 1);
" class="rounded-full h-4 w-full relative overflow-hidden">
                        <div class="bg-[#F3DFD1] h-full rounded-r-full" style="width: 20%"></div>
                      </div>
                      
                    </div>
               </div>
              
               <div class="flex flex-col items-center justify-center w-full space-y-[6px]">
                <div class="flex items-center mt-[32px] w-full">
                    <div class="w-1/4 text-[#3D3D3D] text-[14px] leading-[24px] font-[400]  mr-auto">Average Daily</div>
                    <span class="text-[#A6A6A6] text-sm ml-auto ">280</span>
                  
                  </div>
                  <div class="w-full flex items-center rtl:space-x-reverse space-x-2">
                      <div  style="background: rgba(242, 243, 245, 1);
" class="rounded-full h-4 w-full relative overflow-hidden">
                        <div class="bg-[#D7D4F4] h-full rounded-r-full" style="width: 40%"></div>
                      </div>
                      
                    </div>
               </div>
               <div class="flex flex-col items-center justify-center w-full space-y-[6px]">
                <div class="flex items-center mt-[32px] w-full">
                    <div class="w-1/4 text-[#3D3D3D] text-[14px] leading-[24px] font-[400]  mr-auto">Average Monthly</div>
                    <span class="text-[#A6A6A6] text-sm ml-auto ">280</span>
                  
                  </div>
                  <div class="w-full flex items-center rtl:space-x-reverse space-x-2">
                      <div  style="background: rgba(242, 243, 245, 1);
" class="rounded-full h-4 w-full relative overflow-hidden">
                        <div class="bg-[#CEE5F0] h-full rounded-r-full" style="width: 60%"></div>
                      </div>
                      
                    </div>
               </div>
              </div>
              
          </div>
        </div>
        <!-- Progress Bars -->
      </div>



</template>