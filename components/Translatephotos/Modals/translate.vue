<script lang="ts" setup>
import { useDropzone } from "vue3-dropzone";
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs } from "@vuelidate/validators";
import USa from "/public/assets/imgs/translatevideo/USA.svg";
import { useModalManager } from "@/composables/useModalManager";
import { useTranslateStore } from "~/stores/translate";

const translateStore = useTranslateStore();
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const props = defineProps({
  translateType: String,
});
const modalStore = useModalStore();
const acceptedFilesRef = ref<File[]>([]);
const projectNameArr = [
  {
    id: 1,
    name: "Project 1",
  },
  {
    id: 2,
    name: "Project 54",
  },
  {
    id: 3,
    name: "Project 4",
  },
  {
    id: 6,
    name: "Project 2",
  },
  {
    id: 4,
    name: "Project 166",
  },
  {
    id: 7,
    name: "Project 5",
  },
];
const languagesArr = [
  {
    id: 1,
    name: "English (USA)",
    icon: USa,
  },
  {
    id: 2,
    name: "English (USA)",
    icon: USa,
  },
  {
    id: 3,
    name: "English (USA)",
    icon: USa,
  },
];
const localePath = useLocalePath()
const handleSelectedItemProjectName = (item: any) => {
  console.log(item);
};

const state = reactive({
  documentLink: "",
  projectName: "",
});
const rules = {
  documentLink: { required },
  projectName: { required },
};
const v$ = useVuelidate(rules, state);
const thumbnail = ref(null);
const videoDuration = ref(null);
const progressPercentage = ref(0); // You can dynamically update this value based on actual progress
const audioDuration = ref(null);

const dynamicWidth = computed(() => {
  return progressPercentage.value;
});
const imgUrl = ref();
const blurWidth = computed(() => {
  return 100 - progressPercentage.value; // The blur width decreases as the progress increases
});
const onDrop = async (acceptedFiles) => {
  if (acceptedFiles.length > 0) {
    const file = acceptedFiles[0];
    acceptedFilesRef.value.push(file);

    //   const fileUrl = URL.createObjectURL(file);
    imgUrl.value = URL.createObjectURL(file);
  }
};

const acceptedFilesType = computed(() => {
  return { accept: "image/*" };
});

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  onDrop,
  multiple: false,
  maxFiles: 1,
  ...acceptedFilesType.value,
});
const fileURL = (file) => {
  return URL.createObjectURL(file);
};
const removeFile = (file: any) => {
  acceptedFilesRef.value = acceptedFilesRef.value.filter((f) => f !== file);
  URL.revokeObjectURL(imgUrl.value); // Clean up the URL
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

const validatationForUpload = computed(() => {
  return acceptedFilesRef.value.length === 0;
});

const rendering = ref(false);

const failedRender = ref(false);
const router = useRouter();
function bytesToMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(2);
}

const widthVideoProcessing = ref(10);

const moveForward = () => {
  failedRender.value = false;
  rendering.value = true;
  setInterval(() => {
    widthVideoProcessing.value = widthVideoProcessing.value + 20;
  }, 1000);
  setTimeout(() => {
    router.push(localePath("/photos/translate"));

    closeModal("translate_images");
  }, 5000);
};
</script>

