<script lang="ts" setup>
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { reactive, toRefs } from "vue";

import { useGetSocialPlatforms } from "@/composables/useProfile";
const { getSocialPlatforms, socialPlatforms } = useGetSocialPlatforms();

// Reactive state
const state = reactive({
  handlers: [{
    name: "", // Empty name for new handlers
    icon: "test", // Assuming you want this to be the default icon
    handler: "",
  }], // Array to hold handler objects
});

// Vuelidate rules
const rules = {
  handlers: {
    $each: {
      name: { required, minLength: minLength(3) },
      // You can add other validations for different properties
    },
  },
};

// Vuelidate instance
const v$ = useVuelidate(rules, state);

// Emits
const emit = defineEmits(["cancelupdate"]);

// Methods
const cancelUpdate = () => {
  emit("cancelupdate");
};

// const addHandler = () => {
//   state.handlers.push();
// };

const { handlers } = toRefs(state);
const currentMode = inject('currentMode')

onMounted(async () => {
  await getSocialPlatforms();
})
</script>

<template>
  <div
    class="bg-white/60 shadow-sm  rounded-[10px] backdrop-blur-md h-auto flex flex-col
     items-start justify-start p-[15px] ipad-max:w-full w-full"
  >
    <div class="flex items-center justify-between w-full">
      <div class="text-[16px] leading-[24px] font-[600]">Portfolio</div>
 
    

    <div
      class="flex items-center justify-evenly space-x-[16px]   ipad-max:flex-wrap"
      v-if="currentMode === 'normal'"
    >
      <div
        v-for="platform in socialPlatforms"
        class="bg-[#F6F6F6] w-[33px] h-[33px] ipad-max:w-[15px] ipad-max:h-[15px] rounded-[4px] flex items-center justify-center"
      >
        <img :src="`https://tamkin.app/${platform.icon}`" class="w-[25px] h-[25px]" alt="" />
      </div>
    </div>
  </div>
    <div class="flex flex-col items-start justify-start w-full"       v-if="currentMode === 'editing'"
    >
      <div class="flex items-center justify-start space-x-[16px] w-full my-[10px]"     v-for="(handler, index) in socialPlatforms">
        <div
          class="bg-[#F6F6F6] w-[33px] h-[33px] rounded-[4px] flex items-center justify-center"
        >
          <img :src="`https://tamkin.app/${handler.icon}`" class="w-[25px] h-[25px]" alt="" />
          <!-- <img src="/imgs/fb.png" class="w-[25px] h-[25px]" alt="" /> -->
        </div>

        <!-- Iterate over handlers with v-for -->
        <div
      
          :key="index"
          class="w-full relative"
        >
          <input
            type="text"
            :id="`handler-${index}`"
            v-model="handler.name"
            placeholder=""
            class="input_floating_label peer w-full"
            :class="{
              input_error:
                v$.handlers?.$each?.[index]?.name?.$error &&
                v$.handlers?.$each?.[index]?.name?.required.$invalid,
              input_success:
                !v$.handlers?.$each?.[index]?.name?.$error &&
                !v$.handlers?.$each?.[index]?.name?.$invalid,
            }"
          />
          <label
            :for="`handler-${index}`"
            class="floating_label"
            :class="[
              v$.handlers?.$each?.[index]?.name?.$error &&
              v$.handlers?.$each?.[index]?.name?.required.$invalid
                ? '!text-error'
                : '',
            ]"
          >
            {{ $t("Handle") }}*
          </label>
          <div
            class="w-full lg:w-4/6"
            v-if="v$.handlers?.$each?.[index]?.name?.$error &&
                  v$.handlers?.$each?.[index]?.name?.required.$invalid"
          >
            <p class="error_message">
              <span>
                {{ $t("Please enter The handler") }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
