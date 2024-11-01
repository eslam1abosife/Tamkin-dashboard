<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";
import { ref, watch, onBeforeMount } from 'vue';
import { useTranslateStore } from "~/stores/translate";
import USa from '/public/assets/imgs/translatevideo/USA.svg';
import { useUpdateProject } from '@/composables/useInternal';

const { t } = useI18n();
const translateStore = useTranslateStore();
const { updateProject } = useUpdateProject();
const { $toast } = useNuxtApp();

const languagesArr = [
  { id: 1, name: 'English (USA)', icon: USa },
  { id: 2, name: 'English (USA)', icon: USa },
  { id: 3, name: 'English (USA)', icon: USa },
];

const texts = ref([]);
const initialTexts = ref(JSON.parse(JSON.stringify(texts.value)));
const textEditing = ref<number[]>([]);
const currentTextToEdit = ref<number | null>(null);
const showPros = ref(false);
const donePros = ref(false);
const loadingUpdate = ref(false);

const showEdit = (id: number) => {
  if (!textEditing.value.includes(id)) {
    textEditing.value.push(id);
  }
};

const previousTexts = ref<{ id: number; text: string; isEditing: boolean }[]>([]);

const startEditing = (id: number, text: string, item) => {
  const textItem = texts.value.find(item => item.id === id);
  if (textItem) {
    textItem.isEditing = true;
  } else {
    texts.value.push({ id, text, isEditing: true, ...item });
  }
};

const stopEditing = (id: number) => {
  const textItem = texts.value.find(item => item.id === id);
  if (textItem) {
    textItem.isEditing = false;
  }

  previousTexts.value = JSON.parse(JSON.stringify(texts.value));
  currentTextToEdit.value = null;
};

const handleInput = (id: number, newText: string) => {
  const textItem = texts.value.find(item => item.id === id);
  if (textItem) {
    textItem.text = newText; 
  }

  currentTextToEdit.value = id;
  donePros.value = true;
};

const changeMode = (mode: any) => {
  translateStore.subMode = mode;
};

const cancelEditing = () => {
  texts.value = JSON.parse(JSON.stringify(previousTexts.value));
  donePros.value = false;
};

const updateProjectFn = async () => {
  loadingUpdate.value = true;
  await updateProject({ ...translateStore.videoProject, value: texts.value });
  donePros.value = false;
  $toast(t('Subtitles Updated Successfully'), { hideIn: 3000 });
  loadingUpdate.value = false;
};

const deleteSub = (id: number) => {
  texts.value = texts.value.filter(item => item.id !== id);

  texts.value.forEach((item, index) => {
    item.idx = index + 1; 
  });

  donePros.value = true;
};

onBeforeMount(() => {
  texts.value = translateStore.videoProject.value.map(t => {
    return { ...t, id: t.idx, isEditing: false };
  });
});

watch(
  texts,
  () => {
    translateStore.changesOnSubTitles = !deepEqualTexts(initialTexts.value, texts.value);
  },
  { deep: true }
);

const deepEqualTexts = (arr1: any[], arr2: any[]): boolean => {
  return arr1.length === arr2.length && arr1.every((item, i) => item.text === arr2[i].text);
};

const formatTimeString = (timeString) => {
  const formattedTime = timeString.split(',')[0];
  return formattedTime;
};
</script>



