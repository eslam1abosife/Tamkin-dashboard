<script lang="ts" setup>
const editingMode = ref(false);
</script>

<template>
  <div
    class="bg-white/60 rounded-[10px] backdrop-blur-md h-auto flex flex-col items-start justify-center p-[15px] space-y-[10px] w-[329px] lg:mt-[-60px]"
  >
    <div class="flex items-center justify-between w-full">
      <div class="text-[14px] font-[500] text-black leading-[24px]">About</div>
      <div
        @click="editingMode = !editingMode"
        class="drop-shadow-md cursor-pointer bg-white w-[24px] h-[24px] rounded-full flex items-center justify-center"
      >
        <img src="/imgs/pencil.svg" alt="" />
      </div>
    </div>

    <div class="text-[12px] leading-[18px] text-black" v-if="!editingMode">
      Our company specializes in delivering innovative solutions, combining technology and
      creativity to enhance accessibility
    </div>

    <div class="w-full">
      <textarea
        v-if="editingMode"
        class="w-full  focus:border-tamkin focus:ring-0 text-[12px] text-black border !p-2 !m-0 border-gray-300 rounded-lg resize-none"
        rows="4"
        value="Our company specializes in delivering innovative solutions, combining technology and creativity to enhance accessibility"
      >
      </textarea>
    </div>
  </div>
</template>

<style></style>
