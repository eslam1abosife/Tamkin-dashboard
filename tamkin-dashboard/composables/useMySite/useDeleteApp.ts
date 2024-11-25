import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const deleteApp = async (appName) => {
        try {
            const res = await api.post('/mySite/set/AppStatusDelete', {
                data: {
                    name: appName
                }
            });
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        deleteApp,
        loading
    }
}