<template>
  <div class="w-2/4 flex flex-col items-start justify-start h-[315px]">
    <div class="flex items-start w-full justify-between rtl:pl-[20px] ltr:pr-[20px]" v-if="translateStore.currentMode === 'subtitles' && !translateStore.subMode">
      <div class="text-[#3D3D3D] text-[15px] font-[500]">{{$t('Subtitles')}}</div>
      <div class="flex items-start justify-evenly rtl:space-x-reverse space-x-[15px]">
        <button class="btn-translate tamkin hover_tamkin  group"
         @click="changeMode('TranslationStyle')" :class="[translateStore.subMode  === 'TranslationStyle' ? 'active_tamkin' : '']">
          <div>
            <svg width="21" height="19" class="w-[18px] h-[18px]" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="group-hover:stroke-white" 
              d="M1 2.5H8M8 2.5H12.5M8 2.5V0.5M15 2.5H12.5M12.5 2.5C11.68 5.235 9.961 7.82 8 10.093M8 10.093C6.376 11.974 4.585 13.641 3 15M8 10.093C7 9 5.4 6.8 5 6M8 10.093L11 13M12.5 18.5L13.643 15.5M13.643 15.5L16.5 8L19.357 15.5M13.643 15.5H19.357M20.5 18.5L19.357 15.5" :class="[translateStore.subMode  === 'TranslationStyle' ? 'stroke-[url(#paint0_linear_6767_85371)]' : 'stroke-current']" stroke-linecap="round" stroke-linejoin="round" />
              <defs>
                <linearGradient id="paint0_linear_6767_85371" x1="10.75" y1="0.5" x2="10.75" y2="18.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2DADA3" />
                  <stop offset="1" stop-color="#71DAD2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="text_normal_hover"> {{$t('Translation')}} </div>
        </button>
        <button class="btn-translate tamkin hover_tamkin  group" @click="changeMode('style')" :class="[translateStore.currentMode  === 'style' ? 'active_tamkin' : '']">
          <div>
            <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="group-hover:stroke-white" d="M1.26579 13.2128L5.79073 8.69597M11.4889 6.68741L10.1344 10.7436C10.1127 10.8086 10.0757 10.8674 10.0265 10.9151C9.97721 10.9628 9.91714 10.998 9.85138 11.0175L1.54807 13.481C1.47326 13.5032 1.3938 13.5045 1.31832 13.4847C1.24284 13.4649 1.17424 13.4249 1.11998 13.3689C1.06573 13.3129 1.0279 13.2431 1.0106 13.1672C0.993314 13.0912 0.997225 13.012 1.02191 12.9381L3.71811 4.86551C3.73743 4.80754 3.76902 4.75441 3.81073 4.70971C3.85244 4.66501 3.9033 4.6298 3.95985 4.60645L7.79013 3.03225C7.868 3.00014 7.95364 2.99178 8.03627 3.0082C8.1189 3.02462 8.19481 3.06509 8.25442 3.12451L11.3858 6.25163C11.4418 6.30754 11.4811 6.37793 11.4993 6.4549C11.5175 6.53187 11.5139 6.61238 11.4889 6.68741Z" :class="[translateStore.currentMode  === 'style' ? 'stroke-white' : 'stroke-current']" stroke-linecap="round" stroke-linejoin="round" />
              <path class="group-hover:stroke-white" d="M11.5731 6.43703L13.5839 4.42917C13.8505 4.16298 14.0002 3.802 14.0002 3.4256C14.0002 3.0492 13.8505 2.68822 13.5839 2.42203L12.0765 0.915959C11.9445 0.784088 11.7877 0.679478 11.6151 0.608107C11.4425 0.536735 11.2576 0.5 11.0708 0.5C10.884 0.5 10.699 0.536735 10.5265 0.608107C10.3539 0.679478 10.1971 0.784088 10.065 0.915959L8.05428 2.92381M7.29918 7.18935C7.20011 7.09051 7.0825 7.01211 6.95308 6.95863C6.82366 6.90516 6.68496 6.87765 6.54494 6.87765C6.40493 6.87765 6.26622 6.90516 6.1368 6.95863C6.00738 7.01211 5.88977 7.09051 5.79073 7.18935C5.69188 7.2882 5.61336 7.40557 5.55977 7.53488C5.50617 7.66419 5.47855 7.80293 5.47852 7.94341C5.47848 8.08339 5.50605 8.22213 5.55964 8.35144C5.61324 8.48075 5.69176 8.59812 5.79073 8.69698" :class="[translateStore.currentMode  === 'style' ? 'stroke-white' : 'stroke-current']" stroke-linecap="round" stroke-linejoin="round" />
              <defs>
                <linearGradient id="paint1_linear_6797_85282" x1="7.5" y1="0.5" x2="7.5" y2="13.5" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2DADA3" />
                  <stop offset="1" stop-color="#71DAD2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div class="text_normal_hover"> {{$t('Style')}} </div>
        </button>
      </div>
    </div>
    <div class="w-full scrollable-div" v-if="translateStore.currentMode === 'subtitles' && !translateStore.subMode">
      <div class="mt-[16px] w-full ">
        <div class="space-y-2 flex flex-col items-start justify-center ">
          <div v-for="(textItem, index) in texts" :key="textItem.idx" class="flex items-center justify-between border-b py-2 w-full rtl:pl-[8px] ltr:pr-[8px] relative">
            <button
               @click.stop="startEditing( textItem.idx, textItem.text,textItem)"
          v-if="textEditing.includes(textItem.idx)"
              class="absolute top-[-10px] rtl:right-[30%] ltr:left-[30%] btn-default h-[20px] rounded-[5px] w-[10px] bg-white border-[1px] border-light text-[10px]"
            >
              {{ $t('Edit') }}
            </button>
            <div class="w-2/4" v-on-click-outside="() => {
              textEditing.splice(textEditing.indexOf(textItem.idx), 1)
              stopEditing(textItem.idx)
            }">
              <div v-if="!texts.find(it => it.id === textItem.idx)?.isEditing">
                <p
                  class="text-darkGrey font-[500] max-w-44 truncate text-[12px] leading-[32px]"
                  @click.stop="showEdit(textItem.idx)"
                >
                  {{ textItem.text }}
                </p>
              </div>
            
              <div v-else>
                <textarea
                  v-model="textItem.text"
                  @input="handleInput(textItem.idx,textItem.text)"
                  class="text-darkGrey font-[500] text-[12px] leading-[32px] w-full focus:ring-0 focus:outline-none border-0"
                ></textarea>
              </div>
            </div>
            
            
            <div class="flex items-center justify-evenly rtl:space-x-reverse space-x-[20px] ipad-max:w-[45%] w-[40%] 3xl:w-[30%]">
              <div class="flex flex-col">
                <div class="flex items-center rtl:space-x-reverse space-x-4">
                  <img src="/assets/imgs/translatevideo/in_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center rtl:space-x-reverse space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">{{ $t('In') }}</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">{{formatTimeString(textItem.start_time)}}</span>
                  </div>
                </div>
                <div class="flex items-center rtl:space-x-reverse space-x-4">
                  <img src="/assets/imgs/translatevideo/out_watch.png" class="w-[12px] h-[14px]" alt="">
                  <div class="flex items-center rtl:space-x-reverse space-x-2">
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">{{ $t('Out') }}</span>
                    <span class="text-[12px] leading-[32px] font-[400] text-[#878787]">{{formatTimeString(textItem.end_time)}}</span>
                  </div>
                </div>
              </div>
              <button @click="deleteSub(textItem.idx)" class="text-red-500 hover:bg-[#FFF3F2]
               hover:border-[#FACECB] w-[32px] h-[32px] border rounded-lg flex items-center justify-center">
                <img src="/assets/imgs/icons/bin.svg" alt="">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TranslateProjectModesSubtitlesTranslation class="w-full" />
    <TranslateProjectModesSubtitlesStyle class="w-full" />

    <transition name="slide-up">


      <SaveTranslateFooter  :show-footer="donePros" @save="updateProjectFn" :loading="loadingUpdate" @cancel_action="cancelEditing" />

    </transition>
    <!-- <Processingfooter :show-footer="showPros" :done="donePros" @close-footer="showPros = false"  @cancel_action="cancelEditing"/> -->
  </div>
</template>

<style scoped>
/* Add necessary styles here */
</style>
