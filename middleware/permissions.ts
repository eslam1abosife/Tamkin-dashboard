// middleware/permissions.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  const profileStore = useProfileStore();
  const { member } = storeToRefs(profileStore);
  const userStore = useUserStore()
  // Fetch user permissions (assuming this is an async action)
  await profileStore.fetchMember(false);

  // Extract member permissions
  const memberPermissions = member.value?.permission.map(
    (permission) => permission.tamkin_roles
  ) || [];
  const roleProfileName = useCookie('user').value.role_profile_name ? useCookie('user').value.role_profile_name : null;
// console.log('user', useCookie('user').value.role_profile_name)
  // Define the required permission for the current route (customize as needed)
  const requiredPermission = to.meta.requiredPermission;
  // console.log('requiredPermission:', profileStore.member.isOwner);

  // Allow access if there's no required permission for the route
  if (!requiredPermission) {
    return;
  }
  

  // Check if the user is an owner
  if (roleProfileName === "Owner of Agency"&& !requiredPermission) {
    return; // Owners are allowed access regardless of permissions
  }

  // Check if the user has the required permission
  if ( roleProfileName !== "Owner of Agency"&&!memberPermissions.includes(requiredPermission)) {
    // Redirect to a 403 Forbidden page or some other route
    throw showError({
      statusCode: 403,
      statusMessage: "Permission Denied"
    });
  }

  // If the user has the required permission, continue as normal
});
