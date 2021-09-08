<template>
  <select :id="id" v-model="inputValue" @blur="handleBlur">
    <option v-if="placeholder" :value="null" disabled hidden selected> {{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.name }}</option>
  </select>
</template>
<script lang="ts">
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject, PropType } from "vue";

export default defineComponent({
  name: "SelectField",
  props: {
    options: { type: Object as PropType<{ name: string; value: any }>, required: true },
    placeholder: { type: String, default: null }
  },
  emits: ["blur"],
  setup() {
    const inputValue = inject(injectionKeys.FORM.INPUT_VALUE);
    const id = inject(injectionKeys.FORM.ID);
    const name = inject(injectionKeys.FORM.NAME);
    const handleBlur = inject(injectionKeys.FORM.HANDLE_BLUR);
    isMissingInjectable(id, inputValue, name, handleBlur);

    return {
      inputValue,
      id,
      name,
      handleBlur
    };
  }
});
</script>
