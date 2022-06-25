import type { InjectionKey, WritableComputedRef, ComputedRef } from "vue";

const ID: InjectionKey<ComputedRef<string>> = Symbol("ID");
const OPEN: InjectionKey<WritableComputedRef<boolean>> = Symbol("OPEN");

export default Object.freeze({
  ID,
  OPEN
});
