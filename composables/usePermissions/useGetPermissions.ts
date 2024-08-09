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
            $toast(`Oops!<br/>${ typeof(error) === 'string' ? error : 'There is something wrong'}`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            })
            throw error;
        }
    };

    return {
        permissions,
        getPermissions,
    }
}