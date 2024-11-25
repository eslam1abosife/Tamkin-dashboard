import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api, loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const codeStatus = ref('')
    const messageData = ref('')

    const translateImage = async (payload, options = {}) => {
        try {
                 console.log(payload)

            const res = await api.post('/SignLanguage/TranslatePhotos', 
                payload,  
                options   
            );
            codeStatus.value = res.data.statusCode
                 messageData.value = res.data.message
                 return res.data.data;
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        translateImage,
        loading,
        codeStatus,
messageData
    };
}
