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

export const useCustomizeStore = defineStore("customize", {
  state: () => ({
    loadingData: false,
    currentColor: "#2dada3",
    initcurrentColor: "#2dada3",
    gradient1: "",
    initgradient1: "",
    gradient2: "",
    initgradient2: "",
    colorMode: "solid",
    initcolorMode: "solid",
    checkboxes: [] as Checkbox[],
    initialCheckboxes: [] as Checkbox[], // Store the initial state
    initialPositionDesktop: "postion1",
    initialPositionMobile: "postion2",
    buttonPositionDesktop: "postion1",
    buttonPositionMobile: "postion2",
    force_change_MainMenuCard: false,
    force_change_profileCards: false,
    buttonSizeSlider: 35,
    initbuttonSizeSlider: 35,
    buttonShapeSelector: "icon1",
    initbuttonShapeSelector: "icon1",
    selectedIcon: "",
    initselectedIcon: "",
    buttonIcons: [],
    widgetType: "full-widget",
    initwidgetType: "full-widget",
    AdjustMainMenuCardsCustomize: [] as Card[],
    initialCardsOrderCustomize: [] as Card[], // Store the initial cards order
    manageProfileCardsCustomize: [] as Card[], // Another draggable array
    initialManageProfileCardsCustomize: [] as Card[], // Initial order for the other draggable array
    switchButtonLocation: "desktop",
    forceChange_buttonShape: false,
    liveTranlsationButtonLocation: "default",
    initliveTranlsationButtonLocation: "default",
    currentShapeLiveTranslation: "option2",
    initcurrentShapeLiveTranslation: "option2",
    routeLeaveModal: false,
    accessibilityMode: "right",
    initaccessibilityMode: "right",
    languages: [
      {
        language_name: "Auto detect Language",
        language_code: "auto detect language",
      },
    ],
    selectedLang: {},
    initselectedLang: {},
  }),
  actions: {
    showSaveBeforeLeaveModal() {
      this.routeLeaveModal = !this.routeLeaveModal;
    },

    saveAndMove() {
      this.routeLeaveModal = false;
      return this.cancelAll();
    },
    selectLiveTranslationButtonLocation(location: string) {
      if (
        this.checkboxes.find(
          (val) =>
            val.name ===
              "acc-customize-translations-button-enable-live-site-translations-button" &&
            val.value === true
        )
      ) {
        this.liveTranlsationButtonLocation = location;
      }
    },

    initselectLiveTranslationButtonLocation(location: string) {
      if (
        this.initialCheckboxes.find(
          (val) =>
            val.name ===
              "acc-customize-translations-button-enable-live-site-translations-button" &&
            val.value === true
        )
      ) {
        this.initliveTranlsationButtonLocation = location;
      }
    },
    changeDefaultButtonShape(v: any) {
      if (
        this.checkboxes.find(
          (val) =>
            val.name ===
              "acc-customize-translations-button-enable-live-site-translations-button" &&
            val.value === true
        )
      ) {
        this.currentShapeLiveTranslation = v;
      }
    },
    initchangeDefaultButtonShape(v: any) {
      if (
        this.checkboxes.find(
          (val) =>
            val.name ===
              "acc-customize-translations-button-enable-live-site-translations-button" &&
            val.value === true
        )
      ) {
        this.initcurrentShapeLiveTranslation = v;
      }
    },
    selectWidgetType(v: string) {
      this.widgetType = v;
      if (this.widgetType !== "full-widget") {
        this.force_change_profileCards = true;
      } else {
        this.force_change_profileCards = false;
      }
    },
    changeButtonShape(shape: string, icon: string) {
      this.buttonShapeSelector = shape;
      this.selectedIcon = icon;
      if (shape !== "icon1") {
        this.forceChange_buttonShape = true;
      } else {
        this.forceChange_buttonShape = false;
      }
    },
    initializeCheckboxes(names: string[]) {
      this.checkboxes = names.map((name) => ({ name, value: false }));
      this.initialCheckboxes = JSON.parse(JSON.stringify(this.checkboxes)); // Deep copy the initial state
    },
    addCheckbox(name: string) {
      if (!this.checkboxes.some((checkbox) => checkbox.name === name)) {
        const newCheckbox = { name, value: false };
        this.checkboxes.push(newCheckbox);
        this.initialCheckboxes.push(newCheckbox);
      }
    },
    removeCheckbox(name: string) {
      this.checkboxes = this.checkboxes.filter(
        (checkbox) => checkbox.name !== name
      );
      this.initialCheckboxes = this.initialCheckboxes.filter(
        (checkbox) => checkbox.name !== name
      );
    },
    toggleCheckbox(name: string) {
      const checkbox = this.checkboxes.find(
        (checkbox) => checkbox.name === name
      );
      if (checkbox) {
        checkbox.value = !checkbox.value;
      }
    },
    setCheckboxValue(name: string, value: boolean) {
      const checkbox = this.checkboxes.find(
        (checkbox) => checkbox.name === name
      );
      if (checkbox) {
        checkbox.value = value;
      }
    },
    hasChanges() {
      return (
        JSON.stringify(this.checkboxes) !==
          JSON.stringify(this.initialCheckboxes) ||
        this.buttonPositionDesktop !== this.initialPositionDesktop ||
        this.buttonPositionMobile !== this.initialPositionMobile ||
        this.buttonShapeSelector !== this.initbuttonShapeSelector ||
        this.widgetType !== this.initwidgetType ||
        this.colorMode !== this.initcolorMode ||
        this.force_change_MainMenuCard ||
        this.force_change_profileCards ||
        this.initliveTranlsationButtonLocation !==
          this.liveTranlsationButtonLocation ||
        this.currentShapeLiveTranslation !==
          this.initcurrentShapeLiveTranslation ||
        this.initaccessibilityMode !== this.accessibilityMode ||
        this.selectedLang.language_code !== this.initselectedLang.language_code
      );
    },

    isChecked(name: string) {
      const checkbox = this.checkboxes.find(
        (checkbox) => checkbox.name === name
      );
      return checkbox ? checkbox.value : false;
    },
    addCardToArrayMenus(
      name: string,
      customArrayKey: keyof typeof this,
      description: string
    ) {
      const customArray = this[customArrayKey] as Card[];
      if (!customArray.some((card) => card.name === name)) {
        const newCard = { name, description, icon: "", checkboxId: "" };
        customArray.push(newCard);
      }
    },
    removeCardFromArrayMenus(name: string, customArrayKey: keyof typeof this) {
      this[customArrayKey] = (this[customArrayKey] as Card[]).filter(
        (card) => card.name !== name
      );
    },
    initializeCardsMenu(
      customArray: Card[],
      customArrayKey: keyof typeof this,
      initialOrderKey: keyof typeof this
    ) {
      this[customArrayKey] = customArray.map((card) => ({
        name: card.label,
        description: card.description,
        icon: `${card.name}.svg`,
        checkboxId: card.name,
        sort: card.sort,
      }));
      this[initialOrderKey] = JSON.parse(JSON.stringify(this[customArrayKey])); // Deep copy the initial state
    },
    onDragStart(initialOrderKey: keyof typeof this) {
      this[initialOrderKey] = JSON.parse(JSON.stringify(this[initialOrderKey]));

      // Store initial order
      // console.log('Initial order:', this[initialOrderKey]);
    },
    onDragChange(
      customArrayKey: keyof typeof this,
      initialOrderKey: keyof typeof this
    ) {
      const currentOrder = JSON.parse(JSON.stringify(this[customArrayKey])); // Ensure deep copy

      const isOrderChanged = !this.arraysEqual(
        this[initialOrderKey] as Card[],
        currentOrder as Card[]
      );

      if (customArrayKey === "AdjustMainMenuCardsCustomize") {
        this.force_change_MainMenuCard = isOrderChanged;
      }
      if (customArrayKey === "manageProfileCardsCustomize") {
        this.force_change_profileCards = isOrderChanged;
      }
    },
    onDragEnd(
      customArrayKey: keyof typeof this,
      initialOrderKey: keyof typeof this
    ) {
      const currentOrder = JSON.parse(JSON.stringify(this[customArrayKey])); // Ensure deep copy
      const isOrderChanged = !this.arraysEqual(
        this[initialOrderKey] as Card[],
        currentOrder as Card[]
      );

      currentOrder.forEach((el, index) => {
        el.sort = index + 1;
      });

      if (customArrayKey === "AdjustMainMenuCardsCustomize") {
        this.force_change_MainMenuCard = isOrderChanged;
        this.AdjustMainMenuCardsCustomize = currentOrder;
      }
      if (customArrayKey === "manageProfileCardsCustomize") {
        this.force_change_profileCards = isOrderChanged;
        this.manageProfileCardsCustomize = currentOrder;
      }
    },

    arraysEqual(a: Card[], b: Card[]) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (
          a[i].name !== b[i].name ||
          a[i].description !== b[i].description ||
          a[i].sort !== b[i].sort ||
          a[i].icon !== b[i].icon ||
          a[i].checkboxId !== b[i].checkboxId
        ) {
          return false;
        }
      }
      return true;
    },
    cancelAll() {
      this.force_change_MainMenuCard = false;
      this.force_change_profileCards = false;
      this.forceChange_buttonShape = false;
      this.currentColor = "#2DADA3";
      this.gradient1 = "";
      this.gradient2 = "";
      this.colorMode = "solid";
      this.buttonPositionDesktop = this.initialPositionDesktop;

      this.buttonPositionMobile = "top_left_mobile";
      this.buttonSizeSlider = "2";
      this.buttonShapeSelector = "type1";
      this.widgetType = "full-widget";
      this.currentColor = "#2dada3";
      this.gradient1 = "#2dada3";
      this.gradient2 = "#2dada3";
    },
    changebuttonPositionDesktop(position: string) {
      this.buttonPositionDesktop = position;
    },
    changebuttonPositionMobile(position: string) {
      this.buttonPositionMobile = position;
    },
    changeButtonMobileOrDesktop(v: string) {
      this.switchButtonLocation = v;
    },
    moveHideWidget(v: string) {
      this.accessibilityMode = v;
    },
    toggleInitialCheckbox(name: string) {
      const checkbox = this.initialCheckboxes.find(
        (checkbox) => checkbox.name === name
      );
      if (checkbox) {
        checkbox.value = !checkbox.value;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCustomizeStore, import.meta.hot));
}
