import { defineStore } from "pinia";
import { useGetCurrentTeam, useGetMember, useChangeProfileAbout, useAddSocialAccount } from "@/composables/useProfile";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    member: {},
    company: null,
    companySpecialization: null,
    socialPlatforms: [],
    memberSocialPlatform: [],
    isOwner: false,
    profileAbout: '',
    currentTab: 'personal',
    investor:''
  }),

  actions: {
    async setMember() {
      const { getMember, member } = useGetMember();
      await getMember();
      this.member = member.value;
      console.log(this.member)
    },

    async setCompany() {
      const { getCurrentTeam, currTeam } = useGetCurrentTeam();
      await getCurrentTeam();
      this.company = currTeam.value;
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

      if (this.currentTab === 'company') {
        
        await addSocialAccount(this.setSocialPlatforms, 'company');
      } else if (this.currentTab === 'personal') {
        const socialPersonal = this.member.social_accounts.map(val=>{
          return {
            link:val.link,
            type:val.social_platform
          }
        })
        await addSocialAccount(socialPersonal, 'personal');
      }
    }
  },

  getters: {
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
