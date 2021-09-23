<template>
  <button
    :disabled="disabled || loading"
    :aria-busy="loading ? true : undefined"
    :aria-live="loading ? 'polite' : undefined"
  >
    <slot>
      {{ label }}
    </slot>
    <span v-if="loading">
      <slot name="loading"></slot>
    </span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeadlessButton",
  props: {
    label: { type: [String, Number], default: null },
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  setup() {}
});
</script>
