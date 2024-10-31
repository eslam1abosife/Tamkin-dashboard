<script lang="ts" setup>
import {useGetProjects} from '@/composables/useInternal'
const { getProjects,loadMoreProjects, projects, allLoaded, loading ,loadMoreProjectsLoading} = useGetProjects();

const props = defineProps({
  type: String
})
const route = useRoute()
const localePath = useLocalePath()
const isSearchfilled = ref(false);
const search = ref("");
watch(search, (ov, nv) => {
  return search.value.length > 0
    ? (isSearchfilled.value = true)
    : (isSearchfilled.value = false);
});
const clearInput = () => {
  search.value = "";
};
const myPorjects = ref([])
/**
 * Refreshes data when user changes tab
 * @function refreshData
 * @param {void} None
 * @return {void}
 */
const refreshData = async ()=>{
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    translateStore.loadingProjects = true

 await getProjects(currentTab.value,user.agency)
 translateStore.loadingProjects = false

  }
}
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);
  const pattern = localePath(path);

  if (pattern.endsWith("/*")) {
    const basePattern = pattern.replace("/*", "");
    return currentPath.startsWith(basePattern) && currentPath !== basePattern;
  }

  return currentPath === pattern;
};
const currentTab = ref(isLinkActive('/document') ? 'PDF Document Service' :'Translate video');
const getProjectsByTab = computed(() => {
  return translateStore.projectsAr
    .filter((t) => t.type === currentTab.value) 
    .filter((t) => {
      if (!isSearchfilled.value) return true; 
      return t.project_name.toLowerCase().includes(search.value.toLowerCase()); 
    })
    .sort((a, b) => new Date(b.creation) - new Date(a.creation)); 
});



const changeTab = (tab: any) => {
  translateStore.loadingProjects = true
  currentTab.value = tab;
  search.value = "";
  translateStore.loadingProjects = false

};
const translateStore = useTranslateStore()
const user = JSON.parse(localStorage.getItem("user"));
onMounted(async ()=>{
  await refreshData(); 

})


/**
 * Checks if a given path is currently active.
 * This function supports wildcard matching.
 * @param {string} path The path to check
 * @returns {boolean} True if the path is currently active, false otherwise
 */

watch(()=>currentTab.value ,async ()=> {
  // alert('gg')
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    translateStore.loadingProjects = true

 await getProjects(currentTab.value,user.agency,true)
 translateStore.loadingProjects = false

  }
})
onBeforeUnmount(()=>{
  projects.value = []
  translateStore.projectsAr = []
  
})
onBeforeMount(()=>{
  if(isLinkActive('/document')){
currentTab.value = 'PDF Document Services'
  }

  if(isLinkActive('/photos')){
currentTab.value = 'Photo Services'
  }
  if(isLinkActive('/photos/*')){
currentTab.value = 'Photo Services'
  }
})
provide('currentTab',currentTab)
</script>

