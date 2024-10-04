import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const customizeStore = useCustomizeStore();

    const getAccessability  = async () => {
        try {
            const res = await api.post('/Widget/GetAccessibility/default');
            const features = res.data.data.features;

            // button color 
            const colorMode  =features.find((feature: any) => feature.name === "acc-customize-button-color")
            .features.find(el => el.name === "acc-customize-button-color-button-color").value.split(",");
            
            if(colorMode.length > 1){
                customizeStore.$state.colorMode = "gradient";
                customizeStore.$state.gradient1 = colorMode[0];
                customizeStore.$state.gradient2 = colorMode[1];
            }else {
                customizeStore.$state.currentColor = colorMode[0];
            }
            
            // button type shape 
            const buttonshape  =features.find((feature: any) => feature.name === "acc-customize-button-type")
            .features.find(el => el.name === "acc-customize-button-type-button-shape");
            customizeStore.$state.buttonIcons =  buttonshape.tamkin_option_item_values;

            if(buttonshape.active == 1){
                customizeStore.$state.buttonShapeSelector = buttonshape.value;
                customizeStore.$state.selectedIcon = buttonshape.tamkin_option_item_values.find(el => el.value === buttonshape.value).icon;
            }

             // handle size button 
            const buttonsize  =features.find((feature: any) => feature.name === "acc-customize-button-type")
            .features.find(el => el.name === "acc-customize-button-type-button-size");
            if(buttonsize.active == 1){
                customizeStore.$state.buttonSizeSlider = buttonsize.value;
            }
            // handle position 
            const buttonDesktopPosition  =features.find((feature: any) => feature.name === "acc-customize-button-location")
            .features.find(el => el.name === "acc-customize-button-location-button-location-desktop");
            if(buttonDesktopPosition.active == 1){
                customizeStore.$state.initialPositionDesktop = buttonDesktopPosition.value;
                customizeStore.$state.buttonPositionDesktop= buttonDesktopPosition.value;
            }
            const buttonMobilePosition  =features.find((feature: any) => feature.name === "acc-customize-button-location")
            .features.find(el => el.name === "acc-customize-button-location-button-location-mobile");
            if(buttonMobilePosition.active == 1){
                customizeStore.$state.initialPositionMobile = buttonMobilePosition.value;
                customizeStore.$state.buttonPositionMobile= buttonMobilePosition.value;
            }
            
            // handle button translation 
            const checkEnabledButtonTrans = features.find((feature: any) => feature.name === "acc-customize-translations-button")
            .features.find(el => el.name === "acc-customize-translations-button-enable-live-site-translations-button");

            if(checkEnabledButtonTrans.value ==1 && checkEnabledButtonTrans.active == 1){        
                customizeStore.toggleCheckbox('enable_live_site')      
            }

            const checkEnabledButtonTransAbove = features.find((feature: any) => feature.name === "acc-customize-translations-button")
            .features.find(el => el.name === "acc-customize-translations-button-position-translation-button-above");

            if( checkEnabledButtonTransAbove.active == 1 && checkEnabledButtonTransAbove.is_selected == '1'){        
                customizeStore.selectLiveTranslationButtonLocation('above')
                if(checkEnabledButtonTransAbove.value == 'option1'){
                    customizeStore.changeDefaultButtonShape('gb')
                }
                else if(checkEnabledButtonTransAbove.value == 'option2'){
                    customizeStore.changeDefaultButtonShape('en')
                }
                else{
                    customizeStore.changeDefaultButtonShape('langs')
                }
            }

            const checkEnabledButtonTransDefault = features.find((feature: any) => feature.name === "acc-customize-translations-button")
            .features.find(el => el.name === "acc-customize-translations-button-translation-button-as-default-button");

            if( checkEnabledButtonTransDefault.active == 1  && checkEnabledButtonTransDefault.is_selected == '1'){       
                customizeStore.selectLiveTranslationButtonLocation('default') ;
                if(checkEnabledButtonTransDefault.value == 'option1'){
                    customizeStore.changeDefaultButtonShape('gb')
                }
                else if(checkEnabledButtonTransDefault.value == 'option2'){
                    customizeStore.changeDefaultButtonShape('en')
                }
                else{
                    customizeStore.changeDefaultButtonShape('langs')
                }
            }

            // oversized widget 
            const  isOversized = features.find((feature: any) => feature.name === "acc-customize-widget-customization-")
            .features.find(el => el.name === "acc-customize-widget-customization--oversized-widget");
            
            if(isOversized.value == 1 && isOversized.active == 1){
                customizeStore.toggleCheckbox('oversized_widget')      
            }
            // isThreeColumns 
            const  isThreeColumns = features.find((feature: any) => feature.name === "acc-customize-widget-customization-")
            .features.find(el => el.name === "acc-customize-widget-customization--3-column-layout-widget");
            
            if(isThreeColumns.value == 1 && isThreeColumns.active == 1){
                customizeStore.toggleCheckbox('3_column_layout_widget')      
            }
            // isAccProfiles 
            const  isAccProfiles = features.find((feature: any) => feature.name === "acc-customize-widget-customization-")
            .features.find(el => el.name === "acc-customize-widget-customization--accessibility-profiles");
            
            if(isAccProfiles.value == 1 && isAccProfiles.active == 1){
                customizeStore.toggleCheckbox('accessibility_profiles')      
            }

            // acc mode 
            const  isAccModeActive = features.find((feature: any) => feature.name === "acc-customize-accessibility-mode")
            .features.find(el => el.name === "acc-customize-accessibility-mode-move-/-hide-accessibility");
            
            if(isAccModeActive.active == 1){
                customizeStore.toggleCheckbox('move_access');
                customizeStore.$state.accessibilityMode= isAccModeActive.value;

            }

        } catch (error) {
            console.error(error); // Better error handling
            throw typeof error === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getAccessability,
        loading
    }
}
