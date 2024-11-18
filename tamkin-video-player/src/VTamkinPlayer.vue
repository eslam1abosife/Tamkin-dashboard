<template>
<KeepAlive :max="200" >

  <div class="flex items-center justify-between w-full  h-full
  mt-[10px]  " style="position: relative;height:275px;">


  <div
  class="relative w-full "
  :style="{
    order: playerPosition === 'OutVideo' && playerPositioning === 'right' ? '1' :
           playerPosition === 'OutVideo' && playerPositioning === 'left' ? '2' : '1'
  }"
>

      <video
      v-if="isVideo"
      ref="mediaPlayer"
      class="video-js vjs-default-skin"
      playsinline

      controls
      preload="auto"
    >
    <track
    v-for="(track, index) in tracks"
    :key="index"
    kind="captions"
    :src="track.src"
    :srclang="track.lang"
    :label="track.label"
    :default="track.default"
  />
  </video>

    <audio
      v-else
      id="media_cc"
      ref="mediaPlayer"
      class="video-js vjs-default-skin "
      playsinline
      controls
      preload="auto"
    ></audio>

    </div>
   
    <div
  id="overlays-wrap"

    v-show="isPlayerVisible"
    :class="[
      playerPosition === 'OutVideo' ? 'block   mx-auto' : 'flex z-10',
      playerPositioning === 'right' ? 'position1 order-2' : 'position2 order-1',
      playerPosition === 'OutVideo' && playerPositioning === 'right' ? 'order-2' : '',
      playerPosition === 'OutVideo' && playerPositioning === 'left' ? 'order-1' : ''
    ]"
    :style="{
      display: props.playerPosition === 'OutVideo' ? 'block' : 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: props.playerPosition === 'OutVideo' ? 'auto' : 'auto',
      position: props.playerPosition === 'OutVideo' ? 'static' : 'absolute',
      top: props.playerPosition === 'OutVideo' ? 'auto' : '0',
      zIndex: props.playerPosition === 'OutVideo' ? 'auto' : '40',
    }"
  >
  

  <tamkin-sdk-web-character v-show="loaChar === 1" charWidth="250" charHeight="275" ></tamkin-sdk-web-character>
  <div v-show="loaChar !== 1 "  class="flex items-center justify-center">
    <Vue3Lottie :animationData="playerLoader" :loop="true" :autoplay="true"
     :height="238" :width="200" :no-margin="true" />
  </div>


  <button v-if="playerPosition === 'OutVideo'" @click="closePlayerINVid"
  style="position: absolute; bottom: -1px;"  class=" z-[40] !bg-selected h-[35px] flex items-center justify-center 
    text-[12px] font-[500] text-darkGrey border-[1px] border-lightGrey rounded-[8px] w-[250px]  mt-2">
     {{ $t('Close Player') }}
   </button>
 
    </div>

</div>
</KeepAlive>

</template>

<script setup lang="ts">
import {watch, ref, onMounted, onBeforeUnmount, computed, onBeforeMount, onUpdated, onActivated } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-wavesurfer';  
import { Vue3Lottie } from 'vue3-lottie'
import playerLoader from './lottie/loader.json'
const props = defineProps({
  mediaUrl: {
    type: String,
    required: true,
  },
  isVideo: {
    type: Boolean,
    required: true,
  },
  playerPosition: {
    type: String,
    default: 'inVideo',
  },
  backgroundPlayerContrast:{
    type: String,
  },
  backgroundPlayerContrastOpacity:{
    type: String,
    default: '1',
  },
  isPlayerVisible:{
    type: Boolean,
    default: true,
  },
  playerPositioning:{
    type: String,
      default:'right'
  },
  captionOptions: {
    type: Array,
    default: () => [
      { src: 'captions-en.vtt', lang: 'en', label: 'English', default: true },
      { src: 'captions-es.vtt', lang: 'es', label: 'Spanish', default: false }
    ]
  },
  currentLocale: {
    type: String,
    default: 'en',
  },
  subtitleColor: {
    type: String,
    default: '#FFFFFF', // Default white color
  },
  subtitleFontSize: {
    type: String,
    default: '16px', // Default font size
  },
  subtitleFontWeight: {
    type: String,
  },
  subtitleFontStyle: {
    type: String,
    default: 'normal', // Default style
  },
  subtitleBackground: {
    type: String,
    default: '#000000', // Default style
  },
  subtitleTextTransform: {
    type: String,
    default: 'none', // Default no transformation
  },
  subtitleLineHeight: {
    type: String,
    default: '3px', // Default line height
  },
  subtitleAlignment: {
    type: String,
    default: 'center', // Default center alignment
  },
  subtitleLetterSpacing: {
    type: String,
    default: 'normal', // Default letter spacing
  },
  subtitleUnderLine:{
    type:String,
    default:'none'
  },
  subtitleFontFamily: {
    type: String,
    default: 'Poppins', 
  },
  lineCount:{
    type: String,
    default: '2'
  }
});
const loaCharProxy = ref(0); 
const loadedplayer = ref(false);
const loaChar = ref(window.loaChar);  

