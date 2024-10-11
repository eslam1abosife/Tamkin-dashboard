import { useApi } from "@/composables/useApi";
import { useNuxtApp } from "#app";

export default function () {
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();
  const { $toast } = useNuxtApp();

  const customizeStore = useCustomizeStore();
  const settingsStore = useSettingsStore();
  const signLangStore = useSignLangStore();

  const getPlayerData = async () => {
    customizeStore.loadingData = true;
    try {
      const res = await api.post("/Widget/GetAccessibility/default");
      const features = res.data.data.features;

      // button color
      const colorMode = features
        .find((feature: any) => feature.name === "acc-customize-button-color")
        .features.find(
          (el) => el.name === "acc-customize-button-color-button-color"
        )
        .value.split(",");

      if (colorMode.length > 1) {
        customizeStore.$state.colorMode = "gradient";
        customizeStore.$state.initcolorMode = "gradient";
        customizeStore.$state.gradient1 = colorMode[0];
        customizeStore.$state.initgradient1 = colorMode[0];
        customizeStore.$state.gradient2 = colorMode[1];
        customizeStore.$state.initgradient2 = colorMode[1];
      } else {
        customizeStore.$state.colorMode = "solid";
        customizeStore.$state.initcolorMode = "solid";
        customizeStore.$state.currentColor = colorMode[0];
        customizeStore.$state.initcurrentColor = colorMode[0];
      }

      // button type shape
      const buttonshape = features
        .find((feature: any) => feature.name === "acc-customize-button-type")
        .features.find(
          (el) => el.name === "acc-customize-button-type-button-shape"
        );
      customizeStore.$state.buttonIcons = buttonshape.tamkin_option_item_values;

      if (buttonshape.active == 1) {
        customizeStore.$state.buttonShapeSelector = buttonshape.value;
        customizeStore.$state.initbuttonShapeSelector = buttonshape.value;
        customizeStore.$state.selectedIcon =
          buttonshape.tamkin_option_item_values.find(
            (el) => el.value === buttonshape.value
          ).icon;
        customizeStore.$state.initselectedIcon =
          buttonshape.tamkin_option_item_values.find(
            (el) => el.value === buttonshape.value
          ).icon;
      }

      // handle size button
      const buttonsize = features
        .find((feature: any) => feature.name === "acc-customize-button-type")
        .features.find(
          (el) => el.name === "acc-customize-button-type-button-size"
        );
      if (buttonsize.active == 1) {
        customizeStore.$state.buttonSizeSlider = buttonsize.value;
        customizeStore.$state.initbuttonSizeSlider = buttonsize.value;
      }

      // accessbility main menu
      const mainMenu = features.find(
        (feature: any) => feature.name === "acc-addons-main-menu"
      );

      if (mainMenu.active == 1) {
        customizeStore.initializeCardsMenu(
          mainMenu.features,
          "AdjustMainMenuCardsCustomize",
          "initialCardsOrderCustomize"
        );

        mainMenu.features.forEach((element: any) => {
          if (element.active == 1 && element.value == 1) {
            customizeStore.toggleCheckbox(element.name);
            customizeStore.toggleInitialCheckbox(element.name);
          }
        });
      }

      // accessbility profiles
      const profileItems = features.find(
        (feature: any) => feature.name === "acc-addons-accessibility-profiles"
      );

      if (profileItems.active == 1) {
        customizeStore.initializeCardsMenu(
          profileItems.features,
          "manageProfileCardsCustomize",
          "initialManageProfileCardsCustomize"
        );

        profileItems.features.forEach((element: any) => {
          if (element.active == 1 && element.value == 1) {
            customizeStore.toggleCheckbox(element.name);
            customizeStore.toggleInitialCheckbox(element.name);
          }
        });
      }

      // set languages
      res.data.data.languages.forEach((el: any) => {
        customizeStore.$state.languages.push(el);
      });

      const selectLang = features
        .find((feature: any) => feature.name === "acc-customize-language")
        .features.find(
          (el: any) => el.name === "acc-customize-language-list-of-languages"
        );

      if (selectLang.value === "auto detect language") {
        customizeStore.selectedLang = {
          language_name: "Auto detect Language",
          language_code: "auto detect language",
        };
        customizeStore.initselectedLang = {
          language_name: "Auto detect Language",
          language_code: "auto detect language",
        };
      } else {
        customizeStore.selectedLang = res.data.data.languages.filter(
          (el: any) => {
            el.language_code === selectLang.value.language_code;
          }
        )[0];
        customizeStore.initselectedLang = res.data.data.languages.filter(
          (el: any) => {
            el.language_code === selectLang.value.language_code;
          }
        )[0];
      }

      // acc enableLangHighlight
      const enableLangHighlight = features
        .find((feature: any) => feature.name === "acc-customize-language")
        .features.find(
          (el) =>
            el.name ===
            "acc-customize-language-show-language-selector-on-the-widget"
        );
      if (enableLangHighlight.active == 1 && enableLangHighlight.value == 1) {
        customizeStore.toggleCheckbox(
          "acc-customize-language-show-language-selector-on-the-widget"
        );
        customizeStore.toggleInitialCheckbox(
          "acc-customize-language-show-language-selector-on-the-widget"
        );
      }

      signLangStore.initialCardsOrder = [];
      signLangStore.WebpluginsCards = [];
      // deaf background
      const isSetBackground = features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-background"
        )
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-sign-language-background-sign-language-background"
        );
      if (isSetBackground.active == 1) {
        signLangStore.initialCardsOrder.push({
          name: isSetBackground.name,
          label: isSetBackground.label,
          icon: `${isSetBackground.name}.png`,
          description: isSetBackground.description,
          checkboxId: isSetBackground.name,
        });
        signLangStore.WebpluginsCards.push({
          name: isSetBackground.name,
          icon: `${isSetBackground.name}.png`,
          description: isSetBackground.description,
          checkboxId: isSetBackground.name,
          label: isSetBackground.label,
        });
        signLangStore.toggleCheckbox(
          "deaf-customize-sign-language-background-sign-language-background"
        );
        signLangStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-background-sign-language-background"
        );
      }
      // deaf isSetContrast

      const isSetContrast = features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-contrast"
        )
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );
      if (isSetContrast.active == 1) {
        signLangStore.initialCardsOrder.push({
          name: isSetContrast.name,
          label: isSetContrast.label,
          icon: `${isSetContrast.name}.png`,
          description: isSetContrast.description,
          checkboxId: isSetContrast.name,
        });
        signLangStore.WebpluginsCards.push({
          name: isSetContrast.name,
          icon: `${isSetContrast.name}.png`,
          description: isSetContrast.description,
          checkboxId: isSetContrast.name,
          label: isSetContrast.label,
        });
        signLangStore.toggleCheckbox(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );
        signLangStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );
      }

      // deaf isSetKeyboard
      const isSetKeyboard = features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-keyboard"
        )
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
        );
      if (isSetKeyboard.active == 1) {
        signLangStore.initialCardsOrder.push({
          name: isSetKeyboard.name,
          icon: `${isSetKeyboard.name}.png`,
          description: isSetKeyboard.description,
          checkboxId: isSetKeyboard.name,
          label: isSetKeyboard.label,
        });
        signLangStore.WebpluginsCards.push({
          name: isSetKeyboard.name,
          icon: `${isSetKeyboard.name}.png`,
          description: isSetKeyboard.description,
          checkboxId: isSetKeyboard.name,
          label: isSetKeyboard.label,
        });
        signLangStore.toggleCheckbox(
          "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
        );
        signLangStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
        );
      }

      // deaf isSetMode
      const isSetMode = features
        .find(
          (feature: any) => feature.name === "deaf-customize-sign-language-mode"
        )
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
      if (isSetMode.active == 1) {
        signLangStore.initialCardsOrder.push({
          name: isSetMode.name,
          icon: `${isSetMode.name}.png`,
          description: isSetMode.description,
          checkboxId: isSetMode.name,
          label: isSetMode.label,
        });
        signLangStore.WebpluginsCards.push({
          name: isSetMode.name,
          icon: `${isSetMode.name}.png`,
          description: isSetMode.description,
          checkboxId: isSetMode.name,
          label: isSetMode.label,
        });
        signLangStore.toggleCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
        signLangStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
      }

      // acc isEnableSoundEffect
      const isEnableSoundEffect = features
        .find(
          (feature: any) => feature.name === "deaf-setting-general-settings"
        )
        .features.find(
          (el) =>
            el.name === "deaf-setting-general-settings-player-sound-effects"
        );
      if (isEnableSoundEffect.active == 1 && isEnableSoundEffect.value == 1) {
        settingsStore.toggleCheckbox(
          "deaf-setting-general-settings-player-sound-effects"
        );
        settingsStore.toggleinitialCheckbox(
          "deaf-setting-general-settings-player-sound-effects"
        );
      }

      // acc isEnableOnMobile
      const isEnableOnMobile = features
        .find(
          (feature: any) => feature.name === "deaf-setting-general-settings"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-setting-general-settings-player-enabled-on-this-mobile"
        );
      if (isEnableOnMobile.active == 1 && isEnableOnMobile.value == 1) {
        settingsStore.toggleCheckbox(
          "deaf-setting-general-settings-player-enabled-on-this-mobile"
        );
        settingsStore.toggleinitialCheckbox(
          "deaf-setting-general-settings-player-enabled-on-this-mobile"
        );
      }
      // acc isEnableOnThisSite
      const isEnableOnThisSite = features
        .find(
          (feature: any) => feature.name === "deaf-setting-general-settings"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-setting-general-settings-player-enabled-on-this-site"
        );
      if (isEnableOnThisSite.active == 1 && isEnableOnThisSite.value == 1) {
        settingsStore.toggleCheckbox(
          "deaf-setting-general-settings-player-enabled-on-this-site"
        );
        settingsStore.toggleinitialCheckbox(
          "deaf-setting-general-settings-player-enabled-on-this-site"
        );
      }

      customizeStore.loadingData = false;
    } catch (error) {
      customizeStore.loadingData = false;
      console.error(error); // Better error handling
      throw typeof error === "string" ? error : "There is something wrong";
    }
  };

  return {
    getPlayerData,
    loading,
  };
}
