<script lang="ts" setup>
import {useRouter} from "#vue-router";
const router = useRouter();
const localePath = useLocalePath()
definePageMeta({
  middleware:['auth']
})
onBeforeMount(() => {
  router.push(localePath('/team'))
})
</script>
<template>
    <div>

    </div>
</template>