const updateLoaChar = () => {
  loaChar.value = window.loaChar;
};

let interval;
onBeforeMount(() => {
  interval = setInterval(() => {
    if (loaChar.value !== window.loaChar) {
      updateLoaChar();
    }
  }, 100); 
});

const windowProxy = new Proxy(window, {
  get(target, prop) {
    if (prop === 'loaChar') {
      return loaCharProxy.value;  // Vue's reactivity system tracks this.
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === 'loaChar') {
      loaCharProxy.value = value;  // Vue's reactivity updates dependents.
    }
    target[prop] = value;
    return true;
  }
});

const backgroundPlayerContrastcomp = computed(() => {
  if (props.backgroundPlayerContrast) {
    return `rgba(255, 255, 255, ${props.backgroundPlayerContrastOpacity})`;
  } else {
    return `rgba(127, 132, 132, ${props.backgroundPlayerContrastOpacity})`; 
  }
});

const tracks = computed(() => props.captionOptions);
const isHovered = ref(false);  

const options = {
  fill: true,
  responsive: true,
  language:'ar',
  controlBar: {
    children: [
      'playToggle',
      'currentTimeDisplay',
      'TimeDivider',
      'durationDisplay',
      'progressControl',
      'volumePanel',
    ]
  },
  plugins: props.isVideo
    ? {}
    : {
        wavesurfer: {
          backend: 'MediaElement',
          displayMilliseconds: false,
          debug: true,
          waveColor: 'white',
          progressColor: '#2DADA3',
          cursorColor: 'white',
          interact: true,
          hideScrollbar: true,
          responsive: true
        },
      },
  
};

const mediaPlayer = ref(null);
let player = null;
let resizeObserver = null;

const emit = defineEmits(['TamkinFullScreen','closePlayer']);
const closePlayerINVid = () => {emit('closePlayer')};
const CustomFullscreenButton = videojs.getComponent('Button');
class MyCustomFullscreenButton extends CustomFullscreenButton {
  constructor(player, options) {
    super(player, options);
    this.controlText('Full Screen');
  }

  createEl() {
    const el = super.createEl('button', {
      className: 'vjs-custom-fullscreen-button vjs-control vjs-button',
      title: this.controlText(),
    });

    const icon = videojs.dom.createEl('span', {
      className: 'vjs-icon-placeholder',
      innerHTML: `<?xml version="1.0" ?><svg height="14px" version="1.1" viewBox="0 0 14 14" width="14px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="white" id="Core" transform="translate(-215.000000, -257.000000)"><g id="fullscreen" transform="translate(215.000000, 257.000000)"><path d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z" id="Shape"/></g></g></g></svg>`,
    });

    el.appendChild(icon);
    el.onclick = () => {
      emit('TamkinFullScreen');
      if (!props.isVideo) {
        const container = document.getElementById('media_cc');
        resizeObserver = new ResizeObserver(() => {
          if (player && player.wavesurfer()) {
            player.wavesurfer().surfer.drawer.containerWidth = player.el().offsetWidth;
            player.wavesurfer().surfer.drawBuffer();
          }
        });
        resizeObserver.observe(container);
      }
    };
    return el;
  }
}

