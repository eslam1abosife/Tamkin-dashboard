<script lang="ts" setup>

import { useTranslateStore } from "~/stores/translate";
import USa from '/public/assets/imgs/translatevideo/USA.svg'
import {useTranslateVideo,useGetSubTitleLangs,useTranslateAudio,useTranslateLive,useUpdateProject } from '@/composables/useInternal'
// import {} from '@/composables/useInternal'
const {t} = useI18n()
const {$toast} = useNuxtApp()
const {updateProject,cancelRequest,controller
    
} = useUpdateProject()

import {useGetProject} from '@/composables/useInternal'

const {getProject} = useGetProject()
const route = useRoute()
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


const {getsubtitlelangs} = useGetSubTitleLangs()

const translateStore = useTranslateStore()
const oglang = ref()
const languagesArr = ref([])
const handleSelectedItemProjectName = (item: any) => {
    oglang.value= item.id
}
const translateto = ref()
const handleselecttranslateto = (item: any) => {
    translateto.value = item.id
}
const processVideo = ref(false)
const doneVideo = ref(false)
// const translationMode = inject('currentMode')
watch(processVideo,(ov,nv)=>{
   

  
})


const updateLanguage = async () => {
    const keysToRemove = ["stats", "project_statistic"];

const updatedProject = Object.keys(translateStore.photoProject).reduce((acc, key) => {
  if (!keysToRemove.includes(key) || !Array.isArray(translateStore.photoProject[key])) {
    acc[key] = translateStore.photoProject[key];
  }
  return acc;
}, {});
    processVideo.value = true
await updateProject({...updatedProject, project_statistic: translateStore.photoProject.stats,   
      translate_original_language:oglang.value,
translate_to: translateto.value,used_translate:1})
$toast(t('Subtitles Translated Successfully'),{hideIn:3000})
await getProjectByName()
translateto.value = ''  
oglang.value = ''
processVideo.value = false
doneVideo.value = true

};

const changeMode = (m:any)=>{
translateStore.currentMode  = m
translateStore.subMode = ''
}

function convertToMinutesAndSeconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(':');
  const secondsOnly = seconds.split(',')[0]; 
  const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(secondsOnly);
  
  const formattedMinutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const formattedSeconds = (totalSeconds % 60).toString().padStart(2, '0');
  
  return `${formattedMinutes}:${formattedSeconds}`;
}
const cancelAction  = ()=>{
    processVideo.value = false
    doneVideo.value = false
    return cancelRequest()
}

onMounted(async ()=>{
    const languages = await getsubtitlelangs()
languagesArr.value = languages.map((l)=>{
  return {
    id: l.name,
    name: l.language_name,
  }
})
})
</script>

<template>

    <div  class="w-2/4 rtl:pl-[20px] ltr:pr-[20px] flex flex-col items-start justify-start scrollable-div
  ">
        <div class="text-[12px] font-[600] text-darkGrey flex items-center rtl:space-x-reverse space-x-[10px] mt-[6px]">
            <svg  @click="translateStore.currentMode = ''"  class="cursor-pointer rtl:rotate-180" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.81795 3.5L5 6.22234L4.09103 7L0 3.5L4.09103 1.19209e-07L5 0.777655L1.81795 3.5Z" fill="#585B5B"/>
                </svg>
            <div>
                {{ $t('Translation') }} 
            </div>
        </div>
        <div class="w-full " >
            <div class="text-[11px] leading-[22px] font-[500] text-darkGrey mt-[12px]">
               {{$t('What sign language do you want to translate into?')}}
            </div>
        
            <TranslateSelectInput class="mt-[16px]  " 
            @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="true" 
            :placeholderinput="$t('Original language')" :list="languagesArr" nameKey="name" idField="id" />
            <TranslateSelectInput class="mt-[16px]  " 
            @getCurrentSelectedItem="handleselecttranslateto" :enableSearch="true"
            :placeholderinput="$t('Translate to')" :list="languagesArr" nameKey="name" idField="id" />
            <button :disabled="processVideo || !translateto || !oglang" class="btn-default mt-[16px]" @click="updateLanguage">
                <span class="text">{{$t('Translate')}}</span>
            </button>
        </div>

    <transition name="slide-up">
        <Processingfooter :show-footer="processVideo && controller" :done="doneVideo" @close-footer="()=>{processVideo = false
        doneVideo = false}"  @cancel_action="cancelAction"/>
</transition>
       </div>

</template>