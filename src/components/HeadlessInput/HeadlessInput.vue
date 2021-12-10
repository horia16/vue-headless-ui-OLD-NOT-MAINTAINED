<template>
  <component :is="radio || checkbox ? 'fieldset' : 'div'" data-input-wrapper="true" :class="computedClass">
    <slot :errorMessage="errorMessage" :handleBlur="handleBlur" :meta="meta" :state="state" :validate="validate" />
  </component>
</template>
<script setup lang="ts">
import { provide, ref, computed, PropType } from "vue";
import { useFieldContext } from "@/hooks/input";
import { DefaultModelValue, InputState } from "@/hooks/input/types";

import { inputKeys } from "@/injection-keys/input";
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean, Array, Object] as PropType<DefaultModelValue>,
    default: null
  },
  options: {
    type: Array as PropType<Array<Record<string, unknown>>>,
    default: null
  },
  id: { type: [String, Number], default: null },
  class: { type: [String, Object, Array], default: undefined },
  name: { type: [String, Number], default: null },
  rules: {
    type: [String, Function, Object] as PropType<
      string | ((val: unknown) => boolean | string) | Record<string, unknown> | null
    >,
    default: null
  },
  radio: { type: Boolean, default: false },
  checkbox: { type: Boolean, default: false },
  textarea: { type: Boolean, default: false },
  overrideState: { type: String as PropType<InputState>, default: null }
});
const emit = defineEmits<{ (e: "update:modelValue", value: DefaultModelValue): void; (e: "blur"): void }>();
const { errorMessage, inputValue, inputName, inputId, state, validate, handleBlur, meta } = useFieldContext(
  props,
  emit
);
/**
 * Array of input ids. Used for radio inputs or checkboxes.
 */
const inputs = ref<Array<string>>([]);
provide(inputKeys.Id, inputId);
provide(inputKeys.InputValue, inputValue);
provide(inputKeys.Name, inputName);
provide(inputKeys.ErrorMessage, errorMessage);
provide(inputKeys.State, state);
provide(inputKeys.Validate, validate);
provide(inputKeys.HandleBlur, handleBlur);
provide(inputKeys.Meta, meta);
provide(
  inputKeys.Options,
  computed(() => props.options)
);
provide(
  inputKeys.Checkbox,
  computed(() => props.checkbox)
);
provide(
  inputKeys.Radio,
  computed(() => props.radio)
);
provide(
  inputKeys.Textarea,
  computed(() => props.textarea)
);
provide(inputKeys.Inputs, inputs);
const computedClass = computed(() => props.class);
</script>
