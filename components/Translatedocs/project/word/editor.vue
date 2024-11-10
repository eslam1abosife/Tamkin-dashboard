<template>
  <div class="overflow-y-hidden h-full " :class="[isMenusOpen?'max-h-[710px]':'max-h-[625px]']" style="resize:vertical;">
    <div class="main-container relative " >
      <div class="editor-container editor-container_document-editor relative f_h" ref="editorContainerElement">
        <div class="editor-container__menu-bar !bg-[#F6F6F6] " ref="editorMenuBarElement"></div>
        <div class="editor-container__toolbar !bg-[#F6F6F6]" ref="editorToolbarElement"></div>
        <div class="editor-container__editor-wrapper relative " @scroll="onScroll">
          <div class="editor-container__editor relative " >
            <div ref="editorElement ">
              <div class="zoom-wrapper relative">
                <ckeditor
                  v-if="isLayoutReady"
                  v-model="config.initialData"
                  :editor="editor"
                  :config="config"
                  @ready="onReady"
                  @change="onInput"
                  class="wrap_ck"
                />
              </div>
              <button v-if="popupVisible && selectedText" :style="popupStyle"  
              @click.stop.prevent="restoreSelectionAndPlaySignLanguage"  @mousedown="saveSelection" 
              :disabled="stateAnimation === 'Running'"
           class="btn-dashboard hover_tamkin h-[40px] w-[143px] ltr:!font-[Poppins] rtl:!font-[Almarai]">
                {{ $t('Sign language') }}
              </button>
            </div>
          </div>
        </div>
        <TranslatedocsProjectWordToolbar
        :wordCount="wordCount"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :initialZoomLevel="zoomLevel"
        @zoom-change="changeZoom"
      />
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
  import { useTranslateStore } from "~/stores/translate";
const {locale} = useI18n()
const translateStore = useTranslateStore()

import { ref, onMounted } from 'vue';
// import CKEditor from '@ckeditor/ckeditor5-vue';

// import  {DecoupledEditor} from '@/ck-vue/ckeditor';
import '@/ck-vue/ckeditor'
import '@/ck-vue/translations/ar';

const EditorDec = window['DecoupledEditor']

const stateAnimation = ref(undefined);
const loadingAnimation=  ref(false)
function updateStateAnimation() {
  if (window.state_animation !== stateAnimation.value) {
    stateAnimation.value = window.state_animation;
    loadingAnimation.value = stateAnimation.value === 'Running' ? true : false;
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
// watch(stateAnimation, (newState) => {
//   if (window.state_animation === 'Running') {
//     loadingAnimation.value = true;
//   }
//   if (window.state_animation === 'Idle' || window.state_animation === 'idle') {
//     loadingAnimation.value = false;
//   }
//   if (window.state_animation === 'Finished') {
//     loadingAnimation.value = false;
//   }
  
// })
const getSelectedText = () => {
  const { from, to } = editor.state.selection;
  return editor.state.doc.textBetween(from, to, ' ');
};

let savedSelection = null;

const saveSelection = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    savedSelection = selection.getRangeAt(0);
  }
};

const restoreSelectionAndPlaySignLanguage = () => {
  if (savedSelection) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(savedSelection);
    savedSelection = null;
  }
  playsignlanguage();
};

const playsignlanguage = () => {
  window.getAdAnimate(selectedText.value);
};
import 'ckeditor5/ckeditor5.css';
const props = defineProps({
  isMenusOpen:Boolean
})
const config = ref({});
const isLayoutReady = ref(false);
const editorToolbarElement = ref(null);
const editorMenuBarElement = ref(null);
const editor = EditorDec;

const wordCount = ref(0);
const currentPage = ref(1);
const totalPages = ref(1);
const zoomLevel = ref(100);
const instance = ref(null);

const selectedText = ref('');
const popupVisible = ref(false);
const popupStyle = ref({ top: '0px', left: '0px'});

const PAGE_HEIGHT = 1122; 

