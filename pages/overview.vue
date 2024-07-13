<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";

import { useWindowSize } from "@vueuse/core";
import { useCollapseStore } from "@/stores/collapse.js";
import { useOverviewStore } from "@/stores/overview";

const collapseStore = useCollapseStore();
const modalStore = useModalStore();
const overviewStore = useOverviewStore()

import "chartjs-adapter-date-fns"; // Import the date adapter
const showExpired = ref(false)



definePageMeta({
  layout: "dashboard",
});






</script>

<template>
  <div class="relative ">
    <div class="">
      <HeaderAccess 
      websiteImgName="tamkin_hand.svg"
      website-title="Tamkin.App"
      website-link="google.com"
      section-title="Overview" 
      section-sub-title=" Overview provides system summary with key data and analytics for decision-making"/>
     

   


      <LazyOverviewWidgetEmbdedCode   v-if="!overviewStore.showUpgradeState"/>
      <LazyOverviewConnectWithUs   v-if="!overviewStore.showUpgradeState"/>
      <LazyOverviewCurrentPlan :plan-type="'free'" :is-installed="false"  v-if="!overviewStore.showUpgradeState"/>
      <LazyOverviewCurrentPlan :plan-type="'pro'" :is-installed="true"  v-if="overviewStore.showUpgradeState"/>
      <LazyOverviewTamkinTokenBanner v-if="!overviewStore.showUpgradeState"/>
  
    <LazyOverviewExclusiveInvestorPackage v-if="!overviewStore.showUpgradeState"/>
 

   <OverviewAccessibilityDetails v-if="overviewStore.showUpgradeState"/>

    <OverviewLiveTranslation  v-if="overviewStore.showUpgradeState"/>
  
        <div
          v-if="overviewStore.showUpgradeState"
          class="bg-gradient-to-r custom-border rounded-big4x from-[#E5D5FA]/60 to-[#F8D3E0]/60 p-8 rounded-[43px] mt-[32px] w-full"
        >
          <h1 class="text-[20px] leading-[33px] font-[600] text-[#1E1E1E] mb-6 mt-[16px]">
            Buy Tamkin Token – TSLT and Join in our Investor Program
          </h1>
          <div class="relative mb-6 w-full">
            <div class="absolute right-0 top-10">
              <img src="/assets/imgs/overview/10p.svg" alt="" />
            </div>
            <div class="absolute top-[-80px] transform translate-x-[50%] z-[1]">
              <img src="/assets/imgs/overview/svg_opacity.svg" alt="" />
            </div>
            <!-- Timeline bar -->
            <div
              class="absolute left-4 top-[6px] h-full 2xl:h-[230px] w-[9px] z-[20] bg-tamkin rounded-full"
            ></div>
            <!-- Icons and Text -->
            <div class="flex items-start relative z-[50]">
              <!-- Icons -->
              <div class="relative flex items-center justify-center ">
                <div class="absolute left-[5px] top-10 w-[27px] h-[27px]">
                  <img src="/assets/imgs/icons/investor.svg" alt="Icon 1" class="w-[27px] h-[27px]" />
                </div>
                <div class="absolute left-[5px] top-40 w-[27px] max-h-[27px]">
                  <img src="/assets/imgs/icons/investor.svg" alt="Icon 2" class="w-[27px] h-[27px]" />
                </div>
              </div>
              <!-- Text content -->
              <div class="flex flex-col space-y-[16px] ml-14 w-2/4 mt-[16px]">
                <div>
                  <h2 class="text-[14px] leading-[21px] font-[500] mb-2">
                    Win Investor Package
                  </h2>
                  <p class="text-[#585B5B] text-[13px] leading-[24px] font-[500]">
                    Investors participating in the Investor Program will receive an exclusive package with many additional benefits and special access to advanced tools and services.
                  </p>
                </div>
                <div>
                  <h2 class="text-[14px] leading-[21px] font-[500] mb-2">
                    Monthly profits
                  </h2>
                  <p class="text-[#585B5B] text-[13px] leading-[24px] font-[500]">
                    This program includes 10% of Tamkin profits, distributed monthly in USDT to investors who participate in and maintain the program on their tokens without selling.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <!-- Big number and buttons -->
          <div class="flex items-center justify-end w-full relative z-[50]">
            <div class="flex space-x-4">
              <button class="btn-dashboard rounded-full h-[40px] w-[156px]">Buy Tamkin</button>
              <button class="btn_bordered_dashboard rounded-full bg-white w-[156px] h-[40px] !p-[4px] text-[15px] leading-[22.5px]">Investor Program</button>
              <button class="btn_bordered_dashboard rounded-full bg-white w-[156px] h-[40px] !p-[4px] text-[15px] leading-[22.5px]">Investor Package</button>
            </div>
          </div>
        </div>
      

           <div v-if="overviewStore.showUpgradeState"
        class="bg-white custom-border-tamkin padding-override-1 w-full rtl:space-x-reverse space-x-[16px] 
        rounded-[10px] h-[119px] mt-[32px] px-[15px] flex items-center justify-start mb-[32px]"
     
      >
        <div>
          <img src="/assets/imgs/overview/plan-calender.svg" alt="" />
        </div>
        <div class="flex flex-col items-start justify-center w-full">
          <div class="font-[500] text-[18px] leading-[27px] text-darkGrey">
            <h1>Monthly Plan</h1>
          </div>
          <div class="flex items-center justify-start w-full rtl:space-x-reverse space-x-[6px] cursor-pointer h-[30px]" @click="showExpired = !showExpired">
            <transition name="fade" mode="out-in">
              <template v-if="!showExpired">
                <div class="flex items-center" key="not-expired">
                  <div class="text-[13px] leading-[24px] font-[400] w-[130px]">Package Expires in</div>
                  <div class="flex items-center justify-center custom-border-tamkin padding-override-1 
                  h-[23px] p-[12px] text-[13px] leading-[24px] font-[500] w-[130px]">
                    Aug 20,2024
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="flex items-center" key="expired">
                  <div class="text-[13px] leading-[24px] font-[400] text-[#EA4335] w-[130px]">Expired</div>
                  <div class="flex items-center justify-center border-[1px] rounded-[10px] text-[#EA4335] border-[#EA4335] 
                  h-[23px] p-[12px] text-[13px] leading-[24px] font-[500] w-[130px]">
                    Aug 10,2024
                  </div>
                </div>
              </template>
            </transition>
          </div>

     
        </div>
        

        <div class="relative">
          <div
            class="flex items-center justify-center absolute top-[-10px] transform left-[30%] h-[19px] bg-[#B36B8A] text-white w-[69px] text-[12px] leading-[18px] font-[500] rounded-[10px]"
          >
            SAVE 12%
          </div>
          <button class="btn_bordered_dashboard rounded-full w-[178px]"  @click="modalStore.controlShowUpgradeModal">
            Switch To Annual
          </button>
        </div>
      </div>

   
    </div>
  </div>
</template>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(60px);
}
.div-slider {
}
.slide-fade-leave-active {
  display: none;
}
.crossed-out {
  position: relative;
  display: inline-block;
}
.crossed-out::before {
  content: "";
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  border-top: 2px solid red;
  transform: rotate(-12deg);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
