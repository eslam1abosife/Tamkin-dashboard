import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api, loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const messageError = ref()
    const codstatus = ref()
    let controller = ref(null);  

    const updateProject = async (payload) => {
        controller.value = new AbortController();

        try {
            const res = await api.post('/SignLanguage/Translate', {
                ...payload,
            }, {
                signal: controller.value.signal  ,
                timeout: 900000,

            });

            messageError.value = res.data.message
            codstatus.value = res.data.statusCode

            return res.data.data;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request canceled');
            } else {
                throw typeof(error) === 'string' ? error : 'There is something wrong';
            }
        } finally {
            controller.value = null;  
        }
    };

    const cancelRequest = () => {
        if (controller) {
            controller.value.abort(); 
            controller.value = null;   
        }
    };

    return {
        updateProject,
        cancelRequest,  
        loading,
        controller,
        messageError,
codstatus
    };
}
