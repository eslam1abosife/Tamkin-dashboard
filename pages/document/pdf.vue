<script lang="ts" setup>
import Processingfooter from "~/components/Processingfooter.vue";
import { useTranslateStore } from "~/stores/translate";

const translateStore = useTranslateStore()
const {showProcessingFooter} = storeToRefs(translateStore)

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
definePageMeta({
  layout: "dashboard",
});

const currentPlan = ref("freetrial");
const changePlan = (plan: string) => {
  currentPlan.value = plan;
};


function beforeEnterNotification(el) {
  el.style.transform = "translateX(100%)";
  el.style.opacity = "0";
}

function enterNotification(el, done) {
  // Set the initial position and opacity
  el.style.transform = "translateX(50px)";
  el.style.opacity = "0";

  // Trigger reflow to ensure the initial styles are applied
  el.offsetHeight;

  // Start the transition
  setTimeout(() => {
    el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    el.style.transform = "translateX(0)";
    el.style.opacity = "1";
    done();
  }, 0);
}

function leaveNotification(el, done) {
  el.style.transition = "transform 0.5s ease, opacity 0.5s ease";
  el.style.transform = "translateX(50px)";
  el.style.opacity = "0";
  setTimeout(() => {
    done();
  }, 500);
}

const localePath = useLocalePath()
const route = useRoute()
const processingDone =ref(false)
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};

const shouldShowFooter = computed(()=>{
 return (translateStore.pdfTextEdit && isLinkActive('/document/pdf'));
    
    
})

const cancelButtonFooter = ()=>{
  translateStore.pdfTextEdit = false
}

const cancelFooterproccess = ()=>{
  translateStore.showProcessingFooter = false
  processingDone.value = false
}


watch(showProcessingFooter,(ov,nv)=>{
  if(showProcessingFooter.value === true){
setTimeout(()=>{

  processingDone.value = true
},2000)
  }
})
</script>

<template>
  <div class="w-full h-full relative">
 

    <div class="mb-[16px]">
      <div class="flex items-center justify-between w-full">
        <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
      PDF Documents 
      </h1>

      <div  style="box-shadow: 0px 4px 4px 0px #0000000F;
" class="bg-[#F7F7F7] h-[41px]  flex space-x-[8px]  items-center justify-start rounded-[5px] -shadow-y-1 px-[24px]">
        <div>
          <img src="/assets/imgs/icons/tamkin_small.svg" alt="">
        </div>
        <div class="text-[12px] font-[500] text-darkGrey">
          Tamkin.App
        </div>
      </div>
      </div>
      <h2 @click="$router.push('/document')"
        class="cursor-pointer ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      Documents Services
      </h2>
    </div>


    <transition name="slide-up">
      <SaveTranslateFooter :showFooter="shouldShowFooter" @cancel_action="cancelButtonFooter"/>

    </transition>

    <transition name="slide-up">
      <Processingfooter :done="processingDone" :showFooter="showProcessingFooter" @cancel_action="cancelFooterproccess"/>

    </transition>
  <TranslatedocsProjectPdfProjectsettings/>

  <div class="bg-white dark:bg-tamkinDarkPrimary h-auto p-[15px] mt-[24px] rounded-[10px] w-full mb-[16px]">
    <div class="text-[15px] font-[500] text-darkGrey py-[16px]">
        All Pdf  Documents 
    </div>
  <TranslatedocsPdfs/>

  <button class="btn-dashboard hover_tamkin w-[158px] mx-auto mt-[28px]">Load more</button>
</div>
  </div>
</template>
