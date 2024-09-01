import { useGetCurrentTeam, useGetMember, useChangeProfileAbout, useAddSocialAccount } from "@/composables/useProfile";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userS = useUserStore()
  if (import.meta.client  && userS.isLoggedIn) {
    const profileStore = useProfileStore();
    const profileCookie = useCookie('profile');
    const userCookie = useCookie('user');
    
    // console.log('cookie profile', profileCookie.value);

    // Check if member data is available
    if (!profileStore.member || !profileStore.member.permission) {
      // Fetch member data if it's not available
      await profileStore.fetchMember();
    }
    
    // Extract member permissions
    const permissions = profileStore.member.permission || [];
    console.log(permissions);
    
    // Extract roles from permissions
    const memberPermissions = permissions.map(
      (per) => per.tamkin_roles
    );

    // Get the user's role profile name from cookie
    const roleProfileName = userCookie.value.role_profile_name || null;
    console.log('user role profile name:', roleProfileName);

    // Define the required permission for the current route (customize as needed)
    const requiredPermission = to.meta.requiredPermission;
    console.log('requiredPermission:', requiredPermission);

    // Allow access if there's no required permission for the route
    if (roleProfileName !== "Owner of Agency" && !requiredPermission) {
      return;
    }

    // Check if the user is an owner
    if (roleProfileName === "Owner of Agency" && !requiredPermission) {
      return; // Owners are allowed access regardless of permissions
    }

    // Check if the user has the required permission
    if (roleProfileName !== "Owner of Agency" && !memberPermissions.includes(requiredPermission)) {
      // Redirect to a 403 Forbidden page or some other route
      throw showError({
        statusCode: 403,
        statusMessage: "Permission Denied"
      });
    }
  }

  // If the user has the required permission, continue as normal
});
