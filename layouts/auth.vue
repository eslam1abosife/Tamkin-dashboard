<script lang="ts"  setup>
import { Vue3Lottie } from 'vue3-lottie'
import AuthJson from '~/assets/animation/loader.json'

  const head = useLocaleHead({
    addDirAttribute: true,      
    addSeoAttributes: true,    
  })
  const htmlAttrs = computed(() => head.value.htmlAttrs!)



</script>

<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">

    <div >
      <div class="grid grid-cols-12 min-h-screen lg:gap-20" >

        <div class="lg:block md:hidden hidden col-span-12 md:col-span-4 lg:col-span-6 w-full  relative top-0 bottom-0 right-0 overflow-y-hidden bg-gradient-to-b from-teal-500 to-teal-300  ml-auto rtl:order-2 order-2 ">

          <div class="absolute bottom-0 w-full mb-4">

            <ul class="flex items-center justify-evenly rtl:flex-row-reverse">
              <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">{{$t('terms_of_use')}}</a></li>
              <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">{{$t('privacy_statement')}}</a></li>
              <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">{{$t('CookiePolicy')}}</a></li>


            </ul>
          </div>
        </div>
        <div class="col-span-12 md:col-span-12 lg:col-span-6 mt-[20%]  xl:mt-3  mx-auto lg:p-0 p-3  w-full   order-1 rtl:order-1 ltr:lg:ml-[46px] rtl:lg:ml-[-46px]" >
          <NuxtPage/>
        </div>
      </div>
      
    </div>
    </Html>
  </template>

  