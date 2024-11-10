<script lang="ts" setup>
import Processingfooter from "~/components/Processingfooter.vue";
import {useGetProject} from '@/composables/useInternal'
const translateStore = useTranslateStore()
const {getProject} = useGetProject()
const getProjectByName = async ()=>{
  const projectName = route.params.id
  const d = await getProject(projectName)
  translateStore.pdfProject = {
    ...d.project,
    stats:d.project_statistic
  }
  if(translateStore.pdfProject){
    if(translateStore.pdfProject.value[0].text){
      
translateStore.texttofill = translateStore.pdfProject.value[0].text
    }
   }
  translateStore.loadingProject = false
  
}
onBeforeMount(async ()=>{
   await getProjectByName()

  
})
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
const changePlan = (plan: string) => {
  currentPlan.value = plan;
};





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
      {{ $t('PDF Documents') }}
      </h1>

  
      </div>
      <h2 @click="$router.push(localePath('/document'))"
        class="cursor-pointer ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      {{$t('Documents Services')}}
      </h2>
    </div>


    <transition name="slide-up">
      <SaveTranslateFooter :showFooter="shouldShowFooter" @cancel_action="cancelButtonFooter"/>

    </transition>

    <transition name="slide-up">
      <Processingfooter :done="processingDone"  @close-footer="cancelFooterproccess" :showFooter="translateStore.showProcessingFooter" @cancel_action="cancelFooterproccess"/>

    </transition>
  <TranslatedocsProjectPdfProjectsettings/>

    <TranslateTable type="PDF Document Services"/>


  </div>
</template>
