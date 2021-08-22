import { FieldMeta, ValidationResult } from "@/hooks/input";
import { ComputedRef, InjectionKey, WritableComputedRef } from "vue";

const ID: InjectionKey<string> = Symbol("ID");
const INPUT_VALUE: InjectionKey<WritableComputedRef<string | number | boolean | any[] | null>> = Symbol("INPUT_VALUE");
const NAME: InjectionKey<string> = Symbol("NAME");
const ERROR_MESSAGE: InjectionKey<ComputedRef<string | undefined>> = Symbol("ERROR_MESSAGE");
const STATE: InjectionKey<ComputedRef<"valid" | "error" | "clear">> = Symbol("STATE");
const VALIDATE: InjectionKey<() => Promise<ValidationResult>> = Symbol("VALIDATE");
const HANDLE_BLUR: InjectionKey<() => Promise<void>> = Symbol("HANDLE_BLUR");
const META: InjectionKey<FieldMeta<unknown>> = Symbol("META");

const FORM = {
  ID,
  INPUT_VALUE,
  NAME,
  ERROR_MESSAGE,
  STATE,
  VALIDATE,
  HANDLE_BLUR,
  META,
};

export default {
  FORM,
};
