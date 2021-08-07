<template>
  <select :name="name" :id="id" v-model="inputValue" @blur="handleBlur">
    <option v-if="placeholder" selected disabled hidden :value="null"> {{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option.value">{{ option.name }}</option>
  </select>
</template>
<script lang="ts">
import { defineComponent, inject, PropType, WritableComputedRef } from "vue";

export default defineComponent({
  name: "SelectField",
  props: {
    options: { type: Object as PropType<{ name: string; value: any }>, required: true },
    placeholder: { type: String, default: null },
  },
  emits: ["blur"],
  setup() {
    const inputValue = inject("inputValue") as WritableComputedRef<string | number | boolean | null>;
    const id = inject("id") as string;
    const name = inject("name") as string;
    const handleBlur = inject("handleBlur") as () => void;

    return {
      inputValue,
      id,
      name,
      handleBlur,
    };
  },
});
</script>
