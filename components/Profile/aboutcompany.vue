<script lang="ts" setup>
const currentMode = inject('currentMode')
const profileStore = useProfileStore();

import { ref, reactive, inject } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required,maxLength } from '@vuelidate/validators';

// const currentMode = inject('currentMode');

const maxcha = (max) => (value) => {
  return value.length <= max || `The maximum length is ${max} characters.`;
};

const emit = defineEmits(['updateAbout'])

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

const updateAbout = ()=>{
  emit('updateAbout',state.about)
}
onMounted(() => {
  state.about = profileStore.company.about;
  profileStore.setAbout(state.about);

})

watch(() => state.about, (newValue) => {
  profileStore.setAbout(newValue);
})
</script>

<template>
  <div
    class="bg-white/60 rounded-[10px] ipad-max:w-full backdrop-blur-md h-auto flex flex-col items-start 
    justify-center p-[15px] space-y-[10px] w-full lg:mt-[-60px]"
  >
  <div class="flex items-start 2xl:space-x-[50px] lg:space-x-[16px] w-full ipad-max:space-x-[16px]">
    <div class="text-[14px] font-[500] text-black leading-[24px]">{{$t('About')}}</div>
    </div>

    <div class="w-full " style="overflow-wrap: break-word;" v-if="currentMode === 'normal'">
   <p class="text-[12px] leading-[18px] !whitespace-normal text-black ">   {{ profileStore.company.about }}</p>
    </div>

    <div class="w-full">
      <textarea
        v-if="currentMode === 'editing'"
        v-model="state.about"
        class="w-full  focus:border-tamkin focus:ring-0 text-[12px] text-black border !p-2 !m-0 border-gray-300 rounded-lg resize-none"
        rows="4"
        maxlength="120"
        :class="[v$.about.$error ? '!border-red-500' :'!border-tamkin']"
        @input="handleBlur"
        @blur="updateAbout"
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
