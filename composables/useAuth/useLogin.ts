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
            if(!res.data.succeeded) throw(res.data?.message);
            console.log('res.data', res.data)
            user.value = res.data?.data;

            tokenCookie.value = user.value?.sid;
            isLoggedInCookie.value = true;
            localStorage.setItem('user', JSON.stringify(user.value));

            userStore.setToken(user.value?.sid);
            userStore.setIsLoggedIn(true);
            userStore.setUser(user.value);

            state.email = "";
            state.password = "";

        } catch (error) {
            const errMsg = typeof(error) === 'string' ? error : 'There is something wrong';
            throw errMsg;
        }
    };

    return {
        user,
        loginUser,
        loading
    }
}