<template>
  <component :is="tag" :aria-label="ariaLabel" role="tablist" :class="tablistClass" :style="style">
    <slot />
  </component>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  tag: { type: String, default: "div" },
  ariaLabel: {
    type: [String, Number],
    default: "Tab list"
  },
  class: { type: [String, Object, Array], default: undefined },
  style: { type: [String, Object, Array], default: undefined }
});
const tablistClass = computed(() => props.class);
</script>
