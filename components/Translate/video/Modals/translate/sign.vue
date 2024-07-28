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

    <div class="flex items-center justify-between w-full">
        <div class="text-[14px] leading-[24px] text-darkGrey font-[600]">
            Sign language
        </div>
        <div class="ml-auto flex items-center mt-[16px]">
            <label for="toggle_google_a" class="toggle_wrap">
                <input type="checkbox" id="toggle_google_a" class="sr-only"
                    v-model="translateStore.signLanguageChecked" />
                <div class="toggle_parent" :class="[translateStore.signLanguageChecked ? 'active' : 'in_active']">
                    <div class="toggle_inner" :class="{ active: translateStore.signLanguageChecked }">
                        <img v-if="translateStore.signLanguageChecked" src="/assets/imgs/translatevideo/sign_active.svg"
                            class="w-[28px] h-[28px]" />
                        <img v-else src="/assets/imgs/translatevideo/sign_inactive.svg" class="w-[28px] h-[28px]" />
                    </div>
                </div>
            </label>
        </div>
    </div>

    <TranslateSelectInput class="mt-[16px] !w-full " :disabled="!translateStore.signLanguageChecked"
        :class="[!translateStore.signLanguageChecked ? 'blur-[2px]' : '']"
        @getCurrentSelectedItem="handleSelectedItemProjectName" :enableSearch="true" iconKey="icon"
        placeholderinput="Original language" :list="languagesArr" nameKey="name" idField="id" />

</template>