<template>
  <div
    class="fixed z-[9999] top-0 lg:top-[10%] 2xl:top-[5%] ipad-max:top-[5%] px-[15px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] lg:w-[640px] w-full overflow-y-auto pb-[16px] lg:h-auto lg:max-h-full h-auto max-h-[100vh] lg:overflow-y-visible"
    style="left: 50%; transform: translate(-50%, 0)"
  >
    <div
      style="box-shadow: 1px 0px 20.5px 0px #71dad2bd"
      class="close_btn"
      @click="closeModal('translate_images')"
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
      class="rtl:text-right px-[15px] ltr:text-left mt-[16px] font-[600] text-darkGrey dark:text-whiteTamkin text-[16px]"
    >
    {{ $t('Translate Images') }}
    </h1>

    <div
      v-if="!rendering && !failedRender"
      class="flex flex-col items-start justify-center px-[12px] h-full dark:bg-tamkinDarkPrimary w-full mx-auto rounded-[10px] mt-[16px]"
    >
      <div class="w-full">
        <div
          v-if="!v$.documentLink.$model"
          v-bind="getRootProps()"
          class="w-full h-auto p-[10px] rounded-[10px] border-[1px] border-dashed border-[#C8CFEB] hover:bg-tamkin-primary hover:bg-opacity-10 dark:border-[#333333] flex items-center justify-center flex-col space-y-[10px]"
        >
          <input v-bind="getInputProps()" />
          <div
            class="flex flex-row items-start md:items-center justify-between w-full space-y-[10px] md:space-y-0 rtl:space-x-reverse space-x-[16px]"
            v-if="acceptedFilesRef.length > 0"
          >
            <div
              v-for="file in acceptedFilesRef"
              :key="file.name"
              class="rounded-[10px] w-full md:w-auto"
            >
              <div class="flex items-center justify-start w-full rtl:space-x-reverse space-x-[14px]">
                <div class="relative">
                  <div
                    class="h-[91px] w-[60px] absolute inset-y-0 right-0 backdrop-blur-sm rounded-tr-[7px] rounded-br-[7px] bg-opacity-40"
                    :style="{ width: blurWidth + '%' }"
                  ></div>
                  <div class="flex items-center justify-center">
                    <img
                      :src="imgUrl"
                      class="w-auto h-[91px] rounded-[7px]"
                      @click.stop
                    />
                  </div>
                </div>
                <div
                  class="flex flex-col items-start justify-between space-y-[8px] mb-[48px]"
                >
                  <div
                    class="max-w-xs w-24 lg:w-60 truncate text-[#6D6D6D] text-[12px] font-[500] leading-[16px]"
                  >
                    {{ file.name }}
                  </div>
                  <div
                    class="max-w-xs w-24 lg:w-60 truncate text-[#6D6D6D] text-[12px] font-[500] leading-[16px]"
                  >
                    {{ bytesToMB(file.size) }} MB
                  </div>
                </div>
              </div>
            </div>

            <div class="w-auto md:w-auto">
              <button
                class="text-red-500 hover:bg-[#FFF3F2] hover:border-[#FACECB] w-[32px] h-[32px] mb-[60px] border rounded-lg flex items-center justify-center"
                @click.stop="removeFile(acceptedFilesRef[0])"
              >
                <img src="/assets/imgs/icons/bin.svg" alt="" />
              </button>
            </div>
          </div>
          <div class="w-full mx-auto mt-4" v-if="acceptedFilesRef.length > 0">
            <div class="relative pt-1 flex items-center justify-between">
              <div class="overflow-hidden h-2 w-full text-xs flex rounded bg-[#D7DADA]">
                <div
                  :style="{ width: dynamicWidth + '%' }"
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-tamkinStart to-tamkinEnd rounded"
                ></div>
              </div>
              <div class="ml-2">
                <span class="text-xs font-semibold inline-block text-black"
                  >{{ progressPercentage }}%</span
                >
              </div>
            </div>
          </div>
          <div
            class="w-full flex flex-col items-center justify-start space-y-[4px]"
            v-if="acceptedFilesRef.length === 0"
          >
            <button
              class="flex items-center justify-center border-[1px] border-[#C8CFEB] rounded-[10px] w-[134px] h-[32px] rtl:space-x-reverse space-x-[6px] mx-auto"
            >
              <img
                src="/assets/imgs/translatevideo/upload.svg"
                class="w-[19px] h-[19px]"
              />
              <div class="text-[13px] leading-[30px] font-[600] text-[#3C3F49]">
                 {{$t('Upload')}}
              </div>
            </button>

            <div>
              <h1
                class="text-[13px] leading-[19.5px] font-[400] text-center text-[#052443] dark:text-whiteTamkin"
                v-if="isDragActive"
              >
                {{ $t('Drop the files here') }} ...
              </h1>
            </div>
            <div>
              <h1
                class="text-[13px] leading-[19.5px] font-[400] text-center text-[#052443] dark:text-whiteTamkin"
                v-if="acceptedFilesRef.length === 0"
              >
                <span class="text-tamkin cursor-pointer">{{$t('Click here')}}</span> {{$t('to upload or drop images')}}
                
              </h1>
            </div>
          </div>
        </div>
        <div
          v-if="acceptedFilesRef.length === 0"
          class="text-[13px] font-[600] leading-[19px] text-darkGrey text-center mt-[8px]"
        >
          {{ $t('OR') }}
        </div>
        <div
          v-if="v$.documentLink.$model"
          class="w-full h-auto rounded-[10px] border-[1px] p-[10px] border-dashed border-[#C8CFEB] hover:bg-tamkin-primary hover:bg-opacity-10 dark:border-[#333333] flex items-start justify-center flex-col space-y-[10px]"
        >
          <div class="flex items-center justify-between w-full">
            <div class="relative flex">
              <img
                src="/assets/imgs/translatedocs/pdf.png"
                class="w-full h-[70px] rounded-[7px] mr-[14px]"
                @click.stop
              />

              <div>
                <div class="max-w-xs w-24 lg:w-60 truncate">File name</div>
                50 MB<br />
                20:20
              </div>
            </div>

            <div class="w-full md:w-auto">
              <button
                class="text-red-500 hover:bg-[#FFF3F2] hover:border-[#FACECB] w-[32px] h-[32px] border rounded-lg flex items-center justify-center"
                @click.stop="v$.documentLink.$model = ''"
              >
                <img src="/assets/imgs/icons/bin.svg" alt="" />
              </button>
            </div>
          </div>
        </div>

        <div class="w-full relative mt-[8px]" v-if="acceptedFilesRef.length === 0">
          <input
            type="text"
            placeholder="characterName"
            id="characterName"
            class="input_floating_label peer w-full"
            v-model="v$.documentLink.$model"
            :class="{
              input_error: v$.documentLink.$error && v$.documentLink.required.$invalid,
              error_text: v$.documentLink.$error && v$.documentLink.required.$invalid,
              input_success: !v$.documentLink.$error && !v$.documentLink.$invalid,
            }"
          />
          <label
            for="characterName"
            class="floating_label"
            :class="[
              v$.documentLink.$error && v$.documentLink.required.$invalid
                ? '!text-error'
                : '',
            ]"
          >
            {{ $t('Image link') }}
          </label>
          <div
            class="w-full lg:w-4/6"
            v-if="v$.documentLink.$error && v$.documentLink.required.$invalid"
          >
            <p class="error_message">
              <span v-if="v$.documentLink.$error && v$.documentLink.required.$invalid">{{
                $t("Document Link is Required")
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col items-center justify-center !p-0">
        <div
          class="flex items-center justify-evenly w-full lg:rtl:space-x-reverse space-x-[24px] lg:flex-nowrap flex-wrap"
        >
          <div
            class="flex flex-col items-start justify-start space-y-[10px] mt-[8px] w-full"
          >
            <div class="text-darkGrey font-[600] text-[14px] leading-[24px]">
              {{ $t('Project name') }}
            </div>
            <div class="w-full relative">
              <input
                type="projectName"
                placeholder="{{$t('projectName')}}"
                id="projectName"
                class="input_floating_label peer w-full"
                v-model="v$.projectName.$model"
                :class="{
                  input_error: v$.projectName.$error && v$.projectName.required.$invalid,
                  error_text: v$.projectName.$error && v$.projectName.required.$invalid,
                  input_success: !v$.projectName.$error && !v$.projectName.$invalid,
                }"
              />
              <label
                for="projectName"
                class="floating_label"
                :class="[
                  v$.projectName.$error && v$.projectName.required.$invalid
                    ? '!text-error'
                    : '',
                ]"
              >
                {{ $t("Project name*") }}
              </label>
              <div
                class="w-full lg:w-4/6 mt-1"
                v-if="v$.projectName.$error && v$.projectName.required.$invalid"
              >
                <p class="error_message">
                  <span v-if="v$.projectName.$error && v$.projectName.required.$invalid">
                    {{ $t("Project name is required") }}
                  </span>
                </p>
              </div>
            </div>
          </div>
      
        </div>
        <div class="flex items-center justify-between w-full ipad-max:my-[8px] my-[16px]">
          <div class="text-[14px] leading-[24px] text-darkGrey font-[600]">
            {{ $t('Translate') }}
          </div>
          <div class="rtl:mr-auto ltr:ml-auto flex items-center ">
              <label for="toggle_google_a_tr" class="toggle_wrap">
                  <input type="checkbox" id="toggle_google_a_tr" class="sr-only"
                      v-model="translateStore.translateCheck" />
                  <div class="toggle_parent" :class="[translateStore.signLanguageChecked ? 'active' : 'in_active']">
                      <div class="toggle_inner" :class="{ active: translateStore.translateCheck }">
                          <img v-if="translateStore.translateCheck" src="/assets/imgs/translatevideo/sign_active.svg"
                              class="w-[28px] h-[28px]" />
                          <img v-else src="/assets/imgs/translatevideo/sign_inactive.svg" class="w-[28px] h-[28px]" />
                      </div>
                  </div>
              </label>
          </div>
      </div>

        <div
          class="flex items-center justify-evenly w-full lg:rtl:space-x-reverse space-x-[24px] lg:flex-nowrap flex-wrap"
          :class="[!translateStore.translateCheck ? 'blur-[2px]' : '']" >
          <div
            class="flex flex-col items-start justify-start space-y-[10px] mt-[8px] w-full"
          >
            <div class="text-darkGrey font-[600] text-[14px] leading-[24px]">
              {{ $t('Original language') }}
            </div>
            <TranslateSelectInput
              @getCurrentSelectedItem="handleSelectedItemProjectName"
              :enableSearch="true"
              iconKey="icon"
              :placeholderinput="$t('Auto-detect Language')"
              :list="languagesArr"
              nameKey="name"
              idField="id"
            />
          </div>
          <div
            class="flex flex-col items-start justify-start space-y-[10px] mt-[8px] w-full"
          >
            <div class="text-darkGrey font-[600] text-[14px] leading-[24px]">
              {{$t('Translate to')}}
            </div>
            <TranslateSelectInput
              @getCurrentSelectedItem="handleSelectedItemProjectName"
              :enableSearch="true"
              iconKey="icon"
              :placeholderinput="$t('Auto-detect Language')"
              :list="languagesArr"
              nameKey="name"
              idField="id"
            />
          </div>
        </div>
        <div class="flex items-center justify-between w-full ipad-max:my-[8px] my-[16px]">
          <div class="text-[14px] leading-[24px] text-darkGrey font-[600]">
              {{$t('Sign language')}}
          </div>
          <div class="rtl:mr-auto ltr:ml-auto flex items-center ">
              <label for="toggle_google_a" class="toggle_wrap">
                  <input type="checkbox" id="toggle_google_a" class="sr-only"
                      v-model="translateStore.signLanguageChecked" />
                  <div class="toggle_parent" :class="[translateStore.signLanguageChecked ? 'active' : 'in_active']">
                      <div class="toggle_inner" :class="{ active: translateStore.signLanguageChecked }">
                          <img v-if="translateStore.signLanguageChecked" src="/assets/imgs/translatevideo/sign_active.svg"
                              class="w-[28px] h-[28px]" />
                          <img v-else src="/assets/imgs/translatevideo/sign_inactive.svg" class="w-[28px] h-[28px]" />
                      </div>
                  </div>
              </label>
          </div>
      </div>
  
      
      <TranslateSelectInput class="ipad-max:mt-0 mt-[10px] !w-full " :disabled="!translateStore.signLanguageChecked"
          :class="[!translateStore.signLanguageChecked ? 'blur-[2px]' : '']"
          @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="true" iconKey="icon"
          :placeholderinput="$t('Original language')" :list="languagesArr" nameKey="name" idField="id" />
        <TranslateVideoModalsTranslateSign />
        <TranslateVideoModalsTranslateSign />
        <button
          class="btn-dashboard hover_tamkin w-[217px] py-[16px] mt-4"
          :disabled="validatationForUpload"
          @click="moveForward"
        >
          {{ $t('Translate') }}
        </button>
      </div>
    </div>
    <div
      class="flex flex-col items-center justify-center px-[50px] py-[32px] h-[600px] space-y-[20px] dark:bg-tamkinDarkPrimary w-full mx-auto rounded-[10px] ipad-max:mt-[8px] mt-[16px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
      v-else-if="rendering && !failedRender"
    >
      <div class="text-[36px] leading-[30px] font-[600] text-tamkin">
        {{ widthVideoProcessing + "%" }}
      </div>
      <div class="text-[24px] leading-[30px] font-[600] text-darkGrey">
        {{ $t('Photo is processing') }}
      </div>
      <div class="relative pt-1 flex items-center justify-between w-full">
        <div
          class="overflow-hidden h-[19px] w-full text-xs flex rounded-[12px] bg-[#D7DADA]"
        >
          <div
            :style="{ width: widthVideoProcessing + '%' }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-tamkinStart to-tamkinEnd rounded-[12px]"
          ></div>
        </div>
      </div>
      <div class="text-[14px] text-center leading-[21px] font-[500] text-[#878787]">
        {{$t('Please wait while we process your request. This may take a few moments.')}}
      </div>
    </div>
    <div
      class="flex flex-col items-center justify-center px-[50px] h-[600px] pb-[16px] space-y-[20px] dark:bg-tamkinDarkPrimary w-full mx-auto rounded-[10px] mt-[16px]"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
      v-if="failedRender && !rendering"
    >
      <div class="flex items-center justify-center rtl:space-x-reverse space-x-[10px] w-full">
        <div>
          <img
            src="/assets/imgs/translatevideo/limited.svg"
            class="w-[25px] h-[25px]"
            alt=""
          />
        </div>
        <div class="text-[20px] leading-[30px] font-[600] text-darkGrey">
          {{ $t('Process failed') }}
        </div>
      </div>
      <div class="text-[14px] leading-[21px] font-[500] text-[#878787]">
        {{ $t('You do not have enough minutes to complete this process') }}
      </div>
      <div>
        <button class="btn-dashboard hover_tamkin">{{$t('Upgrade Now')}}</button>
      </div>
    </div>
  </div>
</template>

<style></style>
