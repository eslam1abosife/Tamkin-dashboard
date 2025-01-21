<script lang="ts" setup>
import { Vue3Lottie } from "vue3-lottie";
import AuthJson from "/assets/animation/log_in.json";
import shapeDown from "/assets/animation/shape_down.json";
import shapeUp from "/assets/animation/shape_up.json";
import { useWindowSize } from "@vueuse/core";
import { computed, ref, watch } from "vue";

const { width, height } = useWindowSize();
const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
});
const htmlAttrs = computed(() => head.value.htmlAttrs!);

const authHeight = ref(500);
const authWidth = ref(500);

watch(width, (newWidth) => {
  if (newWidth >= 1280) {
    authWidth.value = 400;
    authHeight.value = 550;
  } else if (newWidth >= 768) {
    authWidth.value = 300;
    authHeight.value = 400;
  } else if (newWidth === 1024) {
    authWidth.value = 300;
    authHeight.value = 400;
  } else {
    authWidth.value = 300;
    authHeight.value = 300;
  }
});

const layoutStore = useLayoutStore();
layoutStore.setLayout("auth");
const localePath = useLocalePath();
const route = useRoute();
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);
  const pattern = localePath(path);

  // If the pattern does not contain a wildcard, do an exact match
  if (!pattern.includes("*")) {
    return currentPath === pattern;
  }

  // Convert wildcard pattern to regex
  const regex = new RegExp("^" + pattern.replace(/\/\*/g, ".*") + "$");

  return regex.test(currentPath);
};
const loadedfn = ref(false)
onMounted(() => {
  loadedfn.value = true
  // if(process.client ){
  //     window.$chatwoot.toggleBubbleVisibility("hide");
  //   window.$chatwoot.toggle("close");
  // }
});
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
</script>

<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">
    <div class="mx-auto min-h-screen dark:bg-darkTamkin relative">
      .
      <div class="vl-parent">
        <loading
          v-model:active="$langloader"
          :can-cancel="false"
          :is-full-page="true"
          opacity="0.9"
        >
          <template v-slot:default>
            <div class="flex items-center justify-center flex-col space-y-2">
              <!-- Your custom loader icon or content -->
              <img
                src="/assets/imgs/logo.png"
                alt="Loading..."
                class="w-full h-24"
              />

              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 text-gray-200 transition-all animate-spin gp dark:text-gray-600 fill-tamkin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </template></loading
        >
      </div>
      <div class="grid grid-cols-12 lg:gap-[20px]">

        <transition name="fade" mode="out-in">

        <div v-if="loadedfn"
          class="dark:[background:#383f4a;] lg:block md:hidden hidden col-span-12 md:col-span-4 w-2/4 lg:col-span-6 fixed top-0 bottom-0 rtl:left-0 ltr:right-0 z-50 overflow-hidden bg-gradient-to-b from-tamkinStart to-tamkinEnd rtl:order-2 order-2"
        >
          <Vue3Lottie
            :animationData="shapeDown"
            :height="200"
            :width="200"
            class="absolute 3xl:top-[85%] top-[75%] left-[85%]"
          />
          <Vue3Lottie
            :animationData="shapeUp"
            :height="700"
            :width="500"
            class="absolute -top-[50%] left-[130px] 3xl:-top-[30%]"
          />

          <div class="2xl:h-[4px] 2xl:w-[308px] lg:w-[100px] lg:h-[100px]">
            <Vue3Lottie
              :animationData="AuthJson"
              :width="authWidth"
              :height="authHeight"
              renderer="svg"
              class="absolute inset-x-0 top-[50px] ipad-max:top-[40px]"
            />
          </div>
          <div class="flex items-center justify-center">
            <div class="absolute bottom-0 w-full mb-4">
              <ul class="flex items-center justify-evenly rtl:flex-row-reverse">
                <li
                  class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"
                >
                  <a href="https://tamkin.app/terms?_lang=en" target="_blank">{{
                    $t("Terms of Use")
                  }}</a>
                </li>
                <li
                  class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"
                >
                  <a
                    href="https://tamkin.app/privacy-policy?_lang=en"
                    target="_blank"
                    >{{ $t("Privacy Statement") }}</a
                  >
                </li>
                <li
                  class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"
                >
                  <a href="">{{ $t("Cookie Policy") }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
 
      </transition>

        <transition name="fade" mode="out-in">

        <div v-if="loadedfn"
          class="ipad-max:max-w-[580px] ipad-max:p-3 mx-auto w-full max-w-[580px] 2xl:mt-0 ipad-max:mt-[0%] dark:bg-darkTamkin 3xl:mt-[5%] col-span-12 md:col-span-12 lg:col-span-6 mt-[20px] order-1 rtl:order-1 relative"
        >

          <NuxtPage class="dark:bg-darkTamkin" />

        </div>
      </transition>

        <div
          v-if="isLinkActive('/auth/login')"
          class="absolute bottom-[16px] ipad-max:bottom-[-100px] left-0 right-0 lg:rtl:right-[-50%] lg:ltr:right-[50%]"
          :class="[
            isLinkActive('/auth/register')
              ? '!bottom-[-50px] ipad-max:!bottom-[-180px]'
              : '',
          ]"
        >
          <AuthLanguageSwitcher class="mx-auto !z-50" />
        </div>
      </div>
    </div>
  </Html>
</template>


<style >
/* Scoped fade transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>