import { computed, ComputedRef, Ref, SetupContext } from "vue";
import { useField } from "vee-validate";
import { randomString } from "@/utils";

export interface InputBaseProps {
  modelValue: string | number | boolean | Array<any> | null;
  id: string | number | null;
  name: string | number | null;
  rules: string | ((value: any) => boolean | string) | null;

  [key: string]: any;
}

export interface FieldMeta<TValue> {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  validated: boolean;
  pending: boolean;
  initialValue?: TValue;
}

export interface ValidationResult {
  errors: Array<string>;
  valid: boolean;
}

export interface FieldData {
  errorMessage: ComputedRef<string | undefined>;
  value: Ref<unknown>;
  meta: FieldMeta<unknown>;
  validate: () => Promise<ValidationResult>;
}

/**
 * A more complex version of the useField provided by vee-validate.
 * This takes care of a few extra things like auto id and name generation.
 */
export function useInput(props: InputBaseProps, context: SetupContext<any>) {
  // Use the provided id otherwise generate a random one
  const inputId = props.id ? `${props.id}` : `input-${randomString()}`;

  // Use the provided name or generate one based on the id
  const inputName = props.name ? `${props.name}` : `${inputId}-name`;
  // Use validation only if we don't have a parent state
  const { errorMessage, value, meta, validate }: FieldData = useField(inputName, props.rules);
  const inputValue = computed({
    get: () => props.modelValue,
    set: val => {
      // Update the vee-validate value
      value.value = val;
      // Emit our new value
      context.emit("update:modelValue", val);
    }
  });

  /**
   * The state of our input value
   */
  const state = computed(() => {
    if (meta.touched && meta.validated) {
      if (meta.valid) {
        return "valid";
      }
      return "error";
    }
    return "clear";
  });

  /**
   * Handle the onblur event emitted by the input
   */
  async function handleBlur() {
    meta.touched = true;
    await validate();
    // Emit it further to the parent component
    context.emit("blur");
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
      validate().catch(error => {
        console.warn(error);
      });
    }
  }

  return {
    errorMessage,
    inputValue,
    inputName,
    inputId,
    value,
    meta,
    state,
    validate,
    handleBlur
  };
}

/**
 * Simple model wrapper for the vue v-model directive.
 */
export function useModel<T>(props: { modelValue: T; [key: string]: any }, context: SetupContext<any>) {
  return computed({
    get: () => props.modelValue,
    set: val => {
      context.emit("update:modelValue", val);
    }
  });
}
