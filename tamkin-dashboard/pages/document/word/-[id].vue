<script lang="ts" setup>
import { useTranslateStore } from "~/stores/translate";
import {useGetProject} from '@/composables/useInternal'
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://cdn.tamkin.app/app.css' },
  ],
  script: [
    { src: 'https://cdn.tamkin.app/runtime.js', defer: true },
    { src: 'https://cdn.tamkin.app/app.js', defer: true },
  ],
});

const translateStore = useTranslateStore()
const {getProject} = useGetProject()
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
middleware:['auth','permissions'],
requiredPermission: "sign-language-documents",

});

const currentPlan = ref("freetrial");


function beforeEnterNotification(el) {
  el.style.transform = "translateX(100%)";
  el.style.opacity = "0";
}


const localePath = useLocalePath()
const route = useRoute()
const processingDone = ref(false)

const isLinkActive = (path) => {
  return localePath(route.path) === localePath(path);
};

const shouldShowFooter = computed(()=>{
 return (translateStore.wordTextEdit && isLinkActive('/document/word'));
    
    
})

const cancelButtonFooter = ()=>{
  translateStore.wordTextEdit = false
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
const getProjectByName = async ()=>{
  const projectName = route.params.id
  const d = await getProject(projectName)
  translateStore.pdfProject = {
    ...d.project,
    stats:d.project_statistic
  }
  translateStore.loadingProject = false
  
}
onBeforeMount(async ()=>{
  
   await getProjectByName()
})
provide('process',processingDone)
</script>

<template>
  <div class="w-full relative">
 

    <div class="mb-[16px]">
      <div class="flex items-center justify-between w-full">
        <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
      {{$t('Docx Documents')}}
      </h1>


      </div>
      <h2 @click="$router.push(localePath('/document'))"
        class="cursor-pointer ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      {{ $t('Documents Services') }}
      </h2>
    </div>

    <transition name="slide-up">
      <SaveTranslateFooter :showFooter="shouldShowFooter" @cancel_action="cancelButtonFooter"/>

    </transition>
    <transition name="slide-up">

    <Processingfooter :done="processingDone"  :showFooter="translateStore.showProcessingFooter" @cancel_action="cancelFooterproccess"/>
  </transition>

  <TranslatedocsProjectWordProjectsettings/>

  <TranslateTable type="Docx Document Service"/>

  </div>
</template>
