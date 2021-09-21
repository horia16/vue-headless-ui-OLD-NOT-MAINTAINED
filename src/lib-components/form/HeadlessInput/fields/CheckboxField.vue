<template>
  <input
    :id="inputId"
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
import useArrayLink from "@/hooks/arrayLink";

export default defineComponent({
  name: "CheckboxField",
  props: {
    value: { type: [String, Number, Object, Array], default: null }
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
    const inputs = inject(injectionKeys.FORM.INPUTS);
    isMissingInjectable(id, name, errorMessage, state, meta, handleBlur, inputs);
    const { id: inputId } = useArrayLink(inputs);
    return {
      inputValue,
      id,
      inputId,
      name,
      handleBlur,
      errorMessage,
      state,
      meta
    };
  }
});
</script>
