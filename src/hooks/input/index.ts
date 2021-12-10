import { computed, watch } from "vue";
import { useField } from "vee-validate";
import { randomString } from "@/utils/random";
import { FieldData, InputProps, InputState, DefaultModelValue } from "./types";

/**
 * A more complex version of the useField provided by vee-validate.
 * This takes care of a few extra things like auto id and name generation.
 */
export function useFieldContext(
  props: InputProps,
  emit: { (e: "update:modelValue", value: DefaultModelValue): void; (e: "blur"): void }
) {
  // Use the provided id otherwise generate a random one
  const inputId = props.id ? `${props.id}` : `input-${randomString()}`;
  // Use the provided name or generate one based on the id
  const inputName = props.name ? `${props.name}` : `${inputId}-name`;
  // Use validation only if we don't have a parent state
  const { errorMessage, value, meta, validate }: FieldData = useField(inputName, props.rules);
  const inputValue = computed({
    get: () => props.modelValue,
    set: val => {
      // Emit our new value
      emit("update:modelValue", val);
    }
  });

  watch(inputValue, newVal => {
    // Update the vee-validate value
    value.value = newVal;
  });

  /**
   * The state of our input value
   */
  const state = computed(() => {
    if (props.overrideState != null) {
      return props.overrideState;
    }
    if (meta.touched && meta.validated) {
      if (meta.valid) {
        return InputState.Valid;
      }
      return InputState.Error;
    }
    return InputState.Clear;
  });

  /**
   * Handle the onblur event emitted by the input
   */
  async function handleBlur() {
    meta.touched = true;
    await validate();
    // Emit it further to the parent component
    emit("blur");
  }

  // If we already have a value upon entry
  if (props.modelValue) {
    // Update that in vee-validate
    value.value = props.modelValue;
    // Different scenario when the value is an array as we don't want to validate empty arrays upon creation
    if (Array.isArray(value.value)) {
      if (value.value.length > 0) {
        meta.touched = true;
        validate().catch(error => {
          console.warn(error);
        });
      }
    } else {
      meta.touched = true;
      validate();
    }
  }

  return {
    errorMessage,
    inputValue,
    inputName,
    inputId,
    meta,
    state,
    validate,
    handleBlur
  };
}
