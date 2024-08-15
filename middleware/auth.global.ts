import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useUserStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    // const userStore = useUserStore();
    // userStore.checkIfLoggedIn();

<<<<<<< HEAD:middleware/auth.ts
    // console.log('userStore.isLoggedIn', userStore.isLoggedIn);

    // if (!userStore.isLoggedIn && !to.path.startsWith('/auth/')) {
    //     console.log('User is not logged in, redirecting to login');
    //     return navigateTo('/auth/login');
    // }
    // else if(userStore.isLoggedIn && to.path.startsWith('/auth/')) {
    //     return navigateTo('/my-site');
    // }
=======
    if (!userStore.isLoggedIn && !to.path.startsWith('/auth/')) {
        console.log('User is not logged in, redirecting to login');
        return navigateTo('/auth/login');
    }
    else if(userStore.isLoggedIn && to.path.startsWith('/auth/')) {
        return navigateTo('/my-site');
    }
>>>>>>> 3c2cbc234e9399144ed2cb024d6dce1388acffc2:middleware/auth.global.ts
});