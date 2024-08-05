<template>
    
   <div class="flex items-start justify-start flex-col w-full">
    <div class="h-[300px]" v-if="showHideImage">

    </div>
    <div class="w-full" v-else>
        <img src="/assets/imgs/translatephotos/img_detect.png" class="w-full h-[300px]" alt="">
    </div>
    <div ref="editorContainer" class="editor-container  w-full bg-white  mt-[16px] " @scroll="handleScroll">
        <!-- <editor-content :editor="editor" class="prose  w-full  scrollable-div" :class="[]"></editor-content> -->
      </div>
   </div>
 
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
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
    setup() {
      const zoomLevel = ref(100);
      const currentPage = ref(1);
      const totalPages = ref(1);
      const PAGE_HEIGHT = 1122; // Example height for an A4 page in pixels
      const WORD_LIMIT = 250; // Example word limit per page
  
      const editor = new Editor({
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
      });
  
  
  
  
  
      const toggleStrike = () => editor.chain().focus().toggleStrike().run();
      const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  

   

const showHideImage = inject('showHideImage')


  
      return {
        editor,
        zoomLevel,
        showHideImage,
        toggleStrike,
        toggleUnderline,
        currentPage,
        totalPages,
      };
    },
  });
  </script>
  
  <style scoped>
  .toolbar-item {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    font-size: 16px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .toolbar-item input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .text-color::after {
    content: '';
    display: block;
    width: 16px;
    height: 2px;
    background-color: red;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .highlight-color::after {
    content: '';
    display: block;
    width: 16px;
    height: 6px;
    background-color: yellow;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .toolbar-item:hover {
    background-color: #e5e5e5;
  }
  .editor-container {
   
    overflow: hidden;
    transform: scale(1);
    transform-origin: top left;
    transition: transform 0.2s;
  }
  .page {
    page-break-after: always;
    padding: 20px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
  }
  </style>
  