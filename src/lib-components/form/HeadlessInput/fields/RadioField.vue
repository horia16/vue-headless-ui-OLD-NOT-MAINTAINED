<template>
  <input
    :id="inputId"
    v-model="inputValue"
    :aria-describedby="errorMessage && state === 'error' ? `${id}-error` : null"
    :aria-invalid="errorMessage && state === 'error'"
    :name="name"
    :value="value"
    type="radio"
    @blur="handleBlur"
    @change="meta.touched = true"
  />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { props, setup } from "@/shared/fields/radio-checkbox";
import { emits } from "@/shared/fields/common";

export default defineComponent({
  name: "RadioField",
  props,
  emits,
  setup
});
</script>