const mediaType = computed(() => (props.isVideo ? 'video/mp4' : 'audio/wav'));
const currentSubtitle = ref(''); 
function splitTextIntoLines(text, lineCount) {
    const totalLength = text.length;
    const lineLength = Math.ceil(totalLength / lineCount);
    const newLines = [];

    for (let i = 0; i < lineCount; i++) {
        const start = i * lineLength;
        const end = start + lineLength;
        const lineText = text.substring(start, end).trim();
        if (lineText) {
            newLines.push(lineText);
        }
    }

    return newLines;
}

function updateCaptions(lineCount) {
    const textTrack = player.textTracks().tracks_[0]; 

    textTrack.addEventListener('cuechange', () => {
        const activeCues = textTrack.activeCues;

        if (activeCues && activeCues.length > 0) {
            for (let cue of Array.from(activeCues)) {
                const cueElement = document.querySelector(`.vjs-text-track-display .vjs-text-track-cue div`);
                // console.log('Cue Element:', cueElement);
                if (cueElement) {
                    const newLines = splitTextIntoLines(cue.text, lineCount);
                    cueElement.innerHTML = newLines.map(line => `<div>${line}</div>`).join('');
                } else {
                    console.error('Cue element not found for cue ID:', cue.text); 
                }
            }
        } else {
            console.log('No active cues found'); 
        }
    });
}
function makeCuesDraggable() {
    const cueElements = document.querySelectorAll('.vjs-text-track-display .vjs-text-track-cue div');

    if (cueElements.length === 0) {
        console.warn('No cue elements found. Retrying in 100ms...');

        // Retry after a short delay if no cues are found
        setTimeout(makeCuesDraggable, 100);
        return;
    }

    cueElements.forEach(cue => {
        let offsetY;

        cue.addEventListener('mousedown', (e) => {
            offsetY = e.clientY - cue.getBoundingClientRect().top;
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        const mouseMoveHandler = (e) => {
            cue.style.position = 'absolute'; // Set position to absolute
            cue.style.top = `${e.clientY - offsetY}px`; // Update the top position
        };

        const mouseUpHandler = () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
    });
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}
function loadCSS(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
    document.head.appendChild(link);
  });
}
async function loadfares() {
  try {
    await Promise.all([
      loadScript('https://cdn.tamkin.app/runtime.js'),
      loadScript('https://cdn.tamkin.app/app.js'),
      loadCSS('https://cdn.tamkin.app/app.css'),
    ]);
    console.log('All assets loaded successfully');
  } catch (error) {
    console.error(error);
  }
}


// onMounted(() => {
// });
onBeforeMount(()=>{

})
let subtitleCues = []; 
const overlayDiv = ref(null); 
async function fetchAndParseSubtitles() {
  const response = await fetch(props.captionOptions[0].src);
  const subtitleText = await response.text();
  subtitleCues = parseVTT(subtitleText); // Store parsed cues in global variable
}

// Parse WebVTT to extract cues
function parseVTT(text) {
  const cues = [];
  const lines = text.split('\n');
  let cue = {};

  for (let line of lines) {
    const timestampMatch = line.match(/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/);
    if (timestampMatch) {
      cue = {
        startTime: parseTimeString(timestampMatch[1]),
        endTime: parseTimeString(timestampMatch[2]),
        text: ''
      };
    } else if (line.trim() === '') {
      if (cue.startTime !== undefined && cue.endTime !== undefined) {
        cues.push(cue);
      }
      cue = {};
    } else {
      cue.text += line + ' ';
    }
  }
  return cues;
}

// Convert time string to seconds
function parseTimeString(timeString) {
  const [hours, minutes, seconds] = timeString.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds);
}

