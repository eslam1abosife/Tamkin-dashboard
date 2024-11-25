import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const getPackageMySite = async ( packageName) => {
        try {
            const res = await api.post('/Packages/GetPackage',{
                "data":{
                    "name":packageName
                }
            });
            return res.data
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        getPackageMySite,
        loading
    }
}