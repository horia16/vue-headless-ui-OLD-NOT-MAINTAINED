<template>
  <div class="input-error" v-if="errorMessage && state == 'error'">
    <slot :errorMessage="errorMessage">
      {{ errorMessage }}
    </slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";
export default defineComponent({
  name: "InputError",
  setup() {
    const errorMessage = inject("errorMessage") as string;
    const state = inject("state") as string;
    return {
      errorMessage,
      state,
    };
  },
});
</script>
