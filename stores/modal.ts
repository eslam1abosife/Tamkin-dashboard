

import { defineStore, acceptHMRUpdate } from 'pinia'


export const useModalStore = defineStore('modal', {
  state: () => ({
    showShareModal:false,
    editPictureTeamModal:false,
    editPermissionsModal:false,
    inviteMemberModal:false
  }),
  actions: {
    openShareModal(){
        this.showShareModal = !this.showShareModal
    },
    controlTeamEditPictureModal(){
      this.editPictureTeamModal = !this.editPictureTeamModal

    },
    controlEditPermissionsModal(){
      this.editPermissionsModal = !this.editPermissionsModal

    },
    controlInviteMemberModal(){
      this.inviteMemberModal = !this.inviteMemberModal

    },
  },
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}