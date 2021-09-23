import { FieldMeta, ValidationResult } from "@/hooks/input";
import { ComputedRef, InjectionKey, Ref, WritableComputedRef } from "vue";
import { DayMatrix } from "@/utils/calendar";

const ID: InjectionKey<string> = Symbol("ID");
const INPUT_VALUE: InjectionKey<WritableComputedRef<
  string | number | boolean | any[] | Record<string, any> | null
>> = Symbol("INPUT_VALUE");
const NAME: InjectionKey<string> = Symbol("NAME");
const ERROR_MESSAGE: InjectionKey<ComputedRef<string | undefined>> = Symbol("ERROR_MESSAGE");
const STATE: InjectionKey<ComputedRef<"valid" | "error" | "clear">> = Symbol("STATE");
const VALIDATE: InjectionKey<() => Promise<ValidationResult>> = Symbol("VALIDATE");
const HANDLE_BLUR: InjectionKey<() => Promise<void>> = Symbol("HANDLE_BLUR");
const META: InjectionKey<FieldMeta<unknown>> = Symbol("META");
const OPTIONS: InjectionKey<Array<Record<string, any>> | null> = Symbol("OPTIONS");
const INPUTS: InjectionKey<Ref<Array<string>>> = Symbol("INPUTS");
const FORM = {
  ID,
  INPUT_VALUE,
  OPTIONS,
  NAME,
  ERROR_MESSAGE,
  STATE,
  VALIDATE,
  HANDLE_BLUR,
  META,
  INPUTS
};

const IS_OPEN: InjectionKey<WritableComputedRef<boolean>> = Symbol("IS_OPEN");
const TOGGLE: InjectionKey<() => void> = Symbol("TOGGLE");
const COMPUTED_ID: InjectionKey<ComputedRef<string>> = Symbol("COMPUTED_ID");
const DELAY: InjectionKey<ComputedRef<number>> = Symbol("DELAY");
const ACCORDION = {
  IS_OPEN,
  TOGGLE,
  COMPUTED_ID,
  DELAY
};

const DIALOG = {
  ID,
  IS_OPEN
};
const TAB_ARRAY: InjectionKey<Ref<Array<string>>> = Symbol("TAB_ARRAY");
const SWITCH_ARRAY: InjectionKey<Ref<Array<string>>> = Symbol("SWITCH_ARRAY");
const CURRENT_TAB: InjectionKey<WritableComputedRef<number>> = Symbol("CURRENT_TAB");
const SWITCH_TAB: InjectionKey<(index: number) => void> = Symbol("SWITCH_TAB");
const TABS = { TAB_ARRAY, SWITCH_ARRAY, CURRENT_TAB, SWITCH_TAB };

const MATRIX: InjectionKey<ComputedRef<DayMatrix>> = Symbol("MATRIX");
const UPDATE_DAY: InjectionKey<(val: number) => void> = Symbol("UPDATE_DAY");
const CALENDAR = {
  MATRIX,
  UPDATE_DAY
};

export default {
  FORM,
  ACCORDION,
  DIALOG,
  TABS,
  CALENDAR
};
