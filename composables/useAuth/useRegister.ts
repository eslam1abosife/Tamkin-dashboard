import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from '#vue-router';

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();
const localePath = useLocalePath()

    /**
     * Register a user with the given state.
     * If the operation is successful, the router will be pushed to the home page.
     * If a callback function is provided, it will be called with the state as parameter.
     * 
     * @param {function} [onSuccess] - A callback function to be called with the state as parameter.
     * @throws {string} - If the server returns an error message, it will be thrown.
     *                    If the error is not a string, a default error message is thrown.
     */
    const register = async (onSuccess) => {
        try {
            const res = await api.post('/Account/Register', {...state});
            if(!res.data.succeeded) throw(res.data.message);


            router.push({ path: localePath('/auth/otp'), query: { from: 'register' } });

            if(onSuccess) {
                onSuccess(state);
            }
        } catch (error) {
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        register,
        loading
    }
}