<template>
  <component :is="as" aria-label="ariaLabel" role="tablist">
    <slot />
  </component>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeadlessTabSwitches",
  props: {
    ariaLabel: {
      type: [String, Number],
      default: "Tab list"
    },
    as: { type: String, default: "div" }
  },
  setup() {}
});
</script>
