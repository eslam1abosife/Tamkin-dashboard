import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getTraffic = async (app,type) => {
        try {
            const res = await api.post('/Apps/Get/Traffic',{
               
                    "Urls":type === 'url' ? [app] : [],
                    "Apps":type === 'app' ? [app] : []
              
            });
         
            return res.data.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getTraffic,
        loading
    }
}