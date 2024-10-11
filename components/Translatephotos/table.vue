<script lang="ts" setup>
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
const currentTab = ref("pdf");

const changeTab = (tab: any) => {
  currentTab.value = tab;
};
</script>

<template>
  <div class="bg-white dark:bg-tamkinDarkPrimary h-auto p-[12px] mt-[16px] rounded-[10px] w-full mb-[16px]">
    <div class="flex items-center justify-between w-full flex-wrap lg:flex-nowrap lg:space-y-0 space-y-[10px]">
<div class="flex items-center justify-start  space-x-[24px]">
    <div
  
    class="font-[600] ipad-max:text-[13px] lg:text-[16px]  lg:leading-[22.5px] ipad-max:leading-[10px] pb-[10px]  text-darkGrey dark:text-whiteTamkin cursor-pointer" 

  >
  {{$t('Translate Images') }} ( 5 )
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

    <!-- <TranslatedocsNoresult/> -->

    <TranslatephotosPhotos/>
    <div class="mx-auto mt-[36px]">
      <button
        class="btn-dashboard w-[150px] hover_tamkin mx-auto"
      >
        {{ $t('Load more') }}
      </button>
    </div>
  </div>
</template>
