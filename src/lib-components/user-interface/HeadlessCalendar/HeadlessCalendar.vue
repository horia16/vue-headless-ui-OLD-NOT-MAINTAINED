<template>
  <component :is="as">
    <slot :day="date.d" :month="date.m" :year="date.y" />
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, provide, reactive } from "vue";
import {
  convertToDate,
  convertToDateObject,
  createDayMapping,
  DateObject,
  DayObject,
  shiftMatrix
} from "@/utils/calendar";
import { injectionKeys } from "@/utils";

export default defineComponent({
  name: "HeadlessCalendar",
  props: {
    modelValue: {
      type: [String, Date, Array] as PropType<string | Date | null | Array<string | Date | null>>,
      default: null
    },
    as: { type: String, default: "div" },
    useDate: { type: Boolean, default: null },
    startSunday: { type: Boolean, default: false },
    disablePastDates: { type: Boolean, default: false },
    disableFutureDates: { type: Boolean, default: false },
    disabledDates: { type: Array as PropType<Array<Date | string>>, default: () => [] },
    customModifiers: { type: Array as PropType<Array<(day: DayObject) => DayObject>>, default: () => [] },
    locale: { type: String, default: "en-US" },
    isRange: { type: Boolean, default: false }
  },
  emits: {
    "update:modelValue": null
  },
  setup(props, { emit }) {
    const date = reactive<DateObject>(
      !props.isRange && props.modelValue && (typeof props.modelValue === "string" || props.modelValue instanceof Date)
        ? convertToDateObject(props.modelValue)
        : { ...convertToDateObject(new Date()), d: null }
    );

    /**
     * The operating mode of the calendar. Date or string
     */
    const mode = computed(() =>
      props.useDate == null
        ? typeof props.modelValue === "string"
          ? "string"
          : "date"
        : props.useDate
        ? "date"
        : "string"
    );
    const model = computed({
      get: () => {
        return props.modelValue;
      },
      set: val => {
        emit("update:modelValue", val);
      }
    });
    function updateModel() {
      if (date.d && date.m && date.y) {
        if (!props.isRange) {
          model.value = convertToDate(date, mode.value);
        } else {
          if (!model.value) {
            model.value = [convertToDate(date, mode.value)];
          } else if (Array.isArray(model.value)) {
            switch (model.value.length) {
              case 0:
                model.value.push(convertToDate(date, mode.value));
                break;
              case 1:
                model.value.push(convertToDate(date, mode.value));
                break;
              case 2:
                model.value = [convertToDate(date, mode.value)];
                break;
              default:
                model.value = [convertToDate(date, mode.value)];
                break;
            }
          }
        }
      }
    }

    function updateDay(day: number) {
      date.d = day;
      updateModel();
    }
    /**
     * Update the month of our date. Negative values or values bigger than 12 will change the year.
     */
    function updateMonth(month: number) {
      if (month < 1) {
        date.m = 12;
        date.y--;
      } else if (month > 12) {
        date.m = 1;
        date.y++;
      } else {
        date.m = month;
      }
    }

    function updateYear(year: number) {
      date.y = year;
    }

    const modifiers = computed(() => {
      return {
        disablePastDates: props.disablePastDates,
        disableFutureDates: props.disableFutureDates,
        disabledDates: props.disabledDates,
        custom: props.customModifiers
      };
    });

    const matrix = computed(() =>
      props.startSunday
        ? createDayMapping(date.m, date.y, modifiers.value)
        : shiftMatrix(createDayMapping(date.m, date.y, modifiers.value))
    );
    const locale = computed(() => props.locale);
    const startSunday = computed(() => props.startSunday);
    provide(injectionKeys.CALENDAR.LOCALE, locale);
    provide(injectionKeys.CALENDAR.MATRIX, matrix);
    provide(injectionKeys.CALENDAR.UPDATE_DAY, updateDay);
    provide(injectionKeys.CALENDAR.UPDATE_MONTH, updateMonth);
    provide(injectionKeys.CALENDAR.UPDATE_YEAR, updateYear);
    provide(injectionKeys.CALENDAR.DATE_OBJECT, date);
    provide(injectionKeys.CALENDAR.MODEL, model);
    provide(injectionKeys.CALENDAR.START_SUNDAY, startSunday);
    return {
      matrix,
      updateDay,
      updateMonth,
      updateYear,
      model,
      mode,
      date
    };
  }
});
</script>
