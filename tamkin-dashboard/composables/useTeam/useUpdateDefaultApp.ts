import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const updateDefaultApp = async (appName) => {
        try {
            const res = await api.post('/mySite/set/defaultApps', {
         
                    Apps:appName
                
            });
            if(!res.data.succeeded) throw(res.data.message);

        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        updateDefaultApp,
        loading
    }
}