import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const translateStore = useTranslateStore()
    const codeStatusforinfo = ref()
    const messageLiveInfo = ref()
    const getLiveVideoInfo = async (url) => {
        try {
            const res = await api.post('/SignLanguage/GetInfoLiveVidel', {
                "url":url
            }
            );
            codeStatusforinfo.value = res.data.statusCode
            messageLiveInfo.value = res.data.message
                 return res.data.data;
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };
    

    return {
        getLiveVideoInfo,
        loading,
        codeStatusforinfo,
        messageLiveInfo
    }
    
}