import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const permissions = ref(null);

    const getPermissions = async () => {
        try {
            const res = await api.post('/Team/Get/AllPermission');
            if(!res.data.succeeded) throw(res.data.message);
            permissions.value = res.data.data;
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        permissions,
        getPermissions,
        loading
    }
}