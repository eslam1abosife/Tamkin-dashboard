<script lang="ts"  setup>
import { Vue3Lottie } from 'vue3-lottie'
import AuthJson from '~/assets/animation/log_in.json'
import shapeDown from '~/assets/animation/shape_down.json'
import shapeUp from '~/assets/animation/shape_up.json'

  const head = useLocaleHead({
    addDirAttribute: true,      
    addSeoAttributes: true,    
  })
  const htmlAttrs = computed(() => head.value.htmlAttrs!)



</script>

<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">

    <div >
      <div class="grid grid-cols-12 min-h-screen  gap-[20px]" >

        <div class="lg:block md:hidden hidden col-span-12 md:col-span-4 lg:col-span-6 w-full  relative top-0 bottom-0 right-0 overflow-hidden bg-gradient-to-b from-teal-500 to-teal-300   rtl:order-2 order-2 ">
          <Vue3Lottie :animationData="shapeDown" :height="200" :width="200" class="absolute 3xl:top-[85%] top-[75%] left-[85%]  " />
          <Vue3Lottie :animationData="shapeUp" :height="700" :width="500" class="absolute -top-[50%] left-[130px] 3xl:-top-[30%]  " />

          <div class="w-full h-full">
            <Vue3Lottie :animationData="AuthJson" :height="574" :width="308" class="absolute inset-0 top-[50px] 3xl:top-[200px]" />

          </div>
          <div class="absolute bottom-0 w-full mb-4">

            <ul class="flex items-center justify-evenly rtl:flex-row-reverse">
              <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">{{$t('terms_of_use')}}</a></li>
              <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">{{$t('privacy_statement')}}</a></li>
              <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">{{$t('CookiePolicy')}}</a></li>


            </ul>
          </div>
        </div>
        <div class="ipad-max:max-w-[400px] mx-auto w-full max-w-[580px] 2xl:mt-0 ipad-max:mt-[0%] 3xl:mt-[5%] col-span-12 md:col-span-12 lg:col-span-6 mt-[20px] order-1 rtl:order-1 ">
          <NuxtPage class=" "/>
        </div>
      </div>
      
    </div>
    </Html>
  </template>

  