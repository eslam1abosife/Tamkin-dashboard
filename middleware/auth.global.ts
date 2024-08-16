import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useUserStore } from '@/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore();

    // Check if the user is logged in (assuming this might be async)
    await userStore.checkIfLoggedIn();

    // Allow access to auth routes if the user is not logged in
    if (!userStore.isLoggedIn && to.path.startsWith('/auth/')) {
        return;
    }

    // Redirect to login if the user is not logged in and trying to access a non-auth route
    if (!userStore.isLoggedIn && !to.path.startsWith('/auth/')) {
        return navigateTo('/auth/login');
    }

    // Redirect to the main site if the user is logged in and trying to access an auth route
    if (userStore.isLoggedIn && to.path.startsWith('/auth/')) {
        return navigateTo('/my-site');
    }
});
