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


</script>

<template>

    <div class="w-2/4 flex flex-col items-start justify-start  ">
 
        <div class="w-full" v-if="!processVideo">
            <div class="text-[12px] font-[600] text-darkGrey flex items-center space-x-[10px]" >
                <svg @click="translateStore.currentMode  = ''" class="cursor-pointer" width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.81795 3.5L5 6.22234L4.09103 7L0 3.5L4.09103 1.19209e-07L5 0.777655L1.81795 3.5Z" fill="#585B5B"/>
                    </svg>
                <div>
                    Translation 
                </div>
            </div>
            <div class="w-full h-[315px]  px-[1px]" >

            <div class="text-[11px] leading-[22px] font-[500] text-darkGrey ">
                What language do you want to translate into? 
            </div>
            <div class="border-[1px] border-lightGrey rounded-[10px] flex items-center justify-between w-[100%] h-[40px] px-4 mt-[16px]">
                    <div class="text-[13px] font-[500] text-darkGrey leading-[32px]">
                        Project 1
                    </div>
             
            </div>
            <TranslateSelectInput class="mt-[16px]  " 
            @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="true" iconKey="icon"
            placeholderinput="Original language" :list="languagesArr" nameKey="name" idField="id" />
    
            <button class="btn-default mt-[16px]" :disabled="translateStore.showProcessingFooter" @click="translateStore.showProcessingFooter = true">
                <span class="text">Translate automatically</span>
            </button>
        </div>
    </div>

      

       </div>

</template>