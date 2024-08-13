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
            if(!res.data.succeeded) throw(res.data.message);
            code.value = res.data.data.match(/\d+/)[0];
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        resendCode,
        loading
    }
}