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

        <div class=" rounded-[13px] h-auto flex  justify-start rtl:space-x-reverse space-x-[26px] w-full
         mt-[16px] ">


         <div class="bg-white rounded-[10px] flex items-center justify-start p-[24px] h-[150px] w-full 
         rtl:space-x-reverse space-x-[16px]">
            <div class="bg-[#F7F7F7] w-[70px] h-[70px] flex items-center justify-center rounded-[31px] self-start">
              <img src="/assets/imgs/translatedocs/pdf.svg" class="w-[50px] h-[50px]" alt="PDF Icon">
            </div>
            <div class="flex flex-col items-start justify-center space-y-[4px]">
              <div class="text-[15px] font-[600] text-[#3D3D3D] leading-[22px]">
                {{ $t('Translation Pdf Documents') }}
              </div>
              <div class="text-[14px] font-[500] text-[#6D6D6D] leading-[21px] ">
                {{ $t('Upload Pdf Documents and we’ll translate it') }}
              </div>
              <button class="!mt-[16px] btn-action-translate w-5/6 ipad-max:w-full lg:w-[65%]" @click="()=>{plan === 'freetrial_Ex' || plan === 'pro_used' ? openModal('upgradeTranslatePackage', 'docs') : openModal('translate_pdf_documents', 'docs')}">{{$t('Translate Now')}}</button>
            </div>
          </div>
         <div class="bg-white  rounded-[10px] flex items-center justify-start px-[24px] p-[24px] h-[150px] w-full rtl:space-x-reverse space-x-[16px]">
            <div class="bg-[#F7F7F7]  w-[70px] h-[70px] flex items-center justify-center rounded-[31px] self-start">
                <div>
                    <img src="/assets/imgs/translatedocs/doc.svg" class="w-[50px] h-[50px]"  alt="">
                </div>
            
            </div>
            <div class="flex flex-col items-start justify-center space-y-[4px] ">
                <div class="text-[15px] font-[600] text-[#3D3D3D] leading-[22px]">
                    {{$t('Translation Docx Documents')}}
                </div>
                <div class="text-[14px] font-[500] text-[#6D6D6D] ">
                    {{$t('Upload Docx Documents and we’ll translate it')}}
                </div>
                <button class="!mt-[16px] btn-action-translate w-5/6 ipad-max:w-full lg:w-[65%]" @click="()=>{plan === 'freetrial_Ex' || plan === 'pro_used' ? openModal('upgradeTranslatePackage', 'docs') : openModal('translate_word_documents', 'docs')}">{{$t('Translate Now')}}</button>
            
                    </div>
                     </div>
        </div>
  </template>
  