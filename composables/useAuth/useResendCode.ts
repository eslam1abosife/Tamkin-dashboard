import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from '#vue-router';

export default function(email) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();

    const resendCode = async () => {
        try {
            const res = await api.post('/Account/SendConfirm', {
                data: {
                    email
                }
            });
            $toast(`You have received a verification code in your email`, {
                "theme": "colored",
                "type": "success",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            });
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
        resendCode,
        loading
    }
}