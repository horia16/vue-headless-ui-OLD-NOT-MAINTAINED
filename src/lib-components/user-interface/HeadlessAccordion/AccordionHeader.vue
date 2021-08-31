<template>
  <div>
    <slot :accordionId="accordionId" :isOpen="isOpen" :toggle="toggle"/>
  </div>
</template>
<script lang="ts">
import {injectionKeys, isMissingInjectable} from "@/utils";

import {defineComponent, inject} from "vue";

export default defineComponent({
  name: "AccordionHeader",
  setup() {
    const isOpen = inject(injectionKeys.ACCORDION.IS_OPEN);
    const accordionId = inject(injectionKeys.ACCORDION.COMPUTED_ID);
    const toggle = inject(injectionKeys.ACCORDION.TOGGLE);
    isMissingInjectable(isOpen, accordionId, toggle);
    return {
      isOpen,
      toggle,
      accordionId,
    };
  },
});
</script>
