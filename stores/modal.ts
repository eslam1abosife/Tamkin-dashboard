

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
    InviteMemberUpdateModal:false,
    plansModal:true,
    showUpgradeModal:false,
    choosePaymentModal:false,
    cardModal:false,
    cryptoModal:false,
    cryptoConfirmModal:false,
    cryptoSuccess:false,
    newcardModal:false,
    paymentSuccess:false,
    paymentError:false,
    loading:false
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
    controlShowUpgradeModal(){
      this.showUpgradeModal = !this.showUpgradeModal;
  this.plansModal = true


 
    this.paymentError = false
    this.paymentSuccess =false
    this.newcardModal = false
    this.cryptoSuccess = false 
    this.cryptoConfirmModal = false
    this.cryptoModal =false
    this.cardModal =false
    
    this.choosePaymentModal = false
      this.choosePaymentModal =false
 


    },
    backControl(){
      if(this.paymentError){
        this.paymentError = false
  this.choosePaymentModal = true;
      }
      if(this.choosePaymentModal){
        this.choosePaymentModal = false
  this.plansModal = true;
      }
      if(this.cardModal){
        this.cardModal = false
  this.choosePaymentModal = true;
      }
      if(this.cryptoModal){
        this.cryptoModal = false
  this.choosePaymentModal = true;
      }
      if(this.cryptoConfirmModal){
        this.cryptoConfirmModal = false
  this.cryptoModal = true;
      }
      if(this.newcardModal){
        this.newcardModal = false
  this.choosePaymentModal = true;
      }
    },
controlPlansModal(){
  this.plansModal = !this.plansModal;
},

controlchoosePaymentmethodModal(){
  this.choosePaymentModal = !this.choosePaymentModal
  this.plansModal = false;


},

payViaCard(){
this.cardModal = !this.cardModal
this.choosePaymentModal = false
this.plansModal =false
},
payViaCrypto(){
  this.cryptoModal = !this.cryptoModal
this.cardModal = false

this.choosePaymentModal = false
  this.choosePaymentModal = false
  this.plansModal =false
  },

  confirmCryptoModal(){
this.loading = true
 setTimeout(()=>{
  this.cryptoConfirmModal = !this.cryptoConfirmModal
  this.cryptoModal = false
  this.cardModal = false
  
  this.choosePaymentModal = false
    this.choosePaymentModal = false
    this.plansModal =false
this.loading = false

 },2000)
  },
  controlCryptoSuccessModal(){
    this.loading = true
setTimeout(()=>{
  
  this.cryptoSuccess = !this.cryptoSuccess
  this.cryptoConfirmModal = false
  this.cryptoModal = false
  this.cardModal = false
  
  this.choosePaymentModal = false
    this.choosePaymentModal = false
    this.plansModal =false
    this.loading = false

},2000)
  },


  addNewCardModal(){
    this.newcardModal = !this.newcardModal
    this.cryptoSuccess = false
  
    this.cryptoConfirmModal = false
    this.cryptoModal = false
    this.cardModal = false
    
    this.choosePaymentModal = false
      this.choosePaymentModal = false
      this.plansModal =false
  },

  paymentSuccessModal(){
    this.loading = true
    setTimeout(()=>{
      this.paymentSuccess = !this.paymentSuccess
      this.newcardModal = false
      this.cryptoSuccess = false
    
      this.cryptoConfirmModal = false
      this.cryptoModal = false
      this.cardModal = false
      
      this.choosePaymentModal = false
        this.choosePaymentModal = false
        this.plansModal =false
        this.loading = false
    },2000)
   

  },
  paymentErrorModal(){
    this.paymentError = !this.paymentError
    this.paymentSuccess = false
    this.newcardModal = false
    this.cryptoSuccess = false
  
    this.cryptoConfirmModal = false
    this.cryptoModal = false
    this.cardModal = false
    
    this.choosePaymentModal = false
      this.choosePaymentModal = false
      this.plansModal =false
  },
  closeAllPaymentModals(){
    this.paymentError = false
    this.paymentSuccess = false
    this.newcardModal = false
    this.cryptoSuccess = false
  
    this.cryptoConfirmModal = false
    this.cryptoModal = false
    this.cardModal = false
    
    this.choosePaymentModal = false
      this.choosePaymentModal = false
      this.plansModal =false
  }

    
  },
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}