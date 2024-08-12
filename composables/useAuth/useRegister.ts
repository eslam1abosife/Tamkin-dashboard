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
            $toast(`Oops!<br/>${ typeof(error) === 'string' ? error : 'There is something wrong'}`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            });
            throw error;
        }
    };

    return {
        register,
        loading
    }
}