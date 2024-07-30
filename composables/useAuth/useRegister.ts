import { useApi } from "@/composables/useApi";
import useLogin from './useLogin';
import { useNuxtApp } from '#app';
import { useRouter } from "#vue-router";

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();
    const { loginUser } = useLogin();

    const register = async () => {
        try {
            const res = await api.post('/Account/Register', state);
            if(!res.data.succeeded) throw(res.data.message);
            loginUser();
        } catch (error) {
            $toast(`Oops!<br/>${ typeof(error) === 'string' ? error : 'There is something wrong'}`, {
                "theme": "colored",
                "type": "error",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            })
        }
    };

    return {
        register,
        loading
    }
}