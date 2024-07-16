<script lang="ts" setup>
const props = defineProps({
    message:String,
    hideIn:Number,
    top:String
})

const isVisible = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, props.hideIn);
});
</script>


<template>

    <div v-if="isVisible" class="mx-[50%] fixed  inset-0  z-[2000] w-[273px]  rounded-[5px]
     rtl:space-x-reverse space-x-[8px] h-[37px] bg-[#DAF3F1] flex items-center justify-start" :class="[top ? `top-[${top}]` : '']">
        <div class="rtl:pr-[16px] ltr:pl-[16px]" >
            <img  src="/assets/imgs/success_toast.svg" />
        </div>
        <div>
          <span class="text-[13px] font-[400] leading-[195.px]">{{message}}</span>
        </div>
      </div>

</template>