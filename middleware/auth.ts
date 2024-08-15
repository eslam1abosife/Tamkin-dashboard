import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useUserStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    // const userStore = useUserStore();
    // userStore.checkIfLoggedIn();

    // console.log('userStore.isLoggedIn', userStore.isLoggedIn);

    // if (!userStore.isLoggedIn && !to.path.startsWith('/auth/')) {
    //     console.log('User is not logged in, redirecting to login');
    //     return navigateTo('/auth/login');
    // }
    // else if(userStore.isLoggedIn && to.path.startsWith('/auth/')) {
    //     return navigateTo('/my-site');
    // }
});