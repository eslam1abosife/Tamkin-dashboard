<script lang="ts" setup>
/*************  ✨ Codeium Command ⭐  *************/
/**
 * Smooth scroll to a given HTML element identified by its id.
 * @param {string} sectionId - The id of the HTML element to scroll to.
 */

/******  55bcfd51-c0a0-490c-9978-a570be36d288  *******/const props = defineProps({
    text:String
})

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
        <!-- You don't have any Audio Files 
You don't have any Live videos -->
        <div class="text-[14px] font-[500] text-[#878787] ">
            {{ text ? $t(text) : $t(`You don't have any videos`) }}
        </div>
        <div>
            <button          @click="scrollToSection('package')"   class="btn-dashboard hover_tamkin mt-[16px] w-[158px] !h-[40px]"
            >{{$t('Translate now')}}</button>
        </div>
            </div>

</template>