// Apply animation based on subtitle
 function applyAnimationForCurrentSubtitle() {
  const currentTime = player.currentTime();
  const targetCue = subtitleCues.find(cue => cue.startTime <= currentTime && cue.endTime >= currentTime);

  if (targetCue) {
    currentSubtitle.value = targetCue.text;
    console.log('Applying animation for subtitle:', currentSubtitle.value);
    window.getAdAnimate(targetCue.text); // Fetch and apply animation
  }
}


onBeforeMount(() => {
  
})
onMounted(async () => {

  await fetchAndParseSubtitles()
  
  player = videojs(mediaPlayer.value, options, function () {
    player.src({ src: props.mediaUrl, type: mediaType.value });
  });
  videojs.addLanguage(props.currentLocale, props.currentLocale);
  videojs.registerComponent('CustomFullscreenButton', MyCustomFullscreenButton);

  player.addClass('my-custom-control-bar');
  const controlBar = player.getChild('controlBar');
  controlBar.addChild('CustomFullscreenButton', {}, 7);

  if (!props.isVideo) {
    player.on('waveReady', function() {
    });
  }

  player.on('playbackFinish', function () {
    console.log('Playback finished.');
  });

  let originalParent = null; 


  const overlaysWrap = document.getElementById('overlays-wrap');
      if (overlaysWrap) {
        originalParent = overlaysWrap.parentNode;

        player.on('fullscreenchange', () => {
          if (player.isFullscreen()) {
            const videoWrapper = document.querySelector('.vjs-tech').parentNode; 
            videoWrapper.appendChild(overlaysWrap);
          } else {
            if (originalParent) {
              originalParent.appendChild(overlaysWrap);
            }
            overlaysWrap.style.position = 'absolute'; 
          }
        });
      }
player.ready(async () => {
  applySubtitleStyles();
  // loadfares()


  watch(loaCharProxy, (newVal) => {
    if (newVal === 1) {
      loadedplayer.value = true;
    }

  });
  // window.changeBackgroundColor('black') 
  
  const activeTextTrack = player.textTracks().tracks_.find(track => track.mode === 'showing');



  if (activeTextTrack) {
  
    console.log('Active text track:', activeTextTrack.label);

    activeTextTrack.addEventListener('loadeddata', () => {
      
      if (activeTextTrack.cues && activeTextTrack.cues.length > 0) {
        currentSubtitle.value = activeTextTrack.cues[0].text;
    
        console.log('Current Subtitle : ' + currentSubtitle.value);
      }
    });

    activeTextTrack.addEventListener('cuechange', () => {
      const activeCues = activeTextTrack.activeCues;
   
      if (activeCues.length > 0) {
        const cueText = Array.from(activeCues).map(cue => cue.text).join(' ');

        const lineCount = 4; 
        updateCaptions(Number(props.lineCount));
        currentSubtitle.value = cueText; 

      } else {
        currentSubtitle.value = ''; 
      }

      console.log('Current Subtitle : ' + currentSubtitle.value);
    });
  }
});


player.on('play', () => {
  });

  player.on('timeupdate', () => {
    const currentTime = Math.floor(player.currentTime());
// console.log('currentime',currentTime)

      applyAnimationForCurrentSubtitle();
    
  });


  player.on('error', function (element, error) {
    console.warn('ERROR:', error);
  });
  updateCaptions(Number(props.lineCount));

});


watch(loaChar, () => {
  if(loaChar.value == 1){
    window.changeBackgroundColor(backgroundPlayerContrastcomp.value);
    window.tmk_trans_background_50
  }
 
})
watch(
  [
    () => props.subtitleColor,
    () => props.subtitleFontSize,
    () => props.subtitleFontWeight,
    () => props.subtitleFontStyle,
    () => props.subtitleTextTransform,
    () => props.subtitleLineHeight,
    () => props.subtitleAlignment,
    () => props.subtitleLetterSpacing,
    () => props.subtitleUnderLine,
    () => props.subtitleFontFamily,
    ()=> props.lineCount,
    ()=>props.subtitleBackground,
    ()=>props.playerPositioning,
    ()=>props.backgroundPlayerContrastOpacity,
    ()=>props.backgroundPlayerContrast,

  ],
  () => {
    if (player) {
      applySubtitleStyles();
      
      updateCaptions(Number(props.lineCount));

    window.changeBackgroundColor(backgroundPlayerContrastcomp.value);
 
    }
  }
);


