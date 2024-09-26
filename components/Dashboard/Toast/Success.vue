<script lang="ts" setup>
const props = defineProps({
  message: String,
  hideIn: Number,
  top: String,
  type: String,
  positionX:String
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

    class=" fixed inset-0 z-[99999] top-[70px] w-full max-w-[30%] rounded-[5px] max-h-[50px] h-auto flex items-center 
    justify-start"
    :class="[
      type === 'success'
        ? 'bg-[#DAF3F1]'
        : type === 'error'
        ? 'bg-red-600 !text-white'
        : type === 'warning'
        ? 'bg-orange-300'
        : 'bg-[#DAF3F1]',

    ]"
    :style="{
      insetInline: props.positionX ? props.positionX : '50%',
      transform: props.positionX   ? '' : useNuxtApp().$i18n.locale.value === 'ar' ? 'translateX(50%)' : 'translateX(-30%)'
    }"
  >
    <div class="px-[8px]" v-if="type === 'success' || !type">
      <img src="/assets/imgs/success_toast.svg" />
    </div>
    <div class="px-[8px] mt-[2px]" v-if="type === 'warning'">
      <svg
        class="w-[18px] h-[18px]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    </div>
    <div class="px-[8px] mt-[2px]" v-if="type === 'error'">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-[18px] h-[18px]"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </div>
    <div class="w-full">
      <div class="text-[13px] font-[400] whitespace-pre-line ">{{ message }}</div>
    </div>
  </div>
</template>
