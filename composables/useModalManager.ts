// composables/useModalManager.js
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

const lastEventCall = ref(null);
const eventCounter = ref(0);

export function useModalManager(cb = null) {
  const modalStore = useModalStore();
  const { currentView } = storeToRefs(modalStore);
  const { openModal, closeModal, goBack, isOpen, setData, getData } = modalStore;

  const navigateTo = (currentModalId, view, nextModalId, data = null ) => {
    closeModal(currentModalId);
    openModal(nextModalId, view);
    if(data) {
      setData(data);
    }
  };

  const emitEvent = (eventName) => {
    eventCounter.value++;
    lastEventCall.value = eventName;
  }


  return {
    isOpen,
    currentView,
    openModal,
    closeModal,
    goBack,
    navigateTo,
    getData,
    emitEvent,
    lastEventCall,
    eventCounter
  };
}
