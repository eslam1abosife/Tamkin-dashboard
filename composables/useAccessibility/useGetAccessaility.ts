import { useApi } from "@/composables/useApi";
import { useNuxtApp } from "#app";

export default function () {
  const { useApiInstance } = useApi();
  const { api, loading } = useApiInstance();
  const { $toast } = useNuxtApp();
  const { t } = useI18n();

  const customizeStore = useCustomizeStore();
  const settingsStore = useSettingsStore();
  const checkboxStore = useAddonStore();

  const getAccessability = async () => {
    checkboxStore.loadingData = true;
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
      checkboxStore.features = getnamesFeature;
      settingsStore.features = getnamesFeature;

      // button color
      const isBtnColorActive = features.find(
        (feature: any) => feature.name === "acc-customize-button-color"
      );
      if (isBtnColorActive.active == 1) {
        customizeStore.isBtnColorActive = true;
      } else {
        customizeStore.isBtnColorActive = false;
      }
      const colorMode = features
        .find((feature: any) => feature.name === "acc-customize-button-color")
        .features.find(
          (el: any) => el.name === "acc-customize-button-color-button-color"
        )
        .value.split(",");

      const buttonSolidColor = features
        .find((feature: any) => feature.name === "acc-customize-button-color")
        .features.find(
          (el: any) => el.name === "acc-customize-button-color-button-color"
        )
        .tamkin_option_item_values.find((el: any) => el.title == "Solid");
      const buttonGridColor = features
        .find((feature: any) => feature.name === "acc-customize-button-color")
        .features.find(
          (el: any) => el.name === "acc-customize-button-color-button-color"
        )
        .tamkin_option_item_values.find((el: any) => el.title == "Gradient");
      if (buttonSolidColor.active) {
        customizeStore.isButtonColorSolidActive = true;
      }
      if (buttonGridColor.active) {
        customizeStore.isButtonColorGridActive = true;
      }

      if (colorMode.length > 1) {
        customizeStore.$state.colorMode = "gradient";
        customizeStore.$state.initcolorMode = "gradient";
        customizeStore.$state.gradient1 = colorMode[0];
        customizeStore.$state.initgradient1 = colorMode[0];
        customizeStore.$state.gradient2 = colorMode[1];
        customizeStore.$state.initgradient2 = colorMode[1];
        if (localStorage.getItem("colorPanal")) {
          customizeStore.$state.currentColor =
            localStorage.getItem("colorPanal");
          customizeStore.$state.initcurrentColor =
            localStorage.getItem("colorPanal");
        } else {
          customizeStore.$state.currentColor = colorMode[0];
          customizeStore.$state.initcurrentColor = colorMode[0];
        }
      } else {
        customizeStore.$state.colorMode = "solid";
        customizeStore.$state.initcolorMode = "solid";
        customizeStore.$state.currentColor = colorMode[0];
        customizeStore.$state.initcurrentColor = colorMode[0];

        if (localStorage.getItem("colorPanal")) {
          customizeStore.$state.gradient1 = localStorage
            .getItem("colorPanal")
            .split(",")[0];
          customizeStore.$state.initgradient1 = localStorage
            .getItem("colorPanal")
            .split(",")[0];
          customizeStore.$state.gradient2 = localStorage
            .getItem("colorPanal")
            .split(",")[1];
          customizeStore.$state.initgradient2 = localStorage
            .getItem("colorPanal")
            .split(",")[1];
        } else {
          customizeStore.$state.gradient1 = colorMode[0];
          customizeStore.$state.initgradient1 = colorMode[0];
          customizeStore.$state.gradient2 = colorMode[0];
          customizeStore.$state.initgradient2 = colorMode[0];
        }
      }

      // button type shape
      const isBtnTypeActive = features.find(
        (feature: any) => feature.name === "acc-customize-button-type"
      );
      if (isBtnTypeActive.active == 1) {
        customizeStore.isBtnTypeActive = true;
      } else {
        customizeStore.isBtnTypeActive = false;
      }

      const buttonshape = features
        .find((feature: any) => feature.name === "acc-customize-button-type")
        .features.find(
          (el) => el.name === "acc-customize-button-type-button-shape"
        );
      customizeStore.buttonShapeObj = buttonshape;
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
      customizeStore.buttonSizeObj = buttonsize;
      if (buttonsize.active == 1) {
        customizeStore.$state.buttonSizeSlider = buttonsize.value;
        customizeStore.$state.initbuttonSizeSlider = buttonsize.value;
      }
      // handle position
      const isBtnLocationActive = features.find(
        (feature: any) => feature.name === "acc-customize-button-location"
      );
      if (isBtnLocationActive.active == 1) {
        customizeStore.isBtnLocationActive = true;
      } else {
        customizeStore.isBtnLocationActive = false;
      }
      const buttonDesktopPosition = features
        .find(
          (feature: any) => feature.name === "acc-customize-button-location"
        )
        .features.find(
          (el) =>
            el.name === "acc-customize-button-location-button-location-desktop"
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
          (feature: any) => feature.name === "acc-customize-button-location"
        )
        .features.find(
          (el) =>
            el.name === "acc-customize-button-location-button-location-mobile"
        );
      customizeStore.buttonMobilePositions =
        buttonMobilePosition.tamkin_option_item_values;
      if (buttonMobilePosition.active == 1) {
        customizeStore.isButtonMobilePositionActive = true;
        customizeStore.$state.initialPositionMobile =
          buttonMobilePosition.value;
        customizeStore.$state.buttonPositionMobile = buttonMobilePosition.value;
      }

      // handle button translation
      const isLiveTransActive = features.find(
        (feature: any) => feature.name === "acc-customize-translations-button"
      );

      if (isLiveTransActive.active == 1) {
        customizeStore.isLiveTransBtnActive = true;
      } else {
        customizeStore.isLiveTransBtnActive = false;
      }

      const checkEnabledButtonTrans = features
        .find(
          (feature: any) => feature.name === "acc-customize-translations-button"
        )
        .features.find(
          (el) =>
            el.name ===
            "acc-customize-translations-button-enable-live-site-translations-button"
        );

      customizeStore.isEnableLiveTrans = checkEnabledButtonTrans;
      if (checkEnabledButtonTrans.active == 1) {
        if (checkEnabledButtonTrans.value == 1) {
          customizeStore.toggleCheckbox(
            "acc-customize-translations-button-enable-live-site-translations-button"
          );
          customizeStore.toggleInitialCheckbox(
            "acc-customize-translations-button-enable-live-site-translations-button"
          );
        }
      }

      const checkEnabledButtonTransAbove = features
        .find(
          (feature: any) => feature.name === "acc-customize-translations-button"
        )
        .features.find(
          (el) =>
            el.name ===
            "acc-customize-translations-button-position-translation-button-above"
        );

      customizeStore.buttonTransAboveIcons =
        checkEnabledButtonTransAbove.tamkin_option_item_values;
      if (checkEnabledButtonTransAbove.value == "option1") {
        customizeStore.changeAboveButtonShape("option1");
        customizeStore.initchangeAboveButtonShape("option1");
        customizeStore.$state.initcurrentAboveShapeLiveTranslation = "option1";
      } else if (checkEnabledButtonTransAbove.value == "option2") {
        customizeStore.changeAboveButtonShape("option2");
        customizeStore.initchangeAboveButtonShape("option2");
        customizeStore.$state.initcurrentAboveShapeLiveTranslation = "option2";
      } else {
        customizeStore.changeAboveButtonShape("option3");
        customizeStore.initchangeAboveButtonShape("option3");
        customizeStore.$state.initcurrentAboveShapeLiveTranslation = "option3";
      }

      if (checkEnabledButtonTransAbove.active == 1) {
        customizeStore.isButtonAboveActive = true;
        customizeStore.buttonAboveLabel = checkEnabledButtonTransAbove.label;
        if (checkEnabledButtonTransAbove.is_selected == 1) {
          customizeStore.selectLiveTranslationButtonLocation("above");
          customizeStore.initselectLiveTranslationButtonLocation("above");
        }
      }

      const checkEnabledButtonTransDefault = features
        .find(
          (feature: any) => feature.name === "acc-customize-translations-button"
        )
        .features.find(
          (el) =>
            el.name ===
            "acc-customize-translations-button-translation-button-as-default-button"
        );
      customizeStore.buttonTransDefaultIcons =
        checkEnabledButtonTransDefault.tamkin_option_item_values;

      if (checkEnabledButtonTransDefault.value == "option1") {
        customizeStore.changeDefaultButtonShape("option1"); // gb
        customizeStore.initchangeDefaultButtonShape("option1");
        customizeStore.$state.initcurrentShapeLiveTranslation = "option1";
      } else if (checkEnabledButtonTransDefault.value == "option2") {
        customizeStore.changeDefaultButtonShape("option2"); // en
        customizeStore.initchangeDefaultButtonShape("option2");
        customizeStore.$state.initcurrentShapeLiveTranslation = "option2";
      } else {
        customizeStore.changeDefaultButtonShape("option3"); // langs
        customizeStore.initchangeDefaultButtonShape("option3");
        customizeStore.$state.initcurrentShapeLiveTranslation = "option3";
      }

      if (checkEnabledButtonTransDefault.active == 1) {
        customizeStore.buttonDefaultLabel =
          checkEnabledButtonTransDefault.label;
        customizeStore.isButtonDefaultActive = true;
        if (checkEnabledButtonTransDefault.is_selected == 1) {
          customizeStore.selectLiveTranslationButtonLocation("default");
          customizeStore.initselectLiveTranslationButtonLocation("default");
        }
      }

      const isWidgetCustomizationActive = features.find(
        (feature: any) => feature.name === "acc-customize-widget-customization-"
      );

      if (isWidgetCustomizationActive.active == 1) {
        customizeStore.widgetCustomizationItems =
          isWidgetCustomizationActive.features;
        customizeStore.isWidgetCustomizationActive = true;
      } else {
        customizeStore.isWidgetCustomizationActive = false;
      }

      // oversized widget
      const isOversized = features
        .find(
          (feature: any) =>
            feature.name === "acc-customize-widget-customization-"
        )
        .features.find(
          (el) =>
            el.name === "acc-customize-widget-customization--oversized-widget"
        );

      if (isOversized.value == 1 && isOversized.active == 1) {
        customizeStore.toggleCheckbox(
          "acc-customize-widget-customization--oversized-widget"
        );
        customizeStore.toggleInitialCheckbox(
          "acc-customize-widget-customization--oversized-widget"
        );
      }
      // isThreeColumns
      const isThreeColumns = features
        .find(
          (feature: any) =>
            feature.name === "acc-customize-widget-customization-"
        )
        .features.find(
          (el) =>
            el.name ===
            "acc-customize-widget-customization--3-column-layout-widget"
        );

      if (isThreeColumns.value == 1 && isThreeColumns.active == 1) {
        customizeStore.toggleCheckbox(
          "acc-customize-widget-customization--3-column-layout-widget"
        );
        customizeStore.toggleInitialCheckbox(
          "acc-customize-widget-customization--3-column-layout-widget"
        );
      }
      // isAccProfiles
      const isAccProfiles = features
        .find(
          (feature: any) =>
            feature.name === "acc-customize-widget-customization-"
        )
        .features.find(
          (el) =>
            el.name ===
            "acc-customize-widget-customization--accessibility-profiles"
        );

      if (isAccProfiles.value == 1 && isAccProfiles.active == 1) {
        customizeStore.toggleCheckbox(
          "acc-customize-widget-customization--accessibility-profiles"
        );
        customizeStore.toggleInitialCheckbox(
          "acc-customize-widget-customization--accessibility-profiles"
        );
      }

      // acc mode
      const isAccessibilityModeCardActive = features.find(
        (feature: any) => feature.name === "acc-customize-accessibility-mode"
      );
      if (isAccessibilityModeCardActive.active == 1) {
        customizeStore.isAccessibilityModeCardActive = true;
      } else {
        customizeStore.isAccessibilityModeCardActive = false;
      }
      const isAccModeActive = features
        .find(
          (feature: any) => feature.name === "acc-customize-accessibility-mode"
        )
        .features.find(
          (el) =>
            el.name ===
            "acc-customize-accessibility-mode-move-/-hide-accessibility"
        );
      customizeStore.accessibilityModeItems =
        isAccModeActive.tamkin_option_item_values;
      if (isAccModeActive.active == 1) {
        customizeStore.$state.accessibilityMode = isAccModeActive.value;
        customizeStore.$state.initaccessibilityMode = isAccModeActive.value;
      }

      const isAccModeValTrue = features
        .find(
          (feature: any) => feature.name === "acc-customize-accessibility-mode"
        )
        .features.find(
          (el) =>
            el.name ===
            "acc-customize-accessibility-mode-move-/-hide-accessibility-button"
        );
      customizeStore.moveHideFeature = isAccModeValTrue;

      if (isAccModeValTrue.active == 1 && isAccModeValTrue.value == 1) {
        customizeStore.toggleCheckbox(
          "acc-customize-accessibility-mode-move-/-hide-accessibility"
        );
        customizeStore.toggleInitialCheckbox(
          "acc-customize-accessibility-mode-move-/-hide-accessibility"
        );
      }

      // accessbility main menu
      const mainMenu = features.find(
        (feature: any) => feature.name === "acc-addons-main-menu"
      );

      if (mainMenu.active == 1) {
        customizeStore.isMainMenuActive = true;
        customizeStore.initializeCardsMenu(
          mainMenu.features
            .filter((el: any) => el.active == 1)
            .sort((a: any, b: any) => a.sort - b.sort),
          "AdjustMainMenuCardsCustomize",
          "initialCardsOrderCustomize"
        );

        checkboxStore.initializeCardsMenu(
          mainMenu.features
            .filter((el: any) => el.active == 1)
            .sort((a: any, b: any) => a.sort - b.sort),
          "AdjustMainMenuCards",
          "initialCardsOrder"
        );

        mainMenu.features.forEach((element: any) => {
          if (element.value == 1) {
            customizeStore.toggleCheckbox(element.name);
            customizeStore.toggleInitialCheckbox(element.name);
            checkboxStore.toggleCheckbox(element.name);
            checkboxStore.toggleInitialCheckbox(element.name);
          }
        });
      } else {
        customizeStore.isMainMenuActive = false;
      }

      // accessbility profiles
      const profileItems = features.find(
        (feature: any) => feature.name === "acc-addons-accessibility-profiles"
      );

      if (profileItems.active == 1) {
        customizeStore.isProfilesCardsctive = true;
        customizeStore.initializeCardsMenu(
          profileItems.features
            .filter((el: any) => el.active == 1)
            .sort((a: any, b: any) => a.sort - b.sort),
          "manageProfileCardsCustomize",
          "initialManageProfileCardsCustomize"
        );

        checkboxStore.initializeCardsMenu(
          profileItems.features
            .filter((el: any) => el.active == 1)
            .sort((a: any, b: any) => a.sort - b.sort),
          "manageProfileCards",
          "initialManageProfileCards"
        );

        profileItems.features.forEach((element: any) => {
          if (element.value == 1) {
            customizeStore.toggleCheckbox(element.name);
            customizeStore.toggleInitialCheckbox(element.name);
            checkboxStore.toggleCheckbox(element.name);
            checkboxStore.toggleInitialCheckbox(element.name);
          }
        });
      } else {
        customizeStore.isProfilesCardsctive = false;
      }

      // acc widget type
      const isAccWidgetTypeActive = features.find(
        (feature: any) => feature.name === "acc-customize-widget-type"
      );
      if (isAccWidgetTypeActive.active == 1) {
        customizeStore.isAccWidgetTypeActive = true;
      } else {
        customizeStore.isAccWidgetTypeActive = false;
      }

      const AccWidgetType = features
        .find((feature: any) => feature.name === "acc-customize-widget-type")
        .features.find(
          (el) => el.name === "acc-customize-widget-type-widget-style"
        );
      if (AccWidgetType.active == 1) {
        customizeStore.widgetTypes = AccWidgetType.tamkin_option_item_values;
        customizeStore.selectWidgetType(AccWidgetType.value);
      }

      // set languages
      customizeStore.$state.languages.push({
        language_name: t("Auto detect Language"),
        language_code: "auto detect language",
      });
      res.data.data.languages.forEach((el: any) => {
        customizeStore.$state.languages.push(el);
      });
      const isLang = features.find(
        (feature: any) => feature.name === "acc-customize-language"
      );
settingsStore.manageAccessibility = res.data.data.manage_feature_accessibility
      if (isLang.active == 1) {
        customizeStore.isLanguagective = true;
      } else {
        customizeStore.isLanguagective = false;
      }

      const selectLang = features
        .find((feature: any) => feature.name === "acc-customize-language")
        .features.find(
          (el: any) => el.name === "acc-customize-language-list-of-languages"
        );
      if (selectLang.active == 1) {
        customizeStore.isLangListActive = true;
      }

      if (selectLang.value === "auto detect language") {
        customizeStore.selectedLang = {
          language_name: t("Auto detect Language"),
          language_code: "auto detect language",
        };
        customizeStore.initselectedLang = {
          language_name: t("Auto detect Language"),
          language_code: "auto detect language",
        };
      } else {
        const selectedLanguage = res.data.data.languages.filter((el: any) => {
          return el.language_code == selectLang.value;
        })[0];

        customizeStore.selectedLang = selectedLanguage;
        customizeStore.initselectedLang = selectedLanguage;
      }

      // acc enableLangHighlight
      const enableLangHighlight = features
        .find((feature: any) => feature.name === "acc-customize-language")
        .features.find(
          (el) =>
            el.name ===
            "acc-customize-language-show-language-selector-on-the-widget"
        );
      customizeStore.accessibilityLanguage = enableLangHighlight;
      if (enableLangHighlight.value == 1) {
        customizeStore.toggleCheckbox(
          "acc-customize-language-show-language-selector-on-the-widget"
        );
        customizeStore.toggleInitialCheckbox(
          "acc-customize-language-show-language-selector-on-the-widget"
        );
      }

      // acc isEnableSoundEffect
      const isAccessibilitySettingsActive = features.find(
        (feature: any) => feature.name === "acc-setting-general-settings"
      );

      customizeStore.settingsItems = isAccessibilitySettingsActive.features;
      if (isAccessibilitySettingsActive.active == 1) {
        customizeStore.isAccessibilitySettingsActive = true;
      } else {
        customizeStore.isAccessibilitySettingsActive = false;
      }

      const isEnableSoundEffect = features
        .find((feature: any) => feature.name === "acc-setting-general-settings")
        .features.find(
          (el) => el.name === "acc-setting-general-settings-sound-effects"
        );

      if (isEnableSoundEffect.active == 1 && isEnableSoundEffect.value == 1) {
        settingsStore.setCheckboxValue(
          "acc-setting-general-settings-sound-effects",
          true
        );
        settingsStore.setinitCheckboxValue(
          "acc-setting-general-settings-sound-effects",
          true
        );
      } else {
        settingsStore.setCheckboxValue(
          "acc-setting-general-settings-sound-effects",
          false
        );
        settingsStore.setinitCheckboxValue(
          "acc-setting-general-settings-sound-effects",
          false
        );
      }

      // acc isEnableOnMobile
      const isEnableOnMobile = features
        .find((feature: any) => feature.name === "acc-setting-general-settings")
        .features.find(
          (el) =>
            el.name === "acc-setting-general-settings-widget-enabled-on-mobile"
        );
      if (isEnableOnMobile.active == 1 && isEnableOnMobile.value == 1) {
        settingsStore.setCheckboxValue(
          "acc-setting-general-settings-widget-enabled-on-mobile",
          true
        );
        settingsStore.setinitCheckboxValue(
          "acc-setting-general-settings-widget-enabled-on-mobile",
          true
        );
      } else {
        settingsStore.setCheckboxValue(
          "acc-setting-general-settings-widget-enabled-on-mobile",
          false
        );
        settingsStore.setinitCheckboxValue(
          "acc-setting-general-settings-widget-enabled-on-mobile",
          false
        );
      }
      // acc isEnableOnThisSite
      const isEnableOnThisSite = features
        .find((feature: any) => feature.name === "acc-setting-general-settings")
        .features.find(
          (el) =>
            el.name ===
            "acc-setting-general-settings-widget-enabled-on-this-site"
        );

      if (isEnableOnThisSite.active == 1 && isEnableOnThisSite.value == 1) {
        settingsStore.setCheckboxValue(
          "acc-setting-general-settings-widget-enabled-on-this-site",
          true
        );
        settingsStore.setinitCheckboxValue(
          "acc-setting-general-settings-widget-enabled-on-this-site",
          true
        );
      } else {
        settingsStore.setCheckboxValue(
          "acc-setting-general-settings-widget-enabled-on-this-site",
          false
        );
        settingsStore.setinitCheckboxValue(
          "acc-setting-general-settings-widget-enabled-on-this-site",
          false
        );
      }
      // reset settings
      const isAccessibilityResetActive = features.find(
        (feature: any) =>
          feature.name === "acc-setting-rest-all-accessibility-settings"
      );
      if (isAccessibilityResetActive.active == 1) {
        customizeStore.isAccessibilityResetActive = true;
      } else {
        customizeStore.isAccessibilityResetActive = false;
      }
      const isAccessibilityLiecenceTransferActive = features.find(
        (feature: any) => feature.name === "acc-setting-license-settings"
      );
      customizeStore.transferLicenceItems =
        isAccessibilityLiecenceTransferActive.features;
      if (isAccessibilityLiecenceTransferActive.active == 1) {
        customizeStore.isAccessibilityLiecenceTransferActive = true;
      } else {
        customizeStore.isAccessibilityLiecenceTransferActive = false;
      }

      checkboxStore.loadingData = false;
      customizeStore.loadingData = false;
    } catch (error) {
      checkboxStore.loadingData = false;
      customizeStore.loadingData = false;
      console.error(error); // Better error handling
      throw typeof error === "string" ? error : "There is something wrong";
    }
  };

  return {
    getAccessability,
    loading,
  };
}
