<script lang="ts" setup>
import { useDropzone } from "vue3-dropzone";
import { useModalManager } from '@/composables/useModalManager';
import { useRuntimeConfig } from '#app'
const config = useRuntimeConfig()
const baseImageURL = config.public.baseImagerUrl
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
  getData
} = useModalManager();
import { useMarketStore } from "@/stores/market.js";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
const state = reactive({
  characterName: "",
  characterAge:"",
  gender:"",
  Description:''
});
const rules = {
    characterName: { required },
    characterAge: { required },
    gender:{required},
    Description:{required}
};

const v$ = useVuelidate(rules, state);

const marketStore = useMarketStore();
const acceptedFilesRef = ref<File[]>([]);
const onDrop = (acceptedFiles, rejectedFiles) => {
  acceptedFilesRef.value.push(...acceptedFiles);
//   console.log(acceptedFiles);
};
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,multiple:true ,noDrag:true,disabled:true});
const fileURL = (file) => {
  return URL.createObjectURL(file);
};

const removeFile = (file:any) => {
  acceptedFilesRef.value = acceptedFilesRef.value.filter(f=>f!==file)
//   modalStore.triggerupdatedPicture();
};

// const showEditedState = () => {
//   modalStore.controlTeamEditPictureModal();
//   modalStore.triggerupdatedPicture();
// };

onBeforeUnmount(() => {
  acceptedFilesRef.value.forEach((file) => {
    URL.revokeObjectURL(file);
  });
});
const {$toast} = useNuxtApp()

const updateData = ()=>{
closeModal('requestmodal_details')

}


const currency = ref('')
const requestData=({})
const price=ref('')
let isFilesPopulated = false;
watchEffect(() => {
  if (isOpen('requestmodal_details')) {
    requestData.value = getData();
    state.characterName = requestData.value.name;
    state.characterAge = requestData.value.age;
    state.gender = requestData.value.gender;
    state.Description = requestData.value.description;
    currency.value = requestData.value.currency;

    if(requestData.value.image.length>0 && !isFilesPopulated){
    for(let i=0; i<requestData.value.image.length; i++) {
      const customFile = new File([""], requestData.value.image[i].name, {
        type: "image/jpeg", // or the appropriate MIME type
        lastModified: new Date().getTime(),
      });
      customFile.id = requestData.value.image[i].id;
      customFile.image =  requestData.value.image[i].image;
      acceptedFilesRef.value.unshift(customFile);
    }
  }
    isFilesPopulated = true; 
    price.value = requestData.value.Cost;
  }
});

</script>

<template>
    <div v-if="isOpen('requestmodal_details') && requestData"
    class="bg-selected dark:bg-p fixed z-[9999] top-[0]   rtl:lg:left-0 ltr:right-0 rounded-[10px] p-[20px] 
       lg:w-[600px] w-full h-full lg:h-screen lg:overflow-x-hidden overflow-y-auto"
    >
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn_payment dark:bg-tamkinDarkPrimary 
  dark:text-whiteTamkin !top-[24px] rtl:!left-[20px] ltr:!right-[20px] !cursor-pointer z-[999]" @click="closeModal('requestmodal_details')">
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
    <div class="w-full ">
      <h1 class="text-[16px] lg:text-[18px] leading-[36px] font-[600] dark:text-whiteTamkin text-darkGrey lg:px-0 px-[20px] ">
        {{ $t('Request a specific Character Details') }}
      </h1>
      <div
      class="flex flex-col items-start justify-center space-y-[20px]  bg-white  dark:bg-tamkinDarkPrimary
       w-full   h-full pb-[20px] 
      px-[20px] rounded-[10px] mt-[16px] pt-[20px]  "
      style="box-shadow: 0px 4px 24px 8px #51459f14"
   >

<div class="flex flex-col items-start justify-center space-y-[16px]">
  <div class="flex flex-col items-start justify-start space-y-[12px]">
    <div class="text-[16px] font-[500] leading-[24px]">
      {{$t('Character Name')}}
     </div>
     <div class="text-[14px]  text-[#585B5B] font-[400] leading-[21px]">
      {{state.characterName}}
     </div>
   </div>
   <div class="flex flex-col items-start justify-start space-y-[12px]">
    <div class="text-[16px] font-[500] leading-[24px]">
      {{$t('Character Age')}}
     </div>
     <div class="text-[14px]  text-[#585B5B] font-[400] leading-[21px]">
      {{ state.characterAge }}
     </div>
   </div>
   <div class="flex flex-col items-start justify-start space-y-[12px]">
    <div class="text-[16px] font-[500] leading-[24px]">
      {{ $t('Gender') }}
     </div>
     <div class="text-[14px]  text-[#585B5B] font-[400] leading-[21px]">
      {{$t(state.gender)}}
     </div>
   </div>
   <div class="flex flex-col items-start justify-start space-y-[12px]">
    <div class="text-[16px] font-[500] leading-[24px]">
      {{$t('Description')}}
     </div>
     <div class="text-[14px]  text-[#878787] font-[400] leading-[21px]">
{{ state.Description }}     </div>
   </div>
</div>
     
<div class="text-[16px] font-[500] leading-[24px]">
  {{ $t('Character Images') }}
</div>
     <div class="w-full  p-[12px] border-[2px] border-[#C8CFEB] rounded-[10px] border-dashed grid grid-cols-4 mx-auto gap-4 ">
       
      <div class=" rounded-[6px] bg-[#F0F0F0] !m-auto"     v-for="file in acceptedFilesRef"
      :key="file.name"
>
        <img   :src="baseImageURL + file.image"
        :alt="file.name"
 class="h-[120px] w-[120px] object-cover object-top" alt="">
      </div>
   
     </div>
   
       
        <!-- <div class="custom-border flex items-center justify-center rtl:space-x-reverse 
        space-x-[20px] rtl:mr-auto ltr:ml-auto w-[150px] h-[40px] bg-[#EFF6FF]
         rounded-[10px] ">
          <div class="text-darkGrey text-[16px] font-[500]">{{$t('Price')}}</div>
          <div class="text-[16px] font-[600] uppercase">{{ price }} {{currency ? currency :'USD'}}</div>
        </div> -->
   
      </div>
    </div>
  </div>
  
</template>


<style>

</style>