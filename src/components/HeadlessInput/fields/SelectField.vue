<template>
  <select :id="id" :name="name" v-model="inputValue" @blur="handleBlur" :class="computedClass">
    <option v-if="placeholder" :value="null" disabled hidden selected>{{ placeholder }}</option>
    <option v-for="(option, index) in options" :key="index" :value="option[valueKey]">{{ option[nameKey] }}</option>
  </select>
</template>
<script lang="ts">
export default {
  name: "SelectField"
};
</script>
<script setup lang="ts">
import { inputKeys } from "@/injection-keys/input";
import { inject, computed } from "vue";
const props = defineProps({
  placeholder: { type: String, default: null },
  valueKey: { type: String, default: "value" },
  nameKey: { type: String, default: "name" },
  class: { type: [String, Object, Array], default: undefined }
});
const inputValue = inject(inputKeys.InputValue);
const id = inject(inputKeys.Id);
const name = inject(inputKeys.Name);
const handleBlur = inject(inputKeys.HandleBlur);
const options = inject(inputKeys.Options);
const computedClass = computed(() => props.class);
if (!options) console.warn("Missing options. Please make sure are passing options to the headless input.");
</script>
