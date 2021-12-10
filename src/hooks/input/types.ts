import { Ref, WritableComputedRef } from "vue";

export enum InputState {
  Clear = "clear",
  Valid = "valid",
  Error = "error"
}

export type InputProps = Readonly<{
  modelValue: string | number | boolean | unknown[] | Record<string, unknown> | null;
  options: Record<string, unknown>[] | null;
  id: string | number | null;
  name: string | number | null;
  rules:
    | string
    | ((val: string | number | boolean | unknown[] | Record<string, unknown> | null) => boolean | string)
    | null
    | Record<string, unknown>;
  radio: boolean;
  checkbox: boolean;
  overrideState: InputState | null;
}>;

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
  errorMessage: Ref<string | undefined>;
  value: Ref<unknown> | WritableComputedRef<unknown>;
  meta: FieldMeta<unknown>;
  validate: () => Promise<ValidationResult>;
}

export type DefaultModelValue = string | number | boolean | unknown[] | Record<string, unknown> | null;
