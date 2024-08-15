<script lang="ts" setup>
import VCodeBlock from "@wdns/vue-code-block";
import banner from '/assets/imgs/gradient_embded.png'
import { Vue3Lottie } from 'vue3-lottie'
import { useModalManager } from '@/composables/useModalManager';
import { useGetInstallationGuide, useGetMembers } from "@/composables/useEmbedCode";
import { useGetAvatarLetters } from "@/composables/useSharedFunctions";

const { getAvatarLetters } = useGetAvatarLetters();
import embed from '/assets/animation/embed.json';
import { useGetAppInvites } from "~/composables/useTeam";

const { getMembers, members , loading: getMembersLoading} = useGetMembers();

const code = ref(true);
const advancedCode = ref(false)
const currentCode = ref(``)
const copyDone = ref(false)
const showAdancedCode = ()=>{
  if(!advancedCode.value){
    code.value = false
advancedCode.value = true

    currentCode.value = `const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
const foo = 'bar';
`
  }else {

    code.value = true
advancedCode.value = false

    currentCode.value = `const foo = 'bar';`
  }


}

definePageMeta({
  layout: "dashboard",
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
onBeforeMount(()=>{
  currentCode.value = `const foo = 'bar';`
  code.value = true
})
onBeforeMount(()=>{
  currentCode.value = `const foo = 'bar';`
  code.value = true
})


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
});
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

const { apps , defaultApp ,getInviteApps } = useGetAppInvites();
const { getInstallationGuides, installationGuide, loading: getInstallationLoading } = useGetInstallationGuide();
getInstallationGuides();

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user'));
  await getInviteApps({agency: user.agency});
  getMembers({ appName: defaultApp.value.name });
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

    <div class=" mx-auto space-y-[32px] relative w-full">
      <!-- <DashboardEmbedShareModal/>
    <div class="fixed z-[999] bg-black bg-opacity-70 h-screen w-full">   </div> -->

      <div class="flex items-center justify-center flex-col w-full">
     <div class="flex flex-col lg:flex-row items-center justify-between">

      <h1
      class="text-center text-[20px] font-[500] lg:order-1 order-2 dark:text-whiteTamkin"
      style="line-height: 43.2px"
    >
      Here’s your
      <span class="bg-clip-text text-transparent bg-embded-code-gradient"
        >Embed code...</span
      >
     

        </h1>
      <div   class="  lg:order-2 order-1 p-0 lg:mx-0 mx-auto w-[105px] h-[100px]  lg:block hidden" >
        <Vue3Lottie :animationData="embed" :height="100" :width="120" :noMargin="true" class=""
       />
       
      </div>

      <div   class="  lg:order-2 order-1 p-0 lg:mx-0   lg:hidden block " >
        <Vue3Lottie :animationData="embed" :height="120" :width="120" class="lg:hidden block" :noMargin="true"
       />
      </div>
        </div>
        <DashboardToastSuccess v-if="copyDone" :hideIn="2000" :message="'Copied to clipboard'" />

      <div>
        <p
        class="font-[400] text-[13px] text-center lg:mt-[-23px] dark:text-whiteTamkin/90"
      
      >
        Insert the following embed code at the beginning of your site's
        <head></head> tag, and you’re all set!
      </p>
      </div>

        <div class="mt-[44px] w-full h-full bg-whiteTamkin
         dark:bg-tamkinDarkPrimary rounded-[10px]" style="box-shadow: 0px 4px 24px 8px #51459F1A;
