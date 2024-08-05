<script lang="ts" setup>
const prpops = defineProps({
    plan:String
})
import { useModalManager } from '@/composables/useModalManager';

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
</script>

<template>

        <div class=" rounded-[13px] h-auto flex  justify-start space-x-[26px] w-full
         mt-[16px] ">


         <div class="bg-white  rounded-[10px] flex items-start justify-start px-[24px] pt-[35px] h-[182px]  w-full space-x-[16px]">
<div class="bg-[#F7F7F7]  w-[70px] h-[70px] flex items-center justify-center rounded-[31px]">
    <div>
        <img src="/assets/imgs/translatedocs/pdf.svg" alt="">
    </div>

</div>
<div class="flex flex-col items-start justify-center space-y-[9px] ">
    <div class="text-[15px] font-[600] text-[#3D3D3D] leading-[22px]">
        Translation Pdf Documents
    </div>
    <div class="text-[14px] font-[500] text-[#6D6D6D] leading-[21px] w-3/4">
        Upload  Pdf Documents and we’ll translate it
    </div>
    <button class="btn-action-translate" @click="()=>{plan === 'freetrial_Ex' || plan === 'pro_used' ? openModal('upgradeTranslatePackage', 'docs') : openModal('translate_pdf_documents', 'docs')}">Translate Now</button>


        </div>
         </div>
         <div class="bg-white  rounded-[10px] flex items-start justify-start px-[24px] pt-[35px] h-[182px] w-full space-x-[16px]">
            <div class="bg-[#F7F7F7]  w-[70px] h-[70px] flex items-center justify-center rounded-[31px]">
                <div>
                    <img src="/assets/imgs/translatedocs/doc.svg" alt="">
                </div>
            
            </div>
            <div class="flex flex-col items-start justify-center space-y-[9px] ">
                <div class="text-[15px] font-[600] text-[#3D3D3D] leading-[22px]">
                    Translation Docx Documents
                </div>
                <div class="text-[14px] font-[500] text-[#6D6D6D] leading-[21px] w-3/4">
                    Upload  Docx Documents and we’ll translate it
                </div>
                <button class="btn-action-translate" @click="()=>{plan === 'freetrial_Ex' || plan === 'pro_used' ? openModal('upgradeTranslatePackage', 'docs') : openModal('translate_word_documents', 'docs')}">Translate Now</button>
            
                    </div>
                     </div>
        </div>
  </template>
  