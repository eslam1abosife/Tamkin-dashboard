<template>
  <div class="menu-bar">
    <button @click="toggleBold">Bold</button>
    <button @click="toggleItalic">Italic</button>
    <button @click="toggleUnderline">Underline</button>
    <button @click="setTextAlign('left')">Align Left</button>
    <button @click="setTextAlign('center')">Align Center</button>
    <button @click="setTextAlign('right')">Align Right</button>
    <button @click="setTextAlign('justify')">Justify</button>
    <select v-model="fontSize" @change="setFontSize">
      <option value="12px">12px</option>
      <option value="14px">14px</option>
      <option value="16px">16px</option>
      <option value="18px">18px</option>
      <option value="20px">20px</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  editor: Object,
});

const toggleBold = () => {
  props.editor.chain().focus().toggleBold().run();
};

const toggleItalic = () => {
  props.editor.chain().focus().toggleItalic().run();
};

const toggleUnderline = () => {
  props.editor.chain().focus().toggleUnderline().run();
};

const setTextAlign = (alignment) => {
  props.editor.chain().focus().setTextAlign(alignment).run();
};

const fontSize = ref('12px');
const setFontSize = () => {
  props.editor.chain().focus().setFontSize(fontSize.value).run();
};
</script>

<style scoped>
.menu-bar {
  margin-bottom: 8px;
}

.menu-bar button,
.menu-bar select {
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.menu-bar button:hover,
.menu-bar select:hover {
  background-color: #f0f0f0;
}
</style>
