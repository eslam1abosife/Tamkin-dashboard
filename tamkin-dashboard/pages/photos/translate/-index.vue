<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useTranslateStore } from "~/stores/translate";

const translateStore = useTranslateStore()
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
middleware:['auth','permissions'],

});
const router = useRouter()
const currentPlan = ref("freetrial");




const localePath = useLocalePath()
const route = useRoute()
const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};

const shouldShowFooter = computed(()=>{
 return (translateStore.wordTextEdit && isLinkActive('/document/word'));
    
    
})
const {showProcessingFooter} = storeToRefs(translateStore)

const processingDone =ref(false)



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
      {{ $t('Translate  Images') }}
      </h1>


      </div>
      <h2 @click="$router.push(localePath('/photos'))"
        class="cursor-pointer ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      {{ $t('Photo Services') }}
      </h2>
    </div>

    <transition name="slide-up">
      <SaveTranslateFooter :showFooter="shouldShowFooter" @cancel_action="cancelButtonFooter"/>

    </transition>
    <transition name="slide-up">
      <Processingfooter :done="processingDone" :showFooter="showProcessingFooter" @cancel_action="cancelFooterproccess"/>

    </transition>
  <TranslatephotosProjectProjectsettings/>

  <div class="bg-white dark:bg-tamkinDarkPrimary h-auto p-[15px] mt-[24px] rounded-[10px] w-full mb-[16px]">
    <div class="text-[15px] font-[500] text-darkGrey py-[16px]">
        {{ $t('All Photos') }} 
    </div>
  <TranslatedocsPdfs/>

  <button class="btn-dashboard hover_tamkin w-[158px] mx-auto mt-[28px]">{{$t('Load more')}}</button>
</div>
  </div>
</template>
