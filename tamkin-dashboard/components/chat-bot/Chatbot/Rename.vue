<template>
  <div
    class="chatbot-response-card fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg w-[600px]"
  >
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Rename</h2>
      <button
        @click="$emit('close')"
        style="
          position: absolute;
          right: -23px;
          top: -26px;
          background: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 1px 0px 20.5px 0px #71dad2bd;
        "
        class="text-gray-500 hover:text-gray-700 text-xl font-bold"
      >
        <svg
          width="14"
          height="13"
          viewBox="0 0 14 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.64442 6.92484L13.0929 2.66806C13.2037 2.58072 13.2942 2.47236 13.3587 2.34987C13.4231 2.22737 13.4602 2.09343 13.4675 1.95655C13.4747 1.81967 13.4521 1.68284 13.4009 1.55477C13.3497 1.42669 13.2712 1.31017 13.1702 1.2126C13.0693 1.11503 12.9481 1.03856 12.8145 0.988038C12.6809 0.937517 12.5377 0.914053 12.3941 0.919137C12.2504 0.924222 12.1095 0.957744 11.9802 1.01757C11.8508 1.0774 11.736 1.16223 11.6429 1.26666L7.18261 5.53096L2.72231 1.26666C2.52262 1.10921 2.26831 1.0288 2.00952 1.0413C1.75073 1.0538 1.50624 1.15829 1.32425 1.33418C1.14226 1.51007 1.03599 1.74458 1.02637 1.99149C1.01676 2.2384 1.10451 2.47979 1.27232 2.66806L5.7208 6.92484L1.27232 11.1779C1.07795 11.3632 0.96875 11.6146 0.96875 11.8767C0.96875 12.1388 1.07795 12.3902 1.27232 12.5755C1.46669 12.7608 1.73031 12.865 2.00519 12.865C2.28008 12.865 2.5437 12.7608 2.73807 12.5755L7.18261 8.31872L11.6429 12.5755C11.8427 12.7289 12.0951 12.8063 12.3513 12.7925C12.6075 12.7787 12.8492 12.6748 13.0296 12.5008C13.21 12.3269 13.3164 12.0954 13.3281 11.851C13.3398 11.6066 13.256 11.3667 13.0929 11.1779L8.64442 6.92484Z"
            fill="#585B5B"
          />
        </svg>
      </button>
    </div>
    <p class="text-gray-600 mb-6">Enter a new name for the item.</p>
    <div class="space-y-4">
      <div
        class="flex items-center border border-gray-300 rounded-lg p-2 bg-white"
      >
        <input
          v-model="title"
          type="text"
          placeholder="New Name"
          class="w-full p-2 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 rounded-lg text-gray-800 placeholder-gray-500"
        />
      </div>
      <button
        @click="$emit('save', title)"
        class="w-full py-3 rounded-lg transition duration-200 custom-gradient-hover"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  initialName: {
    type: String,
    default: "",
  },
});

const title = ref(props.initialName);

watch(
  () => props.initialName,
  (newName) => {
    title.value = newName;
  }
);

defineEmits(["save", "close"]);
</script>

<style scoped>
.chatbot-response-card {
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.chatbot-response-card input:focus {
  box-shadow: none;
}

.custom-gradient-hover {
  background: #abb0b0;
  color: white;
}
.custom-gradient-hover:hover {
  background: linear-gradient(180deg, #2dada3 0%, #71dad2 100%);
  color: white;
}
</style>
