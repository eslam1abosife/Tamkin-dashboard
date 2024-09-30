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

            if(buttonshape.active == 1){
                customizeStore.$state.buttonShapeSelector = buttonshape.value;
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
                customizeStore.$state.initialPositionMobile= buttonMobilePosition.value;
            }
            

            // return res.data.data;
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
