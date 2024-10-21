<script lang="ts" setup>

import { useTranslateStore } from "~/stores/translate";
import USa from '/public/assets/imgs/translatevideo/USA.svg'
const {locale} = useI18n()
const translateStore = useTranslateStore()
import { Vue3ColorPicker } from '@cyhnkckali/vue3-color-picker';
import '@cyhnkckali/vue3-color-picker/dist/style.css'
import { vOnClickOutside } from '@vueuse/components'
const sizes  = [
    {
        id:1,
        name:'14px'
    },
    {
        id:2,
        name:'16px'
    },
    {
        id:3,
        name:'32px'
    },
    {
        id:4,
        name:'48px'
    },

]
const linesarr  = [
    {
        id:1,
        name:"1"
    },
    {
        id:2,
        name:"2"
    },
    {
        id:3,
        name:"3"
    },
  

]
const fonts  = [
    {
        id:1,
        name:'Poppins'
    },
    {
        id:2,
        name:'Almarai'
    },
    {
        id:3,
        name:'Roboto'
    },
    {
        id:4,
        name:'Arima'
    }
]
const languagesArr = [
    {
        id: 1,
        name: 'Font 1',
     
    },
    {
        id: 2,
        name: 'Font 2',
   

    },
    {
        id: 3,
        name: 'Font 3',
     

    },

]
const scrollToSection = (sectionId: string) => {
  nextTick(() => {
    const container = document.getElementById('scrollable-div');
    const section = document.getElementById(sectionId);
    if (container && section) {
      container.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth',
      });
    }
  });
};

const value = ref(50);

const currentColor = ref('#3333')
const handleSelectedItemProjectName = (item: any) => {
    // console.log(item)
    translateStore.styles.size = item.name
    // translateStore.styles.fontName = item
    // translateStore.styles.lines = item
}
const selectLines = (item: any) => {
    // console.log(item)
    translateStore.styles.lines = item.name
    // translateStore.styles.fontName = item
    // translateStore.styles.lines = item
}
const selectFont = (item: any) => {
    // console.log(item)
    translateStore.styles.fontName = item.name
    // translateStore.styles.fontName = item
    // translateStore.styles.lines = item
}

const processVideo = ref(false)
const doneVideo = ref(false)
const translationMode = inject('currentMode')
watch(processVideo, (ov, nv) => {

    setTimeout(() => {
        doneVideo.value = true
    }, 1500)

})
const autoHighlight = ref(false)

const showColorPicker = ref(false)
const openSpacingMenu = ref(false)
const showColorPickerHightlight = ref(false)
const changeMode = (m:any)=>{
translateStore.currentMode  = m
translateStore.subMode = ''
}
watch(openSpacingMenu, (newMode) => {
    nextTick(() => {
      scrollToSection('menu_spacing');
    });

});

watch(translateStore.styles, (newMode) => {
    nextTick(() => {
      scrollToSection('hightlight_menu');
    });

});
onBeforeMount(()=>{
    translateStore.resetStyles()
})


</script>

<template>

    <div v-if="translateStore.subMode  === 'style'"
        class="w-2/4  !h-full flex flex-col items-start justify-start scrollable-div rtl:pl-[20px]  ltr:pr-[20px]" id="scrollable-div">
        <div class="text-[12px] font-[600] text-darkGrey flex items-center rtl:space-x-reverse space-x-[10px] mt-[6px]">
            <svg class="cursor-pointer rtl:rotate-180"  width="5" height="7" viewBox="0 0 5 7" fill="none"
                xmlns="http://www.w3.org/2000/svg" @click="changeMode('subtitles')">
                <path d="M1.81795 3.5L5 6.22234L4.09103 7L0 3.5L4.09103 1.19209e-07L5 0.777655L1.81795 3.5Z"
                    fill="#585B5B" />
            </svg>
            <div>
                {{ $t('Style') }}
            </div>
        </div>
        <div class="w-full px-1">

            <TranslateSelectInput class="mt-[16px]  " @getCurrentSelectedItem="selectFont"
                :enableSearch="false"  placeholderinput="Font" :list="fonts" nameKey="name"
                 :current-list-value="translateStore.styles.fontName"
                idField="id" />
   

            <div class="flex items-center justify-between rtl:space-x-reverse space-x-[24px] mt-[16px] ">

                <TranslateSelectInput @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="false"
                    :placeholderinput="$t('Size')"  :current-list-value="translateStore.styles.size" :list="sizes" nameKey="name" idField="id" />
                <TranslateSelectInput @getCurrentSelectedItem="selectLines" :enableSearch="false"
                    :placeholderinput="$t('Lines')" :list="linesarr" 
                    :current-list-value="translateStore.styles.lines" nameKey="name" idField="id" />

                <div @click="()=>{showColorPicker = !showColorPicker}"
                    class="h-[40px] border-[1px] border-lightGrey rounded-[10px] w-full flex items-center justify-between relative cursor-pointer">

                    <div v-if="showColorPicker" v-on-click-outside="() => { showColorPicker = !showColorPicker }"
                        class="bg-white absolute z-[50] top-14 h-auto  !shadow-none custom-border-tamkin 
                    rtl:lg:!right-[-70px] rtl:2xl:!right-[-150px]
 ltr:lg:!left-[-70px] ltr:2xl:!left-[-130px]
