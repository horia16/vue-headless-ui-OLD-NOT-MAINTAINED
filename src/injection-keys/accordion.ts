import { InjectionKey, WritableComputedRef, ComputedRef } from "vue";

const Open: InjectionKey<WritableComputedRef<boolean>> = Symbol("Open");
const ToggleAccordion: InjectionKey<() => void> = Symbol("ToggleAccordion");
const Id: InjectionKey<ComputedRef<string>> = Symbol("Id");
const AnimationDelay: InjectionKey<ComputedRef<number>> = Symbol("AnimationDelay");
const TransitionCurve: InjectionKey<ComputedRef<string>> = Symbol("TransitionCurve");
export const accordionKeys = {
  Open,
  ToggleAccordion,
  Id,
  AnimationDelay,
  TransitionCurve
};
