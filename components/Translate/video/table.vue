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
  <div class="bg-white dark:bg-tamkinDarkPrimary h-auto p-[15px] mt-[24px] rounded-[10px] w-full mb-[16px]">
    <div class="flex items-center justify-between w-full">
      <div
        :class="[
          currentTab === 'translatev'
            ? 'text-darkGrey dark:text-whiteTamkin cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="font-[600] text-[16px] leading-[22.5px] pb-[10px] cursor-pointer"
        @click="changeTab('translatev')"
      >
        Translate video
      </div>
      <div
        :class="[
          currentTab === 'translateaudio'
            ? 'text-darkGrey dark:text-whiteTamkin  cursor-pointer border-translate-tab '
            : 'text-[#A7A7A7]',
        ]"
        class="font-[600] text-[16px] leading-[22.5px] cursor-pointer pb-[10px]"
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
        class="text-[#A7A7A7] font-[600] text-[16px] leading-[22.5px] cursor-pointer pb-[10px]"
        @click="changeTab('translatelive')"
      >
        Translate Live Video
      </div>
      <div class="py-[17px] search_input w-2/4">
        <input
          type="text"
          class="input_dashboard_search w-full !h-[40px]"
          v-model="search"
          placeholder="Search ..."
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

    <!-- <TranslateVideoNovids/> -->

    <LazyTranslateVideoVideos v-if="currentTab === 'translatev'" />
    <TranslateAudioAudios v-if="currentTab === 'translateaudio'" />
    <TranslateLiveVideoList v-if="currentTab === 'translatelive'" />
    <div class="mx-auto my-[36px]">
      <button
        class="h-[40px] w-[150px] text-[16px] font-[500] text-[#878787] bg-[#EDEDED] rounded-[5px] flex items-center justify-center mx-auto"
      >
        Load more...
      </button>
    </div>
  </div>
</template>