">
                        <Vue3ColorPicker mode="solid" @click.stop class="lg:!w-[200px] 2xl:!w-[300px] !shadow-none"
                            v-model="translateStore.colorStyle" :showColorList="false" :showEyeDrop="true" :showAlpha="true"
                            type="HEX" :showInputMenu="false" :showInputSet="true" :showPickerMode="false" />


                    </div>

                    <div
                        class="rtl:rounded-r-[10px] ltr:rounded-l-[10px] bg-white w-2/4 text-center text-[12px] font-[500] leading-[32px] text-darkGrey">
                        {{ $t('color') }}
                    </div>
                    <div :style="{background: translateStore.colorStyle}" class=" w-2/4 h-full rtl:rounded-l-[10px] ltr:rounded-r-[10px] flex items-center justify-center ">
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.155 13.1491L0.85 8.83333C0.733333 8.71637 0.645833 8.58772 0.5875 8.44737C0.529167 8.30702 0.5 8.16082 0.5 8.00877C0.5 7.85673 0.529167 7.71053 0.5875 7.57018C0.645833 7.42982 0.733333 7.30117 0.85 7.18421L4.875 3.16667L3.5625 1.85088C3.41083 1.69883 3.3322 1.51754 3.3266 1.30702C3.321 1.09649 3.3938 0.909357 3.545 0.745614C3.6962 0.581871 3.88287 0.5 4.105 0.5C4.32713 0.5 4.51963 0.581871 4.6825 0.745614L11.105 7.18421C11.2217 7.30117 11.3064 7.42982 11.3591 7.57018C11.4118 7.71053 11.438 7.85673 11.4375 8.00877C11.437 8.16082 11.4109 8.30702 11.3591 8.44737C11.3073 8.58772 11.2226 8.71637 11.105 8.83333L6.8 13.1491C6.68333 13.2661 6.555 13.3538 6.415 13.4123C6.275 13.4708 6.12917 13.5 5.9775 13.5C5.82583 13.5 5.68 13.4708 5.54 13.4123C5.4 13.3538 5.27167 13.2661 5.155 13.1491ZM5.9775 4.27193L2.2325 8.02632H9.7225L5.9775 4.27193ZM12.96 13.5C12.54 13.5 12.1842 13.3508 11.8925 13.0523C11.6008 12.7538 11.455 12.3884 11.455 11.9561C11.455 11.6403 11.5339 11.3421 11.6916 11.0614C11.8493 10.7807 12.0271 10.5058 12.225 10.2368L12.5575 9.81579C12.6625 9.68713 12.7997 9.62 12.9691 9.61439C13.1385 9.60877 13.2755 9.67006 13.38 9.79824L13.73 10.2368C13.9167 10.5058 14.0917 10.7807 14.255 11.0614C14.4183 11.3421 14.5 11.6403 14.5 11.9561C14.5 12.3889 14.3483 12.7545 14.045 13.053C13.7417 13.3515 13.38 13.5005 12.96 13.5Z"
                              :class="[showColorPicker ? 'fill-black ' :'fill-[#C5C5C5]']" />
                            <defs>
                                <linearGradient id="paint0_linear_7012_87399" x1="7.5" y1="0.5" x2="7.5" y2="13.5"
                                    gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#2DADA3" />
                                    <stop offset="1" stop-color="#71DAD2" />
                                </linearGradient>
                            </defs>
                        </svg>

                    </div>
                </div>
            </div>

        </div>
        <div
            class="border-[1px] border-lightGrey rounded-[10px]  bg-[#F7F7F7] flex items-center justify-between w-[100%] h-[40px] p-4 mt-[16px]">
            <div class="flex items-center rtl:space-x-reverse space-x-[24px]">
           <!-- Bold Button -->
