// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $i18n } = useNuxtApp(); // Access the i18n instance
  const { locale } = $i18n; // Get the current locale
  const localePath = useLocalePath(); // Get the locale path function
  const userStore = useUserStore();
  const profileStore = useProfileStore();

  const isLoggedIn = userStore.checkIfLoggedIn();

  // Extract the current locale from the route
  const currentLocale = locale.value;

  // Allow access to auth pages if the user is not logged in
  if (!isLoggedIn && (to.path.startsWith(`/${currentLocale}/auth`) || to.path.startsWith(`/auth`))) {
    return; // Allow access to auth routes without redirecting
  }

  // Redirect logged-out users trying to access non-auth routes to the login page
  if (!isLoggedIn && !(to.path.startsWith(`/${currentLocale}/auth`) || to.path.startsWith(`/auth`))) {
    const loginPath = localePath('/auth/login');
    if (to.fullPath !== loginPath) {
      return navigateTo(loginPath);
    }
  }

  // Redirect logged-in users trying to access auth pages to the overview page
  if (isLoggedIn && (to.path.startsWith(`/${currentLocale}/auth`) || to.path.startsWith(`/auth`))) {
    const overviewPath = localePath('/team');
    if (to.fullPath !== overviewPath) {
      return navigateTo(overviewPath);
    }
    
    // Fetch the member profile and team information if needed
    // Check if the company object is empty before calling getCurrentTeam
    if (!profileStore.company || Object.keys(profileStore.company).length === 0) {
      await profileStore.getCurrentTeam(); // Ensure getCurrentTeam is awaited if it's asynchronous
    }
 
    // useCookie('permissions').value = profileStore.member.permission
  }
});
