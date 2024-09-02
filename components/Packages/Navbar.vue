<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const localePath = useLocalePath();
const packagesStore = usePackgesStore();
const {currentTabTitle} = storeToRefs(packagesStore)

const router = useRouter()
const gotolink = (link: string) => {
  packagesStore.currentType = link

        if(packagesStore.currentType.title === 'Sign language' && packagesStore.currentTabTitle !== 'Plugins'){
            packagesStore.selectedQuestion = ''
            packagesStore.showNavbar = false
        }else {
          packagesStore.currentType = link
            packagesStore.selectedQuestion = ''
            packagesStore.showNavbar = true
        }
  router.push({ path: localePath(getLinkbasedOnTitle(link)) })
            
        
}
const changeColorBasedOnCurrentPage = computed(() => {
  return isLinkActive("/packages")
    ? "bg-gradient-to-l from-[#055249] via-[#6D54D6] to-[#121061]"
    : isLinkActive("/packages/accessibility")
    ? "bg-gradient-to-br from-[#160F3B] to-[#1E40A9] "
    : isLinkActive("/packages/live-translation")
    ? "bg-[#0A433C]"
    : isLinkActive("/packages/investors")
    ? "bg-[#160430]"
    :  isLinkActive("/packages/bundle")
    ?  "bg-gradient-to-bl from-[#4840A8]  via-[#326EA7] to-[#11B1A6] "
    : ''
});




const isLinkActive = (path: string) => {
  const currentPath = route.path;
  const localizedPath = localePath(path);

  // Compare the current path with the localized path
  return currentPath === localizedPath;
};

const getLinkbasedOnTitle = (type: { title: string }) => {
  switch(type.title) {
    case 'Accessibility': return '/packages/accessibility';
    case 'Live Translation': return '/packages/live-translation';
    case 'Investors': return '/packages/investors';
    case 'Bundle': return '/packages/bundle';
    case 'Sign language': return '/packages/';
    default: return '';
  }
};

onMounted(() => {
  // alert( isLinkActive("/packages/accessibility"))
});

</script>




<template>
  <div
    class="h-[200px] w-full relative flex items-start justify-center"
    :class="changeColorBasedOnCurrentPage"
  >

    <!--- SIGN LANG IAMGES-->
    <div class="absolute" v-if="isLinkActive('/packages')">
      <img src="/imgs/moon.png" class="w-[203px] h-[203px]" alt="" />
    </div>
    <div class="absolute left-0 -top-4" v-if="isLinkActive('/packages')">
      <img src="/imgs/lines_packages.png" class="w-[161px] h-[178px]" alt="" />
    </div>

    <div class="absolute left-0 bottom-0" v-if="isLinkActive('/packages')">
      <img src="/imgs/package_hand.png" class="w-[149px] h-[84px]" alt="" />
    </div>
    <div class="absolute right-[14px] inset-y-[30px]" v-if="isLinkActive('/packages')">
      <img src="/imgs/packages_hero.png" class="w-[174px] h-[154px]" alt="" />
    </div>

    <!---  SIGN LANG IAMGES-->

    <!-- accessibility  images-->
    <div
      class="absolute right-[14px] inset-y-[6px]"
      v-if="isLinkActive('/packages/accessibility')"
    >
      <img src="/imgs/access_vector_1.png" class="w-[222px] h-[194px]" alt="" />
    </div>
    <!-- accessibility  images-->

    <!-- LIVE TRANSLATION IMAGES-->
    <div
      class="absolute left-[-21px] top-[-70px]"
      v-if="isLinkActive('/packages/live-translation')"
    >
      <img src="/imgs/live_translation_vector_1.png" class="w-[200px] h-[300px]" alt="" />
    </div>

    <!-- LIVE TRANSLATION IMAGES-->

    <!-- INVESTORS  IMAGES-->
    <div class="absolute left-[-21px]" v-if="isLinkActive('/packages/investors')">
      <img src="/imgs/investors_vector_1.png" class="w-[228px] h-[200px]" alt="" />
    </div>
    <div class="absolute right-[-21px]" v-if="isLinkActive('/packages/investors')">
      <img src="/imgs/investor_vector_2.png" class="w-[228px] h-[200px]" alt="" />
    </div>
    <!--  INVESTORS IMAGES -->

        <!-- bundle  IMAGES-->
        <div class="absolute left-[50px]" v-if="isLinkActive('/packages/bundle')">
          <img src="/imgs/bundle_page_vector_1.png" class="w-[131px] h-[131px]" alt="" />
        </div>
        <div class="absolute right-[30px] inset-y-[30px]" v-if="isLinkActive('/packages/bundle')">
          <img src="/imgs/bundle_page_vector_3.png" class="w-[120px] h-[150px]" alt="" />
        </div>
        <div class="absolute inset-x-auto top-[16px]" v-if="isLinkActive('/packages/bundle')">
          <img src="/imgs/bundle_page_vector_2.png" class="w-[222px] h-[177px]" alt="" />
        </div>
        <!--  bundle IMAGES -->
    <div class="flex items-center justify-center flex-col my-[50px]">
      <div class="text-[20px] font-[600] leading-[32px] text-white">
        Tamkin Your Communication Journey
      </div>
      <div class="flex items-center justify-center space-x-[22px] absolute bottom-0">
        
        <div v-for="linkPackage in packagesStore.types" :key="linkPackage.name"
          :class="[isLinkActive(getLinkbasedOnTitle(linkPackage)) ? 'bg-[#FFFFFF61]/[38%]' : '']"
          @click.prevent="gotolink(linkPackage)"
          class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px] flex items-center justify-center flex-col"
        >
          <div>
            <img :src="`https://tamkin.app/${linkPackage.icon}`" class="w-[28px] h-[17px]" alt="" />
          </div>
          <div class="text-[10px] font-[500] text-white">{{linkPackage.title}}</div>
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
