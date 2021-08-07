<template>
  <label :for="inputId">
    <slot>
      {{ text }}
    </slot>
  </label>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
export default defineComponent({
  name: "InputLabel",
  props: {
    text: { type: String, default: "" },
  },
  setup() {
    const inputId = inject("id") as string;
    return {
      inputId,
    };
  },
});
</script>
