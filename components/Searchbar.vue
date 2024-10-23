<script lang="ts" setup>
import {useSearchWebsite} from '@/composables/useSearch'
import { useDebounceFn } from '@vueuse/core'
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";

const { getAvatarLetters } = useGetAvatarLetters();

const {searchWebsite,loading} = useSearchWebsite()
const isSearchfilled = ref(false);
const search = ref("");
const searchData = ref([])
const loadingSearch = ref(true)
const noresult = ref(false)
const debouncedFn = useDebounceFn(async (query) => {
    if (query.length > 0) {
        const result = await searchWebsite(query);
        if(result.length === 0){
            noresult.value = true
        }
        searchData.value = result;  

    }
}, 500, { maxWait: 5000 });
const searchclone = ref()
watch(search, (newValue,ov) => {
    searchData.value = []; 
    noresult.value = false

    searchclone.value = ov
    isSearchfilled.value = newValue.length > 0;

    if (newValue.length > 0) {
        debouncedFn(newValue); 
    } else {
        loadingSearch.value = false; 
    }
});

const clearInput = () => {
  search.value = "";
  searchData.value = []
};
</script>
<template>

    <div
    class="py-[17px] search_input w-full rtl:!mr-[40px] ltr:!ml-[40px] relative"
  >
    <input
      type="text"
      class="input_dashboard_search w-full"
      v-model="search"
      :placeholder="`${$t('Search in Sites')} ...`"
    />
    <div
      class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
    >
      <img src="/assets/imgs/icons/search.svg" />
    </div>
    <div
      v-if="isSearchfilled"
      @click="clearInput"
      class="absolute top-[40%] rtl:left-0 cursor-pointer ltr:right-0 lg:top-[16px] lg:p-[16px]"
    >
      <img src="/assets/imgs/icons/clear_search.svg" />
    </div>
    
    <div v-if="isSearchfilled" class="bg-white divide-y w-full h-auto overflow-y-auto absolute rounded-[10px] border-[1px] drop-shadow-xl top-16 flex 
    flex-col items-start justify-start p-4">
   <div v-if="!loading" class="w-full"> 
    <div v-for="site in searchData" class="flex items-center justify-between p-3 h-[50px] rounded-[10px] cursor-pointer w-full  hover:bg-gray-50"> 
<div class="flex items-center justify-start space-x-4">
    <div>
        <img
        src="/assets/imgs/icons/mysite_select.svg"
        class="w-[40px] h-[40px]"
        v-if="
          site?.title === 'Internal Service' 
        "
      />
    
      <div
        v-if="
          !site?.favicon &&
          site?.title !== 'Internal Service'
        "
        class="w-[40px] h-[40px] bg-[#2DADA3] rounded-full text-white flex items-center justify-center"
      >
        {{
          site?.title ? getAvatarLetters(site?.title) : ""
        }}
      </div>
      <div
        v-if="
          site?.favicon &&
          site?.title !== 'Internal Service'
        "
      >
        <img
          v-if="site.favicon"
          :src="site.favicon"
          class="w-[40px] h-[40px] rounded-full ipad-max:hidden lg:block hidden"
        />
      </div>
     </div>
            <div class="text-[14px] font-[500] leading-[24px]">
                {{site.app_domain}}
            </div>
</div>
        <button class=" btn-dashboard hover_tamkin !h-[30px] w-1/6"> 
            Manage
        </button>
    </div>
   </div>
   <div v-if="            noresult
" class="w-full ">
    <div class="text-center text-[14px] font-[500] leading-[24px]">No result</div>
   </div>
   <div v-else-if="loading" class="w-full ">
    <svg   class="animate-spin mx-auto my-[10px] h-5 w-5 text-tamkin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
   </div>

    </div>
  </div>
</template>