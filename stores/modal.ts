

import { defineStore, acceptHMRUpdate } from 'pinia'


export const useModalStore = defineStore('modal', {
  state: () => ({
    showShareModal:false,
    editPictureTeamModal:false,
    editPermissionsModal:false,
    inviteMemberModal:false,
    selectSiteModal:false,
    editUserModal:false,
    editDonePicture:false,
    InviteMemberUpdateModal:false
  }),
  actions: {
    
    openShareModal(){
        this.showShareModal = !this.showShareModal
    },
    controlTeamEditPictureModal(){
      this.editPictureTeamModal = !this.editPictureTeamModal
      
    },
    triggerupdatedPicture(){
      this.editDonePicture = !this.editDonePicture
    },
    controlEditPermissionsModal(){
      this.editPermissionsModal = !this.editPermissionsModal

    },
    controlEditUserModal(){
      this.editUserModal = !this.editUserModal

    },
    controlInviteMemberModal(){
      this.inviteMemberModal = !this.inviteMemberModal

    },
    controlInviteMemberUpdateModal(){
      this.InviteMemberUpdateModal = !this.InviteMemberUpdateModal
      this.inviteMemberModal = false

    },
    controlSelectSiteModal(){
      this.selectSiteModal = !this.selectSiteModal

    },
  },
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}