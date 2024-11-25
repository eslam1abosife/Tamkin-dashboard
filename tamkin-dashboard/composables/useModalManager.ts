// composables/useModalManager.js
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

const lastEventCall = ref(null);
const eventCounter = ref(0);

export function useModalManager(cb = null) {
  const modalStore = useModalStore();
  const { openModal, closeModal, goBack, isOpen, setData, getData,currentView } = modalStore;

  const navigateTo = (currentModalId, view, nextModalId, data = null ) => {
    closeModal(currentModalId);
    openModal(nextModalId, view);
    currentView(currentModalId)
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
    eventCounter,
    setData
  };
}
