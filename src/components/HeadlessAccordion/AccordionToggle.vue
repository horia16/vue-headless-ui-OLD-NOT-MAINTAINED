<template>
  <slot :accordionId="accordionId" :toggleId="toggleId" :open="open" :toggleAccordion="toggleAccordion" name="wrapper">
    <component
      :style="style"
      :class="toggleClass"
      v-bind="$attrs"
      :is="tag"
      :id="toggleId"
      :aria-controls="accordionId"
      :aria-expanded="open"
      @click="toggleAccordion"
    >
      <slot :accordionId="accordionId" :toggleId="toggleId" :open="open"></slot>
    </component>
  </slot>
</template>
<script lang="ts">
export default {
  name: "AccordionToggle"
};
</script>
<script setup lang="ts">
import { inject, computed } from "vue";
import { accordionKeys } from "@/injection-keys/accordion";
const props = defineProps({
  tag: { type: String, default: "button" },
  class: { type: [String, Object, Array], default: undefined },
  style: { type: [String, Object, Array], default: undefined }
});
const toggleClass = computed(() => props.class);
const open = inject(accordionKeys.Open);
const accordionId = inject(accordionKeys.Id);
const toggleId = computed(() => `${accordionId?.value}_toggle`);
const toggleAccordion = inject(accordionKeys.ToggleAccordion);
</script>
