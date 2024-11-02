import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const codeAudio = ref()
    const messageDataAudio = ref()
    const translateAudio = async (payload) => {
        try {
            const res = await api.post('/SignLanguage/TranslateAudio', {
             ...payload
            });
            // if(!res.data.succeeded) throw(res.data.message);
            codeAudio.value = res.data.statusCode
messageDataAudio.value = res.data.message
            return res.data.data;
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        translateAudio,
        loading,
        codeAudio,
messageDataAudio
    }
}