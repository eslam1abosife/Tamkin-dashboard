// composables/useModalManager.js
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

export function useModalManager() {
  const modalStore = useModalStore();
  const { currentView } = storeToRefs(modalStore);
  const { openModal, closeModal, goBack, isOpen } = modalStore;

  const navigateTo = (currentModalId, view, nextModalId) => {
    closeModal(currentModalId);
    openModal(nextModalId, view);
  };

  return {
    isOpen,
    currentView,
    openModal,
    closeModal,
    goBack,
    navigateTo,
  };
}
