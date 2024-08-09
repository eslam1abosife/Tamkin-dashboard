import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from "#vue-router";

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();

    const confirmForgetPassword = async (state) => {
        try {
            const res = await api.post('/Account/ResetPassword', {
                data: {
                    email: state.email,
                    new_password: state.password,
                    key: state.key
                }
            });
            if(!res.data.succeeded) throw(res.data.message);

            // redirect to homepage if user is authenticated
            router.push('/auth/login');

            $toast(`Your Password changed successfully!`, {
                "theme": "colored",
                "type": "success",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            })
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
        confirmForgetPassword,
    }
}