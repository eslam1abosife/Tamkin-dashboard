<template>
    <div class="flex flex-col items-center p-3 w-full h-full bg-[#EEEEEE] rounded-[10px] overflow-y-auto relative">
      <div class="toolbar flex items-center justify-between divide-x divide-[#BDBDC7] w-full bg-white  rounded-[10px] rounded-t-lg shadow ">
        <div class="flex items-center justify-between w-3/4 pr-[10px]">
          <!-- Text Color -->
          <button v-if="editor" class="toolbar-item relative ">
 <div class="flex items-center  space-x-[10px] justify-center  w-[40px] border-b-[4px] border-b-red-500 ">
  <div class="flex items-center justify-center flex-col ">
    <input
    type="color"
    class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
    @input="editor.chain().focus().setColor($event.target.value).run()"
    v-model="defaultColor"
  />
  <span class="">A</span>
  </div>
  <div>
    <img src="/assets/imgs/chevron.svg" alt="">
  </div>
 </div>
          </button>
          <!-- Highlight Color -->
          <button v-if="editor" class="toolbar-item relative  ">
            <div class="flex items-center  space-x-[10px] justify-center  w-[40px]  pb-1 border-b-[4px] border-b-yellow-200">
             <div class="flex items-center justify-center flex-col ">
               <input
               type="color"
               class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
               @input="editor.chain().focus().setHighlight({ color: $event.target.value }).run()"
               v-model="hightlightCoor"
             />
             <span class="mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
              class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
            </svg>
            </span>
             </div>
             <div >
               <img src="/assets/imgs/chevron.svg" class="m-auto" alt="">
             </div>
            </div>
                     </button>
     
          <!-- Underline -->
          <button v-if="editor" class="toolbar-item underline" @click="toggleUnderline">U</button>
          <!-- Strike -->
          <button v-if="editor" class="toolbar-item line-through" @click="toggleStrike">ab</button>
          <!-- Undo -->
          <!-- <button v-if="editor" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()" class="toolbar-item">↺</button> -->
          <span class="ipad-max:text-[14px]">{{ currentPage }} / {{ totalPages }}</span>
        </div>
        <div class="flex items-center justify-evenly w-1/4">
          <button @click="zoomOut" class="toolbar-item">-</button>
          <span>{{ zoomLevel }}%</span>
          <button @click="zoomIn" class="toolbar-item">+</button>
        </div>
      </div>
      <div ref="editorContainer" class=" max-w-[900px] text-[14px] !h-full  w-full bg-white py-2 s
      hadow mt-[16px] rounded-[10px]" @scroll="handleScroll">
        <bubble-menu
        :editor="editor"
        :should-show="shouldShow"
        :tippy-options="{ duration: 0 }"
        v-if="editor"
      >
       
          <div class="h-[32px] p-2 bg-tamkin text-[12px] text-white flex items-center justify-center text-center rounded-[5px]">
            Sign Language
           </div>
     
      </bubble-menu>
        <editor-content :editor="editor" class="relative prose !overflow-x-hidden scrollable-div !h-[500px]  w-full p-4"></editor-content>
      </div>
    </div>
  </template>
  <script lang="ts">
  import { useTranslateStore } from "~/stores/translate";


  import { defineComponent, ref, onMounted, watch, nextTick } from 'vue';
  import {  BubbleMenu ,Editor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit';
  import TextStyle from '@tiptap/extension-text-style';
  import Color from '@tiptap/extension-color';
  import Highlight from '@tiptap/extension-highlight';
  import Underline from '@tiptap/extension-underline';
  import Strike from '@tiptap/extension-strike';
  import HorizontalRule from '@tiptap/extension-horizontal-rule';
  import { isTextSelection } from "@tiptap/core";
  export default defineComponent({
    components: {
      EditorContent,
      BubbleMenu
    },
    setup() {
      const shouldShow = ({ editor, view, state, oldState, from, to }) =>{
        const { doc, selection } = state;
        const { empty } = selection;
 // Sometime check for `empty` is not enough.
        // Doubleclick an empty paragraph returns a node size of 2.
        // So we check also for an empty text size.
        const isEmptyTextBlock =
          !doc.textBetween(from, to).length && isTextSelection(state.selection);
        if (view.focused || empty || isEmptyTextBlock) {


          return false;
          
        }else {
        return true;

        }

      
  }
      const zoomLevel = ref(100);
      const currentPage = ref(1);
      const totalPages = ref(1);
      const PAGE_HEIGHT = 1120; // Adjust as needed
      let isUpdating = false; // Flag to prevent redundant updates
      const translateStore = useTranslateStore()
      const editor = new Editor({
        editable: false,
        extensions: [
   
          StarterKit,
          TextStyle,
          Color,
          Highlight.configure({ multicolor: true }),
          Underline,
          Strike,
          HorizontalRule, // Add the horizontal rule extension
        ],
        content: `
          <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>

           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>


           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
           <p>
            Sample content goes here. This is where you will place your initial content.
          </p>
        `,
        editorProps: {
          attributes: {
            class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
          },
        },
  //       onSelectionUpdate({ editor }) {
  //         const selection = editor.state.selection;
  // if (selection.from !== selection.to) {
  //     ]
  // }
  // },

  
        onUpdate() {
          if (!isUpdating) {
            isUpdating = true;
            nextTick(() => {
          handleScroll()
          translateStore.pdfTextEdit = true
              refreshContentAndPagination();
              isUpdating = false;
            });
          }
        },
      });
      const defaultColor = computed(()=>{
        return editor.getAttributes('textStyle').color  ? editor.getAttributes('textStyle').color : '#ffffff'
      })
  
      const hightlightCoor = computed(()=>{
        return editor.getAttributes('textStyle').color  ? editor.getAttributes('textStyle').color : '#ffffff'
      })
      const zoomIn = () => {
        if (zoomLevel.value < 300) {
          zoomLevel.value += 10;
        }
      };
      const toggleStrike = () => editor.chain().focus().toggleStrike().run();
      const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
      const zoomOut = () => {
        // if (zoomLevel.value > 100) {
          zoomLevel.value -= 10;
        // }
      };
  
      const emitZoomChange = () => {
        const editorContainer = document.querySelector('.tiptap');
        if (editorContainer) {
          editorContainer.style.transform = `scale(${zoomLevel.value / 100})`;
          editorContainer.style.transformOrigin = 'top left';
        }
      };

      const handleScroll = () => {
  const editorContainer = document.querySelector('.prose');
  if (editorContainer) {
    console.log(editorContainer)
    // alert('yea')
    const scrollTop = editorContainer.scrollTop;
    const pageIndex = Math.floor(scrollTop / (PAGE_HEIGHT * (zoomLevel.value / 100))) + 1;
    console.log(scrollTop)
    currentPage.value = Math.min(Math.max(pageIndex, 1), totalPages.value); // Clamp pageIndex between 1 and totalPages
    console.log(currentPage.value)
  }
};
  
      const updatePagination = () => {
        const contentHeight = editor.view.dom.scrollHeight;
        totalPages.value = Math.ceil(contentHeight / PAGE_HEIGHT);
  
        const doc = editor.view.state.doc;
        const horizontalRules = doc.content.content.filter(node => node.type.name === 'horizontalRule');
        const horizontalRulesCount = horizontalRules.length;
  
        const requiredHorizontalRules = totalPages.value - 1;
  
        if (requiredHorizontalRules > horizontalRulesCount) {
          // Add new horizontal rules if needed
          const rulesToAdd = requiredHorizontalRules - horizontalRulesCount;
          for (let i = 0; i < rulesToAdd; i++) {
            editor.chain().focus().setHorizontalRule().run();
          }
        } else if (requiredHorizontalRules < horizontalRulesCount) {
          // Remove extra horizontal rules if needed
          const newContent = doc.content.content.filter(node => node.type.name !== 'horizontalRule');
          editor.commands.setContent(newContent);
        }
      };
  
  

      const refreshContentAndPagination = () => {
        updatePagination();
        nextTick(() => {
          const editorContainer = document.querySelector('.prose');
          if (editorContainer) {
            editorContainer.scrollTop = (currentPage.value - 1) * PAGE_HEIGHT * (zoomLevel.value / 100);
          }
        });
      };
  
      watch(zoomLevel, () => {
        emitZoomChange();
        nextTick(() => refreshContentAndPagination());
      });
  
      onMounted(() => {
        nextTick(() =>  { 
        
          const editorContainer = document.querySelector('.prose');
  // if (editorContainer) {
    editorContainer.addEventListener('scroll', handleScroll);
  // }
    refreshContentAndPagination()
  }
  );
        handleScroll()
      });
  
      return {
        shouldShow,
        editor,
        zoomLevel,
        zoomIn,
        zoomOut,
        currentPage,
        totalPages,
        handleScroll,
        defaultColor,
        translateStore,
        hightlightCoor,
        toggleStrike,
toggleUnderline
      };
    },
  });
  </script>
  
  

  
  <style >
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
    width: 40px;
    height: 4px;
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
 .tiptap hr {
    border: none;
    height: 2px; /* Adjust the height as needed */
    background-color: #000; /* Change color as needed */
    margin: 20px 0; /* Adjust margins as needed */
  }

  /* Bubble menu */
.bubble-menu {
  background-color: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  padding: 0.2rem;

  button {
    background-color: unset;

    &:hover {
      background-color: var(--gray-3);
    }

    &.is-active {
      background-color: var(--purple);

      &:hover {
        background-color: var(--purple-contrast);
      }
    }
  }
}

  </style>
  