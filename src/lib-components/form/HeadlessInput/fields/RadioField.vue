<template>
  <input
    v-model="inputValue"
    :value="value"
    :name="name"
    type="radio"
    :id="`${id}-index-${index}`"
    @blur="handleBlur"
    :aria-invalid="errorMessage && state == 'error'"
    :aria-describedby="errorMessage && state == 'error' ? `${id}-error` : null"
  />
</template>
<script lang="ts">
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "RadioField",
  props: {
    value: { type: [String, Number], default: null },
    index: { type: Number, required: true },
  },
  emits: ["blur"],
  setup() {
    const inputValue = inject(injectionKeys.FORM.INPUT_VALUE);
    const id = inject(injectionKeys.FORM.ID);
    const name = inject(injectionKeys.FORM.NAME);
    const errorMessage = inject(injectionKeys.FORM.ERROR_MESSAGE);
    const state = inject(injectionKeys.FORM.STATE);
    const handleBlur = inject(injectionKeys.FORM.HANDLE_BLUR);
    isMissingInjectable(id, inputValue, name, errorMessage, state, handleBlur);
    return {
      inputValue,
      id,
      name,
      handleBlur,
      errorMessage,
      state,
    };
  },
});
</script>
