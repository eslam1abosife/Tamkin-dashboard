<template>
  <div class="flex flex-col items-center p-3 w-full h-auto   bg-[#EEEEEE] rounded-[10px] overflow-y-hidden relative resize-y" 
    :class="[isMenusOpen ? 'max-h-[701px]' : 'max-h-[616px] ']">

    <div  :class="[!isloadedPlayer ? 'hidden' : 'flex']" class="toolbar  items-center justify-between divide-x divide-[#BDBDC7] 
    rtl:divide-x-reverse w-full bg-white rounded-[10px] rounded-t-lg shadow ">
      <div class="flex items-center justify-between w-3/4 px-[10px]">
        <button v-if="editor" class="toolbar-item relative">
          <div class="flex items-center rtl:space-x-reverse space-x-[10px] justify-center w-[40px] border-b-[4px] "  
          :style="{'border-bottom-color': defaultColor }"> 
            <div class="flex items-center justify-center flex-col">
              <input
                type="color"
                class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                @input="editor.chain().focus().setColor($event.target.value).run()"
                v-model="defaultColor"
              />
              <span>A</span>
            </div>
            <div>
              <img src="/assets/imgs/chevron.svg" alt="">
            </div>
          </div>
        </button>
        <button v-if="editor" class="toolbar-item relative">
          <div class="flex items-center rtl:space-x-reverse space-x-[10px] justify-center w-[40px] 
          pb-1 border-b-[4px] " :style="{'border-bottom-color': highlightColor}">
            <div class="flex items-center justify-center flex-col">
              <input
              type="color"
              class="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              @input="(event) => {
                editor.chain().focus().toggleHighlight({ color: event.target.value }).run();
              }"
              v-model="highlightColor"
            />
              <span class="mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
              </span>
            </div>
            <div>
              <img src="/assets/imgs/chevron.svg" class="m-auto" alt="">
            </div>
          </div>
        </button>
        <button v-if="editor" class="toolbar-item underline" @click="toggleUnderline">U</button>
        <button v-if="editor" class="toolbar-item line-through" @click="toggleStrike">ab</button>
        <span class="ipad-max:text-[14px]">{{ currentPage }} / {{ totalPages }}</span>
      </div>
      <div class="flex items-center justify-evenly w-1/4">
        <button @click="zoomOut" class="toolbar-item">-</button>
        <span>{{ zoomLevel }}%</span>
        <button @click="zoomIn" class="toolbar-item">+</button>
      </div>
    </div>
    <div   ref="editorContainer" class="vl-parent text-[14px] !h-full w-full bg-white py-2 shadow mt-[16px] rounded-[10px]" @scroll="handleScroll">
      <bubble-menu :editor="editor" :should-show="shouldShow" :tippy-options="{ duration: 0 }" v-if="editor">
        <button class="btn btn-dashboard hover_tamkin" :disabled="loadingAnimation" @click.prevent="playsignlanguage">
          {{ $t('Sign language') }}
        </button>
      </bubble-menu>
      <editor-content :editor="editor" :class="[!isloadedPlayer ? 'invisible' : 'visible']"  class="relative prose scrollable-div  !h-full w-full p-4"></editor-content>
      <div v-if="!isloadedPlayer" class=" h-full w-full">
        <Loading
          v-model:active="ispl_load"
          :can-cancel="false"
          :is-full-page="true"
          opacity="0.95"
        >
          <template v-slot:default>
            <div class="flex items-center justify-center flex-col space-y-2 absolute w-full inset-y-0">
              <!-- Your custom loader icon or content -->
              <img
                src="/assets/imgs/logo.png"
                alt="Loading..."
                class="w-[100px] h-[51px]"
              />
  
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-tamkin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </template>
        </Loading>
      </div>
    
    </div>

 
  </div>


