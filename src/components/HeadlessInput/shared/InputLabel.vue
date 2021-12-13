<template>
  <component :is="isLegend ? 'legend' : 'label'" :for="!isLegend ? inputId : null">
    <slot>
      {{ text }}
    </slot>
  </component>
</template>
<script lang="ts">
export default {
  name: "InputLabel"
};
</script>
<script setup lang="ts">
import { inputKeys } from "@/injection-keys/input";
import { inject, computed } from "vue";
defineProps({
  text: { type: String, default: "" }
});
const inputId = inject(inputKeys.Id);
const checkbox = inject(inputKeys.Checkbox);
const radio = inject(inputKeys.Radio);
const isLegend = computed(() => {
  return checkbox?.value || radio?.value;
});
</script>
