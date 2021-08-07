<template>
  <input v-model="inputValue" :name="name" :id="id" @blur="handleBlur" />
</template>
<script lang="ts">
import { defineComponent, inject, WritableComputedRef } from "vue";

export default defineComponent({
  name: "InputField",
  setup() {
    const inputValue = inject("inputValue") as WritableComputedRef<string | number | boolean | null>;
    const id = inject("id") as string;
    const name = inject("name") as string;
    const handleBlur = inject("handleBlur") as () => void;

    return {
      inputValue,
      id,
      name,
      handleBlur,
    };
  },
});
</script>
