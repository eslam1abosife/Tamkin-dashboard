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


export const useCustomizeStore = defineStore('customize', {
  state: () => ({
    currentColor: '#2dada3',
    gradient1: '#2dada3',
    gradient2: '#2dada3',
    colorMode: 'solid',
    checkboxes: [] as Checkbox[],
    initialCheckboxes: [] as Checkbox[], // Store the initial state
    initialPositionDesktop: 'postion1',
    initialPositionMobile: 'postion1',
    buttonPositionDesktop: 'postion1',
    buttonPositionMobile: 'postion1',
    force_change_MainMenuCard: false,
    force_change_profileCards: false,
    buttonSizeSlider: 2,
    buttonShapeSelector: 'icon1',
    widgetType: 'full_widget',
    AdjustMainMenuCardsCustomize: [] as Card[],
    initialCardsOrderCustomize: [] as Card[], // Store the initial cards order
    manageProfileCardsCustomize: [] as Card[], // Another draggable array
    initialManageProfileCardsCustomize: [] as Card[], // Initial order for the other draggable array
    switchButtonLocation: 'desktop',
    forceChange_buttonShape: false,
    liveTranlsationButtonLocation: 'default',
    currentShapeLiveTranslation: 'gb',
    routeLeaveModal: false

  }),
  actions: {
    showSaveBeforeLeaveModal() {

      this.routeLeaveModal = !this.routeLeaveModal
    },

    saveAndMove() {
      this.routeLeaveModal = false
      return this.cancelAll()
    },
    selectLiveTranslationButtonLocation(location: string) {
      if (this.checkboxes.find(val => val.name === 'enable_live_site' && val.value === true)) {

        this.liveTranlsationButtonLocation = location
      }
    },
    changeDefaultButtonShape(v: any) {
      if (this.checkboxes.find(val => val.name === 'enable_live_site' && val.value === true)) {
        this.currentShapeLiveTranslation = v
      }
    },
    selectWidgetType(v: string) {
      this.widgetType = v
      if (this.widgetType !== 'full_widget') {
        this.force_change_profileCards = true
      } else {
        this.force_change_profileCards = false


      }
    },
    changeButtonShape(shape: string) {
      this.buttonShapeSelector = shape;
      if (shape !== 'icon1') {
        this.forceChange_buttonShape = true
      } else {
        this.forceChange_buttonShape = false
      }


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
      return JSON.stringify(this.checkboxes) !== JSON.stringify(this.initialCheckboxes) || 
      
      this.buttonPositionDesktop !== 'top_left' || this.buttonPositionMobile !== 'top_left_mobile' || 
      this.forceChange_buttonShape || this.force_change_profileCards || this.force_change_MainMenuCard 

        
    },

    isChecked(name: string) {
      const checkbox = this.checkboxes.find((checkbox) => checkbox.name === name);
      return checkbox ? checkbox.value : false;
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
      if (customArrayKey === 'AdjustMainMenuCardsCustomize') {
        this.force_change_MainMenuCard = isOrderChanged;

      }
      if (customArrayKey === 'manageProfileCardsCustomize') {
        this.force_change_profileCards = isOrderChanged;

      }
    },
    onDragEnd(customArrayKey: keyof typeof this, initialOrderKey: keyof typeof this) {
      const currentOrder = JSON.parse(JSON.stringify(this[customArrayKey])); // Ensure deep copy
      const isOrderChanged = !this.arraysEqual(this[initialOrderKey] as Card[], currentOrder as Card[]);
      // console.log('Current order:', currentOrder);
      // console.log('Order changed:', isOrderChanged);
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
    cancelAll() {
      this.force_change_MainMenuCard = false
      this.force_change_profileCards = false
      this.forceChange_buttonShape = false
      this.currentColor = '#2DADA3'
        this.gradient1 = ''
        this.gradient2 = ''
        this.colorMode = 'solid'
        this.buttonPositionDesktop =         this.initialPositionDesktop 

        this.buttonPositionMobile = 'top_left_mobile'
        this.buttonSizeSlider ="2"
        this.buttonShapeSelector = 'type1'
        this.widgetType = 'full_widget'
        this.currentColor = '#2dada3'
        this.gradient1 = '#2dada3'
        this.gradient2 = '#2dada3'
        // this.colorMode= 'solid',
        this.initializeCardsMenu([
          {
            icon:'tamkin_player.svg',
            name:'Tamkin Player',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'tamkin_player'
           },
           {
            icon:'media_player.svg',
            name:'Media Player',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'media_player'
           },
              {
            icon:'language sign.svg',
            name:'Screen Reader',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'screen_reader'
           },
           {
            icon:'page_str.svg',
            name:'Page Structure',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'page_str'
           },
           
           {
            icon:'hide_images.svg',
            name:'Hide Images',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'hide_images'
           },
           {
            icon:'contrast.svg',
            name:'Smart Contrast',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'smart_contrast'
           },
           {
            icon:'voice_navigation.svg',
            name:'Voice Navigation',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'voice_navigation'
           },
           {
            icon:'a-z.svg',
            name:'Dictionary',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'dictionary'
           },
           {
            icon:'clip.svg',
            name:'Highlight Links',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'highlight_links'
           },
           {
            icon:'line_height.svg',
            name:'Line Height',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'line_height'
           },
           {
            icon:'saturation.svg',
            name:'Saturation',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'saturation'
           },
          
           {
            icon:'text.svg',
            name:'Bigger Text',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'bigger_text'
           },
           {
            icon:'df_friendly.svg',
            name:'Dyslexia Friendly',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'df_friendly'
           },
           {
            icon:'pause.svg',
            name:'Pause Animation',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'pause_animation'
           },
           {
            icon:'text_align.svg',
            name:'Text Align',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'text_align'
           },
           {
            icon:'reading_mode.svg',
            name:'Reading Mode',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'reading_mode'
           },
           {
            icon:'tooltip.svg',
            name:'Tooltip',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'tool_tip'
           },
           {
            icon:'cursor.svg',
            name:'Cursor',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'cursor'
           },
           {
            icon:'text_spacing.svg',
            name:'Text Spacing',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'text_spacing'
           },
          
           {
            icon:'contrast_plus.svg',
            name:'Contrast +',
            description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
            checkboxId:'contrast_plus'
           },
        ], 'AdjustMainMenuCardsCustomize', 'initialCardsOrderCustomize');
      
        

        this.initializeCardsMenu([
          
          {
           icon:'monitor_im.svg',
           name:'Motor impaired',
           description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
           checkboxId:'motor_active'
          },
          {
           icon:'color_blind.svg',
           name:'Color blind',
           description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
           checkboxId:'color_blind'
          },
          {
           icon:'vis_impaired.svg',
           name:'Visually-impaired',
           description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
           checkboxId:'hide_images'
          },
          {
           icon:'seizure.svg',
           name:'Seizure & Epileptic',
           description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
           checkboxId:'Seizure'
          },
          {
           icon:'blind.svg',
           name:'Blind',
           description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
           checkboxId:'blind'
          },
          {
           icon:'df.svg',
           name:'Dyslexia',
           description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
           checkboxId:'dyslexia'
          },
          {
           icon:'congitive.svg',
           name:'Congitive & Learning',
           description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
           checkboxId:'congitive'
          },
          {
           icon:'adhd.svg',
           name:'ADHD',
           description:'Voluptate ullam minima assumenda nesciunt delectus sequi. Veniam suscipit nesciunt esse sint aperiam aliquid',
           checkboxId:'ADHD'
          },
         
         
           ], 'manageProfileCardsCustomize', 'initialManageProfileCardsCustomize');
         
       
      this.initializeCheckboxes([
        "tamkin_player",
        "media_player",
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
        "df_friendly",
        "pause_animation",
        "text_align",
        "reading_mode",
      ]);

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



  }


});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCustomizeStore, import.meta.hot));
}