<!-- Bold Button -->
<button
  :class="[translateStore.styles.fontWeight === 'bold' ? '!bg-[#EAEAEA]' : '!bg-white']"
  class="btn-default font-[700] text-darkGrey h-[30px] w-[30px] !p-[7px]"
  @click="translateStore.styles.fontWeight = translateStore.styles.fontWeight === 'bold' ? 'normal' : 'bold'">
  B
</button>

<!-- Italic Button -->
<button 
  :class="[translateStore.styles.fontStyle === 'italic' ? '!bg-[#EAEAEA]' : '!bg-white']"
  class="btn-default font-[700] text-darkGrey h-[30px] w-[30px] !p-[7px]" 
  @click="translateStore.styles.fontStyle = translateStore.styles.fontStyle === 'italic' ? 'normal' : 'italic'; translateStore.styles.underline = 'none';">
  <img src="/assets/imgs/translatevideo/italic.svg" class="w-[10px] h-[10px]" alt="">
</button>

<!-- Underline Button -->
<button 
  :class="[translateStore.styles.underline === 'underline' ? '!bg-[#EAEAEA]' : '!bg-white']"
  class="btn-default font-[700] text-darkGrey h-[30px] w-[30px] !p-[7px]"
  @click="translateStore.styles.underline = translateStore.styles.underline === 'underline' ? 'none' : 'underline'; translateStore.styles.fontStyle = 'normal';">
  U