</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, watchEffect, defineEmits } from 'vue';
import { useTranslateStore } from '~/stores/translate';
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { BubbleMenu, Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import { isTextSelection } from '@tiptap/core';

const emit = defineEmits(['getupdatedtext']);
const stateAnimation = ref(undefined);
const loadingAnimation=  ref(false)
function updateStateAnimation() {
  if (window.state_animation !== stateAnimation.value) {
    stateAnimation.value = window.state_animation;

  }
}

let interval;
onMounted(() => {
  interval = setInterval(() => {
    updateStateAnimation();
  }, 100);
});

onUnmounted(() => {
  clearInterval(interval);
});
watch(stateAnimation, (newState) => {
  if (newState === 'Running') {
    loadingAnimation.value = true;
  }
  if (newState === 'Idle' || newState === 'idle') {
    loadingAnimation.value = false;
  }
  if (newState === 'Finished') {
    loadingAnimation.value = false;
  }
  
})
const getSelectedText = () => {
  const { from, to } = editor.state.selection;
  return editor.state.doc.textBetween(from, to, ' ');
};

const playsignlanguage = ()=>{
  window.getAdAnimate(getSelectedText())
}
const zoomLevel = ref(100);
const currentPage = ref(1);
const totalPages = ref(1);
const PAGE_HEIGHT = 1120;
let isUpdating = false;
const translateStore = useTranslateStore();
const props = defineProps({
  isMenusOpen:Boolean,
  isloadedPlayer:Boolean
})
const editor = new Editor({
  editable: false,
  extensions: [
    Document,
    Paragraph,
    Text,
    StarterKit,
    TextStyle,
    Color,
    Highlight.configure({ multicolor: false }),
    Underline,
    Strike,
    HorizontalRule,
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
    },
  },
  onUpdate() {
    if (!isUpdating) {
      isUpdating = true;
      nextTick(() => {
        handleScroll();
        translateStore.pdfTextEdit = true;
        refreshContentAndPagination();
        isUpdating = false;
      });
    }
    getEditorContent()
  },
});

const shouldShow = ({ editor, view, state }) => {
  const { empty } = state.selection;
  const isEmptyTextBlock = !state.doc.textBetween(state.selection.from, state.selection.to).length && isTextSelection(state.selection);
  return !(view.focused || empty || isEmptyTextBlock);
};
watch()
const undo = () => {
      if (editor && editor.can().undo()) {
  editor.commands.setContent(`${translateStore.pdfProject.value[0].text}`);
        
        editor.chain().focus().undo().run()
        editor.commands.unsetHighlight()
        editor.commands.unsetColor()
      }
    };

    defineExpose({
      undo,
    });
const defaultColor = computed(() => editor.getAttributes('textStyle').color || '#00000');
const highlightColor = ref('#00000')

const getEditorContent = () => {
  if (editor) {
    const content = editor.getHTML();
    emit('getupdatedtext', content);
    // console.log('html',content)
    return content;
  }
  return null;
};


const zoomIn = () => {
  if (zoomLevel.value < 300) {
    zoomLevel.value += 10;
  }
};


const zoomOut = () => {
  zoomLevel.value -= 10;
};

const toggleStrike = () => editor.chain().focus().toggleStrike().run();
const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();

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
    const scrollTop = editorContainer.scrollTop;
    const pageIndex = Math.floor(scrollTop / (PAGE_HEIGHT * (zoomLevel.value / 100))) + 1;
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
    const rulesToAdd = requiredHorizontalRules - horizontalRulesCount;
    for (let i = 0; i < rulesToAdd; i++) {
      editor.chain().focus().setHorizontalRule().run();
    }
  } else if (requiredHorizontalRules < horizontalRulesCount) {
    const newContent = doc.content.content.filter(node => node.type.name !== 'horizontalRule');
    editor.commands.setContent(newContent);
  }
};
const ispl_load = computed(() => {
  return !props.isloadedPlayer
})

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
  nextTick(() => {
    const editorContainer = document.querySelector('.prose');
    editorContainer?.addEventListener('scroll', handleScroll);
    refreshContentAndPagination();
  });
  handleScroll();
  editor.commands.setContent(`${translateStore.texttofill}`);
});
</script>

<style>
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
  height: 2px;
  background-color: #000;
  margin: 20px 0;
}
.bubble-menu {
  background-color: var(--white);
  border: 1px solid var(--gray-1);
  border-radius: 0.7rem;
  box-shadow: var(--shadow);
  display: flex;
  padding: 0.2rem;
}
.bubble-menu button {
  background-color: unset;
}
.bubble-menu button:hover {
  background-color: var(--gray-3);
}
.bubble-menu button.is-active {
  background-color: var(--purple);
}
.bubble-menu button.is-active:hover {
  background-color: var(--purple-contrast);
}
</style>
