<script lang="ts" setup>
import { useDropzone } from "vue3-dropzone";
import {useModalStore} from '@/stores/modal'
const modalStore = useModalStore()
const acceptedFilesRef = ref<File[]>([])
    const onDrop =(acceptedFiles,rejectedFiles)=> {
      acceptedFilesRef.value = acceptedFiles
      console.log(acceptedFiles)
    }
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
const props = defineProps({
  showModal:Boolean
})

const fileURL = (file) => {
  return URL.createObjectURL(file);
};

const removeFile = ()=>{
  acceptedFilesRef.value = []
  modalStore.triggerupdatedPicture()

}

const showEditedState = ()=>{
  modalStore.controlTeamEditPictureModal()
  modalStore.triggerupdatedPicture()
}



onBeforeUnmount(() => {
  acceptedFilesRef.value.forEach(file => {
    URL.revokeObjectURL(file);
  });
});
</script>

<template>
  <div  v-if="modalStore.editPictureTeamModal"
    class="fixed z-[9999] top-[100px] bg-white rounded-[10px] p-[30px] lg:w-[418px] lg:h-[568px] w-10/12"
    style="left: 50%; transform: translate(-50%, 0)"
  >
  <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn" @click="modalStore.controlTeamEditPictureModal">
    <svg
      class="w-[12px] h-[12px]"
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
        fill="currentColor"
      />
    </svg>
  </div>
    <h1 class="text-left font-[600] text-darkGrey text-[24px] leading-[36px]">
        Edit Team Picture
    </h1>

    <div 
    v-bind="getRootProps()"
    style="background: linear-gradient(180deg, #FEFEFE 0%, #EEF5FF 47.07%, #F6F3FC 72.04%, #FEF5F6 100%);
" class="w-[359px] h-[345px] border-[1px] border-dashed border-[#A7A7A7] mt-[40px] flex items-center justify-center flex-col space-y-[30px] ">
<input v-bind="getInputProps()" />

<div v-if="acceptedFilesRef.length > 0" v-for="file in acceptedFilesRef" :key="file.name" class="upload-file-item">
  <img :src="fileURL(file)" :alt="file.name" class="w-[101px] h-[104px] border-[3px] border-[#2CA9A0] rounded-[25px] ">
</div>
<div v-else>
  <img src="/assets/imgs/icons/camera_modal.svg" alt="">
</div>

<div class="w-[264px]">
  <h1 class="text-[13px] leading-[19.5px] font-[400] text-center text-darkGrey"    v-if="isDragActive">Drop the files here ...</h1>

  <h1 class="text-[13px] leading-[19.5px] font-[400] text-center text-darkGrey" v-else>
    Select a high-quality image to represent your team and <span class="font-[500] text-tamkin">upload it here.</span>
  </h1>


</div>
    </div>

    <div class="flex items-center justify-center  space-x-[30px] mx-auto mt-[40px]">
      <button class="flex items-center justify-center btn-borderd-normal w-1/4" @click="removeFile" >
        <img src="~/assets/imgs/icons/bin.svg" class="w-[18px] h-[18px] text-[#E80902]" alt="">

        <span>Delete</span>
      </button>
      <button class=" btn-dashboard w-1/4" @click="showEditedState">
        Save
      </button>
   
    </div>
  </div>
</template>

<style lang="scss">

</style>
