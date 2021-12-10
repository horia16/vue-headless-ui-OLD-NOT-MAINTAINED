import { FieldMeta, ValidationResult } from "@/hooks/input/types";
import { ComputedRef, InjectionKey, Ref, WritableComputedRef } from "vue";

const ID: InjectionKey<string> = Symbol("ID");
const INPUT_VALUE: InjectionKey<
  WritableComputedRef<string | number | boolean | unknown[] | Record<string, unknown> | null>
> = Symbol("INPUT_VALUE");
const NAME: InjectionKey<string> = Symbol("NAME");
const ERROR_MESSAGE: InjectionKey<ComputedRef<string | undefined>> = Symbol("ERROR_MESSAGE");
const STATE: InjectionKey<ComputedRef<"valid" | "error" | "clear">> = Symbol("STATE");
const VALIDATE: InjectionKey<() => Promise<ValidationResult>> = Symbol("VALIDATE");
const HANDLE_BLUR: InjectionKey<() => Promise<void>> = Symbol("HANDLE_BLUR");
const META: InjectionKey<FieldMeta<unknown>> = Symbol("META");
const OPTIONS: InjectionKey<ComputedRef<Array<Record<string, unknown>>> | null> = Symbol("OPTIONS");
const INPUTS: InjectionKey<Ref<Array<string>>> = Symbol("INPUTS");
const CHECKBOX: InjectionKey<ComputedRef<boolean>> = Symbol("CHECKBOX");
const RADIO: InjectionKey<ComputedRef<boolean>> = Symbol("RADIO");
export default {
  ID,
  INPUT_VALUE,
  OPTIONS,
  NAME,
  ERROR_MESSAGE,
  STATE,
  VALIDATE,
  HANDLE_BLUR,
  META,
  INPUTS,
  CHECKBOX,
  RADIO
};