">
          <div
            class="flex items-center  lg:flex-nowrap flex-wrap md:flex-nowrap
           justify-between mt-[30px] w-full  px-[15px] "
            style="padding: 30px, 16px, 20px, 15px"
          >
            <button @click="showAdancedCode()"
              class="btn__icon__dashboard text-[14px] order-1 "
              style="
                background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
              "
            >
              <div>
                <svg
                  width="12"
                  height="21"
                  viewBox="0 0 12 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9.49697H11C11.2652 9.49697 11.5196 9.39161 11.7071 9.20407C11.8946 9.01654 12 8.76218 12 8.49697C12 8.23175 11.8946 7.9774 11.7071 7.78986C11.5196 7.60232 11.2652 7.49697 11 7.49697H7V3.90697L7.79 4.70697C7.88296 4.8007 7.99356 4.87509 8.11542 4.92586C8.23728 4.97663 8.36799 5.00277 8.5 5.00277C8.63201 5.00277 8.76272 4.97663 8.88458 4.92586C9.00644 4.87509 9.11704 4.8007 9.21 4.70697C9.30373 4.614 9.37812 4.5034 9.42889 4.38154C9.47966 4.25968 9.5058 4.12898 9.5058 3.99697C9.5058 3.86495 9.47966 3.73425 9.42889 3.61239C9.37812 3.49053 9.30373 3.37993 9.21 3.28697L6.71 0.786967C6.6149 0.695926 6.50275 0.624561 6.38 0.576967C6.13654 0.476949 5.86346 0.476949 5.62 0.576967C5.49725 0.624561 5.3851 0.695926 5.29 0.786967L2.79 3.28697C2.6017 3.47527 2.49591 3.73066 2.49591 3.99697C2.49591 4.26327 2.6017 4.51866 2.79 4.70697C2.9783 4.89527 3.2337 5.00106 3.5 5.00106C3.7663 5.00106 4.0217 4.89527 4.21 4.70697L5 3.90697V7.49697H1C0.734784 7.49697 0.48043 7.60232 0.292893 7.78986C0.105357 7.9774 0 8.23175 0 8.49697C0 8.76218 0.105357 9.01654 0.292893 9.20407C0.48043 9.39161 0.734784 9.49697 1 9.49697ZM11 11.497H1C0.734784 11.497 0.48043 11.6023 0.292893 11.7899C0.105357 11.9774 0 12.2317 0 12.497C0 12.7622 0.105357 13.0165 0.292893 13.2041C0.48043 13.3916 0.734784 13.497 1 13.497H5V17.087L4.21 16.287C4.11676 16.1937 4.00607 16.1198 3.88425 16.0693C3.76243 16.0188 3.63186 15.9929 3.5 15.9929C3.36814 15.9929 3.23757 16.0188 3.11575 16.0693C2.99393 16.1198 2.88324 16.1937 2.79 16.287C2.69676 16.3802 2.6228 16.4909 2.57234 16.6127C2.52188 16.7345 2.49591 16.8651 2.49591 16.997C2.49591 17.1288 2.52188 17.2594 2.57234 17.3812C2.6228 17.503 2.69676 17.6137 2.79 17.707L5.29 20.207C5.3851 20.298 5.49725 20.3694 5.62 20.417C5.7397 20.4699 5.86913 20.4972 6 20.4972C6.13087 20.4972 6.2603 20.4699 6.38 20.417C6.50275 20.3694 6.6149 20.298 6.71 20.207L9.21 17.707C9.3983 17.5187 9.50409 17.2633 9.50409 16.997C9.50409 16.7307 9.3983 16.4753 9.21 16.287C9.0217 16.0987 8.7663 15.9929 8.5 15.9929C8.2337 15.9929 7.9783 16.0987 7.79 16.287L7 17.087V13.497H11C11.2652 13.497 11.5196 13.3916 11.7071 13.2041C11.8946 13.0165 12 12.7622 12 12.497C12 12.2317 11.8946 11.9774 11.7071 11.7899C11.5196 11.6023 11.2652 11.497 11 11.497Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>Advanced View</div>
            </button>
            <button
                :disabled="!defaultApp"
                :class="!defaultApp ? 'opacity-40' : 'opacity-100'"
             @click="openModal('shareModal','embed-code')"
              class="lg:order-2 md:order-2 order-3 cursor-pointer ipad-max:text-[12px] border-[2px]  mx-auto lg:m-0 md:mt-0 mt-4 lg:mt-0 md:w-auto w-full lg:w-auto
              rounded-lg border-transparent bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] group"
            >
              <div class="bg-white dark:bg-tamkinDarkPrimary dark:text-white rounded-md flex items-center justify-center">
                <div class="ltr:pl-[16px] rtl:pr-[16px]">
                  <svg
                    width="22"
                    height="21"
                    viewBox="0 0 22 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 7.5C10.2044 7.5 9.44129 7.18393 8.87868 6.62132C8.31607 6.05871 8 5.29565 8 4.5C8 3.70435 8.31607 2.94129 8.87868 2.37868C9.44129 1.81607 10.2044 1.5 11 1.5C11.7956 1.5 12.5587 1.81607 13.1213 2.37868C13.6839 2.94129 14 3.70435 14 4.5C14 5.29565 13.6839 6.05871 13.1213 6.62132C12.5587 7.18393 11.7956 7.5 11 7.5ZM4.5 19.5C3.70435 19.5 2.94129 19.1839 2.37868 18.6213C1.81607 18.0587 1.5 17.2956 1.5 16.5C1.5 15.7044 1.81607 14.9413 2.37868 14.3787C2.94129 13.8161 3.70435 13.5 4.5 13.5C5.29565 13.5 6.05871 13.8161 6.62132 14.3787C7.18393 14.9413 7.5 15.7044 7.5 16.5C7.5 17.2956 7.18393 18.0587 6.62132 18.6213C6.05871 19.1839 5.29565 19.5 4.5 19.5ZM17.5 19.5C16.7044 19.5 15.9413 19.1839 15.3787 18.6213C14.8161 18.0587 14.5 17.2956 14.5 16.5C14.5 15.7044 14.8161 14.9413 15.3787 14.3787C15.9413 13.8161 16.7044 13.5 17.5 13.5C18.2956 13.5 19.0587 13.8161 19.6213 14.3787C20.1839 14.9413 20.5 15.7044 20.5 16.5C20.5 17.2956 20.1839 18.0587 19.6213 18.6213C19.0587 19.1839 18.2956 19.5 17.5 19.5Z"
                      stroke="url(#paint0_linear_275_10607)"
                      stroke-width="1.5"
                    />
                    <path
                      d="M19 11.5C19.0014 10.3648 18.7605 9.24243 18.2935 8.20776C17.8265 7.17309 17.1442 6.24995 16.292 5.5M3.00001 11.5C2.99866 10.3648 3.23952 9.24243 3.7065 8.20776C4.17348 7.17309 4.85584 6.24995 5.70801 5.5M9.00001 19.248C9.65338 19.416 10.3254 19.5007 11 19.5C11.6746 19.5007 12.3466 19.416 13 19.248"
                      stroke="url(#paint1_linear_275_10607)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_275_10607"
                        x1="11"
                        y1="1.5"
                        x2="11"
                        y2="19.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#2DADA3" />
                        <stop offset="1" stop-color="#71DAD2" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_275_10607"
                        x1="11"
                        y1="5.5"
                        x2="11"
                        y2="19.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#2DADA3" />
                        <stop offset="1" stop-color="#71DAD2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <button
                    class="h-[45px] btn px-4 py-2 rounded-md text-[14px]"
                    :disabled="!defaultApp"
                    :class="defaultApp ? 'group-hover:bg-gradient-to-r group-hover:to-tamkinStart group-hover:from-tamkinEnd group-hover:text-transparent group-hover:bg-clip-text' : null"
                >
                  Share code with your team
                </button>
              </div>
            </button>

            <div @click="copyCode"
              class="cursor-pointer lg:order-3  order-2 ipad-max:text-[12px] border-[2px] rounded-lg border-transparent
               bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] group"
            >
              <div class="bg-white dark:bg-tamkinDarkPrimary dark:text-white rounded-md flex items-center justify-center">
                <div class="ltr:pl-[16px] rtl:pr-[16px]">
                  <svg
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.829 11.361C19 10.948 19 10.423 19 9.375C19 8.327 19 7.802 18.829 7.389C18.7159 7.11593 18.5502 6.86782 18.3412 6.65883C18.1322 6.44984 17.8841 6.28407 17.611 6.171C17.198 6 16.673 6 15.625 6H9.1C7.84 6 7.21 6 6.729 6.245C6.30526 6.46078 5.96078 6.80526 5.745 7.229C5.5 7.709 5.5 8.339 5.5 9.6V16.125C5.5 17.173 5.5 17.698 5.671 18.111C5.9 18.662 6.338 19.101 6.889 19.329C7.302 19.5 7.827 19.5 8.875 19.5C9.923 19.5 10.448 19.5 10.861 19.329M18.829 11.361C18.7159 11.6341 18.5502 11.8822 18.3412 12.0912C18.1322 12.3002 17.8841 12.4659 17.611 12.579C17.198 12.75 16.673 12.75 15.625 12.75C14.577 12.75 14.052 12.75 13.639 12.921C13.3659 13.0341 13.1178 13.1998 12.9088 13.4088C12.6998 13.6178 12.5341 13.8659 12.421 14.139C12.25 14.552 12.25 15.077 12.25 16.125C12.25 17.173 12.25 17.698 12.079 18.111C11.9659 18.3841 11.8002 18.6322 11.5912 18.8412C11.3822 19.0502 11.1341 19.2159 10.861 19.329M18.829 11.361C18.2912 13.216 17.3017 14.9086 15.9492 16.2873C14.5967 17.666 12.9233 18.6878 11.079 19.261L10.861 19.329M14.5 6V5.1C14.5 3.84 14.5 3.21 14.255 2.729C14.0395 2.30541 13.6954 1.96095 13.272 1.745C12.79 1.5 12.16 1.5 10.9 1.5H4.6C3.34 1.5 2.71 1.5 2.229 1.745C1.80526 1.96078 1.46078 2.30526 1.245 2.729C1 3.209 1 3.839 1 5.1V11.4C1 12.66 1 13.29 1.245 13.771C1.461 14.195 1.805 14.539 2.229 14.755C2.709 15 3.34 15 4.601 15H5.5"
                      stroke="url(#paint0_linear_275_10529)"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_275_10529"
                        x1="10"
                        y1="1.5"
                        x2="10"
                        y2="19.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#2DADA3" />
                        <stop offset="1" stop-color="#71DAD2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <button 
                  class="h-[45px] text-[14px] px-4 py-2 rounded-md group-hover:bg-gradient-to-r group-hover:to-tamkinStart 
                  group-hover:from-tamkinEnd group-hover:text-transparent group-hover:bg-clip-text"
                >
                 Copy
                </button>
              </div>
            </div>
          </div>

          <div class="mt-[36px] px-[15px] w-full min-h-[50px]">
            <Client-only>
              <VCodeBlock
              dir="ltr"
                :code="currentCode"
                highlightjs
                lang="javascript"
                theme="neon-bunny"
              />
            </Client-only>

            <h2
              class="text-left font-[500] text-[12px] text-[#979897] dark:text-whiteTamkin/90 mb-[30px] mt-[20px]"
              style="line-height: 23.4px"
            >
              Managing multiple sites for multiple clients ? Great! Make sure
              you use <span class="text-darkGrey">the same embed code</span> on
              all of your sites !
            </h2>
          </div>
        </div>
      </div>

     
      <div class="flex items-center flex-col justify-center mt-[16px] space-y-[16px] ">
        <div
        :style="{ backgroundImage: `url(${banner})` }"
        style="width: 100%; background-size: cover"
        class="rounded-lg h-[150px] lg:h-auto text-center flex items-center justify-center lg:flex-row md:flex-row flex-col w-full"
      >
        <div class="hidden lg:block md:block lg:h-full md:h-full">
          <img 
            src="/assets/imgs/icons/man.svg"
            alt="Character"
            class=" h-full "
          />
        </div>
        <div class="flex flex-col items-center justify-center px-[10px] lg:space-y-0 space-y-4">
          <h2
            class="text-[14px] lg:text-[18px] ipad-max:leading-[28px] lg:leading-[40px] font-[600] text-gray-800 mb-2"
          >
            Would you like to have early access to the platform?
          </h2>
          <button
            class="w-full ipad-max:leading-[18px] h-[40px] bg-white text-tamkin rtl:space-x-reverse 
            space-x-[12px] py-2 rounded-[10px] font-[600] text-[10px] lg:leading-[40px] lg:text-[12px] 
            flex items-center justify-center px-[12px] whitespace-nowrap"
          
          >
            <div class="">Sign up to keep up with the latest news from us</div>
            <div>
              <img  src="/assets/imgs/icons/nicemove.svg" class="w-[30px] h-[30px]"  />
            </div>
          </button>
        </div>
      </div>
      </div>

      <div class="space-y-[14px] mb-[32px]">
        <div class="">
          <h1
            class="text-center font-[500] text-[16px] lg:leading-[36px] leading-[20px] lg:text-[18px] dark:text-whiteTamkin"
          >
            Need help installing Tamkin ?
          </h1>
          <p
            class="text-center text-[14px] mt-[8px] text-[#A7A7A7] dark:text-whiteTamkin/90"
            style="line-height: 21px"
          >
            Our support team is help !
          </p>
        </div>
  
        <div
          class="lg:h-[60px] w-full bg-white dark:bg-tamkinDarkPrimary 
          flex p-[10px] rounded-[10px] items-center lg:flex-row flex-col justify-center lg:justify-between"
        >
          <div class="flex items-center rtl:space-x-reverse space-x-[-12px] flex-1">
            <template v-if="!getMembersLoading && members.length > 0">
              <div v-for="(member, index) in members" :key="index">
                <img v-if="member.user_image" :src="`https://tamkin.app/${member.user_image}`" class="w-10 h-10" />
                <div v-else class="avatar_img rounded-full bg-[#2dada3] text-[#fff] grid place-content-center select-none w-[40px] h-[40px]">
                  <span> {{ getAvatarLetters(member.first_name + ' ' + member.last_name) }} </span>
                </div>
              </div>
            </template>
            <img v-else-if="getMembersLoading" src="/assets/imgs/loading-green.svg" />
            <h6 class="text-[red] text-[12px]" v-else-if="!getMembersLoading && members.length == 0">No Members Founded</h6>
          </div>
          <div class="">
            <a
              href="#"
              class="text-tamkin leading-[10px] text-[12px] lg:leading-[21px] lg:text-[14px] lg:text-right text-center font-[500] underline"
              >Schedule ameeting Withnour support team</a
            >
          </div>
        </div>
      </div>
      <div class="">
        <h1
          class="text-center font-[500] mt-[43px] text-[#021328] dark:text-whiteTamkin text-[16px] lg:text-[24px] lg:leading-[36px] leading-[20px]"
        >
          Select your platform for a quick installation video
        </h1>
      </div>

      <section class=" w-full  mx-auto ">
        <div class="flex flex-col mb-[24px]">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="inline-block min-w-full  align-middle md:px-6 lg:px-8"
            >
              <div v-loading="getInstallationLoading" class="overflow-hidden rounded-[10px] bg-white  dark:bg-tamkinDarkPrimary" style="box-shadow: 0px 4px 24px 8px #51459F1A;">

                <div  class="flex items-center jutify-between">
                  <div class="w-2/4">
                    <div
                        class="text-[16px] font-[600] p-[16px] dark:text-whiteTamkin"
                        style="line-height: 16px"
                    >
                      Installation Guides
                    </div>
                  </div>

                  <div class="w-full lg:w-3/6 p-[16px]">
                    <div class="py-[17px] search_input">
                      <input
                          type="text"
                          class="input_dashboard_search w-full"
                          v-model="search"
                          placeholder="Search ..."
                      />
                      <div
                          class="absolute top-[40%] rtl:lg:right-0 rtl:right-[10px] ltr:lg:left-0 ltr:left-[10px] lg:top-[16px] lg:p-[16px]"
                      >
                        <img src="/assets/imgs/icons/search.svg" />
                      </div>
                      <div
                          v-if="isSearchfilled"
                          @click="clearInput"
                          class="absolute top-[12px] lg:top-[16px] right-0 p-[16px] cursor-pointer"
                      >
                        <img  src="/assets/imgs/icons/clear_search.svg"  />
                      </div>
                    </div>
                  </div>
                </div>

                <table v-if="filteredInstallationGuide.length > 0" class="min-w-full divide-y divide-gray-200 dark:divide-darkborder">
                <thead>
                </thead>
                <tbody class="bg-white dark:bg-tamkinDarkPrimary divide-y divide-gray-200 dark:divide-darkborder">
                  <tr class="flex items-center justify-between" v-for="(item, index) in filteredInstallationGuide" :key="index">
                    <td
                      class="flex items-center rtl:space-x-reverse space-x-[16px] px-4 py-4 text-[14px] font-[500] dark:text-whiteTamkin text-darkGrey"
                      style="line-height: 22.5px"
                    >
                      <div>
                        <img class="w-[28px] h-[30px] object-contain" :src="`https://tamkin.app/${item.icon}`" alt="">
                      </div>
                      <div> {{ item.title }} </div>
                    </td>
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div class="flex items-center gap-x-6">
                        <button
                          style="line-height: 22.5px"
                          class="btn__embed_table"
                          @click="openVideoLink(item.video_url)"
                        >
                          <div>
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                y="25"
                                width="25"
                                height="25"
                                rx="12.5"
                                transform="rotate(-90 0 25)"
                                    class="fill-[#F2F2F2] dark:fill-whiteTamkin"
                                fill-opacity="1"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.00021 17.4998C9.00026 17.6975 9.05893 17.8908 9.16881 18.0552C9.2787 18.2197 9.43486 18.3478 9.61756 18.4235C9.80026 18.4991 10.0013 18.5189 10.1952 18.4804C10.3892 18.4418 10.5674 18.3466 10.7072 18.2068L15.7072 13.2068C15.8947 13.0193 16 12.765 16 12.4998C16 12.2346 15.8947 11.9803 15.7072 11.7928L10.7072 6.79279C10.5674 6.65298 10.3892 6.55777 10.1952 6.5192C10.0013 6.48064 9.80026 6.50044 9.61756 6.57611C9.43486 6.65178 9.2787 6.77992 9.16881 6.94433C9.05893 7.10874 9.00026 7.30204 9.00021 7.49979V17.4998Z"
                                class="fill-[#585B5B] dark:fill-darkTamkin"
                              />
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
