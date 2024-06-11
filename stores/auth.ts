

import { defineStore } from 'pinia';

interface UserPayloadInterface {
  email: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    errorLogin: false,
    user: '',
  }),
  actions: {
    async authenticateUser({ email, password }: UserPayloadInterface) {
      try {
        this.loading = true;
        this.errorLogin=false
        const response: any = await $fetch('---loginuserUrl--', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }), // Convert object to JSON string
        });

        const expireDate = new Date()
        expireDate.setDate(expireDate.getDate() + 2); 
        if (response) {
          const token = useCookie('token', { expires:expireDate}); // useCookie new hook in nuxt 3
          token.value = response.token; // set token to cookie
          this.authenticated = true; // set authenticated state value to true


        }


      } catch (error) {
        this.loading = false;

        if (error.response._data.auth) {
          this.errorLogin = true;
        } else if (error.response._data.type && error.response._data.type === 'server error') {
          this.errorLogin = null;
        } else if (error.response._data.type && error.response._data.type === 'inactive') {
          await this.logUserOut(false)
          throw showError({
              statusCode: 401,
              message:error.response._data.message,
              fatal: true,
            });
        }
      }
    },
    logUserOut(confirmLog:boolean) {
        if(confirmLog){
            if(confirm('تسجيل الخروج؟')){
                const token = useCookie('token'); // useCookie new hook in nuxt 3
                this.authenticated = false; // set authenticated state value to false
                token.value = null; // clear the token cookie
     
            }else {
                return;
            }
        }else {
            const token = useCookie('token'); // useCookie new hook in nuxt 3
            this.authenticated = false; // set authenticated state value to false
            token.value = null; // clear the token cookie
          
        }

    },

    async getUser(token:any) {
      
      if (this.authenticated) {
        try {
          const response: any = await $fetch('--get user url----', {
            headers: {
              Authorization: `Bearer ${token}`, // Replace yourAuthToken with the actual token
            },
          });
          if (response) {
            this.user = response.user;
          }
        } catch (error) {
          const router = useRouter()
//           if(error && error.response._data.type === 'reauth'){
// await this.logUserOut(false)
// router.push({name:'admin-auth-login',query:{userChanges:'true'}})
//           }else if (error.response._data.type && error.response._data.type === 'inactive') {
//             await this.logUserOut(false)
//             throw showError({
//                 statusCode: 401,
//                 message:error.response._data.message,
//                 fatal: true,
//               });
//           }
          // console.error('Error fetching user:', );
        //   this.logUserOut(); // Automatically log out the user if getUser fails
        }
      }
    },
  },
});
