<template>
  <input
    v-model="inputValue"
    :value="value"
    :name="name"
    type="checkbox"
    :id="`${id}-index-${index}`"
    @blur="handleBlur"
    @change="meta.touched = true"
    :aria-invalid="errorMessage && state == 'error'"
    :aria-describedby="errorMessage && state == 'error' ? `${id}-error` : null"
  />
</template>
<script lang="ts">
import { FieldMeta } from "../../../../hooks/input";
import { defineComponent, inject, WritableComputedRef } from "vue";

export default defineComponent({
  name: "CheckboxField",
  props: {
    value: { type: [String, Number], default: null },
    index: { type: Number, required: true },
  },
  emits: ["blur"],
  setup() {
    const inputValue = inject("inputValue") as WritableComputedRef<string | number | boolean | null>;
    const id = inject("id") as string;
    const name = inject("name") as string;
    const errorMessage = inject("errorMessage") as string;
    const state = inject("state") as string;
    const handleBlur = inject("handleBlur") as () => void;
    const meta = inject("meta") as FieldMeta<undefined>;
    return {
      inputValue,
      id,
      name,
      handleBlur,
      errorMessage,
      state,
      meta,
    };
  },
});
</script>
