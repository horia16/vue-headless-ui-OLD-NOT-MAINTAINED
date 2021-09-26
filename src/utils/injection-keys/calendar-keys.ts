import { ComputedRef, InjectionKey, WritableComputedRef } from "vue";
import { DateObject, DayMatrix } from "@/utils/calendar";

const MATRIX: InjectionKey<ComputedRef<DayMatrix>> = Symbol("MATRIX");
const UPDATE_DAY: InjectionKey<(val: number) => void> = Symbol("UPDATE_DAY");
const UPDATE_MONTH: InjectionKey<(val: number) => void> = Symbol("UPDATE_MONTH");
const UPDATE_YEAR: InjectionKey<(val: number) => void> = Symbol("UPDATE_YEAR");
const DATE_OBJECT: InjectionKey<DateObject> = Symbol("DATE_OBJECT");
const START_SUNDAY: InjectionKey<ComputedRef<boolean>> = Symbol("START_SUNDAY");
const MODEL: InjectionKey<WritableComputedRef<string | Date>> = Symbol("MODEL");
export default {
  MATRIX,
  UPDATE_DAY,
  UPDATE_MONTH,
  UPDATE_YEAR,
  DATE_OBJECT,
  START_SUNDAY,
  MODEL
};