const breakContentIntoPages = (editorInstance) => {
  editorInstance.model.change(writer => {
    for (const item of editorInstance.model.document.getRoot().getChildren()) {
      if (item.name === 'pageBreak') {
        writer.remove(item);
      }
    }

    const viewDocument = editorInstance.editing.view.document;
    const viewRoot = viewDocument.getRoot();
    const viewWriter = editorInstance.editing.view.writer;
    const modelRoot = editorInstance.model.document.getRoot();
    const pageHeight = PAGE_HEIGHT;
    let currentHeight = 0;

    const range = editorInstance.model.createRangeIn(modelRoot);
    for (const item of range.getItems()) {
      const viewElement = editorInstance.editing.mapper.toViewElement(item);

      if (viewElement) {
        const boundingRect = editorInstance.editing.view.domConverter.viewToDom(viewElement).getBoundingClientRect();
        currentHeight += boundingRect.height;

        if (currentHeight > pageHeight) {
          writer.insertElement('pageBreak', editorInstance.model.createPositionBefore(item));
          currentHeight = boundingRect.height;
        }
      }
    }
  });
};
const updatePopupPosition = (editorInstance) => {

  const selection = editorInstance.model.document.selection;
  const range = selection.getFirstRange();

  if (range) {
    let selectedTextContent = '';
    for (const item of range.getItems()) {
      if (item.is('textProxy')) {
        selectedTextContent += item.data;
      }
    }

    selectedText.value = selectedTextContent;
    popupVisible.value = !!selectedTextContent;

    const viewSelection = editorInstance.editing.view.document.selection;
    const domRange = editorInstance.editing.view.domConverter.viewRangeToDom(viewSelection.getFirstRange());
    const rects = domRange.getClientRects();
    const ckContainer = document.querySelector('.ck-content'); 
    const ckContainerRect = ckContainer.getBoundingClientRect();

    if (rects.length > 0) {
      const firstRect = rects[0];
      let topPosition = firstRect.top - ckContainerRect.top +60; 
      let leftPosition = firstRect.left + window.scrollX - ckContainerRect.left + (firstRect.width / 2) +20; 

      if (leftPosition < 0) {
        leftPosition = 0;
      }
      if (leftPosition + 100 > ckContainerRect.width) { // Assuming popup width is 100px
        leftPosition = ckContainerRect.width -20;
      }

      if (topPosition < 0) {
        topPosition = 0;
      }

      popupStyle.value = {
        top: `${topPosition -100}px`,
        left: `${leftPosition}px`,
        position: 'absolute'
      };

      // console.log(`Popup Position - Top: ${topPosition}px, Left: ${leftPosition}px`); // Debugging log
    } else {
      popupVisible.value = false;
    }
  } else {
    selectedText.value = '';
    popupVisible.value = false;
  }
};


const onReady = (editorInstance) => {
  // console.log('Editor is ready', editorInstance); // Debugging log
  instance.value = editorInstance;
  editorInstance.enableReadOnlyMode('word-editor')
  editorInstance.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'bold' );
  editorInstance.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'italic' );
  editorInstance.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'heading' );
  editorInstance.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'fontSize' );
  editorInstance.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'fontFamily' );
  editorInstance.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'fontColor' );
  editorInstance.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'fontBackgroundColor' );
  editorInstance.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'underline' );
  editorInstance.plugins.get( 'RestrictedEditingModeEditing' ).enableCommand( 'strikethrough' );

  





  editorToolbarElement.value.innerHTML = '';
  editorToolbarElement.value.appendChild(editorInstance.ui.view.toolbar.element);
  editorInstance.model.document.on('change:data', (evt, data) => {
    // alert('gg')
    translateStore.wordTextEdit = true
  });
  editorInstance.editing.view.document.on('selectionChange', (evt, data) => {
    // console.log('Selection change event triggered');
    updateWordCount(editorInstance)
    updatePopupPosition(editorInstance);
  });

  editorInstance.editing.view.document.on('clipboardInput', () => {
    // console.log('Clipboard input event'); 
    updatePopupPosition(editorInstance);
  });

  editorInstance.model.document.on('selectionChange', () => {
  updatePopupPosition(editorInstance);
});
  breakContentIntoPages(editorInstance);

};
const selectedtext = ref()

