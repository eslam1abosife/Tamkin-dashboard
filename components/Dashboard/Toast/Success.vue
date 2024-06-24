<script lang="ts" setup>
const props = defineProps({
    message:String,
    hideIn:Number,
    
})

const isVisible = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, props.hideIn);
});
</script>


<template>

    <div v-if="isVisible" class="lg:mx-0 mx-auto absolute  ipad-max:left-[22%] lg:left-[30%] 2xl:left-[32%] top-[-10px] z-[2000] w-[273px]  rounded-[5px]
     space-x-[8px] h-[37px] bg-[#DAF3F1] flex items-center justify-start">
        <div class="pl-[16px]" >
            <img src="/assets/imgs/success_toast.svg" alt="">
        </div>
        <div>
          <span class="text-[13px] font-[400] leading-[195.px]">{{message}}</span>
        </div>
      </div>

</template>