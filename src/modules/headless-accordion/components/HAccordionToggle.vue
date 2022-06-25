<script setup lang="ts">
import injectDefined from "@/utilities/inject-defined";
import keys from "../keys";

defineProps({
  htmlTag: {
    type: String,
    default: "button"
  },
  style: {
    type: [String, Object, Array],
    default: undefined
  }
});

const accordionId = injectDefined(keys.ID);
const open = injectDefined(keys.OPEN);
const componentId = computed(() => `${accordionId?.value}_toggle`);

const toggleAccordion = injectDefined(keys.TOGGLE_ACCORDION);
</script>
<template>
  <slot :component-id="componentId" name="wrapper">
    <component
      :is="htmlTag"
      v-bind="$attrs"
      :id="componentId"
      :style="style"
      :aria-controls="open ? accordionId : undefined"
      :aria-expanded="open"
      @click="toggleAccordion"
    >
      <slot :component-id="componentId"></slot>
    </component>
  </slot>
</template>
