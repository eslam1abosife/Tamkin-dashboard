import { useNuxtApp } from "#app";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function() {
    const { $firebaseAuth, $firebaseProvider } = useNuxtApp();

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup($firebaseAuth, $firebaseProvider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('User info:', user);
            console.log('Token:', token);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return {
        loginWithGoogle,
    };
};