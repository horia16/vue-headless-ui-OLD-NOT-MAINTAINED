import { computed, ComputedRef, PropType, Ref, SetupContext, watch, WritableComputedRef } from "vue";
import { useField } from "vee-validate";
import { randomString } from "@/utils";

export type InputProps = Readonly<
  {
    modelValue?: unknown;
    options: unknown;
    id?: unknown;
    name?: unknown;
    rules?: unknown;
    group?: unknown;
    overrideState?: unknown;
  } & {
    modelValue: string | number | boolean | unknown[] | Record<string, any>;
    options: Record<string, any>[] | null;
    id: string | number | null;
    name: string | number | null;
    rules: string | Function | null;
    group: boolean;
    overrideState: InputState | null;
  }
>;

export enum InputState {
  Clear = "clear",
  Valid = "valid",
  Error = "error"
}

export interface FieldMeta<T> {
  touched: boolean;
  dirty: boolean;
  valid: boolean;
  validated: boolean;
  pending: boolean;
  initialValue?: T;
}

export interface ValidationResult {
  errors: Array<string>;
  valid: boolean;
}

export interface FieldData {
  errorMessage: ComputedRef<string | undefined>;
  value: Ref<unknown> | WritableComputedRef<unknown>;
  meta: FieldMeta<unknown>;
  validate: () => Promise<ValidationResult>;
}

/**
 * The minimal props required by an input type component
 */
export const props = {
  modelValue: {
    type: [String, Number, Boolean, Array, Object] as PropType<
      string | number | boolean | unknown[] | Record<string, any>
    >,
    default: null
  },
  options: { type: Array as PropType<Array<Record<string, any>>>, default: null },
  id: { type: [String, Number], default: null },
  name: { type: [String, Number], default: null },
  rules: { type: [String, Function], default: null },
  group: { type: Boolean, default: false },
  overrideState: { type: String as PropType<InputState>, default: null }
};
/**
 * The minimal emits required by an input component
 */
export const emits = {
  blur: null,
  "update:modelValue": (value: string | number | boolean | unknown[] | undefined) => {
    if (value === undefined) {
      console.warn("Input context returned undefined value");
      return false;
    }
    return true;
  }
};

/**
 * A more complex version of the useField provided by vee-validate.
 * This takes care of a few extra things like auto id and name generation.
 */
export function useFieldContext(props: InputProps, context: SetupContext<any>) {
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
      context.emit("update:modelValue", val);
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
    if (props.overrideState == null) await validate();
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
    meta,
    state,
    validate,
    handleBlur
  };
}

/**
 * Simple model wrapper for the vue v-model directive.
 */
export function useModel<T>(props: { modelValue: T } & Record<string, any>, context: SetupContext<any>) {
  return computed({
    get: () => props.modelValue,
    set: val => {
      context.emit("update:modelValue", val);
    }
  });
}
