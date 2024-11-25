import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api, loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    let controller = ref(null);  // AbortController instance

    const setPlayerSettings = async (payload) => {
        controller = new AbortController();

        try {
            const res = await api.post('/SignLanguage/SetPlayerSettings', {
                ...payload
            }, {
                signal: controller.signal,
                timeout: 900000,

            });
            
            if (!res.data.succeeded) throw(res.data.message);
            return res.data.data;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request canceled');
            } else {
                throw typeof(error) === 'string' ? error : 'There is something wrong';
            }
        } finally {
            controller = null;  
        }
    };

    const cancelRequest = () => {
        if (controller) {
            controller.abort();  // Abort the ongoing request
            controller.value = null;    // Reset controller
        }
    };

    return {
        setPlayerSettings,
        cancelRequest,   // Expose cancelRequest function
        loading,
        controller
    };
}
