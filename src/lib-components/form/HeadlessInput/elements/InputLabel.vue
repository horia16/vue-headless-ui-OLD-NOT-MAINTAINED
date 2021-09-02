<template>
  <component :is="element" :for="isWrapper ? null : element === 'label' ? inputId : null">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
<script lang="ts">
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject, PropType } from "vue";

export default defineComponent({
  name: "InputLabel",
  props: {
    text: { type: String, default: "" },
    element: {
      type: String as PropType<"label" | "legend">,
      default: "label",
      validator: (value: string) => {
        return ["label", "legend"].indexOf(value) != -1;
      }
    },
    isWrapper: { type: Boolean, default: false }
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
