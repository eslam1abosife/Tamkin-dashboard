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
  label: string;
}

export const useSignLangStore = defineStore("signLanguage", {
  state: () => ({
    addonsPlugin: {},
    checkboxes: [] as Checkbox[],
    initialCheckboxes: [] as Checkbox[], // Store the initial state
    WebpluginsCards: [] as Card[],
    initialCardsOrder: [] as Card[], // Store the initial cards order
    manageProfileCards: [] as Card[], // Another draggable array
    initialManageProfileCards: [] as Card[], // Initial order for the other draggable array
    force_change_profileCards: false,
    force_change_menuCards: false,
    routeLeaveModal: false,
  }),
  actions: {
    showSaveBeforeLeaveModal() {
      this.routeLeaveModal = !this.routeLeaveModal;
    },

    saveAndMove() {
      this.routeLeaveModal = false;
    },
    initializeCheckboxes(names: string[]) {
      this.checkboxes = names.map((name) => ({ name}));
      this.initialCheckboxes = JSON.parse(JSON.stringify(this.checkboxes)); // Deep copy the initial state
    },
    isChecked(name: string) {
      const checkbox = this.checkboxes.find(
        (checkbox) => checkbox.name === name
      );
      return checkbox ? checkbox.value : false;
    },
    addCheckbox(name: string) {
      if (!this.checkboxes.some((checkbox) => checkbox.name === name)) {
        const newCheckbox = { name };
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
    toggleInitialCheckbox(name: string) {
      const checkbox = this.initialCheckboxes.find(
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
        JSON.stringify(this.initialCheckboxes)
      );
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
        name: card.name,
        description: card.description,
        icon: `${card.name}.png`,
        checkboxId: card.checkboxId,
      }));
      this[initialOrderKey] = JSON.parse(JSON.stringify(this[customArrayKey])); // Deep copy the initial state
    },
    onDragStart(initialOrderKey: keyof typeof this) {
      this[initialOrderKey] = JSON.parse(JSON.stringify(this[initialOrderKey])); // Store initial order
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
      // console.log('Current order:', currentOrder);
      // console.log('Order changed:', isOrderChanged);
      if (customArrayKey === "WebpluginsCards") {
        this.force_change_menuCards = isOrderChanged;
      }
      //   if(customArrayKey === 'manageProfileCards'){
      //     this.force_change_profileCards = isOrderChanged;

      //   }
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
      //   console.log('Current order:', currentOrder);
      //   console.log('Order changed:', isOrderChanged);
      this.force_change = isOrderChanged;
    },
    arraysEqual(a: Card[], b: Card[]) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (
          a[i].name !== b[i].name ||
          a[i].description !== b[i].description ||
          a[i].icon !== b[i].icon ||
          a[i].checkboxId !== b[i].checkboxId
        ) {
          return false;
        }
      }
      return true;
    },

    cancelAll() {
      // this.force_change_profileCards = false;
      // this.force_change_menuCards = false;
      this.checkboxes = this.initialCheckboxes;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSignLangStore, import.meta.hot));
}
