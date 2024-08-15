import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from "#vue-router";

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();

    const forgetPassword = async () => {
        try {
            const res = await api.post('/Account/ForgetPassword', {
                data: {
                    email: state.email
                }
            });
            if(!res.data.succeeded) throw(res.data.message);

            // redirect to homepage if user is authenticated
            router.push('/auth/otp?from=forget-password');

        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        loading,
        forgetPassword
    }
}