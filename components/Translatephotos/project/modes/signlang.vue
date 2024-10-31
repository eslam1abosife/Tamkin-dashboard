<script lang="ts" setup>

import { useTranslateStore } from "~/stores/translate";
import USa from '/public/assets/imgs/translatevideo/USA.svg'
import {
  useTranslateDoc,
  useTranslateImages,
  useGetLangs,
  useTranslateAudio,
  useTranslateLive,
} from "@/composables/useInternal";
const translateStore = useTranslateStore()

const languagesArr = ref([])

const processVideo = ref(false)
const doneVideo = ref(false)

watch(processVideo,(ov,nv)=>{
   
setTimeout(()=>{
    doneVideo.value = true
},1500)
  
})
const signOGlang = ref()

const selectSignOgLang = (item: any) => {
  signOGlang.value = item.name

};
onMounted(async ()=>{
const languages = await getLanguages()
languagesArr.value = languages.Images.map((g)=>{
  return {
    id:g.name,
    title:g.title1,
    description:g.description
  }
})
})
</script>

<template>

    <div class="w-2/4 flex flex-col items-start justify-start  pr-[20px]  ">
        <!-- <div class="text-[12px] font-[600] text-darkGrey flex items-center space-x-[10px]" >
            <svg @click="translateStore.currentMode  = 'subtitles'" class="cursor-pointer" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.81795 3.5L5 6.22234L4.09103 7L0 3.5L4.09103 1.19209e-07L5 0.777655L1.81795 3.5Z" fill="#585B5B"/>
                </svg>
            <div>
                Translation 
            </div>
        </div> -->
        <div class="w-full" >
            <div class="text-[11px] leading-[22px] font-[500] text-darkGrey ">
                {{ $t('What sign language do you want to translate into? ') }}
            </div>
            <div class="border-[1px] border-lightGrey rounded-[10px] flex items-center justify-between w-[100%] h-[40px] px-4 mt-[16px]">
                    <div class="text-[13px] font-[500] text-darkGrey leading-[32px]">
                        Project 1
                    </div>
                    <div class="text-[13px] font-[500] text-darkGrey leading-[32px]">
                        4:55
                    </div>
            </div>
            <TranslateSelectInput class="mt-[16px]  " 
            @getCurrentSelectedItem="selectSignOgLang" :enableSearch="true" iconKey="icon"
            placeholderinput="Original language" :list="languagesArr" nameKey="name" idField="id" />
    
            <button class="btn-default hover_tamkin mt-[16px]" @click="processVideo = true">
                <span class="text">{{$t('Generate Sign Language')}}</span>
            </button>
        </div>

 
       </div>

</template>