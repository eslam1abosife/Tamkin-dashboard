<script lang="ts" setup>
import { useDropzone } from "vue3-dropzone";
import { useModalManager } from "@/composables/useModalManager";
import { useChangeCompanyImage } from "@/composables/useProfile";
import { useDeleteCompanyImg } from "@/composables/useProfile";
const { changeCompanyImage, loading } = useChangeCompanyImage();
const { deleteCompanyImg, loading: loadingdel } = useDeleteCompanyImg();

const profileStore = useProfileStore();
const {t} = useI18n()
const emit = defineEmits(["uploadSuccess", "removeSuccess"]);
const isDeleteAction = ref(false)
const { isOpen, openModal, closeModal } = useModalManager();

const acceptedFilesRef = ref<File[]>([]);
const isImageDeleted = ref(false); // Track deletion state

const onDrop = (acceptedFiles, rejectedFiles) => {
  acceptedFilesRef.value = acceptedFiles;
  console.log(acceptedFiles);
  isDeleteAction.value = false; // Reset deletion state when a new image is added
};
const loadingUpload = ref(false)
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
const props = defineProps({
  showModal: Boolean,
});

const fileURL = (file) => {
  return URL.createObjectURL(file);
};
const loadingDelete = ref(false);

const removeFile = async () => {
  loadingUpload.value = true

  // loadingDelete.value = true
  acceptedFilesRef.value = [];
  await deleteCompanyImg();
  await profileStore.getCurrentTeam() 
    
  // profileStore.setCompany();
//  loadingDelete.value = false
loadingUpload.value = false
isDeleteAction.value = false
};
//
watch(isDeleteAction,(ov,nv)=>{
//  if( isDeleteAction.value){
//   acceptedFilesRef.value = []
//  }else {

//  }

})
const {$toast} = useNuxtApp()

const submit = async () => {
  if (!isDeleteAction.value && acceptedFilesRef.value.length > 0) {
    // Handle file upload
    loadingUpload.value = true;

    const file = acceptedFilesRef.value[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = (reader.result as string).split(",")[1];

      const imgFile = {
        uid: file.lastModified.toString(),
        name: file.name,
        base64: base64String,
        field: "some_field", // Adjust this as necessary
        id: 0,
        doctype: file.type.split("/")[1],
        isPublic: true,
        ext: `.${file.name.split(".").pop()}`,
        size: file.size,
        path: "/path/to/image", // Optional, if applicable
        version: 1,
        mdf: "", // Optionally calculate the MD5 checksum if required
        mimType: file.type,
        creator_ID: 1, // Adjust this as necessary
      };
      
      await changeCompanyImage(imgFile);
      closeModal('edit_company_picture');
      await profileStore.getCurrentTeam();
      $toast(t('Company Image updated successfully'), { hideIn: 3000 });

      loadingUpload.value = false;
    };

    reader.readAsDataURL(file);
  } else if (isDeleteAction.value) {
    // Handle image deletion
    if (acceptedFilesRef.value.length > 0) {
      // Cancel delete action if files are present
      isDeleteAction.value = false;
      acceptedFilesRef.value = [];
    } else if (profileStore.company.agency_image.trim()) {
      // Remove image if one exists
      removeFile();
      closeModal('edit_company_picture');
      $toast('Company Image deleted successfully', { hideIn: 3000 });
    }
  } else if (profileStore.company.agency_image.trim()) {
    // Handle case where there's no action but an image exists
    loadingUpload.value = true;
    closeModal('edit_company_picture');
    loadingUpload.value = false;
  }else {
    // Close modal if no action required
    closeModal('edit_company_picture');
  }
};
const closeModalcmp = ()=>{
isDeleteAction.value = false

  closeModal('edit_company_picture');
}


onBeforeUnmount(() => {
  acceptedFilesRef.value.forEach((file) => {
    URL.revokeObjectURL(file);
  });
});
</script>

