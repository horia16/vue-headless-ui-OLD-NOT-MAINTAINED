<template>
  <component :is="as" v-if="errorMessage && state === 'error'" :id="`${id}-error`" data-error="true">
    <slot :errorMessage="errorMessage">
      {{ errorMessage }}
    </slot>
  </component>
</template>
<script lang="ts">
import { injectionKeys, isMissingInjectable } from "@/utils";
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "InputError",
  props: {
    as: {
      type: String,
      default: "div"
    }
  },
  setup() {
    const errorMessage = inject(injectionKeys.FORM.ERROR_MESSAGE);
    const state = inject(injectionKeys.FORM.STATE);
    const id = inject(injectionKeys.FORM.ID);
    isMissingInjectable(errorMessage, state, id);

    return {
      errorMessage,
      state,
      id
    };
  }
});
</script>
