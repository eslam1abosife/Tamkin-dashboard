import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from '#vue-router';

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();

    const register = async (onSuccess) => {
        try {
            const res = await api.post('/Account/Register', {...state});
            if(!res.data.succeeded) throw(res.data.message);

            router.push(`/auth/otp?from=register`);

            if(onSuccess) {
                onSuccess(state);
            }
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        register,
        loading
    }
}