<template>
  <div
    v-if="isOpen('edit_company_picture')"
    class="fixed z-[9999] ipad-max:top-[50px] top-[100px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] p-[30px] lg:w-[418px] lg:h-[568px] w-10/12"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeModalcmp"
    >
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
    <h1
      class="rtl:text-right ltr:text-left font-[600] text-darkGrey dark:text-whiteTamkin text-[18px] leading-[36px]"
    >
      {{ $t('Edit Company Picture') }}
    </h1>

    <div
      v-bind="getRootProps()"
      class="w-full lg:w-[359px] h-[345px] border-[1px] border-dashed border-[#A7A7A7] dark:border-light mt-[40px] flex items-center justify-center flex-col space-y-[30px] bg-[linear-gradient(180deg,#fefefe_0%,#eef5ff_47.07%,#f6f3fc_72.04%,#fef5f6_100%)] dark:bg-darkTamkin dark:bg-none"
    >
      <input v-bind="getInputProps()"  :disabled="

      loadingUpload
    "/>

      <div
        v-if="acceptedFilesRef.length > 0"
        v-for="file in acceptedFilesRef"
        :key="file.name"
        class="upload-file-item"
      >
        <img
          :src="fileURL(file)"
          :alt="file.name"
          class="w-[101px] h-[104px] border-[3px] border-[#2CA9A0] rounded-[25px] object-cover"
        />
      </div>
      <div
        v-else-if="profileStore.company.agency_image && !isDeleteAction "
        class="upload-file-item"
      >
        <img
          :src="`https://tamkin.app/${profileStore.company.agency_image}`"
          class="w-[101px] h-[104px] border-[3px] border-[#2CA9A0] rounded-[25px] object-cover"
        />
      </div>
      <div v-else>
        <img src="/assets/imgs/icons/camera_modal.svg" />
      </div>

      <div class="w-[264px]">
        <h1
          class="text-[13px] leading-[19.5px] font-[400] text-center text-darkGrey dark:text-whiteTamkin"
        >
          {{$t('Select a high-quality image to represent your team and')}}
          <span class="font-[500] text-[#2DADA3]">{{$t('upload it here')}}</span>
        </h1>
      </div>
    </div>

    <div class="flex items-center justify-center rtl:space-x-reverse space-x-[30px] mx-auto mt-[40px]">
      <button
        class="flex items-center justify-center rtl:space-x-reverse space-x-[6px] btn_bordered_dashboard group error max-w-[160px]"
        @click="()=>{
          
          if(acceptedFilesRef.length > 0){
            isDeleteAction = true 
            acceptedFilesRef = []
          isDeleteAction = false 
           
          }
          isDeleteAction = !isDeleteAction 
        }"
        :disabled="loadingUpload || isDeleteAction ||  ( !profileStore.company.agency_image?.trim() && !acceptedFilesRef.length)"

      >
        <div class="w-[18px] h-[18px]">
          <svg
          class="text-[#FF453F] group-disabled:!text-[#FF453F] group-disabled:!text-opacity-40"
          width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.61539 2.78571H10.3846C10.3846 2.48261 10.2387 2.19192 9.97907 1.97759C9.71941 1.76327 9.36722 1.64286 9 1.64286C8.63278 1.64286 8.2806 1.76327 8.02093 1.97759C7.76126 2.19192 7.61539 2.48261 7.61539 2.78571ZM6.23077 2.78571C6.23077 2.17951 6.52253 1.59812 7.04186 1.16947C7.56119 0.740816 8.26555 0.5 9 0.5C9.73445 0.5 10.4388 0.740816 10.9581 1.16947C11.4775 1.59812 11.7692 2.17951 11.7692 2.78571H17.3077C17.4913 2.78571 17.6674 2.84592 17.7972 2.95308C17.9271 3.06025 18 3.20559 18 3.35714C18 3.5087 17.9271 3.65404 17.7972 3.7612C17.6674 3.86837 17.4913 3.92857 17.3077 3.92857H16.5268L14.8583 14.0291C14.7451 14.7136 14.3354 15.3411 13.7048 15.7954C13.0742 16.2497 12.2656 16.5 11.4286 16.5H6.57138C5.73441 16.5 4.92578 16.2497 4.29522 15.7954C3.66465 15.3411 3.25485 14.7136 3.14169 14.0291L1.47323 3.92857H0.692308C0.508696 3.92857 0.332605 3.86837 0.202772 3.7612C0.0729393 3.65404 0 3.5087 0 3.35714C0 3.20559 0.0729393 3.06025 0.202772 2.95308C0.332605 2.84592 0.508696 2.78571 0.692308 2.78571H6.23077ZM7.61539 6.78571C7.61539 6.63416 7.54245 6.48882 7.41261 6.38165C7.28278 6.27449 7.10669 6.21429 6.92308 6.21429C6.73947 6.21429 6.56337 6.27449 6.43354 6.38165C6.30371 6.48882 6.23077 6.63416 6.23077 6.78571V12.5C6.23077 12.6516 6.30371 12.7969 6.43354 12.9041C6.56337 13.0112 6.73947 13.0714 6.92308 13.0714C7.10669 13.0714 7.28278 13.0112 7.41261 12.9041C7.54245 12.7969 7.61539 12.6516 7.61539 12.5V6.78571ZM11.0769 6.21429C11.2605 6.21429 11.4366 6.27449 11.5665 6.38165C11.6963 6.48882 11.7692 6.63416 11.7692 6.78571V12.5C11.7692 12.6516 11.6963 12.7969 11.5665 12.9041C11.4366 13.0112 11.2605 13.0714 11.0769 13.0714C10.8933 13.0714 10.7172 13.0112 10.5874 12.9041C10.4576 12.7969 10.3846 12.6516 10.3846 12.5V6.78571C10.3846 6.63416 10.4576 6.48882 10.5874 6.38165C10.7172 6.27449 10.8933 6.21429 11.0769 6.21429ZM4.51385 13.8749C4.5818 14.2855 4.82766 14.6619 5.20594 14.9344C5.58421 15.2069 6.06929 15.3571 6.57138 15.3571H11.4286C11.931 15.3574 12.4164 15.2073 12.7949 14.9348C13.1735 14.6622 13.4196 14.2857 13.4875 13.8749L15.1297 3.92857H2.87031L4.51385 13.8749Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div class="flex items-center justify-center">
          <div >{{$t('Delete')}}</div>

          <!-- <svg
            v-if="loadingdel || loadingDelete"
            class="animate-spin h-5 w-5 text-darkGrey"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg> -->
        </div>
      </button>
      <button
        :disabled="
           loadingUpload
        "
        class="btn-dashboard hover_tamkin w-1/4"
        @click="submit"
      >
        <div class="flex items-center justify-center">
          <div :class="loadingUpload ? 'rtl:ml-2 ltr:mr-2' : ''">{{$t('Save')}}</div>

          <svg
            v-if="loadingUpload"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<style lang="scss"></style>
