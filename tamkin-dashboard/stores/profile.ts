import { defineStore } from "pinia";
import { useCookie } from '#app';
import { useGetCurrentTeam, useGetMember, useChangeProfileAbout, useAddSocialAccount } from "@/composables/useProfile";


export const useProfileStore = defineStore("profile", {
  state: () => ({
    member: {},
    company: '',
    companySpecialization: null,
    socialPlatforms: [],
    memberSocialPlatform: [],
    isOwner: null,
    loadingProfile:false,
    profileAbout: '',
    currentTab: 'personal',
    investor: {},
    currentTeam: '',
    updateProfilePayload:'',
    updatedCompanyPayload:'',
    permissions: useCookie('permissions').value || null,
    countries:[],
    social_platforms: [
      {
        title: "Facebook",
        icon: "",
        link:'https://facebook.com'
      },
      {
        title: "Instagram",
        icon: "",
        link:'https://instagram.com'
      },
      {
        title: "LinkedIn",
        icon: "",
        link:'https://linkedin.com'
      },
      {
        title: "X",
        icon: "",
        link:'https://x.com'
      }
    ]
  }),



  actions: {
     normalizeDomain(input: string) {
      try {
        new URL(input);
        return input;
      } catch {
        // If it's not a valid URL, process it
        let normalizedInput = input.trim();
    
        // Ensure it starts with a scheme (http:// or https://)
        if (!normalizedInput.startsWith('http://') && !normalizedInput.startsWith('https://')) {
          // If input is just a domain (e.g., "example.com" or ".com")
          if (normalizedInput.startsWith('.')) {
            normalizedInput = `https://www${normalizedInput}`;
          } else if (!normalizedInput.includes('.')) {
            normalizedInput = `https://${normalizedInput}.com`;
          } else {
            normalizedInput = `https://${normalizedInput}`;
          }
        }
    
        // Ensure the URL has a path if needed
        try {
          const url = new URL(normalizedInput);
          return url.href;
        } catch {
          // Return an empty string or a default URL if the conversion fails
          return '';
        }
      }
    },
     isClickableLink (url: string){
      try {
        const { pathname } = new URL(url);
        return pathname.length > 1; // Ensure the URL has a path
      } catch {
        return false; // Invalid URL
      }
    },
    async getCurrentTeam() {
      this.loadingProfile = true

      const { getCurrentTeam, currTeam } = useGetCurrentTeam()

      await getCurrentTeam();

      this.company = currTeam.value;
      this.loadingProfile = false


    },

    async fetchMember() {
        this.loadingProfile = true;
    
      try {
        const { getMember, member } = useGetMember();
        await getMember();

        this.member = member.value;

        this.permissions = member.value.permission;
        const permissionsCookie = useCookie('permissions', {
          maxAge: 60 * 60 * 24 * 7
        });
        permissionsCookie.value = filterArrayObjects(member.value.permission,['tamkin_roles']);

        console.log(useCookie('permissions').value || null);

        const userStore = useUserStore()
        const roleProfileName = userStore.user?.role_profile_name;
        this.isOwner = roleProfileName === 'Owner of Agency';
      } catch (error) {
        // this.hasError = true;
        this.loadingProfile = false;

      } finally {

          this.loadingProfile = false;
  
      }
    },

    setAbout(about: string) {
      this.profileAbout = about;
    },

    setSocialPlatforms(platforms: any[]) {
      this.socialPlatforms = platforms;
    },

    setMemberPlatforms(platforms: any[]) {
      this.memberSocialPlatform = platforms;
    },

    async updateProfileAbout() {
      const { changeProfileAbout } = useChangeProfileAbout();
      if (this.profileAbout) {
        await changeProfileAbout({ about: this.profileAbout });
      }
    },

    async updateSocialPlatforms() {
      const { addSocialAccount } = useAddSocialAccount();
      let socialPersonal ;

      if (this.currentTab === 'company') {
        if(this.company.social_accounts && this.company.social_accounts?.length !== 0){
           socialPersonal = this.company.social_accounts.map(val => {
            return {
              link: val.link,
              type: val.social_platform
            }
         })
        }else {
          socialPersonal = this.social_platforms.map(val => {
            return {
              link: val.link,
              type: val.title
            }
         })
        }
        await addSocialAccount(socialPersonal,'company');
      } else if (this.currentTab === 'personal') {
     if(this.member.social_accounts.length === 0){
       socialPersonal = this.social_platforms.map(val => {
        return {
          link: val.link,
          type: val.title
        }
      })
     }else {
       socialPersonal = this.member.social_accounts.map(val => {
        return {
          link:  val.link,
          type: val.social_platform
        }
      })
     }
        await addSocialAccount(socialPersonal,'personal');
        refreshNuxtData('member')
      }
    },
    getPlatformIconUrl(type: string){
      const platform = this.socialPlatforms.find(
        (handler: any) => handler.name === type
      );
      return platform ? `https://tamkin.app/${platform.icon}` : '';
    },
    updateUserProfile(payload: { email: string; firstName: string; lastName: string }) {
      this.member.email = payload.email;
      this.member.first_name = payload.firstName;
      this.member.last_name = payload.lastName;
    },
    getRole() {
      const userStore = useUserStore();
      // Ensure userStore.user is not null or undefined
      const roleProfileName = userStore.user?.role_profile_name;
    
      this.isOwner = roleProfileName === 'Owner of Agency';
      return this.isOwner ? 'Owner' : 'Member';
    }
    
  },


  getters: {
    getFullName() {
      return `${this.member.first_name} ${this.member.last_name}`;
    },

  
  },
  // persist: true

    
});
