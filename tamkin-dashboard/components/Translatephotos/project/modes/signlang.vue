<script lang="ts" setup>
import {useTranslateVideo,useGetLangs,useTranslateAudio,useTranslateLive,useUpdateProject } from '@/composables/useInternal'

const translateStore = useTranslateStore()
import {useGetProject} from '@/composables/useInternal'

const {getProject} = useGetProject()
const getProjectByName = async ()=>{
  const projectName = route.params.id
  const d = await getProject(projectName)
  translateStore.photoProject = {
    ...d.project,
    stats:d.project_statistic
  }
  if(translateStore.photoProject){
    if(translateStore.photoProject.value[0].text){
      
translateStore.texttofill = translateStore.photoProject.value[0].text
    }
   }
  translateStore.loadingProject = false
  
}



const {t} = useI18n()
const {$toast} = useNuxtApp()
const {updateProject,cancelRequest,controller
    
} = useUpdateProject()

const updateLanguage = async () => {
    const keysToRemove = ["stats", "project_statistic"];

const updatedProject = Object.keys(translateStore.photoProject).reduce((acc, key) => {
  if (!keysToRemove.includes(key) || !Array.isArray(translateStore.photoProject[key])) {
    acc[key] = translateStore.photoProject[key];
  }
  return acc;
}, {});
    processVideo.value = true
    translateStore.processingrq = true
//     used_sign_language
// sign_original_language
const res = await updateProject({...updatedProject, project_statistic: translateStore.photoProject.stats,   
    used_sign_language:1,
    sign_original_language:translateTo.value,})
if(res){
    $toast(t('Subtitles Translated Successfully'),{hideIn:3000})
   await getProjectByName()

translateto.value = ''  
processVideo.value = false
doneVideo.value = true
translateStore.processingrq = false
}else {
    $toast(t('Something Went wrong , please try again '),{hideIn:3000,type:'error'})
    translateto.value = ''  
processVideo.value = false
doneVideo.value = false
translateStore.processingrq = false
}

};
const languagesArr =ref([])

const handleSelectedItemProjectName = (item: any) => {
    translateTo.value = item.id
}
const translateTo = ref()

const processVideo = ref(false)
const doneVideo = ref(false)



const cancelAction  = ()=>{
    processVideo.value = false
    doneVideo.value = false
    translateStore.processingrq = false

    return cancelRequest()
}
const { getLanguages} = useGetLangs()
onMounted(async ()=>{
    const languages = await getLanguages()
languagesArr.value = languages.media.map((l)=>{
  return {
    id: l.code,
    name: l.title1,
  }
})
})
</script>

<template>

    <div class="w-2/4 flex flex-col items-start justify-start scrollable-div rtl:pl-[20px] ltr:pr-[20px]  ">
        <div class="text-[12px] font-[600] text-darkGrey flex items-center rtl:space-x-reverse space-x-[10px] mt-[6px]" >
            <svg  @click="translateStore.currentMode = ''" class="cursor-pointer rtl:rotate-180" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.81795 3.5L5 6.22234L4.09103 7L0 3.5L4.09103 1.19209e-07L5 0.777655L1.81795 3.5Z" fill="#585B5B"/>
                </svg>
            <div>
                {{ $t('Translation') }} 
            </div>
        </div>
        <div class="w-full" >
            <div class="text-[11px] leading-[22px] font-[500] text-darkGrey mt-[12px]">
                {{ $t('What sign language do you want to translate into?') }} 
            </div>
            <div class="border-[1px] border-lightGrey rounded-[10px] flex items-center justify-between w-[100%] h-[40px] px-4 mt-[16px]">
                    <div class="text-[13px] font-[500] text-darkGrey leading-[32px]">
                        {{translateStore.photoProject.project_name}}

                    </div>
                
            </div>
            <TranslateSelectInput class="mt-[16px]  " 
            @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="true" 
            :placeholderinput="$t('Original language')" :list="languagesArr" nameKey="name" idField="id" />
    
            <button class="btn-default mt-[16px]"  :disabled="processVideo || !translateTo " @click="updateLanguage">
                <span class="text">{{$t('Generate Sign Language')}}</span>
            </button>
        </div>

 

        <transition name="slide-up">
            <Processingfooter :show-footer="processVideo && controller" :done="doneVideo"
             @close-footer="()=>{processVideo = false
            doneVideo = false}"  @cancel_action="cancelAction"/>
    </transition>

       </div>

</template>