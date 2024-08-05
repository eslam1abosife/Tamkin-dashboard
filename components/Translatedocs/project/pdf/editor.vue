<template>
    <div class="flex flex-col items-center p-4 w-full bg-[#EEEEEE] rounded-[10px] min-h-[315px] overflow-y-auto relative">
      <div class="toolbar flex items-center justify-between divide-x w-full bg-white p-2 rounded-[10px] rounded-t-lg shadow sticky">
        <div class="flex items-center justify-between w-3/4 px-[40px]">
          <!-- Text Color -->
          <button v-if="editor" class="toolbar-item relative">
            <input
              type="color"
              class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              @input="editor.chain().focus().setColor($event.target.value).run()"
              :value="editor.getAttributes('textStyle').color"
            />
            <span class="text-color">A</span>
          </button>
          <!-- Highlight Color -->
          <button v-if="editor" class="toolbar-item relative">
            <input
              type="color"
              class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              @input="editor.chain().focus().setHighlight({ color: $event.target.value }).run()"
              :value="editor.getAttributes('highlight').color"
            />
            <span class="highlight-color">🖍</span>
          </button>
          <!-- Underline -->
          <button v-if="editor" class="toolbar-item underline" @click="toggleUnderline">U</button>
          <!-- Strike -->
          <button v-if="editor" class="toolbar-item line-through" @click="toggleStrike">ab</button>
          <!-- Undo -->
          <button v-if="editor" @click="editor.chain().focus().undo().run()" :disabled="!editor.can().undo()" class="toolbar-item">↺</button>
          <span>{{ currentPage }} / {{ totalPages }}</span>
        </div>
        <div class="flex items-center justify-evenly w-1/4">
          <button @click="zoomOut" class="toolbar-item">-</button>
          <span>{{ zoomLevel }}%</span>
          <button @click="zoomIn" class="toolbar-item">+</button>
        </div>
      </div>
      <div ref="editorContainer" class="editor-container max-w-[900px] w-full bg-white p-4 shadow mt-[16px] rounded-[10px]" @scroll="handleScroll">
        <editor-content :editor="editor" class="prose overflow-y-auto h-[600px] w-full p-4"></editor-content>
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
  
      const zoomIn = () => {
        if (zoomLevel.value < 300) {
          zoomLevel.value += 10;
        }
      };
  
      const zoomOut = () => {
        if (zoomLevel.value > 100) {
          zoomLevel.value -= 10;
        }
      };
  
      const emitZoomChange = () => {
        const editorContainer = document.querySelector('.editor-container');
        editorContainer.style.transform = `scale(${zoomLevel.value / 100})`;
        editorContainer.style.transformOrigin = 'top left';
      };
  
      const toggleStrike = () => editor.chain().focus().toggleStrike().run();
      const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  
      const handleScroll = (event: Event) => {
        const editorContainer = document.querySelector('.editor-container');
        const scrollTop = (event.target as HTMLElement).scrollTop;
        const pageIndex = Math.floor(scrollTop / PAGE_HEIGHT) + 1;
        currentPage.value = pageIndex;
      };
  
      const paginate = () => {
      const editorContent = document.querySelector('.editor-container .prose');
      if (editorContent) {
        const contentHeight = editorContent.scrollHeight;
        const pageCount = Math.ceil(contentHeight / PAGE_HEIGHT);
        totalPages.value = pageCount;

        // Clear existing page breaks
        const pageBreaks = editorContent.querySelectorAll('.page-break');
        pageBreaks.forEach((breakElement) => breakElement.remove());

        // Add page breaks
        for (let i = 1; i < pageCount; i++) {
          const pageBreak = document.createElement('div');
          pageBreak.className = 'page-break';
          pageBreak.style.height = `${PAGE_HEIGHT}px`;
          editorContent.appendChild(pageBreak);
        }
      }
    };

    const breakContentIntoPages = () => {
      const editorContent = document.querySelector('.editor-container .prose');
      if (editorContent) {
        const words = editorContent.textContent.split(' ');
        const pages = [];
        let currentPageWords = [];
        let currentPageHeight = 0;

        for (const word of words) {
          const wordHeight = word.length * 20; // assume 20px per character
          if (currentPageHeight + wordHeight > PAGE_HEIGHT) {
            pages.push(currentPageWords.join(' '));
            currentPageWords = [word];
            currentPageHeight = wordHeight;
          } else {
            currentPageWords.push(word);
            currentPageHeight += wordHeight;
          }
        }

        if (currentPageWords.length > 0) {
          pages.push(currentPageWords.join(' '));
        }

        totalPages.value = pages.length;

        // Clear existing content and add pages
        editorContent.innerHTML = '';
        pages.forEach((pageContent) => {
          const page = document.createElement('div');
          page.className = 'page';
          page.innerText = pageContent;
          editorContent.appendChild(page);
        });

        paginate();
      }
    };
    watch(editor, () => {
      breakContentIntoPages();
    });
    onMounted(() => {
      breakContentIntoPages();
    });
  
      watch(zoomLevel, () => {
        emitZoomChange();
      });
  
      return {
        editor,
        zoomLevel,
        zoomIn,
        zoomOut,
        toggleStrike,
        toggleUnderline,
        currentPage,
        totalPages,
        handleScroll,
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
    min-height: 500px;
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
  