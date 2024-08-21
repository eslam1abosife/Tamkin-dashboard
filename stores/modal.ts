// stores/modalStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useModalStore = defineStore('modalStore', () => {
  const modals = ref({});
  const sharedData = ref(null);

  function setData (data) {
    sharedData.value = data;
    console.log('sharedData 2', sharedData.value);
  }

  function getData () {
    console.log('sharedData 5', sharedData.value);
    return sharedData.value;
  }

  function clearData () {
    sharedData.value = null;
  }

  function openModal(modalId, view, data) {
    if (!modals.value[modalId]) {
      modals.value[modalId] = {
        isOpen: ref(true),
        history: ref([view]),
      };
    } else {
      modals.value[modalId].isOpen = true;
      modals.value[modalId].history.push(view);
    }
    if(data) {
      setData(data);
    }
  }

  function closeModal(modalId) {
    if (modals.value[modalId]) {
      modals.value[modalId].isOpen = false;
      modals.value[modalId].history = [];
    }
  }

  function goBack(modalId) {
    if (modals.value[modalId] && modals.value[modalId].history.length > 1) {
      modals.value[modalId].history.pop();
    } else {
      closeModal(modalId);
    }
  }

  function isOpen(modalId) {
    return modals.value[modalId]?.isOpen ?? false;
  }

  function currentView(modalId) {
    return modals.value[modalId]?.history[modals.value[modalId].history.length - 1] ?? null;
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
