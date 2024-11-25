<script lang="ts" setup>
import { VTamkinPlayer } from 'tamkin-video-player';
const videoUrl = ref('/video.mp4'); 

</script>

<template>

    <VTamkinPlayer :videoUrl="videoUrl" :width="640" :height="360" />

</template>