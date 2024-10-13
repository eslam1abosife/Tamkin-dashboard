import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api, loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const translateVideo = async (payload, options = {}) => {
        try {
            const res = await api.post('/SignLanguage/TranslateVideo', 
                payload,  // This is your data payload
                options   // This is where options like onUploadProgress go
            );
            if (!res.data.succeeded) throw(res.data.message);
            return res.data.data;
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        translateVideo,
        loading
    };
}