<template>
  <div v-if="!translateStore.loadingProjects" class="bg-white dark:bg-tamkinDarkPrimary h-auto p-[15px] mt-[16px] rounded-[10px] w-full mb-[16px]">
    <div v-if="isLinkActive('/translate/*') " 
    class="flex items-center justify-between w-full flex-wrap lg:flex-nowrap lg:space-y-0 space-y-[10px]">
      <div
        :class="[
          currentTab === 'Translate video'
            ? 'text-darkGrey dark:text-whiteTamkin cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="font-[600] ipad-max:text-[13px] lg:text-[14px]  lg:leading-[22.5px] ipad-max:leading-[10px] pb-[10px] cursor-pointer"
        @click="changeTab('Translate video')"
      >
        {{ $t('Translate Video')}} ({{  translateStore.videoCount}})
      </div>
     
      <div class="py-[17px] search_input ipad-max:w-1/4 lg:w-2/4 w-full">
        <input
          type="text"
          class="input_dashboard_search w-full !h-[40px]"
          v-model="search"
          :placeholder="`${$t('Search')} ...`" 
        />
        <div
          class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[13px] lg:p-[16px]"
        >
          <img src="/assets/imgs/icons/search.svg" />
        </div>
        <div
          v-if="isSearchfilled"
          @click="clearInput"
          class="absolute top-[12px] lg:top-[12px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer"
        >
          <img src="/assets/imgs/icons/clear_search.svg" />
        </div>
      </div>
    </div>
    <div v-if="!isLinkActive('/translate/video/*') && !isLinkActive('/document/') && !isLinkActive('/photos/')&& !isLinkActive('/photos/*')" 
    class="flex items-center justify-between w-full flex-wrap lg:flex-nowrap lg:space-y-0 space-y-[10px]">
      <div
        :class="[
          currentTab === 'Translate video'
            ? 'text-darkGrey dark:text-whiteTamkin cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="font-[600] ipad-max:text-[13px] lg:text-[14px]  lg:leading-[22.5px] ipad-max:leading-[10px] pb-[10px] cursor-pointer"
        @click="changeTab('Translate video')"
      >
        {{ $t('Translate Video')}} ({{  translateStore.videoCount}})
      </div>
      <div
        :class="[
          currentTab === 'Translate Audio'
            ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="font-[600] ipad-max:text-[13px] lg:text-[14px] lg:leading-[22.5px] ipad-max:leading-[10px] cursor-pointer pb-[10px]"
        @click="changeTab('Translate Audio')"
      >
        {{ $t('Translate Audio') }}  ({{  translateStore.audioCount}})
      </div>
      <div
        :class="[
          currentTab === 'Translate Live Video'
            ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="text-[#A7A7A7] font-[600] ipad-max:text-[13px] lg:text-[14px] lg:leading-[22.5px] ipad-max:leading-[10px] cursor-pointer pb-[10px]"
        @click="changeTab('Translate Live Video')"
      >
        {{ $t('Translate Live Video') }} ({{  translateStore.liveCount}})
      </div>
      <div class="py-[17px] search_input ipad-max:w-1/4 lg:w-2/4 w-full">
        <input
          type="text"
          class="input_dashboard_search w-full !h-[40px]"
          v-model="search"
          :placeholder="`${$t('Search')} ...`" 
        />
        <div
          class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[13px] lg:p-[16px]"
        >
          <img src="/assets/imgs/icons/search.svg" />
        </div>
        <div
          v-if="isSearchfilled"
          @click="clearInput"
          class="absolute top-[12px] lg:top-[12px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer"
        >
          <img src="/assets/imgs/icons/clear_search.svg" />
        </div>
      </div>
    </div>
    <div v-if="isLinkActive('/document')" class="flex items-center justify-between w-full
     flex-wrap lg:flex-nowrap lg:space-y-0 space-y-[10px]">
    
    <div class="flex items-center justify-between w-[25%]">
      <div
      :class="[
        currentTab === 'PDF Document Services'
          ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
          : 'text-[#A7A7A7]',
      ]"
      class="font-[600] ipad-max:text-[13px] lg:text-[14px] lg:leading-[22.5px] ipad-max:leading-[10px] cursor-pointer pb-[10px]"
      @click="changeTab('PDF Document Services')"
    >
      {{ $t('PDF Files') }}  ({{  translateStore.pdfCount}})
    </div>
    <div
      :class="[
        currentTab === 'Docx Document Service'
          ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
          : 'text-[#A7A7A7]',
      ]"
      class="text-[#A7A7A7] font-[600] ipad-max:text-[13px] lg:text-[14px] lg:leading-[22.5px] ipad-max:leading-[10px] cursor-pointer pb-[10px]"
      @click="changeTab('Docx Document Service')"
    >
      {{ $t('Docx Files') }} ({{  translateStore.docxCount}})
    </div>
    </div>
      <div class="py-[17px] search_input ipad-max:w-1/4 lg:w-2/4 w-full">
        <input
          type="text"
          class="input_dashboard_search w-full !h-[40px]"
          v-model="search"
          :placeholder="`${$t('Search')} ...`" 
        />
        <div
          class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[13px] lg:p-[16px]"
        >
          <img src="/assets/imgs/icons/search.svg" />
        </div>
        <div
          v-if="isSearchfilled"
          @click="clearInput"
          class="absolute top-[12px] lg:top-[12px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer"
        >
          <img src="/assets/imgs/icons/clear_search.svg" />
        </div>
      </div>
    </div>
    <div v-if="isLinkActive('/photos') || isLinkActive('/photos/*')" class="flex items-center justify-between w-full
     flex-wrap lg:flex-nowrap lg:space-y-0 space-y-[10px]">
    
    <div class="flex items-center justify-between w-[25%]">
      <div
      :class="[
        currentTab === 'Photo Services'
          ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
          : 'text-[#A7A7A7]',
      ]"
      class="font-[600] ipad-max:text-[13px] lg:text-[14px] lg:leading-[22.5px] ipad-max:leading-[10px] cursor-pointer pb-[10px]"
      @click="changeTab('Photo Services')"
    >
      {{ $t('Photos') }}  ({{  translateStore.photoscount}})
    </div>
  
    </div>
      <div class="py-[17px] search_input ipad-max:w-1/4 lg:w-2/4 w-full">
        <input
          type="text"
          class="input_dashboard_search w-full !h-[40px]"
          v-model="search"
          :placeholder="`${$t('Search')} ...`" 
        />
        <div
          class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[13px] lg:p-[16px]"
        >
          <img src="/assets/imgs/icons/search.svg" />
        </div>
        <div
          v-if="isSearchfilled"
          @click="clearInput"
          class="absolute top-[12px] lg:top-[12px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer"
        >
          <img src="/assets/imgs/icons/clear_search.svg" />
        </div>
      </div>
    </div>

    <div v-if="isLinkActive('/document/*')" class="flex items-center justify-between w-full flex-wrap lg:flex-nowrap lg:space-y-0 space-y-[10px]">
      <div
      v-if="isLinkActive('/document/word')"
        :class="[
          currentTab === 'Docx Document Service'
            ? 'text-darkGrey dark:text-whiteTamkin cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="font-[600] ipad-max:text-[13px] lg:text-[14px]  lg:leading-[22.5px] ipad-max:leading-[10px] pb-[10px] cursor-pointer"
        @click="changeTab('Docx Document Service')"
      >
        {{ $t('All Docx files')}} ({{  translateStore.docxCount}})
      </div>
      <div
      v-if="isLinkActive('/document/pdf')"
      
        :class="[
          currentTab === 'PDF Document Services'
            ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="font-[600] ipad-max:text-[13px] lg:text-[14px] lg:leading-[22.5px] ipad-max:leading-[10px] cursor-pointer pb-[10px]"
        @click="changeTab('PDF Document Services')"
      >
        {{ $t('All PDF files') }}  ({{  translateStore.pdfCount}})
      </div>
      <!-- <div
        :class="[
          currentTab === 'Translate Live Video'
            ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="text-[#A7A7A7] font-[600] ipad-max:text-[13px] lg:text-[14px] lg:leading-[22.5px] ipad-max:leading-[10px] cursor-pointer pb-[10px]"
        @click="changeTab('Translate Live Video')"
      >
        {{ $t('Translate Live Video') }} ({{projects.filter(t=>t.type === 'Translate Live Video').length}})
      </div> -->
      <div class="py-[17px] search_input ipad-max:w-1/4 lg:w-2/4 w-full">
        <input
          type="text"
          class="input_dashboard_search w-full !h-[40px]"
          v-model="search"
          :placeholder="`${$t('Search')} ...`" 
        />
        <div
          class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[13px] lg:p-[16px]"
        >
          <img src="/assets/imgs/icons/search.svg" />
        </div>
        <div
          v-if="isSearchfilled"
          @click="clearInput"
          class="absolute top-[12px] lg:top-[12px] rtl:left-0 ltr:right-[0] p-[16px] cursor-pointer"
        >
          <img src="/assets/imgs/icons/clear_search.svg" />
        </div>
      </div>
    </div>

  
  <LazyTranslateVideoVideos   :videos="getProjectsByTab" />
  <!-- <TranslateAudioAudios v-if="currentTab === 'translateaudio'" /> -->
  <TranslateVideoNovids v-if="getProjectsByTab.length === 0 && !search" 
  :text="currentTab === 'Translate video' || currentTab === 'Translate Live Video' ? $t(`You don't have any Video Files`) :currentTab === 'Translate Audio' ? $t(`You don't have any Audio Files `) : $t(`There are no Files to display`)"  />
  <TranslateNoresult v-if="getProjectsByTab.length === 0 && search"/> 

  <div class="mx-auto mt-[36px]" v-if="!allLoaded && translateStore.projectsAr.length" >
    <button @click="loadMoreProjects(currentTab, user.agency)" :disabled="loadMoreProjectsLoading"
    class="btn-dashboard w-[150px] hover_tamkin mx-auto"
  >
  
  <div class="flex items-center justify-center rtl:space-x-reverse space-x-[6px]"  >
    <div :class="loadMoreProjectsLoading ? 'rtl:ml-2 ltr:mr-2':''">
      {{ $t('Load more') }}

    </div>

     <svg  v-if="loadMoreProjectsLoading" class="animate-spin  h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
   </div>
  </button>
  </div>
  <div class="mx-auto mt-[36px] text-center text-[14px] font-[400] leading-[14px] text-darkGrey" 
  v-if="allLoaded && getProjectsByTab.length">{{$t('There are no more projects to display')}}</div>

   
  </div>
  <!-- Loader Layout with Pulse Animation -->
