<template>
  <div>
    <div class="main-container">
      <div class="editor-container editor-container_document-editor" ref="editorContainerElement">
        <div class="editor-container__menu-bar !bg-[#F6F6F6]" ref="editorMenuBarElement"></div>
        <div class="editor-container__toolbar !bg-[#F6F6F6]" ref="editorToolbarElement"></div>
        <div class="editor-container__editor-wrapper" @scroll="onScroll">
          <div class="editor-container__editor">
            <div ref="editorElement">
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
              <div v-if="popupVisible && selectedText" :style="popupStyle" class="popup">
                Sign language
              </div>
            </div>
          </div>
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CKEditor from '@ckeditor/ckeditor5-vue';
import {
  DecoupledEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  PageBreak,
  Paragraph,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  WordCount
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

const config = ref({});
const isLayoutReady = ref(false);
const editorToolbarElement = ref(null);
const editorMenuBarElement = ref(null);
const editor = DecoupledEditor;

const wordCount = ref(0);
const currentPage = ref(1);
const totalPages = ref(1);
const zoomLevel = ref(100);
const instance = ref(null);
const PAGE_HEIGHT = 1122; // Example height for an A4 page in pixels

const selectedText = ref('');
const popupVisible = ref(false);
const popupStyle = ref({ top: '0px', left: '0px' });

const breakContentIntoPages = (editorInstance) => {
  const editorContent = document.querySelector('.editor-container__editor .ck-content');
  if (editorContent) {
    const contentHeight = editorContent.scrollHeight;
    const numberOfPages = Math.ceil(contentHeight / PAGE_HEIGHT);

    while (editorContent.firstChild) {
      editorContent.removeChild(editorContent.firstChild);
    }

    let currentPage = document.createElement('div');
    currentPage.classList.add('page');
    editorContent.appendChild(currentPage);

    let currentPageHeight = 0;
    Array.from(editorInstance.ui.view.editable.element.childNodes).forEach((node) => {
      const clonedNode = node.cloneNode(true);
      currentPage.appendChild(clonedNode);

      if (currentPage.scrollHeight > PAGE_HEIGHT) {
        currentPage.removeChild(clonedNode);
        currentPage = document.createElement('div');
        currentPage.classList.add('page');
        editorContent.appendChild(currentPage);
        currentPage.appendChild(clonedNode);
        currentPageHeight = currentPage.scrollHeight;
      } else {
        currentPageHeight = currentPage.scrollHeight;
      }

      if (currentPage.previousElementSibling && !currentPage.previousElementSibling.classList.contains('page-break')) {
        const pageBreak = document.createElement('div');
        pageBreak.classList.add('page-break');
        currentPage.parentNode.insertBefore(pageBreak, currentPage);
      }
    });

    if (!editorContent.lastChild.classList.contains('page-break')) {
      const pageBreak = document.createElement('div');
      pageBreak.classList.add('page-break');
      editorContent.appendChild(pageBreak);
    }

    totalPages.value = numberOfPages;
  } else {
    console.error('Editor content not found');
  }
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
    const ckContainer = document.querySelector('.ck');
    const ckContainerRect = ckContainer.getBoundingClientRect();
    const scrollY = ckContainer ? ckContainer.scrollTop : 0;

    if (rects.length > 0) {
      const firstRect = rects[0];
      let topPosition = firstRect.top + window.scrollY - 120; // Adjust for popup height
      let leftPosition = firstRect.left + window.scrollX - 50 + (firstRect.width / 2); // Center horizontally assuming popup width is 100px

      // Ensure the popup stays within the ck container horizontally
      if (leftPosition < ckContainerRect.left + window.scrollX) {
        leftPosition = ckContainerRect.left + window.scrollX;
      }
      if (leftPosition + 500 > ckContainerRect.right + window.scrollX) { // Assuming popup width is 100px
        leftPosition = ckContainerRect.right + window.scrollX - 500;
      }

     
      // if (topPosition + 40 > ckContainerRect.bottom + window.scrollY) {
      //   topPosition = ckContainerRect.bottom + window.scrollY - 40;
      // }

      popupStyle.value = {
        top: `${topPosition}px`,
        left: `${leftPosition}px`,
      };
    } else {
      popupVisible.value = false;
    }
  } else {
    selectedText.value = '';
    popupVisible.value = false;
  }
};




const onReady = (editorInstance) => {
  console.log(editorInstance);
  instance.value = editorInstance;
  editorToolbarElement.value.innerHTML = '';
  editorToolbarElement.value.appendChild(editorInstance.ui.view.toolbar.element);

  editorInstance.editing.view.document.on('selectionChange', (evt, data) => {
    console.log('Selection change event triggered');
    updatePopupPosition(editorInstance);
  });
};

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
  // breakContentIntoPages(editorInstance);
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
    toolbar: {
      items: [
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
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BlockQuote,
      Bold,
      CloudServices,
      Code,
      Essentials,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Heading,
      Highlight,
      HorizontalLine,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      PageBreak,
      Paragraph,
      RemoveFormat,
      SelectAll,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
      WordCount
    ],
    balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
    fontFamily: {
      supportAllValues: true
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
      '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n    You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing\n    capabilities that are customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n    <li>\n        <strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your\n        application.\n    </li>\n    <li>\n        <strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.\n    </li>\n    <li>\n        <strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even\n        write your plugin!\n    </li>\n</ol>\n<p>\n    Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us\n    as we strive to improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n    <li>📝 <a href="https://orders.ckeditor.com/trial/premium-features">Trial sign up</a>,</li>\n    <li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n    <li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n    <li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n    <li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n    See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect\n    license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we\n    will help as soon as possible!\n</p>\n',
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
    }
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
}

.ck-content {
	font-family: 'Lato';
	line-height: 1.6;
	word-break: break-word;
	width: 100%;
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
	max-height: var(--ckeditor5-preview-height);
	min-height: var(--ckeditor5-preview-height);
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
	min-height: 297mm;
	height: fit-content;
	width: auto;
	border: 1px hsl(0, 0%, 82.7%) solid;
	background: hsl(0, 0%, 100%);
	box-shadow: 0 2px 3px hsla(0, 0%, 0%, 0.078);
	flex: 1 1 auto;

	@screen lg {
		padding: 20mm 12mm;
		width: 700px;
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
  padding:10px;
}

.ck.ck-toolbar__items{
@apply bg-[#F6F6F6];
}

.ck.ck-toolbar{
  @apply bg-[#F6F6F6];
  }
</style>
