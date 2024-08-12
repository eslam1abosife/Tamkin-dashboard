import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from '#vue-router';

export default function() {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();
    const code = ref(null);

    const resendCode = async (email) => {
        try {
            const res = await api.post('/Account/SendConfirm', {
                data: {
                    email
                }
            });
            code.value = res.data.data.match(/\d+/)[0];
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