const updatePageCount = (editorInstance) => {
  const editorContent = document.querySelector('.editor-container__editor .ck-content');
  if (editorContent) {
    const contentHeight = editorContent.scrollHeight;
    const numberOfPages = Math.ceil(contentHeight / PAGE_HEIGHT);
    totalPages.value = numberOfPages;
    const editorWrapper = document.querySelector('.editor-container__editor-wrapper');
    const scrollTop = editorWrapper.scrollTop;
    const current = Math.floor(scrollTop / PAGE_HEIGHT) + 1;
    currentPage.value = current;
  }
};

const onInput = (editorInstance) => {
  breakContentIntoPages(editorInstance);

};

const updateWordCount = (editorInstance) => {
  const wordCountPlugin = editorInstance.plugins.get('WordCount');
  if (wordCountPlugin) {
    wordCount.value = wordCountPlugin.words;
  }
};

const changeZoom = (newZoomLevel) => {
  zoomLevel.value = newZoomLevel;
  const zoomWrapper = document.querySelector('.zoom-wrapper');
  setTimeout(() => {
    zoomWrapper.style.transform = `scale(${zoomLevel.value / 100})`;
    zoomWrapper.style.transformOrigin = 'top left';
  }, 0);
};

const onScroll = () => {
  updatePageCount(instance.value);
  if (popupVisible.value) {
    updatePopupPosition(instance.value);
  }

  const editorWrapper = document.querySelector('.editor-container__editor-wrapper');
  const scrollTop = editorWrapper.scrollTop;
  const current = Math.floor(scrollTop / PAGE_HEIGHT) + 1;
  currentPage.value = current;
};

  
onMounted(() => {
  config.value = {
   language:locale.value,
    toolbar: {
      items: [
      // 'restrictedEditing',
        'undo',
        'redo',
        '|',
        'findAndReplace',
        'selectAll',
        '|',
        'heading',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'subscript',
        'superscript',
        'code',
        'removeFormat',
        '|',
        'specialCharacters',
        'horizontalLine',
        'pageBreak',
        'link',
        'insertImageViaUrl',
        'insertTable',
        'highlight',
        'blockQuote',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        'outdent',
        'indent',
        '|',
        'accessibilityHelp'
      ],
      shouldNotGroupWhenFull: true
    },

    // plugins: [
    //   // ResizableHeight,
    //   // RestrictedEditingMode,
    //   // AccessibilityHelp,
    //   // Alignment,
    //   // Autoformat,
    //   // AutoImage,
    //   // AutoLink,
    //   // Autosave,
    //   // BlockQuote,
    //   // Bold,
    //   // CloudServices,
    //   // Code,
    //   // Essentials,
    //   // FindAndReplace,
    //   // FontBackgroundColor,
    //   // FontColor,
    //   // FontFamily,
    //   // FontSize,
    //   // Heading,
    //   // Highlight,
    //   // HorizontalLine,
    //   // ImageBlock,
    //   // ImageCaption,
    //   // ImageInline,
    //   // ImageInsertViaUrl,
    //   // ImageResize,
    //   // ImageStyle,
    //   // ImageTextAlternative,
    //   // ImageToolbar,
    //   // ImageUpload,
    //   // Indent,
    //   // IndentBlock,
    //   // Italic,
    //   // Link,
    //   // LinkImage,
    //   // List,
    //   // ListProperties,
    //   // PageBreak,
    //   // Paragraph,
    //   // RemoveFormat,
    //   // SelectAll,
    //   // SpecialCharacters,
    //   // SpecialCharactersArrows,
    //   // SpecialCharactersCurrency,
    //   // SpecialCharactersEssentials,
    //   // SpecialCharactersLatin,
    //   // SpecialCharactersMathematical,
    //   // SpecialCharactersText,
    //   // Strikethrough,
    //   // Subscript,
    //   // Superscript,
    //   // Table,
    //   // TableCaption,
    //   // TableCellProperties,
    //   // TableColumnResize,
    //   // TableProperties,
    //   // TableToolbar,
    //   // TextTransformation,
    //   // TodoList,
    //   // Underline,
    //   // Undo,
    //   // WordCount
    // ],
  
    fontFamily: {
      supportAllValues: true
    },
    restrictedEditing: {
            allowedCommands: [ 'bold' ,'italic']
        },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph'
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1'
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2'
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3'
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4'
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5'
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6'
        }
      ]
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage'
      ]
    },
    initialData:
      `${translateStore.pdfProject.value[0].text}` || '',
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    menuBar: {
      isVisible: true
    },
    placeholder: 'Type or paste your content here!',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    wordCount: {
      onUpdate: (stats) => {
        wordCount.value = stats.words;
      }
    },


  };

  isLayoutReady.value = true;
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap');

