import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const restoreApp = async (appName) => {
        try {
            const res = await api.post('/mySite/set/AppStatusRestore', {
                data: {
                    name: appName
                }
            });
            $toast(`You restored the app successfully!`, {
                "theme": "colored",
                "type": "success",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            });
        } catch (error) {
            $toast(`Oops!<br/>${ typeof(error) === 'string' ? error : 'There is something wrong'}`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            });
            throw error;
        }
    };

    return {
        restoreApp,
        loading
    }
}