<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
const localePath =useLocalePath()
const {
  isOpen,
  currentView,
  openModal,
  closeModal,
  goBack,
  navigateTo,
} = useModalManager();
definePageMeta({
  layout: "dashboard",
middleware:['auth','permissions'],

});

const currentPlan = ref("freetrial");
const changePlan = (plan: string) => {
  currentPlan.value = plan;
};
const translateStore = useTranslateStore()
const {showProcessingFooter} = storeToRefs(translateStore)

const processingDone =ref(false)



const cancelFooterproccess = ()=>{
  translateStore.showProcessingFooter = false
  processingDone.value = false
}


watch(showProcessingFooter,(ov,nv)=>{
  if(showProcessingFooter.value === true){
setTimeout(()=>{

  processingDone.value = true
},2000)
  }
})


</script>

<template>
  <div class="w-full h-full relative">
 

    <div class=" mb-[16px]">
      <div class="flex items-center justify-between w-full">
        <h1
        class="ltr:text-left rtl:text-right text-[18px] font-[600] dark:text-whiteTamkin"
      >
        {{ $t('Translate video') }}
      </h1>

      </div>
      <h2 @click="$router.push(localePath('/translate'))"
        class="cursor-pointer ltr:text-left rtl:text-right text-[14px] font-[400] dark:text-whiteTamkin/90 text-darkGrey"
      >
      {{ $t('Media services') }}
      </h2>
    </div>
    <transition name="slide-up">
      <Processingfooter :done="processingDone" :showFooter="showProcessingFooter" @cancel_action="cancelFooterproccess"/>

    </transition>
<TranslateProjectProjectsettings/>
    <TranslateStats
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslatePlanCard
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslateTable />
  </div>
</template>
