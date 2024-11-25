<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useDebounceFn } from '@vueuse/core'

const route = useRoute();
const localePath = useLocalePath();
const packagesStore = usePackgesStore();
const {currentTabTitle} = storeToRefs(packagesStore)

const router = useRouter()
const isLinkActive = (path: string) => {
if(process.client){
  
  const localizedPath = localePath(path); // Assuming you use i18n
    return route.path === localizedPath;
}
};
const gotolink = (link: string) => {
packagesStore.changeType(link)

  // packagesStore.selectedQuestion = ''
  // packagesStore.loadingData = true
  // packagesStore.loadingAccessibility = true
  // packagesStore.packages = []
    router.push({ path: localePath(getLinkbasedOnTitle(link)) })
     
        
}
const changeColor = computed(() => {
  // Determine the color based on the current page type
  const pageColor = packagesStore.currentType.title === 'Sign language'
    ? "bg-gradient-to-l from-[#055249] via-[#6D54D6] to-[#121061]"
    : packagesStore.currentType.title === 'Accessibility'
    ? "bg-gradient-to-br from-[#160F3B] to-[#1E40A9]"
    : packagesStore.currentType.title === 'Live Translation'
    ? "bg-[#0A433C]"
    : packagesStore.currentType.title === 'Investors'
    ? "bg-[#160430]"
    : packagesStore.currentType.title === 'Bundle'
    ? "bg-gradient-to-bl from-[#4840A8] via-[#326EA7] to-[#11B1A6]"
    : '';

  // Determine the color based on the current tab title
  const tabColor = packagesStore.currentTabTitle === 'Media'
    ? 'bg-gradient-to-l from-[#403E3E] via-[#8878CD] to-[#2B2357]'
    : packagesStore.currentTabTitle === 'Documents'
    ? 'bg-[#0E4F7E]'
    : packagesStore.currentTabTitle === 'Images'
    ? 'bg-gradient-to-l from-[#DBBFBB] via-[#1B71A2] to-[#1A756A]'
    : packagesStore.currentTabTitle === "Bundle"
    ? 'bg-gradient-to-t from-[#2DB9B0] to-[#343141]'
    : '';

  // Return the appropriate color based on the page and tab
  return packagesStore.currentType.title === 'Sign language'
    ? (packagesStore.currentTabTitle === 'Plugins' ?pageColor  : tabColor) // Use tab color if a tab is selected, otherwise use the page color
    : pageColor;
});

const debouncedGotolink = useDebounceFn(gotolink, 0) // 300ms debounce delay



const getLinkbasedOnTitle = (type) => {
  switch(type.title) {
    case 'Accessibility': return '/packages/accessibility';
    case 'Live Translation': return '/packages/live-translation';
    case 'Investors': return '/packages/investors';
    case 'Bundle': return '/packages/bundle';
    case 'Sign language': return '/packages/';
    default: return '';
  }
};

onBeforeMount(async () => {
  // alert( isLinkActive("/packages/accessibility"))




});

const slugify = (title) => {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/[^a-z0-9\s-]/g, '') // Remove all non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
};

</script>




