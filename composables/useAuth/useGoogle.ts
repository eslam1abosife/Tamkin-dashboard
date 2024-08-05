import {useCookie, useNuxtApp} from "#app";
import { useApi } from "@/composables/useApi";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useUserStore} from "~/stores/auth";

export default function() {
    const { $firebaseAuth, $firebaseProvider } = useNuxtApp();
    const { $toast } = useNuxtApp();
    const { useApiInstance } = useApi();
    const { api , loading } = useApiInstance();

    const user = ref(null);
    const userStore = useUserStore();

    const tokenCookie = useCookie('token', { secure: true, sameSite: 'strict' });
    const isLoggedInCookie = useCookie('isLoggedIn', { secure: true, sameSite: 'strict' });

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup($firebaseAuth, $firebaseProvider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            const res = await api.post('/Account/LoginWithGoogle', {
                data: {
                    token
                }
            });
            if(!res.data.succeeded) throw(res.data.message);

            user.value = result.user;

            tokenCookie.value = user.value.sid;
            isLoggedInCookie.value = true;
            localStorage.setItem('user', JSON.stringify(user.value));

            userStore.setToken(user.value.sid);
            userStore.setIsLoggedIn(true);
            userStore.setUser(user.value);

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
            });
            throw error;
        }
    };

    return {
        loginWithGoogle,
    };
};