<script lang="ts"  setup>
import { Vue3Lottie } from 'vue3-lottie'

import AuthJson from '~/assets/animation/loader.json'


</script>

<template>
    <div>
      <div class="grid grid-cols-12 min-h-screen lg:gap-20">

        <div class="lg:block md:hidden hidden col-span-12 md:col-span-4 lg:col-span-6 w-full  relative top-0 bottom-0 right-0 overflow-y-hidden bg-gradient-to-b from-teal-500 to-teal-300 order-2 ml-auto">

          <div class="absolute bottom-0 w-full mb-4">

            <ul class="flex items-center justify-evenly">
              <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">Terms of use</a></li>
              <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">Privacy Policy</a></li>
              <li class="text-white transition-all ease-in-out hover:-translate-y-1 hover:underline"><a href="">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div class="col-span-12 md:col-span-12 lg:col-span-6 mt-[20%]  xl:mt-3 lg:ml-[46px] mx-auto lg:p-0 p-3 order-1 w-full">
          <NuxtPage/>
        </div>
      </div>
      
    </div>
  </template>

  