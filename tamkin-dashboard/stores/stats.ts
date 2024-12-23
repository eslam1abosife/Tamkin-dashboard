import { defineStore, acceptHMRUpdate } from "pinia";

interface Checkbox {
  name: string;
  value: boolean;
}

interface Card {
  name: string;
  description: string;
  icon: string;
  checkboxId: string;
}

export const useStatsStore = defineStore("stats", {
  state: () => ({
    force_change_profileCards: false,
    force_change_menuCards: false,
    routeLeaveModal: false,
    google_enabled: false,
    chartsData: [],
    functionStats: [],
    profileStats: [],
    liveTranslationStats: {},
    loadingStats: false,
    overviewStats: "",
    translation_quality: {},
    signLangFunctions: [],
    sign_languageStats: {},
    languages: [],
    pagesTranslated: [],
  }),
  actions: {
    showSaveBeforeLeaveModal() {
      this.routeLeaveModal = !this.routeLeaveModal;
    },

    saveAndMove() {
      this.routeLeaveModal = false;
      this.google_enabled = false;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStatsStore, import.meta.hot));
}
