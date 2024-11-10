<script lang="ts" setup>
import {useTranslateVideo,useGetLangs,useTranslateAudio,useTranslateLive,useUpdateProject } from '@/composables/useInternal'

const translateStore = useTranslateStore()



const {t} = useI18n()
const {$toast} = useNuxtApp()
const {updateProject,cancelRequest,controller
    ,messageError,
    codstatus
} = useUpdateProject()

const updateLanguage = async () => {
    const keysToRemove = ["stats", "project_statistic",'translate_original_language','translate_to'];

const updatedProject = Object.keys(translateStore.pdfProject).reduce((acc, key) => {
  if (!keysToRemove.includes(key) || !Array.isArray(translateStore.pdfProject[key])) {
    acc[key] = translateStore.pdfProject[key];
  }
  return acc;
}, {});
    processVideo.value = true
    translateStore.processingrq = true
//     used_sign_language
// sign_original_language
const res = await updateProject({...updatedProject,   
    used_sign_language:1,
    sign_original_language:translateTo.value,used_translate:0,
    translate_original_language :undefined,
    translate_to:undefined,})
if(codstatus.value === 200){
    $toast(t('Translated Successfully'),{hideIn:3000})
translateto.value = ''  
processVideo.value = false
doneVideo.value = true
translateStore.processingrq = false
}else {
    $toast(t(messageError.value),{hideIn:3000,type:'error'})

}

};
const languagesArr =ref([])

const handleSelectedItemProjectName = (item: any) => {
    translateTo.value = item.id
}
const translateTo = ref()

const processVideo = ref(false)
const doneVideo = ref(false)


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

    <div class="w-full  flex flex-col items-start justify-start  ">
        <div class="text-[12px] font-[600] text-darkGrey flex items-center rtl:space-x-reverse space-x-[10px]" >
            <svg  @click="translateStore.currentMode = ''" class="cursor-pointer rtl:rotate-180" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.81795 3.5L5 6.22234L4.09103 7L0 3.5L4.09103 1.19209e-07L5 0.777655L1.81795 3.5Z" fill="#585B5B"/>
                </svg>
            <div>
                {{ $t('Translation') }} 
            </div>
        </div>
        <div class="w-full h-[315px] px-[1px]" >

            <div class="text-[11px] leading-[22px] font-[500] text-darkGrey mt-[12px]">

                {{ $t('What sign language do you want to translate into?') }} 
            </div>
            <div class="border-[1px] border-lightGrey rounded-[10px] flex items-center justify-between w-[100%] h-[40px] px-4 mt-[16px]">
                    <div class="text-[13px] font-[500] text-darkGrey leading-[32px]">
                        {{translateStore.pdfProject.project_name}}

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