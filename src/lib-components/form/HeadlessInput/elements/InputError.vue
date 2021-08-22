<template>
  <div :id="`${id}-error`" data-error="true" v-if="errorMessage && state == 'error'">
    <slot :errorMessage="errorMessage">
      {{ errorMessage }}
    </slot>
  </div>
</template>
<script lang="ts">
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject } from "vue";
export default defineComponent({
  name: "InputError",
  setup() {
    const errorMessage = inject(injectionKeys.FORM.ERROR_MESSAGE);
    const state = inject(injectionKeys.FORM.STATE);
    const id = inject(injectionKeys.FORM.ID);
    isMissingInjectable(errorMessage, state, id);

    return {
      errorMessage,
      state,
      id,
    };
  },
});
</script>
