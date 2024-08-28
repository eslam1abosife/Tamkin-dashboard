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
const currentTab = ref("translatev");

const changeTab = (tab: any) => {
  currentTab.value = tab;
};
</script>

<template>
  <div class="bg-white dark:bg-tamkinDarkPrimary h-auto p-[15px] mt-[16px] rounded-[10px] w-full mb-[16px]">
    <div class="flex items-center justify-between w-full flex-wrap lg:flex-nowrap lg:space-y-0 space-y-[10px]">
      <div
        :class="[
          currentTab === 'translatev'
            ? 'text-darkGrey dark:text-whiteTamkin cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="font-[600] ipad-max:text-[13px] lg:text-[14px]  lg:leading-[22.5px] ipad-max:leading-[10px] pb-[10px] cursor-pointer"
        @click="changeTab('translatev')"
      >
        Translate video (12)
      </div>
      <div
        :class="[
          currentTab === 'translateaudio'
            ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="font-[600] ipad-max:text-[13px] lg:text-[14px] lg:leading-[22.5px] ipad-max:leading-[10px] cursor-pointer pb-[10px]"
        @click="changeTab('translateaudio')"
      >
        Translate Audio
      </div>
      <div
        :class="[
          currentTab === 'translatelive'
            ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="text-[#A7A7A7] font-[600] ipad-max:text-[13px] lg:text-[14px] lg:leading-[22.5px] ipad-max:leading-[10px] cursor-pointer pb-[10px]"
        @click="changeTab('translatelive')"
      >
        Translate Live Video
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

  

<div v-if="search !== 'text' && search !== '404'">
  <LazyTranslateVideoVideos v-if="currentTab === 'translatev'" />
  <!-- <TranslateAudioAudios v-if="currentTab === 'translateaudio'" /> -->
  <TranslateVideoNovids v-if="currentTab === 'translateaudio' "/>

  <TranslateLiveVideoList v-if="currentTab === 'translatelive'" />
  <div class="mx-auto mt-[36px]" v-if="currentTab !== 'translateaudio'">
    <button
      class="h-[40px] w-[150px] ipad-max:text-[13px] lg:text-[16px] font-[500] text-[#878787] bg-[#EDEDED] rounded-[5px] flex items-center justify-center mx-auto"
    >
      Load more...
    </button>
  </div>

</div>
    <TranslateVideoNovids v-if="search === 'text'"/>
    <TranslateNoresult v-if="search === '404'"/>
  </div>
</template>
