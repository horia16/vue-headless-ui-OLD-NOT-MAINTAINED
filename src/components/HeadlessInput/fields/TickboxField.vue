<template>
  <slot name="before" />
  <input
    v-bind="$attrs"
    :class="computedClass"
    :id="inputId"
    v-model="inputValue"
    :aria-describedby="errorMessage && state === 'error' ? `${id}-error` : undefined"
    :aria-invalid="errorMessage && state === 'error' ? true : undefined"
    :name="name"
    :value="value"
    :type="checkbox ? 'checkbox' : 'radio'"
    @blur="handleBlur"
    @change="setTouched"
  />
  <slot name="after" />
</template>
<script lang="ts">
export default {
  name: "TickboxField"
};
</script>
<script setup lang="ts">
import useArrayLink from "@/hooks/array-link";
import { inputKeys } from "@/injection-keys/input";
import { inject, PropType, provide, computed } from "vue";
const props = defineProps({
  value: {
    type: [String, Number, Object, Array] as PropType<
      string | number | boolean | Array<unknown> | Record<string, unknown>
    >,
    default: null
  },
  class: { type: [String, Object, Array], default: undefined }
});
const inputValue = inject(inputKeys.InputValue);
const id = inject(inputKeys.Id);
const name = inject(inputKeys.Name);
const handleBlur = inject(inputKeys.HandleBlur);
const errorMessage = inject(inputKeys.ErrorMessage);
const state = inject(inputKeys.State);
const meta = inject(inputKeys.Meta);
const inputs = inject(inputKeys.Inputs);
const checkbox = inject(inputKeys.Checkbox);
const { id: inputId } = useArrayLink(inputs);
const computedClass = computed(() => props.class);
provide(inputKeys.Id, inputId.value);
provide(
  inputKeys.Checkbox,
  computed(() => false)
);
provide(
  inputKeys.Radio,
  computed(() => false)
);
function setTouched() {
  if (meta) {
    meta.touched = true;
  }
}
</script>
