<template>
  <div>
    <slot :isOpen="isOpen" :toggle="toggle" :accordionId="accordionId" />
  </div>
</template>
<script lang="ts">
import { ComputedRef, defineComponent, inject, WritableComputedRef } from "vue";

export default defineComponent({
  name: "AccordionHeader",
  setup() {
    const isOpen = inject("isOpen") as WritableComputedRef<boolean>;
    const accordionId = inject("accordionId") as ComputedRef<string>;
    const toggle = inject("toggle") as () => void;

    return {
      isOpen,
      toggle,
      accordionId,
    };
  },
});
</script>
