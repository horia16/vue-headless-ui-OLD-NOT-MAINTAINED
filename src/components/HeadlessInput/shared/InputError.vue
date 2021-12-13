<template>
  <component :is="tag" v-if="errorMessage && state === 'error'" :id="`${id}-error`" data-error="true">
    <slot :errorMessage="errorMessage">
      {{ errorMessage }}
    </slot>
  </component>
</template>
<script lang="ts">
export default {
  name: "InputError"
};
</script>
<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    default: "div"
  }
});
import { inputKeys } from "@/injection-keys/input";
import { inject } from "vue";
const errorMessage = inject(inputKeys.ErrorMessage);
const state = inject(inputKeys.State);
const id = inject(inputKeys.Id);
</script>
