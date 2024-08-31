<script lang="ts" setup>
import VCodeBlock from "@wdns/vue-code-block";
import banner from '/assets/imgs/gradient_embded.png'
import { Vue3Lottie } from 'vue3-lottie'
import { useModalManager } from '@/composables/useModalManager';
import { useGetInstallationGuide, useGetMembers ,useSummaryDetailedCode} from "@/composables/useEmbedCode";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";
// const { isModalVisible, toggle, toggleBubbleVisibility, popoutChatWindow } = useChatWoot()

const { getAvatarLetters } = useGetAvatarLetters();
import embed from '/assets/animation/embed.json';
import { useGetAppInvites } from "~/composables/useTeam";

const { getMembers, members, loading: getMembersLoading } = useGetMembers();
const tgl = ()=>{
  if(process.client && window.$chatwoot){
    window.$chatwoot.toggleBubbleVisibility("show");
    window.$chatwoot.toggle()
  }
}

const code = ref(true);


definePageMeta({
  layout: "dashboard",
middleware:['auth','permissions'],
requiredPermission: 'embed-code',


});
const props = defineProps({
  maxWidth: String,
});


const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();

const copyDone = ref(false)

const copyCode = () => {
  copyDone.value = true;
};
watch(copyDone, (newValue) => {
  if (newValue) {
    // Reset copyDone after the hideIn duration
    setTimeout(() => {
      copyDone.value = false;
    }, 2000);
  }
})
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

const { apps, defaultApp, getInviteApps } = useGetAppInvites();
const { getInstallationGuides, installationGuide, loading: getInstallationLoading } = useGetInstallationGuide();
getInstallationGuides();
// const { $chatwoot } = useNuxtApp();

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  await getInviteApps({ agency: user.agency });
  getMembers({ appName: defaultApp?.value?.name });
  // window.addEventListener("chatwoot:ready", function () {
    // window.$chatwoot.toggle();

// window.$chatwoot.toggleBubbleVisibility("show")
// window.$chatwoot.toggleBubbleVisibility("show");
// });



})
const openVideoLink = (videoLink) => {
  window.open(videoLink, '_blank');
}
const filteredInstallationGuide = computed(() => {
  return installationGuide.value.filter((ele) => ele.title.toLowerCase().includes(search.value.toString().toLowerCase().trim()))
});

</script>

