<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
});

const props = defineProps({
  maxWidth:String
})
</script>


<template>


<div class=" h-full mx-auto" >
  <div class="flex  items-center justify-center flex-col  ">
    <h1 class="text-center text-[24px] font-[500]" style="line-height: 43.2px;">
      Here’s your <span class="bg-clip-text text-transparent bg-embded-code-gradient">Embed code...</span>
    </h1>
    <p class="font-[400] text-[15px] text-center" style="line-height:22.5px;">
      Insert the following embed code at the beginning of your site's <head></head> tag, and you’re all set!
    </p>

    <div class="mt-[18px] w-full h-[132px] bg-whiteTamkin rounded-[10px]" >
      <div class="flex items-center justify-between mt-[30px] px-[15px]" style="padding:30px, 16px, 20px, 15px;">
        <button class=" w-[175px] h-[45px] rounded-[10px] p-[16px] text-white flex items-center" style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
">Advanced  View</button>
<button class=" w-[175px] h-[45px] rounded-[10px] p-[16px] text-white flex items-center" style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
">Advanced  View</button>
<button class=" w-[175px] h-[45px] rounded-[10px] p-[16px] text-white flex items-center" style="background: linear-gradient(180deg, #2DADA3 0%, #71DAD2 100%);
">Advanced  View</button>
      </div>
    </div>

  </div>
</div>
  
  

</template>