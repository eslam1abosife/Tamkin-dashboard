import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const translateStore = useTranslateStore()
    const codeStatus = ref()
    const message = ref()
    const getPackages = async () => {
        try {
            const res = await api.post('/mySite/GetAgencyApps/InternalService', {
                
            }
            );
            codeStatus.value = res.data.statusCode
            message.value = res.data.message
                 return res.data.data;
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };
    

    return {
        getPackages,
        loading,
        codeStatus,
        message
    }
    
}