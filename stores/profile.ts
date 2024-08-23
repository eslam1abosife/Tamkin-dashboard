import { defineStore } from "pinia";
import { useGetCurrentTeam, useGetMember, useChangeProfileAbout, useAddSocialAccount } from "@/composables/useProfile";


export const useProfileStore = defineStore("profile", {
  state: () => ({
    member: {},
    company: '',
    companySpecialization: null,
    socialPlatforms: [],
    memberSocialPlatform: [],
    isOwner: false,
    profileAbout: '',
    currentTab: 'personal',
    investor: '',
    currentTeam: '',

    social_platforms: [
      {
        title: "Facebook",
        icon: "",
        link:''
      },
      {
        title: "Instagram",
        icon: "",
        link:''
      },
      {
        title: "LinkedIn",
        icon: "",
        link:''
      },
      {
        title: "X",
        icon: "",
        link:''
      }
    ]
  }),



  actions: {
 
    async getCurrentTeam() {
      const { getCurrentTeam, currTeam } = useGetCurrentTeam()

      await getCurrentTeam();

      this.company = currTeam.value;

    },
    async fetchMember() {
      // this.isLoading = true;
      try {
        const { getMember, member } = useGetMember();
        await getMember();
        this.member = member.value;
      } catch (error) {
        // this.hasError = true;
      } finally {
        // this.isLoading = false;
      }
    },

    async setMember() {
      await getMember();
      this.member = member.value;
      // console.log(this.member)
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
        if(this.company.social_accounts.length === 0){
          socialPersonal = this.social_platforms.map(val => {
           return {
             link: val.link,
             type: val.title
           }
         })
        }else {
          socialPersonal = this.company.social_accounts.map(val => {
           return {
             link: val.link,
             type: val.social_platform
           }
         })
        }
        await addSocialAccount(socialPersonal);
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
          link: val.link,
          type: val.social_platform
        }
      })
     }
        await addSocialAccount(socialPersonal);
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
  },


  getters: {
    getFullName() {
      return `${this.member.first_name} ${this.member.last_name}`;
    },

    getRole(state) {
      const userStore = useUserStore();
      let role = '';
      if (state.member.member_email === userStore.user.user_id) {
        role = 'owner';
        this.isOwner = true;
      } else {
        role = 'member';
        this.isOwner = false;
      }
      return role;
    }
  }
});
