import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const updateUserPermission = async (state) => {
        try {
            const res = await api.post('/Team/set/UpdatePermission', {
                data: {
                    member_email: state.email,
                    permissions: state.permissions
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            return true
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        updateUserPermission,
        loading,
    }
}