@media print {
  body {
    margin: 0 !important;
  }
}

.main-container {
  --ckeditor5-preview-height: 700px;
  font-family: 'Lato';
  width: 100%;
  height: 100%;
}

.ck-content {
  font-family: 'Lato';
  line-height: 1.6;
  word-break: break-word;
  width: 100%;
  height: 100%;
}

.editor-container__editor-wrapper {
  display: flex;
  width: 100%;
}

.editor-container_document-editor {
  border: 1px solid var(--ck-color-base-border);
}

.editor-container_document-editor .editor-container__toolbar {
  display: flex;
  position: relative;
  box-shadow: 0 2px 3px hsla(0, 0%, 0%, 0.078);
}

.editor-container_document-editor .editor-container__toolbar > .ck.ck-toolbar {
  flex-grow: 1;
  width: 0;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top: 0;
  border-left: 0;
  border-right: 0;
}

.editor-container_document-editor .editor-container__editor-wrapper {
 height: 100%;
  overflow-y: scroll;
  background: var(--ck-color-base-foreground);
}

.editor-container_document-editor .editor-container__editor {
  margin-top: 28px;
  margin-bottom: 28px;
  height: 100%;
}

.editor-container_document-editor .editor-container__editor .ck.ck-editor__editable {
  box-sizing: border-box;
  min-height: 800px !important;
  height: fit-content;
  width: auto;
  border: 1px hsl(0, 0%, 82.7%) solid;
  background: hsl(0, 0%, 100%);
  box-shadow: 0 2px 3px hsla(0, 0%, 0%, 0.078);
  flex: 1 1 auto;
  
  @screen lg {
    padding: 7mm;
    width: auto;
    min-height: 100%;
  height: fit-content;

    margin-left: 72px;
    margin-right: 72px;
  }
  
  @screen ipad-max {
    width: 400px;
  }
}

.ck {
}

.popup {
  position: absolute;
  background: #35C0B4;
  border-radius: 4px;
  text-align: center;
  z-index: 50;
  height: 30px;
  font-size: 10px;
  display: flex;
  justify-items: center;
  align-items: center;
  color: white;
  padding: 10px;
}

.ck.ck-toolbar__items {
  @apply bg-[#F6F6F6];
}

.ck.ck-toolbar {
  @apply bg-[#F6F6F6];
}

.page-break {
  margin-top: 20px;
  margin-bottom: 20px;
}

.page-break-line {
  width: 100%;
  height: 2px;
  background-color: darkgrey;
  margin: 0 auto;
}

.page {
  margin-top: 50px;
}

.ck-content{

@screen xl {
  zoom: .7;
}

@screen lg {
  zoom: 0.6;
}

@screen 2xl{
  zoom : .7;
}
@screen ipad-max {
  zoom: 0.7;
}

}

.f_h{

    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

}

</style>
