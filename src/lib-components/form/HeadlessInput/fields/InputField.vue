<template>
  <input
    v-model="inputValue"
    :name="name"
    :id="id"
    @blur="handleBlur"
    :aria-invalid="errorMessage && state == 'error'"
    :aria-describedby="errorMessage && state == 'error' ? `${id}-error` : null"
  />
</template>
<script lang="ts">
import { defineComponent, inject, WritableComputedRef } from "vue";

export default defineComponent({
  name: "InputField",
  emits: ["blur"],
  setup() {
    const inputValue = inject("inputValue") as WritableComputedRef<string | number | boolean | null>;
    const id = inject("id") as string;
    const name = inject("name") as string;
    const errorMessage = inject("errorMessage") as string;
    const state = inject("state") as string;
    const handleBlur = inject("handleBlur") as () => void;

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
