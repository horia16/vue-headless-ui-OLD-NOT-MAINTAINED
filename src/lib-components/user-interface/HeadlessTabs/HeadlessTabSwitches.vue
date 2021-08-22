<template>
  <div role="tablist" :aria-label="ariaLabel">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeadlessTabSwitches",
  props: {
    ariaLabel: {
      type: [String, Number],
      default: "Tab list",
    },
  },
  setup() {},
});
</script>
