<script lang="ts" setup>
const props = defineProps({
    message: String,
    hideIn: Number,
    top: String
});
const isVisible = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, props.hideIn);
});



</script>

<template>
  <div 
    v-if="isVisible" 
  
    class="!inset-x-[50%] fixed inset-0 z-[2000] top-[70px] w-[300px] rounded-[5px] h-[37px] bg-[#DAF3F1] flex items-center justify-start"
  >
    <div class="px-[8px]">
      <img src="/assets/imgs/success_toast.svg" />
    </div>
    <div>
      <span class="text-[13px] font-[400] whitespace-nowrap">{{ message }}</span>
    </div>
  </div>
</template>
