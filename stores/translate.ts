import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const useTranslateStore = defineStore('translate', () => {
  const signLanguageChecked = ref(false);
  const subtitleCheck = ref(true);
  const translateCheck = ref(true);
  const currentMode = ref('subtitles');
  const subMode = ref('');
  const changesOnSubTitles = ref(false);
  const pdfTextEdit = ref(false);
  const wordTextEdit = ref(false);
  const photoEditFooter = ref(false);
  const showProcessingFooter = ref(false);
const renameItem = ref({
  name: '',
  value:''
}) 
const loadingProjects = ref(true)
const currentTab = ref('')
  const styles = reactive({
    textAlign: 'center',
    color: '#ffff',
    fontStyle: 'normal',
    fontCap: 'none',
    lineHeight: 25,
    letterSpacing: 3,
    fontName: 'Poppins',
    size: '14px',
    lines: '2',
    underline:'normal',
    fontWeight:'normal',
    bg:'#00000',
    autoHighlight: {
      fontStyle: '',
      color: '',
      enabled: false
    }
  });

  // Initial state for resetting later
  const initialStyles = reactive({
    textAlign: 'center',
    color: '#ffff',
    fontStyle: 'normal',
    fontCap: 'none',
    lineHeight: 25,
    letterSpacing: 3,
    fontName: 'Poppins',
    size: '14px',
    lines: '2',
    underline:'normal',
    fontWeight:'normal',
    bg:'#00000',
    autoHighlight: {
      fontStyle: '',
      color: '',
      enabled: false
    }
  });

  // Translation subtitles and player states
  const translationSubtitles = reactive({
    language: ''
  });
const internalPackages = ref([])
  const initialPlayer = ref();

  const player = ref();

  // Function to reset styles to their initial state
  const resetStyles = () => {
    Object.assign(styles, {
      textAlign: 'center',
      color: '#ffff',
      fontStyle: 'normal',
      fontCap: 'none',
      lineHeight: 25,
      letterSpacing: 3,
      fontName: 'Poppins',
      size: '14px',
      lines: '2',
      underline:'normal',
      fontWeight:'normal',
      bg:'#00000',
      autoHighlight: {
        fontStyle: '',
        color: '',
        enabled: false
      }
    });
  };

  // Function to reset player configuration to its initial state
  const resetPlayer = () => {
    Object.assign(player, {
      contrast: false,
      background: 0.5,
      position: 'right',
      visibility: true,
      playerPosition: 'inVideo'
    });
  };

  // const 
  const assignNewPlayer = ()=>{
    // Object.assign(player, {
    //   contrast: videoProject.value.player_settings[0].contrast,
    //   background: Number(videoProject.value.player_settings[0].background),
    //   position: videoProject.value.player_settings[0].position,
    //   visibility: videoProject.value.player_settings[0].visibility,
    //   playerPosition: videoProject.value.player_settings[0].player_appearance_location
    // })
  }
  const hasChanges = computed(() => {
    return JSON.stringify(initialStyles) !== JSON.stringify(styles);
  });
  // const previoussettings = JSON.parse(JSON.stringify(player.val));

  const hasChangesPlayer = computed(() => {
    return JSON.stringify(initialPlayer.value) !== JSON.stringify(player.value);
  });

const cancelChanges = () => {
  Object.assign(player.value, JSON.parse(JSON.stringify(initialPlayer.value))); 
};
const processingrq = ref(false)
const projectsAr = ref([])
const allLoaded = ref(null)
const videoCount = ref()
const audioCount = ref()
const liveCount = ref()
const pdfCount = ref()
const docxCount = ref()
const statsPackage = ref()
const currentApp = ref()
const usedCredit = ref({})
const usedCreditDocs = ref({})
const loadingPackage = ref(false)
const photoscount = ref()
const photoProject = ref()
const loadingProject = ref(true)
const videoProject = ref()
  return {
    signLanguageChecked,
    changesOnSubTitles,
    pdfTextEdit,
    wordTextEdit,
    photoEditFooter,
    styles,
    translateCheck,
    showProcessingFooter,
    translationSubtitles,
    player,
    resetPlayer,
    currentMode,
    subtitleCheck,
    subMode,
    resetStyles,
    hasChanges,
    initialPlayer,
    hasChangesPlayer,
    cancelChanges ,renameItem,
    currentTab,
    projectsAr,
    allLoaded,
    loadingProjects,
    videoCount,
audioCount,
liveCount,
internalPackages,
statsPackage,
currentApp,
usedCredit,
loadingPackage,
usedCreditDocs,
pdfCount,
 docxCount,
 photoscount,
 photoProject,
 loadingProject,
 videoProject,
 assignNewPlayer,
 processingrq

  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTranslateStore, import.meta.hot));
}
