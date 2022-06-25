import type { InjectionKey, WritableComputedRef, ComputedRef } from "vue";

const ID: InjectionKey<ComputedRef<string>> = Symbol("ID");
const OPEN: InjectionKey<WritableComputedRef<boolean>> = Symbol("OPEN");
const ANIMATION_DELAY: InjectionKey<ComputedRef<number>> = Symbol("ANIMATION_DELAY");
const TRANSITION_CURVE: InjectionKey<ComputedRef<string>> = Symbol("TRANSITION_CURVE");
const TOGGLE_ACCORDION: InjectionKey<() => void> = Symbol("TOGGLE_ACCORDION");

export default Object.freeze({
  ID,
  OPEN,
  ANIMATION_DELAY,
  TRANSITION_CURVE,
  TOGGLE_ACCORDION
});
