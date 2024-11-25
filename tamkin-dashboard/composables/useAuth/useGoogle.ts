import { useCookie, useNuxtApp } from "#app";
import { useApi } from "@/composables/useApi";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useUserStore } from "~/stores/auth";
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
    const localePath = useLocalePath();
    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup($firebaseAuth, $firebaseProvider);
    
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
    
            loading.value = true;
            const res = await api.post('/Account/LoginWithGoogle', {
                data: {
                    token,
                    ref: localStorage.getItem("ref") || "",
                }
            });
    
            if (!res.data.succeeded) throw new Error(res.data.message);
    
            user.value = { ...result.user, ...res.data.data };
            useCookie('user').value = JSON.stringify({ ...res.data.data});

            tokenCookie.value = user.value.sid;
            isLoggedInCookie.value = true;
    
            localStorage.setItem('user', JSON.stringify(user.value));
            userStore.setToken(user.value.sid);
            userStore.setIsLoggedIn(true);
            userStore.setUser(user.value);

            router.push({path:localePath('/my-site')});
    
            return null; // No error, so return null
        } catch (error) {
            // Call the handleFirebaseError function and return the message
            const errorMessage = handleFirebaseError(error);
            return errorMessage;
        } finally {
            loading.value = false;
        }
    };
    

    const handleFirebaseError = (error) => {
        let errorMessage = 'An error occurred during the sign-in process.';

        if (typeof error === 'string') {
            errorMessage = error;
        } else if (error instanceof Error) {
            const errorString = error.toString();
            
            if (errorString.includes('auth/cancelled-popup-request')) {
                errorMessage = 'Sign-in process was interrupted. Please try again';
            } else if (errorString.includes('auth/popup-closed-by-user')) {
                errorMessage = 'The sign-in popup was closed. Please try again';
            } else {
                errorMessage = error.message || 'An unknown error occurred.';
            }
        }


        return errorMessage;
    };

    return {
        loginWithGoogle,
        loading,
        handleFirebaseError
    };
};
