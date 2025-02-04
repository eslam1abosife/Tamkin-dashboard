
import { defineStore } from 'pinia';
import { useCookie } from '#app';
export const useUserStore = defineStore('user', {
  
  state: () => ({
    token: useCookie('token').value || null,
    isLoggedIn: useCookie('isLoggedIn').value === 'true' || false,
    user: {},
    rememberMe:false
  }),
  actions: {
    checkIfLoggedIn() {
      this.token = useCookie('token').value || null;
      this.isLoggedIn = useCookie('isLoggedIn').value || false;

      return this.token && this.isLoggedIn;
    },
    setToken(token, rememberMe = false) {
      this.token = token;
      const tokenCookie = useCookie('token',{
        maxAge : rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24 
      });
      tokenCookie.value = token;
      // tokenCookie.

    },
    setIsLoggedIn(isLoggedIn) {
      this.isLoggedIn = isLoggedIn;
      useCookie('isLoggedIn',{
        maxAge : this.rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24 
      }).value = isLoggedIn.toString();
    },
    setUser(user) {
      this.user = user;
      if (user) {
        this.token = user.sid;
      }
    },
    logout(pathurl) {
      this.token = null;
      this.isLoggedIn = false;
      this.user = null;

  const router = useRouter()

      // Clear cookies
      useCookie('token').value = '';
      useCookie('token').maxAge = -1;
    
      useCookie('isLoggedIn').value = '';
      useCookie('isLoggedIn').maxAge = -1;
    
      useCookie('user').value = '';
      useCookie('user').maxAge = -1;
    
      useCookie('permissions').value = null;
      useCookie('permissions').maxAge = -1;
    }
  },
});