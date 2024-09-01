<script lang="ts" setup>
const route = useRoute()
const localePath = useLocalePath()
const  packagesStore = usePackgesStore()
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
const changeColorBasedOnCurrenttab = computed(()=>{
    return packagesStore.currentTab === 'Media'? 

    'bg-gradient-to-l from-[#403E3E] via-[#8878CD] to-[#2B2357]' : 
    packagesStore.currentTab === 'Documents' ?  'bg-[#0E4F7E]': 
    packagesStore.currentTab === 'Images' ?  'bg-gradient-to-l from-[#DBBFBB] via-[#1B71A2] to-[#1A756A]':
    packagesStore.currentTab === "Bundle"  ? 'bg-gradient-to-t  from-[#2DB9B0] to-[#343141] ':''

})



</script>

<template>


    <div class="h-[200px] w-full   relative flex items-start justify-center"
    :class="changeColorBasedOnCurrenttab"
    >
        <!-- <div class="absolute " >
          <img src="/imgs/moon.png" class="w-[203px] h-[203px]" alt="">
        </div> -->
     <!-- MEDIA IMAGES-->
     <div class="absolute left-0 bottom-[0]" v-if="packagesStore.currentTab === 'Media'">
        <img src="/imgs/media_vector_1.png" class="w-[110px] h-[120px]" alt="">
      </div>
      
    

    <div class="absolute right-[14px] inset-y-[30px]" v-if="packagesStore.currentTab === 'Media'">
      <img src="/imgs/media_vector_2.png" class="w-[195px] h-[165px]" alt="">
    </div>
     <!-- END OF MEDIA IMAGES-->

     <!-- START OF DOCUMENTS IMAGES-->
     <div class="absolute left-0 bottom-[0]" v-if="packagesStore.currentTab === 'Documents'">
        <img src="/imgs/docs_vector_1.png"  class="w-[231px] h-[194px]" alt="">
      </div>
      
    

    <div class="absolute right-[14px] inset-y-[10px]" v-if="packagesStore.currentTab === 'Documents'">
      <img src="/imgs/docs_vector_2.png" class="w-[147px] h-[171px]" alt="">
    </div>

     <!-- END OF DOCUMENTS IMAGES-->


     <!--- START OF IMAGES  -->
     <div class="absolute left-0 bottom-[0]" v-if="packagesStore.currentTab === 'Images'">
        <img src="/imgs/images_vector_1.png"  class="w-[194px] h-[163px]" alt="">
      </div>
      
    

    <div class="absolute right-[14px] inset-y-[20px]" v-if="packagesStore.currentTab === 'Images'">
      <img src="/imgs/images_vector_2.png" class="w-[212px] h-[178px]" alt="">
    </div>



     <!-- END OF IMAGES-->



    <!--- START OF Bundle  -->
    <div class="absolute left-[14px] bottom-[0]" v-if="packagesStore.currentTab === 'Bundle'">
        <img src="/imgs/bundle_vector_1.png"  class="w-[166px] h-[166px]" alt="">
      </div>
      
      <div class="absolute inset-x-auto inset-y-6" v-if="packagesStore.currentTab === 'Bundle'">
        <img src="/imgs/bundle_vector_2.png" class="w-[155px] h-[178px]" alt="">
      </div>

    <div class="absolute right-[14px] inset-y-[20px]" v-if="packagesStore.currentTab === 'Bundle'">
      <img src="/imgs/bundle_vector_3.png" class="w-[181px] h-[159px]" alt="">
    </div>



     <!-- END OF Bundle-->



       <div class="flex items-center justify-start flex-col my-[50px]">
        <div class="text-[20px] font-[600] leading-[32px] text-white">
          Tamkin Your Communication Journey 
    
    
        </div>
        <div class="flex items-center justify-center space-x-[22px] absolute bottom-0">
            <div
              :class="[isLinkActive('/packages') ? 'bg-[#FFFFFF61]/[38%]' : '']"
              @click="$router.push({ path: localePath('/packages') })"
              class="h-[57px] w-[100px] rounded-t-[10px] p-[10px] cursor-pointer space-y-[6px] flex items-center justify-center flex-col"
            >
              <div>
                <img src="/imgs/sign_lang.png" class="w-[28px] h-[17px]" alt="" />
              </div>
              <div class="text-[10px] font-[500] text-white">Sign language</div>
            </div>
    
            <div
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
            </div>
          </div>
       </div>
     
      </div>
</template>