<script lang="ts" setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
</script>


<template>

    <div class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] h-full pb-[24px] w-full shadow-md -shadow-y-[1px]" >
        <div class="flex items-center justify-start ltr:ml-[15px] rtl:mr-[15px] pt-[24px]">
          <div>
            <h1 class="font-[500] leading-[30px] text-[18px] dark:text-whiteTamkin">
              {{ $t('Exclusive Investor Package') }}
            </h1>

            <p class="text-[14px] leading-[24px] font-[400] text-[#585B5B]  dark:text-whiteTamkin/90 pt-[6px] w-[90%]">
          {{$t('Investors participating in the Investor Program will receive an exclusive package with many additional benefits and special access to advanced tools and services')}}
            </p>
          </div>
        </div>
        <Splide ref="splide"  
        :options="{rewind: false,perPage: 3,  gap: 10,arrows:false ,direction:`${locale === 'ar' ? 'rtl' : 'ltr'}`      }">
            <SplideSlide   v-for="(pak, i) in 6 " >
<!-- Packages Component in /investoors/Packages .. call getPackages and filter on based on type-->

              <!-- <div
              class="flex items-center flex-col custom-border-tamkin 
               group hover:bg-selected dark:hover:bg-p
              padding-override-1 justify-start !rounded-t-[10px] mt-[35px] w-full"
              style="padding: 16px, 10px, 16px, 10px"
            >
              <div class="absolute top-[-30px] left-[15px]">
                <img 
                  src="/assets/imgs/overview/advanced_plan.svg"
                  class="w-[50px] h-[50px]"
                  
                />
              </div>
      
              <div
                class="flex items-center justify-center relative w-full px-[15px] mt-[48px]"
              >
                <div class="order-2 relative w-full">
                  <h1 class="font-[600] text-[18px] leading-[30px] dark:text-whiteTamkin">Advanced</h1>
                  <h2 class="font-[400] text-[10px] leading-[15px] text-[#536174] dark:text-whiteTamkin">
                    For Individuals and Small Teams
                  </h2>
      
                  <h3
                    class="mt-[10px] text-black font-[600] text-[24px] leading-[29px]  dark:text-whiteTamkin"
                  >
                    $ {{ pricingType === "annual" ? "4000" : "400" }}
                    <span class="!font-[500] !text-darkGrey !text-[18px] dark:!text-whiteTamkin"
                      >/{{ pricingType === "annual" ? "year" : "month" }}</span
                    >
                  </h3>
      
                  <p class="font-[500] text-[10px] leading-[32px] text-darkGrey dark:text-whiteTamkin">
                    <span class="!font-[700]">UP to 3M </span>Page views/mo
                  </p>
                </div>
              </div>
      
              <div
                class="flex flex-col items-start justify-center
                 group-hover:bg-selected dark:group-hover:bg-p dark:text-whiteTamkin
                w-full space-y-[10px] h-[305px] custom-border-collapse-tamkin rounded-t-none rounded-[10px] p-4"
              >
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                  <div>
                    <img  src="/assets/imgs/checked_list_active.svg"  />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                  <div>
                    <img  src="/assets/imgs/checked_list_active.svg"  />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                  <div>
                    <img  src="/assets/imgs/checked_list_active.svg"  />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                  <div>
                    <img  src="/assets/imgs/checked_list_inactive.svg"  />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                  <div>
                    <img  src="/assets/imgs/checked_list_active.svg"  />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                  <div>
                    <img  src="/assets/imgs/checked_list_active.svg"  />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-start rtl:space-x-reverse space-x-[24px]">
                  <div>
                    <img  src="/assets/imgs/checked_list_active.svg"  />
                  </div>
                  <div>
                    <h3 class="text-[14px] font-[400] leading-[20px]">
                      All analytics features
                    </h3>
                  </div>
                </div>
                <div class="flex items-center justify-center mx-auto w-full">
                  <button class="btn-dashboard rounded-full mt-[10px] hover_tamkin">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div> -->
              </SplideSlide>
              </Splide>
      
      </div>
</template>