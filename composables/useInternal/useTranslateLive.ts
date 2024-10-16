import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api, loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const codeStatusLive = ref('')
    const messageDataLive = ref('')

    const translateVideoLive = async (payload) => {
        try {
                //  console.log(payload)

            const res = await api.post('/SignLanguage/TranslateLiveVideo', 
                payload
       
            );
            codeStatusLive.value = res.data.statusCode
            messageDataLive.value = res.data.message
                 return res.data.data;
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        translateVideoLive,
        loading,
        codeStatusLive,
        messageDataLive
    };
}
