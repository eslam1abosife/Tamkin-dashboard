import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function(email) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const resendInvite = async (onSuccess) => {
        try {
            const res = await api.post('/Team/Resendinvite', {
                data: {
                    email: email
                }
            });
            if(!res.data.succeeded) throw(res.data.message);
            if(onSuccess) {
                onSuccess();
            }
        } catch (error) {
            
            throw typeof(error) === 'string' ? error : 'There is something wrong'
        }
    };

    return {
        resendInvite,
        loading
    }
}