</button>


            </div>
            <div class="flex items-center rtl:space-x-reverse space-x-[24px]">

                <button class="btn-default font-[700] text-darkGrey h-[30px] w-[30px] !p-[7px]"
                :class="[translateStore.styles.textAlign === 'left' ? '!bg-[#EAEAEA]' : '!bg-white']"

               
                 @click="translateStore.styles.textAlign = 'left'">

                
                    <svg width="14" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.726562 1.27344H15.272H0.726562ZM0.726562 4.42495H9.98276H0.726562ZM0.726562 7.57647H15.272H0.726562ZM0.726562 10.728H9.98276H0.726562Z"
                            fill="#585B5B" />
                        <path
                            d="M0.726562 1.27344H15.272M0.726562 4.42495H9.98276M0.726562 7.57647H15.272M0.726562 10.728H9.98276"
                            stroke="#585B5B" stroke-width="1.45455" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </button>

                <button 
                :class="[translateStore.styles.textAlign === 'center' ? '!bg-[#EAEAEA]' : '!bg-white']"

               
                @click="translateStore.styles.textAlign = 'center'"
                class="btn-default font-[700] text-darkGrey  h-[30px] w-[30px] !p-[7px]">
                    <svg width="14" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.726562 1.27344H15.272H0.726562ZM0.726562 4.42495H9.98276H0.726562ZM0.726562 7.57647H15.272H0.726562ZM0.726562 10.728H9.98276H0.726562Z"
                            fill="#585B5B" />
                        <path
                            d="M0.726562 1.27344H15.272M0.726562 4.42495H9.98276M0.726562 7.57647H15.272M0.726562 10.728H9.98276"
                            stroke="#585B5B" stroke-width="1.45455" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </button>

                <button 
                :class="[translateStore.styles.textAlign === 'right' ? '!bg-[#EAEAEA]' : '!bg-white']"

               
                @click="translateStore.styles.textAlign = 'right'"
                class="btn-default font-[700] text-darkGrey  h-[30px] w-[30px] !p-[7px]">
                    <svg width="14" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.726562 1.27344H15.272H0.726562ZM0.726562 4.42495H9.98276H0.726562ZM0.726562 7.57647H15.272H0.726562ZM0.726562 10.728H9.98276H0.726562Z"
                            fill="#585B5B" />
                        <path
                            d="M0.726562 1.27344H15.272M0.726562 4.42495H9.98276M0.726562 7.57647H15.272M0.726562 10.728H9.98276"
                            stroke="#585B5B" stroke-width="1.45455" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </button>
            </div>

        </div>

        <div class="border-[1px] border-lightGrey rounded-[10px]  bg-[#F7F7F7] flex items-center justify-between
     w-[100%] h-[40px] p-4 mt-[16px]">
            <div class="flex items-center rtl:space-x-reverse space-x-[24px]">
                <button 
                :class="[translateStore.styles.fontCap === 'none' ? '!bg-[#EAEAEA]' : '!bg-white']"

               
                @click="translateStore.styles.fontCap = 'none'"
                class="btn-default font-[600] text-darkGrey  h-[30px] w-[30px] !p-[7px]">
                    -
                </button>
                <button 
                :class="[translateStore.styles.fontCap === 'uppercase' ? '!bg-[#EAEAEA]' : '!bg-white']"

               
                @click="translateStore.styles.fontCap = 'uppercase'"
                class="btn-default font-[600] text-darkGrey  h-[30px] w-[30px] !p-[7px]">
                    AB
                </button>
                <button 
                :class="[translateStore.styles.fontCap === 'capitalize' ? '!bg-[#EAEAEA]' : '!bg-white']"

               
                @click="translateStore.styles.fontCap = 'capitalize'"
                class="btn-default font-[600] text-darkGrey  h-[30px] w-[30px] !p-[7px]">
                    Ab
                </button>
                <button 
                :class="[translateStore.styles.fontCap === 'lowercase' ? '!bg-[#EAEAEA]' : '!bg-white']"

               
                @click="translateStore.styles.fontCap = 'lowercase'"
                class="btn-default font-[600] text-darkGrey  h-[30px] w-[30px] !p-[7px]">
                    ab
                </button>
            </div>
            <div class="flex items-center rtl:space-x-reverse space-x-[24px] relative">

                <button 
               
                @click="()=>{
                  
                  
                    openSpacingMenu = !openSpacingMenu
                }"
                    :class="[openSpacingMenu ? 'border-tamkin' : 'border-[#D9D9D9]']"
                    class="btn-default font-[700] border-[1px] relative  text-darkGrey !bg-white h-[30px] w-[30px] !p-[7px]">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.40227 2.57143H15.2002C15.6801 2.57143 16 2.22857 16 1.71429C16 1.2 15.6801 0.857143 15.2002 0.857143H6.40227C5.92239 0.857143 5.60246 1.2 5.60246 1.71429C5.60246 2.22857 5.92239 2.57143 6.40227 2.57143ZM2.96309 8.82857V3.17143C3.12305 3.34286 3.28301 3.42857 3.44297 3.42857C3.68292 3.42857 3.84288 3.34286 4.00284 3.25714C4.32277 2.91429 4.40275 2.4 4.08282 2.05714L2.72315 0.342857C2.56318 0.0857144 2.40322 0 2.16328 0C1.92333 0 1.68339 0.0857144 1.52343 0.342857L0.163751 2.05714C-0.076192 2.4 -0.0761919 2.91429 0.323713 3.25714C0.643638 3.51429 1.04354 3.51429 1.36347 3.25714V8.91429C1.04354 8.65714 0.643638 8.57143 0.323713 8.91429C0.00378912 9.25714 -0.076192 9.77143 0.243732 10.1143L1.60341 11.8286C1.68339 11.9143 1.92333 12 2.16328 12C2.40322 12 2.64316 11.9143 2.80313 11.6571L4.1628 9.94286C4.48273 9.6 4.40275 9 4.08282 8.74286C3.68292 8.48571 3.20303 8.48571 2.96309 8.82857ZM15.2002 5.14286H6.40227C5.92239 5.14286 5.60246 5.48571 5.60246 6C5.60246 6.51429 5.92239 6.85714 6.40227 6.85714H15.2002C15.6801 6.85714 16 6.51429 16 6C16 5.48571 15.6801 5.14286 15.2002 5.14286ZM15.2002 9.42857H6.40227C5.92239 9.42857 5.60246 9.77143 5.60246 10.2857C5.60246 10.8 5.92239 11.1429 6.40227 11.1429H15.2002C15.6801 11.1429 16 10.8 16 10.2857C16 9.77143 15.6801 9.42857 15.2002 9.42857Z"
                            fill="#585B5B" />
                    </svg>

                  
                </button>
                <div   v-on-click-outside="() => { openSpacingMenu = !openSpacingMenu }" id="menu_spacing" class="bg-white border-[1px] flex flex-col items-start  border-tamkin  rounded-[10px]  
                h-auto absolute z-[100] rtl:right-[-180px] ltr:left-[-180px] top-10 p-[10px]" v-if="openSpacingMenu" >
                      <div class="font-[500] text-darkGrey text-[12px] text-left ">
                          {{$t('Spacing')}}
                      </div>
                      <div class="flex mt-[6px] items-center justify-start w-full rtl:space-x-reverse space-x-[16px]">
                          <div class="font-[400] w-[67px] text-[11px] text-darkGrey whitespace-nowrap"   > 
                              {{$t('Line Height')}}
                          </div>
                          <div class="slider-container " :class="[locale === 'ar' ? 'rtl' :'ltr']">
                              <input type="range" v-model="translateStore.styles.lineHeight" 
                              @click.stop min="0" max="100" class="slider"
                                  :style="{ '--pc': translateStore.styles.lineHeight + '%' }" />
                          </div>

                          <button class="btn-default font-[600] !text-[10px]  h-[24px] w-[24px] !p-[2px]">
                              {{ translateStore.styles.lineHeight }}
                          </button>
                      </div>
                      <div class="flex mt-[6px] items-center justify-start w-full rtl:space-x-reverse space-x-[16px]">
                          <div class="font-[400] w-[67px] text-[11px] text-darkGrey whitespace-nowrap">
                              {{ $t('Letter Spacing') }}
                          </div>
                          <div class="slider-container " :class="[locale === 'ar' ? 'rtl' :'ltr']">
                              <input type="range" v-model="translateStore.styles.letterSpacing" @click.stop min="0" max="100"
                               class="slider"
                                  :style="{ '--pc': translateStore.styles.letterSpacing + '%' }" />
                          </div>

                          <button class="btn-default font-[600] !text-[10px]  h-[24px] w-[24px] !p-[2px]">
                              {{  translateStore.styles.letterSpacing  }}
                          </button>
                      </div>

                  </div>


            </div>

        </div>
        <div :class="[translateStore.styles.autoHighlight.enabled ? 'custom-border-tamkin padding-override-1  h-auto p-[10px]' : 'border-lightGrey h-[40px]']"
            class="border-[1px]  rounded-[10px]  bg-white flex flex-col items-center justify-center w-[100%]
       p-4 mt-[16px]">
            <div class="flex items-center justify-between w-full">
                <div class="text-[11px] font-[500] text-darkGrey">
                    {{ $t('Auto Highlight') }}
                </div>
                <div class="flex items-center rtl:space-x-reverse space-x-[24px]">

                    <div class="rtl:mr-auto ltr:ml-auto flex items-center ">
                        <label for="toggle_google_a" class="toggle_wrap">
                            <input type="checkbox" id="toggle_google_a" class="sr-only" v-model="translateStore.styles.autoHighlight.enabled" />
                            <div class="toggle_parent" :class="[translateStore.styles.autoHighlight.enabled ? 'active' : 'in_active']">
                                <div class="toggle_inner" :class="{ active: translateStore.styles.autoHighlight.enabled }">
                                    <img v-if="translateStore.styles.autoHighlight.enabled" src="/assets/imgs/translatevideo/sign_active.svg"
                                        class="w-[28px] h-[28px]" />
                                    <img v-else src="/assets/imgs/translatevideo/sign_inactive.svg"
                                        class="w-[28px] h-[28px]" />
                                </div>
                            </div>
                        </label>
                    </div>


                </div>
            </div>
            <div id="hightlight_menu" v-if="translateStore.styles.autoHighlight.enabled" class="custom-border-tamkin  padding-override-1 rounded-[10px] 
     bg-white flex items-center relative justify-between w-[100%] h-[40px]  mt-[10px]">

                <div class="flex items-center rtl:space-x-reverse space-x-[24px] text-[11px] font-[500] text-darkGrey p-4">

                    {{ $t('Highlight color') }}
                </div>
                <div class="flex items-center rtl:space-x-reverse space-x-[24px]">
                    <button 
                    :class="[translateStore.styles.autoHighlight.fontStyle === 'bold'? '!bg-[#EAEAEA]' : '!bg-[#F7F7F7]']"

               
                    @click="translateStore.styles.autoHighlight.fontStyle = 'bold'"
                    class="btn-default font-[700] text-darkGrey  h-[30px] w-[30px] !p-[7px]">
                        B
                    </button>
                    <button 
                    :class="[translateStore.styles.autoHighlight.fontStyle ==='italic' ? '!bg-[#EAEAEA]' : '!bg-[#F7F7F7]']"

               
                    @click="translateStore.styles.autoHighlight.fontStyle = 'italic'"
                    class="btn-default font-[700] text-darkGrey  h-[30px] w-[30px] !p-[7px]">
                        <img src="/assets/imgs/translatevideo/italic.svg" class="w-[10px] h-[10px]" alt="">
                    </button>

                </div>
                <div v-if="showColorPickerHightlight"
                    v-on-click-outside="() => { showColorPickerHightlight = !showColorPickerHightlight }"
                    class="bg-white absolute z-[50] bottom-[-10px] h-auto padding-override-1  !shadow-none custom-border-tamkin !right-[50px]">
                    <Vue3ColorPicker mode="solid" @click.stop class="lg:!w-[200px] 2xl:!w-[300px] !shadow-none"
                        v-model="currentColor" :showColorList="false" :showEyeDrop="true" :showAlpha="true" type="HEX"
                        :showInputMenu="false" :showInputSet="true" :showPickerMode="false" />


                </div>

                <div class="bg-[#F7F7F7] w-[50px] h-full rounded-r-[10px] flex items-center justify-center cursor-pointer"
                    @click="showColorPickerHightlight = !showColorPickerHightlight">
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.155 13.1491L0.85 8.83333C0.733333 8.71637 0.645833 8.58772 0.5875 8.44737C0.529167 8.30702 0.5 8.16082 0.5 8.00877C0.5 7.85673 0.529167 7.71053 0.5875 7.57018C0.645833 7.42982 0.733333 7.30117 0.85 7.18421L4.875 3.16667L3.5625 1.85088C3.41083 1.69883 3.3322 1.51754 3.3266 1.30702C3.321 1.09649 3.3938 0.909357 3.545 0.745614C3.6962 0.581871 3.88287 0.5 4.105 0.5C4.32713 0.5 4.51963 0.581871 4.6825 0.745614L11.105 7.18421C11.2217 7.30117 11.3064 7.42982 11.3591 7.57018C11.4118 7.71053 11.438 7.85673 11.4375 8.00877C11.437 8.16082 11.4109 8.30702 11.3591 8.44737C11.3073 8.58772 11.2226 8.71637 11.105 8.83333L6.8 13.1491C6.68333 13.2661 6.555 13.3538 6.415 13.4123C6.275 13.4708 6.12917 13.5 5.9775 13.5C5.82583 13.5 5.68 13.4708 5.54 13.4123C5.4 13.3538 5.27167 13.2661 5.155 13.1491ZM5.9775 4.27193L2.2325 8.02632H9.7225L5.9775 4.27193ZM12.96 13.5C12.54 13.5 12.1842 13.3508 11.8925 13.0523C11.6008 12.7538 11.455 12.3884 11.455 11.9561C11.455 11.6403 11.5339 11.3421 11.6916 11.0614C11.8493 10.7807 12.0271 10.5058 12.225 10.2368L12.5575 9.81579C12.6625 9.68713 12.7997 9.62 12.9691 9.61439C13.1385 9.60877 13.2755 9.67006 13.38 9.79824L13.73 10.2368C13.9167 10.5058 14.0917 10.7807 14.255 11.0614C14.4183 11.3421 14.5 11.6403 14.5 11.9561C14.5 12.3889 14.3483 12.7545 14.045 13.053C13.7417 13.3515 13.38 13.5005 12.96 13.5Z"
                          :class="[showColorPickerHightlight ? 'fill-[url(#paint0_linear_7012_87399)] ' :'fill-[#C5C5C5]']" />
                        <defs>
                            <linearGradient id="paint0_linear_7012_87399" x1="7.5" y1="0.5" x2="7.5" y2="13.5"
                                gradientUnits="userSpaceOnUse">
                                <stop stop-color="#2DADA3" />
                                <stop offset="1" stop-color="#71DAD2" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    </div>


</template>

<style>
.ck-cp-input-container {
    @apply !flex-wrap;
}

.slidecontainer {
    justify-content: center;
    bottom: 0px;
    @apply ltr:ml-auto rtl:mr-auto;
}

.slider {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 5px;
    width: 55px;
    height: 8px;
    --pc: 0;
    background: linear-gradient(to right, transparent 0 var(--pc), #d3d3d3 var(--pc) 100%), linear-gradient(to right, #2DADA3, #71DAD2);
    outline: none;
    opacity: 0.8;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }
  
  /* LTR version (default) */
  .ltr .slider {
    background: linear-gradient(to right, transparent 0 var(--pc), #d3d3d3 var(--pc) 100%), linear-gradient(to right, #2DADA3, #71DAD2);
  }
  
  /* RTL version */
  .rtl .slider {
    background: linear-gradient(to left, transparent 0 var(--pc), #d3d3d3 var(--pc) 100%), linear-gradient(to left, #2DADA3, #71DAD2);
  }
  


.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    border: 1px solid #2DADA3;
    border-radius: 100%;
    width: 15px;
    height: 15px;

    background: white;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: blue;
    cursor: pointer;
}
</style>