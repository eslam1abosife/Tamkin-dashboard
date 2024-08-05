<script lang="ts" setup>
const scrollToSection = (sectionId) =>{
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }

</script>


<template>
    <div class="flex flex-col items-center justify-center mt-[24px]">
        <div>
            <img src="/assets/imgs/translatevideo/no_vids.png" class="w-[100px] h-[100px]" alt="">
        </div>
        
        <div class="text-[14px] font-[500] text-[#878787] ">
            You don't have any videos
        </div>
        <div>
            <button          @click="scrollToSection('package')"   class="btn-dashboard hover_tamkin mt-[16px] w-[158px] !h-[40px]"
            >Translate now</button>
        </div>
            </div>

</template>