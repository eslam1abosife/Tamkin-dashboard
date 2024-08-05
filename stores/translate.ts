import { defineStore } from 'pinia';
import { ref, reactive, computed } from 'vue';

export const useTranslateStore = defineStore('translate', () => {
  const signLanguageChecked = ref(false);
  const subtitleCheck = ref(false)
  const currentMode = ref('subtitles');
  const subMode = ref('');
  
  const styles = reactive({
    textAlign: '',
    color: '',
    fontStyle: '',
    fontCap: '',
    lineHeight: 20,
    letterSpacing: 20,
    fontName: '',
    size: '',
    lines: '',
    autoHighlight: {
      fontStyle: '',
      color: '',
      enabled: false
    }
  });
  
  const initialStyles = reactive({
    textAlign: '',
    color: '',
    fontStyle: '',
    fontCap: '',
    lineHeight: 20,
    letterSpacing: 20,
    fontName: '',
    size: '',
    lines: '',
    autoHighlight: {
      fontStyle: '',
      color: '',
      enabled: false
    }
  });

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

  const resetStyles = () => {
    Object.assign(styles, {
      textAlign: '',
      color: '',
      fontStyle: '',
      fontCap: '',
      lineHeight: 20,
      letterSpacing: 20,
      fontName: '',
      size: '',
      lines: '',
      autoHighlight: {
        fontStyle: '',
        color: '',
        enabled: false
      }
    });
  };
  const resetPlayer = () => {
    Object.assign(player,{
      contrast: false,
      background: null,
      position: '',
      visibility: null,
      playerPosition: ''
    });
  };
  const hasChanges = computed(() => {
    return JSON.stringify(initialStyles) !== JSON.stringify(styles);
  });
  const hasChangesPlayer = computed(() => {
    return JSON.stringify(initialPlayer) !== JSON.stringify(player);
  });
  return { signLanguageChecked, styles, translationSubtitles, player, resetPlayer,currentMode,subtitleCheck, subMode, resetStyles, hasChanges ,initialPlayer,hasChangesPlayer};
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTranslateStore, import.meta.hot));
}
