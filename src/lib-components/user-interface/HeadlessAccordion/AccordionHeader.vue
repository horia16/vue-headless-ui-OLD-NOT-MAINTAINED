<template>
  <div>
    <slot :isOpen="isOpen" :toggle="toggle" />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, WritableComputedRef } from "vue";

export default defineComponent({
  name: "AccordionHeader",
  setup() {
    const isOpen = inject("isOpen") as WritableComputedRef<boolean>;
    const toggle = inject("toggle") as () => void;

    return {
      isOpen,
      toggle,
    };
  },
});
</script>
