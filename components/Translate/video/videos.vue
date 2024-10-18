<script lang="ts" setup>
import { vOnClickOutside } from '@vueuse/components'
import {useDeleteProject} from '@/composables/useInternal'
const{t} = useI18n()
const translateStore = useTranslateStore()
const {deleteProject} = useDeleteProject()
const props = defineProps({
    videos:Array
})
import { useModalManager } from '@/composables/useModalManager';
const currentIdToDelete = ref('')
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const currentMenuDrop = ref()
const {$toast} = useNuxtApp()
const deleteProjectModal =async ()=>{
   await  deleteProject(currentIdToDelete.value)
   closeModal('deleteProject')
   const indexToDelete = translateStore.projectsAr.findIndex(p => p.name === currentIdToDelete.value);
if (indexToDelete !== -1) {
  translateStore.projectsAr.splice(indexToDelete, 1);
  currentIdToDelete.value = ''

}
$toast(t('Deleted Successfully'),{hideIn:3000})

}
const changeDropMenu = (menu:any)=>{
    if(currentMenuDrop.value && currentMenuDrop.value === menu){
        currentMenuDrop.value = ''

    }else {
        currentMenuDrop.value = menu

    }
}

const openAndRenameModal = (video:any)=>{
    translateStore.renameItem = {
        name:video.name,
        value:video.project_name
     
    }
    openModal('renamemodal','translate')
}

const openDeleteModal = (prj)=>{  
    currentIdToDelete.value = prj

    openModal('deleteProject','translate')
}
const runtimec = useRuntimeConfig()
const emit = defineEmits(['changeD'])
const triggerData = ()=>{
    emit('changeD')
    currentMenuDrop.value = ''
}
</script>
<template>
   <div>
    <TranslateModalsRename renameType="Video" @changeData="triggerData"/>
    <ModalsConfirm
    :show-modal="true"
    v-if="isOpen('deleteProject')"
    :title="$t(`Delete Project?`) "
    :sub-title="$t('Are you sure you want to delete the project ?')"
    confirm-btn-type="delete"
    @control-delete="deleteProjectModal"
    @control-cancel="closeModal('deleteProject')"
  />
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-5 ipad-max:grid-cols-3  ">
    
        <div v-for="video in videos"
        
        :class="[video.status === 'pending' ? 'cursor-not-allowed pointer-events-none select-none':'']"
        class="h-[160px] flex flex-col items-start justify-start space-y-[10px] rounded-[7px] 
        shadow-lg group border-[1px] border-transparent relative hover:border-tamkin 
    cursor-pointer mb-2">

        <div class="relative w-full ">
            <!-- <div 
            :class="[video.status === 'pending' ? 'cursor-not-allowed pointer-events-none select-none':'']"
            v-if="video.status === 'pending'" 
            class="flex flex-col items-center justify-center absolute h-[160px] inset-0 w-full border-[1px] border-transparent
             bg-gray-50 z-[20] bg-opacity-95">
              
              <div role="status" class="flex flex-col items-center justify-center">
                <svg aria-hidden="true" class="w-8 h-8 text-tamkinEnd animate-spin dark:text-gray-600 fill-tamkinStart" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">{{ $t('Loading') }}...</span>
              </div>
              
              <div class="text-darkGrey font-[500] text-[14px] mt-1">
                {{ $t('In progress...') }}
              </div>
            
          </div> -->
            <div @click="changeDropMenu(video)"
            :class="[currentMenuDrop !== video ? '' : '!flex']"
            class="hidden group-hover:flex items-center justify-center
             bg-[#CBC7D2] dark:bg-darkSecondary w-[18px] h-[18px]
              absolute rounded-[3px] p-[2px] top-[6px] right-0 mr-[6px] cursor-pointer">
          
             
                <svg
                width="18"
                height="5"
                viewBox="0 0 18 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
         class="text-darkGrey dark:text-whiteTamkin"
              >
                <path
                  d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
                  fill="currentColor"
                />
              </svg>
          
            </div>
            <div class=" bg-white dark:bg-darkTamkin h-[60px]  absolute right-0 mr-[6px] top-[26px]
             rounded-[4px] flex flex-col items-start 
            space-y-[3px]  justify-center" v-if="currentMenuDrop === video"  v-on-click-outside="()=>{
                currentMenuDrop = null
            }">
        <div class="font-[500] text-[10px] leading-[12px]  text-darkGrey dark:text-whiteTamkin
         hover:bg-tamkinLight dark:hover:bg-tamkinDarkPrimary
        bg-white dark:bg-darkSecondary p-1 w-full rounded-[4px] h-[18px]" @click="openModal('sharetranslate','translate')">
            {{ $t('Share') }}
        </div>
        <div @click="openAndRenameModal(video)" class="font-[500] text-[10px] leading-[12px]  text-darkGrey dark:text-whiteTamkin hover:bg-tamkinLight dark:hover:bg-tamkinDarkPrimary  rounded-[4px] w-full p-1 h-[18px]">
            {{ $t('Rename') }}
        </div>
        <div @click="openDeleteModal(video.name)" class="font-[500] text-[10px] leading-[12px]  text-darkGrey dark:text-whiteTamkin hover:bg-tamkinLight dark:hover:bg-tamkinDarkPrimary  rounded-[4px] p-1 w-full h-[18px]">
            {{ $t('Delete') }}
        </div>
            </div>
            <img :src="runtimec.public.baseImagerUrl+video.thumbnail" class=" object-cover  w-full h-[91px] rounded-[6px] "  alt="">
        </div>
        <div class="text-[#141C24] dark:text-whiteTamkin border-tamkin font-[500] text-[12px] leading-[16px]   rtl:text-right ltr:text-left px-[15px]">
            <span class="truncate w-36 block overflow-hidden text-ellipsis whitespace-nowrap">
              {{video.project_name}}
            </span>
          </div>
        <div class="text-[#141C24] dark:text-whiteTamkin px-[15px] !mt-[16px]  font-[500] text-[10px] leading-[16px] ">
            {{$t('Uploaded on')}} {{new Date(video.creation).toDateString()}}
        </div>
        </div>

     
                                  
            </div>
     
   </div>
      </template>
      