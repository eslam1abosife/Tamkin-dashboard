<script lang="ts" setup>
import { useGetJoinPage } from '~/composables/usePackages';
const { locale,t } = useI18n();

useHead({
  title: t("How to join - Tamkin Dashboard"),
})
const localePath = useLocalePath()
const { getjoinPageData } = useGetJoinPage();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData,
} = useModalManager();
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth', 'permissions'],
});

const { data, error, refresh } = await useAsyncData('joinPageData', async () => {
  return await getjoinPageData();
});

const loading = ref(true);
const hasError = ref(false);

onMounted(() => {
  loading.value = false;
  hasError.value = !!error.value;
  
});
const currentFaq = ref()

const extractAndTranslate = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const paragraphs = Array.from(doc.querySelectorAll("p"));
  return paragraphs.map((p) => t(p.textContent.trim())); 
};

// const translatedList = ref();
</script>

<template>
  <div class="relative">
    <PackagesPaymentModalsJoinInvestorStep1/>
    <div class="relative h-full w-full">
      <div
        class="custom-shape-divider-bottom-1725380645 transform rtl:skew-y-[4deg] ltr:skew-y-[-4deg]  rotate-[180deg]"
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>

      <div class="absolute top-[90%]">
        <img src="/imgs/pattern.png" class="w-[70px] h-[120px]" alt="" />
      </div>

      <div
        class="relative z-[50] overflow-hidden top-[-60px] h-[350px]
         bg-gradient-to-t from-[#340E75] to-[#54ECE3] rtl:skew-y-[4deg] ltr:skew-y-[-4deg]"
      >
        <div class="absolute left-[46px] top-[36px]">
          <img
            src="/imgs/investor_coins.png"
            class="opacity-70 w-[133px] h-[165px]"
            alt=""
          />
        </div>
        <div class="absolute right-[-20px] bottom-[40px]">
          <img
            src="/imgs/investor_coins.png"
            class="opacity-70 w-[42px] h-[49px]"
            alt=""
          />
        </div>
        <div class="absolute top-[0] left-[35%]">
          <img src="/imgs/hero_how_to.png" class="w-[347px] h-[347px]" alt="" />
        </div>

        <div class="h-[365px] w-full grid grid-cols-2 mt-[30px]">
          <div
            class="flex items-start justify-center flex-col h-full ipad-max:ml-[40px] px-[20px] 
            ipad-max:px-[20px] lg:px-[40px] rtl:skew-y-[-4deg] ltr:skew-y-[4deg]"
          >
            <div class="text-[32px] font-[700] leading-[32px] text-white w-[306px]">
              {{$t(data.page_cards_items[0].title)}}
            </div>
            <div
              class="text-[16px] font-[400] leading-[24px] text-[#D1D8EE] w-3/4 mt-[10px]"
            >
              {{$t(data.page_cards_items[0].sub_title)}}
            </div>
            <div
              class="flex items-center justify-start mt-[26px] rtl:space-x-reverse space-x-[32px] relative z-[50]"
            >
              <nuxt-link
            :to="data.page_cards_items[0].link_1"
            target="_blank"
                class="btn-dashboard hover_tamkin !rounded-[19px] !px-[40px] !whitespace-nowrap"
              >
            {{$t(data.page_cards_items[0].link_1_title)}}
          </nuxt-link>
              <button @click="openModal('join_to_investor','how-to-join',{})"
                class="btn-dashboard hover_tamkin !rounded-[19px] !whitespace-nowrap"
              >
               {{ $t('Join To Investor') }}
              </button>
              <button @click="$router.push({path:localePath('/packages/investors')})"
                class="btn_bordered_dashboard hover_tamkin !rounded-[19px] w-full !whitespace-nowrap"
              >
                {{ $t('Back to package') }}
              </button>
            </div>
          </div>
          <div class="rtl:skew-y-[-4deg] ltr:skew-y-[4deg] mt-[100px] 2xl:rtl:mr-[160px] 2xl:ml-[160px] 4xl:rtl:mr-[200px] 4xl:ml-[400px] lg:ml-[100px]">
            <img src="/imgs/investor_man.png" class="w-[266px] h-[253px]" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="min-h-[800px] top-[0%] w-full bg-[#E1E8FE] absolute z-[5]">
      <div class="custom-shape-divider-top-1725435211">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            class="shape-fill"
          ></path>
        </svg>
      </div>
    </div>
    <div class="relative">
      
      <div class="px-[20px] ipad-max:px-[20px] lg:px-[40px] relative   z-[50]">
        <div class="flex items-center justify-between w-full mt-[-1%]">
          <div class="mt-[-4%]">
            <img :src="`https://tamkin.app/${data.page_cards_items[1].image}`" class="w-[180px] h-[168px]" alt="" />
          </div>

          <div
            class="h-[130px] rtl:bg-gradient-to-l ltr:bg-gradient-to-r rounded-[10px] px-[24px] 
             from-white to-white/[10%] w-3/4 flex flex-col items-start justify-center"
          >
            <div class="text-[14px] font-[600] leading-[24px] mb-[6px]">
             {{$t(data.page_cards_items[1].title)}}
            </div>

            <ul
              class="list-disc px-[20px] text-[14px] font-[400] space-y-[6px] leading-[24px]"
            >
           
            <li class="custom-list-styles" v-for="(item, index) in extractAndTranslate(data.page_cards_items[1].description) " :key="index">
              {{ item }}
            </li>
            
          </ul>
          </div>
        </div>

        <div class="flex items-center justify-between w-full mt-[24px] flex-row-reverse">
          <div>
            <img :src="`https://tamkin.app/${data.page_cards_items[2].image}`" class="w-[180px] h-[168px]" alt="" />
          </div>

          <div
            class="h-[130px] rtl:bg-gradient-to-l ltr:bg-gradient-to-r w-3/4 rounded-[10px] px-[24px] 
             from-white to-white/[10%] flex flex-col items-start justify-center"
          >
            <div class="text-[14px] font-[600] leading-[24px] mb-[6px]">
              {{$t(data.page_cards_items[2].title)}}

            </div>

            <ul
              class="list-disc px-[20px] text-[14px] font-[400] space-y-[6px] leading-[24px]"
            >
            <li class="custom-list-styles" v-for="(item, index) in extractAndTranslate(data.page_cards_items[2].description) " :key="index">
              {{ item }}
            </li>

            </ul>
          </div>
        </div>

        <div class="flex items-center justify-between w-full mt-[24px]">
          <div class="mt-[-3%]">
            <img :src="`https://tamkin.app/${data.page_cards_items[3].image}`" class="w-[122px] h-[109px]" alt="" />
          </div>

          <div
            class="h-[130px] rtl:bg-gradient-to-l ltr:bg-gradient-to-r w-3/4 rounded-[10px] px-[24px] 
             from-white to-white/[10%] flex flex-col items-start justify-center"
          >
            <div class="text-[14px] font-[600] leading-[24px] mb-[6px]">
              {{$t(data.page_cards_items[3].title)}}
            </div>

            <ul
              class="list-disc px-[20px] text-[14px] font-[400] space-y-[6px] leading-[24px]"
            >
            <li class="custom-list-styles" v-for="(item, index) in extractAndTranslate(data.page_cards_items[3].description) " :key="index">
              {{ item }}
            </li>

            </ul>
          </div>
        </div>

        <div class="bg-white rounded-[10px] min-h-[450px] w-full my-[64px] px-[30px] py-[30px]">
          <div class="text-[18px] font-[600] leading-[16px] ">
            {{ $t('Frequently Asked Questions') }}
          </div>

          <div class="flex items-center justify-between w-full mt-[42px] relative">
            <div class="flex items-start  flex-col justify-start space-y-[14px] w-3/4">
              <div v-for="question in data.tamkin_faq" :key="question.name"
                class="flex items-start justify-start flex-col space-y-[20px] w-full"
              >
                <div 
                @click="()=>{
                  currentFaq = currentFaq === question.name ? '' : question.name;
                }"
                  class="h-[57px] w-full relative rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#DEE6FF] hover:from-[#D1F7F4] cursor-pointer to-white flex items-center justift-start"
                >
                  <div
                    class="text-[16px] font-[500] leading-[16px] text-black/[80%] px-[30px]"
                  >
                    {{$t(question.question)}}
                  </div>
                
                </div>
              
                <transition name="slide-fade" mode="out-in">
                  <div
                    v-show="currentFaq === question.name"
                    class="rounded-[10px] p-[20px] bg-[#FAFBFF] w-full h-auto mt-[10px]"
                  >
                    {{ $t(question.answer) }}
                  </div>
                </transition>
              </div>
             
            </div>
            <div class="absolute top-[-48px] rtl:left-[14px] ltr:right-[14px]">
              <img
                src="/imgs/faq_how.png"
                class="w-[143px] h-[143px] "
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.custom-shape-divider-bottom-1725380645 {
  position: absolute;
  bottom: 5%;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  z-index: 20;
}

.custom-shape-divider-bottom-1725380645 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 69px;
}

.custom-shape-divider-bottom-1725380645 .shape-fill {
  fill: #ffffff;
  @apply opacity-50;
}
.custom-shape-divider-top-1725435211 {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-top-1725435211 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 73px;
}

.custom-shape-divider-top-1725435211 .shape-fill {
  fill: #e1e8fe;
}
.read-mode p {
  @apply list-item; 
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
