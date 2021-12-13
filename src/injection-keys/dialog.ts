import { InjectionKey, WritableComputedRef } from "vue";

const Id: InjectionKey<string> = Symbol("Id");
const Open: InjectionKey<WritableComputedRef<boolean>> = Symbol("Open");

export const dialogKeys = {
  Id,
  Open
};
