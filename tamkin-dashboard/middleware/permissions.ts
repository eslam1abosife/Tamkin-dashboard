import { useGetCurrentTeam, useGetMember, useChangeProfileAbout, useAddSocialAccount } from "@/composables/useProfile";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userS = useUserStore()
  if (import.meta.client  && userS.isLoggedIn) {
    const profileStore = useProfileStore();
    const profileCookie = useCookie('profile');
    const userCookie = useCookie('user');
    
    

    
    if (!profileStore.member || !profileStore.member.permission) {
      
      await profileStore.fetchMember();
    }
    
    
    const permissions = profileStore.member.permission || [];
    
    
    
    const memberPermissions = permissions.map(
      (per) => per.tamkin_roles
    );

    
    const roleProfileName = useCookie('user').value.role_profile_name || null;
    // console.log('user role profile name:', roleProfileName);

    
    const requiredPermission = to.meta.requiredPermission;
    // console.log('requiredPermission:', requiredPermission);

    
    if (roleProfileName !== "Owner of Agency" && !requiredPermission) {
      return;
    }

    
    if (roleProfileName === "Owner of Agency" && !requiredPermission) {
      return; 
    }

    
    if (roleProfileName !== "Owner of Agency" && !memberPermissions.includes(requiredPermission)) {
      
      throw showError({
        statusCode: 403,
        statusMessage: "Permission Denied"
      });
    }
  }

  
});
