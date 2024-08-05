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

            $toast(`You account verified successfully!`, {
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
        verifyCode,
        loading
    }
}