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
            const res = await api.post('/Account/RestPassword', state);
            if(!res.data.succeeded) throw(res.data.message);

            console.log('data', res.data.data)

            // redirect to homepage if user is authenticated
            router.push('/auth/otp');

            $toast(`You Received the OTP<br/>enter the otp`, {
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
        forgetPassword,
    }
}