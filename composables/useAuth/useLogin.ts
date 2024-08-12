import { useApi } from "@/composables/useApi";
import { useNuxtApp, useCookie } from '#app';
import { useUserStore } from "@/stores/auth"; // Import the Pinia store
import { useRouter } from '#vue-router';

export default function(state) {
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();
    const { $toast } = useNuxtApp();
    const router = useRouter();
    const user = ref(null);
    const userStore = useUserStore();

    const tokenCookie = useCookie('token', { secure: true, sameSite: 'strict' });
    const isLoggedInCookie = useCookie('isLoggedIn', { secure: true, sameSite: 'strict' });

    const loginUser = async () => {
        try {
            const res = await api.post('/Account/Login', { Username: state.email, Password: state.password });
            if(!res.data.succeeded) throw(res.data.message);
            user.value = res.data.data;

            tokenCookie.value = user.value?.sid;
            isLoggedInCookie.value = true;
            localStorage.setItem('user', JSON.stringify(user.value));

            userStore.setToken(user.value?.sid);
            userStore.setIsLoggedIn(true);
            userStore.setUser(user.value);

            state.email = "";
            state.password = "";
            $toast(`Hi ${res.data.data.user_id}<br/>Welcome Back`, {
                "theme": "colored",
                "type": "success",
                "autoClose": 4000,
                "dangerouslyHTMLString": true
            });

        } catch (error) {
            // $toast(`Oops!<br/>${ }`, {
            //     "theme": "colored",
            //     "type": "error",
            //     "autoClose": 4000,
            //     "dangerouslyHTMLString": true
            // });
            throw typeof(error) === 'string' ? error : 'There is something wrong';
        }
    };

    return {
        user,
        loginUser,
        loading
    }
}