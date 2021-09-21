<template>
  <component :is="legend ? 'legend' : 'label'" :for="wrapper ? null : !legend ? inputId : null">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
<script lang="ts">
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "InputLabel",
  props: {
    text: { type: String, default: "" },
    legend: { type: Boolean, default: false },
    wrapper: { type: Boolean, default: false }
  },
  setup() {
    const inputId = inject(injectionKeys.FORM.ID);
    isMissingInjectable(inputId);
    return {
      inputId
    };
  }
});
</script>
