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

  const initialPlayer = reactive({
    contrast: false,
    background: null,
    position: '',
    visibility: null,
    playerPosition: ''
  });

  const player = reactive({
    contrast: false,
    background: null,
    position: '',
    visibility: null,
    playerPosition: ''
  });

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
      background: null,
      position: '',
      visibility: null,
      playerPosition: ''
    });
  };

  // Function to check if there are any unsaved changes to styles or player settings
  const hasChanges = computed(() => {
    return JSON.stringify(initialStyles) !== JSON.stringify(styles);
  });

  const hasChangesPlayer = computed(() => {
    return JSON.stringify(initialPlayer) !== JSON.stringify(player);
  });

  // New function to cancel changes (reset both styles and player to their initial values)
  const cancelChanges = () => {
    Object.assign(styles, JSON.parse(JSON.stringify(initialStyles))); // Reset styles to initial state
    Object.assign(player, JSON.parse(JSON.stringify(initialPlayer))); // Reset player to initial state
  };
const projectsAr = ref([])
const allLoaded = ref(null)
  // Return the state and functions
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
    allLoaded

  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTranslateStore, import.meta.hot));
}
