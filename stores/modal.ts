

import { defineStore, acceptHMRUpdate } from 'pinia'
import { useMarketStore } from '@/stores/market.js';
export const useModalStore = defineStore('modal', {
  state: () => ({
    showShareModal: false,
    editPictureTeamModal: false,
    editPermissionsModal: false,
    inviteMemberModal: false,
    selectSiteModal: false,
    editUserModal: false,
    editDonePicture: false,
    InviteMemberUpdateModal: false,
    plansModal: true,
    showUpgradeModal: false,
    choosePaymentModal: false,
    cardModal: false,
    cryptoModal: false,
    cryptoConfirmModal: false,
    cryptoSuccess: false,
    newcardModal: false,
    paymentSuccess: false,
    paymentError: false,
    loading: false,
    resetModal:false,
    deleteModal:false,
    transferModalStep1:false,
    transferStep2:false,
    SuccessStep2Transfer:false,
    showSuccessModalContact:false,
    currentPage:''
  }),
  actions: {
    controlPaymentMethodModalCar(){
      const marketStore = useMarketStore()
this.showUpgradeModal = true
this.   plansModal = false
      this.choosePaymentModal = true
      marketStore.showCart = !marketStore.showCart
    },
    controlSuccessContactModal(){
      this.showSuccessModalContact = !this.showSuccessModalContact
    },
    controlTransferStep2Modal(){
      this.transferStep2 = !this.transferStep2
      this.transferModalStep1 = false
      if(this.SuccessStep2Transfer){
this.SuccessStep2Transfer =false
      }
    },
    controlStep1TransferModal(){
this.transferModalStep1 = !this.transferModalStep1
this.SuccessStep2Transfer =!this.SuccessStep2Transfer


    },
    controlDeleteModal(){
      this.deleteModal = !this.deleteModal
    },
    controlResetModal(){
      this.resetModal = !this.resetModal
    },
    openShareModal() {
      this.showShareModal = !this.showShareModal
    },
    controlTeamEditPictureModal() {
      this.editPictureTeamModal = !this.editPictureTeamModal

    },
    triggerupdatedPicture() {
      this.editDonePicture = !this.editDonePicture
    },
    controlEditPermissionsModal() {
      this.editPermissionsModal = !this.editPermissionsModal
    },
    controlEditUserModal() {
      this.editUserModal = !this.editUserModal

    },
    controlInviteMemberModal() {
      this.inviteMemberModal = !this.inviteMemberModal

    },
    controlInviteMemberUpdateModal() {
      this.InviteMemberUpdateModal = !this.InviteMemberUpdateModal
      this.inviteMemberModal = false
    
      if(!this.InviteMemberUpdateModal){
        this.editPermissionsModal = true
      }


    },
    controlSelectSiteModal() {
      this.selectSiteModal = !this.selectSiteModal

    },
    controlShowUpgradeModal() {
      this.showUpgradeModal = !this.showUpgradeModal;
      this.plansModal = true



      this.paymentError = false
      this.paymentSuccess = false
      this.newcardModal = false
      this.cryptoSuccess = false
      this.cryptoConfirmModal = false
      this.cryptoModal = false
      this.cardModal = false

      this.choosePaymentModal = false
      this.choosePaymentModal = false



    },
    backControl() {
      const marketStore = useMarketStore()
      const {showCart} = storeToRefs(marketStore)

      if(this.choosePaymentModal && this.currentPage === 'market'){
        marketStore.showCart =true
        this.choosePaymentModal = false
        this.plansModal = false;
        this.showUpgradeModal = false
      }
      if (this.paymentError) {
        this.paymentError = false
        this.choosePaymentModal = true;
      }
      if (this.choosePaymentModal && !showCart.value ) {
        this.choosePaymentModal = false
        this.plansModal = true;
        this.showUpgradeModal = true
      }
      if (this.cardModal) {
        this.cardModal = false
        this.choosePaymentModal = true;
      }
      if (this.cryptoModal) {
        this.cryptoModal = false
        this.choosePaymentModal = true;
      }
      if (this.cryptoConfirmModal) {
        this.cryptoConfirmModal = false
        this.cryptoModal = true;
      }
      if (this.newcardModal) {
        this.newcardModal = false
        this.choosePaymentModal = true;
      }
    },
    controlPlansModal() {
      this.plansModal = !this.plansModal;
    },

    controlchoosePaymentmethodModal() {
      this.choosePaymentModal = !this.choosePaymentModal
      this.plansModal = false;


    },

    payViaCard() {
      this.cardModal = !this.cardModal
      this.choosePaymentModal = false
      this.plansModal = false
    },
    payViaCrypto() {
      this.cryptoModal = !this.cryptoModal
      this.cardModal = false

      this.choosePaymentModal = false
      this.choosePaymentModal = false
      this.plansModal = false
    },

    confirmCryptoModal() {
      this.loading = true
      setTimeout(() => {
        this.cryptoConfirmModal = !this.cryptoConfirmModal
        this.cryptoModal = false
        this.cardModal = false

        this.choosePaymentModal = false
        this.choosePaymentModal = false
        this.plansModal = false
        this.loading = false

      }, 2000)
    },
    controlCryptoSuccessModal() {
      this.loading = true
      setTimeout(() => {

        this.cryptoSuccess = !this.cryptoSuccess
        this.cryptoConfirmModal = false
        this.cryptoModal = false
        this.cardModal = false

        this.choosePaymentModal = false
        this.choosePaymentModal = false
        this.plansModal = false
        this.loading = false

      }, 2000)
    },


    addNewCardModal() {
      this.newcardModal = !this.newcardModal
      this.cryptoSuccess = false

      this.cryptoConfirmModal = false
      this.cryptoModal = false
      this.cardModal = false

      this.choosePaymentModal = false
      this.choosePaymentModal = false
      this.plansModal = false
    },

    paymentSuccessModal() {
      this.loading = true
      setTimeout(() => {
        this.paymentSuccess = !this.paymentSuccess
        this.newcardModal = false
        this.cryptoSuccess = false

        this.cryptoConfirmModal = false
        this.cryptoModal = false
        this.cardModal = false

        this.choosePaymentModal = false
        this.choosePaymentModal = false
        this.plansModal = false
        this.loading = false
      }, 2000)


    },
    paymentErrorModal() {
      this.paymentError = !this.paymentError
      this.paymentSuccess = false
      this.newcardModal = false
      this.cryptoSuccess = false

      this.cryptoConfirmModal = false
      this.cryptoModal = false
      this.cardModal = false

      this.choosePaymentModal = false
      this.choosePaymentModal = false
      this.plansModal = false
    },
    closeAllPaymentModals() {
      this.paymentError = false
      this.paymentSuccess = false
      this.newcardModal = false
      this.cryptoSuccess = false

      this.cryptoConfirmModal = false
      this.cryptoModal = false
      this.cardModal = false

      this.choosePaymentModal = false
      this.choosePaymentModal = false
      this.plansModal = false
    }


  },
});


if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}