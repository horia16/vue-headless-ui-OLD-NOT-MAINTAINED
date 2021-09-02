<template>
  <input
    :id="`${id}-index-${index}`"
    v-model="inputValue"
    :aria-describedby="errorMessage && state === 'error' ? `${id}-error` : null"
    :aria-invalid="errorMessage && state === 'error'"
    :name="name"
    :value="value"
    type="checkbox"
    @blur="handleBlur"
    @change="meta.touched = true"
  />
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
import { injectionKeys, isMissingInjectable } from "@/utils";

export default defineComponent({
  name: "CheckboxField",
  props: {
    value: { type: [String, Number], default: null },
    index: { type: Number, required: true }
  },
  emits: ["blur"],
  setup() {
    const inputValue = inject(injectionKeys.FORM.INPUT_VALUE);
    const id = inject(injectionKeys.FORM.ID);
    const name = inject(injectionKeys.FORM.NAME);
    const errorMessage = inject(injectionKeys.FORM.ERROR_MESSAGE);
    const state = inject(injectionKeys.FORM.STATE);
    const meta = inject(injectionKeys.FORM.META);
    const handleBlur = inject(injectionKeys.FORM.HANDLE_BLUR);
    isMissingInjectable(id, name, errorMessage, state, meta, handleBlur);
    return {
      inputValue,
      id,
      name,
      handleBlur,
      errorMessage,
      state,
      meta
    };
  }
});
</script>
