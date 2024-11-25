<template>
  <slot />
</template>

<script setup>
import { defineExpose } from 'vue'

// Accept a prop for the layout name
const props = defineProps({
  name: {
    type: String,
    required: true
  }
})

// Provide the layout name
provide('currentLayout', props.name)

// Debug output
console.log(`Layout provided: ${props.name}`)
</script>
