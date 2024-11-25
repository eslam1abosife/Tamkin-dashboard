import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export default defineNuxtPlugin(nuxtApp => {
    const firebaseConfig = {
        apiKey: "AIzaSyD-qJ4hG2tOxH0ZD_E7-zgZddczCpajkBg",
        authDomain: "tamkin-app.firebaseapp.com",
        projectId: "tamkin-app",
        storageBucket: "tamkin-app.appspot.com",
        messagingSenderId: "174066158898",
        appId: "1:174066158898:web:2c41655f3be5964b8e9b2b",
        measurementId: "G-F5BHN0MV7B"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    nuxtApp.provide('firebaseAuth', auth);
    nuxtApp.provide('firebaseProvider', provider);
});