<div v-if="translateStore.loadingProjects" class="bg-white dark:bg-tamkinDarkPrimary h-auto p-[15px] mt-[16px] rounded-[10px] w-full mb-[16px] animate-pulse">
  <div class="flex items-center justify-between w-full flex-wrap lg:flex-nowrap lg:space-y-0 space-y-[10px]">
    <!-- Placeholder for tab buttons -->
    <div class="bg-gray-300 dark:bg-gray-600 h-[22px] w-[150px] rounded-md"></div>
    <div class="bg-gray-300 dark:bg-gray-600 h-[22px] w-[150px] rounded-md"></div>
    <div class="bg-gray-300 dark:bg-gray-600 h-[22px] w-[150px] rounded-md"></div>

    <!-- Placeholder for search input -->
    <div class="py-[17px] search_input ipad-max:w-1/4 lg:w-2/4 w-full">
      <div class="relative">
        <div class="bg-gray-300 dark:bg-gray-600 w-full h-[40px] rounded-md"></div>
        <!-- Search icon placeholder -->
        <div class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px]">
        </div>
      </div>
    </div>
  </div>

  <!-- Placeholder for video content or other tab contents -->
  <div class="gap-2 grid grid-cols-1 lg:grid-cols-5 ipad-max:grid-cols-3 mt-[10px]">
    <!-- Each item in the list (mimicking videos or other elements) -->
    <div v-for="t in 5" class="bg-gray-300 dark:bg-gray-600 w-full h-[120px] rounded-md"></div>

  </div>

  <!-- Placeholder for load more button -->
  <div class="mx-auto mt-[36px]">
    <div class="bg-gray-300 dark:bg-gray-600 w-[150px] h-[40px] mx-auto rounded-md"></div>
  </div>
</div>

</template>
