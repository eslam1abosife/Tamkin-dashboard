<script lang="ts" setup>

import { useTranslateStore } from "~/stores/translate";
import USa from '/public/assets/imgs/translatevideo/USA.svg'
const translateStore = useTranslateStore()

const languagesArr = [
    {
        id: 1,
        name: 'English (USA)',
        icon: USa
    },
    {
        id: 2,
        name: 'English (USA)',
        icon: USa

    },
    {
        id: 3,
        name: 'English (USA)',
        icon: USa

    },

]
const handleSelectedItemProjectName = (item: any) => {
    console.log(item)
}
const processVideo = ref(false)
const doneVideo = ref(false)

watch(processVideo,(ov,nv)=>{
   
setTimeout(()=>{
    doneVideo.value = true
},1500)
  
})
</script>

<template>

    <div class="w-2/4 flex flex-col items-start justify-start scrollable-div pr-[20px] h-[310px] ">
        <div class="text-[12px] font-[600] text-darkGrey flex items-center space-x-[10px] mt-[6px]" >
            <svg @click="translateStore.currentMode  = 'subtitles'" class="cursor-pointer" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.81795 3.5L5 6.22234L4.09103 7L0 3.5L4.09103 1.19209e-07L5 0.777655L1.81795 3.5Z" fill="#585B5B"/>
                </svg>
            <div>
                Translation 
            </div>
        </div>
        <div class="w-full" v-if="!processVideo">
            <div class="text-[11px] leading-[22px] font-[500] text-darkGrey mt-[12px]">
                What sign language do you want to translate into? 
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
            @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="true" iconKey="icon"
            placeholderinput="Original language" :list="languagesArr" nameKey="name" idField="id" />
    
            <button class="btn-default mt-[16px]" @click="processVideo = true">
                <span class="text">Generate Sign Language</span>
            </button>
        </div>

        <div class="flex flex-col items-center justify-center w-full space-y-[10px] mt-[32px]" v-if="processVideo && !doneVideo">
            <div>
                <img src="/assets/imgs/translatevideo/loading.svg" alt="">
            </div>
            <div class="text-[16px] font-[600] text-darkGrey leading-[24px]"> 

                Processing...
            </div>

            <div class="text-[12px] font-[500] text-[#878787] leading-[17px]"> 
                Please wait while we complete the process
            </div>
        </div>

        <div class="flex flex-col items-center justify-center w-full space-y-[10px] mt-[32px]" v-if="doneVideo">
         
            <div class="text-[16px] font-[600] text-darkGrey leading-[24px]"> 

                Done
            </div>

          
        </div>
       </div>

</template>