function applySubtitleStyles(subtext) {
  updateCaptions(Number(props.lineCount));
  
  const subtitleStyles = `
    .vjs-text-track-cue div {
      color: ${props.subtitleColor} !important;
      font-size: ${props.subtitleFontSize} !important;
      font-weight: ${props.subtitleFontWeight} !important;
      font-style: ${props.subtitleFontStyle} !important;
      text-transform: ${props.subtitleTextTransform} !important;
      line-height: ${props.subtitleLineHeight} !important;
      letter-spacing: ${props.subtitleLetterSpacing} !important;
      text-decoration: ${props.subtitleUnderLine} !important;
      font-family: ${props.subtitleFontFamily} !important;
            background-color: ${props.subtitleBackground} !important;
         

    }
    .vjs-text-track-cue div {
      font-family: ${props.subtitleFontFamily} !important;
    }
    .vjs-text-track-cue {
      font-family: ${props.subtitleFontFamily} !important; /* Add this line */
            text-align: ${props.subtitleAlignment} !important;
         

    }
    .vjs-text-track-cue {
      top: calc( ${props.subtitleFontSize !== '32px' ? '90%' : '80%'} - ${props.subtitleLineHeight !== '0px' ? props.subtitleLineHeight : '0px'} ) !important; 
      }
  `;

  const styleEl = document.createElement('style');
  styleEl.innerHTML = subtitleStyles;

  // Append the style to the player
  const videoContainer = player.el();
  videoContainer.appendChild(styleEl);

  // const subtitleElements = document.querySelectorAll('.vjs-text-track-cue div');

  // subtitleElements.forEach(subtitleElement => {
  //   if (subtitleElement && props.subtitleLines) {
  //     const subtitleText = subtitleElement.innerText; // Get the current subtitle text
  //     console.log(subtitleText);
  //     const lines = splitTextIntoLines(subtitleText, 4); // Split the text into lines
  //     subtitleElement.innerHTML = lines.join('<br>'); // Insert the text with line breaks
  //   }
  // });
}



onBeforeUnmount(() => {
  // if (player) {
  //   player.dispose();
  // }
});
</script>

<!-- @import url('https://cdn.tamkin.app/app.css'); -->

<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  font-family: "Poppins", sans-serif;
}

/* Video.js styles with new deep selector for scoped styling */
:deep(.video-js) {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  min-height: 275px;
}

:deep(.vjs-current-time),
:deep(.vjs-duration),
:deep(.vjs-time-divider) {
  display: block !important;
}

:deep(.vjs-control-bar) {
  bottom: 16px !important;
  border-radius: 10px;
  left: 10px !important;
  right: 10px !important;
  width: auto !important;
  z-index: 40 !important;
}

:deep(.vjs-text-track-display) {
  z-index: 40;
}

:deep(.vjs-big-play-button),
:deep(.video-js .vjs-big-play-button) {
  background: #2dada3 !important;
  border-radius: 100% !important;
  width: 50px !important;
  height: 50px !important;
  line-height: 1.6em !important;
}

:deep(wave) {
  padding-right: 1px;
  padding-left: 1px;
}

/* Scoped component styles */
.position1 {
  z-index: 40 !important;
}

:dir(ltr) .position1 {
  right: 0;
}

:dir(rtl) .position1 {
  left: 0;
}

.position2 {
  z-index: 40 !important;
}

/* Left-to-Right */
:dir(ltr) .position2 {
  left: 0;
}

/* Right-to-Left */
:dir(rtl) .position2 {
  right: 0;
}

/* Canvas styling with scoped and Tailwind utility class */
:deep(canvas) {
  width: 250px !important;
  height: 275px !important;
  z-index: 40 !important;
  @apply rounded-[10px];
}
</style>



