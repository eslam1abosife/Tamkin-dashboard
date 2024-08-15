import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const userPermissions = ref(null);

    const getUserPermissions = async (name) => {
        try {
            const res = await api.post('/Team/Get/UserPermission', {
                data: {
                    name: name
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            userPermissions.value = res.data.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        userPermissions,
        getUserPermissions,
        loading
    }
}