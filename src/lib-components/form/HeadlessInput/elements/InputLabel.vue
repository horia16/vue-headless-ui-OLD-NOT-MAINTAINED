<template>
  <component :is="element" :for="inputId">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
<script lang="ts">
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
      },
    },
  },
  setup() {
    const inputId = inject("id") as string;

    return {
      inputId,
    };
  },
});
</script>
