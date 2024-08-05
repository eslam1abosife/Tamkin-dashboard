import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Font from '@ckeditor/ckeditor5-font/src/font';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import List from '@ckeditor/ckeditor5-list/src/list';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Table from '@ckeditor/ckeditor5-table/src/table';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Undo from '@ckeditor/ckeditor5-undo/src/undo';

class ClassicEditor extends ClassicEditorBase {}

// Plugins to include in the build.
ClassicEditor.builtinPlugins = [
  Essentials,
  Autoformat,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Superscript,
  Subscript,
  Font,
  Paragraph,
  Heading,
  Alignment,
  List,
  Indent,
  BlockQuote,
  Table,
  MediaEmbed,
  Undo,
  UploadAdapter
];

// Editor configuration.
ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading', '|',
      'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', '|',
      'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|',
      'alignment', '|',
      'numberedList', 'bulletedList', '|',
      'indent', 'outdent', '|',
      'blockQuote', 'insertTable', 'mediaEmbed', 'undo', 'redo'
    ]
  },
  language: 'en',
  fontSize: {
    options: [
      9, 11, 13, 'default', 17, 19, 21
    ],
    supportAllValues: true
  },
  fontColor: {
    columns: 5,
    documentColors: 10
  },
  fontBackgroundColor: {
    columns: 5,
    documentColors: 10
  }
};

export default ClassicEditor;
