import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';



export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const translateStore = useTranslateStore()
    const deleteProject = async (pojid) => {
        try {
            const res = await api.post('/SignLanguage/DeleteProject', {
                name:pojid,
            });
            if(!res.data.succeeded) throw(res.data.message);
            return res.data.data;
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        deleteProject,
        loading
    }
}