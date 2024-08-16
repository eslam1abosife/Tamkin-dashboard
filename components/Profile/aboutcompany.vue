<script lang="ts" setup>
import { ref, reactive, inject } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required,maxLength } from '@vuelidate/validators';

const currentMode = inject('currentMode');

const maxcha = (max) => (value) => {
  return value.length <= max || `The maximum length is ${max} characters.`;
};

const state = reactive({
  about: '', // Initial state is empty
});

const rules = {
  about: { 
    required,
    maxLength: maxLength(120), 
  },
};

const v$ = useVuelidate(rules, state);

const handleBlur = () => {
  v$.value.$touch();
};
</script>

<template>
  <div
    class="bg-white/60 rounded-[10px] backdrop-blur-md h-auto flex flex-col items-start justify-center p-[15px] space-y-[10px] w-[329px] lg:mt-[-60px]"
  >
    <div class="flex items-center justify-between w-full">
      <div class="text-[14px] font-[500] text-black leading-[24px]">About</div>
    </div>

    <div class="text-[12px] leading-[18px] text-black" v-if="currentMode === 'normal'">
      Our company specializes in delivering innovative solutions, combining technology and
      creativity to enhance accessibility
    </div>

    <div class="w-full">
      <textarea
        v-if="currentMode === 'editing'"
        v-model="state.about" 
        class="w-full focus:border-tamkin focus:ring-0 text-[12px] text-black border 
        
        !p-2 !m-0 border-gray-300 rounded-lg resize-none"
        rows="4"
        maxlength="120"
        :class="[v$.about.$error ? '!border-red-500' :'!border-tamkin']"
        @input="handleBlur"
        placeholder="Type here..."
      ></textarea>

      <div v-if="v$.about.$error" class="text-red-500 text-[12px]">
        <span v-if="!v$.about.$pending && v$.about.$errors[0]">
          {{ v$.about.$errors[0].$message }}
        </span>
      </div>
    </div>
  </div>
</template>

<style></style>
