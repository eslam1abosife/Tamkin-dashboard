<template>
  <div class="flex items-start justify-start flex-col">
    <div class="w-full" v-if="!prop_player.showHideImage">
      <img src="/assets/imgs/translatephotos/img_detect.png" class="w-full h-5/6" alt="">
    </div>
    <div ref="editorContainer" class="editor-container w-full bg-white" :class="[!prop_player.showHideImage ? 'lg:mt-[-30px] mt-[-60px]' : '']">
      <editor-content :editor="editor" class="prose w-full scrollable-div" :class="[isMenusOpen ? 'lg:!h-[340px] 3xl:!h-[370px]' : '!h-[282px] lg:!h-[250px]']"></editor-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, inject, nextTick } from 'vue';
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
    const PAGE_HEIGHT = 1122; // Example height for an A4 page in pixels
    const WORD_LIMIT = 250; // Example word limit per page
    const translateStore = useTranslateStore();
    
    // Ref for editor
    const editor = ref(null);
    
    // Create the editor instance on the client side
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
        content: `
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <p>
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
          <p>
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
          </p>
        `,
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
    });

    // Define methods for toggling text styles
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
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
