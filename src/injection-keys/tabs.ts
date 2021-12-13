import { InjectionKey, Ref, WritableComputedRef } from "vue";

const TabArray: InjectionKey<Ref<Array<string>>> = Symbol("TabArray");
const SwitchArray: InjectionKey<Ref<Array<string>>> = Symbol("SwitchArray");
const CurrentTab: InjectionKey<WritableComputedRef<number>> = Symbol("CurrentTab");
const SwitchTab: InjectionKey<(index: number) => void> = Symbol("SwitchTab");

export const tabKeys = {
  TabArray,
  SwitchArray,
  CurrentTab,
  SwitchTab
};
