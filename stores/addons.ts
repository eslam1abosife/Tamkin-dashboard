import { useSignLangStore } from './signlang';
import { defineStore, acceptHMRUpdate } from 'pinia';

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

export const useAddonStore = defineStore('addon', {
  state: () => ({
    checkboxes: [] as Checkbox[],
    initialCheckboxes: [] as Checkbox[], // Store the initial state
    AdjustMainMenuCards: [] as Card[],
    initialCardsOrder: [] as Card[], // Store the initial cards order
    manageProfileCards: [] as Card[], // Another draggable array
    initialManageProfileCards: [] as Card[], // Initial order for the other draggable array
    force_change_profileCards : false,
    force_change_menuCards : false,
    routeLeaveModal:false,
    title:[],
    checkboxIds:[],
    originalFeatures:[],
  }),
  actions: {
    showSaveBeforeLeaveModal(){

      this.routeLeaveModal = !this.routeLeaveModal
    },

    saveAndMove(){
      this.routeLeaveModal = false
      this.cancelAll()
    },
    initializeCheckboxes(names: string[]) {
      this.checkboxes = names.map(name => ({ name, value: false }));
      this.initialCheckboxes = JSON.parse(JSON.stringify(this.checkboxes)); // Deep copy the initial state
    },
    addCheckbox(name: string) {
      if (!this.checkboxes.some(checkbox => checkbox.name === name)) {
        const newCheckbox = { name, value: false };
        this.checkboxes.push(newCheckbox);
        this.initialCheckboxes.push(newCheckbox);
      }
    },
    removeCheckbox(name: string) {
      this.checkboxes = this.checkboxes.filter(checkbox => checkbox.name !== name);
      this.initialCheckboxes = this.initialCheckboxes.filter(checkbox => checkbox.name !== name);
    },
    toggleCheckbox(name: string) {
      const checkbox = this.checkboxes.find(checkbox => checkbox.name === name);
      if (checkbox) {
        checkbox.value = !checkbox.value;
      }
    },
    setCheckboxValue(name: string, value: boolean) {
      const checkbox = this.checkboxes.find(checkbox => checkbox.name === name);
      if (checkbox) {
        checkbox.value = value;
      }
    },
    hasChanges() {
      return JSON.stringify(this.checkboxes) !== JSON.stringify(this.initialCheckboxes);
    },
    addCardToArrayMenus(name: string, customArrayKey: keyof typeof this, description: string) {
      const customArray = this[customArrayKey] as Card[];
      if (!customArray.some(card => card.name === name)) {
        const newCard = { name, description, icon: '', checkboxId: '' };
        customArray.push(newCard);
      }
    },
    removeCardFromArrayMenus(name: string, customArrayKey: keyof typeof this) {
      this[customArrayKey] = (this[customArrayKey] as Card[]).filter(card => card.name !== name);
    },
    initializeCardsMenu(customArray: Card[], customArrayKey: keyof typeof this, initialOrderKey: keyof typeof this) {
      this[customArrayKey] = customArray.map(card => ({
        name: card.name,
        description: card.description,
        icon: card.icon,
        checkboxId: card.checkboxId
      }));
      this[initialOrderKey] = JSON.parse(JSON.stringify(this[customArrayKey])); // Deep copy the initial state
    },
    onDragStart(initialOrderKey: keyof typeof this) {
      this[initialOrderKey] = JSON.parse(JSON.stringify(this[initialOrderKey])); // Store initial order
      // console.log('Initial order:', this[initialOrderKey]);
    },
    onDragChange(customArrayKey: keyof typeof this, initialOrderKey: keyof typeof this) {
      const currentOrder = JSON.parse(JSON.stringify(this[customArrayKey])); // Ensure deep copy
      const isOrderChanged = !this.arraysEqual(this[initialOrderKey] as Card[], currentOrder as Card[]);
      // console.log('Current order:', currentOrder);
      // console.log('Order changed:', isOrderChanged);
      if(customArrayKey === 'AdjustMainMenuCards'){
        this.force_change_menuCards = isOrderChanged;

      }
      if(customArrayKey === 'manageProfileCards'){
        this.force_change_profileCards = isOrderChanged;

      }
    },
    onDragEnd(customArrayKey: keyof typeof this, initialOrderKey: keyof typeof this) {
      const currentOrder = JSON.parse(JSON.stringify(this[customArrayKey])); // Ensure deep copy
      const isOrderChanged = !this.arraysEqual(this[initialOrderKey] as Card[], currentOrder as Card[]);
      console.log('Current order:', currentOrder);
      console.log('Order changed:', isOrderChanged);
      this.force_change = isOrderChanged;
    },
    arraysEqual(a: Card[], b: Card[]) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i].name !== b[i].name || a[i].description !== b[i].description || a[i].icon !== b[i].icon || a[i].checkboxId !== b[i].checkboxId) {
          return false;
        }
      }
      return true;
    },

    cancelAll(){
      // const signLangStore = useSignLangStore()
 this.force_change_profileCards=false
 this.force_change_menuCards=false
 this.initializeCardsMenu([
  {
    icon: 'monitor_im.svg',
    name: 'Motor impaired',
    description: 'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
    checkboxId: 'motor_active'
  },
  {
    icon: 'color_blind.svg',
    name: 'Color blind',
    description: 'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
    checkboxId: 'color_blind'
  },
  {
    icon: 'vis_impaired.svg',
    name: 'Visually-impaired',
    description: 'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
    checkboxId: 'hide_images'
  },
  {
    icon: 'seizure.svg',
    name: 'Seizure & Epileptic',
    description: 'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
    checkboxId: 'Seizure'
  },
  {
    icon: 'blind.svg',
    name: 'Blind',
    description: 'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
    checkboxId: 'blind'
  },
  {
    icon: 'df.svg',
    name: 'Dyslexia',
    description: 'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
    checkboxId: 'dyslexia'
  },
  {
    icon: 'congitive.svg',
    name: 'Congitive & Learning',
    description: 'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
    checkboxId: 'congitive'
  },
  {
    icon: 'adhd.svg',
    name: 'ADHD',
    description: 'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
    checkboxId: 'ADHD'
  },


], 'manageProfileCards', 'initialManageProfileCards');






           this.initializeCheckboxes([
            "language",
        "enable_live_site",
            "oversized_widget",
            "move_access",
            "3_column_layout_widget",
            "accessibility_profiles",
            "move_hide_accessibility",
            "page_str",
            "screen_reader",
            "hide_images",
            "smart_contrast",
            "voice_navigation",
            "dictionary",
            "highlight_links",
            "line_height",
            "saturation",
            "bigger_text",
            "pause_animation",
            "tool_tip",
            "cursor",
            "text_spacing",
            "contrast_plus",
            "dyslexia",
            "ADHD",
            "congitive",
            "blind",
            "Seizure",
            "visuallyImpraired",
            "color_blind",
            "motor_active",
            "enable_custom_trigger",
            "show_lang_selector",
          ]);

    },
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAddonStore, import.meta.hot));
}
