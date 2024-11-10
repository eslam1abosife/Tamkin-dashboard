<script lang="ts" setup>
import { useModalManager } from '@/composables/useModalManager';
import { useGetProject } from '@/composables/useInternal';
import { usePlayerSettings } from '@/composables/useInternal';
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useNuxtApp } from '#app';
import { useRoute } from 'vue-router';
// useHead({
//   link: [
//     { rel: 'stylesheet', href: 'https://cdn.tamkin.app/app.css' },
//   ],
//   script: [
//     { src: 'https://cdn.tamkin.app/runtime.js', defer: true },
//     { src: 'https://cdn.tamkin.app/app.js', defer: true },
//   ],
// });

const { setPlayerSettings } = usePlayerSettings();
const { getProject } = useGetProject();
const localePath = useLocalePath();

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
  middleware: ['auth', 'permissions'],
  requiredPermission: "sign-language-media",
});

const currentPlan = ref("freetrial");
const translateStore = useTranslateStore();
const { showProcessingFooter } = storeToRefs(translateStore);
const processingDone = ref(false);
const loadingFooter = ref(false);

const cancelFooterProcess = () => {
  translateStore.showProcessingFooter = false;
  processingDone.value = false;
};

watch(showProcessingFooter, (ov, nv) => {
  if (showProcessingFooter.value) {
    setTimeout(() => {
      processingDone.value = true;
    }, 2000);
  }
});

const showFooter = computed(() => {
  return translateStore.hasChangesPlayer && translateStore.currentMode === "player" && !processingDone.value;
});

const cancelFooter = () => {
  translateStore.cancelChanges()
//  translateStore.player = translateStore.initialPlayer
};

const route = useRoute();

const getProjectByName = async () => {
  const projectName = route.params.id;
  const d = await getProject(projectName);
  translateStore.videoProject = {
    ...d.project,
    stats: d.project_statistic,
  };
};

onBeforeMount(async () => {
  initializePlayerSettings();

  translateStore.loadingProject = false;
});
const { data: projectData, error } = await useAsyncData('projectData', async () => {
  return await getProjectByName();
});
const initializePlayerSettings = () => {
  const defaultSettings = {
    contrast: false,
    background: 0.5,
    position: 'right',
    visibility: true,
    playerPosition: 'inVideo',
  };

  if (translateStore.videoProject && translateStore.videoProject.player_settings.length === 0) {
    translateStore.player = { ...defaultSettings };
    translateStore.initialPlayer = { ...defaultSettings };
  } else {
    const playerSettings = translateStore.videoProject.player_settings[0];
    translateStore.player = {
      contrast: playerSettings.contrast,
      background: Number(playerSettings.background),
      position: playerSettings.position,
      visibility: playerSettings.visibility === 0 ? false : true,
      playerPosition: playerSettings.player_appearance_location,
    };

    translateStore.initialPlayer = { ...translateStore.player };
  }


};

const { $toast } = useNuxtApp();

const savePlayer = async () => {
  loadingFooter.value = true;

  const payload = {
    project: translateStore.videoProject.name,
    contrast: translateStore.player.contrast,
    background: translateStore.player.background,
    position: translateStore.player.position,
    visibility: translateStore.player.visibility,
    player_appearance_location: translateStore.player.playerPosition,
  };

  await setPlayerSettings(payload);
  await getProjectByName(); 

  initializePlayerSettings();

  $toast('Player settings saved successfully', { hideIn: 3000 });
  loadingFooter.value = false;
};
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

<div class="relative ">
  <KeepAlive>

  <TranslateProjectProjectsettings

/>
</KeepAlive>
<div  v-if="loadingFooter || translateStore.processingrq " class="absolute h-full w-full inset-0 opacity-30 !cursor-not-allowed bg-slate-300 rounded-[10px] pointer-events-none">

</div>
</div>


<TranslateStats
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslatePlanCard
      v-if="currentPlan === 'freetrial_expired' || currentPlan === 'pro'"
    />
    <TranslateTable type="Translate video"/>
    <transition name="slide-up">
 <SaveTranslateFooter :showFooter="showFooter" @save="savePlayer"  :loading="loadingFooter" @cancel_action="cancelFooter"/> 

    </transition>
  </div>
</template>
