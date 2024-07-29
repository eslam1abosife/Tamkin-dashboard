<script lang="ts" setup>
import { useDropzone } from "vue3-dropzone";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import USa from '/public/assets/imgs/translatevideo/USA.svg';
import { useModalManager } from '@/composables/useModalManager';

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();



const acceptedFilesRef = ref<File[]>([]);
const projectNameArr = [
  { id: 1, name: 'Project 1' },
  { id: 2, name: 'Project 54' },
  { id: 3, name: 'Project 4' },
  { id: 6, name: 'Project 2' },
  { id: 4, name: 'Project 166' },
  { id: 7, name: 'Project 5' },
];

const languagesArr = [
  { id: 1, name: 'English (USA)', icon: USa },
  { id: 2, name: 'English (USA)', icon: USa },
  { id: 3, name: 'English (USA)', icon: USa },
];

const handleSelectedItemProjectName = (item: any) => {
  console.log(item);
};

const state = reactive({
  audioLink: "",
  projectName: ""
});

const rules = {
  audioLink: { required },
  projectName: { required },
};

const v$ = useVuelidate(rules, state);
const audioDuration = ref(null);
const progressPercentage = ref(0);

const dynamicWidth = computed(() => {
  return progressPercentage.value;
});

const blurWidth = computed(() => {
  return 100 - progressPercentage.value; 
});

const onDrop = async (acceptedFiles) => {
  if (acceptedFiles.length > 0) {
    const file = acceptedFiles[0];
    acceptedFilesRef.value.push(file);

    extractAudioDuration(file);
  }
};

const extractAudioDuration = (file) => {
  const fileUrl = URL.createObjectURL(file);
  const audio = document.createElement('audio');

  audio.src = fileUrl;

  audio.addEventListener('loadedmetadata', () => {
    audioDuration.value = audio.duration;
    URL.revokeObjectURL(fileUrl); // Clean up the URL
  });

  audio.addEventListener('error', (e) => {
    console.error('Error loading audio', e);
    URL.revokeObjectURL(fileUrl); // Clean up the URL in case of error
  });
};

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  multiple: false,
  maxFiles: 1,
  accept: 'audio/*'
});

const removeFile = (file: any) => {
  acceptedFilesRef.value = acceptedFilesRef.value.filter((f) => f !== file);
};

onBeforeUnmount(() => {
  acceptedFilesRef.value.forEach((file) => {
    URL.revokeObjectURL(file);
  });
});

onUpdated(() => {
  const intervalId = setInterval(() => {
    if (progressPercentage.value >= 100) {
      clearInterval(intervalId);
    } else {
      progressPercentage.value += 1;
    }
  }, 1000);
});

function bytesToMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

const validatationForUpload = computed(() => {
  return acceptedFilesRef.value.length === 0;
});
</script>


