<template>
  <button @click="toggle" :id="`${accordionId}_toggle`" :aria-controls="accordionId" :aria-expanded="isOpen">
    <slot :isOpen="isOpen" :accordionId="accordionId" />
  </button>
</template>

<script>
import {defineComponent, inject} from "vue";
import {injectionKeys, isMissingInjectable} from "@/utils";

export default defineComponent({
  name: "AccordionToggle",
  setup(){
    const isOpen = inject(injectionKeys.ACCORDION.IS_OPEN);
    const accordionId = inject(injectionKeys.ACCORDION.COMPUTED_ID);
    const toggle = inject(injectionKeys.ACCORDION.TOGGLE);
    isMissingInjectable(isOpen, accordionId, toggle);
    return {
      isOpen,
      toggle,
      accordionId,
    };
  }
});
</script>

