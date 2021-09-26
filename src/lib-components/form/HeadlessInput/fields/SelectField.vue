<template>
  <select :id="id" v-model="inputValue" @blur="handleBlur">
    <option v-if="placeholder" :value="null" disabled hidden selected> {{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option[valueKey]">{{ option[nameKey] }}</option>
  </select>
</template>
<script lang="ts">
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject } from "vue";
import { emits } from "@/shared/fields/common";

export default defineComponent({
  name: "SelectField",
  props: {
    placeholder: { type: String, default: null },
    valueKey: { type: String, default: "value" },
    nameKey: { type: String, default: "name" }
  },
  emits,
  setup() {
    const inputValue = inject(injectionKeys.FORM.INPUT_VALUE);
    const id = inject(injectionKeys.FORM.ID);
    const name = inject(injectionKeys.FORM.NAME);
    const handleBlur = inject(injectionKeys.FORM.HANDLE_BLUR);
    const options = inject(injectionKeys.FORM.OPTIONS);
    if (!options) console.warn("Missing options. Please make sure are passing options to the headless input.");
    isMissingInjectable(id, inputValue, name, handleBlur, options);
    return {
      inputValue,
      id,
      handleBlur,
      options
    };
  }
});
</script>
