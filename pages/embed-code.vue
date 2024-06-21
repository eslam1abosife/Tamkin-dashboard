<script lang="ts" setup>
import VCodeBlock from "@wdns/vue-code-block";
import banner from 'assets/imgs/gradient_embded.png'
const code = ref(`const foo = 'bar';`);
definePageMeta({
  layout: "dashboard",
});
const props = defineProps({
  maxWidth: String,
});

import { useModalStore } from "@/stores/modal";
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
const { openShareModal } = useModalStore();
// const {showShareModal} = storeToRefs(modalStore)
</script>

<template>
  <div class="relative w-full">
    <div class="container mx-auto space-y-[32px] relative">
      <!-- <DashboardEmbedShareModal/>
    <div class="fixed z-[999] bg-black bg-opacity-70 h-screen w-full">   </div> -->

      <div class="flex items-center justify-center flex-col">
        <h1
          class="text-center text-[24px] font-[500]"
          style="line-height: 43.2px"
        >
          Here’s your
          <span class="bg-clip-text text-transparent bg-embded-code-gradient"
            >Embed code...</span
          >
        </h1>
        <p
          class="font-[400] text-[15px] text-center"
          style="line-height: 22.5px"
        >
          Insert the following embed code at the beginning of your site's
          <head></head> tag, and you’re all set!
        </p>

        <div class="mt-[18px] w-full h-full bg-whiteTamkin rounded-[10px]">
          <div
            class="flex items-center lg:flex-row flex-col justify-center lg:space-y-0 space-y-[16px] lg:justify-around mt-[30px] lg:px-[15px]"
            style="padding: 30px, 16px, 20px, 15px"
          >
            <button
              class="btn__icon__dashboard ipad-max:text-[12px]"
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
            <div
              class="ipad-max:text-[12px] border-[2px] rounded-lg border-transparent bg-gradient-to-r from-[#2DADA3] to-[#71DAD2]"
            >
              <div class="bg-white rounded-md flex items-center justify-center">
                <div class="pl-[16px]">
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
                  @click="openShareModal"
                  class="h-[45px] btn px-4 py-2 rounded-md hover:bg-gradient-to-r hover:to-tamkinStart hover:from-tamkinEnd hover:text-transparent hover:bg-clip-text"
                >
                  share code with your team
                </button>
              </div>
            </div>

            <div
              class="ipad-max:text-[12px] border-[2px] rounded-lg border-transparent bg-gradient-to-r from-[#2DADA3] to-[#71DAD2]"
            >
              <div class="bg-white rounded-md flex items-center justify-center">
                <div class="pl-[16px]">
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
                  class="h-[45px] px-4 py-2 rounded-md hover:bg-gradient-to-r hover:to-tamkinStart hover:from-tamkinEnd hover:text-transparent hover:bg-clip-text"
                >
                  copy
                </button>
              </div>
            </div>
          </div>

          <div class="mt-[36px] px-[15px] w-full min-h-[50px]">
            <Client-only>
              <VCodeBlock
                :code="code"
                highlightjs
                lang="javascript"
                theme="neon-bunny"
              />
            </Client-only>

            <h2
              class="text-center font-[500] text-[13px] text-[#979897] mb-[30px] mt-[20px]"
              style="line-height: 23.4px"
            >
              Managing multiple sites for multiple clients ? Great! Make sure
              you use <span class="text-darkGrey">the same embed code</span> on
              all of your sites !
            </h2>
          </div>
        </div>
      </div>

      <div
    :style="{ backgroundImage: `url(${banner})`}"
      style=" width:100%; height:100%;
  background-size:cover;


