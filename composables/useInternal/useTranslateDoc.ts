import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api, loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const codeStatus = ref('')
    const messageData = ref('')

    const translateDoc = async (payload, options = {}) => {
        try {

            const res = await api.post('/SignLanguage/TranslateDoucments', 
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
        translateDoc,
        loading,
        codeStatus,
messageData
    };
}
