<script lang="ts" setup>
import banner from "/assets/imgs/gradient_embded.png";

import { useCollapseStore } from "@/stores/collapse.js";

import { vOnClickOutside } from "@vueuse/components";

const collapseStore = useCollapseStore();
</script>


<template>
    <div class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] pb-[24px] shadow-md -shadow-y-[1px] relative"       >
        <div class="flex items-start justify-start px-[15px] pt-[24px]">
          <div class="">
            <h1 class="text-[14px] lg:text-[18px] font-[500] lg:leading-[30px] dark:text-whiteTamkin">{{$t('Connect with us')}}</h1>
  
            <p class="text-[12px] lg:text-[14px] lg:w-auto w-[290px] lg:leading-[24px] font-[400] text-[#585B5B]  dark:text-whiteTamkin/90  mt-[10px]">
             {{ $t(' Connect with us to stay updated and receive support for all your accessibility needs') }}
            </p>
          </div>
  
          <div
            @click.stop="collapseStore.collapseMenu('connect_withUs')"
            v-on-click-outside="() => collapseStore.removeMenu('connect_withUs')"
            :class="[
              collapseStore.menus.includes('connect_withUs')
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
                collapseStore.menus.includes('connect_withUs')
? 'stroke-current !text-white !fill-white' : 'dark:text-white',
              ]"
            >
              <path
                d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                fill="currentColor"
              />
            </svg>
  
            <div
              v-if="collapseStore.menus.includes('connect_withUs')"
              class="mini_SizeMenu"
            >
              <div
                class="mini_wrap"
                @click="collapseStore.collapseCard('connect_withUs_card')"
              >
                <div>
                  <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                
                  >
                    <path d="M13.7754 10.937L18.4995 7"   class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    
                
                </div>
                <div class="text_mini">
                  {{
                    !collapseStore.collapses.includes("connect_withUs_card")
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
                  class="fill-white dark:!fill-darkSecondary"
                  filter="url(#shadow-sm)"
                />
              </svg>
              </div>
            </div>
          </div>
        </div>
  
        <div
          class="flex items-center flex-col justify-center mt-[24px] space-y-[24px] px-[15px]"
          v-if="!collapseStore.collapses.includes('connect_withUs_card')"
        >
          <div
            :style="{ backgroundImage: `url(${banner})` }"
            style="width: 100%; background-size: cover"
            class="rounded-lg h-[150px] lg:h-auto text-center flex items-center justify-center lg:flex-row md:flex-row flex-col w-full"
          >
            <div class="hidden lg:block md:block lg:h-full md:h-full">
              <img 
                src="/assets/imgs/icons/man.svg"
                alt="Character"
                class=" h-full "
              />
            </div>
            <div class="flex flex-col items-center justify-center px-[10px] lg:space-y-0 space-y-4">
              <h2
                class="text-[14px] lg:text-[18px] ipad-max:leading-[28px] lg:leading-[40px] font-[600] text-gray-800 mb-2"
              >
                {{ $t('Would you like to have early access to the platform?') }}
              </h2>
              <button
                class="w-full ipad-max:leading-[18px] h-[40px] bg-white text-tamkin rtl:space-x-reverse 
                space-x-[12px] py-2 rounded-[10px] font-[600] text-[10px] lg:leading-[40px] lg:text-[12px] 
                flex items-center justify-center px-[12px] whitespace-nowrap"
              
              >
                <div class="">{{$t('Sign up to keep up with the latest news from us')}}</div>
                <div>
                  <img  src="/assets/imgs/icons/nicemove.svg" class="w-[30px] h-[30px]"  />
                </div>
              </button>
            </div>
          </div>
      
          <div class="">
            <h1
              class="text-center font-[500] text-[16px] lg:leading-[36px] leading-[20px] lg:text-[18px] dark:text-whiteTamkin"
            >
              {{$t('Need help installing Tamkin ?')}}
            </h1>
            <p
              class="text-center text-[14px] mt-[8px] text-[#A7A7A7] dark:text-whiteTamkin/90"
              style="line-height: 21px"
            >
              {{ $t('Our support team is help !') }}
            </p>
          </div>
  
          <div
            class="lg:h-[60px] w-full bg-white dark:bg-tamkinDarkPrimary/20 flex p-[10px] rounded-[10px] items-center lg:flex-row flex-col justify-center lg:justify-between"
          >
            <div class="flex items-center rtl:space-x-reverse space-x-[-12px] flex-1">
              <img  src="/assets/imgs/icons/avatr1.svg"  class="w-10 h-10" />
              <img  src="/assets/imgs/icons/avatr1.svg"  class="w-10 h-10" />
              <img  src="/assets/imgs/icons/avatr1.svg"  class="w-10 h-10" />
              <img  src="/assets/imgs/icons/avatr1.svg"  class="w-10 h-10" />
            </div>
            <div class="">
              <a
                href=""
                class="text-tamkin leading-[10px] text-[12px] lg:leading-[21px] lg:text-[14px] lg:text-right text-center font-[500] underline"
                >{{$t('Schedule ameeting Withnour support team')}}</a
              >
            </div>
          </div>
        </div>
      </div>

</template>