<script lang="ts" setup>
import VCodeBlock from "@wdns/vue-code-block";
import { useCollapseStore } from "@/stores/collapse.js";
import { vOnClickOutside } from "@vueuse/components";
import { useModalManager } from '@/composables/useModalManager';

const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
const collapseStore = useCollapseStore();

const code = ref(true);
const advancedCode = ref(false);
const currentCode = ref(``);
const copyDone = ref(false);
const showAdancedCode = () => {
  if (!advancedCode.value) {
    code.value = false;
    advancedCode.value = true;

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
`;
  } else {
    code.value = true;
    advancedCode.value = false;

    currentCode.value = `const foo = 'bar';`;
  }
};

onBeforeMount(() => {
  currentCode.value = `const foo = 'bar';`;
  code.value = true;
});
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
const route = useRoute()
const isLinkActive = (path) => {
  return localePath(route.patj) === localePath(path);
};

const localePath = useLocalePath()

</script>

<template>
  <div>
    
    <div class=" bg-white dark:bg-tamkinDarkPrimary rounded-[10px] shadow-md -shadow-y-[1px] mt-[64px]"    v-if="isLinkActive('/overview')"   >
      <div
        class=" flex flex-col items-start justify-center ltr:ml-[15px] rtl:mr-[15px] divide-y "
      >
        <div
        
          class="bg-white dark:bg-tamkinDarkPrimary h-[87px] w-full rounded-[10px] flex items-center justify-start rtl:space-x-reverse space-x-[10px]"
        >
          <div>
            <img 
              src="/assets/imgs/overview/warning_overview.svg"
              class="w-[43px] h-[36px]"
              
            />
          </div>
          <div
          
            class="font-[400] lg:px-[24px] text-[12px] lg:text-[14px] leading-[28px] text-darkGrey  dark:text-whiteTamkin ml-auto"
          >
            Please add Tamkin's embed code to your site to enable Tamkin's PRO Widget
            and unlock the full potential of digital accessibility and ADA compliance
          </div>
        </div>
      </div>

    
    </div>
    <div
      class="mt-[30px] bg-white dark:bg-tamkinDarkPrimary rounded-[10px] px-[15px] relative shadow-md -shadow-y-[2px]"

    >
      <DashboardToastSuccess
        v-if="copyDone"
        :hideIn="2000"
        :message="'Copied to clipboard'"
      />

      <div class="flex items-start justify-start l pt-[24px]">
        <div>
          <h1 class="text-[18px] font-[500] leading-[30px]  dark:text-whiteTamkin ">Widget Embed Code</h1>
          <h2 class="text-left text-[14px] font-[400] leading-[28.5px] text-darkGrey  dark:text-whiteTamkin/90 ">
            Widget Embed Code allows you to easily integrate accessibility features into
            your website by adding a simple script to your site's HTML
          </h2>
        </div>
        <div
          @click.stop="collapseStore.collapseMenu('widget_embded_code')"
          v-on-click-outside="() => collapseStore.removeMenu('widget_embded_code')"
          :class="[
            collapseStore.menus.includes('widget_embded_code')
              ? 'active_notification !text-darkGrey'
              : '',
          ]"
          class="menu_button_control"
        >
          <svg
            width="18"
            height="5"
            viewBox="0 0 18 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            :class="[
              collapseStore.menus.includes('widget_embded_code')
                ? 'stroke-current !text-white !fill-white'
                : 'dark:text-white',
            ]"
          >
            <path
              d="M14 2.5C14 1.96957 14.2107 1.46086 14.5858 1.08579C14.9609 0.710714 15.4696 0.5 16 0.5C16.5304 0.5 17.0391 0.710714 17.4142 1.08579C17.7893 1.46086 18 1.96957 18 2.5C18 3.03043 17.7893 3.53914 17.4142 3.91421C17.0391 4.28929 16.5304 4.5 16 4.5C15.4696 4.5 14.9609 4.28929 14.5858 3.91421C14.2107 3.53914 14 3.03043 14 2.5ZM7 2.5C7 1.96957 7.21071 1.46086 7.58579 1.08579C7.96086 0.710714 8.46957 0.5 9 0.5C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5C8.46957 4.5 7.96086 4.28929 7.58579 3.91421C7.21071 3.53914 7 3.03043 7 2.5ZM0 2.5C0 1.96957 0.210714 1.46086 0.585786 1.08579C0.960859 0.710714 1.46957 0.5 2 0.5C2.53043 0.5 3.03914 0.710714 3.41421 1.08579C3.78929 1.46086 4 1.96957 4 2.5C4 3.03043 3.78929 3.53914 3.41421 3.91421C3.03914 4.28929 2.53043 4.5 2 4.5C1.46957 4.5 0.960859 4.28929 0.585786 3.91421C0.210714 3.53914 0 3.03043 0 2.5Z"
              fill="currentColor"
            />
          </svg>

          <div
            v-if="collapseStore.menus.includes('widget_embded_code')"
            style="box-shadow: 0px 2px 6px 0px #00000040 !important;"
            class="mini_SizeMenu"
          >
            <div
              class="mini_wrap"
              @click="collapseStore.collapseCard('widget_embded_code_card')"
            >
              <div>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                
                  >
                    <path d="M13.7754 10.937L18.4995 7"   class="dark:!stroke-white stroke-darkGrey"
                    stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M14.7207 7H18.5V10.1496" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.2241 13.063L6.5 17" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M10.2793 17.0002H6.5V13.8506" class="dark:!stroke-white stroke-darkGrey" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
              </div>
              <div class="text_mini">
                {{
                  !collapseStore.collapses.includes("widget_embded_code_card")
                    ? "Minisize"
                    : "Maxsize"
                }}
              </div>
            </div>

            <div class="arrow">
              <svg
              width="16"
              class=""
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="shadow-sm" x="0" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="1"
                    dy="1"
                    stdDeviation="1"
                    flood-color="rgba(0, 0, 0, 0.3)"
                  />
                </filter>
              </defs>
              <path
                d="M15.2266 7.80851C15.2266 10.0216 0.841317 15.4755 0.841317 15.4755V0.142578C0.841317 0.142578 15.2266 5.5954 15.2266 7.80851Z"
                class="fill-white dark:!fill-darkTamkin"
                filter="url(#shadow-sm)"
              />
            </svg>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col items-start justify-center  divide-y"
        v-if="!collapseStore.collapses.includes('widget_embded_code_card')"
      >
        <div class="w-full h-full rounded-[10px]">
          <div
            class="flex items-center lg:flex-row flex-col justify-center lg:space-y-0 space-y-[16px] lg:justify-between mt-[24px] 
            w-full"
            style="padding: 30px, 16px, 20px, 15px"
          >
            <button
              @click="showAdancedCode()"
              class="btn__icon__dashboard ipad-max:text-[12px] text-[14px]"
              style="background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%)"
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
              @click="openModal('shareModal','overview')"
              class="cursor-pointer ipad-max:text-[12px] border-[2px] rounded-lg border-transparent 
              bg-gradient-to-r from-[#2DADA3] to-[#71DAD2] group"
            >
              <div class="bg-white dark:bg-tamkinDarkPrimary  dark:text-whiteTamkin rounded-md flex items-center justify-center">
                <div class="rtl:pr-[16px] ltr:pl-[16px]">
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
                  class="h-[45px] btn px-4 py-2 rounded-md group-hover:bg-gradient-to-r text-[14px]
                   group-hover:to-tamkinStart group-hover:from-tamkinEnd group-hover:text-transparent group-hover:bg-clip-text"
                >
                  Share code with your team
                </button>
              </div>
            </div>

            <div
              @click="copyCode"
              class="cursor-pointer ipad-max:text-[12px] border-[2px] rounded-lg border-transparent bg-gradient-to-r 
              from-[#2DADA3] to-[#71DAD2] group"
            >
              <div class="bg-white dark:bg-tamkinDarkPrimary dark:text-whiteTamkin rounded-md flex items-center justify-center">
                <div class="rtl:pr-[16px] ltr:pl-[16px]">
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
                  class="h-[45px] px-4 py-2  text-[14px] rounded-md group-hover:bg-gradient-to-r group-hover:to-tamkinStart group-hover:from-tamkinEnd group-hover:text-transparent group-hover:bg-clip-text"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div class="mt-[24px] w-full min-h-[50px]">
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
              class="text-left font-[500] text-[12px] text-[#979897]  dark:text-whiteTamkin  mb-[30px] mt-[20px]"
              style="line-height: 23.4px"
            >
              Managing multiple sites for multiple clients ? Great! Make sure you use
              <span class="text-darkGrey">the same embed code</span> on all of your sites
              !
            </h2>
          </div>
        </div>
      </div>

 
    </div>

  </div>
</template>
