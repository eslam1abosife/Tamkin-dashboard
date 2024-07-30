import { useApi } from "@/composables/useApi";
import { useNuxtApp } from '#app';
import { useRouter } from "#vue-router";

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();

    const loginUser = async () => {
        try {
            const res = await api.post('/Account/Login', { Username: state.email, Password: state.password });
            if(!res.data.succeeded) throw(res.data.message);

            console.log('data', res.data.data)
            localStorage.setItem('user', JSON.stringify(res.data.data));
            // redirect to homepage if user is authenticated
            router.push('/my-site');

            state.email = "";
            state.password = "";
            $toast(`Hi ${res.data.data.user_id}<br/>Welcome Back`, {
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
        loginUser,
        loading
    }
}