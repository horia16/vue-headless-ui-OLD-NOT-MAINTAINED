<template>
  <textarea
    :id="id"
    v-model="inputValue"
    :aria-describedby="errorMessage && state === 'error' ? `${id}-error` : undefined"
    :aria-invalid="errorMessage && state === 'error' ? true : undefined"
    @blur="handleBlur"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { emits, setup } from "@/shared/fields/common";

export default defineComponent({
  name: "TextareaField",
  emits,
  setup
});
</script>
