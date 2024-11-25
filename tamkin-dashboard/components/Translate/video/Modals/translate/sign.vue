<script lang="ts" setup>
import { useTranslateStore } from "~/stores/translate";
import USa from '/public/assets/imgs/translatevideo/USA.svg'

const translateStore = useTranslateStore()

const languagesArr = [
    {
        id: 1,
        name: 'English (USA)',
        icon: USa
    },
    {
        id: 2,
        name: 'English (USA)',
        icon: USa

    },
    {
        id: 3,
        name: 'English (USA)',
        icon: USa

    },

]
const handleSelectedItemProjectName = (item: any) => {
    console.log(item)
}
</script>

<template>


</template>