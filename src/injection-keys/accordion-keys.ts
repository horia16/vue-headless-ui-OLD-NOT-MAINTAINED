import { ComputedRef, InjectionKey, WritableComputedRef } from "vue";

const IS_OPEN: InjectionKey<WritableComputedRef<boolean>> = Symbol("IS_OPEN");
const TOGGLE: InjectionKey<() => void> = Symbol("TOGGLE");
const COMPUTED_ID: InjectionKey<ComputedRef<string>> = Symbol("COMPUTED_ID");
const DELAY: InjectionKey<ComputedRef<number>> = Symbol("DELAY");
export default {
  IS_OPEN,
  TOGGLE,
  COMPUTED_ID,
  DELAY
};