<template>
  <div class="relative w-full inset-0">
    <!-- <DashboardToastSuccess
    v-if="true"
    :hideIn="20044440"
    type="error"
    :message="$t('Member Deleted Successfully')"
  /> -->
    <div class="  space-y-[32px] relative w-full">
      <!-- <DashboardEmbedShareModal/>
    <div class="fixed z-[999] bg-black bg-opacity-70 h-screen w-full">   </div> -->

      <div class="flex items-center justify-center flex-col w-full ">
        <div class="flex flex-col lg:flex-row items-center justify-between  ">

          <h1 class="text-center text-[20px] font-[500] lg:order-1 order-2 dark:text-whiteTamkin"
            style="line-height: 43.2px">
            {{ $t('Here’s your') }}
            <span class="bg-clip-text text-transparent bg-embded-code-gradient">{{$t('Embed code')}}...</span>


          </h1>
          <div class="  lg:order-2 order-1 p-0 lg:mx-0 mx-auto w-[105px] h-[100px]  lg:block hidden">
            <Vue3Lottie :animationData="embed" :height="100" :width="120" :noMargin="true" class="" />

          </div>

          <div class="  lg:order-2 order-1 p-0 lg:mx-0   lg:hidden block ">
            <Vue3Lottie :animationData="embed" :height="120" :width="120" class="lg:hidden block" :noMargin="true" />
          </div>
        </div>

        <div>
          <p class="font-[400] text-[13px] text-center lg:mt-[-23px] dark:text-whiteTamkin/90">
          {{$t(`Insert the following embed code at the beginning of your site's tag, and you’re all set!`)}}

           
          </p>
        </div>
        <div class="mt-[44px] w-full h-full bg-whiteTamkin dark:bg-tamkinDarkPrimary rounded-[10px]" style="box-shadow: 0px 4px 24px 8px #51459F1A;">
          <AdvancedCodeBlock />
        </div>
      </div>


      <div class="flex items-center flex-col justify-center mt-[16px] space-y-[16px] ">
        <div :style="{ backgroundImage: `url(${banner})` }" style="width: 100%; background-size: cover"
          class="rounded-lg h-[150px] lg:h-auto text-center flex items-center justify-center lg:flex-row md:flex-row flex-col w-full">
          <div class="hidden lg:block md:block lg:h-full md:h-full">
            <img src="/assets/imgs/icons/man.svg" alt="Character" class=" h-full " />
          </div>
          <div class="flex flex-col items-center justify-center px-[10px] lg:space-y-0 space-y-4">
            <h2
              class="text-[14px] lg:text-[18px] ipad-max:leading-[28px] lg:leading-[40px] font-[600] text-gray-800 mb-2">
              {{$t('Would you like to have early access to the platform?')}}
            </h2>
            <button class="w-full ipad-max:leading-[18px] h-[40px] bg-white text-tamkin rtl:space-x-reverse
            space-x-[12px] py-2 rounded-[10px] font-[600] text-[10px] lg:leading-[40px] lg:text-[12px]
            flex items-center justify-center px-[12px] whitespace-nowrap">
              <div class="" @click.prevent="tgl">{{$t('Sign up to keep up with the latest news from us')}}</div>
              <div>
                <img src="/assets/imgs/icons/nicemove.svg" class="w-[30px] h-[30px]" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-[14px] mb-[32px]">
        <div class="">
          <h1
            class="text-center font-[500] text-[16px] lg:leading-[36px] leading-[20px] lg:text-[18px] dark:text-whiteTamkin">
            {{$t('Need help installing Tamkin ?')}}
          </h1>
          <p class="text-center text-[14px] mt-[8px] text-[#A7A7A7] dark:text-whiteTamkin/90" style="line-height: 21px">
            {{ $t('Our support team is help !') }}
          </p>
        </div>

        <div class="lg:h-[60px] w-full bg-white dark:bg-tamkinDarkPrimary
          flex p-[10px] rounded-[10px] items-center lg:flex-row flex-col justify-center lg:justify-between">
          <div class="flex items-center rtl:space-x-reverse space-x-[-16px] flex-1">
            <template v-if="!getMembersLoading && members.length > 0">
              <div v-for="(member, index) in members" :key="index">
                <img draggable="false" v-if="member.image" :src="`https://tamkin.app/${member.image}`"
                  class="w-10 h-10 object-top object-cover rounded-full" />
                <div v-else
                  class="avatar_img rounded-full bg-[#2dada3] text-[#fff] grid place-content-center
                   select-none w-[40px] h-[40px]">
                  <span> {{ getAvatarLetters(member.first_name + ' ' + member.last_name) }} </span>
                </div>
              </div>
            </template>
            <img v-else-if="getMembersLoading" src="/assets/imgs/loading-green.svg" />

          </div>
          <div class="">
            <button @click.prevent="tgl"
              class="bg-transparent text-tamkin leading-[10px] text-[12px] lg:leading-[21px] lg:text-[14px] lg:text-right text-center font-[500] underline">
            {{$t('Schedule a meeting With our support team')}}
            </button>
          </div>
        </div>
      </div>
      <div class="">
        <h1
          class="text-center font-[500] mt-[43px] text-[#021328] dark:text-whiteTamkin text-[16px] lg:text-[24px] lg:leading-[36px] leading-[20px]">
          {{$t('Select your platform for a quick installation video')}}
        </h1>
      </div>

      <section class=" w-full  mx-auto ">
        <div class="flex flex-col mb-[24px]">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full  align-middle md:px-6 lg:px-8">
              <div v-loading="getInstallationLoading"
                class="overflow-hidden rounded-[10px] bg-white  dark:bg-tamkinDarkPrimary"
                style="box-shadow: 0px 4px 24px 8px #51459F1A;">

                <div class="flex items-center jutify-between">
                  <div class="w-2/4">
                    <div class="text-[16px] font-[600] p-[16px] dark:text-whiteTamkin" style="line-height: 16px">
                      {{$t('Installation Guides')}}
                    </div>
                  </div>

                  <div class="w-full lg:w-3/6 p-[16px]">
                    <div class="py-[17px] search_input">
                      <input type="text" class="input_dashboard_search w-full" v-model="search"
                        :placeholder="`${$t('Search')} ...`" />
                      <div
                        class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px]
                         ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]">
                        <img src="/assets/imgs/icons/search.svg" />
                      </div>
                      <div v-if="isSearchfilled" @click="clearInput"
                        class="absolute top-[12px] lg:top-[16px] rtl:left-0 ltr:right-0 p-[16px] cursor-pointer">
                        <img src="/assets/imgs/icons/clear_search.svg" />
                      </div>
                    </div>
                  </div>
                </div>

                <table v-if="filteredInstallationGuide.length > 0"
                  class="min-w-full divide-y divide-gray-200 dark:divide-darkborder">
                  <thead>
                  </thead>
                  <tbody class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200 dark:divide-darkborder">
                    <tr class="flex items-center justify-between" v-for="(item, index) in filteredInstallationGuide"
                      :key="index">
                      <td
                        class="flex items-center rtl:space-x-reverse space-x-[16px] px-4 py-4 text-[14px] 
                        font-[500] dark:text-whiteTamkin text-darkGrey"
                        style="line-height: 22.5px">
                        <div>
                          <img class="w-[28px] h-[30px] object-contain" :src="`https://tamkin.app/${item.icon}`" alt="">
                        </div>
                        <div> {{ item.title }} </div>
                      </td>
                      <td class="px-4 py-4 text-sm whitespace-nowrap">
                        <div class="flex items-center rtl:space-x-reverse space-x-6">
                          <button style="line-height: 22.5px" class="btn__embed_table rtl:space-x-reverse"
                            @click="openVideoLink(item.video_url)">
                            <div>
                              <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <rect y="25" width="25" height="25" rx="12.5" transform="rotate(-90 0 25)"
                                  class="fill-[#F2F2F2] dark:fill-whiteTamkin" fill-opacity="1" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M9.00021 17.4998C9.00026 17.6975 9.05893 17.8908 9.16881 18.0552C9.2787 18.2197 9.43486 18.3478 9.61756 18.4235C9.80026 18.4991 10.0013 18.5189 10.1952 18.4804C10.3892 18.4418 10.5674 18.3466 10.7072 18.2068L15.7072 13.2068C15.8947 13.0193 16 12.765 16 12.4998C16 12.2346 15.8947 11.9803 15.7072 11.7928L10.7072 6.79279C10.5674 6.65298 10.3892 6.55777 10.1952 6.5192C10.0013 6.48064 9.80026 6.50044 9.61756 6.57611C9.43486 6.65178 9.2787 6.77992 9.16881 6.94433C9.05893 7.10874 9.00026 7.30204 9.00021 7.49979V17.4998Z"
                                  class="fill-[#585B5B] dark:fill-darkTamkin" />
                              </svg>
                            </div>
                            <div class="">Installation Guides</div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <NoData v-else />
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  </div>
</template>

<!-- <style src=""></style> -->
