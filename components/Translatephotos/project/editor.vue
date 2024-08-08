<template>
    
   <div class="flex items-start justify-start flex-col ">

    <div class="w-full" v-if="!prop_player.showHideImage">
        <img src="/assets/imgs/translatephotos/img_detect.png" class="w-full h-[300px]" alt="">
    </div>
    <div ref="editorContainer" class="editor-container  w-full bg-white  mt-[16px] " 
    :class="[prop_player.showHideImage ? 'h-[600px]' :'h-[300px]']">
        <editor-content :editor="editor" class="prose  w-full  scrollable-div " 
        :class="[prop_player.showHideImage ? 'h-[600px]' :'h-[300px]']"></editor-content>
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
  import { useTranslateStore } from "~/stores/translate";

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
const translateStore = useTranslateStore()
  
      const editor = new Editor({
        editable:false,
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

          translateStore.photoEditFooter = true
      
        })
      }

    })
  
  
  
  
  
      const toggleStrike = () => editor.chain().focus().toggleStrike().run();
      const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  

   

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


  </style>
  