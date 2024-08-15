import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const deleteMember = async (email) => {
        try {
            const res = await api.post('/Team/DeleteMember', {
                data: {
                    email: email
                }
            });
            if(!res.data.succeeded) throw(res.data.message);

        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        deleteMember,
        loading
    }
}