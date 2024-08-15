import {useCookie, useNuxtApp} from "#app";
import { useApi } from "@/composables/useApi";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useUserStore} from "~/stores/auth";
import { useRouter } from '#vue-router';

export default function() {
    const { $firebaseAuth, $firebaseProvider } = useNuxtApp();
    const { $toast } = useNuxtApp();
    const { useApiInstance } = useApi();
    const { api } = useApiInstance();
    const router = useRouter();
    const user = ref(null);
    const userStore = useUserStore();

    const tokenCookie = useCookie('token', { secure: true, sameSite: 'strict' });
    const isLoggedInCookie = useCookie('isLoggedIn', { secure: true, sameSite: 'strict' });
    const loading = ref(false);

    const loginWithGoogle = async () => {

        try {
            const result = await signInWithPopup($firebaseAuth, $firebaseProvider);

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log('credential', credential);
            const token = credential.idToken;

            loading.value = true;
            const res = await api.post('/Account/LoginWithGoogle', {
                data: {
                    token,
                    display_name: result.user.displayName
                }
            });

            if(!res.data.succeeded) throw(res.data.message);
            user.value = {...result.user, ...res.data.data};
            tokenCookie.value = user.value.sid;
            isLoggedInCookie.value = true;

            localStorage.setItem('user', JSON.stringify(user.value));
            userStore.setToken(user.value.sid);
            userStore.setIsLoggedIn(true);
            userStore.setUser(user.value);

            router.push('/my-site');

        } catch (error) {
            throw error;
        } finally {
            loading.value = false;
        }
    };

    return {
        loginWithGoogle,
        loading
    };
};