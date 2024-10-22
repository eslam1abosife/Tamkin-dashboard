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
      const getnamesFeature = res.data.data.features.map((el: any) => {
        return {
          name: el.name,
          title: el.title,
          description_on_show: el.description_on_show,
          description_on_hide: el.description_on_hide,
        };
      });

      customizeStore.features = getnamesFeature;

      // button color
      const isBtnColorActive = features.find(
        (feature: any) => feature.name === "deaf-customize-button-color"
      );
      if (isBtnColorActive.active == 1) {
        customizeStore.isBtnColorActive = true;
      } else {
        customizeStore.isBtnColorActive = false;
      }
      const buttonSolidColor = features
        .find((feature: any) => feature.name === "deaf-customize-button-color")
        .features.find(
          (el: any) =>
            el.name === "deaf-customize-button-color-sign-language-button-color"
        )
        .tamkin_option_item_values.find((el: any) => el.title == "Solid");
      const buttonGridColor = features
        .find((feature: any) => feature.name === "deaf-customize-button-color")
        .features.find(
          (el: any) =>
            el.name === "deaf-customize-button-color-sign-language-button-color"
        )
        .tamkin_option_item_values.find((el: any) => el.title == "Gradient");

      if (buttonSolidColor.active) {
        customizeStore.isButtonColorSolidActive = true;
      }
      if (buttonGridColor.active) {
        customizeStore.isButtonColorGridActive = true;
      }

      const colorMode = features
        .find((feature: any) => feature.name === "deaf-customize-button-color")
        .features.find(
          (el) =>
            el.name === "deaf-customize-button-color-sign-language-button-color"
        )
        .value.split(",");

      if (colorMode.length > 1) {
        customizeStore.$state.colorMode = "gradient";
        customizeStore.$state.initcolorMode = "gradient";
        customizeStore.$state.gradient1 = colorMode[0];
        customizeStore.$state.initgradient1 = colorMode[0];
        customizeStore.$state.gradient2 = colorMode[1];
        customizeStore.$state.initgradient2 = colorMode[1];
        if (localStorage.getItem("playerColorPanal")) {
          customizeStore.$state.currentColor =
            localStorage.getItem("playerColorPanal");
          customizeStore.$state.initcurrentColor =
            localStorage.getItem("playerColorPanal");
        } else {
          customizeStore.$state.currentColor = colorMode[0];
          customizeStore.$state.initcurrentColor = colorMode[0];
        }
      } else {
        customizeStore.$state.colorMode = "solid";
        customizeStore.$state.initcolorMode = "solid";
        customizeStore.$state.currentColor = colorMode[0];
        customizeStore.$state.initcurrentColor = colorMode[0];

        if (localStorage.getItem("playerColorPanal")) {
          customizeStore.$state.gradient1 = localStorage
            .getItem("playerColorPanal")
            .split(",")[0];
          customizeStore.$state.initgradient1 = localStorage
            .getItem("playerColorPanal")
            .split(",")[0];
          customizeStore.$state.gradient2 = localStorage
            .getItem("playerColorPanal")
            .split(",")[1];
          customizeStore.$state.initgradient2 = localStorage
            .getItem("playerColorPanal")
            .split(",")[1];
        } else {
          customizeStore.$state.gradient1 = colorMode[0];
          customizeStore.$state.initgradient1 = colorMode[0];
          customizeStore.$state.gradient2 = colorMode[0];
          customizeStore.$state.initgradient2 = colorMode[0];
        }
      }

      // button type shape
      const buttonshape = features
        .find((feature: any) => feature.name === "deaf-customize-button-type")
        .features.find(
          (el) =>
            el.name === "deaf-customize-button-type-sign-language-button-shape"
        );
      customizeStore.$state.buttonIcons = buttonshape.tamkin_option_item_values;

      if (buttonshape.active == 1) {
        customizeStore.$state.buttonShapeSelector = buttonshape.value;
        customizeStore.$state.initbuttonShapeSelector = buttonshape.value;
        customizeStore.$state.selectedIcon =
          buttonshape.tamkin_option_item_values.find(
            (el: any) => el.value === buttonshape.value
          ).icon;
        customizeStore.$state.initselectedIcon =
          buttonshape.tamkin_option_item_values.find(
            (el: any) => el.value === buttonshape.value
          ).icon;
      }

      // handle size button
      const buttonsize = features
        .find((feature: any) => feature.name === "deaf-customize-button-type")
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-button-type-sign-language-player-button-size"
        );
      if (buttonsize.active == 1) {
        customizeStore.$state.buttonSizeSlider = buttonsize.value;
        customizeStore.$state.initbuttonSizeSlider = buttonsize.value;
      }

      // handle position
      const buttonDesktopPosition = features
        .find(
          (feature: any) => feature.name === "deaf-customize-button-location"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-customize-button-location-sign-language-button-location-desktop"
        );
      if (buttonDesktopPosition.active == 1) {
        customizeStore.$state.initialPositionDesktop =
          buttonDesktopPosition.value;
        customizeStore.$state.buttonPositionDesktop =
          buttonDesktopPosition.value;
      }
      const buttonMobilePosition = features
        .find(
          (feature: any) => feature.name === "deaf-customize-button-location"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-customize-button-location-sign-language-button-location-mobile"
        );
      if (buttonMobilePosition.active == 1) {
        customizeStore.$state.initialPositionMobile =
          buttonMobilePosition.value;
        customizeStore.$state.buttonPositionMobile = buttonMobilePosition.value;
      }

      // deaf mode
      const isAccModeActive = features
        .find(
          (feature: any) => feature.name === "deaf-customize-sign-language-mode"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );

      if (isAccModeActive.active == 1) {
        customizeStore.toggleCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
        customizeStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
        customizeStore.$state.accessibilityMode = isAccModeActive.value;
        customizeStore.$state.initaccessibilityMode = isAccModeActive.value;
      }

      // set languages
      res.data.data.languages.forEach((el: any) => {
        customizeStore.$state.languages.push(el);
      });

      const selectLang = features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-language"
        )
        .features.find(
          (el: any) =>
            el.name === "deaf-customize-sign-language-list-list-sign-language"
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
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-language"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget"
        );
      if (enableLangHighlight.active == 1 && enableLangHighlight.value == 1) {
        customizeStore.toggleCheckbox(
          "deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget"
        );
        customizeStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget"
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
        if (isSetBackground.value === "option1") {
          customizeStore.background = "0%";
          customizeStore.initbackground = "0%";
        } else if (isSetBackground.value === "option2") {
          customizeStore.background = "50%";
          customizeStore.initbackground = "50%";
        } else if (isSetBackground.value === "option3") {
          customizeStore.background = "100%";
          customizeStore.initbackground = "100%";
        }
        customizeStore.toggleCheckbox(
          "deaf-customize-sign-language-background-sign-language-background"
        );
        customizeStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-background-sign-language-background"
        );

        signLangStore.initialCardsOrder.push({
          name: isSetBackground.name,
          label: isSetBackground.label,
          icon: `${isSetBackground.name}.png`,
          description: isSetBackground.description,
          checkboxId: isSetBackground.name,
          active: isSetBackground.active,
        });
        signLangStore.WebpluginsCards.push({
          name: isSetBackground.name,
          icon: `${isSetBackground.name}.png`,
          description: isSetBackground.description,
          checkboxId: isSetBackground.name,
          label: isSetBackground.label,
          active: isSetBackground.active,
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
        customizeStore.toggleCheckbox(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );
        customizeStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );

        signLangStore.initialCardsOrder.push({
          name: isSetContrast.name,
          label: isSetContrast.label,
          icon: `${isSetContrast.name}.png`,
          description: isSetContrast.description,
          checkboxId: isSetContrast.name,
          active: isSetContrast.active,
        });
        signLangStore.WebpluginsCards.push({
          name: isSetContrast.name,
          icon: `${isSetContrast.name}.png`,
          description: isSetContrast.description,
          checkboxId: isSetContrast.name,
          label: isSetContrast.label,
          active: isSetContrast.active,
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
        customizeStore.toggleCheckbox(
          "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
        );
        customizeStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
        );

        signLangStore.initialCardsOrder.push({
          name: isSetKeyboard.name,
          icon: `${isSetKeyboard.name}.png`,
          description: isSetKeyboard.description,
          checkboxId: isSetKeyboard.name,
          label: isSetKeyboard.label,
          active: isSetKeyboard.active,
        });
        signLangStore.WebpluginsCards.push({
          name: isSetKeyboard.name,
          icon: `${isSetKeyboard.name}.png`,
          description: isSetKeyboard.description,
          checkboxId: isSetKeyboard.name,
          label: isSetKeyboard.label,
          active: isSetKeyboard.active,
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
          icon: `deaf-customize-sign-language-mode-move--hide-sign-language-player.png`,
          description: isSetMode.description,
          checkboxId: isSetMode.name,
          label: isSetMode.label,
          active: isSetKeyboard.active,
        });
        signLangStore.WebpluginsCards.push({
          name: isSetMode.name,
          icon: `deaf-customize-sign-language-mode-move--hide-sign-language-player.png`,
          description: isSetMode.description,
          checkboxId: isSetMode.name,
          label: isSetMode.label,
          active: isSetKeyboard.active,
        });
        signLangStore.toggleCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
        signLangStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
      }

      const playerSettings = features.find(
        (feature: any) => feature.name === "deaf-setting-general-settings"
      );

      settingsStore.settingsItems = playerSettings;

      playerSettings.features.forEach((el: any) => {
        if (el.value == 1) {
          settingsStore.setCheckboxValue(el.name, true);
          settingsStore.setinitCheckboxValue(el.name, true);
        } else {
          settingsStore.setCheckboxValue(el.name, false);
          settingsStore.setinitCheckboxValue(el.name, false);
        }
      });

      // reset settings
      const DeafReset = features.find(
        (feature: any) =>
          feature.name === "deaf-setting-reset-all-sign-language-settings"
      );

      settingsStore.isDeafResetActive = DeafReset;

      const deafLiecenceTrans = features.find(
        (feature: any) =>
          feature.name === "deaf-setting-license-settings-sign-language"
      );
      settingsStore.transferLicenceItems = deafLiecenceTrans;

      const webPlugins = features.find(
        (feature: any) => feature.name === "deaf-addons-web-plugins"
      );
      signLangStore.addonsPlugin = webPlugins;
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
