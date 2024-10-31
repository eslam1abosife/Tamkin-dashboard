<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useTranslateStore } from "~/stores/translate";
import {useGetProject} from '@/composables/useInternal'
const translateStore = useTranslateStore()
const {getProject} = useGetProject()
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

const getProjectByName = async ()=>{
  const projectName = route.params.id
  const d = await getProject(projectName)
  translateStore.photoProject = {
    ...d.project,
    stats:d.project_statistic
  }
  translateStore.loadingProject = false
  
}
onBeforeMount(async ()=>{
   await getProjectByName()
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

<TranslateTable type="Photo Services"/>
  </div>
</template>
