<script lang="ts" setup>
import { useDropzone } from "vue3-dropzone";

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
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop,multiple:true });
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
</script>

<template>
    <div 
    class="mysite_bg_modal fixed z-[9999] top-[0]   rtl:lg:left-0 ltr:lg:right-0 rounded-[10px] lg:p-[30px] 
       lg:w-[600px] w-full h-full lg:h-screen lg:overflow-x-hidden"
    >
    <div style="box-shadow: 1px 0px 20.5px 0px #71dad2bd" class="close_btn_payment !cursor-pointer z-[999]" @click="marketStore.openReqestModal">
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
    <div class="w-full h-screen mb-[60px] ">
        <h1 class="text-[16px] lg:text-[18px] leading-[36px] font-[600] text-darkGrey lg:px-0 px-[20px] lg:mt-0 mt-[60px]">
        Request a specific character
      </h1>
      <div
      class="flex flex-col items-start justify-center lg:overflow-x-hidden space-y-[20px]  overflow-x-scroll bg-white
       w-full mx-auto  
      px-[20px] rounded-[10px] mt-[33px] pt-[20px] h-full"
      style="box-shadow: 0px 4px 24px 8px #51459f14"
   >
        <!-- Your form content here -->
        <div class="w-full relative  ">
          <input type="text" placeholder="Character Name" id="characterName" class="input_floating_label peer w-full" v-model="v$.characterName.$model" :class="{
            input_error: (v$.characterName.$error && v$.characterName.required.$invalid),
            error_text: (v$.characterName.$error && v$.characterName.required.$invalid),
            input_success: !v$.characterName.$error && !v$.characterName.$invalid,
          }" />
          <label for="characterName" class="floating_label" :class="[
            (v$.characterName.$error && v$.characterName.required.$invalid) ? '!text-error' : '',
          ]">
            Character Name*
          </label>
          <div class="w-full lg:w-4/6 mt-2" v-if="(v$.characterName.$error && v$.characterName.required.$invalid)">
            <p class="error_message">
              <span v-if="v$.characterName.$error && v$.characterName.required.$invalid">{{ $t("Character Name is Required") }}</span>
            </p>
          </div>
        </div>
        <div class="w-full relative">
          <input type="number" placeholder="Character Age" id="characterAge" class="input_floating_label peer w-full" v-model="v$.characterAge.$model" :class="{
            input_error: (v$.characterAge.$error && v$.characterAge.required.$invalid),
            error_text: (v$.characterAge.$error && v$.characterAge.required.$invalid),
            input_success: !v$.characterAge.$error && !v$.characterAge.$invalid,
          }" />
          <label for="characterAge" class="floating_label" :class="[
            (v$.characterAge.$error && v$.characterAge.required.$invalid) ? '!text-error' : '',
          ]">
            Character Age*
          </label>
          <div class="w-full lg:w-4/6 mt-2" v-if="(v$.characterAge.$error && v$.characterAge.required.$invalid)">
            <p class="error_message">
              <span v-if="v$.characterAge.$error && v$.characterAge.required.$invalid">{{ $t("Character Age is Required") }}</span>
            </p>
          </div>
        </div>
        <div class="w-full flex-col flex items-start justify-start">
          <h1 class="text-[16px] font-[600] text-darkGrey">Gender</h1>
          <div class="flex items-center justify-start space-x-[100px] w-full">
            <div class="flex items-center justify-start mt-[16px]">
              <input
                id="gender_radio_1"
                type="radio"
                name="gender_radio"
                class="hidden"
                value="male"
                v-model="v$.gender.$model"
              />
              <label for="gender_radio_1" class="flex items-center cursor-pointer">
                <span :class="[v$.gender.$model === 'male' ? 'radio-tamkin' : 'radio-normal']"></span>
              </label>
              <h2 class="text-[14px] font-[400] text-darkGrey pl-[10px]">Male</h2>
            </div>
            <div class="flex items-center justify-start mt-[16px]">
              <input
                id="gender_radio_2"
                type="radio"
                name="gender_radio"
                class="hidden"
                value="female"
                v-model="v$.gender.$model"
              />
              <label for="gender_radio_2" class="flex items-center cursor-pointer">
                <span :class="[v$.gender.$model === 'female' ? 'radio-tamkin' : 'radio-normal']"></span>
              </label>
              <h2 class="text-[14px] font-[400] text-darkGrey pl-[10px]">Female</h2>
            </div>
          </div>
        </div>
        <div class="relative w-full">
          <textarea
            id="description"
            placeholder="description*"
            class="input_floating_label_text_area peer w-full"
            v-model="v$.Description.$model"
            :class="{
              input_error: (v$.Description.$error && v$.Description.required.$invalid),
              input_success: !v$.Description.$error && !v$.Description.$invalid,
            }"
          ></textarea>
          <label
            for="description"
            class="floating_label_text_area"
            :class="[
              (v$.Description.$error && v$.Description.required.$invalid) ? '!text-error' : '',
            ]"
          >
            Description*
          </label>
          <div class="w-full lg:w-4/6" v-if="(v$.Description.$error && v$.Description.required.$invalid)">
            <p class="error_message text_area">
              <span v-if="v$.Description.$error && v$.Description.required.$invalid">{{ $t("Please enter a Description") }}</span>
            </p>
          </div>
        </div>
        <div class="w-full">
          <h1 class="text-left text-[16px] font-[500] text-darkGrey">Upload Character image</h1>
          <div
            v-bind="getRootProps()"
            class="w-full py-[32px] rounded-[10px] border-[1px] border-dashed border-[#C8CFEB] mt-[24px] flex items-center justify-center flex-col space-y-[10px]"
          >
            <input v-bind="getInputProps()" />
            <div class="grid gap-4 grid-cols-12 space-x-[16px] p-3" v-if="acceptedFilesRef.length > 0">
              <div
                v-for="file in acceptedFilesRef"
                :key="file.name"
                class="upload-file-item col-span-4 relative"
              >
                <div @click.stop="removeFile(file)" class="absolute top-[-10px] right-[-10px] cursor-pointer border bg-white rounded-full border-black w-[26px] h-[26px] flex items-center justify-center"> 
                  <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.21191 0.59375L8.78806 8.16989" stroke="#585B5B" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M1.34082 8.04297L8.66443 0.719362" stroke="#585B5B" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <img 
                  :src="fileURL(file)"
                  :alt="file.name"
                  class="w-[131px] h-[124px]"
                  @click.stop
                />
              </div>
              <div class="upload-file-item relative col-span-4 cursor-pointer m-auto">
                <img src="/assets/pngs/market/add_image.png" class="w-[83px] h-[83px]" alt="">
              </div>
            </div>
            <div v-else-if="acceptedFilesRef.length === 0">
              <img src="/assets/pngs/market/upload_request.png" class="w-[84px] h-[52px]" />
            </div>
            <div class="w-full">
              <h1 class="text-[13px] leading-[19.5px] font-[400] text-center text-darkGrey" v-if="isDragActive">
                Drop the files here ...
              </h1>
              <h1 class="text-[13px] leading-[19.5px] font-[400] text-center text-darkGrey" v-if="acceptedFilesRef.length === 0">
                <span class="text-tamkin cursor-pointer">Click here</span> to upload or drop media here
              </h1>
            </div>
          </div>
        </div>
        <div class="custom-border flex items-center justify-center space-x-[20px] ml-auto w-[136px] h-[40px] bg-[#EFF6FF]
         rounded-[10px]">
          <div class="text-darkGrey text-[16px] font-[500]">Price</div>
          <div class="text-[20px] font-[600]">$80</div>
        </div>
        <div class="mt-8 flex justify-end space-x-[20px] ml-auto  py-3">
          <button class="btn_bordered_dashboard">Cancel</button>
          <button class="btn-dashboard hover_tamkin max-w-[195px]">Add To Cart</button>
        </div>
      </div>
    </div>
  </div>
  
</template>


<style>

</style>