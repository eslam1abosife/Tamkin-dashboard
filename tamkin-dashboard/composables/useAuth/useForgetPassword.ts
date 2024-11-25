import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from "#vue-router";
import { useIncludeWord } from "@/composables/useSharedFunctions";

const { isIncludeWord } = useIncludeWord();

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();
const localePath = useLocalePath()
    const forgetPassword = async (redirect = true) => {
        try {
            const res = await api.post('/Account/ForgetPassword', {
                data: {
                    email: state.email
                }
            });
            if(!res.data.succeeded) throw(res.data.message);

            if(redirect) {
                // redirect to homepage if user is authenticated
                router.push({ path: localePath('/auth/otp'), query: { from: 'forget-password' } });
            }

        } catch (error) {
            const errMsg = typeof(error) === 'string' ? error : 'There is something wrong';
            if(isIncludeWord(errMsg, ['confirm', 'needs'])) {
                // router.push('/auth/otp?from=register')
                router.push({ path: localePath('/auth/otp'), query: { from: 'register' } });

                return;
            }
            throw errMsg;
        }
    };

    return {
        loading,
        forgetPassword
    }
}