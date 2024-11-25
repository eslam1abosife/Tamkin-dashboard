import { defineStore } from 'pinia';
import { reactive, ref, computed } from 'vue';

export const useModalStore = defineStore('modalStore', () => {
  const modals = reactive({});
  const sharedData = ref(null);

  function setData(data) {
    sharedData.value = data;
    console.log('sharedData 2', sharedData.value);
  }

  function getData() {
    console.log('sharedData 5', sharedData.value);
    return sharedData.value;
  }

  function clearData() {
    sharedData.value = null;
  }

  function openModal(modalId, view, data) {
    if (!modals[modalId]) {
      modals[modalId] = {
        isOpen: true,
        history: [view],
      };
    } else {
      modals[modalId].isOpen = true;
      modals[modalId].history.push(view);
    }
    if (data) {
      setData(data);
    }
  }

  function closeModal(modalId) {
    if (modals[modalId]) {
      modals[modalId].isOpen = false;
      modals[modalId].history = [];
    }
  }

  function goBack(modalId) {
    if (modals[modalId] && modals[modalId].history.length > 1) {
      modals[modalId].history.pop();
    } else {
      closeModal(modalId);
    }
  }

  function isOpen(modalId) {
    return modals[modalId]?.isOpen ?? false;
  }

  function currentView(modalId) {
    return modals[modalId]?.history[modals[modalId].history.length - 1] ?? null;
  }

  return {
    modals,
    openModal,
    closeModal,
    goBack,
    isOpen,
    currentView,
    setData,
    clearData,
    getData
  };
});