<template>
  <div class="bg-selected dark:bg-p fixed z-[9999] top-[0] 
    rtl:lg:left-0 right-0 rounded-[10px] p-[20px] lg:w-[600px] w-full h-full  overflow-y-auto">
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn_payment dark:bg-tamkinDarkPrimary dark:text-whiteTamkin !top-[24px] !right-[20px] !cursor-pointer z-[999]"
      @click="closeModal('translate_audio')">
      <svg class="w-[12px] h-[12px]" width="14" height="13" viewBox="0 0 14 13" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.64832 6.92435L13.0968 2.66757C13.2076 2.58023 13.2981 2.47187 13.3626 2.34938C13.427 2.22689 13.4641 2.09294 13.4714 1.95606C13.4786 1.81918 13.456 1.68235 13.4048 1.55428C13.3536 1.4262 13.2751 1.30968 13.1741 1.21211C13.0732 1.11455 12.952 1.03807 12.8184 0.98755C12.6848 0.937029 12.5416 0.913564 12.398 0.918649C12.2543 0.923734 12.1134 0.957256 11.9841 1.01709C11.8547 1.07691 11.7399 1.16174 11.6468 1.26618L7.18651 5.53047L2.72621 1.26618C2.52652 1.10872 2.27221 1.02832 2.01342 1.04081C1.75463 1.05331 1.51014 1.1578 1.32816 1.33369C1.14617 1.50958 1.03989 1.74409 1.03028 1.991C1.02067 2.23791 1.10841 2.4793 1.27622 2.66757L5.7247 6.92435L1.27622 11.1774C1.08185 11.3627 0.972656 11.6141 0.972656 11.8762C0.972656 12.1383 1.08185 12.3897 1.27622 12.575C1.47059 12.7603 1.73422 12.8645 2.0091 12.8645C2.28398 12.8645 2.5476 12.7603 2.74198 12.575L7.18651 8.31823L11.6468 12.575C11.8466 12.7285 12.0991 12.8058 12.3552 12.792C12.6114 12.7782 12.8531 12.6743 13.0335 12.5004C13.2139 12.3264 13.3203 12.0949 13.332 11.8505C13.3437 11.6061 13.2599 11.3662 13.0968 11.1774L8.64832 6.92435Z"
          fill="currentColor" />
      </svg>
    </div>
    <div class="w-full h-screen  pb-[50px]">
      <h1
        class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey dark:text-whiteTamkin lg:px-0 px-[20px]">
        Translate Audio
      </h1>
      <div class="flex flex-col items-start justify-start  space-y-[16px] h-auto pb-[16px] px-[12px]  bg-white
         dark:bg-tamkinDarkPrimary w-full mx-auto rounded-[10px] mt-[16px]" style="box-shadow: 0px 4px 24px 8px #51459f14">
        <div class="w-full">
          <div v-bind="getRootProps()" class="w-full h-auto p-[20px] rounded-[10px] border-[1px] border-dashed border-[#C8CFEB]
            hover:bg-tamkin-primary hover:bg-opacity-10 dark:border-[#333333] mt-[16px]
              flex items-center justify-center flex-col space-y-[10px]">
            <input v-bind="getInputProps()" />
            <div class="flex items-start justify-between w-full space-x-[16px]" v-if="acceptedFilesRef.length > 0">
              <div v-for="file in acceptedFilesRef" :key="file.name" class="rounded-[10px]   ">
                <div class="flex items-center justify-start w-full space-x-[14px]">
                  <div class="relative">
                    <div class="h-[81px] w-[60px] absolute inset-y-0 right-0 bg-white  
                  backdrop-blur-sm rounded-tr-[7px] rounded-br-[7px] bg-opacity-40"
                      :style="{ width: blurWidth + '%' }"> </div>
                    <div class="w-[78px] h-[78px] flex items-center justify-center custom-border bg-[#F7FCFC]">
                    <img src="/assets/imgs/translatevideo/mp3.svg" class="w-[41px] h-[41px] rounded-[7px]" @click.stop />
                   </div>


                  </div>
                  <div>
                    <div class="max-w-xs truncate "> {{ file.name }}</div>
                    {{ bytesToMB(file.size) }} MB<br>
                    {{ formatDuration(audioDuration) }}
                  </div>
                </div>
              </div>



              <div class="">
                <button class=" text-red-500 hover:bg-[#FFF3F2] hover:border-[#FACECB] w-[32px] h-[32px] border
               rounded-lg flex items-center justify-center" @click.stop="removeFile(acceptedFilesRef[0])">
                  <img src="/assets/imgs/icons/bin.svg" alt="">
                </button>
              </div>


            </div>
            <div class="w-full max-w-lg mx-auto mt-4" v-if="acceptedFilesRef.length > 0">
              <div class="relative pt-1 flex items-center justify-between">
                <div class="overflow-hidden h-2 w-full text-xs flex rounded bg-[#D7DADA]">
                  <div :style="{ width: dynamicWidth + '%' }" class="shadow-none flex flex-col text-center whitespace-nowrap
                   text-white justify-center bg-gradient-to-r from-tamkinStart to-tamkinEnd rounded"></div>
                </div>
                <div class="ml-2">
                  <span class="text-xs font-semibold inline-block text-black">{{ progressPercentage }}%</span>
                </div>
              </div>
            </div>


            <div v-else-if="acceptedFilesRef.length === 0">
              <button class="flex items-center justify-center border-[1px]
                 border-[#C8CFEB] rounded-[10px] w-[134px] h-[40px] space-x-[6px]">
                <img src="/assets/imgs/translatevideo/upload.svg" class="w-[24px] h-[24px]" />
                <div class="text-[15px] leading-[30px] font-[600] text-[#3C3F49]">
                  Upload
                </div>
              </button>
            </div>
            <div class="w-full" v-if="acceptedFilesRef.length === 0">
              <h1 class="text-[13px] leading-[19.5px] font-[400] text-center text-[#052443] dark:text-whiteTamkin"
                v-if="isDragActive">
                Drop the files here ...
              </h1>
              <h1 class="text-[13px] leading-[19.5px] font-[400] text-center text-[#052443] dark:text-whiteTamkin"
                v-if="acceptedFilesRef.length === 0">
                <span class="text-tamkin cursor-pointer">Click here</span> to upload or drop video
              </h1>
              <h2 class="text-center text-[10px] leading-[33px] text-[#6D6D6D]">
                MP3, MOV, WEBM, MKV
              </h2>
            </div>
          </div>
        </div>

        <div class="w-full flex flex-col items-center justify-center !p-0">
          <div class="text-center text-[20px] leading-[30px] text-darkGrey">
            OR
          </div>
          <div class="w-full relative mt-[16px] ">
            <input type="text" placeholder="characterName" id="characterName" class="input_floating_label peer w-full"
              v-model="v$.audioLink.$model" :class="{
                input_error: (v$.audioLink.$error && v$.audioLink.required.$invalid),
                error_text: (v$.audioLink.$error && v$.audioLink.required.$invalid),
                input_success: !v$.audioLink.$error && !v$.audioLink.$invalid,
              }" />
            <label for="characterName" class="floating_label" :class="[
              (v$.audioLink.$error && v$.audioLink.required.$invalid) ? '!text-error' : '',
            ]">
              Facebook, Instagram , YouTube...
            </label>
            <div class="w-full lg:w-4/6 " v-if="(v$.audioLink.$error && v$.audioLink.required.$invalid)">
              <p class="error_message">
                <span v-if="v$.audioLink.$error && v$.audioLink.required.$invalid">{{ $t("Audio Link is Required")
                  }}</span>
              </p>
            </div>
          </div>

          <div class="flex items-center justify-evenly w-full lg:space-x-[24px] lg:flex-nowrap flex-wrap">
            <div class="flex flex-col items-start justify-start space-y-[18px] mt-[16px] w-full">
              <div class="text-darkGrey font-[600] text-[14px] leading-[24px]">
                Project name
              </div>

              <div class="w-full relative">
                <input type="projectName" placeholder="{{$t('projectName')}}" id="projectName"
                  class="input_floating_label peer !w-full" v-model="v$.projectName.$model" :class="{
                    input_error: (v$.projectName.$error && v$.projectName.required.$invalid),
                    error_text: (v$.projectName.$error && v$.projectName.required.$invalid),
                    input_success: !v$.projectName.$error && !v$.projectName.$invalid,
                  }" />
                <label for="projectName" class="floating_label" :class="[
                  (v$.projectName.$error && v$.projectName.required.$invalid) ? '!text-error' : '',
                ]">
                  {{ $t("Project name") }}*
                </label>
                <div class="w-full lg:w-4/6 mt-1" v-if="(v$.projectName.$error && v$.projectName.required.$invalid)">
                  <p class="error_message">
                    <span v-if="v$.projectName.$error && v$.projectName.required.$invalid">
                      {{ $t("Project name is required") }}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-start justify-start space-y-[18px] mt-[16px] w-full">
              <div class="text-darkGrey font-[600] text-[14px] leading-[24px]">
                Number of speakers
              </div>
              <TranslateSelectInput @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="false"
                placeholderinput="Auto-detect speakers" :list="projectNameArr" nameKey="name" idField="id" />
            </div>
          </div>

          <div class="flex items-center justify-evenly w-full lg:space-x-[24px] lg:flex-nowrap flex-wrap">
            <div class="flex flex-col items-start justify-start space-y-[18px] mt-[16px] w-full">
              <div class="text-darkGrey font-[600] text-[14px] leading-[24px]">
                Original language
              </div>
              <TranslateSelectInput @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="true"
                iconKey="icon" placeholderinput="Auto-detect Language" :list="languagesArr" nameKey="name"
                idField="id" />
            </div>

            <div class="flex flex-col items-start justify-start space-y-[18px] mt-[16px] w-full">
              <div class="text-darkGrey font-[600] text-[14px] leading-[24px]">
                Translate to
              </div>
              <TranslateSelectInput @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="true"
                iconKey="icon" placeholderinput="Auto-detect Language" :list="languagesArr" nameKey="name"
                idField="id" />
            </div>
          </div>



          <TranslateVideoModalsTranslateSign />

          <button class="btn-dashboard hover_tamkin w-[217px] mt-[16px]"
            :disabled="validatationForUpload">Translate</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
