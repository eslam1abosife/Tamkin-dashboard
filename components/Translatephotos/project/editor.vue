<template>
  <div class="flex items-start justify-start flex-col">
    <div class="w-full" v-if="!prop_player.showHideImage">
      <img :src="translateStore.photoProject.file_link" class="w-full h-[400px] object-cover !rounded-xl" alt="">
    </div>
    <div ref="editorContainer" class="editor-container w-full bg-white" :class="[!prop_player.showHideImage ? 'lg:mt-[-30px] mt-[-60px]' : '']">
      <editor-content :editor="editor" class="prose w-full scrollable-div" :class="[isMenusOpen ? 'lg:!h-[340px] 3xl:!h-[370px]' : '!h-[282px] lg:!h-[250px]']"></editor-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject, nextTick,watch } from 'vue';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';

export default defineComponent({
  components: {
    EditorContent,
  },
  props: {
    isMenusOpen: Boolean,
  },
  setup() {

    const zoomLevel = ref(100);
    const currentPage = ref(1);
    const totalPages = ref(1);
    const PAGE_HEIGHT = 1122;
    const WORD_LIMIT = 250; 
    const translateStore = useTranslateStore();
      const texttowatch = ref('')
    const editor = ref(null);
    
    onMounted(() => {
      editor.value = new Editor({
        editable: false,
        extensions: [
          StarterKit,
          TextStyle,
          Color,
          Highlight.configure({ multicolor: true }),
          Underline,
          Strike,
        ],
        editorProps: {
          attributes: {
            class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
          },
        },
        onUpdate() {
          nextTick(() => {
            translateStore.photoEditFooter = true;
          });
        },
      });
      editor.value.commands.setContent(`${translateStore.photoProject.value[0].text}`)


    });


    const toggleStrike = () => editor.value?.chain().focus().toggleStrike().run();
    const toggleUnderline = () => editor.value?.chain().focus().toggleUnderline().run();

    const prop_player = inject('prop_player');

    return {
      editor,
      zoomLevel,
      prop_player,
      toggleStrike,
      toggleUnderline,
      currentPage,
      totalPages,
      translateStore
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
