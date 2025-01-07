import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from "#vue-router";

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();
const localePath = useLocalePath()
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
            const removecanview = useCookie('can_view')
            removecanview.value = 'done'
            router.push({ path: localePath('/auth/success') });



        } catch (error) {
            throw error ? error : 'There is something wrong';
        }
    };

    return {
        confirmForgetPassword,
        loading
    }
}