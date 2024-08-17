import { defineStore } from "pinia";
import { useGetCurrentTeam, useGetMember, useChangeProfileAbout } from "@/composables/useProfile";


export const useProfileStore = defineStore("profile", {
  state: () => {
    return {
      member: {},
      company: null,
      companySpecialization: null,
      socialPlatforms: null,
      isOwner: false,
      profileAbout: ''
    };
  },

  actions: {
    async setMember() {
      const { getMember, member } = useGetMember();

      await getMember();

      this.member = member.value;
    },

    async setCompany() {
      const { getCurrentTeam, currTeam } = useGetCurrentTeam()

      await getCurrentTeam();

      this.company = currTeam.value;
    },

    setAbout(about: string) {
      this.profileAbout = about;
    },

    async updateProfileAbout() {
      const { changeProfileAbout } = useChangeProfileAbout();
      if (this.profileAbout) {
        await changeProfileAbout({
          about: this.profileAbout
        });
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
      }else {
        role = 'member';
        this.isOwner = false;
      }

      return role;
    },
  }
});