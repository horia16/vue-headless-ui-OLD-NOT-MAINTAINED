<template>
  <component
    :is="textarea ? 'textarea' : 'input'"
    :class="computedClass"
    :id="id"
    :value="inputValue"
    :aria-describedby="errorMessage && state === 'error' ? `${id}-error` : undefined"
    :aria-invalid="errorMessage && state === 'error' ? true : undefined"
    :name="name"
    @input="updateValue"
    @blur="handleBlur"
  />
</template>
<script setup lang="ts">
import { inputKeys } from "@/injection-keys/input";
import { inject, computed } from "vue";
const props = defineProps({
  class: { type: [String, Object, Array], default: undefined }
});
const inputValue = inject(inputKeys.InputValue);
const id = inject(inputKeys.Id);
const name = inject(inputKeys.Name);
const handleBlur = inject(inputKeys.HandleBlur);
const errorMessage = inject(inputKeys.ErrorMessage);
const state = inject(inputKeys.State);
const textarea = inject(inputKeys.Textarea);
const computedClass = computed(() => props.class);
function updateValue(e: InputEvent) {
  const value = (e.target as HTMLInputElement).value;
  if (inputValue) {
    inputValue.value = value;
  }
}
</script>
