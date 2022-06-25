<script lang="ts" setup>
import useContent, { AccordionContentState } from "../composables/use-content";

defineProps({
  htmlTag: {
    type: String,
    default: "div"
  },
  style: {
    type: [String, Object, Array],
    default: undefined
  }
});

const wrapper = ref<HTMLElement | null>(null);

const { state, accordionId, computedStyle } = useContent(wrapper);
</script>
<template>
  <component
    :is="htmlTag"
    v-if="state !== AccordionContentState.CLOSED"
    :id="accordionId"
    ref="wrapper"
    :aria-labelledby="`${accordionId}_toggle`"
    :style="[style, computedStyle]"
    role="region"
  >
    <slot />
  </component>
</template>
