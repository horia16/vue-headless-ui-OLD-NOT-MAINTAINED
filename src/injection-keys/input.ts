import { FieldMeta, ValidationResult } from "@/hooks/input/types";
import { ComputedRef, InjectionKey, Ref, WritableComputedRef } from "vue";

const Id: InjectionKey<string> = Symbol("Id");
const InputValue: InjectionKey<
  WritableComputedRef<string | number | boolean | unknown[] | Record<string, unknown> | null>
> = Symbol("InputValue");
const Name: InjectionKey<string> = Symbol("Name");
const ErrorMessage: InjectionKey<ComputedRef<string | undefined>> = Symbol("ErrorMessage");
const State: InjectionKey<ComputedRef<"valid" | "error" | "clear">> = Symbol("State");
const Validate: InjectionKey<() => Promise<ValidationResult>> = Symbol("Validate");
const HandleBlur: InjectionKey<() => Promise<void>> = Symbol("HandleBlur");
const Meta: InjectionKey<FieldMeta<unknown>> = Symbol("Meta");
const Options: InjectionKey<ComputedRef<Array<Record<string, unknown>>> | null> = Symbol("Options");
const Inputs: InjectionKey<Ref<Array<string>>> = Symbol("Inputs");
const Checkbox: InjectionKey<ComputedRef<boolean>> = Symbol("Checkbox");
const Radio: InjectionKey<ComputedRef<boolean>> = Symbol("Radio");
const Textarea: InjectionKey<ComputedRef<boolean>> = Symbol("Textarea");

export const inputKeys = {
  Id,
  InputValue,
  Name,
  ErrorMessage,
  State,
  Validate,
  HandleBlur,
  Meta,
  Options,
  Inputs,
  Checkbox,
  Radio,
  Textarea
};
