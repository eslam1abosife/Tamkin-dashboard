<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie';
import AuthJson from '/assets/animation/log_in.json';
import shapeDown from '/assets/animation/shape_down.json';
import shapeUp from '/assets/animation/shape_up.json';
import { useWindowSize } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

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
    authWidth.value = 200;
    authHeight.value = 400;
  }    else if (newWidth === 1024) {
    authWidth.value = 200;
    authHeight.value = 400;

  }
  else {
    authWidth.value = 300;
    authHeight.value = 300;
  }
});

const layoutStore = useLayoutStore()
layoutStore.setLayout('auth')
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

</script>


<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">

  <div class=" mx-auto h-screen dark:bg-darkSecondary">
    <div class="grid grid-cols-12  lg:gap-[20px] ">

      <div
        class=" lg:block md:hidden hidden col-span-12 md:col-span-4 w-2/4 lg:col-span-6 fixed top-0 bottom-0 rtl:left-0 ltr:right-0 z-50 overflow-hidden  bg-gradient-to-b from-tamkinStart to-tamkinEnd  rtl:order-2 order-2 ">
        <Vue3Lottie :animationData="shapeDown" :height="200" :width="200"
          class="absolute 3xl:top-[85%] top-[75%] left-[85%]  " />
        <Vue3Lottie :animationData="shapeUp" :height="700" :width="500"
          class="absolute -top-[50%] left-[130px] 3xl:-top-[30%]  " />

        <div class="2xl:h-[4px] 2xl:w-[308px] lg:w-[100px] lg:h-[100px]">
          <Vue3Lottie :animationData="AuthJson" :width="authWidth" :height="authHeight"
            class="absolute inset-x-0 top-[50px] ipad-max:top-[40px]  " />

        </div>
        <div class="absolute bottom-0 w-full mb-4">

          <ul class="flex items-center justify-evenly rtl:flex-row-reverse">
            <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="https://tamkin.app/terms?_lang=en" target="_blank">{{
    $t('terms_of_use') }}</a></li>
            <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="https://tamkin.app/privacy-policy?_lang=en" target="_blank">{{
    $t('privacy_statement') }}</a></li>
            <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">{{
                $t('CookiePolicy') }}</a></li>


          </ul>
        </div>
      </div>
      <div
        class="ipad-max:max-w-[580px] ipad-max:p-3 mx-auto w-full max-w-[580px] 2xl:mt-0 ipad-max:mt-[0%]  dark:bg-darkSecondary 
        3xl:mt-[5%] col-span-12 md:col-span-12 lg:col-span-6 mt-[20px] order-1 rtl:order-1 relative">
        <NuxtPage class="dark:bg-darkSecondary" />
      <div>
        <AuthLanguageSwitcher :class="[isLinkActive('/auth/register')?'mt-[120px]' : isLinkActive('/auth/otp') ? 'mt-[60px]' :'mt-[40px]']" class=" mx-auto"/>
      </div>
      </div>
    </div>

  </div>

  </Html>
</template>