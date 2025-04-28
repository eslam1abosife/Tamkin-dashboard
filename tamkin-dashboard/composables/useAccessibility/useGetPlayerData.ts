import { useApi } from "@/composables/useApi";
import { useNuxtApp } from "#app";

export default function () {
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();
  const { $toast } = useNuxtApp();
  const { t } = useI18n();

  const customizeStore = useCustomizeStore();
  const settingsStore = useSettingsStore();
  const signLangStore = useSignLangStore();

  const getPlayerData = async () => {
    customizeStore.loadingData = true;
    try {
      const res = await api.post("/Widget/GetAccessibility/default");
      const features = res.data.data.features;

      customizeStore.managePlayerPackages = res.data.data.manage_feature;
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

      const isColorFeatureEnabled = res.data.data.features
        .find((feature: any) => feature.name === "deaf-customize-button-color")
        .features.find(
          (el: any) =>
            el.name === "deaf-customize-button-color-sign-language-button-color"
        );
      if (isColorFeatureEnabled.active == 1) {
        customizeStore.isColorFeatureEnabled = true;
      } else {
        customizeStore.isColorFeatureEnabled = false;
      }

      const buttonSolidColor = res.data.data.features
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

      const colorMode = res.data.data.features
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
      const isbtntype_active = features.find(
        (feature: any) => feature.name === "deaf-customize-button-type"
      );
      if (isbtntype_active.active == 1) {
        customizeStore.isbtntype_active = true;
      }
      const buttonshape = features
        .find((feature: any) => feature.name === "deaf-customize-button-type")
        .features.find(
          (el) =>
            el.name === "deaf-customize-button-type-sign-language-button-shape"
        );
      customizeStore.$state.playerBtnShape = buttonshape;
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
      customizeStore.playerBtnSize = buttonsize;
      if (buttonsize.active == 1) {
        customizeStore.$state.buttonSizeSlider = buttonsize.value;
        customizeStore.$state.initbuttonSizeSlider = buttonsize.value;
      }

      // deaf mode
      const isDeafModeCardActive = features.find(
        (feature: any) => feature.name === "deaf-customize-sign-language-mode"
      );
      if (isDeafModeCardActive.active == 1) {
        customizeStore.isDeafModeCardActive = true;
      } else {
        customizeStore.isDeafModeCardActive = false;
      }
      const isAccModeActive = features
        .find(
          (feature: any) => feature.name === "deaf-customize-sign-language-mode"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
      customizeStore.accessibilityModeItems =
        isAccModeActive.tamkin_option_item_values;

      if (isAccModeActive.active == 1) {
        customizeStore.$state.accessibilityMode = isAccModeActive.value;
        customizeStore.$state.initaccessibilityMode = isAccModeActive.value;
      }

      const isDeafModeValTrue = features
        .find(
          (feature: any) => feature.name === "deaf-customize-sign-language-mode"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-customize-sign-language-mode-move-/-hide-sign-language-player-button"
        );

      customizeStore.playerMoveHideFeature = isDeafModeValTrue;

      if (isDeafModeValTrue.active == 1 && isDeafModeValTrue.value == 1) {
        customizeStore.toggleCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
        customizeStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );
      }

      const isAccessbilityModeIconsActive = features
        .find(
          (feature: any) => feature.name === "deaf-customize-sign-language-mode"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-customize-sign-language-mode-move-/-hide-sign-language-player"
        );

      if (isAccessbilityModeIconsActive.active == 1) {
        customizeStore.isAccessbilityModeIconsActive = true;
      }

      // handle position
      const isBtnLocationActive = features.find(
        (feature: any) => feature.name === "deaf-customize-button-location"
      );
      if (isBtnLocationActive.active == 1) {
        customizeStore.isBtnLocationActive = true;
      } else {
        customizeStore.isBtnLocationActive = false;
      }

      const buttonDesktopPosition = features
        .find(
          (feature: any) => feature.name === "deaf-customize-button-location"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-customize-button-location-sign-language-button-location-desktop"
        );
      customizeStore.buttonDesktopPositions =
        buttonDesktopPosition.tamkin_option_item_values;
      if (buttonDesktopPosition.active == 1) {
        customizeStore.isButtonDesktopPositionActive = true;
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
      customizeStore.buttonMobilePositions =
        buttonMobilePosition.tamkin_option_item_values;
      if (buttonMobilePosition.active == 1) {
        customizeStore.isButtonMobilePositionActive = true;
        customizeStore.$state.initialPositionMobile =
          buttonMobilePosition.value;
        customizeStore.$state.buttonPositionMobile = buttonMobilePosition.value;
      }

      // set languages
      const islangEnabled = features.find(
        (feature: any) =>
          feature.name === "deaf-customize-sign-language-player-language"
      );

      if (islangEnabled.active == 1) {
        customizeStore.islangEnabled = true;
      }
      customizeStore.$state.languages = [];

      customizeStore.$state.languages.push({
        title: t("Auto detect Language"),
        code: "auto detect language",
        icon: "",
      });
      
      (res.data?.data?.dictionary ?? []).forEach((el: any) => {
        customizeStore.$state.languages.push(el);
      });

      const selectLang = res.data.data.features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-language"
        )

        .features.find(
          (el: any) =>
            el.name === "deaf-customize-sign-language-list-list-sign-language"
        );
      if (selectLang.active == 1) {
        customizeStore.islangListEnabled = true;
      }

      if (selectLang.value === "auto detect language") {
        customizeStore.selectedLang = {
          title: "Auto detect Language",
          code: "auto detect language",
          icon: "",
        };
        customizeStore.initselectedLang = {
          title: "Auto detect Language",
          code: "auto detect language",
          icon: "",
        };
      } else {

        const selectedLanguage = res.data.data.languages.filter((el: any) => {
          return el.language_code === selectLang.value;
        })[0];
        
     
        customizeStore.selectedLang = {...selectedLanguage,title:selectedLanguage.language_name}
        customizeStore.initselectedLang = selectedLanguage
    
      }

      // acc enableLangHighlight
      const enableLangHighlight = res.data.data.features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-language"
        )
        .features.find(
          (el) =>
            el.name ===
            "deaf-customize-sign-language-player-language-sign-language-show-language-selector-on-the-widget"
        );
      if (enableLangHighlight.active == 1) {
        customizeStore.islangHighlightEnabled = enableLangHighlight;
      }
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
      const isBackgroundActive = features.find(
        (feature: any) =>
          feature.name === "deaf-customize-sign-language-player-background"
      );
      if (isBackgroundActive.active == 1) {
        customizeStore.isBackgroundActive = true;
      }
      const isSetBackground = features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-background"
        )
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-sign-language-player-background-sign-language-background-options"
        );
      customizeStore.backgroundItems = isSetBackground;
      if (isSetBackground.active == 1) {
        if (isSetBackground.value === "option1") {
          customizeStore.background = "option1";
          customizeStore.initbackground = "option1";
        } else if (isSetBackground.value === "option2") {
          customizeStore.background = "option2";
          customizeStore.initbackground = "option2";
        } else if (isSetBackground.value === "option3") {
          customizeStore.background = "option3";
          customizeStore.initbackground = "option3";
        }
      }
      const isBackgroundfeatureActive = res.data.data.features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-background"
        )
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-sign-language-background-sign-language-background"
        );

      signLangStore.initialCardsOrder.push({
        name: isBackgroundfeatureActive.name,
        label: isBackgroundfeatureActive.label,
        icon:isBackgroundfeatureActive.icon,
        description: isBackgroundfeatureActive.description,
        checkboxId: isBackgroundfeatureActive.name,
        active: isBackgroundfeatureActive.active,
        checked : isBackgroundfeatureActive.value,
      });

      signLangStore.WebpluginsCards.push({
        name: isBackgroundfeatureActive.name,
        icon: isBackgroundfeatureActive.icon,
        description: isBackgroundfeatureActive.description,
        checkboxId: isBackgroundfeatureActive.name,
        label: isBackgroundfeatureActive.label,
        active: isBackgroundfeatureActive.active,
        checked : isBackgroundfeatureActive.value,
      });
      customizeStore.isBackgroundfeatureActive = isBackgroundfeatureActive;
      if (
        isBackgroundfeatureActive.active == 1 &&
        isBackgroundfeatureActive.value == 1
      ) {
        customizeStore.toggleCheckbox(
          "deaf-customize-sign-language-background-sign-language-background"
        );
        customizeStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-background-sign-language-background"
        );
        signLangStore.toggleCheckbox(
          "deaf-customize-sign-language-background-sign-language-background"
        );
        signLangStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-background-sign-language-background"
        );
      }

      // deaf isSetContrast

      const isContrast = features.find(
        (feature: any) =>
          feature.name === "deaf-customize-sign-language-player-contrast"
      );
      if (isContrast.active == 1) {
        customizeStore.isContrastActive = true;
      }

      const isSetContrast = res.data.data.features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-contrast"
        )
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-sign-language-player-contrast-sign-language-contrast-option"
        );

      // console.log('features loaded ? ',isSetContrast);

      customizeStore.contrastData = isSetContrast;
      if (isSetContrast.active == 1) {
        if (isSetContrast.value === "light") {
          customizeStore.contrast = "light";
          customizeStore.initcontrast = "light";
        } else if (isSetContrast.value === "dark") {
          customizeStore.contrast = "dark";
          customizeStore.initcontrast = "dark";
        }
      }

    
      const isContrastFeatureActive = res.data.data.features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-contrast"
        )
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );
      customizeStore.isContrastFeatureActive = isContrastFeatureActive;
      // console.log('yea its active',  isContrastFeatureActive.value)
      if (
        isContrastFeatureActive.active === 1 &&
 isContrastFeatureActive.value === "1"
      ) {
        customizeStore.toggleCheckbox(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );
        customizeStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );
       await signLangStore.toggleCheckbox(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );
      await  signLangStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-player-contrast-sign-language-contrast"
        );

        signLangStore.initialCardsOrder.push({
          name: isContrastFeatureActive.name,
          label: isContrastFeatureActive.label,
          icon: isContrastFeatureActive.icon,
          description: isContrastFeatureActive.description,
          checkboxId: isContrastFeatureActive.name,
          active: isContrastFeatureActive.active,
          checked :isContrastFeatureActive.value
        });
        signLangStore.WebpluginsCards.push({
          name: isContrastFeatureActive.name,
          icon: isContrastFeatureActive.icon,
          description: isContrastFeatureActive.description,
          checkboxId: isContrastFeatureActive.name,
          label: isContrastFeatureActive.label,
          active: isContrastFeatureActive.active,
          checked :isContrastFeatureActive.value
        });
      }

      // deaf isSetKeyboard
      const isKeyboard = features.find(
        (feature: any) =>
          feature.name === "deaf-customize-sign-language-player-keyboard"
      );
      
      if (isKeyboard.active == 1) {
        customizeStore.isKeyboardActive = true;
      }
      const isSetKeyboard = res.data.data.features
        .find(
          (feature: any) =>
            feature.name === "deaf-customize-sign-language-player-keyboard"
        )
        .features.find(
          (el: any) =>
            el.name ===
            "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
        );

      customizeStore.keyboardData = isSetKeyboard;
      if (isSetKeyboard.active == 1) {
        if (isSetKeyboard.value == 1) {
          customizeStore.toggleCheckbox(
            "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
          );
          customizeStore.toggleInitialCheckbox(
            "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
          );
          signLangStore.toggleCheckbox(
            "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
          );
          signLangStore.toggleInitialCheckbox(
            "deaf-customize-sign-language-player-keyboard-sign-language-keyboard"
          );
        }

        signLangStore.initialCardsOrder.push({
          name: isSetKeyboard.name,
          icon: isSetKeyboard.icon,
          description: isSetKeyboard.description,
          checkboxId: isSetKeyboard.name,
          label: isSetKeyboard.label,
          active: isSetKeyboard.active,
          checked :isSetKeyboard.value

        });
        signLangStore.WebpluginsCards.push({
          name: isSetKeyboard.name,
          icon: isSetKeyboard.icon,
          description: isSetKeyboard.description,
          checkboxId: isSetKeyboard.name,
          label: isSetKeyboard.label,
          active: isSetKeyboard.active,
          checked :isSetKeyboard.value

        });
      }

      // deaf isSetMode
      const isSetMode = res.data.data.features
        .find(
          (feature: any) => feature.name === "deaf-customize-sign-language-mode"
        )
        .features.find(
          (el: any) =>
            el.name ===
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player-button"
        );
      if (isSetMode.active === 1 &&
        isSetMode.value === "1") {
        signLangStore.initialCardsOrder.push({
          name: isSetMode.name,
          icon: isSetMode.icon,
          description: isSetMode.description,
          checkboxId: isSetMode.name,
          label: isSetMode.label,
          active: isSetMode.active,
          checked :isSetMode.value

        });
        signLangStore.WebpluginsCards.push({
          name: isSetMode.name,
          icon: isSetMode.icon,
          description: isSetMode.description,
          checkboxId: isSetMode.name,
          label: isSetMode.label,
          active: isSetMode.active,
          checked :isSetMode.value

        });
        signLangStore.toggleCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player-button"
        );
        signLangStore.toggleInitialCheckbox(
          "deaf-customize-sign-language-mode-move-/-hide-sign-language-player-button"
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