"
        class="max-w-full lg:max-h-[230px] w-full relative rounded-lg p-8 flex items-center justify-center lg:flex-row flex-col lg:space-x-[150px]"
      >
        <div
          class="relative lg:top-[-20px] 2xl:top-[-18px] h-full flex items-center justify-start"
        >
          <img
            src="/assets/imgs/icons/man.svg"
            alt="Man Icon"
            class="lg:w-[221px] lg:h-[265px] w-full h-auto lg:self-start lg:block hidden"
          />
        </div>
        <div class="text-center">
          <h1
            class="font-[600] text-[14px] lg:text-[20px] 2xl:text-[24px] font-[lato] text-black mb-4 lg:leading-[42px] leading-[18px]"
          >
            Would you like to have early access to the<br />
            platform?
          </h1>
          <div
            class="flex items-center justify-between bg-white py-2 lg:py-1 px-4 rounded-[15px] shadow-md space-x-4"
          >
            <div class="flex-1">
              <h1
                class="text-tamkin font-[500] lg:text-[12px] text-[11px] 2xl:text-[16px] lg:leading-[42px] leading-[14px]"
              >
                Sign up to keep up with the latest news from us
              </h1>
            </div>
            <div class="lg:w-auto lg:h-auto w-4 h-4">
              <img
                src="/assets/imgs/icons/nicemove.svg"
                alt="Sign up Icon"
                class=""
              />
            </div>
          </div>
        </div>
      </div>

      <div class="lg:space-y-[32px] space-y-[14px]">
        <h1
          class="text-center font-[500] text-[16px] lg:leading-[36px] leading-[20px] lg:text-[24px]"
        >
          Need help installing Tamkin ?
        </h1>
        <p
          class="lg:mt-[8px] text-center text-[14px] text-[#A7A7A7]"
          style="line-height: 21px"
        >
          Our support team is help !
        </p>

        <div
          class="lg:h-[60px] w-full bg-white flex p-[10px] rounded-[10px] items-center lg:flex-row flex-col justify-center lg:justify-between"
        >
          <div class="flex items-center space-x-[-20px] flex-1">
            <img src="/assets/imgs/icons/avatr1.svg" alt="" class="w-10 h-10" />
            <img src="/assets/imgs/icons/avatr1.svg" alt="" class="w-10 h-10" />
            <img src="/assets/imgs/icons/avatr1.svg" alt="" class="w-10 h-10" />
          </div>
          <div class="">
            <a
              href=""
              class="text-tamkin leading-[10px] text-[12px] lg:leading-[21px] lg:text-[14px] lg:text-right text-center font-[500] underline"
              >Schedule ameeting Withnour support team</a
            >
          </div>
        </div>
      </div>
      <div class="space-y-[32px]">
        <h1
          class="text-center font-[500] text-[#021328] text-[16px] lg:text-[24px] lg:leading-[36px] leading-[20px]"
        >
          Select your platform for a quick installation video
        </h1>
      </div>

      <section class="container px-4 mx-auto pb-[13px]">
        <div class="flex flex-col">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8"
            >
              <div class="overflow-hidden rounded-[10px] bg-white">
                <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <div class="flex items-center jutify-between">
                      <div class="w-2/4">
                        <div
                          class="text-[16px] font-[600] p-[16px]"
                          style="line-height: 16px"
                        >
                          Installation Guides
                        </div>
                      </div>

                      <div class="p-[16px] search_input w-3/6">
                        <input
                          type="text"
                          class="input_dashboard_search w-full"
                          placeholder="Search ..."
                        />
                        <div class="absolute top-[16px] p-[16px]">
                          <img src="/assets/imgs/icons/search.svg" alt="" />
                        </div>
                      </div>
                    </div>

                    <th scope="col" class="relative py-3.5 px-4">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr class="flex items-center justify-between">
                    <td
                      class="flex items-center space-x-[16px] px-4 py-4 text-[14px] font-[500] text-darkGrey"
                      style="line-height: 22.5px"
                    >
                      <div>
                        <svg
                          width="28"
                          height="31"
                          viewBox="0 0 28 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.4375 0.5H6.5625C2.93813 0.5 0 3.648 0 7.53125V23.4688C0 27.352 2.93813 30.5 6.5625 30.5H21.4375C25.0619 30.5 28 27.352 28 23.4688V7.53125C28 3.648 25.0619 0.5 21.4375 0.5Z"
                            fill="#0073AA"
                          />
                          <path
                            d="M4.61719 15.4996C4.61719 19.4787 6.77549 22.9175 9.90514 24.5471L5.42952 11.4085C4.89301 12.6957 4.61619 14.0898 4.61719 15.4996ZM20.3337 14.9923C20.3337 13.75 19.9172 12.8896 19.56 12.2199C19.0843 11.3918 18.6385 10.6906 18.6385 9.86254C18.6385 8.9384 19.2927 8.07824 20.2141 8.07824C20.2557 8.07824 20.2951 8.08375 20.3357 8.08621C18.6664 6.4477 16.4425 5.44727 13.9997 5.44727C10.722 5.44727 7.83807 7.24914 6.16047 9.97844C6.38053 9.98547 6.58802 9.99051 6.76422 9.99051C7.74564 9.99051 9.26475 9.86277 9.26475 9.86277C9.7705 9.8309 9.83022 10.6268 9.32491 10.6909C9.32491 10.6909 8.81664 10.755 8.25107 10.7868L11.6677 21.6756L13.721 15.0776L12.2592 10.7864C11.754 10.7547 11.2754 10.6906 11.2754 10.6906C10.7698 10.6588 10.829 9.83055 11.3347 9.86254C11.3347 9.86254 12.8841 9.99004 13.806 9.99004C14.7873 9.99004 16.3065 9.86254 16.3065 9.86254C16.8127 9.83055 16.8721 10.6265 16.3667 10.6906C16.3667 10.6906 15.8573 10.7547 15.2928 10.7864L18.6836 21.5928L19.6194 18.2421C20.0251 16.8516 20.3337 15.8529 20.3337 14.9923Z"
                            fill="white"
                          />
                          <path
                            d="M14.1647 16.3781L11.3496 25.1426C12.2103 25.4142 13.1029 25.5521 14.0001 25.5521C15.0613 25.5526 16.1148 25.3599 17.1157 24.9823C17.0897 24.9383 17.0674 24.892 17.049 24.8438L14.1647 16.3781ZM22.2329 10.6758C22.2755 11.0184 22.2967 11.3637 22.2961 11.7094C22.2961 12.7295 22.1182 13.8763 21.5826 15.3102L18.7167 24.1882C21.5061 22.4454 23.3823 19.2076 23.3823 15.499C23.3824 13.7511 22.9658 12.1076 22.2329 10.6758Z"
                            fill="white"
                          />
                          <path
                            d="M13.9998 3.78125C7.96906 3.78125 3.0625 9.03793 3.0625 15.4993C3.0625 21.9615 7.96906 27.2179 13.9998 27.2179C20.0302 27.2179 24.9375 21.9615 24.9375 15.4993C24.9373 9.03793 20.0302 3.78125 13.9998 3.78125ZM13.9998 26.6809C8.24556 26.6809 3.56398 21.6648 3.56398 15.4993C3.56398 9.33418 8.24545 4.31855 13.9998 4.31855C19.7537 4.31855 24.4349 9.33418 24.4349 15.4993C24.4349 21.6648 19.7537 26.6809 13.9998 26.6809Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div>WordPress</div>
                    </td>
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div class="flex items-center gap-x-6">
                        <button
                          style="line-height: 22.5px"
                          class="btn__embed_table"
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
                                fill="#F2F2F2"
                                fill-opacity="0.52"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.00021 17.4998C9.00026 17.6975 9.05893 17.8908 9.16881 18.0552C9.2787 18.2197 9.43486 18.3478 9.61756 18.4235C9.80026 18.4991 10.0013 18.5189 10.1952 18.4804C10.3892 18.4418 10.5674 18.3466 10.7072 18.2068L15.7072 13.2068C15.8947 13.0193 16 12.765 16 12.4998C16 12.2346 15.8947 11.9803 15.7072 11.7928L10.7072 6.79279C10.5674 6.65298 10.3892 6.55777 10.1952 6.5192C10.0013 6.48064 9.80026 6.50044 9.61756 6.57611C9.43486 6.65178 9.2787 6.77992 9.16881 6.94433C9.05893 7.10874 9.00026 7.30204 9.00021 7.49979V17.4998Z"
                                fill="#585B5B"
                              />
                            </svg>
                          </div>
                          <div>Installation Guides</div>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr class="flex items-center justify-between">
                    <td
                      class="flex items-center space-x-[16px] px-4 py-4 text-[14px] font-[500] text-darkGrey"
                      style="line-height: 22.5px"
                    >
                      <div>
                        <svg
                          width="28"
                          height="31"
                          viewBox="0 0 28 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.4375 0.5H6.5625C2.93813 0.5 0 3.648 0 7.53125V23.4688C0 27.352 2.93813 30.5 6.5625 30.5H21.4375C25.0619 30.5 28 27.352 28 23.4688V7.53125C28 3.648 25.0619 0.5 21.4375 0.5Z"
                            fill="#0073AA"
                          />
                          <path
                            d="M4.61719 15.4996C4.61719 19.4787 6.77549 22.9175 9.90514 24.5471L5.42952 11.4085C4.89301 12.6957 4.61619 14.0898 4.61719 15.4996ZM20.3337 14.9923C20.3337 13.75 19.9172 12.8896 19.56 12.2199C19.0843 11.3918 18.6385 10.6906 18.6385 9.86254C18.6385 8.9384 19.2927 8.07824 20.2141 8.07824C20.2557 8.07824 20.2951 8.08375 20.3357 8.08621C18.6664 6.4477 16.4425 5.44727 13.9997 5.44727C10.722 5.44727 7.83807 7.24914 6.16047 9.97844C6.38053 9.98547 6.58802 9.99051 6.76422 9.99051C7.74564 9.99051 9.26475 9.86277 9.26475 9.86277C9.7705 9.8309 9.83022 10.6268 9.32491 10.6909C9.32491 10.6909 8.81664 10.755 8.25107 10.7868L11.6677 21.6756L13.721 15.0776L12.2592 10.7864C11.754 10.7547 11.2754 10.6906 11.2754 10.6906C10.7698 10.6588 10.829 9.83055 11.3347 9.86254C11.3347 9.86254 12.8841 9.99004 13.806 9.99004C14.7873 9.99004 16.3065 9.86254 16.3065 9.86254C16.8127 9.83055 16.8721 10.6265 16.3667 10.6906C16.3667 10.6906 15.8573 10.7547 15.2928 10.7864L18.6836 21.5928L19.6194 18.2421C20.0251 16.8516 20.3337 15.8529 20.3337 14.9923Z"
                            fill="white"
                          />
                          <path
                            d="M14.1647 16.3781L11.3496 25.1426C12.2103 25.4142 13.1029 25.5521 14.0001 25.5521C15.0613 25.5526 16.1148 25.3599 17.1157 24.9823C17.0897 24.9383 17.0674 24.892 17.049 24.8438L14.1647 16.3781ZM22.2329 10.6758C22.2755 11.0184 22.2967 11.3637 22.2961 11.7094C22.2961 12.7295 22.1182 13.8763 21.5826 15.3102L18.7167 24.1882C21.5061 22.4454 23.3823 19.2076 23.3823 15.499C23.3824 13.7511 22.9658 12.1076 22.2329 10.6758Z"
                            fill="white"
                          />
                          <path
                            d="M13.9998 3.78125C7.96906 3.78125 3.0625 9.03793 3.0625 15.4993C3.0625 21.9615 7.96906 27.2179 13.9998 27.2179C20.0302 27.2179 24.9375 21.9615 24.9375 15.4993C24.9373 9.03793 20.0302 3.78125 13.9998 3.78125ZM13.9998 26.6809C8.24556 26.6809 3.56398 21.6648 3.56398 15.4993C3.56398 9.33418 8.24545 4.31855 13.9998 4.31855C19.7537 4.31855 24.4349 9.33418 24.4349 15.4993C24.4349 21.6648 19.7537 26.6809 13.9998 26.6809Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div>WordPress</div>
                    </td>
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div class="flex items-center gap-x-6">
                        <button
                          style="line-height: 22.5px"
                          class="btn__embed_table"
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
                                fill="#F2F2F2"
                                fill-opacity="0.52"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.00021 17.4998C9.00026 17.6975 9.05893 17.8908 9.16881 18.0552C9.2787 18.2197 9.43486 18.3478 9.61756 18.4235C9.80026 18.4991 10.0013 18.5189 10.1952 18.4804C10.3892 18.4418 10.5674 18.3466 10.7072 18.2068L15.7072 13.2068C15.8947 13.0193 16 12.765 16 12.4998C16 12.2346 15.8947 11.9803 15.7072 11.7928L10.7072 6.79279C10.5674 6.65298 10.3892 6.55777 10.1952 6.5192C10.0013 6.48064 9.80026 6.50044 9.61756 6.57611C9.43486 6.65178 9.2787 6.77992 9.16881 6.94433C9.05893 7.10874 9.00026 7.30204 9.00021 7.49979V17.4998Z"
                                fill="#585B5B"
                              />
                            </svg>
                          </div>
                          <div>Installation Guides</div>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr class="flex items-center justify-between">
                    <td
                      class="flex items-center space-x-[16px] px-4 py-4 text-[14px] font-[500] text-darkGrey"
                      style="line-height: 22.5px"
                    >
                      <div>
                        <svg
                          width="28"
                          height="31"
                          viewBox="0 0 28 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.4375 0.5H6.5625C2.93813 0.5 0 3.648 0 7.53125V23.4688C0 27.352 2.93813 30.5 6.5625 30.5H21.4375C25.0619 30.5 28 27.352 28 23.4688V7.53125C28 3.648 25.0619 0.5 21.4375 0.5Z"
                            fill="#0073AA"
                          />
                          <path
                            d="M4.61719 15.4996C4.61719 19.4787 6.77549 22.9175 9.90514 24.5471L5.42952 11.4085C4.89301 12.6957 4.61619 14.0898 4.61719 15.4996ZM20.3337 14.9923C20.3337 13.75 19.9172 12.8896 19.56 12.2199C19.0843 11.3918 18.6385 10.6906 18.6385 9.86254C18.6385 8.9384 19.2927 8.07824 20.2141 8.07824C20.2557 8.07824 20.2951 8.08375 20.3357 8.08621C18.6664 6.4477 16.4425 5.44727 13.9997 5.44727C10.722 5.44727 7.83807 7.24914 6.16047 9.97844C6.38053 9.98547 6.58802 9.99051 6.76422 9.99051C7.74564 9.99051 9.26475 9.86277 9.26475 9.86277C9.7705 9.8309 9.83022 10.6268 9.32491 10.6909C9.32491 10.6909 8.81664 10.755 8.25107 10.7868L11.6677 21.6756L13.721 15.0776L12.2592 10.7864C11.754 10.7547 11.2754 10.6906 11.2754 10.6906C10.7698 10.6588 10.829 9.83055 11.3347 9.86254C11.3347 9.86254 12.8841 9.99004 13.806 9.99004C14.7873 9.99004 16.3065 9.86254 16.3065 9.86254C16.8127 9.83055 16.8721 10.6265 16.3667 10.6906C16.3667 10.6906 15.8573 10.7547 15.2928 10.7864L18.6836 21.5928L19.6194 18.2421C20.0251 16.8516 20.3337 15.8529 20.3337 14.9923Z"
                            fill="white"
                          />
                          <path
                            d="M14.1647 16.3781L11.3496 25.1426C12.2103 25.4142 13.1029 25.5521 14.0001 25.5521C15.0613 25.5526 16.1148 25.3599 17.1157 24.9823C17.0897 24.9383 17.0674 24.892 17.049 24.8438L14.1647 16.3781ZM22.2329 10.6758C22.2755 11.0184 22.2967 11.3637 22.2961 11.7094C22.2961 12.7295 22.1182 13.8763 21.5826 15.3102L18.7167 24.1882C21.5061 22.4454 23.3823 19.2076 23.3823 15.499C23.3824 13.7511 22.9658 12.1076 22.2329 10.6758Z"
                            fill="white"
                          />
                          <path
                            d="M13.9998 3.78125C7.96906 3.78125 3.0625 9.03793 3.0625 15.4993C3.0625 21.9615 7.96906 27.2179 13.9998 27.2179C20.0302 27.2179 24.9375 21.9615 24.9375 15.4993C24.9373 9.03793 20.0302 3.78125 13.9998 3.78125ZM13.9998 26.6809C8.24556 26.6809 3.56398 21.6648 3.56398 15.4993C3.56398 9.33418 8.24545 4.31855 13.9998 4.31855C19.7537 4.31855 24.4349 9.33418 24.4349 15.4993C24.4349 21.6648 19.7537 26.6809 13.9998 26.6809Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div>WordPress</div>
                    </td>
                    <td class="px-4 py-4 text-sm whitespace-nowrap">
                      <div class="flex items-center gap-x-6">
                        <button
                          style="line-height: 22.5px"
                          class="btn__embed_table"
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
                                fill="#F2F2F2"
                                fill-opacity="0.52"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M9.00021 17.4998C9.00026 17.6975 9.05893 17.8908 9.16881 18.0552C9.2787 18.2197 9.43486 18.3478 9.61756 18.4235C9.80026 18.4991 10.0013 18.5189 10.1952 18.4804C10.3892 18.4418 10.5674 18.3466 10.7072 18.2068L15.7072 13.2068C15.8947 13.0193 16 12.765 16 12.4998C16 12.2346 15.8947 11.9803 15.7072 11.7928L10.7072 6.79279C10.5674 6.65298 10.3892 6.55777 10.1952 6.5192C10.0013 6.48064 9.80026 6.50044 9.61756 6.57611C9.43486 6.65178 9.2787 6.77992 9.16881 6.94433C9.05893 7.10874 9.00026 7.30204 9.00021 7.49979V17.4998Z"
                                fill="#585B5B"
                              />
                            </svg>
                          </div>
                          <div>Installation Guides</div>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<!-- <style src=""></style> -->
