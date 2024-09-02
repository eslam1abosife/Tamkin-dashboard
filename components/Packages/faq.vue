<script lang="ts" setup>

const packagesStore = usePackgesStore()
</script>

<template>

    <div class="w-full h-[427px] bg-white p-[30px] mx-auto mt-[32px] relative">
        <div class="absolute top-[180px] left-[100px]">
          <img src="/imgs/Astronaut.png" class="w-[167px] h-[174px] opacity-30" alt="" />
        </div>
        <div class="text-[#18191F] text-[20px] leading-[32px] text-left font-[600]">
          Frequently Asked Questions
        </div>
  
        <div class="flex items-center justify-center">
          <div class="flex items-start justify-center flex-col w-full rtl:-ml-14 ltr:-mr-14 mt-[50px]">
            <div

            v-for="faq in packagesStore.getFaqBasedOnType" :key="faq.name"
             @mouseover="()=>{

              packagesStore.currentFaq=faq.name
              packagesStore.selectedQuestion = faq
             }"
        @mouseleave="()=>{
          packagesStore.currentFaq=faq.name
          packagesStore.selectedQuestion = faq

        }"
        :class="[packagesStore.selectedQuestion.name === faq.name ? 'bg-[#E8F2FF]':'bg-white']"
              class="h-[45px] w-full  py-[15px] cursor-pointer rtl:space-x-reverse space-x-[9px] px-[10px] 
              flex items-center justify-start relative z-[50]"
              style="box-shadow: 0px 0px 0.62px 0.62px #00000026"
            >
              <div class="w-[15px] h-[15px] rounded-full"
               :class="[packagesStore.selectedQuestion.name === faq.name ? '!bg-[#5D5FEF]':'bg-[#A5A6F6]']"
              ></div>
              <div class="text-[12px] font-[400] leading-[14px] text-black">
                {{ faq.question }}
              </div>
              <div class="!ml-auto !mr-[7px]">
                <svg
                  width="8"
                  height="13"
                  class="rtl:rotate-180"
                  viewBox="0 0 8 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.46875 1.56641L6.44653 6.54418L1.46875 11.522"
                   :class="[packagesStore.selectedQuestion.name === faq.name ? '!stroke-[#5D5FEF]':'!stroke-[#A5A6F6]']"
                    stroke-width="1.24444"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
        
        
          </div>
          <div v-if="packagesStore.selectedQuestion.name === packagesStore.currentFaq"
            class="mt-[48px] relative z-[40] float-right h-[293px] w-full rounded-[10px] bg-[#FAFBFF]"
            style="box-shadow: 0px 0px 2.49px 0.62px #00000026"
          >
            <div
              class="px-14 text-center mt-[26px] text-[12px] font-[600] leading-[24px] text-black break-words w-full"
            >
             {{packagesStore.selectedQuestion.question}}
            </div>
  
            <div
              class="px-24 mt-[28px] text-center text-[11px] font-[400] leading-[24px] text-black"
            >
            {{packagesStore.selectedQuestion.answer}}

            </div>
          </div>
        </div>
      </div>

</template>