<template>
  <div
    class="h-[200px] w-full relative flex items-start justify-center"
    :class="changeColor"
  >

    <!--- SIGN LANG IAMGES-->
    <div class="absolute" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Plugins'">
      <img src="/imgs/moon.png" class="w-[203px] h-[203px]" alt="" />
    </div>
    <div class="absolute left-0 -top-4" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Plugins'">
      <img src="/imgs/lines_packages.png" class="w-[161px] h-[178px]" alt="" />
    </div>

    <div class="absolute left-0 bottom-0" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Plugins'">
      <img src="/imgs/package_hand.png" class="w-[149px] h-[84px]" alt="" />
    </div>
    <div class="absolute right-[14px] inset-y-[30px]" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Plugins'">
      <img src="/imgs/packages_hero.png" class="w-[174px] h-[154px]" alt="" />
    </div>

    <!---  SIGN LANG IAMGES-->

    <!-- accessibility  images-->
    <div
      class="absolute right-[14px] inset-y-[6px]"
      v-if="packagesStore.currentType.title === 'Accessibility'"
    >
      <img src="/imgs/access_vector_1.png" class="w-[222px] h-[194px]" alt="" />
    </div>
    <!-- accessibility  images-->

    <!-- LIVE TRANSLATION IMAGES-->
    <div
      class="absolute left-[-21px] top-[-70px]"
      v-if="packagesStore.currentType.title === 'Live Translation'"
    >
      <img src="/imgs/live_translation_vector_1.png" class="w-[200px] h-[300px]" alt="" />
    </div>

    <!-- LIVE TRANSLATION IMAGES-->

    <!-- INVESTORS  IMAGES-->
    <div class="absolute left-[-21px]" v-if="packagesStore.currentType.title === 'Investors'">
      <img src="/imgs/investors_vector_1.png" class="w-[228px] h-[200px]" alt="" />
    </div>
    <div class="absolute right-[-21px]" v-if="packagesStore.currentType.title === 'Investors'">
      <img src="/imgs/investor_vector_2.png" class="w-[228px] h-[200px]" alt="" />
    </div>
    <!--  INVESTORS IMAGES -->

        <!-- bundle  IMAGES-->
        <div class="absolute left-[50px]" v-if="packagesStore.currentType.title === 'Bundle'">
          <img src="/imgs/bundle_page_vector_1.png" class="w-[131px] h-[131px]" alt="" />
        </div>
        <div class="absolute right-[30px] inset-y-[30px]" v-if="packagesStore.currentType.title === 'Bundle'">
          <img src="/imgs/bundle_page_vector_3.png" class="w-[120px] h-[150px]" alt="" />
        </div>
        <div class="absolute inset-x-auto top-[16px]" v-if="packagesStore.currentType.title === 'Bundle'">
          <img src="/imgs/bundle_page_vector_2.png" class="w-[222px] h-[177px]" alt="" />
        </div>







        <div class="absolute left-0 bottom-[0]" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Media'">
          <img src="/imgs/media_vector_1.png" class="w-[110px] h-[120px]" alt="">
        </div>
        
      
  
      <div class="absolute right-[14px] inset-y-[30px]" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Media'">
        <img src="/imgs/media_vector_2.png" class="w-[195px] h-[165px]" alt="">
      </div>
       <!-- END OF MEDIA IMAGES-->
  
       <!-- START OF DOCUMENTS IMAGES-->
       <div class="absolute left-0 bottom-[0]" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Documents'">
          <img src="/imgs/docs_vector_1.png"  class="w-[231px] h-[194px]" alt="">
        </div>
        
      
  
      <div class="absolute right-[14px] inset-y-[10px]" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Documents'">
        <img src="/imgs/docs_vector_2.png" class="w-[147px] h-[171px]" alt="">
      </div>
  
       <!-- END OF DOCUMENTS IMAGES-->
  
  
       <!--- START OF IMAGES  -->
       <div class="absolute left-0 bottom-[0]" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Images'">
          <img src="/imgs/images_vector_1.png"  class="w-[194px] h-[163px]" alt="">
        </div>
        
      
  
      <div class="absolute right-[14px] inset-y-[20px]" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Images'">
        <img src="/imgs/images_vector_2.png" class="w-[212px] h-[178px]" alt="">
      </div>
  
  
  
       <!-- END OF IMAGES-->
  
  
  
      <!--- START OF Bundle  -->
      <div class="absolute left-[14px] bottom-[0]" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Bundle'">
          <img src="/imgs/bundle_vector_1.png"  class="w-[166px] h-[166px]" alt="">
        </div>
        
        <div class="absolute inset-x-auto inset-y-6" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Bundle'">
          <img src="/imgs/bundle_vector_2.png" class="w-[155px] h-[178px]" alt="">
        </div>
  
      <div class="absolute right-[14px] inset-y-[20px]" v-if="packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle === 'Bundle'">
        <img src="/imgs/bundle_vector_3.png" class="w-[181px] h-[159px]" alt="">
      </div>
  
  
  



















        <!--  bundle IMAGES -->
    <div class="flex items-center justify-center flex-col my-[50px]">
      <div class="text-[20px] font-[600] leading-[32px] text-white">
        {{$t('Tamkin the bridge of communication between communities')}}
      </div>

      <div class="flex items-center justify-center rtl:space-x-reverse space-x-[22px] absolute bottom-0">
        <div v-for="linkPackage in packagesStore.types.filter(t=>t.title !== 'Live Translation').sort((a, b) => a.sort - b.sort)" :key="linkPackage.name"
          :class="[packagesStore.currentType.title === linkPackage.title ? 'bg-[#FFFFFF61]/[38%]' : '']"
          @click="debouncedGotolink(linkPackage)"
          class="h-[57px] w-[110px] rounded-t-[10px]  cursor-pointer space-y-[6px] flex items-center justify-center flex-col"
        >
          <div>
            <img :src="`https://tamkin.app/${linkPackage.icon}`" class="w-[28px] h-[17px]" alt="" />
          </div>
          <div class="text-[12px] font-[500] text-white">{{$t(linkPackage.title)}}</div>
        
        </div>

        <!-- <div
          :class="[isLinkActive('/packages/accessibility') ? 'bg-[#FFFFFF61]/[38%]' : '']"
          @click="$router.push({ path: localePath('/packages/accessibility') })"
          class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px] flex items-center justify-center flex-col"
        >
          <div>
            <img src="/imgs/access.png" class="w-[17px] h-[16px]" alt="" />
          </div>
          <div class="text-[10px] font-[500] text-white">Accessibility</div>
        </div>

        <div
          :class="[
            isLinkActive('/packages/live-translation') ? 'bg-[#FFFFFF61]/[38%]' : '',
          ]"
          @click="$router.push({ path: localePath('/packages/live-translation') })"
          class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px] flex items-center justify-center flex-col"
        >
          <div>
            <img src="/imgs/live_Translation.png" class="w-[23px] h-[16px]" alt="" />
          </div>
          <div class="text-[10px] font-[500] text-white">Live Translation</div>
        </div>

        <div
          :class="[isLinkActive('/packages/investors') ? 'bg-[#FFFFFF61]/[38%]' : '']"
          @click="$router.push({ path: localePath('/packages/investors') })"
          class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px] flex items-center justify-center flex-col"
        >
          <div>
            <img src="/imgs/investors.png" class="w-[18px] h-[18px]" alt="" />
          </div>
          <div class="text-[10px] font-[500] text-white">Investors</div>
        </div>
        <div
         :class="[isLinkActive('/packages/bundle') ? 'bg-[#FFFFFF61]/[38%]' : '']"
          @click="$router.push({ path: localePath('/packages/bundle') })"
          class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px] flex items-center justify-center flex-col"
        >
          <div>
            <img src="/imgs/bundle.png" class="w-[16px] h-[18px]" alt="" />
          </div>
          <div class="text-[10px] font-[500] text-white">Bundle</div>
        </div> -->
        
      </div>
      
    </div>
  </div>
</template>
