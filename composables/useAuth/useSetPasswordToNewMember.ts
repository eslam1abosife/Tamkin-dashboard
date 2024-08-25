import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from "#vue-router";

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();

    const setPasswordToNewMember = async (state) => {
        try {
            const res = await api.post('/Account/SetNewPasswordToNewMember', {
                data: {
                    email : state.email,
                    new_password: state.password
                }
            });
            if(!res.data.succeeded) throw(res.data.message);

            // redirect to homepage if user is authenticated
            router.push('/auth/success');


        } catch (error) {
            throw error ? error : 'There is something wrong';
        }
    };

    return {
        setPasswordToNewMember
    }
}
