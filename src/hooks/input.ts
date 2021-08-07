import { SetupContext, computed, ComputedRef, Ref } from "vue";
import { useField } from "vee-validate";
export interface InputBaseProps {
  modelValue: string | number | boolean | null;
  id: string | number | null;
  name: string | number | null;
  rules: string | ((value: any) => boolean | string) | null;
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
  errors: string[];
  valid: boolean;
}

export interface FieldData {
  errorMessage: ComputedRef<string | undefined>;
  value: Ref<unknown>;
  meta: FieldMeta<unknown>;
  validate: () => Promise<ValidationResult>;
}

export function useInput(props: InputBaseProps, context: SetupContext<any>) {
  // Use the provided id otherwise generate a random one
  const inputId = props.id
    ? `${props.id}`
    : `input-${[...Array(30)].map(() => Math.random().toString(36)[2]).join("")}`;

  // Use the provided name or generate one based on the id
  const inputName = props.name ? `${props.name}` : `${inputId}-name`;
  // Use validation only if we don't have a parent state
  const { errorMessage, value, meta, validate }: FieldData = useField(inputName, props.rules) as any;
  const inputValue = computed({
    get: () => props.modelValue,
    set: (val) => {
      value.value = val;
      context.emit("update:modelValue", val);
    },
  });

  const state = computed(() => {
    if (meta.touched && meta.validated) {
      if (meta.valid) {
        return "valid";
      }
      return "error";
    }
    return "clear";
  });

  async function handleBlur() {
    meta.touched = true;
    await validate();
    context.emit("blur");
  }

  // If we have a value upon setup validate it
  if (props.modelValue) {
    value.value = props.modelValue;
    meta.touched = true;
    validate();
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
    handleBlur,
  };
}
