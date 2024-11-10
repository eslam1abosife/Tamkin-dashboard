<script setup>
import { computed, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLocalePath } from '#imports'
const {locale} = useI18n()
const error = useError()
const layoutStore = useLayoutStore()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const isLinkActive = (path) => {
  const currentPath = localePath(route.path);
  
  const pattern = path.startsWith(`/${locale.value}`) ? path : localePath(path);

  if (!pattern.startsWith('/')) {
    pattern = '/' + pattern;
  }

  if (!pattern.includes('*')) {
    return currentPath === pattern;
  }

  const regexPattern = '^' + pattern.replace(/\*/g, '.*') + '$';
  const regex = new RegExp(regexPattern);

  return regex.test(currentPath);
};


const currentLay = computed(() => layoutStore.currentLayout)

const goBack = () => {
  router.back()
}



onBeforeMount(() => {
  if (!isLinkActive('/auth/*') && !isLinkActive('/ar/auth/*')) {
    layoutStore.setLayout('dashboard')
  } else {
    layoutStore.setLayout(null) 
  }
})
</script>

<template>
  <div class="h-full w-full">
    <!-- Apply layout conditionally -->
    <NuxtLayout v-if="currentLay === 'dashboard'" name="dashboard">
      <!-- Dashboard specific layout content -->
      <div class="absolute top-[-20px] left-[-20px] h-[258px] w-[221px] bg-gradient-to-br from-[#651FFF]/20 rounded-full blur-3xl to-[#00BCD4]/20"></div>
      <div class="absolute top-[-100px] left-[350px] h-[258px] w-[221px] bg-gradient-to-br from-[#651FFF]/20 via-[#00E5FF]/20 rounded-full blur-3xl to-[#FF4081]/20"></div>
      <div class="absolute top-[-100px] left-[350px] h-[258px] w-[221px] bg-gradient-to-br from-[#D81B60]/20 via-[#84FFFF]/20 rounded-full blur-3xl to-[#311B92]/20"></div>
      <div class="absolute top-[-100px] right-[0] h-[258px] w-[221px] bg-gradient-to-br from-[#FF4081]/20 rounded-full blur-3xl to-[#F8BBD0]/20">
        <div class="absolute top-[-60px] right-[300px] h-[258px] w-[221px] bg-gradient-to-br from-[#FF4081]/20 rounded-full blur-3xl to-[#F8BBD0]/20"></div>
      </div>
      <div class="flex items-center justify-center h-full w-full mt-[100px]">
        <div class="flex items-center">
          <div class="rtl:ml-[30px] ltr:mr-[30px]">
            <img src="/imgs/notfound.png" class="w-[175px] h-[203px]" alt="Not Found">
          </div>
          <div class="flex flex-col items-start">
            <div class="bg-gradient-to-br from-[#B2EBF2] via-[#D1C4E9] to-[#F8BBD0] text-[68px] text-transparent bg-clip-text font-[800] mb-[20px]">
              {{ error.statusCode }}
            </div>
            <div class="text-[21px] font-[500] leading-[26px] text-black mb-[10px]">
              {{ error.statusCode === 404 ? $t('This page could not be found') : $t(error.message) }}
            </div>
            <div class="text-[14px] font-[500] leading-[21px] text-black">
              {{$t('You can either stay and chill here, or go back to the beginning.')}}
            </div>
            <button class="btn-dashboard hover_tamkin mt-[32px] max-w-[151px]" @click="goBack">{{$t('Go Back')}}</button>
          </div>
        </div>
      </div>
    </NuxtLayout>

    <div v-else class="relative" :class="{ 'bg-[#0D0725] h-screen': currentLay !== 'dashboard' }" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
      <div class="absolute top-[-20px] left-[-20px] h-[258px] w-[221px] bg-gradient-to-br from-[#651FFF]/20 rounded-full blur-3xl to-[#00BCD4]/20"></div>
      <div class="absolute top-[-100px] left-[350px] h-[258px] w-[221px] bg-gradient-to-br from-[#651FFF]/20 via-[#00E5FF]/20 rounded-full blur-3xl to-[#FF4081]/20"></div>
      <div class="absolute top-[-100px] left-[350px] h-[258px] w-[221px] bg-gradient-to-br from-[#D81B60]/20 via-[#84FFFF]/20 rounded-full blur-3xl to-[#311B92]/20"></div>
      <div class="absolute top-[-100px] right-[0] h-[258px] w-[221px] bg-gradient-to-br from-[#FF4081]/20 rounded-full blur-3xl to-[#F8BBD0]/20">
        <div class="absolute top-[-60px] right-[300px] h-[258px] w-[221px] bg-gradient-to-br from-[#FF4081]/20 rounded-full blur-3xl to-[#F8BBD0]/20"></div>
      </div>
      <div class="flex items-center justify-center h-full w-full">
        <div class="flex items-center justify-center space-x-[30px] rtl:space-x-reverse ">
          <div class=" " >
            <img src="/imgs/notfound.png" class="w-[175px] h-[203px]" alt="Not Found">
          </div>
          <div class="flex flex-col items-start ">
            <div class="bg-gradient-to-br from-[#B2EBF2] via-[#D1C4E9] to-[#F8BBD0] text-[68px] text-transparent bg-clip-text font-[800] mb-[20px]">
              {{ error.statusCode }}
        
            </div>
            <div class="text-[21px] text-whiteTamkin font-[500] leading-[26px] mb-[10px]">
              {{ error.statusCode === 404 ? 'This page could not be found' : $t(error.message) }}
            </div>
            <div class="text-[14px] text-whiteTamkin font-[500] leading-[21px]">
              {{ $t('You can either stay and chill here, or go back to the beginning.') }}
            </div>
            <button class="btn-dashboard hover_tamkin mt-[32px] max-w-[151px]" @click="goBack">{{$t('Go Back')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
