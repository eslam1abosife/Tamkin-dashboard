import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();

    const verifyCode = async () => {
        try {
            const res = await api.post('/Account/Confirm', {
                data: {
                    email: state.email,
                    key: state.key
                }
            });

            if(!res.data.succeeded) throw(res.data.message);

        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    const checkForgetCode = async () => {
        try {
            const res = await api.post('/Account/CheckForgectPasswordCode', {
                data: {
                    email: state.email,
                    key: state.key
                }
            });

            if(!res.data.succeeded) throw(res.data.message);

        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    }

    return {
        verifyCode,
        loading,
        checkForgetCode
    }
}